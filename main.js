/* =============================================
   STUCCO ON TREND — main.js
   ============================================= */

// --- NAV: scroll class + mobile menu ---
const nav    = document.getElementById('nav');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// --- REVEAL ON SCROLL ---
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in the same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => io.observe(el));

// --- FORM SUBMIT ---
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name  = form.name.value.trim();
  const email = form.email.value.trim();
  if (!name || !email) {
    formNote.textContent = 'Please fill in your name and email.';
    formNote.style.color = '#a84444';
    return;
  }
  // Simulate send
  const btn = form.querySelector('.btn-gold');
  btn.textContent = 'Sending…';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Enquiry';
    btn.style.pointerEvents = '';
    formNote.textContent = "Thank you — we'll be in touch shortly.";
    formNote.style.color = '#1e4029';
  }, 1200);
});

// --- GALLERY: subtle parallax on mouse move ---
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    item.querySelector('img').style.transform = `scale(1.06) translate(${x}px, ${y}px)`;
  });
  item.addEventListener('mouseleave', () => {
    item.querySelector('img').style.transform = '';
  });
});
