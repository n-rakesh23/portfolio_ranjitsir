import { motion } from 'framer-motion';
import { useId } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { EASE } from '../../../lib/motion';
import { Icon } from '../../ui';

export function ConnectorLine() {
  const reduced = useReducedMotion();
  const gradientId = useId();

  return (
    <div className="mx-auto mb-10 flex max-w-xl items-center gap-3" aria-hidden="true">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#14391F] bg-[#020804] text-[#00FF41]">
        <Icon name="code" size={22} />
      </span>
      <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="h-6 flex-1 overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#00FF41" />
            <stop offset="50%" stopColor="#9DFFB5" />
            <stop offset="100%" stopColor="#C2553A" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 12 C 100 -4, 150 28, 200 12 S 300 -4, 400 12"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduced ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 1.4, ease: EASE }}
        />
      </svg>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#E6DCCB] bg-[#FBF7F0] text-[#C2553A]">
        <Icon name="heart" size={22} />
      </span>
    </div>
  );
}
