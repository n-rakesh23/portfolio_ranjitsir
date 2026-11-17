import type { HTMLAttributes, PointerEvent } from 'react';
import { cn } from '../../lib/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Lift -4px with stronger shadow/glow on hover. */
  interactive?: boolean;
}

export function Card({ interactive, className, onPointerMove, onPointerLeave, ...rest }: CardProps) {
  // Feeds the engineer-mode spotlight (.card-spotlight). Writes CSS vars directly, so no re-render.
  const track = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    onPointerMove?.(e);
  };
  const reset = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.removeProperty('--my');
    onPointerLeave?.(e);
  };

  return (
    <div
      className={cn(
        'rounded-theme border border-border bg-surface shadow-theme',
        interactive &&
          'card-spotlight transition-[transform,box-shadow] duration-200 ease-theme hover:-translate-y-1 hover:shadow-theme-hover focus-within:shadow-theme-hover',
        className,
      )}
      onPointerMove={interactive ? track : onPointerMove}
      onPointerLeave={interactive ? reset : onPointerLeave}
      {...rest}
    />
  );
}
