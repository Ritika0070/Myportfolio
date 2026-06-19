/* ============================================
   RITIKA DIXIT PORTFOLIO — SHARED JS (main.js)
   ============================================ */

// ── STARS ──
function buildStars() {
  const wrap = document.getElementById('stars-wrap');
  if (!wrap) return;
  for (let i = 0; i < 150; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random() * 2.5 + 0.6;
    s.style.cssText = `
      width:${sz}px; height:${sz}px;
      top:${Math.random() * 95}%;
      left:${Math.random() * 100}%;
      animation-delay:${Math.random() * 4}s;
      animation-duration:${1.5 + Math.random() * 3}s;
    `;
    wrap.appendChild(s);
  }
}

// ── SUN RAYS ──
function buildSunRays() {
  const sunBody = document.getElementById('sunBody');
  if (!sunBody) return;
  for (let i = 0; i < 12; i++) {
    const ray = document.createElement('div');
    ray.className = 'sun-ray';
    ray.style.cssText = `
      width: 3px; height: 16px;
      position: absolute;
      background: #FFD700; border-radius: 3px;
      top: 50%; left: 50%;
      transform-origin: 50% 0%;
      transform: translateX(-50%) rotate(${i * 30}deg) translateY(-54px);
      opacity: 0.7;
    `;
    sunBody.appendChild(ray);
  }
}

// ── CLOUD BUILDER ──
function makeCloud(w, h, puffs, animDur, animDelay, extraCss) {
  const c = document.createElement('div');
  c.className = 'cloud';
  c.style.cssText = `width:${w}px;height:${h}px;animation-duration:${animDur}s;animation-delay:${animDelay}s;${extraCss}`;
  puffs.forEach(p => {
    const puff = document.createElement('div');
    puff.className = 'puff';
    puff.style.cssText = `width:${p.w}px;height:${p.h}px;left:${p.l}px;top:${p.t}px;`;
    c.appendChild(puff);
  });
  return c;
}

function buildClouds() {
  const topWrap = document.getElementById('clouds-top');
  const botWrap = document.getElementById('clouds-bottom');
  if (!topWrap || !botWrap) return;

  // TOP clouds
  const topClouds = [
    { w:350, h:100, puffs:[{w:160,h:140,l:50,t:-70},{w:110,h:100,l:180,t:-55},{w:80,h:80,l:270,t:-45}],  dur:32, delay:0,   css:'top:-40px;left:-200px;' },
    { w:250, h:80,  puffs:[{w:120,h:110,l:30,t:-55},{w:90,h:85,l:140,t:-45}],                             dur:26, delay:-12, css:'top:-30px;left:-100px;' },
    { w:200, h:70,  puffs:[{w:95,h:88,l:25,t:-48},{w:70,h:70,l:115,t:-38}],                               dur:38, delay:-6,  css:'top:-25px;left:-150px;' },
    { w:300, h:90,  puffs:[{w:140,h:125,l:40,t:-65},{w:100,h:95,l:165,t:-52}],                            dur:30, delay:-20, css:'top:-35px;left:-120px;' },
  ];
  topClouds.forEach(cd => topWrap.appendChild(makeCloud(cd.w, cd.h, cd.puffs, cd.dur, cd.delay, cd.css)));

  // BOTTOM clouds
  const botClouds = [
    { w:420, h:120, puffs:[{w:190,h:165,l:60,t:-90},{w:140,h:125,l:220,t:-70},{w:100,h:100,l:330,t:-55}], dur:34, delay:0,   css:'bottom:-50px;left:-220px;' },
    { w:300, h:95,  puffs:[{w:140,h:125,l:40,t:-68},{w:105,h:100,l:170,t:-55}],                            dur:28, delay:-14, css:'bottom:-40px;left:-150px;' },
    { w:260, h:85,  puffs:[{w:120,h:110,l:35,t:-60},{w:90,h:88,l:150,t:-50}],                              dur:40, delay:-7,  css:'bottom:-35px;left:-130px;' },
    { w:380, h:110, puffs:[{w:175,h:150,l:55,t:-80},{w:125,h:115,l:205,t:-65},{w:90,h:90,l:305,t:-50}],   dur:36, delay:-22, css:'bottom:-45px;left:-190px;' },
    { w:220, h:75,  puffs:[{w:100,h:95,l:30,t:-52},{w:75,h:72,l:130,t:-42}],                               dur:24, delay:-9,  css:'bottom:-30px;left:-110px;' },
  ];
  botClouds.forEach(cd => botWrap.appendChild(makeCloud(cd.w, cd.h, cd.puffs, cd.dur, cd.delay, cd.css)));
}

// ── DAY / NIGHT TOGGLE ──
function buildToggle() {
  const toggle = document.getElementById('mode-toggle');
  if (!toggle) return;

  // Restore saved mode
  const saved = localStorage.getItem('portfolioMode');
  if (saved === 'night') {
    document.body.classList.replace('day', 'night');
    toggle.textContent = '🌙';
  }

  toggle.addEventListener('click', () => {
    const isNight = document.body.classList.contains('night');
    if (isNight) {
      document.body.classList.replace('night', 'day');
      toggle.textContent = '☀️';
      localStorage.setItem('portfolioMode', 'day');
    } else {
      document.body.classList.replace('day', 'night');
      toggle.textContent = '🌙';
      localStorage.setItem('portfolioMode', 'night');
    }
  });
}

// ── NAVBAR ACTIVE LINK ──
function buildNavActive() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── SCROLL REVEAL ──
function buildScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
}

// ── INIT ALL ──
document.addEventListener('DOMContentLoaded', () => {
  buildStars();
  buildSunRays();
  buildClouds();
  buildToggle();
  buildNavActive();
  buildScrollReveal();
});