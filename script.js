const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
const yearEls = document.querySelectorAll('#year');

const applyTheme = (theme) => {
  root.setAttribute('data-bs-theme', theme);
  localStorage.setItem('tosca-theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  }
};

const savedTheme = localStorage.getItem('tosca-theme') || 'dark';
applyTheme(savedTheme);

yearEls.forEach((el) => {
  el.textContent = new Date().getFullYear();
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
}
