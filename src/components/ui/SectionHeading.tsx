import { cn } from '../../lib/cn';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  /** id for the h2 (pair with Section's labelledBy). */
  id?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'left', id, className }: SectionHeadingProps) {
  return (
    <header className={cn('mb-12 max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-text-muted">{subtitle}</p>}
    </header>
  );
}
