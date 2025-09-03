// src/plugins/theme.client.ts
import { startTextRotator, initTooltips, initPopovers, initOffcanvas, initDropdownHover } from '~/utils/ui';
import { initTheme } from '~/utils/theme';

export default defineNuxtPlugin(() => {
  if (!import.meta.client) return;

  const onReady = () => {
    try { initTheme(document); } catch (e) { console.warn('[theme] initTheme failed', e); }
    const disposers: Array<() => void> = [];

    // Auto-rotate any element like: <span class="rotator-fade" data-words="mobile design,web design,3D animation"></span>
    document.querySelectorAll<HTMLElement>('.rotator-fade[data-words]').forEach(el => {
      const words = (el.dataset.words || '').split(',').map(s => s.trim()).filter(Boolean);
      if (words.length) disposers.push(startTextRotator(el, words, 2500));
    });

    // Bootstrap behaviors
    disposers.push(initTooltips());
    disposers.push(initPopovers());
    disposers.push(initOffcanvas());

    // Optional hover-based dropdowns
    disposers.push(initDropdownHover());

    // HMR cleanup (dev only)
    if (import.meta.hot) {
      import.meta.hot.dispose(() => disposers.forEach(fn => fn()));
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady, { once: true });
  } else {
    onReady();
  }
});
