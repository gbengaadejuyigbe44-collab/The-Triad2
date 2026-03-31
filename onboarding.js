// ══ ONBOARDING TOUR ══════════════════════════════════════════
// Uses box-shadow on a single spotlight element — NO full-screen
// blocking div. Clicks always pass through to the app.
(function() {
  var TOUR_KEY = 'triad_tour_done_v4';
  var currentStep = 0;
  var tourActive = false;
  var resizeTimer = null;

  var STEPS = [
    {
      target: null,
      title: '👋 Welcome to The Triad',
      body: 'A free, evidence-based clinical decision support tool built for nurses and doctors. This 10-step tour will guide you through every key feature. You can skip at any time and restart from the About menu.',
      position: 'center'
    },
    {
      target: 'mod-cards-container',
      title: '📦 9 Clinical Modules',
      body: 'The home dashboard shows all 9 modules: Hypertension, Hypotension, Diabetes, Combined HTN+DM, Drug Reference, Sepsis, Paediatrics, Renal, and Reviews. Each card shows its colour code and tab count. <strong>Tap any card to open that module.</strong>',
      position: 'below',
      onShow: function() {
        if (typeof showHomeDashboard === 'function') showHomeDashboard();
      }
    },
    {
      target: 'tab-cards-container',
      title: '📑 Tab Grid — Module Tabs',
      body: 'Inside each module you see a grid of all its tabs, grouped by category (Classify, Treat, Monitor, etc.). Tabs are colour-coded to match the module. <strong>Tap any tab card to open its content.</strong>',
      position: 'below',
      onShow: function() {
        if (typeof showTabGrid === 'function') showTabGrid('HTN');
      }
    },
    {
      target: 'content-back-bar',
      title: '🧭 Breadcrumb Navigation',
      body: "Once inside a tab you will see a breadcrumb bar at the top: <strong>Module → Tab name</strong>. Tap the ← back arrow to return to the tab grid, or tap the module name to go back to that module's tab list.",
      position: 'below',
      onShow: function() {
        if (typeof showTabContent === 'function') showTabContent('HTN', 0);
      }
    },
    {
      target: 'home-nav-btn',
      title: '🏠 Home Button',
      body: 'The <strong>house icon</strong> in the header always takes you back to the module dashboard from anywhere inside the app — even if you are deep inside a tab. It is your anchor point.',
      position: 'below',
      onShow: function() {
        if (typeof showHomeDashboard === 'function') showHomeDashboard();
      }
    },
    {
      target: 'search-toggle-btn',
      title: '🔍 Smart Cross-Module Search',
      body: 'Tap the magnifying glass to open the search bar. It indexes content across <strong>all 9 modules simultaneously</strong>. Try searching "Labetalol", "DKA", "eGFR", or "ASCVD" — results show the Module → Tab path and a text snippet.',
      position: 'below',
      onShow: function() {
        var sw = document.getElementById('search-bar-wrap');
        if (sw && !sw.classList.contains('open')) sw.classList.add('open');
      },
      onHide: function() {
        var sw = document.getElementById('search-bar-wrap');
        if (sw) sw.classList.remove('open');
        var si = document.getElementById('search-input');
        if (si) si.value = '';
        var sr = document.getElementById('search-results');
        if (sr) sr.innerHTML = '';
      }
    },
    {
      target: 'emergency-btn',
      title: '🚨 Emergency Overlay',
      body: 'The <strong>red button</strong> (draggable — move it wherever you like) gives one-tap access to 7 rapid emergency protocols: HTN Crisis, Septic Shock, DKA, HHS, Hypoglycaemia, Eclampsia, and Haemorrhage — all with drug doses, no navigation needed.',
      position: 'left'
    },
    {
      target: 'print-fab',
      title: '🖨️ Print / PDF Export',
      body: 'Tap the printer icon to export the <strong>currently open tab</strong> as a clean, formatted PDF — ideal for ward handover sheets, bedside reference cards, or offline use. Only the active tab content is printed.',
      position: 'left'
    },
    {
      target: 'dark-toggle',
      title: '🌙 Dark Mode',
      body: 'Toggle dark mode for comfortable viewing on <strong>night shifts</strong>, in dimly lit wards, or to reduce eye strain. Your preference is saved automatically across sessions.',
      position: 'below'
    },
    {
      target: null,
      title: '✅ You\'re all set!',
      body: '<strong>The Triad</strong> is built for licensed clinicians at the African bedside — works on any phone, no download, no login, always free.<br><br>Built by <em>Gbenga Adejuyigbe, RN, BNSc © 2026</em>. Always verify against your local protocols. Restart this tour anytime from the About &amp; Tour menu.',
      position: 'center'
    }
  ];

  // ── CSS ─────────────────────────────────────────────────────
  function injectCSS() {
    var s = document.createElement('style');
    s.textContent = [
      // Spotlight — the ONLY tour element. Uses box-shadow for dim surround.
      // pointer-events:none so it NEVER blocks clicks.
      '#tour-spot{',
        'position:fixed;z-index:8000;',
        'border-radius:10px;',
        'border:2px solid #0ea5e9;',
        'box-shadow:0 0 0 9999px rgba(0,0,0,0.52),0 0 0 4px rgba(14,165,233,0.3),0 0 20px rgba(14,165,233,0.4);',
        'pointer-events:none;',
        'transition:top 0.3s ease,left 0.3s ease,width 0.3s ease,height 0.3s ease,opacity 0.2s;',
        'display:none;',
      '}',
      // Tooltip — sits above spotlight, pointer-events:auto only on itself
      '#tour-tip{',
        'position:fixed;z-index:8001;',
        'background:#fff;border-radius:14px;',
        'box-shadow:0 8px 32px rgba(0,0,0,0.22);',
        'padding:18px 20px 14px;',
        'width:290px;',
        'display:none;',
        'pointer-events:auto;',
      '}',
      'body.dark #tour-tip{background:#1e293b;box-shadow:0 8px 32px rgba(0,0,0,0.5),0 0 0 1px #334155;}',
      // Arrow
      '#tour-tip::before{content:"";position:absolute;width:11px;height:11px;background:inherit;transform:rotate(45deg);}',
      '#tour-tip.at-below::before{top:-6px;left:20px;}',
      '#tour-tip.at-above::before{bottom:-6px;left:20px;}',
      '#tour-tip.at-left::before{right:-6px;top:18px;}',
      '#tour-tip.at-right::before{left:-6px;top:18px;}',
      '#tour-tip.at-center::before{display:none;}',
      // Inner elements
      '.tt-badge{font-size:10px;font-weight:700;color:#0ea5e9;text-transform:uppercase;letter-spacing:0.7px;margin-bottom:3px;}',
      'body.dark .tt-badge{color:#38bdf8;}',
      '.tt-title{font-size:15px;font-weight:800;color:#0f172a;margin-bottom:6px;}',
      'body.dark .tt-title{color:#f1f5f9;}',
      '.tt-body{font-size:13px;color:#475569;line-height:1.6;margin-bottom:12px;}',
      'body.dark .tt-body{color:#94a3b8;}',
      '.tt-dots{display:flex;gap:5px;margin-bottom:10px;}',
      '.tt-dot{width:6px;height:6px;border-radius:50%;background:#cbd5e1;cursor:pointer;transition:background 0.2s,transform 0.2s;}',
      '.tt-dot.on{background:#0ea5e9;transform:scale(1.4);}',
      'body.dark .tt-dot{background:#334155;}',
      '.tt-row{display:flex;align-items:center;gap:8px;}',
      '.tt-skip{font-size:12px;color:#94a3b8;background:none;border:none;cursor:pointer;padding:0;margin-right:auto;text-decoration:underline;}',
      '.tt-back{padding:6px 13px;border-radius:7px;font-size:13px;font-weight:600;background:#f1f5f9;color:#475569;border:1px solid #e2e8f0;cursor:pointer;}',
      'body.dark .tt-back{background:#334155;color:#94a3b8;border-color:#475569;}',
      '.tt-next{padding:6px 16px;border-radius:7px;font-size:13px;font-weight:700;background:linear-gradient(135deg,#0ea5e9,#0369a1);color:#fff;border:none;cursor:pointer;}'
    ].join('');
    document.head.appendChild(s);
  }

  // ── HTML ─────────────────────────────────────────────────────
  function injectHTML() {
    var spot = document.createElement('div');
    spot.id = 'tour-spot';
    document.body.appendChild(spot);

    var tip = document.createElement('div');
    tip.id = 'tour-tip';
    tip.innerHTML = [
      '<div class="tt-badge" id="tt-badge"></div>',
      '<div class="tt-title" id="tt-title"></div>',
      '<div class="tt-body" id="tt-body"></div>',
      '<div class="tt-dots" id="tt-dots"></div>',
      '<div class="tt-row">',
        '<button class="tt-skip" onclick="tourSkip()">Skip tour</button>',
        '<button class="tt-back" id="tt-back" onclick="tourBack()">← Back</button>',
        '<button class="tt-next" id="tt-next" onclick="tourNext()">Next →</button>',
      '</div>'
    ].join('');
    document.body.appendChild(tip);
  }

  // ── Core ─────────────────────────────────────────────────────
  function getEl(step) {
    if (!step.target) return null;
    if (step.query) return document.querySelector(step.target);
    return document.getElementById(step.target);
  }

  function showStep(idx) {
    // Call onHide for previous step if it exists
    if (typeof currentStep !== 'undefined' && STEPS[currentStep] && STEPS[currentStep].onHide && idx !== currentStep) {
      try { STEPS[currentStep].onHide(); } catch(e) {}
    }
    var step = STEPS[idx];
    var isLast = idx === STEPS.length - 1;
    var isFirst = idx === 0;
    // Call onShow for this step
    if (step.onShow) { try { step.onShow(); } catch(e) {} }

    document.getElementById('tt-badge').textContent = 'Step ' + (idx+1) + ' of ' + STEPS.length;
    document.getElementById('tt-title').textContent = step.title;
    document.getElementById('tt-body').innerHTML = step.body;
    document.getElementById('tt-next').textContent = isLast ? 'Finish' : 'Next →';
    document.getElementById('tt-back').style.display = isFirst ? 'none' : '';

    // Dots
    var dc = document.getElementById('tt-dots');
    dc.innerHTML = '';
    for (var i = 0; i < STEPS.length; i++) {
      var d = document.createElement('div');
      d.className = 'tt-dot' + (i === idx ? ' on' : '');
      (function(ii){ d.onclick = function(){ currentStep = ii; showStep(ii); }; })(i);
      dc.appendChild(d);
    }

    var el = getEl(step);
    if (!el || step.position === 'center') {
      showCenter();
    } else {
      // Scroll into view first if needed
      var r = el.getBoundingClientRect();
      if (r.top < 0 || r.bottom > window.innerHeight) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(function(){ positionOn(el, step.position); }, 380);
      } else {
        positionOn(el, step.position);
      }
    }
  }

  function showCenter() {
    var spot = document.getElementById('tour-spot');
    var tip = document.getElementById('tour-tip');
    spot.style.display = 'none';
    tip.className = 'at-center';
    tip.style.display = 'block';
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var tw = Math.min(290, vw - 32);
    tip.style.width = tw + 'px';
    tip.style.left = Math.round((vw - tw) / 2) + 'px';
    tip.style.top = Math.round((vh - 240) / 2) + 'px';
  }

  function positionOn(el, preferred) {
    var spot = document.getElementById('tour-spot');
    var tip = document.getElementById('tour-tip');
    var PAD = 8;
    var r = el.getBoundingClientRect();
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var tw = Math.min(290, vw - 32);
    var th = tip.offsetHeight || 240; th = Math.max(th, 200);
    var M = 12;

    // Spotlight
    spot.style.display = 'block';
    spot.style.left = (r.left - PAD) + 'px';
    spot.style.top = (r.top - PAD) + 'px';
    spot.style.width = (r.width + PAD*2) + 'px';
    spot.style.height = (r.height + PAD*2) + 'px';

    tip.style.display = 'block';
    tip.style.width = tw + 'px';

    var tx, ty, cls;

    function tryBelow() {
      ty = r.bottom + PAD + M;
      tx = clamp(r.left - PAD, 8, vw - tw - 8);
      return ty + th < vh - 8;
    }
    function tryAbove() {
      ty = r.top - PAD - th - M;
      tx = clamp(r.left - PAD, 8, vw - tw - 8);
      return ty > 8;
    }
    function tryLeft() {
      tx = r.left - PAD - tw - M;
      ty = clamp(r.top - PAD, 8, vh - th - 8);
      return tx > 8;
    }
    function tryRight() {
      tx = r.right + PAD + M;
      ty = clamp(r.top - PAD, 8, vh - th - 8);
      return tx + tw < vw - 8;
    }

    var placed = false;
    if (preferred === 'below')  { placed = tryBelow()  || tryAbove() || tryLeft() || tryRight(); cls = 'at-below'; }
    if (preferred === 'above')  { placed = tryAbove()  || tryBelow() || tryLeft() || tryRight(); cls = 'at-above'; }
    if (preferred === 'left')   { placed = tryLeft()   || tryRight() || tryAbove() || tryBelow(); cls = 'at-left'; }
    if (preferred === 'right')  { placed = tryRight()  || tryLeft()  || tryAbove() || tryBelow(); cls = 'at-right'; }

    if (!placed) { showCenter(); return; }

    // Recompute cls based on which function placed it
    if (tx === clamp(r.left - PAD, 8, vw - tw - 8) && ty > r.bottom) cls = 'at-below';
    else if (tx === clamp(r.left - PAD, 8, vw - tw - 8) && ty < r.top) cls = 'at-above';
    else if (tx < r.left) cls = 'at-left';
    else if (tx > r.right) cls = 'at-right';

    // Always clamp tip within viewport — never let it go off-screen
    var SAFE_BOTTOM = vh - th - 16;
    var SAFE_RIGHT  = vw - tw - 8;
    tx = clamp(tx, 8, SAFE_RIGHT);
    ty = clamp(ty, 8, Math.max(8, SAFE_BOTTOM));

    tip.className = cls;
    tip.style.left = Math.round(tx) + 'px';
    tip.style.top = Math.round(ty) + 'px';
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function hideTour() {
    // Clean up any open step state
    if (STEPS[currentStep] && STEPS[currentStep].onHide) {
      try { STEPS[currentStep].onHide(); } catch(e) {}
    }
    var spot = document.getElementById('tour-spot');
    var tip = document.getElementById('tour-tip');
    if (spot) spot.style.display = 'none';
    if (tip) tip.style.display = 'none';
    // Guarantee no leftover scroll or interaction lock
    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';
    document.documentElement.style.overflow = '';
    window.scrollTo(0, 0);
  }

  // ── Public API ───────────────────────────────────────────────
  window.startTour = function(force) {
    if (!force && localStorage.getItem(TOUR_KEY)) return;
    currentStep = 0;
    tourActive = true;
    showStep(0);
  };

  window.tourNext = function() {
    if (currentStep < STEPS.length - 1) {
      currentStep++;
      showStep(currentStep);
    } else {
      localStorage.setItem(TOUR_KEY, '1');
      tourActive = false;
      hideTour();
    }
  };

  window.tourBack = function() {
    if (currentStep > 0) { currentStep--; showStep(currentStep); }
  };

  window.tourSkip = function() {
    localStorage.setItem(TOUR_KEY, '1');
    tourActive = false;
    hideTour();
  };

  window.addEventListener('resize', function() {
    if (!tourActive) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){ showStep(currentStep); }, 120);
  });

  // ── Auto-start ───────────────────────────────────────────────
  function maybeAutoStart() {
    var gate = document.getElementById('pwd-gate');
    var welcome = document.getElementById('welcome-screen');
    if ((gate && gate.style.display !== 'none') ||
        (welcome && welcome.style.display !== 'none')) {
      setTimeout(maybeAutoStart, 800);
      return;
    }
    if (!localStorage.getItem(TOUR_KEY)) {
      setTimeout(function(){ window.startTour(false); }, 1200);
    }
  }

  function init() {
    injectCSS();
    injectHTML();
    maybeAutoStart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

