import { createContext } from 'react';
import type { Mode } from '../data/types';

export interface StartOptions {
  /** Runs at the moment the screen is fully covered, right after the mode swaps. */
  onSwap?: () => void;
}

export interface ModeTransitionValue {
  /** Play the block-morph transition and switch to `next` while the screen is covered. */
  start: (next: Mode, options?: StartOptions) => void;
  /** Warm the other mode's chunks and images (call on hover / focus). */
  prefetch: (mode: Mode) => void;
  busy: boolean;
}

export const ModeTransitionContext = createContext<ModeTransitionValue | null>(null);
