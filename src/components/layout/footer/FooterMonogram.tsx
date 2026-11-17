import type { Mode } from '../../../data/types';

export function FooterMonogram({ initials, mode }: { initials: string; mode: Mode }) {
  if (mode === 'engineer') {
    return (
      <span className="font-mono text-xl font-medium text-text" aria-hidden="true">
        <span className="text-primary">[</span>
        {initials}
        <span className="text-primary">]</span>
      </span>
    );
  }
  return (
    <span
      className="grid h-11 w-11 place-items-center rounded-full border-2 border-primary font-display text-lg font-semibold text-primary-strong"
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
