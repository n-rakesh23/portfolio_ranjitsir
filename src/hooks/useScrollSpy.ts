import { useEffect, useState } from 'react';

/** Returns the id of the section currently nearest the top of the viewport (below the sticky nav). */
export function useScrollSpy(ids: string[], offset = 80): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    const sectionIds = key.split('|');
    let frame = 0;

    // Elements are looked up on every pass because sections remount on mode switch.
    const update = () => {
      frame = 0;
      const line = offset + window.innerHeight * 0.2;
      let current: string | null = null;
      let best = -Infinity;
      for (const id of sectionIds) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line && top > best) {
          best = top;
          current = id;
        }
      }
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
    };
  }, [key, offset]);

  return active;
}
