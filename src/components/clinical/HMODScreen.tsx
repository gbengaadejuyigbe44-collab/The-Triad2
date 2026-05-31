'use client'

// ─── HMOD Screen ──────────────────────────────────────────────────────────────
// Hypertension-Mediated Organ Damage rapid bedside assessment.
// 5 systems — Brain, Heart, Kidneys, Retina, Arteries.
// Each system: yes/no + sub-questions that expand on YES.
// Completable in under 3 minutes.
// Output: organ(s) threatened → targeted drug recommendation → Emergency confirmed/ruled out
// This is the triage tool before every hypertensive treatment decision.

import { useState, useEffect } from 'react'
import { Abbr } from '@/components/clinical/AbbreviationTooltip'

interface SubQuestion {
  id: string
  text: string
  redFlag?: boolean
}

interface System {
  id: string
  name: string
  color: string
  bg: string
  icon: string
  screeningQuestion: string
  subQuestions: SubQuestion[]
  ifPositive: {
    organThreat: string
    targetedDrug: string
    drugNote: string
    urgency: 'immediate' | 'urgent' | 'monitor'
  }
  ifNegative: string
}

const SYSTEMS: System[] = [
  {
    id: 'brain',
    name: 'Brain',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    icon: '🧠',
    screeningQuestion: 'Does the patient have: severe headache, visual disturbance, confusion, drowsiness, or focal neurological deficit?',
    subQuestions: [
      { id: 'headache', text: 'Severe, sudden, or "worst ever" headache', redFlag: true },
      { id: 'vision', text: 'Visual changes — blurring, double vision, or loss of vision', redFlag: true },
      { id: 'confusion', text: 'Confusion, agitation, or altered consciousness' },
      { id: 'neuro', text: 'Facial droop, arm weakness, slurred speech, or other focal deficit', redFlag: true },
      { id: 'seizure', text: 'Seizure in pregnancy or postpartum', redFlag: true },
    ],
    ifPositive: {
      organThreat: 'Hypertensive Encephalopathy / Intracranial Event',
      targetedDrug: 'IV Labetalol or IV Nicardipine',
      drugNote: 'Target: reduce MAP by no more than 15–25% in first hour. If stroke suspected — DO NOT lower BP rapidly (target <180/105 if thrombolysis planned). If eclampsia — IV MgSO4 + IV Hydralazine.',
      urgency: 'immediate',
    },
    ifNegative: 'No cerebral HMOD signs.',
  },
  {
    id: 'heart',
    name: 'Heart',
    color: '#e11d48',
    bg: 'rgba(225,29,72,0.08)',
    icon: '🫀',
    screeningQuestion: 'Does the patient have: chest pain, shortness of breath at rest, or new symptoms suggesting cardiac involvement?',
    subQuestions: [
      { id: 'chestpain', text: 'Chest pain or tightness', redFlag: true },
      { id: 'dyspnoea', text: 'Sudden onset dyspnoea or orthopnoea' },
      { id: 's3', text: 'S3 gallop or new crackles at lung bases on auscultation', redFlag: true },
      { id: 'palpitations', text: 'New palpitations or irregular pulse' },
      { id: 'diaphoresis', text: 'Diaphoresis (sweating) with chest symptoms', redFlag: true },
    ],
    ifPositive: {
      organThreat: 'Acute Coronary Syndrome / Acute Pulmonary Oedema',
      targetedDrug: 'IV GTN (nitrates) ± IV Labetalol',
      drugNote: 'GTN for APO and ACS. Labetalol for rate control and BP reduction. Avoid negative inotropes in severe LV dysfunction. Target SBP 160 mmHg initially — do not reduce rapidly.',
      urgency: 'immediate',
    },
    ifNegative: 'No cardiac HMOD signs.',
  },
  {
    id: 'kidneys',
    name: 'Kidneys',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.08)',
    icon: '🫘',
    screeningQuestion: 'Does the patient have: reduced urine output, blood in urine, new leg swelling, or known rising creatinine?',
    subQuestions: [
      { id: 'oliguria', text: 'Oliguria — urine output <0.5 mL/kg/hr or noticeably reduced' },
      { id: 'haematuria', text: 'Frank haematuria (blood in urine)', redFlag: true },
      { id: 'oedema', text: 'New or worsening leg oedema' },
      { id: 'creatinine', text: 'Known acute rise in creatinine or urea (recent bloods)' },
      { id: 'proteinuria', text: 'Proteinuria on dipstick or known nephrotic syndrome', redFlag: true },
    ],
    ifPositive: {
      organThreat: 'Hypertensive Nephropathy / AKI',
      targetedDrug: 'IV Labetalol',
      drugNote: 'Avoid ACEi/ARB acutely in new AKI until stabilised. Target MAP reduction of 20–25% over first 2–6 hours. Monitor creatinine and urine output closely. Renal involvement is a medical emergency.',
      urgency: 'immediate',
    },
    ifNegative: 'No renal HMOD signs.',
  },
  {
    id: 'retina',
    name: 'Retina',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
    icon: '👁',
    screeningQuestion: 'Does the patient report: sudden visual loss, blurring, flashing lights, or new visual field defects?',
    subQuestions: [
      { id: 'blurring', text: 'Blurred vision — new onset or acutely worsening' },
      { id: 'flashlights', text: 'Flashing lights or floaters' },
      { id: 'fieldloss', text: 'Visual field defect — part of vision missing', redFlag: true },
      { id: 'suddenloss', text: 'Sudden complete or partial loss of vision in one eye', redFlag: true },
      { id: 'papilloedema', text: 'Papilloedema or retinal haemorrhages on fundoscopy (if performed)', redFlag: true },
    ],
    ifPositive: {
      organThreat: 'Hypertensive Retinopathy / Papilloedema',
      targetedDrug: 'IV Labetalol',
      drugNote: 'Papilloedema with hypertension = hypertensive encephalopathy until proven otherwise. Sudden unilateral visual loss + hypertension = consider central retinal artery occlusion — ophthalmology emergency. Fundoscopy if available.',
      urgency: 'immediate',
    },
    ifNegative: 'No retinal HMOD signs.',
  },
  {
    id: 'arteries',
    name: 'Arteries',
    color: '#059669',
    bg: 'rgba(5,150,105,0.08)',
    icon: '🩸',
    screeningQuestion: 'Does the patient have: tearing chest/back pain, absent or asymmetric pulses, cold or pulseless limb?',
    subQuestions: [
      { id: 'tearingpain', text: 'Tearing or ripping chest pain radiating to back', redFlag: true },
      { id: 'pulsedeficit', text: 'Asymmetric blood pressure between arms (>20 mmHg difference)', redFlag: true },
      { id: 'absentpulse', text: 'Absent or diminished peripheral pulse in a limb' },
      { id: 'coldlimb', text: 'Cold, pale, or pulseless limb', redFlag: true },
      { id: 'legpain', text: 'Acute severe leg pain without trauma' },
    ],
    ifPositive: {
      organThreat: 'Aortic Dissection / Acute Limb Ischaemia',
      targetedDrug: 'IV Labetalol (NOT GTN alone)',
      drugNote: 'Aortic dissection: target SBP <120 mmHg with IV Labetalol (rate + pressure control). Avoid vasodilators alone — reflex tachycardia worsens dissection. Surgical emergency — activate cardiothoracic team immediately. Do NOT delay for imaging if haemodynamically unstable.',
      urgency: 'immediate',
    },
    ifNegative: 'No arterial HMOD signs.',
  },
]

type YesNo = 'yes' | 'no' | null

interface SystemState {
  answer: YesNo
  subAnswers: Record<string, boolean>
}

function SystemCard({
  system,
  state,
  isActive,
  isCompleted,
  onActivate,
  onAnswer,
  onSubAnswer,
}: {
  system: System
  state: SystemState
  isActive: boolean
  isCompleted: boolean
  onActivate: () => void
  onAnswer: (a: YesNo) => void
  onSubAnswer: (id: string, v: boolean) => void
}) {
  const positiveSubFlags = system.subQuestions.filter(
    sq => state.subAnswers[sq.id] && sq.redFlag
  )

  return (
    <div
      style={{
        borderRadius: '14px',
        border: `1.5px solid ${isActive ? system.color : isCompleted ? (state.answer === 'yes' ? system.color : 'var(--color-border)') : 'var(--color-border)'}`,
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: isActive ? `0 0 0 3px ${system.bg}` : 'none',
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={onActivate}
        style={{
          width: '100%',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: isActive ? system.bg : 'var(--color-bg-elevated)',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          textAlign: 'left',
          transition: 'background 0.2s',
        }}
      >
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: system.bg,
          border: `1.5px solid ${system.color}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          flexShrink: 0,
        }}>
          {system.icon}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {system.name}
          </div>
          {isCompleted && (
            <div style={{
              fontSize: '0.75rem',
              color: state.answer === 'yes' ? system.color : 'var(--color-accent-green)',
              fontWeight: 500,
            }}>
              {state.answer === 'yes'
                ? `⚠ Signs present — ${positiveSubFlags.length} red flag${positiveSubFlags.length !== 1 ? 's' : ''}`
                : '✓ Clear'}
            </div>
          )}
        </div>

        <div style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}>
          ▼
        </div>
      </button>

      {/* Expanded content */}
      {isActive && (
        <div style={{ padding: '16px', borderTop: `1px solid ${system.color}20` }}>
          {/* Screening question */}
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            margin: '0 0 14px',
          }}>
            {system.screeningQuestion}
          </p>

          {/* Yes / No */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: 16 }}>
            <button
              onClick={() => onAnswer('yes')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: `2px solid ${state.answer === 'yes' ? system.color : 'var(--color-border)'}`,
                background: state.answer === 'yes' ? system.bg : 'transparent',
                color: state.answer === 'yes' ? system.color : 'var(--color-text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
            >
              Yes — symptoms present
            </button>
            <button
              onClick={() => onAnswer('no')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: `2px solid ${state.answer === 'no' ? 'var(--color-accent-green)' : 'var(--color-border)'}`,
                background: state.answer === 'no' ? 'rgba(5,150,105,0.08)' : 'transparent',
                color: state.answer === 'no' ? 'var(--color-accent-green)' : 'var(--color-text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
            >
              No — all clear
            </button>
          </div>

          {/* Sub-questions (shown when YES) */}
          {state.answer === 'yes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 16 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                Which symptoms are present?
              </div>
              {system.subQuestions.map(sq => (
                <label
                  key={sq.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: state.subAnswers[sq.id]
                      ? (sq.redFlag ? 'rgba(220,38,38,0.06)' : system.bg)
                      : 'transparent',
                    border: `1px solid ${state.subAnswers[sq.id] ? (sq.redFlag ? 'rgba(220,38,38,0.2)' : system.color + '30') : 'transparent'}`,
                    transition: 'all 0.15s',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!state.subAnswers[sq.id]}
                    onChange={e => onSubAnswer(sq.id, e.target.checked)}
                    style={{ marginTop: 2, accentColor: system.color }}
                  />
                  <span style={{
                    fontSize: '0.85rem',
                    color: state.subAnswers[sq.id] && sq.redFlag ? '#dc2626' : 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                    flex: 1,
                    fontWeight: state.subAnswers[sq.id] && sq.redFlag ? 600 : 400,
                  }}>
                    {sq.text}
                    {sq.redFlag && (
                      <span style={{
                        marginLeft: 6,
                        fontSize: '0.7rem',
                        color: '#dc2626',
                        background: 'rgba(220,38,38,0.1)',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontWeight: 700,
                      }}>
                        RED FLAG
                      </span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* Output when YES */}
          {state.answer === 'yes' && (
            <div style={{
              padding: '14px',
              borderRadius: '10px',
              background: system.bg,
              border: `1px solid ${system.color}30`,
            }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: system.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                Organ at risk
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 8 }}>
                {system.ifPositive.organThreat}
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                Targeted drug
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: system.color, marginBottom: 6 }}>
                {system.ifPositive.targetedDrug}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                {system.ifPositive.drugNote}
              </div>
            </div>
          )}

          {/* Output when NO */}
          {state.answer === 'no' && (
            <div style={{
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(5,150,105,0.06)',
              border: '1px solid rgba(5,150,105,0.2)',
              fontSize: '0.85rem',
              color: 'var(--color-accent-green)',
              fontWeight: 600,
            }}>
              ✓ {system.ifNegative}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── SUMMARY OUTPUT ────────────────────────────────────────────────────────────

function HMODSummary({ systemStates }: { systemStates: Record<string, SystemState> }) {
  const affected = SYSTEMS.filter(s => systemStates[s.id]?.answer === 'yes')
  const clear = SYSTEMS.filter(s => systemStates[s.id]?.answer === 'no')
  const unassessed = SYSTEMS.filter(s => !systemStates[s.id]?.answer)
  const allDone = unassessed.length === 0
  const isEmergency = affected.length > 0

  if (!allDone && affected.length === 0) return null

  return (
    <div style={{
      borderRadius: '16px',
      overflow: 'hidden',
      border: `1.5px solid ${isEmergency ? 'rgba(220,38,38,0.35)' : 'rgba(5,150,105,0.3)'}`,
      boxShadow: isEmergency ? '0 0 0 4px rgba(220,38,38,0.06)' : '0 0 0 4px rgba(5,150,105,0.06)',
    }}>
      <div style={{
        padding: '16px 20px',
        background: isEmergency ? 'rgba(220,38,38,0.1)' : 'rgba(5,150,105,0.08)',
        borderBottom: `1px solid ${isEmergency ? 'rgba(220,38,38,0.15)' : 'rgba(5,150,105,0.15)'}`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: isEmergency ? '#dc2626' : '#059669',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          color: 'white',
        }}>
          {isEmergency ? '⚠' : '✓'}
        </div>
        <div>
          <div style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: isEmergency ? '#dc2626' : '#059669',
            marginBottom: 2,
          }}>
            HMOD Assessment Result
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {isEmergency
              ? `Hypertensive Emergency — ${affected.length} system${affected.length > 1 ? 's' : ''} involved`
              : 'Asymptomatic Markedly Elevated BP — no organ damage detected'}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px', background: 'var(--color-bg-elevated)' }}>
        {isEmergency ? (
          <>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                Systems with organ damage
              </div>
              {affected.map(s => (
                <div key={s.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  marginBottom: 4,
                  borderRadius: '8px',
                  background: s.bg,
                  border: `1px solid ${s.color}25`,
                }}>
                  <span>{s.icon}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', flex: 1 }}>
                    {s.name} — <span style={{ color: s.color }}>{s.ifPositive.targetedDrug}</span>
                  </span>
                </div>
              ))}
            </div>

            <div style={{
              padding: '12px 14px',
              borderRadius: '10px',
              background: 'rgba(220,38,38,0.06)',
              border: '1px solid rgba(220,38,38,0.15)',
              fontSize: '0.82rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}>
              <strong style={{ color: '#dc2626' }}>MAP reduction target:</strong>{' '}
              No more than 25% in the first hour.
              Then to 160/100 mmHg over 2–6 hours.
              <strong style={{ color: '#dc2626' }}> Never reduce rapidly to normal</strong> — causes stroke, blindness, or MI.
            </div>
          </>
        ) : (
          <div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
              No organ damage detected. This is <strong>Asymptomatic Markedly Elevated BP</strong> — not a hypertensive emergency.
              The 2024 <Abbr term="AHA" /> removed the term "hypertensive urgency" entirely.
            </p>
            <div style={{
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(5,150,105,0.08)',
              border: '1px solid rgba(5,150,105,0.2)',
              fontSize: '0.85rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
            }}>
              <strong style={{ color: '#059669' }}>Management:</strong>{' '}
              Oral antihypertensives, gradual reduction over 24–48 hours, outpatient follow-up.
              No hospital admission required unless social concern. Review medications and adherence.
            </div>
          </div>
        )}

        {unassessed.length > 0 && (
          <div style={{
            marginTop: 12,
            fontSize: '0.78rem',
            color: 'var(--color-text-muted)',
            padding: '6px 10px',
            background: 'var(--color-bg)',
            borderRadius: '8px',
          }}>
            {unassessed.length} system{unassessed.length > 1 ? 's' : ''} not yet assessed: {unassessed.map(s => s.name).join(', ')}
          </div>
        )}
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export function HMODScreen() {
  const [activeSystem, setActiveSystem] = useState<string>('brain')
  const [systemStates, setSystemStates] = useState<Record<string, SystemState>>({})
  const [startTime] = useState(Date.now())
  const [elapsed, setElapsed] = useState(0)

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [startTime])

  const formatElapsed = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const completedCount = Object.values(systemStates).filter(s => s.answer).length
  const progress = (completedCount / SYSTEMS.length) * 100

  function getState(id: string): SystemState {
    return systemStates[id] ?? { answer: null, subAnswers: {} }
  }

  function setAnswer(id: string, answer: YesNo) {
    setSystemStates(prev => ({
      ...prev,
      [id]: { ...getState(id), answer },
    }))
    // Auto-advance to next system
    if (answer === 'no') {
      const idx = SYSTEMS.findIndex(s => s.id === id)
      if (idx < SYSTEMS.length - 1) {
        setTimeout(() => setActiveSystem(SYSTEMS[idx + 1].id), 300)
      }
    }
  }

  function setSubAnswer(systemId: string, subId: string, value: boolean) {
    setSystemStates(prev => ({
      ...prev,
      [systemId]: {
        ...getState(systemId),
        subAnswers: { ...getState(systemId).subAnswers, [subId]: value },
      },
    }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: 600 }}>

      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: 0 }}>
            <Abbr term="HMOD" /> Screen
          </h2>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: elapsed > 180 ? '#dc2626' : elapsed > 120 ? '#d97706' : 'var(--color-accent-green)',
            padding: '4px 10px',
            borderRadius: '20px',
            background: elapsed > 180 ? 'rgba(220,38,38,0.08)' : elapsed > 120 ? 'rgba(217,119,6,0.08)' : 'rgba(5,150,105,0.08)',
          }}>
            {formatElapsed(elapsed)} / 3:00
          </div>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0 0 10px', lineHeight: 1.5 }}>
          Five-system bedside assessment. Complete before every hypertensive treatment decision.
          Presence of organ damage determines Emergency vs Asymptomatic Elevated BP.
        </p>

        {/* Progress bar */}
        <div style={{ height: 4, background: 'var(--color-border)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--color-accent-blue)',
            borderRadius: 2,
            transition: 'width 0.4s ease',
          }} />
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
          {completedCount}/{SYSTEMS.length} systems assessed
        </div>
      </div>

      {/* System cards */}
      {SYSTEMS.map(system => (
        <SystemCard
          key={system.id}
          system={system}
          state={getState(system.id)}
          isActive={activeSystem === system.id}
          isCompleted={!!getState(system.id).answer}
          onActivate={() => setActiveSystem(prev => prev === system.id ? '' : system.id)}
          onAnswer={a => setAnswer(system.id, a)}
          onSubAnswer={(subId, val) => setSubAnswer(system.id, subId, val)}
        />
      ))}

      {/* Summary */}
      <HMODSummary systemStates={systemStates} />

      {/* Reset */}
      {completedCount > 0 && (
        <button
          onClick={() => {
            setSystemStates({})
            setActiveSystem('brain')
          }}
          style={{
            background: 'none',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            padding: '10px',
            color: 'var(--color-text-muted)',
            fontSize: '0.82rem',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Reset assessment
        </button>
      )}
    </div>
  )
}
