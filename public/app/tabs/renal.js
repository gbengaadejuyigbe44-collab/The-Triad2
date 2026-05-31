function tabRenalEGFR(el_) {
  el_.appendChild(secTitle('\ud83d\udd2c','eGFR Calculator','CKD-EPI 2021 (race-free equation) \u2014 estimated Glomerular Filtration Rate','#7c3aed'));
  el_.appendChild(notebox('\ud83d\udccc <strong>Source:</strong> Inker LA et al. New Creatinine\u2013 and Cystatin C\u2013Based Equations to Estimate GFR without Race. N Engl J Med 2021;385(19):1737\u20131749 (CKD-EPI 2021 race-free equation). KDIGO CKD Guideline 2024 update.','#faf5ff','#e9d5ff'));

  var calcCard = card('eGFR Calculator \u2014 CKD-EPI 2021','#7c3aed','');
  var cb2 = calcCard.querySelector('.card-body');
  cb2.innerHTML = '<div class="g4" style="margin-bottom:12px"><div><label class="lbl">Creatinine (\u00b5mol/L or mg/dL)</label><input id="egfr-cr" type="text" inputmode="decimal" class="inp" placeholder="e.g. 90 \u00b5mol/L" oninput="calcEGFR()"></div><div><label class="lbl">Unit</label><select id="egfr-unit" class="inp" style="width:90px" onchange="calcEGFR()"><option value="umol">\u00b5mol/L</option><option value="mgdl">mg/dL</option></select></div><div><label class="lbl">Age (years)</label><input id="egfr-age" type="text" inputmode="decimal" class="inp" placeholder="e.g. 58" oninput="calcEGFR()"></div><div><label class="lbl">Sex</label><select id="egfr-sex" class="inp" onchange="calcEGFR()"><option value="male">Male</option><option value="female">Female</option></select></div></div><div id="egfr-result" style="padding:14px;background:#faf5ff;border:2px solid #e9d5ff;border-radius:10px;font-size:13px">Enter values to calculate eGFR.</div>';
  el_.appendChild(calcCard);

  window.calcEGFR = function(){
    var cr=parseFloat(document.getElementById('egfr-cr').value), unit=document.getElementById('egfr-unit').value, age=parseFloat(document.getElementById('egfr-age').value), sex=document.getElementById('egfr-sex').value, res=document.getElementById('egfr-result');
    if(!res) return;
    if(isNaN(cr)||isNaN(age)||cr<=0||age<=0){res.innerHTML='Enter all values to calculate.';return;}
    // Convert to mg/dL for CKD-EPI 2021
    var cr_mgdl = unit==='umol' ? cr/88.4 : cr;
    // CKD-EPI 2021 race-free equation
    var kappa = sex==='female' ? 0.7 : 0.9;
    var alpha = sex==='female' ? -0.241 : -0.302;
    var cr_k = cr_mgdl/kappa;
    var egfr;
    if(cr_k<1) {
      egfr = 142 * Math.pow(cr_k,alpha) * Math.pow(0.9938,age) * (sex==='female'?1.012:1);
    } else {
      egfr = 142 * Math.pow(cr_k,-1.200) * Math.pow(0.9938,age) * (sex==='female'?1.012:1);
    }
    egfr = Math.round(egfr);
    var stage='',color='',bg='',action='';
    if(egfr>=90){stage='G1 \u2014 Normal or High';color='#16a34a';bg='#f0fdf4';action='If other markers of CKD present \u2014 monitor. If no markers \u2014 no CKD. Annual recheck if risk factors.';}
    else if(egfr>=60){stage='G2 \u2014 Mildly Decreased';color='#22c55e';bg='#f0fdf4';action='Identify and treat CKD risk factors. Annual monitoring of eGFR + ACR. Lifestyle advice.';}
    else if(egfr>=45){stage='G3a \u2014 Mild-Moderate';color='#d97706';bg='#fffbeb';action='Treat CKD complications. Avoid nephrotoxins. ACE/ARB. Consider nephrology referral.';}
    else if(egfr>=30){stage='G3b \u2014 Moderate-Severe';color='#ea580c';bg='#fff7ed';action='Nephrology referral. Anaemia management. Bone mineral disease monitoring. Prepare for RRT discussion.';}
    else if(egfr>=15){stage='G4 \u2014 Severely Decreased';color='#dc2626';bg='#fef2f2';action='Definitive nephrology care. Dialysis/transplant planning. Full metabolic management.';}
    else{stage='G5 \u2014 Kidney Failure';color='#7c3aed';bg='#faf5ff';action='Dialysis or kidney transplant required (or conservative care if chosen). See Dialysis Indications tab.';}
    res.style.background=bg; res.style.borderColor=color+'55';
    res.innerHTML='<div style="font-size:22px;font-weight:900;color:'+color+'">eGFR: '+egfr+' ml/min/1.73m\u00b2</div><div style="font-size:14px;font-weight:700;color:'+color+';margin:4px 0">CKD Stage: '+stage+'</div><div style="font-size:13px;color:#374151;margin-top:8px">'+action+'</div><div style="font-size:11px;color:#64748b;margin-top:8px">Calculated using CKD-EPI 2021 (race-free). Source: Inker LA et al. NEJM 2021;385:1737\u20131749.</div>';
  };
}

function tabRenalAKI(el_) {
  el_.appendChild(secTitle('🚨','Acute Kidney Injury (AKI)','KDIGO staging, common causes in Nigeria, fluid challenge, indications for dialysis, and when to refer','#7c3aed'));
  el_.appendChild(notebox('📌 <strong>Sources:</strong> KDIGO AKI Guidelines 2012 · BMJ AKI Management 2023 · Nigerian context: most common causes are sepsis, malaria, dehydration, traditional medicine nephrotoxicity, NSAID overuse, and obstetric AKI. Early recognition and reversing the cause prevents progression to dialysis-requiring renal failure.','#faf5ff','#e9d5ff'));

  el_.appendChild(card('📊 KDIGO AKI Staging','#7c3aed',
    '<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Stage</th><th>Serum Creatinine Criteria</th><th>Urine Output Criteria</th><th>Action</th></tr></thead><tbody>'+[
      ['Stage 1','Rise ≥26.5 μmol/L in 48h OR 1.5–1.9× baseline','<0.5 ml/kg/hr for 6–12 hours','Identify and treat cause. Optimise fluid status. Stop nephrotoxins. Monitor 4-6 hourly UO.'],
      ['Stage 2','2.0–2.9× baseline creatinine','<0.5 ml/kg/hr for ≥12 hours','All Stage 1 actions + nephrology input. Consider renal replacement therapy if trajectory worsening.'],
      ['Stage 3','≥3× baseline OR ≥354 μmol/L OR initiation of RRT','<0.3 ml/kg/hr for ≥24h OR anuria ≥12h','Urgent nephrology/ICU. RRT likely required. Careful fluid and electrolyte management.'],
    ].map(function(r){
      var col = r[0]==='Stage 1'?'#16a34a':r[0]==='Stage 2'?'#f97316':'#dc2626';
      return '<tr class="tbl-row"><td style="font-weight:800;color:'+col+'">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';
    }).join('')+'</tbody></table></div>'
  ));

  el_.appendChild(card('🇳🇬 Common Causes of AKI in Nigeria','#f97316',
    '<div style="display:grid;gap:6px">'+
    [
      {cause:'Sepsis (all causes)',freq:'Most common',note:'Distributive shock → renal hypoperfusion. Treat underlying infection urgently. Sepsis AKI often reversible with early treatment.'},
      {cause:'Severe Malaria',freq:'Very common',note:'Direct nephrotoxic effect + haemoglobinuria (blackwater fever) + haemodynamic compromise. IV Artesunate + careful fluids.'},
      {cause:'Severe Dehydration',freq:'Very common',note:'Diarrhoea, vomiting, heat, inadequate intake. Pre-renal AKI — usually reversible with fluid resuscitation. Assess volume status carefully.'},
      {cause:'Traditional Medicine / Herbal Nephrotoxicity',freq:'Common — underreported',note:'Aristolochic acid (in many Nigerian herbs), heavy metals, unidentified compounds. Direct tubular toxicity. Often irreversible if prolonged exposure. ALWAYS ask about herbal use.'},
      {cause:'NSAID Overuse',freq:'Common',note:'Ibuprofen, Diclofenac widely available OTC. Prostaglandin inhibition → afferent arteriolar constriction → reduced GFR. Stop immediately. Usually reversible.'},
      {cause:'Obstetric AKI',freq:'Significant',note:'PPH, pre-eclampsia/eclampsia, septic abortion, HELLP syndrome. Urgent obstetric + nephrology management. High maternal mortality risk.'},
      {cause:'Contrast-Induced AKI',freq:'Referral hospitals',note:'After IV contrast for imaging. Pre-hydrate with Normal Saline 1ml/kg/hr for 6-12h before and after. Avoid contrast if eGFR <30.'},
      {cause:'Aminoglycoside Toxicity',freq:'Iatrogenic',note:'Gentamicin (very widely used in Nigeria) — dose-dependent nephrotoxicity. Monitor renal function. Once-daily dosing less nephrotoxic than multiple daily doses. Avoid prolonged courses.'},
    ].map(function(r){return '<div style="padding:8px;border-left:4px solid #f97316;background:#fff7ed;border-radius:0 8px 8px 0">'
      +'<div style="display:flex;justify-content:space-between;align-items:center">'
      +'<span style="font-weight:700;font-size:13px;color:#f97316">'+r.cause+'</span>'
      +'<span style="font-size:11px;background:#f97316;color:#fff;padding:2px 8px;border-radius:4px">'+r.freq+'</span></div>'
      +'<div style="font-size:12px;color:#374151;margin-top:3px">'+r.note+'</div></div>';}).join('')+
    '</div>'
  ));

  el_.appendChild(card('💧 Fluid Assessment & Challenge in AKI','#0ea5e9',
    notebox('⚠️ <strong>Fluid management in AKI is nuanced.</strong> Pre-renal AKI needs fluids. Oliguric AKI with fluid overload does NOT need more fluids. Assess volume status carefully before every fluid decision.','#f0f9ff','#bae6fd').outerHTML+
    '<div style="display:grid;gap:8px">'+
    '<div style="padding:10px;background:#f0fdf4;border-radius:8px"><strong style="color:#16a34a">✅ Give fluids if:</strong><br><span style="font-size:12px">Clinical dehydration signs (dry mucous membranes, reduced skin turgor, tachycardia, postural hypotension) · Recent history of fluid loss (diarrhoea, vomiting, blood loss) · Low JVP · Urine Na+ >20 mmol/L and FeNa <1% (pre-renal pattern)</span></div>'+
    '<div style="padding:10px;background:#fef2f2;border-radius:8px"><strong style="color:#dc2626">❌ Restrict fluids if:</strong><br><span style="font-size:12px">Clinical fluid overload (raised JVP, peripheral oedema, pulmonary oedema, ascites) · Oliguric despite fluid challenge · Worsening hypoxia · Urine Na+ <20 mmol/L with dilute urine (intrinsic renal cause not pre-renal)</span></div>'+
    '<div style="padding:10px;background:#f0f9ff;border-radius:8px"><strong style="color:#0ea5e9">💊 Fluid Challenge Protocol:</strong><br><span style="font-size:12px">250–500 ml Normal Saline 0.9% (or Hartmann\'s) over 15–30 minutes IV. Reassess UO, HR, BP, JVP after each bolus. If UO improves → continue. If no response after 1–2 L → stop — likely intrinsic AKI. <strong>Do not fluid overload trying to "push" urine in intrinsic AKI.</strong></span></div>'+
    '</div>'
  ));

  el_.appendChild(card('⚠️ STOP These in AKI — Nephrotoxin Avoidance','#dc2626',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug / Substance</th><th>Action</th></tr></thead><tbody>'+[
      ['NSAIDs (Ibuprofen, Diclofenac, Naproxen)','STOP IMMEDIATELY — reduce GFR, worsen AKI significantly'],
      ['ACE inhibitors / ARBs','HOLD temporarily in AKI (reduce GFR) — restart when creatinine stable and improving'],
      ['Gentamicin','STOP or extend dosing interval dramatically. Check levels. Once-daily dosing preferred.'],
      ['Metformin','HOLD if eGFR <30 — risk of lactic acidosis. Restart only when renal function stable.'],
      ['Contrast media','AVOID unless absolutely necessary. Pre-hydrate if unavoidable.'],
      ['Traditional herbal medicines','STOP ALL — many are directly nephrotoxic. Do not resume.'],
      ['Diuretics (in pre-renal AKI)','HOLD — worsen dehydration and pre-renal AKI. Only use in confirmed fluid-overload AKI.'],
      ['K+-sparing diuretics (Spironolactone, Amiloride)','STOP — severe hyperkalaemia risk in AKI'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;color:#dc2626;font-size:13px">'+r[0]+'</td><td style="font-size:13px">'+r[1]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));

  el_.appendChild(card('🏥 AEIOU — Indications for Emergency Dialysis','#dc2626',
    notebox('🚨 These are absolute indications for urgent renal replacement therapy (RRT). Do not delay referral to a dialysis-capable centre if ANY of these are present and not responding to medical management.','#fef2f2','#fecaca').outerHTML+
    '<div style="display:grid;gap:6px">'+
    [
      {letter:'A',label:'Acidosis',detail:'Metabolic acidosis pH <7.1 (or bicarbonate <10 mmol/L) unresponsive to bicarbonate therapy'},
      {letter:'E',label:'Electrolytes',detail:'Hyperkalaemia K+ >6.5 mmol/L (or >5.5 with ECG changes) refractory to medical treatment'},
      {letter:'I',label:'Intoxication',detail:'Poisoning with dialysable toxin (Methanol, Ethylene glycol, Lithium, Salicylates, some traditional medicines)'},
      {letter:'O',label:'Overload',detail:'Fluid overload causing pulmonary oedema unresponsive to diuretics — SpO₂ not maintainable'},
      {letter:'U',label:'Uraemia',detail:'Uraemic encephalopathy (confusion, seizures), uraemic pericarditis, or creatinine rising rapidly with symptoms'},
    ].map(function(r){return '<div style="display:grid;grid-template-columns:36px 120px 1fr;gap:8px;padding:8px;background:#fef2f2;border-radius:8px;align-items:start">'
      +'<div style="width:30px;height:30px;border-radius:50%;background:#dc2626;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px">'+r.letter+'</div>'
      +'<span style="font-weight:700;font-size:13px;color:#dc2626;padding-top:4px">'+r.label+'</span>'
      +'<span style="font-size:12px;color:#374151;padding-top:4px">'+r.detail+'</span></div>';}).join('')+
    '</div>'
  ));

  el_.appendChild(card('💊 Electrolyte Emergencies in AKI','#f97316',
    '<div style="display:grid;gap:10px">'+
    '<div style="padding:10px;border-left:4px solid #dc2626;background:#fef2f2;border-radius:0 8px 8px 0"><strong style="color:#dc2626">🚨 Hyperkalaemia (K+ >5.5 mmol/L)</strong><br><span style="font-size:12px"><strong>ECG first</strong> — peaked T waves → wide QRS → sine wave pattern (pre-arrest). <br><strong>If ECG changes present:</strong> Calcium gluconate 10ml of 10% IV over 2-3 min (cardioprotective, does not lower K+). <br><strong>Lower K+:</strong> Salbutamol 10–20mg nebulised (rapid, shifts K+ into cells) + Insulin 10 units in 50ml 50% dextrose IV over 30 min + Sodium bicarbonate 50–100mmol IV if acidotic. <br><strong>Remove K+:</strong> Calcium resonium 15g TDS PO/PR. Furosemide 40–80mg IV (if UO present). Dialysis if refractory.</span></div>'+
    '<div style="padding:10px;border-left:4px solid #0ea5e9;background:#f0f9ff;border-radius:0 8px 8px 0"><strong style="color:#0ea5e9">⚠️ Hyponatraemia (Na+ <130 mmol/L)</strong><br><span style="font-size:12px"><strong>If symptomatic (seizures, severe confusion):</strong> 150ml 3% NaCl IV over 20 min — repeat if needed (max 3 boluses). Target Na+ rise of 5 mmol/L over first hour. <br><strong>Chronic/asymptomatic:</strong> Correct slowly — no more than 10 mmol/L in 24h, 18 mmol/L in 48h (risk of osmotic demyelination syndrome — ODS). Fluid restriction if SIADH.</span></div>'+
    '</div>'
  ));
}


function tabRenalCKD(el_) {
  el_.appendChild(secTitle('\ud83d\udcca','CKD Staging','KDIGO 2024 \u2014 GFR and Albuminuria categories','#7c3aed'));
  el_.appendChild(card('GFR Categories (G1\u2013G5)','#7c3aed','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Stage</th><th>eGFR (mL/min/1.73m\u00b2)</th><th>Description</th><th>Key Actions</th></tr></thead><tbody>'
    +[['G1','\u226590','Normal or High (if markers of kidney damage present)','Monitor; treat cause; BP control <130/80'],
      ['G2','60\u201389','Mildly Decreased','Annual monitoring; lifestyle; cardiovascular risk'],
      ['G3a','45\u201359','Mildly to Moderately Decreased','Review drugs; anaemia screen; nephrology referral'],
      ['G3b','30\u201344','Moderately to Severely Decreased','Nephrology; phosphate/calcium management; RRT planning'],
      ['G4','15\u201329','Severely Decreased','Urgent nephrology; AV fistula planning; diet referral'],
      ['G5','<15','Kidney Failure','Dialysis or transplant; conservative care discussion'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:800;color:#7c3aed">'+r[0]+'</td><td style="font-weight:700">'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px;color:#64748b">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
    +'<p style="font-size:12px;color:#64748b;margin-top:8px">Ref: KDIGO CKD Guideline 2024; KDIGO 2012 Clinical Practice Guideline.</p>'));
  el_.appendChild(card('Albuminuria Categories (A1\u2013A3)','#0ea5e9','<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Category</th><th>ACR (mg/mmol)</th><th>ACR (mg/g)</th><th>Description</th></tr></thead><tbody>'
    +[['A1','<3','<30','Normal to mildly increased'],
      ['A2','3\u201330','30\u2013300','Moderately increased (microalbuminuria)'],
      ['A3','>30','>300','Severely increased (macroalbuminuria/nephrotic range if very high)'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:800;color:#0891b2">'+r[0]+'</td><td style="font-weight:700">'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
    +'<div style="margin-top:10px;font-size:13px;color:#374151;line-height:1.7">CKD is diagnosed when eGFR <60 <strong>or</strong> markers of kidney damage (including A2/A3 albuminuria) persist for <strong>\u22653 months</strong>. Both eGFR and albuminuria together determine prognosis \u2014 a patient with G2A3 has higher risk than G3aA1.</div>'));
  el_.appendChild(card('CKD Management Overview','#16a34a','<div style="display:grid;gap:8px">'
    +[['BP Control','Target <130/80 mmHg. ACE inhibitor or ARB first-line (especially with albuminuria). Avoid dual RAAS blockade.'],
      ['Glycaemic Control','HbA1c target 53 mmol/mol (7%) in CKD. SGLT2 inhibitors (e.g. dapagliflozin, empagliflozin) slow CKD progression \u2014 use down to eGFR \u226520.'],
      ['Proteinuria Reduction','ACE inhibitor/ARB reduces albuminuria and slows progression. SGLT2 inhibitors add additional renoprotection.'],
      ['Anaemia Management','Target Hb 100\u2013120 g/L. Iron supplementation first. Erythropoiesis-stimulating agents (EPO) if iron replete. Refer to nephrology for EPO initiation.'],
      ['Bone Mineral Disease','Check Ca\u00b2\u207a, PO\u2084, PTH, Vitamin D. Restrict dietary phosphate in G4\u2013G5. Phosphate binders if needed. Treat Vitamin D deficiency.'],
      ['Hyperkalaemia','Dietary potassium restriction in G4\u2013G5. Avoid NSAIDs, trimethoprim, potassium-sparing diuretics. Patiromer or sodium zirconium cyclosilicate if persistent.'],
      ['Cardiovascular Risk','High CV risk in all CKD stages. Statin therapy; aspirin if indicated; BP and glucose control; smoking cessation.'],
      ['Nephrotoxin Avoidance','Avoid NSAIDs, IV contrast (or pre-hydrate), aminoglycosides (use cautiously with monitoring), gadolinium in GFR <30.'],
    ].map(function(r){return '<div style="padding:10px 14px;background:#f0fdf4;border-left:4px solid #16a34a;border-radius:8px"><div style="font-weight:700;font-size:13px;color:#15803d">'+r[0]+'</div><div style="font-size:13px;color:#374151;margin-top:4px">'+r[1]+'</div></div>';}).join('')+'</div>'));
}

function tabRenalComplications(el_) {
  el_.appendChild(secTitle('\ud83d\udd17','CKD Complications','Anaemia, bone disease, hyperkalaemia, acidosis, and CVD','#7c3aed'));
  el_.appendChild(card('Renal Anaemia','#dc2626','<div style="font-size:13px;color:#374151;line-height:1.8">'
    +'<strong>Cause:</strong> Reduced EPO production from failing kidney + iron deficiency + chronic inflammation.<br>'
    +'<strong>Diagnosis:</strong> Hb <130 g/L (male) or <120 g/L (female) with CKD \u2014 exclude other causes first.<br>'
    +'<strong>Target Hb:</strong> 100\u2013120 g/L (avoid >130 \u2014 higher CV risk with EPO).<br><br>'
    +'<strong>Management:</strong><br>'
    +'1. Correct iron first \u2014 Ferritin target >200 \u00b5g/L; TSAT >20%. IV iron if not responding to oral.<br>'
    +'2. Erythropoiesis-stimulating agents (ESA): Erythropoietin alpha (Eprex), Darbepoetin (Aranesp) \u2014 only after iron optimised. Initiated by nephrology.<br>'
    +'3. HIF-prolyl hydroxylase inhibitors (e.g. Roxadustat) \u2014 newer oral alternative to ESA in dialysis patients.<br>'
    +'<p style="font-size:12px;color:#64748b;margin-top:8px">Ref: KDIGO Anaemia in CKD Guideline 2012, updated 2024.</p></div>'));
  el_.appendChild(card('CKD-Mineral Bone Disease (CKD-MBD)','#f97316','<div class="tbl-wrap"><table><thead><tr style="background:#fff7ed"><th>Parameter</th><th>Target / Goal</th><th>Management</th></tr></thead><tbody>'
    +[['Phosphate','0.87\u20131.49 mmol/L','Dietary restriction; phosphate binders (calcium carbonate, sevelamer, lanthanum carbonate)'],
      ['Calcium','2.10\u20132.55 mmol/L','Avoid hypercalcaemia; adjust binders and vitamin D dose'],
      ['PTH','2\u20139\u00d7 upper normal (varies by CKD stage)','Active vitamin D (alfacalcidol, calcitriol) or calcimimetics (cinacalcet) if high PTH'],
      ['25-OH Vitamin D','Treat if deficient (aim >50 nmol/L)','Colecalciferol / ergocalciferol supplementation'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;font-size:12px">'+r[0]+'</td><td style="color:#f97316;font-weight:700;font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'
    +'<p style="font-size:12px;color:#64748b;margin-top:8px">Ref: KDIGO MBD Guideline 2017, updated 2024.</p>'));
  el_.appendChild(card('Hyperkalaemia Management in CKD','#7c3aed','<div style="display:grid;gap:8px;font-size:13px">'
    +[['K\u207a 5.0\u20135.5 mmol/L (Mild)','Dietary potassium restriction (<2000 mg/day). Review and stop potassium-raising drugs (NSAIDs, trimethoprim, potassium-sparing diuretics). Optimise constipation.'],
      ['K\u207a 5.5\u20136.0 mmol/L (Moderate)','As above + Sodium bicarbonate if acidotic. Patiromer 8.4g once daily or sodium zirconium cyclosilicate 10g TDS for acute then maintenance.'],
      ['K\u207a >6.0 or ECG changes (Severe)','EMERGENCY: Calcium gluconate 10mL 10% IV (membrane stabilisation) \u2192 Insulin-dextrose (10 units actrapid + 50mL 50% dextrose IV) \u2192 Salbutamol 10\u201320mg neb \u2192 Dialysis if refractory.'],
    ].map(function(r,i){var col=i===0?'#f0f9ff':i===1?'#faf5ff':'#fef2f2';var bc=i===0?'#7c3aed':i===1?'#7c3aed':'#dc2626';return '<div style="padding:10px 14px;background:'+col+';border-left:4px solid '+bc+';border-radius:8px"><div style="font-weight:700;color:'+bc+';margin-bottom:4px">'+r[0]+'</div><div style="color:#374151">'+r[1]+'</div></div>';}).join('')+'</div>'));
  el_.appendChild(card('Metabolic Acidosis in CKD','#0ea5e9','<div style="font-size:13px;color:#374151;line-height:1.8">'
    +'<strong>Cause:</strong> Reduced acid excretion + bicarbonate loss as nephrons are destroyed.<br>'
    +'<strong>Target:</strong> Serum bicarbonate \u226522 mmol/L.<br>'
    +'<strong>Treatment:</strong> Sodium bicarbonate tablets (500mg\u20131g TDS) \u2014 titrate to serum bicarb. Dietary protein restriction reduces acid load. Correct acidosis slows CKD progression and reduces hyperkalaemia.<br>'
    +'<p style="font-size:12px;color:#64748b;margin-top:8px">Ref: KDIGO CKD 2024; de Brito-Ashurst I et al. JASN 2009;20(9):2032\u20132038.</p></div>'));
  el_.appendChild(card('Cardiovascular Risk in CKD','#374151','<div style="font-size:13px;color:#374151;line-height:1.8">'
    +'CKD is an <strong>independent major cardiovascular risk factor</strong>. Patients with CKD G3\u2013G5 have up to <strong>5\u201310\u00d7 higher CV mortality</strong> than the general population \u2014 most CKD patients die of CV disease before reaching dialysis.<br><br>'
    +'<strong>Key interventions:</strong><br>'
    +'\u2022 <strong>BP <130/80 mmHg</strong> \u2014 ACE inhibitor/ARB + diuretic + CCB<br>'
    +'\u2022 <strong>Statins</strong> \u2014 recommended in CKD G1\u2013G5 (not initiated in dialysis patients unless already on, per SHARP trial)<br>'
    +'\u2022 <strong>SGLT2 inhibitors</strong> (empagliflozin, dapagliflozin) \u2014 reduce CV death, HF hospitalisation, and CKD progression<br>'
    +'\u2022 <strong>Finerenone</strong> (non-steroidal MRA) \u2014 reduces CV events + CKD progression in DM+CKD<br>'
    +'\u2022 <strong>Smoking cessation, physical activity, weight management</strong><br>'
    +'<p style="font-size:12px;color:#64748b;margin-top:8px">Ref: SHARP Trial; EMPA-KIDNEY; DAPA-CKD; FIDELIO-DKD; KDIGO 2024.</p></div>'));
}

function tabRenalDialysis(el_) {
  el_.appendChild(secTitle('\ud83e\ude7a','Dialysis Indications','AEIOU criteria and modality comparison','#7c3aed'));
  el_.appendChild(notebox('\ud83d\udccb Dialysis initiation is a clinical decision based on overall context \u2014 not eGFR alone. Discuss with nephrology. Ref: KDIGO 2012; Tattersall J et al. NDT 2011;26:2082\u20132086.','#faf5ff','#e9d5ff'));
  el_.appendChild(card('Indications for Emergency Dialysis \u2014 AEIOU','#dc2626','<div style="display:grid;gap:10px">'
    +[['A \u2014 Acidosis','Severe metabolic acidosis (pH <7.1 or bicarbonate <12 mmol/L) refractory to medical management. Common in AKI and CKD G5.','#fef2f2'],
      ['E \u2014 Electrolytes','Life-threatening hyperkalaemia (K\u207a >6.5 mmol/L or with ECG changes) unresponsive to medical treatment (calcium gluconate, insulin-dextrose, salbutamol, Resonium).','#fff7ed'],
      ['I \u2014 Intoxication','Dialysable toxins: salicylates, methanol, ethylene glycol, lithium, metformin (lactic acidosis), theophylline. Check nephrotoxic substances \u2014 not all are dialysable.','#fffbeb'],
      ['O \u2014 Overload','Fluid overload (pulmonary oedema) refractory to high-dose diuretics (furosemide >200 mg IV). Ultrafiltration may be used alone if kidneys still making some urine.','#f0f9ff'],
      ['U \u2014 Uraemia','Symptomatic uraemia: encephalopathy, pericarditis, bleeding diathesis (platelet dysfunction), severe nausea/vomiting. Urea alone is not the trigger \u2014 symptoms are.','#faf5ff'],
    ].map(function(r){return '<div style="padding:12px;background:'+r[2]+';border-left:4px solid #dc2626;border-radius:8px"><div style="font-weight:700;color:#dc2626;font-size:14px">'+r[0]+'</div><div style="font-size:13px;color:#374151;margin-top:4px">'+r[1]+'</div></div>';}).join('')+'</div>'));
  el_.appendChild(card('Dialysis Modalities \u2014 Comparison','#7c3aed','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Modality</th><th>Full Name</th><th>Setting</th><th>Best For</th></tr></thead><tbody>'
    +[['HD','Haemodialysis','Thrice-weekly hospital or home','Stable CKD G5; efficient solute/fluid removal'],
      ['PD','Peritoneal Dialysis','Daily at home (CAPD or APD)','Home-based; residual kidney function; haemodynamically unstable'],
      ['CRRT','Continuous Renal Replacement Therapy','ICU only','AKI in critically ill; haemodynamically unstable; allows slow fluid removal'],
      ['IHD','Intermittent HD (in ICU)','ICU \u2014 3\u20135\u00d7 weekly','AKI in ICU when patient can tolerate sessions'],
      ['SLED','Sustained Low-Efficiency Dialysis','ICU \u2014 6\u201312h sessions','Bridge between IHD and CRRT; moderately unstable patients'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:800;color:#7c3aed">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:12px;color:#64748b">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
  el_.appendChild(card('Vascular Access for Haemodialysis','#0ea5e9','<div style="display:grid;gap:8px;font-size:13px">'
    +[['AV Fistula (AVF)','Gold standard. Native vein-artery anastomosis (usually radiocephalic). Requires 6\u201312 weeks to mature. Lowest infection rate; longest lifespan. Plan early in CKD G4.'],
      ['AV Graft','Synthetic graft (PTFE). Ready in 2\u20134 weeks. Used when vessels unsuitable for fistula. Higher thrombosis and infection rates than AVF.'],
      ['Tunnelled Central Line (TVC)','Immediate access. Higher infection risk (highest of all options). Used as bridge while fistula matures or in acute emergency.'],
    ].map(function(r){return '<div style="padding:10px;background:#f0f9ff;border-left:4px solid #0ea5e9;border-radius:8px"><strong>'+r[0]+'</strong><br><span style="color:#374151">'+r[1]+'</span></div>';}).join('')+'</div>'));
}

function tabRenalDrugs(el_) {
  el_.appendChild(secTitle('\ud83d\udc8a','Drug Dose Adjustment in CKD','Key drugs requiring renal dose modification or avoidance','#7c3aed'));
  el_.appendChild(notebox('\u26a0\ufe0f eGFR thresholds for dose adjustment vary by drug, patient weight, and clinical context. Always verify against current BNF/BNFC, local formulary, or pharmacist before prescribing. Ref: BNF 2024; KDIGO 2024; Renal Drug Handbook 5th Ed.','#faf5ff','#e9d5ff'));
  el_.appendChild(card('Common Drugs \u2014 CKD Dose Adjustments','#7c3aed','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>eGFR \u226560</th><th>eGFR 30\u201359</th><th>eGFR 15\u201329</th><th>eGFR <15 / Dialysis</th></tr></thead><tbody>'
    +[['Metformin','Normal dose','Normal dose (check 3\u20136 monthly)','Reduce dose; increased lactic acidosis risk','AVOID \u2014 contraindicated'],
      ['Methotrexate','Normal dose','Use with caution; reduce dose','AVOID','AVOID'],
      ['Digoxin','Normal dose','Reduce dose; monitor levels','Reduce dose significantly','AVOID or specialist use only'],
      ['Gentamicin','Normal dose (once daily)','Extend dosing interval; monitor levels','Specialist guidance; extended interval','AVOID if possible; strict monitoring'],
      ['Vancomycin','Normal dose','Reduce dose / extend interval; monitor trough','Significant dose reduction; monitor closely','Specialist dosing; post-dialysis dosing'],
      ['NSAIDs (e.g. ibuprofen)','Caution \u2014 may worsen renal function','SHORT course only; max 3 days; avoid if possible','AVOID','AVOID'],
      ['ACE Inhibitors / ARBs','Normal dose','Normal dose; monitor K\u207a + creatinine','Reduce dose; close monitoring; may be beneficial','Continue with specialist guidance; monitor electrolytes'],
      ['Gabapentin / Pregabalin','Normal dose','Reduce dose','Significant dose reduction','Major dose reduction; post-dialysis supplementation'],
      ['Morphine','Normal dose','Reduce dose; avoid active metabolite accumulation','Reduce dose; consider alternative opioid','AVOID \u2014 use oxycodone or hydromorphone instead'],
      ['Lithium','Normal dose; monitor levels','Reduce dose; more frequent monitoring','Use with extreme caution; specialist only','AVOID \u2014 dialysed out; very unpredictable levels'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;font-size:12px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px;color:#d97706">'+r[2]+'</td><td style="font-size:12px;color:#f97316">'+r[3]+'</td><td style="font-size:12px;color:#dc2626;font-weight:600">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));
  el_.appendChild(card('Contrast Media & Imaging in CKD','#f97316','<div style="display:grid;gap:8px;font-size:13px">'
    +[['IV Iodinated Contrast (CT)','eGFR <30: Hold metformin 48h before and after; pre-hydrate with IV saline; use iso-osmolar contrast; weigh CI-AKI risk vs benefit.'],
      ['Gadolinium (MRI)','eGFR <30: HIGH RISK of nephrogenic systemic fibrosis (NSF) with older agents. Use only macrocyclic agents (gadobutrol, gadoteridol). eGFR <15 or dialysis: AVOID gadolinium if at all possible.'],
      ['Nuclear Medicine / PET','Minimal nephrotoxicity. Ensure good hydration. Tracer doses generally safe across CKD stages.'],
    ].map(function(r){return '<div style="padding:10px;background:#fff7ed;border-left:4px solid #f97316;border-radius:8px"><strong>'+r[0]+'</strong><br><span style="color:#374151">'+r[1]+'</span></div>';}).join('')+'</div>'));
}

