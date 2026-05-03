/* ================================================
   ASABHI COMPANY LIMITED — Global JavaScript
   Stack: Lenis · GSAP + ScrollTrigger · Swiper
   ================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ── LENIS SMOOTH SCROLL ────────────────────────── */
const lenis = new Lenis({
  duration: 1.3,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});
function lenisRaf(time) { lenis.raf(time); requestAnimationFrame(lenisRaf); }
requestAnimationFrame(lenisRaf);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ── CUSTOM CURSOR ─────────────────────────────── */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouse = { x: 0, y: 0 };
let ringPos = { x: 0, y: 0 };

document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  dot.style.left  = mouse.x + 'px';
  dot.style.top   = mouse.y + 'px';
});
document.addEventListener('mousedown', () => dot.classList.add('click'));
document.addEventListener('mouseup',   () => dot.classList.remove('click'));

(function lerpRing() {
  ringPos.x += (mouse.x - ringPos.x) * 0.14;
  ringPos.y += (mouse.y - ringPos.y) * 0.14;
  ring.style.left = ringPos.x + 'px';
  ring.style.top  = ringPos.y + 'px';
  requestAnimationFrame(lerpRing);
})();

document.querySelectorAll('a, button, .product-card, .service-card, .testimonial-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

/* ── LOADER ─────────────────────────────────────── */
const loaderEl  = document.getElementById('loader');
const loaderBar = document.getElementById('loaderProgress');

let pct = 0;
const ticker = setInterval(() => {
  pct = Math.min(pct + Math.random() * 20, 100);
  if (loaderBar) loaderBar.style.width = pct + '%';
  if (pct >= 100) {
    clearInterval(ticker);
    setTimeout(() => {
      gsap.to(loaderEl, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power3.inOut',
        onComplete: () => {
          loaderEl.style.display = 'none';
          initHeroAnimations();
        }
      });
    }, 300);
  }
}, 70);

/* ── HEADER ─────────────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
  const btt = document.getElementById('backToTop');
  if (btt) btt.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ── MOBILE MENU ────────────────────────────────── */
const burger  = document.getElementById('navBurger');
const mobile  = document.getElementById('navMobile');
const overlay = document.getElementById('navOverlay');

function openMenu()  {
  mobile.classList.add('open');
  overlay && overlay.classList.add('open');
  burger.classList.add('open');
  lenis.stop();
}
function closeMenu() {
  mobile.classList.remove('open');
  overlay && overlay.classList.remove('open');
  burger.classList.remove('open');
  lenis.start();
}
if (burger) burger.addEventListener('click', () =>
  mobile.classList.contains('open') ? closeMenu() : openMenu()
);
if (overlay) overlay.addEventListener('click', closeMenu);
document.querySelectorAll('.nav__mobile-link').forEach(l => l.addEventListener('click', closeMenu));

/* ── BACK TO TOP ────────────────────────────────── */
const btt = document.getElementById('backToTop');
if (btt) btt.addEventListener('click', () => lenis.scrollTo(0, { duration: 1.5 }));

/* ── HERO BG PARALLAX (Lenis-aware) ─────────────── */
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  setTimeout(() => heroBg.classList.add('loaded'), 100);
  gsap.to(heroBg, {
    yPercent: 22,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    }
  });
}

/* ── HERO ANIMATIONS ────────────────────────────── */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl
    .to('#heroTag',     { opacity: 1, y: 0, duration: 0.7 }, 0)
    .to('#heroTitle',   { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, 0.15)
    .to('#heroDesc',    { opacity: 1, y: 0, duration: 0.8 }, 0.4)
    .to('#heroActions', { opacity: 1, y: 0, duration: 0.7 }, 0.6);

  /* Services strip */
  gsap.to('.service-card', {
    scrollTrigger: { trigger: '.services-strip', start: 'top 82%' },
    opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
  });

  /* About */
  gsap.to('.fade-left', {
    scrollTrigger: { trigger: '.about', start: 'top 75%' },
    opacity: 1, x: 0, duration: 0.9, ease: 'power3.out'
  });
  gsap.to('.fade-right', {
    scrollTrigger: { trigger: '.about', start: 'top 75%' },
    opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15
  });

  /* Products */
  gsap.to('.products__grid .product-card', {
    scrollTrigger: { trigger: '.products', start: 'top 80%' },
    opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
  });

  /* Stats bar */
  gsap.to('.stats .stat-item', {
    scrollTrigger: { trigger: '.stats', start: 'top 82%' },
    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
  });

  /* Testimonials */
  gsap.to('.testimonials__grid .testimonial-card', {
    scrollTrigger: { trigger: '.testimonials', start: 'top 80%' },
    opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out'
  });

  /* CTA */
  gsap.from('.cta-banner__content > *', {
    scrollTrigger: { trigger: '.cta-banner', start: 'top 80%' },
    opacity: 0, y: 30, duration: 0.7, stagger: 0.12, ease: 'power3.out'
  });

  /* Magnetic buttons */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      gsap.to(btn, { x: dx * 0.25, y: dy * 0.25, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });

  /* Generic scroll reveal */
  document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 1, y: 0, x: 0, duration: 0.7, ease: 'power3.out'
    });
  });

  initCounters();
}

/* ── COUNTERS ───────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const step   = target / (1600 / 16);
  let count    = 0;
  const tick = () => {
    count = Math.min(count + step, target);
    el.textContent = Math.floor(count);
    if (count < target) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  tick();
}

function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = 'true';
        animateCounter(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(c => io.observe(c));
}
