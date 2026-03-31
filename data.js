// ── STATE ────────────────────────────────────────────────────────
var S = {
  module: 'HTN',
  tabs: { HTN:0, HYPO:0, DM:0, COMB:0, DRUG:0 },
  drugGroup: 0,
  bpReadings: (function(){ try { var d=localStorage.getItem('bp_readings'); return d?JSON.parse(d):[]; } catch(e){ return []; } })(),
  selMeds: [],
  crisisQ: {chest:null,vision:null,neuro:null,aki:null},
  riskForm: {age:'',sex:'male',diabetes:false,ckd:false,smoking:false,cvd:false,stage:'normal',bmi:''},
  glucoseUnit: (function(){ try { return localStorage.getItem('triad_glucose_unit')||'mgdl'; } catch(e){ return 'mgdl'; } })(),
};
// Global glucose unit aliases — all DM code reads from S.glucoseUnit
Object.defineProperty(window, '_glucoseUnit', { get: function(){ return S.glucoseUnit; }, set: function(v){ S.glucoseUnit=v; try{localStorage.setItem('triad_glucose_unit',v);}catch(e){} }, configurable:true });
Object.defineProperty(window, '_bgUnit',       { get: function(){ return S.glucoseUnit; }, set: function(v){ S.glucoseUnit=v; try{localStorage.setItem('triad_glucose_unit',v);}catch(e){} }, configurable:true });

// ── TABS ─────────────────────────────────────────────────────────
var TABS = {
  HTN:  ['Prevention','Detection','Evaluation','Treatment','Lifestyle','Risk Profile','ASCVD','Med Checker','BP Tracker','Special Pops','BP Measurement','CVA Protocol','ANC Assessment'],
  HYPO: ['Prevention','Detection','Causes','Evaluation','Management','Shock Protocol','Special Cases'],
  DM:   ['Prevention','Detection','Evaluation','Type 2 Treatment','Type 1 DM','HbA1c & Targets','Insulin Guide','Insulin Chart','BG Tracker','Complications','Glycaemic Emergencies'],
  COMB: ['HTN + DM','Shared Drugs','Shared Targets'],
  DRUG: ['Antihypertensives','Vasopressors','Antidiabetics','Insulin Calc','Emergency Meds','IV Fluids','Interactions','Drugs in Pregnancy','Psychiatry','Antibiotics','Electrolytes','Analgesics','Resp & GI','Cardio & Endocrine','Neuro & MSK','Antimalarials','Dermatology','Obs & Gynae','Haematology','Ophthalmology','ENT','TB & HIV','Oncology Support','Palliative Care'],
  SEPSIS: ['Overview','qSOFA & SOFA','Hour-1 Bundle','Empiric Antibiotics','Severity Guide','Investigations'],
  PAED:   ['Drug Doses','Normal Values','DKA Protocol','Neonatal Resus','Fluid Guide','Assessment','Malaria & Fever','Convulsions','Malnutrition','Sickle Cell'],
  RENAL:  ['eGFR Calculator','CKD Staging','AKI Protocol','Complications','Dialysis','Drug Dosing'],
  REVIEW: ['Reviews & Feedback','Glossary'],
};
var TAB_HINTS = {
  HTN:  ['Strategies to prevent hypertension onset','Enter BP to classify stage & risk','History, exam, investigations','Drugs by profile & comorbidity','Diet, exercise, weight, alcohol','10-year CV risk calculation','ASCVD risk estimator','Check drug interactions & safety','Log & chart patient BP readings','Pregnancy, CKD, elderly, children','Proper technique & white-coat effect','Acute stroke BP management','BP assessment in antenatal care'],
  HYPO: ['Prevent falls & hypotensive episodes','BP thresholds & classification criteria','Cardiac, volume, distributive, drugs','History, tilt test, investigations','Fluids, vasopressors, medications','Septic · cardiogenic · anaphylactic shock','Neurogenic, postprandial, orthostatic'],
  DM:   ['Screening, lifestyle & primary prevention','FPG, OGTT, HbA1c criteria','Clinical workup & complication screen','Metformin, SGLT2, GLP-1 algorithms','Insulin types, regimens, monitoring','Targets by age & risk; ADA 2024','Correction, basal-bolus, sliding scale','Dose reference by weight & BG','Log & trend glucose readings','Eyes, kidneys, feet, heart','DKA · HHS · Hypoglycaemia protocols'],
  COMB: ['Side-by-side HTN + DM management','Drugs that treat both conditions','Shared BP, BG & lipid targets'],
  DRUG: ['CCBs, ACEi, ARBs, diuretics, beta-blockers','Noradrenaline, dopamine, adrenaline doses','Metformin, SGLT2, GLP-1, sulfonylureas','Weight-based insulin dose calculator','Adrenaline, atropine, magnesium, mannitol','Crystalloids, colloids, blood products','Drug-drug interactions & safety alerts','Safe medications in pregnancy by class','Antidepressants, antipsychotics, mood stabilisers','Empiric & targeted antibiotic regimens','K⁺, Mg²⁺, Na⁺, Ca²⁺ replacement protocols','Opioid, NSAID, paracetamol dosing','Bronchodilators, antiemetics, antacids','Beta-blockers, statins, thyroid, steroids','Anticonvulsants, muscle relaxants, DMARDs','Artemether, quinine, chloroquine regimens','Topical & systemic dermatology drugs','Oxytocin, MgSO4, contraceptives, fertility','Anticoagulants, iron, B12, erythropoietin'],
  SEPSIS:['Definition, SIRS, organ dysfunction','Quick SOFA & SOFA scoring tools','Lactate, cultures, antibiotics, vasopressors','Gram-positive, negative & fungal cover','Mild · moderate · severe · septic shock','FBC, CRP, lactate, blood cultures, imaging'],
  PAED:  ['Weight-based paediatric drug doses','Vitals, growth, developmental norms','Paediatric DKA fluid & insulin protocol','Bag-mask, intubation, drugs, defib','Maintenance & deficit fluid calculation','APLS-based illness severity scoring','Malaria treatment & fever workup','Diazepam, phenobarb, levetiracetam','RUTF, refeeding, therapeutic foods','Painful crisis, ACS, stroke, sequestration'],
  RENAL: ['CKD-EPI calculator — enter creatinine & age','Stage 1–5 with GFR ranges & management','Fluid, electrolytes, renal replacement','Anaemia, bone disease, acidosis, CVD','HD, PD, access & adequacy overview','Renally-adjusted doses for common drugs'],
  REVIEW:['Rate the app & share your feedback','All clinical abbreviations A–Z'],
};
var MOD_COLORS = {HTN:'#0ea5e9',HYPO:'#a855f7',DM:'#ef4444',COMB:'#64748b',DRUG:'#16a34a',REVIEW:'#f59e0b'};
var MOD_ACTIVE_CLS = {HTN:'tab-active',HYPO:'tab-active-hypo',DM:'tab-active-dm',COMB:'tab-active-comb',DRUG:'tab-active-drug',SEPSIS:'tab-active-sepsis',PAED:'tab-active-paed',RENAL:'tab-active-renal',REVIEW:'tab-active-review'};

// ── DATA: HTN ────────────────────────────────────────────────────
var BP_STAGES = [
  {stage:'Optimal',              sys:'<120',   dia:'<80',    color:'#16a34a',bg:'#f0fdf4',border:'#bbf7d0'},
  {stage:'Normal',               sys:'120–129',dia:'80–84',  color:'#22c55e',bg:'#f0fdf4',border:'#bbf7d0'},
  {stage:'High Normal',          sys:'130–139',dia:'85–89',  color:'#d97706',bg:'#fffbeb',border:'#fde68a'},
  {stage:'Grade 1 HTN',          sys:'140–159',dia:'90–99',  color:'#ea580c',bg:'#fff7ed',border:'#fed7aa'},
  {stage:'Grade 2 HTN',          sys:'160–179',dia:'100–109',color:'#dc2626',bg:'#fef2f2',border:'#fecaca'},
  {stage:'Grade 3 HTN',          sys:'≥180',   dia:'≥110',   color:'#7c3aed',bg:'#faf5ff',border:'#e9d5ff'},
  {stage:'Isolated Systolic HTN',sys:'≥140',   dia:'<90',    color:'#0891b2',bg:'#f0f9ff',border:'#bae6fd'},
  {stage:'Hypertensive Crisis',  sys:'>180',   dia:'>120',   color:'#991b1b',bg:'#fff1f2',border:'#fecdd3'},
];

var DRUG_PROFILES = [
  {p:'Uncomplicated HTN',    d:'Thiazide diuretic, ACE inhibitor, ARB, or CCB', n:'Any first-line agent acceptable'},
  {p:'Diabetes',             d:'ACE inhibitor or ARB (preferred)',               n:'Renoprotective benefit; reduces albuminuria'},
  {p:'Chronic Kidney Disease',d:'ACE inhibitor or ARB',                          n:'Slows CKD progression; monitor K⁺ and eGFR'},
  {p:'Heart Failure (HFrEF)',d:'ACE inhibitor/ARB + Beta-blocker + Diuretic + MRA', n:'Mortality benefit proven; quadruple therapy target'},
  {p:'Post-MI / CAD',        d:'Beta-blocker + ACE inhibitor or ARB',            n:'Reduces reinfarction and sudden cardiac death'},
  {p:'Pregnancy',            d:'Labetalol, Nifedipine, Methyldopa',              n:'⚠ ACE inhibitors & ARBs are CONTRAINDICATED in pregnancy'},
  {p:'Isolated Systolic (Elderly)', d:'Thiazide or CCB preferred',               n:'Avoid aggressive lowering; fall risk in ≥65 yrs'},
  {p:'Resistant HTN (≥3 drugs)', d:'Add Spironolactone 25–50mg (PATHWAY-2)',    n:'Rule out secondary causes first; monitor K⁺'},
];

var MEDICATIONS = [
  'ACE Inhibitor (e.g. Lisinopril)','ARB (e.g. Losartan)','Thiazide Diuretic (e.g. HCTZ)',
  'Calcium Channel Blocker (e.g. Amlodipine)','Beta-Blocker (e.g. Metoprolol)',
  'Loop Diuretic (e.g. Furosemide)','Potassium-Sparing Diuretic (e.g. Spironolactone)',
  'Alpha-Blocker (e.g. Doxazosin)','Central Agent (e.g. Clonidine)','Direct Vasodilator (e.g. Hydralazine)',
];

var INTERACTIONS = [
  {drugs:['ACE Inhibitor (e.g. Lisinopril)','ARB (e.g. Losartan)'],sev:'HIGH',msg:'Dual RAAS blockade — increased risk of hypotension, hyperkalemia (K⁺ >6.0), and acute kidney injury. Avoid combination (ONTARGET trial).'},
  {drugs:['ACE Inhibitor (e.g. Lisinopril)','Potassium-Sparing Diuretic (e.g. Spironolactone)'],sev:'HIGH',msg:'Risk of severe hyperkalemia. Monitor K⁺ closely, especially in CKD or HF patients. Check within 1 week of initiation.'},
  {drugs:['ARB (e.g. Losartan)','Potassium-Sparing Diuretic (e.g. Spironolactone)'],sev:'HIGH',msg:'Risk of severe hyperkalemia. Monitor potassium and renal function closely.'},
  {drugs:['Beta-Blocker (e.g. Metoprolol)','Calcium Channel Blocker (e.g. Amlodipine)'],sev:'MEDIUM',msg:'Non-dihydropyridine CCBs (verapamil, diltiazem) with beta-blockers risk bradycardia/AV block. Amlodipine (dihydropyridine) is generally safe in combination.'},
  {drugs:['Loop Diuretic (e.g. Furosemide)','Thiazide Diuretic (e.g. HCTZ)'],sev:'MEDIUM',msg:'Sequential nephron blockade can cause profound diuresis, dehydration, and electrolyte disturbances. Use only with careful monitoring.'},
  {drugs:['Central Agent (e.g. Clonidine)','Beta-Blocker (e.g. Metoprolol)'],sev:'MEDIUM',msg:'Abrupt clonidine withdrawal causes rebound hypertension; worsened if beta-blocker is continued. Taper clonidine slowly.'},
  {drugs:['Alpha-Blocker (e.g. Doxazosin)','Calcium Channel Blocker (e.g. Amlodipine)'],sev:'LOW',msg:'Additive vasodilation may cause orthostatic hypotension, particularly in elderly. Monitor standing BP.'},
  {drugs:['Direct Vasodilator (e.g. Hydralazine)','Beta-Blocker (e.g. Metoprolol)'],sev:'LOW',msg:'Intentional combination: beta-blocker offsets reflex tachycardia from hydralazine. Monitor resting HR.'},
];

var RED_FLAGS = [
  {f:'Age <30 with Stage 2 HTN, no family history',   c:'Renal artery stenosis, primary aldosteronism',                wo:'Renal Doppler, aldosterone/renin ratio'},
  {f:'Resistant HTN on ≥3 medications including diuretic', c:'Primary aldosteronism, OSA, renal artery stenosis',       wo:'Aldosterone/renin, sleep study, renal Doppler'},
  {f:'Episodic HTN with headache, sweating, palpitations',c:'Pheochromocytoma',                                         wo:'24hr urine metanephrines, plasma metanephrines'},
  {f:'Hypokalemia without diuretic use',               c:'Primary aldosteronism, Cushing syndrome',                     wo:'Aldosterone/renin ratio, 24hr urine cortisol'},
  {f:'Abdominal bruit on auscultation',                c:'Renal artery stenosis',                                       wo:'Renal Doppler, CT angiography'},
  {f:'Rising creatinine / eGFR <60 without known cause',c:'Renovascular HTN, CKD',                                     wo:'Renal ultrasound, urine protein, nephrology referral'},
  {f:'Truncal obesity, striae, moon facies, buffalo hump',c:'Cushing syndrome',                                        wo:'Overnight dexamethasone suppression test, 24hr urine cortisol'},
  {f:'Thyroid enlargement, weight change, fatigue',    c:'Hypo- or hyperthyroidism',                                   wo:'TSH, free T4'},
];

var LIFESTYLE_MODS = [
  {icon:'🥗',title:'DASH Diet',       bp:'8–14 mmHg', detail:'Emphasises fruits, vegetables, whole grains, low-fat dairy. Limits saturated fats and red meat.'},
  {icon:'🧂',title:'Sodium Restriction',bp:'2–8 mmHg',detail:'Target <2,300 mg/day (ideal <1,500 mg/day). Check labels — processed foods are the main sodium source.'},
  {icon:'⚖️',title:'Weight Reduction', bp:'~1/kg',    detail:'Each 1 kg lost ≈ 1 mmHg reduction. Target BMI <25. Even 5% weight loss has meaningful benefit.'},
  {icon:'🏃',title:'Physical Activity',bp:'4–9 mmHg', detail:'150 min/week moderate aerobic exercise (brisk walking, cycling, swimming). Resistance training also beneficial.'},
  {icon:'🍷',title:'Limit Alcohol',    bp:'2–4 mmHg', detail:'Men: ≤2 standard drinks/day. Women: ≤1 drink/day. Alcohol raises BP dose-dependently.'},
  {icon:'🚭',title:'Quit Smoking',     bp:'CV risk ↓',detail:'Smoking cessation dramatically reduces overall CV risk. Each cigarette transiently raises BP 5–10 mmHg.'},
  {icon:'😌',title:'Stress Reduction', bp:'Adjunctive',detail:'Mindfulness, meditation, yoga, cognitive behavioural therapy. Chronic stress activates the sympathetic axis.'},
  {icon:'😴',title:'Sleep Hygiene',    bp:'Adjunctive',detail:'Aim 7–9 hours/night. Screen for OSA in resistant HTN — CPAP reduces BP 3–5 mmHg in OSA patients.'},
];

// ── DATA: HYPOTENSION ────────────────────────────────────────────
var HYPO_TYPES = [
  {type:'Orthostatic (Postural)',   def:'SBP drop ≥20 mmHg or DBP drop ≥10 mmHg within 3 min of standing',         color:'#a855f7',bg:'#faf5ff'},
  {type:'Vasovagal (Reflex)',        def:'Sudden drop triggered by emotional stress, prolonged standing, or pain. Vagal-mediated bradycardia + vasodilation.', color:'#8b5cf6',bg:'#f5f3ff'},
  {type:'Postprandial',              def:'SBP drop ≥20 mmHg within 2 hours of eating. Common in elderly and diabetics with autonomic neuropathy.', color:'#7c3aed',bg:'#f5f3ff'},
  {type:'Drug-Induced',             def:'Secondary to antihypertensives, diuretics, antidepressants (TCAs), antipsychotics, opioids, or alcohol.', color:'#6d28d9',bg:'#ede9fe'},
  {type:'Neurogenic',               def:'Failure of autonomic reflex arcs (Parkinson disease, MSA, diabetic autonomic neuropathy, spinal cord injury).', color:'#5b21b6',bg:'#ede9fe'},
  {type:'Hypovolaemic',             def:'Volume depletion from haemorrhage, dehydration, burns, or third-spacing. Most common cause of distributive shock.', color:'#dc2626',bg:'#fef2f2'},
  {type:'Cardiogenic',              def:'Pump failure — acute MI, severe HF, arrhythmia, tamponade, massive PE.', color:'#dc2626',bg:'#fef2f2'},
  {type:'Distributive (Septic)',    def:'Pathological vasodilation — sepsis, anaphylaxis, neurogenic shock, adrenal crisis.', color:'#dc2626',bg:'#fef2f2'},
];

var HYPO_CAUSES = [
  {cat:'Cardiac', items:['Acute myocardial infarction','Severe heart failure (low EF)','Significant arrhythmia (VT, SVT, bradycardia)','Cardiac tamponade','Massive pulmonary embolism','Severe aortic/mitral stenosis']},
  {cat:'Volume Depletion',items:['Haemorrhage (GI bleed, trauma, postpartum)','Severe dehydration (vomiting, diarrhoea, burns)','Adrenal insufficiency (Addison\'s crisis)','Third-spacing (pancreatitis, cirrhosis, sepsis)']},
  {cat:'Vasodilation / Distributive',items:['Septic shock (most common distributive cause)','Anaphylaxis (histamine-mediated vasodilation)','Neurogenic shock (spinal cord injury)','Hepatic cirrhosis (splanchnic vasodilation)','Adrenal crisis']},
  {cat:'Autonomic Dysfunction',items:['Parkinson disease disease / Multiple System Atrophy (MSA)','Diabetic autonomic neuropathy','Pure autonomic failure','Vasovagal syncope','Prolonged bed rest / deconditioning']},
  {cat:'Drug-Induced',items:['Antihypertensives (alpha-blockers, CCBs, diuretics)','Tricyclic antidepressants (TCAs)','Antipsychotics (chlorpromazine, haloperidol)','Opioids / sedatives','PDE-5 inhibitors (sildenafil) + nitrates — DANGEROUS combination','Levodopa / dopamine agonists']},
];

var SHOCK_TYPES = [
  {type:'Hypovolaemic',markers:'Low BP, tachycardia, cold/clammy skin, low CVP/JVP, oliguria',tx:'IV crystalloid bolus (30ml/kg). Control source of bleeding. Blood products if haemorrhagic.'},
  {type:'Cardiogenic', markers:'Low BP, tachycardia, pulmonary oedema, elevated JVP, cold peripheries, S3 gallop',tx:'Inotropes (dobutamine). Vasopressors if refractory. Treat underlying cause (revascularise if ACS). Avoid aggressive fluids.'},
  {type:'Distributive (Septic)',markers:'Low BP, tachycardia, warm/flushed skin, high CO (early), fever',tx:'Surviving Sepsis Bundle: 30ml/kg IV crystalloid, broad-spectrum antibiotics within 1 hour, blood cultures, vasopressors (noradrenaline first-line) if MAP <65 mmHg.'},
  {type:'Obstructive',  markers:'Low BP, elevated JVP, tracheal deviation, muffled heart sounds (tamponade) or hypoxia (PE)',tx:'Tension pneumothorax: needle decompression. Tamponade: pericardiocentesis. Massive PE: thrombolysis or surgical embolectomy.'},
  {type:'Anaphylactic', markers:'Low BP, urticaria, angioedema, bronchospasm, history of allergen exposure',tx:'Adrenaline (epinephrine) 0.5mg IM (0.5ml of 1:1000) immediately. IV fluids. Antihistamines + steroids adjunctive only.'},
];

var ORTHO_MGMT = [
  {step:'Review Medications',detail:'Reduce or stop offending drugs: antihypertensives, diuretics, TCAs, alpha-blockers. Time antihypertensives away from meals/standing.'},
  {step:'Physical Countermeasures',detail:'Rise slowly from sitting to standing (30-second pause). Leg crossing and muscle tensing before standing. Elevate head of bed 10–20°.'},
  {step:'Volume Expansion',detail:'Increase fluid intake to 2–3L/day. Salt supplementation 2–4g/day (if no heart failure or severe HTN). Compression stockings (20–30 mmHg thigh-high).'},
  {step:'Pharmacological Options',detail:'Fludrocortisone 0.1–0.2mg/day (volume expansion — monitor K⁺ and BP supine). Midodrine 2.5–10mg TDS (alpha-1 agonist — avoid at night). Droxidopa (for neurogenic OH).'},
  {step:'Treat Underlying Cause',detail:'Parkinson disease: optimise dopaminergic therapy. Diabetes: glycaemic control to prevent further autonomic neuropathy. Adrenal insufficiency: steroid replacement.'},
];

// ── DATA: DIABETES ───────────────────────────────────────────────
var DM_RISK = [
  'BMI ≥25 (≥23 in Asian Americans)','Age ≥35 years','Family history of Type 2 diabetes',
  'History of gestational diabetes','Polycystic ovary syndrome (PCOS)','Physical inactivity',
  'Hypertension (BP ≥130/80 mmHg)','HDL <35 mg/dL or triglycerides >250 mg/dL',
  'HbA1c 5.7–6.4% (prediabetes)','History of cardiovascular disease',
  'Race/ethnicity: Black, Hispanic, Asian, Native American',
];

var DM_DRUGS_T2 = [
  {p:'First-line (all T2DM)',     d:'Metformin 500mg BD → titrate to 1000mg BD',            n:'Start low, go slow. Hold if eGFR <30. Take with food to reduce GI side effects. Cheap and weight-neutral.'},
  {p:'+ Established CVD / high CV risk', d:'Add GLP-1 RA (Semaglutide, Liraglutide) or SGLT2i (Empagliflozin, Dapagliflozin)', n:'Both independently reduce MACE and CV death regardless of glucose lowering (LEADER, EMPA-REG, DECLARE).'},
  {p:'+ Heart Failure (HFrEF)',   d:'SGLT2 inhibitor preferred (Empagliflozin, Dapagliflozin)', n:'Reduces HF hospitalisation by ~30%. Avoid TZDs (worsen fluid retention). DAPA-HF, EMPEROR-Reduced.'},
  {p:'+ Chronic Kidney Disease',  d:'SGLT2 inhibitor (if eGFR ≥20) + ACE/ARB',              n:'CREDENCE, DAPA-CKD trials confirm renoprotection independent of BP. Finerenone (FIGARO-DKD) adds benefit.'},
  {p:'+ Obesity (BMI ≥30)',       d:'GLP-1 RA or Tirzepatide (dual GIP/GLP-1)',             n:'Semaglutide 2.4mg (Wegovy) — 15% weight loss. Tirzepatide (Mounjaro) — up to 22% weight loss (SURMOUNT trials).'},
  {p:'+ Hypoglycemia risk',       d:'DPP-4 inhibitor (Sitagliptin) or GLP-1 RA',           n:'Both weight-neutral to beneficial. Avoid sulfonylureas if hypoglycemia is a concern (elderly, irregular meals).'},
  {p:'Triple therapy needed',     d:'Metformin + GLP-1 RA + SGLT2i or DPP-4i',             n:'Consider early combination if HbA1c ≥1.5% above target at diagnosis (ADA 2024).'},
  {p:'Insulin required',          d:'Add basal insulin (Glargine/Detemir). See Insulin Guide.',n:'Continue Metformin. Discontinue SGLT2i if insulin dose significant. GLP-1 RA may continue alongside insulin.'},
];

var T1_STEPS = [
  {t:'Diagnosis & Classification', c:'Confirm T1DM: low/absent C-peptide + positive autoantibodies (GAD65, IA-2, ZnT8, IAA). Distinguish from T2DM — critical as management is entirely different. Refer to endocrinology and DSMES program. Provide glucagon emergency kit. CGM strongly recommended for all T1DM.'},
  {t:'Insulin Regimen Selection',  c:'Multiple Daily Injections (MDI): Basal insulin (Glargine U-100/U-300 or Degludec) once daily + Rapid-acting bolus (Aspart, Lispro, Glulisine) with each meal. Insulin pump (CSII): Continuous subcutaneous insulin infusion — consider if MDI fails, wide glucose variability, or patient preference. Closed-loop systems (hybrid artificial pancreas): e.g. Tandem Control-IQ, Omnipod 5 — automatically adjusts basal based on CGM readings.'},
  {t:'Carbohydrate Counting & Dosing', c:'Insulin-to-carb ratio (ICR): typically 1 unit per 10–15g carbohydrates (highly individual — varies by meal, time of day, activity). Correction factor / Insulin Sensitivity Factor (ISF): 1 unit reduces glucose by ~50 mg/dL. 1800 Rule: 1800 ÷ Total Daily Dose = ISF in mg/dL. 100 Rule (mmol/L): 100 ÷ TDD = ISF. Dose timing: rapid-acting 15–20 min before meals (pre-bolus) reduces postprandial spikes.'},
  {t:'Hypoglycaemia Recognition & 15-15 Rule', c:'Mild-moderate (BG <70 mg/dL, conscious): 15g fast-acting carbohydrate (4 glucose tabs, 150ml orange juice, 15 jelly beans). Recheck glucose in 15 minutes. Repeat if still <70 mg/dL. Once normalised, eat a snack if next meal is >1 hour away. Severe (unconscious or unable to swallow): Glucagon 1mg IM or SC (GlucaGen kit) or intranasal glucagon 3mg (Baqsimi). IV access: 50% dextrose 25–50ml IV push. Call emergency services. Never give food or drink to an unconscious person.'},
  {t:'Sick Day Rules (DKA Prevention)', c:'NEVER stop insulin — insulin requirements often increase during illness. Check blood glucose every 2–4 hours. Check urine or blood ketones if glucose >250 mg/dL (>14 mmol/L). Ketone guidance: <0.6 mmol/L = normal; 0.6–1.5 = increased (increase fluids, extra insulin); 1.5–3.0 = high (extra insulin, consider contacting team); >3.0 = dangerous (seek emergency care immediately). Maintain hydration — sugar-free fluids + sugary fluids if not eating. Seek emergency care if: vomiting, large ketones, glucose >300 mg/dL unresponsive to correction, altered consciousness, or suspected DKA.'},
  {t:'Diabetic Ketoacidosis (DKA)', c:'Definition: glucose >250 mg/dL + ketones >3 mmol/L or pH <7.3 + bicarbonate <15 mEq/L. Precipitants: missed insulin, infection (most common), new T1DM diagnosis, insulin pump failure. Management: IV 0.9% saline (1L/hr initially). IV insulin infusion (0.1 units/kg/hr — do NOT stop until ketones cleared). Potassium replacement (always needed — insulin drives K⁺ into cells). Hourly monitoring of glucose, ketones, electrolytes, pH. Transition to subcutaneous insulin only when: pH >7.3, ketones <0.6, patient eating.'},
  {t:'Long-Term Monitoring',         c:'HbA1c: every 3 months until stable, then every 6 months. Target <7.0% (individualise — <6.5% if safely achievable). Annual screening: dilated eye exam (retinopathy), urine ACR + eGFR (nephropathy), foot exam + monofilament (neuropathy), lipid panel, TSH (T1DM associated with autoimmune thyroid disease), coeliac screen (tTG-IgA — 5–10% of T1DM). Blood pressure target <130/80 mmHg. Statin: consider if ≥40 years or high CV risk.'},
  {t:'Psychological & Social Support', c:'Diabetes distress is distinct from clinical depression — affects up to 45% of people with T1DM. Screen annually with Diabetes Distress Scale (DDS) or PHQ-9. Address: burnout from constant monitoring demands, fear of hypoglycaemia, and body image issues (diabulimia — insulin omission for weight loss is life-threatening). Refer to psychologist or diabetes specialist nurse. Technology support: ensure patients can access CGM supplies, insulin, and pump consumables reliably.'},
];

var HBA1C_TARGETS = [
  {p:'Most non-pregnant adults',         t:'<7.0%', egv:'154 mg/dL',  r:'Balances glycaemic benefit vs hypoglycemia risk'},
  {p:'Younger, newly diagnosed, no CVD', t:'<6.5%', egv:'140 mg/dL',  r:'More aggressive if safely achievable without significant hypoglycemia'},
  {p:'Elderly / frail / limited life expectancy', t:'<8.0–8.5%', egv:'183–197 mg/dL', r:'Avoid hypoglycemia; reduce treatment burden'},
  {p:'Pregnancy (pre-existing DM)',      t:'6.0–6.5%',egv:'126–140 mg/dL',r:'Minimise fetal risk; monitor closely with CGM'},
  {p:'Chronic Kidney Disease',           t:'<7.0–8.0%',egv:'154–183 mg/dL',r:'Individualise; HbA1c may be unreliable in CKD (haemolysis)'},
  {p:'Cardiovascular disease',           t:'<7.0–8.0%',egv:'154–183 mg/dL',r:'ACCORD trial: intensive control (target <6.0%) increased mortality'},
  {p:'Type 1 Diabetes',                  t:'<7.0%', egv:'154 mg/dL',  r:'CGM with time-in-range ≥70% preferred metric; HbA1c may lag'},
];

var INSULIN_TYPES = [
  {type:'Rapid-Acting',    eg:'Aspart (NovoLog), Lispro (Humalog), Glulisine (Apidra)', onset:'10–20 min', peak:'1–3 hr',  dur:'3–5 hr',  use:'Mealtime bolus — inject 15–20 min before eating'},
  {type:'Short-Acting',    eg:'Regular (Actrapid, Humulin R, Novolin R)',                          onset:'30–60 min', peak:'2–4 hr',  dur:'5–8 hr',  use:'Mealtime or continuous IV infusion (ICU/DKA)'},
  {type:'Intermediate',    eg:'NPH (Humulin N, Novolin N)',                              onset:'1–3 hr',    peak:'4–10 hr', dur:'12–18 hr', use:'Twice-daily basal; cheaper but more variable'},
  {type:'Long-Acting',     eg:'Glargine (Lantus U-100, Toujeo U-300), Detemir (Levemir)',onset:'1–2 hr',   peak:'Peakless',dur:'20–24 hr', use:'Once-daily basal (preferred over NPH); Toujeo more concentrated'},
  {type:'Ultra-Long',      eg:'Degludec (Tresiba U-100, U-200)',                         onset:'1 hr',      peak:'Peakless',dur:'>42 hr',   use:'Once-daily; flexible timing ±8hr. Lowest hypoglycemia risk'},
  {type:'Premixed',        eg:'70/30 (NPH/Regular), 75/25 (NPL/Lispro)',                onset:'Varies',    peak:'Dual',    dur:'10–16 hr', use:'BD dosing; less flexible but simpler regimen for some T2DM'},
];

var COMPLICATIONS = [
  {c:'Diabetic Retinopathy',  freq:'At diagnosis T2, 5yr T1 → annual', test:'Dilated fundoscopy or retinal photography',     action:'Refer ophthalmology if any retinopathy. Anti-VEGF or laser for proliferative disease.'},
  {c:'Diabetic Nephropathy',  freq:'Annually',                          test:'Urine albumin/creatinine ratio (ACR) + eGFR',   action:'ACE/ARB if ACR >30mg/g. SGLT2i for added renoprotection. Nephrology if eGFR <30.'},
  {c:'Peripheral Neuropathy', freq:'Annually',                          test:'10g monofilament + 128Hz tuning fork',          action:'Foot care education. Gabapentin, duloxetine, or pregabalin for painful neuropathy.'},
  {c:'Diabetic Foot',         freq:'Every clinical visit',             test:'Visual inspection + monofilament',              action:'Podiatry for any ulcer, callus, or deformity. Total contact cast for plantar ulcers.'},
  {c:'Cardiovascular Disease',freq:'Annually',                          test:'Lipid panel + BP + ASCVD risk score',           action:'Statin if ≥40 years + DM. BP target <130/80. GLP-1 RA or SGLT2i if established CVD.'},
  {c:'Autonomic Neuropathy',  freq:'Annually',                          test:'Orthostatic BP, resting HR, gastroparesis screen',action:'Address orthostatic hypotension (see Hypotension module). Gastroenterology for gastroparesis.'},
  {c:'Dental Disease',        freq:'Every 6 months',                   test:'Dental examination',                           action:'Periodontal disease worsens glycaemic control bidirectionally. Emphasise oral hygiene.'},
  {c:'Psychological',         freq:'Annually',                          test:'PHQ-9 + Diabetes Distress Scale',              action:'Refer psychology. Distinguish diabetes distress from clinical depression. See T1DM step 8.'},
];

