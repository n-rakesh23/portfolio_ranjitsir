import { useContext } from 'react';
import { ModeTransitionContext } from '../context/transition-context';

export function useModeTransition() {
  const ctx = useContext(ModeTransitionContext);
  if (!ctx) throw new Error('useModeTransition must be used inside <ModeTransitionProvider>');
  return ctx;
}
