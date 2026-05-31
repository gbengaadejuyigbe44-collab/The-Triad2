// ════════════════════════════════════════════════════════════════
// THE TRIAD — Drug Reference Additions
// © 2026 Gbenga Adejuyigbe, RN, BNSc. All rights reserved.
// Adds ~500 drug entries to existing tabs via extension pattern.
// Loaded after all other drug tab files.
// ════════════════════════════════════════════════════════════════

(function() {

// ── Helper: append a card to an already-rendered tab ────────────
// Call after DOM is ready — hooks into renderContent completion.
// We store additions and flush them when the tab renders.
var _additions = {}; // key = tab name, value = fn(el_)

function addTo(tabName, fn) {
  if (!_additions[tabName]) _additions[tabName] = [];
  _additions[tabName].push(fn);
}

// ── Hook into renderContent to inject additions ──────────────────
function _flushAdditions() {
  if (typeof S === 'undefined' || S.module !== 'DRUG') return;
  var tabName = (TABS.DRUG || [])[S.tabs.DRUG];
  if (!tabName || !_additions[tabName]) return;
  var body = document.getElementById('drug-tab-body') ||
             document.getElementById('main-content');
  if (!body) return;
  // Avoid double-injection
  if (body.dataset.additionsLoaded === tabName) return;
  body.dataset.additionsLoaded = tabName;
  _additions[tabName].forEach(function(fn) { fn(body); });
}

var _origRC = window.renderContent;
window.renderContent = function() {
  _origRC.apply(this, arguments);
  _flushAdditions();
};

// ── Patch buildSearchIndex to include additions ───────────────────
var _origBSI = window.buildSearchIndex;
window.buildSearchIndex = function() {
  // Run original first
  _origBSI.apply(this, arguments);

  // Now append additions content to the search index
  if (!window._searchIndex) return;
  var hidden = document.createElement('div');
  hidden.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:300px;visibility:hidden;pointer-events:none';
  document.body.appendChild(hidden);

  Object.keys(_additions).forEach(function(tabName) {
    hidden.innerHTML = '';
    _additions[tabName].forEach(function(fn) {
      try { fn(hidden); } catch(e) {}
    });
    var raw = (hidden.innerText || hidden.textContent || '').replace(/\s+/g, ' ').toLowerCase();
    if (!raw.trim()) return;

    // Find existing entry for this tab and append to it
    var existing = null;
    for (var i = 0; i < window._searchIndex.length; i++) {
      if (window._searchIndex[i].mod === 'DRUG' && window._searchIndex[i].tab === tabName) {
        existing = window._searchIndex[i];
        break;
      }
    }
    if (existing) {
      existing.text += ' ' + raw;
      existing.rawText += ' ' + raw;
    } else {
      window._searchIndex.push({ mod: 'DRUG', tab: tabName, text: tabName.toLowerCase() + ' ' + raw, rawText: raw });
    }

    // Also add new terms to typeahead
    if (window._searchTypeahead) {
      var seen = {};
      window._searchTypeahead.forEach(function(w) { seen[w] = 1; });
      raw.split(/\s+/).forEach(function(w) {
        w = w.replace(/[^a-z0-9\-]/g, '');
        if (w.length >= 3 && !seen[w]) { seen[w] = 1; window._searchTypeahead.push(w); }
      });
    }
  });

  document.body.removeChild(hidden);
};

// ════════════════════════════════════════════════════════════════
// 1. ANALGESICS — add pentazocine, local anaesthetics, gout, more
// ════════════════════════════════════════════════════════════════
addTo('Analgesics', function(el_) {

  el_.appendChild(card('Opioid Analgesics — Extended','#dc2626',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>Dose</th><th>Route</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Pentazocine','25–100mg','PO/IM/IV','Every 3–4h (max 600mg/day)','Mixed opioid agonist-antagonist. Weak analgesic. Can precipitate withdrawal in opioid-dependent patients. Psychotomimetic effects (dysphoria, hallucinations). Scheduled drug. Use with caution in head injury.'],
    ['Dihydrocodeine','30mg','PO','Every 4–6h (max 240mg/day)','Stronger than codeine. Same CYP2D6 metabolism. Useful step-2 analgesic. Constipation common.'],
    ['Methadone','2.5–10mg','PO','Every 8–12h (specialist)','Long and variable half-life (8–59h) — risk of accumulation. Used for chronic pain and opioid dependence. QTc prolongation risk. Specialist initiation only.'],
    ['Alfentanil','10–50 mcg/kg','IV bolus','PRN procedural','Ultra-short opioid. Procedural sedation. ICU infusion. Shorter duration than fentanyl. No active metabolites.'],
    ['Remifentanil','0.05–2 mcg/kg/min','IV infusion','Continuous','Ultra-short opioid esterase-metabolised. No dose adjustment in renal/hepatic failure. Context-insensitive — offset within minutes of stopping. ICU/theatre only.'],
    ['Oxymorphone','5–10mg','PO (IR)','Every 4–6h','Potent opioid — 3× morphine potency. No active metabolites. Not widely available in Africa.'],
    ['Codeine phosphate','15–60mg','PO/IM','Every 4–6h (max 240mg/day)','Step-2 analgesic. Antitussive at lower doses. Avoid in ultra-rapid CYP2D6 metabolisers (neonatal death risk if breastfeeding).'],
    ['Nalbuphine','10–20mg','IV/IM/SC','Every 3–6h','Agonist-antagonist opioid. Less respiratory depression than morphine at equianalgesic doses. Can precipitate withdrawal. Useful in post-op pain.'],
    ['Meptazinol','200mg','PO','Every 3–6h','Partial opioid agonist. Less constipation than full agonists. Short duration. Used for moderate pain.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#dc2626">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Local Anaesthetics','#0ea5e9',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Drug</th><th>Max Dose</th><th>Onset</th><th>Duration</th><th>Key Uses / Cautions</th></tr></thead><tbody>' + [
    ['Lidocaine (Lignocaine)','3mg/kg plain; 7mg/kg with adrenaline','Rapid (2–5 min)','1–2h (plain); 2–4h (with adrenaline)','Most versatile LA. IV for ventricular arrhythmias (1–1.5mg/kg bolus). Topical for airways, procedures. Avoid plain solution in fingers, toes, ears, nose, penis (end arteries).'],
    ['Bupivacaine','2mg/kg (max 150mg)','Slow (10–20 min)','4–8h','Long-acting. Spinal/epidural/nerve block. Cardiotoxic in overdose — avoid IV. 0.25–0.5% solutions. Hyperbaric for spinal.'],
    ['Levobupivacaine','2mg/kg (max 150mg)','Slow','4–8h','S-enantiomer of bupivacaine. Less cardiotoxic. Otherwise similar profile. Preferred for epidural in obstetrics.'],
    ['Ropivacaine','3mg/kg (max 225mg)','Intermediate','3–6h','Less cardiotoxic than bupivacaine. Good for epidural and nerve blocks. Less motor block at low concentrations (good for labour epidural).'],
    ['Prilocaine','6mg/kg (max 400mg)','Rapid','1–2h','Used in EMLA cream (with lidocaine). IV regional anaesthesia (Bier block). Methaemoglobinaemia risk at high doses — avoid in neonates.'],
    ['Articaine','7mg/kg (max 500mg)','Very rapid','1–2h (plain); 3–5h (with adrenaline)','Dental anaesthesia primarily. Only amide LA with ester side chain — unique metabolism. High protein binding.'],
    ['Benzocaine','Topical only','Immediate','15–30 min','Topical only — mucous membranes, skin. Throat lozenges, dental gels. Methaemoglobinaemia risk with excessive use.'],
    ['EMLA Cream (Lidocaine 2.5% + Prilocaine 2.5%)','1–2g/10cm²','45–60 min application','1–2h after removal','Topical for venepuncture, cannulation, procedures. Apply under occlusive dressing. Avoid mucous membranes. Methaemoglobinaemia in infants <3 months.'],
    ['Tetracaine (Amethocaine)','Topical only','20–45 min','4–6h','Ester LA. Ametop gel for venepuncture. Eye drops for corneal anaesthesia. More potent than EMLA for topical use.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td style="font-size:12px">'+r[4]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Gout & Uric Acid Management','#16a34a',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Colchicine (acute gout)','1mg then 500mcg after 1h','One-off (acute) then prophylaxis 500mcg BD','First-line for acute gout. Do not repeat acute course within 3 days. Diarrhoea, nausea, vomiting common. Reduce dose in CKD. Avoid with strong CYP3A4 inhibitors (clarithromycin — fatal toxicity).'],
    ['Allopurinol','100mg OD initially → 300–600mg OD','OD (with food)','Urate-lowering therapy. Start 2–4 weeks after acute attack settles. Titrate to serum urate <360 µmol/L. HLA-B*5801 screen before starting (Han Chinese, Thai, Korean — Stevens-Johnson risk). Rash common — stop if rash develops.'],
    ['Febuxostat','80–120mg','OD','XO inhibitor. Alternative to allopurinol if intolerant. Avoid in patients with established CVD (CARES trial mortality signal — though debated). No HLA-B*5801 screening required.'],
    ['Probenecid','250mg BD → 500mg BD–TDS','BD–TDS','Uricosuric — increases renal urate excretion. Avoid in eGFR <30. Not for overproducers. Aspirin antagonises its effect. Maintain high fluid intake.'],
    ['Benzbromarone','50–200mg','OD','Potent uricosuric. Used where allopurinol fails. Hepatotoxicity risk — monitor LFTs. Not available in UK/US but used in Africa, Europe, Asia.'],
    ['Rasburicase','0.2mg/kg IV','OD for 5–7 days','Recombinant uricase. Used in tumour lysis syndrome — rapidly lowers uric acid. G6PD deficiency contraindication (haemolysis). Specialist use.'],
    ['Lesinurad','200mg','OD (with allopurinol)','URAT1 inhibitor — combination urate-lowering therapy. Always combine with XO inhibitor. Not monotherapy. Monitor renal function.'],
    ['Pegloticase','8mg IV infusion','Every 2 weeks','PEGylated recombinant uricase. For refractory chronic gout. Pre-medicate with antihistamine + steroid (infusion reactions). G6PD screen first.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Muscle Relaxants & Antispasmodics','#f97316',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fff7ed"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Baclofen','5mg TDS → up to 80mg/day','TDS','GABA-B agonist. Spasticity (MS, spinal cord injury). Abrupt withdrawal causes seizures, hallucinations. Intrathecal pump for severe spasticity. Reduce dose in renal failure.'],
    ['Tizanidine','2–4mg','TDS–QDS (max 36mg/day)','Alpha-2 agonist. Spasticity. Sedation, dry mouth, hypotension. Hepatotoxicity — monitor LFTs at 1 month. Avoid with fluvoxamine or ciprofloxacin (CYP1A2 inhibitors — dangerous BP drop).'],
    ['Dantrolene','25mg OD → up to 100mg QDS','OD–QDS','Peripheral muscle relaxant — ryanodine receptor antagonist. For spasticity AND malignant hyperthermia (IV 2.5mg/kg, repeat PRN). Hepatotoxicity — monitor LFTs monthly.'],
    ['Cyclobenzaprine','5–10mg','TDS (max 2–3 weeks)','Tricyclic muscle relaxant. For acute musculoskeletal pain. Sedation, dry mouth. Not for chronic use. Serotonin syndrome risk with SSRIs/MAOIs.'],
    ['Methocarbamol','750mg–1.5g','QDS (acute); TDS (maintenance)','Central muscle relaxant. Acute musculoskeletal pain. Available PO and IV. Urine discolouration (dark brown — harmless).'],
    ['Orphenadrine','100mg','BD','Anticholinergic muscle relaxant. Also used in Parkinson disease for tremor. Dry mouth, urinary retention, confusion. Avoid in glaucoma.'],
    ['Diazepam (muscle spasm)','2–10mg','TDS–QDS (short-term)','Benzodiazepine. Effective for acute muscle spasm. Sedation, dependence risk. Short courses only (2–4 weeks max).'],
    ['Carisoprodol','250–350mg','TDS + at bedtime','Central muscle relaxant. Metabolised to meprobamate (abuse potential). Scheduled. Available in some African countries.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#f97316">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));
});

// ════════════════════════════════════════════════════════════════
// 2. ANTIBIOTICS — antifungals, antivirals, antiparasitics
// ════════════════════════════════════════════════════════════════
addTo('Antibiotics', function(el_) {

  el_.appendChild(card('Antifungals — Systemic & Topical','#8b5cf6',
    '<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Dose</th><th>Route</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Fluconazole','150mg single dose (vaginal candidiasis); 200–400mg OD (systemic)','PO/IV','First-line for Candida. Ineffective against Aspergillus, C. krusei, C. glabrata (reduced susceptibility). Check CYP2C9 interactions (warfarin, phenytoin, sulfonylureas — all potentiated).'],
    ['Itraconazole','100–200mg BD (loading); 200mg OD (maintenance)','PO (with food or cola drink)','Broad spectrum including Aspergillus. Poor bioavailability — must take with acidic food. Many drug interactions (CYP3A4 inhibitor). Negative inotrope — avoid in heart failure.'],
    ['Voriconazole','400mg BD (loading) → 200mg BD (maintenance)','PO/IV','First-line invasive aspergillosis. Visual disturbances (photopsia) — warn patients. Hepatotoxicity, photosensitivity, QTc prolongation. Many interactions — check before prescribing.'],
    ['Posaconazole','300mg BD day 1 → 300mg OD','PO (with fatty meal)','Broad spectrum including mucormycosis. Prophylaxis in high-risk haematology patients. Fewer drug interactions than voriconazole. IV available.'],
    ['Caspofungin','70mg IV day 1 → 50mg OD','IV','Echinocandin — first-line for invasive candidiasis, empiric therapy in neutropenic fever. Active against biofilms. Well tolerated. Reduce dose in Child-Pugh B/C hepatic impairment.'],
    ['Micafungin','100mg OD (treatment); 50mg OD (prophylaxis)','IV','Echinocandin. No dose adjustment in renal failure. Active against Candida including azole-resistant strains. Less drug interactions than azoles.'],
    ['Anidulafungin','200mg IV day 1 → 100mg OD','IV','Echinocandin. No hepatic dose adjustment needed. Minimal drug interactions. Used for invasive candidiasis.'],
    ['Amphotericin B (conventional)','0.5–1mg/kg OD','IV','Polyene — broad spectrum including Cryptococcus, mucormycosis, Histoplasma. Nephrotoxic — monitor creatinine, electrolytes daily. Pre-medicate with paracetamol + hydrocortisone. Hypomagnesaemia, hypokalaemia. Infuse over 4–6h.'],
    ['Amphotericin B liposomal (AmBisome)','3–5mg/kg OD','IV','Lipid formulation — much less nephrotoxic than conventional. First-line for cryptococcal meningitis (5mg/kg), mucormycosis, visceral leishmaniasis. Expensive.'],
    ['Flucytosine','25mg/kg QDS','PO/IV','Used in combination only (with amphotericin for cryptococcal meningitis). Rapidly develops resistance as monotherapy. Bone marrow suppression — monitor FBC. Reduce dose in renal failure.'],
    ['Clotrimazole','Topical cream/pessary — as directed','Topical','Azole antifungal. Vaginal candidiasis (500mg pessary single dose or 200mg × 3 days). Tinea, athlete\'s foot, oral thrush (lozenges). Minimal systemic absorption.'],
    ['Nystatin','100,000 units QDS (oral rinse and swallow)','PO (topical to mucosa)','Polyene. Not absorbed — topical use only. Oral candidiasis, nappy rash, oesophageal candidiasis (PO suspension). No systemic antifungal activity.'],
    ['Griseofulvin','500mg OD (with fatty meal)','PO','Dermatophyte infections only (tinea capitis, onychomycosis). Long treatment courses (6 weeks–12 months). Many drug interactions (CYP inducer). Photosensitivity. Now largely superseded by terbinafine.'],
    ['Terbinafine','250mg OD','PO','First-line for onychomycosis and tinea capitis. 6 weeks (fingernails) to 12 weeks (toenails). Hepatotoxicity — check LFTs if symptoms. Taste disturbance.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#8b5cf6">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Antivirals — Systemic','#ef4444',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>Dose</th><th>Indication</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Aciclovir (Acyclovir)','200mg 5×/day (HSV labialis); 400mg TDS (genital HSV); 800mg 5×/day (VZV); 5–10mg/kg TDS IV (severe)','HSV, VZV, EBV','First-line for herpes simplex and varicella-zoster. IV for severe/immunocompromised. Renal dose adjustment essential (crystalluria/nephrotoxicity). Hydrate well with IV form.'],
    ['Valaciclovir','500mg–1g BD (HSV); 1g TDS × 7 days (VZV)','HSV, VZV','Prodrug of aciclovir. Better oral bioavailability. Fewer tablets. TTP/HUS risk at high doses in immunocompromised — caution.'],
    ['Famciclovir','250mg TDS (HSV); 500mg TDS (VZV × 7d)','HSV, VZV','Prodrug of penciclovir. Alternative to valaciclovir. Renal dose adjustment.'],
    ['Ganciclovir','5mg/kg BD IV (induction); 5mg/kg OD (maintenance)','CMV','CMV retinitis, CMV disease in transplant/HIV. Bone marrow suppression (neutropenia) — monitor FBC twice weekly. Teratogenic, carcinogenic. Avoid with zidovudine (additive myelosuppression).'],
    ['Valganciclovir','900mg BD (induction) × 21 days; 900mg OD (maintenance)','CMV','Oral prodrug of ganciclovir. Equivalent efficacy to IV ganciclovir for CMV retinitis. Same toxicity profile. Significant renal dose adjustment.'],
    ['Oseltamivir (Tamiflu)','75mg BD × 5 days','Influenza A + B','Start within 48h of symptom onset. Reduce dose in eGFR <30. Neuropsychiatric events reported in children (Japan) — monitor.'],
    ['Zanamivir','10mg (2 inhalations) BD × 5 days','Influenza A + B','Inhaled — for patients who cannot take oseltamivir. Bronchospasm in asthma/COPD — have bronchodilator ready. Do NOT use in ventilated patients.'],
    ['Ribavirin','600mg BD (with peginterferon for HCV); 200mg/kg TDS inhaled (RSV)','HCV, RSV, Lassa fever','Broad-spectrum antiviral. Haemolytic anaemia — monitor Hb. Teratogenic — two effective methods of contraception for 6 months after stopping (both partners). Used in Lassa fever treatment in Nigeria.'],
    ['Sofosbuvir + Velpatasvir','1 tablet OD × 12 weeks','HCV (pan-genotypic)','Pangenotypic HCV treatment. >95% SVR. Well tolerated. Avoid with rifampicin, carbamazepine (reduce sofosbuvir levels). Check drug interactions before prescribing.'],
    ['Tenofovir alafenamide (TAF)','25mg OD (with food)','HBV, HIV (component)','HBV: superior to tenofovir disoproxil fumarate (TDF) with less renal and bone toxicity. Component of many HIV regimens. Monitor renal function.'],
    ['Entecavir','0.5mg OD (treatment-naive); 1mg OD (lamivudine-resistant)','Chronic HBV','First-line for HBV. Minimal resistance. Take on empty stomach. Avoid in HIV/HBV coinfection without full ART (selects HIV resistance).'],
    ['Letermovir','480mg OD (240mg OD if with cyclosporin)','CMV prophylaxis','Post-haematopoietic stem cell transplant CMV prophylaxis. Much better tolerated than ganciclovir. Not for treatment — only prophylaxis.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#ef4444">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Extended Antibiotic Reference','#16a34a',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Dose</th><th>Route</th><th>Spectrum / Notes</th></tr></thead><tbody>' + [
    ['Meropenem','1–2g TDS','IV','Broadest spectrum beta-lactam. Gram-positive, gram-negative including Pseudomonas, anaerobes. CNS infections: 2g TDS. Reduce dose in CKD. Seizure risk (less than imipenem).'],
    ['Imipenem-cilastatin','500mg–1g QDS','IV','Carbapenem + renal tubular enzyme inhibitor. Very broad spectrum. Higher seizure risk than meropenem. Avoid for CNS infections — use meropenem.'],
    ['Ertapenem','1g OD','IV/IM','Carbapenem — once daily. Does NOT cover Pseudomonas or Acinetobacter. Good for community-acquired infections, diabetic foot. Can give IM (with lidocaine) — useful in resource-limited settings.'],
    ['Ceftriaxone','1–2g OD','IV/IM','Third-generation cephalosporin. Community pneumonia (1g OD), meningitis (2g BD), gonorrhoea (1g IM single dose). Can give IM without lidocaine. Biliary sludge/stones with prolonged use.'],
    ['Cefotaxime','1–2g BD–QDS','IV','Third-generation cephalosporin. Good CNS penetration. Preferred over ceftriaxone in neonates (less bilirubin displacement).'],
    ['Ceftazidime','1–2g TDS','IV','Third-generation — covers Pseudomonas. For Pseudomonas UTI, hospital pneumonia, febrile neutropenia (with gentamicin). Less gram-positive activity.'],
    ['Cefepime','1–2g BD–TDS','IV','Fourth-generation cephalosporin. Covers Pseudomonas + extended gram-positive. For febrile neutropenia, hospital-acquired pneumonia.'],
    ['Ceftazidime-avibactam','2.5g TDS','IV','Anti-ESKAPE coverage. Covers KPC and OXA-48 carbapenemase-producing Enterobacterales. Used for carbapenem-resistant infections. Specialist use.'],
    ['Piperacillin-tazobactam (Tazocin)','4.5g TDS–QDS','IV','Broad-spectrum BL/BLI. Covers Pseudomonas, anaerobes. Hospital-acquired infections, intra-abdominal sepsis, febrile neutropenia. Reduce dose in CKD.'],
    ['Ampicillin-sulbactam (Unasyn)','1.5–3g TDS','IV/IM','BL/BLI combination. Covers MRSA weakly, Acinetobacter (sulbactam has intrinsic activity). Intra-abdominal infections, aspiration pneumonia.'],
    ['Colistin (Polymyxin E)','Loading dose 9 MU → 4.5 MU BD (maintenance)','IV (inhaled for pulm)','Last-resort agent for MDR gram-negative (Acinetobacter, Pseudomonas, KPC-Klebsiella). Nephrotoxic — monitor renal function daily. Neurotoxicity. Inhaled for VAP. Always use loading dose.'],
    ['Fosfomycin','3g single dose (uncomplicated UTI); 12–24g/day IV (systemic)','PO/IV','Cell wall synthesis inhibitor — unique mechanism. UTI including ESBL and MRSA UTI (oral). IV for systemic MRSA, MDR infections (specialist). Generally good tolerability.'],
    ['Doxycycline','100mg BD (most indications)','PO/IV','Tetracycline. Atypical pneumonia, malaria prophylaxis, rickettsial infections, Lyme disease, chlamydia, brucellosis. Photosensitivity. Oesophageal ulceration — take upright with water. Avoid in pregnancy and children <8y.'],
    ['Tigecycline','100mg loading → 50mg BD','IV','Glycylcycline. Broad spectrum including MRSA, VRSA, MDR gram-negatives. NOT reliable for Pseudomonas or bacteraemia. Higher mortality vs comparators in some trials — use as last resort.'],
    ['Chloramphenicol','500mg–1g QDS PO; 25mg/kg QDS IV','PO/IV','Broad-spectrum bacteriostatic. Reserved for typhoid (where resistance allows), meningitis in penicillin allergy. Aplastic anaemia (idiosyncratic, rare) — avoid prolonged use. Grey baby syndrome in neonates.'],
    ['Nitrofurantoin','50–100mg QDS (immediate-release) or 100mg BD (MR)','PO','Lower UTI only — does not achieve therapeutic levels in tissue/blood. Avoid if eGFR <30 (ineffective + toxic). Pulmonary toxicity with prolonged use.'],
    ['Trimethoprim','200mg BD (UTI); 160/800mg BD (PCP — high dose)','PO','UTI, PCP prophylaxis and treatment (co-trimoxazole for PCP). Hyperkalaemia (potassium-sparing effect) — caution in CKD, ACEi/ARBs. Folate antagonist.'],
    ['Linezolid','600mg BD','PO/IV','Oxazolidinone. MRSA, VRE, MDR-TB (component). 100% oral bioavailability. Serotonin syndrome with SSRIs/MAOIs. Thrombocytopenia, peripheral neuropathy with >2 weeks use. Monitor FBC weekly.'],
    ['Tedizolid','200mg OD','PO/IV','Oxazolidinone. Once daily. Better tolerability than linezolid. MRSA skin infections. Less myelosuppression. Shorter approved duration (6 days for ABSSSI).'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));
});

// ════════════════════════════════════════════════════════════════
// 3. EMERGENCY MEDS — RSI drugs, antidotes, reversal agents
// ════════════════════════════════════════════════════════════════
addTo('Emergency Meds', function(el_) {

  el_.appendChild(card('Rapid Sequence Induction (RSI) Drugs','#dc2626',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>RSI Dose</th><th>Onset</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Ketamine','1.5–2mg/kg IV','45–60 sec','Dissociative anaesthetic. Maintains airway reflexes and BP. Bronchodilator — preferred in asthma/bronchospasm. Sympathomimetic — good in haemodynamically unstable patients. Avoid in raised ICP (controversial — evidence now supports use). Emergence hallucinations — co-administer midazolam.'],
    ['Propofol','1.5–2.5mg/kg IV (reduce in elderly/unwell)','15–30 sec','Rapid offset — allows neurological reassessment. Reduces ICP and CMRO2. Causes hypotension — use with caution in haemodynamic compromise. Propofol infusion syndrome with prolonged high-dose ICU use.'],
    ['Thiopental (Thiopentone)','3–5mg/kg IV','15–30 sec','Barbiturate — reduces ICP, CMRO2. First choice for status epilepticus induction. Profound hypotension. Tissue necrosis if extravasation (pH 10.8) — do not give IM. Now restricted/unavailable in many centres.'],
    ['Etomidate','0.3mg/kg IV','30–60 sec','Haemodynamically stable — preferred in shocked patients. Adrenal suppression with single dose (cortisol suppression for 4–8h) — controversial in sepsis. No analgesic properties. Myoclonus common.'],
    ['Suxamethonium (Succinylcholine)','1.5mg/kg IV (RSI); 2–3mg/kg paeds','45–60 sec','Depolarising NMB. Fastest onset/offset. CONTRAINDICATED: burns >48h, crush injuries, prolonged immobility, UMN lesions, hyperkalaemia risk. Phase 2 block with repeated doses. Malignant hyperthermia trigger.'],
    ['Rocuronium','1.2mg/kg IV (high-dose RSI)','60–90 sec','Non-depolarising NMB. Alternative to suxamethonium when contraindicated. Can be reversed with sugammadex (16mg/kg). Duration 60–90 min at 1.2mg/kg dose.'],
    ['Vecuronium','0.1mg/kg IV (intubation); 0.01mg/kg/h (maintenance)','3–5 min','Intermediate-acting NMB. Maintenance infusion in ICU. Cardiovascularly stable. Reversed with neostigmine.'],
    ['Atracurium','0.5mg/kg IV (intubation); infusion 0.3–0.6mg/kg/h','2–3 min','Intermediate NMB. Organ-independent metabolism (Hofmann elimination) — preferred in hepatic and renal failure. Histamine release at high doses (bronchospasm, flushing).'],
    ['Cisatracurium','0.15mg/kg IV','3–5 min','Stereoisomer of atracurium. Less histamine release. Hofmann elimination — safe in organ failure. Preferred over atracurium in ICU.'],
    ['Midazolam','0.05–0.1mg/kg IV (procedural); 0.1–0.2mg/kg (RSI co-induction)','1–3 min','Benzodiazepine. Co-induction agent. Amnesic, anxiolytic, anticonvulsant. Flumazenil reversal. Prolonged sedation in liver disease.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#dc2626">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Antidotes & Reversal Agents','#d97706',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fffbeb"><th>Poison / Drug</th><th>Antidote</th><th>Dose</th><th>Notes</th></tr></thead><tbody>' + [
    ['Opioids','Naloxone','0.4–2mg IV/IM/SC/IN every 2–3 min (max 10mg)','Short half-life — may need repeat doses or infusion (2/3 of resuscitation dose/hr). IN route effective if no IV access.'],
    ['Benzodiazepines','Flumazenil','200mcg IV over 15 sec, then 100mcg every 60 sec (max 1mg)','Short duration (30–90 min) — resedation risk. Do NOT use in chronic BZD users (precipitates seizures). Not for mixed overdose.'],
    ['Paracetamol overdose','N-Acetylcysteine (NAC)','150mg/kg IV over 1h → 50mg/kg over 4h → 100mg/kg over 16h','Use Rumack-Matthew nomogram. Start within 8–10h for best effect. Anaphylactoid reactions — treat symptomatically, slow infusion. PO route (methionine) if IV not available.'],
    ['Warfarin / Vitamin K antagonists','Vitamin K1 (phytomenadione)','1–5mg IV/PO (over-anticoagulation); 10mg IV (major bleeding)','Also give 4-factor PCC (Beriplex, Octaplex) 25–50 units/kg for life-threatening bleeding — reversal within minutes. FFP if PCC unavailable.'],
    ['Dabigatran','Idarucizumab (Praxbind)','5g IV (two 2.5g vials)','Specific reversal of dabigatran. Complete reversal within minutes. Indicated for life-threatening/emergency surgery.'],
    ['Rivaroxaban / Apixaban','Andexanet alfa (Ondexxya)','400–800mg IV depending on dose/timing','Specific reversal of factor Xa inhibitors. Very expensive — many centres use PCC (50 units/kg) as alternative.'],
    ['Heparin (UFH)','Protamine sulfate','1mg per 100 units heparin given in last 2–3h (max 50mg)','Binds and inactivates heparin. Partial reversal of LMWH (protamine 1mg per 1mg enoxaparin — max 50mg). Fish allergy risk (vasovagal reactions common).'],
    ['Organophosphates','Atropine + Pralidoxime (2-PAM)','Atropine 2–4mg IV every 5–10 min until secretions dry; Pralidoxime 1–2g IV over 30 min','Atropine for muscarinic symptoms (secretions, bronchospasm). Pralidoxime reactivates AChE if given early (<24–48h). Nigeria: agricultural organophosphate poisoning common.'],
    ['Cyanide poisoning','Hydroxocobalamin (Cyanokit)','5g IV over 15 min','First-line for cyanide poisoning (smoke inhalation, industrial). Turns urine/skin red-brown — warn patient. Alternative: sodium thiosulphate 12.5g IV.'],
    ['Beta-blocker overdose','High-dose insulin + glucagon','Insulin: 1 unit/kg IV bolus then 0.5–2 units/kg/h; Glucagon: 50–150mcg/kg IV then infusion','High-dose insulin euglycaemia (HDIE) therapy — preferred for refractory shock. Glucagon for initial management. Monitor glucose closely with insulin therapy.'],
    ['TCA overdose','Sodium bicarbonate','1–2 mEq/kg IV bolus, repeat to maintain pH 7.45–7.55','Sodium loading narrows QRS, alkalinisation reduces drug-protein binding. Lipid emulsion 20% (Intralipid) for refractory toxicity.'],
    ['Iron overdose','Desferrioxamine','15mg/kg/hr IV (max 80mg/kg/day)','Chelating agent. For severe iron poisoning (serum iron >90 µmol/L or features of toxicity). Urine turns reddish-pink (vin rosé) indicating effective chelation.'],
    ['Methotrexate toxicity','Folinic acid (Leucovorin)','Dose dependent on MTX level — specialist guidance','Rescues folate pathway bypassing DHFR inhibition. Must give within 24h ideally. Also glucarpidase (specialist) for very high levels. Hydrate aggressively.'],
    ['Digoxin toxicity','Digoxin-specific antibody fragments (Digibind/DigiFab)','Based on body load calculation (see package insert)','Fab fragments bind free digoxin rapidly. Use for: K⁺ >5.5, haemodynamic compromise, symptomatic arrhythmia. Cardiac arrest dose: 10 vials IV. Monitor for rebound toxicity.'],
    ['Methanol/ethylene glycol','Fomepizole (4-MP)','15mg/kg loading IV → 10mg/kg every 12h × 4 doses → 15mg/kg every 12h','ADH inhibitor — prevents formation of toxic metabolites. Alternative: IV ethanol infusion (where fomepizole unavailable). Haemodialysis for severe cases.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#d97706">'+r[0]+'</td><td style="font-weight:600;color:#1e293b">'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));
});

// ════════════════════════════════════════════════════════════════
// 4. ELECTROLYTES — calcium, phosphate, zinc, vitamins, TPN
// ════════════════════════════════════════════════════════════════
addTo('Electrolytes', function(el_) {

  el_.appendChild(card('Calcium Disorders','#0ea5e9',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Condition / Drug</th><th>Dose</th><th>Route</th><th>Notes</th></tr></thead><tbody>' + [
    ['Hypocalcaemia (acute) — Calcium gluconate','10ml of 10% (1 ampoule = 2.25 mmol Ca²⁺) IV slowly over 10 min','IV','For symptomatic hypocalcaemia (tetany, seizures, QTc prolongation). Repeat and/or infusion (10 ampoules in 500ml over 4–8h) if severe. Preferred over calcium chloride peripherally (less sclerosant).'],
    ['Hypocalcaemia (acute) — Calcium chloride','10ml of 10% (1 ampoule = 6.8 mmol Ca²⁺)','IV (central only)','3× more elemental calcium than gluconate. Use in cardiac arrest only or via central line. Causes severe tissue necrosis if extravasated.'],
    ['Chronic hypocalcaemia — Calcium carbonate','500mg–2.5g (elemental Ca²⁺) daily in divided doses','PO (with food)','Take with meals for best absorption. Constipation. Antacid effect. Also used as phosphate binder in CKD.'],
    ['Vitamin D — Colecalciferol (D3)','800–2000 IU OD (deficiency prevention); 50,000 IU weekly × 8–12 weeks (repletion)','PO','Monitor 25-OH vitamin D levels. Target 50–100 nmol/L. Toxicity only with very high doses (>10,000 IU/day for months).'],
    ['Active Vitamin D — Calcitriol','0.25–2 mcg OD','PO','For renal osteodystrophy, hypoparathyroidism. Does not require renal activation (1-alpha hydroxylation). Risk of hypercalcaemia — monitor Ca²⁺ weekly when initiating.'],
    ['Alfacalcidol (1-alpha calcidol)','0.5–1 mcg OD','PO/IV','Pro-drug of calcitriol. Requires hepatic (not renal) activation. CKD patients with eGFR <30. Monitor serum calcium.'],
    ['Hypercalcaemia — IV Hydration','0.9% NaCl 2–4L/day','IV','First-line for all hypercalcaemia — corrects volume depletion and promotes calciuresis. Target urine output 100–150ml/hr. Do NOT use furosemide routinely.'],
    ['Hypercalcaemia — Zoledronic acid','4mg IV over 15 min (single dose)','IV','Most potent bisphosphonate for hypercalcaemia of malignancy. Onset 24–48h, peak at 4–7 days, duration 4–6 weeks. Renal dose adjustment.'],
    ['Hypercalcaemia — Pamidronate','60–90mg IV over 4–24h','IV','Alternative bisphosphonate. Less potent than zoledronic acid. Used in renal impairment (infuse over longer duration).'],
    ['Hypercalcaemia — Calcitonin','4–8 units/kg IM/SC every 6–12h','IM/SC','Rapid onset (4–6h) — useful adjunct while bisphosphonate takes effect. Tachyphylaxis after 48–72h. Salmon calcitonin. Minimal toxicity.'],
    ['Cinacalcet','30mg OD → titrate to 90mg QDS','PO','Calcimimetic. For secondary hyperparathyroidism in dialysis patients, primary hyperparathyroidism (inoperable). Nausea common. Monitor serum Ca²⁺.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Phosphate, Zinc & Trace Elements','#16a34a',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Dose</th><th>Route</th><th>Notes</th></tr></thead><tbody>' + [
    ['Hypophosphataemia — IV Phosphate','0.2–0.4 mmol/kg IV over 6–12h (moderate); up to 0.5 mmol/kg (severe)','IV','Sodium or potassium phosphate. Monitor closely — rapid correction causes hypocalcaemia. Severe: <0.3 mmol/L with symptoms (weakness, respiratory failure, haemolysis). Refeeding syndrome cause.'],
    ['Hypophosphataemia — Oral Phosphate','Phosphate-Sandoz 1–2 tablets TDS','PO','Each tablet: 16 mmol phosphate + 3.1 mmol K⁺ + 20.4 mmol Na⁺. Diarrhoea common. For mild–moderate hypophosphataemia (>0.5 mmol/L, asymptomatic).'],
    ['Hyperphosphataemia — Sevelamer','800mg TDS with meals','PO','Phosphate binder — CKD/dialysis. Non-calcium-based (no calcium loading). Constipation. Also lowers LDL (bile acid sequestrant effect).'],
    ['Hyperphosphataemia — Calcium carbonate (binder)','1.25–2.5g with meals','PO','Calcium-based phosphate binder. Cheap. Risk of hypercalcaemia and vascular calcification with long-term use. Avoid in hypercalcaemia.'],
    ['Hyperphosphataemia — Lanthanum carbonate','500mg–1g TDS (chew with/after meals)','PO','Non-calcium, non-aluminium binder. Effective. GI side effects. Long-term safety data accumulating.'],
    ['Zinc sulfate','220mg OD–BD (elemental zinc 50mg/dose)','PO','Zinc deficiency: impaired wound healing, taste disturbance, diarrhoea (also treats in children — 10–20mg OD × 10 days per WHO protocol). Competes with copper absorption at high doses. Take between meals.'],
    ['Zinc acetate','50mg BD–TDS','PO','Wilson disease (maintenance after decoppering with D-penicillamine). Induces metallothionein — binds intestinal copper. Fewer side effects than chelators. Gastric irritation.'],
    ['Selenium','100–200 mcg OD','PO/IV','Deficiency in long-term TPN, malabsorption, Keshan disease (endemic cardiomyopathy). IV sodium selenite in critical illness (antioxidant, anti-inflammatory). Monitor serum levels.'],
    ['Manganese (TPN additive)','2–5 mcg/day (TPN)','IV (via TPN)','Micronutrient for TPN. Toxicity with excess — accumulates in cholestasis. Most commercial TPN already contains manganese — avoid supplementing unless depleted.'],
    ['Copper','0.3–0.5 mg/day (TPN)','IV (via TPN)','Deficiency: anaemia, neutropenia, myeloneuropathy. Toxicity in Wilson disease. Reduce in cholestasis (excreted in bile).'],
    ['Chromium','10–15 mcg/day (TPN)','IV (via TPN)','Enhances insulin sensitivity. Deficiency in long-term TPN. Reduce in renal failure (renally excreted).'],
    ['Thiamine (Vitamin B1)','100mg TDS PO (prophylaxis); 200–500mg IV TDS (Wernicke encephalopathy)','PO/IV','GIVE BEFORE GLUCOSE in malnourished/alcoholic patients — glucose precipitates Wernicke encephalopathy in thiamine-deficient patients. IV Pabrinex (vitamins B + C) in acute alcohol withdrawal.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Vitamins — Clinical Reference','#f97316',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fff7ed"><th>Vitamin</th><th>Deficiency Dose</th><th>Condition / Indication</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Vitamin A (Retinol)','200,000 IU OD × 2 days (children); 10,000 IU/day (adults)','PO','Night blindness, xerophthalmia, measles (reduces mortality in endemic areas — WHO protocol). Teratogenic in excess — avoid >10,000 IU/day in pregnancy.'],
    ['Vitamin B2 (Riboflavin)','10–30mg/day','PO','Deficiency: cheilosis, angular stomatitis, corneal vascularisation. Also used in migraine prophylaxis (400mg OD).'],
    ['Vitamin B3 (Niacin)','15–20mg/day (deficiency); 1–3g/day (dyslipidaemia)','PO','Pellagra: dermatitis, diarrhoea, dementia. Dyslipidaemia: raises HDL, lowers TG. Flushing (dose with aspirin). Hepatotoxicity at high doses.'],
    ['Vitamin B6 (Pyridoxine)','25–100mg/day (INH prophylaxis); 50–100mg TDS (sideroblastic anaemia)','PO','Isoniazid depletes B6 — supplement 10–50mg/day with INH. Pyridoxine responsive sideroblastic anaemia. Sensory peripheral neuropathy with >200mg/day long-term.'],
    ['Vitamin B12 (Cyanocobalamin / Hydroxocobalamin)','1mg IM every 2–3 months (maintenance); 1mg IM daily × 7 days then weekly × 4 weeks then 3-monthly','IM','B12 deficiency: macrocytic anaemia, subacute combined degeneration of the cord. IM preferred if malabsorption (pernicious anaemia). Oral B12 (1000mcg OD) effective if dietary deficiency only.'],
    ['Folic acid','5mg OD (treatment); 400mcg OD (pregnancy prevention); 5mg OD (high risk pregnancy)','PO','Megaloblastic anaemia (with B12). Pre-conception + first trimester: 400mcg OD (standard); 5mg OD if previous NTD, epilepsy, diabetes, malabsorption, BMI >30. Check B12 before starting — folate masks B12 deficiency neurologically.'],
    ['Vitamin C (Ascorbic acid)','500mg–1g OD (treatment); 250mg OD (prophylaxis)','PO/IV','Scurvy: perifollicular haemorrhage, gingival bleeding, poor wound healing. Enhances non-haem iron absorption — take with iron supplements. IV high-dose: adjunct in sepsis (controversial). Renal stones with megadoses.'],
    ['Vitamin E (Alpha-tocopherol)','400–800 IU/day','PO','Deficiency: peripheral neuropathy, haemolytic anaemia (neonates). Antioxidant. High doses (>400 IU/day) may increase all-cause mortality — caution. Abetalipoproteinaemia treatment.'],
    ['Vitamin K1 (Phytomenadione)','10mg IV/IM/SC (reversal of anticoagulation); 1mg IM (neonatal prophylaxis)','PO/IV/IM','Neonatal vitamin K prophylaxis prevents haemorrhagic disease of the newborn. IV form for warfarin reversal. Oral for over-anticoagulation without bleeding.'],
    ['Biotin (Vitamin B7)','5–10mg OD (deficiency)','PO','Deficiency (rare — raw egg consumption, TPN without biotin): alopecia, dermatitis, conjunctivitis, neurological symptoms. Interferes with many immunoassays (troponin, thyroid, sex hormones) — inform lab.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#f97316">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));
});

// ════════════════════════════════════════════════════════════════
// 5. PSYCHIATRY — more antipsychotics, mood stabilisers, anxiolytics
// ════════════════════════════════════════════════════════════════
addTo('Psychiatry', function(el_) {

  el_.appendChild(card('Antipsychotics — Extended Reference','#8b5cf6',
    '<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Chlorpromazine','25–200mg','TDS (max 1g/day)','First-generation (typical). Low potency. Sedating. Used for acute agitation, hiccups (25mg TDS). Photosensitivity, postural hypotension, agranulocytosis (rare). Historical gold standard.'],
    ['Haloperidol','0.5–5mg (acute agitation); 2–10mg OD (maintenance)','OD–TDS','High-potency typical. Less sedation, more EPS. Available IM (acute) and depot (haloperidol decanoate monthly). IV for ICU delirium. QTc prolongation — monitor ECG.'],
    ['Trifluoperazine','2–5mg','BD (max 20mg/day)','High-potency typical. For schizophrenia, anxiety (low dose). More EPS than chlorpromazine. Less sedating.'],
    ['Fluphenazine decanoate','12.5–50mg IM','Every 2–4 weeks (depot)','Long-acting depot for compliance. High EPS risk. Consent and regular review required.'],
    ['Risperidone','1–2mg OD initially → 4–8mg/day','OD–BD','Atypical. D2 + 5-HT2A antagonist. EPS at high doses (>6mg). Prolactin elevation. Risperidone Consta (long-acting injection) 25–50mg every 2 weeks.'],
    ['Paliperidone','6mg OD (may adjust 3–12mg)','OD','Active metabolite of risperidone. Once-daily. Xeplion (monthly injection), Trevicta (3-monthly injection). Less drug interactions (not CYP metabolised).'],
    ['Olanzapine','5–10mg OD initially → 10–20mg/day','OD','Atypical. Highly effective. Significant metabolic side effects (weight gain, diabetes, dyslipidaemia). Sedating. Olanzapine + fluoxetine (Symbyax) for bipolar depression. Velotab (orodispersible).'],
    ['Quetiapine','50mg BD → 150–750mg/day in BD doses','BD','Atypical. Low EPS, high sedation. Useful in Parkinson psychosis and dementia (less D2). IR and XR formulations. Misused for insomnia (not licensed).'],
    ['Aripiprazole','10–15mg OD → up to 30mg','OD','Partial D2 agonist — unique mechanism. Weight neutral. Low metabolic effects. Akathisia common. Lauroxil/Maintena depot available.'],
    ['Amisulpride','50–300mg (negative symptoms); 400–800mg (positive symptoms)','OD–BD','Selective D2/D3 antagonist. No weight gain at low doses. Prolactin elevation. QTc prolongation. Renally excreted — reduce in CKD.'],
    ['Lurasidone','40–80mg OD (with meal ≥350 kcal)','OD (with food)','Atypical. Approved for schizophrenia and bipolar depression. Must take with substantial meal. Favourable metabolic profile. Akathisia, somnolence.'],
    ['Cariprazine','1.5mg OD → up to 6mg (schizophrenia); 1.5–3mg (bipolar depression)','OD','D3-preferring partial agonist. Effective for negative symptoms. Long half-life (active metabolites up to 3 weeks). Akathisia.'],
    ['Clozapine','12.5mg OD/BD → titrate 200–450mg/day','BD–TDS','Reserved for treatment-resistant schizophrenia (failed 2 antipsychotics). Agranulocytosis — mandatory CLOZARIL Patient Monitoring System (CPMS). FBC weekly × 18 weeks then monthly. Seizures, hypersalivation, myocarditis.'],
    ['Zuclopenthixol acetate (Acuphase)','50–150mg IM','Every 2–3 days (max 4 doses)','Short-acting depot for acute agitation (not for rapid tranquillisation). Onset 2–4h, duration 2–3 days. Do NOT confuse with zuclopenthixol decanoate (long-acting depot).'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#8b5cf6">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Mood Stabilisers & Anxiolytics — Extended','#0ea5e9',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Lithium carbonate','Start 400mg OD/BD → titrate to level 0.6–1.0 mmol/L','OD (slow release) or BD','Narrow therapeutic index. Levels: 0.6–0.8 (maintenance); 0.8–1.0 (acute mania). Toxic >1.5 — nausea, tremor, ataxia; >2.0 life-threatening. Check levels, TFTs, renal function at 6 months then yearly. Teratogenic (Ebstein anomaly). NSAIDs, ACEi, thiazides increase levels.'],
    ['Lamotrigine','25mg OD × 2 weeks → 50mg OD × 2 weeks → 100mg OD (without valproate)','OD','Bipolar depression maintenance. Serious rash (Stevens-Johnson syndrome) — titrate slowly. Valproate doubles lamotrigine levels — halve lamotrigine dose. Enzyme inducers halve lamotrigine levels — double dose.'],
    ['Valproate semisodium (Depakote)','500mg BD → up to 2500mg/day','BD','Bipolar disorder. Also used for epilepsy. Highly teratogenic (spina bifida, autism) — MANDATORY contraception (Valproate Pregnancy Prevention Programme). Hepatotoxic. Weight gain, hair loss, tremor. Monitor LFTs, FBC, levels.'],
    ['Carbamazepine','200mg BD → up to 1600mg/day','BD–QDS','Bipolar disorder (mood stabiliser), trigeminal neuralgia, epilepsy. Many drug interactions (potent CYP3A4 inducer — reduces OCP efficacy, warfarin, other drugs). HLA-B*1502 screen in Asian patients. Hyponatraemia.'],
    ['Buspirone','5–10mg TDS → up to 20mg TDS','TDS','5-HT1A partial agonist. For generalised anxiety disorder. Not effective for acute anxiety or panic — no BZD cross-tolerance. Non-sedating. Takes 2–4 weeks for effect.'],
    ['Hydroxyzine','25mg (anxiety); 10–25mg (itch/allergic)','TDS–QDS or nocte','Antihistamine with anxiolytic properties. Non-addictive — preferred over BZD for short-term anxiety. Sedating. QTc prolongation. Dry mouth, urinary retention.'],
    ['Pregabalin (anxiety)','75mg BD → 150–300mg BD','BD','Licensed for GAD. Effective and rapid onset (unlike SSRI). Dizziness, sedation, weight gain. Controlled drug (UK). Dependency risk with long-term use.'],
    ['Clonazepam','0.5–2mg','OD–TDS','Long-acting BZD. Panic disorder, epilepsy, acute mania (adjunct). Dependence risk. Withdrawal seizures — taper slowly.'],
    ['Lorazepam','1–2mg PO/IV/IM','Every 4–6h PRN','Intermediate BZD. Acute anxiety, alcohol withdrawal, seizures, procedural. IV/IM for RSI co-sedation and acute agitation. No active metabolites — safe in liver disease.'],
    ['Diazepam','2–10mg','TDS–QDS (short-term)','Long-acting BZD (active metabolites t½ 100h). Alcohol withdrawal, anxiety, muscle spasm, status epilepticus (IV/rectal). Dependence — short courses only. Reduce dose in elderly.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));
});

// ════════════════════════════════════════════════════════════════
// 6. CARDIO & ENDOCRINE — bone drugs, thyroid, adrenal, lipids
// ════════════════════════════════════════════════════════════════
addTo('Cardio & Endocrine', function(el_) {

  el_.appendChild(card('Bone & Osteoporosis Drugs','#d97706',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fffbeb"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Alendronate','70mg once weekly OR 10mg OD','Weekly/OD','First-line bisphosphonate. Must take fasting with plain water, remain upright 30 min. Oesophageal ulceration. Osteonecrosis of jaw (ONJ) with long-term — dental review before starting. Atypical femoral fractures.'],
    ['Risedronate','35mg weekly OR 150mg monthly','Weekly/monthly','Bisphosphonate. Similar to alendronate. Slightly less GI irritation. Once-monthly formulation improves compliance.'],
    ['Zoledronic acid (osteoporosis)','5mg IV over 15 min','Once yearly','Annual IV infusion. Flu-like reaction in first 3 days (pre-medicate paracetamol). Renal dose adjustment. Holds off re-fracture for 3 years in trials.'],
    ['Denosumab','60mg SC','Every 6 months','RANK-L inhibitor. Subcutaneous. No renal dose adjustment — preferred in CKD. Hypocalcaemia — ensure adequate Ca/D before injection. Rebound fracture risk on stopping — transition to bisphosphonate.'],
    ['Teriparatide','20 mcg SC','OD (up to 24 months)','Recombinant PTH(1-34). Anabolic — builds bone. Second-line for severe osteoporosis. Daily injection. Osteosarcoma risk in animal models — avoid in Paget disease, prior radiation. Maximum 24 months total lifetime use.'],
    ['Romosozumab','210mg SC (two 105mg injections)','Monthly × 12 doses','Anti-sclerostin — dual anabolic + antiresorptive. For very high fracture risk. Followed by antiresorptive therapy. Increased CV events in trials (ARCH) — avoid post-MI/stroke (<1 year).'],
    ['Raloxifene','60mg OD','OD','SERM. For postmenopausal osteoporosis. Reduces vertebral but NOT hip fracture. Increases VTE risk. Reduces breast cancer risk. Hot flushes.'],
    ['Strontium ranelate','2g OD (sachet in water at bedtime)','OD (bedtime)','Dual mechanism. Restricted use (cardiovascular risk) — only if other agents not tolerated. Not widely available.'],
    ['Calcium + Vitamin D (Adcal-D3)','1500mg calcium + 400 IU D3 BD','BD','Routine supplement for patients on bisphosphonates, steroids. Take separately from bisphosphonate (4h gap). Constipation.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#d97706">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Thyroid Disorders — Extended','#0ea5e9',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Levothyroxine (T4)','1.6 mcg/kg/day (standard); start 25–50 mcg (elderly/cardiac)','OD (fasting)','Take 30–60 min before food. Bioavailability reduced by calcium, iron, antacids, PPI — separate by 4h. Many interactions (warfarin potentiated, statins). TSH target 0.5–2.5 for most; 0.1–0.5 in thyroid cancer.'],
    ['Liothyronine (T3)','5–20 mcg','BD–TDS','Faster-acting T3. For myxoedema coma (IV: 5–20 mcg loading then 2.5–10 mcg TDS). Rarely used for routine replacement. Short half-life requires multiple daily doses.'],
    ['Carbimazole','15–40mg OD (block-replace) or titration regimen','OD (titration) or OD + levothyroxine (block-replace)','Anti-thyroid drug. Watch for agranulocytosis — warn patient (sore throat → stop immediately, check FBC). Neonatal aplasia cutis risk if used in first trimester — switch to PTU in first trimester.'],
    ['Propylthiouracil (PTU)','200–400mg OD in divided doses','TDS','Preferred over carbimazole in first trimester and thyroid storm. Inhibits T4→T3 conversion (additional benefit). Hepatotoxicity (more than carbimazole) — monitor LFTs.'],
    ['Lugol\'s iodine solution','5 drops TDS (thyroid storm) or pre-operatively','TDS (pre-op × 10 days)','Used only: (1) thyroid storm — inhibits thyroid hormone release after thionamide; (2) pre-op to reduce vascularity. Do NOT use for hyperthyroidism treatment alone. Give thionamide first.'],
    ['Radioactive iodine (¹³¹I)','Specialist dosimetry','Single oral dose (usually 400–600 MBq)','Definitive treatment for Graves disease, toxic nodular goitre. Destroys thyroid tissue. 80% develop hypothyroidism — lifelong levothyroxine. Avoid pregnancy for 6 months after. Radiation precautions.'],
    ['Potassium iodide (SSKI)','60mg every 8h (thyroid storm)','Every 8h','Same as Lugol\'s — blocks thyroid hormone release. Give thionamide 1h before. Also used for radiation emergencies (thyroid protection) and sporotrichosis.'],
    ['Propranolol (thyroid storm)','40–80mg every 4–6h PO or 0.5–1mg IV slow','Every 4–6h','Controls adrenergic symptoms (tachycardia, tremor, sweating). Also inhibits T4→T3 conversion. Use non-selective beta-blocker (propranolol, nadolol preferred). Continue until euthyroid.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Adrenal & Corticosteroid Reference','#ef4444',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>Dose</th><th>Equivalence</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Hydrocortisone','100mg IV TDS (Addisonian crisis/stress dosing); 10–20mg AM + 5–10mg midday (replacement)','20mg = 5mg prednisolone','Shortest acting steroid. Mineralocorticoid activity. First-line for adrenal crisis. Stress dosing: double/triple maintenance dose during illness.'],
    ['Prednisolone','5–60mg OD (morning)','5mg = 20mg hydrocortisone','Most common oral steroid. Anti-inflammatory, immunosuppressive. Take with breakfast (reduces insomnia). Enteric-coated (Deltacortril) reduces dyspepsia. Do NOT stop abruptly if >3 weeks course.'],
    ['Dexamethasone','0.1mg/kg OD (croup); 4mg QDS IV (raised ICP); 0.1mg/kg/day (CAH suppression)','0.75mg = 5mg prednisolone = 20mg hydrocortisone','No mineralocorticoid activity. Preferred for cerebral oedema, meningitis (0.15mg/kg QDS × 4 days), COVID-19 (6mg OD × 10 days), dexamethasone suppression test. Long acting.'],
    ['Methylprednisolone','500mg–1g IV OD × 3–5 days (pulse)','4mg = 5mg prednisolone','High-dose IV pulse for severe inflammation (lupus nephritis, MS relapse, ARDS). Intramuscular depot: 40–120mg IM. Intra-articular: 40–80mg.'],
    ['Budesonide','3mg TDS PO (Crohn\'s disease); 200–400 mcg/dose inhaled','Minimal systemic absorption (topical activity)','High first-pass metabolism — minimal systemic effect. Inhaled: asthma. Oral: Crohn disease, autoimmune hepatitis, microscopic colitis.'],
    ['Fludrocortisone','100–200 mcg OD','Mineralocorticoid only (100× more potent than hydrocortisone for mineralocorticoid)','Aldosterone replacement. Addison disease (with hydrocortisone). Orthostatic hypotension (50–100 mcg OD). Monitor BP, K⁺, oedema.'],
    ['Metyrapone','750mg QDS','N/A','11-beta-hydroxylase inhibitor. Lowers cortisol for Cushing syndrome medical management or diagnostic testing. Nausea, dizziness. Watch for adrenal insufficiency.'],
    ['Ketoconazole (adrenal)','200–400mg BD–TDS','N/A','Adrenal steroidogenesis inhibitor. Cushing syndrome. Hepatotoxic — monitor LFTs monthly. Multiple drug interactions (CYP3A4). Not for fungal infections at these doses.'],
    ['Mifepristone (Cushing)','300mg OD → up to 1200mg/day','N/A','GR antagonist. For Cushing syndrome with glucose intolerance (not for cortisol monitoring — levels paradoxically rise). Also used for termination of pregnancy.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#ef4444">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Lipid-Lowering Agents — Extended','#16a34a',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Dose</th><th>LDL ↓</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Atorvastatin','10–80mg OD (nocte)','37–51%','High-intensity statin. First choice for primary and secondary prevention. Myopathy — check CK if muscle pain. Hepatotoxic (rare) — check LFTs at baseline. Interacts with CYP3A4 inhibitors (clarithromycin, diltiazem — increase levels).'],
    ['Rosuvastatin','5–40mg OD','40–55%','High-intensity statin. Hydrophilic — less CYP3A4 interactions. Lower dose in Asian patients (increased plasma levels). Maximum 20mg with fibrates or niacin.'],
    ['Simvastatin','10–40mg OD (nocte)','28–41%','Moderate-intensity. Maximum 40mg (higher doses — myopathy risk especially with amlodipine, diltiazem, amiodarone). Avoid with clarithromycin, itraconazole.'],
    ['Pravastatin','20–40mg OD','25–35%','Moderate-intensity. Hydrophilic — fewer drug interactions. Safe in liver disease (glucuronidation). Good option in transplant patients (less CYP interactions).'],
    ['Ezetimibe','10mg OD','17–20% additional (with statin)','Cholesterol absorption inhibitor. NPC1L1 transporter. Add to statin if target not reached. IMPROVE-IT: modest CV benefit added to statin. Well tolerated. Can use as monotherapy if statin intolerant.'],
    ['Evolocumab (PCSK9i)','140mg SC every 2 weeks OR 420mg monthly','50–60% additional','Monoclonal antibody against PCSK9. For: FH, statin intolerance, very high CV risk not at target. FOURIER trial: 27% further CV risk reduction. Very expensive — restricted prescribing.'],
    ['Alirocumab (PCSK9i)','75mg SC every 2 weeks → 150mg if needed','40–60% additional','PCSK9 inhibitor. ODYSSEY OUTCOMES trial in post-ACS. Same indication as evolocumab. Self-administered via autoinjector pen.'],
    ['Inclisiran','284mg SC','47–52% additional','Small interfering RNA — silences PCSK9 gene. Twice yearly injection after loading doses. Very long duration of action. ORION trials.'],
    ['Fenofibrate','145–200mg OD (with food)','Lowers TG 30–50%; raises HDL 5–15%','Fibrate. Primarily for hypertriglyceridaemia. Reduces pancreatitis risk if TG >10 mmol/L. Myopathy risk with statins — avoid combination if possible. Reduces eGFR (tubular effect — reversible).'],
    ['Omega-3 fatty acids (Icosapent ethyl — Vascepa)','4g/day','TG ↓ 20–30%','Pure EPA formulation. REDUCE-IT trial: 25% CV event reduction in statin-treated patients with elevated TG. Standard fish oil supplements have not shown CV benefit.'],
    ['Bempedoic acid','180mg OD','Lowers LDL 18% (as monotherapy)','ATP citrate lyase inhibitor. Pro-drug activated in liver only — no myopathy. Added to statin or as monotherapy if statin intolerant. CLEAR OUTCOMES: CV benefit confirmed.'],
    ['Colestyramine (cholestyramine)','4–8g BD–TDS (before meals)','LDL ↓ 15–30%','Bile acid sequestrant. GI side effects (constipation, bloating). Interferes with absorption of many drugs (give other drugs 1h before or 4h after). Raises TG — avoid if hypertriglyceridaemia.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));
});

// ════════════════════════════════════════════════════════════════
// 7. RESP & GI — extended bronchodilators, GI motility, IBD
// ════════════════════════════════════════════════════════════════
addTo('Resp & GI', function(el_) {

  el_.appendChild(card('Respiratory — Extended Drug Reference','#0ea5e9',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Drug</th><th>Dose</th><th>Route</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Tiotropium','18 mcg OD (HandiHaler) or 5 mcg OD (Respimat)','Inhaled','Long-acting muscarinic antagonist (LAMA). COPD maintenance — reduces exacerbations. Avoid nebulised solution in eyes (glaucoma risk). Dry mouth common. Urinary retention in BPH.'],
    ['Umeclidinium','62.5 mcg OD (in Ellipta)','Inhaled','Once-daily LAMA. Often combined with vilanterol (LABA). COPD maintenance.'],
    ['Aclidinium','322 mcg BD','Inhaled','BD LAMA. Alternative to tiotropium. Less dry mouth.'],
    ['Glycopyrronium','50 mcg OD (Breezhaler)','Inhaled','Once-daily LAMA. Can be combined with indacaterol.'],
    ['Salmeterol','50 mcg BD (asthma); 50 mcg BD (COPD)','Inhaled','Long-acting beta-2 agonist (LABA). NEVER monotherapy in asthma — always combine with ICS (SMART trial mortality signal). Tachycardia, hypokalaemia.'],
    ['Formoterol','6–12 mcg BD','Inhaled','LABA. Faster onset than salmeterol — can be used for relief in combination with budesonide (SMART therapy). Tachycardia.'],
    ['Indacaterol','150–300 mcg OD','Inhaled (Breezhaler)','Once-daily ultra-LABA. COPD only. Cannot be used in asthma.'],
    ['Vilanterol','25 mcg OD (as combination)','Inhaled (Ellipta)','Once-daily LABA — combination with fluticasone furoate (Relvar) or umeclidinium (Incruse). Very long duration.'],
    ['Roflumilast','500 mcg OD','PO','PDE4 inhibitor. For severe COPD with chronic bronchitis phenotype and frequent exacerbations. Weight loss, nausea, diarrhoea. Cannot be combined with theophylline.'],
    ['Montelukast','10mg nocte (adults); 5mg chew (6–14y)','PO','Leukotriene receptor antagonist. Asthma, allergic rhinitis. Neuropsychiatric adverse events — monitor (nightmares, depression, suicidal ideation — FDA black box).'],
    ['Zafirlukast','20mg BD (1h before or 2h after food)','PO','LTRA. Less commonly used than montelukast. Hepatotoxicity. CYP2C9 inhibitor — raises warfarin levels.'],
    ['Omalizumab','75–600mg SC (dose by weight + IgE level)','SC every 2–4 weeks','Anti-IgE monoclonal antibody. Severe allergic asthma (step 5). Reduce OCS use. Anaphylaxis risk — observe 30 min post-injection (first 3 doses). Hospital prescribing.'],
    ['Mepolizumab','100mg SC monthly','SC','Anti-IL-5 monoclonal antibody. Severe eosinophilic asthma (eosinophils >300/µL). Reduces exacerbations. Self-administration after training.'],
    ['Benralizumab','30mg SC every 4 weeks × 3 then every 8 weeks','SC','Anti-IL-5Rα. Severe eosinophilic asthma. Depletes eosinophils. Convenient 8-weekly maintenance dosing. Self-administration.'],
    ['Dupilumab (asthma)','200–300mg SC every 2 weeks','SC','Anti-IL-4Rα. Severe type 2 asthma with elevated eosinophils/FeNO. Also licensed for atopic dermatitis, nasal polyps.'],
    ['Dornase alfa (DNase)','2.5mg OD–BD via nebuliser','Inhaled (nebuliser)','Recombinant DNase. Cystic fibrosis — reduces sputum viscosity. Does not improve FEV1 in non-CF bronchiectasis.'],
    ['N-Acetylcysteine (mucolytic)','200mg TDS (mucolytic); 600mg OD (antioxidant in COPD)','PO','Mucolytic. Also used as antioxidant in COPD to reduce exacerbations. IV: paracetamol overdose antidote.'],
    ['Ivacaftor/Lumacaftor (Orkambi)','Specialist dosing','PO','CFTR modulator. Cystic fibrosis with F508del mutation (homozygous). Significant drug interactions (CYP3A4 substrate and inducer). Must be specialist initiated.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Gastroenterology — Extended Drug Reference','#16a34a',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Dose</th><th>Indication</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Mesalazine (5-ASA)','2–4g/day oral; 1g PR (suppository/enema)','Ulcerative colitis (maintenance + mild flare)','First-line for UC. Multiple formulations — different pH-release profiles. Renal impairment risk (rare interstitial nephritis — monitor eGFR yearly). Sulfa-free (unlike sulfasalazine).'],
    ['Sulfasalazine','500mg OD → 2–4g/day in divided doses','UC, Crohn disease, RA','5-ASA + sulphapyridine. GI intolerance common. Reduce dose by 50% in slow acetylators. Male infertility (reversible oligospermia). Haemolysis in G6PD. Supplement folate.'],
    ['Azathioprine','1–2.5mg/kg OD','IBD, autoimmune disease maintenance','TPMT testing before starting — poor metabolisers: severe myelosuppression. Nausea common. Check FBC + LFTs at baseline, 2 weeks, then monthly. Allopurinol interaction — reduce dose by 75%.'],
    ['6-Mercaptopurine (6-MP)','0.75–1.5mg/kg OD','IBD maintenance','Active metabolite of azathioprine. TPMT testing required. Same monitoring as azathioprine. Pancreatitis risk.'],
    ['Infliximab','5mg/kg IV at 0, 2, 6 weeks → every 8 weeks','IBD (Crohn, UC), RA, psoriasis','Anti-TNF. TB screening (Mantoux/IGRA) before starting. Live vaccines contraindicated. Check HBsAg (reactivation risk). Infusion reactions (pre-medicate). Demyelination, lymphoma (rare).'],
    ['Adalimumab','160mg SC → 80mg week 2 → 40mg every 2 weeks','IBD, RA, psoriasis, AS','SC anti-TNF. Same pre-screening as infliximab. Self-administered. Injection site reactions.'],
    ['Vedolizumab','300mg IV at 0, 2, 6 weeks → every 8 weeks','UC, Crohn disease','Gut-selective anti-integrin (α4β7). Does not cause systemic immunosuppression — preferred in patients with infections/malignancy concerns. PML risk theoretically lower than natalizumab.'],
    ['Ustekinumab','520mg IV (induction — weight-based) → 90mg SC every 8–12 weeks','Crohn disease, UC, psoriasis','Anti-IL-12/23. Given IV then SC. Favourable safety profile. Effective for both IBD subtypes. Less immunosuppression than anti-TNF.'],
    ['Tofacitinib','10mg BD (induction × 8 weeks) → 5–10mg BD (maintenance)','Ulcerative colitis, RA','JAK1/3 inhibitor. Oral. Thromboembolism risk — avoid in high VTE risk. Herpes zoster reactivation. Avoid in age >65 with cardiovascular risk factors.'],
    ['Budesonide MMX','9mg OD × 8 weeks','Active UC (mild–moderate)','Targeted oral budesonide. High first-pass metabolism. Fewer systemic effects than prednisolone.'],
    ['Cholestyramine (bile acid malabsorption)','4g OD–QDS (before meals)','Bile acid diarrhoea, primary hypercholesterolaemia','Bile acid sequestrant. Binds bile acids in terminal ileum disease (Crohn, post-cholecystectomy). GI side effects. Interferes with drug absorption — give other drugs 1h before or 4h after.'],
    ['Ursodeoxycholic acid (UDCA)','10–15mg/kg/day in 2–3 divided doses','Primary biliary cholangitis (PBC), gallstone dissolution','Hydrophilic bile acid — replaces toxic bile acids. First-line for PBC. Slows progression. Liver transplant if inadequate response. Gallstone dissolution: 8–12 months.'],
    ['Obeticholic acid','5–10mg OD','PBC (second-line)','FXR agonist. Added to UDCA if inadequate response or as monotherapy if UDCA intolerant. Pruritus (common). Dyslipidaemia (raises LDL). Specialist prescribing.'],
    ['Lactulose','15–30ml BD–TDS (constipation); 30–45ml TDS–QDS (hepatic encephalopathy)','Constipation, hepatic encephalopathy','Osmotic laxative. Fermented by gut bacteria — acidifies colon, traps NH3. For HE: aim 3–4 soft stools/day. Bloating, flatulence, abdominal cramps.'],
    ['Rifaximin','550mg BD','Hepatic encephalopathy prevention','Non-absorbable antibiotic. Reduces gut ammonia-producing bacteria. Reduces HE recurrence by 58% (RFHE trial). Well tolerated — minimal systemic absorption.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));
});

// ════════════════════════════════════════════════════════════════
// 8. NEURO & MSK — anticonvulsants, Parkinson, dementia, DMARDS
// ════════════════════════════════════════════════════════════════
addTo('Neuro & MSK', function(el_) {

  el_.appendChild(card('Anticonvulsants — Extended Reference','#7c3aed',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fdf4ff"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Levetiracetam','250–500mg BD → up to 1500mg BD','BD','Broad-spectrum. First-line for generalised + focal seizures. IV loading: 1500–2500mg over 15 min (status epilepticus). Psychiatric side effects (irritability, aggression — "Keppra rage"). Renal dose adjustment. No significant interactions.'],
    ['Sodium valproate','200–400mg BD/TDS → 1000–2500mg/day','BD–TDS','Broad-spectrum. First-line generalised epilepsy. Highly teratogenic — MANDATORY pregnancy prevention (PREVENT programme). Hepatotoxic, pancreatitis. Weight gain, hair loss. Monitor levels, LFTs, FBC.'],
    ['Lamotrigine (epilepsy)','25mg OD (without VPA) → 100–200mg BD','OD → BD','Broad-spectrum. Slow titration essential — rapid titration causes Stevens-Johnson syndrome. Valproate doubles levels — halve lamotrigine when adding valproate. Enzyme inducers halve levels.'],
    ['Phenytoin','150–300mg OD (PO); 20mg/kg IV loading at max 50mg/min (status)','OD–BD','Narrow therapeutic index. Zero-order kinetics — small dose changes cause large level changes. Enzyme inducer — many interactions. Gingival hyperplasia, hirsutism, coarsening of features, osteoporosis with long-term use. Monitor levels.'],
    ['Fosphenytoin','20mg PE/kg IV/IM at 150mg PE/min (loading)','Stat (loading)','Pro-drug of phenytoin. Can be given faster and IM. Express doses as phenytoin equivalents (PE). Use when IV access unavailable.'],
    ['Phenobarbital','60–180mg OD (maintenance); 10–20mg/kg IV (status)','OD nocte','Enzyme inducer — reduces efficacy of many drugs including OCP, warfarin. Sedation, cognitive effects. Dependence. First-line for neonatal seizures.'],
    ['Topiramate (epilepsy)','25mg OD → 100–400mg/day','BD','Broad spectrum. Weight loss (benefit or concern). Cognitive slowing. Kidney stones — maintain hydration. Metabolic acidosis. Highly teratogenic — PREVENT programme.'],
    ['Zonisamide','100mg OD → 300–500mg OD','OD','Broad spectrum. Similar mechanism to topiramate. Sulfonamide class — allergy risk. Oligohidrosis + hyperthermia in children. Renal stones.'],
    ['Perampanel','2mg nocte → 4–12mg nocte','OD nocte','AMPA glutamate receptor antagonist. Adjunct for focal and generalised seizures. Serious psychiatric reactions (hostility, aggression) — particularly in psychiatric comorbidity. Dizziness, falls.'],
    ['Clobazam','10–30mg OD/BD','OD–BD','1,5-benzodiazepine (less sedating than 1,4). Adjunct anticonvulsant. Tolerance may develop. Less interaction potential than clonazepam. Lennox-Gastaut syndrome.'],
    ['Vigabatrin','1–1.5g BD (adults)','BD','GABA transaminase inhibitor. Visual field defects (irreversible — up to 40%) — baseline and 6-monthly visual field testing. West syndrome (infantile spasms) in children. Restricted use.'],
    ['Stiripentol','50mg/kg/day in 2–3 doses (with clobazam + valproate)','BD–TDS','Dravet syndrome only. Inhibits CYP enzymes — significantly increases clobazam and valproate levels. Titrate co-medications. Anorexia, weight loss, somnolence.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#7c3aed">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Parkinson Disease Drugs','#d97706',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fffbeb"><th>Drug</th><th>Dose</th><th>Frequency</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Levodopa + Carbidopa (Sinemet)','25/100mg TDS → titrate to response','TDS–QDS (30–60 min before meals)','Gold standard. Carbidopa prevents peripheral conversion. Nausea initially (take with food). Dyskinesias, wearing-off, on-off fluctuations with long-term use. Dopamine dysregulation syndrome (gambling, hypersexuality).'],
    ['Levodopa + Benserazide (Madopar)','50/12.5mg TDS → 100/25mg TDS → titrate','TDS–QDS','Alternative DDC inhibitor combination. Dispersible formulation for swallowing difficulties or unpredictable absorption.'],
    ['Pramipexole','0.088mg TDS → titrate to 0.52–1.1mg TDS','TDS (IR) or OD (ER)','Dopamine agonist (D3-preferring). First-line or adjunct. Impulse control disorders (gambling, hypersexuality, binge eating) — warn patients. Excessive daytime sleepiness.'],
    ['Ropinirole','0.25mg TDS → titrate to 3–9mg TDS (IR) or 2–24mg OD (XL)','TDS (IR) or OD (XL)','Dopamine agonist. Same impulse control concerns as pramipexole. XL formulation for compliance. Nausea, postural hypotension.'],
    ['Rotigotine patch','2–8mg/24h patch (early PD); up to 16mg/24h (advanced)','OD (new site daily)','Transdermal dopamine agonist. Continuous delivery avoids on-off. Good for swallowing difficulties. Skin reactions at patch site. Change site daily.'],
    ['Selegiline','5mg BD or 10mg OD (morning)','OD–BD (not evening — insomnia)','MAO-B inhibitor. Mild antiparkinsonian. Metabolised to amphetamine — insomnia if taken in afternoon. Avoid with pethidine (serotonin syndrome).'],
    ['Rasagiline','1mg OD','OD','MAO-B inhibitor. Once daily. No amphetamine metabolite (unlike selegiline). Avoid pethidine, SSRIs/SNRIs (serotonin syndrome risk). Tyramine restriction theoretically needed but rarely clinically relevant.'],
    ['Safinamide','50–100mg OD','OD','MAO-B inhibitor + glutamate release inhibitor. Add-on to levodopa in mid-to-late stage PD. Reduces off-time. Fewer dyskinesias than other adjuncts.'],
    ['Entacapone','200mg with each levodopa dose','With each levodopa dose (max 8 doses/day)','COMT inhibitor. Prolongs levodopa effect — reduces wearing-off. Orange/brown urine (warn patient). GI side effects. Dyskinesias may worsen.'],
    ['Tolcapone','100mg TDS (with levodopa)','TDS','COMT inhibitor — more potent than entacapone. Fulminant hepatotoxicity risk — mandatory LFT monitoring. Reserve for when entacapone fails.'],
    ['Amantadine','100mg BD → 300mg/day','BD–TDS','NMDA antagonist. Mild antiparkinsonian, reduces dyskinesias. Livedo reticularis, oedema. Hallucinations in elderly. Renally excreted — reduce in CKD.'],
    ['Apomorphine','2–7mg SC bolus (rescue); 1–10mg/h SC infusion (pump)','SC PRN or continuous pump','Potent dopamine agonist. SC rescue for unpredictable off periods. Continuous infusion for advanced PD. Severe nausea — domperidone pre-treatment essential. Skin nodules at infusion sites.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#d97706">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Dementia & Cognitive Drugs','#0ea5e9',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Drug</th><th>Dose</th><th>Indication</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Donepezil','5mg OD (4–6 weeks) → 10mg OD nocte','All stages Alzheimer disease','Cholinesterase inhibitor. Once daily (nocte — reduce insomnia). Nausea, diarrhoea, nightmares. Bradycardia — caution in conduction disease. Vivid dreams.'],
    ['Rivastigmine','1.5mg BD → 3–6mg BD (oral); 4.6mg/24h → 9.5–13.3mg/24h patch','Alzheimer + Lewy body dementia, Parkinson dementia','Oral and patch formulations. Patch: fewer GI side effects (preferred if GI intolerance). Lewy body dementia and Parkinson dementia — cholinesterase inhibitors more effective than in AD.'],
    ['Galantamine','4mg BD → 8–12mg BD (IR); 8mg OD → 16–24mg OD (XL)','Mild–moderate Alzheimer','Dual mechanism: ChEI + allosteric nicotinic receptor modulator. IR and XL formulations. Similar GI side effects to other ChEIs.'],
    ['Memantine','5mg OD → 10mg BD (titrate weekly)','Moderate–severe Alzheimer (MMSE 10–20)','NMDA receptor antagonist. Can be combined with donepezil for moderate–severe AD. Better tolerated than ChEIs. Reduces agitation.'],
    ['Lecanemab (Leqembi)','10mg/kg IV every 2 weeks','Early Alzheimer disease (amyloid-confirmed)','Anti-amyloid monoclonal antibody. FDA approved 2023. Slows cognitive decline by 27% (CLARITY AD trial). ARIA (amyloid-related imaging abnormalities) — MRI monitoring. Specialist initiation. Very expensive.'],
    ['Rivastigmine (BPSD)','See above','Behavioural symptoms in LBD/PDD','Preferred pharmacological approach for BPSD in Lewy body dementia. Antipsychotics CONTRAINDICATED in LBD (severe reactions — Parkinsonian rigidity, neuroleptic malignant syndrome).'],
    ['Mirtazapine (dementia agitation)','7.5–15mg nocte','BPSD, depression in dementia','Preferred antidepressant in dementia (less anticholinergic). Weight gain beneficial in malnourished patients. Sedating — useful for sleep disturbance.'],
    ['Trazodone','25–100mg nocte','Agitation/sleep in dementia','5-HT antagonist + weak SSRI. Useful for sleep and agitation in dementia. Less anticholinergic than TCAs. Priapism (rare). Postural hypotension.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('DMARDs — Extended Rheumatology Reference','#16a34a',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0fdf4"><th>Drug</th><th>Dose</th><th>Indication</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Methotrexate','7.5–25mg once weekly + folic acid 5mg once weekly (not same day)','RA, psoriasis, psoriatic arthritis, vasculitis','Gold standard csDMARD. WEEKLY dosing — daily dosing is fatal error. Folic acid reduces GI and mucosal side effects. Pneumonitis (any new cough — stop immediately). Hepatotoxic — avoid alcohol. Teratogenic — contraception 3 months after stopping.'],
    ['Hydroxychloroquine','200–400mg OD (max 5mg/kg/day)','SLE, RA, Sjögren\'s, malaria prophylaxis','Anti-malarial with DMARD properties. Annual retinal screening after 5 years (bull\'s eye maculopathy). Very well tolerated. Safe in pregnancy. QTc prolongation.'],
    ['Sulfasalazine (RA)','500mg OD → 1g BD → 1.5–2g BD over weeks','RA, IBD','GI intolerance dose-limiting. TPMT testing not required. Male infertility (reversible). Folate supplementation. FBC monitoring monthly × 3 months then 3-monthly.'],
    ['Leflunomide','100mg OD × 3 days (loading) → 10–20mg OD','RA, psoriatic arthritis','Active metabolite (teriflunomide) t½ >2 weeks. Hepatotoxic — monitor LFTs. Teratogenic — washout with cholestyramine required before pregnancy. Hypertension. Weight loss.'],
    ['Abatacept','500–1000mg IV (weight-based) monthly OR 125mg SC weekly','RA (biologic DMARD)','CTLA4-Ig — inhibits T-cell co-stimulation. Alternative to anti-TNF. Lower infection risk. Can use with JAK inhibitors.'],
    ['Rituximab','1g IV × 2 doses (2 weeks apart) every 6–12 months','RA, ANCA vasculitis, anti-GBM disease, lymphoma','Anti-CD20. B-cell depletion. Pre-medicate methylprednisolone + antihistamine. PML risk (progressive multifocal leukoencephalopathy — JC virus). Screen for HBV before (reactivation).'],
    ['Tocilizumab','8mg/kg IV monthly OR 162mg SC weekly','RA, GCA, cytokine release syndrome (CAR-T)','Anti-IL-6 receptor. Mask fever in infection. GI perforation risk (diverticulitis). Liver enzyme elevation. Very effective for giant cell arteritis.'],
    ['Baricitinib','2–4mg OD','RA, atopic dermatitis, alopecia areata','JAK1/2 inhibitor. Oral. VTE risk (avoid if high risk — history of PE/DVT, immobility). Herpes zoster reactivation — consider vaccination before starting. Avoid with strong CYP3A4 inhibitors.'],
    ['Upadacitinib','15mg OD (RA); 30mg OD (PsA, AS)','RA, psoriatic arthritis, AS, atopic dermatitis, IBD','JAK1-selective. Oral. More selective JAK inhibition — theoretically less VTE risk than tofacitinib (data still accumulating). Same class warnings (VTE, zoster, malignancy, CV events in older patients).'],
    ['Secukinumab','300mg SC weekly × 5 weeks → monthly','Psoriasis, PsA, AS','Anti-IL-17A. Very effective for psoriasis (PASI 90 rates high). Worsens IBD — avoid in Crohn disease. Candida infections.'],
    ['Ixekizumab','160mg SC → 80mg every 2 weeks × 12 weeks → every 4 weeks','Psoriasis, PsA, AS','Anti-IL-17A. Similar to secukinumab. IBD risk — avoid in Crohn disease. IBD screening before starting.'],
    ['Guselkumab','100mg SC at weeks 0, 4 → every 8 weeks','Psoriasis, PsA','Anti-IL-23p19. Fewer infections than anti-IL-17. Can be used in IBD. Excellent durability of response.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));
});

// ════════════════════════════════════════════════════════════════
// 9. OBS & GYNAE — extended hormonal, contraception, fertility
// ════════════════════════════════════════════════════════════════
addTo('Obs & Gynae', function(el_) {

  el_.appendChild(card('Contraception — Extended Reference','#ec4899',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fdf2f8"><th>Method / Drug</th><th>Dose / Regimen</th><th>Efficacy</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Combined oral contraceptive (COC)','1 tablet OD (21 active + 7 placebo or continuous)','99.7% (perfect use)','Oestrogen + progestogen. Absolute contraindications (UKMEC 4): migraine with aura, VTE history, breast cancer, uncontrolled HTN (>160/100), smoking >35y, liver disease. Start day 1–5 cycle. Back-up 7 days if late start.'],
    ['Levonorgestrel + ethinylestradiol (Microgynon)','1 OD × 21 days, 7 day break','99.7%','Most commonly prescribed COC in UK/Nigeria. LNG 150mcg + EE 30mcg. Monophasic. Good cycle control.'],
    ['Norethisterone + ethinylestradiol (Brevinor)','1 OD × 21 days','99.7%','Lower oestrogen formulation (EE 35mcg). Useful if breakthrough bleeding on 30mcg preparations.'],
    ['Progestogen-only pill (POP) — Desogestrel','75 mcg OD continuously (Cerazette/Cerelle)','99.6%','12-hour missed pill window (vs 3h for older POPs). Suitable when oestrogen contraindicated (breastfeeding, VTE risk, migraine with aura, age >35 + smoking). Irregular bleeding common.'],
    ['Levonorgestrel-releasing IUS (Mirena)','Inserted by trained clinician — lasts 5 years','>99.8%','Highly effective. Reduces menstrual blood loss (treatment of menorrhagia). Progestogen only — systemic effects minimal. Suitable for women with contraindications to oestrogen. Cramping on insertion.'],
    ['Copper IUD (non-hormonal)','Inserted by trained clinician — lasts 5–10 years','>99.2%','Non-hormonal. Emergency contraception if inserted within 5 days. Suitable when hormones contraindicated. Increases menstrual blood loss — not for menorrhagia. Ectopic pregnancy risk if fails.'],
    ['Etonogestrel implant (Nexplanon)','68mg subdermal implant — 3 years','>99.9%','Most effective reversible contraception. Trained clinician for insertion/removal. Irregular bleeding. Suitable in breastfeeding, oestrogen contraindications.'],
    ['Depot medroxyprogesterone acetate (Depo-Provera)','150mg IM every 12 weeks (or 104mg SC every 13 weeks)','99.6%','Injectable. Amenorrhoea in many users. Delayed return to fertility (up to 1 year). Bone density reduction with long-term use (reversible). Suitable in breastfeeding.'],
    ['Levonorgestrel EC (Levonelle)','1.5mg single dose within 72h (preferably as soon as possible)','84–95%','Emergency contraception. Works by delaying/inhibiting ovulation. Less effective in women >70kg — use ulipristal or copper IUD instead. Does NOT cause abortion.'],
    ['Ulipristal acetate (ellaOne)','30mg single dose within 120h (5 days)','85–98%','Emergency contraception. More effective than LNG-EC. Progesterone receptor modulator. Avoid concurrent progesterone contraception for 5 days (antagonism). Breastfeed 1 week after (express and discard).'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#ec4899">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Fertility & Reproductive Drugs','#8b5cf6',
    '<div class="tbl-wrap"><table><thead><tr style="background:#faf5ff"><th>Drug</th><th>Dose</th><th>Indication</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Clomifene citrate','50mg OD days 2–6 (or 5–9) of cycle','Anovulatory infertility (PCOS)','Oestrogen receptor antagonist — stimulates FSH/LH release. Up to 6 cycles. Multiple pregnancy risk 8–10% (mostly twins). Ovarian hyperstimulation syndrome (OHSS). Monitor with USS.'],
    ['Letrozole','2.5–7.5mg OD days 2–6 of cycle','PCOS (superior to clomifene — 2014 NEJM)','Aromatase inhibitor. Better live birth rate than clomifene in PCOS (PPCOS II trial). Off-label for fertility. Fewer multiple pregnancies than clomifene.'],
    ['Gonadotrophins (FSH/LH — Gonal-F, Menopur)','75–150 IU SC OD (titrated by response)','IVF, anovulatory infertility resistant to clomifene','Controlled ovarian hyperstimulation. OHSS risk — mild (nausea, bloating) to severe (ascites, thrombosis, renal failure). Specialist use only. Daily USS monitoring.'],
    ['hCG (Ovitrelle, Pregnyl)','250 mcg SC (Ovitrelle) or 5000–10,000 IU IM (Pregnyl)','Trigger ovulation in IVF / IUI','LH surge surrogate. Triggers final oocyte maturation and ovulation. Risk of OHSS. Positive pregnancy test after administration — wait 14 days for accurate result.'],
    ['Progesterone (luteal support)','400mg PV BD or 25mg IM daily (Crinone gel PV OD)','Luteal phase support in ART','Supports endometrium after embryo transfer. PV route preferred (less systemic side effects). Continue until 12 weeks.'],
    ['GnRH agonist (Buserelin, Leuprorelin)','Daily SC injection or monthly depot','IVF downregulation, endometriosis, fibroids','Initial flare then downregulation (oestrogen levels fall). Hot flushes, bone density reduction. Add-back HRT in endometriosis if long-term.'],
    ['GnRH antagonist (Cetrorelix, Ganirelix)','0.25mg SC OD (flexible protocol) or 3mg single dose (fixed)','IVF — prevent premature LH surge','Immediate pituitary suppression (no initial flare). Short antagonist protocol. Fewer injections. Preferred in poor responders and PCOS.'],
    ['Cabergoline (OHSS prevention)','0.5mg OD × 8 days from trigger day','OHSS prevention','Dopamine agonist. Also used for hyperprolactinaemia. Reduces VEGF — prevents OHSS. Dizziness, nausea.'],
    ['Bromocriptine','1.25mg OD → up to 5mg BD (nocte with food)','Hyperprolactinaemia, prolactinoma','Dopamine agonist. Reduces prolactin secretion. Causes nausea/vomiting — take with food at bedtime. Cabergoline better tolerated (preferred).'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#8b5cf6">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));
});

// ════════════════════════════════════════════════════════════════
// 10. HAEMATOLOGY — anticoagulants, antiplatelets, haematinics
// ════════════════════════════════════════════════════════════════
addTo('Haematology', function(el_) {

  el_.appendChild(card('Anticoagulants — Extended Reference','#dc2626',
    '<div class="tbl-wrap"><table><thead><tr style="background:#fef2f2"><th>Drug</th><th>Dose</th><th>Indication</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Warfarin','Individualised — titrate to INR 2.0–3.0 (most); 2.5–3.5 (mechanical mitral valve)','AF, VTE treatment/prevention, mechanical heart valves','Narrow TI. Many interactions (diet, drugs, illness). Vitamin K dependent. INR monitoring essential. Reversal: vitamin K, PCC, FFP. Teratogenic in first trimester — LMWH preferred in pregnancy.'],
    ['Enoxaparin (LMWH)','1mg/kg SC BD (treatment); 1.5mg/kg SC OD (treatment); 40mg OD SC (prophylaxis)','VTE treatment, ACS, prophylaxis','Weight-based dosing. Anti-Xa monitoring in obesity (>150kg), pregnancy, renal failure (eGFR <30 — use unfractionated heparin or reduced dose). Partial reversal with protamine.'],
    ['Dalteparin','100 units/kg BD (treatment); 5000 units OD (prophylaxis)','VTE, ACS, cancer-associated thrombosis','Cancer-associated VTE: LMWH preferred over warfarin (CLOT trial). Fixed dosing in obesity may be inadequate.'],
    ['Unfractionated heparin (UFH)','80 units/kg IV bolus → 18 units/kg/h infusion (titrate to APTT 60–100s)','ACS, VTE, cardiac surgery, dialysis','IV or SC. APTT-guided dosing. Complete protamine reversal. Heparin-induced thrombocytopenia (HIT) — monitor platelets day 4–14. Preferred in severe renal failure.'],
    ['Rivaroxaban (Xarelto)','15mg BD × 21 days → 20mg OD (VTE); 10mg OD (AF); 2.5mg BD + antiplatelet (CAD/PAD)','AF, VTE, CAD/PAD','Oral FXa inhibitor. No monitoring required. Take with food (>399 kcal for 20mg dose). Avoid in severe renal/hepatic impairment. Andexanet alfa reversal.'],
    ['Apixaban (Eliquis)','10mg BD × 7 days → 5mg BD (VTE); 5mg BD (AF); 2.5mg BD if 2+ criteria (age >80, weight <60kg, creatinine >133)','AF, VTE','Oral FXa inhibitor. Lowest bleeding rate among DOACs (ARISTOTLE). Renal dose adjustment in AF: 2.5mg BD if 2+ of 3 criteria. No specific monitoring.'],
    ['Dabigatran (Pradaxa)','150mg BD (VTE/AF); 110mg BD (age >80, high bleed risk, concomitant verapamil)','AF, VTE treatment and prevention','Direct thrombin inhibitor. Oral. P-gp substrate — avoid strong P-gp inhibitors. Dyspepsia common. Specific reversal: idarucizumab (Praxbind). Not for CrCl <30.'],
    ['Edoxaban','60mg OD (VTE/AF); 30mg OD if weight ≤60kg, CrCl 15–50 or P-gp inhibitor','AF, VTE','FXa inhibitor. Once daily. Must start after 5–10 days parenteral anticoagulation for VTE. No reversal agent (andexanet off-label).'],
    ['Fondaparinux','7.5mg OD SC (standard); 5mg if <50kg; 10mg if >100kg (treatment); 2.5mg OD (prophylaxis)','VTE treatment and prophylaxis, HIT','Synthetic factor Xa inhibitor. Not for CrCl <20 (treatment) or <30 (prophylaxis). No protamine reversal. NO cross-reactivity with HIT antibodies — alternative to heparin in HIT.'],
    ['Argatroban','2 mcg/kg/min IV (non-HIT); 0.5–1.2 mcg/kg/min (hepatic impairment)','Heparin-induced thrombocytopenia (HIT)','Direct thrombin inhibitor — IV only. For anticoagulation in HIT. Monitor APTT. Hepatically metabolised — reduce in liver disease. Raises INR — warfarin transition complex.'],
    ['Danaparoid','1250 units SC BD (prophylaxis); weight-based bolus + infusion (treatment)','HIT (alternative to argatroban)','Heparin analogue. Low cross-reactivity with HIT antibodies. Renally cleared — reduce in CKD. Anti-Xa monitoring.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#dc2626">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));

  el_.appendChild(card('Antiplatelet Drugs — Extended','#0ea5e9',
    '<div class="tbl-wrap"><table><thead><tr style="background:#f0f9ff"><th>Drug</th><th>Dose</th><th>Indication</th><th>Key Notes</th></tr></thead><tbody>' + [
    ['Aspirin','75–100mg OD (secondary prevention); 300mg loading (ACS)','ACS, secondary CV prevention, AF (limited)','COX-1 inhibitor. Irreversible — effect lasts platelet lifetime (7–10 days). GI bleed risk — PPI cover. Avoid in children <16y (Reye syndrome). Minimal primary prevention benefit (bleeding offsets CV benefit).'],
    ['Clopidogrel','75mg OD (maintenance); 300–600mg loading (ACS/PCI)','ACS, STEMI, stroke, peripheral arterial disease','Prodrug — requires CYP2C19 activation. Poor metabolisers (CYP2C19 LOF — common in East Asian, some African populations) — reduced efficacy. Prasugrel or ticagrelor preferred in PCI.'],
    ['Prasugrel','10mg OD (maintenance); 60mg loading; 5mg OD if >75y or <60kg','ACS managed by PCI','More potent and faster than clopidogrel. No CYP2C19 dependence. CONTRAINDICATED: prior stroke/TIA (net harm in TRITON-TIMI 38). Higher bleeding than clopidogrel.'],
    ['Ticagrelor','90mg BD (12 months post-ACS); 60mg BD (beyond 12 months); 180mg loading','ACS','Direct P2Y12 inhibitor — no prodrug activation. Reversible. Dyspnoea (adenosine mechanism — not asthma, usually self-limiting). Bradycardia (avoid in AV block). Higher efficacy than clopidogrel (PLATO trial).'],
    ['Cangrelor','30 mcg/kg IV bolus → 4 mcg/kg/min infusion (for PCI duration + 1h after)','Bridging for PCI when oral loading not possible (swallowing difficulty, NPO)','IV P2Y12 inhibitor. Ultra-short acting — reversible within 1h of stopping. Rapid onset. Bridging when switching from ticagrelor to clopidogrel.'],
    ['Dipyridamole','200mg BD (modified release — as Persantin Retard or Asasantin Retard with aspirin 25mg)','Stroke/TIA secondary prevention (with aspirin)','PDE inhibitor + adenosine uptake inhibitor. Vasodilator — headache (very common), flushing. Take with food. Stress echocardiography agent (IV dipyridamole — adenosine stress test).'],
    ['Cilostazol','100mg BD (50mg BD if with CYP3A4/2C19 inhibitors)','Peripheral arterial disease (claudication)','PDE3 inhibitor + antiplatelet. Improves walking distance in claudication. CONTRAINDICATED in heart failure (class III/IV). Palpitations, diarrhoea, headache.'],
    ['Vorapaxar','2.08mg OD (with aspirin ± clopidogrel)','Secondary prevention post-MI (specific indication)','PAR-1 (thrombin receptor) antagonist. TRA 2P-TIMI 50 trial. CONTRAINDICATED if prior stroke or TIA (increase intracranial haemorrhage). Very niche use.'],
    ['Abciximab','0.25mg/kg IV bolus → 0.125 mcg/kg/min infusion × 12h (PCI)','Adjunct in high-risk PCI','GPIIb/IIIa inhibitor. Monoclonal antibody — potent platelet inhibition. Thrombocytopenia risk. Limited use with modern PCI and potent oral P2Y12 inhibitors.'],
    ['Tirofiban','25 mcg/kg bolus → 0.15 mcg/kg/min (or 0.075 in CKD)','NSTEMI, high-risk PCI','GPIIb/IIIa inhibitor. Small molecule. Used in NSTEMI if PCI within 48h. Thrombocytopenia — check platelets at 6h.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#0ea5e9">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="font-size:12px">'+r[3]+'</td></tr>';}).join('') + '</tbody></table></div>'));
});

console.log('✅ Drug Reference Additions loaded — ~500 additional drug entries across 10 tabs');

})();
