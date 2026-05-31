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

  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(reg) { console.log('SW registered, scope:', reg.scope); })
      .catch(function(err) { console.warn('SW registration failed:', err); });
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

window.addEventListener('appinstalled', function() {
  deferredPrompt = null;
  var btn = document.getElementById('pwa-cta-btn');
  if (btn) { btn.textContent = 'Installed ✓'; btn.disabled = true; }
});

function triggerPWAInstall() {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    alert('The Triad is already installed on your device.');
    return;
  }
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(r) {
      deferredPrompt = null;
      if (r.outcome === 'accepted') {
        var btn = document.getElementById('pwa-cta-btn');
        if (btn) { btn.innerHTML = 'Installed ✓'; btn.disabled = true; }
      }
    });
  } else {
    var ua = navigator.userAgent;
    if (/iphone|ipad|ipod/i.test(ua)) {
      alert('Tap the Share button in Safari, then tap "Add to Home Screen".');
    } else if (/android/i.test(ua)) {
      alert('Tap the menu (⋮) in Chrome, then tap "Install App".');
    } else {
      alert('Click the install icon in your browser address bar, or open the browser menu and select "Install".');
    }
  }
}

function showInstallBanner() {
  if (document.getElementById('pwa-install-banner')) return;
  var banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#0ea5e9,#7c3aed);color:white;padding:12px 20px;border-radius:12px;font-size:14px;font-weight:bold;display:flex;align-items:center;gap:12px;box-shadow:0 4px 20px rgba(0,0,0,0.3);z-index:9999;max-width:320px;cursor:pointer;';
  banner.innerHTML = '<span style="font-size:20px">&#x1F4F2;</span><div><div>Install The Triad</div><div style="font-size:11px;font-weight:normal;opacity:0.85">Works offline &middot; No app store needed</div></div><button id="pwa-close-btn" style="background:rgba(255,255,255,0.2);border:none;color:white;border-radius:50%;width:24px;height:24px;cursor:pointer;font-size:14px;padding:0;flex-shrink:0;">&#x2715;</button>';
  banner.addEventListener('click', function(ev) {
    if (ev.target.id === 'pwa-close-btn') { ev.stopPropagation(); banner.remove(); return; }
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
