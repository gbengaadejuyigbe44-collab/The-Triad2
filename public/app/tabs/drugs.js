// ════════════════════════════════════════════════════════════════
// DRUG REFERENCE MODULE
// ════════════════════════════════════════════════════════════════

function tabDrugPsychiatry(el_) {
  el_.appendChild(secTitle('🧠','Psychiatric Drug Reference','Antipsychotics, mood stabilisers & antidepressants — metabolic effects and interactions','#8b5cf6'));
  el_.appendChild(notebox('📌 Psychiatric patients on long-term antipsychotics have significantly elevated risk of HTN, T2DM, dyslipidaemia and metabolic syndrome. Metabolic monitoring is mandatory. Sources: Maudsley Prescribing Guidelines (14th ed.), BNF, NICE NG185, ADA 2024.','#faf5ff','#e9d5ff'));

  // ── Typical Antipsychotics ──
  el_.appendChild(card('Typical Antipsychotics (First Generation)','#8b5cf6','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Dose Range</th><th>Route</th><th>Metabolic Risk</th><th>Key Cautions</th></tr></thead><tbody>'+[
    ['Haloperidol','0.5–20 mg/day','Oral / IM / IV','Low — weight gain minimal, low DM risk','QTc prolongation. EPS/tardive dyskinesia. Avoid in Parkinson disease.'],
    ['Chlorpromazine','25–1000 mg/day','Oral / IM','Moderate — weight gain, glucose dysregulation','Sedating. Postural hypotension. Lowers seizure threshold.'],
    ['Fluphenazine decanoate','12.5–100 mg every 2–4 wks','IM depot','Low–Moderate','Depot — ensure site rotation. High EPS risk.'],
    ['Zuclopenthixol decanoate','100–600 mg every 1–4 wks','IM depot','Low–Moderate','Sedating. Monitor BP. Acuphase (acetate) for acute agitation.'],
    ['Flupentixol decanoate','20–400 mg every 2–4 wks','IM depot','Low','Can improve mood at low doses. EPS at higher doses.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#8b5cf6">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px;color:#d97706">'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // ── Atypical Antipsychotics ──
  el_.appendChild(card('Atypical Antipsychotics (Second Generation) — Metabolic Risk Ranked','#7c3aed','<div class="tbl-wrap"><table><thead><tr style="background:#f5f3ff"><th>Drug</th><th>Dose Range</th><th>Weight Gain</th><th>DM Risk</th><th>Dyslipidaemia</th><th>BP Effect</th></tr></thead><tbody>'+[
    ['Clozapine','150–900 mg/day','++++  (highest)','++++','++++','↑ significant — orthostatic & sustained HTN'],
    ['Olanzapine','5–20 mg/day','++++','+++','+++','↑ moderate — weight-mediated'],
    ['Quetiapine','150–750 mg/day','+++','++','+++','↓ orthostatic hypotension common'],
    ['Risperidone','2–8 mg/day','++','++','++','↑ mild. Hyperprolactinaemia'],
    ['Paliperidone','3–12 mg/day','++','++','++','Similar to risperidone (active metabolite)'],
    ['Amisulpride','50–1200 mg/day','+','+','+','Neutral — lowest metabolic burden'],
    ['Aripiprazole','10–30 mg/day','+','+','+','Neutral — weight gain less likely'],
    ['Lurasidone','37–148 mg/day','+','+','Neutral','Neutral — preferred if metabolic risk high'],
  ].map(function(r){
    var wCol = r[2].includes('++++') ? '#dc2626' : r[2].includes('+++') ? '#ea580c' : r[2].includes('++') ? '#d97706' : '#16a34a';
    return '<tr class="tbl-row"><td style="font-weight:700;color:#7c3aed">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-weight:700;color:'+wCol+'">'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td><td style="font-size:12px">'+r[5]+'</td></tr>';
  }).join('')+'</tbody></table></div><p style="font-size:11px;color:#64748b;margin-top:6px">+ = low risk, ++ = moderate, +++ = high, ++++ = very high. Source: Maudsley Prescribing Guidelines 14th ed.</p>'));

  // ── Metabolic Monitoring ──
  el_.appendChild(card('Mandatory Metabolic Monitoring — Antipsychotics','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Parameter</th><th>Baseline</th><th>4–6 Weeks</th><th>3 Months</th><th>Annually</th></tr></thead><tbody>'+[
    ['Weight / BMI','✓','✓','✓','✓'],
    ['Waist circumference','✓','—','✓','✓'],
    ['Blood pressure','✓','✓','✓','✓'],
    ['Fasting glucose / HbA1c','✓','—','✓','✓'],
    ['Fasting lipid panel','✓','—','✓','✓'],
    ['FBC (Clozapine ONLY)','✓','Weekly × 18 wks','Fortnightly','Monthly for life'],
    ['ECG / QTc','✓','—','If symptomatic','Annually on high-risk agents'],
    ['LFTs + U&E','✓','—','✓','✓'],
    ['Prolactin','✓','—','If symptomatic','If on risperidone/paliperidone'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="text-align:center;color:#16a34a;font-weight:700">'+r[1]+'</td><td style="text-align:center;font-size:12px">'+r[2]+'</td><td style="text-align:center;font-size:12px">'+r[3]+'</td><td style="text-align:center;font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div><p style="font-size:11px;color:#64748b;margin-top:6px">Source: NICE NG185, Maudsley Guidelines 14th ed. Clozapine FBC monitoring is legally mandated in most jurisdictions.</p>'));

  // ── Mood Stabilisers ──
  el_.appendChild(card('Mood Stabilisers','#0891b2','<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Drug</th><th>Dose Range</th><th>Monitoring</th><th>Metabolic Effects</th><th>Interactions with HTN/DM drugs</th></tr></thead><tbody>'+[
    ['Lithium','400–2000 mg/day (target level 0.6–1.0 mmol/L)','Serum levels, U&E, TFTs, eGFR every 6 months','Weight gain moderate. Polyuria/polydipsia — can mask DM symptoms','ACE inhibitors + Thiazides raise lithium levels → toxicity risk. NSAID caution.'],
    ['Sodium Valproate','500–2500 mg/day','LFTs, FBC, weight','Weight gain significant (++). Insulin resistance. Teratogenic.','Minimal HTN/DM interactions but hepatotoxic — avoid with other hepatotoxic drugs.'],
    ['Lamotrigine','25–400 mg/day','Rash monitoring, slow titration','Weight neutral — preferred if metabolic risk high','No significant HTN/DM interactions. Safer metabolic profile.'],
    ['Carbamazepine','200–1800 mg/day','FBC, LFTs, serum levels, Na⁺','Weight gain mild. Hyponatraemia.','Induces CYP450 — reduces efficacy of CCBs (amlodipine, nifedipine). Monitor BP.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0891b2">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:12px;color:#d97706">'+r[3]+'</td><td style="font-size:12px;color:#dc2626">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // ── Antidepressants ──
  el_.appendChild(card('Antidepressants — Metabolic & Cardiovascular Effects','#0ea5e9','<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Class / Drug</th><th>BP Effect</th><th>Weight Effect</th><th>DM Risk</th><th>Key Caution</th></tr></thead><tbody>'+[
    ['SSRIs (Fluoxetine, Sertraline, Citalopram)','Neutral / mild ↓ BP','Neutral to mild gain','Low — may improve insulin sensitivity','Sertraline preferred in cardiac patients. Citalopram: QTc risk at >40mg.'],
    ['SNRIs (Venlafaxine, Duloxetine)','↑ BP (dose-dependent — venlafaxine)','Mild weight gain','Low','Monitor BP on venlafaxine. Duloxetine useful in diabetic neuropathy.'],
    ['TCAs (Amitriptyline, Imipramine)','Orthostatic hypotension ↓ BP','Weight gain +++','Moderate — worsens glycaemic control','QTc prolongation. Anticholinergic. Avoid in elderly, cardiac disease.'],
    ['MAOIs (Phenelzine, Tranylcypromine)','Hypertensive crisis (tyramine)','Weight gain ++','Low','Tyramine dietary restriction mandatory. Severe drug interactions.'],
    ['Mirtazapine','Mild ↓ BP / dizziness','Weight gain +++ (appetite ↑)','Moderate','Sedating — useful for insomnia. Significant weight gain limits use.'],
    ['Bupropion','↑ BP possible','Weight neutral / loss','Low','Lowers seizure threshold. Contraindicated in eating disorders.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="font-size:12px;color:#dc2626">'+r[1]+'</td><td style="font-size:12px;color:#d97706">'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // ── Antipsychotic-Induced HTN/DM Management ──
  el_.appendChild(card('Managing Antipsychotic-Induced Metabolic Complications','#16a34a','<div class="g2">'+[
    {title:'🩸 Antipsychotic-Induced Diabetes', col:'#ef4444', points:[
      'Screen with fasting glucose + HbA1c at baseline and every 3 months',
      'Metformin is first-line — also reduces antipsychotic weight gain (evidence: ADA 2024)',
      'Avoid sulphonylureas if patient already at risk of hypoglycaemia (erratic meals)',
      'SGLT2 inhibitors useful if obesity + DM co-exist',
      'Consider switching to metabolically neutral antipsychotic (aripiprazole, lurasidone)',
    ]},
    {title:'🫀 Antipsychotic-Induced HTN', col:'#0ea5e9', points:[
      'Clozapine and olanzapine most likely to cause sustained BP elevation',
      'Manage with standard ESC/ESH 2023 antihypertensive guidelines',
      'ACE inhibitors / ARBs preferred if DM co-exists',
      'Avoid beta-blockers if patient on antipsychotics causing bradycardia (additive)',
      'Check for postural hypotension before labelling as HTN — quetiapine especially',
    ]},
    {title:'⚖️ Weight Management', col:'#d97706', points:[
      'Metformin reduces antipsychotic-induced weight gain — consider early initiation',
      'GLP-1 receptor agonists (semaglutide) emerging evidence for antipsychotic obesity',
      'Structured lifestyle intervention — dietitian referral for all patients on clozapine/olanzapine',
      'Consider switching antipsychotic if weight gain >7% baseline within 3 months',
      'Target BMI <25 kg/m² — waist circumference <94 cm (M) / <80 cm (F)',
    ]},
    {title:'💊 Key Drug Interactions', col:'#7c3aed', points:[
      'Lithium + ACE inhibitors/Thiazides → raised lithium levels → toxicity',
      'Carbamazepine + CCBs (amlodipine) → reduced antihypertensive efficacy',
      'Clozapine + antihypertensives → enhanced hypotension — titrate carefully',
      'MAOIs + any sympathomimetic → hypertensive crisis',
      'Antipsychotics + QTc-prolonging antihypertensives (e.g. amiodarone) → arrhythmia risk',
    ]},
  ].map(function(x){return '<div style="padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;border-top:3px solid '+x.col+'"><div style="font-size:12px;font-weight:800;color:'+x.col+';margin-bottom:8px">'+x.title+'</div>'+x.points.map(function(p){return '<div style="font-size:12px;color:#374151;padding:4px 0;border-bottom:1px solid #f1f5f9;line-height:1.5"><span style="color:'+x.col+';margin-right:6px">›</span>'+p+'</div>';}).join('')+'</div>';}).join('')+'</div>'));

  el_.appendChild(notebox('💡 <strong>Clinical Pearl for Psychiatric Settings:</strong> Every patient on a second-generation antipsychotic should be treated as having an elevated cardiovascular risk equivalent. The Triad\'s HTN and Diabetes modules apply directly to this population — metabolic syndrome in psychiatric patients is a preventable cause of premature death.','#faf5ff','#e9d5ff'));
}

function tabDrugAntihypertensives(el_) {
  el_.appendChild(secTitle('💊','Antihypertensive Drug Reference','Oral and IV agents — doses, classes, indications and cautions','#0ea5e9'));
  el_.appendChild(notebox('📌 Doses shown are standard adult doses. Always individualise based on renal function, comorbidities and patient tolerance. Source: ESC/ESH 2023, BNF.','#f0f9ff','#bae6fd'));

  // ── RENAL CAUTION BANNER ──
  el_.appendChild(card('🫘 Renal Dose Flags — Key Antihypertensives in CKD','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug / Class</th><th>CKD Stage 3 (eGFR 30–59)</th><th>CKD Stage 4–5 (eGFR &lt;30)</th><th>Key Risk</th></tr></thead><tbody>'+[
    ['ACE inhibitors (all)','✅ Use — preferred; monitor K⁺ + eGFR at 1–2 wks','⚠️ Use with caution; reduce dose; specialist input if eGFR <20','Hyperkalaemia, AKI on initiation. Check eGFR within 2 weeks of starting.'],
    ['ARBs (all)','✅ Use — preferred; same monitoring as ACEi','⚠️ Caution below eGFR 30; avoid dual RAAS blockade','Hyperkalaemia. Never combine ACEi + ARB (ONTARGET trial).'],
    ['Spironolactone','⚠️ Use with caution — K⁺ monitoring monthly','❌ AVOID — severe hyperkalaemia risk','K⁺ >5.5 mEq/L: withhold. Contraindicated if eGFR <30 or K⁺ already elevated.'],
    ['Thiazides (HCTZ, Indapamide)','⚠️ Reduced efficacy — switch to loop if eGFR <30','❌ Thiazides ineffective below eGFR 30 — use Furosemide instead','Switch to loop diuretic. Chlorthalidone may retain some efficacy down to eGFR 20.'],
    ['Furosemide','✅ Use; may need higher doses in CKD','✅ Preferred diuretic — increase dose (up to 500mg)','Ototoxicity at high IV doses. Monitor electrolytes.'],
    ['CCBs (Amlodipine, Nifedipine)','✅ No dose adjustment','✅ Safe — no renal adjustment needed','No renal dose adjustment. Generally safe across all CKD stages.'],
    ['Beta-blockers (Bisoprolol)','✅ No adjustment','⚠️ Some renally cleared — reduce dose; atenolol: halve dose','Atenolol and sotalol require dose reduction. Bisoprolol, metoprolol safer.'],
  ].map(function(r){
    return '<tr class="tbl-row"><td style="font-weight:700;color:#374151;font-size:12px">'+r[0]+'</td>'+[r[1],r[2]].map(function(v){
      var c=v.includes('❌')?'#dc2626':v.includes('⚠️')?'#d97706':'#16a34a';
      return '<td style="font-size:11px;color:'+c+';font-weight:600">'+v+'</td>';
    }).join('')+'<td style="font-size:11px;color:#374151">'+r[3]+'</td></tr>';
  }).join('')+'</tbody></table></div><p style="font-size:11px;color:#64748b;margin-top:8px">Triple Whammy Warning: ACEi/ARB + Diuretic + NSAID = high AKI risk. Avoid NSAIDs in any CKD patient on antihypertensives. Source: ESC/ESH 2023, BNF.</p>'));

  el_.appendChild(card('ACE Inhibitors','#0ea5e9','<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Drug</th><th>Starting Dose</th><th>Max Dose</th><th>Frequency</th><th>Key Cautions</th></tr></thead><tbody>'+[
    ['Lisinopril','2.5–5 mg','40 mg','OD','Avoid in pregnancy, bilateral RAS, K⁺ >5.5. Monitor eGFR + K⁺.'],
    ['Ramipril','1.25–2.5 mg','10 mg','OD','Same as above. First-line post-MI and in proteinuric CKD.'],
    ['Perindopril','2–4 mg','8–16 mg','OD','Well tolerated. Used in ASCVD prevention (EUROPA trial).'],
    ['Enalapril','2.5–5 mg','40 mg','BD','Twice daily dosing — consider adherence.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('ARBs (Angiotensin Receptor Blockers)','#06b6d4','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdfa"><th>Drug</th><th>Starting Dose</th><th>Max Dose</th><th>Frequency</th><th>Key Cautions</th></tr></thead><tbody>'+[
    ['Losartan','25–50 mg','100 mg','OD','Use when ACE inhibitor causes cough. Avoid in pregnancy.'],
    ['Valsartan','80 mg','320 mg','OD','Good evidence in HF (Val-HeFT). Monitor K⁺.'],
    ['Irbesartan','75–150 mg','300 mg','OD','Preferred in diabetic nephropathy (IDNT trial).'],
    ['Candesartan','4–8 mg','32 mg','OD','Strong evidence in HFrEF. Good tolerability.'],
    ['Telmisartan','20–40 mg','80 mg','OD','Long half-life — once daily. Evidence in CV prevention (ONTARGET).'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#06b6d4">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Calcium Channel Blockers (CCBs)','#8b5cf6','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Starting Dose</th><th>Max Dose</th><th>Frequency</th><th>Key Cautions</th></tr></thead><tbody>'+[
    ['Amlodipine','2.5–5 mg','10 mg','OD','First-line. Well tolerated. Ankle oedema common.'],
    ['Nifedipine LA','20–30 mg','90 mg','OD','Long-acting only. Avoid short-acting (reflex tachycardia).'],
    ['Lercanidipine','10 mg','20 mg','OD','Less ankle oedema than amlodipine.'],
    ['Diltiazem SR','90–120 mg','360 mg','BD','Rate-limiting CCB. Use in AF + HTN. Avoid with beta-blocker.'],
    ['Verapamil SR','120–240 mg','480 mg','BD/OD','Rate-limiting. Avoid with beta-blocker — heart block risk.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#8b5cf6">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Diuretics','#16a34a','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Starting Dose</th><th>Max Dose</th><th>Frequency</th><th>Key Cautions</th></tr></thead><tbody>'+[
    ['Hydrochlorothiazide','12.5–25 mg','50 mg','OD','First-line thiazide. Low dose preferred (12.5–25 mg).'],
    ['Indapamide','1.25–2.5 mg','2.5 mg','OD','Preferred thiazide-like — better metabolic profile.'],
    ['Chlorthalidone','12.5–25 mg','50 mg','OD','Longer acting than HCTZ — superior 24hr BP control.'],
    ['Furosemide','20–40 mg','500 mg','BD','Loop diuretic — use if eGFR <30 or fluid overload.'],
    ['Spironolactone','25 mg','100 mg','OD','4th-line agent in resistant HTN (PATHWAY-2). Monitor K⁺.'],
    ['Eplerenone','25–50 mg','100 mg','OD/BD','Selective MRA — less gynaecomastia than spironolactone.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Beta-Blockers','#d97706','<div class="tbl-wrap"><table><thead><tr style="background:#fffbeb"><th>Drug</th><th>Starting Dose</th><th>Max Dose</th><th>Frequency</th><th>Key Cautions</th></tr></thead><tbody>'+[
    ['Bisoprolol','1.25–5 mg','20 mg','OD','Cardioselective. First-line in HFrEF and AF rate control.'],
    ['Atenolol','25–50 mg','100 mg','OD','Cardioselective. Less evidence than newer agents.'],
    ['Metoprolol succinate','25–50 mg','200 mg','OD','Cardioselective. Good evidence in HF (MERIT-HF).'],
    ['Carvedilol','3.125 mg','50 mg','BD','Non-selective + alpha-blocker. Use in HF. Titrate slowly.'],
    ['Labetalol','100 mg','2400 mg','BD/TDS','Alpha + beta blocker. IV form for hypertensive emergencies.'],
    ['Nebivolol','2.5–5 mg','10 mg','OD','Vasodilatory — nitric oxide release. Good in elderly.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#d97706">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('IV Agents — Hypertensive Emergency','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>IV Dose</th><th>Onset</th><th>Notes</th></tr></thead><tbody>'+[
    ['Labetalol','20 mg bolus → 40–80 mg q10 min (max 300 mg) OR 0.5–2 mg/min infusion','5 min','Avoid in asthma, severe bradycardia'],
    ['Hydralazine','5–10 mg bolus q20 min (max 30 mg)','10–30 min','Preferred in pregnancy/eclampsia'],
    ['Nitroprusside','0.3–10 mcg/kg/min infusion','Seconds','ICU only — cyanide toxicity risk >72hrs'],
    ['GTN (Nitroglycerine)','5–200 mcg/min infusion','2–5 min','Best for HTN + ACS or pulmonary oedema'],
    ['Furosemide','20–80 mg IV bolus','5 min','Adjunct if fluid overload present'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#dc2626">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
}

function tabDrugVasopressors(el_) {
  el_.appendChild(secTitle('💉','Vasopressors & Inotropes','Weight-based dosing calculator — enter patient weight for personalised rates','#a855f7'));
  el_.appendChild(notebox('⚖️ Enter patient weight below. All mcg/kg/min doses will auto-calculate to mcg/min, infusion rates and preparation instructions.','#faf5ff','#e9d5ff'));

  var wc = document.createElement('div');
  wc.style.cssText = 'background:#1e293b;border:2px solid #a855f7;border-radius:12px;padding:16px;margin-bottom:16px;display:flex;align-items:center;gap:14px;flex-wrap:wrap';
  wc.innerHTML = '<div style="font-size:14px;font-weight:700;color:#a855f7">Patient Weight:</div>'+
    '<input id="vaso-wt" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="kg e.g. 70" style="width:120px" oninput="calcVaso()">'+
    '<div id="vaso-wt-display" style="font-size:13px;color:#94a3b8">Enter weight to calculate doses</div>';
  el_.appendChild(wc);

  var vasoData = [
    {name:'Noradrenaline',color:'#ef4444',bg:'#fef2f2',indication:'First-line vasopressor in septic shock. Raises MAP via vasoconstriction.',
     rows:[
      {label:'Low dose',rate:0.01,max:0.1,note:'Start here'},
      {label:'Standard',rate:0.1,max:0.5,note:'Titrate to MAP ≥65'},
      {label:'High dose',rate:0.5,max:3.3,note:'Consider adding vasopressin'},
     ],
     prep:'4 mg in 50 ml NS = 80 mcg/ml (standard concentration)'},
    {name:'Adrenaline (Epinephrine)',color:'#f97316',bg:'#fff7ed',indication:'Second vasopressor or anaphylaxis/cardiac arrest. Alpha + beta effects.',
     rows:[
      {label:'Anaphylaxis IM',rate:null,fixed:'0.5 mg IM (0.5 ml of 1:1000)',note:'Repeat q5 min PRN'},
      {label:'Shock infusion',rate:0.01,max:0.3,note:'mcg/kg/min — titrate to response'},
      {label:'Cardiac arrest',rate:null,fixed:'1 mg IV q3–5 min',note:'During CPR'},
     ],
     prep:'4 mg in 50 ml NS = 80 mcg/ml'},
    {name:'Dopamine',color:'#8b5cf6',bg:'#faf5ff',indication:'Alternative vasopressor. More arrhythmogenic than noradrenaline (not preferred per SSC 2021).',
     rows:[
      {label:'Renal dose',rate:1,max:3,note:'Dopaminergic — renal vasodilation (limited evidence)'},
      {label:'Cardiac dose',rate:3,max:10,note:'Beta-1 — inotropy + chronotropy'},
      {label:'Vasopressor',rate:10,max:20,note:'Alpha — vasoconstriction'},
     ],
     prep:'200 mg in 50 ml NS = 4000 mcg/ml'},
    {name:'Dobutamine',color:'#0ea5e9',bg:'#f0f9ff',indication:'Inotrope in cardiogenic shock or low cardiac output. Reduces afterload.',
     rows:[
      {label:'Low dose',rate:2,max:5,note:'Mild inotropy'},
      {label:'Standard',rate:5,max:10,note:'Target CI >2.2 L/min/m²'},
      {label:'High dose',rate:10,max:20,note:'Watch for tachycardia'},
     ],
     prep:'250 mg in 50 ml NS = 5000 mcg/ml'},
    {name:'Vasopressin',color:'#16a34a',bg:'#f0fdf4',indication:'Add-on vasopressor in refractory septic shock. Fixed dose — not weight-based.',
     rows:[
      {label:'Fixed dose',rate:null,fixed:'0.03–0.04 units/min IV infusion',note:'Do NOT titrate beyond 0.04 units/min'},
     ],
     prep:'20 units in 50 ml NS = 0.4 units/ml. At 0.03 units/min = 4.5 ml/hr'},
  ];

  vasoData.forEach(function(drug) {
    var d = document.createElement('div');
    d.style.cssText = 'background:'+drug.bg+';border:2px solid '+drug.color+';border-radius:12px;margin-bottom:14px;overflow:hidden';
    var hdr = document.createElement('div');
    hdr.style.cssText = 'padding:12px 16px;border-bottom:1px solid '+drug.color+'44';
    hdr.innerHTML = '<div style="font-size:14px;font-weight:800;color:'+drug.color+'">'+drug.name+'</div>'+
      '<div style="font-size:12px;color:#64748b;margin-top:3px">'+drug.indication+'</div>';
    d.appendChild(hdr);
    var body = document.createElement('div');
    body.style.cssText = 'padding:12px 16px';

    drug.rows.forEach(function(row) {
      var r = document.createElement('div');
      r.style.cssText = 'display:flex;justify-content:space-between;align-items:flex-start;padding:8px 0;border-bottom:1px solid '+drug.color+'22;flex-wrap:wrap;gap:8px';
      var left = '<div style="font-size:12px;font-weight:700;color:'+drug.color+';min-width:100px">'+row.label+'</div>';
      var right = '';
      if(row.fixed) {
        right = '<div style="font-size:13px;color:#1e293b;font-weight:600">'+row.fixed+'</div>';
      } else {
        right = '<div class="vaso-calc-row" data-min="'+row.rate+'" data-max="'+row.max+'" data-drug="'+drug.name+'" data-label="'+row.label+'">'+
          '<div style="font-size:13px;color:#1e293b"><strong>'+row.rate+'–'+row.max+'</strong> mcg/kg/min</div>'+
          '<div class="vaso-result-'+drug.name.replace(/[^a-zA-Z]/g,'')+'-'+row.label.replace(/[^a-zA-Z]/g,'')+'" style="font-size:12px;color:'+drug.color+';font-weight:600;margin-top:2px"></div>'+
        '</div>';
      }
      var note = '<div style="font-size:11px;color:#64748b;margin-top:2px">'+row.note+'</div>';
      r.innerHTML = left + '<div>' + right + note + '</div>';
      body.appendChild(r);
    });

    var prep = document.createElement('div');
    prep.style.cssText = 'margin-top:10px;padding:8px 12px;background:'+drug.color+'11;border-radius:8px;font-size:12px;color:#374151;font-weight:600';
    prep.innerHTML = '🧪 Preparation: '+drug.prep;
    body.appendChild(prep);
    d.appendChild(body);
    el_.appendChild(d);
  });

  window.calcVaso = function() {
    var wt = parseFloat(document.getElementById('vaso-wt').value);
    var disp = document.getElementById('vaso-wt-display');
    if(!wt || wt < 20 || wt > 300) {
      disp.innerHTML = '<span style="color:#ef4444">Enter valid weight (20–300 kg)</span>';
      return;
    }
    disp.innerHTML = '<span style="color:#a855f7;font-weight:700">Weight: '+wt+' kg — doses calculated below ↓</span>';

    document.querySelectorAll('.vaso-calc-row').forEach(function(row) {
      var min = parseFloat(row.dataset.min);
      var max = parseFloat(row.dataset.max);
      var minMcg = (min * wt).toFixed(1);
      var maxMcg = (max * wt).toFixed(1);
      var resultEl = row.querySelector('[class^="vaso-result-"]');
      if(resultEl) {
        resultEl.innerHTML = '= '+minMcg+'–'+maxMcg+' mcg/min for '+wt+' kg';
      }
    });

    // Noradrenaline specific ml/hr (80 mcg/ml standard)
    var naMin = (0.1 * wt / 80 * 60).toFixed(1);
    var naMax = (0.5 * wt / 80 * 60).toFixed(1);
    disp.innerHTML += ' | Norad standard rate: <strong>'+naMin+'–'+naMax+' ml/hr</strong> (4mg in 50ml)';
  };
}

function tabDrugAntidiabetics(el_) {
  el_.appendChild(secTitle('🩸','Antidiabetic Drug Reference','Oral agents, injectables and insulin — ADA 2024 dosing','#ef4444'));
  el_.appendChild(notebox('📌 Renal dose adjustments required for metformin (eGFR <30: stop), SGLT2i (eGFR <45: reduced efficacy), and some sulfonylureas. Source: ADA 2024 Standards.','#fef2f2','#fecaca'));

  // ── RENAL DOSE QUICK REFERENCE ──
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:0 0 10px;color:#dc2626">🫘 Renal Dose Adjustments — CKD Quick Reference</h3>'));
  el_.appendChild(card('eGFR Thresholds for Antidiabetic Drugs','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug / Class</th><th>eGFR ≥60<br><span style="font-weight:400;font-size:11px">Normal</span></th><th>eGFR 45–59<br><span style="font-weight:400;font-size:11px">Mild-Mod CKD</span></th><th>eGFR 30–44<br><span style="font-weight:400;font-size:11px">Mod CKD</span></th><th>eGFR 15–29<br><span style="font-weight:400;font-size:11px">Severe CKD</span></th><th>eGFR &lt;15 / Dialysis</th></tr></thead><tbody>'+[
    ['Metformin','✅ Full dose','✅ Full dose','⚠️ Reduce — 500mg BD max; monitor quarterly','❌ STOP — lactic acidosis risk','❌ Contraindicated'],
    ['SGLT2i (Empagliflozin)','✅ Full dose','✅ Full dose','⚠️ Glycaemic benefit reduced; renal benefit continues if eGFR ≥20','⚠️ Use only for renal/CV benefit (eGFR ≥20). No glucose-lowering.','❌ Stop'],
    ['SGLT2i (Dapagliflozin)','✅ Full dose','✅ Full dose','⚠️ Continue for renal/HF benefit. eGFR ≥25 threshold.','❌ Glucose benefit lost; renal trial data down to eGFR 25','❌ Stop'],
    ['Sulfonylureas (Gliclazide)','✅ Full dose','⚠️ Caution — hypoglycaemia risk increases','⚠️ Low dose — gliclazide preferred; avoid glibenclamide','❌ Avoid most SUs — prolonged hypoglycaemia','❌ Contraindicated'],
    ['DPP-4i (Sitagliptin)','✅ 100mg OD','✅ 100mg OD','⚠️ 50mg OD','⚠️ 25mg OD','⚠️ 25mg OD (caution)'],
    ['DPP-4i (Linagliptin)','✅ 5mg OD','✅ 5mg OD','✅ No adjustment','✅ No adjustment — only DPP-4i safe in any CKD','✅ No adjustment'],
    ['GLP-1 RA (Semaglutide SC)','✅ Full dose','✅ Full dose','✅ No adjustment needed','✅ Use with caution; monitor closely','⚠️ Limited data; specialist guidance'],
    ['GLP-1 RA (Exenatide)','✅ Full dose','✅ Full dose','⚠️ Use with caution','❌ Avoid — eGFR <30','❌ Contraindicated'],
    ['Insulin','✅ Normal dosing','⚠️ Reduce dose 25% — insulin clearance reduced','⚠️ Reduce dose 50% — close monitoring','⚠️ Reduce dose significantly — severe hypoglycaemia risk','⚠️ Specialist dosing'],
  ].map(function(r){
    return '<tr class="tbl-row"><td style="font-weight:700;color:#374151;font-size:12px">'+r[0]+'</td>'+r.slice(1).map(function(v){
      var c=v.includes('❌')?'#dc2626':v.includes('⚠️')?'#d97706':'#16a34a';
      return '<td style="font-size:11px;color:'+c+';font-weight:600">'+v+'</td>';
    }).join('')+'</tr>';
  }).join('')+'</tbody></table></div><p style="font-size:11px;color:#64748b;margin-top:8px">⚠️ Always check current eGFR before prescribing. eGFR should be rechecked at least annually in all DM patients, or after any acute illness. Source: ADA 2024, BNF, KDIGO 2022.</p>'));

  el_.appendChild(card('Biguanides','#ef4444','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>Starting</th><th>Max</th><th>Freq</th><th>Notes</th></tr></thead><tbody>'+[
    ['Metformin IR','500 mg with meals','2000–2550 mg','BD/TDS','First-line T2DM. Stop if eGFR <30. Hold perioperatively.'],
    ['Metformin XR','500–1000 mg','2000 mg','OD (evening)','Better GI tolerability. Same efficacy.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#ef4444">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('SGLT2 Inhibitors (Gliflozins)','#0ea5e9','<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Drug</th><th>Dose</th><th>Freq</th><th>CV/Renal Benefit</th><th>Cautions</th></tr></thead><tbody>'+[
    ['Empagliflozin','10–25 mg','OD','EMPA-REG: ↓CV death 38%, ↓HF hospitalisation','eGFR <45: reduced efficacy. DKA risk (esp. T1).'],
    ['Dapagliflozin','5–10 mg','OD (morning)','DAPA-HF: benefit in HFrEF with and without DM','Hold before surgery. Genital infections common.'],
    ['Canagliflozin','100–300 mg','OD','CREDENCE: ↓renal progression in DM-CKD','Amputations risk — monitor feet. Hold if sick.'],
    ['Ertugliflozin','5–15 mg','OD','CV neutral — less robust data','Similar class effects.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('GLP-1 Receptor Agonists','#16a34a','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Dose</th><th>Freq</th><th>CV Benefit</th><th>Notes</th></tr></thead><tbody>'+[
    ['Semaglutide SC','0.25 mg → 0.5 mg → 1 mg','Weekly','SUSTAIN-6: ↓CV events. Weight ↓ ~5–15%','Titrate over 4–8 weeks. Nausea common initially.'],
    ['Semaglutide oral','3 mg → 7 mg → 14 mg','OD (fasting)','Oral form — similar efficacy to SC','Take 30 min before food with small water only.'],
    ['Liraglutide','0.6 mg → 1.2 mg → 1.8 mg','OD SC','LEADER: ↓CV death in high-risk T2DM','Pancreatitis risk — stop if severe abdominal pain.'],
    ['Dulaglutide','0.75 mg → 1.5 mg → 3 mg','Weekly SC','REWIND: CV benefit even in lower-risk patients','Easy pen device — good for adherence.'],
    ['Exenatide','5 mcg → 10 mcg','BD SC','Less CV data','Renal caution — avoid if eGFR <30.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Sulfonylureas','#d97706','<div class="tbl-wrap"><table><thead><tr style="background:#fffbeb"><th>Drug</th><th>Starting</th><th>Max</th><th>Freq</th><th>Cautions</th></tr></thead><tbody>'+[
    ['Glibenclamide (Glyburide)','2.5–5 mg','20 mg','OD/BD','Avoid in elderly — prolonged hypoglycaemia risk.'],
    ['Glimepiride','1–2 mg','8 mg','OD','Better safety profile in elderly than glibenclamide.'],
    ['Gliclazide MR','30 mg','120 mg','OD','Preferred sulfonylurea — lower hypoglycaemia risk.'],
    ['Glipizide','2.5–5 mg','40 mg','OD/BD','Short-acting — take 30 min before meals.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#d97706">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('DPP-4 Inhibitors (Gliptins)','#8b5cf6','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Dose</th><th>Freq</th><th>Renal Adjustment</th></tr></thead><tbody>'+[
    ['Sitagliptin','100 mg','OD','50 mg if eGFR 30–50; 25 mg if eGFR <30'],
    ['Vildagliptin','50 mg','BD','50 mg OD if eGFR <50'],
    ['Saxagliptin','5 mg','OD','2.5 mg if eGFR <50. Caution in HF.'],
    ['Linagliptin','5 mg','OD','No renal dose adjustment needed — unique in class.'],
    ['Alogliptin','25 mg','OD','12.5 mg if eGFR 30–60; 6.25 mg if eGFR <30'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#8b5cf6">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
}

function tabDrugInsulinCalc(el_) {
  el_.appendChild(secTitle('💉','Insulin Dose Calculator','RBG-guided dosing — Actrapid, Mixtard, NovoMix, Glargine','#f59e0b'));
  el_.appendChild(notebox('⚠️ <strong>Starting estimates only.</strong> Always titrate based on blood glucose monitoring. Individual insulin sensitivity varies widely. Clinical judgement supersedes all calculations. Do not initiate insulin without confirming potassium ≥3.5 mmol/L in DKA/HHS.','#fffbeb','#fde68a'));

  var wc = document.createElement('div');
  wc.style.cssText = 'background:#1e293b;border:2px solid #f59e0b;border-radius:14px;padding:18px;margin-bottom:16px';
  wc.innerHTML =
    '<div style="font-size:15px;font-weight:800;color:#f59e0b;margin-bottom:14px">📊 Patient Details</div>'+
    '<div class="g2" style="gap:10px;margin-bottom:10px">'+
      '<div><label class="lbl">Weight (kg)</label>'+
      '<input id="ins-wt" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 70" oninput="calcInsulin()"></div>'+
      '<div><label class="lbl">Random Blood Glucose</label>'+
      '<div style="display:flex;gap:6px">'+
        '<input id="ins-rbg" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 18" oninput="calcInsulin()" style="flex:1">'+
        '<select id="ins-rbg-unit" class="inp" style="width:90px" onchange="calcInsulin()">'+
          '<option value="mmol">mmol/L</option>'+
          '<option value="mgdl">mg/dL</option>'+
        '</select>'+
      '</div></div>'+
    '</div>'+
    '<div class="g2" style="gap:10px;margin-bottom:10px">'+
      '<div><label class="lbl">Clinical Context</label>'+
      '<select id="ins-type" class="inp" onchange="calcInsulin()">'+
        '<option value="actrapid_sc">Actrapid SC — Sliding Scale</option>'+
        '<option value="actrapid_iv">Actrapid IV — DKA/HHS Infusion</option>'+
        '<option value="mixtard">Mixtard 30 — BD Regimen</option>'+
        '<option value="novomix">NovoMix 30 — BD Regimen</option>'+
        '<option value="basal_bolus">Basal-Bolus (T1DM / Glargine)</option>'+
        '<option value="t2_basal">T2DM — Basal Only Start</option>'+
      '</select></div>'+
      '<div><label class="lbl">Meal Timing</label>'+
      '<select id="ins-meal" class="inp" onchange="calcInsulin()">'+
        '<option value="premeal">Pre-meal / Before food</option>'+
        '<option value="fasting">Fasting / No food</option>'+
        '<option value="dka">DKA — NBM</option>'+
      '</select></div>'+
    '</div>'+
    '<div id="ins-result" style="margin-top:14px"></div>';
  el_.appendChild(wc);

  window.calcInsulin = function() {
    var wt   = parseFloat(document.getElementById('ins-wt').value);
    var rbgRaw = parseFloat(document.getElementById('ins-rbg').value);
    var rbgUnit = document.getElementById('ins-rbg-unit').value;
    var type = document.getElementById('ins-type').value;
    var meal = document.getElementById('ins-meal').value;
    var res  = document.getElementById('ins-result');

    // Convert RBG to mmol/L
    var rbg = rbgUnit === 'mgdl' ? rbgRaw / 18 : rbgRaw;

    if (!wt || wt < 20 || wt > 300) { res.innerHTML = '<div style="color:#94a3b8;font-size:13px;padding:8px">Enter weight to calculate.</div>'; return; }

    var rbgValid = rbg && rbg > 1 && rbg < 80;
    var rbgDisplay = rbgValid ? rbg.toFixed(1) + ' mmol/L' + (rbgUnit==='mgdl' ? ' ('+rbgRaw+' mg/dL)' : '') : 'not entered';

    // Glucose status label
    var glucStatus = '';
    var glucColor = '#16a34a';
    if (rbgValid) {
      if (rbg < 4.0)       { glucStatus = '🔴 HYPOGLYCAEMIA — Do NOT give insulin. Treat hypo first.'; glucColor = '#dc2626'; }
      else if (rbg < 7.0)  { glucStatus = '✅ Normal range — No correction dose needed'; glucColor = '#16a34a'; }
      else if (rbg < 10.0) { glucStatus = '🟡 Mildly elevated'; glucColor = '#d97706'; }
      else if (rbg < 14.0) { glucStatus = '🟠 Moderately elevated'; glucColor = '#f97316'; }
      else if (rbg < 20.0) { glucStatus = '🔴 Significantly elevated'; glucColor = '#dc2626'; }
      else                  { glucStatus = '🚨 Severely elevated — consider DKA/HHS workup'; glucColor = '#7c3aed'; }
    }

    // HYPOGLYCAEMIA — block all insulin
    if (rbgValid && rbg < 4.0) {
      res.innerHTML = '<div style="background:#fef2f2;border:2px solid #dc2626;border-radius:10px;padding:14px">'
        +'<div style="font-size:15px;font-weight:800;color:#dc2626;margin-bottom:10px">🚨 HYPOGLYCAEMIA — DO NOT GIVE INSULIN</div>'
        +'<div style="font-size:13px;color:#1c1917;margin-bottom:8px">RBG: <strong>'+rbg.toFixed(1)+' mmol/L</strong> — Below safe threshold for insulin administration.</div>'
        +'<div style="display:grid;gap:6px">'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #dc2626"><strong>If conscious:</strong> 15–20g fast-acting carbohydrate PO (3–4 glucose tablets, 150ml fruit juice, 3 tsp sugar)</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #f97316"><strong>If unconscious/unable to swallow:</strong> 50ml 50% dextrose IV OR Glucagon 1mg IM</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #d97706"><strong>Recheck BG in 15 minutes.</strong> Once BG >4 mmol/L give long-acting carbohydrate (biscuit, bread). Identify and treat cause.</div>'
        +'</div></div>';
      return;
    }

    var html = '';

    // ── ACTRAPID SC SLIDING SCALE ──────────────────────────────
    if (type === 'actrapid_sc') {
      var corrDose = 0;
      var corrNote = '';
      if (!rbgValid) {
        corrNote = '<div style="color:#94a3b8;font-size:12px;padding:4px">Enter RBG to calculate correction dose.</div>';
      } else if (rbg >= 4 && rbg < 7) {
        corrDose = 0; corrNote = 'No correction dose needed — glucose in target range.';
      } else if (rbg >= 7 && rbg < 10) {
        corrDose = 2; corrNote = 'Mild hyperglycaemia.';
      } else if (rbg >= 10 && rbg < 14) {
        corrDose = 4; corrNote = 'Moderate hyperglycaemia.';
      } else if (rbg >= 14 && rbg < 17) {
        corrDose = 6; corrNote = 'Significant hyperglycaemia — recheck in 2h.';
      } else if (rbg >= 17 && rbg < 20) {
        corrDose = 8; corrNote = 'Severe hyperglycaemia — recheck in 1h, review regimen.';
      } else if (rbg >= 20) {
        corrDose = 10; corrNote = '⚠️ Very high — consider DKA/HHS workup. Recheck in 1h.';
      }

      var isf = wt > 0 ? Math.round(1700 / (wt * 0.5)) : 50;

      html = '<div style="background:#fffbeb;border:2px solid #f59e0b;border-radius:10px;padding:14px">'
        +'<div style="font-size:14px;font-weight:800;color:#f59e0b;margin-bottom:4px">💉 Actrapid SC — Sliding Scale</div>'
        +'<div style="font-size:12px;color:#6b7280;margin-bottom:12px">Patient: '+wt+'kg · RBG: '+rbgDisplay+'</div>'
        +(rbgValid ? '<div style="padding:6px 10px;background:'+glucColor+';color:#fff;border-radius:6px;font-size:12px;font-weight:700;margin-bottom:10px">'+glucStatus+'</div>' : '')
        +'<div style="display:grid;gap:6px">'
        +(rbgValid && corrDose > 0 ? '<div style="padding:10px 14px;background:#fff;border-radius:8px;border-left:4px solid #f59e0b"><strong style="font-size:15px;color:#f59e0b">Correction dose: '+corrDose+' units Actrapid SC</strong><br><span style="font-size:12px;color:#374151">'+corrNote+'</span></div>' : '')
        +(rbgValid && corrDose === 0 && rbg >= 4 ? '<div style="padding:10px 14px;background:#f0fdf4;border-radius:8px;border-left:4px solid #16a34a"><strong style="color:#16a34a">No correction needed</strong> — glucose in target range.</div>' : '')
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #0ea5e9"><strong>Actrapid onset:</strong> 30 min · Peak: 2–4h · Duration: 6–8h</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #8b5cf6"><strong>Give:</strong> 30 minutes BEFORE meal. If patient not eating — do NOT give meal-time dose.</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #dc2626"><strong>Recheck BG:</strong> '+(corrDose >= 6 ? '1 hour' : '2 hours')+' after dose. Always check before next meal.</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #16a34a"><strong>ISF estimate:</strong> 1 unit Actrapid drops glucose ~'+isf+' mg/dL (~'+(isf/18).toFixed(1)+' mmol/L)</div>'
        +'</div>'
        +'<div style="margin-top:12px;padding:10px;background:#fffbeb;border-radius:8px;font-size:12px;color:#92400e"><strong>📋 Standard Actrapid Sliding Scale (Adult):</strong><br>'
        +'BG &lt;4: Treat hypo, NO insulin · 4–7: 0 units · 7–10: 2 units · 10–14: 4 units · 14–17: 6 units · 17–20: 8 units · &gt;20: 10 units + call doctor</div>'
        +'</div>';
    }

    // ── ACTRAPID IV — DKA/HHS ─────────────────────────────────
    else if (type === 'actrapid_iv') {
      var dkaRate = (wt * 0.1).toFixed(1);
      var prep50  = '50 units Actrapid in 50ml Normal Saline = 1 unit/ml';
      html = '<div style="background:#f0f9ff;border:2px solid #0ea5e9;border-radius:10px;padding:14px">'
        +'<div style="font-size:14px;font-weight:800;color:#0ea5e9;margin-bottom:4px">🏥 Actrapid IV Infusion — DKA/HHS Protocol</div>'
        +'<div style="font-size:12px;color:#6b7280;margin-bottom:12px">Patient: '+wt+'kg · RBG: '+rbgDisplay+'</div>'
        +(rbgValid ? '<div style="padding:6px 10px;background:'+glucColor+';color:#fff;border-radius:6px;font-size:12px;font-weight:700;margin-bottom:10px">'+glucStatus+'</div>' : '')
        +'<div style="display:grid;gap:6px">'
        +'<div style="padding:10px 14px;background:#fff;border-radius:8px;border-left:4px solid #0ea5e9"><strong style="font-size:15px;color:#0ea5e9">Infusion rate: '+dkaRate+' units/hr</strong><br><span style="font-size:12px">(0.1 units/kg/hr fixed rate — do NOT bolus)</span></div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #f59e0b"><strong>Preparation:</strong> '+prep50+'. Run at <strong>'+dkaRate+' ml/hr</strong></div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #dc2626"><strong>⚠️ Do NOT start insulin</strong> until K⁺ ≥3.5 mmol/L. If K⁺ &lt;3.5 — replace first, then start insulin.</div>'
        +(rbgValid && rbg < 14 ? '<div style="padding:8px 12px;background:#fef2f2;border-radius:8px;border-left:4px solid #dc2626"><strong>RBG &lt;14 mmol/L:</strong> Add 10% dextrose 125ml/hr alongside insulin — do NOT reduce insulin rate until ketones/pH resolved.</div>' : '')
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #16a34a"><strong>Monitoring:</strong> BG hourly · K⁺ every 2h · Ketones/pH every 2–4h · Urine output hourly</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #8b5cf6"><strong>Stop infusion when:</strong> pH &gt;7.3 AND ketones &lt;0.3 AND HCO₃ &gt;18 AND patient eating → switch to SC insulin</div>'
        +'</div></div>';
    }

    // ── MIXTARD 30 BD ─────────────────────────────────────────
    else if (type === 'mixtard') {
      var tddMix = Math.round(wt * 0.4);
      var mornMix = Math.round(tddMix * 0.67);
      var eveMix  = Math.round(tddMix * 0.33);
      var corrMix = 0;
      if (rbgValid && rbg >= 10 && rbg < 14) corrMix = 2;
      else if (rbgValid && rbg >= 14 && rbg < 17) corrMix = 4;
      else if (rbgValid && rbg >= 17) corrMix = 6;

      html = '<div style="background:#f0fdf4;border:2px solid #16a34a;border-radius:10px;padding:14px">'
        +'<div style="font-size:14px;font-weight:800;color:#16a34a;margin-bottom:4px">💊 Mixtard 30 — BD Regimen</div>'
        +'<div style="font-size:12px;color:#6b7280;margin-bottom:12px">Patient: '+wt+'kg · RBG: '+rbgDisplay+' · (30% Actrapid + 70% NPH premixed)</div>'
        +(rbgValid ? '<div style="padding:6px 10px;background:'+glucColor+';color:#fff;border-radius:6px;font-size:12px;font-weight:700;margin-bottom:10px">'+glucStatus+'</div>' : '')
        +'<div style="display:grid;gap:6px">'
        +'<div style="padding:10px 14px;background:#fff;border-radius:8px;border-left:4px solid #16a34a"><strong>TDD estimate: '+tddMix+' units/day</strong> (0.4 units/kg)</div>'
        +'<div style="padding:10px 14px;background:#fff;border-radius:8px;border-left:4px solid #0ea5e9"><strong style="font-size:15px;color:#0ea5e9">Morning dose: '+mornMix+' units</strong> (⅔ TDD) — 30 min before breakfast</div>'
        +'<div style="padding:10px 14px;background:#fff;border-radius:8px;border-left:4px solid #8b5cf6"><strong style="font-size:15px;color:#8b5cf6">Evening dose: '+eveMix+' units</strong> (⅓ TDD) — 30 min before evening meal</div>'
        +(rbgValid && corrMix > 0 ? '<div style="padding:10px 14px;background:#fffbeb;border-radius:8px;border-left:4px solid #f59e0b"><strong>Correction (add to next dose): +'+corrMix+' units</strong> based on current RBG</div>' : '')
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #dc2626"><strong>⚠️ Do NOT give</strong> if patient not eating — hypoglycaemia risk (NPH component is intermediate-acting)</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #d97706"><strong>Titration:</strong> Increase by 2 units per dose every 3 days until fasting BG 4–7 mmol/L</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #16a34a"><strong>Onset:</strong> 30 min · Peak: 2–8h · Duration: ~24h. Mix by rolling (not shaking).</div>'
        +'</div></div>';
    }

    // ── NOVOMIX 30 BD ─────────────────────────────────────────
    else if (type === 'novomix') {
      var tddNM = Math.round(wt * 0.4);
      var mornNM = Math.round(tddNM * 0.6);
      var eveNM  = Math.round(tddNM * 0.4);
      var corrNM = 0;
      if (rbgValid && rbg >= 10 && rbg < 14) corrNM = 2;
      else if (rbgValid && rbg >= 14 && rbg < 17) corrNM = 4;
      else if (rbgValid && rbg >= 17) corrNM = 6;

      html = '<div style="background:#faf5ff;border:2px solid #8b5cf6;border-radius:10px;padding:14px">'
        +'<div style="font-size:14px;font-weight:800;color:#8b5cf6;margin-bottom:4px">💊 NovoMix 30 — BD Regimen</div>'
        +'<div style="font-size:12px;color:#6b7280;margin-bottom:12px">Patient: '+wt+'kg · RBG: '+rbgDisplay+' · (30% Aspart + 70% Protamine Aspart premixed)</div>'
        +(rbgValid ? '<div style="padding:6px 10px;background:'+glucColor+';color:#fff;border-radius:6px;font-size:12px;font-weight:700;margin-bottom:10px">'+glucStatus+'</div>' : '')
        +'<div style="display:grid;gap:6px">'
        +'<div style="padding:10px 14px;background:#fff;border-radius:8px;border-left:4px solid #8b5cf6"><strong>TDD estimate: '+tddNM+' units/day</strong> (0.4 units/kg)</div>'
        +'<div style="padding:10px 14px;background:#fff;border-radius:8px;border-left:4px solid #0ea5e9"><strong style="font-size:15px;color:#0ea5e9">Morning dose: '+mornNM+' units</strong> (60% TDD) — immediately before breakfast</div>'
        +'<div style="padding:10px 14px;background:#fff;border-radius:8px;border-left:4px solid #8b5cf6"><strong style="font-size:15px;color:#8b5cf6">Evening dose: '+eveNM+' units</strong> (40% TDD) — immediately before evening meal</div>'
        +(rbgValid && corrNM > 0 ? '<div style="padding:10px 14px;background:#fffbeb;border-radius:8px;border-left:4px solid #f59e0b"><strong>Correction (add to next dose): +'+corrNM+' units</strong> based on current RBG</div>' : '')
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #16a34a"><strong>Advantage over Mixtard:</strong> NovoMix has rapid-acting component (Aspart) — can give immediately before meal, not 30 min before</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #dc2626"><strong>⚠️ Do NOT give</strong> if patient not eating immediately</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #d97706"><strong>Titration:</strong> Increase by 2 units per dose every 3 days. Monitor pre-meal and bedtime BG.</div>'
        +'</div></div>';
    }

    // ── BASAL-BOLUS T1DM / GLARGINE ───────────────────────────
    else if (type === 'basal_bolus') {
      var tddBB = (wt * 0.5).toFixed(0);
      var basal = Math.round(tddBB * 0.5);
      var bolus = Math.round(tddBB * 0.5);
      var perMeal = Math.round(bolus / 3);
      var isf2 = Math.round(1700 / tddBB);
      var icr  = Math.round(500  / tddBB);
      var corrBB = 0;
      if (rbgValid && rbg >= 7 && rbg < 10)  corrBB = Math.round((rbg - 6) / (isf2/18));
      else if (rbgValid && rbg >= 10)         corrBB = Math.round((rbg - 6) / (isf2/18));

      html = '<div style="background:#fffbeb;border:2px solid #f59e0b;border-radius:10px;padding:14px">'
        +'<div style="font-size:14px;font-weight:800;color:#f59e0b;margin-bottom:4px">🩸 Basal-Bolus Regimen — T1DM / Intensive</div>'
        +'<div style="font-size:12px;color:#6b7280;margin-bottom:12px">Patient: '+wt+'kg · RBG: '+rbgDisplay+'</div>'
        +(rbgValid ? '<div style="padding:6px 10px;background:'+glucColor+';color:#fff;border-radius:6px;font-size:12px;font-weight:700;margin-bottom:10px">'+glucStatus+'</div>' : '')
        +'<div style="display:grid;gap:6px">'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #f59e0b"><strong>TDD: '+tddBB+' units/day</strong> (0.5 units/kg starting estimate)</div>'
        +'<div style="padding:10px 14px;background:#fff;border-radius:8px;border-left:4px solid #8b5cf6"><strong style="color:#8b5cf6;font-size:15px">Glargine (basal): '+basal+' units OD</strong> — at bedtime or same time daily. No peak — background cover.</div>'
        +'<div style="padding:10px 14px;background:#fff;border-radius:8px;border-left:4px solid #0ea5e9"><strong style="color:#0ea5e9;font-size:15px">Actrapid (bolus): ~'+perMeal+' units per meal</strong> — 30 min before each meal (3 meals/day)</div>'
        +(rbgValid && corrBB > 0 ? '<div style="padding:10px 14px;background:#fffbeb;border-radius:8px;border-left:4px solid #f59e0b"><strong>Correction dose now: +'+corrBB+' units Actrapid</strong> (add to next meal bolus or give separately)</div>' : '')
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #16a34a"><strong>ISF:</strong> 1 unit Actrapid drops BG ~'+isf2+' mg/dL (~'+(isf2/18).toFixed(1)+' mmol/L)</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #ef4444"><strong>ICR:</strong> 1 unit Actrapid per '+icr+'g carbohydrate consumed</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #d97706"><strong>Targets:</strong> Pre-meal 4–7 mmol/L · Post-meal &lt;10 mmol/L · Bedtime 6–8 mmol/L</div>'
        +'</div></div>';
    }

    // ── T2DM BASAL START ──────────────────────────────────────
    else if (type === 't2_basal') {
      var basalT2 = Math.round(wt * 0.2);
      var corrT2 = 0;
      if (rbgValid && rbg >= 10 && rbg < 14) corrT2 = 2;
      else if (rbgValid && rbg >= 14 && rbg < 17) corrT2 = 4;
      else if (rbgValid && rbg >= 17) corrT2 = 6;

      html = '<div style="background:#fef2f2;border:2px solid #ef4444;border-radius:10px;padding:14px">'
        +'<div style="font-size:14px;font-weight:800;color:#ef4444;margin-bottom:4px">🩸 T2DM — Starting Basal Insulin</div>'
        +'<div style="font-size:12px;color:#6b7280;margin-bottom:12px">Patient: '+wt+'kg · RBG: '+rbgDisplay+'</div>'
        +(rbgValid ? '<div style="padding:6px 10px;background:'+glucColor+';color:#fff;border-radius:6px;font-size:12px;font-weight:700;margin-bottom:10px">'+glucStatus+'</div>' : '')
        +'<div style="display:grid;gap:6px">'
        +'<div style="padding:10px 14px;background:#fff;border-radius:8px;border-left:4px solid #ef4444"><strong style="font-size:15px;color:#ef4444">Starting basal: '+basalT2+' units OD at bedtime</strong> (0.2 units/kg — conservative start)</div>'
        +(rbgValid && corrT2 > 0 ? '<div style="padding:10px 14px;background:#fffbeb;border-radius:8px;border-left:4px solid #f59e0b"><strong>Immediate correction: '+corrT2+' units Actrapid SC</strong> now for current hyperglycaemia</div>' : '')
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #d97706"><strong>Titration rule:</strong> Increase basal by 2 units every 3 days until fasting BG 4–7 mmol/L consistently</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #16a34a"><strong>Preferred basal:</strong> Glargine (Lantus) OD or Mixtard 30 if basal-bolus not feasible</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #0ea5e9"><strong>If fasting BG controlled but post-meal high:</strong> Add Actrapid at largest meal or switch to Mixtard/NovoMix BD</div>'
        +'<div style="padding:8px 12px;background:#fff;border-radius:8px;border-left:4px solid #dc2626"><strong>Continue oral agents</strong> (Metformin) unless contraindicated — insulin is additive not replacement in T2DM initially</div>'
        +'</div></div>';
    }

    res.innerHTML = html;
  };

  // Insulin types reference table — Nigeria-focused
  el_.appendChild(card('Insulin Types — Nigeria Ward Reference','#f59e0b',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fffbeb"><th>Insulin</th><th>Type</th><th>Onset</th><th>Peak</th><th>Duration</th><th>Main Use</th></tr></thead><tbody>'+[
      ['Actrapid (Regular)','Short-acting','30 min','2–4 hr','6–8 hr','Sliding scale SC · IV infusion DKA · Bolus in basal-bolus'],
      ['Mixtard 30','Premixed 30/70','30 min','2–8 hr','~24 hr','BD regimen T2DM · Give 30 min before meal · Most widely available'],
      ['NovoMix 30','Premixed rapid 30/70','10–20 min','1–4 hr','~24 hr','BD regimen T2DM · Give immediately before meal · Better post-meal control'],
      ['Glargine (Lantus)','Long-acting basal','1–2 hr','No peak','20–24 hr','Basal cover T1DM/T2DM · OD at same time daily'],
      ['Detemir (Levemir)','Long-acting basal','1–2 hr','6–8 hr','16–24 hr','Basal cover · BD dosing sometimes needed'],
      ['Aspart (NovoRapid)','Rapid-acting','10–20 min','1–3 hr','3–5 hr','Bolus in basal-bolus · Give immediately before meal'],
      ['Lispro (Humalog)','Rapid-acting','10–15 min','1–2 hr','3–4 hr','Bolus in basal-bolus · Flexible timing'],
      ['NPH (Insuman/Humulin N)','Intermediate','1–2 hr','4–8 hr','12–18 hr','Basal in resource-limited settings · BD dosing required'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#f59e0b;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td><td style="font-size:11px;color:#6b7280">'+r[5]+'</td></tr>';}).join('')+
    '</tbody></table></div>'
  ));

  el_.appendChild(notebox('📌 <strong>Storage:</strong> Unopened insulin — refrigerate 2–8°C. Once opened — room temperature up to 28°C for 4 weeks (Actrapid, Mixtard) or 6 weeks (NovoMix). Never freeze. Never expose to direct sunlight. In Nigeria — cold chain failure is common. Always check appearance before use: Actrapid should be clear and colourless. Mixtard/NovoMix should be uniformly cloudy after mixing.','#f0f9ff','#bae6fd'));
}

function tabDrugEmergencyMeds(el_) {
  el_.appendChild(secTitle('🚨','Emergency Drug Reference','Critical drugs — exact doses, routes and preparation','#dc2626'));
  el_.appendChild(notebox('🚨 These doses are for adult patients in emergency settings. Always verify with senior clinician when possible. Doses sourced from Resuscitation Council UK, WHO and BNF.','#fef2f2','#fecaca'));

  el_.appendChild(card('Resuscitation Drugs','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>Indication</th><th>Adult Dose</th><th>Route</th><th>Notes</th></tr></thead><tbody>'+[
    ['Adrenaline 1:10,000','Cardiac arrest','1 mg (10 ml)','IV','Every 3–5 min during CPR'],
    ['Adrenaline 1:1000','Anaphylaxis','0.5 mg (0.5 ml)','IM (anterolateral thigh)','Repeat q5 min if no improvement'],
    ['Atropine','Bradycardia','0.5–1 mg','IV','Repeat to max 3 mg total'],
    ['Amiodarone','VF/pVT (after 3rd shock)','300 mg','IV bolus','Further 150 mg if needed. Then 900 mg/24hr infusion.'],
    ['Adenosine','SVT','6 mg rapid IV','IV (large vein)','If ineffective: 12 mg → 18 mg. Use 3-way tap.'],
    ['Calcium gluconate','Hyperkalaemia / MgSO4 toxicity','10 ml of 10%','IV over 2–5 min','Cardiac membrane stabilisation — not lowering K⁺'],
    ['Sodium bicarbonate','Severe acidosis / hyperkalaemia','50 ml of 8.4%','IV','Use in prolonged arrest or TCA overdose'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#dc2626">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Seizure Management','#8b5cf6','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Dose</th><th>Route</th><th>When</th><th>Notes</th></tr></thead><tbody>'+[
    ['Diazepam','5–10 mg','IV or PR (rectal)','First-line, 0–5 min','Repeat once after 5 min'],
    ['Lorazepam','4 mg','IV','First-line (preferred if IV access)','Repeat once after 10 min'],
    ['Midazolam','10 mg','Buccal / IM','If no IV access','Buccal midazolam — effective, less respiratory depression'],
    ['Phenytoin / Fosphenytoin','20 mg/kg','IV infusion (slow)','Second-line if benzos fail','Max 50 mg/min. Monitor ECG during infusion.'],
    ['Levetiracetam','60 mg/kg (max 4500 mg)','IV over 10 min','Second-line alternative','Fewer interactions than phenytoin. Better tolerated.'],
    ['Phenobarbitone','20 mg/kg','IV (slow)','Third-line','Sedating. Prepare for intubation.'],
    ['RSI + Intubation','—','—','Refractory status','Thiopentone or propofol for induction'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#8b5cf6">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Reversal Agents','#16a34a','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Reversal Agent</th><th>Reverses</th><th>Dose</th><th>Route</th><th>Notes</th></tr></thead><tbody>'+[
    ['Naloxone','Opioids','0.4–2 mg','IV/IM/SC/IN','Repeat q2–3 min. Short duration — may need infusion.'],
    ['Flumazenil','Benzodiazepines','200 mcg over 15 sec','IV','Repeat 100 mcg q1 min (max 1 mg). Short acting — re-sedation risk.'],
    ['Calcium gluconate','Magnesium toxicity','10 ml of 10%','IV over 10 min','Keep at bedside during MgSO4 infusion.'],
    ['Protamine sulphate','Heparin','1 mg per 100 units heparin','IV (slow)','Max 50 mg. Risk of anaphylaxis.'],
    ['Vitamin K','Warfarin (non-urgent)','5–10 mg oral or IV','Oral/IV','Takes 4–6 hrs. Use PCC for urgent reversal.'],
    ['Idarucizumab (Praxbind)','Dabigatran','5g (2x2.5g vials)','IV','Specific reversal — use in life-threatening bleeding.'],
    ['Andexanet alfa','Factor Xa inhibitors (rivaroxaban, apixaban)','400–800 mg','IV bolus + infusion','Expensive. Use in major/life-threatening bleeding only.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#dc2626">➕ Additional Emergency Drugs</h3>'));
  el_.appendChild(card('Additional Emergency Drug Reference','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>Indication</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
    ['Magnesium Sulphate','Eclampsia/pre-eclampsia, torsades de pointes, severe asthma','Eclampsia: 4g IV over 5–10 min loading, then 1g/hr infusion × 24h. Asthma: 1.2–2g IV over 20 min. Torsades: 2g IV over 10 min.','Monitor: respiratory rate >12/min, urine output >25ml/hr, patellar reflex present. Antidote: Calcium gluconate 10ml 10% IV if toxicity.'],
    ['Hydralazine IV','Hypertensive emergency in pregnancy (pre-eclampsia/eclampsia)','5mg IV bolus, repeat 5mg every 20 min. Max 20mg. Or infusion 5–10mg/hr.','First-line for BP control in severe pre-eclampsia. Target SBP 140–160, DBP 90–105 (avoid dropping too fast). Monitor fetal heart rate.'],
    ['Labetalol IV','Hypertensive emergency (including in pregnancy)','Bolus: 50mg IV over 1 min, repeat every 10 min. Max 200mg total. Or infusion: 2mg/min, titrate to response.','Alpha + beta blocker. Avoid in asthma, heart block, decompensated heart failure. Safe in pregnancy.'],
    ['Oxytocin (Syntocinon)','PPH prevention and treatment, labour augmentation','PPH prevention: 10 units IM after delivery. PPH treatment: 20–40 units in 500ml Normal Saline at 125ml/hr IV. Labour: 0.5–2 milliunits/min increasing slowly.','Do NOT give as IV bolus (causes hypotension). Refrigerate. MOST effective uterotonic — first choice for PPH.'],
    ['Ergometrine','PPH (when Oxytocin insufficient), uterine atony','0.2mg IM or slow IV. Can repeat after 2–4h if needed. Max 1mg in 24h.','Causes vasoconstriction — AVOID in hypertension, pre-eclampsia, cardiac disease, Raynaud\'s. Causes nausea/vomiting.'],
    ['Tranexamic Acid (TXA)','Major haemorrhage — PPH, trauma, surgical bleeding','PPH: 1g IV over 10 min. Give within 3 hours of bleeding onset (WOMAN trial). Repeat 1g if rebleeding. Trauma: 1g over 10 min then 1g over 8h (CRASH-2 trial).','Antifibrinolytic — inhibits plasminogen activation. Most effective within first 3 hours. No role for late administration >3h in trauma.'],
    ['50% Dextrose','Severe hypoglycaemia (unconscious patient)','50ml of 50% dextrose IV bolus. Flush line with saline after. Check BG in 15 min. Repeat if still <4 mmol/L.','Very irritant to veins — give through large cannula, flush well. Follow with 10% dextrose infusion. Identify and treat cause of hypoglycaemia.'],
    ['Glucagon IM','Severe hypoglycaemia — no IV access','1mg IM (adult and child >25kg). 0.5mg IM (child <25kg). Onset 10–15 min.','Works by stimulating hepatic glycogenolysis — does NOT work in starvation, alcohol-related hypoglycaemia, adrenal insufficiency. Give glucose orally as soon as conscious.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#dc2626;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
}

function tabDrugFluids(el_) {
  el_.appendChild(secTitle('💧','IV Fluids Reference','Composition, indications, rates and cautions','#06b6d4'));
  el_.appendChild(notebox('📌 IV fluid choice depends on clinical context, electrolytes, renal function and haemodynamic status. Reassess frequently — fluids are drugs.','#f0fdfa','#99f6e4'));

  el_.appendChild(card('Common IV Fluids — Composition','#06b6d4','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdfa"><th>Fluid</th><th>Na⁺ (mmol/L)</th><th>K⁺</th><th>Cl⁻</th><th>pH</th><th>Osmolality</th></tr></thead><tbody>'+[
    ['0.9% NaCl (Normal Saline)','154','0','154','5.0','308 — isotonic'],
    ['0.45% NaCl (Half Normal)','77','0','77','5.0','154 — hypotonic'],
    ['Hartmann\'s (Lactated Ringer\'s)','131','5','111','6.5','278 — near-isotonic'],
    ['5% Dextrose','0','0','0','4.0','252 — isotonic (distributes)'],
    ['10% Dextrose','0','0','0','4.0','505 — hypertonic'],
    ['Dextrose Saline (4% D + 0.18% NaCl)','30','0','30','4.0','284 — isotonic'],
    ['PlasmaLyte','140','5','98','7.4','295 — balanced'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#06b6d4">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td>'+r[4]+'</td><td style="font-size:12px">'+r[5]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Clinical Indications','#0ea5e9','<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Fluid</th><th>Use it when...</th><th>Avoid when...</th></tr></thead><tbody>'+[
    ['0.9% NaCl','Hypovolaemia, diabetic emergencies (DKA/HHS), drug dilution','Hyperchloraemic acidosis, hypernatraemia'],
    ['Hartmann\'s','Most resuscitation situations, post-op fluids, trauma, burns','Hyperkalaemia (K⁺ >5.5), severe liver failure'],
    ['5% Dextrose','Free water replacement, hypernatraemia correction, drug dilution','Cerebral oedema, DKA (alone), hyponatraemia'],
    ['10% Dextrose','Hypoglycaemia treatment, post-DKA when glucose <14','Uncontrolled hyperglycaemia'],
    ['0.45% NaCl','Hypernatraemia correction (slow), DI management','DKA (causes cerebral oedema), hypovolaemia'],
    ['Human Albumin 4.5%','Paracentesis (8g per litre drained), hypoalbuminaemia','Fluid overload, cost consideration'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px;color:#ef4444">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Maintenance Fluid Calculator','#06b6d4',''));
  var mfCard = el_.lastChild;
  var mfBody = mfCard.querySelector('.card-body');
  mfBody.innerHTML = '<div class="g2" style="margin-bottom:12px">'+
    '<div><label class="lbl">Weight (kg)</label><input id="fluid-wt" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 70" oninput="calcMaintenance()"></div>'+
    '<div id="fluid-result" style="padding:10px 14px;background:#f0fdfa;border-radius:8px;font-size:13px;color:#06b6d4;display:flex;align-items:center">Enter weight to calculate</div>'+
  '</div>'+
  '<div style="font-size:12px;color:#64748b">Holliday-Segar formula: 4 ml/kg/hr for first 10 kg + 2 ml/kg/hr for next 10 kg + 1 ml/kg/hr for remainder. For adults, typically 25–30 ml/kg/day.</div>';

  window.calcMaintenance = function() {
    var wt = parseFloat(document.getElementById('fluid-wt').value);
    var res = document.getElementById('fluid-result');
    if(!wt || wt < 1) { res.innerHTML = 'Enter valid weight'; return; }
    var rate;
    if(wt <= 10) rate = wt * 4;
    else if(wt <= 20) rate = 40 + (wt - 10) * 2;
    else rate = 60 + (wt - 20) * 1;
    var daily = Math.round(rate * 24);
    res.innerHTML = '<strong style="color:#06b6d4;font-size:15px">'+rate.toFixed(0)+' ml/hr</strong> | '+daily+' ml/day';
  };

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#06b6d4">🩸 Colloids & Blood Products</h3>'));
  el_.appendChild(card('Colloids','#06b6d4','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdfa"><th>Colloid</th><th>Indication</th><th>Dose</th><th>Caution</th></tr></thead><tbody>'+[
    ['Gelofusine (Gelatin 4%)','Volume expansion when crystalloids insufficient — trauma, surgery, septic shock','500ml IV — titrate to haemodynamic response. Max 2L/24h.','Anaphylaxis risk (rare). No coagulation impairment at therapeutic doses. Avoid in known gelatin allergy.'],
    ['Albumin 4.5% / 5%','Hepatic disease (SBP prophylaxis, large volume paracentesis), burns, hypoalbuminaemia with oedema','Paracentesis: 8g albumin per litre drained (6–8g/L ascites removed). SBP: 1.5g/kg on diagnosis, 1g/kg on day 3.','Expensive. Evidence supports use in liver disease specifically. Not for general volume expansion.'],
    ['Albumin 20% (concentrated)','Hepatorenal syndrome, severe hypoalbuminaemia (<20g/L) with haemodynamic instability','100ml (20g) IV over 30–60 min. Repeat based on response and albumin level.','Draws water from extravascular space — monitor for fluid overload. Use with caution in cardiac/renal disease.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#06b6d4;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#dc2626">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
  el_.appendChild(card('Blood Products — Quick Reference','#06b6d4','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdfa"><th>Product</th><th>Indication</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
    ['Packed Red Blood Cells (PRBC)','Symptomatic anaemia, haemorrhage, pre-op Hb <8g/dL','1 unit raises Hb ~1g/dL. Give 4ml/kg (child). Transfuse over 2–4h per unit.','Threshold: Hb <7g/dL (stable), <8g/dL (cardiac disease), <10g/dL (acute haemorrhage with compromise). Crossmatch essential.'],
    ['Fresh Frozen Plasma (FFP)','Coagulopathy with bleeding (INR >1.5), massive transfusion, DIC, TTP','10–15 ml/kg IV. 1 unit = 250–300ml. Give over 30 min per unit.','Thaw time 20–30 min. ABO compatible required. Contains all clotting factors. Not for volume expansion alone.'],
    ['Platelets','Thrombocytopaenia with bleeding, count <10 (prophylactic), <50 pre-procedure','1 adult dose (pool of 4) raises count by 20–40 × 10⁹/L. Give over 30 min.','ABO/Rh match preferred. Store at room temperature (5-day shelf life). Transfuse if <50 and actively bleeding or pre-procedure.'],
    ['Cryoprecipitate','Fibrinogen <1.5g/L (DIC, massive haemorrhage), haemophilia A, von Willebrand disease','2 pools (10 units) IV. 1 pool raises fibrinogen by ~1g/L. Give over 30 min.','Contains: fibrinogen, Factor VIII, vWF, Factor XIII. Thaw before use. ABO compatible preferred.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#06b6d4;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
}

// ═══════════════════════════════════════════════════════════════
// DRUG INTERACTION CHECKER v2 — Extended Database
// ═══════════════════════════════════════════════════════════════
var DI_DB = [
  // ── ANTIHYPERTENSIVES ──────────────────────────────────────────
  {a:'ACE Inhibitor',b:'ARB',sev:'HIGH',cat:'HTN',mech:'Dual RAAS blockade',effect:'Hyperkalaemia + AKI. No extra CV benefit (ONTARGET). Risk of severe hypotension.',action:'DO NOT combine routinely. Specialist supervision only.',monitor:'U&E, eGFR within 1–2 weeks'},
  {a:'ACE Inhibitor',b:'Potassium-Sparing Diuretic',sev:'HIGH',cat:'HTN',mech:'Additive K⁺ retention',effect:'Severe hyperkalaemia — K⁺ >6.5 mmol/L can cause fatal arrhythmia.',action:'Avoid in CKD ≥stage 3. Monitor K⁺ within 1 week of starting.',monitor:'K⁺, eGFR weekly ×4 then monthly'},
  {a:'ARB',b:'Potassium-Sparing Diuretic',sev:'HIGH',cat:'HTN',mech:'Additive K⁺ retention',effect:'Severe hyperkalaemia — same as ACEi + spironolactone.',action:'Avoid in CKD. Low-dose spironolactone (25 mg) if necessary with close monitoring.',monitor:'K⁺, eGFR weekly ×4 then monthly'},
  {a:'Beta-Blocker',b:'Verapamil',sev:'HIGH',cat:'HTN',mech:'Additive rate-limiting effect on SA/AV node',effect:'Severe bradycardia, complete heart block, cardiac arrest.',action:'NEVER combine. Use dihydropyridine CCB (amlodipine) instead.',monitor:'HR, ECG if accidentally combined'},
  {a:'Beta-Blocker',b:'Diltiazem',sev:'HIGH',cat:'HTN',mech:'Additive rate-limiting effect',effect:'Severe bradycardia and AV block. Diltiazem is a rate-limiting CCB like verapamil.',action:'NEVER combine. Switch to amlodipine if CCB needed with beta-blocker.',monitor:'HR, ECG'},
  {a:'ACE Inhibitor',b:'NSAID',sev:'HIGH',cat:'HTN',mech:'"Triple whammy" + RAAS blunting',effect:'ACEi + diuretic + NSAID → acute kidney injury. NSAIDs blunt antihypertensive effect.',action:'Avoid NSAIDs. If essential, use shortest course and monitor renal function.',monitor:'U&E, BP within 1 week'},
  {a:'ARB',b:'NSAID',sev:'HIGH',cat:'HTN',mech:'Triple whammy',effect:'Same triple whammy AKI risk. NSAID blunts ARB antihypertensive effect.',action:'Avoid NSAIDs. Use paracetamol for analgesia.',monitor:'U&E, creatinine'},
  {a:'ACE Inhibitor',b:'Loop Diuretic',sev:'MEDIUM',cat:'HTN',mech:'Additive hypotension',effect:'First-dose hypotension — especially if hypovolaemic or on high-dose diuretics.',action:'Start ACEi low dose. Hold/reduce diuretic on day 1 if volume-depleted.',monitor:'BP after first dose, U&E'},
  {a:'Alpha-Blocker',b:'Calcium Channel Blocker',sev:'MEDIUM',cat:'HTN',mech:'Additive vasodilation',effect:'Orthostatic hypotension — especially in elderly.',action:'Monitor standing BP. Warn patient about dizziness on standing.',monitor:'Standing BP, especially elderly'},
  {a:'Clonidine',b:'Beta-Blocker',sev:'MEDIUM',cat:'HTN',mech:'Rebound on clonidine withdrawal',effect:'Abrupt clonidine withdrawal with beta-blocker continued → severe rebound hypertension.',action:'Taper clonidine over 1–2 weeks. Stop beta-blocker FIRST.',monitor:'BP during clonidine taper'},
  {a:'Hydralazine',b:'Beta-Blocker',sev:'LOW',cat:'HTN',mech:'Intentional therapeutic combination',effect:'Beneficial — beta-blocker offsets reflex tachycardia from hydralazine vasodilation.',action:'Intentional combination. Monitor resting HR.',monitor:'HR, BP'},
  {a:'Amlodipine',b:'Simvastatin',sev:'MEDIUM',cat:'HTN',mech:'CYP3A4 inhibition',effect:'Amlodipine raises simvastatin levels → myopathy risk. Max simvastatin 20 mg with amlodipine.',action:'Switch to atorvastatin or rosuvastatin. If simvastatin must continue, cap at 20 mg/day.',monitor:'CK if muscle symptoms'},
  {a:'Thiazide Diuretic',b:'Lithium',sev:'HIGH',cat:'HTN',mech:'Volume depletion → Na⁺/Li⁺ reabsorption',effect:'Thiazides cause volume depletion → compensatory Na⁺ reabsorption also reabsorbs Li⁺ → lithium toxicity.',action:'Avoid thiazides in patients on lithium. Use loop diuretic with caution.',monitor:'Lithium levels, serum Na⁺'},
  {a:'Loop Diuretic',b:'Lithium',sev:'MEDIUM',cat:'HTN',mech:'Volume depletion → reduced lithium excretion',effect:'Furosemide can reduce lithium clearance — lithium toxicity risk, especially if dehydrated.',action:'Monitor lithium levels if initiating or changing loop diuretic dose.',monitor:'Lithium levels, hydration'},
  {a:'Beta-Blocker',b:'Adrenaline',sev:'HIGH',cat:'HTN',mech:'Unopposed alpha stimulation',effect:'Beta-blocker blocks beta-vasodilation; adrenaline\'s alpha-vasoconstriction is unopposed → severe hypertension + reflex bradycardia.',action:'In anaphylaxis on beta-blockers: adrenaline still first-line; higher doses may be needed + consider glucagon 1mg IV.',monitor:'BP, HR continuously'},
  {a:'Calcium Channel Blocker',b:'Ciclosporin',sev:'MEDIUM',cat:'HTN',mech:'CYP3A4 inhibition',effect:'Diltiazem and verapamil raise ciclosporin levels → nephrotoxicity. Amlodipine has less effect.',monitor:'Ciclosporin levels, renal function',action:'Use amlodipine if CCB needed. Monitor ciclosporin levels closely.'},

  // ── DIABETES DRUGS ─────────────────────────────────────────────
  {a:'Metformin',b:'IV Contrast / Iodinated Dye',sev:'HIGH',cat:'DM',mech:'AKI risk → metformin accumulation → lactic acidosis',effect:'Contrast can precipitate AKI; metformin accumulates → rare but fatal lactic acidosis.',action:'Hold metformin 48 hrs before and after IV contrast. Recheck eGFR before restarting.',monitor:'eGFR before restarting; lactate if symptomatic'},
  {a:'Metformin',b:'Alcohol',sev:'MEDIUM',cat:'DM',mech:'Additive lactic acidosis risk',effect:'Alcohol impairs hepatic lactate clearance — lactic acidosis risk, especially with binge drinking.',action:'Advise against heavy/binge alcohol. Moderate intake generally acceptable.',monitor:'Lactate, LFTs if heavy drinker'},
  {a:'Metformin',b:'Furosemide',sev:'MEDIUM',cat:'DM',mech:'AKI risk → metformin accumulation',effect:'High-dose furosemide can reduce renal perfusion → AKI → metformin accumulation → lactic acidosis.',action:'Hold metformin if patient is dehydrated or receiving high-dose diuretics.',monitor:'eGFR, lactate'},
  {a:'Sulfonylurea',b:'Fluconazole',sev:'HIGH',cat:'DM',mech:'CYP2C9 inhibition',effect:'Fluconazole inhibits CYP2C9 metabolism of sulfonylureas → prolonged severe hypoglycaemia.',action:'Avoid combination. Use topical antifungal or alternative systemic agent.',monitor:'BG closely if unavoidable — every 4–6 hours'},
  {a:'Sulfonylurea',b:'Ciprofloxacin',sev:'HIGH',cat:'DM',mech:'CYP2C9 inhibition',effect:'Ciprofloxacin inhibits CYP2C9 → prolonged hypoglycaemia risk.',action:'Reduce sulfonylurea dose. Monitor BG during course and 48 hrs after.',monitor:'BG every 4–6 hours'},
  {a:'Sulfonylurea',b:'Beta-Blocker',sev:'MEDIUM',cat:'DM',mech:'Masks hypoglycaemia symptoms',effect:'Beta-blockers blunt tachycardia (key hypoglycaemia warning). Sweating is preserved. Prolonged hypoglycaemia possible.',action:'Prefer cardioselective beta-blockers (bisoprolol, atenolol). Educate patient.',monitor:'BG monitoring; teach sweating as hypoglycaemia sign'},
  {a:'Insulin',b:'Beta-Blocker',sev:'MEDIUM',cat:'DM',mech:'Masks hypoglycaemia + prolonged recovery',effect:'Beta-blockers mask tachycardia. Also inhibit glycogenolysis → prolonged hypoglycaemia recovery.',action:'Cardioselective BBs preferred. Increase BG monitoring frequency.',monitor:'BG more frequently; patient education'},
  {a:'SGLT2 Inhibitor',b:'Loop Diuretic',sev:'HIGH',cat:'DM',mech:'Additive volume depletion',effect:'Both agents cause volume loss → AKI, euglycaemic DKA, severe dehydration — especially during acute illness.',action:'Hold SGLT2i if vomiting, dehydrated, fasting, pre-op, or febrile illness.',monitor:'BG, ketones, U&E, BP'},
  {a:'SGLT2 Inhibitor',b:'Thiazide Diuretic',sev:'MEDIUM',cat:'DM',mech:'Additive dehydration + polyuria',effect:'Both increase urine output → compounded volume depletion and electrolyte disturbance.',action:'Use lowest effective diuretic dose. Monitor hydration.',monitor:'U&E, eGFR, BP'},
  {a:'GLP-1 Agonist',b:'Oral Medications (time-sensitive)',sev:'MEDIUM',cat:'DM',mech:'Delayed gastric emptying',effect:'GLP-1 agonists slow gastric emptying → reduces and delays absorption of time-sensitive oral drugs.',action:'Take time-critical medications (levothyroxine, warfarin, antibiotics) ≥1 hour BEFORE GLP-1 injection.',monitor:'INR if warfarin; TFTs if levothyroxine'},
  {a:'DPP-4 Inhibitor',b:'ACE Inhibitor',sev:'MEDIUM',cat:'DM',mech:'Additive bradykinin elevation',effect:'Both drugs raise bradykinin → increased angioedema risk. Rare but potentially fatal.',action:'Monitor for facial/tongue swelling especially in first weeks.',monitor:'Angioedema symptoms; switch ACEi to ARB if angioedema occurs'},
  {a:'Pioglitazone',b:'Insulin',sev:'MEDIUM',cat:'DM',mech:'Additive fluid retention',effect:'Thiazolidinediones cause fluid retention; combined with insulin → significant oedema and risk of heart failure.',action:'Avoid combination in patients with heart failure (NYHA III–IV). Monitor for oedema.',monitor:'Weight, ankle oedema, fluid balance'},
  {a:'Pioglitazone',b:'Loop Diuretic',sev:'MEDIUM',cat:'DM',mech:'Opposing fluid effects',effect:'Pioglitazone causes fluid retention while furosemide promotes excretion — unpredictable fluid balance.',action:'Monitor fluid status closely. Pioglitazone is generally avoided in fluid-overloaded states.',monitor:'Weight, oedema, U&E'},

  // ── ANTIBIOTICS ────────────────────────────────────────────────
  {a:'Ciprofloxacin',b:'Warfarin',sev:'HIGH',cat:'ABX',mech:'CYP1A2/2C9 inhibition',effect:'Ciprofloxacin inhibits warfarin metabolism → INR rises significantly (2–4× increase). Bleeding risk.',action:'Monitor INR within 2–3 days of starting. Expect warfarin dose reduction.',monitor:'INR every 2–3 days'},
  {a:'Metronidazole',b:'Warfarin',sev:'HIGH',cat:'ABX',mech:'CYP2C9 inhibition',effect:'Metronidazole potently inhibits warfarin metabolism → INR can double or triple. Serious haemorrhage risk.',action:'Reduce warfarin dose ~30–50%. Check INR within 2 days of starting.',monitor:'INR daily ×3 then every 2 days'},
  {a:'Metronidazole',b:'Alcohol',sev:'HIGH',cat:'ABX',mech:'Disulfiram-like reaction (aldehyde dehydrogenase inhibition)',effect:'Severe flushing, vomiting, tachycardia, hypotension — even small amounts of alcohol.',action:'Absolutely avoid alcohol during course AND for 48 hours after completing treatment.',monitor:'Vital signs if accidental exposure'},
  {a:'Clarithromycin',b:'Warfarin',sev:'HIGH',cat:'ABX',mech:'CYP3A4/2C19 inhibition',effect:'Significantly raises warfarin levels → major bleeding risk.',action:'Monitor INR closely. Reduce warfarin dose and check INR within 2 days.',monitor:'INR every 2–3 days'},
  {a:'Clarithromycin',b:'Simvastatin',sev:'HIGH',cat:'ABX',mech:'CYP3A4 inhibition',effect:'Raises simvastatin levels dramatically → severe rhabdomyolysis and AKI risk.',action:'STOP simvastatin during clarithromycin course. Resume after. Use atorvastatin/rosuvastatin instead.',monitor:'CK, renal function if symptoms'},
  {a:'Clarithromycin',b:'Digoxin',sev:'HIGH',cat:'ABX',mech:'P-glycoprotein inhibition',effect:'Reduces digoxin renal clearance → digoxin toxicity: nausea, vision changes, bradycardia, arrhythmias.',action:'Monitor digoxin levels. Reduce digoxin dose by 30–50%. Consider alternative antibiotic.',monitor:'Digoxin levels, HR, ECG'},
  {a:'Clarithromycin',b:'Amlodipine',sev:'MEDIUM',cat:'ABX',mech:'CYP3A4 inhibition',effect:'Clarithromycin raises amlodipine levels → hypotension and ankle oedema.',action:'Monitor BP closely. Reduce amlodipine if symptomatic hypotension.',monitor:'BP daily during course'},
  {a:'Erythromycin',b:'QT-Prolonging Drugs',sev:'HIGH',cat:'ABX',mech:'hERG channel block + additive QT prolongation',effect:'Erythromycin prolongs QT; additive with antipsychotics, amiodarone, methadone, other macrolides → torsades de pointes.',action:'Avoid with other QT prolongers. Check QTc baseline. Use azithromycin or alternative.',monitor:'ECG, QTc, K⁺, Mg²⁺'},
  {a:'Ciprofloxacin',b:'QT-Prolonging Drugs',sev:'HIGH',cat:'ABX',mech:'Additive QT prolongation',effect:'Ciprofloxacin prolongs QT — additive with antipsychotics, amiodarone, sotalol → torsades.',action:'Check baseline QTc. Avoid if QTc >450 ms. Use gentamicin or cefuroxime instead.',monitor:'ECG, QTc, K⁺, Mg²⁺'},
  {a:'Aminoglycoside',b:'Loop Diuretic',sev:'HIGH',cat:'ABX',mech:'Synergistic nephrotoxicity and ototoxicity',effect:'Gentamicin/amikacin + furosemide → permanent hearing loss and AKI.',action:'Avoid concurrent use. If essential, use lowest doses, shortest duration.',monitor:'Renal function, audiometry, drug levels'},
  {a:'Aminoglycoside',b:'Vancomycin',sev:'HIGH',cat:'ABX',mech:'Additive nephrotoxicity',effect:'Combined nephrotoxicity — significant AKI risk, especially with pre-existing renal impairment.',action:'Monitor renal function daily. Ensure adequate hydration. Use trough levels for both.',monitor:'U&E daily, trough levels'},
  {a:'Tetracycline',b:'Antacids / Calcium / Iron',sev:'MEDIUM',cat:'ABX',mech:'Chelation → reduced drug absorption',effect:'Divalent cations (Ca²⁺, Fe²⁺, Mg²⁺, Al³⁺) chelate tetracyclines → absorption reduced by 50–90%.',action:'Take tetracycline 2 hours BEFORE or 4 hours AFTER antacids, calcium, or iron.',monitor:'Clinical response to antibiotic'},
  {a:'Rifampicin',b:'Oral Contraceptive Pill',sev:'HIGH',cat:'ABX',mech:'Potent CYP3A4 induction',effect:'Dramatically reduces OCP hormone levels → contraceptive failure even with short courses.',action:'Use barrier contraception during treatment AND 4 weeks after completing rifampicin.',monitor:'Pregnancy test if missed period'},
  {a:'Rifampicin',b:'Warfarin',sev:'HIGH',cat:'ABX',mech:'CYP2C9 induction',effect:'Potent inducer → dramatically reduces warfarin levels → INR drops → thrombosis risk.',action:'Double or triple warfarin dose. Monitor INR every 2–3 days. Reverse dose change after stopping.',monitor:'INR every 2–3 days'},
  {a:'Rifampicin',b:'ARV Drugs',sev:'HIGH',cat:'ABX',mech:'CYP3A4/P-gp induction',effect:'Reduces levels of most HIV antiretrovirals → virological failure and resistance.',action:'Consult HIV specialist. Use rifabutin instead of rifampicin where possible.',monitor:'Viral load, ARV drug levels, CD4 count'},
  {a:'Co-trimoxazole',b:'Warfarin',sev:'HIGH',cat:'ABX',mech:'CYP2C9 inhibition',effect:'Significantly potentiates warfarin → major haemorrhage risk.',action:'Halve warfarin dose empirically. Check INR within 2 days of starting.',monitor:'INR daily ×2 then every 2–3 days'},
  {a:'Co-trimoxazole',b:'ACE Inhibitor',sev:'HIGH',cat:'ABX',mech:'Additive hyperkalaemia (tubular K⁺ block)',effect:'Co-trimoxazole blocks renal tubular K⁺ secretion (like a K⁺-sparing diuretic) → severe hyperkalaemia with RAAS blockers.',action:'Check K⁺ within 3–5 days. Avoid in CKD with ACEi/ARB if possible.',monitor:'K⁺, eGFR'},
  {a:'Co-trimoxazole',b:'ARB',sev:'HIGH',cat:'ABX',mech:'Additive hyperkalaemia',effect:'Same as ACEi — co-trimoxazole + ARB → severe hyperkalaemia, especially in CKD.',action:'Monitor K⁺ within 3–5 days. Consider alternative antibiotic.',monitor:'K⁺, eGFR'},
  {a:'Nitrofurantoin',b:'Quinolones',sev:'MEDIUM',cat:'ABX',mech:'Pharmacological antagonism in urine',effect:'Nitrofurantoin and quinolones antagonise each other in the urinary tract → reduced efficacy of both.',action:'Do not use together for UTI. Choose one agent based on sensitivity.',monitor:'Clinical response at 48–72 hours'},
  {a:'Azithromycin',b:'QT-Prolonging Drugs',sev:'HIGH',cat:'ABX',mech:'hERG channel block',effect:'Azithromycin prolongs QT — additive risk with antipsychotics, amiodarone, other macrolides.',action:'Check baseline QTc. Avoid if QTc >450 ms or other QT prolongers present.',monitor:'ECG, QTc'},
  {a:'Linezolid',b:'SSRI',sev:'HIGH',cat:'ABX',mech:'Serotonin syndrome (MAO inhibition)',effect:'Linezolid is a weak MAO inhibitor — combined with SSRIs → serotonin syndrome: hyperthermia, clonus, agitation.',action:'Hold SSRI during linezolid course. Bridge with IV benzodiazepine for agitation if needed.',monitor:'Serotonin syndrome signs; temperature, BP, neurology'},
  {a:'Metronidazole',b:'Lithium',sev:'MEDIUM',cat:'ABX',mech:'Reduced renal lithium clearance',effect:'Metronidazole reduces renal lithium clearance → lithium toxicity risk.',action:'Monitor lithium levels within 3–5 days of starting. Adjust lithium dose if needed.',monitor:'Lithium levels, renal function'},

  // ── VASOPRESSORS ───────────────────────────────────────────────
  {a:'Noradrenaline',b:'MAO Inhibitor',sev:'HIGH',cat:'VASO',mech:'Catecholamine accumulation',effect:'MAOIs block noradrenaline breakdown → exaggerated hypertensive response, hypertensive crisis.',action:'Extreme caution. Use lowest effective dose with continuous arterial monitoring.',monitor:'BP via arterial line, continuously'},
  {a:'Dopamine',b:'Phenytoin IV',sev:'HIGH',cat:'VASO',mech:'Unknown mechanism — haemodynamic collapse',effect:'IV phenytoin + dopamine infusion → sudden profound hypotension and bradycardia. Well documented.',action:'If phenytoin IV needed, pause dopamine or switch to alternative vasopressor.',monitor:'BP and HR continuously'},
  {a:'Adrenaline',b:'Beta-Blocker',sev:'HIGH',cat:'VASO',mech:'Unopposed alpha stimulation',effect:'Beta-blocker blocks beta-vasodilation → severe hypertension + reflex bradycardia with adrenaline.',action:'In anaphylaxis on beta-blockers: adrenaline still first-line; may need higher dose + glucagon 1mg IV.',monitor:'BP, HR, serial clinical reassessment'},
  {a:'Vasopressin',b:'Noradrenaline',sev:'MEDIUM',cat:'VASO',mech:'Synergistic vasoconstriction',effect:'Standard septic shock combination — additive vasopressor effect. Risk of digital ischaemia, mesenteric ischaemia if overdosed.',action:'Use vasopressin at fixed low dose (0.03–0.04 U/min). Do not titrate above this.',monitor:'Peripheral perfusion, urine output, lactate, mesenteric perfusion signs'},
  {a:'Dobutamine',b:'Beta-Blocker',sev:'HIGH',cat:'VASO',mech:'Pharmacological antagonism',effect:'Beta-blockers block dobutamine\'s inotropic and chronotropic effects → reduced or absent efficacy.',action:'Higher dobutamine doses may be needed. Consider milrinone (phosphodiesterase inhibitor) as alternative.',monitor:'CO/CI, MAP, HR'},
  {a:'Noradrenaline',b:'Tricyclic Antidepressant',sev:'HIGH',cat:'VASO',mech:'Noradrenaline reuptake block',effect:'TCAs block noradrenaline reuptake → exaggerated vasopressor response, severe hypertension.',action:'Reduce noradrenaline dose significantly. Titrate very carefully.',monitor:'BP continuously via arterial line'},

  // ── CARDIAC DRUGS ──────────────────────────────────────────────
  {a:'Digoxin',b:'Amiodarone',sev:'HIGH',cat:'CARD',mech:'P-gp + renal clearance inhibition',effect:'Amiodarone raises digoxin levels 2× → toxicity: nausea, xanthopsia (yellow vision), bradycardia, AV block, VF.',action:'Reduce digoxin dose by 50% when starting amiodarone. Monitor levels.',monitor:'Digoxin levels, ECG, HR daily'},
  {a:'Digoxin',b:'Verapamil',sev:'HIGH',cat:'CARD',mech:'P-glycoprotein inhibition',effect:'Verapamil reduces digoxin renal clearance → digoxin toxicity. Also additive AV nodal depression.',action:'Avoid combination. If necessary, reduce digoxin dose by 50%.',monitor:'Digoxin levels, ECG, HR'},
  {a:'Digoxin',b:'Spironolactone',sev:'MEDIUM',cat:'CARD',mech:'Reduced renal clearance',effect:'Spironolactone reduces digoxin clearance by ~25%. Hypokalaemia further increases toxicity risk.',action:'Monitor digoxin levels. Maintain K⁺ >4.0 mmol/L.',monitor:'Digoxin levels, K⁺, ECG'},
  {a:'Digoxin',b:'Clarithromycin',sev:'HIGH',cat:'CARD',mech:'P-gp inhibition',effect:'Clarithromycin raises digoxin levels → toxicity (nausea, bradycardia, arrhythmia).',action:'Reduce digoxin dose by 30–50% during clarithromycin course.',monitor:'Digoxin levels, HR, ECG'},
  {a:'Amiodarone',b:'Warfarin',sev:'HIGH',cat:'CARD',mech:'CYP2C9 inhibition',effect:'Amiodarone potently inhibits warfarin metabolism → INR rises 2–3× within 1–2 weeks. Severe bleeding risk.',action:'Reduce warfarin by 30–50% when starting amiodarone. Daily INR monitoring initially.',monitor:'INR daily ×5 then twice weekly'},
  {a:'Amiodarone',b:'Simvastatin',sev:'HIGH',cat:'CARD',mech:'CYP3A4 inhibition',effect:'Raises simvastatin levels → rhabdomyolysis. Max simvastatin 20 mg with amiodarone.',action:'Switch to atorvastatin or rosuvastatin. If simvastatin: cap at 20 mg/day.',monitor:'CK if muscle pain'},
  {a:'Amiodarone',b:'QT-Prolonging Drugs',sev:'HIGH',cat:'CARD',mech:'Additive QT prolongation',effect:'Amiodarone prolongs QT — additive with antipsychotics, quinolones, macrolides → torsades de pointes.',action:'Avoid combining with other QT prolongers. Check full drug list on initiation.',monitor:'QTc on ECG, K⁺, Mg²⁺'},
  {a:'Amiodarone',b:'Digoxin',sev:'HIGH',cat:'CARD',mech:'P-gp + renal clearance inhibition',effect:'See Digoxin + Amiodarone — bilateral interaction. One of the most dangerous cardiac drug pairs.',action:'Reduce digoxin dose by 50%. Monitor levels and ECG.',monitor:'Digoxin levels, HR, QTc'},
  {a:'Warfarin',b:'NSAID',sev:'HIGH',cat:'CARD',mech:'Antiplatelet effect + GI mucosal injury',effect:'NSAIDs inhibit platelets AND damage GI mucosa → markedly increased GI haemorrhage risk.',action:'Avoid NSAIDs. Use paracetamol. Add PPI if NSAID truly unavoidable.',monitor:'INR, stool for occult blood, symptoms'},
  {a:'Warfarin',b:'Aspirin',sev:'HIGH',cat:'CARD',mech:'Antiplatelet on top of anticoagulation',effect:'Doubles bleeding risk. Intentional only in very specific indications (mechanical heart valve + AF, recent ACS).',action:'Only combine when evidence-based indication exists. Otherwise avoid.',monitor:'INR, bleeding symptoms, stool colour'},
  {a:'Statins (Simvastatin)',b:'Gemfibrozil',sev:'HIGH',cat:'CARD',mech:'OATP1B1 + CYP2C8 inhibition',effect:'Gemfibrozil dramatically raises simvastatin levels → severe rhabdomyolysis. One of highest-risk statin interactions.',action:'NEVER combine simvastatin + gemfibrozil. Use fenofibrate if fibrate needed with statin.',monitor:'CK levels, renal function'},
  {a:'Sotalol',b:'QT-Prolonging Drugs',sev:'HIGH',cat:'CARD',mech:'Additive hERG block + class III effect',effect:'Sotalol is a class III antiarrhythmic that prolongs QT — additive risk with antipsychotics, macrolides, quinolones.',action:'Avoid other QT prolongers. Maintain K⁺ and Mg²⁺ in normal range.',monitor:'QTc, K⁺, Mg²⁺, ECG'},
  {a:'Clopidogrel',b:'Omeprazole',sev:'MEDIUM',cat:'CARD',mech:'CYP2C19 inhibition reduces clopidogrel activation',effect:'Omeprazole inhibits CYP2C19 which activates clopidogrel → reduced antiplatelet effect → stent thrombosis risk.',action:'Use pantoprazole or lansoprazole (less CYP2C19 inhibition) instead of omeprazole.',monitor:'Platelet function if accessible; clinical ischaemic events'},
  {a:'Heparin',b:'NSAIDs',sev:'HIGH',cat:'CARD',mech:'Additive anticoagulation + GI bleeding risk',effect:'NSAIDs inhibit platelets + increase GI mucosal injury → significant haemorrhage risk with heparin.',action:'Avoid NSAIDs. Use paracetamol for analgesia. Add PPI if risk present.',monitor:'Bleeding signs, FBC, HIT antibodies'},
  {a:'LMWH (Low Molecular Weight Heparin)',b:'NSAIDs',sev:'HIGH',cat:'CARD',mech:'Antiplatelet + anticoagulant',effect:'Additive haemorrhage risk — NSAIDs impair platelet function on top of LMWH anticoagulation.',action:'Avoid NSAIDs in patients on LMWH.',monitor:'FBC, bleeding symptoms'},

  // ── PSYCHIATRIC DRUGS ──────────────────────────────────────────
  {a:'SSRI',b:'Tramadol',sev:'HIGH',cat:'PSYCH',mech:'Serotonin syndrome + lowered seizure threshold',effect:'Serotonin syndrome: hyperthermia, agitation, clonus, tachycardia. SSRIs also lower tramadol seizure threshold.',action:'Avoid combination. Use alternative analgesics (paracetamol, low-dose codeine with care).',monitor:'Serotonin syndrome symptoms (clonus, temp, BP)'},
  {a:'SSRI',b:'MAO Inhibitor',sev:'HIGH',cat:'PSYCH',mech:'Serotonin accumulation',effect:'Potentially fatal serotonin syndrome. One of the most dangerous interactions in medicine.',action:'NEVER combine. Washout: 14 days after MAOI stopped; 5 weeks after fluoxetine stopped.',monitor:'If accidental: ICU admission, cyproheptadine, cooling, supportive care'},
  {a:'SSRI',b:'Linezolid',sev:'HIGH',cat:'PSYCH',mech:'Weak MAO inhibition by linezolid',effect:'Linezolid is a weak MAOI → serotonin syndrome with SSRIs.',action:'Hold SSRI during linezolid. If urgently needed, use IV benzodiazepine for agitation.',monitor:'Temperature, clonus, agitation'},
  {a:'Lithium',b:'NSAID',sev:'HIGH',cat:'PSYCH',mech:'Reduced renal prostaglandins → reduced lithium excretion',effect:'NSAIDs reduce GFR → lithium accumulates → toxicity: tremor, confusion, seizures, renal failure.',action:'Avoid NSAIDs. Use paracetamol. If NSAID essential, monitor lithium level within 3 days.',monitor:'Lithium levels every 3–5 days'},
  {a:'Lithium',b:'ACE Inhibitor',sev:'HIGH',cat:'PSYCH',mech:'Reduced renal lithium clearance',effect:'RAAS blockade reduces renal lithium excretion → lithium toxicity.',action:'Monitor lithium levels within 1 week of any ACEi dose change.',monitor:'Lithium levels, renal function'},
  {a:'Lithium',b:'ARB',sev:'HIGH',cat:'PSYCH',mech:'Reduced renal lithium clearance',effect:'Same as ACEi — ARB reduces lithium clearance → toxicity risk.',action:'Monitor lithium levels within 1 week of ARB initiation or dose change.',monitor:'Lithium levels, U&E'},
  {a:'Lithium',b:'Thiazide Diuretic',sev:'HIGH',cat:'PSYCH',mech:'Volume depletion → Na⁺/Li⁺ reabsorption',effect:'Thiazides cause Na⁺ depletion → compensatory Li⁺ reabsorption → lithium toxicity.',action:'Avoid thiazides. Use loop diuretic with caution and close monitoring.',monitor:'Lithium levels, serum Na⁺'},
  {a:'Antipsychotic',b:'QT-Prolonging Drugs',sev:'HIGH',cat:'PSYCH',mech:'Additive hERG channel block',effect:'Most antipsychotics (haloperidol, quetiapine, olanzapine) prolong QT — additive with macrolides, quinolones, amiodarone.',action:'Check QTc baseline. Avoid if QTc >450 ms. Use ECG monitoring on initiation.',monitor:'QTc, K⁺, Mg²⁺'},
  {a:'Clozapine',b:'Ciprofloxacin',sev:'HIGH',cat:'PSYCH',mech:'CYP1A2 inhibition',effect:'Ciprofloxacin inhibits clozapine metabolism → toxicity: seizures, myocarditis risk, worsening agranulocytosis.',action:'Avoid ciprofloxacin in clozapine patients. Use alternative antibiotic.',monitor:'Clozapine levels, FBC, ECG'},
  {a:'Clozapine',b:'Erythromycin',sev:'HIGH',cat:'PSYCH',mech:'CYP1A2/3A4 inhibition',effect:'Raises clozapine levels → toxicity: sedation, hypotension, seizure, myocarditis.',action:'Avoid combination. Use azithromycin or alternative antibiotic.',monitor:'Clozapine levels, BP, ECG'},
  {a:'TCAs (Amitriptyline)',b:'Adrenaline',sev:'HIGH',cat:'PSYCH',mech:'Noradrenaline reuptake block',effect:'TCAs block noradrenaline reuptake → exaggerated cardiovascular response: severe hypertension, arrhythmias.',action:'Inform anaesthetist of TCA use pre-operatively. Use minimal adrenaline dose.',monitor:'BP, HR, ECG'},
  {a:'Antipsychotic',b:'Metoclopramide',sev:'MEDIUM',cat:'PSYCH',mech:'Additive D2 receptor blockade',effect:'Both block dopamine D2 receptors → additive extrapyramidal side effects (acute dystonia, akathisia, parkinsonism).',action:'Avoid combination. Use ondansetron or domperidone for nausea instead.',monitor:'Extrapyramidal symptoms'},

  // ── ANALGESICS ─────────────────────────────────────────────────
  {a:'Opioid',b:'Benzodiazepine',sev:'HIGH',cat:'ANALG',mech:'Additive CNS and respiratory depression',effect:'Combined respiratory depression → arrest. FDA black box warning. Major cause of overdose deaths.',action:'Avoid combination. If necessary, use lowest possible doses, monitor SpO₂.',monitor:'SpO₂, RR, consciousness level'},
  {a:'Opioid',b:'Gabapentin',sev:'HIGH',cat:'ANALG',mech:'Additive respiratory depression',effect:'Gabapentinoids + opioids → synergistic respiratory depression. Deaths increasing especially in elderly, CKD.',action:'Use lowest doses. Avoid in sleep apnoea. Educate patient and family.',monitor:'SpO₂, RR, sedation score'},
  {a:'Opioid',b:'Pregabalin',sev:'HIGH',cat:'ANALG',mech:'Additive respiratory depression',effect:'Same as gabapentin — synergistic respiratory depression. Overdose deaths documented.',action:'Use lowest doses. Consider non-opioid alternatives.',monitor:'SpO₂, RR, consciousness'},
  {a:'NSAIDs',b:'Anticoagulants',sev:'HIGH',cat:'ANALG',mech:'Antiplatelet + anticoagulation',effect:'NSAIDs impair platelet function in anticoagulated patients → significantly increased major haemorrhage.',action:'Avoid NSAIDs. Use paracetamol. If NSAID unavoidable, add PPI.',monitor:'FBC, stool occult blood, INR (if warfarin)'},
  {a:'NSAIDs',b:'Lithium',sev:'HIGH',cat:'ANALG',mech:'Reduced renal Li⁺ excretion',effect:'NSAIDs reduce renal prostaglandins → GFR falls → lithium accumulates → toxicity.',action:'Use paracetamol instead. If NSAID essential, monitor lithium level within 3 days.',monitor:'Lithium levels'},
  {a:'NSAIDs',b:'Methotrexate',sev:'HIGH',cat:'ANALG',mech:'Reduced renal methotrexate clearance',effect:'NSAIDs reduce renal methotrexate excretion → methotrexate toxicity: mucositis, marrow suppression, hepatotoxicity.',action:'Avoid NSAIDs in patients on methotrexate. Use paracetamol.',monitor:'FBC, LFTs, mucositis signs'},
  {a:'Paracetamol',b:'Warfarin',sev:'MEDIUM',cat:'ANALG',mech:'Mechanism unclear — possibly CYP2C9 effects',effect:'Regular paracetamol >2g/day potentiates warfarin → INR rises 1.5–2× in some patients.',action:'Preferred analgesic in anticoagulated patients. Monitor INR if used regularly >4 days.',monitor:'INR at 1 week if regular paracetamol'},
  {a:'Tramadol',b:'Antidepressants',sev:'HIGH',cat:'ANALG',mech:'Serotonin syndrome + lowered seizure threshold',effect:'Tramadol + SSRIs/SNRIs/TCAs → serotonin syndrome. Also lowers seizure threshold additively.',action:'Avoid combination. Use alternative analgesia.',monitor:'Serotonin syndrome signs, seizure activity'},
  {a:'Codeine',b:'CYP2D6 Inhibitors (Fluoxetine, Paroxetine)',sev:'MEDIUM',cat:'ANALG',mech:'CYP2D6 inhibition blocks codeine → morphine conversion',effect:'Fluoxetine/paroxetine inhibit CYP2D6 → codeine not converted to morphine → analgesic failure.',action:'Use alternative opioid (tramadol with caution, oxycodone, morphine directly).',monitor:'Pain control assessment'},

  // ── HERBALS (NIGERIA) ──────────────────────────────────────────
  {a:'Dongoyaro (Neem)',b:'Antidiabetics',sev:'HIGH',cat:'HERB',mech:'Additive glucose-lowering',effect:'Dongoyaro has direct hypoglycaemic properties — additive with metformin/sulfonylureas → severe hypoglycaemia.',action:'Ask about herbal use at every visit. Adjust antidiabetic dose if confirmed use.',monitor:'BG frequently; hypoglycaemia symptoms'},
  {a:'Bitter Leaf (Vernonia)',b:'Warfarin',sev:'HIGH',cat:'HERB',mech:'Possible CYP2C9 effect; intrinsic anticoagulant properties',effect:'May reduce INR and destabilise anticoagulation. Also has hypoglycaemic properties.',action:'Ask specifically about bitter leaf. Check INR at regular intervals.',monitor:'INR every 1–2 weeks'},
  {a:'Bitter Leaf (Vernonia)',b:'Antidiabetics',sev:'MEDIUM',cat:'HERB',mech:'Additive glucose-lowering',effect:'Bitter leaf lowers blood glucose — additive hypoglycaemia with antidiabetics.',action:'Enquire at each consultation. Adjust doses accordingly.',monitor:'BG monitoring; hypoglycaemia education'},
  {a:'Garlic (high-dose supplement)',b:'Anticoagulants',sev:'HIGH',cat:'HERB',mech:'Antiplatelet + anticoagulant',effect:'High-dose garlic inhibits platelet aggregation — additive bleeding risk with warfarin, aspirin, clopidogrel.',action:'Discourage high-dose garlic supplements (dietary garlic generally safe).',monitor:'INR, bleeding symptoms'},
  {a:'Moringa (Moringa oleifera)',b:'Antidiabetics',sev:'MEDIUM',cat:'HERB',mech:'Additive glucose-lowering',effect:'Moringa lowers blood glucose — additive with antidiabetic drugs → hypoglycaemia.',action:'Enquire about moringa use at each visit. Reduce antidiabetic dose if needed.',monitor:'BG, hypoglycaemia symptoms'},
  {a:'Moringa (Moringa oleifera)',b:'Levothyroxine',sev:'MEDIUM',cat:'HERB',mech:'Reduces thyroid hormone absorption',effect:'Moringa may impair levothyroxine absorption when taken concurrently.',action:'Take levothyroxine 30–60 minutes before food/supplements including moringa.',monitor:'TFTs, symptoms of hypothyroidism'},
  {a:'St. John\'s Wort',b:'ARV Drugs',sev:'HIGH',cat:'HERB',mech:'Potent CYP3A4/P-gp induction',effect:'Dramatically reduces ARV drug levels → virological failure and drug resistance.',action:'ABSOLUTELY CONTRAINDICATED with ARVs. Advise complete avoidance.',monitor:'Viral load, CD4 count'},
  {a:'St. John\'s Wort',b:'Warfarin',sev:'HIGH',cat:'HERB',mech:'CYP2C9/3A4 induction',effect:'Potent inducer → reduces warfarin levels significantly → INR drops → thrombosis risk.',action:'Stop St. John\'s Wort. Re-check INR within 1 week of stopping.',monitor:'INR every 3–5 days after stopping'},
  {a:'St. John\'s Wort',b:'Oral Contraceptive Pill',sev:'HIGH',cat:'HERB',mech:'CYP3A4 induction',effect:'Reduces OCP hormone levels → contraceptive failure.',action:'Use barrier contraception during use and for 4 weeks after stopping.',monitor:'Pregnancy test if missed period'},
  {a:'Aloe Vera (oral)',b:'Digoxin',sev:'HIGH',cat:'HERB',mech:'Hypokalaemia → digoxin toxicity',effect:'Oral aloe vera → laxative effect → hypokalaemia → increased digoxin toxicity even at therapeutic levels.',action:'Advise against oral aloe vera in patients on digoxin or diuretics.',monitor:'K⁺, digoxin levels, ECG'},
  {a:'Aloe Vera (oral)',b:'Antidiabetics',sev:'MEDIUM',cat:'HERB',mech:'Additive glucose-lowering',effect:'Oral aloe vera has glucose-lowering properties — additive hypoglycaemia risk.',action:'Enquire about oral aloe vera use. Adjust antidiabetic dose if confirmed.',monitor:'BG monitoring'},
  {a:'Bitter Kola (Garcinia)',b:'Antihypertensives',sev:'MEDIUM',cat:'HERB',mech:'Stimulant/sympathomimetic effect',effect:'Bitter kola has stimulant properties → may raise BP, offsetting antihypertensive therapy.',action:'Ask about bitter kola use in hypertensive patients with poor BP control.',monitor:'BP monitoring; ask patient about use regularly'},
  {a:'African Mistletoe (Loranthus)',b:'Antihypertensives',sev:'MEDIUM',cat:'HERB',mech:'Additive BP-lowering',effect:'African mistletoe has BP-lowering properties — additive hypotension with antihypertensives.',action:'Ask about use. Warn about additive hypotension. Adjust medications if needed.',monitor:'BP, orthostatic hypotension symptoms'},
  {a:'African Mistletoe (Loranthus)',b:'Antidiabetics',sev:'MEDIUM',cat:'HERB',mech:'Additive glucose-lowering',effect:'Glucose-lowering properties — additive hypoglycaemia with antidiabetic drugs.',action:'Enquire at each visit. Educate patient.',monitor:'BG, hypoglycaemia signs'},
  {a:'Pawpaw Leaf (Carica papaya)',b:'Warfarin',sev:'HIGH',cat:'HERB',mech:'Intrinsic anticoagulant activity',effect:'Pawpaw leaf extract has anticoagulant activity → prolonged PT; thrombocytopaenia in some cases.',action:'Advise against pawpaw leaf extract in anticoagulated patients.',monitor:'INR, FBC, platelet count'},
  {a:'Turmeric / Curcumin (high dose)',b:'Anticoagulants',sev:'MEDIUM',cat:'HERB',mech:'Antiplatelet effect at high doses',effect:'High-dose turmeric/curcumin supplements (not dietary) → anticoagulant effect + additive bleeding risk.',action:'Discourage high-dose curcumin supplements. Dietary turmeric is safe.',monitor:'INR if on warfarin; bleeding symptoms'},
];

var DI_DRUG_LIST = (function(){
  var set = {};
  DI_DB.forEach(function(r){ set[r.a]=1; set[r.b]=1; });
  return Object.keys(set).sort();
})();

var DI_CAT_LABELS = {
  HTN:'🫀 Antihypertensives', DM:'🩸 Diabetes', ABX:'🦠 Antibiotics',
  VASO:'💉 Vasopressors', CARD:'❤️ Cardiac', PSYCH:'🧠 Psychiatry',
  ANALG:'💊 Analgesics', HERB:'🌿 Herbals (Nigeria)'
};
var DI_CAT_COLORS = {
  HTN:'#0ea5e9', DM:'#ef4444', ABX:'#16a34a', VASO:'#a855f7',
  CARD:'#ec4899', PSYCH:'#8b5cf6', ANALG:'#f97316', HERB:'#65a30d'
};
var DI_SEV_CONFIG = {
  HIGH:   {label:'HIGH RISK', color:'#dc2626', bg:'#fef2f2', border:'#fecaca', icon:'🔴'},
  MEDIUM: {label:'MODERATE',  color:'#d97706', bg:'#fffbeb', border:'#fde68a', icon:'🟡'},
  LOW:    {label:'LOW RISK',  color:'#16a34a', bg:'#f0fdf4', border:'#bbf7d0', icon:'🟢'},
};

function tabDrugInteractions(el_) {
  el_.appendChild(secTitle('⚠️','Drug Interaction Checker','Type any two drugs below — the checker instantly shows every known interaction','#d97706'));

  // ── HOW TO USE banner ───────────────────────────────────────
  var howto = document.createElement('div');
  howto.style.cssText='background:linear-gradient(135deg,#1e3a5f,#0c2340);border-radius:14px;padding:16px 18px;margin-bottom:16px;border:1px solid rgba(14,165,233,0.25)';
  howto.innerHTML=
    '<div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;margin-bottom:10px">📖 How to use</div>'+
    '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px">'+
      '<div style="display:flex;align-items:flex-start;gap:10px">'+
        '<div style="width:28px;height:28px;border-radius:50%;background:#0ea5e9;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">1</div>'+
        '<div style="font-size:12px;color:#bfdbfe;line-height:1.5"><strong style="color:#fff">Type a drug name</strong><br>e.g. "Warfarin" or "Metformin" into the search box</div>'+
      '</div>'+
      '<div style="display:flex;align-items:flex-start;gap:10px">'+
        '<div style="width:28px;height:28px;border-radius:50%;background:#0ea5e9;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">2</div>'+
        '<div style="font-size:12px;color:#bfdbfe;line-height:1.5"><strong style="color:#fff">Click a suggestion</strong><br>or press Enter to add it to the patient\'s drug list</div>'+
      '</div>'+
      '<div style="display:flex;align-items:flex-start;gap:10px">'+
        '<div style="width:28px;height:28px;border-radius:50%;background:#0ea5e9;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">3</div>'+
        '<div style="font-size:12px;color:#bfdbfe;line-height:1.5"><strong style="color:#fff">Repeat for all drugs</strong><br>Add as many drugs as the patient takes</div>'+
      '</div>'+
      '<div style="display:flex;align-items:flex-start;gap:10px">'+
        '<div style="width:28px;height:28px;border-radius:50%;background:#f59e0b;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">4</div>'+
        '<div style="font-size:12px;color:#bfdbfe;line-height:1.5"><strong style="color:#fff">Tap Check Interactions</strong><br>Results appear instantly with severity and action steps</div>'+
      '</div>'+
    '</div>';
  el_.appendChild(howto);

  // ── CHECKER WIDGET ───────────────────────────────────────────
  var checker = document.createElement('div');
  checker.style.cssText='background:#fff;border:2px solid #fde68a;border-radius:14px;padding:18px;box-shadow:0 2px 12px rgba(217,119,6,0.08);margin-bottom:16px';
  checker.innerHTML=
    '<div style="font-size:12px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px">💊 Patient\'s Drug List</div>'+
    '<div style="position:relative;margin-bottom:10px">'+
      '<input id="di-search-input" class="inp" placeholder="🔍 Search drug name — e.g. Warfarin, Metformin, Ciprofloxacin..." autocomplete="off" style="width:100%;font-size:14px">'+
      '<div id="di-suggestions" style="display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;z-index:300;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;max-height:240px;overflow-y:auto;box-shadow:0 8px 28px rgba(0,0,0,0.14)"></div>'+
    '</div>'+
    '<div id="di-selected-wrap" style="min-height:36px;display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:6px 0 4px">'+
      '<span id="di-empty-hint" style="font-size:12px;color:#94a3b8;padding:2px 0">No drugs added yet — start typing above</span>'+
    '</div>'+
    '<div style="height:1px;background:#f1f5f9;margin:10px 0"></div>'+
    '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">'+
      '<button id="di-check-btn" style="padding:11px 22px;background:linear-gradient(135deg,#d97706,#b45309);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;box-shadow:0 3px 10px rgba(180,83,9,0.3);display:flex;align-items:center;gap:6px">'+
        '⚡ Check Interactions'+
      '</button>'+
      '<button id="di-clear-btn" style="padding:11px 16px;background:#f8fafc;color:#64748b;border:1.5px solid #e2e8f0;border-radius:10px;font-weight:600;font-size:12px;cursor:pointer">'+
        '✕ Clear All'+
      '</button>'+
      '<span id="di-drug-count" style="font-size:11px;color:#94a3b8;padding-left:2px"></span>'+
    '</div>'+
    '<div id="di-results-wrap" style="margin-top:14px"></div>';
  el_.appendChild(checker);

  // ── SEPARATOR ───────────────────────────────────────────────
  el_.appendChild(fromHTML('<div style="margin:24px 0 10px;display:flex;align-items:center;gap:10px">'+
    '<span style="font-size:14px;font-weight:800;color:#374151">📋 Full Reference — All '+DI_DB.length+' Interaction Pairs</span>'+
    '<span style="font-size:10px;font-weight:600;padding:2px 10px;background:#f1f5f9;border-radius:20px;color:#64748b">8 categories</span>'+
  '</div>'));
  el_.appendChild(notebox('📌 Not a substitute for a full pharmacist review. Always verify complex polypharmacy with a clinical pharmacist or Stockley\'s/Lexicomp. This checker covers common interactions encountered in Nigerian clinical practice — HTN, DM, antibiotics, cardiac, psychiatric, analgesic, vasopressor, and herbal categories.','#fffbeb','#fde68a'));

  // ── REFERENCE TABLES BY CATEGORY ────────────────────────────
  var catMap = {};
  DI_DB.forEach(function(r){
    if(!catMap[r.cat]) catMap[r.cat]={HIGH:[],MEDIUM:[],LOW:[]};
    catMap[r.cat][r.sev].push(r);
  });
  var catOrder = ['HTN','DM','ABX','CARD','PSYCH','ANALG','VASO','HERB'];
  catOrder.forEach(function(cat){
    var catData = catMap[cat];
    if(!catData) return;
    var allRows = [].concat(catData.HIGH||[], catData.MEDIUM||[], catData.LOW||[]);
    if(!allRows.length) return;
    var catColor = DI_CAT_COLORS[cat]||'#64748b';
    var catLabel = DI_CAT_LABELS[cat]||cat;
    var rowsHTML = allRows.map(function(r){
      var sc = DI_SEV_CONFIG[r.sev];
      return '<tr class="tbl-row">'+
        '<td style="font-weight:700;color:'+catColor+';font-size:12px;min-width:90px">'+r.a+'</td>'+
        '<td style="font-weight:600;font-size:12px;min-width:90px">'+r.b+'</td>'+
        '<td style="white-space:nowrap"><span style="display:inline-block;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;background:'+sc.bg+';color:'+sc.color+';border:1px solid '+sc.border+'">'+sc.icon+' '+r.sev+'</span></td>'+
        '<td style="font-size:11.5px;color:#374151;line-height:1.55">'+r.effect+'</td>'+
        '<td style="font-size:11.5px;font-weight:600;color:#1e293b;line-height:1.55">'+r.action+'</td>'+
        '<td style="font-size:11px;color:#64748b;line-height:1.5">'+r.monitor+'</td>'+
      '</tr>';
    }).join('');
    el_.appendChild(card(catLabel+' — '+allRows.length+' interactions', catColor,
      '<div class="tbl-wrap"><table style="min-width:700px"><thead><tr><th>Drug A</th><th>Drug B</th><th>Risk</th><th>Clinical Effect</th><th>Action</th><th>Monitor</th></tr></thead><tbody>'+rowsHTML+'</tbody></table></div>'
    ));
  });

  el_.appendChild(notebox('🌿 <strong>Always ask about traditional/herbal medicines.</strong> Studies in Nigeria show 60–80% of patients take herbal preparations concurrently with prescribed drugs — often without disclosing to their doctor or nurse. Ask specifically: <em>"Are you taking any agbo, leaves, roots, herbs, or local medicines?"</em>','#fff7ed','#fed7aa'));

  // ── JAVASCRIPT ───────────────────────────────────────────────
  var selectedDrugs = [];

  function normalize(s){ return s.toLowerCase().replace(/[^a-z0-9]/g,' ').replace(/\s+/g,' ').trim(); }

  function drugMatchesSide(drug, side){
    var nd=normalize(drug), ns=normalize(side);
    return ns.indexOf(nd)!==-1 || nd.indexOf(ns)!==-1;
  }

  function findInteractions(drugs){
    var hits=[], seen={};
    DI_DB.forEach(function(r){
      var matchA=false, matchB=false;
      drugs.forEach(function(d){
        if(drugMatchesSide(d,r.a)) matchA=true;
        if(drugMatchesSide(d,r.b)) matchB=true;
      });
      var key=r.a+'|'+r.b;
      if(matchA && matchB && !seen[key]){ seen[key]=1; hits.push(r); }
    });
    return hits;
  }

  function renderSelected(){
    var wrap=document.getElementById('di-selected-wrap');
    var hint=document.getElementById('di-empty-hint');
    var count=document.getElementById('di-drug-count');
    if(!wrap) return;
    Array.from(wrap.querySelectorAll('.di-pill')).forEach(function(p){p.remove();});
    if(!selectedDrugs.length){
      if(hint) hint.style.display='';
      if(count) count.textContent='';
    } else {
      if(hint) hint.style.display='none';
      if(count) count.textContent=selectedDrugs.length+' drug'+(selectedDrugs.length!==1?'s':'')+' added';
      selectedDrugs.forEach(function(drug,idx){
        var pill=document.createElement('span');
        pill.className='di-pill';
        pill.style.cssText='display:inline-flex;align-items:center;gap:5px;padding:5px 10px 5px 12px;background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:20px;font-size:12.5px;font-weight:600;color:#1d4ed8;cursor:default';
        pill.innerHTML='💊 '+drug+'<button data-idx="'+idx+'" style="background:none;border:none;cursor:pointer;color:#93c5fd;font-size:16px;line-height:1;padding:0 0 0 3px;display:flex;align-items:center" title="Remove '+drug+'">×</button>';
        pill.querySelector('button').addEventListener('click',function(){
          selectedDrugs.splice(parseInt(this.getAttribute('data-idx')),1);
          renderSelected();
          document.getElementById('di-results-wrap').innerHTML='';
        });
        wrap.appendChild(pill);
      });
    }
  }

  function renderResults(interactions){
    var wrap=document.getElementById('di-results-wrap');
    if(!wrap) return;
    if(!interactions.length){
      wrap.innerHTML=
        '<div style="padding:20px;background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:12px;text-align:center">'+
          '<div style="font-size:26px;margin-bottom:8px">✅</div>'+
          '<div style="font-weight:700;color:#15803d;font-size:14px;margin-bottom:4px">No interactions found between selected drugs</div>'+
          '<div style="font-size:12px;color:#64748b">This does not guarantee safety — always verify with a clinical pharmacist for complete polypharmacy review.</div>'+
        '</div>';
      return;
    }
    var sorted=interactions.slice().sort(function(a,b){ var o={HIGH:0,MEDIUM:1,LOW:2}; return (o[a.sev]||9)-(o[b.sev]||9); });
    var html='<div style="margin-bottom:12px;padding:10px 14px;background:#fff7ed;border:1px solid #fde68a;border-radius:10px;display:flex;align-items:center;gap:10px">'+
      '<span style="font-size:20px">⚠️</span>'+
      '<div><span style="font-weight:700;color:#92400e;font-size:13px">'+interactions.length+' interaction'+(interactions.length!==1?'s':'')+' found</span>'+
      '<span style="font-size:11px;color:#a16207;margin-left:8px">Review all before prescribing</span></div>'+
    '</div>';
    sorted.forEach(function(r){
      var sc=DI_SEV_CONFIG[r.sev];
      var cc=DI_CAT_COLORS[r.cat]||'#64748b';
      var cl=DI_CAT_LABELS[r.cat]||r.cat;
      html+=
        '<div style="background:'+sc.bg+';border:1.5px solid '+sc.border+';border-left:4px solid '+sc.color+';border-radius:12px;padding:16px;margin-bottom:10px">'+
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap">'+
            '<span style="font-size:18px">'+sc.icon+'</span>'+
            '<span style="font-weight:800;font-size:13px;color:'+sc.color+'">'+sc.label+'</span>'+
            '<span style="font-size:10px;padding:2px 9px;background:'+cc+'1a;color:'+cc+';border-radius:20px;font-weight:700;border:1px solid '+cc+'44">'+cl+'</span>'+
          '</div>'+
          '<div style="font-size:15px;font-weight:700;color:#0f172a;margin-bottom:8px">'+
            r.a+' <span style="color:#94a3b8;font-weight:400;font-size:13px">＋</span> '+r.b+
          '</div>'+
          '<div style="display:grid;gap:6px">'+
            '<div style="font-size:12.5px;color:#374151"><span style="font-weight:700;color:'+sc.color+'">⚙️ Mechanism: </span>'+r.mech+'</div>'+
            '<div style="font-size:12.5px;color:#374151"><span style="font-weight:700">💥 Effect: </span>'+r.effect+'</div>'+
            '<div style="background:rgba(255,255,255,0.65);border-radius:8px;padding:10px 12px;border:1px solid rgba(0,0,0,0.06);margin-top:2px">'+
              '<div style="font-size:12.5px;font-weight:700;color:#1e293b;margin-bottom:4px">⚡ Action:</div>'+
              '<div style="font-size:12.5px;color:#1e293b;line-height:1.6">'+r.action+'</div>'+
              (r.monitor?'<div style="font-size:12px;color:#64748b;margin-top:6px;border-top:1px solid rgba(0,0,0,0.06);padding-top:6px">👁 <strong>Monitor:</strong> '+r.monitor+'</div>':'')+
            '</div>'+
          '</div>'+
        '</div>';
    });
    wrap.innerHTML=html;
  }

  // Autocomplete + add logic
  var searchInput=document.getElementById('di-search-input');
  var suggestions=document.getElementById('di-suggestions');

  function addDrug(drug){
    var trimmed=drug.trim();
    if(trimmed && selectedDrugs.indexOf(trimmed)===-1){
      selectedDrugs.push(trimmed);
      searchInput.value='';
      suggestions.style.display='none';
      renderSelected();
      document.getElementById('di-results-wrap').innerHTML='';
      searchInput.focus();
    }
  }

  function showSuggestions(query){
    if(!query||query.length<2){ suggestions.style.display='none'; return; }
    var nq=normalize(query);
    var matches=DI_DRUG_LIST.filter(function(d){ return normalize(d).indexOf(nq)!==-1 && selectedDrugs.indexOf(d)===-1; }).slice(0,9);
    if(!matches.length){ suggestions.style.display='none'; return; }
    suggestions.innerHTML=matches.map(function(d,i){
      var hilite=d.replace(new RegExp('('+query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi'),'<strong style="color:#1d4ed8">$1</strong>');
      return '<div class="di-sug" data-drug="'+d+'" style="padding:10px 14px;cursor:pointer;font-size:13px;color:#1e293b;'+(i<matches.length-1?'border-bottom:1px solid #f1f5f9':'')+';display:flex;align-items:center;gap:8px">'+
        '<span style="font-size:14px">💊</span><span>'+hilite+'</span>'+
      '</div>';
    }).join('');
    suggestions.style.display='block';
    suggestions.querySelectorAll('.di-sug').forEach(function(item){
      item.addEventListener('mousedown',function(e){e.preventDefault();});
      item.addEventListener('click',function(){ addDrug(this.getAttribute('data-drug')); });
      item.addEventListener('mouseover',function(){ this.style.background='#eff6ff'; });
      item.addEventListener('mouseout',function(){ this.style.background=''; });
    });
  }

  if(searchInput){
    searchInput.addEventListener('input',function(){ showSuggestions(this.value); });
    searchInput.addEventListener('keydown',function(e){
      if(e.key==='Enter'){ addDrug(this.value); e.preventDefault(); }
      if(e.key==='Escape'){ suggestions.style.display='none'; }
    });
    searchInput.addEventListener('blur',function(){ setTimeout(function(){ suggestions.style.display='none'; },180); });
  }

  var checkBtn=document.getElementById('di-check-btn');
  if(checkBtn) checkBtn.addEventListener('click',function(){
    if(selectedDrugs.length<2){
      document.getElementById('di-results-wrap').innerHTML=
        '<div style="padding:12px 16px;background:#fef2f2;border:1.5px solid #fecaca;border-radius:10px;font-size:13px;font-weight:600;color:#dc2626">'+
          '⚠️ Add at least 2 drugs first, then tap Check Interactions.'+
        '</div>';
      return;
    }
    renderResults(findInteractions(selectedDrugs));
    // Scroll to results
    setTimeout(function(){
      var w=document.getElementById('di-results-wrap');
      if(w) w.scrollIntoView({behavior:'smooth',block:'nearest'});
    },100);
  });

  var clearBtn=document.getElementById('di-clear-btn');
  if(clearBtn) clearBtn.addEventListener('click',function(){
    selectedDrugs=[];
    renderSelected();
    document.getElementById('di-results-wrap').innerHTML='';
    if(searchInput) searchInput.focus();
  });
}

function tabDrugPregnancy(el_) {
  el_.appendChild(secTitle('🤰','Drugs in Pregnancy','Safety classification for HTN, DM and common drugs','#ec4899'));
  el_.appendChild(notebox('📌 Based on ISSHP 2018, ADA 2024 and product monographs. When in doubt — consult obstetrician. The risks of untreated disease often outweigh drug risks.','#fdf2f8','#fbcfe8'));

  el_.appendChild(card('Antihypertensives in Pregnancy','#ec4899','<div class="tbl-wrap"><table><thead><tr style="background:#fdf2f8"><th>Drug</th><th>Safety</th><th>Notes</th></tr></thead><tbody>'+[
    ['Labetalol','✅ Safe — First-line','Oral and IV. Well studied. Watch for neonatal bradycardia.'],
    ['Methyldopa','✅ Safe — Well established','Decades of safety data. Can cause maternal depression.'],
    ['Nifedipine (LA)','✅ Safe','Long-acting form only. Good antihypertensive effect in pregnancy.'],
    ['Hydralazine IV','✅ Safe (IV/IM)','Acute severe HTN in pregnancy. Oral form less used.'],
    ['Amlodipine','⚠️ Limited data','Some use in later pregnancy — limited safety data.'],
    ['ACE inhibitors','❌ CONTRAINDICATED','Fetotoxic — renal dysgenesis, oligohydramnios, IUGR. ALL trimesters.'],
    ['ARBs','❌ CONTRAINDICATED','Same mechanism as ACEi — equally teratogenic. Avoid ALL trimesters.'],
    ['Direct renin inhibitors','❌ CONTRAINDICATED','Aliskiren — avoid in pregnancy.'],
    ['Spironolactone','❌ AVOID','Anti-androgenic effects on male fetus.'],
    ['Atenolol','⚠️ Caution','Associated with IUGR — avoid especially in 1st trimester.'],
  ].map(function(r){
    var col = r[1].includes('✅')?'#16a34a':r[1].includes('❌')?'#dc2626':'#d97706';
    return '<tr class="tbl-row"><td style="font-weight:700;color:#ec4899">'+r[0]+'</td><td style="font-weight:700;color:'+col+'">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';
  }).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Antidiabetics in Pregnancy','#f59e0b','<div class="tbl-wrap"><table><thead><tr style="background:#fffbeb"><th>Drug</th><th>Safety</th><th>Notes</th></tr></thead><tbody>'+[
    ['Insulin (all types)','✅ Safe — Preferred','Does not cross placenta. Gold standard in pregnancy DM.'],
    ['Metformin','⚠️ Used in GDM (with consent)','Crosses placenta — long-term fetal data still emerging. NICE allows in GDM.'],
    ['Glibenclamide','⚠️ Used in some settings','Crosses placenta — neonatal hypoglycaemia risk. Not first choice.'],
    ['SGLT2 inhibitors','❌ AVOID','Animal data shows harm. Insufficient human data. Stop if pregnant.'],
    ['GLP-1 agonists','❌ AVOID','Insufficient safety data. Stop before conception if possible.'],
    ['DPP-4 inhibitors','❌ AVOID','Insufficient data — animal studies show some concern.'],
    ['Pioglitazone','❌ AVOID','Crosses placenta. Insufficient safety data.'],
  ].map(function(r){
    var col = r[1].includes('✅')?'#16a34a':r[1].includes('❌')?'#dc2626':'#d97706';
    return '<tr class="tbl-row"><td style="font-weight:700;color:#f59e0b">'+r[0]+'</td><td style="font-weight:700;color:'+col+'">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';
  }).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Other Common Drugs in Pregnancy','#64748b','<div class="tbl-wrap"><table><thead><tr style="background:#f8fafc"><th>Drug</th><th>Safety</th><th>Notes</th></tr></thead><tbody>'+[
    ['Paracetamol (Acetaminophen)','✅ Safe (short-term)','Preferred analgesic. Use lowest effective dose.'],
    ['Aspirin (low-dose 75–150 mg)','✅ Safe from 12 weeks','Pre-eclampsia prophylaxis in high-risk. Stop at 36 weeks.'],
    ['Iron (ferrous sulphate)','✅ Safe','Routine in pregnancy anaemia. Take with vitamin C.'],
    ['Folic acid 5 mg','✅ Safe — Essential','Start preconception. Continue to 12 weeks (high-dose if on anticonvulsants).'],
    ['NSAIDs (ibuprofen)','❌ Avoid 3rd trimester','Premature ductus arteriosus closure. Avoid >28 weeks.'],
    ['Codeine / strong opioids','⚠️ Caution','Neonatal abstinence syndrome if used near term.'],
    ['Amoxicillin','✅ Safe','Standard antibiotic — safe in all trimesters.'],
    ['Ciprofloxacin','⚠️ Avoid if possible','Cartilage concerns in animal studies — use safer alternative.'],
    ['Trimethoprim','⚠️ Avoid 1st trimester','Folate antagonist — avoid in first trimester. OK in 2nd/3rd.'],
    ['Warfarin','❌ AVOID (1st & 3rd trimester)','Embryopathy (1st trimester), bleeding (3rd trimester). Use LMWH.'],
  ].map(function(r){
    var col = r[1].includes('✅')?'#16a34a':r[1].includes('❌')?'#dc2626':'#d97706';
    return '<tr class="tbl-row"><td style="font-weight:700;color:#374151">'+r[0]+'</td><td style="font-weight:700;color:'+col+'">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';
  }).join('')+'</tbody></table></div>'));
}

function tabDrugAntibiotics(el_) {
  el_.appendChild(secTitle('🦠','Empirical Antibiotics Guide','Common infections — first-line agents, doses, and duration. Source: BNF / NICE / WHO AWaRe 2022','#16a34a'));
  el_.appendChild(notebox('⚠️ <strong>Always follow local antimicrobial stewardship guidelines</strong> — sensitivity patterns vary by region. This guide reflects general UK/international empirical recommendations. Send cultures BEFORE antibiotics wherever possible. Review and de-escalate at 48–72 hours once sensitivities known.','#f0fdf4','#bbf7d0'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:14px 0 10px;color:#16a34a">🫁 Respiratory Infections</h3>'));
  el_.appendChild(card('Community-Acquired Pneumonia (CAP)','#16a34a','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Severity</th><th>First-Line</th><th>Penicillin Allergy</th><th>Duration</th><th>Notes</th></tr></thead><tbody>'+[
    ['Mild (CURB-65: 0–1)<br><span style="font-size:11px;color:#64748b">Home treatment</span>','Amoxicillin 500mg–1g PO TDS','Clarithromycin 500mg PO BD<br><i>or</i> Doxycycline 100mg PO OD','5 days','CURB-65: Confusion, Urea >7, RR ≥30, BP <90/60, Age ≥65. Score 2+: admit.'],
    ['Moderate (CURB-65: 2)<br><span style="font-size:11px;color:#64748b">Hospital ward</span>','Amoxicillin 500mg–1g IV/PO TDS + Clarithromycin 500mg PO BD','Clarithromycin 500mg BD + Doxycycline 100mg OD','7 days','Dual therapy covers atypicals (Legionella, Mycoplasma). Switch to oral when afebrile + improved.'],
    ['Severe (CURB-65: 3–5)<br><span style="font-size:11px;color:#64748b">HDU/ICU</span>','Co-amoxiclav 1.2g IV TDS + Clarithromycin 500mg IV/PO BD','Ceftriaxone 2g IV OD + Clarithromycin 500mg BD','10–14 days','Blood cultures × 2 before abx. Legionella + pneumococcal urine antigen. Consider adding antifungal if immunocompromised.'],
    ['HAP / VAP<br><span style="font-size:11px;color:#64748b">Hospital-acquired (>48hr)</span>','Piperacillin-tazobactam 4.5g IV TDS<br><i>or</i> Meropenem 500mg–1g IV TDS if risk of resistant organisms','Discuss with microbiology','7–10 days','MRSA risk: add Vancomycin or Teicoplanin. Always send respiratory sample for culture.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-size:12px">'+r[0]+'</td><td style="font-weight:600;font-size:12px;color:#16a34a">'+r[1]+'</td><td style="font-size:11px;color:#64748b">'+r[2]+'</td><td style="font-weight:700;color:#16a34a;font-size:12px">'+r[3]+'</td><td style="font-size:11px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#0891b2">🚽 Urinary Tract Infections</h3>'));
  el_.appendChild(card('UTI — By Type & Severity','#0891b2','<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Type</th><th>First-Line</th><th>Alternative / Allergy</th><th>Duration</th><th>Notes</th></tr></thead><tbody>'+[
    ['Uncomplicated UTI (women)','Nitrofurantoin 100mg MR PO BD<br><i>or</i> Trimethoprim 200mg PO BD','Cefalexin 500mg PO TDS<br><i>or</i> Pivmecillinam 400mg BD','3 days (Nitrofurantoin)<br>7 days (Trimethoprim)','Avoid Nitrofurantoin if eGFR <30 — use Trimethoprim. Avoid Trimethoprim if risk of resistance or pregnancy (1st trimester).'],
    ['UTI in men','Trimethoprim 200mg PO BD<br><i>or</i> Cefalexin 500mg PO TDS','Ciprofloxacin 500mg PO BD','7 days','Prostatitis suspected: Ciprofloxacin 500mg BD × 28 days (good prostate penetration).'],
    ['Catheter-associated UTI (CAUTI)','Treat only if symptomatic — bacteriuria alone does not require treatment','Co-amoxiclav 625mg PO TDS if E. coli likely','7 days','Change catheter if in situ >7 days. Consider catheter removal.'],
    ['Pyelonephritis (mild — oral)','Ciprofloxacin 500mg PO BD<br><i>or</i> Co-amoxiclav 625mg PO TDS','Cefalexin 500mg PO QDS','7–10 days','Send MSU before antibiotics. Blood cultures if febrile/unwell. IV if vomiting.'],
    ['Pyelonephritis (severe — IV)','Ceftriaxone 1–2g IV OD<br><i>or</i> Co-amoxiclav 1.2g IV TDS','Gentamicin (dose by weight + eGFR)','14 days total','Switch to oral after 48hr afebrile + improving. Ultrasound to exclude obstruction/abscess.'],
    ['UTI in pregnancy','Nitrofurantoin 100mg MR BD (avoid near term)','Cefalexin 500mg TDS','7 days','Trimethoprim: avoid 1st trimester. Avoid Nitrofurantoin near term (neonatal haemolysis). Always send MSU.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-size:12px;font-weight:600">'+r[0]+'</td><td style="font-weight:600;font-size:12px;color:#0891b2">'+r[1]+'</td><td style="font-size:11px;color:#64748b">'+r[2]+'</td><td style="font-weight:700;color:#0891b2;font-size:12px">'+r[3]+'</td><td style="font-size:11px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#ea580c">🦷 Skin, Soft Tissue & Other</h3>'));
  el_.appendChild(card('SSTI, Diabetic Foot, Meningitis, Sepsis Empirical','#ea580c','<div class="tbl-wrap"><table><thead><tr style="background:#fff7ed"><th>Infection</th><th>First-Line</th><th>Notes / Allergy Alternative</th><th>Duration</th></tr></thead><tbody>'+[
    ['Cellulitis / Erysipelas (non-purulent)','Flucloxacillin 500mg–1g PO QDS (mild–mod)<br>Flucloxacillin 1–2g IV QDS (severe)','Clarithromycin 500mg PO/IV BD (pen allergy)','5–7 days (mild); 10–14 days (severe)'],
    ['Purulent SSTI / Abscess','Flucloxacillin 500mg–1g PO QDS<br>Incision & drainage if fluctuant','Co-trimoxazole 960mg BD or Clindamycin 300mg QDS if MRSA risk','5–7 days post-I&D'],
    ['Diabetic foot infection (mild)','Co-amoxiclav 625mg PO TDS','Doxycycline 100mg BD + Metronidazole 400mg TDS','1–2 weeks'],
    ['Diabetic foot infection (severe/deep)','Piperacillin-tazobactam 4.5g IV TDS<br>Add Vancomycin if MRSA risk','Meropenem 1g IV TDS if resistant organisms likely; discuss with microbiology','2–4 weeks (bone involvement: 6 weeks)'],
    ['Bacterial Meningitis (empirical)','Ceftriaxone 2g IV BD (adults)<br>Add Amoxicillin 2g IV 4-hourly if age >55 or immunocompromised (Listeria cover)','Chloramphenicol 25mg/kg IV QDS if beta-lactam allergy (specialist guidance)','10–14 days','Dexamethasone 0.15mg/kg IV QDS × 4 days if bacterial meningitis confirmed or strongly suspected. Give WITH first antibiotic dose.'],
    ['Sepsis (unknown source — empirical)','Piperacillin-tazobactam 4.5g IV TDS<br><i>or</i> Ceftriaxone 2g IV OD + Metronidazole 500mg IV TDS','Meropenem 1g IV TDS (high ESBL risk)','Review at 48–72hr — de-escalate based on cultures'],
    ['C. difficile (mild–moderate)','Metronidazole 400mg PO TDS','Vancomycin 125mg PO QDS if recurrent or severe','10 days (first episode)'],
    ['Infective Endocarditis (empirical — awaiting cultures)','Amoxicillin 2g IV 4-hourly + Gentamicin 3mg/kg IV OD','Vancomycin + Gentamicin (pen allergy)','4–6 weeks — specialist/cardiology guidance essential'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-size:12px;font-weight:700;color:#ea580c">'+r[0]+'</td><td style="font-weight:600;font-size:12px">'+r[1]+'</td><td style="font-size:11px;color:#64748b">'+r[2]+'</td><td style="font-weight:700;color:#ea580c;font-size:11px">'+(r[3]||'')+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(notebox('💊 <strong>Gentamicin dosing:</strong> 5–7mg/kg IV OD (once-daily dosing). Must check levels at 18–24hr post-dose. Avoid if eGFR <20 unless no alternative. Always check allergy status and renal function before prescribing aminoglycosides.','#fffbeb','#fde68a'));
  el_.appendChild(notebox('🔗 <strong>Remember:</strong> SGLT2i → hold before major surgery. Metformin → hold day of contrast. Fluoroquinolones (Ciprofloxacin) → avoid in tendinopathy risk, pregnancy. Gentamicin → renal dose adjustment critical. See Renal Dose Flags in Antihypertensives and Antidiabetics tabs.','#f0f9ff','#bae6fd'));
  el_.appendChild(notebox('🦟 <strong>Antimalarials</strong> have moved to their own dedicated tab — see <strong>🦟 Antimalarials</strong> in the Drug Reference module for full ACT, severe malaria, prophylaxis and pharmacodynamics reference.','#f0fdf4','#bbf7d0'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#16a34a">💊 Expanded Antibiotic & Antifungal Reference</h3>'));
  el_.appendChild(card('Expanded Antibiotics, Antifungals & Antivirals','#16a34a','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Indication</th><th>Adult Dose</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Meropenem','Severe MDR Gram-negative infections, febrile neutropenia, meningitis, peritonitis','1g IV 8-hourly (meningitis: 2g 8-hourly). Infuse over 15–30 min.','Carbapenem — last-resort Gram-negative cover. Reserve for MDR organisms — stewardship critical. Reduces threshold for seizures.'],
    ['Vancomycin IV','MRSA sepsis/bacteraemia, severe C. diff (oral), endocarditis, ventriculitis','15–20 mg/kg IV 8–12-hourly. Max 3g per dose. Load 25–30mg/kg in severe sepsis.','Monitor trough levels (target 15–20 mg/L) or AUC-based dosing. Nephrotoxic — monitor renal function. Infuse slowly (red man syndrome if fast).'],
    ['Clindamycin','Anaerobic infections, SSTI, dental, aspiration pneumonia, bone/joint, toxin-producing Staph','300–450mg PO 6-hourly. 600mg–1.2g IV 6–8-hourly. Max 4.8g/day IV.','⚠️ C. difficile risk — highest of all antibiotics. Cover with Metronidazole or inform patient. Good bone and tissue penetration.'],
    ['Doxycycline','CAP (atypicals), malaria combo, STIs (chlamydia, gonorrhoea), Brucellosis, Rickettsia, SSTI','100mg BD PO. 200mg OD for uncomplicated STI. Malaria combo with Quinine: 100mg BD × 7 days.','Avoid in pregnancy and children <8 years (teeth staining). Take with food — GI upset. Photosensitivity — warn patients. Good tissue penetration.'],
    ['Azithromycin','CAP, typhoid (uncomplicated), STIs, MAC prophylaxis in HIV, atypical infections','500mg OD × 3 days (CAP). 1g single dose (chlamydia). 500mg OD × 7 days (typhoid).','QTc prolongation risk — check ECG if on other QT-prolonging drugs. Excellent tissue concentrations. Long half-life.'],
    ['Fluconazole','Candida (oral, oesophageal, vaginal, bloodstream), Cryptococcal meningitis (consolidation)','Oral/oesophageal candida: 200mg loading, then 100–200mg OD × 7–14 days. Candidaemia: 800mg loading, 400mg OD. Cryptococcal consolidation: 400mg OD × 8 weeks.','CYP2C9 inhibitor — interacts with Warfarin (increases INR), Phenytoin, Statins. Candida krusei and glabrata often resistant.'],
    ['Amphotericin B (liposomal)','Severe invasive fungal infections — Aspergillus, Cryptococcal meningitis (induction), resistant Candida','3–5 mg/kg IV OD. Cryptococcal meningitis induction: 3–4 mg/kg + Flucytosine 25mg/kg QDS × 2 weeks.','Liposomal form (AmBisome) much less nephrotoxic than conventional. Pre-hydrate with 1L saline. Monitor renal function, potassium, magnesium daily.'],
    ['Aciclovir IV','Herpes simplex encephalitis, neonatal herpes, severe varicella/zoster in immunocompromised','HSV encephalitis: 10mg/kg IV 8-hourly × 14–21 days. Neonatal: 20mg/kg 8-hourly. Varicella: 10–15mg/kg 8-hourly.','Renal dose adjustment essential. Adequate hydration critical — precipitates in renal tubules. Oral Aciclovir 400mg 5×/day for mild HSV.'],
    ['Co-trimoxazole (Trimethoprim + Sulfamethoxazole)','PCP prophylaxis/treatment (HIV), Toxoplasmosis, UTI, Nocardia, Stenotrophomonas','PCP prophylaxis: 960mg OD (or 480mg OD or 960mg 3×/week). PCP treatment: 120mg/kg/day in 4 doses × 21 days. UTI: 960mg BD × 7 days.','Folate antagonist — give with Folic acid supplements. Stevens-Johnson syndrome risk. Hyperkalaemia (blocks K+ secretion). Monitor renal function.'],
    ['TB First-Line Regimen (2HRZE / 4HR)','Active tuberculosis — new case pulmonary or extrapulmonary','Intensive phase (2 months): Isoniazid (H) + Rifampicin (R) + Pyrazinamide (Z) + Ethambutol (E) daily. Continuation phase (4 months): Isoniazid + Rifampicin daily.','Dose by weight band. Pyridoxine 25–50mg OD with INH (prevents neuropathy). Monitor LFTs at baseline and 2 weeks. Rifampicin causes orange urine — warn patients. Ethambutol — monitor colour vision.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
}

function tabDrugElectrolytes(el_) {
  el_.appendChild(secTitle('⚡','Electrolyte Management','Hypokalaemia, hyperkalaemia, hyponatraemia, hypomagnesaemia — causes, recognition, and treatment','#0891b2'));
  el_.appendChild(notebox('📌 <strong>Electrolyte abnormalities are common in hypertension and diabetes</strong> — caused by diuretics, ACE inhibitors, SGLT2i, illness, and kidney disease. They can be life-threatening. Check U&E at initiation and after any dose change of antihypertensives or diuretics.','#f0f9ff','#bae6fd'));

  // HYPOKALAEMIA
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:14px 0 10px;color:#d97706">⬇️ Hypokalaemia — K⁺ < 3.5 mEq/L</h3>'));
  el_.appendChild(card('Hypokalaemia — Causes, ECG Changes & Treatment','#d97706','<div style="font-size:13px;color:#374151">'+
    '<div class="g2" style="margin-bottom:14px">'+
      '<div style="padding:12px;background:#fffbeb;border:1px solid #fde68a;border-radius:10px">'+
        '<div style="font-size:12px;font-weight:700;color:#d97706;margin-bottom:8px">COMMON CAUSES</div>'+
        ['💊 Diuretics (thiazides, loop — most common)','🤢 Vomiting / nasogastric suction','💩 Diarrhoea / laxative abuse','💉 Insulin infusion (shifts K⁺ into cells)','🔬 Primary hyperaldosteronism (Conn\'s)','🏃 Refeeding syndrome','💊 Steroids / Cushing syndrome','🧪 Magnesium depletion (worsens K⁺ loss)'].map(function(x){return '<div style="font-size:12px;padding:3px 0">'+x+'</div>';}).join('')+
      '</div>'+
      '<div style="padding:12px;background:#fffbeb;border:1px solid #fde68a;border-radius:10px">'+
        '<div style="font-size:12px;font-weight:700;color:#d97706;margin-bottom:8px">ECG CHANGES (in order of severity)</div>'+
        ['Flattened or inverted T waves','Prominent U waves (after T wave)','ST depression','QT prolongation → Torsades de Pointes risk','Widening of QRS (severe: K⁺ <2.5)','Ventricular fibrillation (K⁺ <2.0)'].map(function(x,i){return '<div style="font-size:12px;padding:3px 0;color:'+(i>=4?'#dc2626':'#374151')+'">→ '+x+'</div>';}).join('')+
      '</div>'+
    '</div>'+
    '<div style="font-weight:700;color:#d97706;margin-bottom:8px">TREATMENT GUIDE</div>'+
    '<div class="tbl-wrap"><table style="width:100%;font-size:12px"><thead><tr style="background:#fffbeb"><th>K⁺ Level</th><th>Severity</th><th>Route</th><th>Replacement Regimen</th><th>Monitor</th></tr></thead><tbody>'+[
      ['3.0–3.5','Mild','Oral','Sando-K 2 tablets TDS (each = 12mmol K⁺) or Slow-K 600mg BD. Dietary K⁺ (banana, orange, potato).','Recheck U&E in 48–72hr'],
      ['2.5–3.0','Moderate','Oral (preferred) or IV','Oral: as above. IV if unable to take orally: KCl 40mmol in 500ml NaCl over 4–6hr via peripheral line.','ECG monitoring. Recheck K⁺ every 4–6hr.'],
      ['< 2.5 or symptomatic','Severe','IV (central/peripheral)','KCl 40mmol in 100–200ml NaCl at ≤40mmol/hr via central line. Peripheral max: 20–40mmol/hr only if no central access.','Continuous cardiac monitoring. Hourly K⁺ until K⁺ >3.0. Replace Mg²⁺ concurrently.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#d97706">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:11px;color:#64748b">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'+
    '<div style="margin-top:10px;padding:10px;background:#fef9c3;border:1px solid #fde047;border-radius:8px;font-size:12px"><strong>⚠️ KEY:</strong> Peripheral IV K⁺ concentration must not exceed 40mmol/L (burns veins). Never give K⁺ as fast IV bolus — cardiac arrest risk. Always replace Mg²⁺ concurrently — hypomagnesaemia causes refractory hypokalaemia.</div>'+
  '</div>'));

  // HYPERKALAEMIA
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">⬆️ Hyperkalaemia — K⁺ > 5.5 mEq/L</h3>'));
  el_.appendChild(card('Hyperkalaemia — ECG Changes & Emergency Treatment','#dc2626','<div style="font-size:13px;color:#374151">'+
    '<div class="g2" style="margin-bottom:12px">'+
      '<div style="padding:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:10px">'+
        '<div style="font-size:12px;font-weight:700;color:#dc2626;margin-bottom:8px">COMMON CAUSES</div>'+
        ['💊 ACE inhibitors / ARBs (most common in clinical setting)','💊 Spironolactone / Eplerenone (K⁺-sparing diuretics)','🫘 CKD / AKI (reduced renal K⁺ excretion)','🩸 Pseudohyperkalaemia (haemolysis during venesection — repeat test)','💉 Insulin deficiency (DKA / hyperglycaemia)','💊 NSAID use in CKD','🔬 Addison\'s disease (adrenal insufficiency)','🩸 Massive blood transfusion / haemolysis'].map(function(x){return '<div style="font-size:12px;padding:3px 0">'+x+'</div>';}).join('')+
      '</div>'+
      '<div style="padding:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:10px">'+
        '<div style="font-size:12px;font-weight:700;color:#dc2626;margin-bottom:8px">ECG CHANGES (in order of severity)</div>'+
        [['Peaked (tall, narrow, symmetric) T waves','#d97706'],['Short QT interval','#d97706'],['Widened PR interval','#ea580c'],['Flattened P waves → P wave loss','#ea580c'],['Wide QRS complex (sine wave pattern)','#dc2626'],['Ventricular fibrillation / Asystole','#7c3aed']].map(function(x){return '<div style="font-size:12px;padding:3px 0;color:'+x[1]+'"><strong>→</strong> '+x[0]+'</div>';}).join('')+
      '</div>'+
    '</div>'+
    '<div style="font-weight:700;color:#dc2626;margin-bottom:8px">TREATMENT — SEQUENTIAL (do all steps)</div>'+
    [
      {n:'1',t:'12-lead ECG immediately',d:'Any ECG changes = cardiac emergency. Continuous monitoring. Confirm on repeat blood sample (exclude pseudohyperkalaemia).'},
      {n:'2',t:'Calcium gluconate 10ml of 10% IV over 2–5 min (if ECG changes)',d:'Cardioprotective — stabilises cardiac membrane. Does NOT lower K⁺. Onset: 2–3 min. Duration: 30–60 min. Repeat every 5 min if ECG changes persist (max 3 doses). Use calcium gluconate, NOT calcium chloride (less caustic if extravasates).'},
      {n:'3',t:'Actrapid (soluble insulin) 10 units IV + 50ml 50% Dextrose',d:'Shifts K⁺ into cells. Onset: 15–30 min. Duration: 4–6 hr. Reduces K⁺ by ~0.6–1.0 mEq/L. Monitor glucose every 30–60 min (hypoglycaemia risk for next 4–6 hours). If glucose already >15 mmol/L: omit dextrose, give insulin alone.'},
      {n:'4',t:'Salbutamol 10–20mg nebulised (or 0.5mg IV)',d:'Beta-2 agonist shifts K⁺ into cells. Additive to insulin. Onset: 15–30 min. Reduces K⁺ by ~0.5–1.0 mEq/L. May cause tachycardia — caution in IHD. Nebulised 10mg is most practical.'},
      {n:'5',t:'Calcium resonium 15g PO/PR (or Patiromer, Sodium zirconium)',d:'Removes K⁺ from body (gut binding). Onset: hours. Constipating — co-prescribe lactulose. Patiromer 8.4g OD and Sodium Zirconium Cyclosilicate 10g TDS are newer, better-tolerated alternatives.'},
      {n:'6',t:'Treat underlying cause',d:'Stop ACEi/ARB/Spironolactone. Review NSAID use. Treat AKI/CKD. Correct acidosis (bicarbonate if pH <7.1 — acidosis shifts K⁺ out of cells). If anuric: urgent nephrology referral for dialysis.'},
    ].map(function(s){return '<div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid #fecaca44;align-items:flex-start"><div style="width:22px;height:22px;border-radius:50%;background:#dc2626;color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+s.n+'</div><div><div style="font-weight:700;color:#dc2626;margin-bottom:2px;font-size:13px">'+s.t+'</div><div style="font-size:12px;line-height:1.6">'+s.d+'</div></div></div>';}).join('')+
  '</div>'));

  // HYPONATRAEMIA
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#7c3aed">🧪 Hyponatraemia — Na⁺ < 135 mEq/L</h3>'));
  el_.appendChild(card('Hyponatraemia — Classification & Management','#7c3aed','<div style="font-size:13px;color:#374151">'+
    '<div class="tbl-wrap"><table style="width:100%;margin-bottom:12px"><thead><tr style="background:#faf5ff"><th>Na⁺ Level</th><th>Severity</th><th>Symptoms</th><th>Urgency</th></tr></thead><tbody>'+[
      ['130–134','Mild','Fatigue, nausea, headache — often asymptomatic','Routine correction over days'],
      ['125–129','Moderate','Confusion, vomiting, dizziness','Correct over 24–48hr'],
      ['< 125','Severe','Seizures, coma, respiratory arrest — medical emergency','Immediate treatment'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#7c3aed">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-weight:700;color:'+([2].indexOf(['130–134','125–129','< 125'].indexOf(r[0]))>=0?'#dc2626':'#d97706')+'">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'+
    '<div class="g2" style="margin-bottom:12px">'+
      '<div style="padding:12px;background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px"><div style="font-size:12px;font-weight:700;color:#7c3aed;margin-bottom:6px">HYPOVOLAEMIC (dehydrated)</div><div style="font-size:12px">Causes: Vomiting, diarrhoea, diuretics, Addison\'s. Signs: dry skin, low BP, tachycardia, reduced JVP.<br><strong>Treat:</strong> IV 0.9% NaCl. Correct rate ≤10mmol/L per 24hr (avoid central pontine myelinolysis).</div></div>'+
      '<div style="padding:12px;background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px"><div style="font-size:12px;font-weight:700;color:#7c3aed;margin-bottom:6px">EUVOLAEMIC — SIADH</div><div style="font-size:12px">Causes: SSRIs, carbamazepine, pain, lung CA, CNS disease. Signs: euvolaemic, concentrated urine.<br><strong>Treat:</strong> Fluid restriction 1–1.5L/day. Treat cause. Tolvaptan (specialist).</div></div>'+
      '<div style="padding:12px;background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px"><div style="font-size:12px;font-weight:700;color:#7c3aed;margin-bottom:6px">HYPERVOLAEMIC (fluid overloaded)</div><div style="font-size:12px">Causes: Heart failure, cirrhosis, nephrotic syndrome. Signs: oedema, raised JVP, ascites.<br><strong>Treat:</strong> Fluid restriction. Treat underlying condition. Loop diuretics.</div></div>'+
      '<div style="padding:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:10px"><div style="font-size:12px;font-weight:700;color:#dc2626;margin-bottom:6px">SEVERE SYMPTOMATIC (seizures/coma)</div><div style="font-size:12px">100ml of 3% (hypertonic) NaCl IV over 10–20 min. Repeat twice if no improvement. Target: raise Na⁺ by 4–6mmol/L in first 6 hours only. Admit to HDU/ICU.</div></div>'+
    '</div>'+
    '<div style="padding:10px;background:#fef9c3;border:1px solid #fde047;border-radius:8px;font-size:12px"><strong>⚠️ NEVER correct Na⁺ faster than 10–12mmol/L in 24 hours</strong> — risk of osmotic demyelination syndrome (central pontine myelinolysis), which causes permanent neurological damage.</div>'+
  '</div>'));

  // HYPOMAGNESAEMIA
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#0891b2">💊 Hypomagnesaemia — Mg²⁺ < 0.7 mmol/L</h3>'));
  el_.appendChild(card('Hypomagnesaemia — Causes & Replacement','#0891b2','<div class="g2">'+
    '<div><div style="font-size:12px;font-weight:700;color:#0891b2;margin-bottom:8px">CAUSES</div>'+
    ['PPIs (long-term — very common)', 'Loop and thiazide diuretics','Diarrhoea / malabsorption','Alcohol excess','Diabetes (renal Mg²⁺ wasting)','Aminoglycosides (Gentamicin)','Hungry bone syndrome (post-parathyroidectomy)'].map(function(x){return '<div style="font-size:12px;padding:3px 0">→ '+x+'</div>';}).join('')+
    '</div>'+
    '<div><div style="font-size:12px;font-weight:700;color:#0891b2;margin-bottom:8px">TREATMENT</div>'+
    '<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #bae6fd55"><strong>Mild (Mg²⁺ 0.5–0.7):</strong> Magnesium glycerophosphate 24mmol PO BD. Magnesium oxide 400mg OD (less GI tolerance).</div>'+
    '<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #bae6fd55"><strong>Moderate–Severe (Mg²⁺ &lt;0.5 or symptomatic):</strong> MgSO₄ 20mmol in 500ml NaCl IV over 1–2 hours. Repeat as needed.</div>'+
    '<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #bae6fd55"><strong>Torsades de Pointes:</strong> MgSO₄ 2g (8mmol) IV over 1–2 min. Then 10mmol/hr infusion.</div>'+
    '<div style="font-size:12px;padding:6px 0;background:#fffbeb;border-radius:6px;margin-top:8px;padding:8px"><strong>Important:</strong> Hypomagnesaemia causes refractory hypokalaemia — always check and replace Mg²⁺ when treating hypokalaemia. Review PPI indication if Mg²⁺ consistently low.</div>'+
    '</div>'+
  '</div>'));
}



// ══════════════════════════════════════════════════════════════
// NEW DRUG TABS — 200 drugs across 4 categories
// ══════════════════════════════════════════════════════════════

function tabDrugAnalgesics(el_) {
  el_.appendChild(secTitle('💊','Analgesics & Pain Management','WHO pain ladder — NSAIDs, opioids, adjuvants, migraine, neuropathic pain','#f43f5e'));
  el_.appendChild(notebox('📌 Follow the WHO analgesic ladder: Non-opioid → Mild opioid → Strong opioid. Always co-prescribe laxatives with opioids. Sources: BNF 2024, WHO Pain Guidelines.','#fff1f2','#fecdd3'));

  el_.appendChild(card('Non-Opioid Analgesics','#f43f5e','<div class="tbl-wrap"><table><thead><tr style="background:#fff1f2"><th>Drug</th><th>Dose</th><th>Max/Day</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Paracetamol','500mg–1g PO/IV','4g (3g if <50kg, elderly, hepatic risk)','Every 4–6h (max 4 doses)','Safest analgesic. Hepatotoxic in overdose. IV no better than oral if gut working.'],
    ['Ibuprofen','200–400mg PO','2400mg (Rx); 1200mg (OTC)','TDS with food','NSAID. Avoid in CKD, peptic ulcer, heart failure, >28wk pregnancy. Give with PPI if >4 weeks.'],
    ['Naproxen','250–500mg PO','1250mg','BD','Longer-acting NSAID. Slightly better CV profile than ibuprofen. Avoid in eGFR <30.'],
    ['Diclofenac','25–50mg PO/IM','150mg','TDS','Potent NSAID. High CV risk — avoid post-MI, HF. Available as topical gel (lower systemic risk).'],
    ['Celecoxib','100–200mg PO','400mg','OD–BD','COX-2 selective — less GI risk. Avoid in sulfonamide allergy. Cardiovascular risk similar to diclofenac.'],
    ['Etoricoxib','30–120mg PO','120mg (acute gout); 60mg (chronic)','OD','COX-2 inhibitor. Avoid in uncontrolled HTN (BP >140/90). Licensed for gout, OA, RA, AS.'],
    ['Ketorolac','10mg PO / 10–30mg IV/IM','90mg IV (max 5 days)','Every 4–6h','Potent NSAID. IV/IM route only for short-term severe pain. Renal and GI risk. Max 5 days.'],
    ['Aspirin (analgesia)','300–600mg PO','4g','Every 4–6h','Weak analgesic. Avoid <16y (Reye\'s syndrome). Anti-platelet at 75mg OD.'],
    ['Metamizole (Dipyrone)','500mg–1g PO/IV','4g','Every 6–8h','Potent analgesic + antipyretic. Agranulocytosis risk — not licensed in UK/US but used in Nigeria, Europe. Monitor FBC.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#f43f5e">'+r[0]+'</td><td>'+r[1]+'</td><td style="color:#dc2626;font-weight:600">'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Opioid Analgesics','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>Dose</th><th>Route</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Codeine','15–60mg','PO','Every 4–6h (max 240mg/day)','Prodrug — 10% converted to morphine. Poor metabolisers (CYP2D6) get no effect. Avoid in renal failure, children <12y.'],
    ['Tramadol','50–100mg','PO/IV/IM','Every 4–6h (max 400mg/day)','Opioid + SNRI mechanism. Lowers seizure threshold. Avoid with SSRIs/MAOIs (serotonin syndrome). Taper to stop.'],
    ['Morphine (oral)','2.5–10mg','PO','Every 4h (titrate)','Gold standard opioid. Reduce dose by 50% in renal failure. Accumulation of M6G metabolite causes toxicity in CKD.'],
    ['Morphine (IV/SC)','1–5mg','IV/SC','Every 2–4h PRN or PCA','Titrate to pain. Have naloxone ready. Monitor RR >12/min.'],
    ['Oxycodone','5mg','PO','Every 4–6h','More bioavailable than morphine (oral). Twice as potent. Lower histamine release. Modified-release: OxyContin.'],
    ['Fentanyl patch','12–100mcg/hr','Transdermal','Every 72h','For stable chronic pain only — NOT for acute or opioid-naive patients. Onset 12–24h, offset 24–72h after removal.'],
    ['Fentanyl IV','1–2mcg/kg','IV bolus','PRN or infusion','Ultra-short acting. Use for procedural sedation, ICU, PCA. No renal dose adjustment needed.'],
    ['Buprenorphine','200–400mcg','SL','Every 6–8h','Partial agonist — ceiling analgesic effect. Used in chronic pain + opioid dependence (Suboxone). Difficult to reverse with naloxone — use high doses.'],
    ['Pethidine (Meperidine)','25–100mg','IM/IV','Every 3–4h (max 400mg/day)','Metabolite norpethidine causes seizures in renal failure. Avoid prolonged use. Avoid with MAOIs.'],
    ['Naloxone','0.4mg','IV/IM/SC/IN','Repeat every 2–3 min PRN (max 10mg)','Opioid reversal agent. Short acting (30–90 min) — may need repeat dosing or infusion. Does not reverse buprenorphine well.'],
    ['Tapentadol','50–100mg','PO','Every 4–6h (max 700mg day 1, 600mg thereafter)','Opioid + noradrenaline reuptake inhibitor. Less constipation and nausea than oxycodone.'],
    ['Hydromorphone','1–2mg','PO','Every 4h','5x more potent than morphine. Good alternative in renal failure (fewer active metabolites). IV: 0.2–1mg.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#dc2626">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Neuropathic Pain Agents','#8b5cf6','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Starting Dose</th><th>Max Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Amitriptyline','10mg nocte','75mg nocte','OD (at night)','First-line neuropathic pain. Low-dose — analgesic not antidepressant effect. Sedating — give at night. Anticholinergic SE.'],
    ['Duloxetine','30mg','120mg','OD–BD','First-line for diabetic neuropathy and fibromyalgia. SNRI — also treats comorbid depression. Taper to stop (discontinuation syndrome).'],
    ['Gabapentin','100–300mg nocte','3600mg/day','TDS','Anticonvulsant. For neuropathic pain, postherpetic neuralgia. Titrate slowly. Dizziness + sedation. Controlled drug (UK).'],
    ['Pregabalin','25–75mg','600mg/day','BD','Similar to gabapentin. Licensed for neuropathic pain, fibromyalgia, anxiety. Faster onset than gabapentin. Controlled drug.'],
    ['Capsaicin cream 0.075%','Apply thinly','N/A','TDS–QDS','Topical. Depletes substance P. Burning sensation for first 2–4 weeks — warn patient. For localised neuropathic pain.'],
    ['Capsaicin 8% patch','One application (clinic)','4 patches/application','Every 3 months','High-concentration. Applied by trained staff for 30–60 min. Licensed for HIV neuropathy + post-herpetic neuralgia.'],
    ['Lidocaine 5% patch','1–3 patches','3 patches/24h','12h on, 12h off','For localised post-herpetic neuralgia. Minimal systemic absorption. Up to 3 patches over painful area.'],
    ['Carbamazepine','100mg BD','1200mg/day','BD–QDS','First-line for trigeminal neuralgia. Many drug interactions (enzyme inducer). HLA-B*1502 screen before starting (Asian patients — Stevens-Johnson risk).'],
    ['Oxcarbazepine','300mg BD','2400mg/day','BD','Fewer interactions than carbamazepine. Hyponatraemia risk. Alternative for trigeminal neuralgia.'],
    ['Ketamine (low-dose)','0.1–0.5mg/kg/h','0.5mg/kg/h infusion','IV infusion','NMDA antagonist. For complex neuropathic / cancer pain, opioid-resistant pain. Specialist use. Dissociative SE.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#8b5cf6">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Migraine & Headache','#f97316','<div class="tbl-wrap"><table><thead><tr style="background:#fff7ed"><th>Drug</th><th>Dose</th><th>Route</th><th>Notes</th></tr></thead><tbody>'+[
    ['Sumatriptan','50–100mg PO / 6mg SC / 20mg nasal','PO/SC/IN','First-line triptan. Onset 30min PO, 10min SC. Avoid in CVD, uncontrolled HTN, basilar migraine.'],
    ['Rizatriptan','10mg PO (5mg with propranolol)','PO','Wafer (Maxalt Melt) dissolves on tongue — useful with nausea. Faster onset than sumatriptan oral.'],
    ['Zolmitriptan','2.5–5mg PO or nasal','PO/IN','Available as nasal spray — useful if vomiting. Good evidence for menstrual migraine.'],
    ['Eletriptan','20–40mg PO','PO','Highest oral bioavailability of triptans. More potent — use if sumatriptan fails.'],
    ['Metoclopramide','10mg PO/IV/IM','PO/IV/IM','Antiemetic + prokinetic (enhances paracetamol absorption). Give with analgesia for migraine.'],
    ['Propranolol (prophylaxis)','40–80mg BD–TDS','PO','First-line migraine prevention. Avoid in asthma. Also used in anxiety. Maximum 240mg/day.'],
    ['Topiramate (prophylaxis)','25mg → up to 100mg','PO','Effective migraine prophylaxis. SE: cognitive slowing ("dopamax"), kidney stones, teratogenic (contraindicated in pregnancy).'],
    ['Amitriptyline (prophylaxis)','10–75mg nocte','PO','Useful if comorbid insomnia/depression. Effective for tension headache too.'],
    ['Sodium valproate (prophylaxis)','200–600mg BD','PO','Highly teratogenic — never use in women of childbearing age without pregnancy prevention programme (PREVENT).'],
    ['Erenumab (CGRP mAb)','70–140mg SC','SC monthly','Monoclonal antibody targeting CGRP receptor. Specialist initiation. Highly effective preventive. For ≥4 migraine days/month.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#f97316">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
}

// ────────────────────────────────────────────────────────────
function tabDrugRespGI(el_) {
  el_.appendChild(secTitle('🫁','Respiratory & GI Drugs','Asthma, COPD, antiemetics, GI motility, PPI, IBD, antivirals','#10b981'));
  el_.appendChild(notebox('📌 Covers inhalers, bronchodilators, GI drugs and selected antivirals. Sources: BNF 2024, NICE, GINA 2024, BSG guidelines.','#f0fdf4','#bbf7d0'));

  el_.appendChild(card('Respiratory — Inhalers & Bronchodilators','#10b981','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Class</th><th>Dose / Device</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Salbutamol (Ventolin)','SABA','100–200mcg MDI; 2.5–5mg neb','PRN (rescue) / QDS regular','First-line acute bronchospasm. Short acting (4–6h). Excessive use = poor control — step up therapy.'],
    ['Terbutaline (Bricanyl)','SABA','0.5mg SC/IM (acute) / Turbuhaler 0.5mg','PRN','Alternative SABA — Turbuhaler device. SC route for severe acute asthma.'],
    ['Ipratropium (Atrovent)','SAMA','20–40mcg MDI / 0.5mg neb','TDS–QDS','Short-acting antimuscarinic. Add to SABA in acute severe asthma (first 3 nebs). Used in COPD.'],
    ['Tiotropium (Spiriva)','LAMA','18mcg Handihaler / 2.5mcg Respimat','OD','Long-acting antimuscarinic. First-line COPD maintenance. Reduces exacerbations. Dry mouth common.'],
    ['Umeclidinium','LAMA','62.5mcg Ellipta','OD','Once daily LAMA. Used in combination inhalers (e.g., Anoro with vilanterol).'],
    ['Salmeterol (Serevent)','LABA','25–50mcg MDI / Accuhaler','BD','Long-acting — 12h. Never use as monotherapy in asthma (must combine with ICS). For COPD.'],
    ['Formoterol (Atimos)','LABA','6–12mcg Turbuhaler / Breezhaler','BD (or MART PRN in asthma)','Fast-onset LABA — can be used as reliever in MART regime. Suitable for COPD and asthma.'],
    ['Indacaterol (Onbrez)','LABA','150–300mcg Breezhaler','OD','Once-daily LABA. For COPD only. Cough on inhalation common but resolves.'],
    ['Beclometasone (Clenil)','ICS','100–400mcg MDI','BD','Moderate-potency ICS. First-line asthma controller. Rinse mouth after use (oral candidiasis).'],
    ['Fluticasone (Flixotide)','ICS','100–500mcg Accuhaler / MDI','BD','High-potency ICS. Twice daily. More systemic absorption than beclometasone at equivalent doses.'],
    ['Budesonide (Pulmicort)','ICS','200–800mcg Turbuhaler','BD (or OD for maintenance)','Good safety profile in pregnancy. Used in MART regime with formoterol.'],
    ['Seretide (Flu/Salm)','ICS+LABA combo','50/100–500/50mcg Accuhaler / MDI','BD','Fixed-dose combo. Do not use as reliever. Step up in asthma if ICS alone insufficient.'],
    ['Symbicort (Bud/Form)','ICS+LABA combo','100/6–400/12mcg Turbuhaler','BD (or MART)','MART regime: 1–2 puffs BD maintenance + PRN relief (max 8 puffs/day). Reduces exacerbations.'],
    ['Montelukast (Singulair)','LTRA','10mg PO','OD at night','Leukotriene receptor antagonist. Add-on in asthma. Good for exercise-induced, allergic rhinitis. Neuropsychiatric SE (depression, suicidality — warn patient).'],
    ['Theophylline','Methylxanthine','200–400mg modified-release PO','BD','Narrow therapeutic index (target 10–20mg/L). Many interactions. Bronchodilator + anti-inflammatory. Monitor levels.'],
    ['Roflumilast (Daxas)','PDE4 inhibitor','500mcg PO','OD','For severe COPD with chronic bronchitis + frequent exacerbations. Anti-inflammatory (not bronchodilator). Nausea, weight loss, depression — common SE.'],
    ['Prednisolone (systemic)','Corticosteroid','30–40mg PO','OD for 5–7 days','Acute asthma and COPD exacerbation. No taper needed if <3 weeks course. Monitor glucose in DM.'],
    ['Aminophylline IV','Methylxanthine','5mg/kg loading over 20 min → 0.5mg/kg/h','IV infusion','ICU/HDU. Avoid loading dose if on theophylline (risk of toxicity). Narrow TI — check levels.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#10b981">'+r[0]+'</td><td style="font-size:12px;color:#6b7280">'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('GI — Antiemetics','#f59e0b','<div class="tbl-wrap"><table><thead><tr style="background:#fffbeb"><th>Drug</th><th>Dose</th><th>Route</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Ondansetron','4–8mg','PO/IV/IM','BD–TDS (max 32mg/day IV)','5-HT3 antagonist. First-line in chemotherapy, post-op nausea. QT prolongation — avoid IV rapid bolus. Constipation common.'],
    ['Metoclopramide','10mg','PO/IV/IM','TDS (max 5 days)','D2 antagonist + prokinetic. Contraindicated in bowel obstruction. Extrapyramidal SE (dystonia, akathisia) — esp. <20y and elderly. Max 5 days.'],
    ['Domperidone','10mg PO','PO only','TDS before meals (max 30mg/day)','Prokinetic. Does not cross BBB — less CNS SE. QT prolongation — avoid in cardiac disease. Use lowest effective dose.'],
    ['Prochlorperazine (Stemetil)','5–10mg PO / 12.5mg IM','PO/IM/buccal','TDS','Phenothiazine. Labyrinthine disorders and vertigo. Buccal (Buccastem) useful when vomiting. Extrapyramidal SE.'],
    ['Cyclizine','50mg','PO/IV/IM','TDS','Antihistamine antiemetic. Good for opioid-induced nausea, motion sickness. Sedating. Avoid in heart failure (tachycardia).'],
    ['Promethazine (Phenergan)','25mg','PO/IM','OD–BD','Antihistamine + antidopaminergic. Motion sickness, morning sickness. Very sedating.'],
    ['Hyoscine (Scopolamine)','0.3mg SL / patch 1.5mg','SL/patch','Patch every 72h / SL PRN','Anticholinergic. Motion sickness. Patch behind ear. Dry mouth, blurred vision, urinary retention.'],
    ['Aprepitant (Emend)','125mg day 1, 80mg days 2–3','PO','OD as part of regimen','NK1 receptor antagonist. Used with ondansetron + dexamethasone for highly emetogenic chemo. Inhibits CYP3A4.'],
    ['Dexamethasone (antiemetic)','8–16mg IV before chemo; 4mg BD PO','PO/IV','As per protocol','Potentiates other antiemetics. Used in chemo-induced and post-op nausea. Monitor glucose in DM.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#f59e0b">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('GI — Acid Suppression & GI Motility','#06b6d4','<div class="tbl-wrap"><table><thead><tr style="background:#ecfeff"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Omeprazole','20–40mg PO / 40mg IV','OD (BD for severe GORD / H. pylori)','First-line PPI. Long-term use: hypomagnesaemia, B12 deficiency, C. diff risk, fracture risk. Check indication regularly.'],
    ['Lansoprazole','15–30mg PO','OD','Can be dispersed in water — useful NG tube. Capsules can be opened.'],
    ['Pantoprazole','20–40mg PO / 40–80mg IV','OD (IV BD for GI bleeding)','IV PPI preferred for upper GI bleeding. Less CYP2C19 interaction than omeprazole.'],
    ['Esomeprazole','20–40mg PO','OD','Slightly superior acid suppression at higher doses. Used in Barrett\'s oesophagus.'],
    ['Ranitidine','150mg PO / 50mg IV','BD PO / TDS IV','H2 blocker. Less potent than PPI. Used when PPI not tolerated. Withdrawn from markets due to NDMA contamination — check local availability.'],
    ['Famotidine','20–40mg PO','OD–BD','H2 blocker. More potent than ranitidine. Used for dyspepsia, stress ulcer prophylaxis.'],
    ['Sucralfate','1g PO','QDS (1 hour before meals)','Mucosal protectant. Binds to ulcer base. Reduces absorption of other drugs — separate by 2h. Constipation common.'],
    ['Misoprostol','200mcg PO','QDS with NSAIDs','PGE1 analogue — gastric cytoprotective. Used to prevent NSAID-induced ulcers. Causes diarrhoea. Contraindicated in pregnancy (cervical ripening / abortion risk).'],
    ['Lactulose','15–30ml PO','BD–TDS (titrate to effect)','Osmotic laxative. For constipation and hepatic encephalopathy. Bloating and flatulence common. Onset 48h.'],
    ['Macrogol (Movicol)','1–8 sachets/day','OD–QDS','Osmotic laxative. Preferred in elderly. Well tolerated. Each sachet = 125ml fluid. Good for faecal impaction.'],
    ['Senna','15–30mg PO','OD at night','Stimulant laxative. Co-prescribe with opioids. Onset 8–12h. Cramps — reduce dose.'],
    ['Loperamide','4mg loading then 2mg after each stool','PO (max 16mg/day)','Antimotility for diarrhoea. Not for infectious bloody diarrhoea. Do not use in IBD flare.'],
    ['Buscopan (Hyoscine butylbromide)','20mg IV / 10mg PO','TDS–QDS PO / repeat IV PRN','Antispasmodic. IBS, renal colic, palliative care for secretions. Anticholinergic SE.'],
    ['Mesalazine (5-ASA)','400–800mg PO / suppositories','TDS (PO) / OD–BD (suppository)','First-line for mild–moderate UC. Reduces relapse risk. Oral for extensive disease, suppository for proctitis.'],
    ['Infliximab','5mg/kg IV at 0, 2, 6 weeks → 8-weekly','IV infusion','Anti-TNFα for IBD, RA, psoriasis. Screen for TB + HBV before starting. Risk of serious infections, reactivation.'],
    ['Azathioprine','1–2.5mg/kg PO','OD','Immunosuppressant for IBD, autoimmune disease. Check TPMT before starting (thiopurine methyltransferase). Myelosuppression, hepatotoxicity — monitor FBC/LFTs.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#06b6d4">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Antivirals & Antifungals','#7c3aed','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Indication</th><th>Dose</th><th>Duration</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Aciclovir','HSV / VZV (oral)','200–800mg PO 5x daily / 5mg/kg IV TDS','5–10 days (10–14 days IV)','IV for encephalitis, disseminated, immunocompromised. Renally cleared — reduce dose in CKD. Hydrate well IV.'],
    ['Valaciclovir','HSV / VZV (oral)','500mg–1g BD–TDS PO','3–7 days (shingles: 7 days)','Prodrug of aciclovir — better bioavailability. Once or twice daily dosing. Renal dose reduction needed.'],
    ['Famciclovir','HSV / VZV','250–500mg TDS PO','5–7 days','Similar to valaciclovir. Good tissue distribution. Renal dose reduction needed.'],
    ['Oseltamivir (Tamiflu)','Influenza A + B','75mg BD PO','5 days (10 days if immunocompromised)','Start within 48h of symptom onset. Reduces duration by ~1 day. Renal dose reduction needed. Neuropsychiatric SE (rarely).'],
    ['Ganciclovir','CMV (IV induction)','5mg/kg BD IV','14–21 days induction, then maintenance','For CMV retinitis, colitis (immunocompromised). Myelosuppressive — monitor FBC. Oral form: valganciclovir.'],
    ['Valganciclovir','CMV (oral)','900mg BD PO','As per protocol','Oral prodrug of ganciclovir. For CMV prevention in transplant, and maintenance treatment.'],
    ['Fluconazole','Candida (non-CNS)','50–400mg PO/IV','Varies by site (7–14 days oral thrush; 14+ days systemic)','First-line for mucosal and invasive candida. CYP2C9/3A4 inhibitor — many interactions (warfarin, statins). QT prolongation.'],
    ['Itraconazole','Aspergillus / dermatophyte / Candida','100–200mg BD PO','Varies by indication','Negative inotrope — avoid in heart failure. Multiple drug interactions. Take with food (acid-dependent absorption).'],
    ['Voriconazole','Invasive Aspergillus','6mg/kg BD IV (loading) → 4mg/kg BD / 200–300mg PO BD','6–12 weeks','First-line for invasive aspergillosis. Visual disturbances, photosensitivity, hepatotoxicity. Monitor trough levels. Many interactions.'],
    ['Amphotericin B (liposomal)','Severe invasive fungal','3–5mg/kg OD IV','Varies by indication','Broad spectrum — for Cryptococcus, Aspergillus, Candida. Nephrotoxic — monitor creatinine daily. Rigors — premedicate with paracetamol.'],
    ['Nystatin','Oral / GI candidiasis','100,000 units QDS PO (suspension)','7–14 days','Not absorbed — topical gut action only. Used for oral thrush and GI candidiasis. No systemic activity.'],
    ['Terbinafine','Dermatophyte (onychomycosis)','250mg PO OD','6 weeks (fingernail) / 12 weeks (toenail)','Fungicidal for dermatophytes. LFTs before starting if prolonged course. Hepatotoxicity risk. Check liver enzymes.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#7c3aed">'+r[0]+'</td><td style="font-size:12px;color:#6b7280">'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#10b981">➕ Additional Resp & GI Drugs</h3>'));
  el_.appendChild(card('Additional Respiratory & GI Drug Reference','#10b981','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Indication</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
    ['Prednisolone (oral)','Asthma exacerbation, COPD exacerbation, inflammatory conditions, autoimmune, allergic reactions','Asthma/COPD: 30–40mg OD × 5–7 days. Inflammatory: 0.5–1mg/kg/day, taper over weeks.','No need to taper for short courses (<3 weeks). Long-term: bone protection (Alendronate + Calcium + Vit D), PPI cover, DM monitoring, BP monitoring.'],
    ['N-Acetylcysteine (NAC)','Paracetamol overdose (MOST IMPORTANT indication), mucolytic in COPD/bronchiectasis','Paracetamol OD (IV): 150mg/kg in 200ml 5% dextrose over 1h, then 50mg/kg over 4h, then 100mg/kg over 16h. Mucolytic: 200mg TDS PO.','Start NAC immediately in significant paracetamol OD — do not wait for levels if >4h post-ingestion. Plot on paracetamol treatment nomogram.'],
    ['Loperamide','Acute and chronic diarrhoea, ileostomy fluid loss control','4mg initially, then 2mg after each loose stool. Max 16mg/day. OTC: max 8mg/day.','Do NOT use in dysentery (bloody diarrhoea with fever) — risk of toxic megacolon. Avoid in children <12 years. Do not use if C. diff suspected.'],
    ['Oral Rehydration Salts (ORS)','Dehydration from diarrhoea/vomiting — mild to moderate, cholera, any cause','WHO ORS: 200–400ml after each loose stool (adult). Children: 50–100ml/kg over 3–4h for mild dehydration. Severe dehydration with shock: IV fluids first.','Preferred over IV fluids in mild-moderate dehydration — equally effective, safer. Glucose-salt ratio critical for sodium-glucose cotransporter absorption. Homemade: 6 level tsp sugar + 0.5 tsp salt in 1L clean water.'],
    ['Lactulose','Hepatic encephalopathy, constipation','Hepatic encephalopathy: 30–50ml TDS–QDS PO — titrate to 2–3 soft stools/day. Constipation: 15ml BD, adjusted.','Target 2–3 soft stools/day in hepatic encephalopathy (acidifies colon, traps ammonium). Can cause bloating and flatulence — warn patients. Onset 24–48h.'],
    ['Rifaximin','Hepatic encephalopathy (secondary prophylaxis), traveller\'s diarrhoea','Hepatic encephalopathy: 550mg BD PO. Traveller\'s diarrhoea: 200mg TDS × 3 days.','Non-absorbable antibiotic — acts in gut lumen only. Reduces gut ammonia-producing bacteria. Use with Lactulose for hepatic encephalopathy. Expensive but effective.'],
    ['Sucralfate','Peptic ulcer (mucosal protection), stress ulcer prophylaxis, oesophagitis','1g QDS PO on empty stomach (30 min before meals and at bedtime). Duration 4–8 weeks.','Aluminum-based — binds to ulcer base forming protective coat. Do NOT give with antacids (neutralises). Constipation common. Avoid in renal failure (aluminium accumulation).'],
    ['Misoprostol','PPH prevention (where Oxytocin unavailable), gastric protection with NSAIDs, cervical ripening','PPH: 600 mcg sublingual stat after delivery. NSAID cover: 200 mcg QDS with food. Cervical ripening: 25 mcg vaginally.','Prostaglandin E1 analogue. Cheap, heat-stable, no refrigeration — critical advantage in Nigeria. Side effects: diarrhoea, abdominal cramps, fever (especially sublingual). Contraindicated in asthma (relative).'],
    ['Famotidine (H2 blocker)','Peptic ulcer, GORD, stress ulcer prophylaxis, Zollinger-Ellison','20mg BD PO (ulcer). 20mg OD (prophylaxis). 20mg BD IV for inpatients unable to take oral.','H2 blockers less potent than PPIs but useful when PPI not available or tolerated. Famotidine preferred over Ranitidine (withdrawn globally due to NDMA contamination). Renal dose adjustment needed.'],
    ['Nystatin (oral suspension)','Oral candidiasis (thrush), oesophageal candidiasis (mild), prophylaxis in immunocompromised','100,000 units QDS — hold in mouth and swish before swallowing. Continue 48h after clinical resolution. Duration 7–14 days.','Topical antifungal — not absorbed systemically. Use Fluconazole for moderate-severe or oesophageal candidiasis. Nystatin taste is unpleasant — warn patients.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#10b981;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
}

// ────────────────────────────────────────────────────────────
function tabDrugCardioEndocrine(el_) {
  el_.appendChild(secTitle('❤️','Cardiology, Lipids & Endocrine','Anticoagulants, antiplatelets, antiarrhythmics, lipid-lowering, thyroid, steroids, bone','#e11d48'));
  el_.appendChild(notebox('📌 Anticoagulants require careful monitoring and reversal planning. Lipid-lowering therapy reduces CV mortality. Sources: BNF 2024, ESC 2023, NICE guidelines.','#fff1f2','#fecdd3'));

  el_.appendChild(card('Anticoagulants','#e11d48','<div class="tbl-wrap"><table><thead><tr style="background:#fff1f2"><th>Drug</th><th>Dose</th><th>Route</th><th>Monitoring</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Warfarin','Individualised — start 5–10mg','PO daily','INR (target 2–3 standard; 2.5–3.5 mechanical valves)','Vitamin K antagonist. INR at initiation and stable 12-weekly. Multiple food + drug interactions. Reversal: Vit K, PCC (Beriplex), FFP.'],
    ['Apixaban','2.5–5mg BD','PO','None routinely required','Factor Xa inhibitor. 5mg BD standard (AF, VTE). 2.5mg BD if ≥2 of: age≥80, weight≤60kg, creatinine≥133. Reversal: Andexanet alfa.'],
    ['Rivaroxaban','10–20mg OD (AF/VTE)','PO with evening meal','None routinely required','Factor Xa inhibitor. Take with food — increases absorption. Once daily — good adherence. Reversal: Andexanet alfa.'],
    ['Dabigatran','110–150mg BD','PO','Renal function (renal clearance 80%)','Direct thrombin inhibitor. Avoid if eGFR <30. Dyspepsia common — take with food. Reversal: Idarucizumab (Praxbind).'],
    ['Edoxaban','30–60mg OD','PO','None routinely required','Factor Xa inhibitor. 30mg if ≥1 of: eGFR 15–50, weight≤60kg, concurrent P-gp inhibitors. Reversal: Andexanet alfa.'],
    ['Enoxaparin (LMWH)','1mg/kg SC BD (therapeutic) / 40mg OD SC (prophylaxis)','SC','Anti-Xa levels if renally impaired, obese, or pregnant','Low molecular weight heparin. Preferred in pregnancy and cancer-associated VTE. Reversal: Protamine (partial).'],
    ['Unfractionated Heparin','5000 units SC BD–TDS (prophylaxis) / 80 units/kg bolus → 18 units/kg/h IV','SC / IV infusion','APTT (therapeutic target 1.5–2.5x normal)','For PE treatment, ACS, cardiac surgery. Rapid reversal with protamine. Heparin-induced thrombocytopenia (HIT) — check platelets every 2–3 days.'],
    ['Fondaparinux','2.5mg SC OD (prophylaxis) / 5–10mg OD SC (treatment)','SC','None routinely','Factor Xa inhibitor. No HIT risk. Avoid in eGFR <20. No reversal agent (protamine ineffective).'],
    ['Dalteparin','2500–5000 units SC OD (prophylaxis) / 100–200 units/kg OD SC (treatment)','SC','Anti-Xa if needed','LMWH. Preferred in cancer-associated VTE (CLOT trial). Once daily therapeutic option.'],
    ['Alteplase (tPA)','Stroke: 0.9mg/kg IV (max 90mg); PE: 100mg over 2h','IV infusion','Clinical response, bleeding signs','Thrombolysis. For ischaemic stroke (<4.5h), massive PE, STEMI (if PCI unavailable). High bleeding risk — contraindications must be checked.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#e11d48">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px;color:#6b7280">'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Antiplatelets','#f97316','<div class="tbl-wrap"><table><thead><tr style="background:#fff7ed"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Aspirin','75mg (antiplatelet) / 300mg loading','PO OD','COX-1 inhibitor — irreversible platelet inhibition. Lifelong post-ACS/stroke. Loading 300mg then 75mg. GI bleed risk — give with PPI if high risk.'],
    ['Clopidogrel','75mg (maintenance) / 300–600mg loading','PO OD','ADP receptor blocker. Prodrug — CYP2C19 dependent. 10–15% poor metabolisers (reduced effect). Use with aspirin post-ACS (DAPT).'],
    ['Ticagrelor','90mg BD (acute) / 60mg BD (extended)','PO BD','Direct P2Y12 inhibitor — not a prodrug. Faster, more consistent effect than clopidogrel. Dyspnoea side effect (usually resolves). Avoid with strong CYP3A4 inhibitors.'],
    ['Prasugrel','10mg (60mg loading) / 5mg if >75y or <60kg','PO OD','Potent P2Y12 inhibitor. Superior to clopidogrel in TRITON trial. Increased bleeding risk. Avoid if prior TIA/stroke.'],
    ['Dipyridamole','200mg MR BD','PO BD (modified release)','Phosphodiesterase inhibitor — used with aspirin for secondary stroke prevention (ESPS-2). Headache common (dilates cerebral vessels) — often improves. Avoid in aortic stenosis.'],
    ['Cilostazol','100mg BD','PO BD','PDE3 inhibitor — peripheral arterial disease (PAD) for intermittent claudication. Improves walking distance. Avoid in heart failure.'],
    ['Eptifibatide','180mcg/kg bolus → 2mcg/kg/min infusion','IV','GPIIb/IIIa antagonist. ACS and PCI. Short-acting. Thrombocytopenia risk.'],
    ['Tirofiban','25mcg/kg over 3 min → 0.15mcg/kg/min','IV','GPIIb/IIIa antagonist. ACS. Monitor platelets 6h after start, then daily.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#f97316">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Antiarrhythmics','#0ea5e9','<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Drug</th><th>Class</th><th>Dose</th><th>Route</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Adenosine','Misc','6mg → 12mg → 12mg rapid IV bolus','IV (fast push)','SVT termination. Very short half-life (10s). Warn patient: chest tightness, flushing, sense of doom (brief). Avoid in asthma, WPW.'],
    ['Amiodarone','III','200mg TDS × 1wk → BD × 1wk → OD maintenance / 300mg IV bolus','PO/IV','Broad spectrum. Thyroid dysfunction (hypo + hyper), pulmonary toxicity, photosensitivity, corneal deposits, hepatotoxicity. Monitor TFTs, LFTs, CXR.'],
    ['Digoxin','Cardiac glycoside','62.5–250mcg PO / 0.75–1mg IV loading (over 2h)','PO/IV','AF rate control + positive inotrope. Narrow TI — check levels (0.5–2 mcg/L). Toxicity: nausea, yellow vision, AV block. Reduced dose in CKD, elderly.'],
    ['Flecainide','Ic','50–150mg BD PO / 2mg/kg IV over 10min','PO/IV','SVT + AF cardioversion/prevention. CONTRAINDICATED post-MI, structural heart disease (CAST trial). QRS widening.'],
    ['Sotalol','II+III','40–160mg BD','PO','Beta-blocker + class III. For AF, VT prevention. QT prolongation — monitor QTc before starting. Torsades risk. Renal dose reduction.'],
    ['Lidocaine','Ib','1–1.5mg/kg IV bolus → 1–4mg/min infusion','IV','VT/VF refractory to defibrillation. Second-line to amiodarone in ALS. Also used as local anaesthetic.'],
    ['Verapamil','IV','2.5–5mg IV over 2 min (may repeat)','IV','Rate control in SVT. NEVER in pre-excited AF (WPW) — risk of VF. Never combine with beta-blockers IV.'],
    ['Atropine','Misc','0.5–1mg IV (max 3mg)','IV','First-line for sinus bradycardia, AV node block. Dose <0.5mg may worsen bradycardia (paradoxical). May not work in complete heart block (pacing needed).'],
    ['Isoprenaline','Beta-1/2 agonist','0.5–10mcg/min IV infusion','IV','Chronotropic. Bridge to pacing in bradyarrhythmias. Tachycardia, arrhythmia risk.'],
    ['Dronedarone','III','400mg BD','PO BD with meals','AF prevention in paroxysmal/persistent AF (not permanent AF). Contraindicated in HF, severe LV dysfunction (ANDROMEDA). Less toxic than amiodarone.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9">'+r[0]+'</td><td style="font-size:12px;color:#6b7280">'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Lipid-Lowering Agents','#16a34a','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Atorvastatin','10–80mg','OD (any time)','High-intensity statin (80mg reduces LDL ~50%). First-line for CV risk reduction. Myopathy risk — check CK if muscle pain. Check LFTs at baseline.'],
    ['Rosuvastatin','5–40mg','OD','Most potent statin (40mg reduces LDL ~55%). Less CYP3A4 interaction. Check renal function (partly renally cleared). Asian patients — lower starting dose.'],
    ['Simvastatin','10–80mg','OD at night','Take at night (peak hepatic cholesterol synthesis). Avoid simvastatin 80mg (myopathy risk). Many CYP3A4 interactions — avoid with amiodarone, diltiazem.'],
    ['Pravastatin','10–40mg','OD','Least drug interactions (not CYP3A4 metabolised). Good choice with transplant medications. Renally cleared.'],
    ['Fluvastatin','20–80mg MR','OD','Moderate intensity. Fewer interactions. Lower myopathy risk.'],
    ['Ezetimibe','10mg','OD','Cholesterol absorption inhibitor. Reduces LDL ~18% as monotherapy; ~25% added to statin. Well tolerated. Use when statin alone insufficient or intolerant.'],
    ['Alirocumab (Praluent)','75–150mg SC','Every 2 weeks','PCSK9 inhibitor. Reduces LDL by 50–60% ON TOP of statin. Very high CV risk or familial hypercholesterolaemia. Injection site reactions.'],
    ['Evolocumab (Repatha)','140mg SC q2wk / 420mg SC monthly','SC','PCSK9 inhibitor. Reduces LDL ~60%. FOURIER trial: significant CV event reduction. Specialist initiation.'],
    ['Inclisiran','284mg SC','At baseline, 3 months, then every 6 months','siRNA therapy — reduces PCSK9 synthesis. 50% LDL reduction. Twice-yearly dosing — excellent adherence. NHS specialist initiation.'],
    ['Fenofibrate','67–200mg PO','OD with food','Fibrate. Reduces triglycerides, modestly increases HDL. For hypertriglyceridaemia (TG >10 = pancreatitis risk). Myopathy if combined with statin.'],
    ['Omega-3 (Icosapent ethyl)','2g BD','PO BD with food','Highly purified EPA. REDUCE-IT trial: significant reduction in CV events in statin-treated patients with elevated TG. Atrial fibrillation risk.'],
    ['Colestyramine','4g','OD–QDS (titrate)','Bile acid sequestrant. Reduces LDL. Very GI poorly tolerated (bloating, constipation). Reduces absorption of other drugs — separate by 4–6h. First-line in pregnancy (not absorbed).'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Thyroid & Endocrine Drugs','#a855f7','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Levothyroxine (T4)','25–200mcg PO','OD (30–60 min before food)','Hypothyroidism. Start low in elderly/cardiac. Titrate every 6–8 weeks by TSH. Many interactions — take separately. Hyperthyroid symptoms if over-replaced.'],
    ['Liothyronine (T3)','5–20mcg PO','BD–TDS','For myxoedema coma (IV), or T3-supplementation in refractory hypothyroidism. Short half-life. Use with caution in cardiac disease.'],
    ['Carbimazole','15–40mg PO (divided)','TDS (titrate to euthyroid then OD)','For hyperthyroidism (Graves, toxic goitre). Agranulocytosis (0.5%) — stop immediately if sore throat/fever + check WBC. Teratogenic.'],
    ['Propylthiouracil (PTU)','100–150mg PO','TDS','Preferred in 1st trimester pregnancy and thyroid storm. Hepatotoxicity risk — use shortest duration. Also inhibits T4→T3 conversion.'],
    ['Propranolol (thyroid storm)','40–80mg PO / 1–5mg IV','Every 4–6h','Blocks adrenergic symptoms (tachycardia, tremor, agitation). Also inhibits T4→T3 conversion at high doses.'],
    ['Lugol\'s Iodine','0.1–0.3ml PO TDS (5–7 drops of strong iodine solution)','TDS (for 10 days pre-op)','Reduces thyroid vascularity before surgery. Also used in thyroid storm (given AFTER antithyroid drug).'],
    ['Desmopressin (DDAVP)','10–40mcg intranasally / 0.1–0.4mg PO / 0.3mcg/kg IV','OD–BD (nasal) / BD–TDS (oral)','Synthetic ADH analogue. For diabetes insipidus, nocturnal enuresis, haemophilia A (boosts vWF). Hyponatraemia risk — restrict fluids.'],
    ['Hydrocortisone','20–30mg/day PO (physiological) / 100mg IV QDS (stress/crisis)','BD–TDS PO / QDS IV','Adrenal insufficiency replacement. Double/triple dose during illness ("sick day rules"). Stress dosing: 100mg IV QDS for major surgery/illness.'],
    ['Fludrocortisone','50–300mcg PO','OD','Mineralocorticoid. For Addison\'s disease (with hydrocortisone). Also used in orthostatic hypotension. Monitor BP and electrolytes.'],
    ['Octreotide','50–200mcg SC TDS / 25–50mcg/h IV','SC TDS or IV infusion','Somatostatin analogue. Acromegaly, carcinoid syndrome, variceal bleeding, VIPoma. Glucose effects (hypo and hyper). Gallstones with long-term use.'],
    ['Cabergoline','0.5–2mg PW','Once or twice weekly','Dopamine agonist. First-line for prolactinoma. Restores fertility, shrinks tumour. SE: nausea, valvulopathy at high doses (Parkinson\'s doses).'],
    ['Bromocriptine','1.25–30mg PO','BD–TDS','Dopamine agonist. Prolactinoma, acromegaly, type 2 DM (Cycloset). Nausea, hypotension — start low, take at night with food.'],
    ['Tolvaptan','15–60mg PO','OD (not overnight — risk of rapid Na correction)','Vasopressin V2 receptor antagonist. For euvolaemic / hypervolaemic hyponatraemia (SIADH, HF, cirrhosis). Specialist initiation. Hepatotoxicity.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#a855f7">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Corticosteroids & Bone Drugs','#78350f','<div class="tbl-wrap"><table><thead><tr style="background:#fef3c7"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Prednisolone','5–60mg PO','OD morning','Oral corticosteroid. Anti-inflammatory + immunosuppressant. Long-term SE: osteoporosis, diabetes, Cushing\'s, adrenal suppression, cataracts, avascular necrosis.'],
    ['Dexamethasone','0.5–10mg PO/IV','OD–BD','More potent than prednisolone (~7x). Less mineralocorticoid activity. For cerebral oedema, croup, antiemetic, COVID-19 (RECOVERY trial 6mg OD × 10 days).'],
    ['Methylprednisolone','1g IV OD × 3 days (pulsed)','OD IV (pulse) / varies PO','For multiple sclerosis relapse, acute rejection, severe vasculitis. High-dose pulse therapy.'],
    ['Alendronate','70mg weekly / 10mg daily','Weekly PO (30 min before food, standing)','Bisphosphonate. First-line osteoporosis. Must be taken with water, stay upright 30 min (oesophageal ulceration risk). Osteonecrosis of jaw (rare). Dental check before.'],
    ['Risedronate','35mg weekly / 150mg monthly','Weekly or monthly PO','Bisphosphonate. Similar to alendronate but potentially less GI SE.'],
    ['Zoledronic acid','5mg IV once yearly','Annual IV infusion (over 15–30 min)','Bisphosphonate. Annual infusion — excellent adherence. SE: flu-like reaction (1st dose). Pre-hydrate well. Renal function must be adequate (eGFR >35).'],
    ['Denosumab (Prolia)','60mg SC every 6 months','SC every 6 months','RANK-L inhibitor. For postmenopausal osteoporosis, cancer bone metastases (120mg monthly). Rebound fracture risk on stopping — must transition to bisphosphonate.'],
    ['Calcium + Vit D (Adcal-D3)','1200–1500mg Ca²⁺ + 400–800 IU Vit D3','BD PO','Co-prescribed with bisphosphonates. Also for Vit D deficiency, hypoparathyroidism. Separate from bisphosphonate by 2h.'],
    ['Alfacalcidol (1α-hydroxyvitamin D)','0.25–1mcg PO','OD','Active Vit D analogue. For hypoparathyroidism, CKD (impaired 1-alpha hydroxylation). Monitor Ca²⁺ (hypercalcaemia risk).'],
    ['Teriparatide (Forsteo)','20mcg SC daily','OD SC','Recombinant PTH. Anabolic — builds new bone. For severe osteoporosis with fractures. Max 24 months lifetime use. Expensive — specialist initiation.'],
    ['Raloxifene','60mg PO','OD','SERM. Reduces vertebral fracture risk in postmenopausal women. No uterine stimulation. Increases DVT risk. Does not improve hip fracture — not first-line.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#78350f">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // ARVs
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#7c3aed">💊 Antiretrovirals (ARVs) — Common Regimens & Interactions</h3>'));
  el_.appendChild(notebox('📌 Nigeria has the 2nd largest HIV burden globally (~1.9 million people on ART). ARV interactions with common ward drugs are clinically significant. Always check interactions before adding any new drug to a patient on ARVs. <strong>Do not stop ARVs during admission</strong> — treatment interruption causes viral rebound and immune deterioration.','#faf5ff','#e9d5ff'));
  el_.appendChild(card('Common ARV Regimens in Nigeria (FMOH 2021 Guidelines)','#7c3aed','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Line</th><th>Regimen</th><th>Components</th><th>Key Side Effects</th></tr></thead><tbody>'+[
    ['First-line (preferred)','TLD','Tenofovir (TDF) 300mg + Lamivudine (3TC) 300mg + Dolutegravir (DTG) 50mg — OD fixed-dose','Weight gain, insomnia, headache. Minimal interactions. Safe in most co-morbidities.'],
    ['First-line (alternative)','TLE','Tenofovir (TDF) 300mg + Lamivudine (3TC) 300mg + Efavirenz (EFV) 600mg — OD fixed-dose','Neuropsychiatric effects (vivid dreams, dizziness — usually resolve in 2-4 weeks). CYP3A4 inducer — many drug interactions.'],
    ['Second-line','ATV/r or LPV/r + 2 NRTIs','Atazanavir/ritonavir 300/100mg OD OR Lopinavir/ritonavir 400/100mg BD + backbone NRTIs','GI side effects, hepatotoxicity, metabolic syndrome, QTc prolongation. Potent CYP3A4 inhibitor — many serious interactions.'],
    ['Third-line','DTG-based or Darunavir/r','Individualised based on resistance testing — specialist-guided','Complex regimens — refer to HIV specialist'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;color:#7c3aed;font-size:12px">'+r[0]+'</td><td style="font-size:12px;font-weight:700">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#dc2626">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
  el_.appendChild(card('ARV — Critical Drug Interactions on the Ward','#7c3aed','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Ward Drug</th><th>ARV Interaction</th><th>Effect</th><th>Action</th></tr></thead><tbody>'+[
    ['Rifampicin (TB treatment)','Efavirenz, Dolutegravir, all PIs','Rifampicin is a potent CYP inducer — dramatically reduces ARV levels','EFV dose increase to 800mg with Rifampicin. DTG 50mg BD (not OD). PIs contraindicated with Rifampicin — switch regimen. Consult HIV/TB specialist.'],
    ['Fluconazole (antifungal)','Ritonavir-boosted PIs','Increased Fluconazole levels — QTc prolongation risk','Limit Fluconazole dose. ECG monitoring. Avoid high-dose Fluconazole with PIs.'],
    ['Methadone (opioid substitution)','Efavirenz, Nevirapine, PIs','Reduced Methadone levels — withdrawal symptoms','Increase Methadone dose. Monitor for withdrawal.'],
    ['Warfarin','Efavirenz (inducer), Ritonavir (inhibitor)','EFV reduces INR. Ritonavir increases INR unpredictably','Frequent INR monitoring when starting/stopping ARVs. Dose adjust accordingly.'],
    ['Statins','Ritonavir / Lopinavir (PIs)','Markedly increased statin levels — rhabdomyolysis risk','Use Rosuvastatin ≤10mg or Pravastatin. Avoid Simvastatin and Atorvastatin >20mg with PIs.'],
    ['Metformin','Dolutegravir (DTG)','DTG slightly increases Metformin levels via OCT2 inhibition','Generally clinically manageable — monitor renal function. No dose change usually needed.'],
    ['Antacids (PPIs, H2 blockers)','Atazanavir, Rilpivirine','Reduced ARV absorption — antacids raise gastric pH','Take Atazanavir 2h before or 10h after antacid. Rilpivirine requires food and low-dose antacids only.'],
    ['Paracetamol','All ARVs (generally safe)','No significant interaction','Paracetamol is the PREFERRED analgesic in HIV patients on ARVs. NSAIDs have renal risk with TDF.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600;color:#7c3aed;font-size:12px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px;color:#dc2626">'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#e11d48">➕ Additional Cardio & Endocrine Drugs</h3>'));
  el_.appendChild(card('Additional Cardio & Endocrine Drug Reference','#e11d48','<div class="tbl-wrap"><table><thead><tr style="background:#fff1f2"><th>Drug</th><th>Indication</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
    ['Hydrocortisone IV','Adrenal crisis, severe asthma (adjunct), anaphylaxis, physiological stress cover','Adrenal crisis: 100mg IV bolus, then 50–100mg 6-hourly. Asthma: 100–200mg IV 6-hourly. Anaphylaxis: 200mg IV.','Replace with oral Prednisolone when stable. Taper slowly after prolonged use. Cover surgical patients on long-term steroids.'],
    ['Fludrocortisone','Primary adrenal insufficiency (Addison\'s), postural hypotension with autonomic failure','50–200 mcg OD PO. Adjust based on BP, electrolytes, symptoms of over/under replacement.','Mineralocorticoid — retains sodium and water. Monitor BP and potassium. Dose increases in hot weather (increased sweating = sodium loss).'],
    ['Levothyroxine (T4)','Hypothyroidism, myxoedema coma','50 mcg OD PO (elderly/cardiac: start 25 mcg). Titrate by 25 mcg every 4–6 weeks. Myxoedema coma: 200–500 mcg IV loading via NG/IV.','Take on empty stomach 30 min before food. TSH normalises in 6–8 weeks. Start low in elderly and cardiac disease — risk of angina/AF.'],
    ['Carbimazole','Hyperthyroidism (Graves\' disease, toxic nodular goitre)','Initial: 20–60 mg OD PO (depending on severity). Maintenance: 5–15 mg OD once euthyroid.','Monitor FBC — agranulocytosis (rare but fatal). Warn: sore throat/fever → stop immediately and check WBC. Crosses placenta — use PTU in first trimester.'],
    ['Propylthiouracil (PTU)','Thyroid storm, first trimester pregnancy, Carbimazole intolerance','200–400mg 6–8-hourly PO (thyroid storm). Maintenance: 50–150mg TDS. Switch to Carbimazole after first trimester.','Preferred in pregnancy (first trimester) and thyroid storm (blocks T4→T3 conversion). Hepatotoxicity risk with prolonged use.'],
    ['GTN (Glyceryl Trinitrate)','Angina (acute and prophylaxis), acute LVF, hypertensive emergency with chest pain','Spray: 400 mcg sublingually, repeat after 5 min (max 3 doses). Infusion: 10–200 mcg/min IV titrated. Patch: 5–10 mg/24hr (remove at night).','Headache (common — usually transient). Tolerance develops with continuous use — ensure nitrate-free period with patches. Avoid with PDE5 inhibitors (Sildenafil etc.) — severe hypotension.'],
    ['Ivabradine','Heart failure with reduced EF (HFrEF) + sinus rhythm + HR ≥70, chronic stable angina','5mg BD PO initially. Titrate to 7.5mg BD after 2 weeks if tolerated. Target HR 55–60 bpm.','Pure heart rate reduction — no negative inotropy. Avoid in AF, sick sinus, heart block. Visual side effects (phosphenes — flickering lights). Add-on to beta-blocker in HF.'],
    ['Sacubitril/Valsartan (Entresto)','HFrEF (LVEF ≤40%) — replacing ACE inhibitor/ARB, symptomatic on optimal therapy','49/51mg BD increasing to 97/103mg BD over 6–12 weeks. Start low, titrate.','Wash out ACE inhibitor for 36 hours before starting (angioedema risk). Monitor BP (hypotension common initially), renal function, potassium. PARADIGM-HF trial: 20% mortality reduction vs Enalapril.'],
    ['Ezetimibe','Hypercholesterolaemia — add-on to statin or statin-intolerant','10mg OD PO regardless of food.','Blocks intestinal cholesterol absorption. Reduces LDL by ~15–20% additional to statin. Safe, well-tolerated. Use when statin alone insufficient or statin-intolerant.'],
    ['Desmopressin (DDAVP)','Cranial diabetes insipidus, nocturnal enuresis, mild haemophilia A, von Willebrand disease type 1','DI: 100–400 mcg OD intranasal or 0.1–0.4 mg PO TDS. Haemophilia: 0.3 mcg/kg IV/SC over 15–30 min. Enuresis: 200–400 mcg PO at bedtime.','Monitor serum sodium — risk of hyponatraemia especially in children and elderly. Fluid restriction during treatment. Duration of action 8–24h.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#e11d48;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));
}

// ────────────────────────────────────────────────────────────
function tabDrugNeuroMSK(el_) {
  el_.appendChild(secTitle('🧠','Neurology, MSK & Miscellaneous','Epilepsy, Parkinson\'s, antihistamines, antimalarials, gout, rheumatology, dermatology, antibiotics (expanded)','#6366f1'));
  el_.appendChild(notebox('📌 Includes antiepileptics, Parkinson\'s drugs, antihistamines, gout, rheumatology, antimalarials and extended antibiotics. Sources: BNF 2024, NICE, WHO.','#eef2ff','#c7d2fe'));

  el_.appendChild(card('Antiepileptics','#6366f1','<div class="tbl-wrap"><table><thead><tr style="background:#eef2ff"><th>Drug</th><th>Indication</th><th>Starting Dose</th><th>Max Dose</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Levetiracetam','Focal ± generalised seizures','250mg BD','3000mg/day','Broad-spectrum. Few drug interactions. Can cause mood changes/irritability (psychiatric SE). Renal dose reduction.'],
    ['Sodium Valproate','Generalised epilepsy, absence, myoclonic','200–300mg BD','2500mg/day','Highly teratogenic (PREVENT programme). Monitor LFTs + FBC. Weight gain, tremor, hair loss, pancreatitis. Multiple interactions.'],
    ['Lamotrigine','Focal + generalised, bipolar','25mg OD (increase slowly)','500mg/day','Titrate very slowly (rash/Stevens-Johnson if increased too fast). Interacts with valproate (double lamotrigine levels). Good in women of childbearing age.'],
    ['Phenytoin','Focal + generalised, status epilepticus','100–300mg PO/IV (titrate)','600mg/day','Non-linear kinetics — small dose changes cause large level changes. Gingival hyperplasia, ataxia, nystagmus, hirsutism. Inducer (many interactions). Fosphenytoin IV preferred.'],
    ['Carbamazepine','Focal seizures, trigeminal neuralgia, bipolar','100–200mg BD (titrate)','2000mg/day','Enzyme inducer (many interactions). HLA-B*1502 (Asian patients — SJS risk). Hyponatraemia, ataxia, diplopia. Teratogenic. Auto-induction (increases own metabolism).'],
    ['Topiramate','Focal + generalised, migraine prevention','25mg OD (increase weekly)','500mg/day','Cognitive slowing ("dopamax"), kidney stones, metabolic acidosis, glaucoma. Weight loss. Teratogenic.'],
    ['Zonisamide','Focal ± generalised','100mg OD','500mg/day','Broad spectrum. Sulfonamide derivative — avoid in sulfonamide allergy. Kidney stones, oligohidrosis (reduced sweating) especially in children.'],
    ['Clobazam','Adjunct focal + generalised','5–15mg nocte','60mg/day','Benzodiazepine. Second-line adjunct. Sedating. Tolerance develops with chronic use.'],
    ['Clonazepam','Absence, myoclonic, status','0.5mg nocte','20mg/day','Benzodiazepine. Long half-life (18–60h). For intractable epilepsy and acute seizures. Tolerance common.'],
    ['Ethosuximide','Absence seizures only','500mg OD','2000mg/day','Specific for absence seizures — not effective for other types. GI SE (take with food). Headache, nausea.'],
    ['Perampanel','Focal + generalised (adjunct)','2mg nocte','12mg nocte','AMPA receptor antagonist. Weekly titration. Dizziness, aggression, psychiatric SE. Controlled drug (Schedule 3).'],
    ['Brivaracetam','Focal seizures (adjunct)','50mg BD','200mg/day','Levetiracetam analogue. Higher affinity for SV2A. Fewer psychiatric SE than levetiracetam. Can be started without titration.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#6366f1">'+r[0]+'</td><td style="font-size:12px;color:#6b7280">'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Parkinson\'s Disease Drugs','#8b5cf6','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Levodopa + Carbidopa (Sinemet)','62.5–250mg PO (levodopa component)','TDS–QDS (titrate)','First-line — most effective. Carbidopa prevents peripheral conversion. Dyskinesia + wearing-off with long use. Never stop abruptly (NMS risk).'],
    ['Levodopa + Benserazide (Madopar)','50–200mg (levodopa) PO','TDS–QDS','Alternative formulation. Dispersible Madopar for rapid onset (swallowing difficulty, morning akinesia).'],
    ['Pramipexole','0.088–3.3mg PO','TDS (immediate) / OD (prolonged release)','Dopamine agonist. Can be first-line in younger patients. Impulse control disorders (gambling, hypersexuality) — warn patients. Somnolence, hallucinations.'],
    ['Ropinirole','0.25–8mg PO','TDS (immediate) / OD (extended release)','Dopamine agonist. Same SE profile as pramipexole. Titrate slowly. Sustained release once daily improves adherence.'],
    ['Rotigotine patch','2–16mg/24h','OD (change daily)','Dopamine agonist patch. Continuous delivery — fewer fluctuations. Site reactions. Store in fridge.'],
    ['Entacapone','200mg with each levodopa dose','PO with each levodopa','COMT inhibitor — reduces levodopa breakdown. Reduces wearing-off fluctuations. Orange urine — warn patient. Diarrhoea.'],
    ['Rasagiline','1mg PO','OD','MAO-B inhibitor. Mild symptomatic benefit. Possible neuroprotective effect. Few drug interactions. Avoid tyramine-rich foods at higher doses.'],
    ['Selegiline','5–10mg PO','OD–BD (give morning — stimulant — insomnia if given PM)','MAO-B inhibitor. Metabolised to amphetamine — insomnia, anxiety. Avoid with pethidine, SSRIs.'],
    ['Amantadine','100mg BD–TDS','BD–TDS','Antiviral with dopaminergic + NMDA antagonist effect. For dyskinesia in advanced PD. Livedo reticularis, ankle oedema, confusion in elderly.'],
    ['Apomorphine','1–6mg SC PRN (rescue) / 1–7mg/h SC infusion','SC (pen or pump)','Potent dopamine agonist. Rescue for sudden "off" periods. SC pump for severe fluctuations. Severe nausea — pre-treat with domperidone (NOT metoclopramide/prochlorperazine — block dopamine).'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#8b5cf6">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Gout, Rheumatology & MSK','#0891b2','<div class="tbl-wrap"><table><thead><tr style="background:#ecfeff"><th>Drug</th><th>Indication</th><th>Dose</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Allopurinol','Chronic gout (urate lowering)','100mg OD → titrate','Start 2–4 weeks AFTER acute attack resolves. Target urate <360 µmol/L. HLA-B*5801 (Asian/African patients) — SJS risk. Rash — stop immediately.'],
    ['Febuxostat','Gout (alternative to allopurinol)','80–120mg OD','Non-purine xanthine oxidase inhibitor. Use when allopurinol not tolerated or eGFR <30. CV event risk — monitor cardiac history.'],
    ['Colchicine','Acute gout','500mcg BD–QDS (max 6mg per course)','First-line acute gout (if NSAID contraindicated). Diarrhoea, nausea (dose-limiting). Do not repeat within 3 days. Reduce dose in CKD.'],
    ['Probenecid','Gout (uricosuric)','250mg BD → 500mg BD','Reduces renal urate reabsorption. Avoid in urate kidney stones, eGFR <30. Ensure high fluid intake.'],
    ['Methotrexate','RA, psoriasis, psoriatic arthritis','7.5–25mg weekly PO/SC','Weekly dosing (daily = fatal). Folic acid 5mg once weekly (not same day). Monitor FBC + LFTs monthly. Hepatotoxic. Teratogenic. Avoid alcohol.'],
    ['Hydroxychloroquine','RA, SLE, antimalarial','200–400mg OD PO','Retinal toxicity (cumulative dose >5mg/kg/year) — annual ophthalmology review. Safer in pregnancy than other DMARDs. Long half-life (months).'],
    ['Sulfasalazine','RA, IBD','500mg BD → 1g BD–TDS','Monitor FBC. Orange urine/body fluids. Sperm abnormalities (reversible). Avoid in sulfonamide allergy.'],
    ['Leflunomide','RA','20mg OD (10mg if poorly tolerated)','Hepatotoxic — monitor LFTs. Teratogenic — washout required (cholestyramine) before conception. Drug remains in body for months.'],
    ['Abatacept','RA (biologic)','500–1000mg IV monthly / 125mg SC weekly','CTLA4-Ig — T-cell costimulation blocker. Screen for TB + infections. Avoid live vaccines.'],
    ['Tocilizumab','RA, cytokine storm (COVID)','4–8mg/kg IV monthly / 162mg SC weekly','IL-6 receptor antagonist. Raises LDL. Neutropenia, hepatotoxicity. Masks fever (reduced CRP) — monitor for infections clinically.'],
    ['Chloroquine','Malaria (prevention/treatment)','250–500mg PO weekly (prevention)','P. falciparum increasingly resistant. Still used for P. vivax, P. malariae. Retinopathy at high cumulative doses. QT prolongation.'],
    ['Artemether-Lumefantrine (Coartem)','Malaria (falciparum)','4 tablets BD × 3 days PO (adult)','First-line for uncomplicated P. falciparum. Take with food (fat improves absorption). QT prolongation.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0891b2">'+r[0]+'</td><td style="font-size:12px;color:#6b7280">'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Antihistamines, Sedatives & Misc','#d97706','<div class="tbl-wrap"><table><thead><tr style="background:#fffbeb"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Notes</th></tr></thead><tbody>'+[
    ['Cetirizine','10mg PO','OD','Non-sedating H1 antihistamine. For allergic rhinitis, urticaria. May cause mild drowsiness. Once daily.'],
    ['Loratadine','10mg PO','OD','Non-sedating. Pregnancy category B — considered relatively safe. No food interaction.'],
    ['Fexofenadine','120–180mg PO','OD','Non-sedating. Less CNS penetration. No anti-cholinergic effects. Avoid with grapefruit juice (reduces levels).'],
    ['Chlorphenamine (Piriton)','4mg PO / 10–20mg IV/IM','Every 4–6h PO / IV PRN (anaphylaxis)','1st-generation (sedating). Used for anaphylaxis, itch, pre-medication. IV for acute allergic reactions with adrenaline.'],
    ['Promethazine','25–50mg PO / 25mg IM','OD–BD','1st gen. Sedating — used for insomnia, motion sickness, pre-medication. Anticholinergic.'],
    ['Diphenhydramine (Benadryl)','25–50mg PO','Every 4–6h (max 300mg/day)','Sedating antihistamine. Used for itch, insomnia, motion sickness. Anticholinergic — avoid in elderly (Beers list).'],
    ['Zolpidem','5–10mg PO','OD nocte','Z-drug (non-benzodiazepine). Short-term insomnia. Short half-life — onset 30min. Rebound insomnia on stopping. Falls risk.'],
    ['Zopiclone','3.75–7.5mg PO','OD nocte','Z-drug. Slightly longer than zolpidem. Metallic taste common. Dependence risk. Halve dose in elderly.'],
    ['Melatonin','2mg MR PO','OD (1–2h before sleep)','Circadian rhythm modulator. Licensed in UK for short-term insomnia >55y. No dependence. Jet lag (0.5–5mg).'],
    ['Haloperidol (delirium)','0.25–1mg PO/IM','BD–TDS (max 5mg/day for delirium)','For delirium in elderly. Start very low. QT prolongation — monitor ECG. Extrapyramidal SE.'],
    ['Quetiapine (low dose)','12.5–50mg PO','OD–BD nocte','Off-label for delirium, insomnia, agitation. Sedating. Metabolic SE (weight gain, DM risk). Fall risk.'],
    ['Dexamethasone (anti-oedema)','4–8mg PO/IV','BD–QDS','For cerebral oedema (tumour/surgery). NOT for stroke (harmful). 16mg/day max for severe oedema. High glucose — monitor in DM.'],
    ['N-Acetylcysteine (NAC)','PO: 140mg/kg loading → 70mg/kg 4-hrly × 17 doses / IV: 150mg/kg in 200ml over 1h → 50mg/kg over 4h → 100mg/kg over 16h','PO or IV (per protocol)','Paracetamol overdose antidote. Must be started within 24h (ideally <8h). IV preferred if vomiting. Also used in acute liver failure, N-acetylcysteine nebulised for cystic fibrosis.'],
    ['Vitamin K (Phytomenadione)','1–10mg PO/IV (slow)','PRN / OD','Warfarin reversal. Slow IV (risk of anaphylaxis if fast IV). Oral effective for non-urgent reversal. IV 5mg corrects INR within 6–8h.'],
    ['Thiamine (Vit B1)','Pabrinex 1+2 pair IV TDS × 3–5 days / 100mg PO TDS','IV or PO','For Wernicke\'s encephalopathy (alcohol, malnutrition). Give IV BEFORE glucose in alcohol-related emergency (glucose depletes thiamine → precipitates Wernicke\'s).'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#d97706">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(card('Extended Antibiotics Reference','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>Class</th><th>Adult Dose</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Benzylpenicillin (Pen G)','Penicillin','1.2g IV QDS (meningitis: 2.4g QDS)','IV only. For meningococcal disease, severe cellulitis, actinomycosis. Check penicillin allergy. Give IM if unable to get IV access (meningococcal suspect, community).'],
    ['Flucloxacillin','Penicillinase-resistant penicillin','500mg–2g QDS PO/IV','Take 30min before food (absorption reduced by food). For MSSA, cellulitis, bone/joint infection. Give 4x daily — adherence challenging.'],
    ['Piperacillin-Tazobactam (Tazocin)','Extended spectrum penicillin + β-lactamase inhibitor','4.5g TDS–QDS IV','Broad spectrum. For severe sepsis, hospital-acquired pneumonia, complicated abdominal infections. Covers Pseudomonas (TDS/QDS).'],
    ['Co-amoxiclav (Augmentin)','Amoxicillin + clavulanate','625mg TDS PO / 1.2g TDS IV','Cholestatic jaundice risk (especially in older men, prolonged use). Do not repeat course within 1 month if previous jaundice.'],
    ['Meropenem','Carbapenem','0.5–2g TDS IV','Broadest spectrum β-lactam. For multidrug-resistant organisms, severe hospital infections. Reserve — avoid overuse. Lowers seizure threshold slightly.'],
    ['Ertapenem','Carbapenem','1g OD IV','Once daily — good for outpatient IV therapy. Does NOT cover Pseudomonas or Acinetobacter.'],
    ['Doxycycline','Tetracycline','100–200mg PO OD–BD','For atypical pneumonia, Chlamydia, malaria prophylaxis, Lyme disease, MRSA soft tissue infection. Photosensitivity. Avoid with dairy (30 min separation), antacids. Avoid in children <8y + pregnancy.'],
    ['Azithromycin','Macrolide','500mg OD × 3 days / 1g stat (STI)','Atypical pneumonia, Chlamydia, MAC in HIV. Long tissue half-life (1 week). QT prolongation. Growing macrolide resistance.'],
    ['Clarithromycin','Macrolide','250–500mg BD PO / 500mg BD IV','For H. pylori (triple therapy), atypical pneumonia. CYP3A4 inhibitor — many interactions. QT prolongation. Metallic taste.'],
    ['Clindamycin','Lincosamide','150–450mg QDS PO / 600mg–1.2g QDS IV','Bone/joint infections, oral infections, aspiration pneumonia, toxin-producing streptococci. C. diff risk. Excellent bone penetration.'],
    ['Vancomycin','Glycopeptide','15–20mg/kg IV BD–QDS (target trough 10–20mg/L or AUC/MIC)','For MRSA, severe C. diff (PO). Nephrotoxic — monitor creatinine and trough levels. Red man syndrome (slow infusion — over 60+ min).'],
    ['Teicoplanin','Glycopeptide','400–800mg IV/IM OD (loading 400mg BD × 3 doses)','Once or twice daily — easier than vancomycin. Bone/joint and endocarditis. Less nephrotoxic. Trough levels target >10mg/L (>15 for endocarditis).'],
    ['Linezolid','Oxazolidinone','600mg BD PO/IV','For MRSA, VRE, resistant organisms. MAO inhibitor — serotonin syndrome with SSRIs, sympathomimetics. Myelosuppression (>2 weeks). Optic neuropathy. Thrombocytopenia.'],
    ['Daptomycin','Lipopeptide','4–10mg/kg OD IV','For MRSA (not pneumonia — inactivated by surfactant). Bactericidal for Gram-positive organisms. CK monitoring — myopathy risk.'],
    ['Rifampicin','Rifamycin','600mg OD–BD PO','For TB, Staph. biofilm infections (adjunct), meningococcal prophylaxis. Potent enzyme inducer — turns urine/tears/saliva orange. Contraceptive pill failure. Never use as monotherapy.'],
    ['Nitrofurantoin','Nitrofuran','50–100mg QDS (immediate release) / 100mg BD MR','Lower UTI only (does not achieve therapeutic tissue levels). Avoid if eGFR <30 (ineffective + toxicity). Pulmonary fibrosis with long-term use.'],
    ['Fosfomycin','Phosphonic acid','3g PO stat (uncomplicated UTI) / 6g IV TDS (complicated)','Single-dose oral for uncomplicated UTI in women. IV for complicated UTIs. Sodium load with IV form. Minimal resistance mechanisms to date.'],
    ['Fidaxomicin','Macrocyclic antibiotic','200mg BD PO × 10 days','For C. difficile infection — superior to metronidazole, similar to vancomycin for recurrence prevention. Minimal systemic absorption. Preferred for recurrent C. diff.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#dc2626">'+r[0]+'</td><td style="font-size:11px;color:#6b7280">'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#6366f1">➕ Additional Neuro, MSK & Haematinics</h3>'));
  el_.appendChild(card('Additional Neuro, MSK & Haematinic Drug Reference','#6366f1','<div class="tbl-wrap"><table><thead><tr style="background:#eef2ff"><th>Drug</th><th>Indication</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
    ['Sumatriptan','Acute migraine with or without aura, cluster headache','50–100mg PO at onset (max 300mg/24h). Nasal spray: 10–20mg. Subcutaneous: 6mg SC (fastest onset, cluster headache).','Triptan — 5HT1B/1D agonist. Take at onset for best effect. Avoid in: uncontrolled HTN, coronary artery disease, stroke/TIA. Do not combine with MAOIs or other triptans.'],
    ['Propranolol','Migraine prophylaxis, essential tremor, thyrotoxicosis, anxiety (situational), portal HTN','Migraine prophylaxis: 40–120mg BD. Tremor: 40mg BD–TDS. Thyrotoxicosis: 40mg QDS.','Non-selective beta-blocker. Avoid in asthma, COPD, heart block, decompensated heart failure. Useful for thyroid storm (blocks peripheral T4→T3). Does not prevent migraine aura.'],
    ['Baclofen','Spasticity (MS, spinal cord injury, stroke, cerebral palsy)','Start 5mg TDS PO. Increase by 5mg every 3 days. Max 80mg/day. Intrathecal pump for severe cases.','Abrupt withdrawal causes severe rebound spasticity and seizures — NEVER stop suddenly. Causes sedation and weakness — start low. Dose-dependent side effects.'],
    ['Diazepam','Acute alcohol withdrawal, muscle spasm, status epilepticus (PR/IV), procedural sedation, acute anxiety','Alcohol withdrawal: 10–20mg PO/IV, repeat 4-hourly. Muscle spasm: 2–10mg TDS PO. Status: 10mg IV/PR (adult).','Benzodiazepine — high dependence potential, tolerance develops. Do NOT use long-term for anxiety. Fixed-dose reducing schedule for alcohol withdrawal (CIWA protocol). Respiratory depression with opioids.'],
    ['Haloperidol (low dose)','Acute delirium (non-sedating), nausea/vomiting (antiemetic), acute psychosis','Delirium: 0.5–2mg PO/IM (elderly: 0.25–0.5mg). Antiemetic: 0.5–1mg PO/IV. Acute psychosis: 5–10mg IM.','D2 antagonist. EPS (extrapyramidal side effects) at higher doses. QTc prolongation — monitor ECG. Not sedating at low dose. Avoid in Lewy Body dementia (severe EPS reaction).'],
    ['Pyridoxine (Vitamin B6)','INH-induced peripheral neuropathy prophylaxis, sideroblastic anaemia, hyperemesis gravidarum, pyridoxine-dependent epilepsy','INH prophylaxis: 25–50mg OD. Hyperemesis: 10–25mg TDS. Pyridoxine-deficient epilepsy: 50–100mg IV.','Give routinely with Isoniazid (TB treatment) to prevent neuropathy — especially in malnutrition, pregnancy, alcoholism, HIV. Sensory neuropathy with very high doses (>500mg/day) long-term.'],
    ['Thiamine (Vitamin B1)','Wernicke\'s encephalopathy, alcohol withdrawal, Wernicke-Korsakoff prevention, refeeding syndrome','Wernicke\'s: 500mg IV TDS × 3 days (Pabrinex). Prophylaxis: 100mg IV/IM OD. Oral maintenance: 100mg TDS.','Give BEFORE glucose in alcoholic/malnourished patients — glucose infusion can precipitate acute Wernicke\'s by depleting remaining thiamine. IV preferred over oral in acute presentation.'],
    ['Cyanocobalamin / Hydroxocobalamin (Vitamin B12)','B12 deficiency anaemia, subacute combined degeneration of cord, dietary deficiency (vegan)','Deficiency: 1mg IM every 2–3 days × 2 weeks, then 1mg monthly (if no dietary cause). Dietary: 50–150 mcg OD PO or 1000 mcg OD PO (high dose oral).','Intrinsic factor deficiency (pernicious anaemia) — IM route required lifelong. Dietary deficiency — oral high-dose works. Neurological features may not fully reverse. Replenish K+ (hypokalaemia on starting B12 replacement).'],
    ['Ferrous Sulphate','Iron deficiency anaemia, iron deficiency without anaemia (Hb normal but ferritin low)','200mg TDS PO (65mg elemental iron per tablet). Take on empty stomach or with Vitamin C to increase absorption. Continue for 3 months after Hb normalises to replenish stores.','GI side effects (constipation, black stools, nausea) — common cause of non-adherence. Ferric Carboxymaltose 500–1000mg IV — single dose, fast (for severe anaemia, malabsorption, intolerance). Do not give iron and antibiotics simultaneously.'],
    ['Folic Acid 5mg','Megaloblastic anaemia, pregnancy (neural tube defect prevention), SCD, haemolytic anaemia, Methotrexate cover','Treatment of deficiency: 5mg OD × 4 months. Pregnancy prevention: 400 mcg OD pre-conception and first 12 weeks (5mg if high risk — epilepsy, diabetes, previous NTD). MTX cover: 5mg once weekly (not on MTX day).','Do NOT give high-dose folic acid to mask B12 deficiency — will correct anaemia but neurological damage continues. Always check B12 first. SCD patients need lifelong 5mg OD.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#6366f1;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // ── DERMATOLOGY ─────────────────────────────────────────────
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#ec4899">🧴 Dermatology Drugs</h3>'));
  el_.appendChild(card('Dermatology Drug Reference','#ec4899','<div class="tbl-wrap"><table><thead><tr style="background:#fdf2f8"><th>Drug</th><th>Indication</th><th>Dose / Application</th><th>Notes</th></tr></thead><tbody>'+[
    ['Hydrocortisone 1% cream','Mild eczema, insect bites, mild allergic dermatitis, intertrigo','Apply thinly BD to affected area. Use for maximum 7 days on face, 2–4 weeks on body.','Weakest topical steroid. Safe for face (short-term), flexures, children. Overuse → skin atrophy, striae, perioral dermatitis.'],
    ['Betamethasone valerate 0.1%','Moderate-severe eczema, psoriasis (non-face), contact dermatitis','Apply thinly OD–BD. Use minimum effective duration. Weekend therapy for maintenance.','Potent steroid — avoid face, groin, axilla. Absorption enhanced by occlusion. Skin thinning, telangiectasia with prolonged use.'],
    ['Clobetasol propionate 0.05%','Severe resistant eczema, psoriasis, lichen sclerosus','Apply thinly OD–BD, max 50g/week. Short courses only (2–4 weeks).','Most potent topical steroid. Significant systemic absorption. Adrenal suppression with overuse. Do NOT use on face.'],
    ['Calcipotriol (Dovonex)','Plaque psoriasis','Apply BD to plaques. Max 100g/week. Avoid face and flexures.','Vitamin D analogue — reduces keratinocyte proliferation. Irritant on face and flexures. Combination with betamethasone (Dovobet) more effective.'],
    ['Tacrolimus 0.03–0.1% ointment','Atopic eczema (steroid-sparing), periorbital eczema, facial eczema','Apply BD until clear, then twice weekly for maintenance (BD initially for flares).','Calcineurin inhibitor — steroid-sparing. Stinging on application (usually resolves after a few days). Safe for face and flexures. Avoid in infections. Sun protection recommended.'],
    ['Emollient (Diprobase, Doublebase, Epaderm)','Eczema (all types), dry skin, ichthyosis, psoriasis adjunct','Apply liberally and frequently — at least 3–4x daily. Use as soap substitute.','First-line for eczema. More frequent application = better control. Reduces steroid use. Apply topical steroids 30 min after emollient for best penetration.'],
    ['Permethrin 5% cream','Scabies (first-line)','Apply from neck to toes (including under nails). Leave overnight (8–12h), then wash off. Repeat after 7 days.','Treat all household contacts simultaneously. Wash all clothing/bedding at 60°C. Itching may persist 2–4 weeks after treatment (hypersensitivity to dead mites). Safe in pregnancy.'],
    ['Malathion 0.5% (Derbac-M)','Head lice (pediculosis capitis), scabies','Lice: apply to dry hair, leave 12h, wash off. Scabies: apply from neck down, leave 24h, repeat after 7 days.','Organophosphate. Apply to dry hair for best efficacy. Alternative to permethrin for scabies. Avoid contact with eyes and mucous membranes.'],
    ['Benzoyl Peroxide 2.5–10%','Acne vulgaris (mild-moderate)','Apply thinly OD–BD. Start with lower strength. Avoid eyes, lips, mucous membranes.','Antibacterial + comedolytic. Bleaches fabric/hair — warn patient. Skin dryness and irritation common. Can be combined with topical retinoids.'],
    ['Tretinoin 0.025–0.1% (topical)','Acne, photoageing, hyperpigmentation','Apply pea-sized amount at night. Start lowest strength. Avoid eyes, lips, nostrils.','Topical retinoid. Photosensitivity — must use SPF during day. Initial worsening (purging) at weeks 2–4 is normal. Absolutely contraindicated in pregnancy (teratogenic systemically, topical less certain).'],
    ['Clotrimazole 1% cream','Tinea (ringworm, athlete\'s foot), candidal skin infections','Apply BD for 2–4 weeks (skin); 2–4 weeks (athlete\'s foot); continue 1 week after clearing.','First-line for dermatophyte and candidal skin infections. Continue for full course even after clearing. Combination cream with hydrocortisone only if significant inflammation — not for routine use.'],
    ['Mupirocin 2% (Bactroban)','Impetigo, minor skin infections, MRSA nasal decolonisation','Impetigo: apply TDS × 7 days. MRSA decolonisation (nasal): apply BD × 5 days to each nostril.','For superficial bacterial skin infections (MSSA/MRSA). Avoid prolonged use — resistance develops. Oral antibiotics for extensive impetigo.'],
    ['Aciclovir 5% cream','Herpes labialis (cold sores) — early treatment','Apply 5x daily at 4-hourly intervals × 5 days. Start as soon as tingling/burning begins.','Topical — less effective than oral. Only speeds healing if started at prodrome. For oral herpes. IV/PO aciclovir for genital herpes and severe/immunocompromised cases.'],
    ['Isotretinoin (Roaccutane oral)','Severe nodulocystic acne, acne scarring, acne resistant to antibiotics','0.5–1mg/kg/day PO OD–BD with food. Typical course: 16–24 weeks.','HIGHLY teratogenic — mandatory pregnancy prevention programme (PREVENT). Monthly beta-HCG. Depression and suicidality risk. Dry lips (Vaseline essential). Raised LFTs, triglycerides. Specialist (dermatologist) initiation.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#ec4899;font-size:12px">'+r[0]+'</td><td style="font-size:11px;color:#6b7280">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // ── PALLIATIVE / END-OF-LIFE ──────────────────────────────
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#64748b">🕊️ Palliative Care & Symptom Control</h3>'));
  el_.appendChild(notebox('📌 Palliative drugs focus on comfort. Morphine is not "giving up" — it relieves suffering without necessarily hastening death when used correctly. Always explain to patient and family. Route of administration usually oral → SC/syringe driver as swallowing deteriorates.','#f8fafc','#e2e8f0'));
  el_.appendChild(card('Palliative Symptom Control Drugs','#64748b','<div class="tbl-wrap"><table><thead><tr style="background:#f8fafc"><th>Drug</th><th>Symptom</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
    ['Morphine SC','Pain, breathlessness at rest','Starting: 2.5–5mg SC q4h PRN. Background: 10–30mg/24h via syringe driver. Titrate: 1/6 of 24h dose as breakthrough.','First-line for moderate-severe pain and breathlessness in palliative care. Reduce 24h dose by 33% in renal failure. Use oxycodone in renal impairment.'],
    ['Oxycodone SC','Pain — renal impairment (preferred over morphine)','Start 1.25–2.5mg SC q4h. Background: 10–20mg/24h via syringe driver. Breakthrough: 1/6 of 24h dose.','Metabolites less nephrotoxic than morphine — preferred in CKD. Equianalgesic: morphine 10mg = oxycodone 7mg.'],
    ['Midazolam SC','Agitation, terminal restlessness, seizures, anxiety','2.5–5mg SC PRN / 10–60mg/24h via syringe driver.','Benzodiazepine — most widely used palliative sedation drug. Compatible with most palliative drugs in syringe driver. Amnesic — brief anterograde amnesia.'],
    ['Haloperidol SC','Nausea/vomiting, delirium, agitation in dying patient','1.5–3mg SC BD or 3–5mg/24h syringe driver.','D2 antagonist. Good antiemetic. For delirium in last days of life. Not sedating at low doses. QTc prolongation — check ECG if repeated use.'],
    ['Levomepromazine SC','Nausea/vomiting (all causes), agitation, terminal restlessness (broad action)','6.25–12.5mg SC BD/PRN or 25–50mg/24h syringe driver.','Phenothiazine — broadest antiemetic spectrum. Sedating (use at night if sedation not wanted). For refractory nausea and terminal agitation.'],
    ['Hyoscine butylbromide (Buscopan)','Death rattle (retained secretions), bowel colic','20mg SC q4h PRN / 60–120mg/24h syringe driver.','Antimuscarinic — reduces secretions and bowel spasm. Does NOT cross BBB (no CNS effects). For noisy breathing at end of life. Explain to family — patient usually unaware.'],
    ['Dexamethasone SC/PO','Cerebral oedema, SVC obstruction, anorexia, bone pain (adjunct), spinal cord compression','4–16mg OD SC/PO depending on indication. Higher doses (16mg) for spinal cord compression — urgent.','Helps appetite and general wellbeing short-term. Risk of diabetes, psychiatric effects, Cushing\'s with prolonged use. Can be given SC in palliative setting.'],
    ['Ondansetron SC','Chemotherapy-induced nausea, post-op nausea, general nausea','4–8mg SC/IV BD–TDS.','5-HT3 antagonist. Good for chemical/central nausea. Less effective for vestibular or bowel obstruction nausea. Constipating. QTc prolongation.'],
    ['Methadone','Chronic cancer pain (opioid rotation), neuropathic component to pain','Complex conversion — specialist only. Low doses (2.5–5mg BD). Long and variable half-life.','Specialist use. NMDA antagonist + opioid = good for neuropathic pain. Very long and variable half-life — accumulation risk. Always consult palliative care specialist for dose conversion.'],
    ['Ketamine SC (low dose)','Refractory neuropathic pain, opioid-resistant pain, wound pain','50–100mg/24h via syringe driver (analgesic range). 100–500mg/24h (anaesthetic).','Sub-anaesthetic ("ketamine infusion") for pain. NMDA antagonist. Hallucinations — co-prescribe midazolam or haloperidol. Specialist initiation. Dissociative SE even at low doses.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#64748b;font-size:12px">'+r[0]+'</td><td style="font-size:11px;color:#6b7280">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // ── OPHTHALMOLOGY ──────────────────────────────────────────
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#0891b2">👁️ Ophthalmology Drugs</h3>'));
  el_.appendChild(card('Eye Drop Reference','#0891b2','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdfa"><th>Drug</th><th>Indication</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
    ['Timolol 0.25–0.5% eye drops','Glaucoma (open-angle, ocular HTN)','1 drop BD (0.5%) or OD (gel-forming 0.1%).','Beta-blocker — reduces aqueous humour production. Systemic absorption — avoid in asthma, COPD, heart block. Punctal occlusion reduces systemic effects.'],
    ['Latanoprost 0.005% eye drops','Open-angle glaucoma, ocular HTN','1 drop OD at night.','Prostaglandin analogue — first-line for glaucoma. Increases iris pigmentation (brown), periorbital fat loss, eyelash darkening — warn patients. Refrigerate before opening.'],
    ['Bimatoprost 0.03% eye drops','Open-angle glaucoma','1 drop OD at night.','Prostamide. More effective than latanoprost in some patients. Same SE profile — iris pigmentation, eyelash growth.'],
    ['Brimonidine 0.2% eye drops','Glaucoma, raised IOP','1 drop BD–TDS.','Alpha-2 agonist. For patients intolerant of beta-blockers. Allergy/hypersensitivity reaction common with prolonged use (20–30%). Avoid in children <2y (respiratory depression).'],
    ['Dorzolamide 2% eye drops','Glaucoma (adjunct to beta-blocker or prostaglandin)','1 drop BD–TDS.','Carbonic anhydrase inhibitor. Stinging on instillation. Bitter taste. Sulfonamide derivative — caution in sulfonamide allergy. Topical safer than oral acetazolamide.'],
    ['Pilocarpine 1–4% eye drops','Acute angle-closure glaucoma (emergency), pupil constriction','Glaucoma: 1 drop QDS. Acute angle-closure: 1 drop q5 min × 4 doses.','Muscarinic agonist — constricts pupil (miosis), increases trabecular outflow. Brow ache, myopia. Caution in contact lens wearers (remove before instilling).'],
    ['Acetazolamide (systemic — glaucoma)','Acute angle-closure glaucoma (emergency adjunct)','250mg PO QDS or 500mg IV (acute).','Oral/IV carbonic anhydrase inhibitor. Used in acute angle-closure crisis to reduce IOP rapidly. Sulfonamide allergy risk. Acidosis, hypokalemia, paraesthesias.'],
    ['Chloramphenicol 0.5% eye drops','Bacterial conjunctivitis','1 drop every 2h for 48h then QDS × 5 days.','Broad-spectrum antibiotic. First-line bacterial conjunctivitis. Not for viral or allergic conjunctivitis. Resistance increasing. Aplastic anaemia extremely rare with topical use.'],
    ['Fusidic acid 1% eye drops (Fucithalmic)','Bacterial conjunctivitis','1 drop BD.','Viscous gel — once daily dosing due to prolonged retention. Better tolerated than chloramphenicol. Good against Staphylococcus.'],
    ['Ofloxacin 0.3% eye drops','Bacterial conjunctivitis, corneal ulcer, post-surgical prophylaxis','Conjunctivitis: 1 drop QDS. Corneal ulcer: 1 drop hourly initially.','Fluoroquinolone — broad spectrum. For more severe infections, corneal ulcers. More expensive. Good Pseudomonas coverage.'],
    ['Prednisolone 0.5–1% eye drops','Anterior uveitis, post-surgical inflammation, allergic conjunctivitis','1 drop 2–4 hourly (acute uveitis) then taper.','Topical steroid — NEVER use without ophthalmology diagnosis. Risk of: glaucoma (raised IOP), cataract, herpetic keratitis activation (corneal blindness). Check IOP.'],
    ['Aciclovir 3% eye ointment','Herpes simplex keratitis','Apply 5x daily for 14 days minimum.','For dendritic corneal ulcer (HSV). Always refer to ophthalmology. Topical steroids contraindicated with HSV keratitis (causes corneal perforation).'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0891b2;font-size:12px">'+r[0]+'</td><td style="font-size:11px;color:#6b7280">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // ── AUTONOMIC NERVOUS SYSTEM PHARMACOLOGY ──────────────────
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#7c3aed">⚡ Autonomic Nervous System — Pharmacodynamics & Pharmacotherapeutics</h3>'));
  el_.appendChild(notebox('📌 Understanding ANS receptors explains WHY drugs work and WHY they cause side effects. Most cardiovascular, respiratory and GI drugs act on ANS receptors. This is a concise reference — not a textbook.','#faf5ff','#e9d5ff'));

  // Overview card
  el_.appendChild(card('ANS Overview — Two Divisions','#7c3aed',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:4px">'+
      '<div style="padding:12px;background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px">'+
        '<div style="font-size:12px;font-weight:800;color:#7c3aed;margin-bottom:8px">⚡ SYMPATHETIC (Fight or Flight)</div>'+
        '<div style="font-size:12px;line-height:1.7;color:#374151">'+
          '→ Neurotransmitter: <strong>Noradrenaline</strong> (+ Adrenaline from adrenal medulla)<br>'+
          '→ Receptors: <strong>Alpha (α1, α2)</strong> and <strong>Beta (β1, β2, β3)</strong><br>'+
          '→ Effects: ↑HR, ↑BP, bronchodilation, mydriasis, ↓gut motility, glycogenolysis<br>'+
          '→ Clinical: Activated in shock, pain, stress, exercise'+
        '</div>'+
      '</div>'+
      '<div style="padding:12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px">'+
        '<div style="font-size:12px;font-weight:800;color:#16a34a;margin-bottom:8px">🌿 PARASYMPATHETIC (Rest and Digest)</div>'+
        '<div style="font-size:12px;line-height:1.7;color:#374151">'+
          '→ Neurotransmitter: <strong>Acetylcholine</strong><br>'+
          '→ Receptors: <strong>Muscarinic (M1–M5)</strong> and <strong>Nicotinic (Nm, Nn)</strong><br>'+
          '→ Effects: ↓HR, ↑gut motility, miosis, lacrimation, salivation, bronchoconstriction<br>'+
          '→ Clinical: Dominant at rest; controls digestion and secretions'+
        '</div>'+
      '</div>'+
    '</div>'
  ));

  // Receptor table
  el_.appendChild(card('Receptor Types — Location, Effect & Key Drugs','#7c3aed','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Receptor</th><th>Location</th><th>Stimulation Effect</th><th>Agonists (activate)</th><th>Antagonists (block)</th><th>Clinical Use of Blocker/Activator</th></tr></thead><tbody>'+[
    ['α1 (Alpha-1)','Vascular smooth muscle, prostate, eye (iris)','Vasoconstriction ↑BP; prostate contraction; pupil dilation','Noradrenaline, Phenylephrine, Metaraminol','Doxazosin, Prazosin, Tamsulosin','Doxazosin: HTN + BPH. Tamsulosin: BPH (urinary retention). Phenylephrine: nasal decongestant, hypotension.'],
    ['α2 (Alpha-2)','Presynaptic nerve terminals, CNS, pancreas','↓Noradrenaline release (negative feedback); ↓insulin; CNS sedation','Clonidine, Methyldopa, Dexmedetomidine','Yohimbine (not clinical)','Clonidine/Methyldopa: HTN (especially pregnancy). Dexmedetomidine: ICU sedation. α2 agonists → ↓central sympathetic outflow.'],
    ['β1 (Beta-1)','Heart (SA node, AV node, ventricles), kidney (JGA)','↑HR (chronotropy), ↑contractility (inotropy), ↑renin release','Dobutamine, Adrenaline, Isoprenaline','Bisoprolol, Metoprolol, Atenolol (selective)','Beta-blockers: HTN, HF, AF rate control, post-MI. Dobutamine: cardiogenic shock. Selective β1 blockers safer in asthma.'],
    ['β2 (Beta-2)','Bronchial smooth muscle, uterus, skeletal muscle vasculature, liver','Bronchodilation, uterine relaxation, vasodilation, glycogenolysis','Salbutamol, Salmeterol, Terbutaline, Adrenaline','Propranolol (non-selective — avoid in asthma)','Salbutamol: asthma, COPD, hyperkalaemia (shifts K⁺ into cells). Ritodrine: preterm labour (tocolysis). Adrenaline: anaphylaxis (β2 bronchodilation).'],
    ['β3 (Beta-3)','Adipose tissue, bladder detrusor muscle','Lipolysis; bladder relaxation (detrusor)','Mirabegron','—','Mirabegron: overactive bladder (detrusor relaxation) — alternative to antimuscarinics.'],
    ['M1 (Muscarinic-1)','CNS (cortex, hippocampus), gastric parietal cells','CNS: memory/cognition; stomach: ↑acid secretion','Bethanechol (weak)','Pirenzepine (ulcer — rarely used)','Anticholinergic drugs cause cognitive impairment/delirium via M1 blockade — important in elderly.'],
    ['M2 (Muscarinic-2)','Heart (SA, AV nodes)','↓HR (negative chronotropy), ↓conduction','Acetylcholine, Carbachol','Atropine','Atropine: bradycardia (blocks vagal M2). Organophosphate poisoning: M2 overstimulation → severe bradycardia → treat with atropine.'],
    ['M3 (Muscarinic-3)','Smooth muscle (bronchi, gut, bladder), exocrine glands, eye','Bronchoconstriction, ↑gut motility, bladder contraction, ↑secretions (saliva, tears), miosis','Pilocarpine, Bethanechol','Ipratropium, Tiotropium, Oxybutynin, Atropine','Ipratropium/Tiotropium: COPD (bronchodilation via M3 block). Oxybutynin: overactive bladder. Hyoscine: motion sickness, secretions. SE of M3 blockers: dry mouth, urinary retention, constipation, blurred vision.'],
    ['Nn (Nicotinic — neuromuscular)','Neuromuscular junction (skeletal muscle)','Muscle contraction','Suxamethonium (depolarising), Acetylcholine','Vecuronium, Rocuronium, Atracurium (non-depolarising)','Neuromuscular blocking agents for intubation/surgery. Suxamethonium: rapid sequence induction. Reversal: Neostigmine (non-dep) / Sugammadex (roc/vec).'],
    ['Nn (Nicotinic — ganglionic)','Autonomic ganglia (both sympathetic + parasympathetic)','Ganglionic transmission','Nicotine','Trimethaphan (historical)','Nicotine patches/gum: smoking cessation (ganglionic stimulation). Ganglionic blockers: no longer used clinically.'],
  ].map(function(r){
    return '<tr class="tbl-row">'+
      '<td style="font-weight:800;color:#7c3aed;font-size:12px;white-space:nowrap">'+r[0]+'</td>'+
      '<td style="font-size:11px;color:#6b7280">'+r[1]+'</td>'+
      '<td style="font-size:11.5px;color:#374151">'+r[2]+'</td>'+
      '<td style="font-size:11.5px;color:#16a34a;font-weight:600">'+r[3]+'</td>'+
      '<td style="font-size:11.5px;color:#dc2626;font-weight:600">'+r[4]+'</td>'+
      '<td style="font-size:11px;color:#1e293b">'+r[5]+'</td>'+
    '</tr>';
  }).join('')+'</tbody></table></div>'));

  // Pharmacotherapeutics quick reference
  el_.appendChild(card('Pharmacotherapeutics — ANS Drug Classification at a Glance','#6366f1',
    '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px">'+
    [
      {title:'Sympathomimetics (Activate SNS)',color:'#dc2626',bg:'#fef2f2',items:[
        'α+β agonist: Adrenaline (anaphylaxis, cardiac arrest)',
        'β1 agonist: Dobutamine (cardiogenic shock)',
        'α1 agonist: Noradrenaline (septic shock, vasoconstriction)',
        'α1 agonist: Metaraminol (spinal hypotension)',
        'β2 agonist: Salbutamol (asthma, hyperkalaemia)',
        'α2 agonist: Clonidine (HTN, sedation)',
      ]},
      {title:'Sympatholytics (Block SNS)',color:'#0ea5e9',bg:'#f0f9ff',items:[
        'β1 blocker: Bisoprolol, Metoprolol (HTN, HF, AF)',
        'β1+β2 blocker: Propranolol (avoid in asthma)',
        'α1 blocker: Doxazosin (HTN, BPH)',
        'α1 blocker: Tamsulosin (BPH — uroselective)',
        'α+β blocker: Labetalol, Carvedilol (HTN, HF)',
        'α2 agonist → ↓SNS outflow: Methyldopa (pregnancy HTN)',
      ]},
      {title:'Parasympathomimetics (Activate PNS)',color:'#16a34a',bg:'#f0fdf4',items:[
        'Muscarinic agonist: Pilocarpine (glaucoma)',
        'Muscarinic agonist: Bethanechol (urinary retention)',
        'AChE inhibitor: Neostigmine (reverses NMB)',
        'AChE inhibitor: Pyridostigmine (myasthenia gravis)',
        'AChE inhibitor: Donepezil (Alzheimer\'s — ↑ACh in CNS)',
        'AChE inhibitor: Physostigmine (anticholinergic OD antidote)',
      ]},
      {title:'Antimuscarinics (Block PNS)',color:'#f97316',bg:'#fff7ed',items:[
        'Atropine: bradycardia, organophosphate poisoning',
        'Ipratropium: COPD, acute asthma (inhaled)',
        'Tiotropium: COPD maintenance (inhaled)',
        'Oxybutynin / Tolterodine: overactive bladder',
        'Hyoscine: motion sickness, bowel spasm, secretions',
        'Glycopyrronium: drying secretions (perioperative, palliative)',
      ]},
    ].map(function(g){
      return '<div style="padding:12px;background:'+g.bg+';border-radius:10px;border:1px solid '+g.color+'33">'+
        '<div style="font-size:11px;font-weight:800;color:'+g.color+';margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">'+g.title+'</div>'+
        g.items.map(function(i){ return '<div style="font-size:11.5px;color:#374151;padding:2px 0;border-bottom:1px solid '+g.color+'15">→ '+i+'</div>'; }).join('')+
      '</div>';
    }).join('')+
    '</div>'
  ));

  // Key pharmacodynamic concepts
  el_.appendChild(card('Key Concepts — Pharmacodynamics in 60 Seconds','#374151',
    '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px">'+
    [
      ['Agonist','A drug that binds a receptor and activates it. Full agonist: maximum response (e.g. Salbutamol at β2). Partial agonist: submaximal response (e.g. Buprenorphine at opioid receptors — ceiling effect).','#16a34a'],
      ['Antagonist','Binds receptor but produces NO effect — blocks agonist access. Competitive: displaced by high agonist dose (e.g. Atropine). Non-competitive: irreversible binding (e.g. Aspirin on COX).','#dc2626'],
      ['Selectivity','Degree of preference for one receptor subtype. E.g. Bisoprolol is β1-selective — safer in asthma than non-selective Propranolol. Selectivity is dose-dependent — lost at high doses.','#0ea5e9'],
      ['Potency vs Efficacy','Potency = dose needed for effect (EC50). Efficacy = maximum effect achievable. A drug can be highly potent (low dose needed) but have low efficacy. E.g. Morphine: high efficacy. Codeine: low potency AND low efficacy.','#8b5cf6'],
      ['First-pass Metabolism','Oral drugs absorbed from gut pass through liver BEFORE reaching systemic circulation. High first-pass → low oral bioavailability. E.g. GTN, morphine, lidocaine — require higher oral doses or non-oral routes.','#f97316'],
      ['Half-life (t½)','Time for plasma concentration to halve. Determines dosing interval. 4–5 half-lives to reach steady state. Long t½ = slow onset and offset (e.g. Amiodarone t½ = 40–55 days). Short t½ = rapid titration (e.g. Adenosine t½ = 10 sec).','#d97706'],
    ].map(function(c){
      return '<div style="padding:10px 12px;background:#f8fafc;border-left:3px solid '+c[2]+';border-radius:0 8px 8px 0">'+
        '<div style="font-size:11px;font-weight:800;color:'+c[2]+';margin-bottom:4px;text-transform:uppercase">'+c[0]+'</div>'+
        '<div style="font-size:11.5px;color:#374151;line-height:1.6">'+c[1]+'</div>'+
      '</div>';
    }).join('')+
    '</div>'
  ));
}




// ══════════════════════════════════════════════════════════════
// ANTIMALARIALS TAB
// ══════════════════════════════════════════════════════════════
function tabDrugAntimalarials(el_) {
  el_.appendChild(secTitle('🦟','Antimalarial Drug Reference','Nigeria context — ACTs, severe malaria, prophylaxis · FMOH 2022 · WHO 2023','#16a34a'));
  el_.appendChild(notebox('📌 Nigeria accounts for ~27% of global malaria cases. <strong>P. falciparum</strong> is dominant and chloroquine-resistant. Always confirm with RDT or blood film before treating. ACTs are first-line. <strong>Artesunate IV</strong> has replaced Quinine IV as first-line for severe malaria. Source: FMOH Nigeria 2022, WHO Guidelines for Treatment of Malaria 2023.','#f0fdf4','#bbf7d0'));

  // PD legend
  el_.appendChild(fromHTML('<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">'+
    '<span style="background:#dbeafe;color:#1e40af;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700">⚗️ PD = Pharmacodynamics — how the drug works at the molecular/cellular level</span>'+
    '<span style="background:#dcfce7;color:#166534;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700">🎯 PT = Pharmacotherapeutics — clinical role, when and why to use it</span>'+
  '</div>'));

  // ACTs — first-line
  el_.appendChild(fromHTML('<h3 style="font-size:14px;font-weight:800;margin:12px 0 8px;color:#16a34a">🌿 Artemisinin-Based Combination Therapies (ACTs) — First-Line</h3>'));
  el_.appendChild(card('ACT Drug Reference','#16a34a','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Dose (Adult)</th><th>⚗️ Pharmacodynamics</th><th>🎯 Pharmacotherapeutics</th><th>Key Cautions</th></tr></thead><tbody>'+[
    ['Artemether-Lumefantrine\n(Coartem / AL)',
     '<div class="tbl-wrap"><table style="font-size:10.5px;width:100%;border-collapse:collapse"><thead><tr style="background:rgba(22,163,74,0.15)"><th style="padding:3px 6px;text-align:left;color:#86efac">Weight</th><th style="padding:3px 6px;text-align:left;color:#86efac">Artemether</th><th style="padding:3px 6px;text-align:left;color:#86efac">Lumefantrine</th></tr></thead><tbody><tr><td style="padding:3px 6px;color:rgba(255,255,255,0.7)">5–14 kg</td><td style="padding:3px 6px">20 mg</td><td style="padding:3px 6px">120 mg</td></tr><tr><td style="padding:3px 6px;color:rgba(255,255,255,0.7)">15–24 kg</td><td style="padding:3px 6px">40 mg</td><td style="padding:3px 6px">240 mg</td></tr><tr><td style="padding:3px 6px;color:rgba(255,255,255,0.7)">25–34 kg</td><td style="padding:3px 6px">60 mg</td><td style="padding:3px 6px">360 mg</td></tr><tr><td style="padding:3px 6px;color:rgba(255,255,255,0.7)">≥ 35 kg</td><td style="padding:3px 6px">80 mg</td><td style="padding:3px 6px">480 mg</td></tr></tbody></table></div>Each dose given at: 0h, 8h, 24h, 36h, 48h, 60h (6 doses total). Take WITH food or fatty drink.',
     'Artemether: endoperoxide bridge generates cytotoxic free radicals that alkylate parasite proteins → rapid schizontocidal action. Lumefantrine: inhibits β-haematin formation, preventing haem detoxification in the parasite food vacuole.',
     '🥇 First-line for uncomplicated P. falciparum in Nigeria. Rapid parasite clearance within 48h. Partner drug (lumefantrine) eliminates residual parasites and delays resistance. Suitable for all ages with weight-based dosing.'],
    ['Artesunate-Amodiaquine\n(ASAQ)',
     '200mg/540mg fixed-dose OD × 3 days PO.',
     'Artesunate: pro-drug hydrolysed to dihydroartemisinin (DHA) → oxidative stress kills intra-erythrocytic parasites at all stages. Amodiaquine: 4-aminoquinoline that accumulates in parasite food vacuole → blocks haem polymerisation.',
     '🔄 Second ACT option for uncomplicated falciparum; FMOH-approved alternative when AL not available. Useful in young children (palatable suspension). Avoid in G6PD deficiency.'],
    ['Dihydroartemisinin-Piperaquine\n(DHA-PPQ / Eurartesim)',
     '3–4 tabs OD × 3 days on empty stomach.',
     'DHA: active artemisinin metabolite causing rapid free-radical–mediated parasite death. Piperaquine: bis-quinoline with long half-life (~28 days) that inhibits haem detoxification → sustained post-treatment prophylactic effect.',
     '📅 Alternative ACT with longest post-treatment prophylaxis of all ACTs (28-day piperaquine tail). Useful in high-transmission settings. QTc monitoring needed. Empty stomach critical for absorption.'],
  ].map(function(r){return '<tr class="tbl-row">'+
    '<td style="font-weight:700;color:#16a34a;font-size:12px;white-space:pre-line">'+r[0]+'</td>'+
    '<td style="font-size:11.5px">'+r[1]+'</td>'+
    '<td style="font-size:11px;color:#1e40af;background:#eff6ff;padding:6px;border-radius:4px">'+r[2]+'</td>'+
    '<td style="font-size:11px;color:#166534;background:#f0fdf4;padding:6px;border-radius:4px">'+r[3]+'</td>'+
    '<td style="font-size:11px;color:#6b7280">'+r[4]+'</td>'+
  '</tr>';}).join('')+'</tbody></table></div>'));

  // Severe malaria
  el_.appendChild(fromHTML('<h3 style="font-size:14px;font-weight:800;margin:16px 0 8px;color:#dc2626">🚨 Severe / Complicated Malaria</h3>'));
  el_.appendChild(card('Severe Malaria Drugs','#dc2626','<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>Dose</th><th>⚗️ Pharmacodynamics</th><th>🎯 Pharmacotherapeutics</th><th>Key Cautions</th></tr></thead><tbody>'+[
    ['Artesunate IV\n(First-line)',
     '2.4mg/kg IV at 0h, 12h, 24h then OD. Children <20kg: 3mg/kg. Reconstitute in 5% sodium bicarbonate, then dilute in 5% dextrose.',
     'Water-soluble artemisinin derivative; rapidly hydrolysed to DHA. Activates via iron-catalysed cleavage of endoperoxide bridge → free radicals alkylate and damage multiple parasite proteins → kills all intra-erythrocytic stages including sequestered mature trophozoites not accessible to chloroquine.',
     '🥇 Replaced IV quinine as WHO/FMOH first-line for severe malaria. AQUAMAT trial showed 22% mortality reduction vs quinine in African children. Switch to oral ACT after minimum 3 parenteral doses once patient can swallow. Monitor for late haemolytic anaemia (DHAT) at 2–4 weeks.'],
    ['Quinine IV\n(2nd-line if artesunate unavailable)',
     'Loading: 20mg/kg in 500ml 5% dextrose over 4h. Maintenance: 10mg/kg every 8h until oral tolerated.',
     'Quinoline alkaloid; accumulates in parasite food vacuole → inhibits haem polymerisation into non-toxic haemozoin → toxic free haem accumulates → parasite membrane disruption and death.',
     '⚠️ Reserve for when IV artesunate is unavailable. Associated with serious toxicities. Always complete course with oral quinine + doxycycline for 7 days total. Avoid as monotherapy (resistance and toxicity).'],
    ['Oral Quinine + Doxycycline\n(step-down / completion)',
     'Quinine sulfate 600mg TDS PO × 7 days + Doxycycline 100mg BD × 7 days (or Clindamycin 450mg TDS in pregnancy/children).',
     'Quinine: haem polymerisation inhibitor (see above). Doxycycline: tetracycline antibiotic that inhibits parasite mitochondrial translation via 30S ribosomal binding → eliminates residual parasites synergistically.',
     '🔄 Used to step-down from IV artesunate/quinine OR when ACTs not available. 7-day combination ensures radical clearance and reduces recrudescence. Doxycycline contraindicated in pregnancy and children <8y — use clindamycin instead.'],
  ].map(function(r){return '<tr class="tbl-row">'+
    '<td style="font-weight:700;color:#dc2626;font-size:12px;white-space:pre-line">'+r[0]+'</td>'+
    '<td style="font-size:11.5px">'+r[1]+'</td>'+
    '<td style="font-size:11px;color:#1e40af;background:#eff6ff;padding:6px;border-radius:4px">'+r[2]+'</td>'+
    '<td style="font-size:11px;color:#166534;background:#f0fdf4;padding:6px;border-radius:4px">'+r[3]+'</td>'+
    '<td style="font-size:11px;color:#6b7280">'+r[4]+'</td>'+
  '</tr>';}).join('')+'</tbody></table></div>'));

  // Non-falciparum & special
  el_.appendChild(fromHTML('<h3 style="font-size:14px;font-weight:800;margin:16px 0 8px;color:#7c3aed">🧬 Non-Falciparum Malaria & Radical Cure</h3>'));
  el_.appendChild(card('Non-Falciparum & Radical Cure Drugs','#7c3aed','<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Dose</th><th>⚗️ Pharmacodynamics</th><th>🎯 Pharmacotherapeutics</th><th>Key Cautions</th></tr></thead><tbody>'+[
    ['Chloroquine',
     '600mg base stat → 300mg at 6h → 300mg OD × 2 days (total 1500mg base PO).',
     '4-aminoquinoline; accumulates in parasite food vacuole via ion trapping → inhibits haem polymerisation → toxic haem accumulates → parasite death. Requires alkaline pH in vacuole; resistance mediated by PfCRT transporter effluxing drug out of vacuole.',
     '🟡 Do NOT use for P. falciparum in Nigeria (widespread resistance). Still effective for P. vivax, P. malariae, P. ovale. Used in pregnancy for non-falciparum species. Also used long-term in RA/SLE (immune-modulating effects at low doses).'],
    ['Primaquine',
     '15mg base OD × 14 days (radical cure P. vivax/ovale). 0.25mg/kg OD × 14 days weight-based.',
     '8-aminoquinoline; active metabolites (not primaquine itself) disrupt mitochondrial electron transport chain of liver-stage hypnozoites and gametocytes → kills dormant liver stages (hypnozoites) not accessible to blood-stage drugs. Also gametocytocidal — reduces transmission.',
     '🎯 Only drug that eliminates dormant liver hypnozoites of P. vivax and P. ovale — essential for radical cure (preventing relapse). Also used as single-dose gametocytocide in falciparum (0.25mg/kg stat). ⚠️ G6PD testing MANDATORY before use — causes haemolysis. Contraindicated in pregnancy.'],
    ['Sulfadoxine-Pyrimethamine\n(SP / Fansidar — IPTp)',
     '3 tablets stat at ANC visits from 13 weeks (≥4 weeks apart, max 3 doses in pregnancy).',
     'Synergistic antifolate combination: Sulfadoxine inhibits dihydropteroate synthase; Pyrimethamine inhibits dihydrofolate reductase → sequential blockade of folate synthesis → parasite cannot synthesise DNA → death. Resistance widespread for treatment but retained IPTp efficacy.',
     '🤰 NOT for treatment of clinical malaria (high resistance). Used exclusively for Intermittent Preventive Treatment in Pregnancy (IPTp) — reduces maternal anaemia, placental parasitaemia and low birth weight. Folate supplementation: use 0.4mg (NOT 5mg — antifolate antagonism risk). Mandatory in Nigerian ANC.'],
  ].map(function(r){return '<tr class="tbl-row">'+
    '<td style="font-weight:700;color:#7c3aed;font-size:12px;white-space:pre-line">'+r[0]+'</td>'+
    '<td style="font-size:11.5px">'+r[1]+'</td>'+
    '<td style="font-size:11px;color:#1e40af;background:#eff6ff;padding:6px;border-radius:4px">'+r[2]+'</td>'+
    '<td style="font-size:11px;color:#166534;background:#f0fdf4;padding:6px;border-radius:4px">'+r[3]+'</td>'+
    '<td style="font-size:11px;color:#6b7280">'+r[4]+'</td>'+
  '</tr>';}).join('')+'</tbody></table></div>'));

  // Prophylaxis
  el_.appendChild(fromHTML('<h3 style="font-size:14px;font-weight:800;margin:16px 0 8px;color:#0891b2">✈️ Malaria Prophylaxis (Travellers & High-Risk)</h3>'));
  el_.appendChild(card('Prophylaxis Drug Reference','#0891b2','<div class="tbl-wrap"><table><thead><tr style="background:#f0fdfa"><th>Drug</th><th>Dose</th><th>⚗️ Pharmacodynamics</th><th>🎯 Pharmacotherapeutics</th><th>Key Cautions</th></tr></thead><tbody>'+[
    ['Atovaquone-Proguanil\n(Malarone)',
     '1 adult tab OD. Start 1–2 days before, continue 7 days after travel.',
     'Atovaquone: disrupts mitochondrial electron transport at cytochrome bc1 complex → collapses mitochondrial membrane potential → kills liver and blood stages. Proguanil: antifolate synergist (DHFR inhibitor) + independent mitochondrial synergism. Combination prevents rapid resistance.',
     '🥇 Preferred prophylaxis for short trips to endemic areas. Causal (kills liver stages) → short post-travel course (7 days vs 4 weeks for doxycycline). Expensive. Must be taken with food for atovaquone absorption. Suitable when doxycycline contraindicated.'],
    ['Doxycycline',
     '100mg OD. Start 1–2 days before travel, continue 4 weeks after return.',
     'Tetracycline class; binds 30S ribosomal subunit of parasite → inhibits protein synthesis in blood and liver stages → suppressive (not causal) prophylaxis. Does not kill pre-erythrocytic liver stages but prevents erythrocytic development.',
     '🔄 Cost-effective prophylaxis option, widely available. Suppressive — requires 4-week post-travel continuation. Also prevents traveller\'s diarrhoea (added benefit). Photosensitivity (essential sunscreen). Contraindicated in pregnancy and children <8y. GI tolerability improved by taking with food.'],
    ['Mefloquine',
     '250mg weekly. Start 2–3 weeks before travel, continue 4 weeks after.',
     'Quinoline methanol; mechanism incompletely understood — inhibits haem polymerisation and may disrupt calcium signalling in parasites. Long half-life (~3 weeks) supports weekly dosing.',
     '⚠️ Second-line prophylaxis only. Neuropsychiatric side effects (vivid dreams, anxiety, depression, psychosis) in up to 25% — avoid in psychiatric history, epilepsy, cardiac conduction abnormalities. Must start 2–3 weeks pre-travel to assess tolerability. Not recommended as treatment in Nigeria.'],
    ['Hydroxychloroquine\n(for P. vivax/malariae in certain regions)',
     '400mg (310mg base) weekly. Start 1–2 weeks before, continue 4 weeks after.',
     'Same mechanism as chloroquine (haem polymerisation inhibition) but slightly lower toxicity profile. Active against chloroquine-sensitive species only.',
     '🟡 Only where chloroquine-sensitive malaria exists (not Nigeria for falciparum). Used long-term in RA/SLE (anti-inflammatory via TLR inhibition and lysosomal pH modulation). Annual ophthalmology review for retinopathy with long-term use.'],
  ].map(function(r){return '<tr class="tbl-row">'+
    '<td style="font-weight:700;color:#0891b2;font-size:12px;white-space:pre-line">'+r[0]+'</td>'+
    '<td style="font-size:11.5px">'+r[1]+'</td>'+
    '<td style="font-size:11px;color:#1e40af;background:#eff6ff;padding:6px;border-radius:4px">'+r[2]+'</td>'+
    '<td style="font-size:11px;color:#166534;background:#f0fdf4;padding:6px;border-radius:4px">'+r[3]+'</td>'+
    '<td style="font-size:11px;color:#6b7280">'+r[4]+'</td>'+
  '</tr>';}).join('')+'</tbody></table></div>'));

  // Quick comparison summary
  el_.appendChild(card('Quick Comparison — Which Drug, When?','#374151','<div class="tbl-wrap"><table><thead><tr style="background:#f8fafc"><th>Clinical Scenario</th><th>First-Line Drug</th><th>Alternative</th><th>Avoid</th></tr></thead><tbody>'+[
    ['Uncomplicated P. falciparum (Nigeria)','Artemether-Lumefantrine (AL)','ASAQ or DHA-PPQ','Chloroquine (resistant), Quinine monotherapy'],
    ['Severe / complicated malaria (any age)','Artesunate IV (2.4mg/kg)','Quinine IV (if no artesunate)','Oral ACTs until patient can swallow'],
    ['Malaria in pregnancy — 1st trimester','Quinine + Clindamycin × 7 days','Artesunate IV if severe','AL (limited 1st trimester data), Doxycycline, Primaquine'],
    ['Malaria in pregnancy — 2nd/3rd trimester','Artemether-Lumefantrine (AL) — safe','Artesunate IV if severe','Chloroquine (falciparum), Primaquine'],
    ['P. vivax / P. ovale blood stage','Chloroquine 1500mg base over 3 days','AL if chloroquine unavailable','ACTs not needed (but effective)'],
    ['P. vivax / P. ovale radical cure (liver)','Primaquine 15mg OD × 14 days (after G6PD check)','Tafenoquine (specialist, single dose)','Primaquine in pregnancy / G6PD deficiency'],
    ['IPTp in pregnancy (Nigeria)','Sulfadoxine-Pyrimethamine (SP) 3 doses at ANC','—','SP for treatment (high resistance)'],
    ['Malaria prophylaxis — travellers','Atovaquone-Proguanil (Malarone)','Doxycycline 100mg OD','Chloroquine (Nigeria — resistant)'],
  ].map(function(r){return '<tr class="tbl-row">'+
    '<td style="font-weight:600;font-size:12px;color:#374151">'+r[0]+'</td>'+
    '<td style="font-size:12px;color:#16a34a;font-weight:700">'+r[1]+'</td>'+
    '<td style="font-size:12px;color:#d97706">'+r[2]+'</td>'+
    '<td style="font-size:12px;color:#dc2626">'+r[3]+'</td>'+
  '</tr>';}).join('')+'</tbody></table></div>'));

  // G6PD warning box
  el_.appendChild(fromHTML(
    '<div style="margin-top:14px;padding:14px 16px;background:#fef2f2;border:2px solid #dc2626;border-radius:12px">'+
      '<div style="font-size:13px;font-weight:800;color:#dc2626;margin-bottom:6px">⚠️ G6PD Deficiency — Critical Point</div>'+
      '<div style="font-size:12px;color:#374151;line-height:1.7">'+
        'G6PD deficiency is common in Nigeria (carrier rate ~20% in some populations). '+
        '<strong>Primaquine</strong> and <strong>Amodiaquine</strong> cause acute haemolytic anaemia in G6PD-deficient patients. '+
        'Always screen with point-of-care G6PD test before prescribing. '+
        'If G6PD testing unavailable: <strong>do not give Primaquine</strong> in moderate-severe deficiency. '+
        'Weekly primaquine (45mg) can be used for mild deficiency under close supervision.'+
      '</div>'+
    '</div>'
  ));
}

function tabDrugDermatology(el_) {
  el_.appendChild(secTitle('🩹','Dermatology Drug Reference','Topical steroids, antifungals, antiparasitics, wound care, systemic dermatology','#ec4899'));
  el_.appendChild(notebox('📌 Nigerian context: tinea infections, scabies, impetigo, eczema, and leprosy are the most common dermatological conditions encountered on general wards. Whitfield\'s ointment and benzyl benzoate are widely available and cost-effective first-line agents. Sources: BNF 2024, WHO Essential Medicines List 2023, FMOH Nigeria guidelines.','#fdf4ff','#f0abfc'));

  el_.appendChild(card('💊 Topical Corticosteroids — Potency Ladder','#ec4899',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fdf4ff"><th>Drug</th><th>Potency</th><th>Use</th><th>Key Caution</th></tr></thead><tbody>'+[
      ['Hydrocortisone 1% cream/oint','Mild','Face, flexures, eyelids, children, nappy rash. First-line for all mild eczema.','Safest steroid — can use on face. Still avoid prolonged use around eyes.'],
      ['Clobetasone butyrate 0.05% (Eumovate)','Moderate','Body eczema, contact dermatitis. Step-up from hydrocortisone.','Do not use on face. Max 4 weeks continuous use.'],
      ['Betamethasone valerate 0.1% (Betnovate)','Potent','Body eczema, psoriasis (plaques), contact dermatitis — not face/flexures.','Skin thinning, striae with prolonged use. Avoid face. Adrenal suppression in children.'],
      ['Mometasone furoate 0.1% (Elocon)','Potent','Eczema, psoriasis body — OD dosing (advantage). Less systemic absorption.','OD application. Avoid face. Less tachyphylaxis than Betamethasone.'],
      ['Clobetasol propionate 0.05% (Dermovate)','Very potent','Palms, soles, scalp psoriasis, lichenified eczema — short courses only.','⚠️ Max 50g/week. Max 4 weeks. Significant adrenal suppression risk. Never face.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#ec4899;font-size:13px">'+r[0]+'</td><td style="font-size:12px;font-weight:600">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#dc2626">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));

  el_.appendChild(card('🦠 Topical Antifungals','#8b5cf6',
    '<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Indication</th><th>How to Use</th><th>Notes</th></tr></thead><tbody>'+[
      ['Clotrimazole 1% cream','Tinea (corporis, pedis, cruris), Candida (skin, vaginal), nappy rash','Apply BD × 2–4 weeks. Vaginal: 500mg pessary single dose.','Most widely available topical antifungal in Nigeria. Also comes as vaginal tablet.'],
      ['Miconazole 2% cream','Tinea, candidal intertrigo, nappy rash, infected eczema with Candida','Apply BD × 2–4 weeks. Nappy area: OD–BD.','Also has mild antibacterial activity. Good for mixed fungal/bacterial infections.'],
      ['Ketoconazole 2% shampoo/cream','Pityriasis versicolor, seborrhoeic dermatitis (scalp/face), tinea','Shampoo: 2×/week × 4 weeks for dandruff. Cream: OD–BD × 2–4 weeks. Pityriasis: lather, leave 5 min, rinse.','Very effective for pityriasis versicolor (common in Nigeria — hypo/hyperpigmented patches). Warn: depigmentation resolves slowly after treatment.'],
      ['Terbinafine 1% cream','Tinea pedis (athlete\'s foot), tinea corporis, tinea cruris','Apply OD–BD × 1–2 weeks. Very short course needed (fungicidal not fungistatic).','More effective than imidazoles for tinea — fungicidal. More expensive.'],
      ['Whitfield\'s ointment (Benzoic acid + Salicylic acid)','Tinea — all types. Cheap, effective, widely available Nigeria','Apply BD × 4 weeks. Compound benzoic acid ointment.','✅ Cheap, widely available, effective. Keratolytic + antifungal. Can irritate skin — start with thin layer. Do not use on face or genitals.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#8b5cf6;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));

  el_.appendChild(card('🦟 Antiparasitics — Scabies & Infestations','#f97316',
    notebox('📌 Scabies is extremely common in Nigeria — spreads rapidly in crowded living conditions. Treat ALL household contacts simultaneously, wash all clothing/bedding in hot water. Treatment failure is usually due to reinfection from untreated contacts.','#fff7ed','#fed7aa').outerHTML+
    '<div class="tbl-wrap"><table><thead><tr style="background:#fff7ed"><th>Drug</th><th>Indication</th><th>Dose / Application</th><th>Notes</th></tr></thead><tbody>'+[
      ['Permethrin 5% cream','Scabies — FIRST LINE','Apply to entire body from neck down (include scalp in elderly/immunocompromised). Leave 8–12h then wash off. Repeat in 1 week.','Most effective. Repeat application essential. Treat all contacts same night. Itch may persist 2–4 weeks after treatment — does not mean treatment failed.'],
      ['Benzyl benzoate 25% lotion','Scabies — widely available Nigeria','Apply to entire body from neck down, 2–3 nights consecutively. Dilute to 12.5% for children, 6.25% for infants.','Very widely available and cheap in Nigeria. More irritant than Permethrin. Effective. Do NOT apply to face. Avoid mucous membranes.'],
      ['Ivermectin oral','Scabies (crusted/Norwegian), onchocerciasis (river blindness), strongyloidiasis','Scabies: 200 mcg/kg single dose, repeat in 2 weeks. Onchocerciasis: 150 mcg/kg annual dose. Strongyloides: 200 mcg/kg OD × 2 days.','⚠️ Avoid in pregnancy and children <15kg. For crusted scabies: combine with Permethrin topical. Onchocerciasis is endemic in Nigeria — important.'],
      ['Diethylcarbamazine (DEC)','Lymphatic filariasis (elephantiasis), loiasis','Filariasis: 6mg/kg/day in 3 doses × 12 days. Loiasis: same dose.','⚠️ Do NOT give DEC if co-infected with Onchocerca — severe Mazzotti reaction. Test for onchocerciasis first in endemic areas.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#f97316;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));

  el_.appendChild(card('🩺 Topical Antibacterials & Wound Care','#16a34a',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Indication</th><th>Application</th><th>Notes</th></tr></thead><tbody>'+[
      ['Mupirocin 2% ointment (Bactroban)','Impetigo (first line), infected wounds, nasal MRSA decolonisation','Apply TDS × 7–10 days. Nasal: apply to anterior nares BD × 5 days.','Most effective topical antibiotic for Staph aureus (including MRSA). Do not use for >10 days — resistance develops.'],
      ['Fusidic acid 2% cream (Fucidin)','Infected eczema, impetigo, infected wounds','Apply TDS × 7–10 days.','Anti-Staph activity. Resistance develops rapidly with prolonged use. Combine with steroid (Fucidin-H) for infected eczema.'],
      ['Silver sulfadiazine 1% cream (Flamazine)','Burns — partial thickness, infected wounds','Apply OD–BD to burn wound. Cover with non-adherent dressing.','Broad-spectrum antimicrobial. Standard burn wound care. Can impair re-epithelialisation with prolonged use. Avoid in sulphonamide allergy.'],
      ['Calamine lotion','Pruritus (chickenpox, insect bites, mild urticaria, sunburn, measles rash)','Apply liberally as needed to affected areas.','Cooling, antipruritic. Safe in all ages including children and pregnancy. Available OTC, cheap, widely used Nigeria.'],
      ['Zinc oxide paste/cream','Nappy rash (prevention + treatment), excoriated skin, stoma care','Apply thick layer with each nappy change as barrier.','Barrier protection. Anti-inflammatory. Safe for all ages.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));

  el_.appendChild(card('💊 Systemic Dermatology Drugs','#0ea5e9',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Drug</th><th>Indication</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
      ['Griseofulvin oral','Tinea capitis (scalp ringworm — first line), tinea unguium (nails)','500mg OD with fatty meal × 6–8 weeks (skin), 6–12 months (nails). Children: 10mg/kg/day.','Only oral agent effective for tinea capitis in children. Take with food (absorption). Photosensitivity — warn patients. Avoid in pregnancy and liver disease.'],
      ['Aciclovir 400mg oral','Herpes zoster (shingles), herpes simplex (cold sores, genital)','Shingles: 800mg 5×/day × 7 days (start within 72h of rash). HSV: 400mg TDS × 5–7 days.','Start shingles treatment within 72h for maximum benefit. Reduces duration and severity of post-herpetic neuralgia.'],
      ['Dapsone oral','Leprosy (MDT component), dermatitis herpetiformis','Leprosy PB: 100mg OD × 6 months. Leprosy MB: 100mg OD × 12 months (with Rifampicin + Clofazimine).','Check G6PD before starting — haemolysis in G6PD deficiency. Methaemoglobinaemia. WHO MDT for leprosy is free in Nigeria.'],
      ['Clofazimine oral','Leprosy (multibacillary MDT), atypical mycobacteria','Leprosy MB: 300mg once monthly (supervised) + 50mg OD. Duration 12 months.','Causes skin discolouration (red-brown) — warn patients. Also antipruritic. Part of WHO free leprosy MDT kit.'],
      ['Salicylic acid 2–12%','Warts (2–6%), psoriasis plaques (6–12%), hyperkeratosis, corn removal','Warts: apply OD after soaking, filing. Psoriasis: apply under occlusion as keratolytic before steroids.','Keratolytic — breaks down keratin. Do not apply to face or genitals. Systemic absorption with large areas — avoid in children.'],
      ['Aqueous cream / Emulsifying ointment','Eczema (atopic dermatitis) — moisturiser/emollient, soap substitute','Apply liberally and frequently (minimum 3–4×/day). Use as soap substitute in bath/shower.','Emollients are the FOUNDATION of eczema management. More important than steroids. Cheap, widely available. Reduces flare frequency.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));
}

function tabDrugObsGynae(el_) {
  el_.appendChild(secTitle('🤱','Obstetrics & Gynaecology Drug Reference','Antenatal, labour, PPH, contraception, gynaecology','#ec4899'));
  el_.appendChild(notebox('📌 <strong>Nigerian context:</strong> Maternal mortality remains high — hypertensive disorders of pregnancy, PPH, and sepsis are the leading causes. Drug availability varies widely between facilities. Where IV drugs unavailable, oral/IM alternatives are listed. Sources: WHO Essential Medicines for Reproductive Health 2021, FIGO 2022, SOGON Nigeria guidelines.','#fdf4ff','#f0abfc'));

  el_.appendChild(card('🤰 Antenatal — Hypertension in Pregnancy','#dc2626',
    notebox('⚠️ Treat BP ≥150/100 urgently in pregnancy. Target SBP 130–150, DBP 80–100 (avoid aggressive lowering — placental hypoperfusion). Pre-eclampsia = HTN + proteinuria ± end-organ damage after 20 weeks.','#fef2f2','#fecaca').outerHTML+
    '<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>Role</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
      ['Methyldopa','Oral first-line HTN in pregnancy — safest long-term record','250–500mg BD–TDS PO. Max 3g/day.','Best safety data in pregnancy. Sedation common. Do NOT use in depression. Positive Coombs test — warn.'],
      ['Labetalol oral','Second-line oral HTN in pregnancy','100–400mg BD–TDS PO. Max 2.4g/day.','Safe and effective. Avoid in asthma. Neonatal bradycardia/hypoglycaemia — monitor neonate.'],
      ['Labetalol IV','Acute severe HTN in pregnancy (SBP ≥160)','50mg IV over 1 min, repeat every 10 min. Max 200mg. Or 2mg/min infusion.','Preferred IV agent for acute HTN in pregnancy. Avoid in asthma.'],
      ['Nifedipine LA oral','Third-line / alternative to Labetalol','10–20mg BD–TDS. LA formulation preferred (less reflex tachycardia).','Do NOT use sublingual nifedipine — rapid drop causes foetal distress. Use LA formulation.'],
      ['Hydralazine IV','Acute severe HTN if Labetalol unavailable','5mg IV over 2 min. Repeat 5mg every 20 min. Max 20mg.','Widely available. More reflex tachycardia than Labetalol. Monitor FHR.'],
      ['Aspirin 75–150mg OD','Pre-eclampsia prevention (high risk women)','75–150mg OD from 12 weeks until delivery.','Indicated if: previous pre-eclampsia, CKD, diabetes, autoimmune disease, multiple pregnancy, first pregnancy >40yrs. Number needed to treat ~50.'],
      ['Magnesium Sulphate','Eclampsia prevention + treatment — FIRST LINE','Loading: 4g IV over 5–10 min. Maintenance: 1–2g/hr infusion × 24h after last seizure.','MAGPIE trial: halves risk of eclampsia. Monitor: RR >12/min, urine >25ml/hr, reflexes present. Antidote: Calcium gluconate 10ml 10% IV.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#dc2626;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));

  el_.appendChild(card('🍼 Labour, Delivery & PPH','#f97316',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fff7ed"><th>Drug</th><th>Indication</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
      ['Oxytocin (Syntocinon)','PPH prevention (first line), labour induction/augmentation','Prevention: 10 units IM after delivery. Treatment: 20–40 units in 500ml NS at 125ml/hr IV. Induction: 0.5–2 mU/min increasing.','NEVER as IV bolus — causes hypotension. Refrigerate. Most effective uterotonic.'],
      ['Ergometrine 0.5mg','PPH (step-up if Oxytocin insufficient)','0.2–0.5mg IM or slow IV. Repeat after 2–4h. Max 1mg/24h.','AVOID in hypertension, pre-eclampsia, cardiac disease, Raynaud\'s. Causes vasoconstriction.'],
      ['Misoprostol 600mcg SL','PPH prevention (where Oxytocin unavailable — heat stable)','600 mcg sublingual after delivery for prevention. 800 mcg for treatment.','WHO recommended alternative where Oxytocin unavailable/inactive (cold chain failure). Causes fever/chills — warn.'],
      ['Carboprost 0.25mg IM','PPH — third line uterotonic (Oxytocin + Ergometrine failed)','0.25mg IM every 15 min. Max 8 doses (2mg).','AVOID in asthma — bronchospasm. Diarrhoea, vomiting common.'],
      ['Tranexamic Acid 1g IV','PPH — antifibrinolytic (any cause). Give within 3 hours.','1g IV over 10 min. Repeat 1g if rebleeding within 24h.','WOMAN trial: reduces PPH death by 31% if given within 1h. Give regardless of cause alongside uterotonics.'],
      ['Dinoprostone (PGE2)','Cervical ripening, induction of labour','Vaginal gel 0.5mg, pessary 10mg (24h slow-release). Per local protocol.','Requires intact membranes. Continuous FHR monitoring needed. Remove pessary if hyperstimulation.'],
      ['Nifedipine oral','Tocolysis (preterm labour <34 weeks)','Loading: 20mg, then 10–20mg every 4–6h for 48h. Switch to MgSO₄ if not responding.','First-line tocolytic in most guidelines. Cheap, oral. Covers 48h to allow steroid administration.'],
      ['Dexamethasone IM','Foetal lung maturation (24–34 weeks preterm risk)','12mg IM every 12h × 2 doses (24mg total).','Standard pre-term steroid course. Reduces neonatal RDS, IVH, NEC. Give if delivery expected within 7 days.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#f97316;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));

  el_.appendChild(card('💊 Contraception','#8b5cf6',
    '<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Method</th><th>Drug</th><th>Dose/Use</th><th>Notes</th></tr></thead><tbody>'+[
      ['Emergency contraception','Levonorgestrel (Plan B/Postinor-2)','1.5mg single dose (or 0.75mg × 2, 12h apart) within 72h of unprotected sex. Effective up to 120h (reduced efficacy).','Available OTC in Nigeria. Not abortifacient — prevents implantation. Does not affect existing pregnancy. No contraindications except current pregnancy.'],
      ['Progestogen-only pill','Norethisterone 0.35mg','1 tablet OD — same time every day (no pill-free interval). Take within 3h window daily.','Safe in breastfeeding, HTN, migraines with aura (where COCP contraindicated). Irregular bleeding common.'],
      ['Injectable contraception','Medroxyprogesterone (Depo-Provera) 150mg IM','150mg IM every 12 weeks.','Highly effective, no daily compliance needed. Irregular bleeding initially. Fertility may take 12–18 months to return. Good for women who can\'t take COCP.'],
      ['Implant','Etonogestrel (Implanon) 68mg','Single rod inserted subdermally, upper arm. Lasts 3 years. Insert within 5 days of menstrual cycle.','Most effective reversible method. Trained provider needed for insertion. Irregular bleeding common. Rapidly reversible.'],
      ['Combined oral contraceptive','Ethinylestradiol + progestogen (various)','1 tablet OD × 21 days, 7-day break (or 28-day packs with placebos).','AVOID in: HTN >160/100, migraine with aura, smoker >35yrs, VTE history, liver disease, breastfeeding <6 weeks. Increases VTE risk slightly.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#8b5cf6;font-size:13px">'+r[0]+'</td><td style="font-size:13px;font-weight:600">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));

  el_.appendChild(card('🩺 Gynaecology','#16a34a',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Indication</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
      ['Clomifene 50mg','Ovulation induction (anovulatory infertility, PCOS)','50mg OD days 2–6 of cycle. Max 100mg. Max 6 cycles.','Anti-oestrogen. Ultrasound monitoring recommended (multiple pregnancy risk ~8%). Stop if no response after 3 cycles at 100mg.'],
      ['Metronidazole 400mg','Bacterial vaginosis, trichomoniasis, PID','BV: 400mg BD × 5–7 days PO or 2g single dose. Trichomonas: 2g single dose (treat partner). PID: 400mg BD × 14 days.','Avoid alcohol during treatment and 48h after (disulfiram reaction). Metallic taste common. Treat partner for trichomoniasis.'],
      ['Fluconazole 150mg','Vaginal candidiasis (thrush)','Single 150mg dose PO. Recurrent (>4/year): 150mg weekly × 6 months.','Oral preferred over pessary for compliance. Avoid in pregnancy (teratogenic). Clotrimazole pessary is safe alternative in pregnancy.'],
      ['Doxycycline + Metronidazole','PID — outpatient (mild-moderate)','Doxycycline 100mg BD × 14 days + Metronidazole 400mg BD × 14 days ± single dose Ceftriaxone 500mg IM.','Treat within 72h of diagnosis — reduces infertility risk. Test and treat partner for STIs.'],
      ['Benzathine Penicillin G','Syphilis (primary, secondary, early latent)','2.4 million units IM single dose. Late latent/unknown: 2.4 MU weekly × 3.','Screen all pregnant women at first antenatal visit — congenital syphilis remains a significant problem in Nigeria. Penicillin allergy: Doxycycline 100mg BD × 14 days (NOT in pregnancy).'],
      ['Tranexamic Acid 1g','Heavy menstrual bleeding (menorrhagia)','1g TDS PO during menstruation (up to 4 days). Max 4g/day.','FIRST LINE for menorrhagia (NICE). Reduces blood loss by ~50%. Not hormonal — no contraceptive effect. Safe for women who want to conceive.'],
      ['Norethisterone 5mg','Menorrhagia (short-term), period delay','Menorrhagia: 5mg TDS days 5–26 of cycle. Period delay: 5mg TDS starting 3 days before expected period.','Useful for period delay before exams, hajj, events. Not regular contraception at this dose.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));
}

function tabDrugHaematology(el_) {
  el_.appendChild(secTitle('🩸','Haematology Drug Reference','Anaemia, sickle cell, iron overload, clotting disorders, haematological malignancy','#ef4444'));
  el_.appendChild(notebox('📌 <strong>Nigerian context:</strong> Iron deficiency anaemia, sickle cell disease, and malaria-related anaemia are the most common haematological conditions. Haemolytic anaemias (SCD, G6PD deficiency) are particularly prevalent. Sources: BNF 2024, British Society for Haematology 2024, WHO 2023, Nigeria National Blood Transfusion Service guidelines.','#fef2f2','#fecaca'));

  el_.appendChild(card('💊 Anaemia Treatment','#ef4444',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>Indication</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
      ['Ferrous Sulphate 200mg','Iron deficiency anaemia — first line oral','200mg TDS PO (65mg elemental iron/tablet). Take on empty stomach. Continue 3 months after Hb normalises.','GI side effects (constipation, nausea, black stools) — most common cause of non-adherence. Take with Vitamin C to improve absorption. Do not take with tea, antacids, or antibiotics.'],
      ['Ferric Carboxymaltose IV (Ferinject)','Iron deficiency — IV (malabsorption, intolerance, severe, pregnancy)','500–1000mg IV single dose over 15 min. Max 1000mg/infusion. Repeat based on iron deficit calculation.','Single-dose IV — major advantage. Less infusion reactions than iron sucrose. Monitor for hypophosphataemia post-infusion (common).'],
      ['Iron Sucrose IV (Venofer)','Iron deficiency IV — alternative to ferric carboxymaltose','100–200mg IV 2–3×/week. Max 200mg/infusion.','Multiple infusions needed (vs single dose for Ferinject). Slower but well tolerated. Flush line with saline.'],
      ['Hydroxocobalamin 1mg IM','B12 deficiency (pernicious anaemia, dietary deficiency with neurological symptoms)','1mg IM every 2–3 days × 2 weeks, then 1mg every 3 months lifelong.','Pernicious anaemia requires lifelong IM treatment (intrinsic factor absent — oral B12 not absorbed). Replenish potassium — hypokalaemia on starting treatment.'],
      ['Folic Acid 5mg','Megaloblastic anaemia, SCD, haemolytic anaemia, pregnancy (high risk)','5mg OD PO. Lifelong in SCD and haemolytic anaemia.','Always check B12 first — folic acid corrects anaemia but not neurological damage of B12 deficiency. SCD patients need lifelong supplementation.'],
      ['Erythropoietin (EPO) alfa/beta','Anaemia of CKD, chemotherapy-induced anaemia','CKD: 50–100 units/kg SC 3×/week. Target Hb 10–12 g/dL (not higher — thrombosis risk).','Do NOT target normal Hb — increases thrombosis, stroke risk (TREAT trial). Ensure adequate iron stores before starting (ferritin >200, TSAT >20%).'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#ef4444;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));

  el_.appendChild(card('🩸 Sickle Cell Disease — Specific Drugs','#7c3aed',
    '<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Role in SCD</th><th>Dose</th><th>Evidence / Notes</th></tr></thead><tbody>'+[
      ['Hydroxyurea (Hydroxycarbamide)','Reduces crisis frequency by 50%, ACS risk, transfusion need. Disease-modifying.','15mg/kg/day PO initially. Titrate to 35mg/kg/day. Monitor FBC fortnightly until stable.','MSH trial: 44% reduction in painful crises. Increases HbF. Monitor: neutropenia (hold if ANC <2), thrombocytopaenia. Contraceptive during treatment (teratogenic).'],
      ['Folic acid 5mg OD','Lifelong supplementation — increased red cell turnover in SCD','5mg OD PO — lifelong','Haemolysis increases folate demand. Deficiency causes megaloblastic crisis on top of SCD. Give from diagnosis.'],
      ['Penicillin V prophylaxis','Infection prevention — functional asplenia. Mandatory in children.','Children <5: 62.5mg BD. Age 5–12: 125mg BD. >12: 250mg BD. All lifelong.','Splenic dysfunction from childhood. Prevents fatal pneumococcal sepsis. Also ensure vaccinated: Pneumococcal, Meningococcal, Hib, annual flu.'],
      ['Proguanil 100mg OD','Malaria prophylaxis — all SCD patients in endemic areas','100mg OD PO — year-round. Children: paediatric doses.','Malaria is a major trigger of SCD crisis and death in Nigeria. Non-negotiable prophylaxis. Add to Folic acid (some use Paludrine/Avloclor combo).'],
      ['Voxelotor (Oxbryta)','HbS polymerisation inhibitor — reduces sickling. Newer agent.','1500mg OD PO','Increases Hb, reduces haemolysis. Limited availability in Nigeria currently. HOPE trial evidence.'],
      ['Crizanlizumab (Adakveo)','Anti-P-selectin — reduces vaso-occlusive crises. IV infusion.','5mg/kg IV at 0, 2 weeks then monthly.','SUSTAIN trial: reduces crisis rate by 45%. IV administration limits use. Not widely available in Nigeria yet.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#7c3aed;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));

  el_.appendChild(card('🔩 Iron Chelation','#d97706',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fffbeb"><th>Drug</th><th>Indication</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
      ['Deferoxamine IM/IV (Desferal)','Iron overload (transfusion-dependent thalassaemia, SCD), acute iron poisoning','Chronic overload: 20–60 mg/kg/day SC infusion over 8–12h (5–7 nights/week). Acute poisoning: 15mg/kg/hr IV, max 80mg/kg/day.','SC infusion via pump (8h overnight). Audiometry and ophthalmology annually (neurotoxicity). Urine turns orange-red (vin rosé urine) — expected. Avoid high doses in low-iron-burden patients.'],
      ['Deferasirox oral (Exjade/Jadenu)','Iron overload — oral chelator (thalassaemia, SCD on regular transfusions)','20–40 mg/kg OD PO on empty stomach (dispersible tablet in water). Jadenu: 14–28mg/kg with light meal.','Once-daily oral — better adherence than Deferoxamine. Monitor: renal function, LFTs monthly. GI side effects common. Expensive.'],
      ['Deferiprone oral (Ferriprox)','Iron overload — oral, particularly cardiac iron overload','25mg/kg TDS PO. Max 100mg/kg/day.','Better cardiac iron chelation than Deferoxamine. Agranulocytosis risk (1%) — monitor FBC weekly. Combine with Deferoxamine for severe overload.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#d97706;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));

  el_.appendChild(card('💉 Clotting Disorders & Haemostasis','#0ea5e9',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Drug</th><th>Indication</th><th>Dose</th><th>Notes</th></tr></thead><tbody>'+[
      ['Tranexamic Acid','Haemophilia (adjunct), menorrhagia, trauma (CRASH-2), PPH (WOMAN), surgical bleeding','IV: 1g over 10 min. Oral: 1g TDS × 4 days (menorrhagia). Topical: mouthwash for dental bleeding in haemophilia.','Antifibrinolytic — inhibits plasminogen. Give early — most effective within first 3h.'],
      ['Desmopressin (DDAVP) 0.3mcg/kg IV/SC','Mild haemophilia A, von Willebrand disease type 1 — releases stored vWF/FVIII','0.3 mcg/kg IV/SC over 15–30 min. Intranasal: 150–300 mcg (Octim spray).','Test response before elective procedures. Tachyphylaxis after 3 doses. Monitor sodium — hyponatraemia risk. Avoid in type 2B vWD.'],
      ['Factor VIII concentrate','Haemophilia A — acute bleeds, prophylaxis, surgery','Dose depends on bleed severity. Minor: 15–20 IU/kg. Major: 30–50 IU/kg. Life-threatening: 50 IU/kg.','Target FVIII level: minor bleed >30%, major >50%, CNS bleed >80%. Half-life 8–12h — redose accordingly.'],
      ['Factor IX concentrate','Haemophilia B — acute bleeds, prophylaxis','Minor: 25–30 IU/kg. Major: 50 IU/kg. Life-threatening: 60–80 IU/kg.','Longer half-life than FVIII (18–24h). Calculate dose based on target Factor IX level.'],
      ['Protamine Sulphate','Heparin overdose reversal (IV unfractionated heparin)','1mg protamine per 100 units heparin given in last 4h. Max 50mg IV over 10 min. Slow infusion.','Partially reverses LMWH (60–80% reversal). No reversal for fondaparinux or DOACs. Causes hypotension if given fast.'],
      ['Filgrastim G-CSF','Febrile neutropenia (post-chemotherapy), stem cell mobilisation','300–480 mcg SC/IV OD. Start 24–48h after chemotherapy completion. Duration per protocol.','Reduces duration of neutropenia and infection complications. Bone pain common (treat with Paracetamol). Monitor FBC.'],
      ['Prednisolone','ITP (immune thrombocytopaenic purpura), AIHA, haematological malignancies','ITP: 1mg/kg/day PO × 2–4 weeks then taper. AIHA: 1–1.5mg/kg/day.','First-line for ITP and AIHA. Response in 2–4 weeks. If relapse: second-line agents (Rituximab, splenectomy). Monitor glucose, BP.'],
      ['Rituximab','ITP (second-line), AIHA, B-cell lymphomas, CLL, autoimmune','ITP/AIHA: 375mg/m² weekly × 4. Lymphoma: per protocol.','Anti-CD20 monoclonal antibody. Infusion reactions — premedicate. Reactivates Hepatitis B — screen before use. Long-term B-cell depletion — infection risk.'],
    ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9;font-size:13px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#6b7280">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div>'
  ));
}

