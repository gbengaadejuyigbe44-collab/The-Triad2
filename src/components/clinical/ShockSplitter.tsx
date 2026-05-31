'use client'

// ─── Shock Splitter ───────────────────────────────────────────────────────────
// The front door of Hypotension Complex.
// 4 questions maximum → shock type confirmed → protocol loaded immediately.
// SSC 2026 throughout.
// Key SSC 2026 update surfaced: vasopressors can start peripherally.
// Nigerian availability flags on every vasopressor.

import { useState } from 'react'
import { Abbr } from '@/components/clinical/AbbreviationTooltip'
import { useRegion } from '@/lib/region'

type ShockType = 'hypovolaemic' | 'septic' | 'anaphylactic' | 'neurogenic' | 'cardiogenic' | 'obstructive' | null

interface ShockProtocol {
  type: ShockType
  label: string
  color: string
  bg: string
  icon: string
  definition: string
  immediateActions: string[]
  firstLineDrug: string
  firstLineDrugNote: string
  fallbackDrug: string
  fallbackDrugNote: string
  fluidTarget: string
  mapTarget: string
  keyWarning: string
  ssc2026Note?: string
}

const PROTOCOLS: Record<Exclude<ShockType, null>, ShockProtocol> = {
  hypovolaemic: {
    type: 'hypovolaemic',
    label: 'Hypovolaemic Shock',
    color: '#dc2626',
    bg: 'rgba(220,38,38,0.08)',
    icon: '🩸',
    definition: 'Loss of intravascular volume — haemorrhage, dehydration, burns, GI loss.',
    immediateActions: [
      'Large bore IV access × 2 (14–16G antecubital)',
      'Send FBC, U&E, crossmatch, coagulation',
      'IV crystalloid — Hartmann\'s or 0.9% NaCl',
      'Blood transfusion if haemorrhagic (haemoglobin-guided)',
      'Identify and control bleeding source',
      'Urinary catheter — monitor output hourly',
    ],
    firstLineDrug: 'IV Crystalloid fluid resuscitation',
    firstLineDrugNote: '30 mL/kg in first 3 hours. Use Fluid & MAP Calculator. Reassess after each 250–500 mL bolus. Switch to blood products early in haemorrhagic shock.',
    fallbackDrug: 'Noradrenaline (vasopressor bridge)',
    fallbackDrugNote: 'If MAP <65 mmHg despite fluid — add vasopressor. Can start peripherally per SSC 2026 — do not delay for central line.',
    fluidTarget: '30 mL/kg in first 3 hours',
    mapTarget: '≥65 mmHg (≥60 mmHg if age ≥65)',
    keyWarning: 'In haemorrhagic shock — do not give large volumes of crystalloid before controlling bleeding source. Permissive hypotension (MAP 50–65) acceptable until surgical haemostasis in trauma.',
    ssc2026Note: 'Vasopressors can now be started peripherally per SSC 2026. Do not delay vasopressor therapy waiting for central line.',
  },
  septic: {
    type: 'septic',
    label: 'Septic Shock',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    icon: '🦠',
    definition: 'Distributive shock from infection — vasodilation, maldistribution of blood flow. MAP <65 mmHg + vasopressor requirement + lactate >2 mmol/L despite adequate fluid.',
    immediateActions: [
      'Blood cultures × 2 BEFORE antibiotics — but do not delay antibiotics for cultures',
      'Broad-spectrum antibiotics within 1 hour of recognition',
      'IV crystalloid 30 mL/kg within 3 hours',
      'Vasopressor if MAP <65 after initial fluid',
      'Lactate measurement — target normalisation',
      'Source identification and control',
      'Urinary catheter — urine output target >0.5 mL/kg/hr',
    ],
    firstLineDrug: 'Noradrenaline (Norepinephrine)',
    firstLineDrugNote: 'First-line vasopressor per SSC 2026. Start at 0.01–0.3 mcg/kg/min. Titrate to MAP ≥65 mmHg. Can start via peripheral IV — do not wait for central line.',
    fallbackDrug: 'Dopamine',
    fallbackDrugNote: 'Use if noradrenaline unavailable. Start at 5 mcg/kg/min, titrate to effect. Higher arrhythmia risk than noradrenaline. More widely available in Nigerian facilities.',
    fluidTarget: '30 mL/kg in first 3 hours, then reassess',
    mapTarget: '≥65 mmHg (60–65 mmHg if age ≥65)',
    keyWarning: 'Blood cultures BEFORE antibiotics — but never delay antibiotics for cultures. Every hour of antibiotic delay in septic shock increases mortality by 7%.',
    ssc2026Note: 'SSC 2026: Vasopressors may be started via peripheral vein. Permissive MAP target 60–65 mmHg in elderly (≥65 years) — aggressive targeting to higher MAP did not improve mortality.',
  },
  anaphylactic: {
    type: 'anaphylactic',
    label: 'Anaphylactic Shock',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    icon: '⚡',
    definition: 'Acute severe hypersensitivity reaction — rapid vasodilation and increased vascular permeability. Often triggered by drugs, food, latex, or insect stings.',
    immediateActions: [
      'Remove or stop trigger immediately',
      'Call for help — this is a medical emergency',
      'Adrenaline 0.5 mg IM into anterolateral thigh — FIRST LINE',
      'Position: supine with legs elevated (if not respiratory distress) or sitting up (if respiratory distress)',
      'High-flow oxygen 15 L/min via non-rebreather mask',
      'IV access — large bore',
      'IV crystalloid 500–1000 mL bolus rapidly',
      'If no improvement in 5 min — repeat Adrenaline 0.5 mg IM',
    ],
    firstLineDrug: 'Adrenaline 0.5 mg IM (anterolateral thigh)',
    firstLineDrugNote: 'IM into the anterolateral mid-thigh — fastest absorption. NOT subcutaneous. NOT IV unless cardiac arrest or refractory anaphylaxis in resus setting with monitoring. Repeat every 5 minutes if no response.',
    fallbackDrug: 'Chlorphenamine 10 mg IV + Hydrocortisone 200 mg IV',
    fallbackDrugNote: 'Antihistamine and steroid are secondary — do not give before adrenaline. They do not treat anaphylaxis, they reduce risk of biphasic reaction.',
    fluidTarget: '500–1000 mL crystalloid bolus immediately',
    mapTarget: '≥65 mmHg — titrate with fluid and repeat adrenaline',
    keyWarning: 'NEVER delay adrenaline. IV adrenaline in non-resus setting is dangerous — IM is the route. Salbutamol nebuliser for bronchospasm not responding to adrenaline.',
  },
  neurogenic: {
    type: 'neurogenic',
    label: 'Neurogenic Shock',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.08)',
    icon: '🫀',
    definition: 'Distributive shock from loss of sympathetic vasomotor tone — spinal cord injury (usually ≥T6), brain injury, high spinal anaesthesia. Triad: hypotension + bradycardia + skin that is warm and dry (unlike most other shocks).',
    immediateActions: [
      'Immobilise spine if injury suspected',
      'IV access and fluid resuscitation (cautious)',
      'Vasopressor early — fluid alone often insufficient',
      'Monitor for hypothermia (loss of thermoregulation)',
      'Neurosurgery/spinal team involvement',
      'Urinary catheter',
    ],
    firstLineDrug: 'Noradrenaline or Phenylephrine',
    firstLineDrugNote: 'Vasopressors earlier than in other shock types — fluid resuscitation alone has limited effect. Noradrenaline preferred if available.',
    fallbackDrug: 'Atropine (if bradycardia prominent)',
    fallbackDrugNote: '0.5–1 mg IV for symptomatic bradycardia. Repeat every 3–5 minutes up to 3 mg total. Bradycardia in neurogenic shock is due to unopposed vagal tone.',
    fluidTarget: 'Cautious — 250 mL boluses, reassess after each',
    mapTarget: '≥85–90 mmHg in acute spinal cord injury (higher target to preserve cord perfusion)',
    keyWarning: 'Do not confuse with hypovolaemic shock. Warm, dry skin + bradycardia with hypotension = neurogenic until proven otherwise. Large fluid volumes can worsen cord oedema.',
  },
  cardiogenic: {
    type: 'cardiogenic',
    label: 'Cardiogenic Shock',
    color: '#e11d48',
    bg: 'rgba(225,29,72,0.08)',
    icon: '💔',
    definition: 'Pump failure — heart cannot maintain adequate output. Causes: MI (most common), acute severe valve disease, myocarditis, severe arrhythmia, end-stage cardiomyopathy.',
    immediateActions: [
      'ECG immediately — identify and treat acute MI',
      'Cardiology or cardiac cath lab activation if STEMI',
      'IV access, monitor, oxygen if SpO2 <94%',
      'Avoid aggressive fluid — may worsen pulmonary oedema',
      'Small fluid challenge 250 mL if not obviously fluid-overloaded',
      'Vasopressor/inotrope as below',
      'Echocardiogram urgently if available',
    ],
    firstLineDrug: 'Noradrenaline + Dobutamine',
    firstLineDrugNote: 'Noradrenaline for BP support. Dobutamine for inotropic support (1–20 mcg/kg/min). Avoid dopamine in cardiogenic shock — higher mortality vs noradrenaline in trials.',
    fallbackDrug: 'Dopamine (if noradrenaline unavailable)',
    fallbackDrugNote: 'If noradrenaline unavailable, dopamine at ≥5 mcg/kg/min has vasopressor effect. Higher arrhythmia risk.',
    fluidTarget: 'Avoid aggressive fluid. Small 250 mL challenges only, reassess after each.',
    mapTarget: '≥65 mmHg',
    keyWarning: 'Do NOT give GTN/vasodilators — will worsen hypotension. Dobutamine contraindicated if SBP <70 mmHg without vasopressor. Early revascularisation is the definitive treatment in MI-related cardiogenic shock.',
  },
  obstructive: {
    type: 'obstructive',
    label: 'Obstructive Shock',
    color: '#0284c7',
    bg: 'rgba(2,132,199,0.08)',
    icon: '🚫',
    definition: 'Mechanical obstruction to blood flow — tension pneumothorax, massive PE, cardiac tamponade, or severe pulmonary hypertension. Heart cannot fill or eject effectively.',
    immediateActions: [
      'Identify cause immediately — treatment is cause-specific',
      'Tension pneumothorax: needle decompression 2nd ICS midclavicular line NOW',
      'Cardiac tamponade: pericardiocentesis if haemodynamically unstable',
      'Massive PE: thrombolysis if confirmed or high clinical probability + haemodynamic compromise',
      'Do not give large fluid boluses — worsens obstructive physiology',
      'Vasopressor bridge while definitive treatment arranged',
    ],
    firstLineDrug: 'Treat the cause — vasopressors as bridge only',
    firstLineDrugNote: 'Noradrenaline as vasopressor bridge to definitive treatment. Fluids in moderation — may help fill a compressed RV but excess worsens obstruction.',
    fallbackDrug: 'Dopamine (if noradrenaline unavailable)',
    fallbackDrugNote: 'If noradrenaline unavailable. Vasopressor effect at ≥5 mcg/kg/min.',
    fluidTarget: 'Cautious — 250 mL boluses only. Reassess immediately.',
    mapTarget: '≥65 mmHg',
    keyWarning: 'Definitive treatment cannot wait. Tension pneumothorax → needle decompression immediately without waiting for CXR. Tamponade → pericardiocentesis. Massive PE + haemodynamic collapse → thrombolysis (do not wait for CT if high clinical probability).',
  },
}

// ── Decision tree questions ────────────────────────────────────────────────────
// Q1 → Q2 → Q3 → Q4 → diagnosis
// Maximum 4 questions. Answers determine branch.

interface Answer {
  q1: 'obvious_blood_loss' | 'infection_suspected' | 'allergy' | 'cardiac' | 'spine' | 'other' | null
  q2_distributive: 'fever_source' | 'anaphylaxis' | 'spine_trauma' | null
  q2_cardiac: 'poor_pump' | 'obstructed' | null
  q3_septic_confirmed: boolean | null
}

const INITIAL_ANSWERS: Answer = {
  q1: null,
  q2_distributive: null,
  q2_cardiac: null,
  q3_septic_confirmed: null,
}

function resolveShockType(a: Answer): ShockType {
  if (!a.q1) return null
  if (a.q1 === 'obvious_blood_loss') return 'hypovolaemic'
  if (a.q1 === 'allergy') return 'anaphylactic'
  if (a.q1 === 'spine') return 'neurogenic'
  if (a.q1 === 'infection_suspected' || a.q1 === 'other') {
    if (a.q2_distributive === 'fever_source') {
      return a.q3_septic_confirmed === null ? null : 'septic'
    }
    if (a.q2_distributive === 'anaphylaxis') return 'anaphylactic'
    if (a.q2_distributive === 'spine_trauma') return 'neurogenic'
    if (!a.q2_distributive) return null
  }
  if (a.q1 === 'cardiac') {
    if (a.q2_cardiac === 'poor_pump') return 'cardiogenic'
    if (a.q2_cardiac === 'obstructed') return 'obstructive'
    return null
  }
  return null
}

// ── Protocol display ──────────────────────────────────────────────────────────

function ProtocolDisplay({ protocol, regionNoraAvail }: {
  protocol: ShockProtocol
  regionNoraAvail: 'high' | 'medium' | 'low'
}) {
  const noraAvailable = regionNoraAvail !== 'low'

  return (
    <div style={{
      borderRadius: '16px',
      overflow: 'hidden',
      border: `1.5px solid ${protocol.color}40`,
      boxShadow: `0 0 0 4px ${protocol.bg}`,
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: protocol.bg,
        borderBottom: `1px solid ${protocol.color}20`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          background: protocol.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          flexShrink: 0,
        }}>
          {protocol.icon}
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: protocol.color, marginBottom: 2 }}>
            Diagnosis
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {protocol.label}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--color-bg-elevated)' }}>

        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>
          {protocol.definition}
        </p>

        {/* SSC 2026 note */}
        {protocol.ssc2026Note && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '10px',
            background: 'rgba(14,165,233,0.08)',
            border: '1px solid rgba(14,165,233,0.2)',
            fontSize: '0.82rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.5,
          }}>
            <strong style={{ color: 'var(--color-accent-blue)' }}>SSC 2026 update:</strong>{' '}
            {protocol.ssc2026Note}
          </div>
        )}

        {/* Immediate actions */}
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Immediate actions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {protocol.immediateActions.map((action, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{
                  minWidth: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: protocol.bg,
                  border: `1px solid ${protocol.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: protocol.color,
                  marginTop: 1,
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {action}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drug — with availability flag */}
        <div style={{
          padding: '14px',
          borderRadius: '12px',
          background: protocol.bg,
          border: `1px solid ${protocol.color}25`,
        }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
            {noraAvailable || !protocol.firstLineDrug.includes('Noradrenaline') ? 'First-line drug' : 'First-line drug (check availability)'}
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: protocol.color, marginBottom: 6 }}>
            {protocol.firstLineDrug}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>
            {protocol.firstLineDrugNote}
          </div>

          {/* Nigerian availability flag for noradrenaline */}
          {protocol.firstLineDrug.includes('Noradrenaline') && regionNoraAvail === 'low' && (
            <div style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.25)',
              fontSize: '0.78rem',
              color: '#ca8a04',
              fontWeight: 600,
              marginBottom: 8,
            }}>
              ⚠ Noradrenaline may not be available in your facility — use fallback drug below
            </div>
          )}

          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
            If unavailable → fallback
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
            {protocol.fallbackDrug}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            {protocol.fallbackDrugNote}
          </div>
        </div>

        {/* Fluid + MAP targets */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              Fluid target
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-accent-blue)' }}>
              {protocol.fluidTarget}
            </div>
          </div>
          <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              <Abbr term="MAP" /> target
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-accent-green)' }}>
              {protocol.mapTarget}
            </div>
          </div>
        </div>

        {/* Warning */}
        <div style={{
          padding: '12px 14px',
          borderRadius: '10px',
          background: 'rgba(220,38,38,0.05)',
          border: '1px solid rgba(220,38,38,0.15)',
          fontSize: '0.82rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-start',
        }}>
          <span style={{ flexShrink: 0, color: '#dc2626' }}>⚠</span>
          <span>{protocol.keyWarning}</span>
        </div>
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export function ShockSplitter() {
  const { region } = useRegion()
  const [answers, setAnswers] = useState<Answer>(INITIAL_ANSWERS)
  const shockType = resolveShockType(answers)
  const protocol = shockType ? PROTOCOLS[shockType] : null

  function reset() {
    setAnswers(INITIAL_ANSWERS)
  }

  const questionsDone = shockType !== null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 600 }}>

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
          Shock Splitter
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', margin: '0 0 8px', lineHeight: 1.5 }}>
          Answer up to 4 questions. Shock type and protocol load immediately.
          Guideline: <strong>{region.guidelineShock}</strong>
        </p>
        {/* SSC 2026 key update */}
        <div style={{
          padding: '8px 12px',
          borderRadius: '8px',
          background: 'rgba(14,165,233,0.08)',
          border: '1px solid rgba(14,165,233,0.2)',
          fontSize: '0.78rem',
          color: 'var(--color-text-secondary)',
        }}>
          <strong style={{ color: 'var(--color-accent-blue)' }}>SSC 2026:</strong>{' '}
          Vasopressors may now be started via peripheral IV. Do not delay vasopressor therapy waiting for a central line.
        </div>
      </div>

      {/* Q1 */}
      <div style={{
        padding: '16px',
        borderRadius: '14px',
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border)',
      }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
          Question 1
        </div>
        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 14, lineHeight: 1.4 }}>
          What is the most likely primary cause of this patient's hypotension?
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { value: 'obvious_blood_loss', label: 'Obvious blood loss / fluid loss / dehydration', sub: 'Haemorrhage, vomiting, diarrhoea, burns' },
            { value: 'infection_suspected', label: 'Infection suspected or confirmed', sub: 'Fever, source, inflammatory picture' },
            { value: 'allergy', label: 'Allergic reaction / recent drug or exposure', sub: 'Urticaria, angioedema, bronchospasm' },
            { value: 'cardiac', label: 'Cardiac cause', sub: 'MI, arrhythmia, tamponade, PE' },
            { value: 'spine', label: 'Spinal cord injury or high spinal', sub: 'Trauma, neuraxial anaesthesia' },
            { value: 'other', label: 'Uncertain / mixed picture', sub: 'Multiple possible causes' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setAnswers({ ...INITIAL_ANSWERS, q1: opt.value as Answer['q1'] })}
              style={{
                padding: '12px 14px',
                borderRadius: '10px',
                border: `1.5px solid ${answers.q1 === opt.value ? 'var(--color-accent-blue)' : 'var(--color-border)'}`,
                background: answers.q1 === opt.value ? 'rgba(14,165,233,0.08)' : 'transparent',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontWeight: answers.q1 === opt.value ? 700 : 500, fontSize: '0.88rem', color: answers.q1 === opt.value ? 'var(--color-accent-blue)' : 'var(--color-text-primary)' }}>
                {opt.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                {opt.sub}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Q2 — distributive branch */}
      {(answers.q1 === 'infection_suspected' || answers.q1 === 'other') && (
        <div style={{
          padding: '16px',
          borderRadius: '14px',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Question 2
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 14, lineHeight: 1.4 }}>
            What best describes the distributive picture?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { value: 'fever_source', label: 'Fever, suspected infection source, inflammatory signs', sub: 'Septic shock' },
              { value: 'anaphylaxis', label: 'Acute allergy — urticaria, angioedema, bronchospasm', sub: 'Anaphylactic shock' },
              { value: 'spine_trauma', label: 'Spinal cord injury or high spinal anaesthesia', sub: 'Neurogenic shock' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setAnswers(a => ({ ...a, q2_distributive: opt.value as Answer['q2_distributive'], q3_septic_confirmed: null }))}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: `1.5px solid ${answers.q2_distributive === opt.value ? 'var(--color-accent-purple)' : 'var(--color-border)'}`,
                  background: answers.q2_distributive === opt.value ? 'rgba(139,92,246,0.08)' : 'transparent',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontWeight: answers.q2_distributive === opt.value ? 700 : 500, fontSize: '0.88rem', color: answers.q2_distributive === opt.value ? 'var(--color-accent-purple)' : 'var(--color-text-primary)' }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                  {opt.sub}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Q3 — septic confirmation */}
      {answers.q2_distributive === 'fever_source' && (
        <div style={{
          padding: '16px',
          borderRadius: '14px',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Question 3
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 6, lineHeight: 1.4 }}>
            Does the patient meet septic shock criteria?
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: 14, lineHeight: 1.5 }}>
            Septic shock = suspected infection + <Abbr term="MAP" /> &lt;65 mmHg requiring vasopressor + lactate &gt;2 mmol/L despite adequate fluid
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { value: true, label: 'Yes — meets criteria', color: '#7c3aed' },
              { value: false, label: 'No — sepsis without shock', color: 'var(--color-accent-green)' },
            ].map(opt => (
              <button
                key={String(opt.value)}
                onClick={() => setAnswers(a => ({ ...a, q3_septic_confirmed: opt.value }))}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: `1.5px solid ${answers.q3_septic_confirmed === opt.value ? opt.color : 'var(--color-border)'}`,
                  background: answers.q3_septic_confirmed === opt.value ? `${opt.color}15` : 'transparent',
                  color: answers.q3_septic_confirmed === opt.value ? opt.color : 'var(--color-text-secondary)',
                  fontWeight: answers.q3_septic_confirmed === opt.value ? 700 : 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '0.88rem',
                  transition: 'all 0.15s',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Q2 — cardiac branch */}
      {answers.q1 === 'cardiac' && (
        <div style={{
          padding: '16px',
          borderRadius: '14px',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Question 2
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 14, lineHeight: 1.4 }}>
            Is the cardiac cause pump failure or mechanical obstruction?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { value: 'poor_pump', label: 'Pump failure — MI, arrhythmia, severe cardiomyopathy', sub: 'Cardiogenic shock' },
              { value: 'obstructed', label: 'Mechanical obstruction — tension pneumothorax, tamponade, massive PE', sub: 'Obstructive shock' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setAnswers(a => ({ ...a, q2_cardiac: opt.value as Answer['q2_cardiac'] }))}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: `1.5px solid ${answers.q2_cardiac === opt.value ? '#e11d48' : 'var(--color-border)'}`,
                  background: answers.q2_cardiac === opt.value ? 'rgba(225,29,72,0.08)' : 'transparent',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontWeight: answers.q2_cardiac === opt.value ? 700 : 500, fontSize: '0.88rem', color: answers.q2_cardiac === opt.value ? '#e11d48' : 'var(--color-text-primary)' }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                  {opt.sub}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Protocol output */}
      {protocol && (
        <ProtocolDisplay
          protocol={protocol}
          regionNoraAvail={region.noradrenalineAvailable}
        />
      )}

      {/* Reset */}
      {answers.q1 && (
        <button
          onClick={reset}
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
          Start over
        </button>
      )}
    </div>
  )
}
