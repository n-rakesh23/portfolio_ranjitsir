import type { IconName, Insight, InsightType } from '../../../data/types';
import { useMode } from '../../../hooks/useMode';
import { Badge, Card, Icon } from '../../ui';

const typeIcon: Record<InsightType, IconName> = {
  article: 'book-open',
  talk: 'mic',
  podcast: 'headphones',
  story: 'message-square',
  media: 'newspaper',
};

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export function InsightCard({ insight }: { insight: Insight }) {
  const { thumbnail } = insight;
  const { labels } = useMode().content;

  return (
    <Card interactive className="group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden bg-surface-2">
        <img
          src={thumbnail.src}
          alt={thumbnail.alt}
          width={thumbnail.width}
          height={thumbnail.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-theme group-hover:scale-105"
        />
        {insight.type === 'talk' && (
          <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-contrast shadow-theme transition-transform duration-200 ease-theme group-hover:scale-110">
              <Icon name="play" size={24} className="translate-x-0.5" />
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-text-muted">
          <Badge tone="primary">
            <Icon name={typeIcon[insight.type]} size={14} />
            {labels.insightTypes[insight.type]}
          </Badge>
          <time dateTime={insight.date}>{dateFormat.format(new Date(insight.date))}</time>
          <span aria-hidden="true">·</span>
          <span>{insight.readTime}</span>
        </div>

        <h3 className="mb-2 text-xl">
          <a
            href={insight.url}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:rounded-theme after:content-[''] hover:text-primary focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary"
          >
            {insight.title}
            <span className="sr-only"> {labels.opensInNewTab}</span>
          </a>
        </h3>
        <p className="flex-1 text-text-muted">{insight.excerpt}</p>
        <Icon
          name="external-link"
          size={16}
          className="mt-4 text-text-muted transition-colors group-hover:text-primary"
        />
      </div>
    </Card>
  );
}
