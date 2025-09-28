(() => {
  const btn  = document.getElementById('burger-menu');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) { console.warn('Burger/Menu nicht gefunden'); return; }

  // Button klickbar halten (über allem)
  btn.style.position = 'fixed';
  btn.style.top = '12px';
  btn.style.right = '12px';
  btn.style.zIndex = '1002';
  btn.style.cursor = 'pointer';

  // Panel-Basisstyles ERZWINGEN (umgehen alte .buttons-Regeln)
  Object.assign(menu.style, {
    position: 'fixed',
    top: '0', right: '0', bottom: '0',
    width: 'min(100vw, 340px)',
    height: '100vh',
    background: 'var(--button-color)',
    zIndex: '1001',
    paddingTop: '80px',
    overflowY: 'auto',
    transition: 'transform .28s ease-out',
    transform: 'translateX(100%)' // Start: zu
  });

  // Hilfsfunktion: Zustand prüfen/setzen
  const isOpen = () => menu.classList.contains('is-open');

  function openMenu() {
    menu.classList.add('is-open');
    menu.style.transform = 'translateX(0)';          // AUF
    btn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    menu.classList.remove('is-open');
    menu.style.transform = 'translateX(100%)';       // ZU
    btn.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() { isOpen() ? closeMenu() : openMenu(); }

  // ARIA (optional, aber sinnvoll)
  btn.setAttribute('role', 'button');
  btn.setAttribute('tabindex', '0');
  btn.setAttribute('aria-controls', 'mobile-menu');
  btn.setAttribute('aria-expanded', 'false');

  // Events
  btn.addEventListener('click', toggleMenu);
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
  });
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu(); // Link-Klick schließt Menü
  });

  // Optional: Beim Wechsel auf Desktop aufräumen
  const mq = window.matchMedia('(max-width: 600px)');
  function handleMQ(e){ if(!e.matches) closeMenu(); }
  mq.addEventListener ? mq.addEventListener('change', handleMQ) : mq.addListener(handleMQ);

  // Debug-Helfer, falls noch was blockiert
  console.log('[Burger] init ok');
})();
