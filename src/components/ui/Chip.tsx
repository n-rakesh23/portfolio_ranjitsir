import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

const base =
  'inline-flex items-center gap-2 rounded-theme border px-3.5 py-1.5 text-sm transition-colors duration-150';

/** Static label chip (e.g. tech stack item). */
export function Chip({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn(base, 'border-border bg-surface-2 text-text', className)} {...rest} />;
}

export interface ToggleChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

/** Selectable filter chip; exposes aria-pressed. */
export function ToggleChip({ active, className, type, ...rest }: ToggleChipProps) {
  return (
    <button
      type={type ?? 'button'}
      aria-pressed={active}
      className={cn(
        base,
        active
          ? 'border-primary bg-primary text-primary-contrast'
          : 'border-border bg-surface text-text-muted hover:border-primary hover:text-text',
        className,
      )}
      {...rest}
    />
  );
}
