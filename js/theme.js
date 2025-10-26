// Theme toggle: save preference in localStorage and apply on load
(function(){
  const THEME_KEY = 'site-theme-v1';
  const root = document.documentElement;

  function applyTheme(theme){
    if(theme === 'dark') root.setAttribute('data-theme','dark');
    else root.removeAttribute('data-theme');
  }

  function toggle(){
    const cur = localStorage.getItem(THEME_KEY) || (root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    updateButton(next);
  }

  function updateButton(theme){
    const el = document.getElementById('theme-toggle');
    if(!el) return;
    el.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    el.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', ()=>{
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
    updateButton(theme);

    // expose on window for inline onclick
    window.toggleTheme = toggle;
  });

})();
