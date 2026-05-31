export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  if (!token) return new Response('Unauthorized', { status: 401 })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  // Rate limit: 10 briefs per hour per clinician
  if (!checkRateLimit(`brief:${user.id}`, 10)) return rateLimitResponse()

  const groqKey = process.env.GROQ_API_KEY
  if (!groqKey) return new Response('AI service not configured', { status: 500 })

  const encoder = new TextEncoder()

  const [{ data: clinician }, { data: patients }] = await Promise.all([
    supabase.from('clinicians').select('full_name, plan, patient_limit').eq('id', user.id).single(),
    supabase.from('patients').select('id, full_name, age, gender, diagnosis').eq('clinician_id', user.id).order('created_at', { ascending: false }),
  ])

  if (!patients || patients.length === 0) {
    const signal = JSON.stringify({ urgency: 'LOW', hasCrisis: false, topPatientName: null })
    const tod = getTimeOfDay()
    const surname = (clinician as any)?.full_name?.split(' ').slice(-1)[0] || 'Doctor'
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(signal + '\n\n'))
        controller.enqueue(encoder.encode(
          `Good ${tod}, Dr. ${surname}.\n\nYou have no patients enrolled yet. Once you add your first patient and they begin logging readings, this brief will summarise their progress every day.\n\nHave a good day, Doctor.`
        ))
        controller.close()
      }
    })
    return briefResponse(stream)
  }

  const patientIds = patients.map((p: any) => p.id)
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const [{ data: recentBP }, { data: recentBG }, { data: activeMeds }] = await Promise.all([
    supabase.from('bp_readings').select('patient_id, systolic, diastolic, logged_at').in('patient_id', patientIds).gte('logged_at', since7d).order('logged_at', { ascending: false }),
    supabase.from('bg_readings').select('patient_id, value_mgdl, reading_type, logged_at').in('patient_id', patientIds).gte('logged_at', since7d).order('logged_at', { ascending: false }),
    supabase.from('medications').select('patient_id, drug_name, dose').in('patient_id', patientIds).eq('active', true),
  ])

  const patientSummaries = patients.map((p: any) => {
    const bp = (recentBP || []).filter((r: any) => r.patient_id === p.id)
    const bg = (recentBG || []).filter((r: any) => r.patient_id === p.id)
    const meds = (activeMeds || []).filter((r: any) => r.patient_id === p.id)

    const crisisBP = bp.filter((r: any) => r.systolic >= 180 || r.diastolic >= 120)
    const crisisBG = bg.filter((r: any) => r.value_mgdl > 400 || r.value_mgdl < 54)
    const overnightCrisisBP = crisisBP.filter((r: any) => r.logged_at >= since24h)
    const overnightCrisisBG = crisisBG.filter((r: any) => r.logged_at >= since24h)

    const avgSys = bp.length ? Math.round(bp.reduce((s: number, r: any) => s + r.systolic, 0) / bp.length) : null
    const avgDia = bp.length ? Math.round(bp.reduce((s: number, r: any) => s + r.diastolic, 0) / bp.length) : null
    const avgBG = bg.length ? Math.round(bg.reduce((s: number, r: any) => s + r.value_mgdl, 0) / bg.length) : null

    const bpControlled = avgSys !== null && avgDia !== null && avgSys < 140 && avgDia < 90
    const bgControlled = avgBG !== null && avgBG < 180
    const hasCrisis = overnightCrisisBP.length > 0 || overnightCrisisBG.length > 0
    const needsAttention = crisisBP.length > 0 || crisisBG.length > 0 || (!bpControlled && bp.length > 0) || (!bgControlled && bg.length > 0)

    return {
      name: p.full_name,
      age: p.age,
      diagnosis: p.diagnosis.join('+'),
      bpReadings7d: bp.length,
      avgBP: avgSys && avgDia ? `${avgSys}/${avgDia} mmHg` : null,
      bpControlled,
      crisisBPCount: crisisBP.length,
      overnightCrisisBP: overnightCrisisBP.length,
      bgReadings7d: bg.length,
      avgBG: avgBG ? `${avgBG} mg/dL` : null,
      bgControlled,
      crisisBGCount: crisisBG.length,
      overnightCrisisBG: overnightCrisisBG.length,
      meds: meds.map((m: any) => `${m.drug_name} ${m.dose}`).join(', ') || 'none recorded',
      hasCrisis,
      needsAttention,
      silent: bp.length === 0 && bg.length === 0,
    }
  })

  const crisisPatients = patientSummaries.filter((p: any) => p.hasCrisis)
  const flaggedPatients = patientSummaries.filter((p: any) => p.needsAttention)
  const silentPatients = patientSummaries.filter((p: any) => p.silent)
  const controlled = patientSummaries.filter((p: any) =>
    (p.bpControlled || p.bpReadings7d === 0) && (p.bgControlled || p.bgReadings7d === 0)
  )
  const controlRate = Math.round((controlled.length / patientSummaries.length) * 100)

  let urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRISIS' = 'LOW'
  if (crisisPatients.length > 0) urgency = 'CRISIS'
  else if (flaggedPatients.length >= 5) urgency = 'HIGH'
  else if (flaggedPatients.length > 0) urgency = 'MEDIUM'

  const topPatient = crisisPatients[0] || flaggedPatients[0] || null
  const signal = JSON.stringify({ urgency, hasCrisis: crisisPatients.length > 0, topPatientName: topPatient?.name || null })

  const today = new Date().toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const clinicianSurname = (clinician as any)?.full_name?.split(' ').slice(-1)[0] || 'Doctor'

  const systemPrompt = `You are the voice of The Triad — a clinical intelligence platform for healthcare professionals in Nigeria.

Write the Daily Brief: a spoken-word-style clinical summary delivered to a clinician at the start of their session.

VOICE RULES:
Write the way a trusted senior colleague briefs their consultant before a ward round. Calm. Direct. Respectful of intelligence.
Never use bullet points. Write in flowing clinical prose.
Never say "I" or refer to yourself.
Refer to the clinician by title and surname only. Never first name.
Refer to patients by full name on first mention, surname only after.
Use Nigerian English conventions naturally.
Paragraphs separated by: ─────
End with exactly one closing line.
Maximum 280 words.

CLINICAL ACCURACY:
Never invent readings. Only state what is in the data provided.
Never suggest a drug not in the Nigerian formulary.
Never make a diagnosis. Describe findings. Recommend review.
ESC/ESH 2023 for BP. ADA 2024 for BG.
If insufficient data, say so plainly.

PRIORITY ORDER:
Crisis overnight readings come FIRST.
Then flagged/worsening patients.
Then stable panel summary.
Then silent patients (no readings).
Close warmly.`

  const userPrompt = `Today: ${today}
Clinician: Dr. ${clinicianSurname}
Total patients: ${patients.length}
Panel control rate: ${controlRate}%

PATIENT DATA:
${patientSummaries.map((p: any) => `• ${p.name} (${p.age || '?'} yrs, ${p.diagnosis})
  BP: ${p.bpReadings7d} readings${p.avgBP ? `, avg ${p.avgBP}` : ''}${p.overnightCrisisBP > 0 ? ` — CRISIS in last 24h` : p.crisisBPCount > 0 ? ` — crisis reading this week` : ''}
  BG: ${p.bgReadings7d} readings${p.avgBG ? `, avg ${p.avgBG}` : ''}${p.overnightCrisisBG > 0 ? ` — CRISIS in last 24h` : p.crisisBGCount > 0 ? ` — crisis reading this week` : ''}
  Meds: ${p.meds}
  Status: ${p.hasCrisis ? 'OVERNIGHT CRISIS' : p.needsAttention ? 'NEEDS ATTENTION' : p.silent ? 'SILENT this week' : 'Stable'}`).join('\n\n')}

${crisisPatients.length > 0 ? `OVERNIGHT CRISES: ${crisisPatients.map((p: any) => p.name).join(', ')}` : ''}
${silentPatients.length > 0 ? `SILENT: ${silentPatients.map((p: any) => p.name).join(', ')}` : ''}

Write the Daily Brief now.`

  // Try primary model first, fall back to llama if unavailable on free tier
  const models = ['llama-3.3-70b-versatile', 'openai/gpt-oss-120b']
  let groqRes: Response | null = null

  for (const model of models) {
    const attempt = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.4,
        max_tokens: 420,
        stream: true,
      }),
    })
    if (attempt.ok && attempt.body) { groqRes = attempt; break }
  }

  if (!groqRes || !groqRes.body) {
    const fallback = buildFallback(clinicianSurname, patientSummaries, crisisPatients, flaggedPatients, controlRate)
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(signal + '\n\n'))
        controller.enqueue(encoder.encode(fallback))
        controller.close()
      }
    })
    return briefResponse(stream)
  }

  const decoder = new TextDecoder()
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode(signal + '\n\n'))
      const reader = groqRes.body!.getReader()
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          const lines = chunk.split('\n').filter(l => l.startsWith('data: '))
          for (const line of lines) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const json = JSON.parse(data)
              const text = json.choices?.[0]?.delta?.content
              if (text) controller.enqueue(encoder.encode(text))
            } catch { }
          }
        }
      } finally {
        controller.close()
      }
    }
  })

  return briefResponse(stream)
}

function briefResponse(stream: ReadableStream) {
  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Accel-Buffering': 'no', 'Cache-Control': 'no-cache' },
  })
}

function getTimeOfDay() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  if (h < 21) return 'evening'
  return 'night'
}

function buildFallback(surname: string, all: any[], crisis: any[], flagged: any[], controlRate: number): string {
  const tod = getTimeOfDay()
  if (crisis.length > 0) {
    return `Good ${tod}, Dr. ${surname}.\n\n${crisis[0].name} logged a crisis reading in the last 24 hours. They need to hear from you today.\n\n─────\n\n${all.length} patients are under active monitoring. Panel control rate: ${controlRate}%.\n\nHave a good clinic day, Doctor.`
  }
  if (flagged.length > 0) {
    const names = flagged.slice(0, 3).map((p: any) => p.name).join(', ')
    return `Good ${tod}, Dr. ${surname}.\n\n${flagged.length} patient${flagged.length > 1 ? 's' : ''} require your attention today: ${names}${flagged.length > 3 ? ` and ${flagged.length - 3} others` : ''}.\n\n─────\n\nPanel control rate: ${controlRate}%. Have a good clinic day, Doctor.`
  }
  return `Good ${tod}, Dr. ${surname}.\n\nAll ${all.length} of your patients are stable. Panel control rate: ${controlRate}%.\n\nHave a good clinic day, Doctor.`
}
