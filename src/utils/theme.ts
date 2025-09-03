/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/theme.ts (patched v3: fix TS2532 in NodeList index access)

const isClient = () => typeof window !== 'undefined' && typeof document !== 'undefined';

export function stickyHeader() {
  if (!isClient()) return;
  const navbar = document.querySelector(".navbar") as HTMLElement | null;
  if (!navbar) return;
  const options: any = {
    offset: 350,
    offsetSide: 'top',
    classes: {
      clone: 'navbar-clone fixed',
      stick: 'navbar-stick',
      unstick: 'navbar-unstick',
    },
    onStick: function (this: any) {
      const cloned = this?.clonedElem as HTMLElement | undefined;
      if (!cloned) return;
      const cls = cloned.classList;
      if (cls.contains('transparent') && cls.contains('navbar-dark')) {
        cloned.className = cloned.className.replace("navbar-dark", "navbar-light");
      }
    }
  };
  const Headhesive = (window as any).Headhesive;
if (!Headhesive) {
  // Fallback: simple sticky/unsticky using scroll position
  const offset = options.offset || 350;
  const clone = navbar.cloneNode(true) as HTMLElement;
  clone.className = (clone.className + ' ' + options.classes.clone).trim();
  clone.style.transition = 'transform .25s ease, opacity .25s ease';
  clone.style.willChange = 'transform, opacity';
  navbar.parentElement?.insertBefore(clone, navbar.nextSibling);
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset || 0;
    if (y > offset && last <= offset) {
      clone.classList.remove(options.classes.unstick);
      clone.classList.add(options.classes.stick);
      options.onStick?.call({ clonedElem: clone });
    } else if (y <= offset && last > offset) {
      clone.classList.remove(options.classes.stick);
      clone.classList.add(options.classes.unstick);
    }
    last = y;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  return;
}
// eslint-disable-next-line no-new
new Headhesive('.navbar', options);
}

export function subMenu() {
  if (!isClient()) return;
  const bootstrap = (window as any).bootstrap;
  if (!bootstrap?.Dropdown) return;
  const CLASS_NAME = 'has-child-dropdown-show';

  const proto = bootstrap.Dropdown.prototype as any;
  const originalToggle: any = proto.toggle;

  proto.toggle = function (this: any) {
    document.querySelectorAll('.' + CLASS_NAME).forEach((e) => e.classList.remove(CLASS_NAME));
    let dd = (this?._element?.closest?.('.dropdown') as any)?.parentNode?.closest?.('.dropdown');
    for (; dd && dd !== document; dd = dd?.parentNode?.closest?.('.dropdown')) {
      dd.classList.add(CLASS_NAME);
    }
    return originalToggle.call(this as any);
  };

  document.querySelectorAll('.dropdown').forEach((dd) => {
    dd.addEventListener('hide.bs.dropdown', (e: any) => {
      const self = e.currentTarget as HTMLElement | null;
      if (self?.classList.contains(CLASS_NAME)) {
        self.classList.remove(CLASS_NAME);
        e.preventDefault();
      }
      e.stopPropagation();
    });
  });
}

export function offCanvas() {
  if (!isClient()) return;
  const bootstrap = (window as any).bootstrap;
  if (!bootstrap?.Offcanvas) return;
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  const navOffCanvasBtn = document.querySelectorAll(".offcanvas-nav-btn");
  const navOffCanvas = document.querySelector('.navbar:not(.navbar-clone) .offcanvas-nav') as HTMLElement | null;
  if (!navOffCanvas) return;
  const bsOffCanvas = new bootstrap.Offcanvas(navOffCanvas, { scroll: true });
  const scrollLink = document.querySelectorAll('.onepage .navbar li a.scroll');
  const searchOffcanvas = document.getElementById('offcanvas-search');
  navOffCanvasBtn.forEach(e => { e.addEventListener('click', () => bsOffCanvas.show()); });
  scrollLink.forEach(e => { e.addEventListener('click', () => bsOffCanvas.hide()); });
  if (searchOffcanvas) {
    searchOffcanvas.addEventListener('shown.bs.offcanvas', function () {
      const inp = document.getElementById("search-form") as HTMLInputElement | null;
      inp?.focus();
    });
  }
}

export function isotope() {
  if (!isClient()) return;
  const Isotope = (window as any).Isotope;
  const imagesLoaded = (window as any).imagesLoaded;
  if (!Isotope) return;
  const grids = document.querySelectorAll('.grid');
  if (!grids?.length) return;

  grids.forEach((g) => {
    const grid = g.querySelector('.isotope') as HTMLElement | null;
    if (!grid) return;
    const filtersElem = g.querySelector('.isotope-filter') as HTMLElement | null;
    const buttonGroups = g.querySelectorAll('.isotope-filter');
    const iso = new Isotope(grid, {
      itemSelector: '.item',
      layoutMode: 'masonry',
      masonry: { columnWidth: grid.offsetWidth / 12 },
      percentPosition: true,
      transitionDuration: '0.7s'
    });
    if (imagesLoaded) {
      imagesLoaded(grid).on("progress", function () {
        iso.layout({ masonry: { columnWidth: grid.offsetWidth / 12 } });
      });
    }
    window.addEventListener("resize", function () {
      iso.arrange({ masonry: { columnWidth: grid.offsetWidth / 12 } });
    }, true);

    if (filtersElem) {
      filtersElem.addEventListener('click', function (event: any) {
        const target = (event.target as Element) || null;
        const item = (target && 'closest' in target) ? (target as any).closest('.filter-item') as HTMLElement | null : null;
        if (!item) return;
        const filterValue = item.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });
      });

      buttonGroups.forEach((buttonGroupEl) => {
        const buttonGroup = buttonGroupEl as HTMLElement;
        buttonGroup.addEventListener('click', function (event: any) {
          const target = (event.target as Element) || null;
          const btn = (target && 'closest' in target) ? (target as any).closest('.filter-item') as HTMLElement | null : null;
          if (!btn) return;
          const active = buttonGroup.querySelector('.active');
          active?.classList.remove('active');
          btn.classList.add('active');
        });
      });
    }
  });
}

export function onepageHeaderOffset() {
  if (!isClient()) return;
  const navbar = document.querySelector(".navbar") as HTMLElement | null;
  if (!navbar) return;
  const header_height = navbar.offsetHeight;
  const shrinked_header_height = 75;
  const sections = document.querySelectorAll<HTMLElement>(".onepage section");
  sections.forEach(section => {
    section.style.paddingTop = shrinked_header_height + 'px';
    section.style.marginTop = '-' + shrinked_header_height + 'px';
  });
  const first_section = document.querySelector<HTMLElement>(".onepage section:first-of-type");
  if (first_section) {
    first_section.style.paddingTop = header_height + 'px';
    first_section.style.marginTop = '-' + header_height + 'px';
  }
}

export function spyScroll() {
  if (!isClient()) return;
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinks = document.querySelectorAll<HTMLElement>('.nav-link.scroll');
  window.onscroll = () => {
    sections.forEach(sec => {
      const top = window.scrollY;
      const offset = sec.offsetTop - 0;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (id && top >= offset && top < offset + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        const target = document.querySelector<HTMLElement>(`.nav-link.scroll[href*="${id}"]`);
        target?.classList.add('active');
      }
    });
  };
}

export function anchorSmoothScroll() {
  if (!isClient()) return;
  const links = document.querySelectorAll<HTMLAnchorElement>(".scroll");
  for (const link of links) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const a = e.currentTarget as HTMLAnchorElement | null;
      if (!a) return;
      a.blur();
      const href = a.getAttribute("href");
      if (!href) return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      const offsetTop = target.offsetTop;
      window.scroll({ top: offsetTop, behavior: "smooth" });
    });
  }
}

export function svgInject() {
  if (!isClient()) return;
  const SVGInject = (window as any).SVGInject;
  if (!SVGInject) return;
  SVGInject.setOptions({
    onFail: function (img: any) { img.classList.remove('svg-inject'); }
  });
  const run = () => SVGInject(document.querySelectorAll('img.svg-inject'), { useCache: true });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}

export function backgroundImage() {
  if (!isClient()) return;
  const bg = document.querySelectorAll<HTMLElement>(".bg-image");
  bg.forEach((el) => {
    const url = el.getAttribute('data-image-src');
    if (url) el.style.backgroundImage = `url('${url}')`;
  });
}

export function backgroundImageMobile() {
  if (!isClient()) return;
  const isMobile = (!!navigator.userAgent.match(/Android/i) || !!navigator.userAgent.match(/webOS/i) || !!navigator.userAgent.match(/iPhone/i) || !!navigator.userAgent.match(/iPad/i) || (navigator.platform === 'MacIntel' && (navigator as any).maxTouchPoints > 1) || !!navigator.userAgent.match(/iPod/i) || !!navigator.userAgent.match(/BlackBerry/i));
  if (isMobile) {
    document.querySelectorAll<HTMLElement>(".image-wrapper").forEach(e => e.classList.add("mobile"));
  }
}

export function imageHoverOverlay() {
  if (!isClient()) return;
  const overlay = document.querySelectorAll<HTMLElement>('.overlay > a, .overlay > span');
  overlay.forEach((el) => {
    const overlay_bg = document.createElement('span');
    overlay_bg.className = "bg";
    el.appendChild(overlay_bg);
  });
}

export function rellax() {
  if (!isClient()) return;
  if (!document.querySelector(".rellax")) return;
  const Rellax = (window as any).Rellax;
  const imagesLoaded = (window as any).imagesLoaded;
  if (!Rellax) return;
  window.addEventListener('load', function () {
    const rellax = new Rellax('.rellax', { speed: 2, center: true, breakpoints: [576, 992, 1201] });
    const projects_overflow = document.querySelectorAll('.projects-overflow');
    if (imagesLoaded) {
      imagesLoaded(projects_overflow, function () { rellax.refresh(); });
    }
  }, { once: true });
}

export function scrollCue() {
  if (!isClient()) return;
  const scrollCue = (window as any).scrollCue;
  if (!scrollCue?.init) return;
  scrollCue.init({ interval: -400, duration: 700, percentage: 0.8 });
  scrollCue.update?.();
}

export function swiperSlider() {
  if (!isClient()) return;
  const Swiper = (window as any).Swiper;
  if (!Swiper) return;

  document.querySelectorAll<HTMLElement>('.swiper-container').forEach((slider1, i) => {
    const host = slider1 as HTMLElement; // capture for closures
    host.classList.add('swiper-container-' + i);

    const controls = document.createElement('div');
    controls.className = "swiper-controls";
    const pagi = document.createElement('div');
    pagi.className = "swiper-pagination";
    const navi = document.createElement('div');
    navi.className = "swiper-navigation";
    const prev = document.createElement('div');
    prev.className = "swiper-button swiper-button-prev";
    const next = document.createElement('div');
    next.className = "swiper-button swiper-button-next";
    host.appendChild(controls);
    controls.appendChild(navi);
    navi.appendChild(prev);
    navi.appendChild(next);
    controls.appendChild(pagi);

    const sliderEffect = host.getAttribute('data-effect') || 'slide';

    let slidesPerViewInit: any;
    let breakpointsInit: any = null;

    if (host.getAttribute('data-items-auto') === 'true') {
      slidesPerViewInit = "auto";
      breakpointsInit = null;
    } else {
      const num = (attr: string, def: number) => Number(host.getAttribute(attr) || def);
      const sliderItems = num('data-items', 3);
      const xs = num('data-items-xs', 1);
      const sm = num('data-items-sm', xs);
      const md = num('data-items-md', sm);
      const lg = num('data-items-lg', md);
      const xl = num('data-items-xl', lg);
      const xxl = num('data-items-xxl', xl);
      slidesPerViewInit = sliderItems;
      breakpointsInit = {
        0: { slidesPerView: xs },
        576: { slidesPerView: sm },
        768: { slidesPerView: md },
        992: { slidesPerView: lg },
        1200: { slidesPerView: xl },
        1400: { slidesPerView: xxl }
      };
    }

    const speed = Number(host.getAttribute('data-speed') || 500);
    const autoplay = host.getAttribute('data-autoplay') !== 'false';
    const autoplayTime = Number(host.getAttribute('data-autoplaytime') || 5000);
    const autoHeight = host.getAttribute('data-autoheight') === 'true';
    const resizeUpdate = host.getAttribute('data-resizeupdate') !== 'false';
    const allowTouch = host.getAttribute('data-drag') !== 'false';
    const reverse = host.getAttribute('data-reverse') === 'true';
    const margin = Number(host.getAttribute('data-margin') || 30);
    const loop = host.getAttribute('data-loop') === 'true';
    const centered = host.getAttribute('data-centered') === 'true';
    const watchOverflow = host.getAttribute('data-watchoverflow') !== 'false';

    const swiper = host.querySelector('.swiper:not(.swiper-thumbs)') as HTMLElement | null;
    const swiperTh = host.querySelector('.swiper-thumbs') as HTMLElement | null;

    const sliderTh = swiperTh ? new Swiper(swiperTh, { slidesPerView: 5, spaceBetween: 10, loop: false, threshold: 2, slideToClickedSlide: true }) : null;
    const thumbsInit = (host.getAttribute('data-thumbs') === 'true') ? sliderTh : null;

    if (thumbsInit && swiper) {
      const swiperMain = document.createElement('div');
      swiperMain.className = "swiper-main";
      swiper.parentNode?.insertBefore(swiperMain, swiper);
      swiperMain.appendChild(swiper);
      host.removeChild(controls);
      swiperMain.appendChild(controls);
    }

    if (!swiper) return;

    // eslint-disable-next-line no-new
    new Swiper(swiper, {
      on: {
        beforeInit: function (this: any) {
          if (host.getAttribute('data-nav') !== 'true' && host.getAttribute('data-dots') !== 'true') {
            controls.remove();
          }
          if (host.getAttribute('data-dots') !== 'true') {
            pagi.remove();
          }
          if (host.getAttribute('data-nav') !== 'true') {
            navi.remove();
          }
        },
        init: function (this: any) {
          if (host.getAttribute('data-autoplay') !== 'true') {
            this.autoplay?.stop?.();
          }
          this.update?.();
        }
      },
      autoplay: autoplay ? { delay: autoplayTime, disableOnInteraction: false, reverseDirection: reverse, pauseOnMouseEnter: false } : false,
      allowTouchMove: allowTouch,
      speed,
      slidesPerView: slidesPerViewInit,
      loop,
      centeredSlides: centered,
      spaceBetween: margin,
      effect: sliderEffect as any,
      autoHeight,
      watchOverflow,
      grabCursor: true,
      resizeObserver: false,
      updateOnWindowResize: resizeUpdate,
      breakpoints: breakpointsInit || undefined,
      pagination: { el: host.querySelector('.swiper-pagination') as any, clickable: true },
      navigation: { prevEl: host.querySelector('.swiper-button-prev') as any, nextEl: host.querySelector('.swiper-button-next') as any },
      thumbs: { swiper: thumbsInit || undefined },
    });
  });
}

export function lightbox() {
  if (!isClient()) return;
  const GLightbox = (window as any).GLightbox;
  if (!GLightbox) return;
  GLightbox({
    selector: '*[data-glightbox]',
    touchNavigation: true,
    loop: false,
    zoomable: false,
    autoplayVideos: true,
    moreLength: 0,
    slideExtraAttributes: { poster: '' },
    plyr: {
      css: '',
      js: '',
      config: {
        ratio: '',
        fullscreen: { enabled: false, iosNative: false },
        youtube: { noCookie: true, rel: 0, showinfo: 0, iv_load_policy: 3 },
        vimeo: { byline: false, portrait: false, title: false, transparent: false }
      }
    },
  });
}

export function plyr() {
  if (!isClient()) return;
  const Plyr = (window as any).Plyr;
  if (!Plyr?.setup) return;
  Plyr.setup('.player', { loadSprite: true, fullscreen: { enabled: true, iosNative: true }, muted: false });
}

export function progressBar() {
  if (!isClient()) return;
  const ProgressBar = (window as any).ProgressBar;
  const Waypoint = (window as any).Waypoint;
  if (!ProgressBar || !Waypoint) return;

  const pline = document.querySelectorAll<HTMLElement>(".progressbar.line");
  const pcircle = document.querySelectorAll<HTMLElement>(".progressbar.semi-circle");

  pline.forEach(e => {
    const line = new ProgressBar.Line(e, {
      strokeWidth: 6, trailWidth: 6, duration: 3000, easing: 'easeInOut',
      text: { style: { color: 'inherit', position: 'absolute', right: '0', top: '-30px', padding: 0, margin: 0, transform: null }, autoStyleContainer: false },
      step: (_state: any, line: any) => { line.setText(Math.round(line.value() * 100) + ' %'); }
    });
    const value = Number(e.getAttribute('data-value')) / 100;
    new Waypoint({ element: e, handler: function (this: any) { line.animate(value); }, offset: 'bottom-in-view' });
  });

  pcircle.forEach(e => {
    const circle = new ProgressBar.SemiCircle(e, { strokeWidth: 6, trailWidth: 6, duration: 2000, easing: 'easeInOut', step: (_state: any, circle: any) => { circle.setText(Math.round(circle.value() * 100)); } });
    const value = Number(e.getAttribute('data-value')) / 100;
    new Waypoint({ element: e, handler: function (this: any) { circle.animate(value); }, offset: 'bottom-in-view' });
  });
}

export function loader() {
  if (!isClient()) return;
  const preloader = document.querySelector<HTMLElement>('.page-loader');
  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        if (!preloader.classList.contains('done')) preloader.classList.add('done');
      }, 1000);
    }, { once: true });
  }
}

export function pageProgress() {
  if (!isClient()) return;
  const progressWrap = document.querySelector<HTMLElement>('.progress-wrap');
  if (!progressWrap) return;
  const progressPath = document.querySelector<SVGPathElement>('.progress-wrap path');
  if (!progressPath) return;
  const pathLength = progressPath.getTotalLength();
  const offset = 50;
  progressPath.style.transition = 'none';
  (progressPath.style as any).webkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = String(pathLength);
  progressPath.getBoundingClientRect();
  progressPath.style.transition = 'stroke-dashoffset 10ms linear';
  (progressPath.style as any).webkitTransition = 'stroke-dashoffset 10ms linear';

  window.addEventListener("scroll", function () {
    const scroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = String(progress);
    const pos = document.body.scrollTop || document.documentElement.scrollTop;
    if (pos >= offset) progressWrap.classList.add("active-progress");
    else progressWrap.classList.remove("active-progress");
  });

  progressWrap.addEventListener('click', function (e) {
    e.preventDefault();
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  });
}

export function counterUp() {
  if (!isClient()) return;
  const Waypoint = (window as any).Waypoint;
  const counterUp = (window as any).counterUp?.default || (window as any).counterUp;
  if (!Waypoint || !counterUp) return;
  const counters = document.querySelectorAll<HTMLElement>(".counter");
  counters.forEach(el => {
    new Waypoint({
      element: el,
      handler: function (this: any) {
        counterUp(el, { duration: 1000, delay: 50 });
        this?.destroy?.();
      },
      offset: 'bottom-in-view',
    });
  });
}

export function bsTooltips() {
  if (!isClient()) return;
  const bootstrap = (window as any).bootstrap;
  if (!bootstrap?.Tooltip) return;
  const els1 = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  els1.forEach((el: any) => new bootstrap.Tooltip(el, { trigger: 'hover' }));
  const els2 = Array.from(document.querySelectorAll('[data-bs-toggle="white-tooltip"]'));
  els2.forEach((el: any) => new bootstrap.Tooltip(el, { customClass: 'white-tooltip', trigger: 'hover', placement: 'left' }));
}

export function bsPopovers() {
  if (!isClient()) return;
  const bootstrap = (window as any).bootstrap;
  if (!bootstrap?.Popover) return;
  const els = Array.from(document.querySelectorAll('[data-bs-toggle="popover"]'));
  els.forEach((el: any) => new bootstrap.Popover(el));
}

export function bsModal() {
  if (!isClient()) return;
  const bootstrap = (window as any).bootstrap;
  if (!bootstrap?.Modal) return;

  if (document.querySelector(".modal-popup")) {
    const target = document.querySelector('.modal-popup') as any;
    const myModalPopup = new bootstrap.Modal(target);
    setTimeout(function () { myModalPopup.show(); }, 200);
  }

  const innerWidth = window.innerWidth;
  const clientWidth = document.body.clientWidth;
  const scrollSize = innerWidth - clientWidth;
  const myModalEl = document.querySelectorAll<HTMLElement>('.modal');
  const navbarFixed = document.querySelector<HTMLElement>('.navbar.fixed');
  const pageProgressEl = document.querySelector<HTMLElement>('.progress-wrap');

  function setPadding() {
    if (navbarFixed) navbarFixed.style.paddingRight = scrollSize + 'px';
    if (pageProgressEl) pageProgressEl.style.marginRight = scrollSize + 'px';
  }
  function removePadding() {
    if (navbarFixed) navbarFixed.style.paddingRight = '';
    if (pageProgressEl) pageProgressEl.style.marginRight = '';
  }
  myModalEl.forEach(el => {
    el.addEventListener('show.bs.modal', setPadding as any);
    el.addEventListener('hidden.bs.modal', removePadding as any);
  });
}

export function iTooltip() {
  if (!isClient()) return;
  const iTooltip = (window as any).iTooltip;
  if (!iTooltip) return;
  const tooltip = new iTooltip('.itooltip');
  tooltip.init({ className: 'itooltip-inner', indentX: 15, indentY: 15, positionX: 'right', positionY: 'bottom' });
}

export function forms() {
  if (!isClient()) return;
  window.addEventListener("load", function () {
    const forms = document.querySelectorAll<HTMLFormElement>(".needs-validation");
    const inputRecaptcha = document.querySelector<HTMLInputElement>("input[data-recaptcha]");

    (window as any).verifyRecaptchaCallback = function (response: string) {
      if (!inputRecaptcha) return;
      inputRecaptcha.value = response;
      inputRecaptcha.dispatchEvent(new Event("change"));
    };

    (window as any).expiredRecaptchaCallback = function () {
      const input = document.querySelector<HTMLInputElement>("input[data-recaptcha]");
      if (!input) return;
      input.value = "";
      input.dispatchEvent(new Event("change"));
    };

    Array.prototype.filter.call(forms, function (form: HTMLFormElement) {
      form.addEventListener("submit", function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault(); event.stopPropagation();
        }
        form.classList.add("was-validated");

        if (form.checkValidity() === true) {
          event.preventDefault();
          form.classList.remove("was-validated");
          const isContactForm = form.classList.contains('contact-form');
          if (isContactForm) {
            const data = new FormData(form);
            let alertClass = 'alert-danger';
            fetch("assets/php/contact.php", { method: "post", body: data })
              .then((res) => { if (res.ok) alertClass = 'alert-success'; return res.text(); })
              .then((txt) => {
                if (!txt) return;
                const alertBox = '<div class="alert ' + alertClass + ' alert-dismissible fade show"><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' + txt + '</div>';
                form.querySelector(".messages")?.insertAdjacentHTML('beforeend', alertBox);
                form.reset();
                (window as any).grecaptcha?.reset?.();
              })
              .catch((err) => console.warn(err));
          }
        }
      }, false);
    });
  }, { once: true });
}

export function passVisibility() {
  if (!isClient()) return;
  const containers = document.querySelectorAll<HTMLElement>('.password-field');
  containers.forEach((container) => {
    const passInput = container.querySelector<HTMLInputElement>('.form-control');
    const passToggle = container.querySelector<HTMLElement>('.password-toggle > i');
    if (!passInput || !passToggle) return;
    passToggle.addEventListener('click', () => {
      if (passInput.type === "password") {
        passInput.type = "text";
        passToggle.classList.remove('uil-eye');
        passToggle.classList.add('uil-eye-slash');
      } else {
        passInput.type = "password";
        passToggle.classList.remove('uil-eye-slash');
        passToggle.classList.add('uil-eye');
      }
    }, false);
  });
}

export function pricingSwitcher() {
  if (!isClient()) return;
  if (!document.querySelector(".pricing-switchers")) return;
  const wrapper = document.querySelectorAll<HTMLElement>(".pricing-wrapper");
  wrapper.forEach(wrap => {
    const switchers = wrap.querySelector<HTMLElement>(".pricing-switchers");
    const switcher = wrap.querySelectorAll<HTMLElement>(".pricing-switcher");
    const price = wrap.querySelectorAll<HTMLElement>(".price");
    if (!switchers) return;
    switchers.addEventListener("click", () => {
      switcher.forEach(s => s.classList.toggle("pricing-switcher-active"));
      price.forEach(p => {
        p.classList.remove("price-hidden");
        p.classList.toggle("price-show");
        p.classList.toggle("price-hide");
      });
    });
  });
}

export function textRotator() {
  if (!isClient()) return;
  const ReplaceMe = (window as any).ReplaceMe;
  if (!ReplaceMe) return;
  const zoomEl = document.querySelector('.rotator-zoom');
  if (zoomEl) {
    new ReplaceMe(zoomEl, {
      animation: 'animate__animated animate__zoomIn', speed: 2500, separator: ',', clickChange: false, loopCount: 'infinite'
    });
  }
  const fadeEl = document.querySelector('.rotator-fade');
  if (fadeEl) {
    new ReplaceMe(fadeEl, {
      animation: 'animate__animated animate__fadeInDown', speed: 2500, separator: ',', clickChange: false, loopCount: 'infinite'
    });
  }
}

export function codeSnippet() {
  if (!isClient()) return;
  const ClipboardJS = (window as any).ClipboardJS;
  if (!ClipboardJS) return;
  const btnHtml = '<button type="button" class="btn btn-sm btn-white rounded-pill btn-clipboard">Copy</button>';
  document.querySelectorAll('.code-wrapper-inner').forEach(function (element) {
    (element as HTMLElement).insertAdjacentHTML('beforebegin', btnHtml);
  });
  const clipboard = new ClipboardJS('.btn-clipboard', {
    target: function (trigger: any) { return trigger?.nextElementSibling as Element | null; }
  });
  clipboard.on('success', (event: any) => {
    const trg = event?.trigger as HTMLElement | undefined;
    if (trg) {
      trg.textContent = 'Copied!';
      event?.clearSelection?.();
      setTimeout(function () { trg.textContent = 'Copy'; }, 2000);
    }
  });
  const copyIconCode = new ClipboardJS('.btn-copy-icon');
  copyIconCode.on('success', function (event: any) {
    event?.clearSelection?.();
    const trg = event?.trigger as HTMLElement | undefined;
    if (trg) {
      trg.textContent = 'Copied!';
      window.setTimeout(function () { trg.textContent = 'Copy'; }, 2300);
    }
  });
}

export function initTheme(root: Document | HTMLElement = document as Document) {
  try { stickyHeader(); } catch (e) {}
  try { subMenu(); } catch (e) {}
  try { loader(); } catch (e) {}
  try { pageProgress(); } catch (e) {}
  try { counterUp(); } catch (e) {}
  try { codeSnippet(); } catch (e) {}
}
