// ── PWA SERVICE WORKER ───────────────────────────────────────
(function() {
  if (!('serviceWorker' in navigator)) return;
  try {
    var proto = window.location.protocol;
    if (proto !== 'https:' && proto !== 'http:' && proto !== 'file:') return;
    if (window.self !== window.top) {
      try { window.top.location.href; } catch(e) { return; }
    }
  } catch(e) { return; }

  var swLines = [
    'var CACHE = "triad-v3-2";',
    'var OFFLINE_URL = self.registration.scope;',
    'self.addEventListener("install", function(e) {',
    '  e.waitUntil(caches.open(CACHE).then(function(c) {',
    '    return fetch(OFFLINE_URL).then(function(r) { return c.put(OFFLINE_URL, r); }).catch(function(){});',
    '  }));',
    '  self.skipWaiting();',
    '});',
    'self.addEventListener("activate", function(e) {',
    '  e.waitUntil(caches.keys().then(function(keys) {',
    '    return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));',
    '  }));',
    '  self.clients.claim();',
    '});',
    'self.addEventListener("fetch", function(e) {',
    '  if (e.request.method !== "GET") return;',
    '  e.respondWith(caches.match(e.request).then(function(cached) {',
    '    if (cached) return cached;',
    '    return fetch(e.request).then(function(resp) {',
    '      if (!resp || resp.status !== 200 || resp.type === "opaque") return resp;',
    '      var clone = resp.clone();',
    '      caches.open(CACHE).then(function(c) { c.put(e.request, clone); });',
    '      return resp;',
    '    }).catch(function() { return caches.match(OFFLINE_URL); });',
    '  }));',
    '});'
  ];

  window.addEventListener('load', function() {
    var blob = new Blob([swLines.join('\n')], { type: 'text/javascript' });
    var swURL = URL.createObjectURL(blob);
    navigator.serviceWorker.register(swURL)
      .then(function(reg) { URL.revokeObjectURL(swURL); })
      .catch(function() { URL.revokeObjectURL(swURL); });
  });
})();

// ── PWA INSTALL PROMPT ───────────────────────────────────────
var deferredPrompt = null;
window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  deferredPrompt = e;
  if (!window.matchMedia('(display-mode: standalone)').matches) {
    showInstallBanner();
  }
});

function showInstallBanner() {
  if (document.getElementById('pwa-install-banner')) return;
  var banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#0ea5e9,#7c3aed);color:white;padding:12px 20px;border-radius:12px;font-size:14px;font-weight:bold;display:flex;align-items:center;gap:12px;box-shadow:0 4px 20px rgba(0,0,0,0.3);z-index:9999;max-width:320px;cursor:pointer;';
  banner.innerHTML = '<span style="font-size:20px">&#x1F4F2;</span><div><div>Install The Triad</div><div style="font-size:11px;font-weight:normal;opacity:0.85">Works offline &middot; No app store needed</div></div><button id="pwa-close-btn" style="background:rgba(255,255,255,0.2);border:none;color:white;border-radius:50%;width:24px;height:24px;cursor:pointer;font-size:14px;padding:0;flex-shrink:0;">&#x2715;</button>';
  var closeBtn = document.getElementById('pwa-close-btn');
  if (closeBtn) { closeBtn.onclick = function(e) { e.stopPropagation(); banner.remove(); }; }
  banner.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'BUTTON') return;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function() { deferredPrompt = null; banner.remove(); });
    }
  });
  var st = document.createElement('style');
  st.textContent = '@keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
  document.head.appendChild(st);
  banner.style.animation = 'slideUp 0.4s ease';
  document.body.appendChild(banner);
  setTimeout(function() { if (banner.parentNode) banner.remove(); }, 10000);
}
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
