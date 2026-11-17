import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import type { Mode, Offer } from '../../../data/types';
import { cn } from '../../../lib/cn';
import { Badge, Button, Card, Icon } from '../../ui';

interface OfferCardProps {
  offer: Offer;
  mode: Mode;
  badgeFallback: string;
  onContactCta: (enquiryType: string | undefined) => void;
}

export function OfferCard({ offer, mode, badgeFallback, onContactCta }: OfferCardProps) {
  const social = mode === 'social';
  const emphasised = Boolean(offer.highlight);
  // Social emphasis inverts the card onto the primary colour (Donate).
  const inverted = social && emphasised;
  const toContact = offer.ctaHref.startsWith('#contact');
  const badgeText = emphasised && !social ? (offer.badge ?? badgeFallback) : offer.badge;
  const titleId = `offer-${offer.id}-title`;

  return (
    <Card
      interactive
      role="article"
      aria-labelledby={titleId}
      className={cn(
        'relative flex h-full flex-col p-6 md:p-8',
        !social && emphasised && 'border-primary',
        inverted && 'border-transparent bg-primary text-primary-contrast',
      )}
    >
      {badgeText && (
        <Badge
          tone={inverted ? 'neutral' : 'primary'}
          className={cn('absolute right-5 top-5', inverted && 'bg-primary-contrast text-primary-strong')}
        >
          {badgeText}
        </Badge>
      )}

      <span
        className={cn(
          'mb-6 inline-flex h-12 w-12 items-center justify-center',
          social ? 'rounded-full' : 'rounded-theme border border-border',
          inverted
            ? 'bg-[color-mix(in_srgb,var(--primary-contrast)_18%,transparent)] text-primary-contrast'
            : social
              ? 'bg-[color-mix(in_srgb,var(--warm)_28%,transparent)] text-primary-strong'
              : 'bg-surface-2 text-primary',
        )}
      >
        <Icon name={offer.icon} size={22} />
      </span>

      <h3 id={titleId} className={cn(inverted && 'text-primary-contrast')}>
        {offer.title}
      </h3>
      <p className={cn('mt-3', inverted ? 'text-primary-contrast' : 'text-text-muted')}>{offer.description}</p>

      <ul className="mt-6 space-y-2.5">
        {offer.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5">
            <Check
              aria-hidden
              size={18}
              className={cn('mt-1 shrink-0', inverted ? 'text-primary-contrast' : social ? 'text-accent' : 'text-success')}
            />
            <span className={cn(inverted && 'text-primary-contrast')}>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        {toContact ? (
          <Button
            href={offer.ctaHref}
            variant={emphasised ? 'primary' : 'secondary'}
            className="w-full"
            iconRight={<ArrowRight aria-hidden size={18} />}
            onClick={() => onContactCta(offer.enquiryType)}
          >
            {offer.ctaLabel}
          </Button>
        ) : (
          <Button
            href={offer.ctaHref}
            external={offer.external}
            variant={inverted ? 'secondary' : emphasised ? 'primary' : 'secondary'}
            className={cn(
              'w-full',
              inverted &&
                'border-transparent bg-primary-contrast text-primary-strong hover:border-transparent hover:text-primary-strong focus-visible:outline-primary-contrast',
            )}
            iconRight={offer.external ? <ExternalLink aria-hidden size={18} /> : <ArrowRight aria-hidden size={18} />}
          >
            {offer.ctaLabel}
          </Button>
        )}
      </div>
    </Card>
  );
}
