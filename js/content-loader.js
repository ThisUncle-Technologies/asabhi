// content-loader.js — fetches live content from the web dashboard and populates the page.
// Falls back silently to the hardcoded HTML if the API is unreachable.

(async function () {
  const EXHIBIT_ID   = 'tut-exhibit-01';
  const DASHBOARD_URL = 'http://localhost:3000'; // change to production URL after deploy

  let data;
  try {
    const res = await fetch(`${DASHBOARD_URL}/api/content/${EXHIBIT_ID}`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return;
    data = await res.json();
  } catch {
    return; // API unreachable — hardcoded HTML stays as-is
  }

  const set    = (id, val)  => { const el = document.getElementById(id);    if (el && val) el.textContent = val; };
  const setHref = (id, val) => { const el = document.getElementById(id);    if (el && val) el.href = val; };
  const setAttr = (id, attr, val) => { const el = document.getElementById(id); if (el && val) el.setAttribute(attr, val); };

  const g = data.global || {};
  const h = data.hero   || {};
  const a = data.about  || {};
  const s = data.services || {};
  const t = data.testimonials || {};
  const n = data.nav    || {};
  const f = data.footer || {};

  // ── Global ──────────────────────────────────────────────
  document.querySelectorAll('.nav__logo strong, .loader__logo, .footer__brand strong').forEach(el => { if (g.companyName) el.textContent = g.companyName; });
  document.querySelectorAll('.nav__logo small, .loader__tagline, .footer__brand small').forEach(el => { if (g.tagline) el.textContent = g.tagline; });

  if (g.phone1) document.querySelectorAll('a[href^="tel:"]').forEach(el => { el.href = `tel:${g.phone1.replace(/\s/g, '')}`; el.textContent = g.phone1; });
  if (g.whatsapp) {
    const waMsg = encodeURIComponent(`Hello ${g.companyName}, I'd like to enquire about your products and services.`);
    document.querySelectorAll('a[href*="wa.me"]').forEach(el => { el.href = `https://wa.me/${g.whatsapp}?text=${waMsg}`; });
  }

  if (g.address) document.querySelectorAll('.footer__contact-item span').forEach((el, i) => { if (i === 0) el.textContent = g.address; });
  if (g.hours) document.querySelectorAll('.footer__contact-item').forEach(item => {
    if (item.querySelector('.ri-time-line')) { const span = item.querySelector('span'); if (span) span.textContent = g.hours; }
  });

  const socials = g.socials || {};
  const socialIcons = { instagram: 'ri-instagram-line', linkedin: 'ri-linkedin-box-line', facebook: 'ri-facebook-line', twitter: 'ri-twitter-x-line' };
  Object.entries(socialIcons).forEach(([platform, icon]) => {
    if (socials[platform]) {
      const el = document.querySelector(`.footer__social .${icon}`);
      if (el) el.closest('a').href = socials[platform];
    }
  });

  // ── Nav CTA ─────────────────────────────────────────────
  if (n.cta) {
    document.querySelectorAll('a.btn--primary').forEach(el => {
      if (!el.closest('section')) { if (n.cta.text) el.textContent = n.cta.text; if (n.cta.link) el.href = n.cta.link; }
    });
  }

  // ── Hero ────────────────────────────────────────────────
  set('heroTag', h.eyeline);
  if (h.title || h.titleEmphasis) {
    const titleEl = document.getElementById('heroTitle');
    if (titleEl) titleEl.innerHTML = `${h.title || ''}<br><em>${h.titleEmphasis || ''}</em>`;
  }
  set('heroDesc', h.description);
  if (h.cta1 && document.getElementById('heroCta1')) { setHref('heroCta1', h.cta1.link); set('heroCta1Text', h.cta1.text); }
  if (h.cta2 && document.getElementById('heroCta2')) { setHref('heroCta2', h.cta2.link); set('heroCta2Text', h.cta2.text); }

  // ── About ───────────────────────────────────────────────
  set('aboutTag', a.tag);
  if (a.heading || a.headingEmphasis) {
    const el = document.getElementById('aboutHeading');
    if (el) el.innerHTML = `${a.heading || ''} <span>${a.headingEmphasis || ''}</span>`;
  }
  if (a.paragraphs) {
    a.paragraphs.forEach((p, i) => set(`aboutPara${i}`, p));
  }
  if (a.badge) {
    set('aboutBadgeValue', a.badge.value);
    set('aboutBadgeLabel', a.badge.label);
  }
  if (a.stats) {
    document.querySelectorAll('.counter[data-target]').forEach((el, i) => {
      if (a.stats[i]) {
        el.dataset.target = a.stats[i].target;
        const suffix = el.nextElementSibling;
        if (suffix && suffix.classList.contains('stat-item__suffix')) suffix.textContent = a.stats[i].suffix;
        const label = el.closest('.stat-item')?.querySelector('.stat-item__label');
        if (label) label.textContent = a.stats[i].label;
      }
    });
  }

  // ── Services ─────────────────────────────────────────────
  if (s.items && s.items.length) {
    const cards = document.querySelectorAll('.service-card');
    s.items.forEach((item, i) => {
      if (!cards[i]) return;
      const icon  = cards[i].querySelector('.service-card__icon');
      const title = cards[i].querySelector('.service-card__title');
      const desc  = cards[i].querySelector('.service-card__desc');
      if (icon  && item.icon)        { icon.className = `${item.icon} service-card__icon`; }
      if (title && item.title)       title.textContent = item.title;
      if (desc  && item.description) desc.textContent  = item.description;
    });
  }

  // ── Testimonials ─────────────────────────────────────────
  if (t.items && t.items.length) {
    const cards = document.querySelectorAll('.testimonial-card');
    t.items.forEach((item, i) => {
      if (!cards[i]) return;
      const text   = cards[i].querySelector('.testimonial-card__text');
      const name   = cards[i].querySelector('.testimonial-card__name');
      const role   = cards[i].querySelector('.testimonial-card__role');
      const avatar = cards[i].querySelector('.testimonial-card__avatar');
      if (text   && item.quote)    text.textContent   = item.quote;
      if (name   && item.name)     name.textContent   = item.name;
      if (role   && item.role)     role.textContent   = item.role;
      if (avatar && item.initials) avatar.textContent = item.initials;
    });
  }

  // ── Footer ───────────────────────────────────────────────
  set('footerDesc', f.description);
  if (f.copyright) {
    document.querySelectorAll('.footer__bottom span').forEach(el => {
      if (el.textContent.includes('©')) el.textContent = el.textContent.replace(/\d{4}/, f.copyright);
    });
  }
})();
