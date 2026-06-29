/* =============================================
   STUCCO ON TREND — main.js
   ============================================= */

// --- NAV: scroll class + mobile menu ---
const nav       = document.getElementById('nav');
const burger    = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

burger.setAttribute('aria-expanded', 'false');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

function openMenu() {
  burger.classList.add('open');
  mobileMenu.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  // Move focus to first mobile link
  mobileLinks[0]?.focus();
}

function closeMenu() {
  burger.classList.remove('open');
  mobileMenu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  burger.focus();
}

burger.addEventListener('click', () => {
  if (burger.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    closeMenu();
  }
});

// --- REVEAL ON SCROLL ---
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => io.observe(el));

// --- FORM SUBMIT (field-level errors) ---
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

function setFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + 'Error');
  if (input) input.setAttribute('aria-invalid', 'true');
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + 'Error');
  if (input) input.removeAttribute('aria-invalid');
  if (errorEl) errorEl.textContent = '';
}

function clearAllErrors() {
  ['name', 'email'].forEach(id => clearFieldError(id));
  formNote.textContent = '';
}

// Clear individual field errors on input or focus
['name', 'email'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => clearFieldError(id));
    el.addEventListener('focus', () => clearFieldError(id));
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearAllErrors();

  let valid = true;
  const name  = form.name.value.trim();
  const email = form.email.value.trim();

  if (!name) {
    setFieldError('name', 'Please enter your name.');
    valid = false;
  }
  if (!email) {
    setFieldError('email', 'Please enter your email.');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFieldError('email', 'Please enter a valid email address.');
    valid = false;
  }

  if (!valid) return;

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

// --- GALLERY: subtle parallax on mouse move (desktop only) ---
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
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
}

// --- GALLERY LIGHTBOX ---
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<div class="lightbox-bg"></div><img src="" alt="" /><p class="lightbox-caption"></p><button class="lightbox-close" aria-label="Close lightbox">&times;</button>';
document.body.appendChild(lightbox);

const lbImg     = lightbox.querySelector('img');
const lbCaption = lightbox.querySelector('.lightbox-caption');
const lbClose   = lightbox.querySelector('.lightbox-close');
const lbBg      = lightbox.querySelector('.lightbox-bg');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const src     = item.querySelector('img').src;
    const alt     = item.querySelector('img').alt;
    const caption = item.dataset.caption || '';
    lbImg.src = src;
    lbImg.alt = alt;
    lbCaption.textContent = caption;
    lightbox.classList.add('open');
    lbClose.focus();
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
}

lbClose.addEventListener('click', closeLightbox);
lbBg.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});

