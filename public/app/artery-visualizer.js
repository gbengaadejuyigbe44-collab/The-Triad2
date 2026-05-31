function renderArteryVisualizer(el_) {
  var vc = document.createElement('div');
  vc.style.cssText = 'margin-top:18px;';

  var title = document.createElement('div');
  title.style.cssText = 'font-size:15px;font-weight:700;color:#475569;margin-bottom:4px;display:flex;align-items:center;gap:8px;';
  title.innerHTML = '🫀 Vascular Impact Visualizer';

  var sub = document.createElement('div');
  sub.style.cssText = 'font-size:12px;color:#94a3b8;margin-bottom:14px;';
  sub.textContent = 'Adjust the sliders to see how BP, blood sugar and heart rate affect the artery in real time.';

  vc.appendChild(title);
  vc.appendChild(sub);

  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start;';

  var ctrl = document.createElement('div');
  ctrl.style.cssText = 'flex:1;min-width:220px;max-width:300px;display:flex;flex-direction:column;gap:18px;';

  function sliderGroup(label, id, min, max, val, step, unit) {
    var g = document.createElement('div');
    g.style.cssText = 'display:flex;flex-direction:column;gap:5px;';
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;justify-content:space-between;align-items:baseline;';
    var lbl = document.createElement('span');
    lbl.style.cssText = 'font-size:13px;color:#64748b;';
    lbl.textContent = label;
    var vEl = document.createElement('span');
    vEl.style.cssText = 'font-size:14px;font-weight:700;color:#1e293b;min-width:70px;text-align:right;';
    vEl.id = id + '-disp';
    vEl.textContent = val + ' ' + unit;
    row.appendChild(lbl);
    row.appendChild(vEl);
    var inp = document.createElement('input');
    inp.type = 'range'; inp.id = id; inp.min = min; inp.max = max;
    inp.value = val; inp.step = step;
    inp.style.cssText = 'width:100%;accent-color:#0ea5e9;';
    g.appendChild(row);
    g.appendChild(inp);
    return g;
  }

  var sysG = sliderGroup('Systolic BP',    'av-sys', 90,  220, 120, 1, 'mmHg');
  var diaG = sliderGroup('Diastolic BP',   'av-dia', 60,  140, 80,  1, 'mmHg');
  var bsG  = sliderGroup('Fasting glucose','av-bs',  40,  250, 50,  1, 'mmol/L');
  var bpmG = sliderGroup('Heart rate',     'av-bpm', 40,  180, 72,  1, 'bpm');

  var sec1 = document.createElement('div');
  sec1.style.cssText = 'font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:-8px;';
  sec1.textContent = 'Blood Pressure';

  var sec2 = document.createElement('div');
  sec2.style.cssText = 'border-top:0.5px solid #e2e8f0;padding-top:8px;font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:-8px;';
  sec2.textContent = 'Blood Sugar';

  var sec3 = document.createElement('div');
  sec3.style.cssText = 'border-top:0.5px solid #e2e8f0;padding-top:8px;';

  var bpmSecLabel = document.createElement('div');
  bpmSecLabel.style.cssText = 'font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:-8px;';
  bpmSecLabel.textContent = '❤️ Pulse Rate';

  var bpmTag = document.createElement('div');
  bpmTag.id = 'av-bpm-tag';
  bpmTag.style.cssText = 'display:inline-block;margin-top:6px;font-size:11px;font-weight:600;padding:2px 10px;border-radius:20px;background:#f0fdf4;color:#16a34a;transition:all .3s;';
  bpmTag.textContent = 'Normal';

  sec3.appendChild(bpmSecLabel);
  sec3.appendChild(bpmG);
  sec3.appendChild(bpmTag);

  var statsRow = document.createElement('div');
  statsRow.style.cssText = 'display:flex;gap:8px;border-top:0.5px solid #e2e8f0;padding-top:12px;';

  function statCard(label, id) {
    var c = document.createElement('div');
    c.style.cssText = 'flex:1;background:#f8fafc;border-radius:8px;padding:8px;text-align:center;';
    var l = document.createElement('div');
    l.style.cssText = 'font-size:10px;color:#94a3b8;margin-bottom:2px;';
    l.textContent = label;
    var v = document.createElement('div');
    v.style.cssText = 'font-size:13px;font-weight:700;color:#1e293b;';
    v.id = id;
    v.textContent = '—';
    c.appendChild(l);
    c.appendChild(v);
    return c;
  }

  statsRow.appendChild(statCard('Wall',  'av-wall-stat'));
  statsRow.appendChild(statCard('Lumen', 'av-lumen-stat'));
  statsRow.appendChild(statCard('PP',    'av-pp-stat'));

  var riskBox = document.createElement('div');
  riskBox.id = 'av-risk-box';
  riskBox.style.cssText = 'border-radius:10px;padding:10px 16px;text-align:center;border:0.5px solid #bbf7d0;background:#f0fdf4;transition:all .4s;';
  riskBox.innerHTML = '<div style="font-size:10px;color:#94a3b8;letter-spacing:.08em;text-transform:uppercase;margin-bottom:3px;">Combined risk</div><div id="av-risk-val" style="font-size:17px;font-weight:700;color:#16a34a;transition:color .3s;">Normal</div>';

  ctrl.appendChild(sec1);
  ctrl.appendChild(sysG);
  ctrl.appendChild(diaG);
  ctrl.appendChild(sec2);
  ctrl.appendChild(bsG);
  ctrl.appendChild(sec3);
  ctrl.appendChild(statsRow);
  ctrl.appendChild(riskBox);

  // ── SVG ───────────────────────────────────────────────────────
  var vizDiv = document.createElement('div');
  vizDiv.style.cssText = 'flex:1;min-width:240px;display:flex;flex-direction:column;align-items:center;gap:10px;';

  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 280 280');
  svg.style.cssText = 'width:100%;max-width:280px;';

  var defs = document.createElementNS(NS, 'defs');
  var rg = document.createElementNS(NS, 'radialGradient');
  rg.id = 'av-lg';
  rg.setAttribute('cx','50%'); rg.setAttribute('cy','50%'); rg.setAttribute('r','50%');
  var gs1 = document.createElementNS(NS,'stop');
  gs1.setAttribute('offset','0%'); gs1.setAttribute('stop-color','#bfdbfe'); gs1.setAttribute('stop-opacity','0.8');
  var gs2 = document.createElementNS(NS,'stop');
  gs2.setAttribute('offset','100%'); gs2.setAttribute('stop-color','#93c5fd'); gs2.setAttribute('stop-opacity','0.3');
  rg.appendChild(gs1); rg.appendChild(gs2);
  defs.appendChild(rg);
  svg.appendChild(defs);

  function mkC(id, r, fill, stroke, sw, fop) {
    var c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx','140'); c.setAttribute('cy','140');
    c.setAttribute('r', r);
    c.setAttribute('fill', fill);
    c.setAttribute('stroke', stroke);
    c.setAttribute('stroke-width', sw);
    if (fop !== undefined) c.setAttribute('fill-opacity', fop);
    if (id) c.id = id;
    return c;
  }

  var tissueRing = mkC('av-tissue', 128, 'none',       '#fda4af', 6,  undefined);
  tissueRing.setAttribute('opacity','0.15');
  var wallEl   = mkC('av-wall',    110, '#fda4af',     '#e11d48', 14, 0.18);
  var plaqueEl = mkC('av-plaque',   72, '#fef08a',     '#ca8a04', 0,  0);
  var lumenEl  = mkC('av-lumen',    72, 'url(#av-lg)', 'none',    0,  undefined);

  var flowG = document.createElementNS(NS,'g');
  flowG.id = 'av-flow';
  flowG.setAttribute('opacity','0.5');
  [[140,122,3,'#3b82f6',0.5],[126,140,2.5,'#3b82f6',0.4],[154,140,2.5,'#3b82f6',0.4],
   [140,158,3,'#3b82f6',0.5],[130,128,2,'#60a5fa',0.35],[150,152,2,'#60a5fa',0.35]
  ].forEach(function(d){
    var c = document.createElementNS(NS,'circle');
    c.setAttribute('cx',d[0]); c.setAttribute('cy',d[1]); c.setAttribute('r',d[2]);
    c.setAttribute('fill',d[3]); c.setAttribute('opacity',d[4]);
    flowG.appendChild(c);
  });

  var bpTxt = document.createElementNS(NS,'text');
  bpTxt.id = 'av-bp-txt';
  bpTxt.setAttribute('x','140'); bpTxt.setAttribute('y','138');
  bpTxt.setAttribute('text-anchor','middle'); bpTxt.setAttribute('dominant-baseline','central');
  bpTxt.setAttribute('font-size','13'); bpTxt.setAttribute('font-weight','500');
  bpTxt.setAttribute('fill','#1e293b');
  bpTxt.textContent = '120/80';

  var heartTxt = document.createElementNS(NS,'text');
  heartTxt.id = 'av-heart';
  heartTxt.setAttribute('x','140'); heartTxt.setAttribute('y','158');
  heartTxt.setAttribute('text-anchor','middle'); heartTxt.setAttribute('dominant-baseline','central');
  heartTxt.setAttribute('font-size','14'); heartTxt.setAttribute('fill','#e11d48');
  heartTxt.style.cssText = 'transition:transform .05s ease;transform-origin:140px 158px;';
  heartTxt.textContent = '♥';

  svg.appendChild(tissueRing); svg.appendChild(wallEl); svg.appendChild(plaqueEl);
  svg.appendChild(lumenEl); svg.appendChild(flowG); svg.appendChild(bpTxt); svg.appendChild(heartTxt);

  var hint = document.createElement('div');
  hint.style.cssText = 'font-size:11px;color:#94a3b8;text-align:center;max-width:240px;line-height:1.6;';
  hint.textContent = 'Pulse speed and force follow the heart rate slider. Plaque narrows the lumen as blood sugar rises.';

  vizDiv.appendChild(svg);
  vizDiv.appendChild(hint);

  wrap.appendChild(ctrl);
  wrap.appendChild(vizDiv);
  vc.appendChild(wrap);
  el_.appendChild(vc);

  // ── LOGIC ─────────────────────────────────────────────────────
  function clamp(v,a,b){ return Math.min(Math.max(v,a),b); }
  function lerp(a,b,t) { return a+(b-a)*clamp(t,0,1); }

  var baseWallR=110, baseLumenR=72, basePlaqueR=72;
  var wallStroke=14, wallColorStr='#e11d48';
  var bpT=0, bsT=0;
  var pulsePhase=0, lastTime=null, lastPeakPhase=1;

  function getBPMTag(bpm){
    if(bpm>=100) return ['Tachycardia','#fef2f2','#dc2626'];
    if(bpm>=90)  return ['Elevated','#fff7ed','#ea580c'];
    if(bpm>=60)  return ['Normal','#f0fdf4','#16a34a'];
    return ['Bradycardia','#eff6ff','#2563eb'];
  }

  function update(){
    var sys = parseInt(document.getElementById('av-sys').value);
    var dia = parseInt(document.getElementById('av-dia').value);
    var bs  = parseFloat(document.getElementById('av-bs').value)/10;
    var bpm = parseInt(document.getElementById('av-bpm').value);

    document.getElementById('av-sys-disp').textContent = sys+' mmHg';
    document.getElementById('av-dia-disp').textContent = dia+' mmHg';
    document.getElementById('av-bs-disp').textContent  = bs.toFixed(1)+' mmol/L';
    document.getElementById('av-bpm-disp').textContent = bpm+' bpm';
    document.getElementById('av-bp-txt').textContent   = sys+'/'+dia;

    var tag = getBPMTag(bpm);
    var tagEl = document.getElementById('av-bpm-tag');
    tagEl.textContent = tag[0]; tagEl.style.background = tag[1]; tagEl.style.color = tag[2];

    bpT = clamp((sys-120)/(220-120),0,1);
    wallStroke = lerp(14,38,bpT);
    var r=Math.round(lerp(225,127,bpT)), g=Math.round(lerp(29,0,bpT)), b=Math.round(lerp(72,0,bpT));
    wallColorStr = 'rgb('+r+','+g+','+b+')';

    var baseInner = 110 - wallStroke/2;
    bsT = clamp((bs-5.0)/(25.0-5.0),0,1);
    var plaqueT = lerp(0, baseInner*0.55, bsT);
    baseLumenR  = Math.max(baseInner - plaqueT, 8);
    basePlaqueR = baseLumenR + plaqueT;

    plaqueEl.setAttribute('r', basePlaqueR);
    plaqueEl.setAttribute('fill-opacity', lerp(0,0.85,bsT).toFixed(3));
    plaqueEl.setAttribute('stroke-width', lerp(0,4,bsT).toFixed(1));
    plaqueEl.setAttribute('fill','rgb('+Math.round(lerp(254,202,bsT))+','+Math.round(lerp(240,138,bsT))+','+Math.round(lerp(138,34,bsT))+')');

    var wallLevels=['Normal','Mild','Moderate','Severe'];
    document.getElementById('av-wall-stat').textContent  = wallLevels[bpT<.2?0:bpT<.5?1:bpT<.8?2:3];
    document.getElementById('av-lumen-stat').textContent = Math.round((baseLumenR/72)*100)+'%';
    document.getElementById('av-pp-stat').textContent    = sys-dia;

    var rb=document.getElementById('av-risk-box'), rv=document.getElementById('av-risk-val');
    if(sys>180||bs>15||bpm>=120){
      rb.style.background='#fef2f2'; rb.style.borderColor='#fecaca';
      rv.style.color='#dc2626'; rv.textContent='Critical risk';
    } else if(sys>160||bs>11||bpm>=100){
      rb.style.background='#fff7ed'; rb.style.borderColor='#fed7aa';
      rv.style.color='#ea580c'; rv.textContent='High risk';
    } else if(sys>140||bs>7||bpm>=90){
      rb.style.background='#fffbeb'; rb.style.borderColor='#fde68a';
      rv.style.color='#d97706'; rv.textContent='Elevated';
    } else {
      rb.style.background='#f0fdf4'; rb.style.borderColor='#bbf7d0';
      rv.style.color='#16a34a'; rv.textContent='Normal';
    }
  }

  function animate(ts){
    if(!lastTime) lastTime=ts;
    var dt=(ts-lastTime)/1000; lastTime=ts;
    var bpm=parseInt(document.getElementById('av-bpm').value);
    pulsePhase=(pulsePhase+dt*(bpm/60))%1;

    var pulse;
    if(pulsePhase<0.12)      pulse=Math.sin((pulsePhase/0.12)*Math.PI*0.5);
    else if(pulsePhase<0.30) pulse=lerp(1.0,0.28,(pulsePhase-0.12)/0.18);
    else if(pulsePhase<0.46) pulse=lerp(0.28,0.42,Math.sin(((pulsePhase-0.30)/0.16)*Math.PI));
    else                     pulse=lerp(0.36,0.0,(pulsePhase-0.46)/0.54);

    var sys = parseInt(document.getElementById('av-sys').value);
    var amp = lerp(3,16,clamp((sys-90)/130,0,1));
    var exp = pulse*amp;

    var pWallR   = baseWallR  + exp*0.55;
    var pLumenR  = Math.max(baseLumenR + exp, 6);
    var pPlaqueR = basePlaqueR + exp*0.25;

    wallEl.setAttribute('r', pWallR.toFixed(2));
    wallEl.setAttribute('stroke-width', wallStroke);
    wallEl.setAttribute('stroke', wallColorStr);
    wallEl.setAttribute('fill-opacity', lerp(0.10,0.30,pulse*0.4+0.6*bpT).toFixed(3));
    lumenEl.setAttribute('r', pLumenR.toFixed(2));
    tissueRing.setAttribute('r', (pWallR+18).toFixed(2));

    if(parseFloat(plaqueEl.getAttribute('fill-opacity'))>0.05){
      plaqueEl.setAttribute('r', pPlaqueR.toFixed(2));
    }

    var scale = pLumenR/72;
    flowG.setAttribute('transform','translate(140,140) scale('+scale.toFixed(3)+') translate(-140,-140)');

    if(pulsePhase>0.04 && pulsePhase<0.13 && lastPeakPhase<=0.04){
      var ht = document.getElementById('av-heart');
      if(ht){
        ht.style.transform='scale(1.6)';
        setTimeout(function(){ ht.style.transform='scale(1)'; },100);
        if(bpm>=100)     ht.setAttribute('fill','#dc2626');
        else if(bpm>=90) ht.setAttribute('fill','#ea580c');
        else             ht.setAttribute('fill','#e11d48');
      }
    }
    lastPeakPhase = pulsePhase;
    requestAnimationFrame(animate);
  }

  document.getElementById('av-sys').addEventListener('input', update);
  document.getElementById('av-dia').addEventListener('input', update);
  document.getElementById('av-bs').addEventListener('input',  update);
  document.getElementById('av-bpm').addEventListener('input', update);

  update();
  requestAnimationFrame(animate);
}
