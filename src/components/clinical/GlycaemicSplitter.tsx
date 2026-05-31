'use client'

// ─── Glycaemic Splitter ───────────────────────────────────────────────────────
// DKA vs HHS interactive decision tree.
// Maximum 4 inputs → one output: diagnosis + full protocol.
// Fluid rate, insulin protocol, potassium monitoring at 0/1/2/4/8 hours.
// Branch for IV insulin unavailable — explicit, not a footnote.
// ADA 2025.

import { useState } from 'react'
import { Abbr } from '@/components/clinical/AbbreviationTooltip'

type Diagnosis = 'DKA_mild' | 'DKA_moderate' | 'DKA_severe' | 'HHS' | 'mixed' | null

interface Inputs {
  glucose: string       // mmol/L
  ketones: string       // mmol/L (blood) or 'trace'/'1+'/'2+'/'3+' (urine)
  ph: string            // arterial pH
  osmolality: string    // mOsm/kg (calculated or measured)
  weight: string        // kg — for fluid calculation
  potassium: string     // mEq/L — critical for insulin timing
}

interface DiagnosisResult {
  diagnosis: Diagnosis
  label: string
  color: string
  bg: string
  severity?: string
}

function classify(inputs: Inputs): DiagnosisResult | null {
  const glucose = parseFloat(inputs.glucose)
  const ketones = parseFloat(inputs.ketones)
  const ph = parseFloat(inputs.ph)
  const osm = parseFloat(inputs.osmolality)

  if (!glucose || isNaN(glucose)) return null
  if (glucose < 11) return null // Not hyperglycaemic crisis

  const hasKetones = !isNaN(ketones) && ketones >= 3
  const hasAcidosis = !isNaN(ph) && ph < 7.3
  const hasHighOsm = !isNaN(osm) && osm >= 320
  const hasHighGlucose = glucose >= 30

  // HHS: glucose ≥30 + osmolality ≥320 + minimal/no ketones + no significant acidosis
  if (hasHighGlucose && hasHighOsm && !hasKetones && (!inputs.ph || (!isNaN(ph) && ph >= 7.3))) {
    return {
      diagnosis: 'HHS',
      label: 'Hyperosmolar Hyperglycaemic State (HHS)',
      color: '#7c3aed',
      bg: 'rgba(124,58,237,0.08)',
    }
  }

  // Mixed DKA/HHS
  if (hasHighGlucose && hasHighOsm && hasKetones && hasAcidosis) {
    return {
      diagnosis: 'mixed',
      label: 'Mixed DKA / HHS',
      color: '#dc2626',
      bg: 'rgba(220,38,38,0.08)',
    }
  }

  // DKA: glucose ≥11 + ketones ≥3 + pH <7.3
  if (glucose >= 11 && hasKetones && hasAcidosis) {
    if (ph < 7.0) {
      return { diagnosis: 'DKA_severe', label: 'Severe DKA', color: '#dc2626', bg: 'rgba(220,38,38,0.08)', severity: 'severe' }
    }
    if (ph < 7.1) {
      return { diagnosis: 'DKA_moderate', label: 'Moderate DKA', color: '#ea580c', bg: 'rgba(234,88,12,0.08)', severity: 'moderate' }
    }
    return { diagnosis: 'DKA_mild', label: 'Mild DKA', color: '#d97706', bg: 'rgba(217,119,6,0.08)', severity: 'mild' }
  }

  // Possible DKA with missing pH
  if (glucose >= 11 && hasKetones && !inputs.ph) {
    return { diagnosis: 'DKA_moderate', label: 'Likely DKA — pH not entered', color: '#ea580c', bg: 'rgba(234,88,12,0.08)', severity: 'unknown' }
  }

  return null
}

function calcFluidRate(weightKg: number, diagnosis: Diagnosis): { bolus: number; rate1: number; rate2: number } {
  if (!weightKg || isNaN(weightKg)) return { bolus: 1000, rate1: 500, rate2: 250 }

  if (diagnosis === 'HHS') {
    // HHS: slower rehydration — 1 L/hr first 1hr, then 500 mL/hr
    return {
      bolus: 0,
      rate1: 1000, // mL/hr for first 2 hours
      rate2: 500,  // mL/hr thereafter
    }
  }

  // DKA: 0.9% NaCl, 1L/hr first hour, then weight-based
  const rate1 = 1000
  const rate2 = Math.round((weightKg * 5)) // ~5 mL/kg/hr after first hour
  return { bolus: 0, rate1, rate2 }
}

// ── Potassium monitoring schedule ─────────────────────────────────────────────
function PotassiumSchedule({ k }: { k: string }) {
  const kVal = parseFloat(k)

  const schedule = [
    { time: '0h', action: kVal < 3.5 ? 'Hold insulin — replace K first' : kVal < 5.0 ? 'Add 20–40 mEq KCl to each litre of fluid' : 'Monitor — do not add K yet', flag: kVal < 3.5 ? 'CRITICAL' : kVal >= 5.0 ? 'HIGH' : '' },
    { time: '1h', action: 'Recheck K. Adjust infusion rate.', flag: '' },
    { time: '2h', action: 'Recheck K. Target K 3.5–5.0 mEq/L throughout.', flag: '' },
    { time: '4h', action: 'Recheck K. Recheck glucose. Recheck VBG/ABG.', flag: '' },
    { time: '8h', action: 'Recheck K, glucose, ketones. Assess for transition to SC insulin.', flag: '' },
  ]

  return (
    <div>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
        Potassium monitoring schedule
      </div>
      {!k && (
        <div style={{ fontSize: '0.82rem', color: 'var(--color-accent-amber)', marginBottom: 8 }}>
          Enter potassium level above for tailored guidance
        </div>
      )}
      {kVal < 3.5 && !isNaN(kVal) && (
        <div style={{
          padding: '10px 12px',
          borderRadius: '8px',
          background: 'rgba(220,38,38,0.08)',
          border: '1px solid rgba(220,38,38,0.25)',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#dc2626',
          marginBottom: 10,
        }}>
          ⚠ K+ &lt;3.5 mEq/L — DO NOT start insulin. Correct potassium first. Insulin drives K into cells and will cause fatal hypokalaemia.
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {schedule.map((row, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            padding: '8px 10px',
            borderRadius: '8px',
            background: row.flag === 'CRITICAL' ? 'rgba(220,38,38,0.06)' : row.flag === 'HIGH' ? 'rgba(245,158,11,0.06)' : 'var(--color-bg)',
            border: `1px solid ${row.flag === 'CRITICAL' ? 'rgba(220,38,38,0.2)' : row.flag === 'HIGH' ? 'rgba(245,158,11,0.15)' : 'var(--color-border-soft)'}`,
          }}>
            <div style={{
              minWidth: 32,
              fontWeight: 700,
              fontSize: '0.8rem',
              color: 'var(--color-accent-blue)',
            }}>
              {row.time}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, flex: 1 }}>
              {row.action}
              {row.flag && (
                <span style={{
                  marginLeft: 6,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: row.flag === 'CRITICAL' ? '#dc2626' : '#ca8a04',
                  background: row.flag === 'CRITICAL' ? 'rgba(220,38,38,0.1)' : 'rgba(245,158,11,0.1)',
                  padding: '1px 5px',
                  borderRadius: '4px',
                }}>
                  {row.flag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Protocol display ──────────────────────────────────────────────────────────
function ProtocolDisplay({ result, inputs, insulinAvailable }: {
  result: DiagnosisResult
  inputs: Inputs
  insulinAvailable: boolean
}) {
  const weight = parseFloat(inputs.weight)
  const k = parseFloat(inputs.potassium)
  const isDKA = result.diagnosis?.startsWith('DKA') || result.diagnosis === 'mixed'
  const isHHS = result.diagnosis === 'HHS' || result.diagnosis === 'mixed'
  const fluidRates = calcFluidRate(weight, result.diagnosis)
  const kHold = !isNaN(k) && k < 3.5

  return (
    <div style={{
      borderRadius: '16px',
      overflow: 'hidden',
      border: `1.5px solid ${result.color}40`,
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: result.bg,
        borderBottom: `1px solid ${result.color}20`,
      }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: result.color, marginBottom: 4 }}>
          Diagnosis
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {result.label}
        </div>
        {result.severity && (
          <div style={{ fontSize: '0.78rem', color: result.color, marginTop: 2, fontWeight: 600 }}>
            {result.severity === 'severe' && 'pH <7.0 — ICU/HDU referral'}
            {result.severity === 'moderate' && 'pH 7.0–7.1 — close monitoring, senior review'}
            {result.severity === 'mild' && 'pH 7.1–7.3 — ward management if stable'}
            {result.severity === 'unknown' && 'Check arterial/venous blood gas urgently'}
          </div>
        )}
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--color-bg-elevated)' }}>

        {/* Fluid protocol */}
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Fluid protocol — 0.9% NaCl
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {isHHS && !isDKA ? (
              <>
                <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginBottom: 2 }}>Hours 0–2</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent-blue)' }}>1,000 mL/hr</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>0.9% NaCl</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginBottom: 2 }}>Hours 2+</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent-blue)' }}>500 mL/hr</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>0.45% NaCl or 0.9% NaCl</div>
                </div>
              </>
            ) : (
              <>
                <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginBottom: 2 }}>Hour 1</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent-blue)' }}>1,000 mL/hr</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>0.9% NaCl</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginBottom: 2 }}>Hours 1–4</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent-blue)' }}>
                    {!isNaN(weight) ? `${fluidRates.rate2} mL/hr` : '250–500 mL/hr'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                    {!isNaN(weight) ? `~5 mL/kg/hr × ${weight}kg` : 'Enter weight for calculation'}
                  </div>
                </div>
              </>
            )}
          </div>
          {isHHS && (
            <div style={{ marginTop: 8, fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              HHS: slower rehydration to avoid rapid osmolality shifts. Total deficit may be 8–10 L — replace over 24–48 hours.
              Switch to 0.45% NaCl when glucose falls to 15 mmol/L and add dextrose when glucose reaches 12–14 mmol/L.
            </div>
          )}
        </div>

        {/* Insulin protocol */}
        {isDKA && (
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Insulin protocol
            </div>
            {kHold && (
              <div style={{
                padding: '10px 12px',
                borderRadius: '8px',
                background: 'rgba(220,38,38,0.08)',
                border: '1px solid rgba(220,38,38,0.25)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#dc2626',
                marginBottom: 10,
              }}>
                ⚠ K+ &lt;3.5 — hold insulin until potassium corrected
              </div>
            )}
            {insulinAvailable ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 2 }}>IV Insulin infusion (preferred)</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-accent-blue)' }}>
                    Actrapid (Human Soluble) 0.1 unit/kg/hr
                    {!isNaN(weight) ? ` = ${Math.round(weight * 0.1)} units/hr` : ''}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                    Dilute 50 units Actrapid in 50 mL 0.9% NaCl (1 unit/mL). Run at {!isNaN(weight) ? Math.round(weight * 0.1) : '0.1 × weight'} mL/hr.
                  </div>
                </div>
                <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 2 }}>Glucose target during DKA</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    Target 10–14 mmol/L. When glucose &lt;14 mmol/L — add 10% dextrose at 125 mL/hr alongside insulin.
                    Do not stop insulin while ketones remain elevated.
                  </div>
                </div>
              </div>
            ) : (
              // IV insulin unavailable branch
              <div style={{
                padding: '14px',
                borderRadius: '10px',
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.25)',
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ca8a04', marginBottom: 8 }}>
                  ⚠ IV insulin unavailable — subcutaneous protocol
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    <strong>Step 1:</strong> Give IM loading dose — Actrapid 0.3 units/kg IM stat
                    {!isNaN(weight) ? ` = ${Math.round(weight * 0.3)} units` : ''}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    <strong>Step 2:</strong> SC Actrapid 0.2 units/kg every hour
                    {!isNaN(weight) ? ` = ${Math.round(weight * 0.2)} units/hr SC` : ''}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    <strong>Step 3:</strong> Monitor glucose hourly. If not falling 3–4 mmol/L/hr — increase dose.
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#ca8a04', marginTop: 4, lineHeight: 1.5 }}>
                    SC insulin absorption is slower and less predictable in shock states. Ensure adequate hydration first.
                    Transfer to IV insulin as soon as available.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HHS — insulin note */}
        {isHHS && !isDKA && (
          <div style={{
            padding: '12px 14px',
            borderRadius: '10px',
            background: 'rgba(124,58,237,0.06)',
            border: '1px solid rgba(124,58,237,0.2)',
            fontSize: '0.82rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.5,
          }}>
            <strong style={{ color: '#7c3aed' }}>Insulin in HHS:</strong>{' '}
            Do NOT start insulin until glucose stops falling with fluids alone OR glucose &lt;15 mmol/L.
            Fluids are the primary treatment. Insulin rate: 0.05 units/kg/hr (half the DKA rate) once started.
          </div>
        )}

        {/* Potassium schedule */}
        <PotassiumSchedule k={inputs.potassium} />

        {/* Key monitoring */}
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Resolution criteria
          </div>
          {isDKA ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[
                'pH ≥7.3',
                'Bicarbonate ≥15 mmol/L',
                'Blood ketones <0.6 mmol/L (or urine ketones trace/negative)',
                'Glucose <11 mmol/L (note: DKA can resolve with normal-range glucose — do not use glucose alone)',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--color-accent-green)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[
                'Glucose <15 mmol/L',
                'Osmolality approaching normal (<320 mOsm/kg)',
                'Haemodynamically stable',
                'Able to tolerate oral fluids',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--color-accent-green)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export function GlycaemicSplitter() {
  const [inputs, setInputs] = useState<Inputs>({
    glucose: '', ketones: '', ph: '', osmolality: '', weight: '', potassium: '',
  })
  const [insulinAvailable, setInsulinAvailable] = useState(true)

  const result = classify(inputs)
  const canClassify = inputs.glucose && parseFloat(inputs.glucose) >= 11

  function update(field: keyof Inputs, value: string) {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const fields: Array<{ key: keyof Inputs; label: string; placeholder: string; unit: string; note: string; required?: boolean }> = [
    { key: 'glucose', label: 'Blood glucose', placeholder: 'e.g. 28', unit: 'mmol/L', note: 'DKA threshold ≥11 mmol/L, HHS threshold ≥30 mmol/L', required: true },
    { key: 'ketones', label: 'Blood ketones', placeholder: 'e.g. 5.2', unit: 'mmol/L', note: '≥3 mmol/L = significant ketosis. If only urine ketones available: 3+ ≈ ≥3 mmol/L' },
    { key: 'ph', label: 'Arterial / venous pH', placeholder: 'e.g. 7.18', unit: '', note: 'DKA threshold pH <7.3. Venous pH 0.03 lower than arterial — adjust accordingly' },
    { key: 'osmolality', label: 'Calculated osmolality', placeholder: 'e.g. 340', unit: 'mOsm/kg', note: 'Formula: (2 × Na) + glucose + urea. HHS threshold ≥320 mOsm/kg' },
    { key: 'potassium', label: 'Serum potassium', placeholder: 'e.g. 4.2', unit: 'mEq/L', note: 'Critical — insulin cannot start if K+ <3.5 mEq/L' },
    { key: 'weight', label: 'Patient weight', placeholder: 'e.g. 72', unit: 'kg', note: 'For fluid rate and insulin dose calculation' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 600 }}>

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
          Glycaemic Splitter
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', margin: '0 0 8px', lineHeight: 1.5 }}>
          Enter the values you have available. Minimum required: glucose.
          Guideline: <strong>ADA 2025</strong>
        </p>
      </div>

      {/* Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {fields.map(f => (
          <div key={f.key} style={{
            padding: '14px 16px',
            borderRadius: '12px',
            background: 'var(--color-bg-elevated)',
            border: `1.5px solid ${f.required && !inputs[f.key] ? 'rgba(14,165,233,0.3)' : 'var(--color-border)'}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', flex: 1 }}>
                {f.label}
                {f.required && <span style={{ color: 'var(--color-accent-red)', marginLeft: 3 }}>*</span>}
              </label>
              {f.unit && (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                  {f.unit}
                </span>
              )}
            </div>
            <input
              type="number"
              step="0.1"
              placeholder={f.placeholder}
              value={inputs[f.key]}
              onChange={e => update(f.key, e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1.5px solid var(--color-border)',
                background: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
                fontSize: '1rem',
                fontWeight: 600,
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--color-accent-blue)')}
              onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
            />
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: 4, lineHeight: 1.4 }}>
              {f.note}
            </div>
          </div>
        ))}
      </div>

      {/* Insulin availability toggle */}
      <div style={{
        padding: '14px 16px',
        borderRadius: '12px',
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 2 }}>
            IV insulin available?
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            If no — subcutaneous protocol loads instead
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[true, false].map(val => (
            <button
              key={String(val)}
              onClick={() => setInsulinAvailable(val)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: `1.5px solid ${insulinAvailable === val ? 'var(--color-accent-blue)' : 'var(--color-border)'}`,
                background: insulinAvailable === val ? 'rgba(14,165,233,0.1)' : 'transparent',
                color: insulinAvailable === val ? 'var(--color-accent-blue)' : 'var(--color-text-muted)',
                fontWeight: insulinAvailable === val ? 700 : 400,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.85rem',
                transition: 'all 0.15s',
              }}
            >
              {val ? 'Yes' : 'No'}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {result && (
        <ProtocolDisplay
          result={result}
          inputs={inputs}
          insulinAvailable={insulinAvailable}
        />
      )}

      {/* Differentiator table */}
      <div style={{
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '10px 14px',
          background: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          DKA vs HHS — quick reference
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: 'var(--color-bg-elevated)' }}>
                {['Parameter', 'DKA', 'HHS'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Glucose', '≥11 mmol/L', '≥30 mmol/L'],
                ['Ketones', '≥3 mmol/L (blood)', 'Minimal (<1 mmol/L)'],
                ['pH', '<7.3', '≥7.3 (usually normal)'],
                ['Osmolality', 'Variable', '≥320 mOsm/kg'],
                ['Onset', 'Hours (fast)', 'Days (slow)'],
                ['Typical patient', 'T1DM (any age)', 'Elderly T2DM'],
                ['Primary treatment', 'Insulin + fluids', 'Fluids first, insulin later'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-border-soft)', background: i % 2 === 0 ? 'transparent' : 'var(--color-bg)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '8px 12px', color: j === 0 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: j === 0 ? 600 : 400 }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
