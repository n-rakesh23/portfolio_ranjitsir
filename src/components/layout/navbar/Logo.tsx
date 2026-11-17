import type { MouseEvent } from 'react';
import { shared } from '../../../data';
import type { Mode } from '../../../data/types';
import { cn } from '../../../lib/cn';

interface LogoProps {
  mode: Mode;
  onNavigate: (e: MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function Logo({ mode, onNavigate }: LogoProps) {
  return (
    <a
      href="#hero"
      onClick={(e) => onNavigate(e, '#hero')}
      aria-label={shared.name}
      className={cn(
        'flex shrink-0 items-center font-display font-bold text-text no-underline transition-colors hover:text-primary',
        mode === 'engineer'
          ? 'font-mono text-lg tracking-tight'
          : 'h-10 w-10 justify-center rounded-full border-2 border-primary text-base text-primary',
      )}
    >
      {mode === 'engineer' ? (
        <>
          <span className="text-primary">[</span>
          {shared.initials}
          <span className="text-primary">]</span>
        </>
      ) : (
        shared.initials
      )}
    </a>
  );
}
