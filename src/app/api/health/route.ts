export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const start = Date.now()
  const checks: Record<string, string> = {}

  // Check Supabase connectivity
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await supabase.from('clinicians').select('id').limit(1)
    checks.database = 'ok'
  } catch {
    checks.database = 'error'
  }

  // Check Groq
  checks.groq = process.env.GROQ_API_KEY ? 'configured' : 'missing'

  // Check Paystack
  checks.paystack = process.env.PAYSTACK_SECRET_KEY ? 'configured' : 'missing'

  // Check Resend
  checks.email = process.env.RESEND_API_KEY ? 'configured' : 'missing'

  const healthy = checks.database === 'ok'
  const duration = Date.now() - start

  return NextResponse.json(
    { status: healthy ? 'ok' : 'degraded', checks, duration_ms: duration, timestamp: new Date().toISOString() },
    { status: healthy ? 200 : 503 }
  )
}
