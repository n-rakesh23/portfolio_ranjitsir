import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Lift -4px with stronger shadow/glow on hover. */
  interactive?: boolean;
}

export function Card({ interactive, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-theme border border-border bg-surface shadow-theme',
        interactive &&
          'transition-[transform,box-shadow] duration-200 ease-theme hover:-translate-y-1 hover:shadow-theme-hover focus-within:shadow-theme-hover',
        className,
      )}
      {...rest}
    />
  );
}
