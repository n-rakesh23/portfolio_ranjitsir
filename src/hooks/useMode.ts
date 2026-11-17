import { useContext } from 'react';
import { ModeContext } from '../context/mode-context';
import { getContent } from '../data';

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useMode must be used inside <ModeProvider>');
  return { ...ctx, content: getContent(ctx.mode) };
}
