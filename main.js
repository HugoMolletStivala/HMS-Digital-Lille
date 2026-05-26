// HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
function openMenu() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
hamburger.addEventListener('click', function() {
  if (hamburger.classList.contains('open')) { closeMenu(); } else { openMenu(); }
});
document.querySelectorAll('.mobile-menu-link').forEach(function(link) {
  link.addEventListener('click', closeMenu);
});

// SCROLL REVEAL
const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.05 });
document.querySelectorAll('.reveal').forEach(function(el) { revealObserver.observe(el); });

// NAV SCROLL
const nav = document.querySelector('nav');
window.addEventListener('scroll', function() {
  nav.style.background = window.scrollY > 60 ? 'rgba(250,250,248,0.96)' : 'rgba(250,250,248,0.92)';
}, { passive: true });

// FAQ ACCORDION
document.querySelectorAll('.faq-q').forEach(function(q) {
  function activate() {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function(i) {
      i.classList.remove('open');
      const a = i.querySelector('.faq-a');
      if (a) a.style.display = 'none';
    });
    if (!isOpen) {
      item.classList.add('open');
      const answer = item.querySelector('.faq-a');
      if (answer) answer.style.display = 'block';
    }
  }
  q.addEventListener('click', activate);
  q.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
  });
});

// PRICING TOGGLE (si présent)
const toggleEl = document.getElementById('tarif-toggle');
if (toggleEl) {
  const panelOneshot = document.getElementById('panel-oneshot');
  const panelAbo = document.getElementById('panel-abo');
  const lblOneshot = document.getElementById('lbl-oneshot');
  const lblAbo = document.getElementById('lbl-abo');
  let isAbo = false;

  function applyPricingMode() {
    if (isAbo) {
      toggleEl.classList.add('on'); toggleEl.setAttribute('aria-checked', 'true');
      lblOneshot.classList.remove('active'); lblAbo.classList.add('active');
      panelOneshot.classList.remove('active-panel'); panelAbo.classList.add('active-panel');
    } else {
      toggleEl.classList.remove('on'); toggleEl.setAttribute('aria-checked', 'false');
      lblOneshot.classList.add('active'); lblAbo.classList.remove('active');
      panelAbo.classList.remove('active-panel'); panelOneshot.classList.add('active-panel');
    }
  }
  toggleEl.addEventListener('click', function() { isAbo = !isAbo; applyPricingMode(); });
  toggleEl.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); isAbo = !isAbo; applyPricingMode(); }
  });
  if (lblOneshot) lblOneshot.addEventListener('click', function() { isAbo = false; applyPricingMode(); });
  if (lblAbo) lblAbo.addEventListener('click', function() { isAbo = true; applyPricingMode(); });
}
