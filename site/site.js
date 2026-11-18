(() => {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      select(next); next.focus();
    });
  });
  const mac = document.getElementById('t-mac');
  if (mac && /Mac/i.test(navigator.platform || navigator.userAgent)) select(mac);

  document.querySelectorAll('.copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.parentElement.querySelector('pre').textContent;
      try { await navigator.clipboard.writeText(text); btn.textContent = 'Skopiowano'; }
      catch { btn.textContent = 'Zaznacz i skopiuj'; }
      setTimeout(() => { btn.textContent = 'Kopiuj'; }, 1800);
    });
  });

  // jasny / ciemny widok: wybór zapamiętany, na start ustawienie systemu
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme');
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const label = () => themeBtn.setAttribute('aria-label', isDark() ? 'Włącz jasny widok' : 'Włącz ciemny widok');
  root.dataset.theme = isDark() ? 'dark' : 'light';
  label();
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
    label();
  });

  // polska typografia: jednoliterowe słowa nie zostają na końcu wiersza
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = walker.nextNode()); ) {
    if (n.parentElement.closest('pre, code, script, style')) continue;
    n.nodeValue = n.nodeValue.replace(/(^|[\s(„])([aiouwzAIOUWZ]) /g, '$1$2\u00a0');
  }
})();

// spis treści podstrony: podświetla sekcję, którą właśnie czytasz
(() => {
  const links = [...document.querySelectorAll('.toc a')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      byId.get(e.target.id)?.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  byId.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
})();
