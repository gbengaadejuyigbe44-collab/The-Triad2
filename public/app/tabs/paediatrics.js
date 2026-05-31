function tabPaedDrugs(el_) {
  el_.appendChild(secTitle('\u2696\ufe0f','Paediatric Drug Doses','Weight-based dosing for 14 essential drugs \u2014 always confirm with BNF for Children & local formulary','#06b6d4'));
  el_.appendChild(notebox('\ud83d\udccc <strong>Source:</strong> BNF for Children (BNFC) 2023\u20132024 \u00b7 WHO Essential Medicines for Children \u00b7 Paediatric Formulary Committee. Always verify weight, age, and renal/hepatic function before prescribing. <strong>Doses may differ by indication \u2014 always check the full BNF-C entry.</strong>','#f0f9ff','#bae6fd'));

  // Weight calculator
  var wCard = card('Quick Weight Estimator (Emergency)','#06b6d4','');
  var wb = wCard.querySelector('.card-body');
  wb.innerHTML = '<div class="g2"><div><label class="lbl">Age (years)</label><input id="paed-age" type="text" inputmode="decimal" class="inp" placeholder="e.g. 3" oninput="calcPaedWeight()"></div><div><label class="lbl">Estimated Weight (APLS Formula)</label><div id="paed-wt-result" style="padding:10px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;font-size:14px;margin-top:4px;font-weight:700;color:#0891b2">Enter age above</div></div></div><p style="font-size:11px;color:#64748b;margin-top:8px">APLS formula: 1\u20134 years = (2 \u00d7 age) + 8 kg \u00b7 5\u201312 years = 3 \u00d7 age kg \u00b7 Use actual weight when available \u2014 formula is for emergency estimation only. Source: APLS UK 6th edition 2016.</p>';
  el_.appendChild(wCard);
  window.calcPaedWeight = function(){
    var a=parseFloat(document.getElementById('paed-age').value), el=document.getElementById('paed-wt-result');
    if(!el||isNaN(a)) return;
    var wt = a>=1&&a<=4? (2*a+8) : a>=5&&a<=12? (3*a) : a>12? (3*a) : '\u2014';
    el.innerHTML = typeof wt==='number'? '\u2248 <strong>'+wt+' kg</strong> (estimated \u2014 use actual weight if available)' : 'Use actual weight (outside standard formula range)';
  };

  // Drug table
  var drugs = [
    {n:'Paracetamol (Acetaminophen)',dose:'15 mg/kg/dose every 4\u20136 hours PO/PR (max 4 doses in 24h)',max:'75 mg/kg/day or 4g/day (whichever less)',note:'Safe in infants >2 months. IV dose: 15 mg/kg TDS (<10kg: 7.5mg/kg). Avoid in hepatic failure.',ref:'BNFC 2024'},
    {n:'Ibuprofen (NSAID)',dose:'5\u201310 mg/kg/dose every 6\u20138 hours PO',max:'30 mg/kg/day (max 1.2g/day)',note:'\u22653 months, \u22655kg only. Avoid in dehydration, AKI, asthma. Give with food.',ref:'BNFC 2024'},
    {n:'Amoxicillin',dose:'25 mg/kg/dose BD\u2013TDS PO (community infections); up to 50mg/kg TDS for severe infections',max:'3g/day (oral)',note:'First-line for AOM, CAP mild, UTI. IV: 25\u201350 mg/kg TDS. Reduce in renal impairment.',ref:'BNFC 2024 \u00b7 NICE NG84'},
    {n:'Co-amoxiclav (Augmentin)',dose:'12.5/2.5 \u2013 25/3.1 mg/kg/dose (amoxicillin component) BD\u2013TDS',max:'As per BNF-C by weight band',note:'Broader spectrum. Avoid if hepatic impairment or previous Co-amoxiclav jaundice.',ref:'BNFC 2024'},
    {n:'Ceftriaxone',dose:'50\u2013100 mg/kg/day OD IV/IM (meningitis: 100mg/kg/day)',max:'4g/day',note:'Do not give with calcium-containing solutions (precipitation). Not for neonates (<28 days).',ref:'BNFC 2024 \u00b7 WHO EMLc'},
    {n:'Gentamicin (Once-Daily)',dose:'7 mg/kg OD IV (neonates: 4\u20135 mg/kg every 24\u201336h per level)',max:'Titrated to levels',note:'Monitor drug levels (trough <1 mg/L before next dose). Nephrotoxic + ototoxic. Reduce dose in AKI.',ref:'BNFC 2024'},
    {n:'Metronidazole',dose:'7.5 mg/kg TDS IV/PO (anaerobic infections); 500mg TDS adults',max:'40 mg/kg/day',note:'IV or rectal in perioperative/vomiting. Avoid alcohol-containing formulations. Reduce in hepatic failure.',ref:'BNFC 2024'},
    {n:'Salbutamol (Acute Asthma)',dose:'2.5mg (<25kg) or 5mg (\u226525kg) nebulised every 20\u201330 minutes acutely; MDI: 4\u201310 puffs via spacer',max:'Continuous neb in severe attack under supervision',note:'Add Ipratropium to first 3 nebs in severe attack. IV: 15 mcg/kg over 10 min loading dose.',ref:'BNFC 2024 \u00b7 BTS/SIGN Asthma 2023'},
    {n:'Prednisolone (Asthma / Croup)',dose:'Asthma: 1\u20132 mg/kg OD PO \u00d7 3\u20135 days. Croup: Dexamethasone 0.15mg/kg single dose PO (preferred).',max:'Prednisolone 40mg/day',note:'Dexamethasone preferred in croup \u2014 single dose effective. Prednisolone in acute asthma flare.',ref:'BNFC 2024 \u00b7 NICE NG80'},
    {n:'Morphine',dose:'0.1 mg/kg IV/SC 4-hourly PRN (titrate to pain); oral: 0.2\u20130.5 mg/kg 4-hourly',max:'Initial bolus 0.1\u20130.2 mg/kg (max 15mg)',note:'Reduce by 50% in renal/hepatic failure. Monitor respiratory rate. Have Naloxone 10 mcg/kg IV ready.',ref:'BNFC 2024'},
    {n:'Diazepam (Seizures / Status)',dose:'IV: 0.1\u20130.3 mg/kg slow IV (max 10mg). PR: 0.5 mg/kg rectal (if no IV access).',max:'10mg per dose',note:'For status epilepticus. Call for senior help. Have resuscitation equipment ready. Repeat once if no response.',ref:'BNFC 2024 \u00b7 RCPCH Status Epilepticus Guideline'},
    {n:'Phenobarbital (Status Epilepticus 2nd line)',dose:'20 mg/kg IV loading dose over 30 minutes',max:'20 mg/kg (loading); 3\u20135 mg/kg/day maintenance',note:'Second-line if benzodiazepines fail. Causes respiratory depression \u2014 anaesthetic standby for higher doses.',ref:'BNFC 2024 \u00b7 NICE'},
    {n:'Dexamethasone (Croup / Anti-inflammatory)',dose:'Croup: 0.15 mg/kg PO/IM (single dose, often repeated at 12\u201324h if no response). Cerebral oedema: 0.25 mg/kg QDS.',max:'0.15mg/kg (croup \u2014 usual max 10mg)',note:'IV route unnecessary for mild-moderate croup. Oral is preferred.',ref:'BNFC 2024 \u00b7 Cochrane Review'},
    {n:'Adrenaline (Anaphylaxis)',dose:'IM: 0.01 mg/kg (0.01 ml/kg of 1:1000) IM lateral thigh. Max 0.5mg (adult dose). Repeat every 5\u201310 min PRN.',max:'0.5mg per dose (as per RCUK child anaphylaxis guideline)',note:'Use lateral thigh (vastus lateralis). Auto-injectors: Jext/EpiPen Jr 150mcg (<25kg); EpiPen 300mcg (\u226525kg).',ref:'BNFC 2024 \u00b7 RCUK Anaphylaxis Algorithm 2021'},
  ];
  el_.appendChild(card('14 Essential Paediatric Drug Doses','#06b6d4','<div class="tbl-wrap"><table><thead><tr style="background:#ecfeff"><th>Drug</th><th>Dose</th><th>Max</th><th>Key Notes & Reference</th></tr></thead><tbody>'+drugs.map(function(d){return '<tr class="tbl-row"><td style="font-weight:700;color:#0891b2">'+d.n+'</td><td style="font-size:12px">'+d.dose+'</td><td style="font-size:12px;color:#dc2626;font-weight:600">'+d.max+'</td><td style="font-size:11px;color:#475569">'+d.note+' <em>Ref: '+d.ref+'</em></td></tr>';}).join('')+'</tbody></table></div>'));
}

function tabPaedNormals(el_) {
  el_.appendChild(secTitle('\ud83d\udcc8','Normal Paediatric Values','Age-specific vital signs and haemodynamic norms','#06b6d4'));
  el_.appendChild(card('Normal Vital Signs by Age','#06b6d4','<div class="tbl-wrap"><table><thead><tr style="background:#ecfeff"><th>Age Group</th><th>HR (bpm)</th><th>RR (breaths/min)</th><th>SBP (mmHg)</th><th>DBP (mmHg)</th></tr></thead><tbody>'
    +[['Neonate (0\u20131 month)','100\u2013180','30\u201360','65\u201385','45\u201355'],
      ['Infant (1\u201312 months)','100\u2013160','25\u201340','70\u2013100','50\u201365'],
      ['Toddler (1\u20133 years)','90\u2013150','20\u201330','86\u2013106','42\u201363'],
      ['Preschool (3\u20135 years)','80\u2013140','20\u201325','89\u2013112','46\u201372'],
      ['School age (6\u201312 years)','70\u2013120','15\u201320','97\u2013120','57\u201380'],
      ['Adolescent (12\u201318 years)','60\u2013100','12\u201318','110\u2013131','64\u201383'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;font-size:12px">'+r[0]+'</td><td style="color:#0891b2;font-weight:700">'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td>'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'
    +'<p style="font-size:12px;color:#64748b;margin-top:8px">Note: Wide variation is normal. Assess in clinical context. Ref: APLS UK 6th Ed 2016; NICE Feverish Illness NG143.</p>'));
  el_.appendChild(card('Paediatric Hypertension \u2014 AAP 2017 Staging','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Category</th><th>Definition</th><th>Action</th></tr></thead><tbody>'
    +[['Normal','<90th percentile','Routine monitoring'],
      ['Elevated','90th\u2013<95th percentile or >120/80 in adolescents','Lifestyle, recheck in 6 months'],
      ['Stage 1 HTN','95th\u2013<95th+12 mmHg or 130/80\u2013139/89 in adolescents','Lifestyle; recheck 1\u20132 weeks; treat if symptomatic'],
      ['Stage 2 HTN','\u226595th percentile +12 mmHg or \u2265140/90 in adolescents','Prompt evaluation; start treatment; cardiology referral'],
      ['Hypertensive Crisis','Severe HTN with end-organ damage','Emergency \u2014 IV antihypertensives; ICU'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;font-size:12px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px;color:#dc2626">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'
    +'<p style="font-size:12px;color:#64748b;margin-top:8px">Ref: Flynn JT et al. Pediatrics 2017;140(3):e20171904 (AAP Clinical Practice Guideline).</p>'));
  el_.appendChild(card('Normal Blood Glucose Ranges (Children)','#16a34a','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Age / State</th><th>mg/dL</th><th>mmol/L</th></tr></thead><tbody>'
    +[['Neonate (term, day 1\u20132)','35\u201390','1.9\u20135.0'],
      ['Neonate (term, >48h)','45\u2013100','2.5\u20135.6'],
      ['Infant / Toddler (fasting)','60\u2013100','3.3\u20135.6'],
      ['School age / Adolescent (fasting)','70\u2013100','3.9\u20135.6'],
      ['All ages \u2014 hypoglycaemia threshold','<54','<3.0'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;font-size:12px">'+r[0]+'</td><td style="color:#16a34a;font-weight:700">'+r[1]+'</td><td>'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));
}

function tabPaedDKA(el_) {
  el_.appendChild(secTitle('\ud83d\udea8','Paediatric DKA Protocol','BSPED 2020 \u2014 evidence-based management of DKA in children and young people','#06b6d4'));
  el_.appendChild(notebox('\ud83d\udccc <strong>Source:</strong> BSPED Paediatric DKA Guideline 2020 (Dunger DB, Edge JA et al.). Available at: bsped.org.uk/clinical-resources/guidelines/ \u00b7 ISPAD Clinical Practice Consensus Guidelines 2022.','#fef2f2','#fecaca'));
  el_.appendChild(notebox('\ud83e\udde0 <strong>Cerebral oedema</strong> is the most feared complication of paediatric DKA. Risk is highest in younger children, severe acidosis, and with rapid fluid administration. <strong>BSPED 2020 removes the initial 10ml/kg bolus for most children</strong> \u2014 use conservative fluid replacement unless in shock.','#fef2f2','#fecaca'));

  var steps=[
    {n:'1',t:'Diagnosis',d:'Hyperglycaemia >11 mmol/L (200 mg/dL) + Venous pH <7.3 OR HCO\u2083 <15 mmol/L + Ketonaemia (>3 mmol/L) or Ketonuria (2+ or more). Severity: Mild pH 7.2\u20137.29 \u00b7 Moderate pH 7.1\u20137.19 \u00b7 Severe pH <7.1 or HCO\u2083 <5.',c:'#0891b2',bg:'#f0f9ff'},
    {n:'2',t:'Initial Assessment',d:'Full vital signs + capillary glucose + blood ketones (if available). If shocked (prolonged CRT >3 sec, tachycardia, poor perfusion): 10ml/kg 0.9% NaCl bolus over 10\u201315 min. Repeat up to 20ml/kg total if needed. If NOT shocked: start rehydration fluid immediately (no bolus needed per BSPED 2020).',c:'#dc2626',bg:'#fef2f2'},
    {n:'3',t:'Fluid Replacement \u2014 Conservative Approach',d:'Total fluid deficit assumed 5\u201310% of body weight. Rehydration over 48 hours (NOT 24h) using 0.9% NaCl initially. Volume = Maintenance \u00d7 1.5 (moderate DKA) OR Deficit + Maintenance over 48h. Switch to 0.9% NaCl + 20mmol/L KCl once passing urine. Add glucose (5\u201310%) when BG falls to 14 mmol/L (250 mg/dL).',c:'#7c3aed',bg:'#faf5ff'},
    {n:'4',t:'Potassium Replacement',d:'Add KCl to IV fluids once urine output confirmed. Use 40mmol/L if K\u207a <3.5. Use 20mmol/L if K\u207a 3.5\u20135.5. Do NOT give if K\u207a >5.5 \u2014 reassess every 1\u20132 hours. Monitor on continuous ECG.',c:'#d97706',bg:'#fffbeb'},
    {n:'5',t:'Insulin Infusion',d:'Start insulin 0.05 units/kg/hour IV (NOT 0.1 units/kg/hour as in adults per BSPED 2020 \u2014 lower rate reduces cerebral oedema risk). Begin insulin 1\u20132 hours AFTER fluid replacement has started. Target: BG falls 3\u20135 mmol/L/hour. Do NOT stop basal insulin (Glargine/Detemir) \u2014 continue subcutaneous long-acting throughout.',c:'#ef4444',bg:'#fef2f2'},
    {n:'6',t:'Monitoring & Transition',d:'Hourly: BG, neurological status. Every 1\u20132h: Blood gases + electrolytes. Target pH >7.3, HCO\u2083 >15, BG 6\u201312 mmol/L (ketone-guided). Transition to SC insulin when eating and drinking, pH >7.3, ketones <1 mmol/L. Overlap SC and IV by 30\u201360 min. Identify precipitant \u2014 newly diagnosed T1DM, infection, non-compliance.',c:'#16a34a',bg:'#f0fdf4'},
    {n:'\u26a0\ufe0f',t:'Cerebral Oedema Recognition',d:'Warning signs: Headache, worsening conscious level (GCS dropping), bradycardia, papilloedema, Cushing\'s triad. Act IMMEDIATELY: Mannitol 0.5\u20131 g/kg IV over 10\u201320 min. Restrict IV fluids by 50%. Head elevation 30\u00b0. Call ICU/Paediatric HDU urgently. CT Brain only after stabilisation. Source: BSPED 2020 Cerebral Oedema Section.',c:'#dc2626',bg:'#fef2f2'},
  ];
  steps.forEach(function(s){
    el_.appendChild(fromHTML('<div style="display:flex;gap:14px;margin-bottom:12px;align-items:flex-start"><div style="width:36px;height:36px;background:'+s.c+';border-radius:50%;color:#fff;font-size:s.n==="\u26a0\ufe0f"?13:16+"px";font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+s.n+'</div><div style="flex:1;padding:14px;background:'+s.bg+';border-radius:10px"><div style="font-size:14px;font-weight:800;color:'+s.c+';margin-bottom:6px">'+s.t+'</div><div style="font-size:13px;line-height:1.7">'+s.d+'</div></div></div>'));
  });
}

function tabPaedNeonatal(el_) {
  el_.appendChild(secTitle('\ud83e\udec0','Neonatal Resuscitation','NLS 2021 algorithm \u2014 Newborn Life Support, Resuscitation Council UK','#06b6d4'));
  el_.appendChild(notebox('\ud83d\udccc <strong>Source:</strong> Resuscitation Council UK \u2014 Newborn Life Support (NLS) 4th Edition 2021. Wyllie J et al. 2021 International Consensus on Cardiopulmonary Resuscitation and Emergency Cardiovascular Care Science with Treatment Recommendations. Resuscitation 2021;169:293\u2013326.','#f0f9ff','#bae6fd'));

  var steps2=[
    {n:'1',t:'Dry, Warm, Stimulate',d:'Immediately dry baby with warm towel. Remove wet towel. Stimulate by rubbing the back or flicking the soles of feet. Ensure airway is open \u2014 neutral head position. Assess: Colour + Breathing + Heart Rate (cord palpation, auscultation, or pulse oximetry).',c:'#0891b2'},
    {n:'2',t:'Assess at 60 Seconds ("Golden Minute")',d:'Is the baby: Breathing adequately? HR >100 bpm? Good tone? If YES to all \u2192 routine care. If ANY concern \u2192 proceed with resuscitation. Call for help IMMEDIATELY.',c:'#16a34a'},
    {n:'3',t:'Airway \u2014 Neutral Position',d:'Head in neutral position (not hyperextended). Apply chin lift or jaw thrust if needed. Two-person airway: one to hold mask, one to bag. Use appropriately sized round mask covering nose and mouth. Avoid extension \u2014 neonates have large occiput.',c:'#0891b2'},
    {n:'4',t:'Inflation Breaths (If Not Breathing)',d:'Give 5 inflation breaths: Each breath \u2014 2\u20133 seconds sustained (to open lungs initially). Pressure 25\u201330 cmH\u2082O via T-piece or bag-valve-mask. Look for chest rise. If no chest rise \u2192 reposition airway, repeat. After 5 breaths: reassess HR.',c:'#d97706'},
    {n:'5',t:'Ventilation Breaths (30\u201340/min)',d:'If HR rising: continue rescue breaths at 30\u201340/minute. If HR not improving: check airway, reposition, consider LMA or intubation. SpO\u2082 targets: 2 min = 60%, 3 min = 70%, 4 min = 80%, 5 min = 85%, 10 min = 90%. Start with air (21% O\u2082) in term infants \u2014 add O\u2082 if SpO\u2082 low.',c:'#7c3aed'},
    {n:'6',t:'Chest Compressions (If HR <60)',d:'If HR <60 after 30 seconds of effective ventilation \u2192 start chest compressions. Ratio: 3:1 (3 compressions: 1 breath). Rate: 90 compressions + 30 breaths = 120 events/minute. Technique: Two thumbs on lower third of sternum, fingers around chest. Depth: one-third of chest depth.',c:'#dc2626'},
    {n:'7',t:'Drugs \u2014 If No Response',d:'If HR <60 despite effective ventilation + compressions \u00d7 30 seconds: Adrenaline 10\u201330 mcg/kg IV (via UVC \u2014 umbilical venous catheter) OR IO access. Repeat every 3\u20135 minutes. Sodium Bicarbonate 4.2% \u2014 1\u20132 mmol/kg IV for confirmed metabolic acidosis. Consider: glucose (if hypoglycaemia), volume (if blood loss).',c:'#ea580c'},
  ];
  steps2.forEach(function(s){
    el_.appendChild(fromHTML('<div style="display:flex;gap:14px;margin-bottom:10px;align-items:flex-start"><div style="width:32px;height:32px;background:'+s.c+';border-radius:50%;color:#fff;font-size:14px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+s.n+'</div><div style="flex:1;padding:12px 14px;background:#f0f9ff;border-radius:10px"><div style="font-size:13px;font-weight:800;color:'+s.c+';margin-bottom:4px">'+s.t+'</div><div style="font-size:12px;line-height:1.6">'+s.d+'</div></div></div>'));
  });
}

function tabPaedFluids(el_) {
  el_.appendChild(secTitle('\ud83d\udc8a','Paediatric Fluid Guide','Maintenance fluids, deficit replacement, and fluid bolus guide','#06b6d4'));
  el_.appendChild(notebox('\ud83d\udccc <strong>Source:</strong> NICE NG29 IV Fluids in Children 2015 (updated 2023) \u00b7 NICE CG84 Diarrhoea/Dehydration \u00b7 RCPCH Fluid Guidelines. Note: In DKA, use DKA-specific protocol (see DKA tab) \u2014 do NOT use standard maintenance calculations.','#f0f9ff','#bae6fd'));

  var flCalc = card('Maintenance Fluid Calculator (Holliday-Segar Method)','#06b6d4','');
  var fb = flCalc.querySelector('.card-body');
  fb.innerHTML='<div class="g2" style="margin-bottom:10px"><div><label class="lbl">Weight (kg)</label><input id="fl-wt" type="text" inputmode="decimal" class="inp" placeholder="e.g. 18" oninput="calcMaintenance()"></div><div id="fl-result" style="padding:10px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;font-size:13px;margin-top:20px">Enter weight to calculate</div></div><p style="font-size:12px;color:#64748b">Formula: First 10kg \u2192 100ml/kg/day (4ml/kg/hr) \u00b7 Next 10kg \u2192 50ml/kg/day (2ml/kg/hr) \u00b7 Each kg >20kg \u2192 20ml/kg/day (1ml/kg/hr). Source: Holliday & Segar 1957 \u00b7 NICE NG29.</p>';
  el_.appendChild(flCalc);
  window.calcMaintenance = function(){
    var wt=parseFloat(document.getElementById('fl-wt').value), el=document.getElementById('fl-result');
    if(!el||isNaN(wt)||wt<=0){if(el)el.innerHTML='Enter a valid weight.';return;}
    var ml_day = wt<=10? wt*100 : wt<=20? 1000+(wt-10)*50 : 1500+(wt-20)*20;
    var ml_hr = (ml_day/24).toFixed(1);
    el.innerHTML='<strong>Daily requirement:</strong> '+Math.round(ml_day)+' ml/day<br><strong>Hourly rate:</strong> <span style="font-size:16px;font-weight:900;color:#0891b2">'+ml_hr+' ml/hr</span>';
  };

  el_.appendChild(card('Fluid Choice (NICE NG29)','#06b6d4','<div class="tbl-wrap"><table><thead><tr style="background:#ecfeff"><th>Situation</th><th>Fluid of Choice</th><th>Rate</th></tr></thead><tbody>'+[
    ['Maintenance (routine)','0.9% NaCl + 5% Dextrose + 20mmol/L KCl (after confirming normovolaemia)','As per Holliday-Segar'],
    ['Resuscitation (shock)','0.9% NaCl (isotonic crystalloid) \u2014 Ringer\'s Lactate acceptable','10\u201320 ml/kg bolus over 15\u201360 min; reassess after each'],
    ['Severe dehydration (non-DKA)','0.9% NaCl \u2014 calculate deficit and replace over 24\u201348h','Deficit (ml) = % dehydration \u00d7 weight (kg) \u00d7 10'],
    ['Mild\u2013Moderate dehydration','Oral Rehydration Solution (ORS) \u2014 preferred to IV if tolerated','5\u201310 ml/kg/hr PO for 4 hours then reassess'],
    ['Post-surgical / Post-operative','0.9% NaCl + 5% Dextrose; monitor Na\u207a closely \u2014 risk of hyponatraemia','As prescribed \u2014 usually 80% maintenance initially'],
    ['Neonatal maintenance','10% Dextrose (preterm); adjust per renal function; add electrolytes day 2\u20133','Per neonatal unit protocol \u2014 individualised'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#0891b2;font-weight:600">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));
}

function tabPaedAssessment(el_) {
  el_.appendChild(secTitle('\ud83d\udccb','Paediatric Assessment','ABCDE sick child approach and PEWS red flags','#06b6d4'));
  el_.appendChild(card('ABCDE Assessment \u2014 Sick Child','#06b6d4','<div style="display:grid;gap:8px">'
    +[['A \u2014 Airway','Stridor? Drooling? Unable to speak/cry? Positioning? Foreign body?'],
      ['B \u2014 Breathing','RR, SpO\u2082, work of breathing (nasal flaring, intercostal recession, tracheal tug, grunting), air entry, wheeze/crackles'],
      ['C \u2014 Circulation','HR, BP, capillary refill time (normal \u22642s; prolonged >3s), skin colour, peripheral pulses, urine output'],
      ['D \u2014 Disability','AVPU (Alert, Voice, Pain, Unresponsive) or GCS, pupils, BM (blood glucose), posture (stiff, floppy)'],
      ['E \u2014 Exposure','Rash (petechiae = meningococcal until proven otherwise), temperature, hydration, abdomen, fontanelle in infants'],
    ].map(function(r){return '<div style="padding:10px 14px;background:#f0fdff;border-left:4px solid #06b6d4;border-radius:8px"><div style="font-weight:700;font-size:13px;color:#0891b2">'+r[0]+'</div><div style="font-size:13px;color:#374151;margin-top:4px">'+r[1]+'</div></div>';}).join('')+'</div>'));
  el_.appendChild(card('PEWS \u2014 Paediatric Early Warning Signs','#dc2626','<div style="font-size:13px;color:#374151;margin-bottom:12px">Escalate immediately if ANY of the following:</div><div style="display:grid;gap:6px">'
    +[['\ud83d\udd34 Airway','Stridor, drooling, unable to maintain airway'],
      ['\ud83d\udd34 Breathing','SpO\u2082 <92% on air, severe recession, grunting, RR <10 or >60'],
      ['\ud83d\udd34 Circulation','CRT >3s, HR <60 or HR >200, SBP <70 mmHg, mottling, cold peripheries'],
      ['\ud83d\udd34 Neurology','GCS <12, AVPU = P or U, seizure, fixed/unequal pupils'],
      ['\ud83d\udd34 Rash','Petechiae or purpura \u2014 non-blanching \u2192 EMERGENCY (meningococcal sepsis)'],
      ['\ud83d\udd34 Parents / Nursing concern','Clinical intuition is valid \u2014 escalate if concerned, even if scores normal'],
    ].map(function(r){return '<div style="padding:8px 12px;background:#fef2f2;border-radius:8px;display:flex;gap:10px"><strong style="min-width:100px;color:#dc2626">'+r[0]+'</strong><span>'+r[1]+'</span></div>';}).join('')+'</div>'
    +'<p style="font-size:12px;color:#64748b;margin-top:8px">PEWS triggers vary by institution \u2014 use your hospital\'s validated PEWS score. Ref: Roland D et al. Arch Dis Child 2016;101:869\u2013877.</p>'));
  el_.appendChild(card('Fever Assessment \u2014 NICE Traffic Light (NG143)','#f97316','<div class="tbl-wrap"><table><thead><tr style="background:#fff7ed"><th>Feature</th><th>\ud83d\udfe2 Low Risk</th><th>\ud83d\udfe1 Intermediate Risk</th><th>\ud83d\udd34 High Risk</th></tr></thead><tbody>'
    +[['Colour','Normal','Pallor reported by parent','Pale/mottled/ashen/blue'],
      ['Activity','Normal activity','Not responding normally; decreased activity','No response; cannot be roused'],
      ['Breathing','Normal','Nasal flaring; tachypnoea','Grunting; RR >60; moderate-severe recession'],
      ['Hydration','Normal skin/eyes; moist mucous membranes','Dry mucous membranes; CRT \u22653s','Reduced skin turgor'],
      ['Other','None of amber/red','Fever \u22655 days; swollen joint; new lump >2cm','Non-blanching rash; bulging fontanelle; neck stiffness'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;font-size:12px">'+r[0]+'</td><td style="color:#16a34a;font-size:12px">'+r[1]+'</td><td style="color:#d97706;font-size:12px">'+r[2]+'</td><td style="color:#dc2626;font-size:12px;font-weight:600">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
    +'<p style="font-size:12px;color:#64748b;margin-top:8px">Ref: NICE NG143 Fever in Under 5s 2021.</p>'));
}

// ── PAEDIATRICS: MALARIA & FEVER ─────────────────────────────
function tabPaedMalaria(el_) {
  el_.appendChild(secTitle('🦟','Malaria & Fever','Severe malaria criteria, IV Artesunate protocol, AL dosing, and fever workup','#06b6d4'));
  el_.appendChild(notebox('📌 <strong>Sources:</strong> WHO Guidelines for the Treatment of Malaria 3rd Edition 2015 (updated 2022) · Federal Ministry of Health Nigeria Malaria Treatment Guidelines 2015 · BNF for Children 2023–2024. <strong>Artesunate IV is first-line for severe malaria in all ages.</strong> Quinine is second-line only when Artesunate is unavailable.','#f0f9ff','#bae6fd'));

  el_.appendChild(card('🚨 WHO Severe Malaria Criteria — Any ONE = Severe','#dc2626',
    '<div style="display:grid;gap:6px">' +
    [
      ['Cerebral malaria','Unarousable coma (GCS <11 or BCS <3) not attributable to other cause'],
      ['Severe anaemia','Hb <7 g/dL (or <5 g/dL in children) with parasitaemia'],
      ['Respiratory distress','Deep breathing (acidotic breathing), SpO₂ <92%'],
      ['Hypoglycaemia','Blood glucose <2.2 mmol/L (<40 mg/dL) — commonest in children'],
      ['Circulatory collapse','Shock: SBP <70 mmHg (child), cold extremities, capillary refill >3s'],
      ['Renal impairment','Creatinine >265 μmol/L or urine output <0.5 ml/kg/hr'],
      ['Pulmonary oedema','SpO₂ <92% with bilateral crackles — high mortality'],
      ['Abnormal bleeding','Spontaneous bleeding from gums, nose, venepuncture sites — DIC'],
      ['Hyperparasitaemia','Parasite count >5% red blood cells on thick film'],
      ['Hyperpyrexia','Temperature >40°C with cerebral manifestations'],
      ['Jaundice','Bilirubin >50 μmol/L with any organ dysfunction'],
      ['Convulsions','>2 convulsions in 24 hours despite antipyretics'],
    ].map(function(r){return '<div style="display:grid;grid-template-columns:180px 1fr;gap:8px;padding:8px;border-bottom:1px solid #fecaca"><span style="font-weight:700;color:#dc2626;font-size:13px">'+r[0]+'</span><span style="font-size:13px">'+r[1]+'</span></div>';}).join('') +
    '</div>'
  ));

  el_.appendChild(card('💉 IV Artesunate Protocol — Severe Malaria (All Ages)','#0ea5e9',
    notebox('⚡ <strong>Artesunate IV is first-line for severe malaria.</strong> Superior to quinine in all age groups (AQUAMAT trial, SEAQUAMAT trial). Start immediately — do not wait for confirmatory RDT/microscopy if clinical suspicion is high.','#f0f9ff','#bae6fd').outerHTML +
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Parameter</th><th>Detail</th></tr></thead><tbody>' +
    [
      ['Dose','2.4 mg/kg IV at 0, 12, 24 hours — then once daily until oral tolerated (minimum 3 days)'],
      ['Preparation','Dissolve powder in 1 ml sodium bicarbonate (included), then dilute in 5 ml normal saline or 5% dextrose'],
      ['Infusion rate','Give over 1–2 hours IV. Can give IM if IV not available (same dose, anterolateral thigh)'],
      ['Weight <20 kg','Use 3 mg/kg per dose (children <20 kg — AQUAMAT sub-analysis)'],
      ['Monitoring','Blood glucose every 4 hours (hypoglycaemia common), parasitaemia daily, GCS/neurology'],
      ['Switch to oral','Once tolerating oral — complete with AL (Coartem) × 3 days full course'],
      ['Adjunct','Paracetamol for fever. IV dextrose 10% if hypoglycaemic. Do NOT give steroids (harmful in cerebral malaria)'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;color:#0ea5e9;font-size:13px">'+r[0]+'</td><td style="font-size:13px">'+r[1]+'</td></tr>';}).join('') +
    '</tbody></table></div>'
  ));

  el_.appendChild(card('💊 Artemether-Lumefantrine (Coartem) — Uncomplicated Malaria Dosing','#16a34a',
    notebox('📌 First-line for uncomplicated P. falciparum malaria. Give with food or fatty drink (increases absorption). Complete all 6 doses over 3 days.','#f0fdf4','#bbf7d0').outerHTML +
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Weight</th><th>Tablets per dose</th><th>Schedule</th></tr></thead><tbody>' +
    [
      ['5–14 kg','1 tablet','0, 8, 24, 36, 48, 60 hours (6 doses total)'],
      ['15–24 kg','2 tablets','0, 8, 24, 36, 48, 60 hours (6 doses total)'],
      ['25–34 kg','3 tablets','0, 8, 24, 36, 48, 60 hours (6 doses total)'],
      ['≥35 kg (adult)','4 tablets','0, 8, 24, 36, 48, 60 hours (6 doses total)'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a">'+r[0]+'</td><td style="font-weight:600">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('') +
    '</tbody></table></div><p style="font-size:11px;color:#64748b;margin-top:8px">Each tablet = Artemether 20mg + Lumefantrine 120mg. Not for infants <5 kg or <1 month.</p>'
  ));

  el_.appendChild(card('⚠️ Quinine — Second-Line (When Artesunate Unavailable)','#f97316',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fff7ed"><th>Parameter</th><th>Detail</th></tr></thead><tbody>' +
    [
      ['Loading dose','20 mg/kg IV (quinine dihydrochloride) in 5% dextrose over 4 hours. Only if no quinine in last 24hr.'],
      ['Maintenance','10 mg/kg IV every 8 hours over 4 hours until oral tolerated'],
      ['Oral switch','Quinine sulfate 10 mg/kg TDS × 7 days + Clindamycin 10 mg/kg BD × 7 days'],
      ['Max dose','1800 mg/day (adult). Do not exceed.'],
      ['Monitoring','Blood glucose every 2–4 hours (severe hypoglycaemia risk), ECG if available (QTc prolongation), quinine levels if prolonged use'],
      ['Caution','Cinchonism: tinnitus, hearing loss, visual disturbance, nausea. Reduce dose if severe.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;color:#f97316;font-size:13px">'+r[0]+'</td><td style="font-size:13px">'+r[1]+'</td></tr>';}).join('') +
    '</tbody></table></div>'
  ));

  el_.appendChild(card('🌡️ Fever Without Focus — Workup Algorithm','#8b5cf6',
    '<div style="display:grid;gap:10px">' +
    [
      {age:'<28 days (Neonate)',risk:'HIGH RISK — Full septic screen mandatory',workup:'FBC, blood culture, urine MC&S (catheter), LP (CSF culture, glucose, protein, cells), CXR. Empiric antibiotics immediately (see Neonatal Sepsis). Do NOT wait for results.'},
      {age:'1–3 months',risk:'HIGH RISK if unwell or temp >38°C',workup:'FBC, blood culture, CRP, urine MC&S. LP if unwell or WBC <5 or >15. Empiric antibiotics if unwell. Malaria RDT/film in endemic area.'},
      {age:'3–36 months',risk:'MODERATE RISK — source-directed workup',workup:'Malaria RDT/film first in Nigeria. FBC, CRP if temp >39°C. Blood culture if CRP >20 or WBC >15 or unwell. Urine dip/MC&S. CXR if respiratory signs.'},
      {age:'>3 years',risk:'Lower risk if immunised and well',workup:'Malaria RDT/film. Examine thoroughly for source. FBC/CRP if no focus found and temp >38.5°C. Blood culture if systemically unwell.'},
    ].map(function(r){return '<div style="padding:10px;border-left:4px solid #8b5cf6;background:#faf5ff;border-radius:0 8px 8px 0;margin-bottom:4px"><div style="font-weight:700;color:#8b5cf6;font-size:13px">'+r.age+'</div><div style="font-size:12px;color:#dc2626;font-weight:600;margin:2px 0">'+r.risk+'</div><div style="font-size:12px;color:#374151">'+r.workup+'</div></div>';}).join('') +
    '</div>'
  ));

  el_.appendChild(card('🦠 Typhoid Fever in Children','#dc2626',
    notebox('📌 <strong>Enteric fever (Salmonella typhi/paratyphi)</strong> — endemic in Nigeria. Suspect in child with fever >5 days, relative bradycardia, abdominal pain, rose spots, constipation or diarrhoea. Confirm with blood culture (gold standard) or Widal test (limited sensitivity).','#fef2f2','#fecaca').outerHTML +
    '<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Severity</th><th>Treatment</th><th>Duration</th></tr></thead><tbody>' +
    [
      ['Uncomplicated','Azithromycin 20 mg/kg OD PO (max 1g) — first choice for uncomplicated typhoid in children. Reduces carrier state.','7 days'],
      ['Moderate–Severe','Ceftriaxone 75–100 mg/kg/day IV OD (max 4g) — use for severe or complicated typhoid','10–14 days'],
      ['Complicated (perforation/meningitis)','Ceftriaxone 100 mg/kg/day IV + surgical consult if perforation suspected. Add Metronidazole 7.5 mg/kg TDS if peritonitis.','14–21 days'],
      ['MDR Typhoid','Azithromycin or Ceftriaxone. Fluoroquinolones (Ciprofloxacin) now have high resistance in Nigeria — avoid empirically.','Per sensitivity'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;color:#dc2626;font-size:12px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px;font-weight:600">'+r[2]+'</td></tr>';}).join('') +
    '</tbody></table></div><p style="font-size:11px;color:#64748b;margin-top:8px">⚠️ Complications: intestinal perforation (surgical emergency), typhoid encephalopathy, haemorrhage, hepatitis. Dexamethasone 3 mg/kg loading then 1 mg/kg 6-hourly × 48hr for severe encephalopathy (Hoffman 1984).</p>'
  ));
}

// ── PAEDIATRICS: CONVULSIONS ──────────────────────────────────
function tabPaedConvulsions(el_) {
  el_.appendChild(secTitle('⚡','Convulsions','Febrile convulsions, status epilepticus protocol, and weight-based drug dosing','#f59e0b'));
  el_.appendChild(notebox('📌 <strong>Sources:</strong> NICE CG137 Epilepsies in Children 2012 (updated 2022) · APLS (Advanced Paediatric Life Support) 7th Edition · WHO Pocket Book of Hospital Care for Children 2013. Status epilepticus = seizure lasting >5 minutes OR two seizures without full recovery between them.','#fffbeb','#fde68a'));

  el_.appendChild(card('🚨 Status Epilepticus — Step-by-Step Protocol','#dc2626',
    notebox('⏱️ <strong>Time is critical.</strong> Every minute of seizure activity increases risk of brain injury and makes the seizure harder to terminate. Call for senior help immediately. Do not leave the child.','#fef2f2','#fecaca').outerHTML +
    '<div style="display:grid;gap:8px">' +
    [
      {step:'1',time:'0–5 min',title:'Immediate — A, B, C',action:'Position: recovery position if breathing. Airway: jaw thrust, suction, airway adjunct if tolerated. O₂: 15L via non-rebreathe mask. IV/IO access. Blood glucose STAT — if <3 mmol/L give 2 ml/kg 10% dextrose IV.'},
      {step:'2',time:'5 min',title:'First-Line Benzodiazepine',action:'<strong>IV access available:</strong> Lorazepam 0.1 mg/kg IV (max 4mg) over 30 seconds. OR<br><strong>No IV access:</strong> Midazolam 0.3–0.5 mg/kg buccal (max 10mg). OR Diazepam 0.5 mg/kg PR (max 10mg). <em>Can repeat ONCE after 5 minutes if seizure continues.</em>'},
      {step:'3',time:'15–20 min',title:'Second-Line (if still seizing after 2 benzodiazepine doses)',action:'<strong>Levetiracetam</strong> 40 mg/kg IV over 5 min (max 3g) — preferred second-line.<br>OR <strong>Phenytoin</strong> 20 mg/kg IV over 20 min (max 2g) — monitor ECG, give slowly.<br>OR <strong>Phenobarbitone</strong> 20 mg/kg IV over 20 min (max 1g) — good for neonates.'},
      {step:'4',time:'30–40 min',title:'Refractory Status — Call Anaesthetics NOW',action:'RSI with Thiopentone 4 mg/kg IV or Propofol (if >3 years) + intubation. Continuous EEG monitoring. ICU transfer. Midazolam infusion 0.05–0.4 mg/kg/hr.'},
    ].map(function(r){
      var col = r.step==='4'?'#7c3aed':r.step==='3'?'#dc2626':r.step==='2'?'#f97316':'#16a34a';
      return '<div style="display:grid;grid-template-columns:40px 70px 1fr;gap:8px;padding:10px;border-left:4px solid '+col+';background:#fafafa;border-radius:0 8px 8px 0">'
        +'<div style="width:32px;height:32px;border-radius:50%;background:'+col+';color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px">'+r.step+'</div>'
        +'<div style="font-size:11px;color:'+col+';font-weight:700;padding-top:4px">'+r.time+'</div>'
        +'<div><div style="font-weight:700;font-size:13px;color:#1c1917">'+r.title+'</div><div style="font-size:12px;color:#374151;margin-top:4px">'+r.action+'</div></div>'
        +'</div>';
    }).join('') + '</div>'
  ));

  el_.appendChild(card('💊 Weight-Based Drug Doses — Convulsions','#0ea5e9',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Drug</th><th>Dose</th><th>Route</th><th>Max</th></tr></thead><tbody>' +
    [
      ['Lorazepam','0.1 mg/kg','IV/IO','4 mg'],
      ['Midazolam (buccal)','0.3–0.5 mg/kg','Buccal','10 mg'],
      ['Diazepam','0.5 mg/kg','PR (rectal)','10 mg'],
      ['Diazepam','0.25–0.5 mg/kg','IV (slow)','10 mg'],
      ['Levetiracetam','40 mg/kg','IV over 5 min','3000 mg'],
      ['Phenytoin','20 mg/kg','IV over 20 min (ECG monitor)','2000 mg'],
      ['Phenobarbitone','20 mg/kg','IV over 20 min','1000 mg'],
      ['10% Dextrose (hypoglycaemia)','2 ml/kg','IV bolus','No max'],
      ['Pyridoxine (if <2 yrs, unknown cause)','100 mg','IV','Single dose'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9;font-size:13px">'+r[0]+'</td><td style="font-size:13px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:12px;font-weight:600;color:#dc2626">'+r[3]+'</td></tr>';}).join('') +
    '</tbody></table></div>'
  ));

  el_.appendChild(card('🌡️ Febrile Convulsions — Assessment & Management','#16a34a',
    notebox('📌 <strong>Febrile convulsion</strong> = seizure in a child 6 months–5 years triggered by fever (>38°C), with no CNS infection or metabolic cause. Affects 2–5% of children. Most are benign and self-limiting.','#f0fdf4','#bbf7d0').outerHTML +
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Feature</th><th>Simple FC</th><th>Complex FC — Investigate</th></tr></thead><tbody>' +
    [
      ['Duration','<15 minutes','≥15 minutes'],
      ['Type','Generalised tonic-clonic','Focal onset, or Todd\'s paresis after'],
      ['Recurrence','Single episode in 24h','Recurs within 24 hours'],
      ['Recovery','Full recovery within 1 hour','Prolonged postictal state (>1 hour)'],
      ['Age','6 months–5 years','<6 months or >5 years'],
      ['Neurological exam','Normal','Abnormal — meningism, focal signs'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;font-size:12px">'+r[0]+'</td><td style="font-size:12px;color:#16a34a">'+r[1]+'</td><td style="font-size:12px;color:#dc2626">'+r[2]+'</td></tr>';}).join('') +
    '</tbody></table></div><br>' +
    '<div style="display:grid;gap:6px">' +
    '<div style="padding:8px;background:#f0fdf4;border-radius:8px"><strong style="color:#16a34a">✅ Simple FC — Management:</strong><br><span style="font-size:12px">1. Treat the fever — Paracetamol 15 mg/kg PO/PR. Remove excess clothing. Tepid sponging.<br>2. Investigate the source of fever (malaria RDT, urine dip, CXR if indicated).<br>3. No anti-epileptic drugs for simple FC — they do not prevent recurrence (AAP 2008).<br>4. Educate parents — likely to recur in 30–35% but generally benign.</span></div>' +
    '<div style="padding:8px;background:#fef2f2;border-radius:8px"><strong style="color:#dc2626">⚠️ Complex FC — Do:</strong><br><span style="font-size:12px">LP if <18 months or meningism present (do not delay antibiotics waiting for LP). CT head if focal signs or raised ICP signs. EEG after second complex FC. Neurology referral.</span></div>' +
    '</div>'
  ));

  el_.appendChild(card('📊 Recurrence Risk — Counselling Guide','#8b5cf6',
    '<div style="display:grid;gap:8px">' +
    [
      {label:'Recurrence after first simple FC',val:'30–35%',note:'Most recurrences within 2 years'},
      {label:'Risk if age <18 months at first FC',val:'50%',note:'Higher recurrence in younger children'},
      {label:'Risk if family history of FC',val:'50%',note:'Genetic predisposition'},
      {label:'Risk of epilepsy after simple FC',val:'2–3%',note:'Same as general population — no increased risk'},
      {label:'Risk of epilepsy after complex FC',val:'10–15%',note:'Particularly if multiple complex features'},
      {label:'Risk of death from simple FC',val:'Negligible',note:'Reassure parents — simple FC does not cause brain damage'},
    ].map(function(r){return '<div style="display:grid;grid-template-columns:1fr 80px 1fr;gap:8px;padding:8px;border-bottom:1px solid #ede9fe;align-items:center">'
      +'<span style="font-size:13px;font-weight:600">'+r.label+'</span>'
      +'<span style="font-size:18px;font-weight:800;color:#8b5cf6;text-align:center">'+r.val+'</span>'
      +'<span style="font-size:12px;color:#6b7280">'+r.note+'</span></div>';}).join('') +
    '</div>'
  ));
}

// ── PAEDIATRICS: MALNUTRITION (SAM) ──────────────────────────
function tabPaedMalnutrition(el_) {
  el_.appendChild(secTitle('🍽️','Severe Acute Malnutrition','SAM criteria, WHO 10-step management, F-75/F-100/RUTF, and refeeding syndrome','#f97316'));
  el_.appendChild(notebox('📌 <strong>Sources:</strong> WHO Guidelines for the inpatient treatment of severely malnourished children 2003 (updated 2013) · FMOH Nigeria National Guidelines for the Management of SAM 2014 · IMAM (Integrated Management of Acute Malnutrition) Guidelines. Nigeria has one of the highest SAM burdens globally.','#fff7ed','#fed7aa'));

  el_.appendChild(card('📏 SAM Diagnostic Criteria — Any ONE = SAM','#f97316',
    '<div style="display:grid;gap:8px">' +
    [
      {measure:'MUAC (Mid-Upper Arm Circumference)',criteria:'<11.5 cm in children 6–59 months',action:'Severe wasting — admit for treatment'},
      {measure:'Weight-for-Height Z-score','criteria':'<−3 SD (below −3 Z-score on WHO growth charts)',action:'Severe wasting regardless of MUAC'},
      {measure:'Bilateral pitting oedema',criteria:'Oedema of both feet — grade +, ++, or +++',action:'Kwashiorkor or marasmic-kwashiorkor — admit'},
      {measure:'MUAC 11.5–12.5 cm',criteria:'Moderate acute malnutrition (MAM)',action:'Outpatient treatment — RUTF if programmes available'},
    ].map(function(r){return '<div style="padding:10px;border-left:4px solid #f97316;background:#fff7ed;border-radius:0 8px 8px 0">'
      +'<div style="font-weight:700;color:#f97316;font-size:13px">'+r.measure+'</div>'
      +'<div style="font-size:12px;color:#1c1917;margin:3px 0"><strong>Criteria:</strong> '+r.criteria+'</div>'
      +'<div style="font-size:12px;color:#dc2626"><strong>Action:</strong> '+r.action+'</div></div>';}).join('') +
    '</div>'
  ));

  el_.appendChild(card('🔟 WHO 10-Step SAM Management','#dc2626',
    '<div style="display:grid;gap:6px">' +
    [
      {step:'1',phase:'Stabilisation',title:'Treat/prevent hypoglycaemia','detail':'Check BG on admission. If <3 mmol/L: give 50 ml of 10% glucose or 10% sugar water by mouth/NG. Recheck after 30 min. Give F-75 every 2 hours (day and night) for first 48 hours.'},
      {step:'2',phase:'Stabilisation',title:'Treat/prevent hypothermia','detail':'Keep child warm — cover with blanket, keep in warm room (>25°C). Skin-to-skin with mother. Check temperature 2-hourly. Treat hypoglycaemia if hypothermic (always co-exist).'},
      {step:'3',phase:'Stabilisation',title:'Treat/prevent dehydration','detail':'Do NOT use IV fluids unless shock. Use ReSoMal (Rehydration Solution for Malnutrition) 5 ml/kg every 30 min × 2 hours, then 5–10 ml/kg/hr for 4–10 hours. Standard ORS has too much sodium and too little potassium for SAM.'},
      {step:'4',phase:'Stabilisation',title:'Correct electrolyte imbalance','detail':'All SAM children have excess sodium, severe potassium and magnesium deficiency. Add potassium 4 mmol/kg/day and magnesium 0.6 mmol/kg/day to food. Do NOT give diuretics for oedema — it will worsen electrolyte imbalance.'},
      {step:'5',phase:'Stabilisation',title:'Treat/prevent infection','detail':'All SAM children are immunocompromised. Give empiric antibiotics even without signs of infection: Amoxicillin 25 mg/kg BD × 5 days (if no complications). If complicated: Ampicillin + Gentamicin IV. Add Metronidazole if abdominal signs.'},
      {step:'6',phase:'Stabilisation',title:'Correct micronutrient deficiencies','detail':'Day 1: Vitamin A (if not given in last month) — <6 months: 50,000 IU, 6–12 months: 100,000 IU, >12 months: 200,000 IU PO. Folic acid 5 mg on Day 1, then 1 mg/day. Zinc 2 mg/kg/day × 2 weeks. Multivitamin daily.'},
      {step:'7',phase:'Stabilisation',title:'Start cautious feeding','detail':'F-75 therapeutic milk: 75 kcal/100ml, 0.9g protein/100ml. Give 100 ml/kg/day divided into 8–12 feeds. Never exceed this in stabilisation — risk of refeeding syndrome and heart failure with higher volumes.'},
      {step:'8',phase:'Rehabilitation',title:'Achieve catch-up growth','detail':'Transition to F-100 when: oedema resolving, good appetite, no metabolic complications (usually day 3–7). F-100: 100 kcal/100ml. Increase volume gradually. Target weight gain >10 g/kg/day. Switch to RUTF when possible.'},
      {step:'9',phase:'Rehabilitation',title:'Provide sensory stimulation','detail':'Structured play and stimulation — SAM causes developmental delay. Involve mother/caregiver. Emotional support — SAM children are often listless, miserable. Gentle, loving care accelerates recovery.'},
      {step:'10',phase:'Discharge & Follow-up',title:'Prepare for follow-up','detail':'Discharge when: MUAC ≥12.5 cm or WHZ ≥−2, no oedema for 2 weeks, good appetite, no acute illness. Follow up at 1 week, 2 weeks, 1 month, 2 months. Continue RUTF or enriched food at home.'},
    ].map(function(r){
      var col = r.phase==='Stabilisation'?'#dc2626':r.phase==='Rehabilitation'?'#16a34a':'#0ea5e9';
      return '<div style="display:grid;grid-template-columns:36px 1fr;gap:8px;padding:8px;border-bottom:1px solid #fed7aa">'
        +'<div style="width:28px;height:28px;border-radius:50%;background:'+col+';color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0">'+r.step+'</div>'
        +'<div><div style="font-weight:700;font-size:13px;color:'+col+'">'+r.title+' <span style="font-size:10px;background:'+col+';color:#fff;padding:1px 6px;border-radius:4px;vertical-align:middle">'+r.phase+'</span></div>'
        +'<div style="font-size:12px;color:#374151;margin-top:3px">'+r.detail+'</div></div></div>';
    }).join('') + '</div>'
  ));

  el_.appendChild(card('🥛 Therapeutic Feeds — F-75, F-100, RUTF','#16a34a',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Feed</th><th>When</th><th>Energy</th><th>Volume</th></tr></thead><tbody>' +
    [
      ['F-75','Stabilisation phase (Days 1–7)','75 kcal/100ml, 0.9g protein','100 ml/kg/day — 8–12 feeds. Never more than 130 ml/kg/day.'],
      ['F-100','Rehabilitation (after oedema resolves, appetite returns)','100 kcal/100ml, 2.9g protein','150–220 ml/kg/day — increase gradually over 2–3 days'],
      ['RUTF (Ready-to-Use Therapeutic Food)','Rehabilitation — outpatient or when tolerating solid food','500 kcal/92g sachet','Approx 92g sachet per 5 kg body weight per day'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') +
    '</tbody></table></div>'
  ));

  el_.appendChild(card('⚠️ Refeeding Syndrome — Recognition & Prevention','#8b5cf6',
    notebox('🚨 <strong>Refeeding syndrome</strong> is potentially fatal. Occurs when nutrition is reintroduced too rapidly after starvation — causes catastrophic shifts of phosphate, potassium, and magnesium into cells, leading to cardiac arrhythmias, respiratory failure, and seizures.','#faf5ff','#e9d5ff').outerHTML +
    '<div style="display:grid;gap:8px">' +
    '<div style="padding:8px;background:#fef2f2;border-radius:8px"><strong style="color:#dc2626">Signs to Watch:</strong><br><span style="font-size:12px">Hypophosphataemia (muscle weakness, respiratory failure), hypokalaemia (arrhythmias, ileus), hypomagnesaemia (tetany, seizures), thiamine deficiency (Wernicke encephalopathy), fluid overload (cardiac failure, pulmonary oedema).</span></div>' +
    '<div style="padding:8px;background:#f0fdf4;border-radius:8px"><strong style="color:#16a34a">Prevention:</strong><br><span style="font-size:12px">1. Start with F-75 at 100 ml/kg/day — never exceed in first week. 2. Correct electrolytes BEFORE increasing feeds. 3. Introduce F-100 gradually over 2–3 days. 4. Monitor weight, oedema, heart rate daily — rapid weight gain (>10g/kg/day in first week) may indicate fluid retention not catch-up growth. 5. If heart failure develops: reduce feeds to 75 ml/kg/day, Furosemide 1 mg/kg, reassess.</span></div>' +
    '</div>'
  ));
}

// ── PAEDIATRICS: SICKLE CELL ──────────────────────────────────
function tabPaedSickleCell(el_) {
  el_.appendChild(secTitle('🩸','Sickle Cell Disease','Vaso-occlusive crisis, acute chest syndrome, splenic sequestration, stroke, and infection management','#ef4444'));
  el_.appendChild(notebox('📌 <strong>Sources:</strong> British Society for Haematology Guidelines (Howard J et al.) · American Society of Hematology 2020 SCD Guidelines · Nigerian Federal Ministry of Health SCD Guidelines. Nigeria has the highest SCD burden globally — approximately 150,000 children born with SCD annually.','#fef2f2','#fecaca'));

  el_.appendChild(card('🌡️ Vaso-Occlusive Crisis (VOC) — Pain Management','#ef4444',
    notebox('📌 VOC is the most common reason for hospital admission in SCD. Pain is caused by microvascular occlusion by sickled erythrocytes causing tissue ischaemia. Pain is REAL — do not underestimate or delay analgesia.','#fef2f2','#fecaca').outerHTML +
    '<div style="display:grid;gap:8px">' +
    [
      {step:'First 30 min',title:'Mild–Moderate Pain (NRS 1–6)',tx:'Paracetamol 15 mg/kg PO/IV 6-hourly (max 1g) + Ibuprofen 5–10 mg/kg PO 8-hourly (max 400mg) — if no renal impairment. Oral fluids encouraged (3–5 L/m²/day). Avoid cold — warm compresses to painful area.'},
      {step:'30–60 min (if uncontrolled)',title:'Severe Pain (NRS ≥7)',tx:'Morphine 0.1–0.15 mg/kg IV/SC every 2–4 hours (max 5mg per dose). OR Oral Morphine 0.2–0.5 mg/kg 4-hourly. Continue Paracetamol and NSAID. Reassess pain score every 30 min.'},
      {step:'Ongoing',title:'Adjuncts & Monitoring',tx:'IV fluids: Normal saline 0.9% at maintenance rate (do NOT overhydrate — pulmonary oedema risk). Oxygen ONLY if SpO₂ <94% — routine O₂ not beneficial. DVT prophylaxis for prolonged admission. Incentive spirometry — prevents ACS.'},
    ].map(function(r){
      var col = r.step.includes('uncontrolled')?'#dc2626':r.step.includes('Ongoing')?'#0ea5e9':'#f97316';
      return '<div style="padding:10px;border-left:4px solid '+col+';background:#fafafa;border-radius:0 8px 8px 0">'
        +'<div style="font-size:11px;color:'+col+';font-weight:700">'+r.step+'</div>'
        +'<div style="font-weight:700;font-size:13px;color:#1c1917">'+r.title+'</div>'
        +'<div style="font-size:12px;color:#374151;margin-top:4px">'+r.tx+'</div></div>';
    }).join('') + '</div>'
  ));

  el_.appendChild(card('🫁 Acute Chest Syndrome (ACS) — Emergency','#dc2626',
    notebox('🚨 <strong>ACS is the leading cause of death in SCD.</strong> Defined as: new infiltrate on CXR + ONE of: fever, chest pain, cough, hypoxia, tachypnoea. Triggered by infection, fat embolism, pulmonary infarction. Can deteriorate rapidly.','#fef2f2','#fecaca').outerHTML +
    '<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Action</th><th>Detail</th></tr></thead><tbody>' +
    [
      ['Oxygen','Target SpO₂ ≥95% — high-flow O₂ via mask. Escalate to NIV if not maintaining.'],
      ['Analgesia','Morphine 0.1 mg/kg IV — pain splinting worsens hypoxia. Incentive spirometry.'],
      ['Antibiotics','Ceftriaxone 50–75 mg/kg/day IV (max 2g) + Azithromycin 10 mg/kg OD × 5 days (covers atypicals — common cause of ACS)'],
      ['Transfusion','Simple transfusion (top-up) if Hb falls >2g/dL from baseline OR SpO₂ deteriorating despite O₂. Target Hb 10g/dL. Exchange transfusion if rapidly deteriorating (discuss with haematology).'],
      ['Bronchodilators','Salbutamol nebuliser if wheeze — reactive airways component common in ACS.'],
      ['Fluids','Maintain euvolaemia — IV fluids at maintenance rate only. Overhydration worsens pulmonary oedema.'],
      ['Escalation','ICU if: SpO₂ <90% on high-flow O₂, rising respiratory rate, PaO₂ <8 kPa, deteriorating consciousness.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#dc2626;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td></tr>';}).join('') +
    '</tbody></table></div>'
  ));

  el_.appendChild(card('🩸 Splenic Sequestration — Acute Emergency','#8b5cf6',
    notebox('🚨 <strong>Life-threatening.</strong> Massive acute pooling of blood in spleen — child presents with rapid enlargement of spleen, acute anaemia, cardiovascular collapse. Commonest in children 3 months–5 years. Can be fatal within hours.','#faf5ff','#e9d5ff').outerHTML +
    '<div style="display:grid;gap:6px">' +
    '<div style="padding:8px;background:#fef2f2;border-radius:8px"><strong style="color:#dc2626">Recognition:</strong><br><span style="font-size:12px">Rapidly enlarging spleen (compare with previous exam), pallor, lethargy, tachycardia, hypotension, Hb drop >2g/dL from baseline. Child may deteriorate within hours of onset.</span></div>' +
    '<div style="padding:8px;background:#f0f9ff;border-radius:8px"><strong style="color:#0ea5e9">Management:</strong><br><span style="font-size:12px">1. IV access × 2, group and crossmatch URGENTLY. 2. IV fluid bolus 10 ml/kg Normal Saline if shocked — while awaiting blood. 3. Blood transfusion: give 5–10 ml/kg packed red cells slowly — splenic blood will auto-transfuse back, risk of hyperviscosity if transfuse to normal Hb. Target Hb 7–9 g/dL (not normal). 4. Monitor closely for 24h — sequestration can recur. 5. Discuss splenectomy with haematology after recovery.</span></div>' +
    '</div>'
  ));

  el_.appendChild(card('🧠 Stroke in SCD','#f97316',
    '<div style="display:grid;gap:8px">' +
    '<div style="padding:8px;background:#fff7ed;border-radius:8px"><strong style="color:#f97316">Recognition:</strong><br><span style="font-size:12px">Sudden focal neurological deficit in SCD child = stroke until proven otherwise. Children with SCD have 300× higher stroke risk than peers. Most common in 2–9 year olds. Both ischaemic (most common in children) and haemorrhagic.</span></div>' +
    '<div style="padding:8px;background:#fef2f2;border-radius:8px"><strong style="color:#dc2626">Emergency Management:</strong><br><span style="font-size:12px">1. Do NOT give simple transfusion — raises blood viscosity. 2. EXCHANGE TRANSFUSION: reduce HbS to <30% of total Hb — requires haematology/specialist centre. 3. IV fluids at maintenance, NO hypotonic fluids. 4. Treat seizures if present (Lorazepam 0.1 mg/kg IV). 5. Urgent CT/MRI head. 6. Transfer to centre with exchange transfusion capability.</span></div>' +
    '<div style="padding:8px;background:#f0fdf4;border-radius:8px"><strong style="color:#16a34a">Secondary Prevention:</strong><br><span style="font-size:12px">Monthly blood transfusion programme — target HbS <30%. Transcranial Doppler (TCD) screening annually from age 2. Hydroxyurea if transfusion not available.</span></div>' +
    '</div>'
  ));

  el_.appendChild(card('💊 Infection in SCD — Prevention & Treatment','#16a34a',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Intervention</th><th>Detail</th><th>Duration</th></tr></thead><tbody>' +
    [
      ['Penicillin V prophylaxis','125 mg BD PO (<3 years); 250 mg BD PO (≥3 years). Prevents pneumococcal sepsis — leading infectious cause of death in SCD children.','Lifelong (or until age 5 minimum)'],
      ['Pneumococcal vaccine','PCV13 + PPV23. Give PPV23 at age 2 and booster at age 5.','Per schedule'],
      ['Malaria prophylaxis','Proguanil 3.5 mg/kg OD (max 200 mg) — mandatory in malaria-endemic Nigeria. Malaria precipitates crisis and severe haemolysis in SCD.','Year-round in Nigeria'],
      ['Folic acid','5 mg OD — compensates for chronic haemolytic anaemia and high folate demand.','Lifelong'],
      ['Empiric treatment (fever ≥38.5°C)','Ceftriaxone 50 mg/kg IV/IM (max 2g) — all febrile SCD children should receive empiric IV antibiotics pending blood culture. Do not send home with oral antibiotics alone.','Until cultures negative'],
      ['Hydroxyurea','15–35 mg/kg/day PO — reduces HbS polymerisation, reduces crisis frequency by 50%. Indicated for frequent VOC, ACS, severe disease.','Lifelong, with monitoring'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a;font-size:12px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:11px;color:#6b7280">'+r[2]+'</td></tr>';}).join('') +
    '</tbody></table></div>'
  ));

  el_.appendChild(card('📊 Transfusion Thresholds in SCD','#0ea5e9',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Situation</th><th>Threshold</th><th>Target Hb</th><th>Type</th></tr></thead><tbody>' +
    [
      ['Stable SCD (no crisis)','Do not transfuse — SCD patients tolerate low Hb well due to right-shifted O₂ curve','Baseline 6–9 g/dL','No transfusion'],
      ['Symptomatic anaemia (VOC, fatigue)','Hb <6 g/dL OR >2 g/dL below baseline','7–9 g/dL','Simple (5–10 ml/kg packed cells)'],
      ['Acute chest syndrome','Hb falls OR SpO₂ <94%','9–10 g/dL','Simple or exchange'],
      ['Splenic sequestration','Any haemodynamic compromise','7–9 g/dL (not higher)','Simple 5 ml/kg slowly'],
      ['Stroke','Any — emergency','HbS <30% of total Hb','Exchange transfusion only'],
      ['Pre-operative (major surgery)','Hb <10 g/dL','10 g/dL','Simple or exchange'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;font-size:12px">'+r[0]+'</td><td style="font-size:12px;color:#dc2626">'+r[1]+'</td><td style="font-size:12px;font-weight:700;color:#0ea5e9">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('') +
    '</tbody></table></div>'
  ));
}


// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// RENAL TABS
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

