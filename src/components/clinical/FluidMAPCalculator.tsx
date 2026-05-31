'use client'

// ─── Fluid & MAP Calculator ───────────────────────────────────────────────────
// Two calculators, one room.
// Calculator 1: Weight → 30 mL/kg bolus → 3-hour timeline with visual breakdown
// Calculator 2: SBP + DBP → MAP → flagged against target in real time
// SSC 2026 throughout. Age-adjusted MAP target (60–65 if ≥65 years).
// Bedside use — works with one hand.

import { useState } from 'react'
import { Abbr } from '@/components/clinical/AbbreviationTooltip'

// ── MAP Calculator ────────────────────────────────────────────────────────────

function MAPCalculator() {
  const [sbp, setSbp] = useState('')
  const [dbp, setDbp] = useState('')
  const [age, setAge] = useState('')

  const sbpNum = parseFloat(sbp)
  const dbpNum = parseFloat(dbp)
  const ageNum = parseFloat(age)
  const isElderly = !isNaN(ageNum) && ageNum >= 65

  const map = (!isNaN(sbpNum) && !isNaN(dbpNum))
    ? Math.round(dbpNum + (sbpNum - dbpNum) / 3)
    : null

  const target = isElderly ? 60 : 65
  const targetLabel = isElderly ? '60–65 mmHg (age ≥65, SSC 2026)' : '≥65 mmHg (SSC 2026)'

  type MAPStatus = 'danger' | 'borderline' | 'ok' | null
  let mapStatus: MAPStatus = null
  let mapColor = 'var(--color-text-primary)'
  let mapBg = 'var(--color-bg-elevated)'
  let mapBorder = 'var(--color-border)'
  let mapMessage = ''

  if (map !== null) {
    if (map < 60) {
      mapStatus = 'danger'
      mapColor = '#dc2626'
      mapBg = 'rgba(220,38,38,0.08)'
      mapBorder = 'rgba(220,38,38,0.3)'
      mapMessage = `MAP ${map} mmHg — critically low. Vasopressor indicated. Target ≥${target} mmHg.`
    } else if (map < target) {
      mapStatus = 'borderline'
      mapColor = '#d97706'
      mapBg = 'rgba(217,119,6,0.08)'
      mapBorder = 'rgba(217,119,6,0.25)'
      mapMessage = `MAP ${map} mmHg — below target. Optimise fluids and consider vasopressor. Target ≥${target} mmHg.`
    } else if (map >= target && map <= 90) {
      mapStatus = 'ok'
      mapColor = '#059669'
      mapBg = 'rgba(5,150,105,0.08)'
      mapBorder = 'rgba(5,150,105,0.25)'
      mapMessage = `MAP ${map} mmHg — within target range (${targetLabel}).`
    } else {
      mapStatus = 'ok'
      mapColor = '#0891b2'
      mapBg = 'rgba(8,145,178,0.06)'
      mapBorder = 'rgba(8,145,178,0.2)'
      mapMessage = `MAP ${map} mmHg — above target. Monitor — avoid excessive vasopressor use.`
    }
  }

  return (
    <div style={{
      padding: '20px',
      borderRadius: '16px',
      background: 'var(--color-bg-elevated)',
      border: '1px solid var(--color-border)',
    }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
        Calculator 2
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>
        <Abbr term="MAP" /> Calculator
      </h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '0 0 16px' }}>
        MAP = DBP + (SBP − DBP) ÷ 3
      </p>

      {/* Age */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>
          Patient age <span style={{ color: 'var(--color-text-muted)' }}>(adjusts MAP target)</span>
        </label>
        <input
          type="number"
          min={0}
          max={120}
          placeholder="e.g. 72"
          value={age}
          onChange={e => setAge(e.target.value)}
          style={{
            width: '100%',
            padding: '9px 12px',
            borderRadius: '10px',
            border: '1.5px solid var(--color-border)',
            background: 'var(--color-bg)',
            color: 'var(--color-text-primary)',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--color-accent-blue)')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
        />
        {isElderly && (
          <div style={{ fontSize: '0.72rem', color: '#7c3aed', marginTop: 4 }}>
            Age ≥65: permissive MAP target 60–65 mmHg per SSC 2026
          </div>
        )}
      </div>

      {/* SBP / DBP inputs */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>
            <Abbr term="SBP" /> (mmHg)
          </label>
          <input
            type="number"
            min={40}
            max={300}
            placeholder="e.g. 85"
            value={sbp}
            onChange={e => setSbp(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1.5px solid var(--color-border)',
              background: 'var(--color-bg)',
              color: 'var(--color-text-primary)',
              fontSize: '1.2rem',
              fontWeight: 700,
              fontFamily: 'inherit',
              outline: 'none',
              boxSizing: 'border-box',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--color-accent-blue)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>
        <div style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', fontWeight: 200, paddingBottom: 10 }}>/</div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>
            <Abbr term="DBP" /> (mmHg)
          </label>
          <input
            type="number"
            min={20}
            max={200}
            placeholder="e.g. 50"
            value={dbp}
            onChange={e => setDbp(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1.5px solid var(--color-border)',
              background: 'var(--color-bg)',
              color: 'var(--color-text-primary)',
              fontSize: '1.2rem',
              fontWeight: 700,
              fontFamily: 'inherit',
              outline: 'none',
              boxSizing: 'border-box',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--color-accent-blue)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>
      </div>

      {/* MAP result */}
      {map !== null && (
        <div style={{
          padding: '16px 20px',
          borderRadius: '14px',
          background: mapBg,
          border: `1.5px solid ${mapBorder}`,
          transition: 'all 0.3s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                Mean Arterial Pressure
              </div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: mapColor, letterSpacing: '-0.03em', lineHeight: 1 }}>
                {map}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>mmHg</div>
            </div>

            {/* Visual gauge */}
            <div style={{ flex: 1 }}>
              <div style={{ position: 'relative', height: 8, borderRadius: 4, background: 'var(--color-border)', overflow: 'hidden', marginBottom: 6 }}>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${Math.min((map / 110) * 100, 100)}%`,
                  background: mapColor,
                  borderRadius: 4,
                  transition: 'width 0.4s ease',
                }} />
                {/* Target line */}
                <div style={{
                  position: 'absolute',
                  left: `${(target / 110) * 100}%`,
                  top: -2,
                  height: '150%',
                  width: 2,
                  background: '#059669',
                  borderRadius: 1,
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                <span>0</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>Target: {target}</span>
                <span>110</span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.83rem', color: mapColor, fontWeight: 600, lineHeight: 1.5 }}>
            {mapMessage}
          </div>

          {mapStatus === 'danger' && (
            <div style={{
              marginTop: 10,
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(220,38,38,0.06)',
              border: '1px solid rgba(220,38,38,0.15)',
              fontSize: '0.78rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
            }}>
              Vasopressors can be started via peripheral IV — do not delay for central line (SSC 2026).
              First line: Noradrenaline. Fallback: Dopamine.
            </div>
          )}
        </div>
      )}

      {/* Formula reference */}
      <div style={{
        marginTop: 12,
        padding: '8px 12px',
        borderRadius: '8px',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border-soft)',
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.5,
      }}>
        <strong>Formula:</strong> MAP = DBP + (SBP − DBP) ÷ 3 &nbsp;|&nbsp;
        Normal MAP: 70–100 mmHg &nbsp;|&nbsp;
        Shock threshold: &lt;65 mmHg
      </div>
    </div>
  )
}

// ── Fluid Calculator ──────────────────────────────────────────────────────────

function FluidCalculator() {
  const [weight, setWeight] = useState('')
  const [isObese, setIsObese] = useState(false)
  const [actualWeight, setActualWeight] = useState('')
  const [startTime] = useState(new Date())

  const weightNum = parseFloat(isObese ? actualWeight : weight)
  const adjustedWeight = isObese && actualWeight ? parseFloat(actualWeight) * 0.4 + 10 : weightNum // simplified ABW formula

  const targetWeight = isObese ? adjustedWeight : weightNum
  const totalFluid = !isNaN(targetWeight) ? Math.round(targetWeight * 30) : null

  // 3-hour timeline breakdown
  type TimelineItem = { label: string; volume: number; rate: number; note: string }
  const timeline: TimelineItem[] = totalFluid ? [
    {
      label: 'Hour 1',
      volume: Math.round(totalFluid * 0.4),
      rate: Math.round(totalFluid * 0.4),
      note: 'Aggressive resuscitation phase',
    },
    {
      label: 'Hour 2',
      volume: Math.round(totalFluid * 0.35),
      rate: Math.round(totalFluid * 0.35),
      note: 'Reassess after hour 1',
    },
    {
      label: 'Hour 3',
      volume: Math.round(totalFluid * 0.25),
      rate: Math.round(totalFluid * 0.25),
      note: 'Titrate to MAP and urine output',
    },
  ] : []

  return (
    <div style={{
      padding: '20px',
      borderRadius: '16px',
      background: 'var(--color-bg-elevated)',
      border: '1px solid var(--color-border)',
    }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
        Calculator 1
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>
        Fluid Bolus Calculator
      </h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '0 0 16px' }}>
        30 mL/kg IV crystalloid within first 3 hours — SSC 2026.
        Use actual body weight unless BMI &gt;30, then use adjusted body weight.
      </p>

      {/* Weight input */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>
          Patient weight (kg)
        </label>
        <input
          type="number"
          min={1}
          max={300}
          placeholder="e.g. 70"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            border: '1.5px solid var(--color-border)',
            background: 'var(--color-bg)',
            color: 'var(--color-text-primary)',
            fontSize: '1.1rem',
            fontWeight: 700,
            fontFamily: 'inherit',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--color-accent-blue)')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
        />
      </div>

      {/* Obesity toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: isObese ? 12 : 16,
        padding: '10px 12px',
        borderRadius: '8px',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border-soft)',
      }}>
        <input
          type="checkbox"
          id="obesity"
          checked={isObese}
          onChange={e => setIsObese(e.target.checked)}
          style={{ accentColor: 'var(--color-accent-blue)', width: 16, height: 16 }}
        />
        <label htmlFor="obesity" style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
          <Abbr term="BMI" /> &gt;30 — use adjusted body weight
        </label>
      </div>

      {/* Adjusted weight note */}
      {isObese && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginBottom: 4 }}>
            Adjusted body weight ≈ Ideal body weight + 0.4 × (Actual − Ideal)
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>
            For bedside use: enter estimated adjusted body weight directly
          </div>
          <input
            type="number"
            min={1}
            max={200}
            placeholder="Adjusted body weight (kg)"
            value={actualWeight}
            onChange={e => setActualWeight(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1.5px solid rgba(245,158,11,0.4)',
              background: 'var(--color-bg)',
              color: 'var(--color-text-primary)',
              fontSize: '1rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      )}

      {/* Result */}
      {totalFluid && !isNaN(totalFluid) && (
        <>
          {/* Total */}
          <div style={{
            padding: '16px 20px',
            borderRadius: '14px',
            background: 'rgba(14,165,233,0.08)',
            border: '1.5px solid rgba(14,165,233,0.25)',
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                Total fluid target (3 hrs)
              </div>
              <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--color-accent-blue)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {totalFluid.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                mL &nbsp;|&nbsp; {(totalFluid / 1000).toFixed(1)} L &nbsp;|&nbsp; {isObese ? adjustedWeight.toFixed(0) : weightNum} kg × 30
              </div>
            </div>
            <div style={{
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Fluid</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>0.9% NaCl</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>or Hartmann's</div>
            </div>
          </div>

          {/* 3-hour timeline */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Suggested 3-hour breakdown
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {timeline.map((item, i) => (
                <div key={i} style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  {/* Timeline dot */}
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(14,165,233,0.1)',
                    border: '1.5px solid rgba(14,165,233,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--color-accent-blue)',
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 1 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{item.note}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-accent-blue)' }}>
                      {item.volume.toLocaleString()} mL
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                      {item.rate.toLocaleString()} mL/hr
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar (visual) */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ height: 8, borderRadius: 4, background: 'var(--color-border)', overflow: 'hidden', display: 'flex' }}>
              {timeline.map((item, i) => {
                const colors = ['#0ea5e9', '#38bdf8', '#7dd3fc']
                return (
                  <div
                    key={i}
                    style={{
                      flex: item.volume,
                      background: colors[i],
                      borderRight: i < 2 ? '2px solid var(--color-bg-elevated)' : 'none',
                    }}
                  />
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              {timeline.map((item, i) => {
                const colors = ['#0ea5e9', '#38bdf8', '#7dd3fc']
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: colors[i] }} />
                    {item.label}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Reassessment reminders */}
          <div style={{
            padding: '10px 14px',
            borderRadius: '10px',
            background: 'rgba(5,150,105,0.06)',
            border: '1px solid rgba(5,150,105,0.15)',
            fontSize: '0.8rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
          }}>
            <strong style={{ color: '#059669' }}>Reassess after each bolus:</strong>{' '}
            MAP ≥65, urine output &gt;0.5 mL/kg/hr, skin perfusion, lactate clearance.
            If no improvement after 30 mL/kg — consider vasopressor or fluid responsiveness assessment.
          </div>
        </>
      )}
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export function FluidMAPCalculator() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 600 }}>

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
          Fluid & <Abbr term="MAP" /> Calculator
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', margin: '0 0 8px', lineHeight: 1.5 }}>
          Two calculators. Use both together at the bedside.
          Guideline: <strong>SSC 2026</strong>
        </p>
        <div style={{
          padding: '8px 12px',
          borderRadius: '8px',
          background: 'rgba(14,165,233,0.06)',
          border: '1px solid rgba(14,165,233,0.18)',
          fontSize: '0.78rem',
          color: 'var(--color-text-secondary)',
        }}>
          <strong style={{ color: 'var(--color-accent-blue)' }}>SSC 2026:</strong>{' '}
          At least 30 mL/kg IV crystalloid in first 3 hours.
          Vasopressors can start peripherally — do not delay for central line.
          MAP target ≥65 mmHg (60–65 for age ≥65).
        </div>
      </div>

      <FluidCalculator />
      <MAPCalculator />

      {/* Combined guidance note */}
      <div style={{
        padding: '14px 16px',
        borderRadius: '12px',
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border)',
        fontSize: '0.82rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
      }}>
        <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 6 }}>Using both calculators together</div>
        Give the fluid bolus from Calculator 1. Check MAP using Calculator 2 after each 250–500 mL.
        If MAP remains &lt;65 after full 30 mL/kg — add vasopressor.
        Noradrenaline first line via peripheral IV. Dopamine if noradrenaline unavailable.
        Continue reassessing MAP every 15–30 minutes.
      </div>
    </div>
  )
}
