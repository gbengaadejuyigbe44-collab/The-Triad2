import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { sendPatientCredentials } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {},
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { full_name, diagnosis, portal_email, age, gender, weight_kg, height_cm } = body

    if (!full_name || !diagnosis?.length || !portal_email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check plan limit
    const { data: clinician } = await (supabase as any)
      .from('clinicians')
      .select('patient_limit, full_name')
      .eq('id', session.user.id)
      .single()

    const { count } = await supabase
      .from('patients')
      .select('*', { count: 'exact', head: true })
      .eq('clinician_id', session.user.id)

    if (clinician?.patient_limit && count !== null && count >= clinician.patient_limit) {
      return NextResponse.json({
        error: `You have reached your plan limit of ${clinician.patient_limit} patients.`
      }, { status: 403 })
    }

    // Generate portal token and password
    const { randomBytes } = await import('crypto')
    const portalToken = randomBytes(24).toString('hex')
    const portalPassword = randomBytes(4).toString('hex').toUpperCase() // e.g. A3F1B2C4

    // Insert patient
    const { data: patient, error: insertError } = await (supabase as any)
      .from('patients')
      .insert({
        clinician_id: session.user.id,
        full_name: full_name.trim(),
        age: age ? parseInt(age) : null,
        gender: gender || null,
        weight_kg: weight_kg ? parseFloat(weight_kg) : null,
        height_cm: height_cm ? parseFloat(height_cm) : null,
        diagnosis,
        portal_email: portal_email.trim(),
        portal_token: portalToken,
        portal_password: portalPassword,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ error: 'Failed to create patient' }, { status: 500 })
    }

    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://the-triad2.vercel.app'
    const portalLink = `${APP_URL}/portal?token=${portalToken}`

    // Send portal credentials email
    await sendPatientCredentials({
      patientEmail: portal_email.trim(),
      patientName: full_name.trim(),
      clinicianName: clinician?.full_name || 'Your doctor',
      portalToken,
      portalPassword,
      diagnosis,
    })

    return NextResponse.json({ patient, portalLink })
  } catch (err) {
    console.error('Patient creation error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
