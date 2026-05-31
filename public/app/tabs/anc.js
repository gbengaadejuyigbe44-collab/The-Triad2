function tabANCAssessment(el_) {
  el_.appendChild(secTitle('🤰','ANC Hypertension Assessment','Antenatal BP assessment — EGA, pre-eclampsia risk stratification and management plan','#ec4899'));
  el_.appendChild(notebox('📌 <strong>Guideline:</strong> ISSHP 2018. Hypertension in pregnancy = BP ≥140/90 mmHg on two occasions ≥4 hours apart, or ≥160/110 mmHg on one occasion.','#fdf2f8','#fbcfe8'));

  var fc=card('Patient Profile','#ec4899','');
  var fcHTML='<div class="g2" style="margin-bottom:10px">';
  fcHTML+='<div><label class="lbl">Patient Name</label><input id="anc-name" type="text" class="inp" placeholder="e.g. Amaka Johnson"></div>';
  fcHTML+='<div><label class="lbl">Address</label><input id="anc-addr" type="text" class="inp" placeholder="e.g. 12 Lagos Street"></div>';
  fcHTML+='</div><div class="g4" style="margin-bottom:10px">';
  fcHTML+='<div><label class="lbl">Age (years)</label><input id="anc-age" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 28"></div>';
  fcHTML+='<div><label class="lbl">Weight (kg)</label><input id="anc-wt" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 72" oninput="calcANCBMI()"></div>';
  fcHTML+='<div><label class="lbl">Height (cm)</label><input id="anc-ht" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 162" oninput="calcANCBMI()"></div>';
  fcHTML+='<div><label class="lbl">G / P / L</label><div style="display:flex;gap:4px"><input id="anc-g" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="G" style="width:33%"><input id="anc-p" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="P" style="width:33%"><input id="anc-l2" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="L" style="width:33%"></div></div>';
  fcHTML+='</div><div id="anc-bmi-display" style="padding:10px 12px;background:#fdf2f8;border:1px solid #fbcfe8;border-radius:8px;font-size:13px;color:#be185d">BMI auto-calculates from weight and height.</div>';
  fc.querySelector('.card-body').innerHTML=fcHTML;
  el_.appendChild(fc);

  var gc=card('Gestational Age Calculation','#ec4899','');
  var gcHTML='<div style="display:flex;gap:10px;margin-bottom:14px">';
  gcHTML+='<button id="anc-lmp-btn" onclick="ancMethod(\'lmp\')" style="flex:1;padding:9px;background:#ec4899;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer">LMP Known</button>';
  gcHTML+='<button id="anc-scan-btn" onclick="ancMethod(\'scan\')" style="flex:1;padding:9px;background:#f1f5f9;color:#64748b;border:2px solid #e2e8f0;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer">Use Scan (USS)</button>';
  gcHTML+='</div>';
  gcHTML+='<div id="anc-lmp-section"><label class="lbl">Last Menstrual Period (LMP)</label><input id="anc-lmp" type="date" class="inp" oninput="calcFromLMP()"></div>';
  gcHTML+='<div id="anc-scan-section" style="display:none"><div class="g2">';
  gcHTML+='<div><label class="lbl">Scan Date</label><input id="anc-scan-date" type="date" class="inp" oninput="calcFromScan()"></div>';
  gcHTML+='<div><label class="lbl">EGA on Scan (weeks)</label><input id="anc-scan-ega" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 20" oninput="calcFromScan()"></div>';
  gcHTML+='</div></div><div id="anc-ega-result" style="margin-top:12px"></div>';
  gc.querySelector('.card-body').innerHTML=gcHTML;
  el_.appendChild(gc);

  var bc=card('Blood Pressure Reading','#ec4899','');
  var bcHTML='<div style="display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap;margin-bottom:10px">';
  bcHTML+='<div><label class="lbl">Systolic (mmHg)</label><input id="anc-sys" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" style="width:100px" placeholder="e.g. 148"></div>';
  bcHTML+='<span style="font-size:20px;color:#94a3b8;padding-bottom:8px">/</span>';
  bcHTML+='<div><label class="lbl">Diastolic (mmHg)</label><input id="anc-dia" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" style="width:100px" placeholder="e.g. 95"></div>';
  bcHTML+='</div><div class="g2">';
  bcHTML+='<div><label class="lbl">Proteinuria (dipstick)</label><select id="anc-protein" class="inp"><option value="nil">Nil</option><option value="trace">Trace</option><option value="1+">1+</option><option value="2+">2+</option><option value="3+">3+</option></select></div>';
  bcHTML+='<div><label class="lbl">Fetal Movement</label><select id="anc-fm" class="inp"><option value="normal">Normal</option><option value="reduced">Reduced / Absent</option></select></div>';
  bcHTML+='</div>';
  bcHTML+='<div class="g2" style="margin-top:10px"><div><label class="lbl">Maternal Heart Rate (bpm)</label><input id="anc-hr" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 96"></div><div><label class="lbl">Respiratory Rate (breaths/min)</label><input id="anc-rr" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 18"></div></div>';
  bc.querySelector('.card-body').innerHTML=bcHTML;
  el_.appendChild(bc);

  var riskData=[['anc-r1','Nulliparous (first pregnancy)'],['anc-r2','Previous pre-eclampsia or eclampsia'],['anc-r3','Multiple pregnancy (twins/triplets)'],['anc-r4','BMI ≥35 kg/m²'],['anc-r5','Age ≥40 years'],['anc-r6','Chronic hypertension'],['anc-r7','Diabetes mellitus (pre-existing)'],['anc-r8','Chronic kidney disease'],['anc-r9','Autoimmune disease (SLE, antiphospholipid)'],['anc-r10','Family history of pre-eclampsia']];
  var rc=card('Pre-eclampsia Risk Factors','#ec4899','');
  var rcHTML='<p style="font-size:12px;color:#64748b;margin-bottom:10px">Tick all that apply to this patient:</p>';
  riskData.forEach(function(r){rcHTML+='<label style="display:flex;align-items:center;gap:10px;font-size:13px;cursor:pointer;padding:7px 0;border-bottom:1px solid #fce7f355"><input type="checkbox" id="'+r[0]+'" style="width:16px;height:16px;accent-color:#ec4899"> '+r[1]+'</label>';});
  rc.querySelector('.card-body').innerHTML=rcHTML;
  el_.appendChild(rc);

  var dangerData=[['anc-d1','Severe headache (not relieved by paracetamol)'],['anc-d2','Visual disturbances (blurring, flashing lights)'],['anc-d3','Epigastric or right upper quadrant pain'],['anc-d4','Sudden severe facial / hand / feet swelling'],['anc-d5','Convulsions or loss of consciousness'],['anc-d6','Reduced or absent fetal movements'],['anc-d7','Vaginal bleeding']];
  var dc=card('⚠️ Danger Signs — Tick if Present','#dc2626','');
  var dcHTML='<p style="font-size:12px;color:#dc2626;font-weight:700;margin-bottom:10px">If ANY present — escalate IMMEDIATELY:</p>';
  dangerData.forEach(function(r){dcHTML+='<label style="display:flex;align-items:center;gap:10px;font-size:13px;cursor:pointer;padding:7px 0;border-bottom:1px solid #fecaca55"><input type="checkbox" id="'+r[0]+'" style="width:16px;height:16px;accent-color:#dc2626"> '+r[1]+'</label>';});
  dc.querySelector('.card-body').innerHTML=dcHTML;
  el_.appendChild(dc);

  var ab=document.createElement('button');
  ab.textContent='Generate ANC Assessment →';
  ab.style.cssText='width:100%;padding:13px;background:linear-gradient(135deg,#ec4899,#be185d);color:#fff;border:none;border-radius:12px;font-weight:800;font-size:15px;cursor:pointer;margin:8px 0 16px;box-shadow:0 4px 14px rgba(236,72,153,0.4)';
  el_.appendChild(ab);
  var resDiv=document.createElement('div');
  resDiv.id='anc-result';
  el_.appendChild(resDiv);

  window.calcANCBMI=function(){
    var wt=parseFloat(document.getElementById('anc-wt').value);
    var ht=parseFloat(document.getElementById('anc-ht').value);
    var disp=document.getElementById('anc-bmi-display');
    if(wt>0&&ht>0){
      var bmi=Math.round(wt/Math.pow(ht/100,2)*10)/10;
      var cat=bmi<18.5?'Underweight':bmi<25?'Normal':bmi<30?'Overweight':bmi<35?'Obese I':'Obese II+';
      var col=bmi<18.5?'#d97706':bmi<25?'#16a34a':bmi<30?'#d97706':'#dc2626';
      disp.innerHTML='<strong>BMI: '+bmi+'</strong> — <span style="color:'+col+';font-weight:700">'+cat+'</span>';
    }
  };

  window.ancMethod=function(m){
    document.getElementById('anc-lmp-section').style.display=m==='lmp'?'block':'none';
    document.getElementById('anc-scan-section').style.display=m==='scan'?'block':'none';
    var lb=document.getElementById('anc-lmp-btn');
    var sb=document.getElementById('anc-scan-btn');
    lb.style.background=m==='lmp'?'#ec4899':'#f1f5f9';lb.style.color=m==='lmp'?'#fff':'#64748b';lb.style.border=m==='lmp'?'none':'2px solid #e2e8f0';
    sb.style.background=m==='scan'?'#ec4899':'#f1f5f9';sb.style.color=m==='scan'?'#fff':'#64748b';sb.style.border=m==='scan'?'none':'2px solid #e2e8f0';
    document.getElementById('anc-ega-result').innerHTML='';
  };

  window.calcFromLMP=function(){
    var lmp=document.getElementById('anc-lmp').value;
    if(!lmp)return;
    var lmpDate=new Date(lmp),today=new Date();
    var diffDays=Math.floor((today-lmpDate)/(1000*60*60*24));
    if(diffDays<0||diffDays>300){document.getElementById('anc-ega-result').innerHTML='<p style="color:#ef4444;font-size:13px">Invalid LMP date.</p>';return;}
    var weeks=Math.floor(diffDays/7),days=diffDays%7;
    var edd=new Date(lmpDate);edd.setDate(edd.getDate()+280);
    showEGAResult(weeks,days,edd,weeks<13?'1st Trimester':weeks<28?'2nd Trimester':'3rd Trimester',weeks<13?'#0ea5e9':weeks<28?'#16a34a':'#ec4899','LMP');
  };

  window.calcFromScan=function(){
    var sd=document.getElementById('anc-scan-date').value;
    var sega=parseFloat(document.getElementById('anc-scan-ega').value);
    if(!sd||isNaN(sega))return;
    var scan=new Date(sd),today=new Date();
    var dss=Math.floor((today-scan)/(1000*60*60*24));
    var total=Math.round(sega*7)+dss;
    var weeks=Math.floor(total/7),days=total%7;
    var lmpEst=new Date(today);lmpEst.setDate(lmpEst.getDate()-total);
    var edd=new Date(lmpEst);edd.setDate(edd.getDate()+280);
    showEGAResult(weeks,days,edd,weeks<13?'1st Trimester':weeks<28?'2nd Trimester':'3rd Trimester',weeks<13?'#0ea5e9':weeks<28?'#16a34a':'#ec4899','USS');
  };

  function showEGAResult(weeks,days,edd,trimester,col,method){
    var eddStr=edd.toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'});
    document.getElementById('anc-ega-result').innerHTML=
      '<div style="background:'+col+'22;border:2px solid '+col+';border-radius:12px;padding:14px 16px;display:flex;flex-wrap:wrap;gap:16px;align-items:center">'+
      '<div style="text-align:center"><div style="font-size:28px;font-weight:900;color:'+col+'">'+weeks+'<sup style="font-size:14px">wks</sup> '+days+'<sup style="font-size:14px">d</sup></div>'+
      '<div style="font-size:11px;color:#64748b;font-weight:600">EGA (by '+method+')</div></div>'+
      '<div style="flex:1;min-width:140px"><div style="font-size:14px;font-weight:800;color:'+col+'">'+trimester+'</div>'+
      '<div style="font-size:13px;color:#374151;margin-top:4px">EDD: <strong>'+eddStr+'</strong></div></div></div>';
  }

  ab.onclick=function(){
    var name=document.getElementById('anc-name').value||'Patient';
    var age=document.getElementById('anc-age').value;
    var addr=document.getElementById('anc-addr').value;
    var wt=parseFloat(document.getElementById('anc-wt').value)||null;
    var ht=parseFloat(document.getElementById('anc-ht').value)||null;
    var bmi=wt&&ht?Math.round(wt/Math.pow(ht/100,2)*10)/10:null;
    var g=document.getElementById('anc-g').value||'?';
    var p=document.getElementById('anc-p').value||'?';
    var l=document.getElementById('anc-l2').value||'?';
    var sys=parseInt(document.getElementById('anc-sys').value);
    var dia=parseInt(document.getElementById('anc-dia').value);
    var protein=document.getElementById('anc-protein').value;
    var fm=document.getElementById('anc-fm').value;
    var ancHR=parseInt(document.getElementById('anc-hr').value)||null;
    var ancRR=parseInt(document.getElementById('anc-rr').value)||null;
    // Read EGA from the displayed result if available
    var egaEl=document.getElementById('anc-ega-result');
    var egaMatch=egaEl?(egaEl.textContent||'').match(/(\d+)\s*weeks?/i):null;
    var ega=egaMatch?parseInt(egaMatch[1]):null;
    if(isNaN(sys)||isNaN(dia)){document.getElementById('anc-result').innerHTML='<p style="color:#ef4444;padding:10px">Please enter a valid BP reading.</p>';return;}

    var bpClass,bpColor,bpBg,bpAction;
    if(sys<140&&dia<90){bpClass='Normal BP in Pregnancy';bpColor='#16a34a';bpBg='#f0fdf4';bpAction='Routine ANC. Continue monitoring. Reassess at next visit.';}
    else if((sys>=140&&sys<=159)||(dia>=90&&dia<=109)){bpClass='Mild-Moderate Hypertension';bpColor='#d97706';bpBg='#fffbeb';bpAction='Initiate or review antihypertensive therapy. Close monitoring. Check proteinuria. Consider admission if new-onset.';}
    else{bpClass='Severe Hypertension';bpColor='#dc2626';bpBg='#fef2f2';bpAction='URGENT: Treat immediately. IV/IM antihypertensive. Maternal stabilisation. Consider delivery. Call obstetric team NOW.';}

    var riskIds=['anc-r1','anc-r2','anc-r3','anc-r4','anc-r5','anc-r6','anc-r7','anc-r8','anc-r9','anc-r10'];
    var riskLabels=['Nulliparous','Prev pre-eclampsia','Multiple pregnancy','BMI≥35','Age≥40','Chronic HTN','Diabetes','CKD','Autoimmune','Family history'];
    var ticked=riskIds.filter(function(id){var el=document.getElementById(id);return el&&el.checked;});
    var riskLevel,riskColor,aspirinNote;
    if(ticked.length===0){riskLevel='Low Risk';riskColor='#16a34a';aspirinNote='Aspirin prophylaxis not routinely indicated.';}
    else if(ticked.indexOf('anc-r2')>-1||ticked.length>=2){riskLevel='High Risk';riskColor='#dc2626';aspirinNote='Low-dose Aspirin 75–150mg daily FROM 12 weeks gestation (ISSHP 2018). Continue until delivery.';}
    else{riskLevel='Moderate Risk';riskColor='#d97706';aspirinNote='Consider low-dose Aspirin 75mg daily from 12 weeks. Discuss with obstetrician.';}

    var dangerIds=['anc-d1','anc-d2','anc-d3','anc-d4','anc-d5','anc-d6','anc-d7'];
    var dangerLabels=['Severe headache','Visual disturbances','Epigastric pain','Severe oedema','Convulsions','Reduced fetal movement','Vaginal bleeding'];
    var dangers=dangerIds.filter(function(id){var el=document.getElementById(id);return el&&el.checked;});

    var proteinNote=protein==='nil'?'No proteinuria detected':protein==='trace'?'Trace — repeat MSU, monitor closely':protein==='1+'?'1+ — significant, check 24-hr urine or PCR ratio':protein==='2+'?'2+ — pre-eclampsia likely if HTN present':'3+ — SEVERE, pre-eclampsia highly likely, urgent escalation';
    var proteinColor=protein==='nil'?'#16a34a':protein==='trace'?'#d97706':protein==='1+'?'#d97706':'#dc2626';

    var html='<div class="anc-summary-page">';
    if(dangers.length){
      html+='<div style="background:#fef2f2;border:3px solid #dc2626;border-radius:12px;padding:16px;margin-bottom:12px">';
      html+='<div style="font-size:16px;font-weight:800;color:#dc2626;margin-bottom:8px">🚨 DANGER SIGNS PRESENT — ESCALATE IMMEDIATELY</div>';
      dangers.forEach(function(id){html+='<div style="font-size:13px;color:#1e293b;padding:5px 0;border-bottom:1px solid #fecaca55">⚠️ '+dangerLabels[dangerIds.indexOf(id)]+'</div>';});
      html+='<div style="margin-top:10px;font-size:13px;font-weight:700;color:#dc2626">→ Do NOT discharge. Call senior obstetrician immediately. Prepare for emergency management.</div></div>';
    }

    html+='<div style="border-radius:12px;overflow:hidden;border:2px solid '+bpColor+';margin-bottom:12px">';
    html+='<div style="padding:14px 18px;background:'+bpBg+'">';
    html+='<div style="font-size:15px;font-weight:800;color:#1e293b;margin-bottom:2px">👤 '+name+'</div>';
    html+='<div style="font-size:12px;color:#475569;margin-bottom:8px">'+(age?'Age: '+age+' yrs &nbsp;·&nbsp; ':'')+' G'+g+' P'+p+' L'+l+(addr?' &nbsp;·&nbsp; '+addr:'')+(bmi?' &nbsp;·&nbsp; BMI: '+bmi+' kg/m²':'')+'</div>';
    html+='<div style="height:1px;background:'+bpColor+'55;margin-bottom:8px"></div>';
    html+='<div style="font-size:17px;font-weight:800;color:'+bpColor+'">'+bpClass+'</div>';
    html+='<div style="font-size:13px;font-weight:700;color:'+bpColor+';opacity:0.85;margin-top:2px">'+sys+'/'+dia+' mmHg</div>';
    if(ancHR){var ancHrC=ancHR>100?'#dc2626':ancHR<50?'#7c3aed':'#16a34a';html+='<div style="font-size:12px;font-weight:700;color:'+ancHrC+';margin-top:4px">HR: '+ancHR+' bpm — '+(ancHR>100?'Tachycardia':ancHR<50?'Bradycardia':'Normal')+'</div>';}
    if(ancRR){var ancRrC=ancRR>=22?'#dc2626':'#475569';html+='<div style="font-size:12px;font-weight:700;color:'+ancRrC+';margin-top:2px">RR: '+ancRR+' breaths/min — '+(ancRR>=22?'Tachypnoea':'Normal')+'</div>';}
    html+='</div>';
    html+='<div style="padding:14px 18px;background:#fff;display:flex;flex-direction:column;gap:10px">';
    html+='<div style="padding:10px 14px;background:'+bpBg+';border-radius:8px;border-left:4px solid '+bpColor+'"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">Clinical Action</div><div style="font-size:13px;color:#1e293b;line-height:1.7">'+bpAction+'</div></div>';
    // Safe Pharmacotherapy — only show when BP warrants treatment (≥140/90)
    var needsTx = (sys >= 140 || dia >= 90);
    if (needsTx) {
      var isSevere = (sys >= 160 || dia >= 110);
      html += '<div style="padding:10px 14px;background:#f0f9ff;border-radius:8px;border-left:4px solid #0ea5e9">';
      html += '<div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:6px">💊 Safe Pharmacotherapy in Pregnancy</div>';
      if (isSevere) {
        html += '<div style="font-size:12px;font-weight:700;color:#dc2626;background:#fef2f2;padding:6px 10px;border-radius:6px;margin-bottom:8px">⚠️ Severe HTN — initiate treatment urgently. Target BP 140–150/90–100 mmHg.</div>';
      }
      html += '<div style="font-size:13px;color:#1e293b;line-height:1.9">';
      html += '<strong style="color:#16a34a">First-line (Oral tablets):</strong><br>';
      html += '• <strong>Labetalol</strong> 100–200mg oral tablet BD/TDS — titrate up to 400mg TDS if needed<br>';
      html += '• <strong>Methyldopa</strong> 250mg oral tablet TDS — increase to 500mg TDS (well-established safety)<br>';
      html += '• <strong>Nifedipine LA</strong> 20–30mg oral tablet OD — increase to 40mg OD/BD (CCB, safe in all trimesters)<br>';
      html += '<br><strong style="color:#dc2626">Acute Severe HTN (IV/IM):</strong><br>';
      html += '• <strong>Hydralazine</strong> 5–10mg IV/IM slow bolus — repeat every 20 min (max 20mg IV)<br>';
      html += '• <strong>Labetalol</strong> 20mg IV bolus — double dose every 10 min (max 80mg); or 1–2mg/min IV infusion<br>';
      html += '• <strong>Nifedipine</strong> 10mg oral capsule (bite and swallow) — repeat in 30 min if needed (NOT sublingual)<br>';
      html += '</div>';
      html += '<div style="font-size:13px;color:#dc2626;font-weight:700;margin-top:8px;padding:8px 10px;background:#fef2f2;border-radius:6px;line-height:1.7">';
      html += '🚫 <strong>AVOID in ALL trimesters:</strong> ACE inhibitors (Lisinopril, Ramipril, Enalapril) and ARBs (Losartan, Valsartan, Irbesartan) — teratogenic and fetotoxic. Cause fetal renal failure, oligohydramnios and neonatal death.';
      html += '</div></div>';
    }
    html+='<div style="padding:10px 14px;background:#fdf2f8;border-radius:8px;border-left:4px solid #ec4899"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">Proteinuria</div><div style="font-size:13px;color:'+proteinColor+';font-weight:600">'+protein.toUpperCase()+' — '+proteinNote+'</div></div>';
    html+='<div style="padding:10px 14px;background:#f8fafc;border-radius:8px;border-left:4px solid '+riskColor+'"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">Pre-eclampsia Risk</div>';
    html+='<div style="font-size:13px;font-weight:800;color:'+riskColor+';margin-bottom:4px">'+riskLevel+'</div>';
    if(ticked.length)html+='<div style="font-size:12px;color:#64748b;margin-bottom:6px">Risk factors: '+ticked.map(function(id){return riskLabels[riskIds.indexOf(id)];}).join(', ')+'</div>';
    html+='<div style="font-size:13px;color:#1e293b">'+aspirinNote+'</div></div>';
    if(fm==='reduced')html+='<div style="padding:10px 14px;background:#fef2f2;border-radius:8px;border-left:4px solid #dc2626"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">⚠️ Fetal Movement</div><div style="font-size:13px;color:#dc2626;font-weight:700">Reduced / Absent — arrange CTG and obstetric USS urgently.</div></div>';
    html+='</div></div>';

    // HR / RR Clinical Notes for ANC
    var ancVitalNotes = [];
    if(ancHR&&ancHR>100) ancVitalNotes.push('💓 <strong>Maternal Tachycardia (HR '+ancHR+' bpm):</strong> Tachycardia in pregnancy requires urgent evaluation. Key differentials: haemorrhage (antepartum haemorrhage, ectopic), sepsis (chorioamnionitis, UTI), anaemia, pulmonary embolism, thyrotoxicosis, or pain/anxiety. If HR >120 bpm with hypotension — haemodynamic emergency: call obstetric team immediately.');
    if(ancHR&&ancHR<50) ancVitalNotes.push('🫀 <strong>Maternal Bradycardia (HR '+ancHR+' bpm):</strong> Bradycardia is unusual in pregnancy. Consider beta-blocker over-treatment, hypothyroidism, or complete heart block. Review medications, check TFTs. If symptomatic (dizziness, syncope) — urgent cardiology review.');
    if(ancRR&&ancRR>=22) ancVitalNotes.push('🌬️ <strong>Tachypnoea (RR '+ancRR+' breaths/min):</strong> Elevated respiratory rate in pregnancy — consider pulmonary embolism (especially with pleuritic chest pain + hypoxia), pneumonia, pulmonary oedema (pre-eclampsia with severe features), or severe anaemia. Check SpO₂, perform chest auscultation and arrange CXR and ABG if indicated.');
    if(ancVitalNotes.length) {
      html += '<div style="padding:14px 16px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;margin-bottom:12px">';
      html += '<div style="font-size:12px;font-weight:700;color:#92400e;text-transform:uppercase;margin-bottom:8px">🫀 Maternal Vitals — Clinical Alerts</div>';
      ancVitalNotes.forEach(function(n){ html += '<div style="font-size:13px;color:#1e293b;line-height:1.7;padding:6px 0;border-bottom:1px solid #fed7aa55">'+n+'</div>'; });
      html += '</div>';
    }
    // Referral / Escalation — only show when clinically relevant
    var showReferral = (sys >= 140 || dia >= 90 || dangers.length > 0 || fm === 'reduced' || protein === '2+' || protein === '3+');
    if (showReferral) {
      html += '<div style="padding:14px 16px;background:#fdf2f8;border:1px solid #fbcfe8;border-radius:10px;margin-bottom:12px">';
      html += '<div style="font-size:12px;font-weight:700;color:#be185d;text-transform:uppercase;margin-bottom:8px">📋 Referral / Escalation Criteria</div>';
      var criteria = [];
      if (sys >= 160 || dia >= 110) criteria.push('BP ≥160/110 mmHg — refer to obstetric unit <strong>immediately</strong>');
      if ((protein === '2+' || protein === '3+') && (sys >= 140 || dia >= 90)) criteria.push('Proteinuria '+protein+' with hypertension — <strong>suspected pre-eclampsia</strong>, escalate urgently');
      if (dangers.length > 0) criteria.push('Danger sign(s) present — <strong>emergency escalation to senior obstetrician</strong>');
      if (fm === 'reduced') criteria.push('Reduced / absent fetal movements — <strong>urgent CTG + obstetric USS</strong>');
      if (sys >= 140 && parseInt(ega) < 34) criteria.push('EGA '+ega+' weeks with hypertension — <strong>specialist review for preterm delivery planning</strong>');
      if (sys >= 140 || dia >= 90) criteria.push('No improvement after 2 doses antihypertensive — <strong>escalate to doctor</strong>');
      if (criteria.length === 0) criteria.push('Monitor closely. Reassess at next ANC visit.');
      criteria.forEach(function(r) { html += '<div style="padding:5px 0;border-bottom:1px solid #fce7f355;font-size:13px;color:#1e293b">🔴 '+r+'</div>'; });
      html += '</div>';
    }
    html+='</div>'; // close anc-summary-page
    html+='<button onclick="window.print()" style="width:100%;padding:10px;background:#f8fafc;color:#64748b;border:2px solid #e2e8f0;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;margin-top:8px">🖨️ Print ANC Assessment Summary</button>';


    // ── Recommended Investigations ────────────────────────────
    var _ancEga=parseInt(ega)||0;
    var _ancInv=[];
    // BOOKING / FIRST VISIT PANEL (≤16 weeks)
    if(_ancEga<=16||_ancEga===0){
      _ancInv.push({t:'Full Blood Count (FBC)',r:'Booking bloods — baseline Hb (anaemia), platelets, MCV (iron/B12 deficiency). WHO: Hb <110g/L = anaemia in pregnancy.'});
      _ancInv.push({t:'Blood Group + Rhesus (Rh) Typing',r:'Rh-negative mothers at risk of isoimmunisation if Rh-positive fetus. Anti-D prophylaxis required. RCOG 2011.'});
      _ancInv.push({t:'Antibody Screen (indirect Coombs test)',r:'Detect red cell alloantibodies that may cause haemolytic disease of the fetus/newborn (HDFN).'});
      _ancInv.push({t:'VDRL / RPR (Syphilis serology)',r:'Congenital syphilis prevention — mandatory antenatal screen in most guidelines including FMOH Nigeria.'});
      _ancInv.push({t:'HIV 1 & 2 Antibody Test',r:'PMTCT (Prevention of Mother-to-Child Transmission). ART initiated if positive — reduces transmission to <1%. FMOH mandatory.'});
      _ancInv.push({t:'Hepatitis B Surface Antigen (HBsAg)',r:'Vertical transmission risk 70–90% if HBeAg positive. Newborn requires HBIg + HBV vaccine within 12hrs of birth.'});
      _ancInv.push({t:'Urinalysis + Urine MC&S',r:'Asymptomatic bacteriuria (ASB) in pregnancy → pyelonephritis if untreated. Treat ASB to reduce preterm labour risk.'});
      _ancInv.push({t:'Fasting Blood Glucose / HbA1c',r:'Pre-existing DM screen at booking. Undiagnosed DM in early pregnancy significantly increases fetal anomaly risk.'});
      _ancInv.push({t:'Thyroid Function Tests (TFTs) — TSH',r:'Hypothyroidism (↑TSH) and hyperthyroidism — both cause adverse pregnancy outcomes. NICE: screen at booking if symptoms.'});
      _ancInv.push({t:'First-trimester Dating Ultrasound (6–12 weeks)',r:'Confirm viability, EGA, number of fetuses, chorionicity. Crown-rump length (CRL) most accurate EGA before 12 weeks.'});
      _ancInv.push({t:'Nuchal Translucency (NT) Scan (11–14 weeks)',r:'Trisomy 21 (Down syndrome) screening. NT >3.5mm = high risk. Combined with serum PAPP-A and free β-hCG (combined test).'});
    }
    // MID-PREGNANCY PANEL (17–27 weeks)
    if(_ancEga>=17&&_ancEga<=27){
      _ancInv.push({t:'Anomaly Scan (18–20 weeks)',r:'Structural fetal survey — cardiac, neural tube, renal, limb anomalies. NICE: offer to all at 18+0 to 20+6 weeks.'});
      _ancInv.push({t:'Repeat FBC (Hb check)',r:'Iron deficiency anaemia common by mid-pregnancy — fetal demands increase. WHO threshold: Hb <105g/L in 2nd trimester.'});
      _ancInv.push({t:'Oral Glucose Tolerance Test 75g (24–28 weeks)',r:'GDM screening — WHO 2013: FPG ≥5.1 or 1hr ≥10.0 or 2hr ≥8.5 mmol/L = GDM. High-risk patients screen earlier.'});
      _ancInv.push({t:'Repeat Antibody Screen (if Rh-negative)',r:'Rh-negative mothers — repeat at 28 weeks before anti-D prophylaxis. Detect new sensitisation.'});
    }
    // THIRD TRIMESTER PANEL (28+ weeks)
    if(_ancEga>=28){
      _ancInv.push({t:'Repeat FBC + Blood Group (28 weeks)',r:'Hb for anaemia management. Blood group confirmation for delivery planning. Crossmatch if high-risk delivery anticipated.'});
      _ancInv.push({t:'Anti-D Prophylaxis (Rh-negative, 28–30 weeks)',r:'Routine antenatal anti-D — reduces sensitisation risk from 1.5% to 0.2%. RCOG 2011 guideline.'});
      _ancInv.push({t:'Cardiotocography (CTG)',r:'28+ weeks — fetal heart rate monitoring if reduced movements, HTN, or clinical concern. Reactive CTG = reassuring.'});
      _ancInv.push({t:'Growth + Doppler Ultrasound (32–36 weeks)',r:'IUGR and placental function assessment. Umbilical artery Doppler — absent/reversed diastolic flow = high risk.'});
      _ancInv.push({t:'GBS (Group B Streptococcus) Swab (35–37 weeks)',r:'Neonatal GBS disease prevention — offer culture-based screening or risk-factor-based intrapartum antibiotics (local protocol).'});
    }
    // HYPERTENSION IN PREGNANCY — add pre-eclampsia workup
    if(sys>=140||dia>=90){
      _ancInv.push({t:'24-hour Urine Protein OR Spot PCR',r:'Pre-eclampsia diagnosis — 24hr urine protein >300mg OR PCR >30mg/mmol. Proteinuria + HTN after 20 weeks = pre-eclampsia until proven otherwise.'});
      _ancInv.push({t:'FBC (Platelets)',r:'HELLP syndrome — thrombocytopenia (<100×10⁹/L) with haemolysis and elevated liver enzymes. Obstetric emergency.'});
      _ancInv.push({t:'LFTs (AST, ALT, LDH)',r:'HELLP — AST/ALT >2× upper normal + LDH >600 IU/L = haemolysis. Requires urgent delivery if <34 weeks.'});
      _ancInv.push({t:'Serum Uric Acid (Urate)',r:'Elevated in pre-eclampsia — marker of disease severity and renal involvement. Rising trend indicates deterioration.'});
      _ancInv.push({t:'Serum Creatinine + eGFR',r:'Renal involvement in pre-eclampsia — creatinine >90 μmol/L is abnormal in pregnancy (lower than non-pregnant normal).'});
      _ancInv.push({t:'Serum Calcium + Magnesium',r:'Eclampsia prevention — MgSO₄ requires baseline Mg level. Hypocalcaemia may contribute to seizure risk.'});
      _ancInv.push({t:'Fetal Umbilical Artery Doppler USS',r:'Hypertension — assess uteroplacental blood flow. Absent or reversed end-diastolic flow = fetal compromise, expedite delivery.'});
      _ancInv.push({t:'Placental Growth Factor (PlGF)',r:'Novel pre-eclampsia biomarker. PlGF <100 pg/mL at 20–36 weeks has 96% sensitivity for severe PE. NICE 2022 recommends PlGF-based testing.'});
    }
    // Danger signs — escalate investigations
    if(dangers&&dangers.length){
      _ancInv.push({t:'CT Head (if seizure or severe headache)',r:'Danger signs — exclude intracranial haemorrhage, PRES (posterior reversible encephalopathy syndrome) in eclampsia.'});
      _ancInv.push({t:'Serum Magnesium Level (if on MgSO₄)',r:'MgSO₄ toxicity monitoring — therapeutic range 2–3.5 mmol/L. Toxicity: loss of patellar reflexes, respiratory depression.'});
    }
    // High-risk features
    if(ticked&&ticked.length>=2){
      _ancInv.push({t:'First-trimester PlGF + PAPP-A + Uterine Artery Doppler',r:'≥2 pre-eclampsia risk factors — combined first-trimester screening. Identifies >75% of early-onset PE. ISSHP 2018.'});
    }
    // Render
    var _ancInvHtml='';
    if(_ancInv.length){
      _ancInvHtml='<div style="margin-top:14px;background:#f8fafc;border:2px solid #ec489944;border-radius:12px;overflow:hidden">';
      _ancInvHtml+='<div style="padding:10px 16px;background:#fdf2f8;border-bottom:1px solid #fbcfe8;display:flex;align-items:center;gap:8px">';
      _ancInvHtml+='<span style="font-size:16px">🧪</span>';
      _ancInvHtml+='<span style="font-size:12px;font-weight:800;color:#be185d;text-transform:uppercase;letter-spacing:0.6px">Recommended Investigations</span>';
      _ancInvHtml+='<span style="font-size:10px;color:#64748b;margin-left:4px">— ISSHP 2018 · NICE NG133 · FMOH · RCOG</span>';
      _ancInvHtml+='</div>';
      _ancInvHtml+='<div class="tbl-wrap"><table style="width:100%;border-collapse:collapse">';
      _ancInvHtml+='<thead><tr style="background:#fdf2f8"><th style="padding:7px 12px;text-align:left;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.4px">Investigation</th><th style="padding:7px 12px;text-align:left;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.4px">Rationale</th></tr></thead>';
      _ancInvHtml+='<tbody>'+_ancInv.map(function(r,i){return '<tr style="background:'+(i%2===0?'#fff':'#fdf2f8')+'"><td style="padding:8px 12px;font-size:13px;font-weight:600;color:#1e293b;border-bottom:1px solid #fce7f3;white-space:nowrap;min-width:200px">'+r.t+'</td><td style="padding:8px 12px;font-size:12px;color:#475569;border-bottom:1px solid #fce7f3;line-height:1.5">'+r.r+'</td></tr>';}).join('')+'</tbody>';
      _ancInvHtml+='</table></div>';
      _ancInvHtml+='<div style="padding:7px 12px;font-size:10px;color:#94a3b8;border-top:1px solid #fbcfe8;font-style:italic">Sources: ISSHP 2018 · NICE NG133 · FMOH Nigeria ANC Protocol · RCOG 2011 · ADA 2024</div>';
      _ancInvHtml+='</div>';
    }
    html+=_ancInvHtml;
    // ── End Investigations ─────────────────────────────────────
    document.getElementById('anc-result').innerHTML=html;
    wrapTables(document.getElementById('anc-result'));
    document.getElementById('anc-result').insertAdjacentHTML('beforeend', '<button class="result-print-btn" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-top:14px;padding:11px;background:#f0f9ff;color:#0369a1;border:2px solid #bae6fd;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit;" onclick="printClassifierResult(\'anc-result\',\'ANC Hypertension Assessment\')">🖨️ Print This Assessment</button>');
    document.getElementById('anc-result').scrollIntoView({behavior:'smooth',block:'start'});
  };
}


