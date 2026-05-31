// ════════════════════════════════════════════════════════════════
// HTN TABS
// ════════════════════════════════════════════════════════════════
function tabHTNPrev(el_) {
  var c = el_; c.appendChild(secTitle('🛡️','HTN Prevention','Identify and address risk factors before hypertension develops','#0ea5e9'));
  c.appendChild(fromHTML('<div class="g2"><div>'+card('Modifiable Risk Factors','#0ea5e9',['Obesity / BMI ≥30','Physical inactivity','High sodium diet (>2,300mg/day)','Excessive alcohol intake','Smoking / tobacco use','Chronic stress / burnout','Obstructive sleep apnea','High dietary saturated fat'].map(function(r){return '<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #f1f5f9;font-size:13px"><span style="color:#ef4444;font-size:9px">●</span>'+r+'</div>';}).join('')).outerHTML+'</div><div>'+card('Non-Modifiable Risk Factors','#64748b',['Age (Men ≥55, Women ≥65)','Family history of HTN','Black / African American race','Chronic kidney disease','Diabetes mellitus','Previous cardiovascular event'].map(function(r){return '<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #f1f5f9;font-size:13px"><span style="color:#64748b;font-size:9px">●</span>'+r+'</div>';}).join('')).outerHTML+'</div></div>'));
  c.appendChild(card('Screening Recommendations','#0ea5e9','<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Population</th><th>Frequency</th><th>Action</th></tr></thead><tbody>'+[['Adults ≥18, normal BP','Every 2 years','Reinforce lifestyle'],['Elevated BP (120–129)','Annually','Lifestyle modifications'],['Adults ≥40 or high-risk','Annually','Confirm with 2 readings, 2 visits'],['Pregnant women','Every prenatal visit','Screen for preeclampsia']].map(function(r){return '<tr class="tbl-row"><td>'+r[0]+'</td><td style="color:#0ea5e9;font-weight:600">'+r[1]+'</td><td>'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));
  c.appendChild(notebox('💡 All patients with risk factors should receive lifestyle counseling. <button onclick="navTo(\'🌱 Lifestyle\')" style="background:none;border:none;color:#0ea5e9;font-weight:700;cursor:pointer;text-decoration:underline;font-size:13px">View Lifestyle Modifications →</button>','#f0f9ff','#bae6fd'));
}

// © Gbenga Adejuyigbe, RN, BNSc — The Triad v3.1 2026
function tabHTNDetect(el_) {
  el_.appendChild(secTitle('🔍','BP Detection & Classification','ESC/ESH 2023 — enter readings to classify stage','#22c55e'));
  var toolCard = card('BP Classification Tool','#22c55e','');
  var tb = toolCard.querySelector('.card-body');
  tb.innerHTML = '<button id="htn-use-last-btn" onclick="useLastBPInHTN()" style="display:flex;align-items:center;gap:6px;width:100%;padding:8px 12px;margin-bottom:10px;background:#f0f9ff;color:#0369a1;border:1.5px solid #bae6fd;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.2s,color 0.2s,border-color 0.2s">⏱ Use last BP reading from tracker</button><p style="font-size:13px;color:#64748b;margin-bottom:12px">Enter BP reading and patient profile for personalised classification:</p><div style="margin-bottom:10px"><label class="lbl">Patient Name</label><input id="d-name" type="text" class="inp" placeholder="e.g. John Smith" oninput="saveHTNState()"></div><div style="display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap;margin-bottom:12px"><div><label class="lbl">Systolic (mmHg)</label><input id="d-sys" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" style="width:100px" placeholder="e.g. 135" oninput="calcHTNMap();saveHTNState()"></div><span style="font-size:20px;color:#94a3b8;padding-bottom:8px">/</span><div><label class="lbl">Diastolic (mmHg)</label><input id="d-dia" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" style="width:100px" placeholder="e.g. 85" oninput="calcHTNMap();saveHTNState()"></div></div><div id="d-map-display" style="margin-bottom:8px;padding:8px 12px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;font-size:13px;color:#0369a1">MAP will calculate automatically when BP is entered.</div><div class="g4" style="margin-bottom:10px"><div><label class="lbl">Age (years)</label><input id="d-age" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 55" oninput="saveHTNState()"></div><div><label class="lbl">Gender</label><select id="d-gen" class="inp" onchange="saveHTNState()"><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div><div><label class="lbl">Weight (kg)</label><input id="d-wt" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 75" oninput="calcDetectBMI();saveHTNState()"></div><div><label class="lbl">Height (cm)</label><input id="d-ht" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 170" oninput="calcDetectBMI();saveHTNState()"></div></div><div style="margin-bottom:10px;padding:10px 12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;font-size:13px;color:#16a34a" id="d-bmi-display">BMI will calculate automatically when weight and height are entered.</div><div class="g2" style="margin-bottom:10px"><div><label class="lbl">BMI (kg/m²)</label><input id="d-bmi" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="Auto-calculated or enter manually" oninput="saveHTNState()"></div><div><label class="lbl">Underlying Condition</label><select id="d-cond" class="inp" onchange="saveHTNState()"><option value="">None / Unknown</option><option value="dm">Diabetes Mellitus</option><option value="ckd">CKD</option><option value="cvd">Established CVD</option><option value="hf">Heart Failure</option><option value="preg">Pregnancy</option><option value="stroke">Previous Stroke/TIA</option></select></div></div><div class="g2" style="margin-bottom:10px"><div><label class="lbl">Heart Rate (bpm)</label><input id="d-hr" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 78" oninput="saveHTNState()"></div><div><label class="lbl">Respiratory Rate (breaths/min)</label><input id="d-rr" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 16" oninput="saveHTNState()"></div></div><button id="d-btn" style="width:100%;padding:10px;background:#22c55e;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;margin-bottom:4px">Classify & Get Treatment Plan →</button><div id="d-res"></div>';
  // BMI auto-calc for detection tab
  window.calcHTNMap = function(){
    var sys=parseFloat(document.getElementById('d-sys').value);
    var dia=parseFloat(document.getElementById('d-dia').value);
    var disp=document.getElementById('d-map-display');
    if(sys>0&&dia>0){
      var map=Math.round((sys+2*dia)/3);
      var mapColor=map<70?'#dc2626':map<80?'#d97706':map<100?'#16a34a':'#dc2626';
      var mapNote=map<65?'⚠️ Below perfusion threshold (<65) — end-organ hypoperfusion risk':map<70?'Low-normal MAP':map<100?'Normal MAP (65–100 mmHg)':'Elevated MAP — consistent with HTN';
      disp.innerHTML='<strong>MAP: '+map+' mmHg</strong> &nbsp;·&nbsp; <span style="color:'+mapColor+';font-weight:700">'+mapNote+'</span>';
      disp.style.background=map<65?'#fef2f2':map<70?'#fff7ed':'#f0f9ff';
      disp.style.borderColor=map<65?'#fca5a5':map<70?'#fed7aa':'#bae6fd';
    } else {
      disp.innerHTML='MAP will calculate automatically when BP is entered.';
      disp.style.background='#f0f9ff'; disp.style.borderColor='#bae6fd';
    }
  };
  window.calcDetectBMI = function(){
    var wt=parseFloat(document.getElementById('d-wt').value);
    var ht=parseFloat(document.getElementById('d-ht').value);
    var disp=document.getElementById('d-bmi-display');
    var bmiInp=document.getElementById('d-bmi');
    if(wt>0&&ht>0){
      var bmi=Math.round(wt/Math.pow(ht/100,2)*10)/10;
      var cat=bmi<18.5?'Underweight':bmi<25?'Normal weight':bmi<30?'Overweight':bmi<35?'Obese Class I':bmi<40?'Obese Class II':'Obese Class III';
      var col=bmi<18.5?'#d97706':bmi<25?'#16a34a':bmi<30?'#d97706':'#dc2626';
      disp.innerHTML='<strong>BMI: '+bmi+' kg/m²</strong> — <span style="color:'+col+';font-weight:700">'+cat+'</span>';
      disp.style.background=bmi<25?'#f0fdf4':'#fff7ed';
      disp.style.borderColor=bmi<25?'#bbf7d0':'#fed7aa';
      bmiInp.value=bmi;
    } else {
      disp.innerHTML='BMI will calculate automatically when weight and height are entered.';
      disp.style.background='#f0fdf4'; disp.style.borderColor='#bbf7d0';
    }
  };
  el_.appendChild(toolCard);
  setTimeout(restoreHTNState, 0);
  document.getElementById('d-btn').onclick = function() {
    var sys=parseInt(document.getElementById('d-sys').value), dia=parseInt(document.getElementById('d-dia').value);
    var age=parseInt(document.getElementById('d-age').value)||null;
    var gen=document.getElementById('d-gen').value;
    var bmi=parseFloat(document.getElementById('d-bmi').value)||null;
    var cond=document.getElementById('d-cond').value;
    var dHR=parseInt(document.getElementById('d-hr').value)||null;
    var dRR=parseInt(document.getElementById('d-rr').value)||null;
    var res=document.getElementById('d-res');
    if(isNaN(sys)||isNaN(dia)){res.innerHTML='<p style="color:#ef4444;font-size:13px">Please enter valid BP values.</p>';return;}
    var r=classifyBP(sys,dia);
    if(r.error){res.innerHTML='<p style="color:#f97316;font-size:13px;padding:10px;background:#fff7ed;border:1px solid #fed7aa;border-radius:8px">'+r.msg+'</p>';return;}
    var txData={
      'Optimal':   {action:'No medication required.',lifestyle:'Continue healthy lifestyle — balanced diet, regular exercise, no smoking, limit alcohol.',followup:'Recheck BP every 5 years.',drugs:'',urgency:'routine',uColor:'#16a34a'},
      'Normal':    {action:'No medication required.',lifestyle:'Maintain healthy lifestyle. Monitor for upward trend.',followup:'Recheck BP every 3 years.',drugs:'',urgency:'routine',uColor:'#22c55e'},
      'High Normal':{action:'Lifestyle modification only. Consider medication if high CV risk (CVD, DM, CKD, or 10-yr ASCVD ≥10%).',lifestyle:'DASH diet, reduce sodium to <5g/day, exercise ≥150min/week, weight loss if BMI >25, limit alcohol.',followup:'Recheck BP in 3 months. Annual review if stable on lifestyle alone.',drugs:'If CV risk high: ACE inhibitor or ARB as first choice.',urgency:'non-urgent',uColor:'#d97706'},
      'Grade 1 HTN':{action:'Lifestyle modification for 3–6 months. If BP remains ≥140/90 mmHg — initiate pharmacotherapy. If very high CV risk — medicate immediately.',lifestyle:'DASH diet, sodium restriction, aerobic exercise, weight loss, alcohol reduction, smoking cessation.',followup:'Reassess in 3–6 months. If on medication: reassess in 4 weeks.',drugs:'First-line: ACE inhibitor (Ramipril 5–10mg) OR ARB (Losartan 50–100mg) OR CCB (Amlodipine 5–10mg) OR Thiazide (Hydrochlorothiazide 12.5–25mg). Choose based on patient profile.',urgency:'non-urgent',uColor:'#ea580c'},
      'Grade 2 HTN':{action:'Initiate dual pharmacotherapy + lifestyle immediately. Do not delay.',lifestyle:'Intensive lifestyle modification alongside medications.',followup:'Reassess in 3 months.',drugs:'Dual therapy: ACE/ARB + CCB (e.g. Ramipril + Amlodipine). If not at target: add Thiazide (Triple therapy: ACE/ARB + CCB + Thiazide).',urgency:'urgent',uColor:'#dc2626'},
      'Grade 3 HTN':{action:'Immediate dual or triple pharmacotherapy + lifestyle. Rule out secondary HTN causes.',lifestyle:'Intensive lifestyle modification.',followup:'Reassess in 1 month.',drugs:'Triple therapy: ACE/ARB + CCB + Thiazide-like diuretic. If resistant: add Spironolactone 25–50mg. Consider specialist referral.',urgency:'urgent',uColor:'#b91c1c'},
      'Isolated Systolic HTN':{action:'Treat based on SBP level (Grade 1 or 2 approach). Common in elderly — start low, go slow.',lifestyle:'Salt restriction especially important. Avoid excessive alcohol.',followup:'Reassess in 1–3 months.',drugs:'CCB (Amlodipine) or Thiazide preferred in elderly. ACE/ARB if DM or CKD co-exists. Avoid over-lowering DBP <70 mmHg in elderly.',urgency:'non-urgent',uColor:'#0891b2'},
      'Hypertensive Crisis':{action:'URGENT ASSESSMENT. Determine if Hypertensive Emergency (end-organ damage) or Urgency (no end-organ damage).',lifestyle:'N/A — acute management.',followup:'24–48 hour reassessment after acute management.',drugs:'Emergency (symptoms/EOD): IV Labetalol, Hydralazine, or Nicardipine. Reduce MAP by ≤25% in first hour. Urgency (no EOD): Oral antihypertensives, reduce BP over 24–48 hours.',urgency:'emergency',uColor:'#7c3aed'},
    };
    var tx=txData[r.stage]||{action:'See treatment guidelines.',lifestyle:'',followup:'',drugs:'',urgency:'routine',uColor:'#64748b'};
    var urgBg={'routine':'#f0fdf4','non-urgent':'#fffbeb','urgent':'#fef2f2','emergency':'#faf5ff'};
    var dname=document.getElementById('d-name').value;
    var map=Math.round((sys+2*dia)/3);
    var html='<div style="border-radius:12px;overflow:hidden;border:2px solid '+r.border+'">';
    // Header
    html+='<div style="padding:14px 18px;background:'+r.bg+'">';
    html+='<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px">'+(dname?'<div style="font-size:13px;font-weight:700;color:#1e293b;background:#fff;padding:2px 10px;border-radius:20px;border:1px solid #e2e8f0">👤 '+dname+'</div>':'')+' <div style="font-size:17px;font-weight:800;color:'+r.color+'">'+r.stage+'</div><div style="font-size:11px;font-weight:700;color:'+tx.uColor+';background:#fff;padding:2px 10px;border-radius:20px;border:1px solid '+tx.uColor+'">'+tx.urgency.toUpperCase()+'</div></div>';
    html+='<div style="display:flex;gap:16px;flex-wrap:wrap">';
    html+='<span style="font-size:13px;color:#1e293b">BP: <strong>'+sys+'/'+dia+' mmHg</strong></span>';
    html+='<span style="font-size:13px;color:#1e293b">MAP: <strong style="color:'+(map>=100?'#dc2626':map>=70?'#1e293b':'#d97706')+'">'+map+' mmHg</strong></span>';
    if(dHR){var hrC=dHR>100?'#dc2626':dHR<50?'#7c3aed':'#16a34a';html+='<span style="font-size:13px;color:'+hrC+'">HR: <strong>'+dHR+' bpm</strong> <span style="font-size:11px">'+(dHR>100?'↑ Tachycardia':dHR<50?'↓ Bradycardia':'Normal')+'</span></span>';}
    if(dRR){var rrC2=dRR>=22?'#dc2626':'#475569';html+='<span style="font-size:13px;color:'+rrC2+'">RR: <strong>'+dRR+' /min</strong> <span style="font-size:11px">'+(dRR>=22?'↑ Tachypnoea':'Normal')+'</span></span>';}
    html+='</div></div>';
    // Discordance
    if(r.note){
      var n=r.note;
      var sc=['#16a34a','#22c55e','#d97706','#ea580c','#dc2626','#7c3aed'][n.si]||'#64748b';
      var dc=['#16a34a','#22c55e','#d97706','#ea580c','#dc2626','#7c3aed'][n.di]||'#64748b';
      html+='<div style="padding:10px 14px;background:#fff;border-top:1px solid #e2e8f0">';
      html+='<span style="background:#fef9c3;color:#854d0e;padding:1px 8px;border-radius:10px;font-size:11px;font-weight:700">⚡ Reading Analysis</span>';
      html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0"><div style="padding:8px 12px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0"><div style="font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;margin-bottom:2px">Systolic ('+n.sys+' mmHg)</div><div style="font-size:13px;font-weight:700;color:'+sc+'">'+n.sysLabel+'</div></div>';
      html+='<div style="padding:8px 12px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0"><div style="font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;margin-bottom:2px">Diastolic ('+n.dia+' mmHg)</div><div style="font-size:13px;font-weight:700;color:'+dc+'">'+n.diaLabel+'</div></div></div>';
      html+='<div style="font-size:12px;color:#475569;padding:8px 12px;background:#fffbeb;border-radius:8px;border:1px solid #fde68a;line-height:1.6"><strong>Why '+r.stage+'?</strong> The <strong>'+n.driver+' ('+n.driverVal+' mmHg)</strong> drives classification. The '+(n.driver==='diastolic'?'systolic':'diastolic')+' alone would suggest <strong>'+(n.driver==='diastolic'?n.sysLabel:n.diaLabel)+'</strong>.</div></div>';
    }
    // Treatment sections
    html+='<div style="padding:14px 18px;background:#fff;border-top:1px solid #e2e8f0;display:flex;flex-direction:column;gap:10px">';
    // MAP interpretation card
    var mapInterp, mapBg, mapBorder;
    if(map>130){mapInterp='MAP '+map+' mmHg — severely elevated. End-organ perfusion at risk. In hypertensive emergency, target MAP reduction of ≤25% in first hour — avoid rapid normalisation.';mapBg='#fef2f2';mapBorder='#dc2626';}
    else if(map>110){mapInterp='MAP '+map+' mmHg — significantly elevated. Sustained high MAP increases cardiac afterload and accelerates end-organ damage. Treat underlying HTN stage.';mapBg='#fff7ed';mapBorder='#ea580c';}
    else if(map>=70){mapInterp='MAP '+map+' mmHg — within adequate perfusion range (normal 70–100 mmHg). Tissue perfusion is preserved. Focus on BP stage management.';mapBg='#f0fdf4';mapBorder='#16a34a';}
    else{mapInterp='MAP '+map+' mmHg — unexpectedly low for a hypertensive patient. Recheck reading accuracy. May indicate measurement error or white coat effect.';mapBg='#f0f9ff';mapBorder='#0ea5e9';}
    html+='<div style="padding:10px 14px;background:'+mapBg+';border-radius:8px;border-left:4px solid '+mapBorder+'">';
    html+='<div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">📊 Mean Arterial Pressure (MAP)</div>';
    html+='<div style="font-size:14px;font-weight:800;color:'+mapBorder+';margin-bottom:4px">'+map+' mmHg <span style="font-size:11px;font-weight:500;color:#64748b">(DBP + ⅓ × Pulse Pressure)</span></div>';
    html+='<div style="font-size:13px;color:#1e293b;line-height:1.6">'+mapInterp+'</div>';
    html+='</div>';
    html+='<div style="padding:10px 14px;background:'+urgBg[tx.urgency]+';border-radius:8px;border-left:4px solid '+tx.uColor+'"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">Clinical Action</div><div style="font-size:13px;color:#1e293b;line-height:1.6">'+tx.action+'</div></div>';
    if(tx.drugs) html+='<div style="padding:10px 14px;background:#f8fafc;border-radius:8px;border-left:4px solid #0ea5e9"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">💊 Pharmacotherapy</div><div style="font-size:13px;color:#1e293b;line-height:1.6">'+tx.drugs+'</div></div>';
    html+='<div style="padding:10px 14px;background:#f0fdf4;border-radius:8px;border-left:4px solid #22c55e"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">🌱 Lifestyle</div><div style="font-size:13px;color:#1e293b;line-height:1.6">'+tx.lifestyle+'</div></div>';
    html+='<div style="padding:10px 14px;background:#f0f9ff;border-radius:8px;border-left:4px solid #38bdf8"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">📅 Follow-up</div><div style="font-size:13px;color:#1e293b">'+tx.followup+'</div></div>';
    html+='</div></div>';
    // ── Personalised clinical notes based on profile ──────────────
    var notes=[];
    if(age&&age>=65) notes.push('👴 <strong>Elderly patient (≥65 yrs):</strong> Start medications at lowest dose and titrate slowly. Target <140/90 mmHg first; aim for <130/80 only if well-tolerated. Avoid SBP <120 — increased fall and AKI risk. Check orthostatic BP regularly.');
    if(age&&age<18) notes.push('👶 <strong>Paediatric patient:</strong> Standard adult ESC/ESH thresholds do not apply. Use age-, sex-, and height-based percentile charts. Refer to paediatric hypertension guidelines.');
    if(gen==='female') notes.push('👩 <strong>Female patient:</strong> If of childbearing age, consider pregnancy before initiating ACE inhibitors or ARBs — both are teratogenic. Safe options in pregnancy: Methyldopa, Labetalol, Nifedipine.');
    if(gen==='female'&&cond==='preg') notes.push('🤰 <strong>Pregnancy:</strong> Treat if BP ≥140/90 mmHg. Target 130–150/80–100 mmHg. First-line: Labetalol, Methyldopa, Nifedipine. AVOID ACE inhibitors, ARBs, direct renin inhibitors. Watch for pre-eclampsia (proteinuria + HTN after 20 weeks).');
    if(bmi&&bmi>=30) notes.push('⚖️ <strong>Obesity (BMI '+bmi+' kg/m²):</strong> Weight loss of 5–10kg can reduce SBP by 5–20 mmHg. Intensify lifestyle intervention. Consider GLP-1 RA if DM co-exists. ACE/ARB preferred.');
    if(bmi&&bmi<18.5) notes.push('⚠️ <strong>Underweight (BMI '+bmi+' kg/m²):</strong> Rule out secondary causes of HTN and underweight (malignancy, hyperthyroidism, Addison disease). Use caution with aggressive BP lowering.');
    if(cond==='dm') notes.push('🩸 <strong>Diabetes Mellitus:</strong> BP target <130/80 mmHg. First-line: ACE inhibitor or ARB (renoprotective). Add CCB or Thiazide if needed. Avoid beta-blockers as first-line (masks hypoglycaemia symptoms).');
    if(cond==='ckd') notes.push('🫘 <strong>Chronic Kidney Disease:</strong> BP target <130/80 mmHg. ACE inhibitor or ARB first-line (reduces proteinuria). Monitor K⁺ and eGFR closely after initiation. Avoid NSAIDs.');
    if(cond==='cvd') notes.push('❤️ <strong>Established CVD:</strong> BP target <130/80 mmHg. Beta-blocker + ACE/ARB preferred post-MI. CCB or ACE/ARB for stable angina. Ensure statin and antiplatelet therapy reviewed.');
    if(cond==='hf') notes.push('💙 <strong>Heart Failure:</strong> ACE/ARB + Beta-blocker + MRA (spironolactone) — cornerstone of HF therapy. Loop diuretics for fluid overload. Avoid CCBs (verapamil/diltiazem) in HFrEF. Target BP <130/80 mmHg.');
    if(cond==='stroke') notes.push('🧠 <strong>Previous Stroke/TIA:</strong> BP target <130/80 mmHg (after acute phase >48hrs). ACE inhibitor + Thiazide combination (PROGRESS trial). Ensure antiplatelet or anticoagulation reviewed.');
    // HR / RR clinical notes for HTN
    if(dHR&&dHR>100) notes.push('💓 <strong>Tachycardia (HR '+dHR+' bpm) + Hypertension:</strong> Consider phaeochromocytoma (episodic HTN + tachycardia + headache), thyrotoxicosis, anxiety, pain, or stimulant use. Check TSH, plasma metanephrines, and urine catecholamines if clinically suspected. Beta-blocker useful if tachycardia-mediated.');
    if(dHR&&dHR<50) notes.push('🫀 <strong>Bradycardia (HR '+dHR+' bpm) + Hypertension:</strong> Consider hypothyroidism (↑TSH), beta-blocker or calcium-channel blocker over-treatment, or complete heart block. Check TFTs, review medications. Avoid adding further rate-lowering agents.');
    if(dRR&&dRR>=22) notes.push('🌬️ <strong>Tachypnoea (RR '+dRR+' breaths/min) + Hypertension:</strong> May indicate anxiety-related white-coat effect, pulmonary oedema in Grade 3 / hypertensive emergency, or concurrent respiratory illness. Check SpO₂ and auscultate lungs. Reassess BP after the patient is calm and rested.');
    // MAP-specific clinical note
    var mapNote25=Math.round(map*0.75);
    if(r.stage==='Hypertensive Crisis'){
      notes.unshift('🎯 <strong>MAP Target (Crisis):</strong> Current MAP = <strong>'+map+' mmHg</strong>. Reduce MAP by ≤25% in the <strong>first hour</strong> → target MAP ≈ <strong>'+mapNote25+' mmHg</strong>. Then gradually to &lt;160/100 over next 24–48 hrs. Avoid rapid normalisation — risks cerebral, renal and coronary ischaemia.');
    }
    if(map>=100){
      notes.push('📊 <strong>Elevated MAP ('+map+' mmHg):</strong> MAP ≥100 mmHg indicates sustained elevated arterial pressure. Associated with increased risk of end-organ damage. Effective BP control should aim to normalise MAP toward 70–100 mmHg range.');
    }
    if(notes.length){
      html+='<div style="margin-top:10px;padding:14px 16px;background:#fafafa;border:1px solid #e2e8f0;border-radius:10px"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:10px">👤 Personalised Clinical Notes</div>'+notes.map(function(n){return '<div style="font-size:13px;color:#1e293b;line-height:1.7;padding:8px 0;border-bottom:1px solid #f1f5f9">'+n+'</div>';}).join('')+'</div>';
    }

    // ── Recommended Investigations ────────────────────────────
    var _htnInv=[];
    // Core — every HTN patient
    _htnInv.push({t:'Urinalysis (dipstick + microscopy)',r:'Detect proteinuria (renal damage, pre-eclampsia), haematuria, glucosuria. ESC/ESH 2023 routine.'});
    _htnInv.push({t:'Urine Albumin:Creatinine Ratio (ACR)',r:'Quantify microalbuminuria — early marker of renal and endothelial damage. ESC/ESH 2023.'});
    _htnInv.push({t:'Serum Creatinine + eGFR (CKD-EPI)',r:'Assess renal function. Baseline required before starting ACEi/ARB. Stage CKD if present.'});
    _htnInv.push({t:'Serum Electrolytes (Na⁺, K⁺)',r:'Hypokalaemia suggests hyperaldosteronism or diuretic effect. Essential before thiazide or loop diuretic.'});
    _htnInv.push({t:'Fasting Plasma Glucose / HbA1c',r:'Exclude or confirm diabetes — co-exists in ~25% of hypertensive patients. ADA 2024.'});
    _htnInv.push({t:'Fasting Lipid Profile (TC, LDL, HDL, TG)',r:'Cardiovascular risk stratification. Required for ASCVD / SCORE2 calculation. ESC/ESH 2023.'});
    _htnInv.push({t:'Full Blood Count (FBC)',r:'Polycythaemia (secondary HTN cause), anaemia (renal impairment), thrombocytopenia.'});
    _htnInv.push({t:'12-lead ECG',r:'Left ventricular hypertrophy (Sokolow-Lyon), arrhythmia, ischaemia. ESC/ESH recommended for all HTN patients.'});
    // Grade 2+ or crisis
    if(sys>=160||dia>=100){
      _htnInv.push({t:'Serum Troponin (hs-cTnI or hs-cTnT)',r:'Grade 2/3 HTN — rule out hypertensive emergency with myocardial injury. Raised in hypertensive urgency vs emergency.'});
      _htnInv.push({t:'BNP / NT-proBNP',r:'Assess cardiac strain and LV dysfunction in significant hypertension. Elevated = higher CV risk.'});
      _htnInv.push({t:'Fundoscopy / Ophthalmoscopy',r:'Hypertensive retinopathy grading. Grade 3–4 (haemorrhages/papilloedema) = hypertensive emergency. ESC/ESH recommended.'});
      _htnInv.push({t:'Echocardiogram',r:'Assess LVH, LV systolic/diastolic function, aortic root dilation. Recommended if ECG shows LVH or cardiac symptoms present.'});
    }
    if(sys>=180||dia>=120){
      _htnInv.push({t:'CT Head (non-contrast)',r:'Hypertensive crisis — exclude hypertensive encephalopathy, stroke, intracranial haemorrhage if neurological symptoms.'});
      _htnInv.push({t:'Chest X-ray',r:'Cardiomegaly, aortic dilatation, pulmonary oedema — essential in hypertensive emergency.'});
      _htnInv.push({t:'Urine Protein:Creatinine Ratio (PCR)',r:'Quantify proteinuria urgently in hypertensive crisis — differentiates urgency from emergency with renal involvement.'});
    }
    // Comorbidity-driven
    if(cond==='ckd'){_htnInv.push({t:'Renal Ultrasound',r:'CKD — assess renal size, cortical thickness, echogenicity, hydronephrosis. Doppler for renovascular HTN.'});}
    if(cond==='dm'){_htnInv.push({t:'HbA1c (if not done)',r:'Diabetes + HTN — confirm glycaemic control. Target HbA1c <7.0% with BP <130/80 mmHg. ADA 2024.'});}
    if(cond==='hf'){_htnInv.push({t:'Echocardiogram (urgent)',r:'Heart failure — assess ejection fraction (HFrEF vs HFpEF), valvular disease, pericardial effusion.'});}
    if(cond==='cvd'){_htnInv.push({t:'Resting ECG + Exercise Tolerance Test',r:'Established CVD — assess ischaemia burden and arrhythmia. Guides beta-blocker and CCB selection.'});}
    if(age&&age>=50){_htnInv.push({t:'Thyroid Function Tests (TFTs)',r:'Age ≥50: hypothyroidism and hyperthyroidism are secondary causes of HTN. TSH is first-line screen.'});}
    if(gen==='female'){_htnInv.push({t:'Urine Beta-hCG (pregnancy test)',r:'Female patient — exclude pregnancy before initiating ACEi/ARB (teratogenic in all trimesters).'});}
    // Suspected secondary HTN
    if(age&&age<40&&(sys>=160||dia>=100)){
      _htnInv.push({t:'Aldosterone:Renin Ratio (ARR)',r:'Young patient with resistant/severe HTN — screen for primary hyperaldosteronism (Conn syndrome). Commonest secondary cause.'});
      _htnInv.push({t:'24-hour Urine Catecholamines / Metanephrines',r:'Exclude phaeochromocytoma — episodic HTN, headache, palpitations, sweating. Can be life-threatening.'});
      _htnInv.push({t:'Renal Doppler Ultrasound',r:'Young/resistant HTN — screen for renal artery stenosis (fibromuscular dysplasia or atherosclerosis).'});
    }
    // Render
    var _invHtml='';
    if(_htnInv.length){
      _invHtml='<div style="margin-top:14px;background:#f8fafc;border:2px solid #22c55e44;border-radius:12px;overflow:hidden">';
      _invHtml+='<div style="padding:10px 16px;background:#f0fdf4;border-bottom:1px solid #bbf7d0;display:flex;align-items:center;gap:8px">';
      _invHtml+='<span style="font-size:16px">🧪</span>';
      _invHtml+='<span style="font-size:12px;font-weight:800;color:#16a34a;text-transform:uppercase;letter-spacing:0.6px">Recommended Investigations</span>';
      _invHtml+='<span style="font-size:10px;color:#64748b;margin-left:4px">— ESC/ESH 2023 · ADA 2024</span>';
      _invHtml+='</div>';
      _invHtml+='<div class="tbl-wrap"><table style="width:100%;border-collapse:collapse">';
      _invHtml+='<thead><tr style="background:#f0fdf4"><th style="padding:7px 12px;text-align:left;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.4px">Investigation</th><th style="padding:7px 12px;text-align:left;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.4px">Rationale</th></tr></thead>';
      _invHtml+='<tbody>'+_htnInv.map(function(r,i){return '<tr style="background:'+(i%2===0?'#fff':'#f8fafc')+'"><td style="padding:8px 12px;font-size:13px;font-weight:600;color:#1e293b;border-bottom:1px solid #f1f5f9;white-space:nowrap;min-width:200px">'+r.t+'</td><td style="padding:8px 12px;font-size:12px;color:#475569;border-bottom:1px solid #f1f5f9;line-height:1.5">'+r.r+'</td></tr>';}).join('')+'</tbody>';
      _invHtml+='</table></div>';
      _invHtml+='<div style="padding:7px 12px;font-size:10px;color:#94a3b8;border-top:1px solid #e2e8f0;font-style:italic">Sources: ESC/ESH 2023 Hypertension Guidelines · ADA Standards of Care 2024 · NICE NG136</div>';
      _invHtml+='</div>';
    }
    html+=_invHtml;
    // ── End Investigations ─────────────────────────────────────
    html += '<button class="result-print-btn" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-top:14px;padding:11px;background:#f0f9ff;color:#0369a1;border:2px solid #bae6fd;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit;" onclick="printClassifierResult(\'d-res\',\'Hypertension Assessment\')">🖨️ Print This Assessment</button>';
    res.innerHTML=html;
    wrapTables(res);
  };
  el_.appendChild(card('ESC/ESH BP Classification (2023)','#22c55e','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Classification</th><th>Systolic</th><th>Diastolic</th><th>Action</th></tr></thead><tbody>'+BP_STAGES.map(function(s){var actions={'Optimal':'Lifestyle; recheck every 5 years','Normal':'Lifestyle; recheck every 3 years','High Normal':'Lifestyle; recheck in 3 months. Consider medication if high CV risk.','Grade 1 HTN':'Lifestyle × 3–6 months; initiate medication if CV risk high or no improvement','Grade 2 HTN':'Lifestyle + medication; reassess in 3 months','Grade 3 HTN':'Immediate medication + lifestyle; reassess in 1 month','Isolated Systolic HTN':'Treat as Grade 1–2 based on SBP level; common in elderly','Hypertensive Crisis':'Immediate evaluation; Emergency if symptomatic end-organ damage'};return '<tr style="background:'+s.bg+';border-bottom:1px solid #f1f5f9"><td style="font-weight:700;color:'+s.color+'">'+s.stage+'</td><td>'+s.sys+'</td><td>'+s.dia+'</td><td style="font-size:12px">'+(actions[s.stage]||'')+'</td></tr>';}).join('')+'</tbody></table></div><p style="font-size:11px;color:#64748b;margin-top:8px">ESC/ESH 2023 Guidelines. HTN threshold: ≥140/90 mmHg.</p>'));
}

function tabHTNEval(el_) {
  el_.appendChild(secTitle('📋','HTN Evaluation','Assess severity, end-organ damage, and secondary causes','#f59e0b'));

  // ── eGFR CALCULATOR ──
  var egfrCard = card('🫘 eGFR Calculator (CKD-EPI 2021)','#f59e0b','');
  egfrCard.querySelector('.card-body').innerHTML =
    '<p style="font-size:13px;color:#64748b;margin-bottom:12px">Renal function must be assessed at HTN evaluation. Enter serum creatinine to calculate eGFR and CKD stage.</p>'+
    '<div class="g2" style="margin-bottom:10px">'+
      '<div><label class="lbl">Serum Creatinine</label>'+
        '<div style="display:flex;gap:6px;align-items:center">'+
          '<input id="egfr-cr" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" style="flex:1" placeholder="e.g. 90" oninput="calcEGFR()">'+
          '<select id="egfr-unit" class="inp" style="width:90px" onchange="calcEGFR()"><option value="umol">µmol/L</option><option value="mgdl">mg/dL</option></select>'+
        '</div>'+
      '</div>'+
      '<div><label class="lbl">Age (years)</label><input id="egfr-age" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 55" oninput="calcEGFR()"></div>'+
      '<div><label class="lbl">Sex</label><select id="egfr-sex" class="inp" onchange="calcEGFR()"><option value="">Select</option><option value="male">Male</option><option value="female">Female</option></select></div>'+
      '<div id="egfr-result" style="padding-top:4px"></div>'+
    '</div>'+
    '<div style="font-size:12px;color:#64748b;margin-top:4px">Formula: CKD-EPI 2021 (race-free equation). Source: NEJM 2021; KDIGO 2022.</div>';
  el_.appendChild(egfrCard);

  window.calcEGFR = function(){
    var crRaw = parseFloat(document.getElementById('egfr-cr').value);
    var age = parseFloat(document.getElementById('egfr-age').value);
    var sex = document.getElementById('egfr-sex').value;
    var unit = document.getElementById('egfr-unit').value;
    var res = document.getElementById('egfr-result');
    if(isNaN(crRaw)||isNaN(age)||!sex){ res.innerHTML=''; return; }
    // Convert to mg/dL for CKD-EPI
    var cr = unit==='umol' ? crRaw/88.42 : crRaw;
    // CKD-EPI 2021 (race-free)
    var kappa = sex==='female' ? 0.7 : 0.9;
    var alpha = sex==='female' ? -0.241 : -0.302;
    var ratio = cr/kappa;
    var egfr = 142 * Math.pow(Math.min(ratio,1), alpha) * Math.pow(Math.max(ratio,1), -1.200) * Math.pow(0.9938, age) * (sex==='female'?1.012:1);
    egfr = Math.round(egfr);
    var stage, col, bg, border, action;
    if(egfr>=90){stage='G1 — Normal or High';col='#16a34a';bg='#f0fdf4';border='#bbf7d0';action='Normal function. HTN evaluation standard. Recheck annually if CKD risk factors present.';}
    else if(egfr>=60){stage='G2 — Mildly Decreased';col='#22c55e';bg='#f0fdf4';border='#bbf7d0';action='Mild reduction. Monitor annually. Check urine ACR.';}
    else if(egfr>=45){stage='G3a — Mildly to Moderately Decreased';col='#d97706';bg='#fffbeb';border='#fde68a';action='CKD Stage 3a. Avoid NSAIDs. ACE/ARB preferred antihypertensives. Check K⁺ regularly.';}
    else if(egfr>=30){stage='G3b — Moderately to Severely Decreased';col='#ea580c';bg='#fff7ed';border='#fed7aa';action='CKD Stage 3b. Stop Metformin if eGFR <30. Switch thiazide to loop diuretic. Nephrology referral consider.';}
    else if(egfr>=15){stage='G4 — Severely Decreased';col='#dc2626';bg='#fef2f2';border='#fecaca';action='CKD Stage 4. Nephrology referral required. Avoid Metformin, Spironolactone. Prepare for RRT discussion.';}
    else{stage='G5 — Kidney Failure';col='#7c3aed';bg='#faf5ff';border='#e9d5ff';action='ESRD/Dialysis range. Urgent nephrology. Specialist dosing for ALL medications.';}
    res.innerHTML='<div style="padding:12px 16px;background:'+bg+';border:2px solid '+col+';border-radius:10px">'+
      '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">'+
        '<div><div style="font-size:11px;color:'+col+';font-weight:700;text-transform:uppercase;letter-spacing:1px">eGFR</div>'+
        '<div style="font-size:28px;font-weight:900;color:'+col+'">'+egfr+'</div>'+
        '<div style="font-size:11px;color:#64748b">mL/min/1.73m²</div></div>'+
        '<div style="flex:1;padding-left:12px"><div style="font-weight:700;color:'+col+';margin-bottom:4px">'+stage+'</div>'+
        '<div style="font-size:12px;color:#374151;line-height:1.6">'+action+'</div></div>'+
      '</div>'+
    '</div>';
  };

  // ── LABS CHECKLIST ──
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:18px 0 10px;color:#f59e0b">📁 Evaluation Checklist</h3>'));
  var cats=[
    {label:'📁 Basic Labs',items:['CBC / FBC','Serum creatinine → eGFR (calculate above)','Serum electrolytes (Na⁺, K⁺, Cl⁻, HCO₃⁻)','Fasting glucose & HbA1c','Fasting lipid panel (total, LDL, HDL, TG)','Urinalysis + urine albumin/creatinine ratio (ACR)','Uric acid (gout risk with diuretics)']},
    {label:'📁 Cardiac',items:['12-lead EKG (LVH: Sokolow-Lyon criteria, Cornell voltage)','Echocardiogram if LVH suspected on EKG or clinically','Chest X-ray if heart failure suspected (cardiomegaly, pulmonary oedema)']},
    {label:'📁 Secondary HTN Workup',items:['Renal artery stenosis: Renal Doppler ultrasound','Primary aldosteronism: Aldosterone/Renin Ratio (ARR) — most common cause of secondary HTN','Phaeochromocytoma: 24hr urine catecholamines / plasma metanephrines','Thyroid disease: TSH (both hyper- and hypothyroidism cause HTN)','Obstructive sleep apnoea: overnight sleep study (suspect if snoring + daytime somnolence)','Cushing syndrome: 24hr urinary cortisol or overnight dexamethasone suppression test']},
    {label:'📁 CV Risk Assessment',items:['10-year ASCVD risk (use ASCVD tab →)','BMI & waist circumference (central obesity threshold: ≥102cm men, ≥88cm women)','Fundoscopic exam — hypertensive retinopathy grades I–IV','Ankle-brachial index if peripheral arterial disease suspected']},
  ];
  el_.appendChild(accordion(cats,'#f59e0b',function(panel,item){
    panel.innerHTML=item.items.map(function(i){return '<div style="display:flex;gap:10px;padding:5px 0;border-bottom:1px solid #fde68a55;font-size:13px"><span style="color:#f59e0b;flex-shrink:0">◆</span>'+i+'</div>';}).join('');
  }));

  // ── SECONDARY HTN ──
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">🚩 Secondary HTN — When to Suspect & What to Do</h3>'));
  el_.appendChild(card('Secondary HTN Clues, Causes & Investigation','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Clinical Clue</th><th>Suspected Cause</th><th>First Screening Test</th><th>Prevalence</th></tr></thead><tbody>'+[
    ['Resistant HTN on ≥3 drugs + hypokalaemia (without diuretic)','Primary hyperaldosteronism (Conn\'s syndrome)','Aldosterone/Renin Ratio (ARR) — best done off spironolactone','Most common secondary cause — ~10% of HTN'],
    ['Young patient (<30), refractory HTN, abdominal bruit','Renal artery stenosis (fibromuscular dysplasia or atherosclerotic)','Renal Doppler ultrasound; CT angiography if high suspicion','~1–5% of HTN'],
    ['Episodic HTN + headache + palpitations + diaphoresis (paroxysmal triad)','Phaeochromocytoma / paraganglioma','Plasma free metanephrines or 24hr urine metanephrines','Rare ~0.1–0.6% — but dangerous if missed'],
    ['Loud snoring, daytime sleepiness, obesity, neck circumference >40cm','Obstructive sleep apnoea (OSA)','Epworth Sleepiness Scale + overnight polysomnography (sleep study)','~30–40% of hypertensive patients have OSA'],
    ['Centripetal obesity, purple striae, moon face, proximal myopathy','Cushing syndrome (cortisol excess)','24hr urinary free cortisol or overnight low-dose dexamethasone test','Rare — but important cause of secondary HTN'],
    ['Bradycardia + weight gain + cold intolerance + constipation','Hypothyroidism','TSH','Common — screen all new HTN patients'],
    ['Tachycardia + weight loss + heat intolerance + AF','Hyperthyroidism','TSH (suppressed) + free T4','Treatable and reversible cause of HTN'],
    ['Coarctation: upper limb BP much higher than lower limb + radiofemoral delay','Aortic coarctation','Blood pressure in all 4 limbs + chest X-ray (rib notching) + echo','Rare — presents in younger patients'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-size:12px;font-weight:600">'+r[0]+'</td><td style="font-size:12px;color:#dc2626;font-weight:700">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#64748b">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">🚩 Secondary HTN Red Flags</h3>'));
  el_.appendChild(accordion(RED_FLAGS.map(function(f){return{label:'🚩 '+f.f,cause:f.c,workup:f.wo};}), '#dc2626', function(panel,item){
    panel.innerHTML='<div style="font-size:13px;margin-bottom:8px"><strong style="color:#991b1b">Suspected cause:</strong> '+item.cause+'</div><div style="font-size:12px;background:#fee2e2;padding:8px 12px;border-radius:8px;color:#7f1d1d">🔬 Workup: '+item.workup+'</div>';
  }));
}

function tabHTNTreat(el_) {
  el_.appendChild(secTitle('💊','HTN Treatment','Pharmacotherapy, BP targets, resistant HTN, and hypertensive crisis','#ef4444'));
  el_.appendChild(card('Treatment Decision Pathway (ESC/ESH 2023)','#ef4444',[['Optimal / Normal (<130/85)','No medication. Continue healthy lifestyle. Recheck every 3–5 years.','#16a34a','#f0fdf4'],['High Normal (130–139/85–89)','Lifestyle only. Recheck annually. Consider medication if high CV risk (CVD, DM, CKD, or 10-yr risk ≥10%).','#d97706','#fffbeb'],['Grade 1 (140–159/90–99)','Lifestyle × 3–6 months. If BP remains ≥140/90: initiate 1 medication. If very high CV risk: medicate immediately.','#ea580c','#fff7ed'],['Grade 2 (160–179/100–109)','Lifestyle + medication immediately. Dual therapy preferred. Reassess in 3 months.','#dc2626','#fef2f2'],['Grade 3 (≥180/110)','Immediate dual or triple therapy + lifestyle. Reassess in 1 month. Rule out secondary causes.','#7c3aed','#faf5ff'],['Crisis (>180/>120 + symptoms)','See Crisis Differentiator below ↓','#991b1b','#fff1f2']].map(function(r){return '<div style="display:flex;border-bottom:1px solid #f1f5f9"><div style="width:195px;padding:11px 14px;background:'+r[3]+';border-right:3px solid '+r[2]+';font-size:13px;font-weight:700;color:'+r[2]+';flex-shrink:0">'+r[0]+'</div><div style="padding:11px 14px;font-size:13px;color:#374151;flex:1">'+r[1]+'</div></div>';}).join('')));
  var h2=fromHTML('<h3 style="font-size:15px;font-weight:700;margin:4px 0 10px">💊 Drug Selection by Patient Profile</h3>');
  el_.appendChild(h2);
  el_.appendChild(accordion(DRUG_PROFILES.map(function(d){return{label:'👤 '+d.p,drugs:d.d,note:d.n};}), '#ef4444', function(panel,item){
    panel.innerHTML='<div style="font-size:13px;font-weight:600;margin-bottom:8px">'+item.drugs+'</div><div style="font-size:12px;background:#fee2e2;padding:8px 12px;border-radius:8px;color:#7f1d1d">📌 '+item.note+'</div>';
  }));
  el_.appendChild(card('BP Targets (ESC/ESH 2023)','#ef4444','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Population</th><th>BP Goal</th><th>Note</th></tr></thead><tbody>'+[['General adults with HTN','<140/90 mmHg','First target for all patients. If tolerated, aim for <130/80.'],['Adults <65 years (fit)','<130/80 mmHg','If well-tolerated after reaching <140/90'],['Adults ≥65 years','<140/90 mmHg (SBP 130–139 if tolerated)','Avoid SBP <120 — fall and AKI risk'],['Diabetes mellitus','<130/80 mmHg','Lower target reduces microvascular complications'],['Chronic kidney disease','<130/80 mmHg','ACE/ARB preferred. Monitor K⁺ and eGFR.'],['Previous stroke/TIA','<130/80 mmHg','After acute phase (>48hrs). PROGRESS trial.'],['Crisis — initial management','Reduce MAP by ≤25% in first hour','Then gradually to <160/100 over 24–48hrs']].map(function(r){return '<tr class="tbl-row"><td>'+r[0]+'</td><td style="font-weight:700;color:#ef4444">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));
  // Resistant HTN stepper
  var rh3=fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#7c3aed">🔄 Resistant HTN Pathway</h3>'); el_.appendChild(rh3);
  var rSteps=[{t:'Confirm True Resistance',c:'Verify BP is elevated on ≥3 medications (including a diuretic) at maximal tolerated doses. Rule out white-coat HTN using ambulatory BP monitoring (ABPM) or home readings.'},{t:'Assess Medication Adherence',c:'Non-adherence is the #1 cause of apparent resistance. Review pill burden, side effects, and cost barriers. Pill count or urine drug levels if needed.'},{t:'Optimise Current Regimen',c:'Ensure the diuretic matches GFR — thiazide if eGFR ≥30, switch to loop diuretic if eGFR <30. Maximise doses before adding agents.'},{t:'Rule Out Secondary Causes',c:'Order aldosterone/renin ratio, renal artery Doppler, 24hr urine metanephrines, TSH, and overnight sleep study for OSA. See Evaluation tab.'},{t:'Add 4th Agent — Spironolactone',c:'Spironolactone 25–50 mg/day is the most effective 4th agent (PATHWAY-2 trial, 2015). Alternatives: Eplerenone, Amiloride, Alpha-blocker, or Beta-blocker if not already used.'},{t:'Specialist Referral',c:'Refer to hypertension specialist, nephrologist, or cardiologist if BP remains uncontrolled after Steps 1–5.'},];
  var sBtns=fromHTML('<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px"></div>');
  var sCard=card(null,'#7c3aed','<div id="resist-body"></div>',{borderColor:'#e9d5ff'});
  function showRStep(i){
    document.getElementById('resist-body').innerHTML='<div style="font-size:14px;font-weight:700;color:#7c3aed;margin-bottom:6px">Step '+(i+1)+': '+rSteps[i].t+'</div><div style="font-size:13px;color:#374151;line-height:1.6">'+rSteps[i].c+'</div><div style="display:flex;justify-content:space-between;margin-top:14px"><button onclick="rStep('+(Math.max(0,i-1))+')" style="padding:6px 16px;border-radius:8px;border:none;background:'+(i===0?'#e2e8f0':'#7c3aed')+';color:'+(i===0?'#94a3b8':'#fff')+';font-weight:600;font-size:13px;cursor:'+(i===0?'default':'pointer')+'">← Prev</button><span style="font-size:12px;color:#94a3b8;align-self:center">'+(i+1)+'/'+rSteps.length+'</span><button onclick="rStep('+(Math.min(rSteps.length-1,i+1))+')" style="padding:6px 16px;border-radius:8px;border:none;background:'+(i===rSteps.length-1?'#e2e8f0':'#7c3aed')+';color:'+(i===rSteps.length-1?'#94a3b8':'#fff')+';font-weight:600;font-size:13px;cursor:'+(i===rSteps.length-1?'default':'pointer')+'">Next →</button></div>';
    sBtns.querySelectorAll('button').forEach(function(b,j){b.style.background=j===i?'#7c3aed':'#ede9fe';b.style.color=j===i?'#fff':'#7c3aed';});
  }
  window.rStep=showRStep;
  rSteps.forEach(function(_,i){var b=document.createElement('button');b.textContent='Step '+(i+1);b.style.cssText='padding:6px 14px;border-radius:20px;border:none;font-size:12px;font-weight:700;background:#ede9fe;color:#7c3aed;cursor:pointer';b.onclick=function(){showRStep(i);};sBtns.appendChild(b);});
  el_.appendChild(sBtns); el_.appendChild(sCard); showRStep(0);
  // Crisis differentiator
  var ch3=fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#7c3aed">🆘 Hypertensive Emergency vs. Urgency</h3>'); el_.appendChild(ch3);
  var crCard=card('Answer all 4 questions to differentiate:','#7c3aed','');
  var crBody=crCard.querySelector('.card-body');
  var crQ=[{k:'chest',l:'Chest pain, back pain, or shortness of breath?'},{k:'vision',l:'Visual disturbances, severe headache, or altered consciousness?'},{k:'neuro',l:'Focal neurological deficits, confusion, or seizure?'},{k:'aki',l:'Oliguria, haematuria, or rapidly rising creatinine?'}];
  var crS={chest:null,vision:null,neuro:null,aki:null};
  crBody.innerHTML=crQ.map(function(q){return '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid #ede9fe;flex-wrap:wrap;gap:8px"><span style="font-size:13px;flex:1">'+q.l+'</span><div style="display:flex;gap:8px"><button id="cy-'+q.k+'" onclick="setCQ(\''+q.k+'\',true)" style="padding:5px 16px;border-radius:20px;border:none;font-size:12px;font-weight:700;background:#fee2e2;color:#991b1b;cursor:pointer">Yes</button><button id="cn-'+q.k+'" onclick="setCQ(\''+q.k+'\',false)" style="padding:5px 16px;border-radius:20px;border:none;font-size:12px;font-weight:700;background:#dcfce7;color:#166534;cursor:pointer">No</button></div></div>';}).join('')+'<div id="crisis-res" style="margin-top:12px"></div>';
  el_.appendChild(crCard);
  window.setCQ=function(k,v){
    crS[k]=v;
    var cy=document.getElementById('cy-'+k), cn=document.getElementById('cn-'+k);
    if(cy){cy.style.background=v===true?'#dc2626':'#fee2e2';cy.style.color=v===true?'#fff':'#991b1b';}
    if(cn){cn.style.background=v===false?'#16a34a':'#dcfce7';cn.style.color=v===false?'#fff':'#166534';}
    var vals=Object.values(crS);
    if(vals.indexOf(null)>=0)return;
    var em=vals.indexOf(true)>=0;
    document.getElementById('crisis-res').innerHTML='<div style="padding:14px 18px;border-radius:10px;background:'+(em?'#fef2f2':'#f0fdf4')+';border:2px solid '+(em?'#dc2626':'#22c55e')+'"><div style="font-size:16px;font-weight:800;color:'+(em?'#dc2626':'#16a34a')+';margin-bottom:6px">'+(em?'🆘 Hypertensive EMERGENCY':'⚠ Hypertensive URGENCY')+'</div><div style="font-size:13px;color:#374151;line-height:1.6">'+(em?'IV labetalol/nicardipine/clevidipine. Reduce MAP ≤25% in first hour. ICU admission. Identify cause: aortic dissection, NSTEMI, encephalopathy, AKI, eclampsia.':'Oral antihypertensives. Do NOT lower BP too rapidly (risk of watershed infarction). Follow up 24–72 hours. Options: Clonidine 0.1–0.2mg, Captopril 25mg, Labetalol 200–400mg PO.')+'</div></div>';
  };
}

function tabLifestyle(el_) {
  el_.appendChild(secTitle('🌱','Lifestyle Modifications for HTN','Evidence-based non-pharmacological interventions — ESC/ESH 2023, AHA/ACC, WHO','#8b5cf6'));
  el_.appendChild(notebox('📌 <strong>Guideline sources:</strong> ESC/ESH 2023 Hypertension Guidelines · AHA/ACC 2017 HTN Guidelines · WHO Global Action Plan 2013–2020 · NHLBI DASH Diet Guidelines · ACSM Exercise Guidelines 2022.','#faf5ff','#e9d5ff'));

  // ── Expected BP Reductions ──────────────────────────────────
  el_.appendChild(card('Expected BP Reductions by Intervention','#8b5cf6',
    '<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Intervention</th><th>Target/Dose</th><th>SBP Reduction</th><th>Guideline</th></tr></thead><tbody>'+[
      ['DASH Diet','Full DASH eating plan','8–14 mmHg','NHLBI / ESC/ESH 2023'],
      ['Sodium Restriction','<5g salt/day (<2g sodium)','2–8 mmHg','WHO / ESC/ESH 2023'],
      ['Weight Reduction','Per 1 kg lost (if overweight)','~1 mmHg/kg','AHA/ACC 2017'],
      ['Aerobic Exercise','150 min/week moderate intensity','4–9 mmHg','ACSM 2022 / AHA'],
      ['Isometric Exercise','4×2 min wall squat, 3×/week','~5 mmHg','ESC/ESH 2023'],
      ['Alcohol Restriction','Men ≤14 units/week, Women ≤8','2–4 mmHg','ESC/ESH 2023'],
      ['Smoking Cessation','Complete cessation','Indirect — major CV risk reduction','WHO / ESC/ESH'],
      ['DASH + Sodium combined','Both together','Up to 20 mmHg','NHLBI DASH-Sodium Trial'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#7c3aed">'+r[0]+'</td><td>'+r[1]+'</td><td style="font-weight:800;color:#7c3aed">'+r[2]+'</td><td style="font-size:11px;color:#64748b">'+r[3]+'</td></tr>';}).join('')+
    '</tbody></table></div>'));

  // ── DASH Diet ───────────────────────────────────────────────
  var dashCard = card('🥦 DASH Diet — Dietary Approaches to Stop Hypertension','#16a34a','');
  var dashBody = dashCard.querySelector('.card-body');
  dashBody.innerHTML =
    '<div style="padding:12px 14px;background:#f0fdf4;border:2px solid #86efac;border-radius:10px;margin-bottom:14px">'+
    '<div style="font-size:13px;font-weight:800;color:#15803d;margin-bottom:6px">DASH Diet Framework — 2000 kcal/day Reference Plan (NHLBI)</div>'+
    '<div style="font-size:12px;color:#166534;line-height:1.7">The DASH diet is rich in fruits, vegetables, whole grains, and low-fat dairy. It limits saturated fats, red meat, sweets, and sodium. Clinical evidence shows 8–14 mmHg SBP reduction when followed consistently.</div>'+
    '</div>'+
    '<div style="font-size:12px;font-weight:700;color:#15803d;text-transform:uppercase;margin-bottom:8px">Daily Serving Guide by Food Group</div>'+
    '<div style="overflow-x:auto">'+
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4">'+
    '<th>Food Group</th><th>Servings/Day</th><th>One Serving Equals</th><th>Examples</th><th>Est. Calories/Serving</th>'+
    '</tr></thead><tbody>'+[
      ['Grains (whole)','6–8','1 slice bread / ½ cup cooked rice or pasta / 1 oz dry cereal','Brown rice, oats, whole wheat bread, quinoa, millet, whole grain pasta','80–120 kcal'],
      ['Vegetables','4–5','1 cup raw leafy veg / ½ cup cooked veg / ½ cup vegetable juice','Tomatoes, spinach, broccoli, carrots, sweet potatoes, okra, garden egg','20–45 kcal'],
      ['Fruits','4–5','1 medium fruit / ¼ cup dried fruit / ½ cup fresh/frozen / ½ cup juice','Banana, orange, watermelon, mango, pawpaw, apple, berries','60–80 kcal'],
      ['Low-fat dairy','2–3','1 cup low-fat milk / 1 cup low-fat yoghurt / 1½ oz low-fat cheese','Skimmed milk, low-fat yoghurt, low-fat cheese','80–120 kcal'],
      ['Lean meat/fish/poultry','≤6 oz/day (≤2 servings)','3 oz cooked meat/fish/poultry (palm-sized)','Skinless chicken, turkey, fish (tilapia, mackerel, sardine), egg white','100–150 kcal'],
      ['Nuts, seeds, legumes','4–5 per week','⅓ cup nuts / 2 tbsp seeds / ½ cup cooked beans','Groundnuts, walnuts, sunflower seeds, beans, lentils, soya beans','170–200 kcal'],
      ['Fats & oils','2–3','1 tsp vegetable oil / 1 tbsp low-fat mayo / 2 tbsp salad dressing','Olive oil, canola oil, groundnut oil (small amounts)','40–45 kcal'],
      ['Sweets & added sugar','≤5 per week','1 tbsp sugar/jam/honey / ½ cup sorbet / 1 cup lemonade','Limit: sugary drinks, pastries, sweets, biscuits','60–80 kcal'],
    ].map(function(r){
      return '<tr class="tbl-row"><td style="font-weight:700;color:#15803d">'+r[0]+'</td><td style="font-weight:700;text-align:center;color:#16a34a">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:12px;color:#64748b">'+r[3]+'</td><td style="font-weight:700;color:#16a34a;text-align:center">'+r[4]+'</td></tr>';
    }).join('')+
    '</tbody></table></div>'+
    '<div style="margin-top:12px;padding:10px 14px;background:#dcfce7;border-radius:8px;font-size:12px;color:#15803d;line-height:1.8">'+
    '<strong>⚠ Key DASH Principles for HTN:</strong><br>'+
    '• Prioritise potassium-rich foods (banana, sweet potato, beans) — counteracts sodium effects<br>'+
    '• Prioritise magnesium-rich foods (nuts, seeds, leafy greens) — vasodilatory effect<br>'+
    '• Prioritise calcium-rich foods (low-fat dairy, leafy greens) — supports vascular tone<br>'+
    '• Reduce saturated fat to <6% of total calories<br>'+
    '• Avoid processed, canned and smoked foods — hidden sodium sources<br>'+
    '• <strong>Reference:</strong> NHLBI. Your Guide to Lowering Blood Pressure with DASH. NIH Publication No. 06-4082.'+
    '</div>';
  el_.appendChild(dashCard);

  // ── Sodium Restriction ──────────────────────────────────────
  var sodCard = card('🧂 Sodium Restriction','#0ea5e9','');
  var sodBody = sodCard.querySelector('.card-body');
  sodBody.innerHTML =
    '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px">'+
    '<div style="flex:1;min-width:140px;padding:12px;background:#f0f9ff;border:2px solid #0ea5e9;border-radius:10px;text-align:center">'+
    '<div style="font-size:22px;font-weight:900;color:#0ea5e9">&lt;5g</div>'+
    '<div style="font-size:11px;color:#64748b;font-weight:600">Salt per day</div>'+
    '<div style="font-size:10px;color:#94a3b8">ESC/ESH 2023 / WHO</div></div>'+
    '<div style="flex:1;min-width:140px;padding:12px;background:#f0f9ff;border:2px solid #0369a1;border-radius:10px;text-align:center">'+
    '<div style="font-size:22px;font-weight:900;color:#0369a1">&lt;2g</div>'+
    '<div style="font-size:11px;color:#64748b;font-weight:600">Sodium per day</div>'+
    '<div style="font-size:10px;color:#94a3b8">= 1 teaspoon salt</div></div>'+
    '<div style="flex:1;min-width:140px;padding:12px;background:#f0fdf4;border:2px solid #16a34a;border-radius:10px;text-align:center">'+
    '<div style="font-size:22px;font-weight:900;color:#16a34a">2–8</div>'+
    '<div style="font-size:11px;color:#64748b;font-weight:600">mmHg SBP reduction</div>'+
    '<div style="font-size:10px;color:#94a3b8">With strict adherence</div></div>'+
    '</div>'+
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>High Sodium — AVOID/LIMIT</th><th>Low Sodium — PREFERRED</th></tr></thead><tbody>'+[
      ['Table salt, seasoning cubes (Maggi, Knorr)','Fresh herbs, garlic, onion, ginger, lemon juice'],
      ['Processed meats (sausage, corned beef, bacon)','Fresh chicken, fish, lean beef — cooked without salt'],
      ['Canned foods (baked beans, canned tomatoes)','Fresh or frozen vegetables — cooked without added salt'],
      ['Salted snacks (crisps, salted nuts, crackers)','Unsalted nuts, fresh fruits, plain popcorn'],
      ['Fast food, takeaways, instant noodles','Home-cooked meals with controlled salt'],
      ['Smoked and dried fish (high salt content)','Fresh fish — grilled, boiled or steamed'],
      ['Soy sauce, ketchup, bottled sauces','Homemade tomato sauce with no added salt'],
    ].map(function(r){return '<tr class="tbl-row"><td style="color:#dc2626;font-size:13px">❌ '+r[0]+'</td><td style="color:#16a34a;font-size:13px">✅ '+r[1]+'</td></tr>';}).join('')+
    '</tbody></table></div>'+
    '<div style="margin-top:10px;font-size:12px;color:#64748b;font-style:italic">Source: WHO. Sodium intake for adults and children. Geneva: WHO; 2012. ESC/ESH 2023 Hypertension Guidelines.</div>';
  el_.appendChild(sodCard);

  // ── Physical Activity ───────────────────────────────────────
  var paCard = card('🏃 Physical Activity — Evidence-Based Recommendations','#0ea5e9','');
  var paBody = paCard.querySelector('.card-body');
  paBody.innerHTML =
    '<div style="padding:12px 14px;background:#f0f9ff;border:2px solid #bae6fd;border-radius:10px;margin-bottom:14px;font-size:13px;color:#0369a1;line-height:1.7">'+
    '<strong>Standard Recommendation (AHA/ACC 2017, ESC/ESH 2023, ACSM 2022, WHO 2020):</strong><br>'+
    '150–300 minutes of <strong>moderate-intensity aerobic exercise per week</strong>, OR 75–150 minutes of <strong>vigorous-intensity</strong> per week, OR an equivalent combination of both. Additionally, <strong>muscle-strengthening activities ≥2 days/week.</strong>'+
    '</div>'+
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Type</th><th>Activity</th><th>Frequency</th><th>Duration</th><th>Intensity</th><th>BP Reduction</th><th>Source</th></tr></thead><tbody>'+[
      ['Aerobic (Dynamic)','Brisk walking, jogging, swimming, cycling, dancing','3–5 days/week','30–60 min/session','Moderate (50–70% max HR)','4–9 mmHg SBP','AHA/ACC 2017, ACSM 2022'],
      ['Isometric Exercise','Wall squat (4×2 min), handgrip exercise','3 days/week','4×2 min with 1–4 min rest','Sustained muscle contraction','~5 mmHg SBP','ESC/ESH 2023 (Class I)'],
      ['Resistance Training','Weight training, resistance bands, bodyweight exercises','2–3 days/week','2–3 sets, 8–12 reps per exercise','Moderate (60–80% 1RM)','2–3 mmHg SBP','ACSM 2022, AHA'],
      ['Flexibility & Balance','Stretching, yoga, Tai Chi','2–3 days/week','10–20 min','Low-moderate','Indirect — reduces stress + fall risk','WHO 2020, AHA'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td><td style="font-weight:700;color:#16a34a">'+r[5]+'</td><td style="font-size:11px;color:#64748b">'+r[6]+'</td></tr>';}).join('')+
    '</tbody></table></div>'+
    '<div style="margin-top:12px;padding:10px 14px;background:#fef2f2;border-radius:8px;font-size:12px;color:#dc2626;line-height:1.7">'+
    '<strong>⚠ Caution:</strong> Patients with uncontrolled BP >180/110 mmHg should not begin vigorous exercise until BP is controlled. Isometric exercise is contraindicated in hypertensive crisis. Always screen with a clinician before starting a new exercise programme in high-risk patients.<br>'+
    '<span style="color:#64748b"><strong>References:</strong> WHO Guidelines on Physical Activity 2020 · ACSM Guidelines for Exercise Testing and Prescription, 11th Ed, 2022 · AHA/ACC 2017 HTN Guideline · ESC/ESH 2023 HTN Guideline.</span>'+
    '</div>';
  el_.appendChild(paCard);

  // ── Weight Reduction ────────────────────────────────────────
  el_.appendChild(card('⚖️ Weight Reduction','#f97316',
    '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px">'+
    '<div style="flex:1;min-width:130px;padding:12px;background:#fff7ed;border:2px solid #f97316;border-radius:10px;text-align:center">'+
    '<div style="font-size:20px;font-weight:900;color:#f97316">18.5–24.9</div>'+
    '<div style="font-size:11px;color:#64748b;font-weight:600">Target BMI (kg/m²)</div>'+
    '<div style="font-size:10px;color:#94a3b8">AHA/ACC 2017</div></div>'+
    '<div style="flex:1;min-width:130px;padding:12px;background:#fff7ed;border:2px solid #ea580c;border-radius:10px;text-align:center">'+
    '<div style="font-size:20px;font-weight:900;color:#ea580c">~1 mmHg</div>'+
    '<div style="font-size:11px;color:#64748b;font-weight:600">SBP drop per kg lost</div>'+
    '<div style="font-size:10px;color:#94a3b8">ESC/ESH 2023</div></div>'+
    '<div style="flex:1;min-width:130px;padding:12px;background:#fff7ed;border:2px solid #c2410c;border-radius:10px;text-align:center">'+
    '<div style="font-size:20px;font-weight:900;color:#c2410c">&lt;94cm M / &lt;80cm F</div>'+
    '<div style="font-size:11px;color:#64748b;font-weight:600">Waist circumference target</div>'+
    '<div style="font-size:10px;color:#94a3b8">ESC/ESH 2023</div></div>'+
    '</div>'+
    '<div class="tbl-wrap"><table><thead><tr style="background:#fff7ed"><th>BMI (kg/m²)</th><th>Category</th><th>Action</th></tr></thead><tbody>'+[
      ['<18.5','Underweight','Nutritional review — not a target for BP management'],
      ['18.5–24.9','Normal weight','Maintain weight. Continue DASH + exercise.'],
      ['25.0–29.9','Overweight','Weight loss recommended. Target 5–10% body weight reduction.'],
      ['30.0–34.9','Obese Class I','Structured weight loss programme. DASH + caloric deficit 500 kcal/day.'],
      ['≥35','Obese Class II+','Intensive intervention. Consider referral to dietitian/bariatric specialist.'],
    ].map(function(r){
      var col=r[1]==='Normal weight'?'#16a34a':r[1]==='Underweight'?'#d97706':'#dc2626';
      return '<tr class="tbl-row"><td style="font-weight:700;color:'+col+'">'+r[0]+'</td><td style="color:'+col+';font-weight:600">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';
    }).join('')+
    '</tbody></table></div>'));

  // ── Alcohol ─────────────────────────────────────────────────
  el_.appendChild(card('🍺 Alcohol Restriction','#d97706',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fffbeb"><th>Group</th><th>Maximum</th><th>BP Benefit</th><th>Source</th></tr></thead><tbody>'+[
      ['Men','≤14 units/week (≤2 units/day)','2–4 mmHg SBP reduction','ESC/ESH 2023'],
      ['Women','≤8 units/week (≤1 unit/day)','2–4 mmHg SBP reduction','ESC/ESH 2023'],
      ['All patients with HTN','Ideally abstain or minimise','Best BP results with zero alcohol','WHO'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#d97706">'+r[0]+'</td><td>'+r[1]+'</td><td style="font-weight:700;color:#16a34a">'+r[2]+'</td><td style="font-size:11px;color:#64748b">'+r[3]+'</td></tr>';}).join('')+
    '</tbody></table></div>'+
    '<div style="margin-top:10px;padding:10px;background:#fffbeb;border-radius:8px;font-size:12px;color:#92400e">1 unit = 10ml pure alcohol = 1 small glass wine (125ml) = ½ pint beer = 1 measure spirit (25ml)</div>'));

  // ── Stress Reduction ────────────────────────────────────────
  var stCard = card('🧘 Stress Reduction','#ec4899','');
  var stBody = stCard.querySelector('.card-body');
  stBody.innerHTML =
    '<div style="padding:10px 14px;background:#fdf2f8;border:1px solid #fbcfe8;border-radius:8px;margin-bottom:14px;font-size:13px;color:#be185d;line-height:1.7">'+
    'Chronic psychological stress activates the sympathetic nervous system, raises cortisol and adrenaline, and contributes to sustained BP elevation. Stress management is a recognised component of HTN lifestyle treatment (ESC/ESH 2023, AHA).'+
    '</div>'+
    '<div class="tbl-wrap"><table><thead><tr style="background:#fdf2f8"><th>Activity</th><th>Evidence</th><th>Recommended Duration/Frequency</th><th>BP Effect</th></tr></thead><tbody>'+[
      ['Mindfulness-Based Stress Reduction (MBSR)','RCT evidence — Linden et al. 2012 meta-analysis','20–45 min daily or 8-week structured programme','SBP ↓ 4–5 mmHg'],
      ['Deep Breathing / Diaphragmatic Breathing','Endorsed by AHA. Activates parasympathetic NS.','5–10 min, 2–3×/day. Inhale 4s, hold 4s, exhale 6s.','Acute SBP reduction 5–10 mmHg'],
      ['Progressive Muscle Relaxation (PMR)','Cochrane review supports use in HTN','15–20 min daily — tense and release muscle groups','SBP ↓ 3–5 mmHg'],
      ['Yoga','Multiple RCTs support BP reduction in HTN','3–5 sessions/week, 45–60 min/session','SBP ↓ 5–7 mmHg (Cramer et al. 2014)'],
      ['Tai Chi','Meta-analysis: Yeh et al. 2008 — significant BP reduction','3–5×/week, 30–60 min/session','SBP ↓ 4–8 mmHg'],
      ['Regular moderate exercise','Dual benefit — stress + BP (AHA/ACSM)','150 min/week (see Physical Activity section)','SBP ↓ 4–9 mmHg'],
      ['Social support and connection','WHO mental health guidelines — reduces stress hormones','Encourage regular meaningful social interaction','Indirect BP benefit'],
      ['Sleep hygiene','Poor sleep linked to HTN (ESC/ESH 2023)','Target 7–9 hrs/night. Treat OSA if present.','SBP ↓ 2–3 mmHg with improved sleep'],
      ['Cognitive Behavioural Therapy (CBT)','NICE-endorsed for stress/anxiety in chronic disease','6–12 sessions with trained therapist','Indirect — reduces sympathetic activation'],
      ['Spiritual practice / Prayer','Culturally relevant in Nigerian/African clinical context — supported by AHA wellbeing guidelines','Daily practice — individualised','Indirect stress reduction'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#ec4899">'+r[0]+'</td><td style="font-size:12px;color:#64748b">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-weight:700;color:#16a34a;font-size:12px">'+r[3]+'</td></tr>';}).join('')+
    '</tbody></table></div>';
  el_.appendChild(stCard);

  // ── Smoking Cessation ───────────────────────────────────────
  el_.appendChild(card('🚭 Smoking Cessation','#dc2626',
    '<div style="padding:12px 14px;background:#fef2f2;border:2px solid #fecaca;border-radius:10px;margin-bottom:12px;font-size:13px;color:#1e293b;line-height:1.7">'+
    'Smoking is the single most preventable cause of cardiovascular death worldwide (WHO). Each cigarette causes an acute BP rise of 10–20 mmHg. Long-term smoking accelerates atherosclerosis, reduces antihypertensive drug efficacy, and dramatically amplifies CV risk in hypertensive patients. <strong>Complete cessation is mandatory — not optional.</strong>'+
    '</div>'+
    '<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Intervention</th><th>Details</th><th>Source</th></tr></thead><tbody>'+[
      ['Brief advice from clinician','Even 3-minute counselling increases quit rates by 30%','WHO MPOWER Framework'],
      ['Nicotine Replacement Therapy (NRT)','Patches, gum, lozenge, inhaler — doubles quit success rate','NICE NG209 / WHO'],
      ['Varenicline (Champix)','Most effective pharmacotherapy — 3× higher quit rates than placebo','Cochrane Review 2022'],
      ['Bupropion','Alternative if varenicline not tolerated — caution in seizure history','BNF / WHO'],
      ['Behavioural support','Group or individual counselling — significantly improves outcomes','NICE NG209'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#dc2626">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:11px;color:#64748b">'+r[2]+'</td></tr>';}).join('')+
    '</tbody></table></div>'));
}


function tabRiskProfile(el_) {
  el_.appendChild(secTitle('👤','Patient Risk Profile','Generate personalised recommendations based on patient profile','#06b6d4'));
  var rf=S.riskForm;
  var c=card('Patient Information','#06b6d4','');
  var b=c.querySelector('.card-body');
  function row(lbl,inp){return '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9;flex-wrap:wrap;gap:8px"><span style="font-size:13px;min-width:200px">'+lbl+'</span><div>'+inp+'</div></div>';}
  b.innerHTML=row('Age (years)','<input id="rp-age" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" style="width:90px" placeholder="e.g. 58" value="'+rf.age+'">')+
    row('Biological Sex','<div style="display:flex;gap:6px"><button id="rp-m" style="padding:5px 16px;border-radius:20px;border:none;font-size:12px;font-weight:600;cursor:pointer;background:'+(rf.sex==='male'?'#06b6d4':'#e0f2fe')+';color:'+(rf.sex==='male'?'#fff':'#0369a1')+'">Male</button><button id="rp-f" style="padding:5px 16px;border-radius:20px;border:none;font-size:12px;font-weight:600;cursor:pointer;background:'+(rf.sex==='female'?'#06b6d4':'#e0f2fe')+';color:'+(rf.sex==='female'?'#fff':'#0369a1')+'">Female</button></div>')+
    row('Current BP Stage','<select id="rp-stage" class="inp" style="font-size:13px"><option value="normal"'+(rf.stage==='normal'?' selected':'')+'>Normal / Elevated</option><option value="stage1"'+(rf.stage==='stage1'?' selected':'')+'>Stage 1 HTN</option><option value="stage2"'+(rf.stage==='stage2'?' selected':'')+'>Stage 2 HTN</option><option value="crisis"'+(rf.stage==='crisis'?' selected':'')+'>Hypertensive Crisis</option></select>')+
    row('BMI','<input id="rp-bmi" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" style="width:90px" placeholder="e.g. 28" value="'+rf.bmi+'">')+
    ['Diabetes Mellitus:diabetes','Chronic Kidney Disease:ckd','Known CVD:cvd','Current Smoker:smoking'].map(function(s){var parts=s.split(':');return row(parts[0],'<button class="toggle" id="rpt-'+parts[1]+'" style="background:'+(rf[parts[1]]?'#06b6d4':'#e2e8f0')+'"><span class="toggle-knob" style="left:'+(rf[parts[1]]?'22':'3')+'px"></span></button>');}).join('')+
    '<button id="rp-gen" style="width:100%;margin-top:16px;padding:11px;background:#06b6d4;color:#fff;border:none;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer">Generate Recommendations →</button>';
  el_.appendChild(c);
  document.getElementById('rp-m').onclick=function(){rf.sex='male';document.getElementById('rp-m').style.background='#06b6d4';document.getElementById('rp-m').style.color='#fff';document.getElementById('rp-f').style.background='#e0f2fe';document.getElementById('rp-f').style.color='#0369a1';};
  document.getElementById('rp-f').onclick=function(){rf.sex='female';document.getElementById('rp-f').style.background='#06b6d4';document.getElementById('rp-f').style.color='#fff';document.getElementById('rp-m').style.background='#e0f2fe';document.getElementById('rp-m').style.color='#0369a1';};
  ['diabetes','ckd','cvd','smoking'].forEach(function(k){var t=document.getElementById('rpt-'+k);if(t)t.onclick=function(){rf[k]=!rf[k];t.style.background=rf[k]?'#06b6d4':'#e2e8f0';t.querySelector('.toggle-knob').style.left=rf[k]?'22px':'3px';};});
  var resDiv=fromHTML('<div id="rp-result"></div>'); el_.appendChild(resDiv);
  document.getElementById('rp-gen').onclick=function(){
    rf.age=document.getElementById('rp-age').value; rf.bmi=document.getElementById('rp-bmi').value; rf.stage=document.getElementById('rp-stage').value;
    var r={};
    r.drug=rf.cvd?'Beta-blocker + ACE inhibitor or ARB':rf.ckd?'ACE inhibitor or ARB (renoprotective)':rf.diabetes?'ACE inhibitor or ARB (preferred)':'Thiazide, ACE inhibitor, ARB, or CCB';
    r.target='<130/80 mmHg'+(parseInt(rf.age)>=65&&!rf.ckd&&!rf.diabetes?' (individualise if frail)':'');
    r.fu=rf.stage==='crisis'?'Emergency now':rf.stage==='stage2'?'1 month':rf.stage==='stage1'?'3–6 months':'6–12 months';
    var ls=[];if(parseFloat(rf.bmi)>=25)ls.push('Weight reduction (BMI ≥25)');if(rf.smoking)ls.push('Smoking cessation (high priority)');if(rf.diabetes)ls.push('DASH diet + sodium restriction');if(!ls.length)ls.push('DASH diet, sodium restriction, physical activity');
    var risks=[];if(rf.ckd)risks.push('Monitor eGFR & K⁺ closely with ACE/ARB');if(rf.diabetes)risks.push('Screen for albuminuria annually');if(rf.cvd)risks.push('Comprehensive cardiac risk management required');if(parseInt(rf.age)>=65)risks.push('Fall risk with aggressive BP lowering');
    document.getElementById('rp-result').innerHTML='<div class="g2" style="margin-top:12px"><div class="card"><div class="card-hdr" style="border-bottom:3px solid #06b6d4">Recommended Drug</div><div class="card-body" style="font-size:14px;color:#0e7490;font-weight:600;line-height:1.5">'+r.drug+'</div></div><div class="card"><div class="card-hdr" style="border-bottom:3px solid #06b6d4">BP Target</div><div class="card-body"><div style="font-size:20px;font-weight:800;color:#0e7490">'+r.target+'</div><div style="font-size:12px;color:#64748b;margin-top:6px">Follow-up: '+r.fu+'</div></div></div></div><div class="card" style="margin-top:8px"><div class="card-hdr" style="border-bottom:3px solid #8b5cf6">Priority Lifestyle</div><div class="card-body">'+ls.map(function(l){return '<div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #f1f5f9;font-size:13px"><span style="color:#8b5cf6">🌱</span>'+l+'</div>';}).join('')+'</div></div>'+(risks.length?'<div class="card"><div class="card-hdr" style="border-bottom:3px solid #ef4444">Clinical Considerations</div><div class="card-body">'+risks.map(function(r){return '<div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #fecaca;font-size:13px"><span>⚠</span>'+r+'</div>';}).join('')+'</div></div>':'');
  };
}

function tabASCVD(el_) {
  el_.appendChild(secTitle('📐','ASCVD Risk Calculator','ACC/AHA Pooled Cohort Equations — 10-year cardiovascular risk','#ec4899'));
  var c=card('Patient Parameters','#ec4899','');
  c.querySelector('.card-body').innerHTML='<div class="g2"><div><label class="lbl">Age (40–79 yrs)</label><input id="a-age" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" value="55"></div><div><label class="lbl">Total Cholesterol (mg/dL)</label><input id="a-tc" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" value="200"></div><div><label class="lbl">HDL Cholesterol (mg/dL)</label><input id="a-hdl" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" value="50"></div><div><label class="lbl">Systolic BP (mmHg)</label><input id="a-sbp" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" value="130"></div></div><div class="g2" style="margin-top:12px"><div><label class="lbl">Sex</label><select id="a-sex" class="inp"><option value="male">Male</option><option value="female">Female</option></select></div><div><label class="lbl">Race</label><select id="a-race" class="inp"><option value="white">White</option><option value="black">Black / African American</option></select></div></div><div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:10px 12px;font-size:12px;color:#92400e;margin-top:10px">⚠ <strong>Race limitation:</strong> These equations are validated for White and Black adults only (ages 40–79). For other ethnicities, results may under- or over-estimate risk. Use the <strong>ACC/AHA Risk Estimator Plus</strong> for additional guidance.</div><div style="display:flex;gap:24px;margin-top:12px;flex-wrap:wrap"><label style="display:flex;align-items:center;gap:8px;font-size:13px;cursor:pointer"><input type="checkbox" id="a-bpm" style="width:16px;height:16px"> On BP Medication</label><label style="display:flex;align-items:center;gap:8px;font-size:13px;cursor:pointer"><input type="checkbox" id="a-dm" style="width:16px;height:16px"> Diabetes</label><label style="display:flex;align-items:center;gap:8px;font-size:13px;cursor:pointer"><input type="checkbox" id="a-smk" style="width:16px;height:16px"> Current Smoker</label></div><button id="a-calc" style="width:100%;margin-top:14px;padding:11px;background:#ec4899;color:#fff;border:none;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer">Calculate 10-Year ASCVD Risk →</button><div id="a-res" style="margin-top:12px"></div>';
  el_.appendChild(c);
  document.getElementById('a-calc').onclick=function(){
    var f={age:document.getElementById('a-age').value,totalChol:document.getElementById('a-tc').value,hdl:document.getElementById('a-hdl').value,sbp:document.getElementById('a-sbp').value,sex:document.getElementById('a-sex').value,race:document.getElementById('a-race').value,onBpMed:document.getElementById('a-bpm').checked,diabetes:document.getElementById('a-dm').checked,smoker:document.getElementById('a-smk').checked};
    try{
      var s=calcASCVD(f),high=s>=10,col=high?'#dc2626':'#16a34a';
      document.getElementById('a-res').innerHTML='<div style="padding:20px;background:'+(high?'#fef2f2':'#f0fdf4')+';border:2px solid '+col+';border-radius:10px;text-align:center"><div style="font-size:52px;font-weight:900;color:'+col+'">'+s.toFixed(1)+'%</div><div style="font-size:16px;font-weight:700;color:'+col+';margin-bottom:8px">'+(high?'HIGH (≥10%)':'LOW-MODERATE (<10%)')+'</div><div style="font-size:13px;color:#64748b;margin-bottom:12px">10-year risk of fatal or non-fatal MACE</div><div style="font-size:13px;color:#374151;line-height:1.6;text-align:left;background:#fff;padding:12px;border-radius:8px">'+(high?'≥10%: If Stage 1 HTN, initiate antihypertensive + lifestyle. Target BP &lt;130/80 mmHg. Consider statin.':'&lt;10%: For Stage 1 HTN, lifestyle × 3–6 months before medication. Reassess risk annually.')+'</div></div>';
    }catch(e){document.getElementById('a-res').innerHTML='<p style="color:#ef4444;font-size:13px">Error — check values are within physiological ranges.</p>';}
  };
}

function tabMedChecker(el_) {
  el_.appendChild(secTitle('⚠️','Medication Interaction Checker','Select antihypertensive medications to screen for known interactions','#f97316'));
  el_.appendChild(notebox('⚠ <strong>Scope:</strong> This tool checks antihypertensive-to-antihypertensive interactions only. Always verify the complete drug list against a full interaction database (e.g. Lexicomp, Micromedex) before prescribing.','#fff7ed','#fed7aa'));
  var c=card('Select Medications','#f97316','');
  var b=c.querySelector('.card-body');
  var g=fromHTML('<div class="g2" style="gap:8px;margin-bottom:12px"></div>');
  MEDICATIONS.forEach(function(med){
    var btn=fromHTML('<button style="padding:9px 14px;border-radius:10px;border:2px solid #e2e8f0;background:#fff;color:#374151;font-size:12px;font-weight:500;text-align:left;cursor:pointer;width:100%">'+med+'</button>');
    btn.onclick=function(){
      var idx=S.selMeds.indexOf(med);
      if(idx>=0){S.selMeds.splice(idx,1);btn.style.borderColor='#e2e8f0';btn.style.background='#fff';btn.style.color='#374151';btn.style.fontWeight='500';btn.textContent=med;}
      else{S.selMeds.push(med);btn.style.borderColor='#f97316';btn.style.background='#fff7ed';btn.style.color='#c2410c';btn.style.fontWeight='700';btn.textContent='✓ '+med;}
      updateInter();
    };
    g.appendChild(btn);
  });
  b.appendChild(g);
  var inf=fromHTML('<div id="med-sel-info"></div>'); b.appendChild(inf);
  el_.appendChild(c);
  var rd=fromHTML('<div id="inter-res"></div>'); el_.appendChild(rd);
  function updateInter(){
    var si=document.getElementById('med-sel-info'),ri=document.getElementById('inter-res');
    si.innerHTML=S.selMeds.length?'<div style="padding:8px 12px;background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;font-size:12px;color:#92400e;margin-top:4px">Selected ('+S.selMeds.length+'): '+S.selMeds.map(function(s){return s.split('(')[0].trim();}).join(', ')+'</div>':'';
    if(S.selMeds.length<2){ri.innerHTML=S.selMeds.length===1?'<p style="font-size:13px;color:#64748b;margin-top:12px">Select at least 2 medications to check for interactions.</p>':'';return;}
    var found=INTERACTIONS.filter(function(i){return i.drugs.every(function(d){return S.selMeds.indexOf(d)>=0;});});
    var sc={HIGH:'#dc2626',MEDIUM:'#d97706',LOW:'#16a34a'},sb={HIGH:'#fef2f2',MEDIUM:'#fffbeb',LOW:'#f0fdf4'};
    ri.innerHTML='<h3 style="font-size:15px;font-weight:700;margin:12px 0 10px">'+(found.length?'⚠ '+found.length+' Interaction(s) Found':'✅ No Flagged Interactions')+'</h3>'+found.map(function(inter){return '<div style="margin-bottom:12px;padding:14px 18px;background:'+sb[inter.sev]+';border:2px solid '+sc[inter.sev]+';border-radius:12px"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">'+badge(inter.sev+' RISK','#fff',sc[inter.sev])+'<span style="font-size:13px;font-weight:600">'+inter.drugs.map(function(d){return d.split('(')[0].trim();}).join(' + ')+'</span></div><div style="font-size:13px;color:#374151;line-height:1.6">'+inter.msg+'</div></div>';}).join('');
  }
}
function tabBPTracker(el_) {
  el_.appendChild(secTitle('📈','BP Patient Tracker','Per-patient BP monitoring with trend analysis','#14b8a6'));

  // ── STORAGE HELPERS ──────────────────────────────────────────
  var STORE_KEY = 'triad_bp_patients_v2';
  function loadPatients() {
    try { var d = localStorage.getItem(STORE_KEY); return d ? JSON.parse(d) : {}; } catch(e) { return {}; }
  }
  function savePatients(pts) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(pts)); } catch(e) {}
  }

  // ── STATE ────────────────────────────────────────────────────
  // Use window-level patients so delete/edit closures always reference the same object
  if (!window._bpPatients) window._bpPatients = loadPatients();
  else window._bpPatients = loadPatients(); // re-sync from storage on each tab open
  var patients = window._bpPatients;
  if (typeof window._bpActivePatient === 'undefined') window._bpActivePatient = null;
  // Sync local alias
  Object.defineProperty(window, '_bpPatientProxy', {
    get: function(){ return window._bpActivePatient; },
    set: function(v){ window._bpActivePatient = v; },
    configurable: true
  });

  // ── BP CLASSIFICATION ────────────────────────────────────────
  // classifyBP — uses global ESC/ESH 2023 function
  // Safe wrapper for tracker display (handles error returns gracefully)
  function bpClass(sys, dia) {
    var r = classifyBP(sys, dia);
    if (!r || r.error) return { stage:'Invalid', color:'#94a3b8', bg:'#f1f5f9' };
    return r;
  }

  // ── TREND INTERPRETATION ────────────────────────────────────
  function interpretTrend(readings) {
    if (!readings || readings.length < 2) return null;
    var n = readings.length;
    var sorted = readings.slice().sort(function(a,b){ return new Date(a.date+'T'+(a.time||'00:00')) - new Date(b.date+'T'+(b.time||'00:00')); });
    var first = sorted[0], last = sorted[sorted.length-1];
    var recent = sorted.slice(-3);
    var avgSys = Math.round(sorted.reduce(function(s,r){return s+r.sys;},0)/n);
    var avgDia = Math.round(sorted.reduce(function(s,r){return s+r.dia;},0)/n);
    var sysDiff = last.sys - first.sys;
    var diaDiff = last.dia - first.dia;
    var recentSys = recent.map(function(r){return r.sys;});
    var rising = recentSys.every(function(v,i){return i===0||v>=recentSys[i-1];});
    var falling = recentSys.every(function(v,i){return i===0||v<=recentSys[i-1];});
    var atTarget = last.sys < 130 && last.dia < 80;
    var crisis = sorted.some(function(r){return r.sys>=180||r.dia>=120;});
    var cls = bpClass(avgSys, avgDia);

    var lines = [];
    // Direction
    if (Math.abs(sysDiff) <= 3) lines.push({ icon:'→', color:'#64748b', text:'BP is stable — systolic has not changed significantly across all readings.' });
    else if (sysDiff < -5)      lines.push({ icon:'↓', color:'#16a34a', text:'Systolic BP is trending downward by '+Math.abs(sysDiff)+' mmHg from first to latest reading — a positive response.' });
    else if (sysDiff > 5)       lines.push({ icon:'↑', color:'#dc2626', text:'Systolic BP is trending upward by '+sysDiff+' mmHg from first to latest reading — warrants clinical review.' });
    // Recent pattern
    if (n >= 3) {
      if (rising)  lines.push({ icon:'⚠️', color:'#dc2626', text:'Last 3 readings show a consecutive rise in systolic BP — consider medication review or lifestyle reassessment.' });
      if (falling) lines.push({ icon:'✅', color:'#16a34a', text:'Last 3 readings show a consecutive fall in systolic BP — treatment appears effective.' });
    }
    // Average classification
    lines.push({ icon:'📊', color:cls.color, text:'Average BP across all '+n+' readings: '+avgSys+'/'+avgDia+' mmHg — classified as '+cls.stage+'.' });
    // Target
    if (atTarget) lines.push({ icon:'🎯', color:'#16a34a', text:'Latest reading ('+last.sys+'/'+last.dia+') is at or below the target of <130/80 mmHg — goal achieved.' });
    else          lines.push({ icon:'🎯', color:'#dc2626', text:'Latest reading ('+last.sys+'/'+last.dia+') has not yet reached the target of <130/80 mmHg.' });
    // Crisis alert
    if (crisis)   lines.push({ icon:'🚨', color:'#7f1d1d', text:'One or more readings recorded ≥180/120 mmHg — hypertensive crisis threshold reached. Urgent review required.' });
    // Recommendation
    var rec = '';
    if (atTarget && !rising) rec = 'Continue current management. Recheck BP in 3 months.';
    else if (rising)         rec = 'Escalate therapy. Review medication adherence and lifestyle factors. Consider 24hr ABPM if not done.';
    else if (sysDiff > 10)   rec = 'Significant upward trend. Review and optimise antihypertensive regimen.';
    else if (sysDiff < -10)  rec = 'Good downward trend. If target reached, maintain current regimen. Monitor for hypotension.';
    else                     rec = 'BP not yet at target. Review adherence, salt intake, weight, and consider drug optimisation.';
    lines.push({ icon:'💊', color:'#0891b2', text:'Recommendation: '+rec });
    return lines;
  }

  // ── SVG CHART ────────────────────────────────────────────────
  function renderPatientChart(readings, containerId) {
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    if (!readings || readings.length < 2) {
      wrap.innerHTML = '<p style="font-size:13px;color:#94a3b8;text-align:center;padding:20px">Log at least 2 readings to see the trend chart.</p>';
      return;
    }
    var sorted = readings.slice().sort(function(a,b){ return new Date(a.date+'T'+(a.time||'00:00')) - new Date(b.date+'T'+(b.time||'00:00')); });
    var last12 = sorted.slice(-12);
    var W=520,H=200,pL=44,pR=16,pT=24,pB=48,cW=W-pL-pR,cH=H-pT-pB;
    var allV = last12.map(function(r){return r.sys;}).concat(last12.map(function(r){return r.dia;}));
    var yMax=Math.max.apply(null,allV.concat([160]))+12;
    var yMin=Math.max(40,Math.min.apply(null,allV.concat([60]))-12);
    var yR=yMax-yMin;
    function yp(v){return pT+cH-(v-yMin)/yR*cH;}
    function xp(i){return pL+(last12.length===1?cW/2:i/(last12.length-1)*cW);}
    var avgSys=Math.round(last12.reduce(function(s,r){return s+r.sys;},0)/last12.length);

    var svg='<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:'+W+'px;display:block;margin:0 auto" font-family="system-ui,sans-serif">';
    // Zone bands
    svg+='<rect x="'+pL+'" y="'+pT+'" width="'+cW+'" height="'+(yp(0)-yp(130))+'" fill="#dcfce7" opacity="0.35"/>';
    svg+='<rect x="'+pL+'" y="'+yp(130)+'" width="'+cW+'" height="'+(yp(0)-yp(140)-( yp(0)-yp(130) ))+'" fill="#fef9c3" opacity="0.4"/>';
    svg+='<rect x="'+pL+'" y="'+yp(140)+'" width="'+cW+'" height="'+(yp(yMin)-yp(140))+'" fill="#fef2f2" opacity="0.4"/>';
    // Grid lines
    [120,130,140,160,180].forEach(function(v){
      if(v>=yMin&&v<=yMax){
        svg+='<line x1="'+pL+'" y1="'+yp(v)+'" x2="'+(pL+cW)+'" y2="'+yp(v)+'" stroke="#e2e8f0" stroke-width="1"/>';
        svg+='<text x="'+(pL-4)+'" y="'+(yp(v)+4)+'" text-anchor="end" font-size="10" fill="#94a3b8">'+v+'</text>';
      }
    });
    // Avg SYS line
    svg+='<line x1="'+pL+'" y1="'+yp(avgSys)+'" x2="'+(pL+cW)+'" y2="'+yp(avgSys)+'" stroke="#0ea5e9" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>';
    svg+='<text x="'+(pL+cW+2)+'" y="'+(yp(avgSys)+4)+'" font-size="9" fill="#0ea5e9" opacity="0.8">avg</text>';
    // Reference lines labels
    svg+='<text x="'+(pL+4)+'" y="'+(yp(130)-4)+'" font-size="9" fill="#16a34a" opacity="0.8">Target &lt;130</text>';
    svg+='<text x="'+(pL+4)+'" y="'+(yp(140)-4)+'" font-size="9" fill="#dc2626" opacity="0.8">HTN ≥140</text>';
    // DIA line
    var dpts=last12.map(function(r,i){return xp(i)+','+yp(r.dia);}).join(' ');
    svg+='<polyline points="'+dpts+'" fill="none" stroke="#a855f7" stroke-width="2" stroke-dasharray="5,3" stroke-linecap="round" stroke-linejoin="round" opacity="0.75"/>';
    // SYS line
    var spts=last12.map(function(r,i){return xp(i)+','+yp(r.sys);}).join(' ');
    svg+='<polyline points="'+spts+'" fill="none" stroke="#0ea5e9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
    // Dots + date labels
    last12.forEach(function(r,i){
      var x=xp(i);
      var sc=bpClass(r.sys,r.dia);
      // SYS dot
      svg+='<circle cx="'+x+'" cy="'+yp(r.sys)+'" r="4" fill="'+sc.color+'" stroke="white" stroke-width="1.5"/>';
      // DIA dot
      svg+='<circle cx="'+x+'" cy="'+yp(r.dia)+'" r="3" fill="#a855f7" stroke="white" stroke-width="1.2" opacity="0.8"/>';
      // X-axis label — date + time
      var lbl = r.date ? r.date.slice(5) : ''; // MM-DD
      if (r.time) lbl += '\n'+r.time.slice(0,5);
      var lblParts = lbl.split('\n');
      svg+='<text x="'+x+'" y="'+(H-pB+14)+'" text-anchor="middle" font-size="9" fill="#64748b">'+lblParts[0]+'</text>';
      if(lblParts[1]) svg+='<text x="'+x+'" y="'+(H-pB+24)+'" text-anchor="middle" font-size="8" fill="#94a3b8">'+lblParts[1]+'</text>';
    });
    // Legend
    svg+='<circle cx="'+(pL)+'" cy="'+(H-6)+'" r="4" fill="#0ea5e9"/>';
    svg+='<text x="'+(pL+7)+'" y="'+(H-3)+'" font-size="10" fill="#64748b">Systolic</text>';
    svg+='<line x1="'+(pL+60)+'" y1="'+(H-6)+'" x2="'+(pL+74)+'" y2="'+(H-6)+'" stroke="#a855f7" stroke-width="2" stroke-dasharray="4,2"/>';
    svg+='<text x="'+(pL+78)+'" y="'+(H-3)+'" font-size="10" fill="#64748b">Diastolic</text>';
    svg+='</svg>';
    wrap.innerHTML = svg;
  }

  // ── RENDER INTERPRETATION ────────────────────────────────────
  function renderInterpretation(readings, containerId) {
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var lines = interpretTrend(readings);
    if (!lines) { wrap.innerHTML = ''; return; }
    wrap.innerHTML = '<div style="margin-top:12px;background:#f0fdfa;border:1px solid #99f6e4;border-radius:10px;padding:14px">' +
      '<div style="font-size:11px;font-weight:700;color:#0f766e;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px">📋 Trend Interpretation</div>' +
      lines.map(function(l){
        return '<div style="display:flex;gap:10px;padding:5px 0;border-bottom:1px solid #ccfbf155;font-size:12px;line-height:1.5">' +
          '<span style="flex-shrink:0;font-size:14px">'+l.icon+'</span>' +
          '<span style="color:'+l.color+'">'+l.text+'</span></div>';
      }).join('') +
    '</div>';
  }

  // ── MAIN RENDER ──────────────────────────────────────────────
  function render() {
    el_.innerHTML = '';
    el_.appendChild(secTitle('📈','BP Patient Tracker','Per-patient BP monitoring with trend analysis','#14b8a6'));

    // ── PATIENT SELECTOR / NEW PATIENT ──────────────────────────
    var selectorCard = card('Patient Records','#14b8a6','');
    var sb = selectorCard.querySelector('.card-body');
    var patNames = Object.keys(patients).sort();

    if (!patNames.length) {
      sb.innerHTML = '<p style="font-size:13px;color:#64748b;text-align:center;padding:8px">No patient records yet. Add a new patient below.</p>';
    } else {
      var btnWrap = fromHTML('<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:4px"></div>');
      patNames.forEach(function(name) {
        var rdgs = patients[name].readings || [];
        var last = rdgs.length ? rdgs[rdgs.length-1] : null;
        var cls = last ? bpClass(last.sys, last.dia) : null;
        var isActive = name === window._bpActivePatient;
        var btn = fromHTML(
          '<button style="padding:8px 14px;border-radius:20px;border:2px solid '+(isActive?'#14b8a6':'#e2e8f0')+';background:'+(isActive?'#14b8a6':'#f8fafc')+';color:'+(isActive?'#fff':'#1e293b')+';font-size:12px;font-weight:700;cursor:pointer">' +
          name +
          '<span style="margin-left:6px;font-size:10px;opacity:0.8">('+rdgs.length+')</span>' +
          (cls ? '<span style="margin-left:6px;font-size:10px;background:'+cls.bg+';color:'+cls.color+';padding:1px 5px;border-radius:8px">'+cls.stage+'</span>' : '') +
          '</button>'
        );
        btn.addEventListener('click', (function(n){ return function(){ window._bpActivePatient = n; render(); }; })(name));
        btnWrap.appendChild(btn);
      });
      sb.appendChild(btnWrap);
    }
    el_.appendChild(selectorCard);

    // ── NEW PATIENT FORM ─────────────────────────────────────────
    var npCard = card('Add / Select Patient','#14b8a6','');
    npCard.querySelector('.card-body').innerHTML =
      '<div style="display:flex;gap:8px;align-items:flex-end">' +
        '<div style="flex:1"><label class="lbl">Patient Name</label>' +
        '<input id="bp-new-name" class="inp" placeholder="e.g. Ayoka Joshua" style="text-transform:capitalize"/></div>' +
        '<button id="bp-add-pat-btn" style="padding:10px 18px;background:#14b8a6;color:#fff;border:none;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;white-space:nowrap">+ Add Patient</button>' +
      '</div>' +
      '<p style="font-size:11px;color:#64748b;margin-top:8px">Or click an existing patient above to select them, then log readings below.</p>';
    el_.appendChild(npCard);
  var _addPatBtn = document.getElementById('bp-add-pat-btn');
  if (_addPatBtn) _addPatBtn.addEventListener('click', function(){ window._bpAddPatient(); });

    if (!window._bpActivePatient) return; // nothing more to show until a patient is selected

    var pt = patients[window._bpActivePatient];
    var readings = (pt.readings || []).slice().sort(function(a,b){
      return new Date(a.date+'T'+(a.time||'00:00')) - new Date(b.date+'T'+(b.time||'00:00'));
    });

    // ── PATIENT HEADER ───────────────────────────────────────────
    var phDiv = fromHTML(
      '<div style="background:linear-gradient(135deg,#0f766e,#0e7490);border-radius:12px;padding:14px 16px;margin-bottom:2px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">' +
          '<button id="bp-back-btn" style="background:#ffffff22;color:#f0fdfa;border:none;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:6px">← Back</button>' +
          '<button id="bp-del-btn" style="background:#fef2f2;color:#dc2626;border:none;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer">🗑 Delete</button>' +
        '</div>' +
        '<div style="font-size:18px;font-weight:800;color:#f0fdfa">📋 '+window._bpActivePatient+'</div>' +
        '<div style="font-size:11px;color:#99f6e4;margin-top:2px">'+readings.length+' reading'+(readings.length!==1?'s':'')+' logged</div>' +
      '</div>'
    );
    el_.appendChild(phDiv);
    document.getElementById('bp-back-btn').addEventListener('click', function() {
      window._bpActivePatient = null;
      render();
    });
    document.getElementById('bp-del-btn').addEventListener('click', function() {
      window._bpDeletePatient();
    });

    // ── STAT CARDS ───────────────────────────────────────────────
    var latest = readings.length ? readings[readings.length-1] : null;
    var atGoal = latest && latest.sys < 130 && latest.dia < 80;
    var sysDiff = readings.length >= 2 ? readings[readings.length-1].sys - readings[0].sys : null;
    var avgSys = readings.length ? Math.round(readings.reduce(function(s,r){return s+r.sys;},0)/readings.length) : null;
    var g3 = fromHTML('<div class="g3"></div>');
    [
      ['Latest BP', latest ? latest.sys+'/'+latest.dia : '—', 'mmHg', latest ? (atGoal?'#16a34a':'#dc2626') : '#94a3b8'],
      ['Average SYS', avgSys ? avgSys+' mmHg' : '—', 'across all readings', '#0891b2'],
      ['Trend', sysDiff===null?'—':sysDiff<-2?'↓ Falling':sysDiff>2?'↑ Rising':'→ Stable', 'first vs latest', sysDiff===null?'#94a3b8':sysDiff<-2?'#16a34a':sysDiff>2?'#dc2626':'#64748b']
    ].forEach(function(x){
      g3.appendChild(card(null,'#14b8a6','<div style="text-align:center;padding:4px 0"><div style="font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">'+x[0]+'</div><div style="font-size:22px;font-weight:900;color:'+x[3]+'">'+x[1]+'</div><div style="font-size:11px;color:#94a3b8;margin-top:4px">'+x[2]+'</div></div>'));
    });
    el_.appendChild(g3);

    // ── BP CHART ────────────────────────────────────────────────
    var chartCard = card('BP Trend Chart — '+window._bpActivePatient,'#14b8a6',
      '<div id="bp-chart-svg" style="padding:4px 0;min-height:60px"></div>' +
      '<div id="bp-chart-interp"></div>'
    );
    el_.appendChild(chartCard);
    setTimeout(function(){
      renderPatientChart(readings, 'bp-chart-svg');
      renderInterpretation(readings, 'bp-chart-interp');
    }, 80);

    // ── LOG NEW READING ──────────────────────────────────────────
    var now = new Date();
    var todayStr = now.toISOString().slice(0,10);
    var timeStr = now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');
    var logCard = card('Log Reading for '+window._bpActivePatient,'#14b8a6','');
    logCard.querySelector('.card-body').innerHTML =
      '<div class="g2" style="margin-bottom:10px">' +
        '<div><label class="lbl">Date</label><input id="bp-dt" type="date" class="inp" value="'+todayStr+'"/></div>' +
        '<div><label class="lbl">Time</label><input id="bp-t" type="time" class="inp" value="'+timeStr+'"/></div>' +
      '</div>' +
      '<div class="g2" style="margin-bottom:10px">' +
        '<div><label class="lbl">Systolic (mmHg)</label><input id="bp-s" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 135" min="60" max="260"/></div>' +
        '<div><label class="lbl">Diastolic (mmHg)</label><input id="bp-d" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 85" min="30" max="160"/></div>' +
      '</div>' +
      '<div class="g2" style="margin-bottom:10px">' +
        '<div><label class="lbl">Pulse (bpm) — optional</label><input id="bp-pulse" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 72"/></div>' +
        '<div><label class="lbl">Current Medication — optional</label><input id="bp-m" type="text" class="inp" placeholder="e.g. Amlodipine 5mg"/></div>' +
      '</div>' +
      '<div style="margin-bottom:12px"><label class="lbl">Notes — optional</label><input id="bp-notes" type="text" class="inp" placeholder="e.g. post-exercise, white coat, stressed"/></div>' +
      '<div id="bp-log-result" style="min-height:16px;margin-bottom:8px"></div>' +
      '<button id="bp-log-btn" style="width:100%;padding:11px;background:#14b8a6;color:#fff;border:none;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer">+ Log Reading</button>';
    el_.appendChild(logCard);
    var _logBtn = document.getElementById('bp-log-btn');
    if (_logBtn) _logBtn.addEventListener('click', function(){ window._bpLogReading(); });

    // ── READING HISTORY (editable) ───────────────────────────────
    var hCard = card('Reading History — '+window._bpActivePatient,'#14b8a6','');
    var hBody = hCard.querySelector('.card-body');
    if (!readings.length) {
      hBody.innerHTML = '<p style="font-size:13px;color:#64748b">No readings logged yet for this patient.</p>';
    } else {
      var tableRows = readings.slice().reverse().map(function(rd, revIdx) {
        var realIdx = readings.length - 1 - revIdx;
        var st = bpClass(rd.sys, rd.dia);
        return '<tr class="tbl-row" id="bp-row-'+realIdx+'">' +
          '<td style="font-weight:700">'+rd.date+'</td>' +
          '<td style="color:#64748b">'+(rd.time||'—')+'</td>' +
          '<td style="font-weight:800;font-size:15px">'+rd.sys+'/'+rd.dia+'</td>' +
          '<td>'+badge(st.stage, st.color, st.bg)+'</td>' +
          '<td style="color:#64748b">'+(rd.pulse||'—')+'</td>' +
          '<td style="font-size:12px;color:#64748b">'+(rd.med||'—')+'</td>' +
          '<td style="font-size:12px;color:#64748b">'+(rd.notes||'—')+'</td>' +
          '<td style="white-space:nowrap">' +
            '<button class="bp-edit-btn" data-idx="'+realIdx+'" style="padding:4px 8px;background:#f0fdfa;color:#0f766e;border:1px solid #99f6e4;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;margin-right:4px">✏️ Edit</button>' +
            '<button class="bp-del-rd-btn" data-idx="'+realIdx+'" style="padding:4px 8px;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer">🗑</button>' +
          '</td>' +
        '</tr>';
      }).join('');
      hBody.innerHTML = '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdfa"><th>Date</th><th>Time</th><th>BP</th><th>Stage</th><th>Pulse</th><th>Medication</th><th>Notes</th><th>Actions</th></tr></thead><tbody>'+tableRows+'</tbody></table></div>';
    }
    el_.appendChild(hCard);
  hCard.addEventListener('click', function(e) {
    var editBtn   = e.target.closest('.bp-edit-btn');
    var delBtn    = e.target.closest('.bp-del-rd-btn');
    var saveBtn   = e.target.closest('.bp-save-edit');
    var cancelBtn = e.target.closest('.bp-cancel-edit');
    if (editBtn)   window._bpEditReading(parseInt(editBtn.dataset.idx));
    if (delBtn)    window._bpDeleteReading(parseInt(delBtn.dataset.idx));
    if (saveBtn)   window._bpSaveEdit(parseInt(saveBtn.dataset.idx));
    if (cancelBtn) window._bpRender();
  });

    // ── EXPORT CSV ───────────────────────────────────────────────
    var expDiv = fromHTML('<div style="display:flex;gap:8px;margin-top:4px"><button id="bp-exp-btn" style="flex:1;padding:10px;background:#f0fdfa;color:#0f766e;border:2px solid #99f6e4;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer">📥 Export CSV</button></div>');
    el_.appendChild(expDiv);
    document.getElementById('bp-exp-btn').addEventListener('click', function(){ window._bpExportCSV(); });
  }

  // ── ACTIONS ──────────────────────────────────────────────────
  window._bpSelectPatient = function(name) {
    window._bpActivePatient = name;
    render();
  };

  window._bpAddPatient = function() {
    var inp = document.getElementById('bp-new-name');
    if (!inp) return;
    var name = inp.value.trim().replace(/\s+/g,' ');
    if (!name) { alert('Please enter a patient name.'); return; }
    // Normalize capitalization
    name = name.split(' ').map(function(w){return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase();}).join(' ');
    if (!patients[name]) patients[name] = { readings: [] };
    savePatients(patients);
    window._bpActivePatient = name;
    render();
  };

  window._bpDeletePatient = function() {
    if (!window._bpActivePatient) return;
    if (!confirm('Delete all records for "'+window._bpActivePatient+'"? This cannot be undone.')) return;
    delete patients[window._bpActivePatient];
    savePatients(patients);
    window._bpActivePatient = null;
    render();
  };

  window._bpLogReading = function() {
    if (!window._bpActivePatient) return;
    var sys = parseInt(document.getElementById('bp-s').value);
    var dia = parseInt(document.getElementById('bp-d').value);
    var dt = document.getElementById('bp-dt').value;
    var tm = document.getElementById('bp-t').value;
    var res = document.getElementById('bp-log-result');
    if (!sys || !dia || isNaN(sys) || isNaN(dia)) {
      res.innerHTML = '<span style="color:#dc2626;font-size:12px">⚠ Please enter both systolic and diastolic values.</span>';
      return;
    }
    if (sys < 60 || sys > 260 || dia < 30 || dia > 160) {
      res.innerHTML = '<span style="color:#dc2626;font-size:12px">⚠ Values out of physiological range. Please check.</span>';
      return;
    }
    if (!dt) { res.innerHTML = '<span style="color:#dc2626;font-size:12px">⚠ Please enter a date.</span>'; return; }
    var rd = {
      sys: sys, dia: dia, date: dt, time: tm||'',
      pulse: document.getElementById('bp-pulse').value||'',
      med: document.getElementById('bp-m').value.trim()||'',
      notes: document.getElementById('bp-notes').value.trim()||''
    };
    patients[window._bpActivePatient].readings.push(rd);
    savePatients(patients);
    render();
  };

  window._bpDeleteReading = function(idx) {
    if (!window._bpActivePatient) return;
    if (!confirm('Delete this reading?')) return;
    patients[window._bpActivePatient].readings.splice(idx, 1);
    savePatients(patients);
    render();
  };

  window._bpEditReading = function(idx) {
    if (!window._bpActivePatient) return;
    var rd = patients[window._bpActivePatient].readings[idx];
    if (!rd) return;
    // Replace row with inline edit form
    var row = document.getElementById('bp-row-'+idx);
    if (!row) return;
    row.innerHTML =
      '<td><input id="edit-dt" type="date" value="'+rd.date+'" style="width:110px;padding:4px;border:1px solid #99f6e4;border-radius:6px;font-size:12px"/></td>' +
      '<td><input id="edit-tm" type="time" value="'+(rd.time||'')+'" style="width:90px;padding:4px;border:1px solid #99f6e4;border-radius:6px;font-size:12px"/></td>' +
      '<td><input id="edit-sys" type="text" inputmode="decimal" pattern="[0-9.]*" value="'+rd.sys+'" style="width:52px;padding:4px;border:1px solid #0ea5e9;border-radius:6px;font-size:13px;font-weight:700"/> / <input id="edit-dia" type="text" inputmode="decimal" pattern="[0-9.]*" value="'+rd.dia+'" style="width:52px;padding:4px;border:1px solid #0ea5e9;border-radius:6px;font-size:13px;font-weight:700"/></td>' +
      '<td></td>' +
      '<td><input id="edit-pulse" type="text" inputmode="decimal" pattern="[0-9.]*" value="'+(rd.pulse||'')+'" style="width:55px;padding:4px;border:1px solid #e2e8f0;border-radius:6px;font-size:12px"/></td>' +
      '<td><input id="edit-med" type="text" value="'+(rd.med||'')+'" style="width:110px;padding:4px;border:1px solid #e2e8f0;border-radius:6px;font-size:12px"/></td>' +
      '<td><input id="edit-notes" type="text" value="'+(rd.notes||'')+'" style="width:100px;padding:4px;border:1px solid #e2e8f0;border-radius:6px;font-size:12px"/></td>' +
      '<td style="white-space:nowrap">' +
        '<button class="bp-save-edit" data-idx="'+idx+'" style="padding:4px 8px;background:#14b8a6;color:#fff;border:none;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;margin-right:4px">💾 Save</button>' +
        '<button class="bp-cancel-edit" style="padding:4px 8px;background:#f1f5f9;color:#475569;border:1px solid #e2e8f0;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer">✕</button>' +
      '</td>';
  };

  window._bpSaveEdit = function(idx) {
    if (!window._bpActivePatient) return;
    var sys = parseInt(document.getElementById('edit-sys').value);
    var dia = parseInt(document.getElementById('edit-dia').value);
    var dt  = document.getElementById('edit-dt').value;
    var tm  = document.getElementById('edit-tm').value;
    if (!sys || !dia || isNaN(sys) || isNaN(dia) || !dt) { alert('Please fill in date, systolic, and diastolic.'); return; }
    patients[window._bpActivePatient].readings[idx] = {
      sys: sys, dia: dia, date: dt, time: tm||'',
      pulse: document.getElementById('edit-pulse').value||'',
      med:   document.getElementById('edit-med').value.trim()||'',
      notes: document.getElementById('edit-notes').value.trim()||''
    };
    savePatients(patients);
    render();
  };

  window._bpRender = function() { render(); };

  window._bpExportCSV = function() {
    if (!window._bpActivePatient) return;
    var rdgs = patients[window._bpActivePatient].readings;
    if (!rdgs || !rdgs.length) { alert('No readings to export.'); return; }
    var rows = [['Patient','Date','Time','Systolic','Diastolic','Stage','Pulse','Medication','Notes']];
    rdgs.forEach(function(r){
      var st = bpClass(r.sys,r.dia);
      rows.push([window._bpActivePatient, r.date, r.time||'', r.sys, r.dia, st.stage, r.pulse||'', r.med||'', r.notes||'']);
    });
    var csv = rows.map(function(r){return r.map(function(c){return '"'+String(c).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
    var a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,'+encodeURIComponent(csv);
    a.download = window._bpActivePatient.replace(/\s+/g,'_')+'_BP_Log.csv';
    a.click();
  };

  // Initial render

  render();

}
function tabCVAProtocol(el_) {
  el_.appendChild(secTitle('🧠','CVA Protocol','Stroke recognition, emergency management, thrombolysis, and secondary prevention','#dc2626'));
  el_.appendChild(notebox('🚨 <strong>Stroke is a time-critical emergency.</strong> Every 1 minute of untreated ischaemic stroke = ~1.9 million neurons lost. "Time is Brain." Activate stroke pathway immediately on suspicion — do not wait for imaging to call the team.','#fef2f2','#fecaca'));

  // BE-FAST
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#dc2626">🚨 BE-FAST Recognition</h3>'));
  el_.appendChild(card('BE-FAST — Stroke Recognition Tool','#dc2626','<div style="font-size:13px;color:#374151">'+[
    {l:'B','t':'Balance','d':'Sudden loss of balance or coordination, unexplained falls','c':'#7c3aed'},
    {l:'E','t':'Eyes','d':'Sudden vision loss, double vision, or gaze deviation','c':'#0891b2'},
    {l:'F','t':'Face','d':'Facial droop — ask patient to smile. Is one side drooping?','c':'#dc2626'},
    {l:'A','t':'Arms','d':'Arm weakness — ask patient to raise both arms. Does one drift down?','c':'#ea580c'},
    {l:'S','t':'Speech','d':'Slurred speech, word-finding difficulty, or inability to speak/understand','c':'#d97706'},
    {l:'T','t':'Time','d':'Time of symptom onset — CRITICAL. If unknown, use last known well time.','c':'#16a34a'},
  ].map(function(x){return '<div style="display:flex;gap:14px;padding:11px 0;border-bottom:1px solid #fecaca55;align-items:center"><div style="width:36px;height:36px;border-radius:50%;background:'+x.c+';color:#fff;font-size:18px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+x.l+'</div><div><div style="font-weight:700;font-size:14px;color:'+x.c+'">'+x.t+'</div><div style="font-size:13px;color:#374151;line-height:1.5">'+x.d+'</div></div></div>';}).join('')+'</div><div class="notebox" style="background:#fef2f2;border:1px solid #fecaca;margin-top:10px">⚠ <strong>If ANY BE-FAST sign is positive → Call emergency services immediately. Do not drive the patient. Do not give food, water, or medication.</strong></div>'));

  // Ischaemic vs Haemorrhagic
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">🔍 Ischaemic vs Haemorrhagic Stroke</h3>'));
  el_.appendChild(notebox('⚠ <strong>You cannot clinically distinguish ischaemic from haemorrhagic stroke</strong> — both present with sudden focal neurological deficits. Non-contrast CT head is mandatory before any treatment decision. Giving tPA to a haemorrhagic stroke is potentially fatal.','#fff7ed','#fed7aa'));
  el_.appendChild(card('Clinical Clues (Not Diagnostic — CT Always Required)','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Feature</th><th style="color:#0891b2">Ischaemic (85%)</th><th style="color:#dc2626">Haemorrhagic (15%)</th></tr></thead><tbody>'+[
    ['Onset','Sudden; may wake from sleep','Sudden; often during activity/exertion'],
    ['Headache','Absent or mild','Severe — "thunderclap" (SAH) or progressive'],
    ['Vomiting','Uncommon','Common (raised ICP)'],
    ['Consciousness','Usually preserved initially','Often impaired; GCS may drop rapidly'],
    ['BP at presentation','May be elevated (permissive)','Often severely elevated (>180/110)'],
    ['History','AF, carotid disease, prior TIA, DM, HTN','Anticoagulants, cocaine, uncontrolled HTN, AVM'],
    ['CT finding','Normal initially (infarct visible 24–48hr)','Hyperdense blood immediately visible'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#0369a1">'+r[1]+'</td><td style="color:#dc2626">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // Time windows
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">⏱️ Time Windows — Act Fast</h3>'));
  el_.appendChild(card('Critical Time Targets','#dc2626','<div style="font-size:13px;color:#374151">'+[
    {t:'0–60 min','l':'Door-to-CT target','d':'Non-contrast CT head must be completed within 25 minutes of arrival. Report within 45 minutes.','c':'#dc2626'},
    {t:'0–4.5 hrs','l':'IV tPA (Alteplase) window','d':'Thrombolysis eligible if ischaemic stroke, no contraindications, and symptom onset within 4.5 hours. Door-to-needle target: <60 minutes.','c':'#ea580c'},
    {t:'0–24 hrs','l':'Mechanical Thrombectomy window','d':'Large vessel occlusion (M1, ICA, basilar) may be eligible for thrombectomy up to 24 hours if salvageable penumbra on perfusion imaging (DAWN, DEFUSE-3 trials).','c':'#d97706'},
    {t:'24–48 hrs','l':'Dual antiplatelet (minor stroke/TIA)','d':'For minor ischaemic stroke (NIHSS ≤3) or high-risk TIA (ABCD2 ≥4): Aspirin 300mg + Clopidogrel 300mg loading, then dual antiplatelet × 21 days (POINT, CHANCE trials).','c':'#16a34a'},
    {t:'First 48 hrs','l':'Statin initiation','d':'High-intensity statin (Atorvastatin 40–80mg) within 48 hours of ischaemic stroke regardless of baseline LDL.','c':'#0891b2'},
  ].map(function(x){return '<div style="display:flex;gap:14px;padding:11px 0;border-bottom:1px solid #fecaca55;align-items:flex-start"><div style="min-width:70px;padding:5px 8px;background:'+x.c+';color:#fff;border-radius:8px;font-size:11px;font-weight:800;text-align:center;flex-shrink:0">'+x.t+'</div><div><div style="font-weight:700;margin-bottom:2px">'+x.l+'</div><div style="font-size:12px;color:#475569;line-height:1.5">'+x.d+'</div></div></div>';}).join('')+'</div>'));

  // tPA eligibility
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">💉 IV tPA (Alteplase) — Eligibility Checklist</h3>'));
  el_.appendChild(card('Inclusion & Exclusion Criteria','#dc2626','<div class="g2"><div><div style="font-size:13px;font-weight:700;color:#16a34a;margin-bottom:8px">✅ Must Meet ALL Inclusions</div>'+['Ischaemic stroke with measurable neurological deficit','Age ≥18 years','Symptom onset (or last known well) within 4.5 hours','CT head — no haemorrhage, no large established infarct'].map(function(i){return '<div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #f1f5f9;font-size:13px"><span style="color:#16a34a;flex-shrink:0">✓</span>'+i+'</div>';}).join('')+'</div><div><div style="font-size:13px;font-weight:700;color:#dc2626;margin-bottom:8px">❌ Key Exclusions</div>'+['Haemorrhage on CT','BP >185/110 despite treatment','INR >1.7 or on direct anticoagulants','Platelets <100,000','Major surgery or trauma within 14 days','Prior intracranial haemorrhage','Blood glucose <50 or >400 mg/dL','Seizure at onset (relative)','Symptom onset >4.5 hours or unknown'].map(function(i){return '<div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #fef2f2;font-size:13px"><span style="color:#dc2626;flex-shrink:0">✗</span>'+i+'</div>';}).join('')+'</div></div><div class="notebox" style="background:#fef2f2;border:1px solid #fecaca;margin-top:12px">⚕️ tPA dose: <strong>0.9 mg/kg IV</strong> (max 90mg). Give 10% as IV bolus over 1 minute, remainder over 60 minutes. Admit to stroke unit / ICU. No antiplatelet or anticoagulant for 24 hours post-tPA.</div>'));

  // BP management in acute stroke - THE CRITICAL COUNTERINTUITIVE PART
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">🩺 BP Management in Acute Stroke</h3>'));
  el_.appendChild(notebox('⚡ <strong>CRITICAL — Counterintuitive:</strong> In acute ischaemic stroke, elevated BP is often a protective autoregulatory response maintaining perfusion to the ischaemic penumbra. Aggressive BP lowering can extend the infarct. Guidelines deliberately allow higher BP than in other hypertensive emergencies.','#fef9c3','#fde047'));
  el_.appendChild(card('BP Targets by Stroke Type and Treatment','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Scenario</th><th>BP Target</th><th>Rationale</th></tr></thead><tbody>'+[
    ['Ischaemic stroke — tPA eligible','<185/110 before tPA; <180/105 for 24hr after','Higher BP is contraindication to tPA. After tPA, tight control reduces haemorrhagic transformation.'],
    ['Ischaemic stroke — NOT tPA eligible','Allow up to 220/120 for first 24–48 hours','Permissive hypertension maintains penumbral perfusion. Only treat if >220/120 or end-organ damage.'],
    ['Haemorrhagic stroke (ICH)','Target SBP <140 mmHg within 1 hour (ATACH-2)','Reduces haematoma expansion. Use IV labetalol or nicardipine. Avoid nitroprusside (raises ICP).'],
    ['Subarachnoid haemorrhage (SAH)','Maintain SBP <160 mmHg until aneurysm secured','Rebleeding risk before clipping/coiling. Nimodipine 60mg q4h for vasospasm prevention (NOT for BP).'],
    ['Post-stroke secondary prevention (>48hr)','<130/80 mmHg long-term','Resume/initiate antihypertensives after acute phase. ACE inhibitor + thiazide (PROGRESS trial).'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="font-weight:700;color:#dc2626">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // NIHSS
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">📋 NIHSS — Stroke Severity Guide</h3>'));
  el_.appendChild(card('NIH Stroke Scale — Severity Classification','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>NIHSS Score</th><th>Severity</th><th>Clinical Features</th></tr></thead><tbody>'+[
    ['0','No stroke symptoms','Normal examination'],
    ['1–4','Minor stroke','Subtle deficits; may be missed. Still eligible for tPA if disabling.'],
    ['5–15','Moderate stroke','Clear focal deficits; most eligible for thrombolysis and thrombectomy workup'],
    ['16–20','Moderate-severe','Significant deficits; high disability risk; aggressive reperfusion indicated'],
    ['21–42','Severe stroke','Major deficits; consider goals of care discussion; thrombectomy if LVO'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:800;color:#dc2626">'+r[0]+'</td><td style="font-weight:600">'+r[1]+'</td><td>'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div><div class="notebox" style="background:#fff7ed;border:1px solid #fed7aa;margin-top:10px">📌 Full NIHSS has 11 items scored 0–42. Items include: level of consciousness, gaze, visual fields, facial palsy, arm/leg motor, limb ataxia, sensory, language, dysarthria, extinction. Formal training recommended for accurate scoring.</div>'));

  // Secondary prevention
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">🛡️ Secondary Prevention</h3>'));
  el_.appendChild(card('Post-Stroke Secondary Prevention Bundle','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Intervention</th><th>Indication</th><th>Agent / Target</th></tr></thead><tbody>'+[
    ['Antiplatelet therapy','Ischaemic stroke / TIA (non-cardioembolic)','Aspirin 75–100mg daily OR Clopidogrel 75mg daily. Dual antiplatelet × 21 days for minor stroke/TIA.'],
    ['Anticoagulation','Cardioembolic stroke — AF confirmed','DOAC (Apixaban, Rivaroxaban) preferred over warfarin. Start 3–14 days post-stroke depending on infarct size.'],
    ['Statin','All ischaemic strokes regardless of LDL','Atorvastatin 40–80mg. Target LDL <70 mg/dL (<1.8 mmol/L) in high-risk patients.'],
    ['BP control','All stroke/TIA patients','<130/80 mmHg. ACE inhibitor + thiazide combination (PROGRESS trial). Start after acute phase (>24–48hr).'],
    ['Carotid intervention','Symptomatic carotid stenosis ≥50%','CEA (carotid endarterectomy) or CAS within 2 weeks of TIA/minor stroke for maximum benefit.'],
    ['Glucose control','Diabetic patients','Avoid hypoglycaemia acutely (target 7–10 mmol/L in acute phase). Resume long-term DM management.'],
    ['Lifestyle','All patients','Smoking cessation, alcohol moderation, DASH diet, physical rehabilitation, weight management.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700">'+r[0]+'</td><td style="font-size:12px;color:#64748b">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(notebox('🔗 <strong>HTN is the single most important modifiable risk factor for stroke</strong> — responsible for ~54% of strokes globally. Every 10 mmHg reduction in SBP reduces stroke risk by ~27%. Long-term BP control to &lt;130/80 is the most impactful secondary prevention intervention available.','#f0f9ff','#bae6fd'));
}

function tabBPMeasurement(el_) {
  el_.appendChild(secTitle('📏','BP Measurement Protocol','Standardised technique for accurate and reproducible blood pressure readings','#0ea5e9'));
  el_.appendChild(notebox('⚕️ <strong>Measurement technique accounts for up to 10–15 mmHg of error.</strong> A perfect device used incorrectly gives worse results than a modest device used correctly. Follow all steps below before classifying or acting on a BP reading.','#f0f9ff','#bae6fd'));

  // Cuff sizing
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#0ea5e9">📐 Cuff Sizing</h3>'));
  el_.appendChild(card('Cuff Size Selection — Critical for Accuracy','#0ea5e9','<p style="font-size:13px;color:#64748b;margin-bottom:12px">An undersized cuff overestimates BP; an oversized cuff underestimates BP. The bladder should encircle <strong>75–100%</strong> of the arm circumference.</p><div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Cuff Size</th><th>Arm Circumference</th><th>Bladder Dimensions</th></tr></thead><tbody>'+[['Small Adult','22–26 cm','12 × 22 cm'],['Standard Adult','27–34 cm','16 × 30 cm'],['Large Adult','35–44 cm','16 × 36 cm'],['Thigh Cuff','45–52 cm','20 × 42 cm']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div><div class="notebox" style="background:#fff7ed;border:1px solid #fed7aa;margin-top:10px">⚠ <strong>Most common error in clinical practice:</strong> Using a standard adult cuff on an obese arm. Always measure mid-upper arm circumference before selecting cuff size.</div>'));

  // Cuff size calculator
  var cc = card('Cuff Size Calculator','#0ea5e9','');
  cc.querySelector('.card-body').innerHTML = '<p style="font-size:13px;color:#64748b;margin-bottom:10px">Measure mid-upper arm circumference (midpoint between acromion and olecranon):</p><div style="display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap"><div><label class="lbl">Arm Circumference (cm)</label><input id="cuff-inp" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" style="width:120px" placeholder="e.g. 30" oninput="calcCuff()"></div><div id="cuff-res"></div></div>';
  el_.appendChild(cc);
  window.calcCuff = function() {
    var v = parseFloat(document.getElementById('cuff-inp').value);
    var d = document.getElementById('cuff-res');
    if (isNaN(v)) { d.innerHTML = ''; return; }
    var size, color, bg;
    if (v < 22)       { size = 'Paediatric / Small'; color = '#7c3aed'; bg = '#faf5ff'; }
    else if (v <= 26) { size = 'Small Adult (12 × 22 cm)'; color = '#0891b2'; bg = '#f0f9ff'; }
    else if (v <= 34) { size = 'Standard Adult (16 × 30 cm)'; color = '#16a34a'; bg = '#f0fdf4'; }
    else if (v <= 44) { size = 'Large Adult (16 × 36 cm)'; color = '#d97706'; bg = '#fffbeb'; }
    else              { size = 'Thigh Cuff (20 × 42 cm)'; color = '#dc2626'; bg = '#fef2f2'; }
    d.innerHTML = '<div style="padding:12px 18px;background:'+bg+';border:2px solid '+color+';border-radius:10px;text-align:center"><div style="font-size:11px;color:'+color+';font-weight:700;text-transform:uppercase">Recommended Cuff</div><div style="font-size:16px;font-weight:800;color:'+color+'">'+size+'</div></div>';
  };

  // Pre-measurement checklist
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#0ea5e9">✅ Pre-Measurement Checklist</h3>'));
  el_.appendChild(card('Patient Preparation — All Must Be Met','#0ea5e9','<div style="font-size:13px;color:#374151">'+[
    {ok:true,  t:'No caffeine for 30 minutes prior',          d:'Coffee, tea, energy drinks, and some medications contain caffeine that transiently raises BP.'},
    {ok:true,  t:'No exercise for 30 minutes prior',          d:'Even moderate activity elevates BP for 30+ minutes. Ask patient directly.'},
    {ok:true,  t:'No smoking or nicotine for 30 minutes',     d:'Nicotine causes acute vasoconstriction and raises BP 5–10 mmHg.'},
    {ok:true,  t:'Bladder emptied before measurement',        d:'A full bladder can raise BP by up to 10–15 mmHg.'},
    {ok:true,  t:'Patient seated quietly for ≥5 minutes',     d:'This is the single most important preparation step. Use a timer — estimates are unreliable.'},
    {ok:true,  t:'No talking during or between readings',     d:'Conversation raises BP 6–7 mmHg. Patient and clinician should both remain silent.'},
    {ok:false, t:'No white coat effect mitigation',           d:'If patient is anxious in clinic, note this. Consider ABPM or home monitoring for confirmation.'},
  ].map(function(item){return '<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9;align-items:flex-start"><span style="font-size:16px;flex-shrink:0">'+(item.ok?'✅':'⚠️')+'</span><div><div style="font-weight:600;margin-bottom:2px">'+item.t+'</div><div style="font-size:12px;color:#64748b;line-height:1.5">'+item.d+'</div></div></div>';}).join('')+'</div>'));

  // Positioning
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#0ea5e9">🪑 Patient Positioning</h3>'));
  el_.appendChild(card('Correct Positioning — Step by Step','#0ea5e9','<div class="g2">'+[
    ['🪑','Seated upright','Back supported against chair. Feet flat on floor — no crossing of legs (raises BP 2–8 mmHg).'],
    ['💪','Arm supported','Resting on a flat surface at heart level (mid-sternum). Unsupported arm raises BP 1–7 mmHg.'],
    ['🩺','Cuff placement','2–3 cm above the antecubital fossa. Artery marker over brachial artery. Snug but 1 finger fits under.'],
    ['👕','Bare arm','Remove clothing from arm — rolling up a tight sleeve constricts venous return and falsely elevates readings.'],
    ['🔇','Silence','No talking, no phone. Room should be quiet and at a comfortable temperature.'],
    ['🩻','Arm selection','Use the arm with the higher reading if bilateral measurements differ by >10 mmHg — investigate for subclavian stenosis.'],
  ].map(function(x){return '<div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px"><div style="font-size:20px;margin-bottom:6px">'+x[0]+'</div><div style="font-size:13px;font-weight:700;color:#1e293b;margin-bottom:3px">'+x[1]+'</div><div style="font-size:12px;color:#475569;line-height:1.5">'+x[2]+'</div></div>';}).join('')+'</div>'));

  // Reading technique
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#0ea5e9">📊 Taking the Reading</h3>'));
  el_.appendChild(card('Two-Reading Protocol (ACC/AHA Standard)','#0ea5e9','<div style="font-size:13px;color:#374151">'+[
    'Take <strong>Reading 1</strong> after 5 minutes of seated rest.',
    'Wait <strong>1–2 minutes</strong> before taking Reading 2. Do not remove the cuff.',
    'Record <strong>both readings</strong>. Use the average of the two as the visit BP.',
    'If Reading 1 and Reading 2 differ by <strong>>10 mmHg systolic</strong>, take a third reading and average the last two.',
    'On the <strong>first visit</strong>, measure both arms. Use the arm with the higher reading for all subsequent visits.',
    'For <strong>elderly patients and diabetics</strong>, also take a standing BP at 1 and 3 minutes to screen for orthostatic hypotension.',
  ].map(function(s,i){return '<div style="display:flex;gap:12px;padding:9px 0;border-bottom:1px solid #f1f5f9;align-items:flex-start"><div style="width:24px;height:24px;border-radius:50%;background:#0ea5e9;color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+(i+1)+'</div><div style="font-size:13px;line-height:1.6">'+s+'</div></div>';}).join('')+'</div>'));

  // Auscultatory technique
  el_.appendChild(card('Auscultatory Technique (Manual / Aneroid)','#64748b','<div style="font-size:13px;color:#374151;line-height:1.7">'+[
    '<strong>Palpate the brachial artery</strong> at the antecubital fossa before applying the stethoscope.',
    '<strong>Inflate</strong> cuff 20–30 mmHg above the point where the radial pulse disappears.',
    '<strong>Deflate slowly</strong> at 2–3 mmHg per second — too fast misses the true systolic.',
    '<strong>Systolic BP</strong> = first appearance of Korotkoff sounds (Phase I).',
    '<strong>Diastolic BP</strong> = disappearance of Korotkoff sounds (Phase V). In some patients (e.g. aortic regurgitation) sounds never disappear — use muffling (Phase IV) instead.',
    '<strong>Digit preference:</strong> Consciously avoid rounding to nearest 10. Record the exact mmHg heard.',
    '<strong>Auscultatory gap:</strong> Korotkoff sounds may disappear and reappear between systolic and diastolic — if cuff not inflated high enough, the true systolic will be missed.',
  ].map(function(s,i){return '<div style="display:flex;gap:10px;padding:7px 0;border-bottom:1px solid #f1f5f9"><span style="color:#64748b;font-weight:700;flex-shrink:0">'+(i+1)+'.</span>'+s+'</div>';}).join('')+'</div>'));

  // White coat vs masked
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#0ea5e9">🥼 White Coat vs Masked Hypertension</h3>'));
  el_.appendChild(card('Recognition and Clinical Significance','#0ea5e9','<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Phenomenon</th><th>Definition</th><th>Prevalence</th><th>Clinical Action</th></tr></thead><tbody>'+[
    ['White Coat HTN','BP elevated in clinic (≥130/80) but normal at home (<130/80)','~15–30% of clinic HTN patients','ABPM or home monitoring to confirm. Lifestyle intervention. May not need medication but carries some CV risk.'],
    ['Masked HTN','BP normal in clinic (<130/80) but elevated at home (≥130/80)','~15% of general population','More dangerous — often undertreated. Suspect in: diabetics, CKD, high-stress work. Order ABPM.'],
    ['Sustained HTN','Elevated both in clinic and at home','~50% of clinic HTN','Treat per ACC/AHA guidelines.'],
    ['White Coat Effect','Transient BP rise in clinic without true sustained HTN','Very common','Average multiple readings. ABPM if borderline.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9">'+r[0]+'</td><td>'+r[1]+'</td><td style="color:#64748b">'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Ambulatory BP Monitoring (ABPM) — When to Order','#0ea5e9','<div class="g2">'+[
    ['Suspected white coat HTN','Clinic BP elevated but patient reports normal home readings or is highly anxious'],
    ['Suspected masked HTN','Normal clinic BP but end-organ damage present (LVH, retinopathy, CKD)'],
    ['Resistant HTN','To confirm readings are truly elevated before escalating therapy'],
    ['Episodic or variable HTN','BP readings inconsistent across visits'],
    ['Nocturnal HTN','Non-dipping pattern associated with higher CV risk — only detectable with ABPM'],
    ['Evaluating treatment response','Objective assessment of 24-hour BP control on medication'],
  ].map(function(x){return '<div style="padding:12px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px"><div style="font-size:13px;font-weight:700;color:#0369a1;margin-bottom:3px">'+x[0]+'</div><div style="font-size:12px;color:#374151;line-height:1.5">'+x[1]+'</div></div>';}).join('')+'</div>'));

  el_.appendChild(notebox('📌 <strong>ABPM thresholds differ from clinic BP:</strong> Daytime average ≥135/85 = HTN. Night-time average ≥120/70 = HTN. 24-hour average ≥130/80 = HTN. These are lower than office thresholds because ABPM eliminates white coat effect.','#fffbeb','#fde68a'));
}

function tabSpecialPops(el_) {
  el_.appendChild(secTitle('👶','Special Populations','Pediatric, pregnancy, and elderly-specific hypertension guidelines','#0ea5e9'));
  el_.appendChild(notebox('⚕️ Standard adult ESC/ESH 2023 thresholds do <strong>not</strong> apply to children. Pediatric BP uses age-, sex-, and height-based percentiles. Pregnancy classification uses its own criteria distinct from adult staging.','#f0f9ff','#bae6fd'));
  var ph=fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#0ea5e9">👶 Pediatric Hypertension (AAP 2017)</h3>'); el_.appendChild(ph);
  el_.appendChild(card('Pediatric BP Classification','#0ea5e9','<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Category</th><th>Threshold</th><th>Action</th></tr></thead><tbody>'+[['Normal','<90th percentile for age/sex/height','Lifestyle; recheck in 1 year'],['Elevated BP','90th–95th percentile OR ≥120/80 if lower','Lifestyle; recheck in 6 months'],['Stage 1 HTN','95th–95th+12 mmHg percentile','Lifestyle × 6 months; consider meds if no improvement'],['Stage 2 HTN','>95th percentile + 12 mmHg','Prompt evaluation; pharmacotherapy + lifestyle'],['Hypertensive Urgency/Emergency','>30 mmHg above 95th percentile','Emergency evaluation; IV medications in ED']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;color:#0ea5e9">'+r[0]+'</td><td>'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div><p style="font-size:11px;color:#64748b;margin-top:8px">⚠ Use AAP pediatric BP tables or the Pediatric BP calculator for age/sex/height-specific thresholds. This tool does not calculate pediatric percentiles.</p>'));
  el_.appendChild(accordion([
    {label:'🔍 Secondary Causes in Children (Common)',items:['Renal parenchymal disease (most common cause in children)','Coarctation of the aorta (upper > lower limb BP differential)','Renovascular disease (fibromuscular dysplasia in adolescents)','Primary aldosteronism','Obstructive sleep apnea','Essential HTN (increasingly common in overweight adolescents)','Medications: stimulants (ADHD), corticosteroids, oral contraceptives']},
    {label:'💊 First-Line Pediatric Drugs',items:['ACE inhibitors or ARBs: preferred in CKD or proteinuria','Calcium channel blockers: amlodipine widely used','Thiazide diuretics: second-line in otherwise healthy children','Beta-blockers: useful with coexisting cardiac conditions','Dose by weight (mg/kg) — avoid extrapolating adult doses directly']},
  ], '#0ea5e9', function(panel,item){panel.innerHTML=item.items.map(function(i){return '<div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #bae6fd55;font-size:13px"><span style="color:#0ea5e9;flex-shrink:0">◆</span>'+i+'</div>';}).join('');}));

  var prh=fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#ec4899">🤰 Hypertension in Pregnancy</h3>'); el_.appendChild(prh);
  el_.appendChild(card('Classification of HTN in Pregnancy','#ec4899','<div class="tbl-wrap"><table><thead><tr style="background:#fdf2f8"><th>Category</th><th>Definition</th><th>Key Features</th></tr></thead><tbody>'+[['Chronic HTN','HTN present before 20 weeks gestation OR persists >12 weeks postpartum','Pre-existing; may worsen in pregnancy'],['Gestational HTN','New HTN ≥140/90 after 20 weeks WITHOUT proteinuria or end-organ damage','No protein; resolves postpartum'],['Preeclampsia','New HTN ≥140/90 after 20 weeks WITH proteinuria (≥300mg/24hr) OR end-organ damage','Headache, visual changes, epigastric pain, oedema'],['Severe Preeclampsia','SBP ≥160 OR DBP ≥110 on two readings + end-organ damage','Urgent treatment; delivery often indicated'],['Eclampsia','Preeclampsia + new-onset grand mal seizures','EMERGENCY — IV magnesium + delivery'],['HELLP Syndrome','Haemolysis, Elevated Liver enzymes, Low Platelets','Life-threatening; urgent delivery']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#ec4899">'+r[0]+'</td><td>'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));
  el_.appendChild(accordion([
    {label:'💊 Safe Antihypertensives in Pregnancy',items:['Labetalol (oral/IV) — first-line; well studied','Nifedipine extended-release — preferred CCB; do NOT use sublingual (precipitous drop)','Methyldopa — long safety record; less effective than labetalol','Hydralazine IV — used for acute severe HTN in labour ward','⚠ ACE inhibitors and ARBs are CONTRAINDICATED (fetal renal agenesis, oligohydramnios)','⚠ Atenolol: associated with fetal growth restriction — avoid']},
    {label:'🚨 Severe Preeclampsia Management',items:['Admit to hospital; continuous maternal + fetal monitoring','IV Labetalol 20mg → 40mg → 80mg OR IV Hydralazine 5–10mg for BP ≥160/110','Magnesium sulfate 4–6g IV loading dose → 1–2g/hr infusion (seizure prophylaxis)','Strict fluid balance (risk of pulmonary oedema)','Definitive treatment = delivery (mode based on obstetric factors)','Postpartum: BP may worsen in first 48 hours; monitor closely']},
    {label:'🩸 Preeclampsia Blood Work',items:['FBC (platelet count, haemoglobin)','LFTs (ALT, AST — elevated in HELLP)','Urea, creatinine, uric acid','LDH (haemolysis marker in HELLP)','24hr urine protein or protein/creatinine ratio','Peripheral blood smear (schistocytes in haemolysis)','CTG (cardiotocography) + fetal ultrasound for growth and Doppler']},
  ], '#ec4899', function(panel,item){panel.innerHTML=item.items.map(function(i){return '<div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #fbcfe855;font-size:13px"><span style="color:#ec4899;flex-shrink:0">◆</span>'+i+'</div>';}).join('');}));

  var elf=fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#64748b">👴 Elderly Considerations (≥65 years)</h3>'); el_.appendChild(elf);
  el_.appendChild(card('Key Principles in Elderly HTN','#64748b','<div class="tbl-wrap"><table><thead><tr style="background:#f8fafc"><th>Issue</th><th>Guidance</th></tr></thead><tbody>'+[['BP Target','ACC/AHA recommends <130/80 for most elderly if tolerated. Consider <140/90 in frail patients.'],['Orthostatic Hypotension','Check standing BP 1–3 min after rising. Drop ≥20/10 mmHg = orthostatic hypotension — see Hypotension module.'],['Fall Risk','Aggressive lowering (especially at night) increases falls. Check lying/standing BP regularly.'],['Polypharmacy','Review all medications. NSAIDs, decongestants, and some antidepressants raise BP.'],['White-Coat Effect','More prevalent in elderly. Consider ABPM or home monitoring before initiating therapy.'],['Drug Choice','Thiazides or CCBs preferred as first-line for isolated systolic HTN. Avoid alpha-blockers as first-line (fall risk)']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td>'+r[1]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // SCD + HTN
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#ef4444">🩸 Sickle Cell Disease + Hypertension</h3>'));
  el_.appendChild(notebox('📌 HTN in SCD carries dramatically higher risk of stroke, renal disease, and death. Even mild HTN (>130/80) requires treatment. SCD patients have lower baseline BP — what seems "normal" may be hypertensive for them.','#fef2f2','#fecaca'));
  el_.appendChild(card('SCD + HTN Management','#ef4444','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Aspect</th><th>Guidance</th></tr></thead><tbody>'+[
    ['BP Target','<130/80 mmHg — stricter than general population due to high stroke risk'],
    ['First-line','ACE inhibitor (Lisinopril/Enalapril) — nephroprotective, reduces proteinuria, may reduce sickling. Start low.'],
    ['Second-line','ARB if ACE inhibitor not tolerated. Add Amlodipine for additional BP control.'],
    ['Avoid','Thiazide diuretics — dehydration precipitates sickling crisis. Beta-blockers — may mask hypoglycaemia, reduce cardiac output.'],
    ['Hydroxyurea','Does not lower BP but reduces crisis frequency and stroke risk — consider in all SCD+HTN patients'],
    ['Monitoring','Renal function and proteinuria 3-monthly — SCD nephropathy is progressive. TCD annually for stroke risk.'],
    ['Anaemia caution','SCD patients have chronic anaemia — do not target Hb normalisation. Do not give EPO without haematology input.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;color:#ef4444;font-size:13px">'+r[0]+'</td><td style="font-size:13px">'+r[1]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // HIV + HTN
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#7c3aed">🦠 HIV + Hypertension — ARV Interactions</h3>'));
  el_.appendChild(notebox('📌 HIV increases cardiovascular risk independently. ARV drugs have significant interactions with antihypertensives — particularly protease inhibitors (Lopinavir, Ritonavir) which are potent CYP3A4 inhibitors. Always check interactions before prescribing.','#faf5ff','#e9d5ff'));
  el_.appendChild(card('ARV Drug Interactions with Antihypertensives','#7c3aed','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>ARV Drug</th><th>Antihypertensive</th><th>Interaction</th><th>Action</th></tr></thead><tbody>'+[
    ['Ritonavir / Lopinavir (PI)','Amlodipine, Nifedipine','Markedly increased Ca-channel blocker levels — severe hypotension risk','Reduce CCB dose by 50%, monitor closely'],
    ['Ritonavir / Lopinavir (PI)','Atorvastatin','Increased statin levels — myopathy risk','Use Rosuvastatin (lower interaction) or Pravastatin'],
    ['Ritonavir / Lopinavir (PI)','Sildenafil (pulmonary HTN)','Markedly increased sildenafil — severe hypotension','Contraindicated — do not combine'],
    ['Efavirenz (NNRTI)','Amlodipine, Diltiazem','Reduced CCB levels (CYP3A4 induction)','May need higher CCB dose — monitor BP'],
    ['Tenofovir (TDF)','NSAIDs, nephrotoxic drugs','Additive nephrotoxicity','Avoid NSAIDs — use Paracetamol for analgesia'],
    ['All ARVs','ACE inhibitors / ARBs','No significant interaction — PREFERRED combination','ACE inhibitor + ARB are first-line in HIV+HTN with proteinuria'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;color:#7c3aed;font-size:12px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px;color:#dc2626">'+r[2]+'</td><td style="font-size:12px;font-weight:600">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
  el_.appendChild(card('HIV + HTN — First-Line Treatment','#7c3aed','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Choice</th><th>Agent</th><th>Reason</th></tr></thead><tbody>'+[
    ['First-line','ACE inhibitor (Perindopril/Lisinopril)','Cardioprotective, renal protection, minimal ARV interactions. HIV patients have high rates of proteinuria.'],
    ['Second-line','ARB if ACE inhibitor not tolerated','Similar benefits, no significant ARV interaction'],
    ['Add-on','Amlodipine — with dose reduction if on PI','Effective, low sodium sensitivity'],
    ['Avoid in PI patients','High-dose Amlodipine, Diltiazem, Verapamil','CYP3A4 inhibition raises CCB levels dramatically'],
    ['Statin choice','Rosuvastatin or Pravastatin','Least interaction with protease inhibitors'],
    ['BP target','<130/80 mmHg','HIV patients at high CV risk — treat to lower target'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;color:#7c3aed;font-size:13px">'+r[0]+'</td><td style="font-size:13px">'+r[1]+'</td><td style="font-size:12px;color:#6b7280">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // Resistant HTN
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#0ea5e9">💊 Resistant Hypertension</h3>'));
  el_.appendChild(notebox('📌 <strong>Resistant HTN</strong> = BP above target despite ≥3 antihypertensive drugs at optimal doses, including a diuretic. True resistant HTN is rare — always exclude pseudo-resistance first (poor adherence, white coat effect, inadequate doses).','#f0f9ff','#bae6fd'));
  el_.appendChild(card('Resistant HTN — Systematic Approach','#0ea5e9','<div style="display:grid;gap:8px">'+[
    {step:'1',title:'Exclude Pseudo-Resistance',detail:'Confirm adherence (pill count, pharmacy records, urine drug levels). Confirm correct BP measurement technique. Exclude white coat HTN (ABPM/home BP monitoring). Review medications — are doses optimal?'},
    {step:'2',title:'Identify and Remove Causes',detail:'NSAIDs (very common in Nigeria — over-the-counter availability). Oral contraceptives. Liquorice, herbal remedies (Dongoyaro, Bitter kola). Excess alcohol. Cocaine/stimulants. Decongestants (pseudoephedrine). Review ALL medications.'},
    {step:'3',title:'Optimise Existing Regimen',detail:'Ensure patient is on optimal triple therapy: ACE inhibitor/ARB + CCB + thiazide diuretic at maximum tolerated doses. Use long-acting once-daily agents for adherence. Consider combined pill formulations.'},
    {step:'4',title:'Add 4th Agent',detail:'Spironolactone 25–50 mg OD — most effective 4th-line agent (PATHWAY-2 trial). Reduces BP by 11/5 mmHg. Check renal function and potassium first. Avoid if eGFR <45 or K+ >5.0. Alternative: Eplerenone 25–50 mg if gynaecomastia with Spironolactone.'},
    {step:'5',title:'Further Add-On Options',detail:'Alpha-blocker: Doxazosin 4–16 mg OD. Beta-blocker: Bisoprolol/Nebivolol if high HR. Centrally acting: Methyldopa (especially in pregnancy). Refer to specialist if still uncontrolled.'},
    {step:'6',title:'Investigate for Secondary Causes',detail:'Primary aldosteronism (most common secondary cause — aldosterone:renin ratio). Renovascular disease (renal artery Doppler). Phaeochromocytoma (24hr urinary catecholamines). OSA (sleep study). Cushing syndrome (cortisol). Renal parenchymal disease (eGFR, urine protein).'},
  ].map(function(r){return '<div style="display:grid;grid-template-columns:32px 1fr;gap:8px;padding:8px;border-left:4px solid #0ea5e9;background:#f8fafc;border-radius:0 8px 8px 0">'
    +'<div style="width:26px;height:26px;border-radius:50%;background:#0ea5e9;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px">'+r.step+'</div>'
    +'<div><div style="font-weight:700;font-size:13px;color:#0ea5e9">'+r.title+'</div><div style="font-size:12px;color:#374151;margin-top:3px">'+r.detail+'</div></div></div>';}).join('')+'</div>'));
}

