export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  try {
    // ── Auth ────────────────────────────────────────────────────────────────
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // ── Rate limit: 30 AI analyses per hour per clinician ───────────────────
    if (!checkRateLimit(`analyze:${user.id}`, 30)) return rateLimitResponse()

    const { patient, bpReadings, bgReadings, medications, sideEffects } = await req.json()
    if (!patient) return NextResponse.json({ error: 'Patient data required' }, { status: 400 })

    const groqKey = process.env.GROQ_API_KEY
    if (!groqKey) return NextResponse.json({ error: 'AI service not configured' }, { status: 500 })

    const bpSummary = bpReadings?.length > 0
      ? bpReadings.slice(0, 10).map((r: any) =>
          `${r.systolic}/${r.diastolic} mmHg${r.pulse ? ` (pulse ${r.pulse})` : ''} — ${new Date(r.logged_at).toLocaleDateString('en-GB')}`
        ).join('\n')
      : 'No BP readings recorded'

    const bgSummary = bgReadings?.length > 0
      ? bgReadings.slice(0, 10).map((r: any) =>
          `${r.value_mgdl} mg/dL (${r.reading_type}) — ${new Date(r.logged_at).toLocaleDateString('en-GB')}`
        ).join('\n')
      : 'No BG readings recorded'

    const medSummary = medications?.filter((m: any) => m.active).length > 0
      ? medications.filter((m: any) => m.active).map((m: any) =>
          `${m.drug_name} ${m.dose} ${m.frequency} (started ${m.start_date})`
        ).join('\n')
      : 'No active medications recorded'

    const seSummary = sideEffects?.length > 0
      ? sideEffects.map((s: any) =>
          `${s.severity.toUpperCase()}: ${s.description} — ${new Date(s.reported_at).toLocaleDateString('en-GB')}`
        ).join('\n')
      : 'No side effects reported'

    const avgSystolic = bpReadings?.length > 0
      ? Math.round(bpReadings.reduce((sum: number, r: any) => sum + r.systolic, 0) / bpReadings.length) : null
    const avgDiastolic = bpReadings?.length > 0
      ? Math.round(bpReadings.reduce((sum: number, r: any) => sum + r.diastolic, 0) / bpReadings.length) : null
    const avgBG = bgReadings?.filter((r: any) => r.reading_type === 'fasting').length > 0
      ? Math.round(bgReadings.filter((r: any) => r.reading_type === 'fasting')
          .reduce((sum: number, r: any) => sum + r.value_mgdl, 0) /
          bgReadings.filter((r: any) => r.reading_type === 'fasting').length) : null

    const prompt = `You are a clinical decision support AI for a Nigerian healthcare platform called The Triad.
Analyze this patient's chronic disease monitoring data and provide a structured clinical summary.

PATIENT: ${patient.full_name}, ${patient.age || 'Unknown'} yrs, ${patient.gender || 'Unknown'}, ${patient.weight_kg ? patient.weight_kg + 'kg' : ''}, Diagnoses: ${patient.diagnosis?.join(', ')}

BP READINGS (recent first):
${bpSummary}
Average BP: ${avgSystolic && avgDiastolic ? `${avgSystolic}/${avgDiastolic} mmHg` : 'Insufficient data'}

BG READINGS (recent first):
${bgSummary}
Average Fasting BG: ${avgBG ? `${avgBG} mg/dL` : 'Insufficient data'}

ACTIVE MEDICATIONS:
${medSummary}

SIDE EFFECTS:
${seSummary}

Provide a structured clinical analysis:
1. OVERALL CONTROL — Controlled / Partially Controlled / Uncontrolled
2. BP TREND — Interpret against ESC/ESH 2023 targets (<130/80 mmHg)
3. BG TREND — Interpret against ADA 2024 targets. Estimate HbA1c if sufficient data
4. MEDICATION RESPONSE — Is current regimen achieving targets? Signs of resistance?
5. ADHERENCE — Based on logging frequency and patterns
6. SIDE EFFECT ANALYSIS — Attribute reported side effects to likely medications
7. RECOMMENDATIONS — Specific, actionable. Reference Nigerian formulary (amlodipine, lisinopril, HCTZ, metformin, glibenclamide)
8. RED FLAGS — Any urgent concerns

Be concise, evidence-based, and clinically practical.`

    // Try primary model, fall back to llama if unavailable on free tier
    const models = ['llama-3.3-70b-versatile', 'openai/gpt-oss-120b']
    let response: Response | null = null
    for (const model of models) {
      const attempt = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 1500,
      }),
      })
      if (attempt.ok) { response = attempt; break }
    }

    const result = response ? await response.json() : null
    const analysis = result?.choices?.[0]?.message?.content
    if (!analysis) return NextResponse.json({ error: 'AI analysis failed. Please try again.' }, { status: 500 })
    return NextResponse.json({ analysis })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
