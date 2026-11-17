import { motion, type Variants } from 'framer-motion';
import { useMemo } from 'react';
import { createPortal } from 'react-dom';

export type MorphPhase = 'expand' | 'merge' | 'hold' | 'release';

export interface Palette {
  bg: string;
  surface: string;
  primary: string;
  accent: string;
}

interface Props {
  phase: MorphPhase;
  from: Palette;
  to: Palette;
  /** Time scale: 1 = full sequence, < 1 = quicker repeat. */
  k: number;
}

// Snappy in, settle with a touch of overshoot when the blocks lock together.
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_LOCK: [number, number, number, number] = [0.34, 1.35, 0.64, 1];
const EASE_IN: [number, number, number, number] = [0.7, 0, 0.84, 0];

/**
 * Three slanted bands. Block centres sit at 0 / 50 / 100vw so together (with
 * overlap and the skew) they cover the whole viewport once merged.
 */
const BLOCKS = [
  { left: '-30vw', start: '50vw', burst: { x: '20vw', y: '-24vh', scaleX: 0.42, scaleY: 0.46, rotate: -5 }, exitY: '-115vh', delay: 0 },
  { left: '20vw', start: '0vw', burst: { x: '0vw', y: '16vh', scaleX: 0.4, scaleY: 0.7, rotate: 4 }, exitY: '115vh', delay: 0.04 },
  { left: '70vw', start: '-50vw', burst: { x: '-20vw', y: '-4vh', scaleX: 0.42, scaleY: 0.4, rotate: -2 }, exitY: '-115vh', delay: 0.08 },
] as const;

function bits(n: number) {
  let s = '';
  for (let i = 0; i < n; i++) s += Math.random() < 0.5 ? '0' : '1';
  return s;
}

export function MorphOverlay({ phase, from, to, k }: Props) {
  const texture = useMemo(() => bits(6000), []);
  const target = phase === 'hold' ? 'merge' : phase;

  const block: Variants = {
    idle: (i: number) => ({ x: BLOCKS[i].start, y: 0, scaleX: 0, scaleY: 0.04, rotate: 0 }),
    expand: (i: number) => ({
      ...BLOCKS[i].burst,
      transition: { duration: 0.32 * k, ease: EASE_OUT, delay: BLOCKS[i].delay * k },
    }),
    merge: (i: number) => ({
      x: '0vw',
      y: '0vh',
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      transition: { duration: 0.24 * k, ease: EASE_LOCK, delay: (BLOCKS[i].delay / 2) * k },
    }),
    release: (i: number) => ({
      y: BLOCKS[i].exitY,
      transition: { duration: 0.42 * k, ease: EASE_IN, delay: BLOCKS[i].delay * k },
    }),
  };

  // Edge glows are static layers that only fade (opacity is GPU-composited). Animating
  // box-shadow/border-colour repaints full-height layers every frame and stutters on phones.
  const fromEdge: Variants = {
    idle: { opacity: 0 },
    expand: { opacity: 1, transition: { duration: 0.2 * k } },
    merge: { opacity: 0, transition: { duration: 0.3 * k, delay: 0.1 * k } },
    release: { opacity: 0 },
  };
  const toEdge: Variants = {
    idle: { opacity: 0 },
    expand: { opacity: 0 },
    merge: { opacity: 1, transition: { duration: 0.3 * k, delay: 0.1 * k } },
    release: { opacity: 0.5, transition: { duration: 0.2 * k } },
  };
  const edgeStyle = (c: string) => ({ borderColor: c, boxShadow: `0 0 32px ${c}, inset 0 0 16px ${c}55` });

  // The new identity tears open from the energy line (blocks share a vertical centre once merged).
  const toLayer: Variants = {
    idle: { scaleY: 0 },
    expand: { scaleY: 0 },
    merge: { scaleY: 1, transition: { duration: 0.3 * k, ease: EASE_OUT, delay: 0.16 * k } },
    release: { scaleY: 1 },
  };

  return createPortal(
    <div aria-hidden className="fixed inset-0 z-[100] overflow-hidden" style={{ cursor: 'progress' }}>
      {BLOCKS.map((b, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={block}
          initial="idle"
          animate={target}
          className="absolute top-0 h-[100vh] w-[60vw] will-change-transform"
          style={{ left: b.left, skewX: -12 }}
        >
          <div className="absolute inset-0 overflow-hidden" style={{ background: from.surface }}>
            {/* Binary grain from the outgoing identity. */}
            <div
              className="absolute -inset-8 break-all font-mono text-[11px] leading-[14px] tracking-[0.3em]"
              style={{ color: from.primary, opacity: 0.14 }}
            >
              {texture}
            </div>
            {/* Incoming identity's colour floods in as the blocks fuse. */}
            <motion.div
              variants={toLayer}
              initial="idle"
              animate={target}
              className="absolute inset-0 origin-center"
              style={{ background: `linear-gradient(160deg, ${to.surface}, ${to.bg})` }}
            />
          </div>
          <motion.div variants={fromEdge} initial="idle" animate={target} className="absolute inset-0 border-x-2" style={edgeStyle(from.primary)} />
          <motion.div variants={toEdge} initial="idle" animate={target} className="absolute inset-0 border-x-2" style={edgeStyle(to.primary)} />
        </motion.div>
      ))}

      {/* Core: a spinning diamond that triggers the burst and blooms on lock. */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, rotate: 45, opacity: 1 }}
        animate={
          phase === 'expand'
            ? { scale: 1, rotate: 225, opacity: 1, transition: { duration: 0.32 * k, ease: EASE_OUT } }
            : { scale: 6, rotate: 315, opacity: 0, transition: { duration: 0.35 * k, ease: EASE_OUT } }
        }
      >
        <div
          className="h-full w-full border-2"
          style={{ borderColor: from.primary, boxShadow: `0 0 24px ${from.primary}, inset 0 0 12px ${from.primary}` }}
        />
      </motion.div>

      {/* Energy line that sweeps across at the instant of fusion. */}
      <motion.div
        className="absolute left-0 top-1/2 h-[2px] w-full origin-center"
        style={{ background: `linear-gradient(90deg, transparent, ${to.primary}, ${to.accent}, ${to.primary}, transparent)`, boxShadow: `0 0 20px ${to.primary}` }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          phase === 'merge' || phase === 'hold'
            ? { scaleX: 1, opacity: [0, 1, 0.9], transition: { duration: 0.3 * k, ease: EASE_OUT, delay: 0.1 * k } }
            : { scaleX: phase === 'release' ? 1 : 0, opacity: 0, transition: { duration: 0.2 * k } }
        }
      />
    </div>,
    document.body,
  );
}
