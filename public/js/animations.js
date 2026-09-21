/**
 * BeeQuery — Premium Interactions & Scroll Animations
 * Vanilla JS. No dependencies. IntersectionObserver-based.
 */
(function () {
  'use strict';

  /* ═══════════════════════════════════════════════
     1. SCROLL REVEAL (fade-up with stagger)
     ═══════════════════════════════════════════════ */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => observer.observe(el));
  }

  /* ═══════════════════════════════════════════════
     2. NAVBAR SCROLL STATE (transparent → blur)
     ═══════════════════════════════════════════════ */
  function initNavbarScroll() {
    const nav = document.getElementById('main-nav');
    const hero = document.getElementById('hero');
    if (!nav || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          nav.classList.add('nav-transparent');
          nav.classList.remove('nav-scrolled');
        } else {
          nav.classList.remove('nav-transparent');
          nav.classList.add('nav-scrolled');
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(hero);
  }

  /* ═══════════════════════════════════════════════
     3. COUNTER ANIMATION (for metric numbers)
     ═══════════════════════════════════════════════ */
  function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const separator = el.dataset.separator === 'true';
    const decimal = el.dataset.decimal ? parseInt(el.dataset.decimal, 10) : 0;
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      let current;

      if (decimal > 0) {
        current = (target * eased / Math.pow(10, decimal)).toFixed(1);
      } else {
        current = Math.floor(target * eased);
      }

      if (separator && !decimal) {
        current = current.toLocaleString('pt-BR');
      }

      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /* ═══════════════════════════════════════════════
     4. ACCORDION (FAQ + Ementa)
     ═══════════════════════════════════════════════ */
  function initAccordion() {
    const triggers = document.querySelectorAll('[data-accordion]');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const body = trigger.nextElementSibling;
        const icon = trigger.querySelector('.accordion-icon');
        const isOpen = body.classList.contains('acc-open');

        // Close all siblings in same group
        const group = trigger.closest('.accordion-group');
        if (group) {
          group.querySelectorAll('.accordion-body').forEach((b) => {
            b.classList.remove('acc-open');
            b.style.maxHeight = '0';
          });
          group.querySelectorAll('.accordion-icon').forEach((i) => {
            i.style.transform = 'rotate(0deg)';
          });
        }

        if (!isOpen) {
          body.classList.add('acc-open');
          body.style.maxHeight = body.scrollHeight + 'px';
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }

  /* ═══════════════════════════════════════════════
     5. MOBILE MENU TOGGLE
     ═══════════════════════════════════════════════ */
  function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const close = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');

    if (!btn || !menu) return;

    function open() {
      menu.classList.add('menu-open');
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function shut() {
      menu.classList.remove('menu-open');
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', open);
    if (close) close.addEventListener('click', shut);
    if (overlay) overlay.addEventListener('click', shut);

    // Close on nav link click
    menu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', shut);
    });
  }

  /* ═══════════════════════════════════════════════
     6. DYNAMIC FOOTER YEAR
     ═══════════════════════════════════════════════ */
  function initFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ═══════════════════════════════════════════════
     INIT ALL
     ═══════════════════════════════════════════════ */
  function init() {
    initScrollReveal();
    initNavbarScroll();
    initCounters();
    initAccordion();
    initMobileMenu();
    initFooterYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
