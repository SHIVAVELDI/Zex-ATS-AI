// Minimal animations & UI helpers
window.addEventListener('load', () => {
  const loader = document.getElementById('loading');
  if (loader) loader.style.display = 'none';

  const back = document.getElementById('back-to-top');
  if (back) {
    back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
    });
  }
});
