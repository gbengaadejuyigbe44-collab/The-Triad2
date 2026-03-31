// ════════════════════════════════════════════════════════════════
// THE TRIAD — Icon System
// SVG icons replacing emoji throughout the UI.
// All icons use currentColor so they inherit from CSS.
// ════════════════════════════════════════════════════════════════

var ICONS = (function() {

  function svg(path, extra) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' + (extra || '') + '>' + path + '</svg>';
  }

  function svgFill(path) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none">' + path + '</svg>';
  }

  return {

    // ── Header / shell ───────────────────────────────────────────
    home:     svg('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'),
    search:   svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
    moon:     svg('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'),
    sun:      svg('<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'),
    settings: svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'),
    print:    svg('<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>'),
    chevronUp: svg('<polyline points="18 15 12 9 6 15"/>'),
    info:     svg('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'),
    close:    svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),
    back:     svg('<polyline points="15 18 9 12 15 6"/>'),

    // ── Emergency / alerts ───────────────────────────────────────
    emergency: svg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
    warning:   svg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
    shield:    svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
    zap:       svg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),

    // ── Module icons ─────────────────────────────────────────────
    // HTN — heart with pulse
    htn: svg('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' +
         '<polyline points="3.5 12 6 9 8 13 10 10.5 12 12" stroke-width="1.5" fill="none"/>'),

    // HYPO — activity/waveform (IV drop)
    hypo: svg('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),

    // DM — droplet / glucose
    dm: svg('<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>'),

    // SEPSIS — bacteria / virus
    sepsis: svg('<circle cx="12" cy="12" r="4"/>' +
      '<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>' +
      '<line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>' +
      '<line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>' +
      '<line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>'),

    // PAED — baby/user small
    paed: svg('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),

    // RENAL — filter/kidney shape
    renal: svg('<path d="M12 2C8 2 4 5.5 4 10c0 3 1.5 5.5 4 7l1 5h6l1-5c2.5-1.5 4-4 4-7 0-4.5-4-8-8-8z"/>'),

    // DRUG — pill / capsule
    drug: svg('<path d="M10.5 20.5L3.5 13.5a5 5 0 0 1 7.07-7.07l7 7a5 5 0 0 1-7.07 7.07z"/>' +
      '<line x1="8.5" y1="11.5" x2="15.5" y2="4.5"/>'),

    // COMBINED — layers
    combined: svg('<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'),

    // REVIEW — star
    review: svg('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),

    // ── Tab icons ────────────────────────────────────────────────
    prevention:  svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
    detection:   svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
    evaluation:  svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>'),
    treatment:   svg('<path d="M10.5 20.5L3.5 13.5a5 5 0 0 1 7.07-7.07l7 7a5 5 0 0 1-7.07 7.07z"/><line x1="8.5" y1="11.5" x2="15.5" y2="4.5"/>'),
    lifestyle:   svg('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
    riskProfile: svg('<path d="M20 21v-2a4 2 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
    ascvd:       svg('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'),
    medChecker:  svg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/>'),
    tracker:     svg('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),
    specialPops: svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    measurement: svg('<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>'),
    cva:         svg('<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>'),
    anc:         svg('<path d="M12 2C8 2 4 5.5 4 10c0 3 1.5 5.5 4 7l1 5h6l1-5c2.5-1.5 4-4 4-7 0-4.5-4-8-8-8z"/>'),
    causes:      svg('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'),
    management:  svg('<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>'),
    shock:       svg('<polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
    t2dm:        svg('<path d="M10.5 20.5L3.5 13.5a5 5 0 0 1 7.07-7.07l7 7a5 5 0 0 1-7.07 7.07z"/>'),
    t1dm:        svg('<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>'),
    hba1c:       svg('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'),
    insulinGuide:svg('<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m10 0h3a2 2 0 0 0 2-2v-3"/>'),
    insulinChart:svg('<rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="3 9 9 9 12 3 15 15 18 9 21 9"/>'),
    bgTracker:   svg('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),
    complications:svg('<path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'),
    glycaemicEm: svg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
    // Drug tabs
    vasopressors:svg('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),
    antidiabetics:svg('<path d="M10.5 20.5L3.5 13.5a5 5 0 0 1 7.07-7.07l7 7a5 5 0 0 1-7.07 7.07z"/>'),
    insulinCalc: svg('<path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="12" y1="12" x2="12" y2="18"/>'),
    emergencyMeds:svg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>'),
    ivFluids:    svg('<path d="M12 2v6l3 3-3 3v8"/><path d="M8 8h8"/>'),
    interactions:svg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/>'),
    pregnancy:   svg('<circle cx="12" cy="8" r="4"/><path d="M8 14c-2 1-4 3-4 5v1h16v-1c0-2-2-4-4-5"/>'),
    psychiatry:  svg('<path d="M9 2h6l2 4-8 2-8-2 2-4z"/><path d="M12 8v14"/><circle cx="12" cy="17" r="3"/>'),
    antibiotics: svg('<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>'),
    electrolytes:svg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
    analgesics:  svg('<path d="M10.5 20.5L3.5 13.5a5 5 0 0 1 7.07-7.07l7 7a5 5 0 0 1-7.07 7.07z"/><line x1="8.5" y1="11.5" x2="15.5" y2="4.5"/>'),
    respGI:      svg('<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>'),
    cardioEndo:  svg('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'),
    neuroMSK:    svg('<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04z"/>'),
    antimalarials:svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
    dermatology: svg('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'),
    obsGynae:    svg('<circle cx="12" cy="8" r="4"/><path d="M8 14c-2 1-4 3-4 5v1h16v-1c0-2-2-4-4-5"/>'),
    haematology: svg('<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>'),
    // Sepsis tabs
    sofa:        svg('<rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="3 9 9 9 12 3 15 15 18 9 21 9"/>'),
    hour1:       svg('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
    severity:    svg('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'),
    investigations:svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>'),
    // Paed tabs
    drugDoses:   svg('<path d="M10.5 20.5L3.5 13.5a5 5 0 0 1 7.07-7.07l7 7a5 5 0 0 1-7.07 7.07z"/>'),
    normals:     svg('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'),
    neonatal:    svg('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
    fluidGuide:  svg('<path d="M12 2v6l3 3-3 3v8"/>'),
    assessment:  svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="9" y1="11" x2="15" y2="11"/>'),
    malaria:     svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
    convulsions: svg('<polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
    malnutrition:svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'),
    sickleCell:  svg('<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>'),
    // Renal tabs
    egfr:        svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
    ckd:         svg('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'),
    aki:         svg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>'),
    dialysis:    svg('<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m10 0h3a2 2 0 0 0 2-2v-3"/>'),
    drugDosing:  svg('<path d="M10.5 20.5L3.5 13.5a5 5 0 0 1 7.07-7.07l7 7a5 5 0 0 1-7.07 7.07z"/>'),
    // Combined / misc
    combined_htn:svg('<polygon points="12 2 2 7 12 12 22 7 12 2"/>'),
    sharedDrugs: svg('<path d="M10.5 20.5L3.5 13.5a5 5 0 0 1 7.07-7.07l7 7a5 5 0 0 1-7.07 7.07z"/>'),
    sharedTargets:svg('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'),
    reviews:     svg('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),
    glossary:    svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'),

    // ── Lifestyle / section icons ─────────────────────────────────
    diet:     svg('<path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.83 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.81-2.81"/>'),
    salt:     svg('<line x1="12" y1="2" x2="12" y2="6"/><path d="M17.2 6.8C20 9.2 20 13.5 17.2 16.4L12 22l-5.2-5.6C3.9 13.5 4 9.2 6.8 6.8 9.6 4.5 14.4 4.5 17.2 6.8z"/>'),
    weight:   svg('<path d="M6 2h12l3 6H3l3-6z"/><path d="M5 8h14v14H5z"/><path d="M9 12h6"/>'),
    exercise: svg('<circle cx="12" cy="5" r="2"/><path d="M4.2 18.3l3-9.3h9.7l3 9.3"/>'),
    alcohol:  svg('<path d="M8 2h8"/><path d="M9 2l-1 7H5l1 2h12l1-2h-3L15 2"/>'),
    smoking:  svg('<path d="M17 12H3"/><path d="M21 8c0 2.2-1.8 4-4 4"/><path d="M21 12h-1"/>'),
    stress:   svg('<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>'),
    sleep:    svg('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'),

    // ── Emergency protocol icons ──────────────────────────────────
    heartCrisis: svg('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><line x1="12" y1="9" x2="12" y2="13"/>'),
    dka:         svg('<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>'),
    hhs:         svg('<path d="M12 2v6l3 3-3 3v8"/>'),
    hypo_em:     svg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
    eclampsia:   svg('<circle cx="12" cy="8" r="4"/><path d="M8 14c-2 1-4 3-4 5v1h16v-1c0-2-2-4-4-5"/>'),
    haemorrhage: svg('<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>'),
    pulmOedema:  svg('<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/>'),
    stroke:      svg('<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/>'),
    mi:          svg('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'),
    pe:          svg('<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>'),
    sickle:      svg('<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>'),
  };

})();

// ── TAB LABEL → ICON LOOKUP ───────────────────────────────────────
// Maps the text part of tab labels to the right icon.
var TAB_ICON_MAP = {
  'Prevention':         ICONS.prevention,
  'Detection':          ICONS.detection,
  'Evaluation':         ICONS.evaluation,
  'Treatment':          ICONS.treatment,
  'Lifestyle':          ICONS.lifestyle,
  'Risk Profile':       ICONS.riskProfile,
  'ASCVD':              ICONS.ascvd,
  'Med Checker':        ICONS.medChecker,
  'BP Tracker':         ICONS.tracker,
  'Special Pops':       ICONS.specialPops,
  'BP Measurement':     ICONS.measurement,
  'CVA Protocol':       ICONS.cva,
  'ANC Assessment':     ICONS.anc,
  'Causes':             ICONS.causes,
  'Management':         ICONS.management,
  'Shock Protocol':     ICONS.shock,
  'Special Cases':      ICONS.specialPops,
  'Type 2 Treatment':   ICONS.t2dm,
  'Type 1 DM':          ICONS.t1dm,
  'HbA1c & Targets':    ICONS.hba1c,
  'Insulin Guide':      ICONS.insulinGuide,
  'Insulin Chart':      ICONS.insulinChart,
  'BG Tracker':         ICONS.bgTracker,
  'Complications':      ICONS.complications,
  'Glycaemic Emergencies': ICONS.glycaemicEm,
  'HTN + DM':           ICONS.combined_htn,
  'Shared Drugs':       ICONS.sharedDrugs,
  'Shared Targets':     ICONS.sharedTargets,
  'Antihypertensives':  ICONS.treatment,
  'Vasopressors':       ICONS.vasopressors,
  'Antidiabetics':      ICONS.antidiabetics,
  'Insulin Calc':       ICONS.insulinCalc,
  'Emergency Meds':     ICONS.emergencyMeds,
  'IV Fluids':          ICONS.ivFluids,
  'Interactions':       ICONS.interactions,
  'Drugs in Pregnancy': ICONS.pregnancy,
  'Psychiatry':         ICONS.psychiatry,
  'Antibiotics':        ICONS.antibiotics,
  'Electrolytes':       ICONS.electrolytes,
  'Analgesics':         ICONS.analgesics,
  'Resp & GI':          ICONS.respGI,
  'Cardio & Endocrine': ICONS.cardioEndo,
  'Neuro & MSK':        ICONS.neuroMSK,
  'Antimalarials':      ICONS.antimalarials,
  'Dermatology':        ICONS.dermatology,
  'Obs & Gynae':        ICONS.obsGynae,
  'Haematology':        ICONS.haematology,
  'Overview':           ICONS.evaluation,
  'qSOFA & SOFA':       ICONS.sofa,
  'Hour-1 Bundle':      ICONS.hour1,
  'Empiric Antibiotics':ICONS.antibiotics,
  'Severity Guide':     ICONS.severity,
  'Investigations':     ICONS.investigations,
  'Drug Doses':         ICONS.drugDoses,
  'Normal Values':      ICONS.normals,
  'DKA Protocol':       ICONS.dka,
  'Neonatal Resus':     ICONS.neonatal,
  'Fluid Guide':        ICONS.fluidGuide,
  'Assessment':         ICONS.assessment,
  'Malaria & Fever':    ICONS.malaria,
  'Convulsions':        ICONS.convulsions,
  'Malnutrition':       ICONS.malnutrition,
  'Sickle Cell':        ICONS.sickleCell,
  'eGFR Calculator':    ICONS.egfr,
  'CKD Staging':        ICONS.ckd,
  'AKI Protocol':       ICONS.aki,
  'Dialysis':           ICONS.dialysis,
  'Drug Dosing':        ICONS.drugDosing,
  'Reviews & Feedback': ICONS.reviews,
  'Glossary':           ICONS.glossary,
};

// ── MODULE KEY → ICON LOOKUP ──────────────────────────────────────
var MOD_ICON_MAP = {
  HTN:    ICONS.htn,
  HYPO:   ICONS.hypo,
  DM:     ICONS.dm,
  SEPSIS: ICONS.sepsis,
  PAED:   ICONS.paed,
  RENAL:  ICONS.renal,
  DRUG:   ICONS.drug,
  COMB:   ICONS.combined,
  REVIEW: ICONS.review,
};

// ── EMOJI → SVG LOOKUP (for secTitle and other call sites) ───────
// Maps emoji strings used in tab content section headers to SVG icons.
var EMOJI_TO_SVG = {
  '🛡️': ICONS.shield,
  '🔍': ICONS.search,
  '📋': ICONS.evaluation,
  '💊': ICONS.drug,
  '🌱': ICONS.lifestyle,
  '👤': ICONS.riskProfile,
  '📐': ICONS.ascvd,
  '⚠️': ICONS.warning,
  '📈': ICONS.tracker,
  '👶': ICONS.paed,
  '📏': ICONS.measurement,
  '🧠': ICONS.stroke,
  '🤰': ICONS.pregnancy,
  '💉': ICONS.hypo,
  '🩸': ICONS.dm,
  '🔗': ICONS.complications,
  '🚨': ICONS.emergency,
  '🦠': ICONS.sepsis,
  '⏱️': ICONS.hour1,
  '🔢': ICONS.sofa,
  '🧪': ICONS.investigations,
  '⚖️': ICONS.weight,
  '🪼': ICONS.neonatal,
  '💧': ICONS.ivFluids,
  '📊': ICONS.severity,
  '🦟': ICONS.antimalarials,
  '⚡': ICONS.electrolytes,
  '🍽️': ICONS.diet,
  '🩺': ICONS.bgTracker,
  '❤️': ICONS.htn,
  '⭐': ICONS.review,
  '📖': ICONS.glossary,
  '🔬': ICONS.egfr,
  '🫁': ICONS.pulmOedema,
  '🩹': ICONS.dermatology,
  '🤱': ICONS.obsGynae,
  '🔴': ICONS.sickle,
  '💔': ICONS.mi,
  '🫘': ICONS.renal,
  '🏥': ICONS.evaluation,
  '📞': ICONS.info,
};
