const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

const applyTheme = (theme) => {
  root.setAttribute('data-bs-theme', theme);
  try { localStorage.setItem('tosca-theme', theme); } catch (_) {}
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }
};

const savedTheme = (() => { try { return localStorage.getItem('tosca-theme'); } catch (_) { return null; } })();
applyTheme(savedTheme || 'dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
  });
}

document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

const carousel = document.getElementById('dashCarousel');
if (carousel) {
  const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carousel);

  document.querySelectorAll('.thumb-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slideTo = parseInt(btn.getAttribute('data-bs-slide-to'), 10);
      bsCarousel.to(slideTo);
    });
  });

  carousel.addEventListener('slid.bs.carousel', (e) => {
    document.querySelectorAll('.thumb-btn').forEach((btn, i) => {
      const isActive = i === e.to;
      btn.style.borderColor = isActive ? 'var(--accent)' : 'transparent';
      btn.querySelector('.thumb-img').style.opacity = isActive ? '1' : '0.7';
    });
  });
}

const header = document.querySelector('header');
if (header) {
  const onScroll = () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 24px rgba(0,0,0,0.3)'
      : '';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}
