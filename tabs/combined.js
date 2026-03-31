// ════════════════════════════════════════════════════════════════
// COMBINED TABS
// ════════════════════════════════════════════════════════════════
function tabGlycaemicEmergencies(el_) {
  el_.appendChild(secTitle('🚨','Glycaemic Emergencies','DKA, HHS, hyperglycaemic shock, insulin coma, and hyperglycaemic psychosis','#dc2626'));
  el_.appendChild(notebox('🚨 <strong>Glycaemic emergencies are medical emergencies requiring immediate recognition and systematic management.</strong> DKA and HHS carry mortality rates of 1–5% and 10–20% respectively. Early aggressive fluid resuscitation and careful monitoring are the cornerstones of management.','#fef2f2','#fecaca'));

  // Quick differentiator
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#dc2626">🔍 Quick Differentiator — DKA vs HHS vs Hypoglycaemia</h3>'));
  el_.appendChild(card('At-a-Glance Comparison','#dc2626','<div style="overflow-x:auto"><table><thead><tr style="background:#fef2f2"><th>Feature</th><th style="color:#dc2626">DKA</th><th style="color:#d97706">HHS</th><th style="color:#7c3aed">Hypoglycaemia / Insulin Coma</th></tr></thead><tbody>'+[
    ['DM Type','Primarily T1DM (also T2DM)','Primarily T2DM','Any insulin-treated DM'],
    ['Blood Glucose','Usually 250–600 mg/dL','Usually >600 mg/dL (often >1000)','<70 mg/dL (severe <40)'],
    ['Ketones','HIGH (>3 mmol/L)','Absent or trace','Absent'],
    ['pH','<7.3 (acidosis)','Normal (>7.3)','Normal'],
    ['Bicarbonate','<15 mEq/L','Normal (>15)','Normal'],
    ['Osmolality','Mildly elevated','SEVERELY elevated (>320 mOsm/kg)','Normal'],
    ['Onset','Hours (T1DM) to days','Days to weeks','Minutes to hours'],
    ['Consciousness','Variable — alert to coma','Often severely impaired/coma','Variable — confusion to coma'],
    ['Mortality','1–5%','10–20%','Low if treated promptly'],
    ['Key Treatment','IV fluids + insulin infusion + K⁺','IV fluids (primary) + cautious insulin','Glucose (oral/IV) or glucagon'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#dc2626">'+r[1]+'</td><td style="color:#d97706">'+r[2]+'</td><td style="color:#7c3aed">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // ── DKA PROTOCOL ──────────────────────────────────────────────
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">🔴 DKA Protocol — Diabetic Ketoacidosis</h3>'));
  el_.appendChild(card('Diagnostic Criteria (All Three Required)','#dc2626','<div class="g3">'+[
    ['🩸 Hyperglycaemia','Blood glucose >250 mg/dL (>14 mmol/L). Note: Euglycaemic DKA can occur with SGLT2i use — glucose may be normal.','#dc2626','#fef2f2'],
    ['⚗️ Ketonaemia / Ketonuria','Blood ketones >3.0 mmol/L OR urine ketones ≥2+ on dipstick. Beta-hydroxybutyrate is the preferred measurement.','#ea580c','#fff7ed'],
    ['🧪 Metabolic Acidosis','pH <7.3 AND/OR bicarbonate <15 mEq/L on blood gas or BMP.','#d97706','#fffbeb'],
  ].map(function(x){return '<div style="padding:14px;background:'+x[3]+';border-left:4px solid '+x[2]+';border-radius:10px"><div style="font-size:14px;font-weight:700;color:'+x[2]+';margin-bottom:4px">'+x[0]+'</div><div style="font-size:12px;color:#374151;line-height:1.5">'+x[1]+'</div></div>';}).join('')+'</div>'));

  el_.appendChild(card('DKA Severity Classification','#dc2626','<table><thead><tr style="background:#fef2f2"><th>Parameter</th><th style="color:#d97706">Mild</th><th style="color:#ea580c">Moderate</th><th style="color:#dc2626">Severe</th></tr></thead><tbody>'+[
    ['pH','7.25–7.30','7.00–7.24','<7.00'],
    ['Bicarbonate','15–18 mEq/L','10–14 mEq/L','<10 mEq/L'],
    ['Anion Gap','>10','>12','>12'],
    ['Blood Ketones','>3 mmol/L','>3 mmol/L','>3 mmol/L'],
    ['Mental Status','Alert','Alert / Drowsy','Stupor / Coma'],
    ['Setting','May manage with close monitoring','Hospital admission required','ICU admission required'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#d97706">'+r[1]+'</td><td style="color:#ea580c">'+r[2]+'</td><td style="color:#dc2626;font-weight:700">'+r[3]+'</td></tr>';}).join('')+'</tbody></table>'));

  el_.appendChild(card('DKA Management — Step by Step','#dc2626','<div style="font-size:13px;color:#374151">'+[
    {n:'1',t:'Immediate Bloods & Monitoring',c:'FBC, BMP (electrolytes, creatinine, glucose), blood gas (VBG acceptable), blood ketones, blood cultures if febrile, HbA1c, urinalysis. ECG (hyperkalaemia changes). Catheterise if anuric. Continuous cardiac monitoring. Neuro obs hourly.'},
    {n:'2',t:'IV Fluid Resuscitation (Priority #1)',c:'0.9% Normal Saline: 1 litre over 1 hour, then 1 litre over 2 hours, then 1 litre over 4 hours, then 1 litre over 8 hours. Adjust rate based on clinical response, urine output, and haemodynamic status. Switch to 0.45% saline if corrected Na⁺ is high. Switch to 5% Dextrose when glucose falls to 200–250 mg/dL.'},
    {n:'3',t:'Potassium Replacement (BEFORE Insulin if K⁺ Low)',c:'⚠ CRITICAL: Insulin drives K⁺ into cells — can cause fatal hypokalaemia if not replaced. K⁺ >5.5: No K⁺ replacement yet, monitor hourly. K⁺ 3.5–5.5: Add 20–40 mEq KCl per litre of IV fluid. K⁺ <3.5: Replace K⁺ BEFORE starting insulin (40 mEq/hr via central line). Recheck K⁺ every 2 hours.'},
    {n:'4',t:'Insulin Infusion',c:'Fixed-rate IV insulin infusion (FRIII): 0.1 units/kg/hour of regular (soluble) insulin. Do NOT give insulin bolus. Do NOT start insulin if K⁺ <3.5 mEq/L. Target: glucose falling 50–75 mg/dL per hour. When glucose reaches 200–250 mg/dL, add dextrose to IV fluids and continue insulin to clear ketones.'},
    {n:'5',t:'Bicarbonate (Selective Use Only)',c:'Only consider if pH <6.9 (severe acidosis). Use: 100 mEq NaHCO₃ in 400ml water + 20 mEq KCl over 2 hours. Routine bicarbonate use is NOT recommended — worsens hypokalaemia and paradoxical CNS acidosis. Repeat blood gas after 2 hours.'},
    {n:'6',t:'Monitor & Titrate',c:'Hourly: glucose, neurological status, urine output, fluid balance. Every 2 hours: K⁺, blood ketones, VBG. Every 4 hours: full electrolytes, renal function. Resolution criteria: pH >7.3 + bicarbonate >15 + blood ketones <0.6 mmol/L. Do NOT stop insulin infusion until patient eating and subcutaneous insulin given 30–60 min before stopping infusion.'},
    {n:'7',t:'Identify & Treat Precipitant',c:'Most common: Infection (pneumonia, UTI, sepsis) — 30–40%. Insulin omission / non-adherence — 25%. New T1DM diagnosis — 15–20%. Acute illness (MI, pancreatitis, surgery) — 10%. SGLT2 inhibitor use (euglycaemic DKA). Pregnancy. Always search for and treat the underlying cause.'},
  ].map(function(s){return '<div style="display:flex;gap:14px;padding:12px 0;border-bottom:1px solid #fecaca55;align-items:flex-start"><div style="width:28px;height:28px;border-radius:50%;background:#dc2626;color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+s.n+'</div><div><div style="font-weight:700;margin-bottom:3px;color:#dc2626">'+s.t+'</div><div style="font-size:13px;color:#374151;line-height:1.6">'+s.c+'</div></div></div>';}).join('')+'</div>'));

  el_.appendChild(notebox('⚠ <strong>DKA Pitfalls:</strong> (1) Pseudonormoglycaemia in SGLT2i-induced DKA — check ketones even if glucose normal. (2) Do not stop insulin until ketones cleared, not just when glucose normalises. (3) Cerebral oedema risk in children — avoid rapid fluid or glucose correction. (4) Total body K⁺ is always depleted in DKA even if serum K⁺ appears normal or high — always replace.','#fff7ed','#fed7aa'));

  // ── HHS PROTOCOL ──────────────────────────────────────────────
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:24px 0 10px;color:#d97706">🟠 HHS Protocol — Hyperosmolar Hyperglycaemic State</h3>'));
  el_.appendChild(card('Diagnostic Criteria','#d97706','<div class="g2">'+[
    ['🩸 Severe Hyperglycaemia','Blood glucose >600 mg/dL (>33 mmol/L). Often 800–1200 mg/dL. Profound osmotic diuresis leads to severe dehydration.','#d97706','#fffbeb'],
    ['🧪 High Osmolality','Effective serum osmolality >320 mOsm/kg. Formula: 2(Na⁺) + Glucose(mg/dL)/18. Osmolality drives the degree of neurological impairment.','#d97706','#fffbeb'],
    ['✅ Absent / Minimal Ketosis','Blood ketones <3 mmol/L. Some residual insulin prevents lipolysis and ketogenesis. This distinguishes HHS from DKA.','#16a34a','#f0fdf4'],
    ['🧠 Altered Consciousness','Drowsiness, confusion, or coma correlating with degree of hyperosmolality. GCS often significantly reduced.','#ea580c','#fff7ed'],
  ].map(function(x){return '<div style="padding:14px;background:'+x[3]+';border-left:4px solid '+x[2]+';border-radius:10px"><div style="font-size:13px;font-weight:700;color:'+x[2]+';margin-bottom:4px">'+x[0]+'</div><div style="font-size:12px;color:#374151;line-height:1.5">'+x[1]+'</div></div>';}).join('')+'</div>'));

  el_.appendChild(card('HHS Management — Key Principles','#d97706','<div style="font-size:13px;color:#374151">'+[
    {n:'1',t:'Fluid Resuscitation — The Priority',c:'HHS patients are profoundly dehydrated — typical fluid deficit is 8–10 litres (vs 3–5L in DKA). Start: 0.9% Normal Saline 1L over 1 hour. Then reassess. If corrected Na⁺ is high (>145), switch to 0.45% saline. Replace fluids slowly over 24–48 hours — too rapid correction risks cerebral oedema. Target urine output 0.5 ml/kg/hr.'},
    {n:'2',t:'Insulin — Use Cautiously and Later',c:'⚠ Do NOT start insulin immediately. Fluids alone will lower glucose significantly in HHS. Start low-dose insulin (0.05 units/kg/hr) only after adequate fluid resuscitation (usually 1–2 hours in). Glucose should not fall faster than 50–70 mg/dL per hour. Too rapid correction → cerebral oedema and osmotic demyelination syndrome.'},
    {n:'3',t:'Electrolyte Management',c:'Potassium: Replace as in DKA (add to IV fluids). Phosphate: Replace if <1 mg/dL or if respiratory muscle weakness present. Sodium: Corrected Na⁺ = Measured Na⁺ + 1.6 × [(Glucose − 100)/100]. As glucose falls, sodium will rise — monitor closely. Magnesium: Replace if low.'},
    {n:'4',t:'Anticoagulation',c:'HHS carries HIGH thrombotic risk — hyperosmolality causes blood viscosity and platelet aggregation. Start prophylactic low-molecular-weight heparin (LMWH) unless contraindicated. DVT and stroke are significant causes of morbidity and mortality in HHS.'},
    {n:'5',t:'Monitoring',c:'Hourly: glucose, GCS, urine output, fluid balance, osmolality calculation. Every 2 hours: electrolytes. Every 4 hours: full bloods. Resolution: Osmolality <310 mOsm/kg + glucose <300 mg/dL + patient alert and drinking. Do not transition to subcutaneous insulin until patient is eating and drinking reliably.'},
    {n:'6',t:'Identify Precipitant',c:'HHS is almost always triggered by something. Common causes: Infection (most common — UTI, pneumonia, sepsis), New T2DM diagnosis (~25% of cases), Medications (corticosteroids, thiazides, antipsychotics), Acute illness (MI, stroke, pancreatitis), Non-adherence to diabetes medication, Inadequate fluid intake (elderly, nursing home).'},
  ].map(function(s){return '<div style="display:flex;gap:14px;padding:12px 0;border-bottom:1px solid #fde68a55;align-items:flex-start"><div style="width:28px;height:28px;border-radius:50%;background:#d97706;color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+s.n+'</div><div><div style="font-weight:700;margin-bottom:3px;color:#d97706">'+s.t+'</div><div style="font-size:13px;color:#374151;line-height:1.6">'+s.c+'</div></div></div>';}).join('')+'</div>'));

  // ── HYPERGLYCAEMIC SHOCK ──────────────────────────────────────
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:24px 0 10px;color:#ea580c">🔴 Hyperglycaemic Shock Protocol</h3>'));
  el_.appendChild(notebox('📌 <strong>Hyperglycaemic shock</strong> is not a standalone diagnosis — it describes circulatory collapse occurring in the context of severe hyperglycaemia (usually DKA or HHS). The shock may be hypovolaemic (from osmotic diuresis), cardiogenic (MI precipitating DKA), distributive (sepsis triggering DKA/HHS), or mixed.','#fff7ed','#fed7aa'));
  el_.appendChild(card('Recognition & Immediate Management','#ea580c','<div style="font-size:13px;color:#374151">'+[
    {t:'Recognise Haemodynamic Compromise',c:'Shock features in hyperglycaemic patient: MAP <65 mmHg, HR >100, CRT >3 seconds, cold peripheries, altered GCS, lactate >2 mmol/L, oliguria <0.5 ml/kg/hr. Do not assume all hypotension is purely from dehydration — rule out concurrent sepsis, MI, or PE.'},
    {t:'Simultaneous DKA/HHS + Shock Management',c:'A — Airway: Protect if GCS ≤8 (RSI intubation). Risk of aspiration from gastroparesis. B — Breathing: High-flow O₂. Note: Kussmaul breathing in DKA is compensatory — do not suppress. C — Circulation: Large-bore IV access ×2. Aggressive fluid resuscitation (0.9% NS 1L over 30 min, reassess, repeat). If MAP remains <65 despite 2L fluid: start vasopressors (noradrenaline first-line).'},
    {t:'Vasopressor Use in Hyperglycaemic Shock',c:'If fluid-refractory shock: Noradrenaline 0.05–0.5 mcg/kg/min via central line (peripheral if no central access immediately). Note: high-dose vasopressors can worsen hyperglycaemia via catecholamine-mediated gluconeogenesis. Do not delay insulin just because patient is haemodynamically unstable — insulin is essential to resolve the underlying metabolic crisis.'},
    {t:'Investigate for Precipitating Cause',c:'12-lead EKG (MI — the most dangerous precipitant, as STEMI can be silent in diabetics). Blood cultures ×2 (sepsis). CT or clinical exam (perforation, ischaemic gut). Troponin, BNP. Chest X-ray. Treat the underlying cause aggressively — managing DKA/HHS alone without addressing the precipitant is inadequate.'},
    {t:'ICU Admission Criteria',c:'Any of: GCS <13, MAP <65 despite fluid, vasopressor requirement, pH <7.0, potassium <3.0 or >6.0 despite replacement, respiratory failure, oliguria unresponsive to fluid, temperature >38.5°C with clinical sepsis, age >70 with severe DKA/HHS.'},
  ].map(function(s){return '<div style="padding:12px 0;border-bottom:1px solid #fed7aa55"><div style="font-weight:700;color:#ea580c;margin-bottom:4px">'+s.t+'</div><div style="font-size:13px;line-height:1.6">'+s.c+'</div></div>';}).join('')+'</div>'));

  // ── INSULIN COMA ──────────────────────────────────────────────
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:24px 0 10px;color:#7c3aed">🟣 Insulin Coma Protocol — Severe Hypoglycaemia</h3>'));
  el_.appendChild(notebox('📌 <strong>Insulin coma</strong> = severe hypoglycaemia with loss of consciousness caused by excess insulin relative to glucose availability. Blood glucose typically <40 mg/dL (<2.2 mmol/L). Prolonged hypoglycaemia (>30 min) causes irreversible neuronal injury. Every minute counts.','#faf5ff','#e9d5ff'));
  el_.appendChild(card('Grading & Recognition','#7c3aed','<table><thead><tr style="background:#faf5ff"><th>Grade</th><th>BG Level</th><th>Features</th><th>Conscious?</th></tr></thead><tbody>'+[
    ['Mild','54–70 mg/dL (3–3.9)','Sweating, tremor, palpitations, hunger, anxiety','Yes — self-treat'],
    ['Moderate','40–54 mg/dL (2.2–3)','Confusion, irritability, slurred speech, poor coordination, visual changes','Partially — needs assistance'],
    ['Severe / Coma','<40 mg/dL (<2.2)','Unconsciousness, seizures, focal neurology, posturing','No — emergency intervention'],
    ['Prolonged Coma','>30 min <40 mg/dL','Risk of permanent brain injury, cerebral oedema, death','No — ICU level care'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#7c3aed">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-weight:600">'+r[3]+'</td></tr>';}).join('')+'</tbody></table>'));

  el_.appendChild(card('Insulin Coma Management Protocol','#7c3aed','<div style="font-size:13px;color:#374151">'+[
    {n:'1',t:'Confirm Hypoglycaemia',c:'POC glucose immediately. Do not delay treatment if clinical suspicion is high — give glucose empirically if glucose meter unavailable and clinical picture fits. Check: when did patient last eat? When was last insulin dose? What type/dose of insulin?'},
    {n:'2',t:'IV Access — First Priority',c:'Establish IV access immediately. If IV access achieved: 50% Dextrose (Dextrose 50%) 25–50 ml IV push. Flush with 0.9% NS after. Re-check glucose in 10 minutes. If glucose <70 mg/dL — repeat 25ml D50. Follow with D10% infusion 100ml/hr until patient eating.'},
    {n:'3',t:'No IV Access — Glucagon',c:'Glucagon 1mg IM or SC (outer thigh or deltoid). Onset: 5–15 minutes (requires hepatic glycogen stores — ineffective in starvation, liver disease, or prolonged fasting). Nasal glucagon 3mg (Baqsimi) — spray into one nostril. Equivalent efficacy to IM glucagon. Once conscious: give oral carbohydrates immediately to prevent recurrence.'},
    {n:'4',t:'Post-Recovery Management',c:'Recheck glucose every 30 minutes for 2 hours after recovery. Identify the cause: excess insulin dose, delayed/missed meal, unusual exercise, alcohol, renal failure (reduces insulin clearance), drug interaction. Do NOT discharge patient if: long-acting insulin caused the episode (risk of recurrence 12–24hr later), sulfonylurea-induced (prolonged action), or patient lives alone.'},
    {n:'5',t:'Prolonged or Refractory Coma',c:'If no response to D50 + glucagon after 15 minutes: CT head (rule out concurrent CVA or cerebral oedema). Repeat D50 25ml IV. Start D10% continuous infusion. Consider: thiamine 100mg IV before glucose if alcoholism suspected (Wernicke\'s). ICU admission for continuous glucose monitoring and airway protection. Hydrocortisone 100mg IV if adrenal insufficiency suspected.'},
    {n:'6',t:'Insulin Dose Review',c:'After recovery: review insulin regimen. Reduce responsible insulin dose by 10–20%. Educate patient and family on hypoglycaemia recognition and glucagon kit use. Consider CGM. If recurrent severe hypoglycaemia: refer to endocrinology. Relax HbA1c target (consider <8% instead of <7%).'},
  ].map(function(s){return '<div style="display:flex;gap:14px;padding:12px 0;border-bottom:1px solid #e9d5ff55;align-items:flex-start"><div style="width:28px;height:28px;border-radius:50%;background:#7c3aed;color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+s.n+'</div><div><div style="font-weight:700;margin-bottom:3px;color:#7c3aed">'+s.t+'</div><div style="font-size:13px;color:#374151;line-height:1.6">'+s.c+'</div></div></div>';}).join('')+'</div>'));

  // ── HYPERGLYCAEMIC PSYCHOSIS ──────────────────────────────────
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:24px 0 10px;color:#0891b2">🔵 Hyperglycaemic Psychosis</h3>'));
  el_.appendChild(notebox('📌 <strong>Hyperglycaemic psychosis</strong> is an under-recognised neuropsychiatric complication of severe hyperglycaemia (typically BG >400 mg/dL), characterised by acute psychosis, hallucinations, or florid psychiatric symptoms in the absence of a primary psychiatric disorder. It resolves with glycaemic correction — antipsychotics are not the primary treatment.','#f0f9ff','#bae6fd'));
  el_.appendChild(card('Recognition — Clinical Features','#0891b2','<div class="g2">'+[
    ['🧠 Psychiatric Features','Visual or auditory hallucinations, paranoid delusions, agitation, bizarre behaviour, disorganised thought, emotional lability. May mimic acute schizophrenia or manic episode. Critical clue: abrupt onset with no psychiatric history.'],
    ['🩺 Neurological Features','Confusion, disorientation, focal neurological deficits (especially in HHS — may mimic TIA/stroke), seizures (hyperosmolar seizures), involuntary movements, chorea (non-ketotic hyperglycaemia).'],
    ['🌡️ Systemic Features','Polyuria, polydipsia, weight loss, dehydration signs, Kussmaul breathing (if DKA present), fruity breath, tachycardia, hypotension.'],
    ['⚠️ Diagnostic Clue','Any acute psychiatric presentation in a diabetic patient — check blood glucose IMMEDIATELY. A glucose of 400–1200 mg/dL with psychiatric symptoms = hyperglycaemic psychosis until proven otherwise.'],
  ].map(function(x){return '<div style="padding:14px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px"><div style="font-size:13px;font-weight:700;color:#0369a1;margin-bottom:4px">'+x[0]+'</div><div style="font-size:12px;color:#374151;line-height:1.5">'+x[1]+'</div></div>';}).join('')+'</div>'));

  el_.appendChild(card('Differential Diagnosis — Exclude Before Labelling Psychosis','#0891b2','<table><thead><tr style="background:#f0f9ff"><th>Condition</th><th>How to Exclude</th></tr></thead><tbody>'+[
    ['DKA with encephalopathy','Blood ketones, VBG — if DKA present, treat DKA; psychosis resolves'],
    ['HHS with neurological features','Osmolality >320 — treat HHS; symptoms resolve as osmolality normalises'],
    ['Hypoglycaemia','POC glucose — immediate correction if <70 mg/dL'],
    ['Acute CVA (stroke)','CT head — focal neurology or haemorrhage? Hyperglycaemia is also common post-stroke'],
    ['Septic encephalopathy','Blood cultures, WCC, CRP, lactate — sepsis can coexist with hyperglycaemia'],
    ['Wernicke\'s encephalopathy','Alcohol history — give thiamine 100mg IV before glucose if suspected'],
    ['Primary psychiatric disorder','Diagnosis of exclusion — only after metabolic causes fully excluded and glucose corrected'],
    ['Drug toxicity / withdrawal','Full medication and substance history'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="font-size:13px">'+r[1]+'</td></tr>';}).join('')+'</tbody></table>'));

  el_.appendChild(card('Management Protocol','#0891b2','<div style="font-size:13px;color:#374151">'+[
    {t:'Step 1 — Confirm & Treat Hyperglycaemia',c:'This is the definitive treatment. Manage as DKA or HHS depending on ketone status and osmolality. Psychiatric symptoms typically resolve within 12–48 hours of glycaemic normalisation. Do not primarily treat with antipsychotics before glucose is corrected.'},
    {t:'Step 2 — Safety & Agitation Management',c:'Ensure patient and staff safety. For acute severe agitation that poses risk: low-dose Haloperidol 2.5–5mg IM or Olanzapine 5–10mg IM may be used as SHORT-TERM bridge only. Avoid benzodiazepines if possible (respiratory depression risk, especially in Kussmaul breathing). Use minimal restraint — metabolic cause will resolve.'},
    {t:'Step 3 — Neurological Monitoring',c:'Hourly GCS. Watch for seizures — hyperosmolality lowers seizure threshold. If seizures occur: IV Lorazepam 0.1 mg/kg. CT head if focal deficits or first-time seizure. EEG if prolonged altered consciousness despite glucose correction.'},
    {t:'Step 4 — Non-Ketotic Hyperglycaemia with Chorea',c:'A specific syndrome: involuntary choreiform movements (usually unilateral — hemichorea-hemiballismus) associated with non-ketotic hyperglycaemia. CT/MRI may show basal ganglia changes. Treatment: glucose correction. Chorea typically resolves in days to weeks. If persistent, low-dose Haloperidol or Tetrabenazine may help.'},
    {t:'Step 5 — Psychiatric Follow-Up',c:'After glycaemic normalisation, perform formal psychiatric assessment. If symptoms fully resolve with glucose correction — diagnosis is hyperglycaemic psychosis, not primary psychiatric disorder. Document clearly. Optimise long-term glucose control to prevent recurrence. Refer to endocrinology + diabetes psychology.'},
  ].map(function(s){return '<div style="padding:12px 0;border-bottom:1px solid #bae6fd55"><div style="font-weight:700;color:#0891b2;margin-bottom:4px">'+s.t+'</div><div style="font-size:13px;line-height:1.6">'+s.c+'</div></div>';}).join('')+'</div>'));

  el_.appendChild(notebox('🔑 <strong>Key Teaching Point:</strong> Hyperglycaemia causes psychosis through multiple mechanisms — hyperosmolality disrupts neuronal membrane function, osmotic shifts cause cerebral dysfunction, oxidative stress damages neurotransmitter systems, and ketone bodies (in DKA) have direct psychoactive effects. <strong>Correct the glucose — the brain recovers.</strong>','#f0fdf4','#bbf7d0'));
}

function tabCombHTNDM(el_) {
  el_.appendChild(secTitle('🔗','HTN + Diabetes Overview','Clinical co-occurrence, compounded risk, and integrated management','#475569'));
  el_.appendChild(notebox('📊 <strong>~70% of patients with Type 2 Diabetes also have hypertension</strong>, and ~30% of those with hypertension develop T2DM. Together they compound cardiovascular, renal, and retinal risk multiplicatively — not just additively.','#f8fafc','#e2e8f0'));
  el_.appendChild(card('Why They Co-Occur','#475569','<div class="g2">'+[['🔄 Insulin Resistance','Both are downstream of insulin resistance and the metabolic syndrome. Visceral adiposity drives both via inflammatory cytokines, sympathetic activation, and RAAS stimulation.'],['🧬 RAAS Activation','Hyperglycaemia activates the renin-angiotensin-aldosterone system → sodium retention → hypertension. This is why ACE/ARBs benefit both conditions.'],['⚠ Endothelial Dysfunction','Advanced glycation end-products (AGEs) stiffen arteries and impair nitric oxide signalling → higher arterial resistance → HTN.'],['🫀 Autonomic Dysregulation','Diabetic autonomic neuropathy alters baroreceptor reflexes → labile BP → both hypertension and orthostatic hypotension (see Combined: Hypotension)']].map(function(x){return '<div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px"><div style="font-size:14px;font-weight:700;margin-bottom:6px">'+x[0]+'</div><div style="font-size:12px;color:#374151;line-height:1.6">'+x[1]+'</div></div>';}).join('')+'</div>'));
  el_.appendChild(card('Compounded CV Risk','#dc2626','<div style="font-size:13px;line-height:1.7;color:#374151;margin-bottom:12px">A patient with <strong>both</strong> HTN and DM has approximately <strong>4× the cardiovascular mortality</strong> of a person with neither condition. Their 10-year ASCVD risk should be calculated explicitly:</div><div class="g2">'+[['ASCVD Calculator','Calculate 10-year risk using ACC/AHA Pooled Cohort Equations. Tick "Diabetes" in the calculator.','📐 ASCVD'],['BP Target','Both conditions share the same BP target: <strong>&lt;140/90 mmHg</strong> (aim &lt;130/80 if tolerated). This threshold reduces cardiac, renal, and retinal outcomes.','💊 Treatment'],['Statin Therapy','All DM patients ≥40 years should be on a statin. Moderate-intensity statin for DM+HTN without CVD; high-intensity if established CVD.',''],['Antiplatelet','Low-dose aspirin (75–100mg) may be considered in DM+HTN with ≥10% ASCVD risk and low bleeding risk. Discuss risks and benefits.','']].map(function(x){return '<div style="padding:14px;background:#fef2f2;border:1px solid #fecaca;border-radius:10px"><div style="font-size:13px;font-weight:700;color:#dc2626;margin-bottom:4px">'+x[0]+'</div><div style="font-size:12px;color:#374151;line-height:1.5;margin-bottom:6px">'+x[1]+'</div>'+(x[2]?'<button onclick="navTo(\''+x[2]+'\')" style="background:none;border:none;color:#dc2626;font-weight:700;cursor:pointer;text-decoration:underline;font-size:12px">Open →</button>':'')+'</div>';}).join('')+'</div>'));
renderArteryVisualizer(el_);}

function tabCombDrugs(el_) {
  el_.appendChild(secTitle('💊','Shared Drug Classes','Medications that treat both HTN and diabetes-related complications simultaneously','#475569'));
  el_.appendChild(card('Dual-Benefit Drug Classes','#475569','<div style="overflow-x:auto"><table><thead><tr style="background:#f8fafc"><th>Drug Class</th><th>HTN Benefit</th><th>Diabetes Benefit</th><th>Priority Indication</th></tr></thead><tbody>'+[['ACE Inhibitor / ARB','↓ BP 8–12 mmHg; RAAS blockade','Renoprotection (reduces albuminuria); slows DKD progression','First-line in DM+HTN — start if any albuminuria present'],['SGLT2 Inhibitor','Mild BP ↓ 3–5 mmHg (natriuresis)','↓ HbA1c 0.5–1%; weight loss 2–3kg; HF + CKD benefit','Add if CVD, HF, CKD, or obesity'],['GLP-1 Receptor Agonist','Mild BP ↓ 1–3 mmHg','↓ HbA1c 1–1.5%; weight loss 3–10kg; MACE reduction','Add if established CVD or obesity'],['Thiazide Diuretic','↓ BP 6–10 mmHg; cheap','May ↑ glucose at high doses; mild hypokalaemia','Use low-dose (12.5–25mg HCTZ); preferred in elderly'],['Beta-Blocker','Post-MI and HF benefit','May mask hypoglycaemia symptoms (T1DM risk); may impair recovery from hypoglycaemia','Use with caution in T1DM; selective BB (metoprolol, bisoprolol) preferred'],['CCB (Amlodipine)','↓ BP 8–10 mmHg; no metabolic effect','Neutral on glucose and lipids — safe in diabetes','Good add-on when RAAS + diuretic insufficient']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px;color:#0891b2;font-weight:600">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
  el_.appendChild(notebox('💡 In a patient with <strong>HTN + T2DM + CKD with albuminuria</strong>: the combination of an <strong>ACE inhibitor/ARB + SGLT2 inhibitor</strong> is the most evidence-based dual approach — treating BP, glycaemia, and renal outcomes simultaneously.','#f0f9ff','#bae6fd'));
  el_.appendChild(card('Drugs to Use Cautiously in HTN+DM','#f97316','<table><thead><tr style="background:#fff7ed"><th>Drug</th><th>Concern</th><th>Alternative</th></tr></thead><tbody>'+[['Thiazide ≥25mg/day','Worsens insulin resistance; raises glucose','Low-dose HCTZ 12.5mg or switch to CCB'],['Beta-blockers (non-selective)','Mask hypoglycaemia warning signs (T1DM risk)','Cardioselective BB (bisoprolol, metoprolol)'],['Alpha-blockers (monotherapy)','Orthostatic hypotension — worsened by autonomic neuropathy','Reserve for add-on use; avoid as first-line'],['NSAIDs','Raises BP; worsens renal function; blunts ACE/ARB effect','Paracetamol (acetaminophen) for pain; avoid NSAIDs if CKD'],['High-dose corticosteroids','Raise blood glucose significantly; cause fluid retention','Minimise dose; monitor glucose closely during course']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#f97316">'+r[1]+'</td><td>'+r[2]+'</td></tr>';}).join('')+'</tbody></table>'));
}

function tabCombTargets(el_) {
  el_.appendChild(secTitle('📋','Shared Clinical Targets','Aligned monitoring goals, lifestyle targets, and follow-up schedule','#475569'));
  el_.appendChild(card('Aligned Clinical Targets — HTN + DM','#475569','<div class="g2">'+[{l:'Blood Pressure',htn:'<140/90 mmHg (ESC/ESH)',dm:'<130/80 mmHg',match:false},{l:'LDL Cholesterol',htn:'<100 mg/dL (general)',dm:'<70 mg/dL if high risk / CVD',match:false},{l:'eGFR Monitoring',htn:'Annually with ACE/ARB use',dm:'Annually (all DM)',match:true},{l:'Urine Albumin (ACR)',htn:'If CKD or ACE/ARB',dm:'Annually (all DM)',match:true},{l:'ASCVD Risk Score',htn:'At diagnosis, annually if borderline',dm:'DM counts as risk-enhancer',match:true},{l:'Weight / BMI',htn:'BMI <25; target 5–7% loss if overweight',dm:'BMI <25; ≥7% weight loss delays T2DM',match:true},{l:'Lifestyle Goals',htn:'DASH diet + 150 min/week exercise + smoking cessation',dm:'Low-glycaemic DASH diet + 150 min/week + smoking cessation',match:true},{l:'Follow-Up',htn:'1–6 months depending on stage',dm:'3-monthly (HbA1c) + annual screening round',match:false}].map(function(x){return '<div style="padding:12px;background:'+(x.match?'#f0fdf4':'#fff7ed')+';border:1px solid '+(x.match?'#bbf7d0':'#fed7aa')+';border-radius:10px"><div style="font-size:11px;font-weight:700;color:#475569;text-transform:uppercase;margin-bottom:4px">'+x.l+' '+(x.match?'<span style="color:#16a34a">✓ Aligned</span>':'')+'</div><div style="font-size:12px;margin-bottom:2px"><strong style="color:#0ea5e9">HTN:</strong> '+x.htn+'</div><div style="font-size:12px"><strong style="color:#ef4444">DM:</strong> '+x.dm+'</div></div>';}).join('')+'</div>'));
  el_.appendChild(card('Lifestyle — Dual Benefit','#475569','<table><thead><tr style="background:#f8fafc"><th>Intervention</th><th style="color:#0ea5e9">HTN Effect</th><th style="color:#ef4444">DM Effect</th></tr></thead><tbody>'+[['Weight loss ≥5–7%','↓ BP ~1 mmHg/kg','↓ HbA1c ~0.5%; delays T2DM by 58% in prediabetes'],['150 min/week aerobic exercise','↓ BP 4–9 mmHg','↓ HbA1c 0.5–0.7%; improves insulin sensitivity significantly'],['DASH diet','↓ BP 8–14 mmHg','Reduces postprandial glucose spikes; improves lipid profile'],['Sodium restriction <2,300mg/day','↓ BP 2–8 mmHg','Reduces fluid retention in diabetic nephropathy'],['Smoking cessation','Major CV risk reduction','Reduces insulin resistance; improves HbA1c by ~0.5%'],['Alcohol reduction','↓ BP 2–4 mmHg','Reduces hypoglycaemia risk; reduces caloric intake']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#0ea5e9">'+r[1]+'</td><td style="color:#ef4444">'+r[2]+'</td></tr>';}).join('')+'</tbody></table>'));
  // Quick nav
  var qc=card('Quick Navigation','#475569','');
  var qb=qc.querySelector('.card-body');
  var qg=fromHTML('<div class="g2"></div>');
  [['💊 HTN Treatment','💊 Treatment'],['📐 ASCVD Calculator','📐 ASCVD'],['💊 Type 2 Treatment','💊 Type 2 Treatment'],['🩸 Type 1 DM','🩸 Type 1 DM'],['💉 Insulin Guide','💉 Insulin Guide'],['🚨 Shock Protocol','🚨 Shock Protocol'],['👶 Special Populations','👶 Special Pops'],['🔗 Complications','🔗 Complications']].forEach(function(x){
    var b=fromHTML('<button style="padding:10px 14px;background:#f8fafc;border:2px solid #e2e8f0;border-radius:10px;font-size:13px;font-weight:600;color:#374151;text-align:left;width:100%;cursor:pointer">'+x[0]+'</button>');
    b.onclick=function(){navTo(x[1]);};qg.appendChild(b);
  });
  qb.appendChild(qg);el_.appendChild(qc);
}

function searchNavigate(btn) {
  var mod = btn.dataset.mod;
  var tab = btn.dataset.tab;
  var q   = btn.dataset.q;
  if (!mod || !tab) return;

  // Close search bar first
  var sw = document.getElementById('search-bar-wrap');
  if (sw) {
    sw.classList.remove('open');
    var si = document.getElementById('search-input');
    if (si) si.value = '';
    var sr = document.getElementById('search-results');
    if (sr) sr.innerHTML = '';
  }

  // Emergency protocol — open overlay on correct protocol
  if (mod === 'EMERGENCY') {
    var emDefs = window._emTabDefs || [];
    var cleanTab = tab.replace(/^🚨\s*/, '');
    var emIdx = -1;
    for (var i = 0; i < emDefs.length; i++) {
      if (emDefs[i].label === cleanTab) { emIdx = i; break; }
    }
    openEmergency();
    if (emIdx >= 0) {
      setTimeout(function() { showEmProtocol(emIdx); }, 120);
    }
    return;
  }

  // Navigate with 3-level system
  var tabIdx = TABS[mod] ? TABS[mod].indexOf(tab) : -1;
  if (tabIdx >= 0) {
    showTabContent(mod, tabIdx);
  }

  if (q) {
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        highlightSearchTerm(q);
      });
    });
  }
}
