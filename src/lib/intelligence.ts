// ─── The Triad Intelligence Engine ───────────────────────────────────────────
// Layer 1: Per-reading classification (ESC/ESH 2023 BP, ADA 2024 BG)
// Layer 2: Per-patient trend analysis (trajectories, effectiveness, adherence)
// Layer 3: Population scoring (risk score, priority queue, panel control rate)

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface BPClassification {
  category: string
  color: string
  isCrisis: boolean
  isCaution: boolean
  recommendation: string
}

export interface BGClassification {
  category: string
  color: string
  isCrisis: boolean
  isCaution: boolean
  recommendation: string
}

export interface TrendResult {
  trajectory: 'Improving' | 'Stable' | 'Worsening' | 'Insufficient data'
  avg7d: number | null
  avg30d: number | null
  avg90d: number | null
}

export interface MedicationEffectiveness {
  status: 'Responder' | 'Partial Responder' | 'Non-Responder' | 'Insufficient data'
  weeksOnTreatment: number
  flagForReview: boolean
}

export interface AdherenceResult {
  pct: number
  status: 'Good' | 'Fair' | 'Poor'
  expectedReadings: number
  actualReadings: number
}

export interface PatientRiskScore {
  score: number // 0–100
  level: 'Low' | 'Moderate' | 'High' | 'Critical'
  reasons: string[]
}

// ─── LAYER 1: BP CLASSIFICATION (ESC/ESH 2023) ───────────────────────────────

export function classifyBP(systolic: number, diastolic: number): BPClassification {
  // Hypertensive crisis — immediate alert
  if (systolic >= 180 || diastolic >= 120) {
    return {
      category: 'Hypertensive Crisis',
      color: '#dc2626',
      isCrisis: true,
      isCaution: false,
      recommendation: 'Immediate clinical assessment required. Do not delay.',
    }
  }

  // Grade 3
  if (systolic >= 180 || diastolic >= 110) {
    return {
      category: 'Grade 3 Hypertension',
      color: '#dc2626',
      isCrisis: false,
      isCaution: true,
      recommendation: 'Urgent review required. Initiate or intensify antihypertensive therapy.',
    }
  }

  // Grade 2
  if (systolic >= 160 || diastolic >= 100) {
    return {
      category: 'Grade 2 Hypertension',
      color: '#ea580c',
      isCrisis: false,
      isCaution: true,
      recommendation: 'Medication review recommended. Consider combination therapy.',
    }
  }

  // Grade 1
  if (systolic >= 140 || diastolic >= 90) {
    return {
      category: 'Grade 1 Hypertension',
      color: '#f59e0b',
      isCrisis: false,
      isCaution: false,
      recommendation: 'Lifestyle modification and medication review if not already on treatment.',
    }
  }

  // Isolated Systolic HTN
  if (systolic >= 140 && diastolic < 90) {
    return {
      category: 'Isolated Systolic Hypertension',
      color: '#f59e0b',
      isCrisis: false,
      isCaution: false,
      recommendation: 'Treat systolic component. Common in elderly patients.',
    }
  }

  // High Normal
  if ((systolic >= 130 && systolic <= 139) || (diastolic >= 85 && diastolic <= 89)) {
    return {
      category: 'High Normal',
      color: '#eab308',
      isCrisis: false,
      isCaution: false,
      recommendation: 'Lifestyle optimisation. Monitor closely. Consider treatment if high CV risk.',
    }
  }

  // Normal
  if ((systolic >= 120 && systolic <= 129) || (diastolic >= 80 && diastolic <= 84)) {
    return {
      category: 'Normal',
      color: '#22c55e',
      isCrisis: false,
      isCaution: false,
      recommendation: 'Continue current management. Maintain healthy lifestyle.',
    }
  }

  // Optimal
  return {
    category: 'Optimal',
    color: '#16a34a',
    isCrisis: false,
    isCaution: false,
    recommendation: 'Excellent. Maintain current lifestyle and medication adherence.',
  }
}

// ─── LAYER 1: BG CLASSIFICATION (ADA 2024) ───────────────────────────────────

export function classifyBG(
  valueMgdl: number,
  readingType: 'fasting' | 'postprandial' | 'random'
): BGClassification {
  // Severe hypoglycaemia — immediate alert
  if (valueMgdl < 54) {
    return {
      category: 'Severe Hypoglycaemia',
      color: '#7c3aed',
      isCrisis: true,
      isCaution: false,
      recommendation: 'Immediate intervention required. Administer glucose urgently.',
    }
  }

  // Hypoglycaemia
  if (valueMgdl < 70) {
    return {
      category: 'Hypoglycaemia',
      color: '#9333ea',
      isCrisis: false,
      isCaution: true,
      recommendation: 'Treat hypoglycaemia. Review insulin/medication dose. Assess triggers.',
    }
  }

  // Hyperglycaemic crisis — immediate alert
  if (valueMgdl > 400) {
    return {
      category: 'Hyperglycaemic Crisis',
      color: '#dc2626',
      isCrisis: true,
      isCaution: false,
      recommendation: 'Immediate assessment required. Rule out DKA or HHS.',
    }
  }

  if (readingType === 'fasting') {
    if (valueMgdl >= 126) {
      return {
        category: 'Diabetes Range (Fasting)',
        color: '#dc2626',
        isCrisis: false,
        isCaution: true,
        recommendation: 'Above fasting target. Review medication. Check HbA1c.',
      }
    }
    if (valueMgdl >= 100) {
      return {
        category: 'Pre-Diabetes (Fasting)',
        color: '#f59e0b',
        isCrisis: false,
        isCaution: false,
        recommendation: 'Impaired fasting glucose. Intensify lifestyle interventions.',
      }
    }
    return {
      category: 'Normal (Fasting)',
      color: '#22c55e',
      isCrisis: false,
      isCaution: false,
      recommendation: 'Within fasting target. Maintain current management.',
    }
  }

  if (readingType === 'postprandial') {
    if (valueMgdl >= 200) {
      return {
        category: 'Diabetes Range (Post-meal)',
        color: '#dc2626',
        isCrisis: false,
        isCaution: true,
        recommendation: 'Above post-meal target. Review meal composition and medication timing.',
      }
    }
    if (valueMgdl >= 140) {
      return {
        category: 'Pre-Diabetes (Post-meal)',
        color: '#f59e0b',
        isCrisis: false,
        isCaution: false,
        recommendation: 'Impaired glucose tolerance. Dietary review recommended.',
      }
    }
    return {
      category: 'Normal (Post-meal)',
      color: '#22c55e',
      isCrisis: false,
      isCaution: false,
      recommendation: 'Within post-meal target. Good glycaemic control.',
    } as any
  }

  // Random
  if (valueMgdl >= 200) {
    return {
      category: 'Diabetes Range (Random)',
      color: '#dc2626',
      isCrisis: false,
      isCaution: true,
      recommendation: 'Elevated random glucose. Correlate with symptoms. Confirm with fasting.',
    }
  }
  if (valueMgdl >= 140) {
    return {
      category: 'Elevated (Random)',
      color: '#f59e0b',
      isCrisis: false,
      isCaution: false,
      recommendation: 'Mildly elevated. Repeat fasting glucose for confirmation.',
    }
  }
  return {
    category: 'Normal (Random)',
    color: '#22c55e',
    isCrisis: false,
    isCaution: false,
    recommendation: 'Within normal range.',
  }
}

// ─── LAYER 2: TREND ANALYSIS ──────────────────────────────────────────────────

export function analyzeBPTrend(readings: { systolic: number; diastolic: number; logged_at: string }[]): {
  systolic: TrendResult
  diastolic: TrendResult
  trajectory: 'Improving' | 'Stable' | 'Worsening' | 'Insufficient data'
} {
  if (readings.length < 3) {
    return {
      systolic: { trajectory: 'Insufficient data', avg7d: null, avg30d: null, avg90d: null },
      diastolic: { trajectory: 'Insufficient data', avg7d: null, avg30d: null, avg90d: null },
      trajectory: 'Insufficient data',
    }
  }

  const now = new Date()
  const d7 = new Date(now.getTime() - 7 * 86400000)
  const d30 = new Date(now.getTime() - 30 * 86400000)
  const d90 = new Date(now.getTime() - 90 * 86400000)

  const within = (date: Date) => (r: { logged_at: string }) => new Date(r.logged_at) >= date

  const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null

  const r7 = readings.filter(within(d7))
  const r30 = readings.filter(within(d30))
  const r90 = readings.filter(within(d90))

  const sys7 = avg(r7.map(r => r.systolic))
  const sys30 = avg(r30.map(r => r.systolic))
  const sys90 = avg(r90.map(r => r.systolic))

  const dia7 = avg(r7.map(r => r.diastolic))
  const dia30 = avg(r30.map(r => r.diastolic))
  const dia90 = avg(r90.map(r => r.diastolic))

  // Trajectory: compare 7d avg vs 30d avg (if 7d is lower = improving)
  let trajectory: 'Improving' | 'Stable' | 'Worsening' | 'Insufficient data' = 'Insufficient data'
  if (sys7 !== null && sys30 !== null) {
    const delta = sys7 - sys30
    if (delta <= -5) trajectory = 'Improving'
    else if (delta >= 5) trajectory = 'Worsening'
    else trajectory = 'Stable'
  }

  return {
    systolic: { trajectory, avg7d: sys7, avg30d: sys30, avg90d: sys90 },
    diastolic: { trajectory, avg7d: dia7, avg30d: dia30, avg90d: dia90 },
    trajectory,
  }
}

export function analyzeBGTrend(readings: { value_mgdl: number; logged_at: string }[]): TrendResult & {
  hba1cProxy: number | null
  timeInRangePct: number | null
} {
  if (readings.length < 3) {
    return { trajectory: 'Insufficient data', avg7d: null, avg30d: null, avg90d: null, hba1cProxy: null, timeInRangePct: null }
  }

  const now = new Date()
  const d7 = new Date(now.getTime() - 7 * 86400000)
  const d30 = new Date(now.getTime() - 30 * 86400000)
  const d90 = new Date(now.getTime() - 90 * 86400000)

  const within = (date: Date) => (r: { logged_at: string }) => new Date(r.logged_at) >= date
  const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null

  const r7 = readings.filter(within(d7))
  const r30 = readings.filter(within(d30))
  const r90 = readings.filter(within(d90))

  const avg7 = avg(r7.map(r => r.value_mgdl))
  const avg30 = avg(r30.map(r => r.value_mgdl))
  const avg90 = avg(r90.map(r => r.value_mgdl))

  // ADA HbA1c proxy from 90-day average: (avg_glucose + 46.7) / 28.7
  const hba1cProxy = avg90 !== null ? Math.round(((avg90 + 46.7) / 28.7) * 10) / 10 : null

  // Time in range: ADA target 70–180 mg/dL
  const allRecent = readings.filter(within(d30))
  const inRange = allRecent.filter(r => r.value_mgdl >= 70 && r.value_mgdl <= 180).length
  const timeInRangePct = allRecent.length > 0 ? Math.round((inRange / allRecent.length) * 100) : null

  let trajectory: TrendResult['trajectory'] = 'Insufficient data'
  if (avg7 !== null && avg30 !== null) {
    const delta = avg7 - avg30
    if (delta <= -10) trajectory = 'Improving'
    else if (delta >= 10) trajectory = 'Worsening'
    else trajectory = 'Stable'
  }

  return { trajectory, avg7d: avg7, avg30d: avg30, avg90d: avg90, hba1cProxy, timeInRangePct }
}

// ─── LAYER 2: MEDICATION EFFECTIVENESS ───────────────────────────────────────

export function assessMedicationEffectiveness(
  bpReadings: { systolic: number; diastolic: number; logged_at: string }[],
  medicationStartDate: string | null
): MedicationEffectiveness {
  if (!medicationStartDate || bpReadings.length < 5) {
    return { status: 'Insufficient data', weeksOnTreatment: 0, flagForReview: false }
  }

  const start = new Date(medicationStartDate)
  const now = new Date()
  const weeksOnTreatment = Math.floor((now.getTime() - start.getTime()) / (7 * 86400000))

  const afterMeds = bpReadings.filter(r => new Date(r.logged_at) >= start)
  if (afterMeds.length < 3) {
    return { status: 'Insufficient data', weeksOnTreatment, flagForReview: false }
  }

  const avgSys = afterMeds.reduce((a, b) => a + b.systolic, 0) / afterMeds.length

  let status: MedicationEffectiveness['status']
  if (avgSys < 130) status = 'Responder'
  else if (avgSys < 145) status = 'Partial Responder'
  else status = 'Non-Responder'

  // Flag for review if non-responder at 4+ weeks
  const flagForReview = status === 'Non-Responder' && weeksOnTreatment >= 4

  return { status, weeksOnTreatment, flagForReview }
}

// ─── LAYER 2: ADHERENCE ───────────────────────────────────────────────────────

export function assessAdherence(
  actualReadings: number,
  expectedPerWeek: number,
  daysSinceEnrollment: number
): AdherenceResult {
  const expectedTotal = Math.floor((daysSinceEnrollment / 7) * expectedPerWeek)
  if (expectedTotal === 0) {
    return { pct: 100, status: 'Good', expectedReadings: 0, actualReadings }
  }

  const pct = Math.min(100, Math.round((actualReadings / expectedTotal) * 100))
  const status = pct >= 80 ? 'Good' : pct >= 50 ? 'Fair' : 'Poor'

  return { pct, status, expectedReadings: expectedTotal, actualReadings }
}

// ─── LAYER 3: RISK SCORE ─────────────────────────────────────────────────────

export function computeRiskScore(params: {
  latestSystolic: number | null
  latestDiastolic: number | null
  latestBG: number | null
  bpTrajectory: string
  bgTrajectory: string
  adherencePct: number
  lastBPLoggedAt: string | null
  lastBGLoggedAt: string | null
  diagnosisHTN: boolean
  diagnosisDM: boolean
  medicationEffectiveness: string
}): PatientRiskScore {
  let score = 0
  const reasons: string[] = []

  const daysSince = (dateStr: string | null) => {
    if (!dateStr) return 999
    return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
  }

  // BP scoring
  if (params.diagnosisHTN && params.latestSystolic !== null) {
    if (params.latestSystolic >= 180) { score += 40; reasons.push('Hypertensive crisis BP') }
    else if (params.latestSystolic >= 160) { score += 25; reasons.push('Grade 2/3 hypertension') }
    else if (params.latestSystolic >= 140) { score += 10; reasons.push('Grade 1 hypertension') }
  }

  // BG scoring
  if (params.diagnosisDM && params.latestBG !== null) {
    if (params.latestBG > 400) { score += 40; reasons.push('Hyperglycaemic crisis') }
    else if (params.latestBG < 54) { score += 40; reasons.push('Severe hypoglycaemia') }
    else if (params.latestBG > 200) { score += 20; reasons.push('Significantly elevated BG') }
    else if (params.latestBG < 70) { score += 15; reasons.push('Hypoglycaemia') }
  }

  // Trajectory scoring
  if (params.bpTrajectory === 'Worsening') { score += 15; reasons.push('Worsening BP trend') }
  if (params.bgTrajectory === 'Worsening') { score += 15; reasons.push('Worsening BG trend') }

  // Medication effectiveness
  if (params.medicationEffectiveness === 'Non-Responder') { score += 10; reasons.push('Non-responder to medication') }

  // Adherence
  if (params.adherencePct < 50) { score += 10; reasons.push('Poor logging adherence') }
  else if (params.adherencePct < 80) { score += 5; reasons.push('Fair logging adherence') }

  // Logging gap
  if (params.diagnosisHTN) {
    const gap = daysSince(params.lastBPLoggedAt)
    if (gap > 7) { score += 10; reasons.push(`No BP reading for ${gap} days`) }
    else if (gap > 3) { score += 5; reasons.push(`BP reading gap: ${gap} days`) }
  }

  if (params.diagnosisDM) {
    const gap = daysSince(params.lastBGLoggedAt)
    if (gap > 7) { score += 10; reasons.push(`No BG reading for ${gap} days`) }
    else if (gap > 3) { score += 5; reasons.push(`BG reading gap: ${gap} days`) }
  }

  score = Math.min(100, score)

  const level: PatientRiskScore['level'] =
    score >= 60 ? 'Critical' :
    score >= 35 ? 'High' :
    score >= 15 ? 'Moderate' : 'Low'

  return { score, level, reasons }
}

// ─── PANEL CONTROL RATE ───────────────────────────────────────────────────────

export function computePanelControlRate(patients: {
  diagnosisHTN: boolean
  diagnosisDM: boolean
  latestSystolic: number | null
  latestDiastolic: number | null
  latestBG: number | null
}[]): number {
  if (patients.length === 0) return 0

  let controlled = 0

  for (const p of patients) {
    let isControlled = true

    if (p.diagnosisHTN) {
      if (p.latestSystolic === null || p.latestSystolic >= 140 || (p.latestDiastolic !== null && p.latestDiastolic >= 90)) {
        isControlled = false
      }
    }

    if (p.diagnosisDM) {
      // ADA target: fasting <130 mg/dL as proxy
      if (p.latestBG === null || p.latestBG >= 130) {
        isControlled = false
      }
    }

    if (isControlled) controlled++
  }

  return Math.round((controlled / patients.length) * 100)
}
