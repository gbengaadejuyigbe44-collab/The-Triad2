'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ThemeToggle } from '@/components/theme-toggle'
import { Users, HeartPulse, Activity, Syringe, Clock, ChevronRight, AlertTriangle, Info, CheckCircle2, LayoutDashboard, Settings, UserPlus, Phone, UserCircle, Search } from 'lucide-react'

type Patient = {
  id: string
  full_name: string
  age: number | null
  gender: string | null
  diagnosis: string[]
  created_at: string
}

type Clinician = {
  id: string
  email: string
  full_name: string
  plan: string | null
  plan_expires_at: string | null
  patient_limit: number | null
}

type FlaggedPatient = {
  patient: Patient
  urgency: 'CRISIS' | 'HIGH' | 'MEDIUM'
  reason: string
  lastReading: string
  currentMeds: string
  suggestedAction: string
}

type Room = 'all' | 'htn' | 'dm' | 'both'

const PLAN_COLORS: Record<string, string> = {
  standard: '#0ea5e9',
  growth: '#a855f7',
  enterprise: '#22c55e',
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

function urgencyColor(u: string) {
  if (u === 'CRISIS') return 'var(--color-accent-red)'
  if (u === 'HIGH') return '#d97706' // amber
  return 'var(--color-accent-blue)'
}

function urgencyBg(u: string) {
  if (u === 'CRISIS') return 'color-mix(in srgb, var(--color-accent-red) 12%, transparent)'
  if (u === 'HIGH') return 'rgba(217,119,6,0.12)'
  return 'color-mix(in srgb, var(--color-accent-blue) 12%, transparent)'
}

function urgencyBorder(u: string) {
  if (u === 'CRISIS') return 'color-mix(in srgb, var(--color-accent-red) 30%, transparent)'
  if (u === 'HIGH') return 'rgba(217,119,6,0.3)'
  return 'color-mix(in srgb, var(--color-accent-blue) 30%, transparent)'
}

function TrackerLogo() {
  return (
    <svg viewBox="0 0 64 64" width="34" height="34" className="drop-shadow-lg transition-transform group-hover:scale-105">
      <circle cx="32" cy="32" r="32" className="fill-[var(--color-bg-elevated)]" />
      <line x1="32" y1="8" x2="54" y2="44" stroke="var(--color-accent-blue)" strokeWidth="3" strokeLinecap="round" />
      <line x1="54" y1="44" x2="10" y2="44" stroke="var(--color-accent-purple)" strokeWidth="3" strokeLinecap="round" />
      <line x1="10" y1="44" x2="32" y2="8" stroke="var(--color-accent-red)" strokeWidth="3" strokeLinecap="round" />
      <polyline
        points="15,29 19,29 22,19 25,37 28,23 31,29 35,29 38,15 41,36 44,29 48,29"
        fill="none"
        stroke="var(--color-text-primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Dashboard() {
  const router = useRouter()
  const [clinician, setClinician] = useState<Clinician | null>(null)
  const [patients, setPatients] = useState<Patient[]>([])
  const [flagged, setFlagged] = useState<FlaggedPatient[]>([])
  const [controlRate, setControlRate] = useState<number | null>(null)
  const [controlDelta, setControlDelta] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [room, setRoom] = useState<Room>('all')
  const [search, setSearch] = useState('')
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/auth'); return }

      const [{ data: c }, { data: p }] = await Promise.all([
        supabase.from('clinicians').select('*').eq('id', session.user.id).single(),
        supabase.from('patients').select('*').eq('clinician_id', session.user.id).order('created_at', { ascending: false }),
      ])

      setClinician(c)
      const pts = p || []
      setPatients(pts)

      if (pts.length > 0) {
        await buildPriorityQueue(pts, session.user.id)
      }
      setLoading(false)
    }
    load()
  }, [router])

  async function buildPriorityQueue(pts: Patient[], clinicianId: string) {
    const ids = pts.map(p => p.id)
    const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

    const [{ data: bpAll }, { data: bgAll }, { data: medsAll }] = await Promise.all([
      supabase.from('bp_readings').select('patient_id,systolic,diastolic,logged_at').in('patient_id', ids).gte('logged_at', since7d).order('logged_at', { ascending: false }),
      supabase.from('bg_readings').select('patient_id,value_mgdl,reading_type,logged_at').in('patient_id', ids).gte('logged_at', since7d).order('logged_at', { ascending: false }),
      supabase.from('medications').select('patient_id,drug_name,dose').in('patient_id', ids).eq('active', true),
    ])

    const flaggedList: FlaggedPatient[] = []
    let controlled = 0
    let prevControlled = 0

    for (const pt of pts) {
      const bp = (bpAll || []).filter((r: any) => r.patient_id === pt.id)
      const bg = (bgAll || []).filter((r: any) => r.patient_id === pt.id)
      const meds = (medsAll || []).filter((m: any) => m.patient_id === pt.id)
      const medStr = meds.map((m: any) => `${m.drug_name} ${m.dose}`).join(', ') || 'None recorded'

      const hasHTN = pt.diagnosis.includes('HTN')
      const hasDM = pt.diagnosis.includes('DM')

      const crisisBP = bp.filter((r: any) => r.systolic >= 180 || r.diastolic >= 120)
      const crisisBG = bg.filter((r: any) => r.value_mgdl > 400 || r.value_mgdl < 54)
      const overnightBP = crisisBP.filter((r: any) => r.logged_at >= since24h)
      const overnightBG = crisisBG.filter((r: any) => r.value_mgdl > 400 || r.value_mgdl < 54).filter((r: any) => r.logged_at >= since24h)

      const avgSys = bp.length ? Math.round(bp.reduce((s: number, r: any) => s + r.systolic, 0) / bp.length) : null
      const avgDia = bp.length ? Math.round(bp.reduce((s: number, r: any) => s + r.diastolic, 0) / bp.length) : null
      const avgBG = bg.length ? Math.round(bg.reduce((s: number, r: any) => s + r.value_mgdl, 0) / bg.length) : null

      const bpOk = !hasHTN || (avgSys !== null && avgSys < 140 && avgDia !== null && avgDia < 90)
      const bgOk = !hasDM || (avgBG !== null && avgBG < 180)
      if (bpOk && bgOk) controlled++
      if (bpOk && bgOk) prevControlled++

      if (overnightBP.length > 0 || overnightBG.length > 0) {
        const r = overnightBP[0] || overnightBG[0]
        const reading = overnightBP[0]
          ? `${overnightBP[0].systolic}/${overnightBP[0].diastolic} mmHg`
          : `${(overnightBG[0] as any).value_mgdl} mg/dL`
        flaggedList.push({
          patient: pt,
          urgency: 'CRISIS',
          reason: `Crisis reading logged at ${new Date((r as any).logged_at).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })} — immediate attention required`,
          lastReading: reading,
          currentMeds: medStr,
          suggestedAction: overnightBP.length > 0 ? 'Hypertensive crisis — call patient now' : 'Glycaemic crisis — call patient now',
        })
        continue
      }

      if (crisisBP.length > 0) {
        flaggedList.push({
          patient: pt,
          urgency: 'HIGH',
          reason: `${crisisBP.length} crisis BP reading${crisisBP.length > 1 ? 's' : ''} this week`,
          lastReading: `${bp[0]?.systolic}/${bp[0]?.diastolic} mmHg`,
          currentMeds: medStr,
          suggestedAction: 'Medication review — consider dose escalation or adding an ARB',
        })
        continue
      }

      if (crisisBG.length > 0) {
        flaggedList.push({
          patient: pt,
          urgency: 'HIGH',
          reason: `${crisisBG.length} crisis BG reading${crisisBG.length > 1 ? 's' : ''} this week`,
          lastReading: `${bg[0]?.value_mgdl} mg/dL (${bg[0]?.reading_type})`,
          currentMeds: medStr,
          suggestedAction: 'Glycaemic management review — consider insulin adjustment',
        })
        continue
      }

      if (avgSys !== null && avgDia !== null && (avgSys >= 140 || avgDia >= 90)) {
        flaggedList.push({
          patient: pt,
          urgency: 'MEDIUM',
          reason: `7-day average BP ${avgSys}/${avgDia} mmHg — above target`,
          lastReading: `${bp[0]?.systolic}/${bp[0]?.diastolic} mmHg`,
          currentMeds: medStr,
          suggestedAction: 'Review current antihypertensive regimen',
        })
        continue
      }

      if (avgBG !== null && avgBG >= 180) {
        flaggedList.push({
          patient: pt,
          urgency: 'MEDIUM',
          reason: `7-day average BG ${avgBG} mg/dL — above target`,
          lastReading: `${bg[0]?.value_mgdl} mg/dL (${bg[0]?.reading_type})`,
          currentMeds: medStr,
          suggestedAction: 'Review glycaemic management plan',
        })
      }
    }

    flaggedList.sort((a, b) => {
      const order = { CRISIS: 0, HIGH: 1, MEDIUM: 2 }
      return order[a.urgency] - order[b.urgency]
    })

    setFlagged(flaggedList)
    const rate = pts.length > 0 ? Math.round((controlled / pts.length) * 100) : 0
    const prevRate = pts.length > 0 ? Math.round((prevControlled / pts.length) * 100) : 0
    setControlRate(rate)
    setControlDelta(rate - prevRate)
  }

  const htnPatients = patients.filter(p => p.diagnosis.includes('HTN') && !p.diagnosis.includes('DM'))
  const dmPatients = patients.filter(p => p.diagnosis.includes('DM') && !p.diagnosis.includes('HTN'))
  const bothPatients = patients.filter(p => p.diagnosis.includes('HTN') && p.diagnosis.includes('DM'))

  const roomFiltered = room === 'htn' ? htnPatients : room === 'dm' ? dmPatients : room === 'both' ? bothPatients : patients
  const displayPatients = search.trim()
    ? roomFiltered.filter(p => p.full_name.toLowerCase().includes(search.toLowerCase()))
    : roomFiltered

  const usedSlots = patients.length
  const totalSlots = clinician?.patient_limit || 0
  const slotsLeft = totalSlots - usedSlots
  const planExpired = clinician?.plan_expires_at && new Date(clinician.plan_expires_at) < new Date()
  const planColor = clinician?.plan ? PLAN_COLORS[clinician.plan] || 'var(--color-accent-blue)' : 'var(--color-accent-blue)'
  const fillPercent = totalSlots > 0 ? Math.min((usedSlots / totalSlots) * 100, 100) : 0
  const stableCount = patients.length - flagged.length

  if (loading) {
    return (
      <div className="tracker-shell flex items-center justify-center px-6 min-h-screen">
        <div className="tracker-grid" />
        <div className="tracker-card flex w-full max-w-sm flex-col items-center gap-6 px-8 py-12 text-center relative z-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[var(--color-accent-blue)] opacity-20 blur-xl rounded-full"></div>
            <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-[var(--color-border)] border-t-[var(--color-accent-blue)]" aria-hidden="true" />
          </div>
          <div>
            <p className="text-lg font-bold text-[var(--color-text-primary)]">Preparing Workspace</p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Loading patients, priority queues, and plan data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="tracker-shell min-h-screen">
      <div className="tracker-grid" />

      {planExpired && (
        <div className={`relative z-20 px-4 py-3 shadow-md bg-red-500/10 border-b border-red-500/20`}>
          <div className="tracker-container flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <p className={`text-sm font-bold text-red-700 dark:text-red-400`}>Subscription expired</p>
                <p className={`text-sm text-red-600/80 dark:text-red-300/80`}>Renew to restore full access to your patients and enrollment slots.</p>
              </div>
            </div>
            <a href="/pricing" className={`tracker-button w-full md:w-auto bg-red-600 hover:bg-red-700 text-white border-transparent`}>
              Renew plan
            </a>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="tracker-nav shadow-sm">
        <div className="tracker-nav-inner px-4 md:px-0">
          <a href="/" className="flex items-center gap-3 no-underline group">
            <TrackerLogo />
            <div>
              <div className="text-base font-extrabold tracking-[-0.03em] text-[var(--color-text-primary)]">The Triad</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.26em] text-[var(--color-accent-blue)]">Tracker</div>
            </div>
          </a>

          <div className="hidden items-center gap-4 md:flex">
            <div className="tracker-chip bg-[var(--color-surface)] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent-green)] shadow-[0_0_8px_var(--color-accent-green)] animate-pulse" />
              <span className="tabular-nums font-medium">
                {time.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
            {clinician?.plan && (
              <span
                className="tracker-pill shadow-sm"
                style={{
                  color: planColor,
                  background: `color-mix(in srgb, ${planColor} 10%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${planColor} 25%, transparent)`,
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: planColor }} />
                {clinician.plan}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden md:flex items-center gap-3 border-l border-[var(--color-border)] pl-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl border text-xs font-extrabold shadow-sm"
                style={{
                  color: planColor,
                  borderColor: `color-mix(in srgb, ${planColor} 30%, transparent)`,
                  background: `color-mix(in srgb, ${planColor} 10%, var(--color-surface))`,
                }}
              >
                {clinician?.full_name ? getInitials(clinician.full_name) : 'DR'}
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold text-[var(--color-text-primary)] leading-none">{clinician?.full_name || 'Clinician'}</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-none">{clinician?.email}</p>
              </div>
            </div>
            <button
              onClick={async () => { await supabase.auth.signOut(); router.push('/') }}
              className="text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors ml-2"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="tracker-container py-8 md:py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-[var(--color-text-secondary)] font-medium mb-1 tracking-wide">{getGreeting()},</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              {clinician?.full_name?.split(' ')[0] || 'Doctor'}.
            </h1>
          </div>
          <button onClick={() => router.push('/patients/new')} disabled={!clinician?.plan || slotsLeft <= 0}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all shadow-sm ${clinician?.plan && slotsLeft > 0 ? 'bg-[var(--color-accent-blue)] text-white hover:bg-blue-600 hover:shadow-md' : 'bg-[var(--color-surface-soft)] text-[var(--color-text-muted)] cursor-not-allowed'}`}>
            <UserPlus className="w-4 h-4" /> Add Patient
          </button>
        </div>

        {/* Stats row */}
        <div className={`grid gap-4 mb-8 ${patients.length > 0 ? 'md:grid-cols-3' : 'md:grid-cols-1'}`}>
          {/* Capacity */}
          <div className="tracker-card-soft p-6 border border-[var(--color-border-soft)]">
            <p className="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-3">Patient Capacity</p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">{usedSlots}</span>
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">/ {totalSlots || '—'}</span>
            </div>
            <div className="h-1.5 bg-[var(--color-surface)] border border-[var(--color-border-soft)] rounded-full overflow-hidden mb-2">
              <div className="h-full rounded-full transition-all duration-1000 ease-out relative"
                style={{
                  width: `${fillPercent}%`,
                  background: fillPercent > 80 ? 'linear-gradient(90deg, var(--color-accent-amber), var(--color-accent-red))' : `linear-gradient(90deg, ${planColor}, color-mix(in srgb, ${planColor} 70%, transparent))`,
                }} />
            </div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">{slotsLeft > 0 ? `${slotsLeft} slots remaining` : 'All slots filled'}</p>
          </div>

          {/* Panel control rate */}
          {patients.length > 0 && (
            <div className="tracker-card-soft p-6 border border-[var(--color-border-soft)]">
              <p className="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-3">Panel Control Rate</p>
              <div className="flex items-baseline gap-3 mb-2">
                <span className={`text-3xl font-extrabold tracking-tight ${controlRate !== null && controlRate >= 70 ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-accent-amber)]'}`}>
                  {controlRate ?? '—'}%
                </span>
                {controlDelta !== 0 && (
                  <span className={`text-sm font-bold ${controlDelta > 0 ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-accent-red)]'}`}>
                    {controlDelta > 0 ? '↑' : '↓'} {Math.abs(controlDelta)}%
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--color-text-muted)] font-medium">patients at target this week</p>
            </div>
          )}

          {/* Attention needed */}
          {patients.length > 0 && (
            <div className="tracker-card-soft p-6 border" style={{ background: flagged.length > 0 ? urgencyBg(flagged[0]?.urgency || 'MEDIUM') : 'color-mix(in srgb, var(--color-accent-green) 5%, var(--color-surface-soft))', borderColor: flagged.length > 0 ? urgencyBorder(flagged[0]?.urgency || 'MEDIUM') : 'color-mix(in srgb, var(--color-accent-green) 20%, transparent)' }}>
              <p className="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-3">Need Attention</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-extrabold tracking-tight" style={{ color: flagged.length > 0 ? urgencyColor(flagged[0].urgency) : 'var(--color-accent-green)' }}>
                  {flagged.length}
                </span>
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">of {patients.length}</span>
              </div>
              <p className="text-xs font-bold" style={{ color: flagged.length > 0 ? urgencyColor(flagged[0].urgency) : 'var(--color-accent-green)' }}>
                {flagged.length === 0 ? 'All patients stable ✓' : `${stableCount} stable · ${flagged.length} flagged`}
              </p>
            </div>
          )}
        </div>

        {/* PRIORITY QUEUE */}
        {patients.length > 0 && (
          <div className="mb-10">
            {flagged.length === 0 ? (
              <div className="bg-[var(--color-surface-soft)] border border-[color-mix(in_srgb,var(--color-accent-green)_20%,transparent)] rounded-2xl p-8 text-center animate-in fade-in slide-in-from-bottom-4">
                <CheckCircle2 className="w-10 h-10 text-[var(--color-accent-green)] mx-auto mb-3" />
                <p className="text-lg font-bold text-[var(--color-accent-green)] mb-1">
                  All {patients.length} patients had a stable week.
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">No action required today.</p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-widest mb-4">
                  Priority Queue — {flagged.length} patient{flagged.length > 1 ? 's' : ''} need attention
                </p>
                <div className="flex flex-col gap-4">
                  {flagged.map((f, i) => (
                    <div key={f.patient.id} className="rounded-2xl p-5 md:p-6 animate-in fade-in slide-in-from-bottom-4 shadow-sm border" style={{ background: urgencyBg(f.urgency), borderColor: urgencyBorder(f.urgency), animationDelay: `${i * 50}ms` }}>
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border shadow-sm" style={{ background: urgencyBg(f.urgency), color: urgencyColor(f.urgency), borderColor: urgencyBorder(f.urgency) }}>
                              {f.urgency === 'CRISIS' ? '⚠ Crisis' : f.urgency === 'HIGH' ? 'High Priority' : 'Medium Priority'}
                            </span>
                            {f.patient.diagnosis.map(d => (
                              <span key={d} className="text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm" style={{ background: d === 'HTN' ? 'color-mix(in srgb, var(--color-accent-red) 10%, transparent)' : 'color-mix(in srgb, var(--color-accent-purple) 10%, transparent)', color: d === 'HTN' ? 'var(--color-accent-red)' : 'var(--color-accent-purple)', borderColor: d === 'HTN' ? 'color-mix(in srgb, var(--color-accent-red) 25%, transparent)' : 'color-mix(in srgb, var(--color-accent-purple) 25%, transparent)' }}>
                                {d}
                              </span>
                            ))}
                          </div>
                          <p className="text-lg font-bold text-[var(--color-text-primary)] mb-1">{f.patient.full_name}</p>
                          <p className="text-sm font-bold mb-4" style={{ color: urgencyColor(f.urgency) }}>{f.reason}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-1">Last Reading</p>
                              <p className="text-sm font-semibold text-[var(--color-text-secondary)]">{f.lastReading}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-1">Current Meds</p>
                              <p className="text-sm text-[var(--color-text-secondary)]">{f.currentMeds}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-1">Suggested Action</p>
                              <p className="text-sm font-medium text-[var(--color-text-primary)]">{f.suggestedAction}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex lg:flex-col gap-3 min-w-[140px]">
                          <button onClick={() => router.push(`/patients/${f.patient.id}`)} className="flex-1 flex items-center justify-center gap-2 text-white border-transparent rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-sm" style={{ background: urgencyColor(f.urgency) }}>
                            <UserCircle className="w-4 h-4" /> Profile
                          </button>
                          <button onClick={() => window.open(`tel:`, '_self')} className="flex-1 flex items-center justify-center gap-2 bg-transparent rounded-xl px-4 py-2.5 text-xs font-bold transition-all border" style={{ color: urgencyColor(f.urgency), borderColor: urgencyBorder(f.urgency) }}>
                            <Phone className="w-4 h-4" /> Call Patient
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Room filters */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
          {[
            { key: 'htn', label: 'BP Tracker', sub: 'Hypertension', icon: <HeartPulse className="w-6 h-6" />, count: htnPatients.length, color: 'var(--color-accent-red)' },
            { key: 'both', label: 'Combined', sub: 'HTN + DM', icon: <Activity className="w-6 h-6" />, count: bothPatients.length, color: 'var(--color-accent-blue)' },
            { key: 'dm', label: 'BG Tracker', sub: 'Diabetes', icon: <Syringe className="w-6 h-6" />, count: dmPatients.length, color: 'var(--color-accent-purple)' },
          ].map(r => {
            const active = room === r.key
            return (
              <button key={r.key} onClick={() => setRoom(active ? 'all' : r.key as Room)}
                className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group outline-none ${active ? 'shadow-lg scale-[1.02]' : 'hover:border-[var(--color-border)] hover:bg-[var(--color-surface-soft)]'}`}
                style={{
                  borderColor: active ? r.color : 'var(--color-border-soft)',
                  background: active ? `color-mix(in srgb, ${r.color} 8%, var(--color-surface))` : 'var(--color-surface-soft)',
                }}>
                {active && <div className="absolute top-0 inset-x-0 h-1" style={{ background: r.color }}></div>}
                <div className="mb-2" style={{ color: active ? r.color : 'var(--color-text-muted)' }}>{r.icon}</div>
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1" style={{ color: r.color }}>{r.count}</div>
                <div className="text-xs md:text-sm font-bold text-[var(--color-text-primary)] mb-0.5">{r.label}</div>
                <div className="text-[10px] md:text-xs font-medium text-[var(--color-text-muted)] hidden sm:block">{r.sub}</div>
              </button>
            )
          })}
        </div>

        {/* Patient list */}
        <div className="tracker-card overflow-hidden shadow-sm">
          <div className="p-4 md:p-5 border-b border-[var(--color-border-soft)] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--color-surface-soft)]">
            <div className="flex items-center gap-3">
              <span className="text-base font-bold text-[var(--color-text-primary)]">
                {room === 'all' ? 'All Active Patients' : room === 'htn' ? 'Blood Pressure Monitor' : room === 'dm' ? 'Blood Glucose Monitor' : 'Combined Care'}
              </span>
              <span className="text-xs font-bold bg-[var(--color-bg-deep)] border border-[var(--color-border-soft)] text-[var(--color-text-secondary)] px-2.5 py-0.5 rounded-full shadow-inner">{displayPatients.length}</span>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <input type="text" placeholder="Search patients…" value={search} onChange={e => setSearch(e.target.value)}
                className="w-full sm:w-64 bg-[var(--color-bg-deep)] border border-[var(--color-border-soft)] rounded-xl py-2 pl-9 pr-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-blue)] focus:border-transparent transition-all placeholder:text-[var(--color-text-muted)] shadow-inner"
              />
            </div>
          </div>

          {displayPatients.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[var(--color-surface-soft)] rounded-2xl flex items-center justify-center mb-4 border border-[var(--color-border-soft)] shadow-sm">
                <Users className="w-8 h-8 text-[var(--color-text-muted)]" />
              </div>
              <p className="text-base font-bold text-[var(--color-text-primary)] mb-2">
                {patients.length === 0 ? 'No patients yet' : search ? `No patients matching "${search}"` : 'No patients in this tracker'}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {patients.length === 0 ? 'Add your first patient to start monitoring' : 'Try a different name or clear the search'}
              </p>
              {patients.length === 0 && clinician?.plan && slotsLeft > 0 && (
                <button onClick={() => router.push('/patients/new')} className="tracker-button mt-6 text-sm px-5 py-2.5">
                  <UserPlus className="w-4 h-4 mr-2" /> Add First Patient
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border-soft)]">
              {displayPatients.map((patient) => {
                const isFlagged = flagged.find(f => f.patient.id === patient.id)
                const hasHTN = patient.diagnosis.includes('HTN')
                const hasDM = patient.diagnosis.includes('DM')
                const accent = hasHTN && hasDM ? 'var(--color-accent-blue)' : hasHTN ? 'var(--color-accent-red)' : 'var(--color-accent-purple)'

                return (
                  <div key={patient.id} onClick={() => router.push(`/patients/${patient.id}`)}
                    className="p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-[var(--color-surface-soft)] transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-extrabold border shadow-sm group-hover:scale-105 transition-transform"
                        style={{
                          color: accent,
                          background: `color-mix(in srgb, ${accent} 12%, var(--color-surface))`,
                          borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`
                        }}>
                        {getInitials(patient.full_name)}
                      </div>
                      <div>
                        <div className="text-base font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-accent-blue)] transition-colors">{patient.full_name}</div>
                        <div className="text-xs font-medium text-[var(--color-text-secondary)] flex items-center gap-1.5 flex-wrap">
                          <span>{patient.age ? `${patient.age} yrs` : 'Age unknown'}</span>
                          <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></span>
                          <span>{patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : 'Gender unknown'}</span>
                          <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></span>
                          <span>Added {new Date(patient.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      {isFlagged && (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm whitespace-nowrap" style={{ background: urgencyBg(isFlagged.urgency), color: urgencyColor(isFlagged.urgency), borderColor: urgencyBorder(isFlagged.urgency) }}>
                          {isFlagged.urgency === 'CRISIS' ? '⚠ Crisis' : '● Flagged'}
                        </span>
                      )}
                      {patient.diagnosis.map(d => (
                        <span key={d} className="text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm" style={{ background: d === 'HTN' ? 'color-mix(in srgb, var(--color-accent-red) 10%, transparent)' : 'color-mix(in srgb, var(--color-accent-purple) 10%, transparent)', color: d === 'HTN' ? 'var(--color-accent-red)' : 'var(--color-accent-purple)', borderColor: d === 'HTN' ? 'color-mix(in srgb, var(--color-accent-red) 25%, transparent)' : 'color-mix(in srgb, var(--color-accent-purple) 25%, transparent)' }}>
                          {d}
                        </span>
                      ))}
                      <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors" />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-[var(--color-text-muted)]">
          <a href="/" className="hover:text-[var(--color-text-primary)] transition-colors">← Clinical Reference</a>
          <span className="text-[var(--color-border)]">•</span>
          <span>The Triad Tracker &copy; {new Date().getFullYear()}</span>
        </div>
      </main>
    </div>
  )
}
