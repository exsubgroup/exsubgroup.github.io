/* Under Construction Overlay — Exsub Group */
(function () {
  if (window.MAINTENANCE_OFF === true) return;
  if (document.getElementById('mcOverlay')) return;

  // ── CONFIG ──
  const C = {
    title:    'We Are Under Construction',
    sub:      'Something beautiful is being built behind the scenes.',
    desc:     'Exsub Group is getting a major upgrade — faster matching, smarter verification, and a cleaner dashboard. We will be back very soon.',
    eta:      'Launching Soon',
    whatsapp: 'https://wa.me/923118937287'
  };

  // ── STYLES ──
  const css = `
    #mcOverlay{position:fixed;inset:0;z-index:2147483647;background:#F5F4EB;color:#211F1F;font-family:Inter,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px;overflow:auto;animation:mcf .3s ease}
    @keyframes mcf{from{opacity:0}to{opacity:1}}
    .mc-card{background:#fff;border:3px solid #211F1F;border-radius:26px;box-shadow:10px 10px 0 0 #211F1F;max-width:560px;width:100%;padding:44px 34px 38px;text-align:center;animation:mcr .5s ease}
    @keyframes mcr{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
    .mc-badge{display:inline-flex;align-items:center;gap:7px;background:#ACD1C0;border:2px solid #211F1F;border-radius:999px;padding:5px 15px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;box-shadow:3px 3px 0 0 #211F1F;margin-bottom:22px}
    .mc-dot{width:8px;height:8px;border-radius:50%;background:#16a34a;animation:mcp 1.4s ease-in-out infinite}
    @keyframes mcp{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.75)}}
    .mc-icon{font-size:72px;line-height:1;display:block;margin-bottom:14px;animation:mcf2 3s ease-in-out infinite}
    @keyframes mcf2{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8px) rotate(3deg)}}
    .mc-h1{font-size:32px;font-weight:900;letter-spacing:-.02em;line-height:1.15;margin-bottom:10px}
    .mc-sub{font-size:15px;font-weight:700;opacity:.75;margin-bottom:16px}
    .mc-div{width:56px;height:4px;background:#ACD1C0;border-radius:999px;margin:0 auto 22px}
    .mc-desc{font-size:14px;color:#4b5563;line-height:1.7;max-width:440px;margin:0 auto 28px}
    .mc-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:13px 30px;border-radius:16px;font-size:13.5px;font-weight:800;border:2.5px solid #211F1F;background:#211F1F;color:#ACD1C0;box-shadow:4px 4px 0 0 #211F1F;cursor:pointer;text-decoration:none;transition:all .12s}
    .mc-btn:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 0 #211F1F}
    .mc-btn:active{transform:translate(2px,2px);box-shadow:2px 2px 0 0 #211F1F}
    .mc-note{font-size:11.5px;color:#6b7280;line-height:1.6;margin-top:20px}
    .mc-note strong{color:#211F1F}
    @media(max-width:600px){.mc-card{padding:34px 22px 30px;border-radius:20px;box-shadow:8px 8px 0 0 #211F1F}.mc-h1{font-size:24px}.mc-icon{font-size:54px}}
  `;
  const st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  // ── MARKUP ──
  const el = document.createElement('div');
  el.id = 'mcOverlay';
  el.innerHTML = `
    <div class="mc-card">
      <div class="mc-badge"><span class="mc-dot"></span> Under Construction</div>
      <span class="mc-icon">🚧</span>
      <h1 class="mc-h1">${C.title}</h1>
      <p class="mc-sub">${C.sub}</p>
      <div class="mc-div"></div>
      <p class="mc-desc">${C.desc}</p>
      <a class="mc-btn" href="${C.whatsapp}" target="_blank" rel="noopener">💬 Contact on WhatsApp</a>
      <p class="mc-note"><strong>${C.eta}</strong> · Thank you for your patience 💚</p>
    </div>
  `;

  const mount = () => {
    document.body.appendChild(el);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);

  window.ExsubMaintenance = {
    hide() {
      el.style.display = 'none';
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    },
    show() {
      el.style.display = 'flex';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
  };
})();