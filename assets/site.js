(() => {
  const body = document.body;
  const menu = document.querySelector('.mobile-menu');
  const open = document.querySelector('[data-menu-open]');
  const close = document.querySelector('[data-menu-close]');

  const setMenu = (state) => {
    if (!menu || !open) return;
    menu.classList.toggle('open', state);
    menu.setAttribute('aria-hidden', String(!state));
    open.setAttribute('aria-expanded', String(state));
    body.style.overflow = state ? 'hidden' : '';
  };

  open?.addEventListener('click', () => setMenu(true));
  close?.addEventListener('click', () => setMenu(false));
  menu?.addEventListener('click', (e) => { if (e.target === menu) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  document.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target === '_blank') return;
    a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      e.preventDefault();
      setMenu(false);
      body.classList.add('is-leaving');
      setTimeout(() => { location.href = url.href; }, 190);
    });
  });

  const canvas = document.querySelector('.noise');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d', { alpha: true });
    const resize = () => {
      canvas.width = window.innerWidth > 900 ? 240 : 150;
      canvas.height = window.innerWidth > 900 ? 140 : 180;
    };
    const draw = () => {
      const image = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < image.data.length; i += 4) {
        const v = Math.random() * 255 | 0;
        image.data[i] = v; image.data[i+1] = v; image.data[i+2] = v; image.data[i+3] = 80;
      }
      ctx.putImageData(image, 0, 0);
    };
    resize(); draw();
    window.addEventListener('resize', resize, { passive:true });
    setInterval(draw, 90);
  }
})();
