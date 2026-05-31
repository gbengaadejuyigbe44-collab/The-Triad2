// ════════════════════════════════════════════════════════════════
// THE TRIAD — HTN · HYPOTENSION · DIABETES
// © 2026 Gbenga Adejuyigbe, RN, BNSc. All rights reserved.
// Unauthorised reproduction, distribution, or modification of this
// file, in whole or in part, is prohibited without written consent
// of the author. Protected by copyright law.
// ════════════════════════════════════════════════════════════════

// ── PROFESSIONAL ACKNOWLEDGEMENT GATE ───────────────────────────
(function(){
  var SESSION_KEY = 'triad_ack';
  function unlock() {
    var gate = document.getElementById('pwd-gate');
    gate.style.opacity = '0';
    gate.style.transition = 'opacity 0.4s';
    try { sessionStorage.setItem(SESSION_KEY, '1'); sessionStorage.setItem('disc_ok','1'); } catch(e) {}
    setTimeout(function() {
      gate.style.display = 'none';
      // Show #app if acceptDisc() hasn't already shown it
      var appEl = document.getElementById('app');
      if (appEl && appEl.style.display === 'none') {
        appEl.style.opacity = '0';
        appEl.style.display = 'block';
        requestAnimationFrame(function() {
          appEl.style.transition = 'opacity 0.25s ease';
          appEl.style.opacity = '1';
        });
        if (typeof initApp === 'function') initApp();
      }
      try {
        if (!sessionStorage.getItem('triad_welcomed')) {
          if (typeof showWelcome === 'function') showWelcome();
          sessionStorage.setItem('triad_welcomed', '1');
        }
      } catch(e) {
        if (typeof showWelcome === 'function') showWelcome();
      }
    }, 400);
  }
  window.acknowledgeAndEnter = function() { unlock(); };
  window.declinePwd = function() {
    document.getElementById('pwd-gate').style.display = 'none';
    document.getElementById('disc-declined').style.display = 'flex';
  };
  window.addEventListener('DOMContentLoaded', function() {
    try { if (sessionStorage.getItem(SESSION_KEY) === '1') { unlock(); return; } } catch(e) {}
  });
})();

// ════════════════════════════════════════════════════════════════
// THE TRIAD — HTN · HYPOTENSION · DIABETES
// Vanilla JS, zero dependencies
// ════════════════════════════════════════════════════════════════

(function(){
  function updateClock(){
    var el=document.getElementById('header-clock');
    if(!el) return;
    var now=new Date();
    var h=String(now.getHours()).padStart(2,'0');
    var m=String(now.getMinutes()).padStart(2,'0');
    var s=String(now.getSeconds()).padStart(2,'0');
    el.textContent=h+':'+m+':'+s;
  }
  updateClock();
  setInterval(updateClock,1000);
})();
(function(){
  /* ── Font options ─────────────────────────────────────────── */
  var FONTS = [
    // ── Sans-serif (guaranteed) ──────────────────────────────────
    { key:'outfit',   name:'Outfit',       stack:"'Outfit',system-ui,sans-serif",                           sample:'Modern sans · default' },
    { key:'system',   name:'System UI',    stack:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",  sample:'Your device font' },
    { key:'arial',    name:'Arial',        stack:"Arial,Helvetica,sans-serif",                              sample:'Universal sans' },
    { key:'verdana',  name:'Verdana',      stack:"Verdana,Geneva,sans-serif",                               sample:'Wide & legible' },
    { key:'trebuchet',name:'Trebuchet',    stack:"'Trebuchet MS',Helvetica,sans-serif",                     sample:'Humanist sans' },
    { key:'tahoma',   name:'Tahoma',       stack:"Tahoma,Geneva,Verdana,sans-serif",                        sample:'Compact sans' },
    // ── Serif (guaranteed) ───────────────────────────────────────
    { key:'dmserif',  name:'DM Serif',     stack:"'DM Serif Display',Georgia,serif",                        sample:'Elegant display' },
    { key:'georgia',  name:'Georgia',      stack:"Georgia,'Times New Roman',serif",                         sample:'Classic serif' },
    { key:'times',    name:'Times New R.', stack:"'Times New Roman',Times,serif",                           sample:'Traditional serif' },
    { key:'palatino', name:'Palatino',     stack:"Palatino,'Palatino Linotype',serif",                      sample:'Literary serif' },
    { key:'garamond', name:'Garamond',     stack:"Garamond,'EB Garamond',serif",                            sample:'Old-style serif' },
    { key:'cambria',  name:'Cambria',      stack:"Cambria,Georgia,serif",                                   sample:'Reading serif' },
    // ── Monospace (guaranteed) ───────────────────────────────────
    { key:'fira',     name:'Fira Code',    stack:"'Fira Code',monospace",                                   sample:'Code · ligatures' },
    { key:'courier',  name:'Courier New',  stack:"'Courier New',Courier,monospace",                         sample:'Classic mono' },
    { key:'mono',     name:'System Mono',  stack:"ui-monospace,'Cascadia Code','Segoe UI Mono',monospace",  sample:'Device monospace' },
  ];

  /* ── Persist helpers ─────────────────────────────────────── */
  function save(k,v){ try{ localStorage.setItem('triad_stg_'+k, JSON.stringify(v)); }catch(e){} }
  function load(k,def){ try{ var v=localStorage.getItem('triad_stg_'+k); return v!==null?JSON.parse(v):def; }catch(e){return def;} }

  /* ── FONT — dynamically loads + applies ────────────────────── */
  // Google Fonts URL map — each font's direct import URL
  var FONT_URLS = {
    // Outfit, DM Serif Display, Fira Code already loaded in <head>
    // All others are system fonts — no network needed
  };

  var _loadedFonts = {};

  function ensureFontLoaded(key, callback){
    // All fonts are either pre-loaded in <head> or system fonts — apply immediately
    callback();
  }

  function applyFont(key){
    var f = FONTS.find(function(x){return x.key===key;}) || FONTS[0];
    // Mark active immediately for responsive feel
    var btns = document.querySelectorAll('.stg-font-btn');
    btns.forEach(function(b){ b.classList.toggle('active', b.dataset.font===key); });
    save('font', key);
    // Load font if needed, then apply
    ensureFontLoaded(key, function(){
      var tag = document.getElementById('stg-font-override');
      if(!tag){ tag=document.createElement('style'); tag.id='stg-font-override'; document.head.appendChild(tag); }
      tag.textContent = '* { font-family: '+f.stack+' !important; } #emergency-btn { animation: emerg-glow 2.6s ease-in-out infinite !important; }';
    });
  }

  /* ── TEXT SIZE — use CSS zoom on main wrapper ──────────────── */
  function applySize(pct){
    var pctNum = parseInt(pct);
    // Use transform scale on the app wrapper — works regardless of px/em
    var wrapper = document.getElementById('app-wrapper') || document.body;
    if(pctNum === 100){
      wrapper.style.fontSize = '';
      // inject override
    } else {
      // Inject a style that scales all text via font-size cascade
      var tag = document.getElementById('stg-size-override');
      if(!tag){ tag=document.createElement('style'); tag.id='stg-size-override'; document.head.appendChild(tag); }
      tag.textContent = ':root{ font-size:'+pctNum+'%!important; }'
        + ' body *{ font-size: inherit; }'
        // Override all hardcoded px sizes proportionally
        + ' .card-body,.card-hdr,.acc-btn,.tab-btn,.notebox{ font-size:calc(13px * '+pctNum/100+')!important; }'
        + ' .lbl,.stg-row-sub{ font-size:calc(11px * '+pctNum/100+')!important; }'
        + ' .sec-title h2{ font-size:calc(18px * '+pctNum/100+')!important; }'
        + ' .mod-card-name{ font-size:calc(13px * '+pctNum/100+')!important; }'
        + ' .tab-card-name{ font-size:calc(11px * '+pctNum/100+')!important; }'
        + ' p,li,td{ font-size:calc(13px * '+pctNum/100+')!important; }'
        + ' h3{ font-size:calc(15px * '+pctNum/100+')!important; }'
        + ' h4{ font-size:calc(14px * '+pctNum/100+')!important; }';
    }
    var labels = {85:'Small',90:'Small',95:'Small-Med',100:'Medium',105:'Large',110:'Large',115:'Extra Large',120:'Extra Large'};
    var label = labels[pctNum] || 'Medium';
    var el = document.getElementById('stg-size-label');
    if(el) el.textContent = label + ' (' + pct + '%)';
    var slider = document.getElementById('stg-size-slider');
    if(slider){ slider.value = pct; slider.style.setProperty('--pct', ((pct-85)/(120-85)*100)+'%'); }
    save('size', pct);
  }

  /* ── DARK MODE — sync with existing toggleDark() ───────────── */
  function applyDark(on){
    if(on){ document.body.classList.add('dark'); } else { document.body.classList.remove('dark'); }
    try{ localStorage.setItem('triad_dark', on?'1':'0'); }catch(e){}
    var hdrBtn = document.getElementById('dark-toggle');
    if(hdrBtn) hdrBtn.textContent = on ? '☀️' : '🌙';
    var t = document.getElementById('stg-dark-toggle');
    if(t) t.classList.toggle('on', on);
    var tm = document.querySelector('meta[name="theme-color"]');
    if(tm) tm.content = on ? '#141210' : '#f4f1ee';
    save('dark', on);
  }

  /* ── COMPACT MODE — CSS class on body ──────────────────────── */
  function applyCompact(on){
    document.body.classList.toggle('compact', on);
    var t = document.getElementById('stg-compact-toggle');
    if(t) t.classList.toggle('on', on);
    save('compact', on);
  }

  /* ── REDUCE MOTION — CSS class on body ─────────────────────── */
  function applyMotion(on){
    document.body.classList.toggle('no-motion', on);
    var t = document.getElementById('stg-motion-toggle');
    if(t) t.classList.toggle('on', on);
    save('motion', on);
  }

  /* ── GLUCOSE UNITS — wires into the real app _bgUnit ───────── */
  function applyGluc(unit){
    // Set the real app glucose unit variable
    window._bgUnit = unit;
    // Also set the S object and persist in the app's own key
    if(window.S && 'glucoseUnit' in window.S){ window.S.glucoseUnit = unit; }
    try{ localStorage.setItem('triad_glucose_unit', unit); }catch(e){}
    // Re-render the BG tracker if it's open
    if(typeof bgRender === 'function'){ try{ bgRender(); }catch(e){} }
    // Update UI
    var mmolBtn = document.getElementById('stg-gluc-mmol');
    var mgdlBtn = document.getElementById('stg-gluc-mgdl');
    var subEl   = document.getElementById('stg-gluc-sub');
    if(mmolBtn) mmolBtn.classList.toggle('active', unit==='mmol');
    if(mgdlBtn) mgdlBtn.classList.toggle('active', unit==='mgdl');
    if(subEl)   subEl.textContent = 'Currently: ' + (unit==='mmol'?'mmol/L':'mg/dL');
    // Update any visible unit toggle buttons in the BG tracker tab
    var bgtMgdl = document.getElementById('bgt-mgdl');
    var bgtMmol = document.getElementById('bgt-mmol');
    if(bgtMgdl) bgtMgdl.style.fontWeight = unit==='mgdl'?'800':'500';
    if(bgtMmol) bgtMmol.style.fontWeight = unit==='mmol'?'800':'500';
    save('gluc', unit);
  }

  /* ── BUILD FONT GRID ────────────────────────────────────────── */
  function buildFontGrid(){
    var grid = document.getElementById('stg-font-grid');
    if(!grid) return;
    grid.innerHTML = ''; // always rebuild to reflect active font
    var activeFont = load('font','outfit');
    FONTS.forEach(function(f){
      var btn = document.createElement('button');
      btn.className = 'stg-font-btn' + (f.key===activeFont?' active':'');
      btn.dataset.font = f.key;
      btn.innerHTML = '<div class="stg-font-btn-name" style="font-family:'+f.stack+'">'+f.name+'</div>'
                    + '<div class="stg-font-btn-cat">'+f.sample+'</div>';
      btn.onclick = function(){ applyFont(f.key); };
      grid.appendChild(btn);
    });
  }

  /* ── SYNC panel toggles to current state ───────────────────── */
  function syncToggles(){
    var isDark    = document.body.classList.contains('dark');
    var isCompact = document.body.classList.contains('compact');
    var isMotion  = document.body.classList.contains('no-motion');
    var darkT = document.getElementById('stg-dark-toggle');
    if(darkT) darkT.classList.toggle('on', isDark);
    var compT = document.getElementById('stg-compact-toggle');
    if(compT) compT.classList.toggle('on', isCompact);
    var motT = document.getElementById('stg-motion-toggle');
    if(motT) motT.classList.toggle('on', isMotion);
    // Glucose
    var gluc = window._bgUnit || load('gluc','mgdl');
    var mmolBtn = document.getElementById('stg-gluc-mmol');
    var mgdlBtn = document.getElementById('stg-gluc-mgdl');
    var subEl   = document.getElementById('stg-gluc-sub');
    if(mmolBtn) mmolBtn.classList.toggle('active', gluc==='mmol');
    if(mgdlBtn) mgdlBtn.classList.toggle('active', gluc==='mgdl');
    if(subEl)   subEl.textContent = 'Currently: ' + (gluc==='mmol'?'mmol/L':'mg/dL');
    // Size slider
    var size = load('size',100);
    var slider = document.getElementById('stg-size-slider');
    if(slider){ slider.value = size; slider.style.setProperty('--pct', ((size-85)/(120-85)*100)+'%'); }
    var sizeEl = document.getElementById('stg-size-label');
    if(sizeEl){ var labels={85:'Small',90:'Small',95:'Small-Med',100:'Medium',105:'Large',110:'Large',115:'Extra Large',120:'Extra Large'}; sizeEl.textContent=(labels[size]||'Medium')+' ('+size+'%)'; }
  }

  /* ── OPEN / CLOSE ───────────────────────────────────────────── */
  window.openSettings = function(){
    var ov = document.getElementById('settings-overlay');
    var panel = document.getElementById('settings-panel');
    buildFontGrid();
    syncToggles();
    ov.classList.add('open');
    panel.classList.remove('closing');
  };
  window.closeSettings = function(){
    var ov = document.getElementById('settings-overlay');
    var panel = document.getElementById('settings-panel');
    panel.classList.add('closing');
    setTimeout(function(){ ov.classList.remove('open'); panel.classList.remove('closing'); }, 220);
  };
  document.getElementById('settings-overlay').addEventListener('click', function(e){
    if(e.target === this) closeSettings();
  });

  /* ── PUBLIC HANDLERS ────────────────────────────────────────── */
  window.stgToggleDark    = function(){ applyDark(!document.body.classList.contains('dark')); };
  window.stgToggleCompact = function(){ applyCompact(!document.body.classList.contains('compact')); };
  window.stgToggleMotion  = function(){ applyMotion(!document.body.classList.contains('no-motion')); };
  window.stgSetGluc       = function(u){ applyGluc(u); };
  window.stgSetSize       = function(v){ applySize(parseInt(v)); };

  window.stgRestartTour = function(){
    closeSettings();
    try{ localStorage.removeItem('triad_tour_done_v4'); }catch(e){}
    setTimeout(function(){
      if(typeof window.startTour === 'function'){ window.startTour(true); }
    }, 300);
  };

  window.stgResetAll = function(){
    // Visual confirmation instead of confirm() which is blocked in some contexts
    var btn = document.querySelector('.stg-danger-row .stg-row-name');
    if(btn && btn.textContent === 'Reset All Settings'){
      btn.textContent = 'Tap again to confirm';
      btn.style.color = '#f43f5e';
      setTimeout(function(){ if(btn) { btn.textContent='Reset All Settings'; btn.style.color=''; } }, 2500);
      return;
    }
    // Second tap — execute reset
    ['font','size','dark','compact','motion','gluc'].forEach(function(k){
      try{ localStorage.removeItem('triad_stg_'+k); }catch(e){}
    });
    // Remove injected style overrides
    ['stg-font-override','stg-size-override'].forEach(function(id){
      var el=document.getElementById(id); if(el) el.remove();
    });
    applyDark(false);
    applyCompact(false);
    applyMotion(false);
    applyGluc('mgdl');
    // Reset font grid
    document.querySelectorAll('.stg-font-btn').forEach(function(b){ b.classList.toggle('active', b.dataset.font==='outfit'); });
    // Reset size slider
    var slider=document.getElementById('stg-size-slider');
    if(slider){ slider.value=100; slider.style.setProperty('--pct','38.5%'); }
    var sizeEl=document.getElementById('stg-size-label');
    if(sizeEl) sizeEl.textContent='Medium (100%)';
    // Visual feedback
    var row = document.querySelector('.stg-danger-row .stg-row-name');
    if(row){ row.textContent='✓ Reset complete'; row.style.color='#22c55e'; setTimeout(function(){ row.textContent='Reset All Settings'; row.style.color=''; },2000); }
  };

  /* ── BOOT: restore on page load ─────────────────────────────── */
  function bootSettings(){
    var font    = load('font','outfit');
    var size    = load('size',100);
    var compact = load('compact',false);
    var motion  = load('motion',false);
    // Dark mode is already handled by the existing app boot — don't double-apply
    if(font !== 'outfit') applyFont(font);
    if(size !== 100)      applySize(size);
    if(compact)           applyCompact(true);
    if(motion)            applyMotion(true);
    // Glucose already persisted in triad_glucose_unit by the app itself
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', bootSettings);
  } else {
    bootSettings();
  }
})();
// ── SCROLL PROGRESS ──────────────────────────────────────────
(function() {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  function update() {
    var el = document.documentElement;
    var scrolled = el.scrollTop || document.body.scrollTop;
    var total = el.scrollHeight - el.clientHeight;
    bar.style.width = (total > 0 ? Math.round((scrolled / total) * 100) : 0) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
(function(){
  function updateClock(){
    var el=document.getElementById('header-clock');
    if(!el) return;
    var now=new Date();
    var h=String(now.getHours()).padStart(2,'0');
    var m=String(now.getMinutes()).padStart(2,'0');
    var s=String(now.getSeconds()).padStart(2,'0');
    el.textContent=h+':'+m+':'+s;
  }
  updateClock();
  setInterval(updateClock,1000);
})();
