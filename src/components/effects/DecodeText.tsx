import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const TICK_MS = 30;

const scramble = (text: string, revealed: number) =>
  Array.from(text, (ch, i) => (i < revealed || ch === ' ' ? ch : Math.random() < 0.5 ? '0' : '1')).join('');

/**
 * Text that starts as random 0s and 1s and resolves left-to-right into the real
 * string when it scrolls into view. Screen readers always get the final text.
 */
export function DecodeText({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(() => (reduced ? text : scramble(text, 0)));

  useEffect(() => {
    if (reduced) {
      setShown(text);
      return;
    }
    if (!inView) return;

    let revealed = 0;
    let interval = 0;
    // Reveal faster for long strings so every label finishes in about 0.8s.
    const perTick = Math.max(1, Math.ceil(text.length / 26));
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        revealed += perTick;
        setShown(scramble(text, revealed));
        if (revealed >= text.length) window.clearInterval(interval);
      }, TICK_MS);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [inView, text, delay, reduced]);

  return (
    <span ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{shown}</span>
    </span>
  );
}
