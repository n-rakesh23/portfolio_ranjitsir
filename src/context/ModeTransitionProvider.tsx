import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Mode } from '../data/types';
import { useMode } from '../hooks/useMode';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { preloadMode } from '../lib/preloadMode';
import { MorphOverlay, type MorphPhase, type Palette } from '../components/effects/MorphOverlay';
import { ModeTransitionContext, type ModeTransitionValue, type StartOptions } from './transition-context';

/** Phase lengths in ms at k = 1. */
// merge covers the lock (0.28) + split-open (0.16 delay + 0.3); the swap runs after, so its render cost never stalls the wipe.
const T = { expand: 340, merge: 480, minHold: 120, maxWait: 300, release: 540 };
/** A switch within this window of the last one plays the quick version. */
const QUICK_WINDOW_MS = 2500;
const QUICK_K = 0.55;

const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

/** Resolves a mode's colour tokens by flipping data-mode synchronously (no paint in between). */
function readPalette(mode: Mode): Palette {
  const root = document.documentElement;
  const prev = root.dataset.mode;
  root.dataset.mode = mode;
  const css = getComputedStyle(root);
  const get = (name: string) => css.getPropertyValue(name).trim();
  const palette = { bg: get('--bg'), surface: get('--surface'), primary: get('--primary'), accent: get('--accent') };
  if (prev) root.dataset.mode = prev;
  return palette;
}

interface Run {
  id: number;
  from: Palette;
  to: Palette;
  k: number;
}

export function ModeTransitionProvider({ children }: { children: ReactNode }) {
  const { mode, setMode } = useMode();
  const reduced = useReducedMotion();
  const [run, setRun] = useState<Run | null>(null);
  const [phase, setPhase] = useState<MorphPhase>('expand');
  const busyRef = useRef(false);
  const lastEndRef = useRef(0);
  const idRef = useRef(0);
  const alive = useRef(true);

  // Set true on (re)mount too: React StrictMode mounts, unmounts and remounts in dev,
  // and a cleanup-only effect would leave this false forever.
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const prefetch = useCallback((m: Mode) => void preloadMode(m), []);

  const start = useCallback(
    async (next: Mode, options?: StartOptions) => {
      if (busyRef.current || next === mode) return;

      if (reduced) {
        setMode(next);
        options?.onSwap?.();
        return;
      }

      busyRef.current = true;
      let swapped = false;
      try {
        const k = performance.now() - lastEndRef.current < QUICK_WINDOW_MS ? QUICK_K : 1;
        const ready = preloadMode(next);

        setPhase('expand');
        setRun({ id: ++idRef.current, from: readPalette(mode), to: readPalette(next), k });

        await wait(T.expand * k);
        if (!alive.current) return;
        setPhase('merge');
        await wait(T.merge * k);
        if (!alive.current) return;

        // Fully covered: swap identities underneath.
        setMode(next);
        swapped = true;
        options?.onSwap?.();
        setPhase('hold');

        // Hold at least briefly; wait for the next mode's assets, but never hang.
        await Promise.all([wait(T.minHold * k), Promise.race([ready, wait(T.maxWait)])]);
        if (!alive.current) return;

        setPhase('release');
        await wait(T.release * k);
      } finally {
        // Whatever happens, never leave the overlay up blocking the page or the switch locked.
        if (alive.current) {
          if (!swapped) setMode(next);
          setRun(null);
        }
        busyRef.current = false;
        lastEndRef.current = performance.now();
      }
    },
    [mode, reduced, setMode],
  );

  const value = useMemo<ModeTransitionValue>(
    () => ({ start: (n, o) => void start(n, o), prefetch, busy: run !== null }),
    [start, prefetch, run],
  );

  return (
    <ModeTransitionContext.Provider value={value}>
      {children}
      {run && <MorphOverlay key={run.id} phase={phase} from={run.from} to={run.to} k={run.k} />}
    </ModeTransitionContext.Provider>
  );
}
