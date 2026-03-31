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

var MOD_META = {
  HTN:    { icon:'❤️',  name:'Hypertension',   sub:'ESC/ESH 2023 · BP classifier · Treatment plans',      color:'#0ea5e9', bg:'rgba(14,165,233,0.12)' },
  HYPO:   { icon:'💉',  name:'Hypotension',    sub:'Shock types · MAP · SSC protocols',                   color:'#a855f7', bg:'rgba(168,85,247,0.12)' },
  DM:     { icon:ICONS.haemorrhage,  name:'Diabetes',       sub:'ADA 2024 · DKA/HHS · BG Tracker',                    color:'#ef4444', bg:'rgba(239,68,68,0.12)' },
  SEPSIS: { icon:ICONS.sepsis,  name:'Sepsis',         sub:'qSOFA · SOFA · Hour-1 Bundle',                        color:'#f97316', bg:'rgba(249,115,22,0.12)' },
  PAED:   { icon:'👶',  name:'Paediatrics',    sub:'Weight-based dosing · DKA · Neonatal resus',          color:'#ec4899', bg:'rgba(236,72,153,0.12)' },
  RENAL:  { icon:'🫘',  name:'Renal',          sub:'eGFR · CKD staging · Drug adjustments',               color:'#06b6d4', bg:'rgba(6,182,212,0.12)' },
  DRUG:   { icon:'💊',  name:'Drug Reference', sub:'Antibiotics · Vasopressors · Electrolytes',           color:'#22c55e', bg:'rgba(34,197,94,0.12)' },
  COMB:   { icon:'⚡',  name:'Combined Overview', sub:'HTN + Hypotension + DM side-by-side',              color:'#64748b', bg:'rgba(100,116,139,0.12)' },
  REVIEW: { icon:'⭐',  name:'Reviews',        sub:'Feedback · Glossary',                                 color:'#fbbf24', bg:'rgba(251,191,36,0.1)' },
};
// Swap emoji icon strings for SVG icons once icons.js has loaded
(function patchModIcons() {
  if (typeof MOD_ICON_MAP === 'undefined') return;
  Object.keys(MOD_ICON_MAP).forEach(function(k) {
    if (MOD_META[k]) MOD_META[k].icon = MOD_ICON_MAP[k];
  });
})();

// Tab group labels for display in tab grid
var TAB_GROUP_MAP = {}; // built lazily

function buildTabGroupMap() {
  if (Object.keys(TAB_GROUP_MAP).length) return;
  Object.keys(MOD_GROUPS).forEach(function(mod) {
    MOD_GROUPS[mod].forEach(function(g) {
      g.tabs.forEach(function(t) { TAB_GROUP_MAP[mod + '|' + t] = g.label; });
    });
  });
}

// ── HISTORY API — phone back button support ─────────────────────
var _historyInit = false;
function _pushNav(state) {
  try {
    if (!_historyInit) {
      // Replace the very first entry so the initial load has a state
      history.replaceState({ triad: 'home' }, '');
      _historyInit = true;
    }
    history.pushState(state, '');
  } catch(e) {}
}
// ── KEYBOARD NAVIGATION (Fix 5) ────────────────────────────────
document.addEventListener('keydown', function(e) {
  var key = e.key;

  if (key === 'Escape') {
    // Close emergency overlay first
    var emOverlay = document.getElementById('emergency-overlay');
    if (emOverlay && emOverlay.style.display !== 'none') { closeEmergency(); return; }
    // Close settings panel
    var sp = document.getElementById('settings-panel');
    if (sp && sp.classList.contains('open')) { closeSettings(); return; }
    // Close search bar
    var sw = document.getElementById('search-bar-wrap');
    if (sw && sw.classList.contains('open')) { toggleSearch(); return; }
    // At Level 2/3 — go back
    if (_navLevel === 'content') { navToTabGrid(); return; }
    if (_navLevel === 'tabgrid') { navToHome(); return; }
  }

  if (key === 'Enter') {
    // If search is open and focused, navigate to first result
    var si = document.getElementById('search-input');
    if (document.activeElement === si) {
      var firstBtn = document.querySelector('#search-results button, #search-results .search-hit, #search-results .search-item');
      if (firstBtn) { firstBtn.click(); e.preventDefault(); }
    }
  }

  if (key === '/') {
    // '/' opens search (common web convention)
    var active = document.activeElement;
    var tag = active ? active.tagName : '';
    if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
      e.preventDefault();
      var sw2 = document.getElementById('search-bar-wrap');
      if (sw2 && !sw2.classList.contains('open')) toggleSearch();
    }
  }
});

window.addEventListener('popstate', function(e) {
  var st = e.state;
  if (!st || !st.triad) { showHomeDashboard(true); return; }
  if (st.triad === 'home')    { showHomeDashboard(true); }
  else if (st.triad === 'tabgrid')  { showTabGrid(st.mod, true); }
  else if (st.triad === 'content')  { showTabContent(st.mod, st.tab, true); }
});

function showHomeDashboard(fromHistory) {
  _navLevel = 'home';
  _navMod   = null;
  if (!fromHistory) _pushNav({ triad: 'home' });

  // Show/hide panels
  var hd  = document.getElementById('home-dashboard');
  var tgv = document.getElementById('tab-grid-view');
  var mc  = document.getElementById('main-content');
  var cbb = document.getElementById('content-back-bar');
  var tn  = document.getElementById('tab-nav');
  if (hd)  hd.style.display  = 'block';
  if (tgv) tgv.style.display = 'none';
  if (mc)  mc.style.display  = 'none';
  if (cbb) cbb.classList.remove('visible');
  if (tn)  tn.style.display  = 'none';

  // Build module cards if not yet done
  var container = document.getElementById('mod-cards-container');
  if (!container) return;
  if (container.childElementCount === 0) {
    var mods = ['HTN','HYPO','DM','COMB','SEPSIS','PAED','RENAL','DRUG','REVIEW'];
    mods.forEach(function(mod) {
      var m   = MOD_META[mod];
      var card = document.createElement('button');
      card.setAttribute('aria-label', m.name);
      card.className = 'mod-card';
      // Set the top accent bar color via before pseudo (use inline var)
      card.style.setProperty('--card-color', m.color);
      card.style.cssText += ';--card-color:' + m.color;
      // Top bar color via inline style on ::before workaround
      card.setAttribute('data-color', m.color);
      var tabCount = (TABS[mod] || []).length;
      card.innerHTML =
        '<style>.mod-card[data-color="'+m.color+'"]::before{background:'+m.color+';}</style>' +
        '<div class="mod-card-inner">' +
          '<div class="mod-card-icon-wrap" style="background:' + m.bg + '">' + m.icon + '</div>' +
          '<div class="mod-card-name">' + m.name + '</div>' +
          '<div class="mod-card-sub">' + m.sub + '</div>' +
        '</div>' +
        '<div class="mod-card-footer">' +
          '<span class="mod-card-count" style="color:' + m.color + ';background:' + m.bg + '">' + tabCount + ' tabs</span>' +
          '<span class="mod-card-arrow">→</span>' +
        '</div>';
      card.onmouseover = function(){};
      card.onmouseout  = function(){};
      card.onmousedown = function(){};
      card.onmouseup   = function(){};
      card.onclick = function() { showTabGrid(mod); };
      container.appendChild(card);
    });
  }
  window.scrollTo({top:0, behavior:'instant'});
}

function showTabGrid(mod, fromHistory) {
  _navLevel = 'tabgrid';
  _navMod   = mod;
  if (!fromHistory) _pushNav({ triad: 'tabgrid', mod: mod });
  buildTabGroupMap();

  var hd  = document.getElementById('home-dashboard');
  var tgv = document.getElementById('tab-grid-view');
  var mc  = document.getElementById('main-content');
  var cbb = document.getElementById('content-back-bar');
  var tn  = document.getElementById('tab-nav');
  if (hd)  hd.style.display  = 'none';
  if (tgv) tgv.style.display = 'block';
  if (mc)  mc.style.display  = 'none';
  if (cbb) cbb.classList.remove('visible');
  if (tn)  tn.style.display  = 'none';

  var m = MOD_META[mod] || { icon:'📋', name: mod, color:'#64748b', bg:'rgba(100,116,132,0.1)' };
  var badge = document.getElementById('tgv-mod-badge');
  var label = document.getElementById('tgv-mod-label');
  var sub   = document.getElementById('tgv-mod-sub');
  if (badge) { badge.innerHTML = m.icon; badge.style.background = m.bg; }
  if (label) label.textContent = m.name;
  if (sub)   sub.textContent = (TABS[mod]||[]).length + ' tabs available';

  // Build tab cards
  var container = document.getElementById('tab-cards-container');
  if (!container) return;
  container.innerHTML = '';

  var tabs   = TABS[mod] || [];
  var groups = MOD_GROUPS[mod] || null;

  if (groups) {
    groups.forEach(function(g) {
      // Group label
      var glabel = document.createElement('div');
      glabel.className = 'tab-grid-group-label';
      glabel.textContent = g.label;
      container.appendChild(glabel);
      // Tab cards in this group
      g.tabs.forEach(function(tabName) {
        var idx = tabs.indexOf(tabName);
        if (idx === -1) return;
        appendTabCard(container, tabName, idx, mod, m.color, g.label);
      });
    });
  } else {
    // No groups — flat list
    tabs.forEach(function(tabName, idx) {
      appendTabCard(container, tabName, idx, mod, m.color, '');
    });
  }
  window.scrollTo({top:0, behavior:'instant'});
}

function appendTabCard(container, tabName, idx, mod, color, groupLabel) {
  // Split emoji from text
  // Strip any leading emoji prefix to get the plain text label
  var parts = tabName.match(/^([\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE00}-\u{FFEF}\uD800-\uDFFF⚕️⚠️⭐🔬]+\s*)/u);
  var txt  = parts ? tabName.slice(parts[0].length).trim() : tabName;
  // Look up SVG icon by text label; fall back to a neutral document icon
  var icon = (TAB_ICON_MAP && TAB_ICON_MAP[txt]) || ICONS.evaluation;

  var card = document.createElement('button');
  card.className = 'tab-card';
  card.style.setProperty('--tab-color', color);
  card.style.borderColor = 'transparent';
  var hint = (TAB_HINTS[mod] && TAB_HINTS[mod][idx]) ? TAB_HINTS[mod][idx] : '';
  card.innerHTML =
    '<div class="tab-card-icon">' + icon + '</div>' +
    '<div class="tab-card-name">' + txt + '</div>' +
    (hint ? '<div class="tab-card-hint">' + hint + '</div>' : '') +
    (groupLabel ? '<div class="tab-card-group">' + groupLabel + '</div>' : '');
  card.onmouseover = function(){ this.style.borderColor = color; };
  card.onmouseout  = function(){ this.style.borderColor = 'transparent'; };
  card.onclick = (function(m, i){ return function(){ showTabContent(m, i); }; })(mod, idx);
  container.appendChild(card);
}

function showTabContent(mod, tabIdx, fromHistory) {
  _navLevel = 'content';
  _navMod   = mod;
  if (!fromHistory) _pushNav({ triad: 'content', mod: mod, tab: tabIdx });

  S.module = mod;
  S.tabs[mod] = tabIdx;

  var hd  = document.getElementById('home-dashboard');
  var tgv = document.getElementById('tab-grid-view');
  var mc  = document.getElementById('main-content');
  var cbb = document.getElementById('content-back-bar');
  var tn  = document.getElementById('tab-nav');
  if (hd)  hd.style.display  = 'none';
  if (tgv) tgv.style.display = 'none';
  if (mc)  { mc.style.display = 'block'; mc.style.maxWidth = '1040px'; mc.style.margin = '0 auto'; mc.style.padding = '24px 18px 48px'; }
  if (cbb) cbb.classList.add('visible');
  if (tn)  tn.style.display  = 'none'; // tab nav hidden; back bar handles it

  // Pin breadcrumb bar exactly below the sticky app-header
  var appHdr = document.getElementById('app-header');
  if (cbb && appHdr) cbb.style.top = appHdr.offsetHeight + 'px';

  // Update breadcrumb
  var mm = MOD_META[mod] || { name: mod };
  var tabName = (TABS[mod]||[])[tabIdx] || '';
  var cbbMod = document.getElementById('cbb-mod-name');
  var cbbTab = document.getElementById('cbb-tab-name');
  if (cbbMod) cbbMod.textContent = mm.name;
  if (cbbTab) cbbTab.textContent = tabName;
  var cbbDot = document.getElementById('cbb-mod-dot');
  if (cbbDot && mm.color) { cbbDot.style.background = mm.color; cbbDot.style.color = mm.color; cbbDot.style.boxShadow = '0 0 8px ' + mm.color; }
  var cbbBar = document.getElementById('content-back-bar');
  if (cbbBar && mm.color) { cbbBar.style.setProperty('--cbb-color', mm.color); }

  renderContent();
  window.scrollTo({top:0, behavior:'instant'});
}

function navToHome() {
  showHomeDashboard();
}

function navToTabGrid() {
  if (_navMod) {
    showTabGrid(_navMod);
  } else {
    showHomeDashboard();
  }
}

function setModule(mod) {
  // In 3-level mode, tapping a module name goes to its tab grid
  showTabGrid(mod);
}



// ── EMERGENCY MODE ─────────────────────────────────────────────
function openEmergency() {
  var ov = document.getElementById('emergency-overlay');
  if(ov) {
    var _dark = document.body.classList.contains('dark');
    ov.className = _dark ? 'em-dark' : 'em-light';
    ov.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Always return to landing page on reopen
    showEmLanding();
    return;
  }

  // ── Inject styles ────────────────────────────────────────────
  if (!document.getElementById('em-styles')) {
    var s = document.createElement('style');
    s.id = 'em-styles';
    s.textContent = [
      '#emergency-overlay{font-family:"Outfit",system-ui,sans-serif}',
      '#emergency-overlay *{box-sizing:border-box}',
      '#emergency-overlay ::-webkit-scrollbar{width:4px;height:4px}',
      '#emergency-overlay ::-webkit-scrollbar-track{background:transparent}',
      /* landing grid */
      '.em-landing-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:14px 14px 28px}',
      '.em-proto-card{border:none;border-radius:16px;padding:18px 14px 16px;cursor:pointer;display:flex;flex-direction:column;align-items:flex-start;gap:6px;transition:transform 0.15s,box-shadow 0.15s;text-align:left;width:100%}',
      '.em-proto-card:active{transform:scale(0.96)}',
      '.em-proto-icon{font-size:28px;line-height:1;margin-bottom:2px}',
      '.em-proto-label{font-size:13px;font-weight:800;line-height:1.25}',
      '.em-proto-hint{font-size:10.5px;font-weight:500;opacity:0.65;line-height:1.3}',
      /* protocol view */
      '.em-back-btn{display:flex;align-items:center;gap:6px;border:none;background:transparent;cursor:pointer;font-size:13px;font-weight:700;padding:0;transition:opacity 0.15s}',
      '.em-back-btn:hover{opacity:0.7}',
      '.em-card{border-radius:14px;margin-bottom:10px;overflow:hidden}',
      '.em-card-hdr{padding:11px 16px;display:flex;align-items:center;gap:8px;font-size:11.5px;font-weight:800;letter-spacing:0.4px;text-transform:uppercase}',
      '.em-card-hdr-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}',
      '.em-card-body{padding:4px 0 8px}',
      '.em-row{display:grid;grid-template-columns:90px 1fr;gap:0;padding:7px 16px;align-items:baseline}',
      '.em-row-key{font-size:10.5px;font-weight:700;letter-spacing:0.3px;text-transform:uppercase;padding-right:10px;line-height:1.5;padding-top:1px}',
      '.em-row-val{font-size:13px;line-height:1.65}',
      '.em-alert{border-radius:12px;padding:13px 16px;margin-bottom:12px;font-size:13px;line-height:1.65;display:flex;gap:10px;align-items:flex-start}',
      '.em-alert-icon{font-size:18px;flex-shrink:0;margin-top:1px}',
      '.em-alert-text{font-weight:500}',
      '.em-close-btn{width:34px;height:34px;border-radius:50%;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.15s;line-height:1;border:none}',
      '@keyframes emFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
      '.em-landing-grid .em-proto-card{animation:emFadeIn 0.2s ease both}',
      '.em-landing-grid .em-proto-card:nth-child(1){animation-delay:0.03s}',
      '.em-landing-grid .em-proto-card:nth-child(2){animation-delay:0.07s}',
      '.em-landing-grid .em-proto-card:nth-child(3){animation-delay:0.11s}',
      '.em-landing-grid .em-proto-card:nth-child(4){animation-delay:0.15s}',
      '.em-landing-grid .em-proto-card:nth-child(5){animation-delay:0.19s}',
      '.em-landing-grid .em-proto-card:nth-child(6){animation-delay:0.23s}',
      '.em-landing-grid .em-proto-card:nth-child(7){animation-delay:0.27s}',
      '#em-content > *{animation:emFadeIn 0.2s ease both}',
      '#em-content > *:nth-child(1){animation-delay:0.02s}',
      '#em-content > *:nth-child(2){animation-delay:0.06s}',
      '#em-content > *:nth-child(3){animation-delay:0.10s}',
      '#em-content > *:nth-child(4){animation-delay:0.14s}',
      '#em-content > *:nth-child(5){animation-delay:0.18s}',
      '#em-content > *:nth-child(6){animation-delay:0.22s}',
      /* LIGHT */
      '#emergency-overlay.em-light{background:#f1f5f9}',
      '#emergency-overlay.em-light #em-overlay-hdr{background:#fff;border-bottom:1px solid #e2e8f0}',
      '#emergency-overlay.em-light .em-title{color:#0f172a}',
      '#emergency-overlay.em-light .em-subtitle{color:#64748b}',
      '#emergency-overlay.em-light .em-back-btn{color:#0f172a}',
      '#emergency-overlay.em-light .em-card{background:#fff;border:1px solid #e2e8f0;box-shadow:0 1px 4px rgba(15,23,42,0.06)}',
      '#emergency-overlay.em-light .em-card-hdr{border-bottom:1px solid #f1f5f9}',
      '#emergency-overlay.em-light .em-row:not(:last-child){border-bottom:1px solid #f1f5f9}',
      '#emergency-overlay.em-light .em-row-val{color:#1e293b}',
      '#emergency-overlay.em-light .em-close-btn{background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0 !important}',
      '#emergency-overlay.em-light .em-close-btn:hover{background:#fef2f2;border-color:#fca5a5 !important;color:#dc2626}',
      '#emergency-overlay.em-light ::-webkit-scrollbar-thumb{background:#cbd5e1}',
      /* DARK */
      '#emergency-overlay.em-dark{background:#0a0f1a}',
      '#emergency-overlay.em-dark #em-overlay-hdr{background:#0d1117;border-bottom:1px solid #1e293b}',
      '#emergency-overlay.em-dark .em-title{color:#f8fafc}',
      '#emergency-overlay.em-dark .em-subtitle{color:#475569}',
      '#emergency-overlay.em-dark .em-back-btn{color:#e2e8f0}',
      '#emergency-overlay.em-dark .em-card{background:#111827;border:1px solid #1e293b}',
      '#emergency-overlay.em-dark .em-card-hdr{border-bottom:1px solid #1e293b}',
      '#emergency-overlay.em-dark .em-row:not(:last-child){border-bottom:1px solid #1e293b}',
      '#emergency-overlay.em-dark .em-row-val{color:#cbd5e1}',
      '#emergency-overlay.em-dark .em-close-btn{background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1) !important}',
      '#emergency-overlay.em-dark .em-close-btn:hover{background:rgba(239,68,68,0.15);border-color:#ef4444 !important;color:#ef4444}',
      '#emergency-overlay.em-dark ::-webkit-scrollbar-thumb{background:#334155}',
    ].join('');
    document.head.appendChild(s);
  }

  var isDark = document.body.classList.contains('dark');
  var overlay = document.createElement('div');
  overlay.id = 'emergency-overlay';
  overlay.className = isDark ? 'em-dark' : 'em-light';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9997;display:flex;flex-direction:column;overflow:hidden';

  // ── Header ───────────────────────────────────────────────────
  var hdr = document.createElement('div');
  hdr.id = 'em-overlay-hdr';
  hdr.style.cssText = 'padding:14px 18px 12px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0';
  hdr.innerHTML =
    '<div id="em-hdr-left" style="display:flex;align-items:center;gap:12px">' +
      '<div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#dc2626,#7f1d1d);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;box-shadow:0 0 14px rgba(220,38,38,0.35)">🚨</div>' +
      '<div>' +
        '<div class="em-title" style="font-size:15px;font-weight:800;letter-spacing:-0.2px">Emergency Mode</div>' +
        '<div class="em-subtitle" style="font-size:11px;margin-top:1px;font-weight:500">Select a protocol</div>' +
      '</div>' +
    '</div>' +
    '<button class="em-close-btn" onclick="closeEmergency()" title="Close">✕</button>';
  overlay.appendChild(hdr);

  // ── Scrollable body ──────────────────────────────────────────
  var body = document.createElement('div');
  body.id = 'em-body';
  body.style.cssText = 'flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch';
  overlay.appendChild(body);

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  // ── Protocol definitions ─────────────────────────────────────
  window._emTabDefs = [
    {label:'HTN Crisis',   hint:'BP ≥180/120 mmHg',        icon:ICONS.heartCrisis, color:'#ef4444', bg:'rgba(239,68,68,0.12)',   bgHover:'rgba(239,68,68,0.2)',   fn: emHTNCrisis},
    {label:'Septic Shock', hint:'MAP <65 + infection',       icon:ICONS.sepsis, color:'#a855f7', bg:'rgba(168,85,247,0.12)',  bgHover:'rgba(168,85,247,0.2)',  fn: emSepticShock},
    {label:'DKA',          hint:'Glucose >11 + ketones >3', icon:ICONS.bgTracker, color:'#0ea5e9', bg:'rgba(14,165,233,0.12)',  bgHover:'rgba(14,165,233,0.2)',  fn: emDKA},
    {label:'HHS',          hint:'Glucose >30, no ketosis',  icon:ICONS.ivFluids, color:'#06b6d4', bg:'rgba(6,182,212,0.12)',   bgHover:'rgba(6,182,212,0.2)',   fn: emHHS},
    {label:'Hypoglycaemia',hint:'BG <4.0 mmol/L',           icon:ICONS.hypo_em, color:'#f59e0b', bg:'rgba(245,158,11,0.12)',  bgHover:'rgba(245,158,11,0.2)',  fn: emHypoglycaemia},
    {label:'Eclampsia',    hint:'Seizure in pre-eclampsia', icon:ICONS.eclampsia, color:'#ec4899', bg:'rgba(236,72,153,0.12)',  bgHover:'rgba(236,72,153,0.2)',  fn: emEclampsia},
    {label:'Haemorrhage',  hint:'Major blood loss >1500 ml',icon:ICONS.haemorrhage, color:'#dc2626', bg:'rgba(220,38,38,0.12)',   bgHover:'rgba(220,38,38,0.2)',   fn: emHaemorrhage},
    {label:'Pulm. Oedema',  hint:'Flash APO / acute LVF',       icon:ICONS.pulmOedema, color:'#0284c7', bg:'rgba(2,132,199,0.12)',    bgHover:'rgba(2,132,199,0.2)',   fn: emPulmOedema},
    {label:'Stroke / CVA',  hint:'Sudden focal neuro deficit',  icon:ICONS.stroke, color:'#7c3aed', bg:'rgba(124,58,237,0.12)',   bgHover:'rgba(124,58,237,0.2)',  fn: emStroke},
    {label:'Acute MI / ACS',hint:'Chest pain + ECG changes',    icon:ICONS.mi, color:'#e11d48', bg:'rgba(225,29,72,0.12)',    bgHover:'rgba(225,29,72,0.2)',   fn: emACS},
    {label:'Pulm. Embolism',hint:'Sudden dyspnoea + hypoxia',   icon:ICONS.bgTracker, color:'#0891b2', bg:'rgba(8,145,178,0.12)',    bgHover:'rgba(8,145,178,0.2)',   fn: emPE},
    {label:'Sickle Cell',   hint:'VOC / ACS / crisis',          icon:ICONS.sickle, color:'#b45309', bg:'rgba(180,83,9,0.12)',     bgHover:'rgba(180,83,9,0.2)',    fn: emSickleCell},
  ];

  showEmLanding();
}

function showEmLanding() {
  var body = document.getElementById('em-body');
  if (!body) return;
  body.innerHTML = '';
  body.style.padding = '0';

  // Reset header subtitle
  var sub = document.querySelector('#emergency-overlay .em-subtitle');
  if (sub) sub.textContent = 'Select a protocol';

  var grid = document.createElement('div');
  grid.className = 'em-landing-grid';

  var defs = window._emTabDefs || [];
  defs.forEach(function(td, i) {
    var card = document.createElement('button');
    card.className = 'em-proto-card';
    card.style.background = td.bg;
    card.style.borderLeft = '3px solid ' + td.color + '88';
    card.innerHTML =
      '<div class="em-proto-icon">' + td.icon + '</div>' +
      '<div class="em-proto-label" style="color:' + td.color + '">' + td.label + '</div>' +
      '<div class="em-proto-hint">' + td.hint + '</div>';
    card.onmouseover = function(){ card.style.background = td.bgHover; card.style.transform = 'translateY(-2px)'; card.style.boxShadow = '0 6px 20px ' + td.color + '30'; };
    card.onmouseout  = function(){ card.style.background = td.bg; card.style.transform = ''; card.style.boxShadow = ''; };
    card.onclick = function() { showEmProtocol(i); };
    // Last card spans full width if odd count
    if (i === defs.length - 1 && defs.length % 2 !== 0) {
      card.style.gridColumn = '1 / -1';
    }
    grid.appendChild(card);
  });

  body.appendChild(grid);
}

function showEmProtocol(idx) {
  var body = document.getElementById('em-body');
  if (!body) return;
  var defs = window._emTabDefs || [];
  var td = defs[idx];
  if (!td) return;

  body.innerHTML = '';
  body.style.padding = '0';

  // Update header subtitle to protocol name
  var sub = document.querySelector('#emergency-overlay .em-subtitle');
  if (sub) sub.textContent = td.icon + ' ' + td.label;

  // Back bar
  var backBar = document.createElement('div');
  backBar.style.cssText = 'padding:10px 16px 6px;flex-shrink:0';
  backBar.innerHTML =
    '<button class="em-back-btn" onclick="showEmLanding()">' +
      '<span style="font-size:16px">←</span>' +
      '<span>All Protocols</span>' +
    '</button>';
  body.appendChild(backBar);

  // Content
  var content = document.createElement('div');
  content.id = 'em-content';
  content.style.cssText = 'padding:6px 14px 28px';
  body.appendChild(content);
  td.fn(content);
}

function closeEmergency() {
  var ov = document.getElementById('emergency-overlay');
  if(ov) { ov.style.display='none'; document.body.style.overflow=''; }
}

function emCard(title, color, rows) {
  var d = document.createElement('div');
  d.className = 'em-card';
  d.style.borderLeft = '3px solid ' + color + '55';

  var hdr = document.createElement('div');
  hdr.className = 'em-card-hdr';
  hdr.style.color = color;
  hdr.style.background = color + '12';
  hdr.innerHTML = '<div class="em-card-hdr-dot" style="background:' + color + ';box-shadow:0 0 6px ' + color + '88"></div>' + title;
  d.appendChild(hdr);

  var body = document.createElement('div');
  body.className = 'em-card-body';
  rows.forEach(function(row, idx) {
    var r = document.createElement('div');
    r.className = 'em-row';
    r.innerHTML =
      '<div class="em-row-key" style="color:' + color + 'cc">' + row[0] + '</div>' +
      '<div class="em-row-val">' + row[1] + '</div>';
    body.appendChild(r);
  });
  d.appendChild(body);
  return d;
}

function emAlert(text, color) {
  var d = document.createElement('div');
  d.className = 'em-alert';
  d.style.background = color + '14';
  d.style.border = '1px solid ' + color + '44';

  // Extract emoji from beginning of text if present
  var parts = text.match(/^(\S+\s)([\s\S]*)/) || ['', '', text];
  var icon = parts[1] ? parts[1].trim() : '⚠';
  var body = parts[2] || text;
  // Only split if first token looks like emoji
  if (!/\p{Emoji}/u.test(icon)) { icon = '⚠'; body = text; }

  d.innerHTML =
    '<div class="em-alert-icon">' + icon + '</div>' +
    '<div class="em-alert-text">' + body + '</div>';
  return d;
}

function emHTNCrisis(c) {
  c.appendChild(emAlert('🚨 Hypertensive Crisis — BP ≥180/120 mmHg. Assess for end-organ damage FIRST (chest pain, neuro signs, visual changes, renal impairment). Urgency vs Emergency determines speed of treatment.', '#ef4444'));

  c.appendChild(emCard('IV Labetalol — First-line (HTN Emergency)', '#ef4444', [
    ['Indication','Hypertensive emergency, aortic dissection, pregnancy'],
    ['Initial dose','20 mg IV bolus over 2 minutes'],
    ['Repeat','40–80 mg IV q10 min as needed'],
    ['Max total','300 mg cumulative'],
    ['Infusion','0.5–2 mg/min IV infusion alternative'],
    ['Avoid','Asthma, severe bradycardia, decompensated HF, cocaine-induced'],
  ]));

  c.appendChild(emCard('IV Hydralazine — Alternative (especially in pregnancy)', '#f97316', [
    ['Initial dose','5–10 mg IV bolus over 2 min'],
    ['Repeat','5–10 mg q20 min PRN'],
    ['Max','30 mg per episode'],
    ['Onset','10–30 minutes'],
    ['Note','Preferred in eclampsia alongside MgSO4'],
  ]));

  c.appendChild(emCard('Oral Nifedipine — Urgency (no end-organ damage)', '#f59e0b', [
    ['Dose','10 mg oral (swallow — do NOT sublingual)'],
    ['Repeat','10–20 mg after 30 min if needed'],
    ['Max','30–40 mg in acute setting'],
    ['Onset','15–30 minutes'],
    ['Caution','Avoid sublingual — rapid drop causes stroke/MI'],
  ]));

  c.appendChild(emCard('BP Reduction Targets', '#94a3b8', [
    ['First hour','Reduce MAP by no more than 25%'],
    ['2–6 hours','Target BP <160/100 mmHg'],
    ['24–48 hours','Gradual normalisation to <140/90'],
    ['Exception','Aortic dissection: target SBP <120 within 20 min'],
  ]));
}

function emSepticShock(c) {
  c.appendChild(emAlert('🦠 Septic Shock — Suspected infection + MAP <65 mmHg + lactate >2 mmol/L despite adequate fluid resuscitation. Start SSC Hour-1 Bundle IMMEDIATELY.', '#a855f7'));

  c.appendChild(emCard('Hour-1 Bundle (Surviving Sepsis Campaign)', '#a855f7', [
    ['1. Blood cultures','≥2 sets before antibiotics — do NOT delay antibiotics for cultures'],
    ['2. Antibiotics','Broad-spectrum IV within 1 HOUR of recognition'],
    ['3. IV Fluids','30 ml/kg crystalloid (0.9% NaCl or Hartmann\'s) within 3 hours if hypoperfusion'],
    ['4. Vasopressors','Start if MAP <65 after fluids. Target MAP ≥65 mmHg'],
    ['5. Lactate','Measure. Remeasure if initial >2 mmol/L. Target <2.'],
  ]));

  c.appendChild(emCard('Noradrenaline — First-line Vasopressor', '#ef4444', [
    ['Dose','0.01–3.3 mcg/kg/min IV infusion'],
    ['Starting dose','0.1–0.2 mcg/kg/min, titrate to MAP ≥65'],
    ['Preparation','4 mg in 50 ml = 80 mcg/ml (standard)'],
    ['Route','Central line preferred; peripheral short-term only'],
    ['Note','First-line vasopressor per SSC 2021'],
  ]));

  c.appendChild(emCard('Adrenaline — Add-on if Norad insufficient', '#f97316', [
    ['Dose','0.01–0.3 mcg/kg/min IV infusion'],
    ['Use','Second vasopressor if MAP not achieved'],
    ['Note','Can cause lactic acidosis — monitor lactate'],
  ]));

  c.appendChild(emCard('Hydrocortisone — Refractory Shock', '#f59e0b', [
    ['Indication','MAP not achieved despite norad ≥0.25 mcg/kg/min'],
    ['Dose','Hydrocortisone 200 mg/day IV (50 mg q6h or infusion)'],
    ['Duration','Until vasopressors no longer needed'],
  ]));
}

function emDKA(c) {
  c.appendChild(emAlert('🩺 DKA — Glucose >11 mmol/L + ketones >3 mmol/L (or pH <7.3 / HCO3 <15). Severity: Mild pH 7.25–7.3 / Moderate 7.0–7.24 / Severe <7.0.', '#0ea5e9'));

  c.appendChild(emCard('Immediate Actions', '#0ea5e9', [
    ['Airway','Protect airway if GCS <8. Consider NGT if vomiting.'],
    ['IV Access','Large bore IV — send bloods: U&E, glucose, VBG, FBC, cultures'],
    ['Monitoring','Hourly glucose, 2-hourly VBG, hourly urine output'],
    ['ECG','Check for hyperkalaemia (peaked T waves)'],
  ]));

  c.appendChild(emCard('IV Fluids — First Priority', '#0ea5e9', [
    ['0–60 min','1 litre 0.9% NaCl over 1 hour'],
    ['1–2 hrs','1 litre 0.9% NaCl over 1 hour'],
    ['2–4 hrs','1 litre 0.9% NaCl over 2 hours'],
    ['4–6 hrs','1 litre 0.9% NaCl over 2 hours'],
    ['When glucose <14','Switch to 0.45% NaCl + 5% Dextrose'],
    ['Add KCl','Add K⁺ to fluids once urine output confirmed (see below)'],
  ]));

  c.appendChild(emCard('Potassium Replacement', '#f59e0b', [
    ['K⁺ <3.5','40 mmol/hr — DO NOT start insulin until K⁺ ≥3.5'],
    ['K⁺ 3.5–5.5','20–40 mmol/hr in IV fluids'],
    ['K⁺ >5.5','Do NOT add K⁺ — recheck in 2 hours'],
  ]));

  c.appendChild(emCard('Insulin Infusion', '#16a34a', [
    ['Start when','K⁺ ≥3.5 mmol/L AND fluids running'],
    ['Rate','0.1 units/kg/hr (fixed rate — do NOT bolus)'],
    ['Target','Glucose fall of 3–4 mmol/L per hour'],
    ['When glucose <14','Add 10% dextrose alongside — do NOT reduce insulin'],
    ['Stop when','pH >7.3, ketones <0.3, HCO3 >18 AND eating'],
    ['Switch','Subcutaneous insulin + meal — overlap 30–60 min'],
  ]));
}

function emHHS(c) {
  c.appendChild(emAlert('💧 HHS — Glucose >30 mmol/L + osmolality >320 mOsm/kg + NO significant ketosis. Usually elderly T2DM. Fluid replacement is PRIMARY treatment — insulin is cautious and delayed.', '#06b6d4'));

  c.appendChild(emCard('Fluid Replacement — First Priority', '#06b6d4', [
    ['0–1 hr','1 litre 0.9% NaCl'],
    ['1–6 hrs','1 litre 0.9% NaCl per hour (slower than DKA)'],
    ['Target','Reduce osmolality by no more than 3–8 mOsm/kg/hr'],
    ['Target','Positive fluid balance 3–6L in first 12 hours'],
    ['Caution','Avoid hypotonic saline — risk of cerebral oedema'],
  ]));

  c.appendChild(emCard('Insulin — Delayed and Cautious', '#f59e0b', [
    ['When to start','Only after fluids running AND glucose not falling'],
    ['Rate','0.05 units/kg/hr (HALF the DKA rate)'],
    ['Target','Glucose fall of 4–6 mmol/L per hour'],
    ['When glucose <15','Add 5% dextrose alongside insulin'],
    ['Caution','Glucose drop too fast → cerebral oedema + hypokalaemia'],
  ]));

  c.appendChild(emCard('Anticoagulation', '#a855f7', [
    ['Indication','All HHS patients unless contraindicated'],
    ['Agent','LMWH (Enoxaparin) prophylactic dose'],
    ['Reason','Hyperviscosity → high VTE risk in HHS'],
  ]));
}

function emHypoglycaemia(c) {
  c.appendChild(emAlert('🍬 Hypoglycaemia — Blood glucose <4.0 mmol/L. Severe if unconscious or unable to swallow. Treat IMMEDIATELY — do not wait for lab confirmation if symptomatic.', '#f59e0b'));

  c.appendChild(emCard('Conscious Patient — Can Swallow', '#16a34a', [
    ['Fast glucose','15–20g fast-acting carbohydrate: 150ml orange juice / 3–4 glucose tablets / 5–6 jelly babies'],
    ['Recheck','After 15 minutes — repeat if still <4.0'],
    ['Follow up','After recovery, give 20g slow-acting carb (biscuit/bread)'],
    ['Sulphonylurea','If caused by sulphonylurea — admit, prolonged monitoring needed'],
  ]));

  c.appendChild(emCard('Unconscious / Unable to Swallow — IV Route', '#ef4444', [
    ['50% Dextrose (D50)','50 ml IV bolus (25g glucose) — flush line after'],
    ['10% Dextrose','250 ml over 15 min — safer, less vein damage'],
    ['Repeat','Recheck glucose after 10 min — repeat D50 if <4.0'],
    ['Maintenance','Start 10% dextrose infusion 100 ml/hr'],
    ['Target','Glucose 6–10 mmol/L'],
  ]));

  c.appendChild(emCard('Glucagon — No IV Access', '#f97316', [
    ['Dose','1 mg IM or SC (adult)'],
    ['Onset','8–10 minutes'],
    ['Note','Less effective in malnourished or alcohol-related hypoglycaemia — liver glycogen depleted'],
    ['After recovery','Give oral carbohydrate immediately after consciousness returns'],
  ]));
}

function emEclampsia(c) {
  c.appendChild(emAlert('🤰 Eclampsia — New onset grand mal seizure in a woman with pre-eclampsia. OBSTETRIC EMERGENCY. Stabilise mother → delivery is definitive treatment.', '#ec4899'));

  c.appendChild(emCard('Immediate Actions', '#ec4899', [
    ['Position','Left lateral position — prevent aortocaval compression'],
    ['Airway','Protect airway — suction, high-flow O2, call anaesthesia'],
    ['IV Access','Large bore IV both arms — bloods: FBC, U&E, LFT, coagulation, uric acid'],
    ['Foetal monitoring','Continuous CTG — prepare for delivery'],
    ['Call','Obstetric + anaesthetic team IMMEDIATELY'],
  ]));

  c.appendChild(emCard('Magnesium Sulphate — First-line Anticonvulsant', '#ec4899', [
    ['Loading dose','4g MgSO4 IV over 15–20 minutes'],
    ['Maintenance','1g/hr IV infusion for 24 hours after last seizure'],
    ['Recurrent seizure','Further 2g IV bolus over 5 min'],
    ['Monitor','Respiratory rate (>12/min), urine output (>25ml/hr), patellar reflexes (must be present)'],
    ['Toxicity signs','Loss of reflexes → respiratory arrest'],
    ['Antidote','Calcium gluconate 1g IV (10ml of 10%) — keep at bedside ALWAYS'],
  ]));

  c.appendChild(emCard('Antihypertensive — If BP ≥160/110', '#f97316', [
    ['IV Labetalol','20 mg IV → 40–80 mg q10 min (max 300 mg)'],
    ['IV Hydralazine','5–10 mg IV q20 min (max 30 mg) — preferred in pregnancy'],
    ['Oral Nifedipine','10 mg oral (swallow — NOT sublingual)'],
    ['Target','SBP 140–155 / DBP 90–105 — do NOT drop too fast'],
  ]));

  c.appendChild(emCard('Delivery', '#a855f7', [
    ['Timing','Deliver after maternal stabilisation — do not delay >4 hours'],
    ['Route','Vaginal delivery if feasible — CS if obstetric indication'],
    ['MgSO4','Continue for 24 hours postpartum'],
  ]));
}

function emHaemorrhage(c) {
  c.appendChild(emAlert('🩸 Major Haemorrhage — Massive blood loss (>1500 ml or >20% blood volume) causing haemodynamic compromise. Activate Major Haemorrhage Protocol.', '#dc2626'));

  c.appendChild(emCard('Immediate Actions — ABCDE', '#dc2626', [
    ['A — Airway','Ensure airway is open and protected. If GCS ≤8 — call anaesthesia for definitive airway.'],
    ['B — Breathing','High-flow O₂ 15L/min via non-rebreather mask. Monitor SpO₂ — target ≥95%.'],
    ['C — Circulation','Two large-bore IVs (16G or larger) both arms. Send bloods: FBC, U&E, LFT, coag, crossmatch 6–10 units, ABG, lactate. Fluid resuscitation immediately.'],
    ['D — Disability','GCS assessment. Check blood glucose. Passive Leg Raise (PLR) — supine with legs elevated 45°. Do NOT use Trendelenburg (head-down) position — no evidence of benefit and worsens cerebral oedema risk.'],
    ['E — Exposure','Fully expose to find bleeding source. Apply direct pressure to external wounds. Keep warm — blankets + warm IV fluids to prevent hypothermia.'],
  ]));

  c.appendChild(emCard('Fluid Resuscitation', '#f97316', [
    ['First','Crystalloid 500 ml bolus — reassess'],
    ['Blood','O-negative blood if type-specific unavailable'],
    ['Ratio','Pack red cells : FFP : platelets = 1:1:1 (damage control)'],
    ['Target','SBP ≥90 (permissive hypotension if no TBI)'],
    ['Avoid','Excessive crystalloid — dilutional coagulopathy'],
  ]));

  c.appendChild(emCard('Tranexamic Acid — Give EARLY', '#ef4444', [
    ['Dose','1g IV over 10 minutes'],
    ['Repeat','1g IV infusion over 8 hours'],
    ['Time window','Most effective within 3 hours of haemorrhage onset'],
    ['Indication','Trauma, PPH, surgical haemorrhage'],
    ['Note','CRASH-2 trial: reduces death from bleeding by 15%'],
  ]));

  c.appendChild(emCard('Obstetric Haemorrhage (PPH) Specific', '#ec4899', [
    ['Oxytocin','10 units IM immediately after delivery'],
    ['Carboprost','250 mcg IM q15 min (max 8 doses) — avoid in asthma'],
    ['Misoprostol','800 mcg sublingual if oxytocin unavailable'],
    ['Ergometrine','500 mcg IM — avoid in hypertension'],
    ['Uterine massage','Bimanual compression while awaiting drugs'],
  ]));
}

function emPulmOedema(c) {
  c.appendChild(emAlert('🫁 Acute Pulmonary Oedema — Sudden onset breathlessness, pink frothy sputum, hypoxia, bilateral crackles. Sit patient upright immediately. This is flash LVF until proven otherwise.', '#0284c7'));

  c.appendChild(emCard('Immediate Actions — LMNOP', '#0284c7', [
    ['Position','Sit fully upright — legs dangling if possible. Do NOT lay flat.'],
    ['O₂','High-flow O₂ 10–15 L/min via non-rebreather mask. Target SpO₂ ≥94%. Consider NIV (CPAP) if available.'],
    ['Morphine','2–4 mg IV slowly (reduces preload + anxiety). Available in most Nigerian tertiary centres. Omit if RR <12 or hypotensive.'],
    ['IV Access','Large bore IV. Bloods: FBC, U&E, troponin, BNP if available, ABG, ECG.'],
    ['Furosemide','40–80 mg IV bolus (first-line). If already on oral furosemide, give double oral dose IV. Onset: 15–30 min.'],
    ['GTN','Sublingual GTN 0.4 mg (1 spray or 1 tablet) every 5 min × 3 if SBP >110 mmHg. Reduces preload rapidly. Available as Nitrolingual spray or tabs.'],
  ]));

  c.appendChild(emCard('Furosemide Dosing (Nigerian Formulary)', '#0284c7', [
    ['No prior diuretic','40 mg IV stat'],
    ['On oral furosemide','Double usual daily dose IV (max 80–120 mg)'],
    ['Severe / renal impairment','80–120 mg IV — titrate to urine output'],
    ['Repeat','Can repeat 40 mg IV after 1 hour if inadequate response'],
    ['Monitor','Urine output hourly. K⁺ — replace if <3.5 mmol/L'],
  ]));

  c.appendChild(emCard('If Not Responding', '#f97316', [
    ['Escalate','ICU/CCU referral for invasive monitoring'],
    ['NIV','CPAP 5–10 cmH₂O if available — reduces intubation rate significantly'],
    ['Avoid','Excessive IV fluids — will worsen oedema'],
    ['Identify cause','MI (troponin), arrhythmia (ECG), hypertensive emergency, valvular disease'],
    ['Dopamine','If hypotensive (SBP <90): Dopamine 5–10 mcg/kg/min — available in most Nigerian hospitals'],
  ]));

  c.appendChild(emCard('Cautions', '#ef4444', [
    ['GTN','Avoid if SBP <90 mmHg or recent PDE5 inhibitor (Sildenafil) use'],
    ['Morphine','Avoid in COPD, severe asthma, obtunded patient'],
    ['Furosemide','Avoid if anuric — check renal function before high doses'],
  ]));
}

function emStroke(c) {
  c.appendChild(emAlert('🧠 Stroke — Sudden focal neurological deficit. USE BE-FAST: Balance, Eyes, Face droop, Arm weakness, Speech difficulty, Time to call. Every minute = ~1.9 million neurons lost. TIME IS BRAIN.', '#7c3aed'));

  c.appendChild(emCard('Immediate Actions (0–10 min)', '#7c3aed', [
    ['Call','Activate stroke team / senior doctor immediately'],
    ['Time','Record exact time of symptom ONSET (not when found). Last-known-well time if onset unwitnessed.'],
    ['Airway','O₂ only if SpO₂ <94%. Avoid hyperoxia.'],
    ['IV Access','Two large-bore IVs. Bloods: FBC, INR/PT, glucose, U&E, group & crossmatch, lipids'],
    ['Glucose','Check BG immediately. Treat hypoglycaemia (<3.5) urgently — can mimic stroke.'],
    ['CT scan','Non-contrast CT brain URGENTLY — to distinguish ischaemic from haemorrhagic'],
    ['BP','Do NOT lower BP unless >220/120 (ischaemic) or >180/105 (if thrombolysis planned). Permissive hypertension in ischaemic stroke.'],
  ]));

  c.appendChild(emCard('Thrombolysis — Alteplase (tPA)', '#7c3aed', [
    ['Indication','Ischaemic stroke confirmed on CT, within 4.5 hours of onset'],
    ['Dose','0.9 mg/kg IV (max 90 mg). 10% as bolus over 1 min, rest over 60 min.'],
    ['Availability','Limited in Nigeria — confirm availability before committing'],
    ['Contraindications','Haemorrhagic stroke, BP >185/110 persistent, INR >1.7, platelets <100, recent surgery/trauma, seizure at onset, blood glucose <2.7 or >22'],
    ['After tPA','ICU/monitored bed, BP <180/105, no anticoagulants for 24 hrs'],
  ]));

  c.appendChild(emCard('Antiplatelet — Most Common Nigerian Pathway', '#0ea5e9', [
    ['Aspirin','300 mg oral/NG stat (if CT confirms ischaemic, no tPA given)'],
    ['Timing','Do NOT give aspirin within 24 hrs of tPA'],
    ['Clopidogrel','75 mg OD — add if cardioembolic or aspirin failure'],
    ['Statin','Atorvastatin 40–80 mg OD — start immediately in ischaemic stroke'],
  ]));

  c.appendChild(emCard('BP Management', '#f97316', [
    ['Ischaemic (no tPA)','Only treat if >220/120. Use oral Amlodipine or Labetalol IV'],
    ['Ischaemic (+ tPA)','Target <185/110 before and <180/105 during/after'],
    ['Haemorrhagic','Target SBP <140 mmHg within 1 hour (IV Labetalol or Hydralazine)'],
    ['Avoid','Sudden BP drops — auto-regulation is impaired in acute stroke'],
  ]));

  c.appendChild(emCard('Do NOT Do', '#ef4444', [
    ['Glucose','Avoid dextrose-containing IV fluids unless hypoglycaemic — hyperglycaemia worsens outcome'],
    ['Anticoag','No heparin or LMWH in acute haemorrhagic stroke'],
    ['Nifedipine','Do NOT use sublingual Nifedipine for BP control — uncontrolled drop'],
    ['Fluids','Avoid hypotonic fluids (0.45% NaCl, 5% Dextrose) — worsen cerebral oedema'],
  ]));
}

function emACS(c) {
  c.appendChild(emAlert('💔 Acute Coronary Syndrome — Chest pain ± radiation to arm/jaw, diaphoresis, nausea, dyspnoea. ECG changes ± troponin rise. Classify: STEMI vs NSTEMI vs Unstable Angina. STEMI = reperfusion emergency.', '#e11d48'));

  c.appendChild(emCard('Immediate Actions — MONA + Heparin', '#e11d48', [
    ['M — Morphine','2–5 mg IV if pain not relieved by GTN. Titrate slowly. Available in Nigerian hospitals.'],
    ['O — Oxygen','Only if SpO₂ <94%. Avoid routine O₂ in normoxic patients — worsens outcomes.'],
    ['N — Nitrates','GTN 0.4 mg sublingual (spray or tablet) q5 min × 3. Avoid if SBP <90 or RV infarct (inferior STEMI).'],
    ['A — Aspirin','300 mg oral stat (chew, do not swallow whole) — ALWAYS unless true allergy'],
    ['Heparin','LMWH: Enoxaparin 1 mg/kg SC BD. Or UFH 60 units/kg IV bolus (max 4000 units) then infusion'],
  ]));

  c.appendChild(emCard('Antiplatelet — Dual Therapy (DAPT)', '#e11d48', [
    ['Aspirin','300 mg loading → 75 mg OD maintenance'],
    ['Clopidogrel','300–600 mg loading dose → 75 mg OD. Widely available in Nigeria. Preferred P2Y12 in resource-limited settings.'],
    ['Ticagrelor','180 mg loading → 90 mg BD if available (superior to clopidogrel but less available)'],
    ['Duration','DAPT for minimum 12 months post-ACS'],
  ]));

  c.appendChild(emCard('STEMI — Reperfusion Strategy', '#dc2626', [
    ['Primary PCI','Preferred if available within 120 min of first medical contact — very limited in Nigeria'],
    ['Thrombolysis','If PCI unavailable within 120 min: Streptokinase 1.5 million units in 100 ml NS over 60 min. Or Alteplase 15 mg IV bolus then 0.75 mg/kg over 30 min.'],
    ['Streptokinase','Most available thrombolytic in Nigeria. Contraindicated if used within past 12 months.'],
    ['Time target','Door-to-needle <30 min for thrombolysis if PCI unavailable'],
    ['Contraindications','Prior stroke, active bleeding, recent surgery, severe uncontrolled HTN, aortic dissection'],
  ]));

  c.appendChild(emCard('Additional Drugs', '#f97316', [
    ['Beta-blocker','Metoprolol 25–50 mg oral BD. Start within 24 hrs if HR >60, SBP >100, no HF. Reduces infarct size.'],
    ['ACE inhibitor','Ramipril 2.5 mg OD — start within 24 hrs, especially if EF reduced or anterior MI'],
    ['Statin','Atorvastatin 80 mg OD — start immediately regardless of baseline cholesterol'],
    ['Anticoag duration','Continue LMWH for minimum 48 hrs or until revascularisation'],
  ]));

  c.appendChild(emCard('Inferior STEMI Caution', '#f59e0b', [
    ['RV infarct','Suspect if inferior STEMI + hypotension + clear lungs'],
    ['Fluids','Give IV fluids (500 ml NS bolus) — RV is preload dependent'],
    ['Avoid','GTN, diuretics, morphine — all reduce preload and can cause cardiovascular collapse'],
    ['ECG','Do right-sided leads (V3R, V4R) to confirm RV involvement'],
  ]));
}

function emPE(c) {
  c.appendChild(emAlert('🩺 Pulmonary Embolism — Sudden dyspnoea, pleuritic chest pain, haemoptysis, tachycardia, hypoxia. Massive PE = haemodynamic compromise (SBP <90 or drop >40 mmHg). Wells score + D-dimer guide workup.', '#0891b2'));

  c.appendChild(emCard('Immediate Stabilisation', '#0891b2', [
    ['O₂','High-flow O₂ — target SpO₂ ≥94%. NIV if severe hypoxia.'],
    ['IV Access','Large bore IV. Bloods: FBC, D-dimer, troponin, BNP, ABG, U&E, coag, group & hold'],
    ['ECG','Classic: sinus tachycardia (most common), S1Q3T3, new RBBB, T-wave inversions V1–V4'],
    ['CTPA','CT Pulmonary Angiogram — gold standard. Request URGENTLY if haemodynamically stable.'],
    ['Echo','Bedside echo if CTPA unavailable — RV dilatation, McConnell sign, D-sign suggests massive PE'],
  ]));

  c.appendChild(emCard('Anticoagulation — Start Immediately if High Suspicion', '#0891b2', [
    ['LMWH','Enoxaparin 1 mg/kg SC BD (renal dose if CrCl <30: 1 mg/kg OD). Most available in Nigeria.'],
    ['UFH','If massive PE or thrombolysis planned: 80 units/kg IV bolus then 18 units/kg/hr infusion. Monitor APTT.'],
    ['When to start','Start anticoag before imaging if clinical probability HIGH and no contraindications'],
    ['Duration','Minimum 3 months. Consider extended therapy if unprovoked.'],
  ]));

  c.appendChild(emCard('Massive PE — Thrombolysis', '#ef4444', [
    ['Indication','Massive PE + haemodynamic compromise (SBP <90 or cardiac arrest)'],
    ['Alteplase','100 mg IV over 2 hours. Or 0.6 mg/kg over 15 min in cardiac arrest (max 50 mg).'],
    ['Streptokinase','1.5 million units over 2 hours — available in Nigeria if Alteplase not stocked'],
    ['After thrombolysis','Hold heparin during infusion, restart when APTT <80 seconds'],
    ['Contraindications','Active bleeding, recent stroke <3 months, recent major surgery/trauma, intracranial neoplasm'],
  ]));

  c.appendChild(emCard('Haemodynamic Support', '#f97316', [
    ['Fluids','Cautious: 250–500 ml NS bolus only. Excessive fluids worsen RV dilatation.'],
    ['Vasopressors','Noradrenaline 0.1–0.3 mcg/kg/min if hypotensive despite fluids'],
    ['Avoid','Large fluid boluses — RV is already strained, over-distension causes septal shift and worse LV filling'],
    ['ICU','All massive/submassive PE needs ICU — call early'],
  ]));

  c.appendChild(emCard('Wells Score — Quick', '#64748b', [
    ['3 pts each','Clinical signs of DVT / PE most likely diagnosis'],
    ['1.5 pts each','HR >100 / Immobilisation >3 days or surgery <4wks / Prior DVT or PE'],
    ['1 pt each','Haemoptysis / Active malignancy'],
    ['Score >4','High probability — CTPA or treat-and-scan'],
    ['Score ≤4','Low/moderate — D-dimer first (if negative, PE excluded)'],
  ]));
}

function emSickleCell(c) {
  c.appendChild(emAlert('🔴 Sickle Cell Crisis — Vaso-occlusive Crisis (VOC) most common: severe bone/back/abdominal pain in known SCD patient. Acute Chest Syndrome (ACS) = most dangerous: new chest infiltrate + fever/pain/hypoxia. BOTH require urgent assessment.', '#b45309'));

  c.appendChild(emCard('Vaso-Occlusive Crisis (VOC) — Pain Management', '#b45309', [
    ['Assess','Pain score (0–10). Onset, location, severity vs baseline crises. Trigger (infection, dehydration, cold).'],
    ['Hydration','IV fluids: 0.9% NaCl or Hartmann\'s 1\u20131.5 × maintenance. Correct dehydration — sickling worsens with haemoconcentration.'],
    ['O₂','Only if SpO₂ <95% — do not give routine O₂ to normoxic patients'],
    ['Mild–Moderate pain','Paracetamol 1g IV/oral q6h + Ibuprofen 400 mg oral TDS (if no renal impairment). NSAIDs highly effective in SCD pain.'],
    ['Moderate–Severe','Add: Dihydrocodeine 30 mg oral q4–6h OR Tramadol 100 mg oral/IV q8h'],
    ['Severe (pain >7/10)','Morphine 0.1 mg/kg IV q20 min titrated. Patient-controlled analgesia ideal if available. Do not under-treat.'],
    ['Folic acid','5 mg daily — continue throughout admission'],
  ]));

  c.appendChild(emCard('Acute Chest Syndrome (ACS) — Emergency', '#ef4444', [
    ['Definition','New pulmonary infiltrate on CXR + ONE of: fever, chest pain, cough, dyspnoea, hypoxia'],
    ['Priority','Life-threatening — mortality 1–3%. Escalate to senior immediately.'],
    ['O₂','High-flow O₂ — target SpO₂ ≥95%'],
    ['Incentive spirometry','Deep breathing exercises — prevent atelectasis (major driver of ACS)'],
    ['Antibiotic','Ceftriaxone 1g IV BD (covers atypicals + pneumococcus) + Azithromycin 500 mg OD × 5 days'],
    ['Analgesia','Adequate pain control — under-treated pain causes splinting → atelectasis → worsens ACS'],
    ['Transfusion','Simple transfusion if Hb drops ≥2g/dL below baseline or SpO₂ <90% despite O₂. Target Hb 10 g/dL.'],
    ['Exchange transfusion','If rapidly worsening — reduce HbS to <30%. Requires haematology input.'],
  ]));

  c.appendChild(emCard('Investigations', '#0ea5e9', [
    ['Bloods','FBC + reticulocyte count, LFT, U&E, LDH, blood culture if febrile, G6PD if transfusing'],
    ['Group & crossmatch','Extended matching for sickle patients — phenotype match reduces alloimmunisation'],
    ['CXR','All ACS — bilateral infiltrates = worse prognosis'],
    ['Sepsis screen','SCD patients are functionally asplenic — high risk of encapsulated organisms (Pneumococcus, Salmonella, H. influenzae)'],
    ['Malaria test','Thick and thin films — Nigeria is endemic; malaria precipitates crisis and mimics ACS'],
  ]));

  c.appendChild(emCard('Fever in SCD — Treat as Emergency', '#f59e0b', [
    ['Risk','Autosplenectomy by age 5 → overwhelming post-splenectomy infection (OPSI)'],
    ['Antibiotic','Ceftriaxone 50 mg/kg IV (child) / 1–2g IV (adult) STAT — do not delay for cultures'],
    ['Temperature','Fever >38.5°C = IV antibiotics within 1 hour of presentation'],
    ['Culture','Blood cultures × 2 before antibiotics but do not delay antibiotics'],
    ['Malaria','Treat empirically if RDT positive or in high-endemic setting — Artemether-Lumefantrine (AL) first line in Nigeria'],
  ]));

  c.appendChild(emCard('Priapism — Urological Emergency', '#a855f7', [
    ['Definition','Painful erection >4 hours in male SCD patients — medical emergency'],
    ['First-line','Analgesia + IV hydration. Encourage urination, warm bath, light exercise.'],
    ['Aspiration','If >4 hours: urological emergency — cavernous aspiration ± phenylephrine injection'],
    ['Exchange transfusion','If recurrent or stuttering priapism — haematology referral'],
    ['Note','Impotence risk increases with each episode — do not under-treat or delay referral'],
  ]));
}

// ── Dark mode ──────────────────────────────────────────────
function toggleDark() {
  var isDark = document.body.classList.toggle('dark');
  try { localStorage.setItem('triad_dark', isDark ? '1' : '0'); } catch(e){}
  var btn = document.getElementById('dark-toggle');
  if(btn) { btn.textContent = isDark ? '' : '🌙'; btn.setAttribute('aria-pressed', isDark ? 'true' : 'false'); }
  var stgBtn = document.getElementById('stg-dark-toggle');
  if(stgBtn) stgBtn.classList.toggle('on', isDark);
  // Fix 2: sync theme-color meta with mode
  var tm = document.querySelector('meta[name="theme-color"]');
  if(tm) tm.content = isDark ? '#141210' : '#f4f1ee';
}
try {
  if(localStorage.getItem('triad_dark')==='1'){
    document.body.classList.add('dark');
    var _tmMeta = document.querySelector('meta[name="theme-color"]');
    if(_tmMeta) _tmMeta.content = '#141210';
    // aria-pressed set after DOM ready
    document.addEventListener('DOMContentLoaded', function(){
      var _dtBtn = document.getElementById('dark-toggle');
      if(_dtBtn) _dtBtn.setAttribute('aria-pressed','true');
    });
  }
} catch(e){}

// ── Search ─────────────────────────────────────────────────
function toggleSearch() {
  var sw = document.getElementById('search-bar-wrap');
  var btn = document.getElementById('search-toggle-btn');
  if(!sw) return;
  sw.classList.toggle('open');
  var isOpen = sw.classList.contains('open');
  if(btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if(isOpen) document.getElementById('search-input').focus();
  else { document.getElementById('search-input').value=''; document.getElementById('search-results').innerHTML=''; }
}
// ── Full-text search index ─────────────────────────────────
var _searchIndex = null;

function onHomeSearchFocus() {
  // Redirect focus to header search for full experience
  var inp = document.getElementById('home-search-input');
  var val = inp ? inp.value : '';
  if (!document.getElementById('search-bar-wrap').classList.contains('open')) {
    toggleSearch();
  }
  var hdrInp = document.getElementById('search-input');
  if (hdrInp) {
    hdrInp.value = val;
    hdrInp.focus();
    if (val.length >= 2) doSearchDebounced(val);
  }
  // Clear home input so it doesn't confuse
  if (inp) inp.value = '';
}

function onHomeSearch(val) {
  // Mirror typing into header search in real time
  if (!document.getElementById('search-bar-wrap').classList.contains('open')) {
    toggleSearch();
  }
  var hdrInp = document.getElementById('search-input');
  if (hdrInp) {
    hdrInp.value = val;
    hdrInp.focus();
    if (val.length >= 2) doSearchDebounced(val);
  }
}

function buildSearchIndex() {
  if (_searchIndex) return;
  _searchIndex = [];
  if (!window._MOD_FNS) {
    var _origId = S.module, _origTab = S.tabs[S.module];
    try {
      var _tmp = document.createElement('div');
      _tmp.id = 'main-content';
      _tmp.style.cssText = 'position:absolute;left:-9999px;visibility:hidden;pointer-events:none';
      var _real = document.getElementById('main-content');
      if (_real) { _real.id = 'main-content-real'; document.body.appendChild(_tmp); renderContent(); _real.id = 'main-content'; document.body.removeChild(_tmp); }
    } catch(e) {}
    S.module = _origId; S.tabs[S.module] = _origTab;
  }
  if (!window._MOD_FNS) return;
  var hidden = document.createElement('div');
  hidden.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:300px;visibility:hidden;pointer-events:none';
  document.body.appendChild(hidden);
  Object.keys(window._MOD_FNS).forEach(function(mod) {
    Object.keys(window._MOD_FNS[mod]).forEach(function(tabLabel) {
      var fn = window._MOD_FNS[mod][tabLabel];
      if (typeof fn !== 'function') return;
      if (tabLabel.indexOf('Review') !== -1) return;
      try {
        hidden.innerHTML = '';
        fn(hidden);
        var raw = (hidden.innerText || hidden.textContent || '').replace(/\s+/g, ' ').toLowerCase();
        var labelText = tabLabel.replace(/[^\w\s]/g, ' ').toLowerCase();
        _searchIndex.push({ mod: mod, tab: tabLabel, text: labelText + ' ' + raw, rawText: raw });
      } catch(e) {}
    });
  });
  document.body.removeChild(hidden);

  // ── Index emergency protocols too ─────────────────────────────
  if (window._emTabDefs) {
    window._emTabDefs.forEach(function(td) {
      try {
        var emDiv = document.createElement('div');
        emDiv.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:300px;visibility:hidden';
        document.body.appendChild(emDiv);
        if (typeof td.fn === 'function') td.fn(emDiv);
        var raw = (emDiv.innerText || emDiv.textContent || '').replace(/\s+/g, ' ').toLowerCase();
        document.body.removeChild(emDiv);
        _searchIndex.push({
          mod: 'EMERGENCY',
          tab: '🚨 ' + td.label,
          text: td.label.toLowerCase() + ' emergency ' + td.hint.toLowerCase() + ' ' + raw,
          rawText: raw,
          emIdx: window._emTabDefs.indexOf(td)
        });
      } catch(e) {}
    });
  }

  // Build typeahead drug/term list from index text
  _searchTypeahead = [];
  var seen = {};
  _searchIndex.forEach(function(entry) {
    // Extract capitalised words 3+ chars as candidate terms (drug names, conditions)
    var words = entry.rawText.split(/\s+/);
    words.forEach(function(w) {
      w = w.replace(/[^a-z0-9\-]/g,'');
      if (w.length >= 3 && !seen[w]) { seen[w] = 1; _searchTypeahead.push(w); }
    });
  });
}

var _searchTimer = null;
var _searchTypeahead = null;

function doSearchDebounced(q) {
  clearTimeout(_searchTimer);
  // Show typeahead suggestions immediately while typing
  showSearchSuggestions(q);
  _searchTimer = setTimeout(function(){ doSearch(q); }, 280);
}

function showSearchSuggestions(q) {
  var sug = document.getElementById('search-suggestions');
  if (!sug) return;
  q = (q || '').toLowerCase().trim();
  if (q.length < 2) { sug.style.display = 'none'; return; }
  if (!_searchIndex) buildSearchIndex();
  if (!_searchTypeahead) return;

  // Match glossary abbreviations first, then typeahead terms
  var matches = [];
  var seen = {};

  // Glossary abbreviation matches (highest priority)
  if (typeof GLOSS !== 'undefined') {
    GLOSS.forEach(function(g) {
      var abbr = g[0].toLowerCase();
      var meaning = g[1].toLowerCase();
      if ((abbr.indexOf(q) === 0 || meaning.indexOf(q) !== -1) && !seen[g[0]]) {
        seen[g[0]] = 1;
        matches.push({ label: g[0] + ' — ' + g[1], value: g[0], type: 'abbr' });
      }
    });
  }

  // Drug/term typeahead
  _searchTypeahead.forEach(function(w) {
    if (w.indexOf(q) === 0 && !seen[w] && matches.length < 8) {
      seen[w] = 1;
      matches.push({ label: w, value: w, type: 'term' });
    }
  });

  matches = matches.slice(0, 7);
  if (!matches.length) { sug.style.display = 'none'; return; }

  sug.innerHTML = matches.map(function(m) {
    var icon = m.type === 'abbr' ? '' : '🔍';
    var hi = m.label.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')', 'gi'),
      '<strong style="color:#0ea5e9">$1</strong>');
    return '<div class="srch-sug" data-val="' + m.value + '" style="padding:8px 14px;cursor:pointer;font-size:12.5px;color:#1e293b;display:flex;align-items:center;gap:8px;border-bottom:1px solid #f1f5f9">' +
      icon + ' <span>' + hi + '</span></div>';
  }).join('');
  sug.style.display = 'block';

  sug.querySelectorAll('.srch-sug').forEach(function(item) {
    item.addEventListener('mousedown', function(e) { e.preventDefault(); });
    item.addEventListener('click', function() {
      var inp = document.getElementById('search-input');
      if (inp) { inp.value = this.getAttribute('data-val'); }
      sug.style.display = 'none';
      doSearch(this.getAttribute('data-val'));
    });
    item.addEventListener('mouseover', function() { this.style.background = '#f0f9ff'; });
    item.addEventListener('mouseout',  function() { this.style.background = ''; });
  });
}

function doSearch(q) {
  var res = document.getElementById('search-results');
  var sug = document.getElementById('search-suggestions');
  if (sug) sug.style.display = 'none';

  if (!q || q.trim().length < 2) {
    res.innerHTML = q && q.trim().length === 1
      ? '<span style="font-size:12px;color:#94a3b8">Type at least 2 characters...</span>'
      : '';
    return;
  }
  q = q.toLowerCase().trim();
  if (!_searchIndex) buildSearchIndex();

  var modColors = { HTN:'#0ea5e9', HYPO:'#a855f7', DM:'#ef4444', COMB:'#64748b', SEPSIS:'#f97316', PAED:'#ec4899', RENAL:'#06b6d4', DRUG:'#16a34a', REVIEW:'#78350f', EMERGENCY:'#ef4444' };
  var modNames  = { HTN:'Hypertension', HYPO:'Hypotension', DM:'Diabetes', COMB:'Combined View', DRUG:'Drug Reference', SEPSIS:'Sepsis', PAED:'Paediatrics', RENAL:'Renal', REVIEW:'Reviews', EMERGENCY:'Emergency' };

  // ── 1. Glossary hits ──────────────────────────────────────────
  var glossHits = [];
  if (typeof GLOSS !== 'undefined') {
    GLOSS.forEach(function(g) {
      if (g[0].toLowerCase() === q || g[0].toLowerCase().indexOf(q) === 0 || g[1].toLowerCase().indexOf(q) !== -1) {
        glossHits.push(g);
      }
    });
  }

  // ── 2. Tab content hits ───────────────────────────────────────
  var hits = [];
  _searchIndex.forEach(function(entry) {
    if (entry.text.indexOf(q) === -1) return;
    var count = 0, idx = 0;
    while ((idx = entry.text.indexOf(q, idx)) !== -1) { count++; idx += q.length; }
    // Build up to 2 snippets from different parts of the text
    var snippets = [];
    var searchFrom = 0;
    for (var s = 0; s < 2; s++) {
      var fi = entry.text.indexOf(q, searchFrom);
      if (fi === -1) break;
      var ss = Math.max(0, fi - 35);
      var se = Math.min(entry.text.length, fi + q.length + 70);
      var snip = entry.text.slice(ss, se).trim();
      if (ss > 0) snip = '...' + snip;
      if (se < entry.text.length) snip += '...';
      snippets.push(snip);
      searchFrom = fi + q.length + 50;
    }
    hits.push({ mod: entry.mod, tab: entry.tab, count: count, snippets: snippets });
  });

  // ── Render ────────────────────────────────────────────────────
  res.innerHTML = '';

  var totalResults = (glossHits.length ? 1 : 0) + hits.length;
  if (!totalResults) {
    res.innerHTML = '<div style="font-size:12px;color:#94a3b8;padding:8px 0">No results for "<strong style="color:#f0f9ff">' + q + '</strong>" — try a broader term</div>';
    return;
  }

  var safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function highlight(text) {
    return text.replace(new RegExp(safeQ, 'gi'), function(m) {
      return '<mark style="background:#fef08a;color:#1e293b;border-radius:2px;padding:0 1px;font-weight:700">' + m + '</mark>';
    });
  }

  var header = document.createElement('div');
  header.style.cssText = 'font-size:11px;color:#94a3b8;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid rgba(255,255,255,0.07)';
  header.innerHTML = '<strong style="color:#f0f9ff">' + totalResults + '</strong> result' + (totalResults > 1 ? 's' : '') + ' for "<strong style="color:#f0f9ff">' + q + '</strong>"';
  res.appendChild(header);

  // Glossary card (if any matches)
  if (glossHits.length) {
    var gc = document.createElement('div');
    gc.style.cssText = 'background:rgba(14,165,233,0.12);border:1px solid rgba(14,165,233,0.3);border-radius:10px;padding:10px 14px;margin-bottom:8px';
    gc.innerHTML = '<div style="font-size:10px;font-weight:700;color:#38bdf8;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px">📖 Glossary — ' + glossHits.length + ' match' + (glossHits.length > 1 ? 'es' : '') + '</div>' +
      glossHits.slice(0, 4).map(function(g) {
        return '<div style="font-size:12.5px;padding:3px 0;display:flex;gap:10px">' +
          '<span style="font-family:monospace;font-weight:700;color:#7dd3fc;min-width:60px;flex-shrink:0">' + highlight(g[0]) + '</span>' +
          '<span style="color:#cbd5e1">' + highlight(g[1]) + '</span></div>';
      }).join('') +
      (glossHits.length > 4 ? '<div style="font-size:11px;color:#64748b;padding-top:4px">+' + (glossHits.length - 4) + ' more in Glossary tab</div>' : '');
    res.appendChild(gc);
  }

  // Tab hits
  hits.sort(function(a, b) { return b.count - a.count; }).slice(0, 8).forEach(function(h) {
    var col = modColors[h.mod] || '#94a3b8';
    var modLabel = modNames[h.mod] || h.mod;
    var btn = document.createElement('button');
    btn.className = 'search-hit';
    btn.style.cssText = 'border-left:3px solid ' + col + ';text-align:left;padding:10px 14px;width:100%;display:block;margin-bottom:4px';
    btn.dataset.mod = h.mod;
    btn.dataset.tab = h.tab;
    btn.dataset.q   = q;
    btn.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">' +
        '<div>' +
          '<span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:' + col + '">' + modLabel + '</span>' +
          '<span style="font-size:10px;color:#94a3b8;margin-left:6px">›</span>' +
          '<span style="font-size:12px;font-weight:600;color:#f0f9ff;margin-left:4px">' + h.tab.replace(/[^\w\s\-]/g, '').trim() + '</span>' +
        '</div>' +
        '<span style="font-size:10px;color:#64748b;background:rgba(255,255,255,0.06);padding:2px 7px;border-radius:10px">' + h.count + ' hit' + (h.count > 1 ? 's' : '') + '</span>' +
      '</div>' +
      h.snippets.map(function(s) {
        return '<div style="font-size:11.5px;color:#94a3b8;line-height:1.55;padding-top:2px">' + highlight(s) + '</div>';
      }).join('');
    btn.addEventListener('click', function() { searchNavigate(this); });
    res.appendChild(btn);
  });

  if (hits.length > 8) {
    var more = document.createElement('div');
    more.style.cssText = 'font-size:11px;color:#64748b;text-align:center;padding:6px 0';
    more.textContent = '+' + (hits.length - 8) + ' more results — refine your search';
    res.appendChild(more);
  }
}



// Initialize with home dashboard
showHomeDashboard();
// Eagerly register _MOD_FNS so search works before any tab is opened
// Just a function-reference map — no rendering, no DOM access
if (!window._MOD_FNS) window._MOD_FNS = {
  HTN: {
    'Prevention': tabHTNPrev, 'Detection': tabHTNDetect, 'Evaluation': tabHTNEval,
    'Treatment': tabHTNTreat, 'Lifestyle': tabLifestyle, 'Risk Profile': tabRiskProfile,
    'ASCVD': tabASCVD, 'Med Checker': tabMedChecker, 'BP Tracker': tabBPTracker,
    'Special Pops': tabSpecialPops, 'BP Measurement': tabBPMeasurement,
    'CVA Protocol': tabCVAProtocol, 'ANC Assessment': tabANCAssessment, 'Reviews': tabReviews,
  },
  HYPO: {
    'Prevention': tabHypoPrev, 'Detection': tabHypoClass, 'Causes': tabHypoCauses,
    'Evaluation': tabHypoEval, 'Management': tabHypoMgmt, 'Shock Protocol': tabShock,
    'Special Cases': tabHypoSpecial, 'Reviews': tabReviews,
  },
  DM: {
    'Prevention': tabDMPrev, 'Detection': tabDMDetect, 'Evaluation': tabDMEval,
    'Type 2 Treatment': tabDMT2, 'Type 1 DM': tabDMT1, 'HbA1c & Targets': tabHbA1c,
    'Insulin Guide': tabInsulin, 'Insulin Chart': tabInsulinChart, 'BG Tracker': tabBGTracker,
    'Complications': tabComplications, 'Glycaemic Emergencies': tabGlycaemicEmergencies, 'Reviews': tabReviews,
  },
  COMB: {
    'HTN + DM': tabCombHTNDM, 'Shared Drugs': tabCombDrugs, 'Shared Targets': tabCombTargets, 'Reviews': tabReviews,
  },
  DRUG: {
    'Antihypertensives': tabDrugAntihypertensives, 'Vasopressors': tabDrugVasopressors,
    'Antidiabetics': tabDrugAntidiabetics, 'Insulin Calc': tabDrugInsulinCalc,
    'Emergency Meds': tabDrugEmergencyMeds, 'IV Fluids': tabDrugFluids,
    'Interactions': tabDrugInteractions, 'Drugs in Pregnancy': tabDrugPregnancy,
    'Psychiatry': tabDrugPsychiatry, 'Antibiotics': tabDrugAntibiotics,
    'Electrolytes': tabDrugElectrolytes, 'Analgesics': tabDrugAnalgesics,
    'Resp & GI': tabDrugRespGI, 'Cardio & Endocrine': tabDrugCardioEndocrine,
    'Neuro & MSK': tabDrugNeuroMSK, 'Antimalarials': tabDrugAntimalarials,
    'Dermatology': tabDrugDermatology, 'Obs & Gynae': tabDrugObsGynae, 'Haematology': tabDrugHaematology,
    'Ophthalmology': tabDrugOphthalmology, 'ENT': tabDrugENT,
    'TB & HIV': tabDrugTBHIV, 'Oncology Support': tabDrugOncologySupport, 'Palliative Care': tabDrugPalliative,
  },
  SEPSIS: {
    'Overview': tabSepsisOverview, 'qSOFA & SOFA': tabSepsisSOFA, 'Hour-1 Bundle': tabSepsisBundle,
    'Empiric Antibiotics': tabSepsisAntibiotics, 'Severity Guide': tabSepsisSeverity,
    'Investigations': tabSepsisInvestigations, 'Reviews': tabReviews,
  },
  PAED: {
    'Drug Doses': tabPaedDrugs, 'Normal Values': tabPaedNormals, 'DKA Protocol': tabPaedDKA,
    'Neonatal Resus': tabPaedNeonatal, 'Fluid Guide': tabPaedFluids, 'Assessment': tabPaedAssessment,
    'Malaria & Fever': tabPaedMalaria, 'Convulsions': tabPaedConvulsions,
    'Malnutrition': tabPaedMalnutrition, 'Sickle Cell': tabPaedSickleCell, 'Reviews': tabReviews,
  },
  RENAL: {
    'eGFR Calculator': tabRenalEGFR, 'AKI Protocol': tabRenalAKI, 'CKD Staging': tabRenalCKD,
    'Complications': tabRenalComplications, 'Dialysis': tabRenalDialysis,
    'Drug Dosing': tabRenalDrugs, 'Reviews': tabReviews,
  },
  REVIEW: {
    'Reviews & Feedback': tabReviews, 'Glossary': tabGlossary,
  },
};




// ── Back to top ────────────────────────────────────────────
window.addEventListener('scroll', function() {
  var btn = document.getElementById('back-to-top');
  if(btn) btn.classList.toggle('visible', window.scrollY > 300);
});
document.getElementById('back-to-top').onclick = function() {
  window.scrollTo({top:0, behavior:'smooth'});
};

// ── Draggable Emergency Button ─────────────────────────────
(function(){
  var btn = document.getElementById('emergency-btn');
  if(!btn) return;
  var dragging = false, startX, startY, origX, origY, moved;

  function getPos() {
    var r = btn.getBoundingClientRect();
    return {x: r.left, y: r.top};
  }

  function onStart(ex, ey) {
    dragging = true; moved = false;
    var pos = getPos();
    origX = pos.x; origY = pos.y;
    startX = ex; startY = ey;
    btn.style.transition = 'none';
    btn.style.right = 'auto';
    btn.style.bottom = 'auto';
    btn.style.left = origX + 'px';
    btn.style.top = origY + 'px';
  }

  function onMove(ex, ey) {
    if(!dragging) return;
    var dx = ex - startX, dy = ey - startY;
    if(Math.abs(dx)>4||Math.abs(dy)>4) moved = true;
    var nx = Math.max(0, Math.min(window.innerWidth-44, origX+dx));
    var ny = Math.max(0, Math.min(window.innerHeight-44, origY+dy));
    btn.style.left = nx + 'px';
    btn.style.top = ny + 'px';
  }

  function onEnd() {
    if(!dragging) return;
    dragging = false;
    if(!moved) openEmergency();
    try { localStorage.setItem('em_btn_pos', JSON.stringify({left:btn.style.left, top:btn.style.top})); } catch(e){}
  }

  // Touch
  btn.addEventListener('touchstart', function(e){ var t=e.touches[0]; onStart(t.clientX,t.clientY); }, {passive:true});
  window.addEventListener('touchmove', function(e){ if(dragging){ e.preventDefault(); var t=e.touches[0]; onMove(t.clientX,t.clientY); } }, {passive:false});
  window.addEventListener('touchend', onEnd);

  // Mouse
  btn.addEventListener('mousedown', function(e){ onStart(e.clientX,e.clientY); e.preventDefault(); });
  window.addEventListener('mousemove', function(e){ onMove(e.clientX,e.clientY); });
  window.addEventListener('mouseup', onEnd);

  // Restore saved position — validate coords fit current viewport
  try {
    var saved = JSON.parse(localStorage.getItem('em_btn_pos'));
    if(saved && saved.left && saved.top) {
      var sl = parseFloat(saved.left), st = parseFloat(saved.top);
      var maxL = window.innerWidth - 44, maxT = window.innerHeight - 44;
      if(sl >= 0 && sl <= maxL && st >= 0 && st <= maxT) {
        btn.style.right='auto'; btn.style.bottom='auto';
        btn.style.left=saved.left; btn.style.top=saved.top;
      } else {
        localStorage.removeItem('em_btn_pos');
      }
    }
  } catch(e){}
})();
// ── Search highlight & scroll ──────────────────────────────
var _pendingSearchTerm = null;

function highlightSearchTerm(term) {
  if (!term) return;
  term = term.trim().toLowerCase();
  var cont = document.getElementById('main-content');
  if (!cont) return;

  // Clear any previous highlights first
  cont.querySelectorAll('.search-highlight').forEach(function(m) {
    var parent = m.parentNode;
    parent.replaceChild(document.createTextNode(m.textContent), m);
    parent.normalize();
  });

  // Walk text nodes and wrap ALL matches
  var nodesToProcess = [];
  function collectTextNodes(node) {
    if (node.nodeType === 3) {
      if (node.nodeValue.toLowerCase().indexOf(term) !== -1) {
        nodesToProcess.push(node);
      }
    } else if (node.nodeType === 1 && !['SCRIPT','STYLE','INPUT','TEXTAREA','BUTTON','SELECT'].includes(node.tagName)) {
      Array.from(node.childNodes).forEach(collectTextNodes);
    }
  }
  collectTextNodes(cont);

  nodesToProcess.forEach(function(node) {
    var txt = node.nodeValue;
    var lowerTxt = txt.toLowerCase();
    var idx = lowerTxt.indexOf(term);
    if (idx === -1 || !node.parentNode) return;
    var frag = document.createDocumentFragment();
    var last = 0;
    while (idx !== -1) {
      if (idx > last) frag.appendChild(document.createTextNode(txt.slice(last, idx)));
      var mark = document.createElement('mark');
      mark.className = 'search-highlight';
      mark.textContent = txt.slice(idx, idx + term.length);
      frag.appendChild(mark);
      last = idx + term.length;
      idx = lowerTxt.indexOf(term, last);
    }
    if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
    node.parentNode.replaceChild(frag, node);
  });

  // Scroll to first highlight
  var first = cont.querySelector('.search-highlight');
  if (first) {
    first.classList.add('search-highlight-first');
    // Use scrollIntoView with a small offset for the sticky header
    var headerH = document.getElementById('app-header') ? document.getElementById('app-header').offsetHeight : 60;
    var rect = first.getBoundingClientRect();
    var scrollTop = window.pageYOffset + rect.top - headerH - 40;
    window.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' });
  }
}

function navTo(tabLabel) {
  var mods = ['HTN','HYPO','DM','COMB','DRUG','SEPSIS','PAED','RENAL','REVIEW'];
  for (var i=0; i<mods.length; i++) {
    var idx = (TABS[mods[i]]||[]).indexOf(tabLabel);
    if (idx >= 0) { showTabContent(mods[i], idx); return; }
  }
}

// HTN tab groups for two-row display
// ── Tab groups for all modules ─────────────────────────────
var MOD_GROUPS = {
  HTN: [
    { label: 'Core',       tabs: ['Prevention','Detection','Evaluation','Treatment','Lifestyle'] },
    { label: 'Tools',      tabs: ['Risk Profile','ASCVD','Med Checker','BP Tracker'] },
    { label: 'Protocols',  tabs: ['Special Pops','BP Measurement','CVA Protocol'] },
    { label: 'Antenatal Care', tabs: ['ANC Assessment'] },
  ],
  HYPO: [
    { label: 'Core',       tabs: ['Prevention','Detection','Causes'] },
    { label: 'Management', tabs: ['Evaluation','Management','Shock Protocol','Special Cases'] },
  ],
  DM: [
    { label: 'Core',          tabs: ['Prevention','Detection','Evaluation'] },
    { label: 'Treatment',     tabs: ['Type 2 Treatment','Type 1 DM','HbA1c & Targets','Insulin Guide'] },
    { label: 'Tools',         tabs: ['Insulin Chart','BG Tracker'] },
    { label: 'Complications', tabs: ['Complications','Glycaemic Emergencies'] },
  ],
  DRUG: [
    { label: 'Cardiac',    tabs: ['Antihypertensives','Vasopressors'] },
    { label: 'Diabetes',   tabs: ['Antidiabetics','Insulin Calc'] },
    { label: 'Emergency',  tabs: ['Emergency Meds','IV Fluids'] },
    { label: 'Reference',  tabs: ['Interactions','Drugs in Pregnancy','Psychiatry'] },
    { label: 'Infect / Electrolytes', tabs: ['Antibiotics','Electrolytes'] },
    { label: 'Pain',       tabs: ['Analgesics'] },
    { label: 'Resp & GI',  tabs: ['Resp & GI'] },
    { label: 'Cardio / Endocrine', tabs: ['Cardio & Endocrine'] },
    { label: 'Neuro / MSK', tabs: ['Neuro & MSK'] },
    { label: 'Antimalarials', tabs: ['Antimalarials'] },
    { label: 'Skin / Eye / ENT', tabs: ['Dermatology','Ophthalmology','ENT'] },
    { label: 'Women / Blood', tabs: ['Obs & Gynae','Haematology'] },
    { label: 'Infect / Oncology', tabs: ['TB & HIV','Oncology Support','Palliative Care'] },
  ], // kept for tab-grid-view grouping only; content nav uses DRUG_SUPER_GROUPS
  REVIEW: [
    { label: 'Feedback',  tabs: ['Reviews & Feedback'] },
    { label: 'Reference', tabs: ['Glossary'] },
  ],
};

// ── DRUG MODULE: Two-level super-group navigation ───────────────
// Level 1 = super-group pills  |  Level 2 = tab row within that group
var DRUG_SUPER_GROUPS = [
  {
    label: '💊 Cardiovascular',
    color: '#0ea5e9',
    tabs:  ['Antihypertensives','Vasopressors','Antidiabetics','Insulin Calc',
            'Cardio & Endocrine','Emergency Meds','IV Fluids'],
  },
  {
    label: '🦠 Infectious Disease',
    color: '#ef4444',
    tabs:  ['Antibiotics','TB & HIV','Antimalarials','Electrolytes'],
  },
  {
    label: '🏥 Speciality',
    color: '#8b5cf6',
    tabs:  ['Analgesics','Resp & GI','Neuro & MSK','Obs & Gynae',
            'Haematology','Dermatology','Ophthalmology','ENT',
            'Oncology Support','Palliative Care'],
  },
  {
    label: '📋 Reference',
    color: '#d97706',
    tabs:  ['Interactions','Drugs in Pregnancy','Psychiatry'],
  },
];
// Active super-group index — persists across tab switches within DRUG module
if (typeof S.drugGroup === 'undefined') S.drugGroup = 0;

function renderGroupedTabs(nav, tabs, groups, activeCls) {
  nav.style.cssText = 'position:-webkit-sticky;position:sticky;top:0;z-index:40;padding:4px 8px 0;display:block;overflow:visible;border-bottom:1px solid #e2e8f0;background:#fff;';
  groups.forEach(function(group) {
    var row = document.createElement('div');
    var isAnc = group.label === 'Antenatal Care';
    row.style.cssText = 'display:flex;align-items:center;margin-bottom:2px;overflow-x:auto;scrollbar-width:none;' + (isAnc ? 'background:#fdf2f8;border-radius:8px;padding:2px 4px;margin-top:2px;border:1px solid #fce7f3;' : '');
    var lbl = document.createElement('span');
    lbl.style.cssText = 'font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.7px;padding:0 10px 0 4px;white-space:nowrap;flex-shrink:0;color:' + (isAnc ? '#db2777' : '#94a3b8') + ';';
    lbl.textContent = group.label;
    row.appendChild(lbl);
    group.tabs.forEach(function(tab) {
      var i = tabs.indexOf(tab);
      if (i === -1) return;
      var b = document.createElement('button');
      b.className = 'tab-btn' + (i === S.tabs[S.module] ? ' ' + activeCls : '');
      b.style.cssText = 'flex-shrink:0;padding:7px 10px;font-size:10.5px;';
      if (tab === '🤰 ANC Assessment') {
        b.style.cssText += 'background:linear-gradient(135deg,#be185d,#ec4899);color:#fff;border-radius:8px;font-weight:700;padding:7px 12px;';
      }
      b.textContent = tab;
      b.onclick = (function(idx){ return function(){ S.tabs[S.module]=idx; renderTabs(); renderContent(); }; })(i);
      row.appendChild(b);
    });
    nav.appendChild(row);
  });
  var divider = document.createElement('div');
  divider.style.cssText = 'height:1px;background:#334155;margin:0 -8px;';
  nav.appendChild(divider);
}


function renderTabs() {
  var nav = document.getElementById('tab-nav');
  nav.innerHTML = '';
  var tabs = TABS[S.module];
  var activeCls = MOD_ACTIVE_CLS[S.module];
  var groups = MOD_GROUPS[S.module];

  // Stick tab-nav exactly below app-header
  var hdr = document.getElementById('app-header');
  if (hdr) nav.style.top = hdr.offsetHeight + 'px';

  // ── GLOBAL GLUCOSE UNIT TOGGLE (DM module only) ──────────────
  if (S.module === 'DM') {
    var uBar = document.createElement('div');
    uBar.style.cssText = 'display:flex;align-items:center;gap:6px;padding:5px 10px;background:#fef2f2;border-bottom:1px solid #fecaca;flex-shrink:0';
    uBar.innerHTML =
      '<span style="font-size:11px;font-weight:700;color:#991b1b;white-space:nowrap">Glucose unit:</span>' +
      '<button id="gu-mgdl" style="padding:3px 12px;border-radius:20px;border:2px solid '+(S.glucoseUnit==='mgdl'?'#dc2626':'#e2e8f0')+';background:'+(S.glucoseUnit==='mgdl'?'#dc2626':'#fff')+';color:'+(S.glucoseUnit==='mgdl'?'#fff':'#64748b')+';font-size:11px;font-weight:700;cursor:pointer">mg/dL</button>' +
      '<button id="gu-mmol" style="padding:3px 12px;border-radius:20px;border:2px solid '+(S.glucoseUnit==='mmol'?'#dc2626':'#e2e8f0')+';background:'+(S.glucoseUnit==='mmol'?'#dc2626':'#fff')+';color:'+(S.glucoseUnit==='mmol'?'#fff':'#64748b')+';font-size:11px;font-weight:700;cursor:pointer">mmol/L</button>' +
      '<span style="font-size:10px;color:#94a3b8">' + (S.glucoseUnit==='mmol' ? 'UK/Europe · thresholds: Normal <5.6 · Prediabetes 5.6–6.9 · DM ≥7.0' : 'US/Nigeria · thresholds: Normal <100 · Prediabetes 100–125 · DM ≥126') + '</span>';
    uBar.querySelector('#gu-mgdl').addEventListener('click', function(){ window._glucoseUnit='mgdl'; renderTabs(); renderContent(); });
    uBar.querySelector('#gu-mmol').addEventListener('click', function(){ window._glucoseUnit='mmol'; renderTabs(); renderContent(); });
    nav.appendChild(uBar);
  }

  if (groups) {
    renderGroupedTabs(nav, tabs, groups, activeCls);
  } else {
    // Single row — COMB and REVIEW (few tabs, no grouping needed)
    nav.style.cssText = 'overflow-x:auto;position:-webkit-sticky;position:sticky;top:0;z-index:40;display:flex;white-space:nowrap;scrollbar-width:none;';
    tabs.forEach(function(tab, i) {
      var b = el('button', {cls:'tab-btn'+(i===S.tabs[S.module]?' '+activeCls:'')});
      b.textContent = tab;
      b.onclick = (function(idx){ return function(){ S.tabs[S.module]=idx; renderTabs(); renderContent(); }; })(i);
      nav.appendChild(b);
    });
  }
}

// ── Loading screen ─────────────────────────────────────────




// ── Back to top ────────────────────────────────────────────
window.addEventListener('scroll', function() {
  var btn = document.getElementById('back-to-top');
  if(btn) btn.classList.toggle('visible', window.scrollY > 300);
});
document.getElementById('back-to-top').onclick = function() {
  window.scrollTo({top:0, behavior:'smooth'});
};

// ── Draggable Emergency Button ─────────────────────────────
(function(){
  var btn = document.getElementById('emergency-btn');
  if(!btn) return;
  var dragging = false, startX, startY, origX, origY, moved;

  function getPos() {
    var r = btn.getBoundingClientRect();
    return {x: r.left, y: r.top};
  }

  function onStart(ex, ey) {
    dragging = true; moved = false;
    var pos = getPos();
    origX = pos.x; origY = pos.y;
    startX = ex; startY = ey;
    btn.style.transition = 'none';
    btn.style.right = 'auto';
    btn.style.bottom = 'auto';
    btn.style.left = origX + 'px';
    btn.style.top = origY + 'px';
  }

  function onMove(ex, ey) {
    if(!dragging) return;
    var dx = ex - startX, dy = ey - startY;
    if(Math.abs(dx)>4||Math.abs(dy)>4) moved = true;
    var nx = Math.max(0, Math.min(window.innerWidth-44, origX+dx));
    var ny = Math.max(0, Math.min(window.innerHeight-44, origY+dy));
    btn.style.left = nx + 'px';
    btn.style.top = ny + 'px';
  }

  function onEnd() {
    if(!dragging) return;
    dragging = false;
    if(!moved) openEmergency();
    try { localStorage.setItem('em_btn_pos', JSON.stringify({left:btn.style.left, top:btn.style.top})); } catch(e){}
  }

  // Touch
  btn.addEventListener('touchstart', function(e){ var t=e.touches[0]; onStart(t.clientX,t.clientY); }, {passive:true});
  window.addEventListener('touchmove', function(e){ if(dragging){ e.preventDefault(); var t=e.touches[0]; onMove(t.clientX,t.clientY); } }, {passive:false});
  window.addEventListener('touchend', onEnd);

  // Mouse
  btn.addEventListener('mousedown', function(e){ onStart(e.clientX,e.clientY); e.preventDefault(); });
  window.addEventListener('mousemove', function(e){ onMove(e.clientX,e.clientY); });
  window.addEventListener('mouseup', onEnd);

  // Restore saved position — clamp to current viewport
  try {
    var saved = JSON.parse(localStorage.getItem('em_btn_pos'));
    if(saved && saved.left && saved.top) {
      var sl = parseFloat(saved.left), st = parseFloat(saved.top);
      var maxL = window.innerWidth - 44, maxT = window.innerHeight - 44;
      if(sl >= 0 && sl <= maxL && st >= 0 && st <= maxT) {
        btn.style.right='auto'; btn.style.bottom='auto';
        btn.style.left=saved.left; btn.style.top=saved.top;
      } else {
        localStorage.removeItem('em_btn_pos');
      }
    }
  } catch(e){}
})();
function renderContent() {
  var cont = document.getElementById('main-content');
  cont.innerHTML = '';
  var tab = TABS[S.module][S.tabs[S.module]];
  if (!window._MOD_FNS) window._MOD_FNS = {
    HTN: {
      'Prevention':   tabHTNPrev,
      'Detection':     tabHTNDetect,
      'Evaluation':    tabHTNEval,
      'Treatment':     tabHTNTreat,
      'Lifestyle':     tabLifestyle,
      'Risk Profile':  tabRiskProfile,
      'ASCVD':         tabASCVD,
      'Med Checker':  tabMedChecker,
      'BP Tracker':    tabBPTracker,
      'Special Pops':  tabSpecialPops,
      'BP Measurement': tabBPMeasurement,
      'CVA Protocol':   tabCVAProtocol,
      'ANC Assessment':  tabANCAssessment,
      'Reviews':         tabReviews,
    },
    HYPO: {
      'Prevention':      tabHypoPrev,
      'Detection':       tabHypoClass,
      'Causes':          tabHypoCauses,
      'Evaluation':      tabHypoEval,
      'Management':      tabHypoMgmt,
      'Shock Protocol':  tabShock,
      'Special Cases':   tabHypoSpecial,
      'Reviews':         tabReviews,
    },
    DM: {
      'Prevention':      tabDMPrev,
      'Detection':        tabDMDetect,
      'Evaluation':       tabDMEval,
      'Type 2 Treatment': tabDMT2,
      'Type 1 DM':        tabDMT1,
      'HbA1c & Targets':  tabHbA1c,
      'Insulin Guide':    tabInsulin,
      'Insulin Chart':    tabInsulinChart,
      'BG Tracker':       tabBGTracker,
      'Complications':    tabComplications,
      'Glycaemic Emergencies': tabGlycaemicEmergencies,
      'Reviews':         tabReviews,
    },
    COMB: {
      'HTN + DM':         tabCombHTNDM,
      'Shared Drugs':     tabCombDrugs,
      'Shared Targets':   tabCombTargets,
      'Reviews':         tabReviews,
    },
    DRUG: {
      'Antihypertensives':   tabDrugAntihypertensives,
      'Vasopressors':        tabDrugVasopressors,
      'Antidiabetics':       tabDrugAntidiabetics,
      'Insulin Calc':        tabDrugInsulinCalc,
      'Emergency Meds':      tabDrugEmergencyMeds,
      'IV Fluids':           tabDrugFluids,
      'Interactions':       tabDrugInteractions,
      'Drugs in Pregnancy':  tabDrugPregnancy,
      'Psychiatry':           tabDrugPsychiatry,
      'Antibiotics':          tabDrugAntibiotics,
      'Electrolytes':         tabDrugElectrolytes,
      'Analgesics':           tabDrugAnalgesics,
      'Resp & GI':            tabDrugRespGI,
      'Cardio & Endocrine':  tabDrugCardioEndocrine,
      'Neuro & MSK':          tabDrugNeuroMSK,
      'Antimalarials':         tabDrugAntimalarials,
      'Dermatology':           tabDrugDermatology,
      'Obs & Gynae':           tabDrugObsGynae,
      'Haematology':           tabDrugHaematology,
      'Ophthalmology':         tabDrugOphthalmology,
      'ENT':                   tabDrugENT,
      'TB & HIV':              tabDrugTBHIV,
      'Oncology Support':      tabDrugOncologySupport,
      'Palliative Care':       tabDrugPalliative,
    },
    SEPSIS: {
      'Overview':             tabSepsisOverview,
      'qSOFA & SOFA':         tabSepsisSOFA,
      'Hour-1 Bundle':        tabSepsisBundle,
      'Empiric Antibiotics':  tabSepsisAntibiotics,
      'Severity Guide':       tabSepsisSeverity,
      'Investigations':       tabSepsisInvestigations,
      'Reviews':              tabReviews,
    },
    PAED: {
      'Drug Doses':           tabPaedDrugs,
      'Normal Values':        tabPaedNormals,
      'DKA Protocol':         tabPaedDKA,
      'Neonatal Resus':       tabPaedNeonatal,
      'Fluid Guide':          tabPaedFluids,
      'Assessment':           tabPaedAssessment,
      'Malaria & Fever':      tabPaedMalaria,
      'Convulsions':           tabPaedConvulsions,
      'Malnutrition':         tabPaedMalnutrition,
      'Sickle Cell':          tabPaedSickleCell,
      'Reviews':              tabReviews,
    },
    RENAL: {
      'eGFR Calculator':      tabRenalEGFR,
      'AKI Protocol':         tabRenalAKI,
      'CKD Staging':          tabRenalCKD,
      'Complications':        tabRenalComplications,
      'Dialysis':             tabRenalDialysis,
      'Drug Dosing':          tabRenalDrugs,
      'Reviews':              tabReviews,
    },
    REVIEW: {
      'Reviews & Feedback':   tabReviews,
      'Glossary':             tabGlossary,
    },
  };
  var modFns = window._MOD_FNS;

  // ── DRUG MODULE: inject two-level nav header before tab content ──
  if (S.module === 'DRUG') {
    renderDrugNav(cont);
    // Re-read tab after nav may have corrected S.tabs.DRUG
    tab = TABS[S.module][S.tabs[S.module]];
  }

  var fn = modFns[S.module] && modFns[S.module][tab];

  // ── Wrapper div so search can target only tab content ───────────
  var tabBody = (S.module === 'DRUG') ? document.createElement('div') : cont;
  if (S.module === 'DRUG') {
    tabBody.id = 'drug-tab-body';
    cont.appendChild(tabBody);
  }

  if (fn) {
    try {
      fn(tabBody);
      wrapTables(tabBody);
    } catch(err) {
      tabBody.innerHTML = '<div style="padding:32px;text-align:center;color:#ef4444">' +
        '<div style="font-size:32px;margin-bottom:12px">⚠️</div>' +
        '<div style="font-weight:700;font-size:15px;margin-bottom:6px">Failed to load this tab</div>' +
        '<div style="font-size:12px;color:#94a3b8">' + (err && err.message ? err.message : 'Unknown error') + '</div>' +
        '</div>';
    }
  }

  // ── DRUG MODULE: inject sticky search bar after content is rendered ──
  if (S.module === 'DRUG') {
    injectDrugSearch(cont, tabBody);
  }
}

// ── DRUG TWO-LEVEL NAV ──────────────────────────────────────────
function renderDrugNav(cont) {
  // Ensure active group contains the currently active tab —
  // if navigated here from tab-grid or search, sync group to match.
  var activeDrugTab = TABS.DRUG[S.tabs.DRUG];
  var groupMatch = -1;
  for (var gi = 0; gi < DRUG_SUPER_GROUPS.length; gi++) {
    if (DRUG_SUPER_GROUPS[gi].tabs.indexOf(activeDrugTab) !== -1) {
      groupMatch = gi;
      break;
    }
  }
  if (groupMatch !== -1) S.drugGroup = groupMatch;

  var cbb = document.getElementById('content-back-bar');
  var cbbH = cbb ? cbb.offsetHeight : 48;

  var nav = document.createElement('div');
  nav.id = 'drug-nav';
  nav.style.cssText = 'position:sticky;top:' + cbbH + 'px;z-index:45;' +
    'background:#fff;border-bottom:1px solid #e2e8f0;' +
    'margin:-24px -18px 20px;padding:0 14px;';

  // ── Level 1: super-group pills ──────────────────────────────
  var l1 = document.createElement('div');
  l1.id = 'drug-l1';
  l1.style.cssText = 'display:flex;gap:6px;padding:8px 0 6px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;';

  DRUG_SUPER_GROUPS.forEach(function(sg, idx) {
    var pill = document.createElement('button');
    pill.className = 'drug-sg-pill' + (idx === S.drugGroup ? ' active' : '');
    pill.setAttribute('data-sg-color', sg.color);
    pill.textContent = sg.label;
    if (idx === S.drugGroup) {
      pill.style.cssText = 'background:' + sg.color + ';color:#fff;border-color:' + sg.color + ';';
    }
    pill.onclick = (function(i, color) {
      return function() {
        S.drugGroup = i;
        // Jump to first tab of this group
        var firstTab = DRUG_SUPER_GROUPS[i].tabs[0];
        S.tabs.DRUG = TABS.DRUG.indexOf(firstTab);
        renderContent();
        window.scrollTo({ top: 0, behavior: 'instant' });
      };
    })(idx, sg.color);
    l1.appendChild(pill);
  });
  nav.appendChild(l1);

  // ── Level 2: tab buttons for active super-group ─────────────
  var activeGroup = DRUG_SUPER_GROUPS[S.drugGroup];
  var l2 = document.createElement('div');
  l2.id = 'drug-l2';
  l2.style.cssText = 'display:flex;gap:0;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding-bottom:1px;';

  activeGroup.tabs.forEach(function(tabName) {
    var tabIdx = TABS.DRUG.indexOf(tabName);
    if (tabIdx === -1) return; // tab not found — skip gracefully
    var isActive = (tabIdx === S.tabs.DRUG);
    var btn = document.createElement('button');
    btn.className = 'drug-tab-btn' + (isActive ? ' active' : '');
    btn.textContent = tabName;
    if (isActive) {
      btn.style.cssText = 'color:' + activeGroup.color + ';border-bottom-color:' + activeGroup.color + ';';
    }
    btn.onclick = (function(i) {
      return function() {
        S.tabs.DRUG = i;
        renderContent();
        window.scrollTo({ top: 0, behavior: 'instant' });
      };
    })(tabIdx);
    l2.appendChild(btn);
  });
  nav.appendChild(l2);

  cont.appendChild(nav);
}

// ── DRUG STICKY SEARCH ──────────────────────────────────────────
function injectDrugSearch(cont, tabBody) {
  // Don't inject on functional tabs (calculators, trackers) — they have their own inputs
  var noSearchTabs = ['Insulin Calc', 'Interactions'];
  var activeName = TABS.DRUG[S.tabs.DRUG];
  if (noSearchTabs.indexOf(activeName) !== -1) return;

  // Calculate sticky top: below content-back-bar + drug-nav
  var nav = document.getElementById('drug-nav');
  var cbb = document.getElementById('content-back-bar');
  var cbbH = cbb ? cbb.offsetHeight : 48;
  var navH = nav ? nav.offsetHeight : 72;
  var stickyTop = cbbH + navH;

  var bar = document.createElement('div');
  bar.id = 'drug-search-bar';
  bar.style.cssText = 'position:sticky;top:' + stickyTop + 'px;z-index:44;' +
    'background:#fff;padding:8px 0 10px;margin-bottom:4px;';

  var input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '🔍 Search drugs in this tab…';
  input.autocomplete = 'off';
  input.spellcheck = false;
  input.style.cssText = 'width:100%;box-sizing:border-box;padding:9px 14px;' +
    'border:1.5px solid #d1d5db;border-radius:10px;font-size:13px;' +
    'background:#f8fafc;color:#1e293b;outline:none;' +
    'transition:border-color 0.15s,box-shadow 0.15s;';
  input.addEventListener('focus', function() {
    this.style.borderColor = '#16a34a';
    this.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.15)';
  });
  input.addEventListener('blur', function() {
    this.style.borderColor = '#d1d5db';
    this.style.boxShadow = 'none';
  });
  bar.appendChild(input);

  // No-results message (hidden by default)
  var noRes = document.createElement('div');
  noRes.id = 'drug-search-noresult';
  noRes.style.cssText = 'display:none;text-align:center;padding:32px 16px;color:#94a3b8;font-size:13px;';
  noRes.innerHTML = '<div style="font-size:28px;margin-bottom:8px">🔍</div>' +
    '<div style="font-weight:600;margin-bottom:4px">No matches found</div>' +
    '<div style="font-size:12px">Try a drug name, class, or indication</div>';

  // Insert bar before tab body content, noRes after
  cont.insertBefore(bar, tabBody);
  tabBody.appendChild(noRes);

  // ── Real-time filter ────────────────────────────────────────
  input.addEventListener('input', function() {
    var q = this.value.trim().toLowerCase();
    var cards = tabBody.querySelectorAll('.card');
    var visible = 0;

    cards.forEach(function(card) {
      if (!q) {
        card.style.display = '';
        visible++;
        return;
      }
      var text = (card.textContent || '').toLowerCase();
      var show = text.indexOf(q) !== -1;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    // Also show/hide any secTitle elements (section headers above cards)
    var secTitles = tabBody.querySelectorAll('.sec-title');
    secTitles.forEach(function(st) { st.style.display = q ? 'none' : ''; });

    noRes.style.display = (q && visible === 0) ? 'block' : 'none';
  });
}

function initApp() { showHomeDashboard(); }
