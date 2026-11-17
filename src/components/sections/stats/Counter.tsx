import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const format = (n: number) => Math.round(n).toLocaleString('en-US');

export interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({ value, prefix = '', suffix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, { duration: 1.5, ease: 'easeOut', onUpdate: setCurrent });
    return () => controls.stop();
  }, [inView, reduced, value]);

  const shown = reduced ? value : current;
  const final = `${prefix}${format(value)}${suffix}`;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden className="tabular-nums">
        {prefix}
        {format(shown)}
        {suffix}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
