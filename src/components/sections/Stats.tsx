import { Icon, Reveal, Section, SectionHeading } from '../ui';
import { useMode } from '../../hooks/useMode';
import { cn } from '../../lib/cn';
import { Counter } from './stats/Counter';

export default function Stats() {
  const { mode, content } = useMode();
  const labels = content.sections.stats;
  const engineer = mode === 'engineer';

  return (
    <Section id="stats" labelledBy="stats-heading">
      <SectionHeading id="stats-heading" align="center" {...labels} />
      <ul className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {content.stats.map((s, i) => (
          <Reveal as="li" key={s.label} index={i}>
            <div
              className={cn(
                'flex h-full flex-col gap-3 rounded-theme p-5 md:p-6',
                engineer
                  ? 'border border-border bg-surface transition-shadow duration-200 ease-theme hover:shadow-theme-hover'
                  : i % 2 === 0
                    ? 'bg-[color-mix(in_srgb,var(--warm)_22%,var(--surface))] shadow-theme'
                    : 'bg-[color-mix(in_srgb,var(--accent)_16%,var(--surface))] shadow-theme',
              )}
            >
              <Icon name={s.icon} size={22} className={engineer ? 'text-primary' : 'text-text-muted'} />
              <Counter
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className={cn(
                  'leading-none text-text',
                  engineer ? 'font-mono text-3xl font-medium md:text-4xl' : 'font-display text-4xl font-semibold md:text-5xl',
                )}
              />
              <span className="text-sm text-text-muted">{s.label}</span>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
