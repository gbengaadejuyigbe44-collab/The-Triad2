// ── HELPERS ──────────────────────────────────────────────────────
// © Gbenga Adejuyigbe, RN, BNSc — The Triad v3.1 2026

function wrapTables(container) {
  if (!container) return;
  container.querySelectorAll('table').forEach(function(tbl) {
    if (tbl.parentNode && !tbl.parentNode.classList.contains('tbl-wrap')) {
      var wrap = document.createElement('div');
      wrap.className = 'tbl-wrap';
      tbl.parentNode.insertBefore(wrap, tbl);
      wrap.appendChild(tbl);
    }
  });
}
function classifyBP(sys, dia) {
  // Input validation
  if (sys < 60 || sys > 300 || dia < 30 || dia > 200) {
    return { error: true, msg: '⚠ Value outside physiological range — please recheck (SBP 60–300, DBP 30–200 mmHg).' };
  }
  // ESC/ESH 2023 Classification
  // Isolated Systolic HTN: SBP ≥140 AND DBP <90
  if (sys >= 140 && dia < 90) {
    return Object.assign({}, BP_STAGES[6], {si:6, di:0, note:null});
  }
  // Hypertensive Crisis: SBP >180 AND DBP >120
  if (sys > 180 && dia > 120) {
    return Object.assign({}, BP_STAGES[7], {si:7, di:7, note:null});
  }
  // Grade by systolic
  var si = sys>=180?5:sys>=160?4:sys>=140?3:sys>=130?2:sys>=120?1:0;
  // Grade by diastolic
  var di = dia>=110?5:dia>=100?4:dia>=90?3:dia>=85?2:dia>=80?1:0;
  var fi = Math.max(si,di);
  var r = Object.assign({}, BP_STAGES[fi], {si:si, di:di});
  // Discordance note
  if (si !== di) {
    var sl = ['Optimal','Normal','High Normal','Grade 1 HTN','Grade 2 HTN','Grade 3 HTN'];
    var dl = ['Optimal','Normal','High Normal','Grade 1 HTN','Grade 2 HTN','Grade 3 HTN'];
    r.note = { driver: di>si?'diastolic':'systolic', driverVal: di>si?dia:sys,
      sysLabel:sl[si], diaLabel:dl[di], si:si, di:di, sys:sys, dia:dia };
  }
  return r;
}

function classifyBPSeverity(sys, dia) {
  // Hypotension classification — ESC Guidelines + Surviving Sepsis Campaign (SSC)
  var map = Math.round((sys + 2*dia) / 3);
  if (sys < 70 || map < 50) return {level:'Shock / Cardiovascular Collapse', color:'#7c3aed', bg:'#faf5ff', border:'#e9d5ff'};
  if (sys <= 90 && map < 65) return {level:'Significant Hypotension', color:'#dc2626', bg:'#fef2f2', border:'#fecaca'};
  if (sys <= 90) return {level:'Moderate Hypotension', color:'#ea580c', bg:'#fff7ed', border:'#fed7aa'};
  if (sys <= 90 && dia <= 60)  return {level:'Moderate Hypotension',color:'#ea580c',bg:'#fff7ed',border:'#fed7aa'};
  if (sys < 100)               return {level:'Mild Hypotension',    color:'#d97706',bg:'#fffbeb',border:'#fde68a'};
  return {level:'Normal',                                            color:'#16a34a',bg:'#f0fdf4',border:'#bbf7d0'};
}

function calcASCVD(f) {
  var ln = Math.log;
  var age = parseFloat(f.age), tc = parseFloat(f.totalChol), hdl = parseFloat(f.hdl), sbp = parseFloat(f.sbp);
  var bpMed = f.onBpMed?1:0, dm = f.diabetes?1:0, smk = f.smoker?1:0;
  var s = 0;
  if (f.sex==='male' && f.race==='white') {
    s = 12.344*ln(age)+11.853*ln(tc)-2.664*ln(age)*ln(tc)-7.990*ln(hdl)+1.769*ln(age)*ln(hdl)+(bpMed?1.797:1.764)*ln(sbp)+7.837*smk-1.795*ln(age)*smk+0.661*dm;
    s = 1-Math.pow(0.9144, Math.exp(s-61.18));
  } else if (f.sex==='male' && f.race==='black') {
    s = 2.469*ln(age)+0.302*ln(tc)-0.307*ln(hdl)+(bpMed?1.916:1.809)*ln(sbp)+0.549*smk+0.645*dm;
    s = 1-Math.pow(0.8954, Math.exp(s-19.54));
  } else if (f.sex==='female' && f.race==='white') {
    s = -29.799*ln(age)+4.884*ln(age)*ln(age)+13.540*ln(tc)-3.114*ln(age)*ln(tc)-13.578*ln(hdl)+3.149*ln(age)*ln(hdl)+(bpMed?2.019:1.957)*ln(sbp)-0.661*smk+0.661*ln(age)*smk+0.661*dm;
    s = 1-Math.pow(0.9665, Math.exp(s+29.799));
  } else {
    s = 17.1141*ln(age)+0.9396*ln(tc)-18.9196*ln(hdl)+4.4748*ln(age)*ln(hdl)+(bpMed?29.2907:27.8197)*ln(sbp)-6.4321*ln(age)*ln(sbp)+0.8738*smk+0.8738*dm;
    s = 1-Math.pow(0.8738, Math.exp(s-86.61));
  }
  return Math.min(Math.max(s*100, 0), 99.9);
}

function hba1cToEAG(v) { return Math.round(28.7*v - 46.7); }

// ── DOM HELPERS ──────────────────────────────────────────────────
function el(tag, attrs, children) {
  var e = document.createElement(tag);
  if (attrs) Object.keys(attrs).forEach(function(k) {
    if (k === 'style' && typeof attrs[k] === 'object') { Object.assign(e.style, attrs[k]); }
    else if (k.startsWith('on')) { e.addEventListener(k.slice(2).toLowerCase(), attrs[k]); }
    else if (k === 'cls') { e.className = attrs[k]; }
    else if (k === 'html') { e.innerHTML = attrs[k]; }
    else { e.setAttribute(k, attrs[k]); }
  });
  if (children) {
    if (!Array.isArray(children)) children = [children];
    children.forEach(function(c) {
      if (c == null) return;
      if (typeof c === 'string' || typeof c === 'number') e.appendChild(document.createTextNode(c));
      else e.appendChild(c);
    });
  }
  return e;
}

function fromHTML(str) { var d = document.createElement('div'); d.innerHTML = str.trim(); return d.firstChild || d; }

function card(title, accentColor, bodyHTML, extraStyle) {
  var c = el('div', {cls:'card'});
  if (extraStyle) Object.assign(c.style, extraStyle);
  if (title) {
    var h = el('div', {cls:'card-hdr', style:{borderBottom:'3px solid '+(accentColor||'#e2e8f0')}});
    var _resolved = (typeof EMOJI_TO_SVG!=='undefined')
      ? title.replace(/^([^\w\s&]+)\s*/u, function(m,e){return (EMOJI_TO_SVG[e.trim()]||e)+' '; })
      : title;
    if (_resolved === title) { h.textContent = title; } else { h.innerHTML = _resolved; }
    c.appendChild(h);
  }
  var b = el('div', {cls:'card-body', html:bodyHTML});
  c.appendChild(b); return c;
}

function secTitle(icon, title, subtitle, color) {
  // If an SVG icon exists for this emoji, use it; otherwise render the emoji as-is
  var resolvedIcon = (typeof EMOJI_TO_SVG !== 'undefined' && EMOJI_TO_SVG[icon]) ? EMOJI_TO_SVG[icon] : icon;
  return fromHTML('<div class="sec-title"><h2 style="color:'+color+'">' + resolvedIcon + ' '+title+'</h2><p>'+subtitle+'</p><div class="sec-bar" style="background:'+color+'"></div></div>');
}

function notebox(html, bg, border) {
  var d = el('div', {cls:'notebox', html:html, style:{background:bg, border:'1px solid '+border}});
  return d;
}

function badge(text, color, bg) {
  return '<span class="badge" style="background:'+bg+';color:'+color+'">'+text+'</span>';
}

function accordion(items, accentColor, renderFn) {
  var wrap = el('div');
  items.forEach(function(item, i) {
    var w = el('div', {cls:'acc-wrap'});
    var btn = el('button', {cls:'acc-btn', style:{borderColor:accentColor+'55'}});
    btn.innerHTML = '<span>'+item.label+'</span><span style="color:'+accentColor+'">▼</span>';
    var panel = el('div', {cls:'acc-panel', style:{borderColor:accentColor+'55', background:accentColor+'0a'}});
    renderFn(panel, item, i);
    btn.onclick = function() {
      var open = panel.style.display === 'block';
      panel.style.display = open ? 'none' : 'block';
      btn.className = open ? 'acc-btn' : 'acc-btn open';
      btn.querySelector('span:last-child').textContent = open ? '▼' : '▲';
    };
    w.appendChild(btn); w.appendChild(panel); wrap.appendChild(w);
  });
  return wrap;
}

function svgBPChart(readings) {
  if (!readings || !readings.length) return '<p style="font-size:13px;color:#94a3b8;text-align:center;padding:20px">No readings yet</p>';
  var last = readings.slice(-12);
  var W=520, H=180, pL=38, pR=16, pT=22, pB=32, cW=W-pL-pR, cH=H-pT-pB;
  var allVals = last.map(function(r){return r.sys;}).concat(last.map(function(r){return r.dia;}));
  var rMax=Math.max.apply(null,allVals.concat([150])), rMin=Math.min.apply(null,allVals.concat([60]));
  var yMax=rMax+12, yMin=Math.max(40,rMin-12), yR=yMax-yMin;
  function toY(v){return pT+cH-((v-yMin)/yR)*cH;}
  function xPos(i){return pL+(i/(last.length-1||1))*cW;}

  var s='<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;display:block;">';

  // zone bands
  var y130=toY(130), y140=toY(140), y90=toY(90), y80=toY(80), yBase=toY(yMin);
  s+='<rect x="'+pL+'" y="'+y140+'" width="'+cW+'" height="'+(yBase-y140)+'" fill="#fee2e2" opacity="0.35"/>'; // HTN zone
  s+='<rect x="'+pL+'" y="'+y130+'" width="'+cW+'" height="'+(y140-y130)+'" fill="#fef9c3" opacity="0.5"/>'; // borderline
  s+='<rect x="'+pL+'" y="'+pT+'" width="'+cW+'" height="'+(y130-pT)+'" fill="#dcfce7" opacity="0.35"/>'; // target

  // grid lines
  [60,80,90,120,130,140,160,180].forEach(function(v){
    if(v<yMin||v>yMax) return;
    var y=toY(v), isDash=(v===130||v===140||v===90);
    s+='<line x1="'+pL+'" y1="'+y+'" x2="'+(W-pR)+'" y2="'+y+'" stroke="#e2e8f0" stroke-width="'+(isDash?'1.5':'0.8')+'"'+(isDash?' stroke-dasharray="5 3"':'')+'/>';
    s+='<text x="'+(pL-4)+'" y="'+(y+4)+'" font-size="9" text-anchor="end" fill="#94a3b8">'+v+'</text>';
  });

  // reference labels
  s+='<text x="'+(W-pR)+'" y="'+(toY(140)-3)+'" font-size="9" text-anchor="end" fill="#dc2626" font-weight="700">140</text>';
  s+='<text x="'+(W-pR)+'" y="'+(toY(130)-3)+'" font-size="9" text-anchor="end" fill="#16a34a" font-weight="700">130</text>';

  // DIA line
  if(last.length>=2){
    var dPath=last.map(function(r,i){return (i?'L':'M')+xPos(i)+','+toY(r.dia);}).join(' ');
    s+='<path d="'+dPath+'" fill="none" stroke="#a855f7" stroke-width="2" stroke-dasharray="5,3" opacity="0.8"/>';
  }
  // SYS line
  if(last.length>=2){
    var sPath=last.map(function(r,i){return (i?'L':'M')+xPos(i)+','+toY(r.sys);}).join(' ');
    s+='<path d="'+sPath+'" fill="none" stroke="#0ea5e9" stroke-width="2.5"/>';
  }
  // dots + values
  last.forEach(function(r,i){
    var x=xPos(i), ys=toY(r.sys), yd=toY(r.dia);
    var col=r.sys>=140?'#dc2626':r.sys>=130?'#d97706':'#16a34a';
    s+='<circle cx="'+x+'" cy="'+ys+'" r="4" fill="'+col+'" stroke="#fff" stroke-width="1.5"/>';
    s+='<circle cx="'+x+'" cy="'+yd+'" r="3" fill="#a855f7" stroke="#fff" stroke-width="1"/>';
    // date label every 3rd point or last
    if(i===0||i===last.length-1||i%3===0){
      var lbl=(r.date||'').slice(5);
      s+='<text x="'+x+'" y="'+(H-4)+'" font-size="8" text-anchor="middle" fill="#94a3b8">'+lbl+'</text>';
    }
  });

  // legend
  s+='<text x="'+(pL+4)+'" y="14" font-size="9" fill="#0ea5e9" font-weight="bold">— SYS</text>';
  s+='<text x="'+(pL+44)+'" y="14" font-size="9" fill="#a855f7" font-weight="bold">--- DIA</text>';
  s+='<rect x="'+(pL+84)+'" y="6" width="8" height="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1" opacity="0.8"/>';
  s+='<text x="'+(pL+96)+'" y="14" font-size="9" fill="#16a34a">Target</text>';
  s+='<rect x="'+(pL+130)+'" y="6" width="8" height="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1" opacity="0.8"/>';
  s+='<text x="'+(pL+142)+'" y="14" font-size="9" fill="#dc2626">HTN</text>';

  // averages
  var avgSys=Math.round(last.reduce(function(a,r){return a+r.sys;},0)/last.length);
  var avgDia=Math.round(last.reduce(function(a,r){return a+r.dia;},0)/last.length);
  s+='<line x1="'+pL+'" y1="'+toY(avgSys)+'" x2="'+(W-pR)+'" y2="'+toY(avgSys)+'" stroke="#0ea5e9" stroke-width="1" stroke-dasharray="2,4" opacity="0.5"/>';

  s+='<line x1="'+pL+'" y1="'+pT+'" x2="'+pL+'" y2="'+(pT+cH)+'" stroke="#e2e8f0" stroke-width="1"/>';
  s+='<line x1="'+pL+'" y1="'+(pT+cH)+'" x2="'+(W-pR)+'" y2="'+(pT+cH)+'" stroke="#e2e8f0" stroke-width="1"/>';
  s+='</svg>';

  // summary stats below chart
  var col7=avgSys>=140?'#dc2626':avgSys>=130?'#d97706':'#16a34a';
  var summ='<div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:6px;padding:8px 4px;border-top:1px solid #e2e8f0">';
  summ+='<div style="font-size:12px"><span style="color:#64748b">Avg SYS: </span><strong style="color:'+col7+'">'+avgSys+' mmHg</strong></div>';
  summ+='<div style="font-size:12px"><span style="color:#64748b">Avg DIA: </span><strong style="color:#a855f7">'+avgDia+' mmHg</strong></div>';
  summ+='<div style="font-size:12px"><span style="color:#64748b">Readings: </span><strong>'+last.length+(readings.length>12?' (last 12 shown)':'')+'</strong></div>';
  var trend7=last.length>=2?last[last.length-1].sys-last[0].sys:null;
  if(trend7!==null) summ+='<div style="font-size:12px"><span style="color:#64748b">Trend: </span><strong style="color:'+(trend7<0?'#16a34a':trend7>0?'#dc2626':'#64748b')+'">'+(trend7<0?'↓ '+Math.abs(trend7):trend7>0?'↑ '+trend7:'→ Stable')+' mmHg</strong></div>';
  summ+='</div>';
  return s+summ;
}

// ── DISCLAIMER ───────────────────────────────────────────────────
// ── Tracker → Classifier bridge ────────────────────────────────────
// ── CLASSIFIER SESSION STATE ─────────────────────────────────────
var _classifierState = { htn: {}, hypo: {}, dm: {} };

function saveHTNState() {
  var ids = ['d-name','d-sys','d-dia','d-age','d-gen','d-wt','d-ht','d-bmi','d-cond','d-hr','d-rr'];
  ids.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) _classifierState.htn[id] = el.value;
  });
}
function restoreHTNState() {
  var s = _classifierState.htn;
  Object.keys(s).forEach(function(id) {
    var el = document.getElementById(id);
    if (el && s[id]) el.value = s[id];
  });
  if (typeof calcHTNMap === 'function') calcHTNMap();
  if (typeof calcDetectBMI === 'function') calcDetectBMI();
}
function saveHypoState() {
  var ids = ['hy-name','hy-s','hy-d','hy-age','hy-gen','hy-wt','hy-ht','hy-hr','hy-rr','hy-cond'];
  ids.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) _classifierState.hypo[id] = el.value;
  });
}
function restoreHypoState() {
  var s = _classifierState.hypo;
  Object.keys(s).forEach(function(id) {
    var el = document.getElementById(id);
    if (el && s[id]) el.value = s[id];
  });
  if (typeof calcHypoMap === 'function') calcHypoMap();
  if (typeof calcHypoBMI === 'function') calcHypoBMI();
}
function saveDMState() {
  var ids = ['dm-name','dm-fg','dm-a1c','dm-age','dm-wt','dm-cond'];
  ids.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) _classifierState.dm[id] = el.value;
  });
}
function restoreDMState() {
  var s = _classifierState.dm;
  Object.keys(s).forEach(function(id) {
    var el = document.getElementById(id);
    if (el && s[id]) el.value = s[id];
  });
}

function getLastBPReading() {
  // Returns {name, sys, dia, hr} from the most recently active BP tracker patient
  try {
    var pts = JSON.parse(localStorage.getItem('triad_bp_patients_v2') || '{}');
    var activeName = window._bpActivePatient;
    // If no active patient, use whichever patient has the most recent reading
    if (!activeName) {
      var latest = null, latestTime = 0;
      Object.keys(pts).forEach(function(n) {
        var rdgs = pts[n].readings || [];
        if (rdgs.length) {
          var last = rdgs[rdgs.length - 1];
          var t = new Date((last.date || '') + 'T' + (last.time || '00:00')).getTime();
          if (t > latestTime) { latestTime = t; latest = {name: n, r: last}; }
        }
      });
      if (!latest) return null;
      return {name: latest.name, sys: latest.r.sys, dia: latest.r.dia, hr: latest.r.hr || null};
    }
    var pt = pts[activeName];
    if (!pt || !pt.readings || !pt.readings.length) return null;
    var r = pt.readings[pt.readings.length - 1];
    return {name: activeName, sys: r.sys, dia: r.dia, hr: r.hr || null};
  } catch(e) { return null; }
}

function getLastBGReading() {
  // Returns {name, mgdl, mmol} from the most recently active BG tracker patient
  try {
    var pts = JSON.parse(localStorage.getItem('triad_bg_patients_v1') || '{}');
    var activeName = window._bgActivePt;
    if (!activeName) {
      var latest = null, latestTime = 0;
      Object.keys(pts).forEach(function(n) {
        var rdgs = pts[n].readings || [];
        if (rdgs.length) {
          var last = rdgs[rdgs.length - 1];
          var t = new Date((last.date || '') + 'T' + (last.time || '00:00')).getTime();
          if (t > latestTime) { latestTime = t; latest = {name: n, r: last}; }
        }
      });
      if (!latest) return null;
      var mgdl = latest.r.mgdl;
      return {name: latest.name, mgdl: mgdl, mmol: Math.round(mgdl / 18 * 10) / 10};
    }
    var pt = pts[activeName];
    if (!pt || !pt.readings || !pt.readings.length) return null;
    var r = pt.readings[pt.readings.length - 1];
    return {name: activeName, mgdl: r.mgdl, mmol: Math.round(r.mgdl / 18 * 10) / 10};
  } catch(e) { return null; }
}

function useLastBPInHTN() {
  var r = getLastBPReading();
  if (!r) { alert('No BP tracker readings found. Log a reading in the BP Tracker tab first.'); return; }
  var sEl = document.getElementById('d-sys');
  var dEl = document.getElementById('d-dia');
  var nEl = document.getElementById('d-name');
  var hEl = document.getElementById('d-hr');
  if (sEl) sEl.value = r.sys;
  if (dEl) dEl.value = r.dia;
  if (nEl && !nEl.value) nEl.value = r.name;
  if (hEl && r.hr) hEl.value = r.hr;
  if (typeof calcHTNMap === 'function') calcHTNMap();
  // Flash confirmation
  var btn = document.getElementById('htn-use-last-btn');
  if (btn) { btn.textContent = '✓ Loaded — ' + r.sys + '/' + r.dia + ' mmHg'; btn.style.background = '#f0fdf4'; btn.style.color = '#16a34a'; btn.style.borderColor = '#86efac'; setTimeout(function(){ btn.textContent = '⏱ Use last BP reading from tracker'; btn.style.background = ''; btn.style.color = ''; btn.style.borderColor = ''; }, 2500); }
}

function useLastBPInHypo() {
  var r = getLastBPReading();
  if (!r) { alert('No BP tracker readings found. Log a reading in the BP Tracker tab first.'); return; }
  var sEl = document.getElementById('hy-s');
  var dEl = document.getElementById('hy-d');
  var nEl = document.getElementById('hy-name');
  var hEl = document.getElementById('hy-hr');
  if (sEl) sEl.value = r.sys;
  if (dEl) dEl.value = r.dia;
  if (nEl && !nEl.value) nEl.value = r.name;
  if (hEl && r.hr) hEl.value = r.hr;
  if (typeof calcHypoMap === 'function') calcHypoMap();
  var btn = document.getElementById('hypo-use-last-btn');
  if (btn) { btn.textContent = '✓ Loaded — ' + r.sys + '/' + r.dia + ' mmHg'; btn.style.background = '#f5f3ff'; btn.style.color = '#7c3aed'; btn.style.borderColor = '#c4b5fd'; setTimeout(function(){ btn.textContent = '⏱ Use last BP reading from tracker'; btn.style.background = ''; btn.style.color = ''; btn.style.borderColor = ''; }, 2500); }
}

function useLastBGInDM() {
  var r = getLastBGReading();
  if (!r) { alert('No BG tracker readings found. Log a reading in the BG Tracker tab first.'); return; }
  // Determine mmol vs mg/dL mode
  var isMMol = window._dmIsMMol !== false; // default mmol
  var fgEl = document.getElementById('dm-fg');
  var nEl  = document.getElementById('dm-name');
  if (fgEl) fgEl.value = isMMol ? r.mmol : r.mgdl;
  if (nEl && !nEl.value) nEl.value = r.name;
  var btn = document.getElementById('dm-use-last-btn');
  var valStr = isMMol ? r.mmol + ' mmol/L' : r.mgdl + ' mg/dL';
  if (btn) { btn.textContent = '✓ Loaded — FPG ' + valStr; btn.style.background = '#f0fdf4'; btn.style.color = '#16a34a'; btn.style.borderColor = '#86efac'; setTimeout(function(){ btn.textContent = '⏱ Use last BG reading from tracker'; btn.style.background = ''; btn.style.color = ''; btn.style.borderColor = ''; }, 2500); }
}

