export const toNull = (v?: string | null): string | null => v ?? null;

export const getAttr = (el: Element | null | undefined, name: string): string | null =>
  el?.getAttribute(name) ?? null;

export const getData = (el: HTMLElement | null | undefined, key: string): string | null => {
  const ds = el?.dataset as DOMStringMap | undefined;
  const val = ds ? (ds as any)[key] as (string | undefined) : undefined;
  return val ?? null;
};

export function startTextRotator(el: HTMLElement, words: string[], ms = 2500): () => void {
  if (!el || !words?.length) return () => {};
  let i = 0;
  el.textContent = words[0] ?? '';

  const id = window.setInterval(() => {
    i = (i + 1) % words.length;
    el.textContent = words[i] ?? '';

    el.classList.remove('animate__fadeInDown');
    void el.offsetWidth; // force reflow
    el.classList.add('animate__animated', 'animate__fadeInDown');
  }, ms);

  return () => window.clearInterval(id);
}

export function initTooltips(root: Document | HTMLElement = document): () => void {
  const anyWin = window as any;
  const Tooltip = anyWin.bootstrap?.Tooltip;
  if (!Tooltip) return () => {};

  const nodes = root.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]');
  const instances: any[] = [];
  nodes.forEach(el => instances.push(new Tooltip(el)));

  return () => instances.forEach((i: any) => i?.dispose?.());
}

export function initPopovers(root: Document | HTMLElement = document): () => void {
  const anyWin = window as any;
  const Popover = anyWin.bootstrap?.Popover;
  if (!Popover) return () => {};

  const nodes = root.querySelectorAll<HTMLElement>('[data-bs-toggle="popover"]');
  const instances: any[] = [];
  nodes.forEach(el => instances.push(new Popover(el)));

  return () => instances.forEach((i: any) => i?.dispose?.());
}

export function initOffcanvas(root: Document | HTMLElement = document): () => void {
  const anyWin = window as any;
  const Offcanvas = anyWin.bootstrap?.Offcanvas;
  if (!Offcanvas) return () => {};

  const nodes = root.querySelectorAll<HTMLElement>('.offcanvas');
  const instances: any[] = [];
  nodes.forEach(el => instances.push(new Offcanvas(el)));

  return () => instances.forEach((i: any) => i?.dispose?.());
}

export function initDropdownHover(root: Document | HTMLElement = document): () => void {
  const items = root.querySelectorAll<HTMLElement>('[data-hover="dropdown"]');
  const enter = (e: Event) => (e.currentTarget as HTMLElement).classList.add('show');
  const leave = (e: Event) => (e.currentTarget as HTMLElement).classList.remove('show');

  items.forEach(el => {
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
  });

  return () => items.forEach(el => {
    el.removeEventListener('mouseenter', enter);
    el.removeEventListener('mouseleave', leave);
  });
}
