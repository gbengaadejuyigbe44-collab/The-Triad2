function tabBGTracker(el_) {
  el_.appendChild(secTitle('\ud83e\ude7a','BG Patient Tracker','Per-patient blood glucose monitoring with trend analysis','#dc2626'));

  // ── STORAGE HELPERS ──────────────────────────────────────────
  var BGSTORE = 'triad_bg_patients_v1';
  function bgLoadPts()   { try { var d=localStorage.getItem(BGSTORE); return d?JSON.parse(d):{}; } catch(e){return{};} }
  function bgSavePts(p)  { try { localStorage.setItem(BGSTORE,JSON.stringify(p)); } catch(e){} }

  // ── STATE ────────────────────────────────────────────────────
  // Use window-level bgPatients so delete/edit closures always reference the same object
  if (!window._bgPatients) window._bgPatients = bgLoadPts();
  else window._bgPatients = bgLoadPts(); // re-sync from storage on each tab open
  var bgPatients = window._bgPatients;
  if (typeof window._bgActivePt === 'undefined') window._bgActivePt = null;

  // ── UNIT CONVERSION ─────────────────────────────────────────
  // Store everything in mg/dL internally; display in chosen unit
  // Unit reads from global S.glucoseUnit via window._bgUnit alias
  function toMgdl(v, unit) { return unit === 'mmol' ? Math.round(v * 18.0182 * 10)/10 : Math.round(v*10)/10; }
  function toMmol(mgdl)    { return Math.round(mgdl / 18.0182 * 10)/10; }
  function fmtBG(mgdl)     { return window._bgUnit === 'mmol' ? toMmol(mgdl)+' mmol/L' : mgdl+' mg/dL'; }
  function unitLabel()     { return window._bgUnit === 'mmol' ? 'mmol/L' : 'mg/dL'; }

  // ── BG CLASSIFICATION ────────────────────────────────────────
  function bgClassify(mgdl) {
    if (mgdl < 54)   return { label:'Severe Hypo',  color:'#7f1d1d', bg:'#fef2f2' };
    if (mgdl < 70)   return { label:'Hypoglycaemia',color:'#dc2626', bg:'#fef2f2' };
    if (mgdl <= 99)  return { label:'Normal',       color:'#16a34a', bg:'#f0fdf4' };
    if (mgdl <= 125) return { label:'Pre-diabetic',  color:'#d97706', bg:'#fffbeb' };
    if (mgdl <= 180) return { label:'In Range (DM)', color:'#16a34a', bg:'#f0fdf4' };
    if (mgdl <= 250) return { label:'Elevated',      color:'#f97316', bg:'#fff7ed' };
    if (mgdl <= 360) return { label:'High',          color:'#dc2626', bg:'#fef2f2' };
    return                   { label:'Critical',     color:'#7f1d1d', bg:'#fef2f2' };
  }

  // ── TREND INTERPRETATION ─────────────────────────────────────
  function interpretBGTrend(readings) {
    if (!readings || readings.length < 2) return null;
    var sorted = readings.slice().sort(function(a,b){ return new Date(a.dt) - new Date(b.dt); });
    var n = sorted.length;
    var vals = sorted.map(function(r){ return r.mgdl; });
    var avg  = Math.round(vals.reduce(function(s,v){ return s+v; },0) / n);
    var last = vals[n-1];
    var first = vals[0];
    var diff = last - first;
    var recent = vals.slice(-3);
    var rising  = recent.length >= 2 && recent.every(function(v,i){ return i===0||v>recent[i-1]; });
    var falling = recent.length >= 2 && recent.every(function(v,i){ return i===0||v<recent[i-1]; });
    var hasSevereHypo = vals.some(function(v){ return v < 54; });
    var hasHypo       = vals.some(function(v){ return v < 70; });
    var hasHigh       = vals.some(function(v){ return v > 250; });
    var clsAvg = bgClassify(avg);
    var clsLast = bgClassify(last);

    var lines = [];
    // Direction
    if (Math.abs(diff) <= 10)  lines.push({ icon:'→', color:'#64748b', text:'BG is relatively stable — readings have not changed significantly from first to last.' });
    else if (diff < -10)       lines.push({ icon:'↓', color:'#16a34a', text:'BG is trending downward by '+Math.round(Math.abs(diff))+' mg/dL ('+Math.round(Math.abs(diff)/18.0182*10)/10+' mmol/L) from first to last reading.' });
    else                       lines.push({ icon:'↑', color:'#dc2626', text:'BG is trending upward by '+Math.round(diff)+' mg/dL ('+Math.round(diff/18.0182*10)/10+' mmol/L) from first to last reading — warrants review.' });
    // Recent pattern
    if (n >= 3) {
      if (rising)  lines.push({ icon:'⚠️', color:'#dc2626', text:'Last 3 readings show a consecutive rise — consider medication review or dietary assessment.' });
      if (falling) lines.push({ icon:'✅', color:'#16a34a', text:'Last 3 readings show a consecutive fall — treatment appears effective.' });
    }
    // Average
    lines.push({ icon:'📊', color:clsAvg.color, text:'Average BG across all '+n+' readings: '+avg+' mg/dL ('+toMmol(avg)+' mmol/L) — classified as '+clsAvg.label+'.' });
    // Latest status
    lines.push({ icon:'🩸', color:clsLast.color, text:'Latest reading: '+last+' mg/dL ('+toMmol(last)+' mmol/L) — '+clsLast.label+'.' });
    // Alerts
    if (hasSevereHypo) lines.push({ icon:'🚨', color:'#7f1d1d', text:'Severe hypoglycaemia (<54 mg/dL / <3.0 mmol/L) recorded. Urgent review of hypoglycaemia management plan required.' });
    else if (hasHypo)  lines.push({ icon:'⚠️', color:'#dc2626', text:'One or more hypoglycaemic episodes (<70 mg/dL / <3.9 mmol/L) recorded. Review insulin dose, meal timing, and activity levels.' });
    if (hasHigh)       lines.push({ icon:'⚠️', color:'#dc2626', text:'One or more readings >250 mg/dL (>13.9 mmol/L). Review for DKA/HHS risk, medication adherence, and intercurrent illness.' });
    // Recommendation
    var rec = '';
    if (avg <= 180 && !hasHypo && !hasHigh) rec = 'Glycaemic control appears satisfactory. Continue current regimen and review HbA1c at next appointment.';
    else if (hasHypo && hasHigh)             rec = 'Wide glycaemic variability detected. Consider structured SMBG, dietary review, and insulin regimen optimisation.';
    else if (hasHypo)                        rec = 'Hypoglycaemic episodes present. Review insulin/sulphonylurea doses, meal timing, and carbohydrate intake. Educate on hypo management.';
    else if (avg > 250)                      rec = 'Persistently high BG. Review medication adherence, intercurrent illness, dietary intake. Consider escalating therapy or specialist referral.';
    else                                     rec = 'BG not consistently at target. Review diet, activity, and medication. Aim for FBG 80–130 mg/dL (4.4–7.2 mmol/L).';
    lines.push({ icon:'💊', color:'#0891b2', text:'Recommendation: '+rec });
    return lines;
  }

  // ── SVG CHART ────────────────────────────────────────────────
  function renderBGChart(readings, containerId) {
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    if (!readings || readings.length < 2) {
      wrap.innerHTML = '<p style="font-size:13px;color:#94a3b8;text-align:center;padding:20px">Log at least 2 readings to see the trend chart.</p>';
      return;
    }
    var sorted = readings.slice().sort(function(a,b){ return new Date(a.dt)-new Date(b.dt); });
    var last14 = sorted.slice(-14);
    var W=520,H=200,pL=48,pR=16,pT=24,pB=52,cW=W-pL-pR,cH=H-pT-pB;
    var vals = last14.map(function(r){ return r.mgdl; });
    var yMax = Math.max.apply(null, vals.concat([250]))+20;
    var yMin = Math.max(30,  Math.min.apply(null, vals.concat([60]))-20);
    var yR   = yMax - yMin;
    function yp(v){ return pT + cH - (v-yMin)/yR*cH; }
    function xp(i){ return pL + (last14.length===1 ? cW/2 : i/(last14.length-1)*cW); }
    var avgMgdl = Math.round(vals.reduce(function(s,v){return s+v;},0)/vals.length);

    var svg = '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:'+W+'px;display:block;margin:0 auto" font-family="system-ui,sans-serif">';
    // Zone bands: hypo / normal / elevated
    svg += '<rect x="'+pL+'" y="'+yp(70)+'" width="'+cW+'" height="'+(yp(yMin)-yp(70))+'" fill="#fef2f2" opacity="0.45"/>'; // hypo zone
    svg += '<rect x="'+pL+'" y="'+yp(180)+'" width="'+cW+'" height="'+(yp(70)-yp(180))+'" fill="#f0fdf4" opacity="0.4"/>'; // normal/in-range zone
    svg += '<rect x="'+pL+'" y="'+yp(yMax)+'" width="'+cW+'" height="'+(yp(180)-yp(yMax))+'" fill="#fff7ed" opacity="0.4"/>'; // elevated zone
    // Grid lines at key thresholds
    [[70,'#dc2626','Hypo <70'],[126,'#d97706','DM ≥126'],[180,'#16a34a','Target ≤180'],[250,'#f97316','High >250']].forEach(function(row){
      var v=row[0], col=row[1], lbl=row[2];
      if (v>=yMin && v<=yMax) {
        svg += '<line x1="'+pL+'" y1="'+yp(v)+'" x2="'+(pL+cW)+'" y2="'+yp(v)+'" stroke="'+col+'" stroke-width="0.8" stroke-dasharray="4,3" opacity="0.5"/>';
        svg += '<text x="'+(pL-3)+'" y="'+(yp(v)+4)+'" text-anchor="end" font-size="9" fill="'+col+'" opacity="0.8">'+v+'</text>';
        svg += '<text x="'+(pL+4)+'" y="'+(yp(v)-3)+'" font-size="8" fill="'+col+'" opacity="0.7">'+lbl+'</text>';
      }
    });
    // Avg line
    svg += '<line x1="'+pL+'" y1="'+yp(avgMgdl)+'" x2="'+(pL+cW)+'" y2="'+yp(avgMgdl)+'" stroke="#0ea5e9" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>';
    svg += '<text x="'+(pL+cW+2)+'" y="'+(yp(avgMgdl)+4)+'" font-size="9" fill="#0ea5e9" opacity="0.8">avg</text>';
    // Line
    var pts = last14.map(function(r,i){ return xp(i)+','+yp(r.mgdl); }).join(' ');
    svg += '<polyline points="'+pts+'" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
    // Dots + x-axis labels
    last14.forEach(function(r,i){
      var x = xp(i);
      var cls = bgClassify(r.mgdl);
      svg += '<circle cx="'+x+'" cy="'+yp(r.mgdl)+'" r="4.5" fill="'+cls.color+'" stroke="white" stroke-width="1.5"/>';
      // Date label
      var dt = new Date(r.dt);
      var dlbl = (dt.getMonth()+1)+'/'+(dt.getDate());
      svg += '<text x="'+x+'" y="'+(H-pB+14)+'" text-anchor="middle" font-size="9" fill="#64748b">'+dlbl+'</text>';
      // Context label abbreviated
      var ctx = (r.ctx||'').slice(0,3);
      svg += '<text x="'+x+'" y="'+(H-pB+24)+'" text-anchor="middle" font-size="8" fill="#94a3b8">'+ctx+'</text>';
    });
    // Legend
    svg += '<circle cx="'+pL+'" cy="'+(H-6)+'" r="4" fill="#dc2626"/>';
    svg += '<text x="'+(pL+7)+'" y="'+(H-3)+'" font-size="10" fill="#64748b">BG (mg/dL)</text>';
    svg += '<text x="'+(pL+80)+'" y="'+(H-3)+'" font-size="9" fill="#64748b">Dots coloured by classification · Avg='+avgMgdl+' mg/dL ('+toMmol(avgMgdl)+' mmol/L)</text>';
    svg += '</svg>';
    wrap.innerHTML = svg;
  }

  // ── RENDER INTERPRETATION ────────────────────────────────────
  function renderBGInterp(readings, containerId) {
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var lines = interpretBGTrend(readings);
    if (!lines) { wrap.innerHTML = ''; return; }
    wrap.innerHTML = '<div style="margin-top:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:14px">' +
      '<div style="font-size:11px;font-weight:700;color:#991b1b;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px">\ud83d\udccb Trend Interpretation</div>' +
      lines.map(function(l){
        return '<div style="display:flex;gap:10px;padding:5px 0;border-bottom:1px solid #fee2e255;font-size:12px;line-height:1.5">' +
          '<span style="flex-shrink:0;font-size:14px">'+l.icon+'</span>' +
          '<span style="color:'+l.color+'">'+l.text+'</span></div>';
      }).join('') +
    '</div>';
  }

  // ── MAIN RENDER ──────────────────────────────────────────────
  function bgRender() {
    el_.innerHTML = '';
    el_.appendChild(secTitle('\ud83e\ude7a','BG Patient Tracker','Per-patient blood glucose monitoring with trend analysis','#dc2626'));

    // ── UNIT TOGGLE (inline, mirrors global) ─────────────────────
    var uRow = fromHTML(
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;padding:8px 12px;background:#fef2f2;border:1px solid #fecaca;border-radius:10px">' +
        '<span style="font-size:12px;font-weight:700;color:#991b1b">Display unit:</span>' +
        '<button id="bgt-mgdl" style="padding:4px 14px;border-radius:20px;border:2px solid '+(S.glucoseUnit==='mgdl'?'#dc2626':'#e2e8f0')+';background:'+(S.glucoseUnit==='mgdl'?'#dc2626':'#fff')+';color:'+(S.glucoseUnit==='mgdl'?'#fff':'#64748b')+';font-size:12px;font-weight:700;cursor:pointer">mg/dL</button>' +
        '<button id="bgt-mmol" style="padding:4px 14px;border-radius:20px;border:2px solid '+(S.glucoseUnit==='mmol'?'#dc2626':'#e2e8f0')+';background:'+(S.glucoseUnit==='mmol'?'#dc2626':'#fff')+';color:'+(S.glucoseUnit==='mmol'?'#fff':'#64748b')+';font-size:12px;font-weight:700;cursor:pointer">mmol/L</button>' +
        '<span style="font-size:11px;color:#94a3b8">'+(S.glucoseUnit==='mmol'?'UK/Europe — 1 mmol/L = 18 mg/dL':'US/Nigeria — 1 mg/dL = 0.0555 mmol/L')+'</span>' +
      '</div>'
    );
    uRow.querySelector('#bgt-mgdl').addEventListener('click', function(){ window._bgUnit='mgdl'; bgRender(); });
    uRow.querySelector('#bgt-mmol').addEventListener('click', function(){ window._bgUnit='mmol'; bgRender(); });
    el_.appendChild(uRow);

    // ── PATIENT FOLDERS ──────────────────────────────────────────
    var selectorCard = card('Patient Records','#dc2626','');
    var sb = selectorCard.querySelector('.card-body');
    var ptNames = Object.keys(bgPatients).sort();

    if (!ptNames.length) {
      sb.innerHTML = '<p style="font-size:13px;color:#64748b;text-align:center;padding:8px">No patient records yet. Add a new patient below.</p>';
    } else {
      var btnWrap = fromHTML('<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:4px"></div>');
      ptNames.forEach(function(name) {
        var rdgs = bgPatients[name].readings || [];
        var last = rdgs.length ? rdgs[rdgs.length-1] : null;
        var cls = last ? bgClassify(last.mgdl) : null;
        var isActive = name === window._bgActivePt;
        var btn = fromHTML(
          '<button style="padding:8px 14px;border-radius:20px;border:2px solid '+(isActive?'#dc2626':'#e2e8f0')+';background:'+(isActive?'#dc2626':'#f8fafc')+';color:'+(isActive?'#fff':'#1e293b')+';font-size:12px;font-weight:700;cursor:pointer">' +
          name +
          '<span style="margin-left:6px;font-size:10px;opacity:0.8">('+rdgs.length+')</span>' +
          (cls ? '<span style="margin-left:6px;font-size:10px;background:'+cls.bg+';color:'+cls.color+';padding:1px 5px;border-radius:8px">'+cls.label+'</span>' : '') +
          '</button>'
        );
        btn.addEventListener('click', (function(n){ return function(){ window._bgActivePt = n; bgRender(); }; })(name));
        btnWrap.appendChild(btn);
      });
      sb.appendChild(btnWrap);
    }
    el_.appendChild(selectorCard);

    // ── ADD NEW PATIENT ───────────────────────────────────────────
    var npCard = card('Add New Patient','#dc2626','');
    npCard.querySelector('.card-body').innerHTML =
      '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px">' +
        '<div style="flex:1;min-width:150px"><label class="lbl">Patient Name</label>' +
        '<input id="bg-new-name" class="inp" placeholder="e.g. Fatima Aliyu" style="text-transform:capitalize"/></div>' +
        '<div><label class="lbl">Diagnosis</label>' +
        '<select id="bg-new-dx" class="inp"><option value="T2DM">Type 2 DM</option><option value="T1DM">Type 1 DM</option><option value="GDM">Gestational DM</option><option value="Steroid-induced">Steroid-induced</option><option value="Pre-diabetic">Pre-diabetic</option><option value="Other">Other</option></select></div>' +
        '<div><label class="lbl">Ward / Setting</label>' +
        '<input id="bg-new-ward" class="inp" placeholder="e.g. Medical Ward 3" style="width:160px"/></div>' +
        '<button id="bg-add-pat-btn" style="padding:10px 18px;background:#dc2626;color:#fff;border:none;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;white-space:nowrap">+ Add Patient</button>' +
      '</div>' +
      '<p style="font-size:11px;color:#64748b">Or click an existing patient above to open their folder.</p>';
    el_.appendChild(npCard);
    var _addBtn = document.getElementById('bg-add-pat-btn');
    if (_addBtn) _addBtn.addEventListener('click', function(){ window._bgAddPatient(); });

    if (!window._bgActivePt) return; // nothing more to show until a patient is selected

    var pt = bgPatients[window._bgActivePt];
    if (!pt) { window._bgActivePt = null; bgRender(); return; }
    var readings = (pt.readings || []).slice().sort(function(a,b){ return new Date(a.dt)-new Date(b.dt); });

    // ── PATIENT HEADER ───────────────────────────────────────────
    var phDiv = fromHTML(
      '<div style="background:linear-gradient(135deg,#991b1b,#b91c1c);border-radius:12px;padding:14px 16px;margin-bottom:2px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">' +
          '<button id="bg-back-btn" style="background:#ffffff22;color:#fef2f2;border:none;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer">\u2190 Back</button>' +
          '<button id="bg-del-pt-btn" style="background:#fef2f2;color:#dc2626;border:none;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer">\ud83d\uddd1 Delete Patient</button>' +
        '</div>' +
        '<div style="font-size:18px;font-weight:800;color:#fef2f2">\ud83d\udccb '+window._bgActivePt+'</div>' +
        '<div style="display:flex;gap:16px;margin-top:6px;flex-wrap:wrap">' +
          '<span style="font-size:12px;color:#fca5a5">\ud83e\ude7a Dx: '+(pt.info&&pt.info.dx||'—')+'</span>' +
          '<span style="font-size:12px;color:#fca5a5">\ud83c\udfe5 Ward: '+(pt.info&&pt.info.ward||'—')+'</span>' +
          '<span style="font-size:12px;color:#fca5a5">'+readings.length+' reading'+(readings.length!==1?'s':'')+' logged</span>' +
        '</div>' +
      '</div>'
    );
    el_.appendChild(phDiv);
    document.getElementById('bg-back-btn').addEventListener('click', function(){ window._bgActivePt=null; bgRender(); });
    document.getElementById('bg-del-pt-btn').addEventListener('click', function(){ window._bgDeletePatient(); });

    // ── STAT CARDS ───────────────────────────────────────────────
    var latest  = readings.length ? readings[readings.length-1] : null;
    var vals    = readings.map(function(r){ return r.mgdl; });
    var avgMgdl = vals.length ? Math.round(vals.reduce(function(s,v){return s+v;},0)/vals.length) : null;
    var diff    = vals.length >= 2 ? vals[vals.length-1] - vals[0] : null;
    var clsLatest = latest ? bgClassify(latest.mgdl) : null;
    var clsAvg    = avgMgdl ? bgClassify(avgMgdl) : null;

    var g3 = fromHTML('<div class="g3"></div>');
    [
      ['Latest BG',   latest ? fmtBG(latest.mgdl) : '\u2014',  latest  ? clsLatest.label     : 'No readings',      latest  ? clsLatest.color : '#94a3b8'],
      ['Average BG',  avgMgdl ? fmtBG(avgMgdl)    : '\u2014',  clsAvg  ? clsAvg.label        : 'across all',       clsAvg  ? clsAvg.color    : '#94a3b8'],
      ['Trend',       diff===null?'\u2014':diff<-10?'\u2193 Falling':diff>10?'\u2191 Rising':'\u2192 Stable', 'first vs latest', diff===null?'#94a3b8':diff<-10?'#16a34a':diff>10?'#dc2626':'#64748b']
    ].forEach(function(x){
      g3.appendChild(card(null,'#dc2626','<div style="text-align:center;padding:4px 0"><div style="font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">'+x[0]+'</div><div style="font-size:20px;font-weight:900;color:'+x[3]+'">'+x[1]+'</div><div style="font-size:11px;color:#94a3b8;margin-top:4px">'+x[2]+'</div></div>'));
    });
    el_.appendChild(g3);

    // ── BG CHART ─────────────────────────────────────────────────
    var chartCard = card('BG Trend Chart \u2014 '+window._bgActivePt,'#dc2626',
      '<div id="bg-chart-svg" style="padding:4px 0;min-height:60px"></div>' +
      '<div id="bg-chart-interp"></div>'
    );
    el_.appendChild(chartCard);
    setTimeout(function(){
      renderBGChart(readings, 'bg-chart-svg');
      renderBGInterp(readings, 'bg-chart-interp');
    }, 80);

    // ── LOG NEW READING ──────────────────────────────────────────
    var now = new Date();
    var todayStr = now.toISOString().slice(0,10);
    var timeStr  = now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');
    var defDt    = todayStr+'T'+timeStr;
    var logCard  = card('Log BG Reading for '+window._bgActivePt,'#dc2626','');
    logCard.querySelector('.card-body').innerHTML =
      '<div class="g2" style="margin-bottom:10px">' +
        '<div><label class="lbl">Date & Time</label>' +
        '<input id="bg-dt-inp" type="datetime-local" class="inp" value="'+defDt+'"/></div>' +
        '<div><label class="lbl">Reading Type</label>' +
        '<select id="bg-ctx-inp" class="inp"><option>Fasting (FBG)</option><option>Random (RBG)</option><option>Pre-meal</option><option>Post-meal (2hr)</option><option>Bedtime</option><option>2am check</option><option>Post-exercise</option></select></div>' +
      '</div>' +
      '<div class="g2" style="margin-bottom:10px">' +
        '<div><label class="lbl">BG Value ('+unitLabel()+')</label>' +
        '<input id="bg-val-inp" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="'+(window._bgUnit==='mmol'?'e.g. 7.2':'e.g. 130')+'"/></div>' +
        '<div><label class="lbl">Current Medication \u2014 optional</label>' +
        '<input id="bg-med-inp" type="text" class="inp" placeholder="e.g. Metformin 500mg BD"/></div>' +
      '</div>' +
      '<div style="margin-bottom:12px"><label class="lbl">Notes \u2014 optional</label>' +
        '<input id="bg-notes-inp" type="text" class="inp" placeholder="e.g. missed dose, unwell, fasted 12hr"/></div>' +
      '<div id="bg-log-result" style="min-height:16px;margin-bottom:8px"></div>' +
      '<button id="bg-log-btn" style="width:100%;padding:11px;background:#dc2626;color:#fff;border:none;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer">+ Log Reading</button>';
    el_.appendChild(logCard);
    var _logBtn = document.getElementById('bg-log-btn');
    if (_logBtn) _logBtn.addEventListener('click', function(){ window._bgLogReading(); });

    // ── READING HISTORY ───────────────────────────────────────────
    var hCard = card('Reading History \u2014 '+window._bgActivePt,'#dc2626','');
    var hBody = hCard.querySelector('.card-body');
    if (!readings.length) {
      hBody.innerHTML = '<p style="font-size:13px;color:#64748b">No readings logged yet for this patient.</p>';
    } else {
      var tableRows = readings.slice().reverse().map(function(rd, revIdx){
        var realIdx = readings.length - 1 - revIdx;
        var cls = bgClassify(rd.mgdl);
        var dispVal = window._bgUnit === 'mmol' ? toMmol(rd.mgdl)+' mmol/L' : rd.mgdl+' mg/dL';
        var dtObj = new Date(rd.dt);
        var dtDisplay = dtObj.toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'2-digit'}) +
                        ' ' + dtObj.toLocaleTimeString('en-GB', {hour:'2-digit',minute:'2-digit'});
        return '<tr class="tbl-row" id="bg-row-'+realIdx+'">' +
          '<td style="font-weight:700;white-space:nowrap">'+dtDisplay+'</td>' +
          '<td style="color:#64748b;font-size:12px">'+rd.ctx+'</td>' +
          '<td style="font-weight:800;font-size:15px;white-space:nowrap">'+dispVal+'</td>' +
          '<td>'+badge(cls.label, cls.color, cls.bg)+'</td>' +
          '<td style="font-size:12px;color:#64748b">'+(rd.med||'\u2014')+'</td>' +
          '<td style="font-size:12px;color:#64748b">'+(rd.notes||'\u2014')+'</td>' +
          '<td style="white-space:nowrap">' +
            '<button class="bg-edit-btn" data-idx="'+realIdx+'" style="padding:4px 8px;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;margin-right:4px">\u270f\ufe0f Edit</button>' +
            '<button class="bg-del-rd-btn" data-idx="'+realIdx+'" style="padding:4px 8px;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer">\ud83d\uddd1</button>' +
          '</td>' +
        '</tr>';
      }).join('');
      hBody.innerHTML = '<div style="overflow-x:auto"><table><thead><tr style="background:#fef2f2"><th>Date / Time</th><th>Type</th><th>BG Value</th><th>Status</th><th>Medication</th><th>Notes</th><th>Actions</th></tr></thead><tbody>'+tableRows+'</tbody></table></div>';
    }
    el_.appendChild(hCard);
    hCard.addEventListener('click', function(e){
      var editBtn   = e.target.closest('.bg-edit-btn');
      var delBtn    = e.target.closest('.bg-del-rd-btn');
      var saveBtn   = e.target.closest('.bg-save-edit');
      var cancelBtn = e.target.closest('.bg-cancel-edit');
      if (editBtn)   window._bgEditReading(parseInt(editBtn.dataset.idx));
      if (delBtn)    window._bgDeleteReading(parseInt(delBtn.dataset.idx));
      if (saveBtn)   window._bgSaveEdit(parseInt(saveBtn.dataset.idx));
      if (cancelBtn) bgRender();
    });

    // ── EXPORT CSV ────────────────────────────────────────────────
    var expDiv = fromHTML('<div style="display:flex;gap:8px;margin-top:4px"><button id="bg-exp-btn" style="flex:1;padding:10px;background:#fef2f2;color:#dc2626;border:2px solid #fecaca;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer">\ud83d\udce5 Export CSV</button></div>');
    el_.appendChild(expDiv);
    document.getElementById('bg-exp-btn').addEventListener('click', function(){ window._bgExportCSV(); });
  }

  // ── ACTIONS ──────────────────────────────────────────────────
  window._bgAddPatient = function() {
    var inp  = document.getElementById('bg-new-name');
    var dx   = document.getElementById('bg-new-dx');
    var ward = document.getElementById('bg-new-ward');
    if (!inp) return;
    var name = inp.value.trim().replace(/\s+/g,' ');
    if (!name) { alert('Please enter a patient name.'); return; }
    name = name.split(' ').map(function(w){ return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase(); }).join(' ');
    if (!bgPatients[name]) bgPatients[name] = { info:{ dx: dx?dx.value:'', ward: ward?ward.value:'' }, readings:[] };
    bgSavePts(bgPatients);
    window._bgActivePt = name;
    bgRender();
  };

  window._bgDeletePatient = function() {
    if (!window._bgActivePt) return;
    if (!confirm('Delete all records for "'+window._bgActivePt+'"? This cannot be undone.')) return;
    delete bgPatients[window._bgActivePt];
    bgSavePts(bgPatients);
    window._bgActivePt = null;
    bgRender();
  };

  window._bgLogReading = function() {
    if (!window._bgActivePt) return;
    var valRaw = parseFloat(document.getElementById('bg-val-inp').value);
    var dtVal  = document.getElementById('bg-dt-inp').value;
    var ctx    = document.getElementById('bg-ctx-inp').value;
    var res    = document.getElementById('bg-log-result');
    if (isNaN(valRaw) || valRaw <= 0) { res.innerHTML='<span style="color:#dc2626;font-size:12px">\u26a0 Please enter a valid BG value.</span>'; return; }
    var mgdl = toMgdl(valRaw, window._bgUnit);
    if (mgdl < 20 || mgdl > 900) { res.innerHTML='<span style="color:#dc2626;font-size:12px">\u26a0 Value out of range. Please check units and value.</span>'; return; }
    if (!dtVal) { res.innerHTML='<span style="color:#dc2626;font-size:12px">\u26a0 Please enter a date and time.</span>'; return; }
    var rd = {
      mgdl:  mgdl,
      dt:    dtVal,
      ctx:   ctx,
      med:   document.getElementById('bg-med-inp').value.trim()||'',
      notes: document.getElementById('bg-notes-inp').value.trim()||''
    };
    bgPatients[window._bgActivePt].readings.push(rd);
    bgSavePts(bgPatients);
    bgRender();
  };

  window._bgDeleteReading = function(idx) {
    if (!window._bgActivePt) return;
    if (!confirm('Delete this reading?')) return;
    bgPatients[window._bgActivePt].readings.splice(idx, 1);
    bgSavePts(bgPatients);
    bgRender();
  };

  window._bgEditReading = function(idx) {
    if (!window._bgActivePt) return;
    var rd = bgPatients[window._bgActivePt].readings[idx];
    if (!rd) return;
    var row = document.getElementById('bg-row-'+idx);
    if (!row) return;
    var dispVal = window._bgUnit === 'mmol' ? toMmol(rd.mgdl) : rd.mgdl;
    row.innerHTML =
      '<td><input id="edit-bg-dt" type="datetime-local" value="'+rd.dt+'" style="width:160px;padding:4px;border:1px solid #fecaca;border-radius:6px;font-size:11px"/></td>' +
      '<td><select id="edit-bg-ctx" style="padding:4px;border:1px solid #e2e8f0;border-radius:6px;font-size:11px"><option>Fasting (FBG)</option><option>Random (RBG)</option><option>Pre-meal</option><option>Post-meal (2hr)</option><option>Bedtime</option><option>2am check</option><option>Post-exercise</option></select></td>' +
      '<td><input id="edit-bg-val" type="text" inputmode="decimal" pattern="[0-9.]*" value="'+dispVal+'" style="width:75px;padding:4px;border:1px solid #dc2626;border-radius:6px;font-size:13px;font-weight:700"/> '+unitLabel()+'</td>' +
      '<td></td>' +
      '<td><input id="edit-bg-med" type="text" value="'+(rd.med||'')+'" style="width:110px;padding:4px;border:1px solid #e2e8f0;border-radius:6px;font-size:11px"/></td>' +
      '<td><input id="edit-bg-notes" type="text" value="'+(rd.notes||'')+'" style="width:110px;padding:4px;border:1px solid #e2e8f0;border-radius:6px;font-size:11px"/></td>' +
      '<td style="white-space:nowrap">' +
        '<button class="bg-save-edit" data-idx="'+idx+'" style="padding:4px 8px;background:#dc2626;color:#fff;border:none;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;margin-right:4px">\ud83d\udcbe Save</button>' +
        '<button class="bg-cancel-edit" style="padding:4px 8px;background:#f1f5f9;color:#475569;border:1px solid #e2e8f0;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer">\u2715</button>' +
      '</td>';
    // Set ctx select
    var sel = document.getElementById('edit-bg-ctx');
    if (sel) { for (var i=0;i<sel.options.length;i++) { if (sel.options[i].text===rd.ctx) { sel.selectedIndex=i; break; } } }
  };

  window._bgSaveEdit = function(idx) {
    if (!window._bgActivePt) return;
    var valRaw = parseFloat(document.getElementById('edit-bg-val').value);
    var dt     = document.getElementById('edit-bg-dt').value;
    if (isNaN(valRaw) || valRaw <= 0 || !dt) { alert('Please fill in date/time and BG value.'); return; }
    var mgdl = toMgdl(valRaw, window._bgUnit);
    bgPatients[window._bgActivePt].readings[idx] = {
      mgdl:  mgdl,
      dt:    dt,
      ctx:   document.getElementById('edit-bg-ctx').value,
      med:   document.getElementById('edit-bg-med').value.trim()||'',
      notes: document.getElementById('edit-bg-notes').value.trim()||''
    };
    bgSavePts(bgPatients);
    bgRender();
  };

  window._bgExportCSV = function() {
    if (!window._bgActivePt) return;
    var pt = bgPatients[window._bgActivePt];
    var rdgs = (pt.readings||[]).slice().sort(function(a,b){ return new Date(a.dt)-new Date(b.dt); });
    if (!rdgs.length) { alert('No readings to export.'); return; }
    var rows = [['Patient','Diagnosis','Ward','Date/Time','Reading Type','BG (mg/dL)','BG (mmol/L)','Status','Medication','Notes']];
    rdgs.forEach(function(r){
      var cls = bgClassify(r.mgdl);
      rows.push([window._bgActivePt, (pt.info&&pt.info.dx)||'', (pt.info&&pt.info.ward)||'', r.dt, r.ctx, r.mgdl, toMmol(r.mgdl), cls.label, r.med||'', r.notes||'']);
    });
    var csv = rows.map(function(r){ return r.map(function(c){ return '"'+String(c).replace(/"/g,'""')+'"'; }).join(','); }).join('\n');
    var blob = new Blob([csv], {type:'text/csv'});
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = window._bgActivePt.replace(/\s+/g,'_')+'_BG_'+new Date().toISOString().slice(0,10)+'.csv';
    a.click();
  };

  window._bgRender = bgRender;
  bgRender();
}


function tabInsulinChart(el_) {
  el_.appendChild(secTitle('\ud83d\udcca','Insulin Chart & Protocol','Sliding scale, insulin types, hypoglycaemia protocol, sick day rules, and DKA/HHS infusion calculator','#ef4444'));
  el_.appendChild(notebox('\ud83d\udccc <strong>Reference:</strong> ADA Standards of Medical Care in Diabetes 2024 (Section 9: Pharmacologic Approaches to Glycaemic Treatment). JBDS Inpatient Insulin Protocol 2022. Insulin prescribing follows local formulary \u2014 always verify brand and concentration.','#fef2f2','#fecaca'));

  // Unit toggle
  var unitDiv = fromHTML('<div style="display:flex;gap:8px;align-items:center;margin-bottom:16px"><span style="font-size:13px;font-weight:700;color:#374151">Units:</span><button id="ic-mmol" onclick="setICUnit(\'mmol\')" style="padding:5px 14px;border-radius:20px;border:2px solid #ef4444;background:#ef4444;color:#fff;font-weight:700;font-size:12px;cursor:pointer">mmol/L</button><button id="ic-mgdl" onclick="setICUnit(\'mgdl\')" style="padding:5px 14px;border-radius:20px;border:2px solid #e2e8f0;background:#fff;color:#374151;font-weight:700;font-size:12px;cursor:pointer">mg/dL</button></div>');
  el_.appendChild(unitDiv);

  // Sliding scale table
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:0 0 10px;color:#ef4444">\ud83e\ude78 Standard Sliding Scale (Subcutaneous Actrapid / Regular Insulin)</h3>'));
  var ssCard = card('Sliding Scale \u2014 Subcutaneous Insulin','#ef4444','<div id="sliding-scale-table"></div><p style="font-size:12px;color:#64748b;margin-top:8px">\ud83d\udca1 This is a general guide. Adjust scale based on patient\'s insulin sensitivity, carbohydrate intake, and clinical status. Always prescribe on drug chart. <strong>Source: JBDS Inpatient Insulin Protocol 2022.</strong></p>');
  el_.appendChild(ssCard);

  window.setICUnit = function(u) {
    window._icUnit = u;
    var mm = document.getElementById('ic-mmol'), mg = document.getElementById('ic-mgdl');
    if(mm){ mm.style.background=u==='mmol'?'#ef4444':'#fff'; mm.style.color=u==='mmol'?'#fff':'#374151'; mm.style.borderColor=u==='mmol'?'#ef4444':'#e2e8f0'; }
    if(mg){ mg.style.background=u==='mgdl'?'#ef4444':'#fff'; mg.style.color=u==='mgdl'?'#fff':'#374151'; mg.style.borderColor=u==='mgdl'?'#ef4444':'#e2e8f0'; }
    var ss = document.getElementById('sliding-scale-table');
    if(!ss) return;
    var rows_mmol = [
      ['< 4.0','< 72','DO NOT give insulin \u2014 treat HYPO (see protocol below)','0','#fef2f2','#dc2626'],
      ['4.0 \u2013 7.0','72 \u2013 126','None (if pre-meal); consider 2 units if post-meal and target not met','0\u20132','#f0fdf4','#16a34a'],
      ['7.1 \u2013 10.0','128 \u2013 180','2 units','2','#f0fdf4','#22c55e'],
      ['10.1 \u2013 14.0','182 \u2013 252','4 units','4','#fffbeb','#d97706'],
      ['14.1 \u2013 17.0','254 \u2013 306','6 units','6','#fff7ed','#ea580c'],
      ['17.1 \u2013 20.0','308 \u2013 360','8 units \u2014 recheck in 2 hours','8','#fef2f2','#dc2626'],
      ['> 20.0','> 360','10 units \u2014 notify doctor urgently \u2014 check for DKA','10','#faf5ff','#7c3aed'],
    ];
    var isM = (u==='mmol');
    ss.innerHTML = '<div style="overflow-x:auto"><table><thead><tr style="background:#fef2f2"><th>Blood Glucose</th><th>Rapid Insulin Dose</th><th>Action</th></tr></thead><tbody>'+rows_mmol.map(function(r){return '<tr style="background:'+r[4]+'"><td style="font-weight:700;color:'+r[5]+'">'+(isM?r[0]+' mmol/L':r[1]+' mg/dL')+'</td><td style="font-weight:800;color:'+r[5]+'">'+r[3]+' units</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>';
  };
  window._icUnit = window._icUnit || 'mmol';
  setTimeout(function(){ window.setICUnit(window._icUnit); },50);

  // Insulin types reference
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#ef4444">\ud83d\udc89 Insulin Types Reference</h3>'));
  el_.appendChild(card('Insulin Classification & Pharmacokinetics','#ef4444','<div style="overflow-x:auto"><table><thead><tr style="background:#fef2f2"><th>Type</th><th>Examples</th><th>Onset</th><th>Peak</th><th>Duration</th><th>Use</th></tr></thead><tbody>'+[
    ['Rapid-Acting','Novorapid (Aspart), Humalog (Lispro), Apidra (Glulisine)','5\u201315 min','30\u201390 min','3\u20135 hrs','Pre-meal (bolus) \u2014 give with or just before food'],
    ['Short-Acting','Actrapid (Regular), Humulin R','30\u201360 min','2\u20133 hrs','5\u20138 hrs','Sliding scale, IV infusion (DKA/HHS), pre-meal (30 min before)'],
    ['Intermediate-Acting','Insulatard (NPH), Humulin N','1\u20133 hrs','4\u20138 hrs','12\u201316 hrs','Twice-daily basal regimen; BD dosing'],
    ['Long-Acting','Lantus (Glargine), Levemir (Detemir)','1\u20134 hrs','Peakless','20\u201324 hrs','Once-daily basal; predictable background insulin'],
    ['Ultra-Long-Acting','Toujeo (Glargine U300), Tresiba (Degludec)','6 hrs','Peakless','>36\u201342 hrs','Once-daily in poorly controlled T1DM/T2DM; lower hypoglycaemia risk'],
    ['Pre-Mixed (Biphasic)','Mixtard 30/70, NovoMix 30','30 min','Dual peak','10\u201316 hrs','T2DM; convenient BD dosing \u2014 less flexibility'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700">'+r[0]+'</td><td style="font-size:12px;color:#ef4444">'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td>'+r[4]+'</td><td style="font-size:12px;color:#64748b">'+r[5]+'</td></tr>';}).join('')+'</tbody></table></div><p style="font-size:12px;color:#64748b;margin-top:8px">Source: BNF 2024 \u00b7 ADA 2024 Standards of Care \u00b7 Manufacturer SmPCs \u00b7 MIMS Nigeria (for local brands).</p>'));

  // Nigerian brand names cross-reference
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#ef4444">\ud83c\uddf3\ud83c\uddec Nigerian Brand Name Cross-Reference</h3>'));
  el_.appendChild(card('Local Insulin Brands Available in Nigeria','#ef4444','<div style="overflow-x:auto"><table><thead><tr style="background:#fef2f2"><th>Generic Name</th><th>International Brand</th><th>Common Nigeria Brand/Source</th><th>Type</th></tr></thead><tbody>'+[
    ['Insulin Aspart','NovoRapid (Novo Nordisk)','NovoRapid \u2014 available CMUL, LUTH, private pharmacies','Rapid-acting'],
    ['Insulin Lispro','Humalog (Eli Lilly)','Humalog \u2014 available in major urban centres','Rapid-acting'],
    ['Regular Insulin','Actrapid (Novo Nordisk)','Actrapid \u2014 widely available; NHIS formulary','Short-acting'],
    ['Regular Insulin','Humulin R (Eli Lilly)','Humulin R \u2014 available; used for IV infusions (DKA)','Short-acting'],
    ['NPH Insulin','Insulatard (Novo Nordisk)','Insulatard \u2014 widely available; most affordable','Intermediate'],
    ['Insulin Glargine','Lantus (Sanofi)','Lantus \u2014 available; cost barrier in public sector','Long-acting (24h)'],
    ['Insulin Detemir','Levemir (Novo Nordisk)','Levemir \u2014 limited availability in Nigeria','Long-acting (18\u201324h)'],
    ['Biphasic 30/70','Mixtard (Novo Nordisk)','Mixtard 30 \u2014 common in secondary/tertiary centres','Pre-mixed'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#ef4444">'+r[1]+'</td><td style="color:#16a34a;font-weight:600">'+r[2]+'</td><td style="font-size:12px;color:#64748b">'+r[3]+'</td></tr>';}).join('')+'</tbody></table></div><p style="font-size:12px;color:#64748b;margin-top:8px">Source: NHIS Essential Drug List 2023 \u00b7 NAFDAC registers \u00b7 MIMS Nigeria 2024. Availability varies by region and facility level \u2014 verify locally.</p>'));

  // Hypoglycaemia protocol
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">\ud83c\udf6c Hypoglycaemia Protocol</h3>'));
  el_.appendChild(notebox('\u26a0\ufe0f <strong>Hypoglycaemia = BG &lt; 4.0 mmol/L (&lt;72 mg/dL).</strong> Severe = BG &lt; 2.8 mmol/L (&lt;50 mg/dL) or any episode requiring assistance. Treat immediately \u2014 do not delay. <strong>Source: Joint British Diabetes Societies (JBDS) Hypoglycaemia Guideline 2023.</strong>','#fef2f2','#fecaca'));
  el_.appendChild(card('Rule of 15 \u2014 Conscious Patient (BG 2.8\u20134.0 mmol/L)','#dc2626','<div style="counter-reset:step"><div style="padding:12px;margin-bottom:8px;background:#fef2f2;border-left:4px solid #dc2626;border-radius:8px;font-size:13px"><strong>Step 1 \u2014 Give 15g fast-acting carbohydrate:</strong> 150ml fruit juice, 200ml regular Lucozade, 5\u20136 glucose tablets, 3 teaspoons sugar in water, or 1 tube Glucogel (40% dextrose oral gel)</div><div style="padding:12px;margin-bottom:8px;background:#fff7ed;border-left:4px solid #f97316;border-radius:8px;font-size:13px"><strong>Step 2 \u2014 Wait 15 minutes:</strong> Recheck BG. If still &lt; 4.0 mmol/L \u2014 repeat Step 1 (up to 3 times)</div><div style="padding:12px;margin-bottom:8px;background:#fffbeb;border-left:4px solid #d97706;border-radius:8px;font-size:13px"><strong>Step 3 \u2014 Prevent rebound hypo:</strong> Once BG &ge; 4.0 mmol/L \u2014 give 15\u201320g long-acting carbohydrate (e.g. 2 biscuits, 1 slice bread, next scheduled meal if due)</div><div style="padding:12px;background:#f0fdf4;border-left:4px solid #16a34a;border-radius:8px;font-size:13px"><strong>Step 4 \u2014 Review + Document:</strong> Identify cause (missed meal, excess insulin, exercise). Adjust insulin if recurrent. Document in nursing notes.</div></div>'));
  el_.appendChild(card('Severe Hypoglycaemia \u2014 Unconscious / Unable to Swallow','#dc2626','<div class="g2">'+[
    ['IV Access Available','IV Dextrose 10% \u2014 200ml over 15 minutes (preferred in hospital setting). Recheck BG at 15 minutes. Repeat if still &lt;4.0. Follow with oral carbohydrates once conscious. <strong>Avoid IV 50% dextrose</strong> (causes vein sclerosis \u2014 only use 50% Dextrose 50ml if 10% unavailable and access is confirmed). Source: JBDS 2023.','#fef2f2'],
    ['No IV Access / Community','Glucagon 1mg IM or SC (GlucaGen or equivalent). Works in 5\u201310 minutes. <strong>Note:</strong> Glucagon may be ineffective in alcohol-related hypoglycaemia and may be less effective in chronic liver disease. Place in recovery position. Call 999 / emergency services. <strong>Buccal glucose gel</strong> (Glucogel) if available \u2014 smear on gums \u2014 do NOT give oral fluids to unconscious patient. Source: JBDS 2023.','#fff7ed'],
  ].map(function(x){return '<div style="padding:14px;background:'+x[2]+';border-radius:10px;font-size:13px;line-height:1.6"><strong>'+x[0]+'</strong><br><br>'+x[1]+'</div>';}).join('')+'</div>'));

  // Sick day rules
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#ef4444">\ud83e\udd12 Sick Day Rules</h3>'));
  el_.appendChild(notebox('\ud83d\udca1 <strong>Key teaching point:</strong> During illness, counter-regulatory hormones (cortisol, glucagon, catecholamines) raise blood glucose even when the patient is not eating. <strong>NEVER stop insulin during illness</strong> in T1DM \u2014 it will precipitate DKA. <strong>Source: ADA 2024, NICE NG17, Diabetes UK Sick Day Rules.</strong>','#f0f9ff','#bae6fd'));
  el_.appendChild(card('Sick Day Rules (Type 1 & Insulin-Treated Type 2)','#ef4444','<div style="overflow-x:auto"><table><thead><tr style="background:#fef2f2"><th>Rule</th><th>Detail</th></tr></thead><tbody>'+[
    ['Never Stop Insulin','Always continue basal insulin (Lantus, Levemir, NPH) even if not eating. Reduce by 20% if eating significantly less. NEVER stop in T1DM.'],
    ['Monitor BG More Frequently','Check every 2\u20134 hours (or hourly if BG rising rapidly). Check blood or urine ketones if BG >14 mmol/L (>252 mg/dL).'],
    ['Fluids','Drink at least 100ml/hour of fluid (water, clear broth, flat lemonade). Sip constantly to prevent dehydration.'],
    ['When to Call Doctor / Go to Hospital','BG >28 mmol/L (>504 mg/dL) \u00b7 Blood ketones >3.0 mmol/L or urine ketones 3+ \u00b7 Persistent vomiting (unable to keep fluids down) \u00b7 Reduced consciousness \u00b7 Rapid breathing'],
    ['Oral Antidiabetics During Illness','HOLD Metformin (risk of lactic acidosis in dehydration/AKI). HOLD SGLT2 inhibitors (dapagliflozin, empagliflozin \u2014 risk of euglycaemic DKA). Continue other agents if eating normally.'],
    ['Eating Less Than Normal','Use sliding scale for correction doses. Give basal insulin. If eating nothing \u2014 halve basal insulin dose and monitor closely.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#ef4444">'+r[0]+'</td><td style="font-size:13px;line-height:1.6">'+r[1]+'</td></tr>';}).join('')+'</tbody></table></div>'));

  // Insulin infusion calculator
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">\u2697\ufe0f Fixed-Rate Insulin Infusion (FRIII) \u2014 DKA & HHS</h3>'));
  el_.appendChild(notebox('\ud83d\udccc <strong>FRIII = Fixed Rate Intravenous Insulin Infusion.</strong> Used in DKA and HHS. Dose is 0.1 units/kg/hour using 50 units Actrapid (Regular Insulin) in 50ml 0.9% NaCl (1 unit/ml). STOP subcutaneous long-acting insulin? <strong>No \u2014 continue basal insulin throughout.</strong> Stop all OTHER subcutaneous insulin. <strong>Source: JBDS DKA Guidelines 2023 \u00b7 ADA 2024.</strong>','#fef2f2','#fecaca'));
  var calcCard = card('FRIII Calculator \u2014 0.1 units/kg/hour','#dc2626','');
  var cb = calcCard.querySelector('.card-body');
  cb.innerHTML = '<div style="margin-bottom:12px"><label class="lbl">Patient Weight (kg)</label><input id="friii-wt" type="text" inputmode="decimal" class="inp" style="width:120px" placeholder="e.g. 70" oninput="calcFRIII()"></div><div id="friii-result" style="padding:14px;background:#fef2f2;border:2px solid #fecaca;border-radius:10px;font-size:13px;line-height:1.8">Enter weight to calculate infusion rate.</div>';
  el_.appendChild(calcCard);
  window.calcFRIII = function(){
    var wt=parseFloat(document.getElementById('friii-wt').value);
    var res=document.getElementById('friii-result');
    if(!res) return;
    if(isNaN(wt)||wt<=0){res.innerHTML='Enter a valid weight.';return;}
    var rate=(wt*0.1).toFixed(1);
    res.innerHTML='<strong>Weight:</strong> '+wt+' kg<br><strong>FRIII Rate:</strong> <span style="font-size:18px;font-weight:900;color:#dc2626">'+rate+' units/hour</span> (= '+rate+' ml/hour if 1 unit/ml concentration)<br><br><strong>Preparation:</strong> 50 units Actrapid (Regular) in 50ml 0.9% NaCl via syringe pump \u2192 gives 1 unit/ml<br><strong>When to adjust:</strong> BG not falling by \u22653 mmol/L/hr \u2192 increase rate by 1 unit/hr. BG dropping too fast \u2192 reduce by 0.5 units/hr.<br><strong>Target BG:</strong> 6\u201312 mmol/L in DKA \u00b7 10\u201315 mmol/L in HHS (do not drop too fast in HHS).<br><br><span style="font-size:11px;color:#64748b">Source: JBDS DKA Guideline 2023 \u00b7 ADA 2024 Section 16 (Diabetes Care in Hospital).</span>';
  };
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// BLOOD GLUCOSE TRACKER TAB (DM module)
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

// ════════════════════════════════════════════════════════════════
// DIABETES TABS
// ════════════════════════════════════════════════════════════════
function tabDMPrev(el_) {
  el_.appendChild(secTitle('🛡️','Diabetes Prevention','Identify prediabetes and prevent progression to Type 2 Diabetes','#0891b2'));
  el_.appendChild(card('Risk Factors for Type 2 Diabetes','#0891b2','<div class="g2">'+DM_RISK.map(function(r){return '<div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #f1f5f9;font-size:13px"><span style="color:#0891b2;flex-shrink:0">●</span>'+r+'</div>';}).join('')+'</div>'));
  el_.appendChild(card('Screening Recommendations (ADA 2024)','#0891b2','<table><thead><tr style="background:#f0f9ff"><th>Population</th><th>Frequency</th><th>Test</th></tr></thead><tbody>'+[['Adults ≥35 years (any BMI)','Every 3 years if normal','FPG or HbA1c or OGTT'],['Adults with BMI ≥25 + ≥1 risk factor','Every 3 years','FPG or HbA1c'],['Women with prior gestational DM','Every 1–3 years','FPG or HbA1c'],['Prediabetes identified','Annually','HbA1c or FPG'],['HIV-positive patients','At diagnosis + annually','FPG or HbA1c']].map(function(r){return '<tr class="tbl-row"><td>'+r[0]+'</td><td style="color:#0891b2;font-weight:600">'+r[1]+'</td><td>'+r[2]+'</td></tr>';}).join('')+'</tbody></table>'));
  el_.appendChild(card('Diabetes Prevention Program (DPP) Targets','#0891b2','<div class="g2">'+[['⚖️','Weight Loss','≥7% body weight reduction'],['🏃','Physical Activity','≥150 min/week moderate intensity'],['🥗','Dietary Change','Low-calorie, low-fat diet (DASH-style)'],['💊','Metformin Option','BMI ≥35 or age <60 + prediabetes']].map(function(r){return '<div style="padding:12px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px"><div style="font-size:20px;margin-bottom:4px">'+r[0]+'</div><div style="font-size:12px;font-weight:700;color:#0369a1;margin-bottom:2px">'+r[1]+'</div><div style="font-size:12px;color:#374151">'+r[2]+'</div></div>';}).join('')+'</div><div class="notebox" style="background:#f0f9ff;border:1px solid #bae6fd;margin-top:10px">🎯 DPP lifestyle intervention reduces T2DM incidence by <strong>58%</strong> vs placebo; Metformin reduces it by 31% (NEJM 2002, 15-year follow-up confirms sustained benefit).</div>'));
}

function tabDMDetect(el_) {
  el_.appendChild(secTitle('🔍','Diabetes Detection','ADA 2024 diagnostic criteria — enter available test values','#16a34a'));

  // Unit labels driven by global S.glucoseUnit
  var isMMol = (window._glucoseUnit === 'mmol');

  var c=card('Diagnostic Classifier','#16a34a','');
  c.querySelector('.card-body').innerHTML='<button id="dm-use-last-btn" onclick="useLastBGInDM()" style="display:flex;align-items:center;gap:6px;width:100%;padding:8px 12px;margin-bottom:10px;background:#f0fdf4;color:#15803d;border:1.5px solid #86efac;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.2s,color 0.2s,border-color 0.2s">⏱ Use last BG reading from tracker</button><div style="margin-bottom:10px"><label class="lbl">Patient Name</label><input id="dm-name" type="text" class="inp" placeholder="e.g. John Smith"></div><div class="g4" style="margin-bottom:10px"><div><label class="lbl">Age (years)</label><input id="dm-age" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 45"></div><div><label class="lbl">Gender</label><select id="dm-gen" class="inp"><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div><div><label class="lbl">Weight (kg)</label><input id="dm-wt" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 85" oninput="calcDMBMI()"></div><div><label class="lbl">Height (cm)</label><input id="dm-ht" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 170" oninput="calcDMBMI()"></div></div><div style="margin-bottom:10px;padding:10px 12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;font-size:13px;color:#16a34a" id="dm-bmi-display">BMI will calculate automatically when weight and height are entered.</div><div class="g2" style="margin-bottom:10px"><div><label class="lbl">Heart Rate (bpm)</label><input id="dm-hr" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 88"></div><div><label class="lbl">Respiratory Rate (breaths/min)</label><input id="dm-rr" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 16"></div></div><div style="margin-bottom:10px"><label class="lbl">Underlying Condition(s)</label><select id="dm-cond" class="inp"><option value="">None / Unknown</option><option value="htn">Hypertension</option><option value="ckd">CKD</option><option value="cvd">Established CVD</option><option value="pcos">PCOS</option><option value="gdm">Previous Gestational DM</option><option value="steroids">On Corticosteroids</option><option value="panc">Pancreatic Disease</option></select></div><p style="font-size:13px;color:#64748b;margin-bottom:10px">Enter one or more lab results. Classification uses the most abnormal value present.</p><div class="g2"><div><label class="lbl" id="dm-fg-lbl">Fasting Plasma Glucose ('+(isMMol?'mmol/L':'mg/dL')+')</label><input id="dm-fg" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="'+(isMMol?'e.g. 6.1':'e.g. 110')+'"></div><div><label class="lbl">HbA1c (%)</label><input id="dm-h" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="e.g. 6.2"></div><div><label class="lbl" id="dm-og-lbl">2-hr OGTT ('+(isMMol?'mmol/L':'mg/dL')+')</label><input id="dm-og" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" placeholder="'+(isMMol?'e.g. 9.2':'e.g. 165')+'"></div><div style="display:flex;align-items:center;gap:10px;padding-top:20px"><input type="checkbox" id="dm-sx" style="width:16px;height:16px"><label for="dm-sx" style="font-size:13px;cursor:pointer">Classic symptoms present (polyuria, polydipsia, unexplained weight loss)</label></div></div><button id="dm-classify" style="width:100%;margin-top:12px;padding:11px;background:#16a34a;color:#fff;border:none;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer">Classify & Get Treatment Plan \u2192</button><div id="dm-res" style="margin-top:12px"></div>';
  // BMI auto-calc for DM tab
  window.calcDMBMI=function(){
    var wt=parseFloat(document.getElementById('dm-wt').value);
    var ht=parseFloat(document.getElementById('dm-ht').value);
    var disp=document.getElementById('dm-bmi-display');
    if(wt>0&&ht>0){
      var bmi=Math.round(wt/Math.pow(ht/100,2)*10)/10;
      var cat=bmi<18.5?'Underweight':bmi<25?'Normal weight':bmi<30?'Overweight':'Obese';
      var col=bmi<18.5?'#d97706':bmi<25?'#16a34a':bmi<30?'#d97706':'#dc2626';
      disp.innerHTML='<strong>BMI: '+bmi+' kg/m²</strong> — <span style="color:'+col+';font-weight:700">'+cat+'</span>';
      disp.style.background=bmi<25?'#f0fdf4':'#fff7ed'; disp.style.borderColor=bmi<25?'#bbf7d0':'#fed7aa';
    } else { disp.innerHTML='BMI will calculate automatically when weight and height are entered.'; }
  };
  el_.appendChild(c);
  document.getElementById('dm-classify').onclick=function(){
    var dmName=document.getElementById('dm-name').value;
    var dmAge=parseInt(document.getElementById('dm-age').value)||null;
    var dmGen=document.getElementById('dm-gen').value;
    var dmWt=parseFloat(document.getElementById('dm-wt').value)||null;
    var dmHt=parseFloat(document.getElementById('dm-ht').value)||null;
    var dmBmi=dmWt&&dmHt?Math.round(dmWt/Math.pow(dmHt/100,2)*10)/10:null;
    var isMMol = (window._glucoseUnit === 'mmol');
    function toMgDl(v){ return isMMol ? Math.round(v * 18.02) : v; }
    var dmCond=document.getElementById('dm-cond').value;
    var dmHR=parseInt(document.getElementById('dm-hr').value)||null;
    var dmRR=parseInt(document.getElementById('dm-rr').value)||null;
    var fpgRaw=parseFloat(document.getElementById('dm-fg').value),hba=parseFloat(document.getElementById('dm-h').value),ogttRaw=parseFloat(document.getElementById('dm-og').value),sx=document.getElementById('dm-sx').checked;
    var fpg=isNaN(fpgRaw)?NaN:toMgDl(fpgRaw), ogtt=isNaN(ogttRaw)?NaN:toMgDl(ogttRaw);
    var unitLabel=isMMol?'mmol/L':'mg/dL';
    var results=[];
    if(!isNaN(fpg)) results.push({test:'FPG',val:fpgRaw+' '+unitLabel,cat:fpg>=126||(fpg>=200&&sx)?'Diabetes':fpg>=100?'Prediabetes':'Normal'});
    if(!isNaN(hba)) results.push({test:'HbA1c',val:hba+'%',cat:hba>=6.5?'Diabetes':hba>=5.7?'Prediabetes':'Normal'});
    if(!isNaN(ogtt)) results.push({test:'2hr OGTT',val:ogttRaw+' '+unitLabel,cat:ogtt>=200?'Diabetes':ogtt>=140?'Prediabetes':'Normal'});
    if(!results.length){document.getElementById('dm-res').innerHTML='<p style="color:#ef4444;font-size:13px">Enter at least one value.</p>';return;}
    var worst=results.reduce(function(a,b){return b.cat==='Diabetes'?'Diabetes':a==='Diabetes'?'Diabetes':b.cat==='Prediabetes'?'Prediabetes':a;},'Normal');
    var cc={Normal:'#16a34a',Prediabetes:'#d97706',Diabetes:'#dc2626'},cb={Normal:'#f0fdf4',Prediabetes:'#fffbeb',Diabetes:'#fef2f2'};
    var msgs={Normal:'No evidence of diabetes or prediabetes. Recheck in 3 years if risk factors present.',Prediabetes:'High risk for T2DM. Lifestyle intervention reduces risk by 58%. Consider Metformin if BMI ≥35 or age <60. Rescreen annually.',Diabetes:'⚠ Diagnosis of Diabetes Mellitus. Confirm with a repeat test on a separate day unless classic symptoms present with unequivocal hyperglycaemia. Refer to endocrinology / diabetes team. Initiate treatment per T1DM or T2DM pathway.'};
    var dmTx={
      'Normal':    {action:'No diabetes or prediabetes detected. Maintain healthy lifestyle.',drugs:'No medication required.',lifestyle:'Balanced diet, regular physical activity ≥150min/week, maintain healthy weight, annual BP and lipid check.',followup:'Rescreen in 3 years if risk factors present (obesity, family history, HTN, gestational DM, polycystic ovary syndrome).',urgency:'ROUTINE',uc:'#16a34a'},
      'Prediabetes':{action:'High risk for Type 2 Diabetes. Lifestyle intervention is the primary treatment — reduces progression risk by 58%. Consider Metformin if BMI ≥35, age <60, or history of gestational DM.',drugs:'Metformin 500mg BD (if indicated): BMI ≥35, age <60, or previous gestational DM. Titrate to 1000mg BD over 4 weeks. Monitor B12 annually.',lifestyle:'Mediterranean or DASH diet. Reduce refined carbohydrates and sugary drinks. Exercise ≥150min/week (aerobic + resistance). Target 5–7% weight loss if overweight.',followup:'Rescreen with FPG or HbA1c every 6–12 months. Refer to structured diabetes prevention programme if available.',urgency:'NON-URGENT',uc:'#d97706'},
      'Diabetes':  {action:'Diagnosis of Diabetes Mellitus. Confirm with repeat test on a separate day unless classic symptoms present with unequivocal hyperglycaemia (glucose ≥200 + polyuria/polydipsia/weight loss). Refer to diabetes care team. Initiate treatment based on T1DM vs T2DM pathway.',drugs:'T2DM First-line: Metformin 500mg BD (titrate to 2000mg/day). Add SGLT2i (Empagliflozin 10mg) if CVD, HF, or CKD. Add GLP-1 RA (Semaglutide) if obesity or ASCVD risk. T1DM: Basal-bolus insulin regimen — see Insulin Guide tab.',lifestyle:'Diabetes-specific dietary education. Carbohydrate counting or plate method. Exercise ≥150min/week. Smoking cessation. Foot care education.',followup:'HbA1c in 3 months. Annual complications screening (eyes, kidneys, feet, lipids). BP <130/80. Annual dental review.',urgency:'REFER',uc:'#dc2626'},
    };
    var dtx=dmTx[worst];
    var dmHtml='<div style="border-radius:12px;overflow:hidden;border:2px solid '+cc[worst]+'">';
    dmHtml+='<div style="padding:14px 18px;background:'+cb[worst]+'"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><div style="font-size:17px;font-weight:800;color:'+cc[worst]+'">'+worst+'</div><div style="font-size:12px;color:#fff;background:'+cc[worst]+';padding:2px 10px;border-radius:20px">'+dtx.urgency+'</div></div></div>';
    dmHtml+='<div style="padding:6px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;display:flex;flex-wrap:wrap;gap:8px">'+results.map(function(r){return '<div style="padding:6px 12px;background:'+cb[r.cat]+';border:1px solid '+cc[r.cat]+';border-radius:8px;display:flex;gap:8px;align-items:center"><span style="font-size:11px;color:#64748b;font-weight:600">'+r.test+':</span><span style="font-size:13px;font-weight:700;color:'+cc[r.cat]+'">'+r.val+'</span><span style="font-size:10px;color:'+cc[r.cat]+';background:#fff;padding:1px 6px;border-radius:10px">'+r.cat+'</span></div>';}).join('')+'</div>';
    dmHtml+='<div style="padding:14px 18px;background:#fff;display:flex;flex-direction:column;gap:10px">';
    dmHtml+='<div style="padding:10px 14px;background:#fef2f2;border-radius:8px;border-left:4px solid '+dtx.uc+'"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">Clinical Action</div><div style="font-size:13px;color:#1e293b;line-height:1.7">'+dtx.action+'</div></div>';
    dmHtml+='<div style="padding:10px 14px;background:#f8fafc;border-radius:8px;border-left:4px solid #0ea5e9"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">💊 Pharmacotherapy</div><div style="font-size:13px;color:#1e293b;line-height:1.7">'+dtx.drugs+'</div></div>';
    dmHtml+='<div style="padding:10px 14px;background:#f0fdf4;border-radius:8px;border-left:4px solid #22c55e"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">🌱 Lifestyle</div><div style="font-size:13px;color:#1e293b;line-height:1.7">'+dtx.lifestyle+'</div></div>';
    dmHtml+='<div style="padding:10px 14px;background:#f0f9ff;border-radius:8px;border-left:4px solid #38bdf8"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px">📅 Follow-up</div><div style="font-size:13px;color:#1e293b">'+dtx.followup+'</div></div>';
    dmHtml+='</div></div>';
    // Personalised notes
    var dmNotes=[];
    if(dmName) dmHtml='<div style="font-size:13px;font-weight:700;color:#1e293b;padding:8px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0">👤 '+dmName+'</div>'+dmHtml;
    if(dmAge&&dmAge>=65) dmNotes.push('👴 <strong>Elderly (≥65 yrs):</strong> Individualise HbA1c target — aim <8.0% rather than <7.0% to reduce hypoglycaemia risk. Avoid aggressive glucose lowering. Deprescribe if hypoglycaemia occurring. Assess frailty and cognitive status.');
    if(dmAge&&dmAge<18) dmNotes.push('👶 <strong>Paediatric/Young patient:</strong> Consider Type 1 DM and MODY. Check C-peptide and diabetes autoantibodies (GAD, IA-2, ZnT8). Refer to paediatric endocrinology. Insulin likely required for T1DM.');
    if(dmGen==='female') dmNotes.push('👩 <strong>Female patient:</strong> Screen for PCOS if premenopausal (associated with insulin resistance). Check for gestational DM history. Avoid Metformin in pregnancy unless benefits outweigh risks — discuss with endocrinology.');
    if(dmBmi&&dmBmi>=30) dmNotes.push('⚖️ <strong>Obesity (BMI '+dmBmi+'):</strong> Weight loss of 5–10% significantly improves glycaemic control. Consider GLP-1 RA (Semaglutide, Liraglutide) or SGLT2i (Empagliflozin) — both promote weight loss. Bariatric surgery if BMI ≥35 with uncontrolled DM.');
    if(dmBmi&&dmBmi<18.5) dmNotes.push('⚠️ <strong>Underweight (BMI '+dmBmi+'):</strong> Consider Type 1 DM, pancreatic disease, or secondary diabetes. Check C-peptide and autoantibodies. Nutritional assessment required.');
    if(dmCond==='htn') dmNotes.push('🫀 <strong>Hypertension:</strong> BP target <130/80 mmHg. ACE inhibitor or ARB first-line — renoprotective. Avoid beta-blockers as first-line (masks hypoglycaemia). SGLT2i preferred add-on drug — reduces both BP and glucose.');
    if(dmCond==='ckd') dmNotes.push('🫘 <strong>CKD:</strong> SGLT2i (Empagliflozin/Dapagliflozin) if eGFR ≥20 — reduces CKD progression. ACE/ARB for proteinuria. Avoid Metformin if eGFR <30. Monitor K⁺ and eGFR closely. Nephrology referral if eGFR <30.');
    if(dmCond==='cvd') dmNotes.push('❤️ <strong>Established CVD:</strong> SGLT2i or GLP-1 RA with proven CV benefit first-line after Metformin. Empagliflozin/Canagliflozin reduce CV mortality. Semaglutide/Liraglutide reduce MACE. Ensure statin and antiplatelet reviewed.');
    if(dmCond==='pcos') dmNotes.push('🔵 <strong>PCOS:</strong> High risk of T2DM and prediabetes. Metformin is first-line — improves insulin sensitivity and menstrual regularity. Lifestyle intervention essential. Annual DM screening mandatory.');
    if(dmCond==='gdm') dmNotes.push('🤰 <strong>Previous Gestational DM:</strong> 50% lifetime risk of T2DM. Annual FPG or HbA1c screening. Lifestyle intervention reduces progression by 58%. Consider Metformin. Counsel on risk before future pregnancies.');
    if(dmCond==='steroids') dmNotes.push('💊 <strong>Corticosteroid-induced hyperglycaemia:</strong> Predominantly postprandial — FPG may be normal. Check post-meal glucose. Insulin often required. Titrate with steroid dose. Review when steroids tapered.');
    if(dmCond==='panc') dmNotes.push('🫁 <strong>Pancreatic Disease:</strong> Type 3c diabetes — both insulin deficiency and glucagon deficiency present. High risk of hypoglycaemia with insulin. Exocrine pancreatic insufficiency common — check for malabsorption. Specialist referral required.');
    // HR / RR clinical notes for DM
    if(dmHR&&dmHR>100&&worst==='Diabetes') dmNotes.push('💓 <strong>Tachycardia (HR '+dmHR+' bpm) + Diabetes:</strong> In the context of significantly elevated glucose, tachycardia raises concern for DKA or HHS. Check blood ketones immediately. Other causes: dehydration, infection (sepsis), autonomic neuropathy, or hypoglycaemia rebound. Obtain urgent bloods including VBG/lactate.');
    else if(dmHR&&dmHR>100) dmNotes.push('💓 <strong>Tachycardia (HR '+dmHR+' bpm):</strong> Consider dehydration, infection, or autonomic neuropathy as contributors. In diabetic patients, resting tachycardia may be an early marker of cardiac autonomic neuropathy (CAN) — assess with Ewing battery.');
    if(dmRR&&dmRR>=22&&worst==='Diabetes') dmNotes.push('🌬️ <strong>Tachypnoea / Kussmaul Breathing (RR '+dmRR+' breaths/min) + Diabetes:</strong> Rapid deep breathing is a hallmark of DKA (Kussmaul respiration — compensating for metabolic acidosis). Check blood ketones and pH urgently. If ketones >3 mmol/L and pH <7.3 → DKA protocol immediately.');
    else if(dmRR&&dmRR>=22) dmNotes.push('🌬️ <strong>Elevated Respiratory Rate (RR '+dmRR+' breaths/min):</strong> Consider concurrent infection (can trigger DKA), heart failure, or anaemia. Evaluate SpO₂ and respiratory examination.');
    if(dmNotes.length){
      dmHtml+='<div style="margin-top:10px;padding:14px 16px;background:#fafafa;border:1px solid #bbf7d0;border-radius:10px"><div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:10px">👤 Personalised Clinical Notes</div>'+dmNotes.map(function(n){return '<div style="font-size:13px;color:#1e293b;line-height:1.7;padding:8px 0;border-bottom:1px solid #f1f5f9">'+n+'</div>';}).join('')+'</div>';
    }

    // ── Recommended Investigations ────────────────────────────
    var _dmInv=[];
    // Core — any abnormal glucose result
    if(worst==='Prediabetes'||worst==='Diabetes'){
      _dmInv.push({t:'HbA1c (if not already done)',r:'Confirms diagnosis and reflects 3-month glycaemic average. Target <6.5% to reverse prediabetes; <7.0% in T2DM. ADA 2024.'});
      _dmInv.push({t:'Fasting Plasma Glucose (FPG)',r:'Confirm diagnosis on a second day unless classic hyperglycaemic symptoms. ADA requires two abnormal results.'});
      _dmInv.push({t:'Urine Albumin:Creatinine Ratio (ACR)',r:'Screen for diabetic nephropathy — microalbuminuria is earliest marker of renal involvement. ADA: annual from diagnosis.'});
      _dmInv.push({t:'Serum Creatinine + eGFR (CKD-EPI)',r:'Assess renal function. Required to dose Metformin safely (hold if eGFR <30) and select SGLT2i. ADA 2024.'});
      _dmInv.push({t:'Fasting Lipid Profile (TC, LDL, HDL, TG)',r:'Dyslipidaemia co-exists in ~70% of T2DM. ASCVD risk stratification. Target LDL <70 mg/dL if high CV risk.'});
      _dmInv.push({t:'Liver Function Tests (LFTs)',r:'MASLD (metabolic-associated steatotic liver disease) in ~50–75% of T2DM. Baseline before Metformin and statins.'});
      _dmInv.push({t:'Serum Electrolytes (Na⁺, K⁺)',r:'DKA (low K⁺, low Na⁺), HHS (high Na⁺, high osmolality). Baseline for SGLT2i prescribing (risk of euglycaemic DKA).'});
      _dmInv.push({t:'Thyroid Function Tests (TFTs)',r:'Hypothyroidism worsens insulin resistance and dyslipidaemia. Screen at diagnosis and every 1–2 years in T2DM. ADA.'});
      _dmInv.push({t:'Urine Ketones / Beta-hydroxybutyrate',r:'T1DM or insulin-deficient state — rule out DKA if glucose significantly elevated. Capillary ketones >3 mmol/L = DKA.'});
      _dmInv.push({t:'Blood Pressure measurement',r:'HTN co-exists in >70% of T2DM. BP target <130/80 mmHg. ACEi/ARB first-line — renoprotective. ADA 2024.'});
    }
    // Diabetes — additional
    if(worst==='Diabetes'){
      _dmInv.push({t:'C-Peptide + Diabetes Autoantibodies (GAD-65, IA-2, ZnT8)',r:'Differentiate T1DM (low C-peptide, positive antibodies) from T2DM (normal/high C-peptide, negative antibodies). Critical for correct treatment pathway.'});
      _dmInv.push({t:'12-lead ECG',r:'Silent myocardial ischaemia is common in DM (autonomic neuropathy blunts chest pain). Baseline ECG at diagnosis. ADA 2024.'});
      _dmInv.push({t:'Retinal (Fundus) Examination',r:'Diabetic retinopathy — screen at diagnosis, then annually. Refer to ophthalmology if any retinopathy detected. ADA 2024.'});
      _dmInv.push({t:'Foot Examination (Doppler + monofilament)',r:'Peripheral neuropathy and peripheral arterial disease — screen at diagnosis. ABI <0.9 = PAD. Annual review minimum.'});
    }
    // Comorbidity-driven additions
    if(dmCond==='htn'){
      _dmInv.push({t:'24-hour ABPM or Home BP Monitoring',r:'DM + HTN — confirm masked or white coat HTN. ABPM superior to clinic BP for CV risk stratification.'});
    }
    if(dmCond==='ckd'){
      _dmInv.push({t:'Spot Urine Protein:Creatinine Ratio (PCR)',r:'CKD staging and proteinuria quantification. PCR >50 mg/mmol = significant proteinuria — nephrology referral.'});
      _dmInv.push({t:'Serum Phosphate, Calcium, PTH',r:'CKD-MBD (mineral bone disorder) screening in CKD ≥Stage 3. ADA 2024 / KDIGO 2022.'});
    }
    if(dmCond==='cvd'){
      _dmInv.push({t:'Resting ECG + Exercise Tolerance Test (ETT)',r:'Established CVD — assess ischaemia burden. Required before SGLT2i and GLP-1 RA initiation in high-risk patients.'});
      _dmInv.push({t:'Echocardiogram',r:'HFpEF is common in DM + CVD. Assess LV function, diastolic dysfunction. SGLT2i reduces HF hospitalisation — Echo guides selection.'});
    }
    if(dmCond==='pcos'){
      _dmInv.push({t:'Fasting Insulin + HOMA-IR',r:'PCOS — quantify insulin resistance. HOMA-IR >2.5 = significant IR. Guides Metformin dosing and lifestyle intensity.'});
      _dmInv.push({t:'LH, FSH, Free Testosterone, SHBG',r:'PCOS hormonal profile — confirms diagnosis and guides reproductive management alongside DM treatment.'});
    }
    if(dmCond==='steroids'){
      _dmInv.push({t:'Post-meal Blood Glucose (2hr post-prandial)',r:'Steroid-induced DM predominantly affects postprandial glucose — fasting glucose may be near-normal. Check 2hr post-lunch.'});
    }
    if(dmAge&&dmAge<25||dmCond==='panc'){
      _dmInv.push({t:'Exocrine Pancreatic Function (faecal elastase-1)',r:'Type 3c DM / pancreatic disease — exocrine insufficiency common. Low elastase = malabsorption requiring enzyme replacement.'});
    }
    // Render
    var _dmInvHtml='';
    if(_dmInv.length){
      _dmInvHtml='<div style="margin-top:14px;background:#f8fafc;border:2px solid #16a34a44;border-radius:12px;overflow:hidden">';
      _dmInvHtml+='<div style="padding:10px 16px;background:#f0fdf4;border-bottom:1px solid #bbf7d0;display:flex;align-items:center;gap:8px">';
      _dmInvHtml+='<span style="font-size:16px">🧪</span>';
      _dmInvHtml+='<span style="font-size:12px;font-weight:800;color:#16a34a;text-transform:uppercase;letter-spacing:0.6px">Recommended Investigations</span>';
      _dmInvHtml+='<span style="font-size:10px;color:#64748b;margin-left:4px">— ADA Standards of Care 2024</span>';
      _dmInvHtml+='</div>';
      _dmInvHtml+='<table style="width:100%;border-collapse:collapse">';
      _dmInvHtml+='<thead><tr style="background:#f0fdf4"><th style="padding:7px 12px;text-align:left;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.4px">Investigation</th><th style="padding:7px 12px;text-align:left;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.4px">Rationale</th></tr></thead>';
      _dmInvHtml+='<tbody>'+_dmInv.map(function(r,i){return '<tr style="background:'+(i%2===0?'#fff':'#f0fdf4')+'"><td style="padding:8px 12px;font-size:13px;font-weight:600;color:#1e293b;border-bottom:1px solid #f1f5f9;white-space:nowrap;min-width:200px">'+r.t+'</td><td style="padding:8px 12px;font-size:12px;color:#475569;border-bottom:1px solid #f1f5f9;line-height:1.5">'+r.r+'</td></tr>';}).join('')+'</tbody>';
      _dmInvHtml+='</table>';
      _dmInvHtml+='<div style="padding:7px 12px;font-size:10px;color:#94a3b8;border-top:1px solid #bbf7d0;font-style:italic">Sources: ADA Standards of Medical Care in Diabetes 2024 · NICE NG28 · KDIGO 2022</div>';
      _dmInvHtml+='</div>';
    }
    dmHtml+=_dmInvHtml;
    // ── End Investigations ─────────────────────────────────────
    // ── Personalised notes based on age ────────────────────────
    var dmNotes=[];
    if(dmAge&&dmAge>=65) dmNotes.push('👴 <strong>Elderly (≥65 yrs):</strong> Individualise glycaemic targets — HbA1c target of 7.5–8.0% (58–64 mmol/mol) may be more appropriate to avoid hypoglycaemia. High hypoglycaemia risk with sulphonylureas and insulin — prefer agents with low hypo risk (DPP-4 inhibitors, GLP-1 agonists). Cognitive impairment screening recommended.');
    if(dmAge&&dmAge>=75) dmNotes.push('🧓 <strong>Very elderly (≥75 yrs):</strong> Simplified regimens preferred. Avoid aggressive glucose lowering — HbA1c target up to 8.5% (69 mmol/mol) acceptable if frail. Metformin: reduce dose with eGFR <45, stop if <30. SGLT2 inhibitors: reduced efficacy and increased UTI/DKA risk in elderly.');
    if(dmAge&&dmAge<18) dmNotes.push('👶 <strong>Paediatric patient (< 18 yrs):</strong> ADA adult diagnostic thresholds apply from age 10. Type 1 DM is more common in children — consider C-peptide and GAD antibody testing. Type 2 DM in youth is aggressive — earlier pharmacotherapy needed. Involve paediatric endocrinology.');
    if(dmAge&&dmAge<10) dmNotes.push('🍼 <strong>Young child (< 10 yrs):</strong> New-onset diabetes in this age group is almost exclusively Type 1. DKA at presentation is common. Urgent blood glucose, blood gas, and electrolytes required. Do not delay insulin in suspected T1DM.');
    if(dmAge&&dmAge>=18&&dmAge<=45) dmNotes.push('🧑 <strong>Young adult (18–45 yrs):</strong> Screen for MODY (Maturity Onset Diabetes of the Young) if: no autoantibodies, family history of diabetes in 2+ generations, mild fasting hyperglycaemia. MODY may not require insulin. Also consider Type 1 DM — check GAD/ZnT8 antibodies if uncertain.');
    if(dmAge&&dmAge>=45&&dmAge<65) dmNotes.push('🧑 <strong>Middle-aged (45–64 yrs):</strong> Peak incidence of Type 2 DM. Cardiovascular risk is high — consider GLP-1 agonist (Semaglutide, Liraglutide) or SGLT2 inhibitor (Empagliflozin, Dapagliflozin) for cardioprotective benefit if CVD or high CV risk. Target HbA1c ≤7.0% (53 mmol/mol).');
    if(dmAge&&dmAge>=18&&dmAge<45&&dmGen==='female') dmNotes.push('🤰 <strong>Female of childbearing age:</strong> Gestational DM screening at 24–28 weeks (75g OGTT). Pre-conception HbA1c <6.5% reduces teratogenic risk. Metformin is used in pregnancy but insulin is the preferred agent for glycaemic control. Avoid ACE inhibitors, ARBs, and SGLT2 inhibitors in pregnancy.');
    if(dmNotes.length>0){
      dmHtml+='<div style="padding:12px 14px;background:#f0fdf4;border-radius:8px;border-left:4px solid #16a34a;margin-top:4px">';
      dmHtml+='<div style="font-size:11px;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">👤 Age-Based Clinical Notes</div>';
      dmNotes.forEach(function(n){ dmHtml+='<div style="font-size:13px;color:#1e293b;line-height:1.6;margin-bottom:6px;padding-left:4px">'+n+'</div>'; });
      dmHtml+='</div>';
    }
    document.getElementById('dm-res').innerHTML=dmHtml;
    var dmRes = document.getElementById('dm-res');
    dmRes.insertAdjacentHTML('beforeend', '<button class="result-print-btn" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-top:14px;padding:11px;background:#f0f9ff;color:#0369a1;border:2px solid #bae6fd;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit;" onclick="printClassifierResult(\'dm-res\',\'Diabetes Assessment\')">🖨️ Print This Assessment</button>');
    wrapTables(document.getElementById('dm-res'));
  };
  el_.appendChild(card('ADA 2024 Diagnostic Thresholds — mg/dL & mmol/L','#16a34a','<table><thead><tr style="background:#f0fdf4"><th>Category</th><th>FPG</th><th>2hr OGTT</th><th>HbA1c</th><th>Random+Sx</th></tr></thead><tbody><tr style="background:#f0fdf4"><td style="font-weight:700;color:#16a34a">Normal</td><td>&lt;100 mg/dL<br><span style="color:#64748b;font-size:11px">&lt;5.6 mmol/L</span></td><td>&lt;140 mg/dL<br><span style="color:#64748b;font-size:11px">&lt;7.8 mmol/L</span></td><td>&lt;5.7%</td><td>N/A</td></tr><tr style="background:#fffbeb"><td style="font-weight:700;color:#d97706">Prediabetes</td><td>100–125 mg/dL<br><span style="color:#64748b;font-size:11px">5.6–6.9 mmol/L</span></td><td>140–199 mg/dL<br><span style="color:#64748b;font-size:11px">7.8–11.0 mmol/L</span></td><td>5.7–6.4%</td><td>N/A</td></tr><tr style="background:#fef2f2"><td style="font-weight:700;color:#dc2626">Diabetes</td><td>≥126 mg/dL<br><span style="color:#64748b;font-size:11px">≥7.0 mmol/L</span></td><td>≥200 mg/dL<br><span style="color:#64748b;font-size:11px">≥11.1 mmol/L</span></td><td>≥6.5%</td><td>≥200 mg/dL (≥11.1 mmol/L) + symptoms</td></tr></tbody></table><p style="font-size:11px;color:#64748b;margin-top:8px">FPG = fasting plasma glucose. OGTT = 75g oral glucose tolerance test at 2 hours. Conversion: mg/dL ÷ 18 = mmol/L.</p>'));
}

function tabDMEval(el_) {
  el_.appendChild(secTitle('📋','Diabetes Evaluation','Routine lab investigations, annual complications screening, and monitoring targets','#f59e0b'));
  el_.appendChild(notebox('📋 Screen for all complications at diagnosis for T2DM, and within 5 years of diagnosis for T1DM, then annually thereafter unless abnormal findings prompt earlier review.','#fffbeb','#fde68a'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:16px 0 10px;color:#f59e0b">🧪 Routine Lab Investigations</h3>'));
  el_.appendChild(card('At Every Visit','#f59e0b','<table><thead><tr style="background:#fffbeb"><th>Test</th><th>Target / Normal</th><th>Action if Abnormal</th></tr></thead><tbody>'+[
    ['Blood Glucose (fasting or random)','Fasting 80–130 mg/dL; Random <180 mg/dL','Adjust medication, review diet and adherence'],
    ['Blood Pressure','<130/80 mmHg','Initiate or intensify antihypertensive — ACE/ARB preferred in DM'],
    ['Body Weight / BMI','BMI <25 (or individualised target)','Intensify lifestyle; consider GLP-1 RA or SGLT2i if obese'],
    ['Foot Inspection','No ulcer, callus, deformity, or colour change','Risk classify; refer podiatry if any abnormality found'],
    ['Injection Sites (insulin users)','No lipohypertrophy, bruising, or infection','Rotate sites; assess technique; switch needle if >1 use'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#d97706;font-weight:600">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table>'));

  el_.appendChild(card('Every 3 Months (Until Stable) — Then 6-Monthly','#f59e0b','<table><thead><tr style="background:#fffbeb"><th>Test</th><th>Target</th><th>Notes</th></tr></thead><tbody>'+[
    ['HbA1c','<7.0% (individualise — see HbA1c tab)','Reflects average glucose over ~3 months. May underestimate in haemolytic anaemia or CKD.'],
    ['Medication Review','Assess tolerability, adherence, dose','Check for hypoglycaemia events, GI side effects (Metformin), oedema (TZDs)'],
    ['Hypoglycaemia History','0 severe episodes; <4% TBR on CGM','Document frequency, severity, awareness, triggers — adjust regimen'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#d97706;font-weight:600">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table>'));

  el_.appendChild(card('Annual Investigations — Full Panel','#f59e0b','<table><thead><tr style="background:#fffbeb"><th>Test</th><th>Target / Normal</th><th>Action if Abnormal</th></tr></thead><tbody>'+[
    ['HbA1c (if not done 3-monthly)','<7.0% (individualise)','Step up therapy; review adherence and lifestyle'],
    ['Fasting Lipid Panel (TC, LDL, HDL, TG)','LDL <70 mg/dL (high risk); TG <150; HDL >40(M)/>50(F)','Initiate/intensify statin; add ezetimibe or PCSK9i if LDL remains above target'],
    ['eGFR (estimated GFR)','eGFR >60 mL/min/1.73m²','eGFR 30–60: nephrology referral consideration; SGLT2i if eGFR ≥20; avoid Metformin if <30'],
    ['Urine Albumin/Creatinine Ratio (ACR)','<30 mg/g (normal); 30–300 = microalbuminuria; >300 = macroalbuminuria','Start ACE/ARB; optimise BP and glucose; add SGLT2i; nephrology if eGFR declining'],
    ['Serum Creatinine + Urea','Within normal range for age/sex','Rising creatinine = progressive nephropathy; review nephrotoxic drugs'],
    ['LFTs (ALT, AST, ALP, Bilirubin)','Within normal limits','Elevated transaminases: NAFLD/MASLD (common in T2DM); review Metformin if severe'],
    ['TSH (Thyroid Function)','0.4–4.0 mIU/L','T1DM: annual (autoimmune association); T2DM: if symptomatic. Hypothyroidism worsens glycaemic control.'],
    ['FBC (Full Blood Count)','Hb, WCC, Platelets within normal limits','Anaemia worsens HbA1c interpretation; macrocytosis if on Metformin (check B12)'],
    ['Vitamin B12','>200 pg/mL (pmol/L: >150)','Metformin reduces B12 absorption — screen annually in long-term users. Supplement if low.'],
    ['Dilated Eye Examination','No retinopathy / stable background','Refer ophthalmology if any retinopathy. Anti-VEGF or laser for proliferative disease.'],
    ['Foot Monofilament + Vibration','Intact 10g monofilament + 128Hz tuning fork','Classify foot risk (0–3); podiatry referral; therapeutic footwear'],
    ['Dental Review','No periodontal disease','Periodontal disease bidirectionally worsens HbA1c. Refer dentist.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#d97706;font-weight:600;font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table>'));

  el_.appendChild(card('Additional Tests — T1DM Specific','#dc2626','<table><thead><tr style="background:#fef2f2"><th>Test</th><th>Frequency</th><th>Rationale</th></tr></thead><tbody>'+[
    ['Coeliac screen (tTG-IgA + total IgA)','At diagnosis, then every 2–5 years','5–10% of T1DM have coeliac disease (shared HLA). Symptomatic or growth failure — screen more often.'],
    ['TSH + TPO antibodies','At diagnosis, then annually','Autoimmune thyroid disease in 20–30% of T1DM. TPO Ab predicts future hypothyroidism.'],
    ['C-peptide','At diagnosis if T1 vs T2 uncertain','Low/undetectable = T1DM. Helps distinguish from MODY or T2DM presenting young.'],
    ['Diabetes autoantibodies (GAD65, IA-2, ZnT8, IAA)','At diagnosis','Confirms autoimmune aetiology. Guides classification and family counselling.'],
    ['Bone density (DEXA scan)','From age 50 or if on corticosteroids','T1DM associated with reduced bone density and increased fracture risk.'],
    ['Psychological screening (PHQ-9 + DDS)','Annually','High rates of depression and diabetes distress in T1DM. Early intervention improves outcomes.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#dc2626;font-weight:600">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td></tr>';}).join('')+'</tbody></table>'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#f59e0b">🔍 Annual Complications Screening</h3>'));
  el_.appendChild(accordion(COMPLICATIONS.map(function(c){return{label:'🔍 '+c.c,freq:c.freq,test:c.test,action:c.action};}), '#f59e0b', function(panel,item){
    panel.innerHTML=badge(item.freq,'#92400e','#fef3c7')+'<div style="margin:8px 0;font-size:13px"><strong>Test:</strong> '+item.test+'</div><div style="font-size:13px;background:#fef3c7;padding:8px 12px;border-radius:8px;color:#78350f">📌 Action: '+item.action+'</div>';
  }));
  el_.appendChild(card('Routine Monitoring Targets','#f59e0b','<table><thead><tr style="background:#fffbeb"><th>Parameter</th><th>Target</th><th>Frequency</th></tr></thead><tbody>'+[['HbA1c','<7.0% (individualise per patient)','3-monthly until stable, then 6-monthly'],['Blood Pressure','<140/90 mmHg (aim <130/80 if tolerated)','Every visit'],['LDL Cholesterol','<70 mg/dL (high risk with CVD)','Annually'],['eGFR + Urine ACR','eGFR >60; ACR <30 mg/g','Annually'],['Body Weight / BMI','BMI target <25','Every visit'],['Foot Examination','No ulcer; intact sensation; adequate circulation','Every visit']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#d97706;font-weight:700">'+r[1]+'</td><td>'+r[2]+'</td></tr>';}).join('')+'</tbody></table>'));

  // ── PERIOPERATIVE DM MANAGEMENT ──
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#7c3aed">🔪 Perioperative Diabetes Management</h3>'));
  el_.appendChild(notebox('📌 <strong>Perioperative hyperglycaemia worsens surgical outcomes</strong> — impairs wound healing, increases infection risk, and prolongs hospital stay. Target intraoperative glucose: 6–10 mmol/L (108–180 mg/dL). Source: JBDS-IP Perioperative Guidance 2022 / ADA 2024.','#faf5ff','#e9d5ff'));
  el_.appendChild(card('Drug Management — Day Before & Day of Surgery','#7c3aed','<table><thead><tr style="background:#faf5ff"><th>Drug / Class</th><th>Day Before Surgery</th><th>Morning of Surgery (Fasting)</th><th>Resume After</th></tr></thead><tbody>'+[
    ['Metformin','Continue as normal','<strong style="color:#dc2626">HOLD</strong> on day of surgery if major procedure or contrast used','Resume when eating + eGFR confirmed stable (24–48hr)'],
    ['SGLT2 inhibitors (all)','<strong style="color:#dc2626">STOP 3 days before major surgery</strong>','Do not give — euglycaemic DKA risk under surgical stress','Resume when eating normally + no DKA risk'],
    ['Sulfonylureas','Continue if glucose controlled','<strong style="color:#dc2626">HOLD</strong> — hypoglycaemia risk when fasting','Resume when eating normally'],
    ['DPP-4 inhibitors','Continue','Omit on day of surgery if fasting','Resume when eating'],
    ['GLP-1 receptor agonists','Continue','Omit on day of surgery (delayed gastric emptying — aspiration risk)','Resume when tolerating oral intake'],
    ['Basal insulin (Glargine, Detemir)','Give 80% of usual evening dose','Give 80% of usual dose even if fasting','Continue at adjusted dose; titrate post-op'],
    ['Bolus/short-acting insulin','Normal with meals','<strong style="color:#dc2626">HOLD</strong> if fasting — no meal, no bolus','Resume only when eating. Match to food consumed.'],
    ['Insulin pump (CSII)','Continue basal rate','Continue at 80% basal rate; suspend bolus function until eating','Restore full function when eating normally'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;font-size:12px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:12px;color:#7c3aed">'+r[3]+'</td></tr>';}).join('')+'</tbody></table>'));

  el_.appendChild(card('VRIII — Variable Rate IV Insulin Infusion (Sliding Scale)','#7c3aed','<div style="font-size:13px;color:#374151">'+
    '<div style="font-weight:700;color:#7c3aed;margin-bottom:10px">Indications for VRIII:</div>'+
    ['T1DM for any surgery (always)','T2DM: major surgery, prolonged fasting (>1 meal missed), or BG >12 mmol/L perioperatively','Insulin-treated T2DM for any surgery >1 hour duration','Emergency surgery where glucose cannot be controlled otherwise'].map(function(x){return '<div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #e9d5ff55;font-size:13px"><span style="color:#7c3aed;flex-shrink:0">→</span>'+x+'</div>';}).join('')+
    '<div style="margin-top:12px;font-weight:700;color:#7c3aed;margin-bottom:8px">Standard VRIII Setup:</div>'+
    '<div style="background:#faf5ff;padding:12px;border-radius:8px;margin-bottom:10px">'+
      '<div style="font-size:13px;margin-bottom:8px"><strong>Preparation:</strong> 50 units Actrapid (soluble insulin) in 50ml 0.9% NaCl = <strong>1 unit/ml</strong>. Use a syringe driver.</div>'+
      '<table style="width:100%;font-size:12px"><thead><tr style="background:#e9d5ff"><th>Blood Glucose (mmol/L)</th><th>Blood Glucose (mg/dL)</th><th>Infusion Rate</th></tr></thead><tbody>'+[
        ['< 4.0','< 72','STOP infusion. Give glucose. Recheck in 15 min.'],
        ['4.0 – 6.0','72 – 108','0.5 units/hr'],
        ['6.1 – 8.0','109 – 144','1 unit/hr'],
        ['8.1 – 10.0','145 – 180','2 units/hr (target range)'],
        ['10.1 – 12.0','181 – 216','3 units/hr'],
        ['12.1 – 14.0','217 – 252','4 units/hr'],
        ['> 14.0','> 252','6 units/hr — review with diabetes team'],
      ].map(function(r){var hl=r[2].includes('target');return '<tr class="tbl-row"'+(hl?' style="background:#f0fdf4"':'')+"><td style=\"font-weight:"+(hl?700:400)+";"+(hl?'color:#16a34a':'')+"\">"+r[0]+'</td><td>'+r[1]+'</td><td style="font-size:11px;'+(hl?'color:#16a34a;font-weight:700':'')+'">'+r[2]+'</td></tr>';}).join('')+'</tbody></table>'+
    '</div>'+
    '<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:10px;font-size:12px;color:#78350f">'+
      '<strong>Always co-prescribe:</strong> 5% Glucose 500ml + 0.45% NaCl + 20mmol KCl at 100ml/hr to prevent hypoglycaemia. Recheck glucose every 1–2 hours. Target: 6–10 mmol/L (108–180 mg/dL) intraoperatively.'+
    '</div></div>'));
}

function tabDMT2(el_) {
  el_.appendChild(secTitle('💊','Type 2 Diabetes Treatment','ADA Standards 2024 — stepwise algorithm and comorbidity-driven drug selection','#ef4444'));
  // ── TYPE 1 vs TYPE 2 — Clinical Comparison ──────────────────
  (function(){
    // helper defined FIRST to avoid hoisting issues
    function _cmpRow(label, t1text, t2text, bg1, bg2){
      return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-bottom:2px">'
        +'<div style="background:'+bg1+';padding:9px 12px">'
          +'<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px">'+label+'</div>'
          +'<div style="font-size:12px;color:#1e293b;line-height:1.55">'+t1text+'</div>'
        +'</div>'
        +'<div style="background:'+bg2+';padding:9px 12px">'
          +'<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px">&nbsp;</div>'
          +'<div style="font-size:12px;color:#1e293b;line-height:1.55">'+t2text+'</div>'
        +'</div>'
      +'</div>';
    }
    var cmp = card('Type 1 vs Type 2 DM — Clinical Comparison','#7c3aed','');
    var cb = cmp.querySelector('.card-body');
    cb.innerHTML = [
      '<p style="font-size:13px;color:#64748b;margin-bottom:14px">Understanding the distinction is critical — misclassification leads to wrong treatment. Type 1 requires insulin always; Type 2 may never need it initially.</p>',

      // ── Side-by-side header ──
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;border-radius:10px;overflow:hidden;margin-bottom:12px">',
        '<div style="background:#fef2f2;padding:10px 14px;text-align:center;border-right:2px solid #fff">',
          '<div style="font-size:18px">🩸</div>',
          '<div style="font-size:14px;font-weight:800;color:#dc2626">Type 1 DM</div>',
          '<div style="font-size:10px;color:#64748b;margin-top:2px">Autoimmune · Absolute deficiency</div>',
        '</div>',
        '<div style="background:#fff7ed;padding:10px 14px;text-align:center">',
          '<div style="font-size:18px">💊</div>',
          '<div style="font-size:14px;font-weight:800;color:#ea580c">Type 2 DM</div>',
          '<div style="font-size:10px;color:#64748b;margin-top:2px">Metabolic · Relative deficiency</div>',
        '</div>',
      '</div>',

      // ── Comparison rows ──
      '<div style="display:flex;flex-direction:column;gap:2px">',

      _cmpRow('🧬 Pathophysiology',
        'Autoimmune destruction of pancreatic β-cells → absolute insulin deficiency. HLA-DR3/DR4 association. Often triggered by viral infection or environmental factor.',
        'Progressive insulin resistance + compensatory β-cell exhaustion → relative deficiency. Strongly linked to obesity, physical inactivity, metabolic syndrome.',
        '#fef2f2','#fff7ed'),

      _cmpRow('📅 Age of Onset',
        'Classically childhood/adolescence (<30 yrs), but adult-onset T1DM (LADA) occurs. Any age possible.',
        'Typically >40 yrs, but rising sharply in younger adults and even adolescents due to obesity epidemic.',
        '#fef2f2','#fff7ed'),

      _cmpRow('🧍 Body Habitus',
        'Usually lean or normal weight at diagnosis. Unexplained weight loss is a hallmark presenting feature.',
        'Usually overweight or obese (BMI >25–30). Weight gain precedes diagnosis. Central adiposity typical.',
        '#fef2f2','#fff7ed'),

      _cmpRow('⚡ Onset Speed',
        'Acute to subacute — days to weeks. Symptoms develop rapidly. DKA may be the first presentation.',
        'Insidious — months to years. Often asymptomatic and found incidentally on routine screening.',
        '#fef2f2','#fff7ed'),

      _cmpRow('🩺 Classic Symptoms',
        '<strong>4 Ts:</strong> Thirst (polydipsia) · Toilet (polyuria) · Tiredness (fatigue) · Thinning (weight loss). Nausea/vomiting if DKA developing.',
        'Often none initially. When present: polyuria, polydipsia, blurred vision, recurrent infections (skin, UTI, thrush), slow wound healing, fatigue.',
        '#fef2f2','#fff7ed'),

      _cmpRow('🚨 At Presentation',
        'DKA in 30–40% of new diagnoses. Kussmaul breathing, fruity breath, vomiting, altered consciousness if severe. BG often >250 mg/dL (14 mmol/L).',
        'Hyperosmolar Hyperglycaemic State (HHS) in elderly. DKA rare but possible. BG may be very high (>600 mg/dL, >33 mmol/L) with minimal symptoms.',
        '#fef2f2','#fff7ed'),

      _cmpRow('🔬 Investigations',
        'Low/absent C-peptide (β-cell destruction). Positive autoantibodies: GAD65, IA-2, ZnT8, IAA. HbA1c elevated. Ketones elevated (urine/blood).',
        'Normal or high C-peptide (early). Autoantibodies negative. Fasting insulin often elevated (early resistance). Metabolic syndrome markers: dyslipidaemia, hypertension.',
        '#fef2f2','#fff7ed'),

      _cmpRow('💉 Insulin Dependency',
        '<strong>Always insulin-dependent.</strong> No insulin = DKA and death. Never withhold insulin even during illness or fasting.',
        'Initially insulin-independent. May be controlled with lifestyle alone or oral agents. Insulin needed later if β-cell failure occurs (~50% after 10 yrs).',
        '#fef2f2','#fff7ed'),

      _cmpRow('💊 First-Line Treatment',
        'Basal-bolus insulin regimen (MDI) or insulin pump (CSII). DSMES essential. CGM recommended. No role for Metformin alone.',
        'Lifestyle modification + Metformin. Add agents stepwise based on comorbidities (SGLT2i/GLP-1 RA if CVD, HF, or CKD).',
        '#fef2f2','#fff7ed'),

      _cmpRow('🔗 Associated Conditions',
        'Autoimmune thyroid disease (Hashimoto&#39;s, Graves&#39;) · Coeliac disease · Addison&#39;s disease · Vitiligo. Screen annually for these.',
        'Hypertension · Dyslipidaemia · NAFLD/NASH · PCOS · OSA · Metabolic syndrome. Treat all as part of comprehensive CV risk reduction.',
        '#fef2f2','#fff7ed'),

      _cmpRow('📊 HbA1c Target',
        '<7.0% (53 mmol/mol) in most adults. Individualise — higher targets acceptable if hypoglycaemia-prone or elderly.',
        '<7.0% (53 mmol/mol) standard. <6.5% if safely achievable early in disease. Relax to 7.5–8% in elderly/frail.',
        '#fef2f2','#fff7ed'),

      _cmpRow('⚠️ Main Acute Risk',
        'DKA (Diabetic Ketoacidosis) — life-threatening. NEVER stop insulin. Sick day rules essential.',
        'HHS (Hyperosmolar Hyperglycaemic State) in elderly. Severe hypoglycaemia with sulphonylureas or insulin.',
        '#fef2f2','#fff7ed'),

      '</div>',

      // ── LADA note ──
      '<div style="margin-top:12px;padding:10px 14px;background:#f5f3ff;border-radius:8px;border-left:3px solid #7c3aed">',
        '<div style="font-size:11px;font-weight:700;color:#7c3aed;margin-bottom:4px">⚠️ LADA — Latent Autoimmune Diabetes in Adults</div>',
        '<div style="font-size:12px;color:#1e293b;line-height:1.6">Often misdiagnosed as T2DM. Presents in adults >30 yrs, typically lean, with slower progression to insulin dependence. <strong>Key clue:</strong> poor response to oral agents within 6–12 months. Check <strong>GAD65 antibodies</strong> and C-peptide. Requires insulin eventually — earlier than T2DM.</div>',
      '</div>',

      '<div style="margin-top:12px;padding:10px 14px;background:#f0fdf4;border-radius:8px;border-left:3px solid #16a34a">',
        '<div style="font-size:11px;font-weight:700;color:#16a34a;margin-bottom:4px">💡 MODY — Maturity Onset Diabetes of the Young</div>',
        '<div style="font-size:12px;color:#1e293b;line-height:1.6">Monogenic diabetes — single gene mutation (GCK, HNF1A, HNF4A most common). Family history in 2–3 generations, non-obese, no autoantibodies, normal/high C-peptide. Some forms respond to <strong>sulphonylureas</strong> (HNF1A-MODY) — not insulin. Genetic testing confirms diagnosis.</div>',
      '</div>',

    ].join('');

    el_.appendChild(cmp);
  })();

  var steps=[{c:'#16a34a',l:'Lifestyle + Metformin',d:'All T2DM. DSMES referral. HbA1c recheck in 3 months. Continue Metformin through all steps unless contraindicated.'},{c:'#0891b2',l:'Add 2nd Agent — comorbidity-driven',d:'CVD/High risk → GLP-1 RA or SGLT2i. HF → SGLT2i. CKD → SGLT2i or GLP-1 RA. Obesity → GLP-1 RA. Hypoglycaemia risk → DPP-4i.'},{c:'#f59e0b',l:'Triple Therapy',d:'If HbA1c above target after 3 months on dual therapy. Add 3rd agent from different class. Consider early combination if HbA1c ≥1.5% above target.'},{c:'#ef4444',l:'Insulin Initiation',d:'HbA1c ≥10%, symptomatic hyperglycaemia, or triple oral therapy fails. Add basal insulin. See Insulin Guide tab.'}];
  el_.appendChild(card('Stepwise Treatment Algorithm','#ef4444',steps.map(function(s,i){return '<div style="display:flex;gap:12px;margin-bottom:16px"><div style="display:flex;flex-direction:column;align-items:center"><div class="step-dot" style="background:'+s.c+'">'+(i+1)+'</div>'+(i<3?'<div class="step-line"></div>':'')+'</div><div style="flex:1;padding-bottom:8px"><div style="font-size:11px;font-weight:700;color:'+s.c+';text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Step '+(i+1)+'</div><div style="font-size:14px;font-weight:700;color:#1e293b;margin-bottom:4px">'+s.l+'</div><div style="font-size:13px;color:#475569;line-height:1.5">'+s.d+'</div></div></div>';}).join('')));
  var h3=fromHTML('<h3 style="font-size:15px;font-weight:700;margin:4px 0 10px">💊 Drug Selection by Comorbidity</h3>'); el_.appendChild(h3);
  el_.appendChild(accordion(DM_DRUGS_T2.map(function(d){return{label:'👤 '+d.p,drugs:d.d,note:d.n};}), '#ef4444', function(panel,item){
    panel.innerHTML='<div style="font-size:13px;font-weight:600;margin-bottom:8px;color:#1e293b">'+item.drugs+'</div><div style="font-size:12px;background:#fee2e2;padding:8px 12px;border-radius:8px;color:#7f1d1d">📌 '+item.note+'</div>';
  }));

  // ── GLP-1 RA REFERENCE TABLE ──
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#16a34a">💉 GLP-1 Receptor Agonists — Comparison Table</h3>'));
  el_.appendChild(notebox('🌟 <strong>GLP-1 receptor agonists are now among the most important drugs in T2DM</strong> — they reduce HbA1c, promote weight loss, reduce CV events (SUSTAIN-6, LEADER, REWIND), and reduce CKD progression. Semaglutide (Ozempic/Wegovy) is currently the most potent available. Source: ADA 2024.','#f0fdf4','#bbf7d0'));
  el_.appendChild(card('GLP-1 RA — Agents, Doses, Trials & Key Effects','#16a34a','<table><thead><tr style="background:#f0fdf4"><th>Drug (Brand)</th><th>Route / Freq</th><th>Starting → Max Dose</th><th>Key CV Trial</th><th>HbA1c ↓</th><th>Weight ↓</th><th>Key Notes</th></tr></thead><tbody>'+[
    ['Semaglutide SC<br><span style="font-size:10px;color:#64748b">Ozempic</span>','SC Weekly','0.25mg → 0.5mg → 1mg → 2mg<br><span style="font-size:10px">Titrate every 4 wks</span>','SUSTAIN-6: ↓ MACE 26%, ↓CV death, MI, stroke in high CV risk T2DM','~1.5–1.8%','~4–6 kg','Most potent GLP-1 for glucose and weight. Inject abdomen/thigh/arm.'],
    ['Semaglutide oral<br><span style="font-size:10px;color:#64748b">Rybelsus</span>','Oral Daily','3mg OD → 7mg → 14mg<br><span style="font-size:10px">Titrate every 4 wks</span>','PIONEER 6: CV non-inferiority confirmed','~1.2–1.5%','~3–4 kg','Take 30 min before any food/drink with small sip of water only. No other meds at same time.'],
    ['Liraglutide<br><span style="font-size:10px;color:#64748b">Victoza</span>','SC Daily','0.6mg OD (1wk) → 1.2mg → 1.8mg','LEADER: ↓CV death 22%, ↓MI, ↓CKD progression in high-risk T2DM','~1.0–1.5%','~3–4 kg','First GLP-1 with proven CV mortality benefit. Also licensed for weight management (3mg — Saxenda).'],
    ['Dulaglutide<br><span style="font-size:10px;color:#64748b">Trulicity</span>','SC Weekly','0.75mg → 1.5mg → 3mg → 4.5mg<br><span style="font-size:10px">Titrate every 4 wks</span>','REWIND: ↓MACE 12% — notable as included lower-risk patients (primary prevention)','~1.2–1.5%','~3 kg','Easy auto-injector pen. Useful for patients with injection anxiety. No refrigeration needed after opening.'],
    ['Exenatide<br><span style="font-size:10px;color:#64748b">Byetta / Bydureon</span>','SC BD (Byetta)<br>SC Weekly (Bydureon)','5mcg BD → 10mcg BD (Byetta)<br>2mg weekly (Bydureon)','EXSCEL: CV neutral (non-inferiority)','~0.8–1.2%','~2–3 kg','Oldest GLP-1 RA. Less potent than semaglutide. Avoid if eGFR <30 (Byetta) / eGFR <45 (Bydureon).'],
    ['Lixisenatide<br><span style="font-size:10px;color:#64748b">Lyxumia</span>','SC Daily','10mcg OD → 20mcg OD<br><span style="font-size:10px">Titrate after 2 wks</span>','ELIXA: CV neutral. Mainly postprandial effect.','~0.7–1.0%','~1–2 kg','Primarily reduces postprandial glucose (short-acting). Less renal restriction vs exenatide.'],
  ].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#16a34a;font-size:12px">'+r[0]+'</td><td style="font-size:12px">'+r[1]+'</td><td style="font-size:12px">'+r[2]+'</td><td style="font-size:11px;color:#0891b2">'+r[3]+'</td><td style="font-weight:700;color:#16a34a;font-size:12px">'+r[4]+'</td><td style="font-weight:700;color:#d97706;font-size:12px">'+r[5]+'</td><td style="font-size:11px">'+r[6]+'</td></tr>';}).join('')+'</tbody></table><p style="font-size:11px;color:#64748b;margin-top:8px">All GLP-1 RAs: common side effects are nausea, vomiting, diarrhoea (usually transient, improve with slow titration). Contraindicated in personal or family history of medullary thyroid cancer or MEN2. Stop if suspected pancreatitis (severe persistent abdominal pain).</p>'));
}

function tabDMT1(el_) {
  el_.appendChild(secTitle('🩸','Type 1 Diabetes','Comprehensive T1DM management — insulin, monitoring, DKA, and ongoing care','#dc2626'));
  // ── TYPE 1 vs TYPE 2 — Clinical Comparison ──────────────────
  (function(){
    // helper defined FIRST to avoid hoisting issues
    function _cmpRow(label, t1text, t2text, bg1, bg2){
      return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-bottom:2px">'
        +'<div style="background:'+bg1+';padding:9px 12px">'
          +'<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px">'+label+'</div>'
          +'<div style="font-size:12px;color:#1e293b;line-height:1.55">'+t1text+'</div>'
        +'</div>'
        +'<div style="background:'+bg2+';padding:9px 12px">'
          +'<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px">&nbsp;</div>'
          +'<div style="font-size:12px;color:#1e293b;line-height:1.55">'+t2text+'</div>'
        +'</div>'
      +'</div>';
    }
    var cmp = card('Type 1 vs Type 2 DM — Clinical Comparison','#7c3aed','');
    var cb = cmp.querySelector('.card-body');
    cb.innerHTML = [
      '<p style="font-size:13px;color:#64748b;margin-bottom:14px">Understanding the distinction is critical — misclassification leads to wrong treatment. Type 1 requires insulin always; Type 2 may never need it initially.</p>',

      // ── Side-by-side header ──
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;border-radius:10px;overflow:hidden;margin-bottom:12px">',
        '<div style="background:#fef2f2;padding:10px 14px;text-align:center;border-right:2px solid #fff">',
          '<div style="font-size:18px">🩸</div>',
          '<div style="font-size:14px;font-weight:800;color:#dc2626">Type 1 DM</div>',
          '<div style="font-size:10px;color:#64748b;margin-top:2px">Autoimmune · Absolute deficiency</div>',
        '</div>',
        '<div style="background:#fff7ed;padding:10px 14px;text-align:center">',
          '<div style="font-size:18px">💊</div>',
          '<div style="font-size:14px;font-weight:800;color:#ea580c">Type 2 DM</div>',
          '<div style="font-size:10px;color:#64748b;margin-top:2px">Metabolic · Relative deficiency</div>',
        '</div>',
      '</div>',

      // ── Comparison rows ──
      '<div style="display:flex;flex-direction:column;gap:2px">',

      _cmpRow('🧬 Pathophysiology',
        'Autoimmune destruction of pancreatic β-cells → absolute insulin deficiency. HLA-DR3/DR4 association. Often triggered by viral infection or environmental factor.',
        'Progressive insulin resistance + compensatory β-cell exhaustion → relative deficiency. Strongly linked to obesity, physical inactivity, metabolic syndrome.',
        '#fef2f2','#fff7ed'),

      _cmpRow('📅 Age of Onset',
        'Classically childhood/adolescence (<30 yrs), but adult-onset T1DM (LADA) occurs. Any age possible.',
        'Typically >40 yrs, but rising sharply in younger adults and even adolescents due to obesity epidemic.',
        '#fef2f2','#fff7ed'),

      _cmpRow('🧍 Body Habitus',
        'Usually lean or normal weight at diagnosis. Unexplained weight loss is a hallmark presenting feature.',
        'Usually overweight or obese (BMI >25–30). Weight gain precedes diagnosis. Central adiposity typical.',
        '#fef2f2','#fff7ed'),

      _cmpRow('⚡ Onset Speed',
        'Acute to subacute — days to weeks. Symptoms develop rapidly. DKA may be the first presentation.',
        'Insidious — months to years. Often asymptomatic and found incidentally on routine screening.',
        '#fef2f2','#fff7ed'),

      _cmpRow('🩺 Classic Symptoms',
        '<strong>4 Ts:</strong> Thirst (polydipsia) · Toilet (polyuria) · Tiredness (fatigue) · Thinning (weight loss). Nausea/vomiting if DKA developing.',
        'Often none initially. When present: polyuria, polydipsia, blurred vision, recurrent infections (skin, UTI, thrush), slow wound healing, fatigue.',
        '#fef2f2','#fff7ed'),

      _cmpRow('🚨 At Presentation',
        'DKA in 30–40% of new diagnoses. Kussmaul breathing, fruity breath, vomiting, altered consciousness if severe. BG often >250 mg/dL (14 mmol/L).',
        'Hyperosmolar Hyperglycaemic State (HHS) in elderly. DKA rare but possible. BG may be very high (>600 mg/dL, >33 mmol/L) with minimal symptoms.',
        '#fef2f2','#fff7ed'),

      _cmpRow('🔬 Investigations',
        'Low/absent C-peptide (β-cell destruction). Positive autoantibodies: GAD65, IA-2, ZnT8, IAA. HbA1c elevated. Ketones elevated (urine/blood).',
        'Normal or high C-peptide (early). Autoantibodies negative. Fasting insulin often elevated (early resistance). Metabolic syndrome markers: dyslipidaemia, hypertension.',
        '#fef2f2','#fff7ed'),

      _cmpRow('💉 Insulin Dependency',
        '<strong>Always insulin-dependent.</strong> No insulin = DKA and death. Never withhold insulin even during illness or fasting.',
        'Initially insulin-independent. May be controlled with lifestyle alone or oral agents. Insulin needed later if β-cell failure occurs (~50% after 10 yrs).',
        '#fef2f2','#fff7ed'),

      _cmpRow('💊 First-Line Treatment',
        'Basal-bolus insulin regimen (MDI) or insulin pump (CSII). DSMES essential. CGM recommended. No role for Metformin alone.',
        'Lifestyle modification + Metformin. Add agents stepwise based on comorbidities (SGLT2i/GLP-1 RA if CVD, HF, or CKD).',
        '#fef2f2','#fff7ed'),

      _cmpRow('🔗 Associated Conditions',
        'Autoimmune thyroid disease (Hashimoto&#39;s, Graves&#39;) · Coeliac disease · Addison&#39;s disease · Vitiligo. Screen annually for these.',
        'Hypertension · Dyslipidaemia · NAFLD/NASH · PCOS · OSA · Metabolic syndrome. Treat all as part of comprehensive CV risk reduction.',
        '#fef2f2','#fff7ed'),

      _cmpRow('📊 HbA1c Target',
        '<7.0% (53 mmol/mol) in most adults. Individualise — higher targets acceptable if hypoglycaemia-prone or elderly.',
        '<7.0% (53 mmol/mol) standard. <6.5% if safely achievable early in disease. Relax to 7.5–8% in elderly/frail.',
        '#fef2f2','#fff7ed'),

      _cmpRow('⚠️ Main Acute Risk',
        'DKA (Diabetic Ketoacidosis) — life-threatening. NEVER stop insulin. Sick day rules essential.',
        'HHS (Hyperosmolar Hyperglycaemic State) in elderly. Severe hypoglycaemia with sulphonylureas or insulin.',
        '#fef2f2','#fff7ed'),

      '</div>',

      // ── LADA note ──
      '<div style="margin-top:12px;padding:10px 14px;background:#f5f3ff;border-radius:8px;border-left:3px solid #7c3aed">',
        '<div style="font-size:11px;font-weight:700;color:#7c3aed;margin-bottom:4px">⚠️ LADA — Latent Autoimmune Diabetes in Adults</div>',
        '<div style="font-size:12px;color:#1e293b;line-height:1.6">Often misdiagnosed as T2DM. Presents in adults >30 yrs, typically lean, with slower progression to insulin dependence. <strong>Key clue:</strong> poor response to oral agents within 6–12 months. Check <strong>GAD65 antibodies</strong> and C-peptide. Requires insulin eventually — earlier than T2DM.</div>',
      '</div>',

      '<div style="margin-top:12px;padding:10px 14px;background:#f0fdf4;border-radius:8px;border-left:3px solid #16a34a">',
        '<div style="font-size:11px;font-weight:700;color:#16a34a;margin-bottom:4px">💡 MODY — Maturity Onset Diabetes of the Young</div>',
        '<div style="font-size:12px;color:#1e293b;line-height:1.6">Monogenic diabetes — single gene mutation (GCK, HNF1A, HNF4A most common). Family history in 2–3 generations, non-obese, no autoantibodies, normal/high C-peptide. Some forms respond to <strong>sulphonylureas</strong> (HNF1A-MODY) — not insulin. Genetic testing confirms diagnosis.</div>',
      '</div>',

    ].join('');

    el_.appendChild(cmp);
  })();

  el_.appendChild(notebox('🩸 All patients with Type 1 DM require <strong>insulin therapy</strong> — oral agents alone are never appropriate for T1DM. Autoimmune beta-cell destruction leads to absolute insulin deficiency.','#fef2f2','#fecaca'));

  // ── SICK DAY RULES (high priority addition) ──
  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:12px 0 10px;color:#dc2626">🤒 T1DM Sick Day Rules — DKA Prevention</h3>'));
  el_.appendChild(notebox('⚡ <strong>Most preventable DKA admissions happen because insulin is stopped during illness.</strong> Insulin requirements INCREASE during illness due to stress hormones raising glucose. Never stop insulin. Source: JBDS / ADA 2024.','#fef2f2','#fecaca'));
  el_.appendChild(card('Sick Day Rules — The Essential 6','#dc2626','<div style="font-size:13px;color:#374151">'+[
    {n:'1',col:'#dc2626',t:'NEVER stop insulin — not even if not eating',c:'Illness triggers stress hormones (cortisol, adrenaline) that raise blood glucose even without eating. Stopping insulin leads to DKA within hours. If not eating: continue background/basal insulin at usual dose. Consider reducing rapid-acting (bolus) by 20–50% if glucose is low.'},
    {n:'2',col:'#0ea5e9',t:'Check blood glucose every 2–4 hours',c:'Illness dramatically increases glucose variability. Standard pre-meal checking is insufficient. Check every 2–4 hours, including through the night. Contact diabetes team if glucose >15 mmol/L (270 mg/dL) and not coming down.'},
    {n:'3',col:'#d97706',t:'Check ketones if glucose >14 mmol/L (250 mg/dL)',c:'<strong>Ketone action guide:</strong><br>• &lt;0.6 mmol/L — Normal. Continue usual care.<br>• 0.6–1.4 mmol/L — Increased. Increase fluids. Give extra rapid-acting insulin (correction dose). Recheck in 1–2 hours.<br>• 1.5–3.0 mmol/L — HIGH. Extra insulin, aggressive hydration, contact diabetes team / go to hospital.<br>• &gt;3.0 mmol/L — DANGEROUS. Emergency attendance required — likely DKA.'},
    {n:'4',col:'#16a34a',t:'Stay hydrated — minimum 3 litres/day',c:'Aim for 200ml fluid per hour whilst unwell. Alternate sugary and sugar-free drinks to prevent hypoglycaemia if not eating. Glucose drinks (e.g. Lucozade) if glucose is falling and unable to eat. If vomiting makes oral hydration impossible — go to hospital immediately.'},
    {n:'5',col:'#7c3aed',t:'Know when to seek emergency care',c:'<strong>Call 999 / Go to A&E immediately if:</strong><br>• Vomiting >1–2 times (cannot keep fluids down)<br>• Ketones >3.0 mmol/L despite extra insulin<br>• Blood glucose persistently >22 mmol/L<br>• Drowsiness, confusion, or altered consciousness<br>• Kussmaul breathing (deep, sighing respirations)<br>• Fruity/acetone breath<br>• Unable to manage alone'},
    {n:'6',col:'#ea580c',t:'Treat the underlying illness',c:'Identify and treat the cause: fever → paracetamol (safer than ibuprofen in DM), infection → antibiotics if bacterial, vomiting → antiemetics. Gastroenteritis is the most common trigger of sick day emergencies. Contact GP or diabetes nurse if unwell for >24 hours without improvement.'},
  ].map(function(s){return '<div style="display:flex;gap:12px;padding:11px 0;border-bottom:1px solid #fecaca44;align-items:flex-start"><div style="width:26px;height:26px;border-radius:50%;background:'+s.col+';color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+s.n+'</div><div><div style="font-weight:700;color:'+s.col+';margin-bottom:3px">'+s.t+'</div><div style="font-size:12px;line-height:1.65">'+s.c+'</div></div></div>';}).join('')+'</div>'));

  el_.appendChild(fromHTML('<h3 style="font-size:15px;font-weight:800;margin:20px 0 10px;color:#dc2626">📋 T1DM Management Steps</h3>'));
  var sBtns=fromHTML('<div style="display:flex;gap:6px;flex-wrap:wrap;margin:14px 0"></div>');
  var sPanel=card(null,'#dc2626','<div id="t1-panel" style="font-size:13px;color:#94a3b8">Select a step above to view details.</div>',{borderColor:'#fecaca'});
  T1_STEPS.forEach(function(s,i){
    var b=fromHTML('<button style="padding:6px 14px;border-radius:20px;border:none;font-size:12px;font-weight:700;background:#fee2e2;color:#991b1b;cursor:pointer">Step '+(i+1)+'</button>');
    b.onclick=function(){
      sBtns.querySelectorAll('button').forEach(function(bb){bb.style.background='#fee2e2';bb.style.color='#991b1b';});
      b.style.background='#dc2626';b.style.color='#fff';
      document.getElementById('t1-panel').innerHTML='<div style="font-size:14px;font-weight:700;color:#dc2626;margin-bottom:8px">Step '+(i+1)+': '+s.t+'</div><div style="font-size:13px;color:#374151;line-height:1.7">'+s.c+'</div>';
    };
    sBtns.appendChild(b);
  });
  el_.appendChild(sBtns); el_.appendChild(sPanel);
  el_.appendChild(fromHTML('<div style="display:flex;align-items:center;gap:6px;margin:4px 0 10px"><span style="font-size:12px;color:#94a3b8;font-style:italic">Tap each step for full details — 8 steps covering all aspects of T1DM management</span></div>'));
  el_.appendChild(card('T1DM vs T2DM — Key Differences','#dc2626','<table><thead><tr style="background:#fef2f2"><th>Feature</th><th style="color:#dc2626">Type 1 DM</th><th style="color:#d97706">Type 2 DM</th></tr></thead><tbody>'+[['Mechanism','Autoimmune beta-cell destruction','Insulin resistance + relative insulin deficiency'],['Age of onset','Typically <30 (any age possible)','Typically >40 (increasingly younger)'],['BMI','Usually normal or low','Usually overweight or obese'],['Insulin','Absolute deficiency — always required','Relative deficiency — may not need initially'],['Onset','Often acute (days-weeks)','Gradual (years — often asymptomatic)'],['Autoantibodies','GAD65, IA-2, ZnT8, IAA — positive','Usually negative'],['C-peptide','Low or undetectable','Normal or elevated (initially)'],['DKA risk','High','Low (HHS is more common)'],['Genetic','HLA-linked (DR3, DR4)','Polygenic + lifestyle'],['Oral agents','Not effective as monotherapy','First-line treatment']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="color:#dc2626">'+r[1]+'</td><td style="color:#d97706">'+r[2]+'</td></tr>';}).join('')+'</tbody></table>'));
}

function tabHbA1c(el_) {
  el_.appendChild(secTitle('📐','HbA1c Targets & Converter','Personalised glycaemic goals and HbA1c to estimated average glucose','#7c3aed'));
  var c=card('HbA1c → Estimated Average Glucose (eAG) Converter','#7c3aed','');
  c.querySelector('.card-body').innerHTML='<p style="font-size:13px;color:#64748b;margin-bottom:12px">Formula: eAG (mg/dL) = 28.7 × HbA1c − 46.7 (ADA / IFCC correlation)</p><div style="display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap"><div><label class="lbl">HbA1c (%)</label><input id="hb-v" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" style="width:110px" placeholder="e.g. 7.2" oninput="updateEAG()"></div><div id="eag-res"></div></div>';
  el_.appendChild(c);
  window.updateEAG=function(){var v=parseFloat(document.getElementById('hb-v').value),eag=isNaN(v)?null:hba1cToEAG(v);document.getElementById('eag-res').innerHTML=eag!==null?'<div style="padding:12px 20px;background:#faf5ff;border:2px solid #7c3aed;border-radius:10px;text-align:center"><div style="font-size:11px;color:#7c3aed;font-weight:700;text-transform:uppercase">eAG</div><div style="font-size:24px;font-weight:900;color:#7c3aed">'+eag+'</div><div style="font-size:11px;color:#94a3b8">mg/dL</div></div>':'';};
  el_.appendChild(card('HbA1c Targets by Patient Profile (ADA 2024)','#7c3aed','<table><thead><tr style="background:#faf5ff"><th>Patient Profile</th><th>HbA1c Target</th><th>eAG</th><th>Rationale</th></tr></thead><tbody>'+HBA1C_TARGETS.map(function(h){return '<tr class="tbl-row"><td style="font-weight:600">'+h.p+'</td><td style="font-weight:800;color:#7c3aed">'+h.t+'</td><td style="color:#64748b">'+h.egv+'</td><td style="font-size:12px">'+h.r+'</td></tr>';}).join('')+'</tbody></table>'));
  el_.appendChild(card('Glucose Monitoring Targets (Non-Pregnant Adults)','#7c3aed','<table><thead><tr style="background:#faf5ff"><th>Timing</th><th>Target (mg/dL)</th><th>Target (mmol/L)</th></tr></thead><tbody>'+[['Fasting / Pre-meal','80–130','4.4–7.2'],['2-hr Post-meal','<180','<10.0'],['Bedtime','100–140','5.6–7.8'],['CGM Time-in-Range (TIR)','≥70% of readings (70–180 mg/dL)','—'],['CGM Time Below Range','<4% of readings (<70 mg/dL)','—'],['CGM Time Above Range','<25% of readings (>180 mg/dL)','—']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:600">'+r[0]+'</td><td style="font-weight:700;color:#7c3aed">'+r[1]+'</td><td>'+r[2]+'</td></tr>';}).join('')+'</tbody></table>'));
}

function tabInsulin(el_) {
  el_.appendChild(secTitle('💉','Insulin Guide','Types, initiation, titration protocol, and hypoglycaemia management','#dc2626'));
  el_.appendChild(card('Insulin Types — Onset, Peak, Duration','#dc2626','<div style="overflow-x:auto"><table><thead><tr style="background:#fef2f2"><th>Type</th><th>Examples</th><th>Onset</th><th>Peak</th><th>Duration</th><th>Primary Use</th></tr></thead><tbody>'+INSULIN_TYPES.map(function(t){return '<tr class="tbl-row"><td style="font-weight:700">'+t.type+'</td><td style="font-size:11px">'+t.eg+'</td><td>'+t.onset+'</td><td>'+t.peak+'</td><td>'+t.dur+'</td><td style="font-size:11px;color:#7c3aed;font-weight:600">'+t.use+'</td></tr>';}).join('')+'</tbody></table></div>'));
  el_.appendChild(accordion([
    {t:'💉 When to Initiate Insulin',html:'<div style="font-weight:700;color:#dc2626;margin-bottom:8px;font-size:13px">Initiate insulin when:</div>'+['HbA1c ≥10% at diagnosis with symptoms of hyperglycaemia','Triple oral therapy fails to achieve target after 3–6 months','Symptomatic hyperglycaemia (polyuria, polydipsia, weight loss)','Hospitalisation or perioperative period','Pregnancy with uncontrolled diabetes','Type 1 DM (always — absolute deficiency)'].map(function(i){return '<div style="display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #fecaca55;font-size:13px"><span style="color:#dc2626">→</span>'+i+'</div>';}).join('')},
    {t:'⚖️ Starting Dose Calculator',html:'<p style="font-size:13px;color:#64748b;margin-bottom:10px">Basal insulin starting dose: 0.1–0.2 units/kg/day (conservative start)</p><div style="display:flex;align-items:flex-end;gap:12px;margin-bottom:12px"><div><label class="lbl">Patient Weight (kg)</label><input id="ins-wt" type="text" inputmode="decimal" pattern="[0-9.]*" class="inp" style="width:100px" placeholder="e.g. 80" oninput="calcInsDose()"></div><div id="ins-dose"></div></div><div class="notebox" style="background:#fef2f2;border:1px solid #fecaca">Always confirm dose with prescribing clinician. Starting dose is intentionally conservative — titrate up based on fasting glucose response over days.</div>'},
    {t:'📈 Titration — 2-2-2 Rule (Fasting-Guided)',html:'<div style="font-weight:700;margin-bottom:10px;font-size:13px">Adjust basal insulin every 3 days based on fasting glucose:</div>'+[['Fasting >180 mg/dL (>10 mmol/L)','↑ Increase by 4 units','#dc2626'],['Fasting 140–180 mg/dL (7.8–10)','↑ Increase by 2 units','#f97316'],['Fasting 80–130 mg/dL (4.4–7.2)','✓ No change — at target','#16a34a'],['Fasting 60–80 mg/dL (3.3–4.4)','↓ Decrease by 2 units','#d97706'],['Fasting <60 mg/dL (<3.3)','↓ Decrease by 4 units — investigate cause','#dc2626']].map(function(r){return '<div style="display:flex;justify-content:space-between;padding:9px 12px;margin-bottom:4px;background:#fafafa;border-radius:8px;border-left:4px solid '+r[2]+';flex-wrap:wrap;gap:6px"><span style="font-size:13px">'+r[0]+'</span><span style="font-size:13px;font-weight:700;color:'+r[2]+'">'+r[1]+'</span></div>';}).join('')+'<div class="notebox" style="background:#fffbeb;border:1px solid #fde68a;margin-top:8px">If hypoglycaemia occurs at any time, reduce dose by 10–20% and investigate the cause before re-titrating upward.</div>'},
    {t:'🆘 Hypoglycaemia Protocol',html:'<div style="padding:14px;background:#fef2f2;border:2px solid #fecaca;border-radius:10px;margin-bottom:12px"><div style="font-weight:700;color:#dc2626;margin-bottom:6px;font-size:13px">Mild–Moderate (BG <70 mg/dL, conscious): 15-15 Rule</div><div style="font-size:13px;color:#374151;line-height:1.7">1. Give 15g fast-acting carbohydrate (4 glucose tablets, 150ml orange juice, 6 jelly beans)<br>2. Recheck blood glucose in 15 minutes<br>3. If still &lt;70 mg/dL — repeat<br>4. Once normalised — eat a snack if next meal is &gt;1 hour away<br>5. Document and review — consider reducing insulin dose</div></div><div style="padding:14px;background:#faf5ff;border:2px solid #e9d5ff;border-radius:10px"><div style="font-weight:700;color:#7c3aed;margin-bottom:6px;font-size:13px">Severe (unconscious / unable to swallow / seizing)</div><div style="font-size:13px;color:#374151;line-height:1.7">• <strong>IM glucagon 1mg</strong> (GlucaGen kit) — inject into thigh, upper arm, or buttock<br>• <strong>Nasal glucagon 3mg</strong> (Baqsimi) — no injection needed; one spray into one nostril<br>• <strong>IV access:</strong> 50% dextrose 25–50ml IV push (if in hospital)<br>• Call emergency services (000 / 911 / 999)<br>• <strong>Do NOT give food or drink</strong> to an unconscious person<br>• Recheck glucose in 10–15 minutes; repeat glucagon if no response</div></div>'},
  ].map(function(s){return{label:s.t,html:s.html};}), '#dc2626', function(panel,item){panel.innerHTML=item.html;}));
  window.calcInsDose=function(){var wt=parseFloat(document.getElementById('ins-wt').value),d=document.getElementById('ins-dose');if(isNaN(wt)){d.innerHTML='';return;}var dose=Math.round(wt*0.1);d.innerHTML='<div style="padding:12px 16px;background:#fef2f2;border:2px solid #fecaca;border-radius:10px;text-align:center"><div style="font-size:11px;color:#dc2626;font-weight:700">Starting Dose</div><div style="font-size:22px;font-weight:900;color:#dc2626">'+dose+' units</div><div style="font-size:11px;color:#94a3b8">at bedtime (0.1 u/kg)</div></div>';};
}

function tabComplications(el_) {
  el_.appendChild(secTitle('🔗','Diabetic Complications','Screening, monitoring, and management of long-term complications','#0891b2'));
  var icns=['👁️','🫘','🦶','❤️','🧠','🦷','🦵','🧠'];
  var names=['Retinopathy','Nephropathy','Peripheral Neuropathy','Cardiovascular Disease','Autonomic Neuropathy','Dental Disease'];
  var colors=['#0891b2','#16a34a','#f59e0b','#dc2626','#7c3aed','#f97316'];
  var details=['Leading cause of preventable blindness in working-age adults. Annual dilated fundoscopy. Anti-VEGF (ranibizumab, bevacizumab) or laser photocoagulation for proliferative retinopathy.','Screen with urine ACR + eGFR annually. ACE/ARB if ACR >30mg/g. SGLT2i adds independent renoprotection (CREDENCE trial). BP target <130/80.','Annual monofilament + 128Hz vibration. Daily foot inspection. Therapeutic footwear. Podiatry for any callus, deformity, or ulcer. Off-loading devices for plantar ulcers.','DM doubles CV risk. Statin if ≥40yo + DM. BP <130/80. GLP-1 RA or SGLT2i reduce MACE in established CVD. Low-dose aspirin if high CV risk.','Orthostatic hypotension, gastroparesis, erectile dysfunction, anhidrosis. See Hypotension module for OH management. Metoclopramide or domperidone for gastroparesis.','Periodontal disease bidirectionally worsens glycaemic control. Dental exam every 6 months. Counsel on thorough oral hygiene. Treat periodontal disease aggressively.'];
  var bgs=['#f0f9ff','#f0fdf4','#fffbeb','#fef2f2','#faf5ff','#fff7ed'];
  var g=fromHTML('<div class="g2" style="margin-bottom:16px"></div>');
  names.forEach(function(_,i){g.appendChild(fromHTML('<div style="padding:16px;border-radius:12px;border-left:4px solid '+colors[i]+';background:'+bgs[i]+';border:1px solid '+colors[i]+'22;border-left:4px solid '+colors[i]+'"><div style="font-size:24px;margin-bottom:6px">'+icns[i]+'</div><div style="font-size:14px;font-weight:700;color:'+colors[i]+';margin-bottom:4px">'+names[i]+'</div><div style="font-size:12px;color:#374151;line-height:1.5">'+details[i]+'</div></div>'));});
  el_.appendChild(g);
  el_.appendChild(card('Diabetic Foot Risk Classification','#f59e0b','<table><thead><tr style="background:#fffbeb"><th>Risk</th><th>Features</th><th>Action</th><th>Review Freq</th></tr></thead><tbody>'+[['0 — Low','Intact sensation, no deformity, adequate circulation','Foot care education, appropriate footwear','Annually'],['1 — Moderate','Loss of protective sensation OR peripheral arterial disease','Podiatry referral, therapeutic footwear','Every 3–6 months'],['2 — High','LOPS + PAD OR prior ulcer or amputation','Specialist podiatry, vascular surgery assessment','Every 1–3 months'],['3 — Active Disease','Active ulcer, infection, or Charcot joint','Immediate multidisciplinary team referral','Urgent']].map(function(r){return '<tr class="tbl-row"><td style="font-weight:700;color:#92400e">'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td style="color:#d97706;font-weight:600">'+r[3]+'</td></tr>';}).join('')+'</tbody></table>'));
}

