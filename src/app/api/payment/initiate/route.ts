export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

export const PLANS = {
  standard:   { amount: 1500000, label: 'Standard',   patient_limit: 20  },
  growth:     { amount: 2000000, label: 'Growth',     patient_limit: 50  },
  enterprise: { amount: 3000000, label: 'Enterprise', patient_limit: 100 },
}

export async function POST(req: NextRequest) {
  try {
    const { email, full_name, plan } = await req.json()
    if (!email || !plan || !PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json({ error: 'Email and valid plan required' }, { status: 400 })
    }

    const paystackKey = process.env.PAYSTACK_SECRET_KEY
    if (!paystackKey) return NextResponse.json({ error: 'Payment service not configured' }, { status: 500 })

    const selectedPlan = PLANS[plan as keyof typeof PLANS]

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: selectedPlan.amount,
        currency: 'NGN',
        metadata: {
          full_name,
          plan,
          patient_limit: selectedPlan.patient_limit,
          custom_fields: [
            { display_name: 'Plan', variable_name: 'plan', value: selectedPlan.label },
            { display_name: 'Name', variable_name: 'full_name', value: full_name },
          ]
        },
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
        channels: ['card', 'bank', 'ussd', 'bank_transfer'],
      }),
    })

    const data = await response.json()
    if (!data.status) return NextResponse.json({ error: 'Failed to initialize payment' }, { status: 500 })

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
