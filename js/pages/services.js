/* ── SERVICES PAGE ANIMATIONS ──────────── */
gsap.registerPlugin(ScrollTrigger);

function initServicesAnimations() {
  document.querySelectorAll('.svc-row').forEach((row, i) => {
    gsap.from(row, {
      scrollTrigger: { trigger: row, start: 'top 80%' },
      opacity: 0, y: 50, duration: 0.8, ease: 'power3.out'
    });
  });

  gsap.to('.why-us__grid .why-card', {
    scrollTrigger: { trigger: '.why-us', start: 'top 80%' },
    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
  });

  gsap.from('.page-hero__content > *', {
    opacity: 0, y: 30, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.3
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(initServicesAnimations, 1700);
});
