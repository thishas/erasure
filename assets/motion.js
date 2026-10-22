(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const elements = document.querySelectorAll('main .section, main .signup, main .lore-grid, main .lore-cards, main .journal-index-item');
  if (!elements.length) return;
  elements.forEach(el => el.classList.add('motion-reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  elements.forEach(el => observer.observe(el));
})();

// Back-to-top control shared by every site page.
(() => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'back-to-top';
  button.setAttribute('aria-label', 'Back to top');
  button.setAttribute('title', 'Back to top');
  button.innerHTML = '<span aria-hidden="true">↑</span><span class="back-to-top-label">TOP</span>';
  document.body.appendChild(button);

  const updateVisibility = () => {
    const visible = window.scrollY > 240;
    button.classList.toggle('is-visible', visible);
    button.tabIndex = visible ? 0 : -1;
    button.setAttribute('aria-hidden', String(!visible));
  };
  updateVisibility();
  window.addEventListener('scroll', updateVisibility, { passive: true });
  button.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
  });
})();
