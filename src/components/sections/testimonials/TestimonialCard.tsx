import type { Mode, Testimonial } from '../../../data/types';
import { Card } from '../../ui';

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialCard({ t, mode }: { t: Testimonial; mode: Mode }) {
  if (mode === 'engineer') {
    return (
      <Card className="h-full p-6 md:p-8">
        <figure className="flex h-full flex-col">
          <blockquote className="flex-1 text-lg leading-relaxed text-text">
            <span aria-hidden="true" className="font-mono text-primary">
              /*{' '}
            </span>
            {t.quote}
            <span aria-hidden="true" className="font-mono text-primary">
              {' '}*/
            </span>
          </blockquote>
          <figcaption className="mt-6 border-t border-border pt-4">
            <p className="font-display font-semibold text-text">{t.name}</p>
            <p className="font-mono text-sm text-text-muted">
              {t.title} @ {t.org}
            </p>
          </figcaption>
        </figure>
      </Card>
    );
  }

  return (
    <Card className="relative h-full p-6 pt-12 md:p-8 md:pt-14">
      <figure className="flex h-full flex-col">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-6 top-0 select-none font-display text-8xl leading-none text-warm md:left-8"
        >
          &ldquo;
        </span>
        <blockquote className="flex-1 font-display text-lg leading-relaxed text-text md:text-xl">{t.quote}</blockquote>
        <figcaption className="mt-6 flex items-center gap-4">
          {t.photo ? (
            <img
              src={t.photo.src}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 font-display text-lg text-text"
            >
              {initialsOf(t.name)}
            </span>
          )}
          <div>
            <p className="font-semibold text-text">{t.name}</p>
            <p className="text-sm italic text-text-muted">
              {t.relationship ?? t.title}
              {t.org ? ` · ${t.org}` : ''}
            </p>
          </div>
        </figcaption>
      </figure>
    </Card>
  );
}
