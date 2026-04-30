/* Desi Monk Kitchen — UI behaviours */
(function () {
  'use strict';

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', e => {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  // Mark current page nav link active
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const target = a.getAttribute('href');
    if (target === here || (here === '' && target === 'index.html')) a.classList.add('active');
  });

  // Reveal on scroll
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
  }, { threshold: 0.12 }) : null;
  if (io) document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  else    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

  // Menu page tab filter
  const tabs = document.querySelectorAll('.menu-tab');
  if (tabs.length) {
    tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      const target = t.dataset.target;
      document.querySelectorAll('.menu-section').forEach(sec => {
        sec.style.display = (target === 'all' || sec.dataset.cat === target) ? '' : 'none';
      });
    }));
  }

  // Contact form: send to mailto / WhatsApp on submit (no backend)
  const form = document.querySelector('form.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      const subject = encodeURIComponent('Website enquiry from ' + (fd.get('name') || ''));
      const body = encodeURIComponent(
        'Name: ' + (fd.get('name') || '') + '\n' +
        'Phone: ' + (fd.get('phone') || '') + '\n' +
        'Email: ' + (fd.get('email') || '') + '\n\n' +
        (fd.get('message') || '')
      );
      window.location.href = 'mailto:hello@desimonkkitchen.com?subject=' + subject + '&body=' + body;
    });
  }

  // Year stamp
  const yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();

  // Video showcase: autoplay when ≥50% in viewport, pause when scrolled away
  const videos = document.querySelectorAll('.video-frame video');
  if (videos.length && 'IntersectionObserver' in window) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        const v = en.target;
        if (en.isIntersecting && en.intersectionRatio >= 0.5) {
          const p = v.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else {
          if (!v.paused) v.pause();
        }
      });
    }, { threshold: [0, 0.5, 1] });
    videos.forEach(v => {
      v.muted = true;            // required for autoplay on mobile
      v.playsInline = true;
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      vio.observe(v);
    });
  }

  // Word cloud: rotate words that have data-rotate
  const cloud = document.getElementById('wordCloud');
  if (cloud && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const rotators = cloud.querySelectorAll('[data-rotate]');
    rotators.forEach((el, i) => {
      const original = el.textContent.trim();
      const pool = [original, ...el.dataset.rotate.split(',').map(s => s.trim())];
      let idx = 0;
      const tick = () => {
        idx = (idx + 1) % pool.length;
        el.classList.add('swap-out');
        setTimeout(() => {
          el.textContent = pool[idx];
          el.classList.remove('swap-out');
          el.classList.add('swap-in');
          requestAnimationFrame(() => el.classList.remove('swap-in'));
        }, 320);
      };
      // stagger each rotator's interval so they don't all blink together
      setTimeout(() => setInterval(tick, 4200 + (i * 600)), 2000 + (i * 400));
    });
  }
})();
