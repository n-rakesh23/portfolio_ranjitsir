import { getContent, shared } from '../data';
import type { Mode } from '../data/types';

const done = new Map<Mode, Promise<void>>();

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
    // decode() lets the swap paint without a decode hitch; fall back to onload.
    img.decode?.().then(() => resolve(), () => resolve());
  });
}

/**
 * Warms everything the given mode needs to paint its first screen: the
 * lazy-loaded section chunks and the above-the-fold images. Safe to call
 * repeatedly (hover, focus, click) — work happens once per mode.
 */
export function preloadMode(mode: Mode): Promise<void> {
  let p = done.get(mode);
  if (!p) {
    const { hero } = getContent(mode);
    const images = [shared.photos[mode].src, hero.image?.src].filter((s): s is string => Boolean(s));
    p = Promise.all([
      import('../components/sections/Gallery'),
      import('../components/sections/Contact'),
      ...images.map(loadImage),
    ]).then(
      () => undefined,
      () => undefined,
    );
    done.set(mode, p);
  }
  return p;
}
