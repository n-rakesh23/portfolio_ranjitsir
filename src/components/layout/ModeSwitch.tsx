import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { shared } from '../../data';
import type { Mode } from '../../data/types';
import { useMode } from '../../hooks/useMode';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';
import { DURATION, EASE } from '../../lib/motion';
import { Icon } from '../ui';

const OPTIONS: { mode: Mode; labelKey: 'engineerLabel' | 'socialLabel'; icon: 'code' | 'heart' }[] = [
  { mode: 'engineer', labelKey: 'engineerLabel', icon: 'code' },
  { mode: 'social', labelKey: 'socialLabel', icon: 'heart' },
];

const TOOLTIP_KEY = 'mode-tooltip-dismissed';

interface Reveal {
  x: number;
  y: number;
  radius: number;
  color: string;
  next: Mode;
}

/** Reads the target mode's --bg by flipping data-mode synchronously (no paint happens in between). */
function readModeBg(next: Mode): string {
  const root = document.documentElement;
  const prev = root.dataset.mode;
  root.dataset.mode = next;
  const color = getComputedStyle(root).getPropertyValue('--bg').trim();
  if (prev) root.dataset.mode = prev;
  return color;
}

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(TOOLTIP_KEY) === '1';
  } catch {
    return true;
  }
}

export default function ModeSwitch({ className }: { className?: string }) {
  const { mode, setMode, content } = useMode();
  const reduced = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [reveal, setReveal] = useState<Reveal | null>(null);
  const [covering, setCovering] = useState(false);
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
    if (reveal) return;
    if (showTooltip) dismissTooltip();
    const next: Mode = mode === 'engineer' ? 'social' : 'engineer';
    const btn = buttonRef.current;

    if (reduced || !btn) {
      setMode(next);
      return;
    }

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    setCovering(true);
    setReveal({ x, y, radius, color: readModeBg(next), next });
  };

  const onRevealComplete = () => {
    if (!reveal || !covering) return;
    setMode(reveal.next);
    setCovering(false);
  };

  const checked = mode === 'social';

  return (
    <div className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={content.modeSwitch.ariaLabel}
        onClick={toggle}
        className="relative flex h-11 items-center rounded-full border border-border bg-surface p-1 shadow-theme sm:w-[220px]"
      >
        {OPTIONS.map((opt) => {
          const active = opt.mode === mode;
          return (
            <span
              key={opt.mode}
              aria-hidden="true"
              className={cn(
                'relative flex h-full flex-1 items-center justify-center gap-1.5 px-3 text-sm font-medium transition-colors duration-150',
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
              <span className="relative flex items-center gap-1.5">
                {opt.mode === 'engineer' ? (
                  <span className="font-mono text-xs leading-none">&lt;/&gt;</span>
                ) : (
                  <Icon name={opt.icon} size={14} />
                )}
                <span className="hidden sm:inline">{content.modeSwitch[opt.labelKey]}</span>
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

      {reveal &&
        createPortal(
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[100]"
            style={{ backgroundColor: reveal.color }}
            initial={{ clipPath: `circle(0px at ${reveal.x}px ${reveal.y}px)`, opacity: 1 }}
            animate={
              covering
                ? { clipPath: `circle(${reveal.radius}px at ${reveal.x}px ${reveal.y}px)`, opacity: 1 }
                : { clipPath: `circle(${reveal.radius}px at ${reveal.x}px ${reveal.y}px)`, opacity: 0 }
            }
            transition={
              covering
                ? { duration: DURATION.modeSwitch, ease: EASE }
                : { duration: 0.25, ease: 'linear', delay: 0.05 }
            }
            onAnimationComplete={covering ? onRevealComplete : () => setReveal(null)}
          />,
          document.body,
        )}
    </div>
  );
}
