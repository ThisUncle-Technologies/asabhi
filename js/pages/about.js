/* ── ABOUT PAGE ANIMATIONS ─────────────── */
gsap.registerPlugin(ScrollTrigger);

function initAboutAnimations() {
  gsap.to('.story__text', {
    scrollTrigger: { trigger: '.about-story', start: 'top 75%' },
    opacity: 1, x: 0, duration: 0.9, ease: 'power3.out'
  });
  gsap.to('.story__image-col', {
    scrollTrigger: { trigger: '.about-story', start: 'top 75%' },
    opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15
  });

  gsap.to('.mvv__grid .mvv__card', {
    scrollTrigger: { trigger: '.mvv', start: 'top 80%' },
    opacity: 1, y: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out'
  });

  gsap.to('.team__grid .team__card', {
    scrollTrigger: { trigger: '.team', start: 'top 80%' },
    opacity: 1, y: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out'
  });

  gsap.from('.page-hero__content > *', {
    opacity: 0, y: 30, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.3
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(initAboutAnimations, 1700);
});
