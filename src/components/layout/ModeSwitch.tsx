import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { shared } from '../../data';
import type { Mode } from '../../data/types';
import { useMode } from '../../hooks/useMode';
import { useModeTransition } from '../../hooks/useModeTransition';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';
import { DURATION, EASE } from '../../lib/motion';
import { Icon } from '../ui';

const OPTIONS: { mode: Mode; labelKey: 'engineerLabel' | 'socialLabel'; icon: 'code' | 'heart' }[] = [
  { mode: 'engineer', labelKey: 'engineerLabel', icon: 'code' },
  { mode: 'social', labelKey: 'socialLabel', icon: 'heart' },
];

const TOOLTIP_KEY = 'mode-tooltip-dismissed';

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(TOOLTIP_KEY) === '1';
  } catch {
    return true;
  }
}

export default function ModeSwitch({ className }: { className?: string }) {
  const { mode, content } = useMode();
  const reduced = useReducedMotion();
  const { start, prefetch, busy } = useModeTransition();
  const [showTooltip, setShowTooltip] = useState(false);

  const dismissTooltip = useCallback(() => {
    setShowTooltip(false);
    try {
      window.localStorage.setItem(TOOLTIP_KEY, '1');
    } catch {
      // storage unavailable
    }
  }, []);

  useEffect(() => {
    if (readDismissed()) return;
    const show = window.setTimeout(() => setShowTooltip(true), 1200);
    const hide = window.setTimeout(dismissTooltip, 8000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [dismissTooltip]);

  const toggle = () => {
    if (busy) return;
    if (showTooltip) dismissTooltip();
    start(mode === 'engineer' ? 'social' : 'engineer');
  };

  const other: Mode = mode === 'engineer' ? 'social' : 'engineer';
  const warm = () => prefetch(other);

  const checked = mode === 'social';

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={content.modeSwitch.ariaLabel}
        onClick={toggle}
        onPointerEnter={warm}
        onFocus={warm}
        onTouchStart={warm}
        className="relative flex h-11 items-center rounded-full border border-border bg-surface p-1 shadow-theme sm:w-[220px]"
      >
        {OPTIONS.map((opt) => {
          const active = opt.mode === mode;
          return (
            <span
              key={opt.mode}
              aria-hidden="true"
              className={cn(
                'relative flex h-full flex-1 items-center justify-center gap-1 px-2.5 text-xs font-medium transition-colors sm:gap-1.5 sm:px-3 sm:text-sm duration-150',
                active ? 'text-primary-contrast' : 'text-text-muted',
              )}
            >
              {active && (
                <motion.span
                  layoutId="mode-switch-thumb"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={reduced ? { duration: 0 } : { duration: 0.35, ease: EASE }}
                />
              )}
              <span className="relative flex items-center gap-1 sm:gap-1.5">
                {opt.mode === 'engineer' ? (
                  <span className="font-mono text-xs leading-none">&lt;/&gt;</span>
                ) : (
                  <Icon name={opt.icon} size={14} />
                )}
                <span>{content.modeSwitch[opt.labelKey]}</span>
              </span>
            </span>
          );
        })}
      </button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0, scale: reduced ? 1 : [1, 1.06, 1] }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: reduced ? DURATION.fast : 0.6, ease: EASE }}
            className="absolute right-0 top-full z-50 mt-3 flex w-max max-w-[16rem] items-center gap-2 rounded-theme border border-border bg-surface px-3 py-2 text-sm text-text shadow-theme"
          >
            <span>{shared.firstVisitTooltip}</span>
            <button
              type="button"
              onClick={dismissTooltip}
              aria-label={content.labels.close}
              className="rounded px-1 text-text-muted hover:text-text"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
