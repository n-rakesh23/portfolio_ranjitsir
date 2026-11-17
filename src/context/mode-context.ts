import { createContext } from 'react';
import type { Mode } from '../data/types';

export interface ModeContextValue {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  /** Enquiry value pre-selected in the contact form (set by Get Involved CTAs). null = use mode default. */
  enquiryType: string | null;
  setEnquiryType: (value: string | null) => void;
}

export const ModeContext = createContext<ModeContextValue | null>(null);
