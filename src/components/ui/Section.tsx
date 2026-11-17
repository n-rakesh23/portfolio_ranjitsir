import type { ReactNode } from 'react';
import type { SectionId } from '../../data/types';
import { cn } from '../../lib/cn';
import { Container } from './Container';

export interface SectionProps {
  id: SectionId;
  className?: string;
  /** Classes for the inner Container. */
  containerClassName?: string;
  /** Skip the inner Container (full-bleed content). */
  bleed?: boolean;
  /** id of the heading element, for aria-labelledby. */
  labelledBy?: string;
  children: ReactNode;
}

export function Section({ id, className, containerClassName, bleed, labelledBy, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative scroll-mt-[var(--nav-height)] py-[var(--section-py)]', className)}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
