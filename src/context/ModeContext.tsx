import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Mode } from '../data/types';
import { ModeContext, type ModeContextValue } from './mode-context';

const STORAGE_KEY = 'mode';
const DEFAULT_MODE: Mode = 'engineer';

const isMode = (v: unknown): v is Mode => v === 'engineer' || v === 'social';

function readInitialMode(): Mode {
  if (typeof window === 'undefined') return DEFAULT_MODE;
  const fromUrl = new URLSearchParams(window.location.search).get('mode');
  if (isMode(fromUrl)) return fromUrl;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isMode(stored)) return stored;
  } catch {
    // storage unavailable
  }
  return DEFAULT_MODE;
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(readInitialMode);
  const [enquiryType, setEnquiryType] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // storage unavailable
    }
    const url = new URL(window.location.href);
    if (url.searchParams.get('mode') !== mode) {
      url.searchParams.set('mode', mode);
      window.history.replaceState(window.history.state, '', url);
    }
  }, [mode]);

  const setMode = useCallback((next: Mode) => {
    setModeState(next);
    setEnquiryType(null);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((m) => (m === 'engineer' ? 'social' : 'engineer'));
    setEnquiryType(null);
  }, []);

  const value = useMemo<ModeContextValue>(
    () => ({ mode, setMode, toggleMode, enquiryType, setEnquiryType }),
    [mode, setMode, toggleMode, enquiryType],
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}
