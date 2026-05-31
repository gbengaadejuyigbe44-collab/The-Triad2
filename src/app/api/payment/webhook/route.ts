import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'
import { sendWelcomeEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

const PLANS: Record<string, { patient_limit: number }> = {
  standard:   { patient_limit: 20  },
  growth:     { patient_limit: 50  },
  enterprise: { patient_limit: 100 },
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()

    const signature = req.headers.get('x-paystack-signature')
    const paystackKey = process.env.PAYSTACK_SECRET_KEY

    if (!signature || !paystackKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const hash = crypto.createHmac('sha512', paystackKey).update(body).digest('hex')
    if (!crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature))) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)

    if (event.event !== 'charge.success') {
      return NextResponse.json({ received: true })
    }

    // Get email from customer object (Paystack puts it here)
    const email = event.data?.email || event.data?.customer?.email
    const metadata = event.data?.metadata
    const full_name = metadata?.full_name
    let plan = metadata?.plan
    if (!plan && metadata?.custom_fields) {
      const planField = metadata.custom_fields.find((f: any) => f.variable_name === 'plan')
      if (planField) plan = planField.value?.toLowerCase()
    }

    if (!email || !plan || !PLANS[plan]) {
      console.error('Webhook: missing or invalid payload', { email, plan })
      return NextResponse.json({ received: true })
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    const patientLimit = PLANS[plan].patient_limit

    // Check if clinician row already exists
    const { data: existing } = await supabaseAdmin
      .from('clinicians')
      .select('id')
      .eq('email', email)
      .single()

    if (existing) {
      // Existing clinician — just update their plan
      await supabaseAdmin.from('clinicians').update({
        plan,
        patient_limit: patientLimit,
        plan_expires_at: expiresAt,
      }).eq('id', existing.id)

      await sendWelcomeEmail({ email, fullName: full_name || email, plan, patientLimit, expiresAt, isNew: false })

    } else {
      // No clinician row yet — check if auth user already exists
      const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers()
      const existingAuthUser = authUsers?.users?.find(u => u.email === email)

      let userId: string
      let tempPassword: string | null = null

      if (existingAuthUser) {
        // Auth user exists — use their existing UUID, just create the clinician row
        userId = existingAuthUser.id
      } else {
        // No auth user — create one
        tempPassword = crypto.randomBytes(12).toString('base64url').slice(0, 16)
        const { data: newUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email,
          password: tempPassword,
          email_confirm: true,
        })

        if (authError || !newUser?.user) {
          console.error('Webhook: failed to create auth user', authError)
          return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
        }
        userId = newUser.user.id
      }

      const { error: insertError } = await supabaseAdmin.from('clinicians').insert({
        id: userId,
        email,
        full_name: full_name || email,
        plan,
        patient_limit: patientLimit,
        plan_expires_at: expiresAt,
      })

      if (insertError) {
        console.error('Webhook: failed to insert clinician', insertError)
        return NextResponse.json({ error: 'Failed to save clinician' }, { status: 500 })
      }

      await sendWelcomeEmail({ 
        email, 
        fullName: full_name || email, 
        plan, 
        patientLimit, 
        expiresAt, 
        isNew: !existingAuthUser  // only truly new if we created the auth user
      })
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
