import { motion } from 'framer-motion';
import type { Mode } from '../../../data/types';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { EASE } from '../../../lib/motion';

export function HeroTitle({ title, highlight, mode }: { title: string; highlight: string; mode: Mode }) {
  const reduced = useReducedMotion();
  const at = highlight ? title.indexOf(highlight) : -1;
  if (at < 0) return <h1>{title}</h1>;

  const before = title.slice(0, at);
  const after = title.slice(at + highlight.length);

  return (
    <h1>
      {before}
      {mode === 'engineer' ? (
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{highlight}</span>
      ) : (
        <span className="relative inline-block whitespace-nowrap">
          {highlight}
          <svg
            aria-hidden
            viewBox="0 0 300 20"
            preserveAspectRatio="none"
            className="absolute -bottom-2 left-0 h-[0.3em] w-full overflow-visible text-warm"
          >
            <motion.path
              d="M3 14 C 60 4, 120 6, 170 10 S 260 16, 297 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: reduced ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.6, ease: EASE }}
            />
          </svg>
        </span>
      )}
      {after}
    </h1>
  );
}
