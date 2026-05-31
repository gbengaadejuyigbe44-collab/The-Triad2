
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  analyzeBPTrend,
  analyzeBGTrend,
  assessMedicationEffectiveness,
  assessAdherence,
  computeRiskScore,
} from '@/lib/intelligence'
 
export const dynamic = 'force-dynamic'
 
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
 
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
 
  try {
    // Fetch all patients with active clinicians
    const { data: patients, error: patientsError } = await supabase
      .from('patients')
      .select('id, clinician_id, diagnosis, created_at')
 
    if (patientsError) throw patientsError
 
    let processed = 0
    let alerts = 0
 
    for (const patient of (patients || [])) {
      const diagnosisHTN = (patient.diagnosis || []).includes('HTN')
      const diagnosisDM = (patient.diagnosis || []).includes('DM')
 
      const daysSinceEnrollment = Math.floor(
        (Date.now() - new Date(patient.created_at).getTime()) / 86400000
      )
 
      // ── Fetch BP readings (90 days) ──────────────────────────────────────
      let bpTrend = null
      let latestSystolic: number | null = null
      let latestDiastolic: number | null = null
      let lastBPLoggedAt: string | null = null
      let medEffectiveness = { status: 'Insufficient data', weeksOnTreatment: 0, flagForReview: false }
      let bpAdherence = { pct: 100, status: 'Good', expectedReadings: 0, actualReadings: 0 }
 
      if (diagnosisHTN) {
        const d90 = new Date(Date.now() - 90 * 86400000).toISOString()
        const { data: bpReadings } = await supabase
          .from('bp_readings')
          .select('systolic, diastolic, logged_at')
          .eq('patient_id', patient.id)
          .gte('logged_at', d90)
          .order('logged_at', { ascending: false })
 
        if (bpReadings && bpReadings.length > 0) {
          latestSystolic = bpReadings[0].systolic
          latestDiastolic = bpReadings[0].diastolic
          lastBPLoggedAt = bpReadings[0].logged_at
          bpTrend = analyzeBPTrend(bpReadings)
 
          // Check medication start date
          const { data: meds } = await supabase
            .from('medications')
            .select('start_date')
            .eq('patient_id', patient.id)
            .eq('active', true)
            .order('start_date', { ascending: true })
            .limit(1)
 
          const medStartDate = meds?.[0]?.start_date || null
          medEffectiveness = assessMedicationEffectiveness(bpReadings, medStartDate) as any
 
          // Expected: once daily = 7/week for controlled, twice = 14/week for uncontrolled
          const expectedPerWeek = (latestSystolic ?? 0) >= 140 ? 14 : 7
          bpAdherence = assessAdherence(bpReadings.length, expectedPerWeek, daysSinceEnrollment) as any
 
          // Flag non-responder alert
          if ((medEffectiveness as any).flagForReview) {
            const existingAlert = await supabase
              .from('alerts')
              .select('id')
              .eq('patient_id', patient.id)
              .eq('type', 'NON_RESPONDER')
              .gte('created_at', new Date(Date.now() - 7 * 86400000).toISOString())
              .single()
 
            if (!existingAlert.data) {
              await supabase.from('alerts').insert({
                patient_id: patient.id,
                clinician_id: patient.clinician_id,
                type: 'NON_RESPONDER',
                message: `Medication review needed: patient has not responded to treatment after ${(medEffectiveness as any).weeksOnTreatment} weeks`,
                reading_value: `Avg systolic: ${Math.round(latestSystolic ?? 0)} mmHg`,
                severity: 'high',
                acknowledged: false,
              })
              alerts++
            }
          }
        }
 
        // Logging gap alert
        if (lastBPLoggedAt) {
          const daysSinceReading = Math.floor((Date.now() - new Date(lastBPLoggedAt).getTime()) / 86400000)
          if (daysSinceReading > 3) {
            const existingGapAlert = await supabase
              .from('alerts')
              .select('id')
              .eq('patient_id', patient.id)
              .eq('type', 'BP_GAP')
              .gte('created_at', new Date(Date.now() - 2 * 86400000).toISOString())
              .single()
 
            if (!existingGapAlert.data) {
              await supabase.from('alerts').insert({
                patient_id: patient.id,
                clinician_id: patient.clinician_id,
                type: 'BP_GAP',
                message: `No BP reading logged in ${daysSinceReading} days`,
                reading_value: null,
                severity: daysSinceReading > 7 ? 'high' : 'medium',
                acknowledged: false,
              })
              alerts++
            }
          }
        }
      }
 
      // ── Fetch BG readings (90 days) ──────────────────────────────────────
      let bgTrend = null
      let latestBG: number | null = null
      let lastBGLoggedAt: string | null = null
      let hba1cProxy: number | null = null
      let timeInRangePct: number | null = null
      let bgAdherence = { pct: 100, status: 'Good', expectedReadings: 0, actualReadings: 0 }
 
      if (diagnosisDM) {
        const d90 = new Date(Date.now() - 90 * 86400000).toISOString()
        const { data: bgReadings } = await supabase
          .from('bg_readings')
          .select('value_mgdl, logged_at')
          .eq('patient_id', patient.id)
          .gte('logged_at', d90)
          .order('logged_at', { ascending: false })
 
        if (bgReadings && bgReadings.length > 0) {
          latestBG = bgReadings[0].value_mgdl
          lastBGLoggedAt = bgReadings[0].logged_at
          const bgAnalysis = analyzeBGTrend(bgReadings)
          bgTrend = bgAnalysis
          hba1cProxy = bgAnalysis.hba1cProxy
          timeInRangePct = bgAnalysis.timeInRangePct
 
          // Expected: once daily fasting for oral, 3x for insulin (use once daily as default)
          bgAdherence = assessAdherence(bgReadings.length, 7, daysSinceEnrollment) as any
        }
 
        // BG logging gap
        if (lastBGLoggedAt) {
          const daysSinceReading = Math.floor((Date.now() - new Date(lastBGLoggedAt).getTime()) / 86400000)
          if (daysSinceReading > 3) {
            const existingGapAlert = await supabase
              .from('alerts')
              .select('id')
              .eq('patient_id', patient.id)
              .eq('type', 'BG_GAP')
              .gte('created_at', new Date(Date.now() - 2 * 86400000).toISOString())
              .single()
 
            if (!existingGapAlert.data) {
              await supabase.from('alerts').insert({
                patient_id: patient.id,
                clinician_id: patient.clinician_id,
                type: 'BG_GAP',
                message: `No BG reading logged in ${daysSinceReading} days`,
                reading_value: null,
                severity: daysSinceReading > 7 ? 'high' : 'medium',
                acknowledged: false,
              })
              alerts++
            }
          }
        }
      }
 
      // ── Compute risk score (Layer 3) ─────────────────────────────────────
      const riskResult = computeRiskScore({
        latestSystolic,
        latestDiastolic,
        latestBG,
        bpTrajectory: bpTrend?.trajectory || 'Insufficient data',
        bgTrajectory: (bgTrend as any)?.trajectory || 'Insufficient data',
        adherencePct: Math.min(bpAdherence.pct, bgAdherence.pct),
        lastBPLoggedAt,
        lastBGLoggedAt,
        diagnosisHTN,
        diagnosisDM,
        medicationEffectiveness: (medEffectiveness as any).status,
      })
 
      // ── Upsert patient_analytics ─────────────────────────────────────────
      await supabase.from('patient_analytics').upsert({
        patient_id: patient.id,
        bp_avg_7d_systolic: bpTrend?.systolic.avg7d ?? null,
        bp_avg_7d_diastolic: bpTrend?.diastolic.avg7d ?? null,
        bp_avg_30d_systolic: bpTrend?.systolic.avg30d ?? null,
        bp_avg_30d_diastolic: bpTrend?.diastolic.avg30d ?? null,
        bp_trajectory: bpTrend?.trajectory ?? null,
        bg_avg_7d: (bgTrend as any)?.avg7d ?? null,
        bg_avg_30d: (bgTrend as any)?.avg30d ?? null,
        bg_trajectory: (bgTrend as any)?.trajectory ?? null,
        hba1c_proxy: hba1cProxy,
        time_in_range_pct: timeInRangePct,
        medication_effectiveness: (medEffectiveness as any).status,
        adherence_pct: Math.min(bpAdherence.pct, bgAdherence.pct),
        risk_score: riskResult.score,
        last_bp_logged_at: lastBPLoggedAt,
        last_bg_logged_at: lastBGLoggedAt,
        computed_at: new Date().toISOString(),
      }, { onConflict: 'patient_id' })
 
      processed++
    }
 
    return NextResponse.json({
      success: true,
      patientsProcessed: processed,
      alertsGenerated: alerts,
      computedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Analyze cron error:', err)
    return NextResponse.json({ error: 'Cron job failed', detail: String(err) }, { status: 500 })
  }
}
 
