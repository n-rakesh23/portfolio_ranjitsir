import type { Cause } from '../../../data/types';
import { cn } from '../../../lib/cn';
import { Card, Icon, Reveal } from '../../ui';

const TINTS = [
  { circle: 'bg-[color-mix(in_srgb,var(--warm)_20%,transparent)]', icon: 'text-[color-mix(in_srgb,var(--warm)_55%,var(--text))]' },
  { circle: 'bg-[color-mix(in_srgb,var(--accent)_16%,transparent)]', icon: 'text-accent' },
  { circle: 'bg-[color-mix(in_srgb,var(--primary)_14%,transparent)]', icon: 'text-primary-strong' },
];

export function CauseGrid({ causes }: { causes: Cause[] }) {
  return (
    <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {causes.map((c, i) => {
        const tint = TINTS[i % TINTS.length];
        return (
          <Reveal as="li" key={c.id} index={i} className="h-full">
            <Card interactive className="flex h-full flex-col p-7">
              <span className={cn('mb-5 flex h-14 w-14 items-center justify-center rounded-full', tint.circle)}>
                <Icon name={c.icon} size={26} className={tint.icon} />
              </span>
              <h3 className="mb-2">{c.title}</h3>
              <p className="flex-1 text-text-muted">{c.description}</p>
              <p className="mt-6 border-t border-border pt-4">
                <span className="font-display text-3xl font-semibold text-primary-strong">{c.keyNumber.value}</span>{' '}
                <span className="text-sm italic text-text-muted">{c.keyNumber.label}</span>
              </p>
            </Card>
          </Reveal>
        );
      })}
    </ul>
  );
}
