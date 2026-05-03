/* ── PRODUCTS PAGE ──────────────────────── */

// Category filter
const catBtns = document.querySelectorAll('.cat-btn');
const catCards = document.querySelectorAll('.cat-card');

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.getAttribute('data-cat');

    catCards.forEach(card => {
      const match = cat === 'all' || card.getAttribute('data-cat') === cat;
      if (match) {
        card.classList.remove('hidden');
        setTimeout(() => card.classList.add('visible'), 20);
      } else {
        card.classList.add('hidden');
        card.classList.remove('visible');
      }
    });
  });
});

// Initial reveal
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    catCards.forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 80);
    });
  }, 1700);
});
