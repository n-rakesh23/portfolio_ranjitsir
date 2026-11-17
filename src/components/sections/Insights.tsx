import { useMode } from '../../hooks/useMode';
import { Button, Icon, Reveal, Section, SectionHeading } from '../ui';
import { InsightCard } from './insights/InsightCard';

export default function Insights() {
  const { content } = useMode();
  const labels = content.sections.insights;
  const items = content.insights.slice(0, 3);
  const allIsExternal = /^https?:\/\//.test(content.insightsAllUrl);

  return (
    <Section id="insights" labelledBy="insights-heading">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between md:gap-6">
        <SectionHeading id="insights-heading" {...labels} className="mb-6 md:mb-12" />
        <Reveal className="mb-10 md:mb-12">
          <Button
            href={content.insightsAllUrl}
            external={allIsExternal}
            variant="secondary"
            iconRight={<Icon name="external-link" size={16} />}
          >
            {content.labels.viewAll}
          </Button>
        </Reveal>
      </div>

      <ul className="grid gap-6 md:grid-cols-3">
        {items.map((insight, i) => (
          <Reveal as="li" key={insight.id} index={i}>
            <InsightCard insight={insight} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
