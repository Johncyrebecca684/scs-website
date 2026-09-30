document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-nav-root]');
  if (!root) {
    return;
  }

  const toggleButton = root.querySelector('[data-nav-toggle]');
  const menu = root.querySelector('[data-nav-menu]');
  const openIcon = root.querySelector('[data-nav-icon-open]');
  const closeIcon = root.querySelector('[data-nav-icon-close]');

  if (!toggleButton || !menu || !openIcon || !closeIcon) {
    return;
  }

  const openClasses = ['max-h-[32rem]', 'opacity-100', 'translate-y-0', 'pointer-events-auto'];
  const closedClasses = ['max-h-0', 'opacity-0', '-translate-y-2', 'pointer-events-none'];
  const applyTheme = (theme) => {
    root.dataset.navTheme = theme;
  };

  const resolveTheme = () => {
    const navHeight = root.getBoundingClientRect().height;
    const anchorY = Math.min(window.innerHeight * 0.2, navHeight + 48);
    const probeX = window.innerWidth * 0.5;
    const element = document.elementFromPoint(probeX, anchorY);
    const themedSection = element?.closest?.('[data-nav-theme]');

    if (!themedSection) {
      applyTheme('light');
      return;
    }

    applyTheme(themedSection.dataset.navTheme || 'light');
  };

  const setOpenState = (isOpen) => {
    toggleButton.setAttribute('aria-expanded', String(isOpen));
    menu.classList.remove(...isOpen ? closedClasses : openClasses);
    menu.classList.add(...isOpen ? openClasses : closedClasses);
    openIcon.classList.toggle('hidden', isOpen);
    closeIcon.classList.toggle('hidden', !isOpen);
  };

  setOpenState(false);
  resolveTheme();

  toggleButton.addEventListener('click', () => {
    const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
    setOpenState(!isOpen);
  });

  root.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpenState(false));
  });

  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
      setOpenState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpenState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      setOpenState(false);
    }
    resolveTheme();
  });

  window.addEventListener('scroll', () => {
    resolveTheme();
  }, { passive: true });
});