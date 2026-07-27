const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = theme === 'light' ? '☀️' : '🌙';
}

const saved = (() => { try { return localStorage.getItem('portfolio-theme'); } catch (_) { return null; } })();
applyTheme(saved || 'dark');

document.querySelector('.theme-toggle')?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
});

document.querySelector('#year')?.addEventListener('load', function () {
  this.textContent = new Date().getFullYear();
});
document.querySelectorAll('#year').forEach(el => { el.textContent = new Date().getFullYear(); });

document.querySelector('.mobile-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelector('.nav-links')?.classList.remove('open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.carousel-thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-bs-slide-to');
    const carousel = btn.closest('[data-carousel-id]');
    if (!carousel) return;
    const id = carousel.getAttribute('data-carousel-id');
    const instance = bootstrap.Carousel.getInstance(document.getElementById(id));
    if (instance) instance.to(parseInt(target));
  });
});

document.querySelectorAll('[data-carousel-id]').forEach(carousel => {
  const id = carousel.id;
  carousel.addEventListener('slid.bs.carousel', (e) => {
    document.querySelectorAll(`[data-carousel-id="${id}"] .carousel-thumb`).forEach((btn, i) => {
      btn.classList.toggle('active', i === e.to);
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
