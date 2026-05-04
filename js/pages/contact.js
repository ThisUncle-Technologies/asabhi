/* ── CONTACT PAGE ───────────────────────── */
gsap.registerPlugin(ScrollTrigger);

// ── EmailJS credentials ───────────────────
// Once the client sets up EmailJS, paste the three values below.
// Leave them empty to use the WhatsApp fallback instead.
const EMAILJS_PUBLIC_KEY  = '';  // e.g. 'user_xxxxxxxxxxxx'
const EMAILJS_SERVICE_ID  = '';  // e.g. 'service_xxxxxxx'
const EMAILJS_TEMPLATE_ID = '';  // e.g. 'template_xxxxxxx'

if (EMAILJS_PUBLIC_KEY) emailjs.init(EMAILJS_PUBLIC_KEY);

// ── Form elements ─────────────────────────
const form      = document.getElementById('contactForm');
const btnText   = document.getElementById('btnText');
const btnLoad   = document.getElementById('btnLoading');
const formOk    = document.getElementById('formSuccess');
const formErr   = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    btnText.style.display = 'none';
    btnLoad.style.display = 'flex';
    submitBtn.disabled = true;

    try {
      if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
        // EmailJS send when credentials are configured
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
        formOk.style.display = 'flex';
        form.reset();
      } else {
        // WhatsApp fallback — composes a message from the form fields
        const fname   = document.getElementById('fname').value.trim();
        const lname   = document.getElementById('lname').value.trim();
        const company = document.getElementById('company').value.trim();
        const email   = document.getElementById('email').value.trim();
        const phone   = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        const text = [
          `Hello ASABHI, I'd like to get in touch.`,
          ``,
          `Name: ${fname} ${lname}`,
          company ? `Company: ${company}` : '',
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : '',
          service ? `Service: ${service}` : '',
          ``,
          `Message: ${message}`
        ].filter(Boolean).join('\n');

        window.open(`https://wa.me/255787844040?text=${encodeURIComponent(text)}`, '_blank');
        formOk.style.display = 'flex';
        form.reset();
      }
    } catch {
      formErr.style.display = 'flex';
    } finally {
      btnText.style.display = 'flex';
      btnLoad.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
}

// ── Animations ────────────────────────────
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
