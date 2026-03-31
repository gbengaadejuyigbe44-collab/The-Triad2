function printCurrent() {
  var modNames = {HTN:'Hypertension', HYPO:'Hypotension', DM:'Diabetes', COMB:'Combined View', DRUG:'Drug Reference', SEPSIS:'Sepsis', PAED:'Paediatrics', RENAL:'Renal', REVIEW:'Reviews'};
  var modName  = modNames[S.module] || S.module || 'Clinical Reference';
  var tabName  = TABS[S.module] ? (TABS[S.module][S.tabs[S.module]] || '') : '';
  var cleanTab = tabName.replace(/[^\x00-\x7F]/g, '').replace(/^[\s\u00b7]+/, '').trim();

  var titleEl = document.getElementById('print-title');
  if (titleEl) {
    titleEl.textContent = cleanTab
      ? modName + '  \u203a  ' + cleanTab
      : modName + ' \u2014 The Triad Clinical Decision Support';
  }

  var dateEl = document.getElementById('print-date');
  if (dateEl) {
    var now = new Date();
    dateEl.textContent = 'Printed: ' + now.toLocaleDateString('en-GB', {weekday:'short', day:'numeric', month:'long', year:'numeric'})
      + '  \u00b7  ' + now.toLocaleTimeString('en-GB', {hour:'2-digit', minute:'2-digit'});
  }

  window.print();
}

function printClassifierResult(sourceId, titleText) {
  var src = document.getElementById(sourceId);
  if (!src) return;
  var zone = document.getElementById('result-print-zone');
  if (!zone) return;

  var now = new Date();
  var dateStr = now.toLocaleDateString('en-GB', {weekday:'short', day:'numeric', month:'long', year:'numeric'})
    + '  \u00b7  ' + now.toLocaleTimeString('en-GB', {hour:'2-digit', minute:'2-digit'});

  // Build header
  var headerHTML =
    '<div style="display:flex;align-items:center;gap:12px;padding-bottom:12px;margin-bottom:16px;border-bottom:3px solid #0ea5e9">' +
      '<div style="flex:1">' +
        '<div style="font-size:18px;font-weight:900;color:#0f172a;letter-spacing:-0.3px">The Triad</div>' +
        '<div style="font-size:11px;font-weight:700;color:#0ea5e9;text-transform:uppercase;letter-spacing:0.6px;margin-top:1px">Clinical Decision Support \u00b7 ' + titleText + '</div>' +
      '</div>' +
      '<div style="text-align:right;font-size:10px;color:#94a3b8;line-height:1.6">' + dateStr + '<br>v3.1 \u00b7 the-triad.netlify.app</div>' +
    '</div>';

  // Clone result, strip print buttons
  var clone = src.cloneNode(true);
  clone.querySelectorAll('.result-print-btn').forEach(function(b){ b.remove(); });

  var disclaimerHTML =
    '<div style="margin-top:16px;padding:7px 10px;background:#fef9f0;border:1px solid #fed7aa;border-radius:6px;font-size:9.5px;color:#92400e;line-height:1.5">' +
      '\u26a0\ufe0f <strong>Clinical Reference Only.</strong> Generated from guideline-based algorithms (ESC/ESH 2023, ADA 2024, SSC 2021). Does not replace clinical judgment or institutional protocols. Verify all drug doses before administration. For licensed healthcare professionals only.' +
    '</div>';

  zone.innerHTML = headerHTML + '<div id="rp-clone-target"></div>' + disclaimerHTML;
  document.getElementById('rp-clone-target').appendChild(clone);

  // Use beforeprint/afterprint for reliable isolated printing
  function beforePrint() {
    document.body.classList.add('result-printing');
  }
  function afterPrint() {
    document.body.classList.remove('result-printing');
    zone.innerHTML = '';
    window.removeEventListener('beforeprint', beforePrint);
    window.removeEventListener('afterprint', afterPrint);
  }

  window.addEventListener('beforeprint', beforePrint);
  window.addEventListener('afterprint', afterPrint);
  window.print();
}

function showWelcome() {
  var w = document.getElementById('welcome-screen');
  w.style.display = 'flex';
}
function dismissWelcome() {
  var w = document.getElementById('welcome-screen');
  w.style.opacity = '0';
  w.style.transition = 'opacity 0.3s';
  setTimeout(function(){
    w.style.display = 'none';
    if (window.startTour) setTimeout(function(){ window.startTour(false); }, 600);
  }, 300);
}

