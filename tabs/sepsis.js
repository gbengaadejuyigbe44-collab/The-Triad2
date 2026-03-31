function tabSepsisOverview(el_) {
  el_.appendChild(secTitle('\ud83e\udda0','Sepsis Overview','Sepsis-3 definitions, recognition, and clinical red flags','#dc2626'));
  el_.appendChild(notebox('\ud83d\udcd6 <strong>Sepsis-3 Definition (Singer et al., JAMA 2016):</strong> Sepsis is a <strong>life-threatening organ dysfunction</strong> caused by a dysregulated host response to infection. Septic shock is a subset with circulatory and cellular/metabolic abnormalities profound enough to substantially increase mortality.','#fef2f2','#fecaca'));
  el_.appendChild(card('Key Definitions','#dc2626','<div style="display:grid;gap:10px;">'
    +[['Infection','Pathological process caused by invasion of normally sterile tissue by microorganisms'],
      ['Sepsis','Infection + acute organ dysfunction (SOFA score increase \u22652)'],
      ['Septic Shock','Sepsis + vasopressor requirement to maintain MAP \u226565 mmHg + serum lactate >2 mmol/L despite adequate fluid resuscitation'],
      ['SIRS (historical)','\u22652 of: temp >38\u00b0C or <36\u00b0C, HR >90, RR >20, WBC >12 or <4 \u00d7 10\u2079/L \u2014 no longer used to define sepsis but clinically useful as screening trigger']
    ].map(function(r){return '<div style="padding:12px;background:#fef2f2;border-left:4px solid #dc2626;border-radius:8px"><div style="font-weight:700;color:#dc2626;font-size:13px">'+r[0]+'</div><div style="font-size:13px;color:#374151;margin-top:4px">'+r[1]+'</div></div>';}).join('')+'</div>'));
  el_.appendChild(card('Clinical Red Flags \u2014 Think Sepsis','#f97316','<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'
    +[['\ud83c\udf21\ufe0f Temp >38.3\u00b0C or <36\u00b0C','\ud83e\udec1 RR >22 breaths/min'],
      ['\ud83d\udc93 HR >90 bpm','\ud83e\ude78 SBP <100 mmHg'],
      ['\ud83e\udde0 Altered mental status','\ud83d\udfe1 Mottled/cold skin'],
      ['\ud83d\udc89 Lactate >2 mmol/L','\ud83d\udd2c WBC >12 or <4 \u00d7 10\u2079/L'],
      ['\ud83d\udca7 Urine output <0.5 mL/kg/hr for 2h','\u26a1 Creatinine rise >44 \u00b5mol/L acute']
    ].map(function(r){return '<div style="padding:8px;background:#fff7ed;border-radius:8px;font-size:13px;font-weight:600">'+r[0]+'</div><div style="padding:8px;background:#fff7ed;border-radius:8px;font-size:13px;font-weight:600">'+r[1]+'</div>';}).join('')+'</div>'));
  el_.appendChild(card('Mortality by Stage','#991b1b','<div style="overflow-x:auto"><table><thead><tr style="background:#fef2f2"><th>Stage</th><th>Approx. Mortality</th><th>Key Feature</th></tr></thead><tbody>'
    +[['Infection without sepsis','<5%','No organ dysfunction'],
      ['Sepsis','10\u201320%','Organ dysfunction (SOFA \u22652)'],
      ['Septic Shock','30\u201350%','Vasopressor-dependent + lactate >2'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700">'+r[0]+'</td><td style="color:#dc2626;font-weight:700">'+r[1]+'</td><td>'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'
    +'<p style="font-size:12px;color:#64748b;margin-top:8px">Ref: Singer M et al. JAMA 2016;315(8):801\u2013810; Evans L et al. Crit Care Med 2021;49(11):e1063\u2013e1143</p>'));
}

function tabSepsisSeverity(el_) {
  el_.appendChild(secTitle('\ud83d\udcca','Severity Guide','Management stratification and vasopressor selection','#dc2626'));
  el_.appendChild(card('Management by Severity','#dc2626','<div style="overflow-x:auto"><table><thead><tr style="background:#fef2f2"><th>Stage</th><th>Criteria</th><th>Initial Management</th><th>Escalation</th></tr></thead><tbody>'
    +[['Infection','No organ dysfunction','Oral antibiotics if tolerated; GP/clinic follow-up','Admit if deteriorates or red flags appear'],
      ['Sepsis','SOFA \u22652 from baseline','Admit; Hour-1 Bundle; IV antibiotics; monitor urine output, lactate, vitals','ICU if not responding in 2\u20134 hours'],
      ['Septic Shock','Vasopressor needed + lactate >2 despite fluids','ICU admission; norepinephrine; invasive monitoring; target MAP \u226565','Consider hydrocortisone if refractory'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:12px;color:#dc2626">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
  el_.appendChild(card('Vasopressor Guide (SSC 2021)','#7c3aed','<div style="overflow-x:auto"><table><thead><tr style="background:#faf5ff"><th>Agent</th><th>Dose Range</th><th>Role</th><th>Notes</th></tr></thead><tbody>'
    +[['Norepinephrine (NE)','0.01\u20133.3 mcg/kg/min','First-line vasopressor','Titrate to MAP \u226565 mmHg. Preferred central but peripheral OK short-term.'],
      ['Vasopressin','0.03\u20130.04 units/min (fixed)','Add-on to NE; NE-sparing','Add when NE >0.25 mcg/kg/min. Do not titrate \u2014 fixed dose.'],
      ['Epinephrine (Adrenaline)','0.01\u20130.3 mcg/kg/min','Second-line or cardiac arrest doses','Reserve for refractory shock or cardiac arrest. Raises lactate \u2014 monitor closely.'],
      ['Dopamine','2\u201320 mcg/kg/min','Alternative if bradycardia','More arrhythmogenic than NE. Use only if NE unavailable or bradycardia present.'],
      ['Hydrocortisone','200mg/day IV (50mg q6h or infusion)','Refractory septic shock','Add if NE \u22650.25 mcg/kg/min for \u22654 hours. Reduces vasopressor duration.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;font-size:12px">'+r[0]+'</td><td style="font-size:12px;color:#7c3aed;font-weight:700">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:12px;color:#64748b">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
    +'<p style="font-size:12px;color:#64748b;margin-top:8px">Ref: Evans L et al. Crit Care Med 2021;49(11):e1063\u2013e1143</p>'));
  el_.appendChild(card('Fluid Resuscitation Targets','#0ea5e9','<div style="display:grid;gap:8px;font-size:13px">'
    +[['Initial bolus','30 mL/kg IV crystalloid (0.9% NaCl or Lactated Ringer\'s) over 30\u201360 min'],
      ['Reassessment','After each 500 mL \u2014 check MAP, HR, urine output, lung auscultation, JVP'],
      ['Targets','MAP \u226565 mmHg, Urine output \u22650.5 mL/kg/hr, Lactate clearance \u226510% per 2h'],
      ['Stop if','Pulmonary oedema (crackles, SpO\u2082 drop), or CVP rising without haemodynamic improvement'],
    ].map(function(r){return '<div style="padding:8px 12px;background:#f0f9ff;border-radius:8px;display:flex;gap:12px"><strong style="min-width:120px;color:#0891b2">'+r[0]+'</strong><span>'+r[1]+'</span></div>';}).join('')+'</div>'));
}

function tabSepsisSOFA(el_) {
  el_.appendChild(secTitle('\ud83d\udd22','qSOFA & SOFA Scores','Bedside and ICU-level scoring to identify organ dysfunction','#dc2626'));
  el_.appendChild(notebox('\ud83d\udccc <strong>Source:</strong> Seymour CW et al. Assessment of Clinical Criteria for Sepsis. JAMA 2016;315(8):762\u2013774 (qSOFA) \u00b7 Vincent JL et al. The SOFA score. Intensive Care Med 1996;22(7):707\u201310 \u00b7 SSC Guidelines 2021.','#fef2f2','#fecaca'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:0 0 10px;color:#dc2626">\ud83d\udccb qSOFA \u2014 Quick SOFA (Bedside Screen)</h3>'));
  el_.appendChild(notebox('qSOFA is a rapid 3-item bedside screen. <strong>Score \u22652 out of 3</strong> = high risk of organ dysfunction \u2014 escalate immediately and calculate full SOFA.','#fff7ed','#fed7aa'));
  el_.appendChild(card('qSOFA Score (1 point each)','#dc2626','<table><thead><tr style="background:#fef2f2"><th>Criterion</th><th>Cut-off</th><th>Points</th></tr></thead><tbody>'+[
    ['Respiratory Rate','\u226522 breaths/min','1'],
    ['Altered Mentation','GCS <15 (any drop from baseline)','1'],
    ['Systolic BP','\u2264100 mmHg','1'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td>'+r[1]+'</td><td style="font-weight:800;color:#dc2626;font-size:16px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table><div style="margin-top:12px;padding:10px 14px;background:#fef2f2;border-radius:8px;font-size:13px">qSOFA \u22652 \u2192 Suspect sepsis \u2192 Measure lactate \u2192 Get blood cultures \u2192 Start IV antibiotics within 1 hour \u2192 Assess full SOFA in ICU/HDU setting.</div>'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#dc2626">\ud83d\udcca SOFA Score \u2014 Sequential Organ Failure Assessment</h3>'));
  el_.appendChild(card('SOFA Score Components (0\u20134 points each \u2014 max 24)','#dc2626','<div style="overflow-x:auto"><table><thead><tr style="background:#fef2f2"><th>System</th><th>Parameter</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody>'+[
    ['Respiratory','PaO\u2082/FiO\u2082 (mmHg) or SpO\u2082/FiO\u2082','>400','300\u2013400','200\u2013300 (\u00b1vent)','100\u2013200 + vent','<100 + vent'],
    ['Coagulation','Platelets (\u00d710\u00b3/\u00b5L)','>150','100\u2013150','50\u2013100','20\u201350','<20'],
    ['Liver','Bilirubin (\u00b5mol/L)','<20','20\u201332','33\u2013101','102\u2013204','>204'],
    ['Cardiovascular','MAP or vasopressor dose','MAP \u226570','MAP <70','Dopamine \u22645 or Dobu','Dopamine 5.1\u201315 or NA/A \u22640.1','Dopamine >15 or NA/A >0.1'],
    ['CNS','Glasgow Coma Scale','15','13\u201314','10\u201312','6\u20139','<6'],
    ['Renal','Creatinine (\u00b5mol/L) or urine output','<110','110\u2013170','171\u2013299 or UO <500ml/d','300\u2013440 or UO <200ml/d','>440 or UO <200ml/d or anuria'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#dc2626">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="color:#16a34a;font-weight:700">0</td><td>1</td><td>2</td><td style="color:#ea580c">3</td><td style="color:#dc2626;font-weight:700">4</td></tr>';}).join('')+'</tbody></table></div><div style="margin-top:10px;padding:10px;background:#fef2f2;border-radius:8px;font-size:12px">SOFA \u22652 from baseline = organ dysfunction = Sepsis. SOFA \u226511 = high mortality risk (>50%). Use values available at time of assessment.</div>'));
}

function tabSepsisInvestigations(el_) {
  el_.appendChild(secTitle('\ud83e\uddea','Sepsis Investigations','Essential investigations, interpretation, and monitoring parameters','#dc2626'));
  el_.appendChild(notebox('\ud83d\udccc <strong>Source:</strong> SSC Guidelines 2021 \u00b7 NICE NG51 \u00b7 RCPATH Guidelines for Sepsis Investigations.','#fef2f2','#fecaca'));
  el_.appendChild(card('Essential Investigations (Send Immediately)','#dc2626','<table><thead><tr style="background:#fef2f2"><th>Investigation</th><th>Why It Matters</th><th>Key Threshold</th></tr></thead><tbody>'+[
    ['Blood Cultures (\u00d72 sets)','Identify causative organism for targeted therapy','Sensitivity ~60\u201370% \u2014 don\'t delay antibiotics if cultures unavailable'],
    ['Serum Lactate','Marker of tissue hypoperfusion \u2014 prognostic indicator','Lactate >2.0 mmol/L = hypoperfusion; >4.0 mmol/L = severe shock'],
    ['FBC (Full Blood Count)','WBC: infection/immunosuppression; Hb: anaemia; Platelets: DIC','WBC <4 or >12 \u00d710\u2079/L; Platelets <100 \u2192 coagulopathy concern'],
    ['U&E / Renal Function','Monitor AKI \u2014 organ dysfunction criterion; guides fluid and drug dosing','Creatinine rise >26 \u00b5mol/L in 48h OR >1.5\u00d7 baseline = AKI'],
    ['CRP / Procalcitonin (PCT)','Inflammation markers; PCT guides antibiotic duration (de-escalation)','PCT <0.5 ng/ml \u2192 consider stopping antibiotics; CRP >100 = significant infection'],
    ['ABG / VBG','pH, lactate, pO\u2082, pCO\u2082, HCO\u2083 \u2014 assess acid-base status, oxygenation','pH <7.35 = acidosis; PaO\u2082/FiO\u2082 <300 = respiratory dysfunction'],
    ['Coagulation (PT/INR, APTT, Fibrinogen)','Screen for DIC \u2014 complication of septic shock','Fibrinogen <1.5g/L + raised D-dimer + thrombocytopenia \u2192 DIC'],
    ['LFTs + Bilirubin','Hepatic dysfunction \u2014 SOFA criterion','Bilirubin >33 \u00b5mol/L = hepatic dysfunction in SOFA'],
    ['Urinalysis + MSU','Identify UTI source; assess renal tubular function','Leucocytes + nitrites \u2192 UTI; send MSU before antibiotics'],
    ['CXR','Identify pneumonia, pulmonary oedema, pleural effusion','Essential if respiratory source suspected'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px;color:#dc2626;font-weight:600">'+r[2]+'</td></tr>';}).join('')+'</tbody></table>'));
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// PAEDIATRICS MODULE
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

function tabSepsisBundle(el_) {
  el_.appendChild(secTitle('\u23f1\ufe0f','Hour-1 Bundle','Immediate resuscitation targets to complete within the first hour of sepsis recognition','#dc2626'));
  el_.appendChild(notebox('\ud83d\udccc <strong>Source:</strong> Levy MM et al. Surviving Sepsis Campaign Bundle: 2018 update. Intensive Care Med 2018;44(6):925\u2013928. SSC International Guidelines 2021 (Evans L et al. Crit Care Med 2021).','#fef2f2','#fecaca'));
  el_.appendChild(notebox('\ud83c\udfaf <strong>The Hour-1 Bundle</strong> replaces the former 3-hour and 6-hour bundles. All 5 elements should be initiated simultaneously \u2014 not sequentially \u2014 within the first hour of sepsis recognition.','#fef2f2','#fecaca'));

  var steps = [
    {n:'1',t:'Measure Lactate',d:'Obtain blood lactate. If lactate >2 mmol/L = tissue hypoperfusion (even if BP normal = "cryptic shock"). Reassess after fluid resuscitation. Target: lactate normalisation. If no ABG available \u2014 venous lactate is acceptable.',c:'#0ea5e9',bg:'#f0f9ff'},
    {n:'2',t:'Blood Cultures (Before Antibiotics)',d:'Draw at least 2 sets of blood cultures (aerobic + anaerobic) from 2 different sites before giving antibiotics. Additional cultures from relevant sites: urine (MSU), wound swab, sputum, CSF if meningitis suspected. Do NOT delay antibiotics >45 minutes to obtain cultures.',c:'#7c3aed',bg:'#faf5ff'},
    {n:'3',t:'Broad-Spectrum Antibiotics',d:'Administer IV broad-spectrum antibiotics immediately (see Empiric Antibiotics tab). Target within 1 hour of recognition. Each hour of delay increases mortality by ~7%. Use local antibiogram and allergy history. Consider antifungals if high candidaemia risk (TPN, prolonged ICU, neutropenia).',c:'#dc2626',bg:'#fef2f2'},
    {n:'4',t:'IV Fluid Resuscitation',d:'30ml/kg crystalloid bolus (Ringer\'s Lactate preferred; 0.9% NaCl acceptable) IV over first 3 hours if hypotension or lactate \u22654 mmol/L. Reassess fluid responsiveness after each 500ml bolus. Watch for fluid overload (pulmonary oedema, raised JVP) \u2014 use dynamic measures (pulse pressure variation, straight leg raise test) to guide further fluids.',c:'#16a34a',bg:'#f0fdf4'},
    {n:'5',t:'Vasopressors If Hypotensive After Fluids',d:'Start vasopressors if MAP <65 mmHg despite adequate fluid resuscitation. Target MAP \u226565 mmHg. <strong>Noradrenaline (Norepinephrine)</strong> is first-line vasopressor. Initiate via central line if possible (peripheral is acceptable temporarily). Add vasopressin 0.03 units/min to reduce noradrenaline dose if septic shock persists. Adrenaline as rescue agent.',c:'#ea580c',bg:'#fff7ed'},
  ];
  steps.forEach(function(s){
    el_.appendChild(fromHTML('<div style="display:flex;gap:14px;margin-bottom:12px;align-items:flex-start"><div style="width:36px;height:36px;background:'+s.c+';border-radius:50%;color:#fff;font-size:16px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+s.n+'</div><div style="flex:1;padding:14px;background:'+s.bg+';border:1px solid '+s.c+'33;border-radius:10px"><div style="font-size:14px;font-weight:800;color:'+s.c+';margin-bottom:6px">'+s.t+'</div><div style="font-size:13px;line-height:1.7">'+s.d+'</div></div></div>'));
  });
}

function tabSepsisAntibiotics(el_) {
  el_.appendChild(secTitle('\ud83e\udda0','Empiric Antibiotics by Source','Evidence-based initial antibiotic selection by infection source \u2014 de-escalate on culture results','#dc2626'));
  el_.appendChild(notebox('\ud83d\udccc <strong>Sources:</strong> NICE NG51 Sepsis Guidelines \u00b7 WHO AWaRE List 2023 \u00b7 Sanford Guide 2023 \u00b7 IDSA Clinical Practice Guidelines \u00b7 SSC 2021. <strong>ALWAYS</strong> confirm against your hospital antibiogram and local formulary. De-escalate when culture and sensitivity results are available.','#fef2f2','#fecaca'));

  var sources = [
    {src:'Community-Acquired Pneumonia (CAP)', organisms:'S. pneumoniae, H. influenzae, Atypicals (Mycoplasma, Legionella)', ab:'Mild: Amoxicillin 1g TDS PO. Moderate (CURB-65 \u22652): Co-amoxiclav 1.2g TDS IV + Azithromycin 500mg OD PO/IV. Severe/ICU: Piperacillin-Tazobactam 4.5g QDS IV + Azithromycin 500mg IV \u00b1 Oseltamivir if influenza suspected.', note:'CURB-65: Confusion, Urea >7, RR \u226530, BP <90/60, Age \u226565 \u2014 score \u22652 = admit, \u22653 = ICU consideration.', ref:'NICE NG138 \u00b7 BTS Guidelines 2023'},
    {src:'Hospital-Acquired Pneumonia (HAP) / VAP', organisms:'Gram-negatives (Pseudomonas, Klebsiella, Acinetobacter), MRSA if risk factors', ab:'Piperacillin-Tazobactam 4.5g QDS IV + Gentamicin 5mg/kg OD IV (renal monitoring). If MRSA risk: add Vancomycin 15\u201320mg/kg BD IV (trough monitoring). Review with microbiology.', note:'HAP = pneumonia \u226548 hours after hospital admission. VAP = \u226548h after intubation. High resistance risk \u2014 local antibiogram essential.', ref:'IDSA/ATS HAP Guidelines 2016 \u00b7 NICE NG139'},
    {src:'Urinary Tract Infection / Urosepsis', organisms:'E. coli, Klebsiella, Proteus (coliform organisms)', ab:'Uncomplicated UTI (not sepsis): Nitrofurantoin 100mg MR BD \u00d7 5 days (if eGFR >45). Urosepsis (IV route required): Co-amoxiclav 1.2g TDS IV OR Gentamicin 5mg/kg OD IV monotherapy. If resistant/complicated: Meropenem 1g TDS IV.', note:'Urine culture and sensitivity mandatory before antibiotics if at all possible. Common resistance to ampicillin and trimethoprim in many regions.', ref:'NICE NG109 \u00b7 SIGN Antibiotic Guidelines'},
    {src:'Abdominal / Intra-abdominal Sepsis', organisms:'Gram-negatives (E. coli, Klebsiella), Anaerobes (Bacteroides), Enterococcus', ab:'Community-acquired: Co-amoxiclav 1.2g TDS IV + Metronidazole 500mg TDS IV. Severe/ICU: Piperacillin-Tazobactam 4.5g QDS IV (covers anaerobes \u2014 no need to add Metronidazole if using Pip-Taz). Biliary: add Gentamicin if cholangitis/empyema.', note:'Source control is as important as antibiotics in abdominal sepsis \u2014 percutaneous drainage or surgical intervention may be necessary. Consult surgery.', ref:'IDSA Intra-abdominal Infection Guidelines 2023'},
    {src:'Meningitis / CNS Sepsis', organisms:'N. meningitidis, S. pneumoniae, H. influenzae, Listeria (elderly/immunocompromised)', ab:'Ceftriaxone 2g BD IV (IMMEDIATE \u2014 do not delay for CT/LP). Add Amoxicillin 2g 4-hourly IV if Listeria risk (>50 years, immunocompromised, pregnant). Dexamethasone 0.15mg/kg QDS IV \u00d7 4 days (reduce inflammation \u2014 give before or with first antibiotic dose).', note:'NEVER delay antibiotics for CT scan or LP if clinically meningitis. If LP is safe and culture-negative, MRI brain + repeat LP in 12\u201324 hours.', ref:'NICE NG240 (Meningitis) 2023 \u00b7 BNF'},
    {src:'Skin/Soft Tissue / Necrotising Fasciitis', organisms:'Group A Strep (NF type II), Polymicrobial (NF type I: Gram+, Gram-, Anaerobes)', ab:'Necrotising Fasciitis (SURGICAL EMERGENCY \u2014 antibiotics are adjunctive): Pip-Taz 4.5g QDS IV + Clindamycin 900mg TDS IV (suppresses toxin production). Add Vancomycin if MRSA risk. Non-necrotising SSTI: Flucloxacillin 1\u20132g QDS IV (or Clindamycin if penicillin allergic).', note:'Necrotising fasciitis: URGENT surgical debridement is the primary treatment. Do not delay for antibiotics. LRINEC score \u22656 = high NF risk.', ref:'IDSA SSTI Guidelines 2014 \u00b7 BNF'},
    {src:'Unknown Source / Empirical Cover', organisms:'Unknown \u2014 broad-spectrum required', ab:'Community-acquired: Co-amoxiclav 1.2g TDS IV + Metronidazole 500mg TDS IV + Gentamicin 5mg/kg OD IV. Hospital-acquired/ICU: Piperacillin-Tazobactam 4.5g QDS IV + Gentamicin 5mg/kg OD IV \u00b1 Metronidazole if abdominal source possible. Immunocompromised: add Meropenem + Antifungal (Fluconazole/Caspofungin).', note:'Identify source ASAP \u2014 culture-guided de-escalation reduces resistance and adverse effects. Reassess at 48\u201372 hours. Consider ID/microbiology consultation.', ref:'SSC Guidelines 2021'},
  ];
  sources.forEach(function(s){
    el_.appendChild(card(s.src,'#dc2626','<div class="g2" style="margin-bottom:10px"><div style="padding:10px;background:#fef2f2;border-radius:8px"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">Common Organisms</div><div style="font-size:12px">'+s.organisms+'</div></div><div style="padding:10px;background:#f0fdf4;border-radius:8px"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">Empiric Antibiotics</div><div style="font-size:12px;line-height:1.6">'+s.ab+'</div></div></div><div style="padding:8px 12px;background:#fffbeb;border-left:3px solid #d97706;border-radius:6px;font-size:12px;margin-bottom:6px">\u26a0\ufe0f '+s.note+'</div><div style="font-size:11px;color:#64748b">\ud83d\udcda Ref: '+s.ref+'</div>'));
  });

  // Typhoid
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#f97316">🦠 Typhoid / Enteric Fever (Salmonella typhi)</h3>'));
  el_.appendChild(notebox('⚠️ <strong>Critical Nigerian context:</strong> Typhoid is massively overdiagnosed in Nigeria. The Widal test has poor sensitivity and specificity in endemic areas — a positive result in isolation is unreliable. <strong>Blood culture is the gold standard.</strong> Maintain a broad differential for prolonged fever: malaria, UTI, viral fever, TB, lymphoma. Do not reflexively diagnose typhoid based on Widal alone. That said, confirmed or strongly suspected typhoid requires prompt treatment.','#fff7ed','#fed7aa'));
  el_.appendChild(card('Typhoid — Treatment by Severity','#f97316','<table><thead><tr style="background:#fff7ed"><th>Severity</th><th>First-line</th><th>Alternative</th><th>Duration</th></tr></thead><tbody>'+[
    ['Uncomplicated','Azithromycin 500mg OD PO (adult); 20mg/kg OD (child, max 1g)','Cefixime 400mg BD PO (adult) — oral 3rd gen cephalosporin','7 days'],
    ['Moderate–Severe (IV required)','Ceftriaxone 2g OD IV (adult); 75–100mg/kg/day (child, max 4g)','Ampicillin 2g 6-hourly IV — if susceptible on culture','10–14 days'],
    ['Complicated (perforation, encephalopathy, haemorrhage)','Ceftriaxone 100mg/kg/day IV + surgical consult if perforation. Dexamethasone 3mg/kg loading, then 1mg/kg 6-hourly × 8 doses for encephalopathy (Hoffman 1984)','Meropenem 1g TDS IV for MDR with carbapenem susceptibility','14–21 days'],
    ['MDR Typhoid (resistant to Ampicillin, Chloramphenicol, Co-trimoxazole)','Ceftriaxone IV OR Azithromycin PO — MDR Salmonella usually still susceptible','Avoid Ciprofloxacin empirically in Nigeria — high fluoroquinolone resistance','Per sensitivity'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;color:#f97316;font-size:12px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:12px;font-weight:700">'+r[3]+'</td></tr>';}).join('')+'</tbody></table><p style="font-size:11px;color:#64748b;margin-top:8px">⚠️ Complications to monitor: intestinal perforation (acute abdomen — surgical emergency), typhoid encephalopathy (altered consciousness, seizures), GI haemorrhage, hepatitis, myocarditis.</p>'));

  // Severe Malaria
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#dc2626">🦟 Severe Malaria — Sepsis Context</h3>'));
  el_.appendChild(notebox('📌 Severe malaria causes sepsis-like haemodynamic compromise — hypotension, metabolic acidosis, multi-organ dysfunction. It must be in the differential for <strong>all febrile patients presenting with shock in Nigeria.</strong> Treat empirically for both sepsis AND malaria if RDT unavailable.','#fef2f2','#fecaca'));
  el_.appendChild(card('Severe Malaria — Emergency Treatment','#dc2626','<table><thead><tr style="background:#fef2f2"><th>Parameter</th><th>Detail</th></tr></thead><tbody>'+[
    ['Diagnosis','Thick blood film (most sensitive) or RDT. If unavailable and clinical suspicion high — treat empirically. Do NOT wait for results if patient deteriorating.'],
    ['First-line','Artesunate 2.4 mg/kg IV at 0, 12, 24 hours — then OD until oral tolerated. Children <20 kg: 3 mg/kg per dose. Reconstitute in sodium bicarbonate solution provided.'],
    ['If Artesunate unavailable','Quinine 20 mg/kg IV loading over 4 hours (omit if quinine in last 24h), then 10 mg/kg 8-hourly. Give in 5% dextrose — severe hypoglycaemia risk with quinine.'],
    ['Adjuncts','10% dextrose if BG <2.2 mmol/L. Paracetamol for fever. IV fluids cautiously — pulmonary oedema risk in severe malaria. Do NOT give steroids — harmful (worsens outcomes).'],
    ['Blood transfusion','If Hb <7 g/dL with respiratory distress or haemodynamic compromise — transfuse packed cells. Do not wait for Hb <5 in an unstable patient.'],
    ['Antibiotics','Add Ceftriaxone 2g IV OD if concomitant bacterial sepsis cannot be excluded — co-infection is common in Nigeria.'],
    ['Monitoring','Blood glucose 4-hourly (hypoglycaemia commonest complication), urine output (AKI), respiratory rate (pulmonary oedema), GCS (cerebral malaria), parasite count daily.'],
    ['Switch to oral','When patient tolerates oral — complete with AL (Coartem) full 3-day course (6 doses).'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;color:#dc2626;font-size:13px">'+r[0]+'</td><td style="font-size:13px">'+r[1]+'</td></tr>';}).join('')+'</tbody></table>'));

  // Neonatal Sepsis
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#8b5cf6">👶 Neonatal Sepsis</h3>'));
  el_.appendChild(notebox('📌 <strong>Neonatal sepsis is a major cause of neonatal mortality in Nigeria.</strong> Presents subtly — temperature instability (hypothermia more common than fever in neonates), poor feeding, lethargy, respiratory distress, abdominal distension, seizures. A high index of suspicion is essential. <strong>Do not wait for definitive signs — treat empirically early.</strong>','#faf5ff','#e9d5ff'));
  el_.appendChild(card('Neonatal Sepsis — Classification & Empiric Treatment','#8b5cf6','<table><thead><tr style="background:#faf5ff"><th>Type</th><th>Timing</th><th>Common Organisms</th><th>Empiric Treatment</th></tr></thead><tbody>'+[
    ['Early-Onset Neonatal Sepsis (EONS)','0–72 hours of life','Group B Streptococcus (GBS), E. coli, Listeria, Klebsiella (Nigeria)','Ampicillin 50mg/kg 12-hourly IV + Gentamicin 5mg/kg OD IV (age-adjusted dosing). Cover for 7–10 days if culture positive.'],
    ['Late-Onset Neonatal Sepsis (LONS)','>72 hours to 28 days','Staphylococcus aureus, Klebsiella, E. coli, coagulase-negative Staph (NICU)','Cloxacillin 50mg/kg 6-hourly IV + Gentamicin 5mg/kg OD IV. If MRSA suspected: Vancomycin 15mg/kg 12-hourly (level monitoring).'],
    ['Meningitis component','Any age','GBS, E. coli, Listeria, Klebsiella','Add Cefotaxime 50mg/kg 8-hourly IV (penetrates CNS better than Gentamicin). LP if stable — do not delay antibiotics.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#8b5cf6;font-size:12px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table>'));
  el_.appendChild(card('Neonatal Sepsis — Recognition & Workup','#8b5cf6','<div style="display:grid;gap:8px">'+
    '<div style="padding:8px;background:#faf5ff;border-radius:8px"><strong style="color:#8b5cf6">Clinical Signs (any = investigate):</strong><br><span style="font-size:12px">Temperature instability (T <36.5°C or >38°C) · Poor feeding / reduced sucking · Lethargy / hypotonia · Respiratory distress (tachypnoea RR>60, grunting, retractions) · Apnoea · Jaundice in first 24h · Abdominal distension · Bulging fontanelle · Seizures · Sclerema (skin hardening — very late sign)</span></div>'+
    '<div style="padding:8px;background:#f0fdf4;border-radius:8px"><strong style="color:#16a34a">Investigations:</strong><br><span style="font-size:12px">Blood culture (before antibiotics — most important) · FBC (WBC <5 or >30 × 10⁹/L, thrombocytopaenia) · CRP (>10 mg/L) · Blood glucose (hypoglycaemia common) · LP if stable and meningitis suspected · Urine MC&S · CXR if respiratory signs · Blood gas if available (metabolic acidosis = poor prognosis)</span></div>'+
    '<div style="padding:8px;background:#fef2f2;border-radius:8px"><strong style="color:#dc2626">Risk Factors for EONS:</strong><br><span style="font-size:12px">Prolonged rupture of membranes (>18h) · Maternal fever in labour · Prematurity · Low birth weight · Meconium-stained liquor · Maternal GBS colonisation · Difficult/prolonged labour</span></div>'+
  '</div>'));
}

