// Progressive enhancement only: the recipe works without this file.
(() => {
  // Remember checked ingredients while the tab is open, so leaving and coming back keeps your place.
  const boxes = document.querySelectorAll('.ingredient-list input[type="checkbox"]');
  if (boxes.length) {
    const key = 'checked:' + location.pathname;
    let saved = [];
    try { saved = JSON.parse(sessionStorage.getItem(key) || '[]'); } catch { /* storage unavailable */ }
    boxes.forEach((box) => {
      if (saved.includes(box.id)) box.checked = true;
      box.addEventListener('change', () => {
        const ids = [...boxes].filter((b) => b.checked).map((b) => b.id);
        try { sessionStorage.setItem(key, JSON.stringify(ids)); } catch { /* storage unavailable */ }
      });
    });
  }

  const tools = document.querySelector('.kitchen-tools');
  if (!tools) return;
  tools.hidden = false;

  tools.querySelector('[data-print]')?.addEventListener('click', () => window.print());

  const wakeBtn = tools.querySelector('[data-wake]');
  if (!('wakeLock' in navigator)) { wakeBtn?.remove(); return; }
  let lock = null;
  const set = (on) => wakeBtn.setAttribute('aria-pressed', String(on));
  const request = async () => {
    try {
      lock = await navigator.wakeLock.request('screen');
      set(true);
      lock.addEventListener('release', () => { lock = null; if (!document.hidden) set(false); });
    } catch { set(false); }
  };
  wakeBtn.addEventListener('click', async () => {
    if (lock) { await lock.release(); lock = null; set(false); } else { request(); }
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && wakeBtn.getAttribute('aria-pressed') === 'true' && !lock) request();
  });
})();
