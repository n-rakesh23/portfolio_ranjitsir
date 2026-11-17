import { useMode } from '../../hooks/useMode';
import { Reveal, Section, SectionHeading } from '../ui';
import { CauseGrid } from './skills/CauseGrid';
import { SkillTabs } from './skills/SkillTabs';

export default function Skills() {
  const { mode, content } = useMode();
  const labels = content.sections.skills;

  return (
    <Section id="skills" labelledBy="skills-heading">
      <Reveal>
        <SectionHeading id="skills-heading" {...labels} />
      </Reveal>
      {mode === 'engineer' ? (
        <Reveal index={1}>
          <SkillTabs groups={content.skills} />
        </Reveal>
      ) : (
        <CauseGrid causes={content.causes} />
      )}
    </Section>
  );
}
