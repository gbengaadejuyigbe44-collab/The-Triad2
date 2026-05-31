// ════════════════════════════════════════════════════════════════
// HYPOTENSION TABS
// ════════════════════════════════════════════════════════════════
function tabHypoPrev(el_) {
  el_.appendChild(secTitle('🛡️','Hypotension Prevention','Preventing hypotensive episodes through medication review, lifestyle, and risk reduction','#a855f7'));
  el_.appendChild(notebox('💡 Most hypotensive episodes are <strong>preventable</strong>. The most common causes are medication-related, dehydration, and prolonged standing — all modifiable with the right approach.','#faf5ff','#e9d5ff'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#a855f7">💊 Medication Review — Most Common Preventable Cause</h3>'));
  el_.appendChild(card('High-Risk Medications to Review','#a855f7','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug Class</th><th>Risk</th><th>Prevention Strategy</th></tr></thead><tbody>'+[
    ['Antihypertensives (all)','Excessive BP lowering, especially in elderly or volume-depleted','Review dose regularly. Check lying/standing BP. Reduce dose if SBP <100 or symptomatic.'],
    ['Diuretics (Furosemide, HCTZ)','Volume depletion, electrolyte imbalance','Monitor weight, hydration, electrolytes. Hold during illness, vomiting, or diarrhoea.'],
    ['Alpha-blockers (Doxazosin)','First-dose and postural hypotension','Start at lowest dose at bedtime. Warn patient about standing up slowly.'],
    ['Nitrates (GTN, Isosorbide)','Vasodilation, especially with PDE-5 inhibitors','Avoid combination with sildenafil/tadalafil — severe refractory hypotension risk.'],
    ['Antipsychotics (Quetiapine, Clozapine)','Alpha-1 blockade causing postural drop','Start low. Monitor postural BP. Avoid dehydration.'],
    ['Tricyclic antidepressants','Alpha-1 blockade','Use lowest effective dose. Prefer SNRIs/SSRIs in elderly.'],
    ['Levodopa / Dopamine agonists','Central dopaminergic effect','Time medications carefully. Fludrocortisone or Midodrine may be needed.'],
    ['Insulin / Sulphonylureas','Hypoglycaemia-induced haemodynamic instability','Avoid skipped meals. Glucose monitoring. Adjust dose in elderly or CKD.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#dc2626;font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#a855f7">🧍 Orthostatic Hypotension Prevention</h3>'));
  el_.appendChild(card('Lifestyle Strategies to Prevent Postural Drops','#a855f7','<div style="display:flex;flex-direction:column;gap:8px">'+[
    ['🐌 Rise slowly','Sit on the edge of the bed for 30–60 seconds before standing. Never jump up suddenly, especially in the morning.'],
    ['💧 Stay hydrated','Drink 2–3L of fluid daily unless contraindicated. Dehydration is the single biggest preventable trigger.'],
    ['🧦 Compression stockings','Grade II compression stockings reduce venous pooling in legs. Particularly useful in autonomic neuropathy and varicose veins.'],
    ['🏋️ Physical countermanoeuvres','Cross legs, clench thighs, or squat briefly when feeling faint. Raises BP by 10–20 mmHg temporarily.'],
    ['🍽️ Small frequent meals','Large meals cause postprandial hypotension — blood pools in gut. Eat smaller, more frequent meals. Avoid large alcohol intake.'],
    ['🛏️ Elevated head of bed','Sleeping with head of bed raised 10–20cm reduces overnight fluid redistribution and morning postural drops.'],
    ['☀️ Avoid heat exposure','Hot baths, showers, and hot weather cause vasodilation. Shower lukewarm. Stay cool in hot weather.'],
    ['🚶 Regular exercise','Aerobic exercise improves vascular tone and autonomic regulation. Start gently and increase gradually.'],
  ].map(function(x){return '<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #e9d5ff55"><div style="font-size:20px;flex-shrink:0">'+x[0].split(' ')[0]+'</div><div><div style="font-size:13px;font-weight:700;color:#7c3aed;margin-bottom:2px">'+x[0].split(' ').slice(1).join(' ')+'</div><div style="font-size:13px;color:#374151;line-height:1.5">'+x[1]+'</div></div></div>';}).join('')+'</div>'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#a855f7">👥 High-Risk Populations</h3>'));
  el_.appendChild(card('Who Needs Extra Vigilance','#a855f7','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Population</th><th>Key Risk</th><th>Prevention Focus</th></tr></thead><tbody>'+[
    ['Elderly (≥65 yrs)','Multiple medications, reduced baroreceptor sensitivity, dehydration','Medication review, standing BP checks, fall prevention, hydration'],
    ['Diabetes mellitus','Autonomic neuropathy, hypoglycaemia, diuretic use','Standing BP, glucose monitoring, compression stockings, hydration'],
    ['Heart failure','Volume fluctuations, diuretic use, low cardiac output','Daily weight monitoring, medication timing, fluid balance'],
    ['Parkinson disease','Autonomic dysfunction, Levodopa effect','Time medications, rise slowly, compression stockings, Midodrine'],
    ['Post-surgical patients','Anaesthesia, blood loss, bed rest, dehydration','Early mobilisation, IV fluids, gradual sitting before standing'],
    ['Pregnancy','Aortocaval compression, vasodilation','Left lateral position, avoid prolonged standing, hydration'],
    ['Adrenal insufficiency','Cortisol deficiency impairs vascular tone','Stress dosing during illness, medic-alert bracelet, hydrocortisone supply'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#7c3aed">'+r[0]+'</td><td style="font-size:12px;color:#dc2626">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#a855f7">📋 When to Seek Medical Review</h3>'));
  el_.appendChild(notebox('🚨 Seek <strong>immediate medical attention</strong> if hypotension is accompanied by: chest pain, difficulty breathing, altered consciousness, severe dizziness, or inability to stand. These suggest haemodynamic compromise requiring emergency assessment.','#fef2f2','#fecaca'));
  el_.appendChild(card('Red Flags Requiring Urgent Review','#dc2626','<div style="display:flex;flex-direction:column;gap:6px">'+[
    '🔴 Syncope (loss of consciousness) — always requires investigation',
    '🔴 BP <90/60 mmHg on home monitoring — even without symptoms',
    '🔴 New onset hypotension in a previously normotensive patient',
    '🔴 Hypotension with fever, rigors, or signs of infection — possible sepsis',
    '🔴 Hypotension after starting a new medication',
    '🔴 Repeated hypotensive episodes despite preventive measures',
    '🔴 Associated chest pain, breathlessness, or palpitations',
  ].map(function(r){return '<div style="font-size:13px;color:#1e293b;padding:7px 0;border-bottom:1px solid #fecaca55;line-height:1.5">'+r+'</div>';}).join('')+'</div>'));
}

function tabHypoClass(el_) {
  el_.appendChild(secTitle('🔍','Hypotension Classification','Definition, types, and severity assessment','#a855f7'));
  el_.appendChild(notebox('📌 <strong>Standard definition:</strong> Systolic BP <90 mmHg OR Diastolic BP <60 mmHg OR Mean Arterial Pressure (MAP) <65 mmHg. Orthostatic hypotension: SBP drop ≥20 mmHg or DBP drop ≥10 mmHg within 3 minutes of standing.','#faf5ff','#e9d5ff'));
  // Classifier
  var tc=card('Hypotension Severity Classifier','#a855f7','');
  tc.querySelector('.card-body').innerHTML='<button id="hypo-use-last-btn" onclick="useLastBPInHypo()" style="display:flex;align-items:center;gap:6px;width:100%;padding:8px 12px;margin-bottom:10px;background:#faf5ff;color:#7c3aed;border:1.5px solid #e9d5ff;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.2s,color 0.2s,border-color 0.2s">⏱ Use last BP reading from tracker</button><div style="margin-bottom:10px"><label class="lbl">Patient Name</label><input id="hy-name" type="text" class="inp" placeholder="e.g. John Smith" oninput="saveHypoState()"></div><div style="display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap;margin-bottom:12px"><div><label class="lbl">Systolic (mmHg)</label><input id="hy-s" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" style="width:100px" placeholder="85" oninput="calcHypoMap();saveHypoState()"></div><span style="font-size:20px;color:#94a3b8;padding-bottom:8px">/</span><div><label class="lbl">Diastolic (mmHg)</label><input id="hy-d" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" style="width:100px" placeholder="55" oninput="calcHypoMap();saveHypoState()"></div></div><div id="hy-map-display" style="margin-bottom:8px;padding:8px 12px;background:#faf5ff;border:1px solid #e9d5ff;border-radius:8px;font-size:13px;color:#7c3aed">MAP will calculate automatically when BP is entered.</div><div class="g4" style="margin-bottom:10px"><div><label class="lbl">Age (years)</label><input id="hy-age" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 45" oninput="saveHypoState()"></div><div><label class="lbl">Gender</label><select id="hy-gen" class="inp" onchange="saveHypoState()"><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div><div><label class="lbl">Weight (kg)</label><input id="hy-wt" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 70" oninput="calcHypoBMI();saveHypoState()"></div><div><label class="lbl">Height (cm)</label><input id="hy-ht" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 165" oninput="calcHypoBMI();saveHypoState()"></div></div><div style="margin-bottom:10px;padding:10px 12px;background:#faf5ff;border:1px solid #e9d5ff;border-radius:8px;font-size:13px;color:#7c3aed" id="hy-bmi-display">BMI will calculate automatically when weight and height are entered.</div><div class="g2" style="margin-bottom:10px"><div><label class="lbl">Heart Rate (bpm)</label><input id="hy-hr" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 102" oninput="saveHypoState()"></div><div><label class="lbl">Respiratory Rate (breaths/min)</label><input id="hy-rr" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 22" oninput="saveHypoState()"></div></div><div style="margin-bottom:12px"><label class="lbl">Underlying Condition(s)</label><select id="hy-cond" class="inp" onchange="saveHypoState()"><option value="">None / Unknown</option><option value="dm">Diabetes Mellitus</option><option value="hf">Heart Failure</option><option value="ckd">CKD</option><option value="autonomic">Autonomic Neuropathy</option><option value="adrenal">Adrenal Insufficiency</option><option value="sepsis">Suspected Sepsis</option><option value="preg">Pregnancy</option><option value="meds">Antihypertensive Medications</option></select></div><button id="hy-btn" style="width:100%;padding:10px;background:#a855f7;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;margin-bottom:4px">Classify & Get Treatment Plan →</button><div id="hy-res"></div>';
  el_.appendChild(tc);
  setTimeout(restoreHypoState, 0);
  window.calcHypoMap=function(){
    var sys=parseFloat(document.getElementById('hy-s').value);
    var dia=parseFloat(document.getElementById('hy-d').value);
    var disp=document.getElementById('hy-map-display');
    if(sys>0&&dia>0){
      var map=Math.round((sys+2*dia)/3);
      var mapColor=map<50?'#7c3aed':map<65?'#dc2626':map<70?'#d97706':'#16a34a';
      var mapNote=map<50?'🚨 Critical — cardiovascular collapse threshold':map<65?'⚠️ Below SSC perfusion threshold (<65 mmHg)':map<70?'Low-normal MAP — monitor closely':'MAP within normal range (65–100 mmHg)';
      disp.innerHTML='<strong>MAP: '+map+' mmHg</strong> &nbsp;·&nbsp; <span style="color:'+mapColor+';font-weight:700">'+mapNote+'</span>';
      disp.style.background=map<65?'#fef2f2':'#faf5ff';
      disp.style.borderColor=map<65?'#fca5a5':'#e9d5ff';
    } else {
      disp.innerHTML='MAP will calculate automatically when BP is entered.';
      disp.style.background='#faf5ff'; disp.style.borderColor='#e9d5ff';
    }
  };
  window.calcHypoBMI=function(){
    var wt=parseFloat(document.getElementById('hy-wt').value);
    var ht=parseFloat(document.getElementById('hy-ht').value);
    var disp=document.getElementById('hy-bmi-display');
    if(wt>0&&ht>0){
      var bmi=Math.round(wt/Math.pow(ht/100,2)*10)/10;
      var cat=bmi<18.5?'Underweight':bmi<25?'Normal weight':bmi<30?'Overweight':'Obese';
      var col=bmi<18.5?'#d97706':bmi<25?'#16a34a':bmi<30?'#d97706':'#dc2626';
      disp.innerHTML='<strong>BMI: '+bmi+' kg/m²</strong> — <span style="color:'+col+';font-weight:700">'+cat+'</span>';
      disp.style.background=bmi<25?'#f0fdf4':'#fff7ed'; disp.style.borderColor=bmi<25?'#bbf7d0':'#fed7aa';
    } else { disp.innerHTML='BMI will calculate automatically when weight and height are entered.'; }
  };
  document.getElementById('hy-btn').onclick=function(){
    var sys=parseInt(document.getElementById('hy-s').value), dia=parseInt(document.getElementById('hy-d').value);
    var hyAge=parseInt(document.getElementById('hy-age').value)||null;
    var hyGen=document.getElementById('hy-gen').value;
    var hyWt=parseFloat(document.getElementById('hy-wt').value)||null;
    var hyHt=parseFloat(document.getElementById('hy-ht').value)||null;
    var hyBmi=hyWt&&hyHt?Math.round(hyWt/Math.pow(hyHt/100,2)*10)/10:null;
    var hyCond=document.getElementById('hy-cond').value;
    var hyHR=parseInt(document.getElementById('hy-hr').value)||null;
    var hyRR=parseInt(document.getElementById('hy-rr').value)||null;
    var hyName=document.getElementById('hy-name').value;
    if(isNaN(sys)||isNaN(dia)){document.getElementById('hy-res').innerHTML='<p style="color:#ef4444;font-size:13px">Enter valid values.</p>';return;}
    var map=Math.round((sys+2*dia)/3);
    var sev;
    // ESC + Surviving Sepsis Campaign classification
    if(sys<70||map<50) sev={l:'🚨 Shock / Cardiovascular Collapse',c:'#7c3aed',bg:'#faf5ff',msg:'Cardiovascular collapse. Immediate emergency response — ABCDE approach. Establish 2 large-bore IV access, 0.9% NS 500ml–1L bolus, vasopressors if MAP remains <65 despite fluids. Activate ICU/resuscitation team immediately.'};
    else if(sys<=90&&map<65) sev={l:'⚠ Significant Hypotension',c:'#dc2626',bg:'#fef2f2',msg:'SBP ≤90 mmHg with MAP <65 mmHg — meets ESC + SSC haemodynamic threshold for shock. Urgent assessment for end-organ hypoperfusion (GCS, urine output, lactate, skin perfusion). IV access, fluid challenge, identify and treat cause.'};
    else if(sys<=90) sev={l:'Moderate Hypotension',c:'#ea580c',bg:'#fff7ed',msg:'SBP ≤90 mmHg but MAP ≥65 mmHg — hypotension without confirmed shock physiology. Urgent evaluation. IV fluid challenge if appropriate. Check orthostatic BP, review medications, assess cardiac function.'};
    else if(sys<100) sev={l:'Mild Hypotension',c:'#d97706',bg:'#fffbeb',msg:'SBP 91–99 mmHg — below normal range. Symptomatic assessment. Review antihypertensives and diuretics. Check orthostatic BP (lying and standing). Monitor closely.'};
    else sev={l:'Normal / Low-Normal',c:'#16a34a',bg:'#f0fdf4',msg:'SBP ≥100 mmHg — no clinical hypotension. If symptomatic (dizziness, presyncope), check orthostatic BP and review medications.'};
    var hypoTx={
      'Shock / Cardiovascular Collapse':{action:'Cardiovascular collapse — immediate resuscitation. ABCDE: Airway (protect if GCS ≤8), Breathing (high-flow O₂), Circulation (2 large-bore IVs, 0.9% NS 500ml–1L bolus, repeat if MAP <65). Identify cause: haemorrhage, sepsis, PE, tension pneumothorax, cardiac tamponade, anaphylaxis.',drugs:'Noradrenaline 0.05–0.5mcg/kg/min (first-line vasopressor). Adrenaline if anaphylaxis or cardiac arrest. Vasopressin 0.03u/min if refractory. Dobutamine if cardiogenic shock. Hydrocortisone 200mg/day if adrenal crisis suspected.',followup:'ICU admission mandatory. Arterial line for continuous monitoring. Lactate clearance target >10% per 2hrs. Reassess every 15 minutes.',urgency:'EMERGENCY',uc:'#7c3aed'},
      'Significant Hypotension':{action:'SBP ≤90 + MAP <65 — meets SSC haemodynamic threshold. IV access immediately. Fluid challenge 250–500ml NS. 12-lead ECG. Assess for end-organ hypoperfusion: GCS, urine output, skin temperature, capillary refill. Check lactate.',drugs:'IV fluids first. If no response to 1–2L: consider vasopressors. Hold antihypertensives. Treat underlying cause.',followup:'Continuous monitoring. HDU or ICU if not responding to fluids within 30 minutes.',urgency:'URGENT',uc:'#dc2626'},
      'Moderate Hypotension':{action:'SBP ≤90 but MAP ≥65 — hypotension without confirmed shock physiology. Urgent assessment. IV access. Fluid challenge if clinically appropriate. Check orthostatic BP. Review all medications.',drugs:'Hold antihypertensives and diuretics if drug-related. Oral or IV fluids based on volume status.',followup:'Recheck BP in 30–60 minutes. Escalate if MAP falls <65 or symptoms worsen.',urgency:'URGENT',uc:'#ea580c'},
      'Mild Hypotension':{action:'SBP 91–99 mmHg. Symptomatic assessment. Review antihypertensives, diuretics, alpha-blockers. Orthostatic BP measurement. Encourage oral fluids if tolerated.',drugs:'Hold or reduce antihypertensives if drug-related. Oral fluids 2–3L/day. IV fluids only if clinically dehydrated.',followup:'Recheck in 1–2 hours. Outpatient follow-up in 48–72 hours if stable.',urgency:'NON-URGENT',uc:'#d97706'},
      'Normal / Low-Normal':{action:'No clinical hypotension. If symptomatic (dizziness, presyncope), perform orthostatic BP test (lying and standing at 1 and 3 minutes). Review medications.',drugs:'No acute intervention required.',followup:'Outpatient review. Orthostatic testing if symptoms persist.',urgency:'ROUTINE',uc:'#16a34a'},
    };
    var sevLabel=sev.l.replace('🚨 ','').replace('⚠ ','');
    var ht=hypoTx[sevLabel]||hypoTx['Mild Hypotension'];
    var hyHtml='<div style="border-radius:12px;overflow:hidden;border:2px solid '+sev.c+'">';
    var mapHypoColor=map<50?'#7c3aed':map<65?'#dc2626':map<70?'#ea580c':'#16a34a';
    var mapHypoLabel=map<50?'Critical — cardiovascular collapse':map<65?'Below SSC threshold — shock':map<70?'Borderline — close monitoring':'Adequate perfusion pressure';
    hyHtml+='<div style="padding:14px 18px;background:'+sev.bg+'">';
    hyHtml+='<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px">';
    hyHtml+='<div style="font-size:17px;font-weight:800;color:'+sev.c+'">'+sev.l+'</div>';
    hyHtml+='<div style="font-size:12px;color:#fff;background:'+sev.c+';padding:2px 10px;border-radius:20px">'+ht.urgency+'</div>';
    hyHtml+='</div>';
    hyHtml+='<div style="display:flex;gap:8px;flex-wrap:wrap">';
    hyHtml+='<div style="font-size:12px;font-weight:700;color:#475569;background:#fff;padding:4px 12px;border-radius:20px;border:1px solid #e2e8f0">BP: '+sys+'/'+dia+' mmHg</div>';
    hyHtml+='<div style="font-size:12px;font-weight:800;color:'+mapHypoColor+';background:#fff;padding:4px 12px;border-radius:20px;border:2px solid '+mapHypoColor+'">MAP: '+map+' mmHg</div>';
    if(hyHR){var hrColor=hyHR>100?'#dc2626':hyHR<50?'#7c3aed':'#16a34a';var hrLabel=hyHR>100?'Tachycardia':hyHR<50?'Bradycardia':'Normal HR';hyHtml+='<div style="font-size:12px;font-weight:700;color:'+hrColor+';background:#fff;padding:4px 12px;border-radius:20px;border:1px solid '+hrColor+'">HR: '+hyHR+' bpm &middot; '+hrLabel+'</div>';}
    if(hyRR){var rrColor=hyRR>=22?'#dc2626':'#16a34a';var rrLabel=hyRR>=22?'Tachypnoea':'Normal RR';hyHtml+='<div style="font-size:12px;font-weight:700;color:'+rrColor+';background:#fff;padding:4px 12px;border-radius:20px;border:1px solid '+rrColor+'">RR: '+hyRR+' breaths/min &middot; '+rrLabel+'</div>';}
    hyHtml+='</div>';
    hyHtml+='<div style="margin-top:8px;font-size:12px;color:'+mapHypoColor+';font-weight:700">'+mapHypoLabel+'</div>';
    hyHtml+='</div>';
    hyHtml+='<div style="padding:14px 18px;background:#fff;border-top:1px solid #e2e8f0;display:flex;flex-direction:column;gap:10px">';
    // MAP interpretation card for hypo
    var hypoMapInterp, hypoMapBg, hypoMapBorder;
    if(map<50){hypoMapInterp='MAP '+map+' mmHg — critically low. Cardiovascular collapse imminent or present. Immediate vasopressor support required. Target MAP ≥65 mmHg per SSC guidelines.';hypoMapBg='#faf5ff';hypoMapBorder='#7c3aed';}
    else if(map<65){hypoMapInterp='MAP '+map+' mmHg — below SSC threshold of 65 mmHg. Inadequate perfusion pressure for vital organs (brain, kidneys, heart). Fluid resuscitation urgently — vasopressors if no response.';hypoMapBg='#fef2f2';hypoMapBorder='#dc2626';}
    else if(map<70){hypoMapInterp='MAP '+map+' mmHg — borderline. Just above SSC threshold. Monitor closely — any further drop crosses into shock territory. Reassess every 15–30 minutes.';hypoMapBg='#fff7ed';hypoMapBorder='#ea580c';}
    else{hypoMapInterp='MAP '+map+' mmHg — adequate perfusion pressure maintained (target ≥65 mmHg). Tissue oxygenation is likely preserved. Monitor trend and address underlying cause.';hypoMapBg='#f0fdf4';hypoMapBorder='#16a34a';}
    hyHtml+='<div style="padding:10px 14px;background:'+hypoMapBg+';border-radius:8px;border-left:4px solid '+hypoMapBorder+'">';
    hyHtml+='<div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">📊 Mean Arterial Pressure (MAP)</div>';
    hyHtml+='<div style="font-size:14px;font-weight:800;color:'+hypoMapBorder+';margin-bottom:4px">'+map+' mmHg <span style="font-size:11px;font-weight:500;color:#64748b">(SSC Target: ≥65 mmHg)</span></div>';
    hyHtml+='<div style="font-size:13px;color:#1e293b;line-height:1.6">'+hypoMapInterp+'</div>';
    hyHtml+='</div>';
    hyHtml+='<div style="padding:10px 14px;background:#fef2f2;border-radius:8px;border-left:4px solid '+ht.uc+'"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">Clinical Action</div><div style="font-size:13px;color:#1e293b;line-height:1.7">'+ht.action+'</div></div>';
    hyHtml+='<div style="padding:10px 14px;background:#f8fafc;border-radius:8px;border-left:4px solid #0ea5e9"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">💊 Pharmacotherapy</div><div style="font-size:13px;color:#1e293b;line-height:1.7">'+ht.drugs+'</div></div>';
    hyHtml+='<div style="padding:10px 14px;background:#f0f9ff;border-radius:8px;border-left:4px solid #38bdf8"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">📅 Follow-up</div><div style="font-size:13px;color:#1e293b">'+ht.followup+'</div></div>';
    hyHtml+='</div></div>';
    // Personalised notes
    var hyNotes=[];
    if(hyName) hyHtml='<div style="font-size:13px;font-weight:700;color:#1e293b;padding:8px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0">👤 '+hyName+'</div>'+hyHtml;
    if(hyAge&&hyAge>=65) hyNotes.push('👴 <strong>Elderly (≥65 yrs):</strong> Higher risk of orthostatic hypotension and falls. Check lying and standing BP. Review all medications especially antihypertensives, diuretics, and alpha-blockers. Avoid aggressive fluid resuscitation — risk of pulmonary oedema.');
    if(hyAge&&hyAge<18) hyNotes.push('👶 <strong>Paediatric patient:</strong> Normal BP ranges differ by age. Refer to paediatric haemodynamic guidelines for age-appropriate thresholds.');
    if(hyGen==='female') hyNotes.push('👩 <strong>Female patient:</strong> Consider ectopic pregnancy if of reproductive age with hypotension and abdominal pain. Postpartum haemorrhage if recently delivered. HELLP syndrome if pregnant.');
    if(hyBmi&&hyBmi<18.5) hyNotes.push('⚠️ <strong>Underweight (BMI '+hyBmi+'):</strong> Consider malnutrition, malignancy, or adrenal insufficiency as contributors. Low albumin worsens haemodynamic tolerance.');
    if(hyCond==='dm') hyNotes.push('🩸 <strong>Diabetes Mellitus:</strong> Autonomic neuropathy common — impairs compensatory tachycardia. Check orthostatic BP. Hypoglycaemia can precipitate haemodynamic instability. Check glucose immediately.');
    if(hyCond==='hf') hyNotes.push('💙 <strong>Heart Failure:</strong> Cardiogenic shock must be excluded. Check BNP, troponin, ECHO. Cautious fluid challenge — avoid volume overload. Dobutamine if cardiogenic cause confirmed.');
    if(hyCond==='ckd') hyNotes.push('🫘 <strong>CKD:</strong> Reduced ability to regulate fluid and electrolytes. Monitor K⁺ closely. AKI likely if hypoperfused. Cautious fluid resuscitation — monitor urine output closely.');
    if(hyCond==='autonomic') hyNotes.push('🧠 <strong>Autonomic Neuropathy:</strong> Impaired sympathetic response — heart rate may not rise appropriately with hypotension. Orthostatic hypotension highly likely. Fludrocortisone or Midodrine may be indicated long-term.');
    if(hyCond==='adrenal') hyNotes.push('⚠️ <strong>Adrenal Insufficiency:</strong> Refractory hypotension not responding to fluids/vasopressors — consider Addisonian crisis. Give Hydrocortisone 100mg IV immediately if suspected. Check morning cortisol and ACTH.');
    if(hyCond==='sepsis') hyNotes.push('🦠 <strong>Suspected Sepsis:</strong> Follow Surviving Sepsis Campaign bundle — blood cultures ×2 before antibiotics, broad-spectrum antibiotics within 1 hour, IV fluids 30ml/kg, lactate measurement, vasopressors if MAP <65 despite fluids.');
    if(hyCond==='preg') hyNotes.push('🤰 <strong>Pregnancy:</strong> Hypotension in pregnancy — consider aortocaval compression (position left lateral tilt), haemorrhage (placenta praevia, abruption), PE, or sepsis. Avoid supine position. Urgent obstetric review.');
    // HR / RR clinical interpretation
    if(hyHR&&hyHR>100&&(sys<90||map<65)) hyNotes.push('💓 <strong>Tachycardia (HR '+hyHR+' bpm) + Hypotension:</strong> Compensatory tachycardia — suggests hypovolaemic, distributive (septic/anaphylactic), or obstructive shock. If HR does NOT rise appropriately despite low BP, consider autonomic failure, beta-blocker effect, or neurogenic shock.');
    else if(hyHR&&hyHR>100) hyNotes.push('💓 <strong>Tachycardia (HR '+hyHR+' bpm):</strong> HR >100 bpm — potential compensatory response to haemodynamic stress, pain, fever, anaemia, or arrhythmia. Assess in context of BP trend and clinical picture.');
    if(hyHR&&hyHR<50) hyNotes.push('🫀 <strong>Bradycardia (HR '+hyHR+' bpm) + Hypotension:</strong> ⚠️ High-risk combination. Consider: complete heart block, sick sinus syndrome, inferior MI with vagal surge, neurogenic shock (warm + brady = spinal injury), beta-blocker/calcium-channel blocker toxicity, Addisonian crisis. Atropine 0.5–1mg IV if symptomatic. Prepare for pacing if refractory.');
    if(hyRR&&hyRR>=22&&(sys<90||map<65)) hyNotes.push('🌬️ <strong>Tachypnoea (RR '+hyRR+' breaths/min) + Hypotension:</strong> Meets qSOFA criteria (RR ≥22 + SBP ≤100). Metabolic acidosis compensation (lactate↑, DKA, uraemia), pulmonary embolism, or pneumonia with septic physiology are key differentials. Obtain ABG and lactate immediately.');
    else if(hyRR&&hyRR>=22) hyNotes.push('🌬️ <strong>Tachypnoea (RR '+hyRR+' breaths/min):</strong> RR ≥22 breaths/min — one of three qSOFA criteria. Consider PE, sepsis, metabolic acidosis, pulmonary oedema, or pain/anxiety as causes. Check SpO₂, ABG, and CXR.');
    if(hyCond==='meds') hyNotes.push('💊 <strong>Antihypertensive Medications:</strong> Drug-induced hypotension — review timing of last dose. Hold antihypertensives. Oral fluids if mild. IV fluids if moderate. Check for interactions (e.g. sildenafil + nitrates).');
    if(hyNotes.length){
      hyHtml+='<div style="margin-top:10px;padding:14px 16px;background:#fafafa;border:1px solid #e9d5ff;border-radius:10px"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:10px">👤 Personalised Clinical Notes</div>'+hyNotes.map(function(n){return '<div style="font-size:13px;color:#1e293b;line-height:1.7;padding:8px 0;border-bottom:1px solid #f1f5f9">'+n+'</div>';}).join('')+'</div>';
    }

    // ── Recommended Investigations ────────────────────────────
    var _hyInv=[];
    // Core — every hypotension presentation
    _hyInv.push({t:'Serum Lactate',r:'Critical marker of tissue hypoperfusion. Lactate ≥2 mmol/L = elevated; ≥4 mmol/L = haemodynamic emergency. SSC 2021 target: clearance >10% per 2hrs.'});
    _hyInv.push({t:'Full Blood Count (FBC)',r:'Anaemia (haemorrhage), leukocytosis (sepsis), thrombocytopenia (DIC, sepsis, HELLP). Essential first-line.'});
    _hyInv.push({t:'Serum Electrolytes (U&E)',r:'Hyperkalaemia/hypokalaemia (Addisonian crisis, AKI). Hyponatraemia (SIADH, adrenal). Na⁺/K⁺ critical in shock states.'});
    _hyInv.push({t:'Serum Creatinine + eGFR',r:'Assess for acute kidney injury (AKI) — kidneys are the first organs to show hypoperfusion. Oliguria = urine output <0.5ml/kg/hr.'});
    _hyInv.push({t:'Random Blood Glucose',r:'Hypoglycaemia mimics and exacerbates haemodynamic instability. Must be excluded immediately — bedside glucometer.'});
    _hyInv.push({t:'12-lead ECG',r:'MI (cardiogenic shock), arrhythmia (AF, VT/VF), massive PE (S1Q3T3 pattern), cardiac tamponade (low voltage + electrical alternans).'});
    // Moderate-severe
    if(sys<=90||map<65){
      _hyInv.push({t:'Arterial Blood Gas (ABG)',r:'pH, PaO₂, PaCO₂, HCO₃⁻, BE — metabolic acidosis confirms tissue hypoperfusion. Guides ventilatory and resuscitation decisions.'});
      _hyInv.push({t:'Coagulation Screen (PT, APTT, Fibrinogen)',r:'DIC (sepsis, haemorrhage, obstetric emergency). Coagulopathy worsens outcomes. Fibrinogen <1.5g/L = significant coagulopathy.'});
      _hyInv.push({t:'Serum Troponin (hs-cTn)',r:'Rule out NSTEMI/STEMI as cause of cardiogenic shock. Also elevated in massive PE and myocarditis.'});
      _hyInv.push({t:'BNP / NT-proBNP',r:'Elevated in cardiogenic shock and acute decompensated heart failure. Helps differentiate cardiogenic from distributive shock.'});
      _hyInv.push({t:'Chest X-ray',r:'Pulmonary oedema (cardiogenic), pneumonia (septic), widened mediastinum (aortic dissection), tension pneumothorax (obstructive).'});
    }
    // Sepsis suspected
    if(hyCond==='sepsis'){
      _hyInv.push({t:'Blood Cultures ×2 (peripheral + central)',r:'Obtain BEFORE antibiotics. Two sets increase sensitivity to ~90%. SSC Bundle: cultures within 1 hour of recognition.'});
      _hyInv.push({t:'Urine Microscopy, Culture & Sensitivity (MC&S)',r:'UTI/urosepsis — commonest community sepsis source. Mid-stream or catheter specimen before antibiotics.'});
      _hyInv.push({t:'C-Reactive Protein (CRP) + Procalcitonin',r:'Bacterial infection markers. Procalcitonin >0.5 ng/mL suggests bacterial sepsis; guides antibiotic de-escalation.'});
      _hyInv.push({t:'Liver Function Tests (LFTs)',r:'Hepatic hypoperfusion (shock liver — transaminases ↑↑↑), cholestasis in sepsis, source identification.'});
    }
    // Cardiac / cardiogenic
    if(hyCond==='hf'){
      _hyInv.push({t:'Bedside Echocardiogram (POCUS)',r:'Cardiogenic shock — assess ejection fraction, wall motion abnormality, pericardial effusion, IVC collapsibility. Immediate guide to management.'});
      _hyInv.push({t:'CT Pulmonary Angiography (CTPA)',r:'If massive PE suspected (sudden hypotension, desaturation, R heart strain on ECG) — definitive diagnosis for thrombolysis decision.'});
    }
    // Adrenal
    if(hyCond==='adrenal'){
      _hyInv.push({t:'Serum Cortisol (random / 9am)',r:'Addisonian crisis — cortisol <100 nmol/L strongly suggests adrenal insufficiency. Do not delay hydrocortisone for result if clinically suspected.'});
      _hyInv.push({t:'Serum ACTH (synacthen stimulation)',r:'Differentiates primary (primary adrenal insufficiency (high ACTH)) from secondary (pituitary — low ACTH) adrenal insufficiency.'});
    }
    // Autonomic
    if(hyCond==='autonomic'){
      _hyInv.push({t:'Lying & Standing BP (orthostatic test)',r:'Confirm orthostatic hypotension: SBP drop ≥20 mmHg or DBP drop ≥10 mmHg within 3 minutes of standing. ESC 2018.'});
      _hyInv.push({t:'24-hour Ambulatory BP Monitor (ABPM)',r:'Document diurnal BP pattern, nocturnal dipping. Non-dipping = higher autonomic dysfunction risk.'});
    }
    // Pregnancy
    if(hyCond==='preg'){
      _hyInv.push({t:'Urine Beta-hCG (if not confirmed pregnant)',r:'Confirm pregnancy. Ectopic pregnancy — haemodynamic collapse with positive hCG and empty uterus on USS is surgical emergency.'});
      _hyInv.push({t:'Obstetric Ultrasound (urgent)',r:'Ectopic pregnancy, placenta praevia, abruption, fetal wellbeing. Arrange immediately with obstetric team.'});
      _hyInv.push({t:'FBC + Coagulation + LFTs + Uric Acid',r:'HELLP syndrome screen — haemolysis (Hb↓, LDH↑), elevated liver enzymes (AST/ALT), low platelets. Obstetric emergency.'});
    }
    // Medications
    if(hyCond==='meds'){
      _hyInv.push({t:'Drug levels (where applicable)',r:'Digoxin toxicity, lithium toxicity — both cause haemodynamic instability. Check levels and ECG for toxicity patterns.'});
    }
    // Elderly
    if(hyAge&&hyAge>=65){
      _hyInv.push({t:'Thyroid Function Tests (TFTs)',r:'Elderly: hypothyroidism causes bradycardia and hypotension; hyperthyroidism causes AF-related low BP. TSH is first-line.'});
    }
    // Render
    var _hyInvHtml='';
    if(_hyInv.length){
      _hyInvHtml='<div style="margin-top:14px;background:#f8fafc;border:2px solid #a855f744;border-radius:12px;overflow:hidden">';
      _hyInvHtml+='<div style="padding:10px 16px;background:#faf5ff;border-bottom:1px solid #e9d5ff;display:flex;align-items:center;gap:8px">';
      _hyInvHtml+='<span style="font-size:16px">🧪</span>';
      _hyInvHtml+='<span style="font-size:12px;font-weight:800;color:#a855f7;text-transform:uppercase;letter-spacing:0.6px">Recommended Investigations</span>';
      _hyInvHtml+='<span style="font-size:10px;color:#64748b;margin-left:4px">— SSC 2021 · ESC 2018 · NICE</span>';
      _hyInvHtml+='</div>';
      _hyInvHtml+='<div class="tbl-wrap"><table style="width:100%;border-collapse:collapse">';
      _hyInvHtml+='<thead><tr style="background:#faf5ff"><th style="padding:7px 12px;text-align:left;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.4px">Investigation</th><th style="padding:7px 12px;text-align:left;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.4px">Rationale</th></tr></thead>';
      _hyInvHtml+='<tbody>'+_hyInv.map(function(r,i){return '<tr style="background:'+(i%2===0?'#fff':'#faf5ff')+'"><td style="padding:8px 12px;font-size:13px;font-weight:600;color:#1e293b;border-bottom:1px solid #f1f5f9;white-space:nowrap;min-width:200px">'+r.t+'</td><td style="padding:8px 12px;font-size:12px;color:#475569;border-bottom:1px solid #f1f5f9;line-height:1.5">'+r.r+'</td></tr>';}).join('')+'</tbody>';
      _hyInvHtml+='</table></div>';
      _hyInvHtml+='<div style="padding:7px 12px;font-size:10px;color:#94a3b8;border-top:1px solid #e9d5ff;font-style:italic">Sources: Surviving Sepsis Campaign 2021 · ESC Guidelines on Shock 2018 · NICE NG51</div>';
      _hyInvHtml+='</div>';
    }
    hyHtml+=_hyInvHtml;
    // ── End Investigations ─────────────────────────────────────
    // ── Personalised notes based on age ────────────────────────
    var hyNotes=[];
    if(hyAge&&hyAge>=65) hyNotes.push('👴 <strong>Elderly (≥65 yrs):</strong> Higher risk of orthostatic hypotension — check lying/standing BP difference (≥20 mmHg SBP drop = orthostatic). Review all medications especially diuretics, alpha-blockers, antihypertensives. Fall risk is significant — bed rails, slow position changes, adequate hydration.');
    if(hyAge&&hyAge>=80) hyNotes.push('🧓 <strong>Very elderly (≥80 yrs):</strong> Frailty compounds haemodynamic instability. Be cautious with fluid resuscitation — pulmonary oedema risk. MAP target of 60–65 mmHg may be appropriate if well-tolerated. Vasopressor threshold is lower.');
    if(hyAge&&hyAge<18) hyNotes.push('👶 <strong>Paediatric patient (< 18 yrs):</strong> Standard adult thresholds do not apply. Age-adjusted normal BP ranges must be used. Neonates and infants may have MAP <40 mmHg as normal. Refer to paediatric shock protocols — fluid bolus 10–20 ml/kg (not 30 ml/kg as in adults).');
    if(hyAge&&hyAge<1) hyNotes.push('🍼 <strong>Infant (< 1 yr):</strong> Systolic BP <60 mmHg suggests shock in neonates. Normal MAP in neonates approximates gestational age (e.g. 30 wks gestation → MAP ~30 mmHg). Immediate paediatric/neonatal team involvement essential.');
    if(hyAge&&hyAge>=18&&hyAge<65&&hyGen==='female') hyNotes.push('🤰 <strong>Female of childbearing age:</strong> Always exclude pregnancy as a cause — both physiological (progesterone-mediated vasodilation) and pathological (ectopic pregnancy, postpartum haemorrhage) causes must be considered. Check urine βhCG.');
    if(hyHR&&hyHR>100&&hyAge) hyNotes.push('💓 <strong>Compensatory tachycardia noted:</strong> HR '+hyHR+' bpm with hypotension suggests haemodynamic compromise. This pattern is consistent with early/compensated shock. In elderly patients, tachycardia may be blunted by beta-blockers — do not rely on HR alone.');
    if(hyNotes.length>0){
      hyHtml+='<div style="padding:12px 14px;background:#faf5ff;border-radius:8px;border-left:4px solid #a855f7;margin-top:4px">';
      hyHtml+='<div style="font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">👤 Age-Based Clinical Notes</div>';
      hyNotes.forEach(function(n){ hyHtml+='<div style="font-size:13px;color:#1e293b;line-height:1.6;margin-bottom:6px;padding-left:4px">'+n+'</div>'; });
      hyHtml+='</div>';
    }
    document.getElementById('hy-res').innerHTML=hyHtml;
    var hyRes = document.getElementById('hy-res');
    hyRes.insertAdjacentHTML('beforeend', '<button class="result-print-btn" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-top:14px;padding:11px;background:#f0f9ff;color:#0369a1;border:2px solid #bae6fd;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit;" onclick="printClassifierResult(\'hy-res\',\'Hypotension Assessment\')">🖨️ Print This Assessment</button>');
    wrapTables(document.getElementById('hy-res'));
  };
  el_.appendChild(card('Types of Hypotension','#a855f7','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Type</th><th>Definition</th></tr></thead><tbody>'+HYPO_TYPES.map(function(t){return '<tr class="tbl-row"><td style="font-weight:700;color:'+t.color+';white-space:nowrap">'+t.type+'</td><td style="background:'+t.bg+'">'+t.def+'</td></tr>';}).join('')+'</tbody></table></div>'));
  el_.appendChild(card('Orthostatic Hypotension — Measurement Protocol','#a855f7','<ol style="padding-left:20px;font-size:13px;line-height:2">'+['Patient supine for ≥5 minutes — record BP and HR','Patient stands — record BP and HR at 1 minute','Record again at 3 minutes','Positive if: SBP drop ≥20 mmHg OR DBP drop ≥10 mmHg','Note: Symptomatic drop regardless of magnitude also counts'].map(function(s,i){return '<li>'+s+'</li>';}).join('')+'</ol><div class="notebox" style="background:#faf5ff;border:1px solid #e9d5ff;margin-top:10px">💡 Check HR response: HR rise >30 bpm after standing suggests hypovolaemia. If HR does NOT rise with OH, suspect <strong>autonomic failure</strong>.</div>'));
}

function tabHypoCauses(el_) {
  el_.appendChild(secTitle('⚠️','Causes of Hypotension','Differential diagnosis by mechanism and clinical context','#a855f7'));
  el_.appendChild(accordion(HYPO_CAUSES.map(function(c){return{label:'📁 '+c.cat,items:c.items};}), '#a855f7', function(panel,item){
    panel.innerHTML=item.items.map(function(i){return '<div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #e9d5ff55;font-size:13px"><span style="color:#a855f7;flex-shrink:0">●</span>'+i+'</div>';}).join('');
  }));
  el_.appendChild(card('Drug Classes Causing Hypotension','#6d28d9','<div class="tbl-wrap"><table><thead><tr style="background:#ede9fe"><th>Drug Class</th><th>Mechanism</th><th>Clinical Note</th></tr></thead><tbody>'+[['Antihypertensives (all classes)','Reduced SVR or cardiac output','Dose-dependent; worsened by dehydration or illness'],['Diuretics','Volume depletion','Especially thiazides and loop diuretics in elderly'],['Alpha-blockers (Doxazosin)','Vasodilation','First-dose hypotension — give at bedtime initially'],['Tricyclic antidepressants','Alpha-1 blockade','Postural hypotension common; especially amitriptyline'],['Antipsychotics','Alpha-1 blockade + H1 block','Chlorpromazine, quetiapine, clozapine particularly problematic'],['PDE-5 inhibitors (Sildenafil)','Vasodilation','⚠ DANGEROUS with nitrates — severe refractory hypotension'],['Levodopa / Dopamine agonists','Central dopaminergic','Common in Parkinson disease patients; peaks at medication Tmax'],['Opioids','Histamine release + vasodilation','IV morphine more than oral; worse with volume depletion']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td>'+r[1]+'</td><td style="font-size:12px;color:#7c3aed">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));
}

function tabHypoEval(el_) {
  el_.appendChild(secTitle('📋','Hypotension Evaluation','Systematic workup to identify the underlying cause','#a855f7'));
  el_.appendChild(card('Bedside Assessment','#a855f7','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Assessment</th><th>Positive Finding</th><th>Suggests</th></tr></thead><tbody>'+[['Orthostatic BP measurement (lying/standing)','SBP drop ≥20 or DBP drop ≥10 on standing','Orthostatic hypotension — see causes'],['JVP / neck veins assessment','Low JVP','Hypovolaemia or distributive shock'],['JVP / neck veins assessment','High JVP','Cardiogenic, obstructive (PE/tamponade)'],['Skin temperature and perfusion','Cold/clammy + slow cap refill','Cardiogenic or hypovolaemic shock'],['Skin temperature and perfusion','Warm/flushed + fast cap refill','Distributive (septic) shock'],['Lung auscultation','Bilateral crackles','Cardiogenic — pulmonary oedema'],['Cardiac exam','Muffled heart sounds + hypotension + distended veins','Cardiac tamponade (Beck\'s triad)'],['Abdominal exam','Pulsatile mass or bruit','AAA or renal artery stenosis'],['Skin exam','Urticaria, angioedema, stridor','Anaphylaxis']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#a855f7">'+r[1]+'</td><td>'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));
  el_.appendChild(card('Investigations','#a855f7','<div class="g2">'+[['🩸 Bloods','FBC (Hb, WCC, platelets), BMP (electrolytes, creatinine), glucose, lactate, LFTs, lipase, troponin, BNP/NT-proBNP, blood cultures x2 (if sepsis suspected), coagulation (INR/APTT), blood gas (pH, HCO3)'],['🫀 Cardiac','12-lead EKG (MI, arrhythmia, PE pattern), ECHO (wall motion, pericardial effusion, EF, valve), CT pulmonary angiography if PE suspected'],['🔬 Microbiology','Blood cultures, urine M&C, sputum if productive cough, wound swab if surgical, LP if meningitis suspected'],['🩻 Imaging','Chest X-ray (cardiomegaly, pulmonary oedema, pneumonia), Bedside POCUS (cardiac, IVC, abdominal aorta), CT if AAA, dissection or PE suspected']].map(function(x){return '<div style="padding:14px;background:#f8fafc;border:1px solid #e9d5ff;border-radius:10px"><div style="font-size:14px;font-weight:700;margin-bottom:8px">'+x[0]+'</div><div style="font-size:12px;color:#374151;line-height:1.7">'+x[1]+'</div></div>';}).join('')+'</div>'));
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#a855f7">🧪 Routine Lab Investigations</h3>'));
  el_.appendChild(card('First-Line Bloods — All Hypotension Presentations','#a855f7','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Test</th><th>What to Look For</th><th>Clinical Significance</th></tr></thead><tbody>'+[
    ['FBC','Hb (anaemia), WCC (infection/sepsis), Platelets (DIC, HELLP)','Anaemia worsens haemodynamic tolerance; neutrophilia/lymphopenia suggests sepsis'],
    ['U&E / BMP','Na⁺, K⁺, Creatinine, eGFR, Urea','Hyponatraemia (Addison, SIADH), hyperkalaemia (Addison, renal failure), AKI from hypoperfusion'],
    ['Blood Glucose','Hypo or hyperglycaemia','Hypoglycaemia mimics and causes haemodynamic instability; DKA/HHS can present with shock'],
    ['Serum Lactate','>2 mmol/L = hypoperfusion; >4 = severe shock','Best marker of tissue perfusion; guides resuscitation adequacy'],
    ['Troponin (hs-cTnI/T)','Elevation suggests myocardial injury','MI as precipitant; also rises in PE, myocarditis, demand ischaemia from any shock'],
    ['BNP / NT-proBNP','Elevated in cardiac volume/pressure overload','Differentiates cardiogenic from non-cardiogenic cause; guides fluid strategy'],
    ['LFTs','ALT, AST, Bilirubin, ALP','Shock liver (ischaemic hepatitis) — transaminases rise rapidly in low-flow states'],
    ['Coagulation (INR/APTT/Fibrinogen)','Prolonged clotting, low fibrinogen','DIC in septic shock; on anticoagulants; liver failure'],
    ['CRP / Procalcitonin','Elevated in bacterial infection','PCT >0.5 suggests bacterial sepsis; guides antibiotic stewardship'],
    ['TFTs (TSH + Free T4)','Hypothyroidism or thyrotoxicosis','Both can cause haemodynamic instability; hypothyroidism causes hypotension and bradycardia'],
    ['Cortisol (random)','<200 nmol/L in shocked patient suggests adrenal insufficiency','Critical illness-related corticosteroid insufficiency — consider hydrocortisone if refractory shock'],
    ['Blood Gas (VBG/ABG)','pH, pCO2, HCO3, BE, SpO2','Acidosis (metabolic = shock/DKA; respiratory = airway compromise); guides ventilation'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#7c3aed;font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));
  el_.appendChild(card('Additional Targeted Investigations','#a855f7','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Clinical Suspicion</th><th>Investigation</th><th>Target Finding</th></tr></thead><tbody>'+[
    ['Orthostatic / Autonomic OH','Lying + standing BP & HR; autonomic function tests (heart rate variability)','SBP drop ≥20 / HR rise >30 on standing'],
    ['Adrenal Insufficiency','Morning serum cortisol, short Synacthen test (SST), ACTH level','Cortisol <500 nmol/L post-SST = insufficient'],
    ['Cardiac cause','ECHO (bedside or formal), troponin, BNP, 24hr Holter','EF, wall motion, pericardial effusion, valve disease'],
    ['Pulmonary Embolism','D-dimer (if low-risk), CTPA (if high-risk or D-dimer positive)','Saddle PE, RV strain on ECHO or EKG'],
    ['Sepsis source','Blood cultures ×2, urine M&C, CXR, wound swabs, LP if meningism','Identify organism for targeted antibiotics'],
    ['Bleeding source','FBC, coag, group & crossmatch, FAST USS, CT abdomen','Haemoperitoneum, GI source, retroperitoneal bleed'],
    ['Autonomic neuropathy (DM)','Ewing battery: deep breathing HR ratio, Valsalva ratio, standing HR ratio','Ratio <1.1 = definite autonomic neuropathy'],
    ['Phaeochromocytoma (paroxysmal)','24hr urine metanephrines, plasma metanephrines','Elevated in phaeochromocytoma-related BP swings'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#a855f7;font-weight:600">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));
}

function tabHypoMgmt(el_) {
  el_.appendChild(secTitle('💊','Hypotension Management','Stepwise treatment of orthostatic and chronic hypotension','#a855f7'));
  el_.appendChild(notebox('⚡ For acute severe hypotension or shock, go to the <button onclick="navTo(\'🚨 Shock Protocol\')" style="background:none;border:none;color:#a855f7;font-weight:700;cursor:pointer;text-decoration:underline;font-size:13px">Shock Protocol →</button>','#faf5ff','#e9d5ff'));
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:700;margin:16px 0 10px">Orthostatic Hypotension — Stepwise Management</h3>'));
  el_.appendChild(accordion(ORTHO_MGMT.map(function(s,i){return{label:'Step '+(i+1)+': '+s.step,detail:s.detail};}), '#a855f7', function(panel,item){
    panel.innerHTML='<div style="font-size:13px;color:#374151;line-height:1.7">'+item.detail+'</div>';
  }));
  el_.appendChild(card('Pharmacological Options for Orthostatic Hypotension','#7c3aed','<div class="tbl-wrap"><table><thead><tr style="background:#ede9fe"><th>Drug</th><th>Dose</th><th>Mechanism</th><th>Cautions</th></tr></thead><tbody>'+[['Fludrocortisone','0.1–0.2 mg once daily','Mineralocorticoid — increases sodium/water retention','Monitor BP supine (risk of supine HTN), K⁺ (can cause hypokalaemia), oedema. Avoid in HF.'],['Midodrine','2.5–10 mg TDS','Alpha-1 adrenergic agonist — increases SVR','Take last dose no later than 6pm — causes supine HTN if taken at night. Urinary retention, piloerection.'],['Droxidopa','100–600 mg TDS','Noradrenaline precursor — peripheral vasoconstriction','Approved for neurogenic OH (Parkinson disease, MSA, PAF). Monitor supine BP.'],['Pyridostigmine','30–60 mg TDS','Cholinesterase inhibitor — enhances autonomic ganglionic transmission','Mild benefit; preferred when minimal supine HTN effect needed. GI side effects.']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px;color:#7c3aed">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
  el_.appendChild(card('Vasovagal (Reflex) Syncope Management','#a855f7','<div style="font-size:13px;line-height:1.7;color:#374151">'+['Reassurance — generally benign prognosis with lifestyle modification.','Identify and avoid triggers (prolonged standing, hot environments, venepuncture, emotional stress).','Prodromal awareness: teach patients to sit/lie down at first warning symptoms (dizziness, nausea, pallor, sweating).','Physical counterpressure manoeuvres: leg crossing, hand gripping, arm tensing during prodrome — shown to abort episodes.','Increase salt and fluid intake if not contraindicated.','Tilt training: gradual standing tolerance programme.','If recurrent and disabling: consider fludrocortisone, midodrine, or beta-blocker (evidence mixed).','Cardiac pacing: only for cardioinhibitory vasovagal syncope with documented asystole (rare).'].map(function(i){return '<div style="display:flex;gap:8px;padding:4px 0;border-bottom:1px solid #e9d5ff44"><span style="color:#a855f7;flex-shrink:0">→</span>'+i+'</div>';}).join('')+'</div>'));
}

function tabShock(el_) {
  el_.appendChild(secTitle('🚨','Shock & Sepsis Protocol','SSC Hour-1 Bundle, shock classification, and vasopressor guide','#dc2626'));
  el_.appendChild(notebox('🚨 <strong>Shock definition:</strong> Tissue hypoperfusion — MAP <65 mmHg + evidence of organ dysfunction (lactate >2 mmol/L, oliguria <0.5ml/kg/hr, altered mental status, cold mottled extremities). Shock is a clinical diagnosis — do not wait for investigations.','#fef2f2','#fecaca'));

  // ── SSC HOUR-1 BUNDLE ──
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#dc2626">🕐 SSC Hour-1 Bundle (Surviving Sepsis Campaign 2021)</h3>'));
  el_.appendChild(notebox('⚡ <strong>Complete ALL 5 actions within 1 hour of sepsis recognition.</strong> Each element independently reduces mortality. Bundle completion is an audit standard in NHS trusts and most international ICUs. Source: Surviving Sepsis Campaign 2021.','#fef2f2','#fecaca'));
  el_.appendChild(card('Hour-1 Bundle — Do ALL Within 60 Minutes','#dc2626','<div style="font-size:13px;color:#374151">'+[
    {n:'1',col:'#dc2626',bg:'#fef2f2',t:'Measure Lactate',c:'Serum lactate immediately. If lactate >2 mmol/L → sepsis-induced tissue hypoperfusion. If lactate ≥4 mmol/L → septic shock (even if BP appears normal). <strong>Remeasure within 2 hours if initial lactate ≥2.</strong>'},
    {n:'2',col:'#ea580c',bg:'#fff7ed',t:'Blood Cultures ×2 BEFORE Antibiotics',c:'Obtain ≥2 sets of blood cultures (aerobic + anaerobic) from different sites BEFORE giving antibiotics. Do NOT delay antibiotics more than 45 minutes to obtain cultures. Also consider: urine M&C, wound swabs, sputum, LP if meningism.'},
    {n:'3',col:'#d97706',bg:'#fffbeb',t:'Broad-Spectrum Antibiotics Within 1 Hour',c:'Start IV antibiotics within 1 hour of recognition (within 3 hours of suspected sepsis without shock). <strong>Every hour of delay in antibiotics increases mortality by ~7%.</strong> Empirical choice guided by likely source: Respiratory → Co-amoxiclav / Piperacillin-tazobactam. Urinary → Ceftriaxone / Gentamicin. Unknown source → Piperacillin-tazobactam or Meropenem + Metronidazole. Add Antifungal if immunocompromised.'},
    {n:'4',col:'#16a34a',bg:'#f0fdf4',t:'30 ml/kg IV Crystalloid Bolus',c:'If hypotensive (MAP <65 mmHg) OR lactate ≥4 mmol/L: give <strong>30 ml/kg IV 0.9% NaCl or Hartmann\'s</strong> as rapidly as tolerated (typically over 30–60 min). Reassess after each 500ml bolus. Note: balanced crystalloids (Hartmann\'s/PlasmaLyte) preferred over 0.9% NaCl in sepsis — less hyperchloraemic acidosis. Use dynamic fluid responsiveness markers (pulse pressure variation, SLR test) if available.'},
    {n:'5',col:'#7c3aed',bg:'#faf5ff',t:'Vasopressors if MAP Remains <65 mmHg',c:'Start vasopressors if MAP <65 mmHg despite initial fluid resuscitation. <strong>Noradrenaline is first-line</strong> (0.01–3 mcg/kg/min). Central line preferred; can start peripherally if no central access. Target: MAP ≥65 mmHg. Add vasopressin 0.03 units/min if noradrenaline dose >0.25 mcg/kg/min. Do NOT delay vasopressors waiting for fluid response — start both simultaneously if severely hypotensive.'},
  ].map(function(s){return '<div style="display:flex;gap:14px;padding:13px 0;border-bottom:1px solid #fecaca44;align-items:flex-start"><div style="width:30px;height:30px;border-radius:50%;background:'+s.col+';color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+s.n+'</div><div style="flex:1;padding:10px 14px;background:'+s.bg+';border-radius:10px;border-left:3px solid '+s.col+'"><div style="font-weight:700;color:'+s.col+';margin-bottom:4px">'+s.t+'</div><div style="font-size:13px;line-height:1.65">'+s.c+'</div></div></div>';}).join('')+'</div>'));

  // ── qSOFA CALCULATOR ──
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">🧮 Sepsis Screening — qSOFA & SOFA</h3>'));
  var qCard = card('qSOFA Score — Bedside Screening Tool','#dc2626','');
  var qBody = qCard.querySelector('.card-body');
  qBody.innerHTML = '<p style="font-size:13px;color:#64748b;margin-bottom:12px">qSOFA ≥2 identifies patients at high risk of sepsis-related organ dysfunction. Fast, no labs required. Tick all that apply:</p>'+
    ['Respiratory rate ≥22 breaths/min','Altered mentation (GCS <15 or new confusion)','Systolic BP ≤100 mmHg'].map(function(q,i){
      return '<label style="display:flex;align-items:center;gap:10px;padding:10px;margin-bottom:6px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;cursor:pointer;font-size:13px"><input type="checkbox" id="qsofa-'+i+'" onchange="calcQSOFA()" style="width:18px;height:18px;accent-color:#dc2626">'+q+'</label>';
    }).join('')+
    '<div id="qsofa-res" style="margin-top:10px"></div>'+
    '<div style="margin-top:14px;padding:12px;background:#fef9c3;border:1px solid #fde047;border-radius:8px;font-size:12px;color:#78350f">'+
    '<strong>SOFA Score</strong> (requires labs) — organ dysfunction in 6 systems: Respiration (PaO₂/FiO₂), Coagulation (platelets), Liver (bilirubin), Cardiovascular (MAP/vasopressors), CNS (GCS), Renal (creatinine/urine output). SOFA ≥2 = suspected sepsis. Add SOFA criteria 3-4 hrs after recognition for full scoring.</div>';
  el_.appendChild(qCard);
  window.calcQSOFA = function(){
    var score = [0,1,2].filter(function(i){return document.getElementById('qsofa-'+i) && document.getElementById('qsofa-'+i).checked;}).length;
    var col = score>=2?'#dc2626':score===1?'#d97706':'#16a34a';
    var msg = score>=2?'🚨 <strong>HIGH RISK</strong> — Likely organ dysfunction. Initiate full sepsis workup and Hour-1 Bundle immediately. Consider ICU.':
              score===1?'⚠️ <strong>MODERATE RISK</strong> — Monitor closely. Repeat assessment in 1 hour. Begin investigations.':
              '✅ <strong>LOW RISK</strong> — qSOFA negative. Does not exclude sepsis — reassess if clinical status changes.';
    document.getElementById('qsofa-res').innerHTML='<div style="padding:12px 16px;border-radius:10px;background:'+(score>=2?'#fef2f2':score===1?'#fffbeb':'#f0fdf4')+';border:2px solid '+col+'"><div style="font-size:18px;font-weight:800;color:'+col+';margin-bottom:4px">qSOFA: '+score+'/3</div><div style="font-size:13px">'+msg+'</div></div>';
  };

  // ── ABCDE RESUS ──
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">🔴 Initial Resuscitation — All Shock Types (ABCDE)</h3>'));
  el_.appendChild(card('ABCDE Approach','#dc2626','<div style="font-size:13px;line-height:1.7;color:#374151">'+[
    '<strong>A — Airway:</strong> Ensure patent. Consider RSI intubation if GCS ≤8 or impending airway compromise.',
    '<strong>B — Breathing:</strong> High-flow O₂ 15L/min via non-rebreather mask. Target SpO₂ ≥94%.',
    '<strong>C — Circulation:</strong> Two large-bore IV cannulae (14–16G). FBC, U&E, LFTs, lactate, troponin, blood cultures ×2, coag, group & save. 12-lead EKG. Urinary catheter — target urine output ≥0.5ml/kg/hr.',
    '<strong>D — Disability:</strong> GCS, glucose (correct hypoglycaemia immediately), pupils, focal deficits.',
    '<strong>E — Exposure:</strong> Full exam. Temperature. Identify source of bleeding or infection. Skin — rash (meningococcaemia), mottling, capillary refill time.',
  ].map(function(i){return '<div style="display:flex;gap:8px;padding:8px 0;border-bottom:1px solid #fecaca55">'+i+'</div>';}).join('')+'</div>'));

  // ── SHOCK TYPES ──
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">⚡ Shock Classification & Management</h3>'));
  el_.appendChild(accordion(SHOCK_TYPES.map(function(s){return{label:'⚡ '+s.type+' Shock',markers:s.markers,tx:s.tx};}), '#dc2626', function(panel,item){
    panel.innerHTML='<div style="margin-bottom:10px;padding:10px 14px;background:#fef9c3;border:1px solid #fde047;border-radius:8px;font-size:13px"><strong>Key markers:</strong> '+item.markers+'</div><div style="font-size:13px;line-height:1.7;color:#374151"><strong>Management:</strong> '+item.tx+'</div>';
  }));

  // ── NEUROGENIC SHOCK (new) ──
  el_.appendChild(card('Neurogenic Shock — Special Case','#7c3aed','<div style="font-size:13px;color:#374151;line-height:1.65"><div style="font-weight:700;color:#7c3aed;margin-bottom:8px">Spinal cord injury (cervical or high thoracic T1–T6) → loss of sympathetic outflow</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">'+
    '<div style="padding:10px;background:#faf5ff;border:1px solid #e9d5ff;border-radius:8px"><div style="font-size:11px;font-weight:700;color:#7c3aed;margin-bottom:4px">HAEMODYNAMIC TRIAD</div>'+
    ['Hypotension (↓ SVR)','Bradycardia (not tachycardia — key distinction)','Warm dry skin (no diaphoresis)'].map(function(x){return '<div style="font-size:12px;padding:3px 0">→ '+x+'</div>';}).join('')+'</div>'+
    '<div style="padding:10px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px"><div style="font-size:11px;font-weight:700;color:#16a34a;margin-bottom:4px">MANAGEMENT</div>'+
    ['IV fluids — cautious resuscitation','Noradrenaline first-line vasopressor','Atropine 0.5–1mg IV for bradycardia','Target MAP ≥85 mmHg (spinal cord perfusion)','Methylprednisolone: consult neurosurgery'].map(function(x){return '<div style="font-size:12px;padding:3px 0">→ '+x+'</div>';}).join('')+'</div></div>'+
    '<div style="font-size:12px;padding:8px 12px;background:#fff7ed;border:1px solid #fed7aa;border-radius:8px">⚠️ <strong>Key distinction from septic shock:</strong> Neurogenic = bradycardia + warm. Septic = tachycardia + warm. History of trauma/injury is the critical clue.</div></div>'));

  // ── VASOPRESSORS ──
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">💉 Vasopressors — Quick Reference</h3>'));
  el_.appendChild(card('Agent Selection by Shock Type','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Agent</th><th>Mechanism</th><th>First-Line For</th><th>Notes</th></tr></thead><tbody>'+[
    ['Noradrenaline','Alpha-1 > Beta-1','Septic shock — FIRST-LINE','Central line preferred. Peripheral ok short-term. 0.01–3 mcg/kg/min.'],
    ['Adrenaline','Alpha + Beta','Anaphylaxis (IM 0.5mg), Cardiac arrest','IV infusion for refractory shock. Can worsen lactic acidosis.'],
    ['Vasopressin','V1 receptor','Add-on in refractory septic shock','Fixed 0.03–0.04 units/min. Spares noradrenaline dose. NOT titrated.'],
    ['Dopamine','DA / Beta-1 / Alpha (dose-dependent)','Rarely used — cardiogenic shock','More arrhythmias than noradrenaline. Avoid as first-line (SSC 2021).'],
    ['Dobutamine','Beta-1 (inotrope)','Cardiogenic shock (low CO, high SVR)','May drop BP — combine with vasopressor if hypotensive.'],
    ['Phenylephrine','Pure Alpha-1','Vasodilatory shock; spinal anaesthesia HTN','Pure vasoconstriction — may reduce CO. Use when tachyarrhythmia a concern.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700">'+r[0]+'</td><td>'+r[1]+'</td><td style="color:#dc2626;font-weight:600">'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(notebox('🔗 For <strong>weight-based vasopressor dose calculations</strong>, go to: Drug Reference → 💉 Vasopressors. Includes noradrenaline, adrenaline, dopamine, dobutamine, vasopressin with live ml/hr calculator.','#faf5ff','#e9d5ff'));
}

function tabHypoSpecial(el_) {
  el_.appendChild(secTitle('📋','Special Cases in Hypotension','Disease-specific contexts requiring tailored management','#a855f7'));
  var cases=[
    {t:'Diabetic Autonomic Neuropathy',c:'Autonomous hypotension is a major complication of long-standing diabetes. Up to 30% of T1DM and 20% of T2DM develop significant autonomic neuropathy. Symptoms: orthostatic lightheadedness, postprandial hypotension, resting tachycardia, anhidrosis. Management: Optimise glycaemic control (slows progression), rise slowly, avoid large carbohydrate meals (postprandial), pharmacotherapy with midodrine or fludrocortisone. Small frequent meals reduce postprandial hypotension. Refer to diabetes and autonomic specialist.'},
    {t:'Hypotension + Hypertension (Labile BP)',c:'Patients — often elderly with autonomic dysfunction — may have both hypertensive episodes and orthostatic hypotension. Antihypertensive treatment may worsen orthostatic hypotension. Management principles: Prioritise symptomatic treatment; treat hypertension cautiously with shorter-acting agents; target seated rather than standing BP; bedtime antihypertensive dosing helps nocturnal HTN without worsening daytime orthostatic OH; avoid alpha-blockers as monotherapy; regular lying and standing BP measurements.'},
    {t:'Adrenal Crisis (Addisonian Crisis)',c:'Life-threatening cortisol deficiency. Precipitated by: infection, surgery, missed steroid dose in Addison\'s disease or chronic steroid users. Features: refractory hypotension, weakness, nausea/vomiting, abdominal pain, hyponatraemia, hyperkalaemia, hypoglycaemia. Treatment: Hydrocortisone 100mg IV STAT then 50–100mg IV 6-hourly. IV normal saline (1L over 30–60 min). Glucose 50% if hypoglycaemic. Do NOT delay hydrocortisone for investigations.'},
    {t:'Postprandial Hypotension',c:'SBP drop ≥20 mmHg within 2 hours of eating. Particularly common in elderly, Parkinson disease, and diabetes. Mechanism: splanchnic pooling of blood after eating. Management: Small frequent meals, low carbohydrate content, avoid alcohol with meals, sit for 30–60 minutes after eating, take antihypertensives away from mealtimes, Acarbose (delays carbohydrate absorption) can be useful if diabetic.'},
    {t:'Haemodialysis-Related Hypotension',c:'Occurs in up to 30% of dialysis sessions. Mechanism: rapid fluid removal exceeds cardiovascular compensation. Risk factors: low pre-dialysis BP, poor cardiac function, autonomic neuropathy (DM), antihypertensive medications taken before dialysis. Management: Hold or reduce antihypertensives on dialysis days, cool dialysate temperature, reduce ultrafiltration rate, midodrine 10mg before dialysis, ensure accurate dry weight target.'},
  ];
  el_.appendChild(accordion(cases.map(function(c){return{label:'🔍 '+c.t,detail:c.c};}), '#a855f7', function(panel,item){
    panel.innerHTML='<div style="font-size:13px;color:#374151;line-height:1.7">'+item.detail+'</div>';
  }));
}

