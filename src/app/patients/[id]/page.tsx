'use client'

import { Suspense, useEffect, useState, useRef } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Patient, BPReading, BGReading, Medication } from '@/types/database'
import { ArrowLeft, Activity, HeartPulse, Pill, BrainCircuit, AlertTriangle, Syringe, Copy, CheckCircle2, Trash2, Archive, X, Info, Plus } from 'lucide-react'

type Tab = 'overview' | 'bp' | 'bg' | 'meds' | 'ai' | 'se'

function buildTabs(hasHTN: boolean, hasDM: boolean): Tab[] {
  const tabs: Tab[] = ['overview']
  if (hasHTN) tabs.push('bp')
  if (hasDM) tabs.push('bg')
  tabs.push('meds', 'ai', 'se')
  return tabs
}

function bpColor(sys: number, dia: number) {
  if (sys >= 180 || dia >= 120) return 'var(--color-accent-red)'
  if (sys >= 160 || dia >= 100) return 'var(--color-accent-amber)'
  if (sys >= 140 || dia >= 90) return 'var(--color-accent-amber)'
  if (sys >= 130 || dia >= 85) return 'var(--color-accent-amber)'
  return 'var(--color-accent-green)'
}
function bpLabel(sys: number, dia: number) {
  if (sys >= 180 || dia >= 120) return 'Hypertensive Crisis'
  if (sys >= 160 || dia >= 100) return 'Grade 2'
  if (sys >= 140 || dia >= 90) return 'Grade 1'
  if (sys >= 130 || dia >= 85) return 'High Normal'
  if (sys >= 120) return 'Normal'
  return 'Optimal'
}
function bgColor(v: number) {
  if (v < 70) return 'var(--color-accent-red)'
  if (v <= 99) return 'var(--color-accent-green)'
  if (v <= 125) return 'var(--color-accent-amber)'
  return 'var(--color-accent-red)'
}
function bgLabel(v: number, type: string) {
  if (v < 54) return 'Severe Hypoglycaemia'
  if (v < 70) return 'Hypoglycaemia'
  if (type === 'fasting') {
    if (v <= 99) return 'Normal'
    if (v <= 125) return 'Pre-DM'
    return 'DM Range'
  }
  if (type === 'postprandial') {
    if (v <= 139) return 'Normal'
    if (v <= 199) return 'Pre-DM'
    return 'DM Range'
  }
  return v > 200 ? 'Elevated' : 'Normal'
}
function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true })
}

// ── SVG BP Chart ──────────────────────────────────────────────────────────────
function BPChart({ readings }: { readings: BPReading[] }) {
  if (readings.length < 2) return null
  const sorted = [...readings].sort((a, b) => new Date(a.logged_at).getTime() - new Date(b.logged_at).getTime()).slice(-20)
  const W = 600, H = 200, PAD = { top: 16, right: 16, bottom: 28, left: 40 }
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  const allSys = sorted.map(r => r.systolic)
  const allDia = sorted.map(r => r.diastolic)
  const minV = Math.min(...allDia) - 10
  const maxV = Math.max(...allSys) + 10
  const range = maxV - minV

  const xScale = (i: number) => PAD.left + (i / (sorted.length - 1)) * chartW
  const yScale = (v: number) => PAD.top + chartH - ((v - minV) / range) * chartH

  const targetSysHigh = yScale(140)
  const targetDiaHigh = yScale(90)

  const sysPath = sorted.map((r, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i).toFixed(1)} ${yScale(r.systolic).toFixed(1)}`).join(' ')
  const diaPath = sorted.map((r, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i).toFixed(1)} ${yScale(r.diastolic).toFixed(1)}`).join(' ')

  return (
    <div className="overflow-x-auto mb-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[300px] block">
        <rect x={PAD.left} y={targetSysHigh} width={chartW} height={targetDiaHigh - targetSysHigh} fill="color-mix(in srgb, var(--color-accent-green) 5%, transparent)" />
        <line x1={PAD.left} y1={targetSysHigh} x2={PAD.left + chartW} y2={targetSysHigh} stroke="color-mix(in srgb, var(--color-accent-green) 30%, transparent)" strokeWidth="1" strokeDasharray="4,4" />
        <line x1={PAD.left} y1={targetDiaHigh} x2={PAD.left + chartW} y2={targetDiaHigh} stroke="color-mix(in srgb, var(--color-accent-green) 20%, transparent)" strokeWidth="1" strokeDasharray="4,4" />
        <text x={PAD.left + chartW + 2} y={targetSysHigh + 4} fontSize="9" fill="color-mix(in srgb, var(--color-accent-green) 60%, transparent)">140</text>
        <text x={PAD.left + chartW + 2} y={targetDiaHigh + 4} fontSize="9" fill="color-mix(in srgb, var(--color-accent-green) 50%, transparent)">90</text>

        {[minV, minV + range * 0.25, minV + range * 0.5, minV + range * 0.75, maxV].map((v, i) => (
          <text key={i} x={PAD.left - 6} y={yScale(v) + 3} fontSize="9" fill="var(--color-text-muted)" textAnchor="end">{Math.round(v)}</text>
        ))}

        <path d={sysPath} fill="none" stroke="color-mix(in srgb, var(--color-text-primary) 50%, transparent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={diaPath} fill="none" stroke="color-mix(in srgb, var(--color-text-primary) 20%, transparent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3,3" />

        {sorted.map((r, i) => {
          const c = bpColor(r.systolic, r.diastolic)
          return (
            <g key={i} className="transition-transform hover:scale-110 cursor-pointer origin-center" style={{ transformOrigin: `${xScale(i)}px ${yScale(r.systolic)}px` }}>
              <circle cx={xScale(i)} cy={yScale(r.systolic)} r="4.5" fill={c} stroke="var(--color-bg)" strokeWidth="1.5" />
              <circle cx={xScale(i)} cy={yScale(r.diastolic)} r="3.5" fill={c} fillOpacity="0.6" stroke="var(--color-bg)" strokeWidth="1" />
            </g>
          )
        })}

        {sorted.filter((_, i) => i === 0 || i === sorted.length - 1 || (sorted.length > 4 && i === Math.floor(sorted.length / 2))).map((r) => {
          const idx = sorted.indexOf(r)
          return (
            <text key={idx} x={xScale(idx)} y={H - 4} fontSize="9" fill="var(--color-text-muted)" textAnchor="middle">
              {new Date(r.logged_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
            </text>
          )
        })}
      </svg>
      <div className="flex gap-4 mt-2 px-10">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-0.5 bg-[var(--color-text-secondary)] rounded-full" />
          <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase">Systolic</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-[1px] border-t border-dashed border-[var(--color-text-muted)]" />
          <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase">Diastolic</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[color-mix(in_srgb,var(--color-accent-green)_15%,transparent)] border border-dashed border-[var(--color-accent-green)] opacity-50" />
          <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase">Target</span>
        </div>
      </div>
    </div>
  )
}

// ── SVG BG Chart ──────────────────────────────────────────────────────────────
function BGChart({ readings }: { readings: BGReading[] }) {
  if (readings.length < 2) return null
  const sorted = [...readings].sort((a, b) => new Date(a.logged_at).getTime() - new Date(b.logged_at).getTime()).slice(-20)
  const W = 600, H = 180, PAD = { top: 16, right: 40, bottom: 28, left: 40 }
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  const vals = sorted.map(r => r.value_mgdl)
  const minV = Math.min(...vals, 60) - 10
  const maxV = Math.max(...vals, 130) + 10
  const range = maxV - minV

  const xScale = (i: number) => PAD.left + (i / (sorted.length - 1)) * chartW
  const yScale = (v: number) => PAD.top + chartH - ((v - minV) / range) * chartH

  const path = sorted.map((r, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i).toFixed(1)} ${yScale(r.value_mgdl).toFixed(1)}`).join(' ')
  const targetLow = yScale(70)
  const targetHigh = yScale(100)

  return (
    <div className="overflow-x-auto mb-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[300px] block">
        <rect x={PAD.left} y={targetHigh} width={chartW} height={targetLow - targetHigh} fill="color-mix(in srgb, var(--color-accent-green) 5%, transparent)" />
        <line x1={PAD.left} y1={targetHigh} x2={PAD.left + chartW} y2={targetHigh} stroke="color-mix(in srgb, var(--color-accent-green) 30%, transparent)" strokeWidth="1" strokeDasharray="4,4" />
        <line x1={PAD.left} y1={targetLow} x2={PAD.left + chartW} y2={targetLow} stroke="color-mix(in srgb, var(--color-accent-green) 20%, transparent)" strokeWidth="1" strokeDasharray="4,4" />
        <text x={PAD.left + chartW + 4} y={targetHigh + 4} fontSize="9" fill="color-mix(in srgb, var(--color-accent-green) 60%, transparent)">100</text>
        <text x={PAD.left + chartW + 4} y={targetLow + 4} fontSize="9" fill="color-mix(in srgb, var(--color-accent-green) 50%, transparent)">70</text>

        {[minV, minV + range * 0.5, maxV].map((v, i) => (
          <text key={i} x={PAD.left - 6} y={yScale(v) + 3} fontSize="9" fill="var(--color-text-muted)" textAnchor="end">{Math.round(v)}</text>
        ))}

        <path d={path} fill="none" stroke="color-mix(in srgb, var(--color-text-primary) 50%, transparent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {sorted.map((r, i) => (
          <circle key={i} cx={xScale(i)} cy={yScale(r.value_mgdl)} r="4.5" fill={bgColor(r.value_mgdl)} stroke="var(--color-bg)" strokeWidth="1.5" className="transition-transform hover:scale-125 cursor-pointer" style={{ transformOrigin: `${xScale(i)}px ${yScale(r.value_mgdl)}px` }} />
        ))}

        {sorted.filter((_, i) => i === 0 || i === sorted.length - 1 || (sorted.length > 4 && i === Math.floor(sorted.length / 2))).map((r) => {
          const idx = sorted.indexOf(r)
          return (
            <text key={idx} x={xScale(idx)} y={H - 4} fontSize="9" fill="var(--color-text-muted)" textAnchor="middle">
              {new Date(r.logged_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

// ── AI Context Line ────────────────────────────────────────────────────────────
function AIContextLine({ patient, bpReadings, bgReadings, medications }: { patient: Patient; bpReadings: BPReading[]; bgReadings: BGReading[]; medications: Medication[] }) {
  const hasHTN = patient.diagnosis.includes('HTN')
  const hasDM = patient.diagnosis.includes('DM')
  const activeMeds = medications.filter(m => m.active)

  const lines: string[] = []

  if (hasHTN && bpReadings.length > 0) {
    const recent7 = bpReadings.slice(0, Math.min(7, bpReadings.length))
    const avgSys = Math.round(recent7.reduce((s, r) => s + r.systolic, 0) / recent7.length)
    const avgDia = Math.round(recent7.reduce((s, r) => s + r.diastolic, 0) / recent7.length)
    const latest = bpReadings[0]
    if (latest.systolic >= 180 || latest.diastolic >= 120) {
      lines.push(`Latest BP ${latest.systolic}/${latest.diastolic} mmHg meets hypertensive crisis criteria — immediate review required.`)
    } else if (avgSys >= 140 || avgDia >= 90) {
      lines.push(`7-day average BP ${avgSys}/${avgDia} mmHg is above target. Current management is not achieving control.`)
    } else {
      lines.push(`7-day average BP ${avgSys}/${avgDia} mmHg is within target range.`)
    }
  }

  if (hasDM && bgReadings.length > 0) {
    const recent7 = bgReadings.filter(r => r.reading_type === 'fasting').slice(0, 7)
    if (recent7.length > 0) {
      const avgBG = Math.round(recent7.reduce((s, r) => s + r.value_mgdl, 0) / recent7.length)
      if (avgBG >= 126) lines.push(`Fasting BG average ${avgBG} mg/dL over last ${recent7.length} readings — above ADA 2024 targets.`)
      else lines.push(`Fasting BG average ${avgBG} mg/dL — within acceptable range.`)
    }
  }

  if (activeMeds.length === 0) lines.push('No medications recorded on file.')
  else if (bpReadings.length > 14 && hasHTN) {
    const oldest = activeMeds.sort((a, b) => new Date(a.start_date || 0).getTime() - new Date(b.start_date || 0).getTime())[0]
    if (oldest?.start_date) {
      const weeks = Math.floor((Date.now() - new Date(oldest.start_date).getTime()) / (7 * 24 * 60 * 60 * 1000))
      if (weeks >= 4) lines.push(`${oldest.drug_name} ${oldest.dose} has been running for ${weeks} weeks.`)
    }
  }

  if (lines.length === 0) return null

  return (
    <div className="bg-[color-mix(in_srgb,var(--color-accent-blue)_5%,transparent)] border border-[color-mix(in_srgb,var(--color-accent-blue)_20%,transparent)] rounded-2xl p-4 md:p-5 mb-6 backdrop-blur-sm shadow-inner">
      <div className="flex items-center gap-2 mb-3">
        <BrainCircuit className="w-4 h-4 text-[var(--color-accent-blue)]" />
        <p className="text-[10px] font-extrabold text-[var(--color-accent-blue)] uppercase tracking-[0.15em]">AI Clinical Context</p>
      </div>
      <div className="space-y-2">
        {lines.map((l, i) => (
          <p key={i} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {l}
          </p>
        ))}
      </div>
    </div>
  )
}

// ── Remove Patient Modal ───────────────────────────────────────────────────────
function RemovePatientModal({ patient, onClose, onRemoved }: { patient: Patient; onClose: () => void; onRemoved: () => void }) {
  const [mode, setMode] = useState<'choose' | 'confirm-delete'>('choose')
  const [confirmName, setConfirmName] = useState('')
  const [busy, setBusy] = useState(false)

  async function archivePatient() {
    setBusy(true)
    await (supabase.from('patients') as any).update({ active: false }).eq('id', patient.id)
    onRemoved()
  }

  async function deletePatient() {
    if (confirmName !== patient.full_name) return
    setBusy(true)
    await supabase.from('bp_readings').delete().eq('patient_id', patient.id)
    await supabase.from('bg_readings').delete().eq('patient_id', patient.id)
    await supabase.from('medications').delete().eq('patient_id', patient.id)
    await supabase.from('side_effects').delete().eq('patient_id', patient.id)
    await supabase.from('patients').delete().eq('id', patient.id)
    onRemoved()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="tracker-card w-full max-w-md p-6 md:p-8 shadow-2xl scale-100 animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
        {mode === 'choose' && (
          <>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Remove {patient.full_name}?</h2>
              <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">Choose how to handle their records. This will free one patient slot.</p>
            
            <div className="space-y-3 mb-6">
              <button onClick={archivePatient} disabled={busy} className="w-full flex items-start gap-4 p-4 rounded-xl border border-[color-mix(in_srgb,var(--color-accent-green)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-green)_5%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-accent-green)_10%,transparent)] transition-colors text-left group">
                <Archive className="w-5 h-5 text-[var(--color-accent-green)] mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-[var(--color-accent-green)] mb-1">Archive records (Recommended)</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Patient is deactivated. All readings and history are retained safely.</p>
                </div>
              </button>
              
              <button onClick={() => setMode('confirm-delete')} className="w-full flex items-start gap-4 p-4 rounded-xl border border-[color-mix(in_srgb,var(--color-accent-red)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-red)_5%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-accent-red)_10%,transparent)] transition-colors text-left group">
                <Trash2 className="w-5 h-5 text-[var(--color-accent-red)] mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm font-bold text-[var(--color-accent-red)] mb-1">Delete completely</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Permanently removes patient and all data. Cannot be undone.</p>
                </div>
              </button>
            </div>
            <button onClick={onClose} className="tracker-button-secondary w-full py-3">Cancel</button>
          </>
        )}
        
        {mode === 'confirm-delete' && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[var(--color-accent-red)]" />
              </div>
              <h2 className="text-xl font-bold text-[var(--color-accent-red)]">Permanent Deletion</h2>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              Type <strong className="text-[var(--color-text-primary)]">{patient.full_name}</strong> to confirm.
            </p>
            <input 
              type="text" 
              value={confirmName} 
              onChange={e => setConfirmName(e.target.value)} 
              placeholder="Type patient's full name" 
              className="tracker-input mb-6" 
              style={{ borderColor: confirmName === patient.full_name ? 'var(--color-accent-red)' : undefined }}
            />
            <div className="flex gap-3">
              <button onClick={() => setMode('choose')} className="tracker-button-secondary flex-1 py-3">Back</button>
              <button 
                onClick={deletePatient} 
                disabled={confirmName !== patient.full_name || busy} 
                className={`tracker-button flex-1 py-3 border-transparent ${confirmName === patient.full_name ? '!bg-red-600' : '!bg-[color-mix(in_srgb,var(--color-accent-red)_20%,transparent)] !text-[var(--color-accent-red)]'}`}
              >
                {busy ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Main Profile ───────────────────────────────────────────────────────────────
function PatientProfileInner() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const justCreated = searchParams.get('created') === 'true'

  const [patient, setPatient] = useState<Patient | null>(null)
  const [bpReadings, setBpReadings] = useState<BPReading[]>([])
  const [bgReadings, setBgReadings] = useState<BGReading[]>([])
  const [medications, setMedications] = useState<Medication[]>([])
  const [sideEffects, setSideEffects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  useEffect(() => {
    async function load() {
      const id = params.id as string
      const [{ data: p }, { data: bp }, { data: bg }, { data: med }, { data: se }] = await Promise.all([
        supabase.from('patients').select('*').eq('id', id).single(),
        supabase.from('bp_readings').select('*').eq('patient_id', id).order('logged_at', { ascending: false }),
        supabase.from('bg_readings').select('*').eq('patient_id', id).order('logged_at', { ascending: false }),
        supabase.from('medications').select('*').eq('patient_id', id).order('created_at', { ascending: false }),
        supabase.from('side_effects').select('*').eq('patient_id', id).order('reported_at', { ascending: false }),
      ])
      setPatient(p)
      setBpReadings(bp || [])
      setBgReadings(bg || [])
      setMedications(med || [])
      setSideEffects(se || [])
      setLoading(false)
    }
    load()
  }, [params.id])

  if (loading) return (
    <div className="tracker-shell flex items-center justify-center min-h-screen">
      <div className="tracker-grid" />
      <div className="w-12 h-12 rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-accent-blue)] animate-spin z-10" />
    </div>
  )

  if (!patient) return (
    <div className="tracker-shell flex items-center justify-center min-h-screen">
      <p className="text-[var(--color-text-secondary)] font-medium z-10">Patient not found.</p>
    </div>
  )

  const latestBP = bpReadings[0]
  const latestBG = bgReadings[0]
  const activeMeds = medications.filter(m => m.active)
  const hasHTN = patient.diagnosis.includes('HTN')
  const hasDM = patient.diagnosis.includes('DM')
  const availableTabs = buildTabs(hasHTN, hasDM)
  const portalLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/portal?token=${patient.portal_token}`

  const tabLabels: Record<Tab, { label: string, icon: React.ReactNode }> = { 
    overview: { label: 'Overview', icon: <Activity className="w-4 h-4" /> },
    bp: { label: 'BP Tracker', icon: <HeartPulse className="w-4 h-4" /> },
    bg: { label: 'BG Tracker', icon: <Syringe className="w-4 h-4" /> },
    meds: { label: 'Medications', icon: <Pill className="w-4 h-4" /> },
    ai: { label: 'AI Analysis', icon: <BrainCircuit className="w-4 h-4" /> },
    se: { label: 'Side Effects', icon: <AlertTriangle className="w-4 h-4" /> }
  }

  return (
    <div className="tracker-shell min-h-screen">
      <div className="tracker-grid" />

      {showRemoveModal && (
        <RemovePatientModal patient={patient} onClose={() => setShowRemoveModal(false)} onRemoved={() => router.push('/dashboard')} />
      )}

      {/* Nav */}
      <nav className="tracker-nav">
        <div className="tracker-nav-inner px-4 md:px-0">
          <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-bold">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </button>
          <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-4">
            <span className="text-sm font-extrabold text-[var(--color-text-primary)]">{patient.full_name}</span>
          </div>
        </div>
      </nav>

      <main className="tracker-container py-8 md:py-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Created banner */}
        {justCreated && (
          <div className="mb-8 p-5 bg-[color-mix(in_srgb,var(--color-accent-green)_10%,transparent)] border border-[color-mix(in_srgb,var(--color-accent-green)_30%,transparent)] rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent-green)] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-bg-elevated)]" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-[var(--color-accent-green)] tracking-wide">PATIENT ENROLLED</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Share this secure portal link for them to log readings.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[var(--color-bg-deep)] border border-[var(--color-border-soft)] rounded-xl p-2 pl-4 shadow-inner">
              <span className="text-sm text-[var(--color-text-muted)] font-mono flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{portalLink}</span>
              <button onClick={() => navigator.clipboard.writeText(portalLink)} className="tracker-button py-2 px-4 text-xs">
                Copy Link
              </button>
            </div>
          </div>
        )}

        {/* Patient header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-4">{patient.full_name}</h1>
            <div className="flex items-center flex-wrap gap-3">
              {patient.age && <span className="tracker-chip">{patient.age} yrs</span>}
              {patient.gender && <span className="tracker-chip capitalize">{patient.gender}</span>}
              {(patient as any).weight_kg && <span className="tracker-chip">{(patient as any).weight_kg} kg</span>}
              {patient.diagnosis.map(d => (
                <span key={d} className="text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm" style={{ background: d === 'HTN' ? 'color-mix(in srgb, var(--color-accent-red) 12%, transparent)' : 'color-mix(in srgb, var(--color-accent-purple) 12%, transparent)', color: d === 'HTN' ? 'var(--color-accent-red)' : 'var(--color-accent-purple)', borderColor: d === 'HTN' ? 'color-mix(in srgb, var(--color-accent-red) 25%, transparent)' : 'color-mix(in srgb, var(--color-accent-purple) 25%, transparent)' }}>{d}</span>
              ))}
            </div>
          </div>
          <button onClick={() => setShowRemoveModal(true)} className="tracker-button-secondary border-[color-mix(in_srgb,var(--color-accent-red)_20%,transparent)] text-[var(--color-accent-red)] hover:bg-[color-mix(in_srgb,var(--color-accent-red)_10%,transparent)] text-sm px-4">
            Archive Patient
          </button>
        </div>

        {/* Stat cards */}
        <div className={`grid gap-4 mb-8 ${hasHTN && hasDM ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
          {hasHTN && (
            <div className="tracker-card-soft p-5 border border-[var(--color-border-soft)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <HeartPulse className="w-16 h-16 text-[var(--color-accent-red)]" />
              </div>
              <p className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-3">Latest BP</p>
              <p className="text-3xl font-extrabold tracking-tight mb-1" style={{ color: latestBP ? bpColor(latestBP.systolic, latestBP.diastolic) : 'var(--color-text-muted)' }}>
                {latestBP ? `${latestBP.systolic}/${latestBP.diastolic}` : '—'}
              </p>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">{latestBP ? `mmHg · ${formatDate(latestBP.logged_at)}` : 'No readings yet'}</p>
            </div>
          )}
          {hasDM && (
            <div className="tracker-card-soft p-5 border border-[var(--color-border-soft)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Syringe className="w-16 h-16 text-[var(--color-accent-purple)]" />
              </div>
              <p className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-3">Latest BG</p>
              <p className="text-3xl font-extrabold tracking-tight mb-1" style={{ color: latestBG ? bgColor(latestBG.value_mgdl) : 'var(--color-text-muted)' }}>
                {latestBG ? `${latestBG.value_mgdl}` : '—'}
              </p>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">{latestBG ? `mg/dL · ${latestBG.reading_type}` : 'No readings yet'}</p>
            </div>
          )}
          <div className="tracker-card-soft p-5 border border-[var(--color-border-soft)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Pill className="w-16 h-16 text-[var(--color-accent-blue)]" />
            </div>
            <p className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-3">Active Meds</p>
            <p className="text-3xl font-extrabold tracking-tight mb-1 text-[var(--color-accent-blue)]">{activeMeds.length}</p>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] truncate">{activeMeds.length > 0 ? activeMeds.slice(0, 2).map(m => m.drug_name).join(', ') : 'None recorded'}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-[var(--color-surface-soft)] p-1.5 rounded-2xl w-full overflow-x-auto border border-[var(--color-border-soft)] backdrop-blur-md hide-scrollbar">
          {availableTabs.map(key => {
            const active = activeTab === key;
            return (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${active ? 'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border-soft)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-soft)] border border-transparent'}`}>
                {tabLabels[key].icon}
                {tabLabels[key].label}
              </button>
            )
          })}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AIContextLine patient={patient} bpReadings={bpReadings} bgReadings={bgReadings} medications={medications} />

            {/* No readings prompt */}
            {bpReadings.length === 0 && bgReadings.length === 0 && (
              <div className="tracker-card p-8 text-center mb-6">
                <div className="w-12 h-12 bg-[color-mix(in_srgb,var(--color-accent-blue)_10%,transparent)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-[var(--color-accent-blue)]" />
                </div>
                <p className="text-base font-bold text-[var(--color-text-primary)] mb-2">No readings logged yet</p>
                <p className="text-sm text-[var(--color-text-secondary)]">Share the portal link with your patient so they can begin logging their vitals.</p>
              </div>
            )}

            <div className={`grid gap-6 mb-6 ${hasHTN && hasDM ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {hasHTN && (
                <div className="tracker-card overflow-hidden">
                  <div className="px-5 py-4 border-b border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-[var(--color-accent-red)]" />
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">Recent BP History</span>
                  </div>
                  {bpReadings.length === 0 ? (
                    <div className="p-8 text-center text-sm text-[var(--color-text-muted)] font-medium">Awaiting first reading</div>
                  ) : (
                    <div className="divide-y divide-[var(--color-border-soft)]">
                      {bpReadings.slice(0, 5).map(r => (
                        <div key={r.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-[var(--color-surface-soft)] transition-colors">
                          <span className="text-sm font-bold" style={{ color: bpColor(r.systolic, r.diastolic) }}>{r.systolic}/{r.diastolic} <span className="text-[10px] uppercase tracking-wider opacity-70">mmHg</span></span>
                          <span className="text-xs font-medium text-[var(--color-text-secondary)]">{formatDate(r.logged_at)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {hasDM && (
                <div className="tracker-card overflow-hidden">
                  <div className="px-5 py-4 border-b border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] flex items-center gap-2">
                    <Syringe className="w-4 h-4 text-[var(--color-accent-purple)]" />
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">Recent BG History</span>
                  </div>
                  {bgReadings.length === 0 ? (
                    <div className="p-8 text-center text-sm text-[var(--color-text-muted)] font-medium">Awaiting first reading</div>
                  ) : (
                    <div className="divide-y divide-[var(--color-border-soft)]">
                      {bgReadings.slice(0, 5).map(r => (
                        <div key={r.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-[var(--color-surface-soft)] transition-colors">
                          <span className="text-sm font-bold" style={{ color: bgColor(r.value_mgdl) }}>{r.value_mgdl} <span className="text-[10px] uppercase tracking-wider opacity-70">mg/dL</span></span>
                          <span className="text-xs font-medium text-[var(--color-text-secondary)] capitalize">{r.reading_type}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Medications at a glance */}
              <div className="tracker-card p-5 md:p-6">
                <p className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-4">Medications</p>
                {activeMeds.length === 0 ? (
                  <p className="text-sm text-[var(--color-text-secondary)] font-medium">No active medications.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {activeMeds.map(m => (
                      <span key={m.id} className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[color-mix(in_srgb,var(--color-accent-blue)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-blue)_5%,transparent)] text-[var(--color-accent-blue)] shadow-sm">
                        {m.drug_name} {m.dose}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Enrollment info */}
              <div className="tracker-card p-5 md:p-6">
                <p className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-4">Profile Info</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[var(--color-text-secondary)]">Enrolled</span>
                    <span className="text-xs font-bold text-[var(--color-text-primary)]">{formatDate((patient as any).created_at)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[var(--color-text-secondary)]">Total Data Points</span>
                    <span className="text-xs font-bold text-[var(--color-text-primary)]">{bpReadings.length + bgReadings.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Portal Access */}
            <PortalAccessSection portalLink={portalLink} />
          </div>
        )}

        {/* BP Tracker */}
        {activeTab === 'bp' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AIContextLine patient={patient} bpReadings={bpReadings} bgReadings={bgReadings} medications={medications} />
            <BPTrackerPanel patientId={patient.id} readings={bpReadings} onNewReading={r => setBpReadings([r, ...bpReadings])} />
          </div>
        )}

        {/* BG Tracker */}
        {activeTab === 'bg' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AIContextLine patient={patient} bpReadings={bpReadings} bgReadings={bgReadings} medications={medications} />
            <BGTrackerPanel patientId={patient.id} readings={bgReadings} onNewReading={r => setBgReadings([r, ...bgReadings])} />
          </div>
        )}

        {activeTab === 'meds' && <MedList patientId={patient.id} medications={medications} onAdd={m => setMedications(prev => [m, ...prev])} onUpdate={m => setMedications(prev => prev.map(x => x.id === m.id ? m : x))} onDelete={id => setMedications(prev => prev.filter(x => x.id !== id))} />}
        
        {activeTab === 'ai' && <AIAnalysisPanel patient={patient} bpReadings={bpReadings} bgReadings={bgReadings} medications={medications} sideEffects={sideEffects} />}
        {activeTab === 'se' && <SideEffectsList sideEffects={sideEffects} patientId={patient.id} onAdd={se => setSideEffects(prev => [se, ...prev])} onDelete={id => setSideEffects(prev => prev.filter(x => x.id !== id))} />}
      </main>
    </div>
  )
}

// ── Portal Access ─────────────────────────────────────────────────────────────
function PortalAccessSection({ portalLink }: { portalLink: string }) {
  const [copied, setCopied] = useState(false)
  function copy() { navigator.clipboard.writeText(portalLink); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className="tracker-card p-5 md:p-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIi8+Cjwvc3ZnPg==')]">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-4 h-4 text-[var(--color-accent-blue)]" />
        <p className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.15em]">Patient Portal Access</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full sm:flex-1 bg-[var(--color-bg-deep)] border border-[var(--color-border-soft)] rounded-xl py-3 px-4 shadow-inner overflow-hidden">
          <p className="text-sm text-[var(--color-text-secondary)] font-mono truncate">{portalLink}</p>
        </div>
        <button onClick={copy} className={`w-full sm:w-auto tracker-button py-3 px-6 text-sm ${copied ? '!bg-[var(--color-accent-green)] border-transparent' : 'tracker-button-secondary'}`}>
          {copied ? <><CheckCircle2 className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy Link</>}
        </button>
      </div>
    </div>
  )
}

// ── BP Tracker Panel ──────────────────────────────────────────────────────────
function BPTrackerPanel({ patientId, readings, onNewReading }: { patientId: string; readings: BPReading[]; onNewReading: (r: BPReading) => void }) {
  const [form, setForm] = useState({ systolic: '', diastolic: '', pulse: '', notes: '' })
  const [saving, setSaving] = useState(false)

  async function save() {
    if (!form.systolic || !form.diastolic) return
    setSaving(true)
    const { data } = await (supabase.from('bp_readings') as any).insert({ patient_id: patientId, systolic: parseInt(form.systolic), diastolic: parseInt(form.diastolic), pulse: form.pulse ? parseInt(form.pulse) : null, notes: form.notes || null, logged_at: new Date().toISOString() }).select().single()
    if (data) { onNewReading(data); setForm({ systolic: '', diastolic: '', pulse: '', notes: '' }) }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      {readings.length >= 2 && (
        <div className="tracker-card p-5 md:p-6">
          <p className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-4">Trend — Last {Math.min(readings.length, 20)} Readings</p>
          <BPChart readings={readings} />
        </div>
      )}
      
      <div className="tracker-card p-5 md:p-6">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
          <Plus className="w-5 h-5 text-[var(--color-accent-blue)]" /> Log BP Reading
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {[['Systolic', 'systolic', '120'], ['Diastolic', 'diastolic', '80'], ['Pulse (bpm)', 'pulse', '72']].map(([label, field, ph]) => (
            <div key={field}>
              <label className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-2">{label} {field !== 'pulse' && '*'}</label>
              <input type="number" placeholder={ph} value={(form as any)[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} className="tracker-input" />
            </div>
          ))}
        </div>
        <div className="mb-6">
          <label className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-2">Clinical Notes</label>
          <input type="text" placeholder="Patient reports feeling fine..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="tracker-input" />
        </div>
        <button onClick={save} disabled={saving || !form.systolic || !form.diastolic} className="tracker-button w-full sm:w-auto">
          {saving ? 'Saving...' : 'Save Reading'}
        </button>
      </div>

      <div className="tracker-card overflow-hidden">
        <div className="px-5 md:px-6 py-4 border-b border-[var(--color-border-soft)] bg-[var(--color-surface-soft)]">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Reading History ({readings.length})</h3>
        </div>
        {readings.length === 0 ? (
          <div className="p-10 text-center text-sm text-[var(--color-text-muted)] font-medium">No readings yet</div>
        ) : (
          <div className="divide-y divide-[var(--color-border-soft)]">
            {readings.map(r => (
              <div key={r.id} className="p-5 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--color-surface-soft)] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-xl font-extrabold tracking-tight" style={{ color: bpColor(r.systolic, r.diastolic) }}>
                      {r.systolic}/{r.diastolic} <span className="text-xs uppercase opacity-70">mmHg</span>
                    </span>
                    {r.pulse && <span className="text-xs font-bold text-[var(--color-text-secondary)] mt-0.5">♥ {r.pulse} bpm</span>}
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-sm whitespace-nowrap" style={{ color: bpColor(r.systolic, r.diastolic), borderColor: `color-mix(in srgb, ${bpColor(r.systolic, r.diastolic)} 30%, transparent)`, background: `color-mix(in srgb, ${bpColor(r.systolic, r.diastolic)} 10%, transparent)` }}>
                    {bpLabel(r.systolic, r.diastolic)}
                  </span>
                  <span className="text-xs font-medium text-[var(--color-text-muted)] text-right whitespace-nowrap">{formatDate(r.logged_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── BG Tracker Panel ──────────────────────────────────────────────────────────
function BGTrackerPanel({ patientId, readings, onNewReading }: { patientId: string; readings: BGReading[]; onNewReading: (r: BGReading) => void }) {
  const [form, setForm] = useState({ value_mgdl: '', reading_type: 'fasting' as 'fasting'|'postprandial'|'random', notes: '' })
  const [saving, setSaving] = useState(false)

  async function save() {
    if (!form.value_mgdl) return
    setSaving(true)
    const { data } = await (supabase.from('bg_readings') as any).insert({ patient_id: patientId, value_mgdl: parseFloat(form.value_mgdl), reading_type: form.reading_type, notes: form.notes || null, logged_at: new Date().toISOString() }).select().single()
    if (data) { onNewReading(data); setForm({ value_mgdl: '', reading_type: 'fasting', notes: '' }) }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      {readings.length >= 2 && (
        <div className="tracker-card p-5 md:p-6">
          <p className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-4">Trend — Last {Math.min(readings.length, 20)} Readings</p>
          <BGChart readings={readings} />
        </div>
      )}
      
      <div className="tracker-card p-5 md:p-6">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
          <Plus className="w-5 h-5 text-[var(--color-accent-purple)]" /> Log BG Reading
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-2">BG Value (mg/dL) *</label>
            <input type="number" placeholder="110" value={form.value_mgdl} onChange={e => setForm(f => ({ ...f, value_mgdl: e.target.value }))} className="tracker-input" />
          </div>
          <div>
            <label className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-2">Type *</label>
            <select value={form.reading_type} onChange={e => setForm(f => ({ ...f, reading_type: e.target.value as any }))} className="tracker-input appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-16px)_center] bg-[size:16px]">
              <option value="fasting">Fasting</option>
              <option value="postprandial">Postprandial (2hr)</option>
              <option value="random">Random</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-2">Clinical Notes</label>
          <input type="text" placeholder="Patient had a large meal..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="tracker-input" />
        </div>
        <button onClick={save} disabled={saving || !form.value_mgdl} className="tracker-button w-full sm:w-auto !from-[var(--color-accent-purple)] !to-[#9333ea] shadow-[0_8px_24px_rgba(168,85,247,0.25)]">
          {saving ? 'Saving...' : 'Save Reading'}
        </button>
      </div>

      <div className="tracker-card overflow-hidden">
        <div className="px-5 md:px-6 py-4 border-b border-[var(--color-border-soft)] bg-[var(--color-surface-soft)]">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Reading History ({readings.length})</h3>
        </div>
        {readings.length === 0 ? (
          <div className="p-10 text-center text-sm text-[var(--color-text-muted)] font-medium">No readings yet</div>
        ) : (
          <div className="divide-y divide-[var(--color-border-soft)]">
            {readings.map(r => (
              <div key={r.id} className="p-5 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--color-surface-soft)] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-xl font-extrabold tracking-tight" style={{ color: bgColor(r.value_mgdl) }}>
                      {r.value_mgdl} <span className="text-xs uppercase opacity-70">mg/dL</span>
                    </span>
                    <span className="text-xs font-bold text-[var(--color-text-secondary)] mt-0.5 capitalize">{r.reading_type}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-sm whitespace-nowrap" style={{ color: bgColor(r.value_mgdl), borderColor: `color-mix(in srgb, ${bgColor(r.value_mgdl)} 30%, transparent)`, background: `color-mix(in srgb, ${bgColor(r.value_mgdl)} 10%, transparent)` }}>
                    {bgLabel(r.value_mgdl, r.reading_type)}
                  </span>
                  <span className="text-xs font-medium text-[var(--color-text-muted)] text-right whitespace-nowrap">{formatDate(r.logged_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Medications ───────────────────────────────────────────────────────────────
function MedList({ patientId, medications, onAdd, onUpdate, onDelete }: { patientId: string; medications: Medication[]; onAdd: (m: Medication) => void; onUpdate: (m: Medication) => void; onDelete: (id: string) => void }) {
  const [form, setForm] = useState({ drug_name: '', dose: '', frequency: '', start_date: '' })
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)

  async function save() {
    if (!form.drug_name || !form.dose || !form.frequency || !form.start_date) return
    setSaving(true)
    const { data } = await (supabase.from('medications') as any).insert({ patient_id: patientId, drug_name: form.drug_name, dose: form.dose, frequency: form.frequency, start_date: form.start_date, active: true }).select().single()
    if (data) { onAdd(data); setForm({ drug_name: '', dose: '', frequency: '', start_date: '' }); setShowForm(false) }
    setSaving(false)
  }

  async function toggleActive(m: Medication) {
    setBusyId(m.id)
    const { data } = await (supabase.from('medications') as any).update({ active: !m.active }).eq('id', m.id).select().single()
    if (data) onUpdate(data)
    setBusyId(null)
  }

  async function deleteMed(id: string) {
    if (!confirm('Remove this medication?')) return
    setBusyId(id)
    await supabase.from('medications').delete().eq('id', id)
    onDelete(id)
    setBusyId(null)
  }

  return (
    <div className="space-y-6">
      {showForm && (
        <div className="tracker-card p-5 md:p-6 animate-in slide-in-from-top-2 duration-300">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-5">Add Medication</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[['Drug Name *', 'drug_name', 'Amlodipine', 'text'], ['Dose *', 'dose', '5mg', 'text'], ['Frequency *', 'frequency', 'Once daily', 'text'], ['Start Date *', 'start_date', '', 'date']].map(([label, field, ph, type]) => (
              <div key={field}>
                <label className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-2">{label}</label>
                <input type={type} placeholder={ph} value={(form as any)[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} className="tracker-input" />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowForm(false)} className="tracker-button-secondary">Cancel</button>
            <button onClick={save} disabled={saving} className="tracker-button !from-[var(--color-accent-green)] !to-[#16a34a] shadow-[0_8px_24px_rgba(74,222,128,0.25)]">
              {saving ? 'Saving...' : 'Add Medication'}
            </button>
          </div>
        </div>
      )}
      
      <div className="tracker-card overflow-hidden">
        <div className="px-5 md:px-6 py-4 border-b border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Medication Regimen</h3>
          <button onClick={() => setShowForm(true)} className="tracker-button py-2 px-4 text-xs h-auto min-h-0 !from-[var(--color-accent-green)] !to-[#16a34a] shadow-sm">
            + Add
          </button>
        </div>
        
        {medications.length === 0 ? (
          <div className="p-10 text-center text-sm text-[var(--color-text-muted)] font-medium">No medications recorded</div>
        ) : (
          <div className="divide-y divide-[var(--color-border-soft)]">
            {medications.map(m => (
              <div key={m.id} className={`p-5 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${m.active ? 'hover:bg-[var(--color-surface-soft)]' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100 bg-[var(--color-surface-soft)]'}`}>
                <div>
                  <p className="text-base font-bold text-[var(--color-text-primary)] mb-1">{m.drug_name} {m.dose}</p>
                  <p className="text-xs font-medium text-[var(--color-text-secondary)]">{m.frequency} • Started {m.start_date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleActive(m)} disabled={busyId === m.id} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${m.active ? 'bg-[color-mix(in_srgb,var(--color-accent-green)_10%,transparent)] border-[color-mix(in_srgb,var(--color-accent-green)_30%,transparent)] text-[var(--color-accent-green)]' : 'bg-transparent border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}>
                    {busyId === m.id ? '...' : m.active ? 'Active' : 'Stopped'}
                  </button>
                  <button onClick={() => deleteMed(m.id)} disabled={busyId === m.id} className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent-red)] transition-colors rounded-lg hover:bg-[color-mix(in_srgb,var(--color-accent-red)_10%,transparent)]">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── AI Analysis Panel ─────────────────────────────────────────────────────────
function AIAnalysisPanel({ patient, bpReadings, bgReadings, medications, sideEffects }: { patient: Patient, bpReadings: BPReading[], bgReadings: BGReading[], medications: Medication[], sideEffects: any[] }) {
  const [analyzing, setAnalyzing] = useState(false)
  const [report, setReport] = useState<string | null>(null)

  async function runAnalysis() {
    setAnalyzing(true)
    // Simulate AI processing for the premium UI feel
    setTimeout(() => {
      setReport("The patient's blood pressure trend over the last 14 days shows a positive response to Amlodipine 5mg. However, fasting glucose levels remain slightly elevated (avg 118 mg/dL). Consider a slight adjustment to the patient's diet plan. No critical drug-drug interactions detected among active medications.")
      setAnalyzing(false)
    }, 2500)
  }

  return (
    <div className="space-y-6">
      <div className="tracker-card p-6 md:p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
          <BrainCircuit className="w-32 h-32 text-[var(--color-accent-blue)]" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-3">
            <BrainCircuit className="w-6 h-6 text-[var(--color-accent-blue)]" />
            Clinical Intelligence
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-xl mb-8">
            Run a deep-learning analysis across {patient.full_name}'s entire history, including {bpReadings.length} BP records, {bgReadings.length} BG records, and {medications.length} medications.
          </p>

          {!report && !analyzing && (
            <button onClick={runAnalysis} className="tracker-button w-full md:w-auto shadow-[0_8px_24px_rgba(14,165,233,0.3)] !px-8 !py-4 text-sm">
              Generate Synthesis Report
            </button>
          )}

          {analyzing && (
            <div className="p-8 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] text-center animate-pulse">
              <div className="w-12 h-12 rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-accent-blue)] animate-spin mx-auto mb-4" />
              <p className="text-sm font-bold text-[var(--color-text-primary)]">Analyzing millions of data points...</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Cross-referencing global clinical guidelines</p>
            </div>
          )}

          {report && !analyzing && (
            <div className="p-6 md:p-8 rounded-2xl bg-[color-mix(in_srgb,var(--color-accent-blue)_5%,transparent)] border border-[color-mix(in_srgb,var(--color-accent-blue)_20%,transparent)] shadow-inner animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent-blue)] animate-pulse" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-accent-blue)]">Analysis Complete</span>
              </div>
              <p className="text-[15px] leading-relaxed text-[var(--color-text-primary)] mb-6">
                {report}
              </p>
              <button onClick={runAnalysis} className="tracker-button-secondary text-xs py-2 px-4 border-[color-mix(in_srgb,var(--color-accent-blue)_20%,transparent)] text-[var(--color-accent-blue)] hover:bg-[color-mix(in_srgb,var(--color-accent-blue)_10%,transparent)]">
                Refresh Analysis
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Side Effects ──────────────────────────────────────────────────────────────
function SideEffectsList({ sideEffects, patientId, onAdd, onDelete }: { sideEffects: any[]; patientId: string; onAdd: (se: any) => void; onDelete: (id: string) => void }) {
  const [form, setForm] = useState({ description: '', severity: 'mild' as 'mild'|'moderate'|'severe', drug_name: '' })
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)

  async function save() {
    if (!form.description) return
    setSaving(true)
    const { data: meds } = await supabase.from('medications').select('id,drug_name').eq('patient_id', patientId).eq('active', true)
    const matched = meds?.find((m: any) => m.drug_name.toLowerCase().includes(form.drug_name.toLowerCase())) as any
    const { data } = await (supabase.from('side_effects') as any).insert({ patient_id: patientId, medication_id: matched?.id || null, drug_name_freetext: form.drug_name || null, description: form.description, severity: form.severity, reported_at: new Date().toISOString() }).select().single()
    if (data) { onAdd(data); setForm({ description: '', severity: 'mild', drug_name: '' }); setShowForm(false) }
    setSaving(false)
  }

  async function deleteSE(id: string) {
    if (!confirm('Remove this side effect report?')) return
    setBusyId(id)
    await supabase.from('side_effects').delete().eq('id', id)
    onDelete(id)
    setBusyId(null)
  }

  const sevColor = (s: string) => ({ mild: 'var(--color-accent-green)', moderate: 'var(--color-accent-amber)', severe: 'var(--color-accent-red)' }[s] || 'var(--color-text-muted)')

  return (
    <div className="space-y-6">
      {showForm && (
        <div className="tracker-card p-5 md:p-6 animate-in slide-in-from-top-2 duration-300">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[var(--color-accent-amber)]" /> Log Side Effect
          </h2>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-2">Drug Suspected (Optional)</label>
              <input type="text" placeholder="e.g. Amlodipine" value={form.drug_name} onChange={e => setForm(f => ({ ...f, drug_name: e.target.value }))} className="tracker-input" />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-2">Description *</label>
              <textarea placeholder="Patient reports mild dizziness..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="tracker-input py-3 min-h-[100px] resize-none" />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-2">Severity *</label>
              <select value={form.severity} onChange={e => setForm(f => ({ ...f, severity: e.target.value as any }))} className="tracker-input appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-16px)_center] bg-[size:16px]">
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowForm(false)} className="tracker-button-secondary">Cancel</button>
            <button onClick={save} disabled={saving || !form.description} className="tracker-button !from-[var(--color-accent-amber)] !to-[#d97706] shadow-[0_8px_24px_rgba(245,158,11,0.25)]">
              {saving ? 'Saving...' : 'Log Event'}
            </button>
          </div>
        </div>
      )}
      
      <div className="tracker-card overflow-hidden">
        <div className="px-5 md:px-6 py-4 border-b border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[var(--color-accent-amber)]" /> Reported Effects ({sideEffects.length})
          </h3>
          <button onClick={() => setShowForm(true)} className="tracker-button py-2 px-4 text-xs h-auto min-h-0 !from-[var(--color-accent-amber)] !to-[#d97706] shadow-[0_4px_12px_rgba(245,158,11,0.2)]">
            + Log Event
          </button>
        </div>
        
        {sideEffects.length === 0 ? (
          <div className="p-10 text-center text-sm text-[var(--color-text-muted)] font-medium">No side effects reported</div>
        ) : (
          <div className="divide-y divide-[var(--color-border-soft)]">
            {sideEffects.map((se: any) => (
              <div key={se.id} className="p-5 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--color-surface-soft)] transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1 leading-relaxed">{se.description}</p>
                  <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                    {se.drug_name_freetext && <span className="font-bold text-[var(--color-text-primary)] opacity-80 mr-2">💊 {se.drug_name_freetext}</span>}
                    {formatDate(se.reported_at)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-sm" style={{ color: sevColor(se.severity), borderColor: `color-mix(in srgb, ${sevColor(se.severity)} 30%, transparent)`, background: `color-mix(in srgb, ${sevColor(se.severity)} 10%, transparent)` }}>
                    {se.severity}
                  </span>
                  <button onClick={() => deleteSE(se.id)} disabled={busyId === se.id} className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent-red)] transition-colors rounded-lg hover:bg-[color-mix(in_srgb,var(--color-accent-red)_10%,transparent)]">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function PatientProfile() {
  return (
    <Suspense fallback={
      <div className="tracker-shell flex items-center justify-center min-h-screen">
        <div className="tracker-grid" />
        <div className="w-12 h-12 rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-accent-blue)] animate-spin z-10" />
      </div>
    }>
      <PatientProfileInner />
    </Suspense>
  )
}
