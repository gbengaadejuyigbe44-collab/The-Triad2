import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { classifyBG } from '@/lib/intelligence'
import { sendCrisisAlert } from '@/lib/email'
 
export const dynamic = 'force-dynamic'
 
export async function POST(req: NextRequest) {
  try {
    const { token, value_mgdl, reading_type, notes } = await req.json()
 
    if (!token || !value_mgdl || !reading_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
 
    const value = parseFloat(value_mgdl)
 
    if (isNaN(value) || value < 10 || value > 1500) {
      return NextResponse.json({ error: 'Invalid BG value' }, { status: 400 })
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
      .from('bg_readings')
      .insert({
        patient_id: patient.id,
        value_mgdl: value,
        reading_type,
        notes: notes || null,
        logged_at: new Date().toISOString(),
      })
 
    if (insertError) {
      return NextResponse.json({ error: 'Failed to save reading' }, { status: 500 })
    }
 
    // Layer 1 — classify the reading
    const classification = classifyBG(value, reading_type)
 
    // Crisis alert — notify clinician immediately
    if (classification.isCrisis) {
      const alertType = value < 54 ? 'BG_HYPO_CRISIS' : 'BG_HYPER_CRISIS'
 
      await supabase.from('alerts').insert({
        patient_id: patient.id,
        clinician_id: patient.clinician_id,
        type: alertType,
        message: `${patient.full_name} logged a crisis BG reading: ${value} mg/dL (${classification.category})`,
        reading_value: `${value} mg/dL`,
        severity: 'critical',
        acknowledged: false,
      })
 
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
          alertType: 'BG',
          reading: `${value} mg/dL (${reading_type})`,
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
    console.error('BG reading route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
