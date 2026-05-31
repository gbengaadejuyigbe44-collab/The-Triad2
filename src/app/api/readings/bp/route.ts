import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { classifyBP } from '@/lib/intelligence'
import { sendCrisisAlert } from '@/lib/email'
 
export const dynamic = 'force-dynamic'
 
export async function POST(req: NextRequest) {
  try {
    const { token, systolic, diastolic, pulse, notes } = await req.json()
 
    if (!token || !systolic || !diastolic) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
 
    const sys = parseInt(systolic)
    const dia = parseInt(diastolic)
 
    if (isNaN(sys) || isNaN(dia) || sys < 50 || sys > 300 || dia < 30 || dia > 200) {
      return NextResponse.json({ error: 'Invalid BP values' }, { status: 400 })
    }
 
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
 
    // Validate token and get patient
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('id, full_name, clinician_id, diagnosis')
      .eq('portal_token', token)
      .single()
 
    if (patientError || !patient) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
 
    // Insert the reading
    const { error: insertError } = await supabase
      .from('bp_readings')
      .insert({
        patient_id: patient.id,
        systolic: sys,
        diastolic: dia,
        pulse: pulse ? parseInt(pulse) : null,
        notes: notes || null,
        logged_at: new Date().toISOString(),
      })
 
    if (insertError) {
      return NextResponse.json({ error: 'Failed to save reading' }, { status: 500 })
    }
 
    // Layer 1 — classify the reading
    const classification = classifyBP(sys, dia)
 
    // Crisis alert — notify clinician immediately
    if (classification.isCrisis) {
      // Create alert record
      await supabase.from('alerts').insert({
        patient_id: patient.id,
        clinician_id: patient.clinician_id,
        type: 'BP_CRISIS',
        message: `${patient.full_name} logged a crisis BP reading: ${sys}/${dia} mmHg (${classification.category})`,
        reading_value: `${sys}/${dia} mmHg`,
        severity: 'critical',
        acknowledged: false,
      })
 
      // Get clinician email for notification
      const { data: clinician } = await supabase
        .from('clinicians')
        .select('email, full_name')
        .eq('id', patient.clinician_id)
        .single()
 
      if (clinician) {
        await sendCrisisAlert({
          clinicianEmail: clinician.email,
          clinicianName: clinician.full_name,
          patientName: patient.full_name,
          alertType: 'BP',
          reading: `${sys}/${dia} mmHg`,
          category: classification.category,
          recommendation: classification.recommendation,
        })
      }
    }
 
    return NextResponse.json({
      success: true,
      classification: {
        category: classification.category,
        color: classification.color,
        isCrisis: classification.isCrisis,
        isCaution: classification.isCaution,
        recommendation: classification.recommendation,
      },
    })
  } catch (err) {
    console.error('BP reading route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
