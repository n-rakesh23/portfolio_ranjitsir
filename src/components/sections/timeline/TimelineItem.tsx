import type { Mode, TimelineItem as TimelineItemData } from '../../../data/types';
import { cn } from '../../../lib/cn';
import { Badge, Card, Reveal } from '../../ui';

interface TimelineItemProps {
  item: TimelineItemData;
  mode: Mode;
  index: number;
}

export function TimelineItem({ item, mode, index }: TimelineItemProps) {
  const isEngineer = mode === 'engineer';
  const onLeft = index % 2 === 0;
  const media = isEngineer ? item.logo : item.image;

  return (
    <Reveal
      as="li"
      index={index % 5}
      className={cn('relative pl-12 md:w-1/2 md:pl-0', onLeft ? 'md:pr-12' : 'md:ml-auto md:pl-12')}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-4 top-7 h-3.5 w-3.5 -translate-x-1/2 ring-4 ring-bg',
          isEngineer ? 'rotate-45 bg-primary' : 'rounded-full bg-warm',
          onLeft ? 'md:left-auto md:right-0 md:translate-x-1/2' : 'md:left-0',
        )}
      />

      <Card interactive className="group p-6">
        <div className="flex items-start gap-4">
          {media && (
            <img
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              loading="lazy"
              decoding="async"
              className={cn(
                'h-12 w-12 shrink-0 object-cover',
                isEngineer
                  ? 'rounded-theme opacity-70 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0'
                  : 'rounded-2xl',
              )}
            />
          )}
          <div className="min-w-0">
            <p className={cn(isEngineer ? 'font-mono text-sm text-primary' : 'font-display text-lg text-primary-strong')}>
              {item.years}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-text">{item.role}</h3>
            <p className="text-text-muted">
              {item.org}
              {item.location && <span> · {item.location}</span>}
            </p>
          </div>
        </div>

        {item.achievements.length > 0 && (
          <ul className="mt-4 space-y-2 text-text">
            {item.achievements.map((a) => (
              <li key={a} className="flex gap-2">
                <span aria-hidden="true" className={cn('mt-2.5 h-1.5 w-1.5 shrink-0', isEngineer ? 'bg-accent' : 'rounded-full bg-accent')} />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        )}

        {item.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <li key={t}>
                <Badge tone={isEngineer ? 'neutral' : 'accent'}>{t}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </Reveal>
  );
}
