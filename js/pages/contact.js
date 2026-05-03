/* ── CONTACT PAGE ───────────────────────── */
gsap.registerPlugin(ScrollTrigger);

// EmailJS — replace with real credentials when client onboards
// emailjs.init('YOUR_PUBLIC_KEY');

const form      = document.getElementById('contactForm');
const btnText   = document.getElementById('btnText');
const btnLoad   = document.getElementById('btnLoading');
const formOk    = document.getElementById('formSuccess');
const formErr   = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    btnText.style.display = 'none';
    btnLoad.style.display = 'flex';
    submitBtn.disabled = true;

    try {
      /* Uncomment and configure when EmailJS is set up:
      await emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form);
      */
      await new Promise(r => setTimeout(r, 1200)); // demo delay
      formOk.style.display = 'flex';
      form.reset();
    } catch {
      formErr.style.display = 'flex';
    } finally {
      btnText.style.display = 'flex';
      btnLoad.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
}

// Animations
function initContactAnimations() {
  gsap.to('.fade-left', {
    scrollTrigger: { trigger: '.contact-main', start: 'top 75%' },
    opacity: 1, x: 0, duration: 0.9, ease: 'power3.out'
  });
  gsap.to('.fade-right', {
    scrollTrigger: { trigger: '.contact-main', start: 'top 75%' },
    opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15
  });

  gsap.to('.qa-grid .qa-card', {
    scrollTrigger: { trigger: '.quick-actions', start: 'top 80%' },
    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
  });

  gsap.from('.page-hero__content > *', {
    opacity: 0, y: 30, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.3
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(initContactAnimations, 1700);
});
