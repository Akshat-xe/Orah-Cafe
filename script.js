/* Orah Cafe — script.js */

/* ─── Navbar scroll ───────────────────────────────────────────────────────── */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ─── Active nav link ─────────────────────────────────────────────────────── */
(function () {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path) a.classList.add('active');
  });
})();

/* ─── Mobile menu ─────────────────────────────────────────────────────────── */
(function () {
  const btn     = document.getElementById('nav-hamburger');
  const backdrop = document.getElementById('mob-backdrop');
  const menu    = document.getElementById('mob-menu');
  const close   = document.getElementById('mob-menu-close');

  function open()  { backdrop && backdrop.classList.add('open'); menu && menu.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function shut()  { backdrop && backdrop.classList.remove('open'); menu && menu.classList.remove('open'); document.body.style.overflow = ''; }

  if (btn)      btn.addEventListener('click', open);
  if (backdrop) backdrop.addEventListener('click', shut);
  if (close)    close.addEventListener('click', shut);
  document.querySelectorAll('#mob-menu a').forEach(a => a.addEventListener('click', shut));
})();

/* ─── Image slider (crossfade) ─────────────────────────────────────────────── */
function initSlider(wrapId, intervalMs) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  const imgs = wrap.querySelectorAll('img');
  if (!imgs.length) return;
  let idx = 0;
  imgs[0].classList.add('active');
  setInterval(() => {
    imgs[idx].classList.remove('active');
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add('active');
  }, intervalMs || 2200);
}

/* ─── Popular Times chart ──────────────────────────────────────────────────── */
(function () {
  const data = {
    MON: [12, 22, 38, 52, 64, 78, 86, 88, 72, 50, 30, 20, 14, 10, 8, 6],
    TUE: [14, 26, 44, 60, 74, 86, 92, 94, 82, 56, 32, 22, 16, 12, 10, 8],
    WED: [14, 28, 46, 62, 76, 86, 92, 92, 80, 54, 32, 22, 16, 12, 10, 8],
    THU: [16, 30, 48, 66, 80, 90, 94, 96, 84, 58, 34, 22, 16, 12, 10, 8],
    FRI: [18, 32, 52, 70, 86, 94, 98, 98, 88, 62, 36, 24, 18, 14, 12, 10],
    SAT: [0, 0, 36, 58, 74, 70, 50, 34, 18, 10, 6, 4, 4, 0, 0, 0],
    SUN: [0, 0, 16, 22, 32, 42, 44, 36, 22, 14, 8, 6, 4, 0, 0, 0],
  };
  const summaries = {
    MON: { peak: '11a–1p', vibe: 'Steady working-day rush' },
    TUE: { peak: '10a–2p', vibe: 'Strong, broad lunch peak' },
    WED: { peak: '10:30a–2p', vibe: 'Smooth, balanced midday' },
    THU: { peak: '11a–2p', vibe: 'Confident pre-weekend buzz' },
    FRI: { peak: '10a–2p', vibe: 'Busiest day of the week' },
    SAT: { peak: '9a–11a', vibe: 'Short brunch spike, quiet after' },
    SUN: { peak: '10a–1p', vibe: 'Lightest day — easy seats' },
  };
  const dayLabels = { MON: 'Mon', TUE: 'Tue', WED: 'Wed', THU: 'Thu', FRI: 'Fri', SAT: 'Sat', SUN: 'Sun' };

  const section = document.getElementById('popular-times');
  if (!section) return;
  const barsWrap = section.querySelector('#pt-bars');
  const dayLabel = section.querySelector('#pt-day-label');
  const peakLabel = section.querySelector('#pt-peak-label');
  const vibeLabel = section.querySelector('#pt-vibe-label');
  const liveDot   = section.querySelector('#pt-live-dot');
  const dayBtns   = section.querySelectorAll('.pt-day-btn');

  let activeDay = 'FRI';

  function renderDay(day) {
    activeDay = day;
    const bars = data[day];
    const max = Math.max(...bars, 1);
    const peakIdx = bars.indexOf(Math.max(...bars));

    // Update bars
    if (barsWrap) {
      const barEls = barsWrap.querySelectorAll('.pt-bar');
      barEls.forEach((bar, i) => {
        bar.classList.remove('peak', 'live');
        bar.style.height = ((bars[i] / max) * 100) + '%';
        if (i === peakIdx) bar.classList.add('peak');
        if (day === 'FRI' && i === 5) bar.classList.add('live');
      });
    }

    // Update summary
    if (dayLabel) dayLabel.textContent = dayLabels[day];
    if (peakLabel) peakLabel.textContent = summaries[day].peak;
    if (vibeLabel) vibeLabel.textContent = summaries[day].vibe;

    // Live dot
    if (liveDot) liveDot.style.display = day === 'FRI' ? 'inline-flex' : 'none';

    // Active button
    dayBtns.forEach(b => b.classList.toggle('active', b.dataset.day === day));
  }

  dayBtns.forEach(btn => btn.addEventListener('click', () => renderDay(btn.dataset.day)));

  // Initial render
  requestAnimationFrame(() => renderDay('FRI'));
})();

/* ─── FAQ accordion ────────────────────────────────────────────────────────── */
(function () {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ─── Menu sidebar scroll-spy ──────────────────────────────────────────────── */
(function () {
  const sidebar = document.querySelector('.menu-sidebar');
  if (!sidebar) return;
  const sections = document.querySelectorAll('.cat-block');
  if (!sections.length) return;
  let scrolling = false;

  const obs = new IntersectionObserver((entries) => {
    if (scrolling) return;
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        document.querySelectorAll('.menu-sidebar-link').forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
        const mobActive = document.querySelector('.menu-mob-active');
        if (mobActive) {
          const cat = document.querySelector('.cat-block#' + id + ' .cat-title');
          if (cat) mobActive.textContent = cat.textContent;
        }
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => obs.observe(s));

  // Sidebar link click
  document.querySelectorAll('.menu-sidebar-link, .menu-mob-link').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href') || '#' + link.dataset.cat;
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      scrolling = true;
      const offset = 132;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      document.querySelectorAll('.menu-sidebar-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const mobActive = document.querySelector('.menu-mob-active');
      if (mobActive) { const cat = el.querySelector('.cat-title'); if (cat) mobActive.textContent = cat.textContent; }
      // Close mobile dropdown
      const mobNav = document.querySelector('.menu-mob-nav');
      if (mobNav) mobNav.classList.remove('open');
      setTimeout(() => { scrolling = false; }, 900);
    });
  });

  // Mobile dropdown toggle
  const mobToggle = document.querySelector('.menu-mob-toggle');
  const mobNav = document.querySelector('.menu-mob-nav');
  if (mobToggle && mobNav) {
    mobToggle.addEventListener('click', () => mobNav.classList.toggle('open'));
  }
})();

/* ─── Scroll reveal ────────────────────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
})();

/* ─── Hash scroll on load ──────────────────────────────────────────────────── */
(function () {
  if (!window.location.hash) return;
  const el = document.querySelector(window.location.hash);
  if (!el) return;
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
})();

/* ─── Init sliders ─────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  initSlider('hero-slider', 2200);
  initSlider('why-large-slider', 2200);
  initSlider('why-small-slider', 2200);
});

// Patch 2.0.0
