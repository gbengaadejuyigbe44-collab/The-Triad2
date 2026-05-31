// ─── The Triad 2 — Abbreviation Registry ────────────────────────────────────
// Every clinical abbreviation in the app is defined here once.
// AbbreviationTooltip reads from this registry.
// On first appearance per session → auto-expands inline.
// On subsequent appearances → underlined with tap-to-expand tooltip.

export interface AbbreviationDef {
  short: string
  full: string
  category: 'guideline' | 'clinical' | 'drug' | 'lab' | 'anatomy' | 'organisation'
  note?: string // optional extra context shown in tooltip
}

export const ABBREVIATIONS: Record<string, AbbreviationDef> = {
  // ── Guidelines & Organisations ────────────────────────────────────────────
  ESH: {
    short: 'ESH',
    full: 'European Society of Hypertension',
    category: 'organisation',
    note: 'ESH 2023 guidelines are the primary reference for hypertension classification in this module.',
  },
  ESC: {
    short: 'ESC',
    full: 'European Society of Cardiology',
    category: 'organisation',
    note: 'ESC 2024 added the Elevated BP category (120–139/70–89 mmHg) as a new pre-hypertension tier.',
  },
  ADA: {
    short: 'ADA',
    full: 'American Diabetes Association',
    category: 'organisation',
    note: 'ADA 2025 Standards of Care is the primary reference for diabetes management in this module.',
  },
  SSC: {
    short: 'SSC',
    full: 'Surviving Sepsis Campaign',
    category: 'organisation',
    note: 'SSC 2026 guidelines are the primary reference for septic shock management.',
  },
  AHA: {
    short: 'AHA',
    full: 'American Heart Association',
    category: 'organisation',
  },
  BIHS: {
    short: 'BIHS',
    full: 'British and Irish Hypertension Society',
    category: 'organisation',
  },
  NICE: {
    short: 'NICE',
    full: 'National Institute for Health and Care Excellence',
    category: 'organisation',
    note: 'UK clinical guideline body. NICE NG136 covers hypertension in adults.',
  },
  NHIS: {
    short: 'NHIS',
    full: 'National Health Insurance Scheme',
    category: 'organisation',
    note: 'Nigeria\'s public health insurance scheme. Formulary coverage varies by state and facility.',
  },
  WHO: {
    short: 'WHO',
    full: 'World Health Organization',
    category: 'organisation',
  },
  KDIGO: {
    short: 'KDIGO',
    full: 'Kidney Disease: Improving Global Outcomes',
    category: 'organisation',
  },

  // ── Clinical Terms ────────────────────────────────────────────────────────
  HMOD: {
    short: 'HMOD',
    full: 'Hypertension-Mediated Organ Damage',
    category: 'clinical',
    note: 'The presence of HMOD distinguishes a hypertensive emergency from asymptomatic elevated BP and determines treatment urgency.',
  },
  MAP: {
    short: 'MAP',
    full: 'Mean Arterial Pressure',
    category: 'clinical',
    note: 'MAP = DBP + (SBP − DBP) ÷ 3. Target in septic shock: ≥65 mmHg (60–65 mmHg for age ≥65).',
  },
  SBP: {
    short: 'SBP',
    full: 'Systolic Blood Pressure',
    category: 'clinical',
  },
  DBP: {
    short: 'DBP',
    full: 'Diastolic Blood Pressure',
    category: 'clinical',
  },
  DKA: {
    short: 'DKA',
    full: 'Diabetic Ketoacidosis',
    category: 'clinical',
    note: 'DKA: glucose >11 mmol/L + ketones >3 mmol/L + pH <7.3. Distinguish from HHS by ketone level and pH.',
  },
  HHS: {
    short: 'HHS',
    full: 'Hyperosmolar Hyperglycaemic State',
    category: 'clinical',
    note: 'HHS: glucose >30 mmol/L, osmolality >320 mOsm/kg, minimal ketones. More common in elderly T2DM patients.',
  },
  ASCVD: {
    short: 'ASCVD',
    full: 'Atherosclerotic Cardiovascular Disease',
    category: 'clinical',
    note: 'Includes coronary heart disease, stroke, and peripheral arterial disease.',
  },
  CVD: {
    short: 'CVD',
    full: 'Cardiovascular Disease',
    category: 'clinical',
  },
  CKD: {
    short: 'CKD',
    full: 'Chronic Kidney Disease',
    category: 'clinical',
  },
  AKI: {
    short: 'AKI',
    full: 'Acute Kidney Injury',
    category: 'clinical',
  },
  LVH: {
    short: 'LVH',
    full: 'Left Ventricular Hypertrophy',
    category: 'clinical',
    note: 'A marker of HMOD. Detected on ECG or echocardiogram.',
  },
  AF: {
    short: 'AF',
    full: 'Atrial Fibrillation',
    category: 'clinical',
  },
  ACS: {
    short: 'ACS',
    full: 'Acute Coronary Syndrome',
    category: 'clinical',
  },
  PE: {
    short: 'PE',
    full: 'Pulmonary Embolism',
    category: 'clinical',
  },
  APO: {
    short: 'APO',
    full: 'Acute Pulmonary Oedema',
    category: 'clinical',
  },
  VOC: {
    short: 'VOC',
    full: 'Vaso-Occlusive Crisis',
    category: 'clinical',
    note: 'The most common acute complication of sickle cell disease.',
  },
  T1DM: {
    short: 'T1DM',
    full: 'Type 1 Diabetes Mellitus',
    category: 'clinical',
  },
  T2DM: {
    short: 'T2DM',
    full: 'Type 2 Diabetes Mellitus',
    category: 'clinical',
  },
  HTN: {
    short: 'HTN',
    full: 'Hypertension',
    category: 'clinical',
  },
  DM: {
    short: 'DM',
    full: 'Diabetes Mellitus',
    category: 'clinical',
  },
  CVA: {
    short: 'CVA',
    full: 'Cerebrovascular Accident (Stroke)',
    category: 'clinical',
  },
  TIA: {
    short: 'TIA',
    full: 'Transient Ischaemic Attack',
    category: 'clinical',
    note: 'A "mini-stroke" — symptoms resolve within 24 hours but TIA is a medical emergency requiring same-day assessment.',
  },
  SSS: {
    short: 'SSS',
    full: 'Sick Sinus Syndrome',
    category: 'clinical',
  },
  VOD: {
    short: 'VOD',
    full: 'Veno-Occlusive Disease',
    category: 'clinical',
  },
  SIADH: {
    short: 'SIADH',
    full: 'Syndrome of Inappropriate Antidiuretic Hormone Secretion',
    category: 'clinical',
  },
  ARDS: {
    short: 'ARDS',
    full: 'Acute Respiratory Distress Syndrome',
    category: 'clinical',
  },

  // ── Drug Classes ──────────────────────────────────────────────────────────
  CCB: {
    short: 'CCB',
    full: 'Calcium Channel Blocker',
    category: 'drug',
    note: 'e.g. Amlodipine, Nifedipine. Preferred first-line in Black African patients per ESH 2023.',
  },
  ACEi: {
    short: 'ACEi',
    full: 'ACE Inhibitor (Angiotensin-Converting Enzyme Inhibitor)',
    category: 'drug',
    note: 'e.g. Lisinopril, Ramipril. Avoid in pregnancy. Preferred when CKD or DM present.',
  },
  ARB: {
    short: 'ARB',
    full: 'Angiotensin Receptor Blocker',
    category: 'drug',
    note: 'e.g. Losartan, Valsartan. Alternative to ACEi — use when ACEi causes cough.',
  },
  BB: {
    short: 'BB',
    full: 'Beta-Blocker',
    category: 'drug',
    note: 'e.g. Atenolol, Metoprolol, Labetalol. Caution: masks hypoglycaemia symptoms in diabetic patients.',
  },
  HCTZ: {
    short: 'HCTZ',
    full: 'Hydrochlorothiazide',
    category: 'drug',
    note: 'A thiazide diuretic. First-line in combination therapy for hypertension. Monitor potassium.',
  },
  GTN: {
    short: 'GTN',
    full: 'Glyceryl Trinitrate (Nitroglycerin)',
    category: 'drug',
    note: 'IV GTN is used for hypertensive emergency with cardiac involvement (ACS, APO). Avoid if SBP <90.',
  },
  MgSO4: {
    short: 'MgSO4',
    full: 'Magnesium Sulphate',
    category: 'drug',
    note: 'First-line for eclampsia seizure prevention and treatment.',
  },
  SGLT2: {
    short: 'SGLT2',
    full: 'Sodium-Glucose Cotransporter-2 (Inhibitor)',
    category: 'drug',
    note: 'e.g. Empagliflozin, Dapagliflozin. Preferred in T2DM with CVD or CKD per ADA 2025. Largely inaccessible in Nigeria.',
  },
  GLP1: {
    short: 'GLP-1',
    full: 'Glucagon-Like Peptide-1 (Receptor Agonist)',
    category: 'drug',
    note: 'e.g. Semaglutide, Liraglutide. Preferred in T2DM with CVD per ADA 2025. Largely inaccessible in Nigeria.',
  },
  NPH: {
    short: 'NPH',
    full: 'Neutral Protamine Hagedorn (Insulin)',
    category: 'drug',
    note: 'An intermediate-acting insulin. Requires cold chain storage (2–8°C). Most widely available insulin in Nigeria.',
  },

  // ── Lab Values ────────────────────────────────────────────────────────────
  eGFR: {
    short: 'eGFR',
    full: 'Estimated Glomerular Filtration Rate',
    category: 'lab',
    note: 'Measure of kidney function. eGFR <60 mL/min/1.73m² for >3 months = CKD. Metformin contraindicated if eGFR <30.',
  },
  ACR: {
    short: 'ACR',
    full: 'Albumin-to-Creatinine Ratio',
    category: 'lab',
    note: 'Urine ACR. A marker of early kidney damage. ACR >3 mg/mmol = microalbuminuria.',
  },
  HbA1c: {
    short: 'HbA1c',
    full: 'Glycated Haemoglobin',
    category: 'lab',
    note: 'Reflects average blood glucose over 2–3 months. Target <53 mmol/mol (7%) for most T2DM patients per ADA 2025.',
  },
  BG: {
    short: 'BG',
    full: 'Blood Glucose',
    category: 'lab',
  },
  BP: {
    short: 'BP',
    full: 'Blood Pressure',
    category: 'lab',
  },
  ECG: {
    short: 'ECG',
    full: 'Electrocardiogram',
    category: 'lab',
  },
  INR: {
    short: 'INR',
    full: 'International Normalised Ratio',
    category: 'lab',
    note: 'Measures how long blood takes to clot. Target range varies by indication (e.g. AF: 2.0–3.0).',
  },
  FBC: {
    short: 'FBC',
    full: 'Full Blood Count',
    category: 'lab',
  },
  LFT: {
    short: 'LFT',
    full: 'Liver Function Tests',
    category: 'lab',
  },
  U_E: {
    short: 'U&E',
    full: 'Urea and Electrolytes',
    category: 'lab',
  },

  // ── Anatomy & Physiology ──────────────────────────────────────────────────
  LV: {
    short: 'LV',
    full: 'Left Ventricle',
    category: 'anatomy',
  },
  RV: {
    short: 'RV',
    full: 'Right Ventricle',
    category: 'anatomy',
  },
  ICP: {
    short: 'ICP',
    full: 'Intracranial Pressure',
    category: 'anatomy',
  },

  // ── Clinical Scores & Systems ─────────────────────────────────────────────
  SCORE2: {
    short: 'SCORE2',
    full: 'Systematic COronary Risk Evaluation 2',
    category: 'clinical',
    note: 'European cardiovascular risk calculator. SCORE2 is derived from European populations and underestimates risk in Black African patients — apply upward correction.',
  },
  SBAR: {
    short: 'SBAR',
    full: 'Situation, Background, Assessment, Recommendation',
    category: 'clinical',
    note: 'A structured communication tool for clinical handover.',
  },
  NEWS: {
    short: 'NEWS',
    full: 'National Early Warning Score',
    category: 'clinical',
  },
  GCS: {
    short: 'GCS',
    full: 'Glasgow Coma Scale',
    category: 'clinical',
    note: 'Measures level of consciousness. Range 3–15. Score <8 = severe impairment.',
  },
  AVPU: {
    short: 'AVPU',
    full: 'Alert, Voice, Pain, Unresponsive',
    category: 'clinical',
    note: 'A rapid assessment of consciousness level. P or U = GCS ≤8 = severe impairment.',
  },
  BMI: {
    short: 'BMI',
    full: 'Body Mass Index',
    category: 'clinical',
    note: 'Weight (kg) ÷ Height² (m). BMI >30 = obesity. Use adjusted body weight for fluid calculations in obesity.',
  },
  SpO2: {
    short: 'SpO2',
    full: 'Peripheral Oxygen Saturation',
    category: 'clinical',
    note: 'Measured by pulse oximetry. Normal ≥95%. Target ≥94% in acute illness unless COPD.',
  },
  HR: {
    short: 'HR',
    full: 'Heart Rate',
    category: 'clinical',
  },
  RR: {
    short: 'RR',
    full: 'Respiratory Rate',
    category: 'clinical',
    note: 'Normal adult RR: 12–20 breaths/min. RR >22 is a sepsis red flag.',
  },
  IV: {
    short: 'IV',
    full: 'Intravenous',
    category: 'clinical',
  },
  IM: {
    short: 'IM',
    full: 'Intramuscular',
    category: 'clinical',
  },
  SC: {
    short: 'SC',
    full: 'Subcutaneous',
    category: 'clinical',
  },
  PO: {
    short: 'PO',
    full: 'Per Os (by mouth / oral)',
    category: 'clinical',
  },
  BD: {
    short: 'BD',
    full: 'Twice Daily',
    category: 'clinical',
  },
  TDS: {
    short: 'TDS',
    full: 'Three Times Daily',
    category: 'clinical',
  },
  OD: {
    short: 'OD',
    full: 'Once Daily',
    category: 'clinical',
  },
  PRN: {
    short: 'PRN',
    full: 'Pro Re Nata (as needed)',
    category: 'clinical',
  },
  STAT: {
    short: 'STAT',
    full: 'Immediately (from Latin statim)',
    category: 'clinical',
  },
  CGM: {
    short: 'CGM',
    full: 'Continuous Glucose Monitor',
    category: 'clinical',
    note: 'ADA 2025 now recommends CGM for all T2DM patients on any glucose-lowering agent, not just insulin.',
  },
  ANC: {
    short: 'ANC',
    full: 'Antenatal Care',
    category: 'clinical',
  },
}

// ── Session tracking (which abbreviations have been shown this session) ───────
const shownThisSession = new Set<string>()

export function hasBeenShown(abbr: string): boolean {
  return shownThisSession.has(abbr.toUpperCase())
}

export function markAsShown(abbr: string): void {
  shownThisSession.add(abbr.toUpperCase())
}

export function getAbbreviation(abbr: string): AbbreviationDef | undefined {
  return ABBREVIATIONS[abbr.toUpperCase()]
}

export function clearSession(): void {
  shownThisSession.clear()
}
