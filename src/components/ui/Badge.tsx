import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type BadgeTone = 'primary' | 'accent' | 'warm' | 'success' | 'neutral';

const tones: Record<BadgeTone, string> = {
  primary: 'text-primary bg-[color-mix(in_srgb,var(--primary)_14%,transparent)]',
  accent: 'text-accent bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]',
  warm: 'text-text bg-[color-mix(in_srgb,var(--warm)_28%,transparent)]',
  success: 'text-success bg-[color-mix(in_srgb,var(--success)_14%,transparent)]',
  neutral: 'text-text-muted bg-surface-2',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-theme px-2.5 py-1 font-mono text-xs font-medium',
        tones[tone],
        className,
      )}
      {...rest}
    />
  );
}
