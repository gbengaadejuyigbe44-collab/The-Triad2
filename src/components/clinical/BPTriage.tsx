'use client'

// ─── BP Triage ────────────────────────────────────────────────────────────────
// The front door of Hypertension Complex.
// Three BP readings entered → live MAP calculation → one of two outputs:
//   EMERGENCY: BP ≥180/110–120 WITH new/worsening organ damage suspected
//   ASYMPTOMATIC ELEVATED BP: same BP WITHOUT organ damage
// This room replaces the sublingual nifedipine reflex.
// 2024 AHA terminology throughout — "urgency" does not appear.

import { useState, useCallback } from 'react'
import { Abbr } from '@/components/clinical/AbbreviationTooltip'
import { useRegion } from '@/lib/region'

interface BPReading {
  sbp: string
  dbp: string
}

interface ClassificationResult {
  category: string
  label: string
  color: string
  bg: string
  border: string
  description: string
  action: string
  isEmergency: boolean
  isCrisis: boolean
}

function classifyBP(sbp: number, dbp: number): ClassificationResult {
  // ESC 2024 + ESH 2023 classification
  if (sbp >= 180 || dbp >= 120) {
    return {
      category: 'Markedly Elevated',
      label: 'BP is markedly elevated — assess for organ damage immediately',
      color: '#dc2626',
      bg: 'rgba(220,38,38,0.08)',
      border: 'rgba(220,38,38,0.3)',
      description: 'BP ≥180/120 mmHg. This reading alone does not determine treatment urgency. The next step is HMOD assessment — organ damage present means Emergency; absent means Asymptomatic Elevated BP.',
      action: 'Proceed to HMOD Screen',
      isEmergency: false,
      isCrisis: true,
    }
  }
  if (sbp >= 160 || dbp >= 100) {
    return {
      category: 'Grade 3 Hypertension',
      label: 'Severe Hypertension — initiate treatment',
      color: '#ea580c',
      bg: 'rgba(234,88,12,0.08)',
      border: 'rgba(234,88,12,0.25)',
      description: 'BP ≥160/100 mmHg. Initiate antihypertensive therapy. Assess for symptoms of organ involvement.',
      action: 'Review Treatment options',
      isEmergency: false,
      isCrisis: false,
    }
  }
  if (sbp >= 140 || dbp >= 90) {
    return {
      category: 'Grade 1–2 Hypertension',
      label: 'Hypertension — confirm and treat',
      color: '#d97706',
      bg: 'rgba(217,119,6,0.08)',
      border: 'rgba(217,119,6,0.25)',
      description: 'BP ≥140/90 mmHg. Confirm with repeat reading after 1–5 minutes. Initiate treatment based on ASCVD risk and HMOD.',
      action: 'Assess ASCVD Risk',
      isEmergency: false,
      isCrisis: false,
    }
  }
  if (sbp >= 130 || dbp >= 80) {
    return {
      category: 'High Normal',
      label: 'High-normal blood pressure',
      color: '#ca8a04',
      bg: 'rgba(202,138,4,0.06)',
      border: 'rgba(202,138,4,0.2)',
      description: 'BP 130–139/80–89 mmHg. Lifestyle modification indicated. Pharmacotherapy if high ASCVD risk or established CVD.',
      action: 'Check ASCVD Risk',
      isEmergency: false,
      isCrisis: false,
    }
  }
  if (sbp >= 120 || dbp >= 70) {
    return {
      category: 'Elevated BP',
      label: 'Elevated blood pressure — ESC 2024',
      color: '#0891b2',
      bg: 'rgba(8,145,178,0.06)',
      border: 'rgba(8,145,178,0.2)',
      description: 'BP 120–129/70–79 mmHg. New ESC 2024 category. Intensive lifestyle counselling. No pharmacotherapy unless very high risk.',
      action: 'Lifestyle counselling',
      isEmergency: false,
      isCrisis: false,
    }
  }
  return {
    category: 'Optimal / Normal',
    label: 'Blood pressure is normal',
    color: '#059669',
    bg: 'rgba(5,150,105,0.06)',
    border: 'rgba(5,150,105,0.2)',
    description: 'BP <120/70 mmHg. Optimal range. Reinforce lifestyle. Annual monitoring recommended.',
    action: 'Routine follow-up',
    isEmergency: false,
    isCrisis: false,
  }
}

function calcMAP(sbp: number, dbp: number): number {
  return Math.round(dbp + (sbp - dbp) / 3)
}

function avgReading(readings: BPReading[]): { sbp: number; dbp: number } | null {
  const valid = readings.filter(r => r.sbp && r.dbp && !isNaN(+r.sbp) && !isNaN(+r.dbp))
  if (valid.length === 0) return null
  const sbp = Math.round(valid.reduce((s, r) => s + +r.sbp, 0) / valid.length)
  const dbp = Math.round(valid.reduce((s, r) => s + +r.dbp, 0) / valid.length)
  return { sbp, dbp }
}

function ReadingInput({
  index,
  reading,
  onChange,
}: {
  index: number
  reading: BPReading
  onChange: (r: BPReading) => void
}) {
  const sbpNum = +reading.sbp
  const dbpNum = +reading.dbp
  const mapVal = reading.sbp && reading.dbp && !isNaN(sbpNum) && !isNaN(dbpNum)
    ? calcMAP(sbpNum, dbpNum)
    : null

  return (
    <div style={{
      background: 'var(--color-bg-elevated)',
      border: '1px solid var(--color-border)',
      borderRadius: '14px',
      padding: '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <div style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        Reading {index + 1}
        {index === 0 && <span style={{ marginLeft: 8, color: 'var(--color-accent-blue)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
          — wait 5 min before reading 2
        </span>}
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {/* SBP */}
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: 4 }}>
            <Abbr term="SBP" /> (mmHg)
          </label>
          <input
            type="number"
            min={50}
            max={300}
            placeholder="e.g. 180"
            value={reading.sbp}
            onChange={e => onChange({ ...reading, sbp: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1.5px solid var(--color-border)',
              background: 'var(--color-bg)',
              color: 'var(--color-text-primary)',
              fontSize: '1.1rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--color-accent-blue)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>

        <div style={{
          fontSize: '1.4rem',
          color: 'var(--color-text-muted)',
          paddingTop: '18px',
          fontWeight: 300,
        }}>/</div>

        {/* DBP */}
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: 4 }}>
            <Abbr term="DBP" /> (mmHg)
          </label>
          <input
            type="number"
            min={30}
            max={200}
            placeholder="e.g. 120"
            value={reading.dbp}
            onChange={e => onChange({ ...reading, dbp: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1.5px solid var(--color-border)',
              background: 'var(--color-bg)',
              color: 'var(--color-text-primary)',
              fontSize: '1.1rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--color-accent-blue)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>

        {/* Live MAP */}
        {mapVal !== null && (
          <div style={{ textAlign: 'center', minWidth: 60, paddingTop: '14px' }}>
            <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
              <Abbr term="MAP" />
            </div>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: mapVal >= 65 ? 'var(--color-accent-green)' : mapVal >= 60 ? 'var(--color-accent-amber)' : 'var(--color-accent-red)',
            }}>
              {mapVal}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── RESULT CARD ───────────────────────────────────────────────────────────────

function EmergencyBranchCard({ onGoToHMOD }: { onGoToHMOD: () => void }) {
  return (
    <div style={{
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1.5px solid rgba(220,38,38,0.35)',
      boxShadow: '0 0 0 4px rgba(220,38,38,0.06)',
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(220,38,38,0.12)',
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid rgba(220,38,38,0.15)',
      }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: '#dc2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          flexShrink: 0,
          animation: 'pulse 1.5s ease-in-out infinite',
        }}>
          ⚠
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#dc2626', marginBottom: 2 }}>
            Markedly Elevated BP
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            Assess for organ damage now
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 20px', background: 'var(--color-bg-elevated)' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 16px' }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>The BP number alone does not determine treatment urgency.</strong>{' '}
          The 2024 <Abbr term="AHA" /> replaced the term "hypertensive urgency" entirely.
          What matters now is whether there is new or worsening organ damage — <Abbr term="HMOD" />.
        </p>

        {/* Two branches */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            padding: '14px',
            borderRadius: '12px',
            background: 'rgba(220,38,38,0.08)',
            border: '1px solid rgba(220,38,38,0.2)',
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              Emergency
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              BP ≥180/110–120 mmHg <strong>WITH</strong> new or worsening organ damage
            </div>
            <div style={{ fontSize: '0.78rem', color: '#dc2626', marginTop: 6, fontWeight: 600 }}>
              → IV therapy, ICU/HDU, controlled reduction
            </div>
          </div>

          <div style={{
            padding: '14px',
            borderRadius: '12px',
            background: 'rgba(234,179,8,0.08)',
            border: '1px solid rgba(234,179,8,0.2)',
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ca8a04', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              Asymptomatic Elevated BP
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Same BP <strong>WITHOUT</strong> organ damage
            </div>
            <div style={{ fontSize: '0.78rem', color: '#ca8a04', marginTop: 6, fontWeight: 600 }}>
              → Oral agents, 24–48 hrs, outpatient follow-up
            </div>
          </div>
        </div>

        {/* Red flag */}
        <div style={{
          padding: '12px 14px',
          borderRadius: '10px',
          background: 'rgba(220,38,38,0.06)',
          border: '1px solid rgba(220,38,38,0.2)',
          marginBottom: '16px',
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>🚫</span>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#dc2626', marginBottom: 2 }}>
              Sublingual nifedipine is contraindicated
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Causes unpredictable rapid BP drop → stroke, MI, blindness. Still used in some facilities. Do not give.
            </div>
          </div>
        </div>

        <button
          onClick={onGoToHMOD}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            background: '#dc2626',
            color: 'white',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Proceed to HMOD Screen →
        </button>
      </div>
    </div>
  )
}

function ResultCard({
  result,
  avg,
  arm,
  onGoToHMOD,
}: {
  result: ClassificationResult
  avg: { sbp: number; dbp: number }
  arm: string
  onGoToHMOD: () => void
}) {
  if (result.isCrisis) {
    return <EmergencyBranchCard onGoToHMOD={onGoToHMOD} />
  }

  return (
    <div style={{
      borderRadius: '16px',
      overflow: 'hidden',
      border: `1.5px solid ${result.border}`,
    }}>
      <div style={{
        background: result.bg,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: `1px solid ${result.border}`,
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: result.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 800,
          fontSize: '0.8rem',
          flexShrink: 0,
        }}>
          {avg.sbp}/{avg.dbp}
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: result.color, marginBottom: 2 }}>
            {result.category}
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {result.label}
          </div>
        </div>
      </div>
      <div style={{ padding: '14px 20px', background: 'var(--color-bg-elevated)' }}>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 10px' }}>
          {result.description}
        </p>
        <div style={{
          fontSize: '0.82rem',
          fontWeight: 600,
          color: result.color,
          padding: '8px 12px',
          background: result.bg,
          borderRadius: '8px',
          display: 'inline-block',
        }}>
          → {result.action}
        </div>

        {arm && (
          <div style={{
            marginTop: '10px',
            fontSize: '0.78rem',
            color: 'var(--color-text-muted)',
            padding: '6px 10px',
            background: 'var(--color-bg)',
            borderRadius: '8px',
          }}>
            Higher reading arm: <strong>{arm}</strong> — use this arm for all subsequent readings
          </div>
        )}
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

interface BPTriageProps {
  onGoToHMOD?: () => void
}

export function BPTriage({ onGoToHMOD }: BPTriageProps) {
  const { region } = useRegion()

  const [readings, setReadings] = useState<[BPReading, BPReading, BPReading]>([
    { sbp: '', dbp: '' },
    { sbp: '', dbp: '' },
    { sbp: '', dbp: '' },
  ])
  const [arm, setArm] = useState<'Left' | 'Right' | ''>('')
  const [patientAge, setPatientAge] = useState('')

  const updateReading = useCallback((index: number, r: BPReading) => {
    setReadings(prev => {
      const next = [...prev] as [BPReading, BPReading, BPReading]
      next[index] = r
      return next
    })
  }, [])

  const average = avgReading(readings)
  const result = average ? classifyBP(average.sbp, average.dbp) : null
  const completedReadings = readings.filter(r => r.sbp && r.dbp && !isNaN(+r.sbp) && !isNaN(+r.dbp)).length
  const mapVal = average ? calcMAP(average.sbp, average.dbp) : null

  const isElderly = patientAge && +patientAge >= 65

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 600 }}>

      {/* Header */}
      <div>
        <h2 style={{
          fontSize: '1.3rem',
          fontWeight: 800,
          color: 'var(--color-text-primary)',
          margin: '0 0 6px',
        }}>
          BP Triage
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
          Enter three readings using attended automated office measurement.
          Patient seated, back supported, feet flat, arm at heart level.
          Rest 5 minutes before first reading. Wait 1–2 minutes between readings.
        </p>
        <div style={{
          marginTop: 8,
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          padding: '4px 10px',
          background: 'var(--color-bg)',
          borderRadius: '6px',
          display: 'inline-block',
        }}>
          Guideline: <strong>{region.guidelineHTN}</strong>
        </div>
      </div>

      {/* Patient age — affects targets */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>
            Patient age <span style={{ color: 'var(--color-text-muted)' }}>(optional — affects targets)</span>
          </label>
          <input
            type="number"
            min={0}
            max={120}
            placeholder="e.g. 68"
            value={patientAge}
            onChange={e => setPatientAge(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '10px',
              border: '1.5px solid var(--color-border)',
              background: 'var(--color-bg)',
              color: 'var(--color-text-primary)',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
              outline: 'none',
              width: '100%',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--color-accent-blue)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>
            Higher reading arm
          </label>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['Left', 'Right'] as const).map(a => (
              <button
                key={a}
                onClick={() => setArm(prev => prev === a ? '' : a)}
                style={{
                  padding: '9px 14px',
                  borderRadius: '10px',
                  border: `1.5px solid ${arm === a ? 'var(--color-accent-blue)' : 'var(--color-border)'}`,
                  background: arm === a ? 'rgba(14,165,233,0.1)' : 'var(--color-bg)',
                  color: arm === a ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
                  fontSize: '0.88rem',
                  fontWeight: arm === a ? 600 : 400,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Elderly target note */}
      {isElderly && (
        <div style={{
          padding: '10px 14px',
          borderRadius: '10px',
          background: 'rgba(139,92,246,0.08)',
          border: '1px solid rgba(139,92,246,0.2)',
          fontSize: '0.82rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
        }}>
          <strong style={{ color: 'var(--color-accent-purple)' }}>Elderly patient (≥65 yrs):</strong>{' '}
          Permissive BP target <strong>140–150 mmHg SBP</strong> per ESH 2023.
          Aggressive reduction to normal in elderly increases falls and cognitive risk.
          <Abbr term="MAP" /> target in shock: 60–65 mmHg (not 65+) per <Abbr term="SSC" /> 2026.
        </div>
      )}

      {/* Nigerian formulary note */}
      {region.code === 'NG' && (
        <div style={{
          padding: '10px 14px',
          borderRadius: '10px',
          background: 'rgba(16,185,129,0.08)',
          border: '1px solid rgba(16,185,129,0.2)',
          fontSize: '0.82rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
        }}>
          <strong style={{ color: 'var(--color-accent-green)' }}>Nigerian context:</strong>{' '}
          {region.bpThresholdNote}
        </div>
      )}

      {/* Three reading inputs */}
      {readings.map((r, i) => (
        <ReadingInput
          key={i}
          index={i}
          reading={r}
          onChange={reading => updateReading(i, reading)}
        />
      ))}

      {/* Progress indicator */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: i < completedReadings
                ? 'var(--color-accent-blue)'
                : 'var(--color-border)',
              transition: 'background 0.3s',
            }}
          />
        ))}
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', minWidth: 60, textAlign: 'right' }}>
          {completedReadings}/3 readings
        </span>
      </div>

      {/* Average display */}
      {average && (
        <div style={{
          display: 'flex',
          gap: '12px',
          padding: '14px 18px',
          borderRadius: '14px',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          alignItems: 'center',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
              Average ({completedReadings} reading{completedReadings !== 1 ? 's' : ''})
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
              {average.sbp}<span style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>/</span>{average.dbp}
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 400, marginLeft: 4 }}>mmHg</span>
            </div>
          </div>
          {mapVal !== null && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                <Abbr term="MAP" />
              </div>
              <div style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: mapVal >= 65 ? 'var(--color-accent-green)' : mapVal >= 60 ? 'var(--color-accent-amber)' : 'var(--color-accent-red)',
              }}>
                {mapVal}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Result */}
      {result && average && (
        <ResultCard
          result={result}
          avg={average}
          arm={arm}
          onGoToHMOD={onGoToHMOD ?? (() => {})}
        />
      )}

      {/* Protocol note */}
      <div style={{
        padding: '12px 14px',
        borderRadius: '10px',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border-soft)',
        fontSize: '0.78rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.5,
      }}>
        <strong style={{ color: 'var(--color-text-secondary)' }}>Measurement protocol:</strong>{' '}
        Attended automated office measurement (AOBP). Three readings, 1–2 min apart. Average of all three used.
        Measure both arms at first visit — use higher reading arm thereafter. Patient seated 5 min before measurement.
        No caffeine, exercise, or smoking 30 min before. ESH 2023 / <Abbr term="AHA" /> 2023.
      </div>
    </div>
  )
}
