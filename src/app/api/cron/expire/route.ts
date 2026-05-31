import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendExpiryNotice } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Missing Supabase config' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    const { data: expired, error } = await (supabase as any)
      .from('clinicians')
      .select('id, email, full_name, plan')
      .not('plan', 'is', null)
      .lt('plan_expires_at', new Date().toISOString())

    if (error) throw error

    let disabledCount = 0

    for (const clinician of (expired || []) as any[]) {
      await (supabase as any).from('clinicians').update({
        plan: null,
        plan_expires_at: null,
        patient_limit: 0,
      }).eq('id', clinician.id)

      await sendExpiryNotice({ email: clinician.email, fullName: clinician.full_name })
      disabledCount++
    }

    return NextResponse.json({
      success: true,
      message: `Disabled ${disabledCount} expired subscription(s)`,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 })
  }
}
