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

    // ── Rate limit: 20 DDI checks per hour per clinician ────────────────────
    if (!checkRateLimit(`ddi:${user.id}`, 20)) return rateLimitResponse()

    const { medications } = await req.json()
    if (!medications || medications.length < 2) {
      return NextResponse.json({ error: 'At least 2 medications required for DDI check' }, { status: 400 })
    }

    // Cap at 20 medications to prevent prompt injection via huge payload
    const safeMeds = medications.slice(0, 20)

    const groqKey = process.env.GROQ_API_KEY
    if (!groqKey) return NextResponse.json({ error: 'AI service not configured' }, { status: 500 })

    const medList = safeMeds.map((m: any) =>
      `${String(m.drug_name).slice(0, 100)} ${String(m.dose).slice(0, 50)} ${String(m.frequency || '').slice(0, 50)}`
    ).join('\n')

    const prompt = `You are a clinical pharmacology AI for a Nigerian healthcare platform called The Triad.

Perform a comprehensive drug-drug interaction (DDI) check for the following medication combination:

MEDICATIONS:
${medList}

For each clinically significant interaction found, provide:
1. DRUG PAIR — The two drugs interacting
2. SEVERITY — Major / Moderate / Minor
3. MECHANISM — Brief pharmacological explanation
4. CLINICAL EFFECT — What happens to the patient
5. MANAGEMENT — What the clinician should do (monitor, avoid, adjust dose, timing, etc.)

Focus on interactions that are:
- Clinically relevant in Nigerian private practice settings
- Relevant to hypertension and diabetes management
- Actionable by the prescribing clinician

If no significant interactions are found, state clearly: "No significant drug-drug interactions identified for this combination."

End with an OVERALL RISK ASSESSMENT: Low / Moderate / High risk combination.`

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
        temperature: 0.2,
        max_tokens: 1200,
      }),
      })
      if (attempt.ok) { response = attempt; break }
    }

    const result = response ? await response.json() : null
    const report = result?.choices?.[0]?.message?.content
    if (!report) return NextResponse.json({ error: 'DDI check failed. Please try again.' }, { status: 500 })
    return NextResponse.json({ report })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
