/** Smooth-scrolls to an in-page anchor and updates the hash without dropping ?mode=. */
export function scrollToHash(href: string, reduced: boolean) {
  const id = href.replace(/^#/, '');
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  const url = new URL(window.location.href);
  url.hash = id;
  window.history.replaceState(window.history.state, '', url);
  return true;
}
