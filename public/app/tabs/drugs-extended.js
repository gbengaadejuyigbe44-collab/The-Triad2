// ══════════════════════════════════════════════════════════════
// GLOSSARY TAB
// ══════════════════════════════════════════════════════════════
function tabGlossary(el_) {
  el_.appendChild(secTitle('📖','Abbreviations Glossary','309 clinical abbreviations used throughout The Triad — A to Z','#0ea5e9'));
  el_.appendChild(notebox('📌 All abbreviations used across HTN, Diabetes, Sepsis, Paediatrics, Renal, and Drug Reference modules. Tap any letter to jump to that section.','#f0f9ff','#bae6fd'));

  var GLOSS = [
    ['ABCDE', 'Airway, Breathing, Circulation, Disability, Exposure (systematic assessment)'],
    ['ABG', 'Arterial Blood Gas'],
    ['ABPM', 'Ambulatory Blood Pressure Monitoring'],
    ['ACC', 'American College of Cardiology'],
    ['ACE', 'Angiotensin-Converting Enzyme (as in ACE inhibitor)'],
    ['ACR', 'Albumin-to-Creatinine Ratio'],
    ['ACS', 'Acute Coronary Syndrome'],
    ['ACTH', 'Adrenocorticotropic Hormone'],
    ['ADA', 'American Diabetes Association'],
    ['AF', 'Atrial Fibrillation'],
    ['AHA', 'American Heart Association'],
    ['AKI', 'Acute Kidney Injury'],
    ['ALP', 'Alkaline Phosphatase'],
    ['ANC', 'Antenatal Care'],
    ['APLS', 'Advanced Paediatric Life Support'],
    ['APTT', 'Activated Partial Thromboplastin Time'],
    ['ARB', 'Angiotensin Receptor Blocker'],
    ['ASCVD', 'Atherosclerotic Cardiovascular Disease'],
    ['AST', 'Aspartate Aminotransferase'],
    ['AV', 'Atrioventricular'],
    ['AVPU', 'Alert, Voice, Pain, Unresponsive (consciousness scale)'],
    ['B12', 'Vitamin B12 (Cobalamin)'],
    ['BMI', 'Body Mass Index'],
    ['BNF', 'British National Formulary'],
    ['BNFC', 'British National Formulary for Children'],
    ['BNP', 'B-type Natriuretic Peptide'],
    ['BP', 'Blood Pressure'],
    ['BSPED', 'British Society for Paediatric Endocrinology and Diabetes'],
    ['BTS', 'British Thoracic Society'],
    ['CAP', 'Community-Acquired Pneumonia'],
    ['CAUTI', 'Catheter-Associated Urinary Tract Infection'],
    ['CCB', 'Calcium Channel Blocker'],
    ['CGM', 'Continuous Glucose Monitor'],
    ['CGRP', 'Calcitonin Gene-Related Peptide'],
    ['CK', 'Creatine Kinase'],
    ['CKD', 'Chronic Kidney Disease'],
    ['CNS', 'Central Nervous System'],
    ['COPD', 'Chronic Obstructive Pulmonary Disease'],
    ['COX', 'Cyclo-Oxygenase (enzyme targeted by NSAIDs)'],
    ['CPR', 'Cardiopulmonary Resuscitation'],
    ['CRP', 'C-Reactive Protein'],
    ['CRRT', 'Continuous Renal Replacement Therapy'],
    ['CRT', 'Capillary Refill Time'],
    ['CSII', 'Continuous Subcutaneous Insulin Infusion (insulin pump)'],
    ['CSV', 'Comma-Separated Values (data export format)'],
    ['CT', 'Computed Tomography'],
    ['CTA', 'CT Angiography'],
    ['CTG', 'Cardiotocography (fetal heart rate monitoring)'],
    ['CTPA', 'CT Pulmonary Angiography'],
    ['CURB', 'Confusion, Urea, Respiratory rate, Blood pressure (pneumonia severity — CURB-65)'],
    ['CVA', 'Cerebrovascular Accident (Stroke)'],
    ['CVP', 'Central Venous Pressure'],
    ['CXR', 'Chest X-Ray'],
    ['CYP3A4', 'Cytochrome P450 3A4 (liver enzyme — drug metabolism)'],
    ['DAPT', 'Dual Antiplatelet Therapy'],
    ['DASH', 'Dietary Approaches to Stop Hypertension'],
    ['DBP', 'Diastolic Blood Pressure'],
    ['DKA', 'Diabetic Ketoacidosis'],
    ['DKD', 'Diabetic Kidney Disease'],
    ['DPP', 'Dipeptidyl Peptidase (as in DPP-4 inhibitor)'],
    ['DSMES', 'Diabetes Self-Management Education and Support'],
    ['DVT', 'Deep Vein Thrombosis'],
    ['ECG', 'Electrocardiogram'],
    ['ECHO', 'Echocardiogram'],
    ['EGA', 'Estimated Gestational Age'],
    ['EKG', 'Electrocardiogram (US/European variant spelling)'],
    ['EPO', 'Erythropoietin'],
    ['ESA', 'Erythropoiesis-Stimulating Agent'],
    ['ESC', 'European Society of Cardiology'],
    ['ESH', 'European Society of Hypertension'],
    ['FBC', 'Full Blood Count'],
    ['FBG', 'Fasting Blood Glucose'],
    ['FFP', 'Fresh Frozen Plasma'],
    ['FMOH', 'Federal Ministry of Health (Nigeria)'],
    ['FPG', 'Fasting Plasma Glucose'],
    ['GAD', 'Glutamic Acid Decarboxylase'],
    ['GAD65', 'Glutamic Acid Decarboxylase-65 antibody (T1DM autoimmune marker)'],
    ['GBS', 'Group B Streptococcus'],
    ['GCK', 'Glucokinase gene (associated with MODY2)'],
    ['GCS', 'Glasgow Coma Scale'],
    ['GDM', 'Gestational Diabetes Mellitus'],
    ['GFR', 'Glomerular Filtration Rate'],
    ['GI', 'Gastrointestinal'],
    ['GLP', 'Glucagon-Like Peptide (as in GLP-1 receptor agonist)'],
    ['GTN', 'Glyceryl Trinitrate (Nitroglycerin)'],
    ['HAP', 'Hospital-Acquired Pneumonia'],
    ['HBV', 'Hepatitis B Virus'],
    ['HCO3', 'Bicarbonate (serum)'],
    ['HCTZ', 'Hydrochlorothiazide'],
    ['HDL', 'High-Density Lipoprotein'],
    ['HDU', 'High Dependency Unit'],
    ['HELLP', 'Haemolysis, Elevated Liver enzymes, Low Platelets (obstetric emergency)'],
    ['HF', 'Heart Failure'],
    ['HHS', 'Hyperosmolar Hyperglycaemic State'],
    ['HIT', 'Heparin-Induced Thrombocytopenia'],
    ['HIV', 'Human Immunodeficiency Virus'],
    ['HLA', 'Human Leukocyte Antigen'],
    ['HNF1A', 'Hepatocyte Nuclear Factor 1-Alpha (MODY3 gene)'],
    ['HOMA', 'Homeostatic Model Assessment (insulin resistance index)'],
    ['HSV', 'Herpes Simplex Virus'],
    ['HTN', 'Hypertension'],
    ['IAA', 'Insulin Autoantibody'],
    ['IBD', 'Inflammatory Bowel Disease'],
    ['ICP', 'Intracranial Pressure'],
    ['ICS', 'Inhaled Corticosteroid'],
    ['ICU', 'Intensive Care Unit'],
    ['IDSA', 'Infectious Diseases Society of America'],
    ['IHD', 'Ischaemic Heart Disease'],
    ['INR', 'International Normalised Ratio'],
    ['ISSHP', 'International Society for the Study of Hypertension in Pregnancy'],
    ['JBDS', 'Joint British Diabetes Societies'],
    ['JVP', 'Jugular Venous Pressure'],
    ['KDIGO', 'Kidney Disease: Improving Global Outcomes (international guidelines)'],
    ['LABA', 'Long-Acting Beta-2 Agonist'],
    ['LADA', 'Latent Autoimmune Diabetes in Adults'],
    ['LAMA', 'Long-Acting Muscarinic Antagonist'],
    ['LDH', 'Lactate Dehydrogenase'],
    ['LDL', 'Low-Density Lipoprotein'],
    ['LFT', 'Liver Function Test'],
    ['LMP', 'Last Menstrual Period'],
    ['LMWH', 'Low Molecular Weight Heparin'],
    ['LP', 'Lumbar Puncture'],
    ['LVH', 'Left Ventricular Hypertrophy'],
    ['MACE', 'Major Adverse Cardiovascular Events'],
    ['MAO', 'Monoamine Oxidase (as in MAOI — MAO inhibitor)'],
    ['MASLD', 'Metabolic Dysfunction-Associated Steatotic Liver Disease (formerly NAFLD)'],
    ['MBD', 'Mineral and Bone Disorder (in CKD)'],
    ['MODY', 'Maturity-Onset Diabetes of the Young'],
    ['MRA', 'Mineralocorticoid Receptor Antagonist'],
    ['MRI', 'Magnetic Resonance Imaging'],
    ['MRSA', 'Methicillin-Resistant Staphylococcus Aureus'],
    ['MSU', 'Midstream Urine (sample)'],
    ['NAFLD', 'Non-Alcoholic Fatty Liver Disease (see MASLD)'],
    ['NASH', 'Non-Alcoholic Steatohepatitis'],
    ['NEJM', 'New England Journal of Medicine'],
    ['NHLBI', 'National Heart, Lung, and Blood Institute (USA)'],
    ['NHS', 'National Health Service (UK)'],
    ['NICE', 'National Institute for Health and Care Excellence (UK)'],
    ['NIHSS', 'National Institutes of Health Stroke Scale'],
    ['NLS', 'Newborn Life Support'],
    ['NMDA', 'N-Methyl-D-Aspartate receptor'],
    ['NPH', 'Neutral Protamine Hagedorn (intermediate-acting insulin)'],
    ['NSAID', 'Non-Steroidal Anti-Inflammatory Drug'],
    ['NSTEMI', 'Non-ST-Elevation Myocardial Infarction'],
    ['OGTT', 'Oral Glucose Tolerance Test'],
    ['OSA', 'Obstructive Sleep Apnoea'],
    ['PAPP', 'Pregnancy-Associated Plasma Protein-A'],
    ['PCA', 'Patient-Controlled Analgesia'],
    ['PCC', 'Prothrombin Complex Concentrate'],
    ['PCI', 'Percutaneous Coronary Intervention'],
    ['PCOS', 'Polycystic Ovary Syndrome'],
    ['PCR', 'Polymerase Chain Reaction / Protein-Creatinine Ratio (context-dependent)'],
    ['PCSK9', 'Proprotein Convertase Subtilisin/Kexin Type 9 (LDL-lowering target)'],
    ['PE', 'Pulmonary Embolism'],
    ['PEWS', 'Paediatric Early Warning Score'],
    ['PHQ', 'Patient Health Questionnaire (depression screening tool)'],
    ['POCUS', 'Point-of-Care Ultrasound'],
    ['PPH', 'Postpartum Haemorrhage'],
    ['PPI', 'Proton Pump Inhibitor'],
    ['PTH', 'Parathyroid Hormone'],
    ['QRS', 'QRS complex (ventricular depolarisation on ECG)'],
    ['QT', 'QT interval (ventricular repolarisation — prolongation raises arrhythmia risk)'],
    ['RAAS', 'Renin-Angiotensin-Aldosterone System'],
    ['RCOG', 'Royal College of Obstetricians and Gynaecologists'],
    ['RN', 'Registered Nurse'],
    ['RR', 'Respiratory Rate'],
    ['RRT', 'Renal Replacement Therapy'],
    ['RSI', 'Rapid Sequence Intubation'],
    ['SABA', 'Short-Acting Beta-2 Agonist'],
    ['SAH', 'Subarachnoid Haemorrhage'],
    ['SBP', 'Systolic Blood Pressure'],
    ['SGLT2', 'Sodium-Glucose Cotransporter-2 (as in SGLT2 inhibitor)'],
    ['SIADH', 'Syndrome of Inappropriate Antidiuretic Hormone Secretion'],
    ['SIGN', 'Scottish Intercollegiate Guidelines Network'],
    ['SJS', 'Stevens-Johnson Syndrome'],
    ['SLE', 'Systemic Lupus Erythematosus'],
    ['SNRI', 'Serotonin-Norepinephrine Reuptake Inhibitor'],
    ['SOFA', 'Sequential Organ Failure Assessment score'],
    ['SSC', 'Surviving Sepsis Campaign'],
    ['SSRI', 'Selective Serotonin Reuptake Inhibitor'],
    ['SSTI', 'Skin and Soft Tissue Infection'],
    ['STEMI', 'ST-Elevation Myocardial Infarction'],
    ['SVR', 'Systemic Vascular Resistance'],
    ['SVT', 'Supraventricular Tachycardia'],
    ['T1DM', 'Type 1 Diabetes Mellitus'],
    ['T2DM', 'Type 2 Diabetes Mellitus'],
    ['TB', 'Tuberculosis'],
    ['TCA', 'Tricyclic Antidepressant'],
    ['TG', 'Triglycerides'],
    ['TIA', 'Transient Ischaemic Attack'],
    ['TPO', 'Thyroid Peroxidase antibody'],
    ['TSH', 'Thyroid-Stimulating Hormone'],
    ['UFH', 'Unfractionated Heparin'],
    ['USS', 'Ultrasound Scan'],
    ['UTI', 'Urinary Tract Infection'],
    ['VAP', 'Ventilator-Associated Pneumonia'],
    ['VBG', 'Venous Blood Gas'],
    ['VEGF', 'Vascular Endothelial Growth Factor'],
    ['VF', 'Ventricular Fibrillation'],
    ['VRE', 'Vancomycin-Resistant Enterococcus'],
    ['VT', 'Ventricular Tachycardia'],
    ['VTE', 'Venous Thromboembolism'],
    ['VZV', 'Varicella-Zoster Virus'],
    ['WBC', 'White Blood Cell'],
    ['WCC', 'White Cell Count'],
    ['WHO', 'World Health Organization'],
    ['WPW', 'Wolff-Parkinson-White Syndrome']
  ,
    ['3TC', 'Lamivudine (ARV — NRTI)'],
    ['ACh', 'Acetylcholine (neurotransmitter at parasympathetic and NMJ synapses)'],
    ['AIHA', 'Autoimmune Haemolytic Anaemia'],
    ['AL', 'Artemether-Lumefantrine (first-line oral antimalarial combination)'],
    ['ALT', 'Alanine Aminotransferase (liver enzyme — elevated in hepatitis, drug toxicity)'],
    ['AmB', 'Amphotericin B (antifungal — liposomal form preferred)'],
    ['ANS', 'Autonomic Nervous System (sympathetic + parasympathetic divisions)'],
    ['ART', 'Antiretroviral Therapy (HIV treatment)'],
    ['AUC', 'Area Under the Curve (pharmacokinetic dosing method — Vancomycin)'],
    ['BCS', 'Blantyre Coma Scale (paediatric coma scale — equivalent to GCS in children)'],
    ['BD', 'Bis Die — Twice Daily'],
    ['BG', 'Blood Glucose'],
    ['BPH', 'Benign Prostatic Hyperplasia (enlarged prostate — causes urinary symptoms)'],
    ['BSA', 'Body Surface Area'],
    ['CIWA', 'Clinical Institute Withdrawal Assessment (alcohol withdrawal severity scoring)'],
    ['CLL', 'Chronic Lymphocytic Leukaemia'],
    ['CML', 'Chronic Myeloid Leukaemia (treated with Imatinib)'],
    ['COCP', 'Combined Oral Contraceptive Pill (oestrogen + progestogen)'],
    ['CP', 'Cerebral Palsy'],
    ['D2', 'Dopamine D2 Receptor (target of antipsychotic drugs)'],
    ['DDAVP', 'Desmopressin (1-desamino-8-D-arginine vasopressin — treats DI, haemophilia)'],
    ['DEC', 'Diethylcarbamazine (antiparasitic — lymphatic filariasis, loiasis)'],
    ['DHP', 'Dihydropyridine (subclass of CCB — Amlodipine, Nifedipine — vasodilatory)'],
    ['DI', 'Diabetes Insipidus (vasopressin deficiency or resistance — dilute polyuria)'],
    ['DIC', 'Disseminated Intravascular Coagulation (simultaneous clotting + bleeding)'],
    ['DOACs', 'Direct Oral Anticoagulants (Apixaban, Rivaroxaban, Dabigatran, Edoxaban)'],
    ['DTG', 'Dolutegravir (ARV — integrase strand transfer inhibitor — preferred in Nigeria)'],
    ['EFV', 'Efavirenz (ARV — NNRTI — second-line after DTG in Nigeria)'],
    ['EONS', 'Early-Onset Neonatal Sepsis (0–72 hours of life)'],
    ['EPS', 'Extrapyramidal Side Effects (antipsychotic-induced — dystonia, akathisia, parkinsonism)'],
    ['FeNa', 'Fractional Excretion of Sodium (differentiates pre-renal from intrinsic AKI)'],
    ['FIGO', 'International Federation of Gynaecology and Obstetrics'],
    ['FHR', 'Foetal Heart Rate'],
    ['G6PD', 'Glucose-6-Phosphate Dehydrogenase (enzyme — deficiency causes drug-induced haemolysis)'],
    ['G-CSF', 'Granulocyte Colony-Stimulating Factor (Filgrastim — stimulates neutrophil production)'],
    ['HbA1c', 'Glycated Haemoglobin (reflects average blood glucose over preceding 3 months)'],
    ['HbF', 'Foetal Haemoglobin (increased by Hydroxyurea in SCD — reduces sickling)'],
    ['HbS', 'Sickle Haemoglobin (abnormal haemoglobin — polymerises when deoxygenated)'],
    ['HFpEF', 'Heart Failure with Preserved Ejection Fraction (LVEF ≥50%)'],
    ['HFrEF', 'Heart Failure with Reduced Ejection Fraction (LVEF ≤40%)'],
    ['ICR', 'Insulin-to-Carbohydrate Ratio (units of insulin per grams of carbohydrate)'],
    ['IM', 'Intramuscular (injection route)'],
    ['INH', 'Isoniazid (first-line TB drug — abbreviated H in HRZE regimen)'],
    ['ISF', 'Insulin Sensitivity Factor (how much 1 unit of insulin drops blood glucose)'],
    ['ITP', 'Immune Thrombocytopaenic Purpura (autoimmune platelet destruction)'],
    ['IV', 'Intravenous'],
    ['IVH', 'Intraventricular Haemorrhage (bleeding into brain ventricles — preterm complication)'],
    ['LONS', 'Late-Onset Neonatal Sepsis (>72 hours to 28 days of life)'],
    ['LVEF', 'Left Ventricular Ejection Fraction (% of blood pumped per beat — normal >55%)'],
    ['MAC', 'Mycobacterium Avium Complex (opportunistic infection in advanced HIV)'],
    ['MB', 'Multibacillary (leprosy classification — more than 5 patches or nerve involvement)'],
    ['MDR', 'Multi-Drug Resistant (e.g. MDR-TB, MDR Gram-negative organisms)'],
    ['MDT', 'Multi-Drug Therapy (leprosy treatment) / Multidisciplinary Team'],
    ['MG', 'Myasthenia Gravis (autoimmune NMJ disease — muscle weakness + fatiguability)'],
    ['MUAC', 'Mid-Upper Arm Circumference (SAM screening: <11.5cm = severe malnutrition)'],
    ['NAC', 'N-Acetylcysteine (antidote for paracetamol overdose; mucolytic)'],
    ['NBM', 'Nil By Mouth (fasting status)'],
    ['NEC', 'Necrotising Enterocolitis (severe neonatal bowel condition)'],
    ['NHL', 'Non-Hodgkin Lymphoma'],
    ['NMJ', 'Neuromuscular Junction (site where motor nerve meets muscle)'],
    ['NNRTI', 'Non-Nucleoside Reverse Transcriptase Inhibitor (ARV class — EFV, Nevirapine)'],
    ['NRTI', 'Nucleoside Reverse Transcriptase Inhibitor (ARV class — TDF, 3TC)'],
    ['OD', 'Omni Die — Once Daily'],
    ['OCT2', 'Organic Cation Transporter 2 (renal transporter — DTG inhibits this, raises Metformin)'],
    ['ODS', 'Osmotic Demyelination Syndrome (complication of too-rapid sodium correction)'],
    ['OP', 'Organophosphate (pesticide — toxicity causes cholinergic crisis; antidote: Atropine)'],
    ['ORS', 'Oral Rehydration Solution (glucose-electrolyte solution for dehydration)'],
    ['PB', 'Paucibacillary (leprosy classification — 1–5 patches, no nerve trunk involvement)'],
    ['PCP', 'Pneumocystis jirovecii Pneumonia (AIDS-defining opportunistic infection)'],
    ['PI', 'Protease Inhibitor (ARV class — Lopinavir/r, Atazanavir/r — potent CYP3A4 inhibitors)'],
    ['PO', 'Per Os — By Mouth / Oral route'],
    ['PR', 'Per Rectum (rectal administration route)'],
    ['PRBC', 'Packed Red Blood Cells (blood transfusion product — 1 unit raises Hb ~1 g/dL)'],
    ['PT', 'Prothrombin Time (clotting test — prolonged in warfarin use, liver disease, DIC)'],
    ['PTSD', 'Post-Traumatic Stress Disorder'],
    ['QDS', 'Quater Die Sumendum — Four Times Daily'],
    ['RBG', 'Random Blood Glucose (blood glucose at any time regardless of fasting)'],
    ['RDS', 'Respiratory Distress Syndrome (neonatal — surfactant deficiency; prevented by antenatal steroids)'],
    ['ReSoMal', 'Rehydration Solution for Malnutrition (special low-sodium ORS for SAM — not standard ORS)'],
    ['RUTF', 'Ready-to-Use Therapeutic Food (e.g. Plumpy-Nut — peanut-based SAM treatment)'],
    ['SAM', 'Severe Acute Malnutrition (MUAC <11.5cm or WHZ <-3SD or bilateral pitting oedema)'],
    ['SC', 'Subcutaneous (injection route)'],
    ['SCD', 'Sickle Cell Disease (HbSS or compound heterozygote — HbSC, HbSβ-thal)'],
    ['SL', 'Sublingual (under the tongue — e.g. GTN spray, Misoprostol)'],
    ['SOGON', 'Society of Gynaecology and Obstetrics of Nigeria'],
    ['TD', 'Tardive Dyskinesia (late-onset involuntary movements from chronic antipsychotic use)'],
    ['TCD', 'Transcranial Doppler (ultrasound — screens for stroke risk in SCD children)'],
    ['TDD', 'Total Daily Dose (insulin — basis for basal-bolus regimen calculation)'],
    ['TDF', 'Tenofovir Disoproxil Fumarate (ARV — NRTI — backbone of TLD/TLE regimens)'],
    ['TDS', 'Ter Die Sumendum — Three Times Daily'],
    ['TEN', 'Toxic Epidermal Necrolysis (severe drug reaction — >30% skin detachment)'],
    ['TLC', 'Total Lymphocyte Count'],
    ['TLD', 'Tenofovir + Lamivudine + Dolutegravir (preferred first-line ARV regimen in Nigeria)'],
    ['TLE', 'Tenofovir + Lamivudine + Efavirenz (alternative first-line ARV regimen Nigeria)'],
    ['TSAT', 'Transferrin Saturation (iron stores — target >20% before starting EPO)'],
    ['UNAIDS', 'United Nations Programme on HIV/AIDS'],
    ['UO', 'Urine Output (target ≥0.5 ml/kg/hr in adults; ≥1 ml/kg/hr in children)'],
    ['VOC', 'Vaso-Occlusive Crisis (sickle cell pain crisis — commonest SCD complication)'],
    ['VSD', 'Ventricular Septal Defect'],
    ['VWD', 'Von Willebrand Disease (commonest inherited bleeding disorder)'],
    ['VWF', 'Von Willebrand Factor (large protein — carries FVIII, mediates platelet adhesion)'],
    ['WHZ', 'Weight-for-Height Z-score (malnutrition assessment — <-3SD = SAM)']
  ];

  el_.appendChild(fromHTML(
    '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding:0 0 10px">' +
    '<span style="font-size:12px;color:#64748b">' + GLOSS.length + ' abbreviations \u00b7 A\u2013Z</span>' +
    '<span id="gloss-count" style="font-size:12px;color:#0ea5e9;font-weight:600"></span>' +
    '</div>'
  ));

  el_.appendChild(fromHTML(
    '<div style="position:relative;margin-bottom:12px">' +
    '<input id="gloss-search" placeholder="\uD83D\uDD0D  Search abbreviation or meaning..." ' +
    'oninput="glossFilter(this.value)" ' +
    'style="width:100%;padding:11px 14px 11px 40px;border-radius:10px;border:1.5px solid #e2e8f0;background:#fff;color:#1e293b;font-size:14px;font-family:inherit;outline:none;box-sizing:border-box;transition:border-color 0.2s,box-shadow 0.2s" ' +
    'onfocus="this.style.borderColor=\'#0ea5e9\';this.style.boxShadow=\'0 0 0 3px rgba(14,165,233,0.12)\'" ' +
    'onblur="this.style.borderColor=\'#e2e8f0\';this.style.boxShadow=\'none\'">' +
    '<span style="position:absolute;left:13px;top:50%;transform:translateY(-50%);font-size:15px;pointer-events:none">\uD83D\uDD0D</span>' +
    '</div>'
  ));

  var letters = [...new Set(GLOSS.map(function(g){ return g[0][0].toUpperCase(); }))].sort();
  var indexBar = document.createElement('div');
  indexBar.id = 'gloss-index';
  indexBar.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;padding:0 0 14px';
  letters.forEach(function(l) {
    var b = document.createElement('button');
    b.id = 'gloss-idx-btn-' + l;
    b.textContent = l;
    b.style.cssText = 'padding:4px 9px;border-radius:6px;border:1px solid #e2e8f0;background:#f8fafc;color:#0ea5e9;font-size:12px;font-weight:700;cursor:pointer;transition:all 0.15s';
    b.onmouseenter = function(){ if(!this.classList.contains('gloss-idx-active')){ this.style.background='#e0f2fe'; } };
    b.onmouseleave = function(){ if(!this.classList.contains('gloss-idx-active')){ this.style.background='#f8fafc'; } };
    b.onclick = function(){
      var t = document.getElementById('gloss-letter-'+l);
      if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
    };
    indexBar.appendChild(b);
  });
  el_.appendChild(indexBar);

  var grouped = {};
  GLOSS.forEach(function(g){
    var l = g[0][0].toUpperCase();
    if(!grouped[l]) grouped[l]=[];
    grouped[l].push(g);
  });

  var container = document.createElement('div');
  container.id = 'gloss-container';

  Object.keys(grouped).sort().forEach(function(l){
    var hdr = document.createElement('div');
    hdr.id = 'gloss-letter-'+l;
    hdr.dataset.letter = l;
    hdr.style.cssText = 'font-size:18px;font-weight:800;color:#0ea5e9;padding:10px 0 6px;border-bottom:2px solid #bae6fd;margin-bottom:6px;scroll-margin-top:64px;letter-spacing:1px';
    hdr.textContent = l;
    container.appendChild(hdr);
    grouped[l].forEach(function(g){
      var row = document.createElement('div');
      row.className = 'gloss-row';
      row.dataset.abbr    = g[0].toLowerCase();
      row.dataset.meaning = g[1].toLowerCase();
      row.dataset.letter  = l;
      row.style.cssText = 'display:flex;gap:12px;align-items:flex-start;padding:8px 10px;border-radius:8px;margin-bottom:2px;transition:background 0.15s;cursor:default';
      row.onmouseenter = function(){ this.style.background='rgba(14,165,233,0.06)'; };
      row.onmouseleave = function(){ this.style.background='transparent'; };
      row.innerHTML =
        '<span class="gloss-abbr" style="font-family:\'Fira Code\',monospace;font-size:13px;font-weight:700;color:#0ea5e9;min-width:80px;flex-shrink:0;padding-top:1px">'+g[0]+'</span>'+
        '<span class="gloss-def" style="font-size:13px;color:#374151;line-height:1.55">'+g[1]+'</span>';
      container.appendChild(row);
    });
  });
  el_.appendChild(container);

  window.glossFilter = function(q){
    q = q.trim();
    var ql = q.toLowerCase();
    var rows = container.querySelectorAll('.gloss-row');
    var visByLetter = {};
    var total = 0;
    rows.forEach(function(r){
      var match = !q || r.dataset.abbr.indexOf(ql)!==-1 || r.dataset.meaning.indexOf(ql)!==-1;
      if(match){
        r.style.display='flex';
        total++;
        visByLetter[r.dataset.letter]=true;
        var safeQ=q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
        var re=new RegExp('('+safeQ+')','gi');
        var ae=r.querySelector('.gloss-abbr'), de=r.querySelector('.gloss-def');
        if(!r.dataset.abbrOrig) r.dataset.abbrOrig=ae.textContent;
        if(!r.dataset.defOrig)  r.dataset.defOrig=de.textContent;
        if(q){
          ae.innerHTML=r.dataset.abbrOrig.replace(re,'<mark style="background:#fef08a;color:#1e293b;border-radius:2px;padding:0 1px;font-weight:700">$1</mark>');
          de.innerHTML=r.dataset.defOrig.replace(re,'<mark style="background:#fef08a;color:#1e293b;border-radius:2px;padding:0 1px;font-weight:700">$1</mark>');
        } else {
          ae.textContent=r.dataset.abbrOrig||ae.textContent;
          de.textContent=r.dataset.defOrig||de.textContent;
        }
      } else {
        r.style.display='none';
      }
    });
    container.querySelectorAll('[id^="gloss-letter-"]').forEach(function(hdr){
      var l=hdr.dataset.letter;
      hdr.style.display=(!q||visByLetter[l])?'':'none';
      var btn=document.getElementById('gloss-idx-btn-'+l);
      if(btn){
        if(!q){
          btn.style.cssText='padding:4px 9px;border-radius:6px;border:1px solid #e2e8f0;background:#f8fafc;color:#0ea5e9;font-size:12px;font-weight:700;cursor:pointer;opacity:1';
          btn.classList.remove('gloss-idx-active');
        } else if(visByLetter[l]){
          btn.style.cssText='padding:4px 9px;border-radius:6px;border:1px solid #0ea5e9;background:#0ea5e9;color:#fff;font-size:12px;font-weight:700;cursor:pointer;opacity:1';
          btn.classList.add('gloss-idx-active');
        } else {
          btn.style.cssText='padding:4px 9px;border-radius:6px;border:1px solid #e2e8f0;background:#f8fafc;color:#cbd5e1;font-size:12px;font-weight:700;cursor:pointer;opacity:0.4';
          btn.classList.remove('gloss-idx-active');
        }
      }
    });
    var ce=document.getElementById('gloss-count');
    if(ce) ce.textContent=q?(total+' of '+GLOSS.length+' matching'):'';
  };
}

function _getReviews() {
  try { return JSON.parse(localStorage.getItem('triad_reviews_v1') || '[]'); } catch(e) { return []; }
}
function _saveReviews(arr) {
  try { localStorage.setItem('triad_reviews_v1', JSON.stringify(arr)); } catch(e) {}
}
function _renderReviewList(container) {
  var reviews = _getReviews();
  if (!reviews.length) {
    container.innerHTML = '<p style="font-size:13px;color:#94a3b8;text-align:center;padding:24px 0">No reviews yet — be the first to leave feedback.</p>';
    return;
  }
  var stars = ['','★','★★','★★★','★★★★','★★★★★'];
  container.innerHTML = reviews.slice().reverse().map(function(r) {
    return '<div style="padding:12px 0;border-bottom:1px solid #fde68a55">' +
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">' +
        '<span style="color:#f59e0b;font-size:16px;letter-spacing:1px">' + (stars[r.rating]||'') + '</span>' +
        '<span style="font-weight:700;font-size:13px;color:#1e293b">' + (r.name || 'Anonymous') + '</span>' +
        (r.role ? '<span style="font-size:11px;color:#64748b;background:#fef3c7;padding:2px 7px;border-radius:10px">' + r.role + '</span>' : '') +
        '<span style="font-size:11px;color:#94a3b8;margin-left:auto">' + (r.date || '') + '</span>' +
      '</div>' +
      (r.comment ? '<p style="font-size:13px;color:#374151;margin:4px 0 0;line-height:1.6">' + r.comment.replace(/</g,'&lt;') + '</p>' : '') +
    '</div>';
  }).join('');
}
function _exportReviewsCSV() {
  var reviews = _getReviews();
  if (!reviews.length) { alert('No reviews to export yet.'); return; }
  var rows = [['Date','Name','Role','Rating','Comment']].concat(reviews.map(function(r){
    return [r.date||'',r.name||'',r.role||'',r.rating||'','"'+(r.comment||'').replace(/"/g,'""')+'"'];
  }));
  var csv = rows.map(function(r){ return r.join(','); }).join('\n');
  var blob = new Blob([csv], {type:'text/csv'});
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'triad_reviews.csv'; a.click();
}
function tabReviews(el_) {
  el_.appendChild(secTitle('⭐','Clinical Reviews','Share your experience — your feedback shapes the future of The Triad','#f59e0b'));
  el_.appendChild(notebox('📝 <strong>Your review matters.</strong> Whether you are a nurse, intern, physician, or consultant — your honest feedback helps improve The Triad for every clinician who uses it.','#fffbeb','#fde68a'));

  // ── Submit form card — Google Form (developer sees all submissions) ──
  var rc = card('Submit Your Review','#f59e0b','');
  var rb = rc.querySelector('.card-body');
  rb.innerHTML =
    '<p style="font-size:13px;color:#64748b;margin-bottom:12px">Fill in the form below. Your review goes directly to the development team.</p>' +
    '<div style="border-radius:12px;overflow:hidden;border:2px solid #fde68a;box-shadow:0 2px 12px rgba(245,158,11,0.10)">' +
      '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdOXenGIRQSVucNzILM2SCLA8SC3WzAPRvD_9AIOzv0qiRBjQ/viewform?embedded=true" width="100%" height="820" frameborder="0" marginheight="0" marginwidth="0" style="display:block;background:#fffbeb">Loading form...</iframe>' +
    '</div>';
  el_.appendChild(rc);


  // ── Previous reviews card ──
  var lc = card('Previous Reviews','#f59e0b','');
  var lb = lc.querySelector('.card-body');
  lb.innerHTML = '<div id="rev-list-body"></div>' +
    '<button onclick="_exportReviewsCSV()" style="display:flex;align-items:center;gap:6px;margin-top:14px;padding:8px 14px;background:#fffbeb;color:#92400e;border:1.5px solid #fde68a;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit">⬇️ Export Reviews as CSV</button>';
  el_.appendChild(lc);
  _renderReviewList(document.getElementById('rev-list-body'));

  // ── Info card ──
  el_.appendChild(card('About This Review System','#f59e0b','<div style="font-size:13px;color:#374151;line-height:1.9">'+[['📋','Reviews are submitted directly to the development team via Google Forms.'],['👁️','All reviews are collected and will be shared publicly as the app grows.'],['🔒','Your name and institution are collected for credibility only — no personal data is sold or shared.'],['💡','Suggestions from reviews directly influence future updates and new features.'],['⭐','If you find The Triad useful, share it with your clinical team.']].map(function(x){return '<div style="display:flex;gap:12px;align-items:flex-start;padding:6px 0;border-bottom:1px solid #fde68a55"><span style="font-size:18px;flex-shrink:0">'+x[0]+'</span><span>'+x[1]+'</span></div>';}).join('')+'</div>'));
}

function openAbout() {
  document.getElementById('about-overlay').style.display = 'flex';
}
function closeAbout() {
  document.getElementById('about-overlay').style.display = 'none';
}

function acceptDisc() {
  document.getElementById('disc-overlay').style.display = 'none';
  var appEl = document.getElementById('app');
  appEl.style.opacity = '0';
  appEl.style.display = 'block';
  requestAnimationFrame(function() {
    appEl.style.transition = 'opacity 0.25s ease';
    appEl.style.opacity = '1';
  });
  try { sessionStorage.setItem('disc_ok','1'); } catch(e) {}
  initApp();
}
function declineDisc() {
  document.getElementById('disc-overlay').style.display = 'none';
  document.getElementById('disc-declined').style.display = 'flex';
}
(function() {
  try { if (sessionStorage.getItem('disc_ok')==='1') { acceptDisc(); } } catch(e) {}
})();

// ── MODULE / TAB SWITCHING ───────────────────────────────────────
// ── 3-LEVEL NAVIGATION ─────────────────────────────────────────
// nav level: 'home' | 'tabgrid' | 'content'
var _navLevel = 'home';
var _navMod   = null; // current module when at tabgrid/content

// MOD_META is defined in navigation.js — do not redefine here.

// Tab group labels for display in tab grid
var TAB_GROUP_MAP = {}; // built lazily

