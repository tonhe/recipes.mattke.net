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

// Lightbox: card photos and snapshots open large over the page. Without JS the link opens the image.
(() => {
  const links = [...document.querySelectorAll('a[data-lightbox]')];
  if (!links.length || typeof HTMLDialogElement !== 'function') return;

  const dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Photo viewer');
  dlg.innerHTML = `
    <figure class="lb-figure">
      <img class="lb-img" alt="">
      <figcaption class="lb-caption"></figcaption>
    </figure>
    <button type="button" class="lb-btn lb-prev" aria-label="Previous photo">&larr;</button>
    <button type="button" class="lb-btn lb-next" aria-label="Next photo">&rarr;</button>
    <button type="button" class="lb-btn lb-close" aria-label="Close">Close</button>
    <p class="lb-count" aria-live="polite"></p>`;
  document.body.append(dlg);

  const img = dlg.querySelector('.lb-img');
  const cap = dlg.querySelector('.lb-caption');
  const count = dlg.querySelector('.lb-count');
  const prev = dlg.querySelector('.lb-prev');
  const next = dlg.querySelector('.lb-next');
  let group = [];
  let i = 0;
  let opener = null;

  const show = (n) => {
    i = (n + group.length) % group.length;
    const a = group[i];
    img.src = a.href;
    img.alt = a.querySelector('img')?.alt || '';
    cap.textContent = a.dataset.caption || '';
    cap.hidden = !a.dataset.caption;
    const many = group.length > 1;
    prev.hidden = next.hidden = count.hidden = !many;
    count.textContent = many ? `${i + 1} of ${group.length}` : '';
  };

  links.forEach((a) => a.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    opener = a;
    group = links.filter((l) => l.dataset.lightbox === a.dataset.lightbox);
    show(group.indexOf(a));
    dlg.showModal();
    dlg.querySelector('.lb-close').focus();
  }));

  prev.addEventListener('click', () => show(i - 1));
  next.addEventListener('click', () => show(i + 1));
  dlg.querySelector('.lb-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', (e) => {
    if (group.length < 2) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
  });
  dlg.addEventListener('close', () => { img.removeAttribute('src'); opener?.focus(); });
})();
