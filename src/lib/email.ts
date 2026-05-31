const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM = 'The Triad <noreply@the-triad2.vercel.app>'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://the-triad2.vercel.app'

async function send(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — email not sent')
    return
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  })
  if (!res.ok) {
    const err = await res.text()
    console.error('Resend error:', err)
  }
}

function base(content: string) {
  return `
    <div style="font-family:Inter,sans-serif;background:#0f172a;color:#f1f5f9;max-width:560px;margin:0 auto;padding:32px;border-radius:16px">
      <div style="margin-bottom:28px">
        <span style="color:#0ea5e9;font-size:20px;font-weight:700">⚕ The Triad</span>
      </div>
      ${content}
      <div style="margin-top:32px;padding-top:20px;border-top:1px solid #1e293b;color:#475569;font-size:12px">
        The Triad Clinical Decision Support · Nigeria<br/>
        <a href="${APP_URL}/reference" style="color:#0ea5e9;text-decoration:none">Clinical Reference</a> &nbsp;·&nbsp;
        <a href="${APP_URL}/pricing" style="color:#0ea5e9;text-decoration:none">Plans</a>
      </div>
    </div>
  `
}

function btn(href: string, text: string, color = '#0ea5e9') {
  return `<a href="${href}" style="display:inline-block;background:${color};color:white;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;margin-top:16px">${text}</a>`
}

// ── Welcome email after subscription payment ──────────────────────────────────
export async function sendWelcomeEmail({
  email,
  fullName,
  plan,
  patientLimit,
  expiresAt,
  isNew,
}: {
  email: string
  fullName: string
  plan: string
  patientLimit: number
  expiresAt: string
  isNew: boolean
}) {
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1)
  const expiry = new Date(expiresAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })

  const subject = isNew
    ? `Welcome to The Triad, ${fullName || 'Doctor'} — your account is ready`
    : `Your Triad ${planLabel} subscription is active`

  const html = base(`
    <h2 style="color:#f1f5f9;font-size:22px;margin:0 0 8px">
      ${isNew ? `Welcome, ${fullName || 'Doctor'} 👋` : `Subscription renewed, ${fullName || 'Doctor'} ✓`}
    </h2>
    <p style="color:#94a3b8;margin:0 0 20px">
      ${isNew
        ? 'Your Triad account has been created and your subscription is now active.'
        : `Your ${planLabel} subscription has been renewed successfully.`}
    </p>

    <div style="background:#1e293b;border-radius:12px;padding:20px;margin-bottom:20px">
      <div style="display:grid;gap:10px">
        ${[
          ['Plan', `${planLabel}`],
          ['Patient Slots', `${patientLimit} patients`],
          ['Valid Until', expiry],
          ['Email', email],
        ].map(([k, v]) => `
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #334155">
            <span style="color:#64748b;font-size:13px">${k}</span>
            <span style="color:#f1f5f9;font-size:13px;font-weight:600">${v}</span>
          </div>
        `).join('')}
      </div>
    </div>

    ${isNew ? `
    <div style="background:#0c1a2e;border:1px solid #0ea5e9;border-radius:10px;padding:16px;margin-bottom:20px">
      <p style="color:#0ea5e9;font-size:13px;font-weight:600;margin:0 0 4px">Your login details</p>
      <p style="color:#94a3b8;font-size:13px;margin:0">Email: <strong style="color:#f1f5f9">${email}</strong></p>
      <p style="color:#94a3b8;font-size:13px;margin:4px 0 0">
        A password setup link has been sent separately by Supabase. Check your inbox.
      </p>
    </div>
    ` : ''}

    ${btn(`${APP_URL}/dashboard`, 'Go to Dashboard →')}

    <p style="color:#475569;font-size:12px;margin-top:20px">
      Questions? Reply to this email and we will get back to you.
    </p>
  `)

  await send(email, subject, html)
}

// ── Patient portal credentials email ─────────────────────────────────────────
export async function sendPatientCredentials({
  patientEmail,
  patientName,
  clinicianName,
  portalToken,
  portalPassword,
  diagnosis,
}: {
  patientEmail: string
  patientName: string
  clinicianName: string
  portalToken: string
  portalPassword: string
  diagnosis: string[]
}) {
  const portalUrl = `${APP_URL}/portal?token=${portalToken}`
  const diagLabel = diagnosis.join(' & ')
  const firstName = patientName.split(' ')[0]

  const html = base(`
    <h2 style="color:#f1f5f9;font-size:22px;margin:0 0 8px">
      Welcome to The Triad, ${firstName}
    </h2>
    <p style="color:#94a3b8;margin:0 0 20px">
      ${clinicianName} has enrolled you in The Triad remote monitoring programme for <strong style="color:#f1f5f9">${diagLabel}</strong>.
      You can now log your readings from anywhere — your doctor will be notified immediately if anything needs attention.
    </p>

    <div style="background:#0c1a2e;border:2px solid #0ea5e9;border-radius:12px;padding:20px;margin-bottom:20px">
      <p style="color:#0ea5e9;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 12px">Your login details</p>
      <div style="margin-bottom:10px">
        <p style="color:#64748b;font-size:12px;margin:0 0 2px">Email</p>
        <p style="color:#f1f5f9;font-size:14px;font-weight:600;margin:0">${patientEmail}</p>
      </div>
      <div style="margin-bottom:10px">
        <p style="color:#64748b;font-size:12px;margin:0 0 2px">Password</p>
        <p style="color:#f1f5f9;font-size:14px;font-weight:600;margin:0;letter-spacing:0.05em">${portalPassword}</p>
      </div>
      <div>
        <p style="color:#64748b;font-size:12px;margin:0 0 2px">Your portal link</p>
        <p style="color:#0ea5e9;font-size:12px;margin:0;word-break:break-all">${portalUrl}</p>
      </div>
    </div>

    <div style="background:#1e293b;border-radius:12px;padding:20px;margin-bottom:20px">
      <p style="color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 12px">What you can do in your portal</p>
      ${diagnosis.includes('HTN') ? `<p style="color:#f1f5f9;font-size:13px;margin:0 0 8px">🫀 Log your blood pressure readings</p>` : ''}
      ${diagnosis.includes('DM') ? `<p style="color:#f1f5f9;font-size:13px;margin:0 0 8px">🩸 Log your blood glucose readings</p>` : ''}
      <p style="color:#f1f5f9;font-size:13px;margin:0 0 8px">💊 View your medications</p>
      <p style="color:#f1f5f9;font-size:13px;margin:0">⚠️ Report side effects</p>
    </div>

    ${btn(portalUrl, 'Open My Health Portal →', '#0ea5e9')}

    <p style="color:#475569;font-size:12px;margin-top:20px">
      If the button doesn't work, copy this link into your browser:<br/>
      <span style="color:#0ea5e9">${portalUrl}</span>
    </p>
  `)

  await send(patientEmail, `${clinicianName} has set up your health monitoring portal`, html)
}

// ── Subscription expiry warning ───────────────────────────────────────────────
export async function sendExpiryWarning({
  email,
  fullName,
  daysLeft,
}: {
  email: string
  fullName: string
  daysLeft: number
}) {
  const html = base(`
    <h2 style="color:#f59e0b;font-size:22px;margin:0 0 8px">
      Your subscription expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}
    </h2>
    <p style="color:#94a3b8;margin:0 0 20px">
      Hi ${fullName || 'Doctor'}, your Triad subscription will expire soon. Renew now to keep monitoring your patients without interruption.
    </p>
    <p style="color:#94a3b8;font-size:13px;margin:0 0 20px">
      Your patient data is safe — it will never be deleted. But once your subscription expires, you will lose access to the dashboard until you renew.
    </p>
    ${btn(`${APP_URL}/pricing`, 'Renew Subscription →', '#f59e0b')}
  `)

  await send(email, `Action needed: Your Triad subscription expires in ${daysLeft} days`, html)
}

// ── Subscription expired ──────────────────────────────────────────────────────
export async function sendExpiryNotice({
  email,
  fullName,
}: {
  email: string
  fullName: string
}) {
  const html = base(`
    <h2 style="color:#ef4444;font-size:22px;margin:0 0 8px">
      Your subscription has expired
    </h2>
    <p style="color:#94a3b8;margin:0 0 20px">
      Hi ${fullName || 'Doctor'}, your Triad subscription has expired and your dashboard access has been paused.
    </p>
    <div style="background:#1e293b;border-radius:12px;padding:16px;margin-bottom:20px">
      <p style="color:#f1f5f9;font-size:13px;margin:0">✓ Your patient data is completely safe</p>
      <p style="color:#f1f5f9;font-size:13px;margin:8px 0 0">✓ Everything will be restored the moment you renew</p>
    </div>
    ${btn(`${APP_URL}/pricing`, 'Renew Now →', '#ef4444')}
  `)

  await send(email, 'Your Triad subscription has expired — renew to restore access', html)
}

// ── Crisis alert to clinician ─────────────────────────────────────────────────
export async function sendCrisisAlert({
  clinicianEmail,
  clinicianName,
  patientName,
  alertType,
  reading,
  category,
  recommendation,
}: {
  clinicianEmail: string
  clinicianName: string
  patientName: string
  alertType: 'BP' | 'BG'
  reading: string
  category: string
  recommendation: string
}) {
  const icon = alertType === 'BP' ? '🫀' : '💉'

  const html = base(`
    <div style="background:#1a0a0a;border:2px solid #dc2626;border-radius:12px;padding:20px;margin-bottom:24px">
      <p style="color:#dc2626;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px">
        ⚠ Crisis Alert — Immediate Attention Required
      </p>
      <h2 style="color:#f1f5f9;font-size:20px;margin:0 0 4px">
        ${icon} ${patientName}
      </h2>
      <p style="color:#94a3b8;font-size:13px;margin:0">
        logged a crisis ${alertType === 'BP' ? 'blood pressure' : 'blood glucose'} reading
      </p>
    </div>

    <div style="background:#1e293b;border-radius:12px;padding:20px;margin-bottom:20px">
      <p style="color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 12px">Reading Details</p>
      <p style="color:#f1f5f9;font-size:24px;font-weight:700;margin:0 0 4px">${reading}</p>
      <p style="color:#dc2626;font-size:14px;font-weight:600;margin:0 0 16px">${category}</p>
      <p style="color:#94a3b8;font-size:13px;margin:0"><strong style="color:#f1f5f9">Recommendation:</strong> ${recommendation}</p>
    </div>

    <p style="color:#94a3b8;font-size:13px;margin:0 0 20px">
      Hi ${clinicianName || 'Doctor'}, this patient needs your immediate attention. Please review their recent readings and contact them as soon as possible.
    </p>

    ${btn(`${APP_URL}/dashboard`, 'Open Dashboard →', '#dc2626')}

    <p style="color:#475569;font-size:11px;margin-top:24px">
      This alert was generated automatically by The Triad Intelligence Engine at ${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })} WAT.
    </p>
  `)

  await send(clinicianEmail, `⚠ Crisis Alert: ${patientName} — ${category}`, html)
}
