import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { DURATION, EASE, STAGGER } from '../../lib/motion';

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Position in a staggered group; delay = index * 80ms. */
  index?: number;
  /** Extra delay in seconds. */
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'article' | 'span';
}

export function Reveal({ children, className, index = 0, delay = 0, y = 24, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: reduced ? DURATION.fast : DURATION.reveal, ease: EASE, delay: delay + index * STAGGER }}
    >
      {children}
    </Comp>
  );
}
