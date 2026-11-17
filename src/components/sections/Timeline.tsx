import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import { useMode } from '../../hooks/useMode';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';
import { DURATION, EASE } from '../../lib/motion';
import { Button, Section, SectionHeading } from '../ui';
import { TimelineItem } from './timeline/TimelineItem';

const INITIAL_COUNT = 5;

export default function Timeline() {
  const { mode, content } = useMode();
  const labels = content.sections.journey;
  const items = content.timeline;
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.8', 'end 0.6'] });

  const isEngineer = mode === 'engineer';
  const visible = items.slice(0, INITIAL_COUNT);
  const hidden = items.slice(INITIAL_COUNT);
  const lineStyle = isEngineer ? 'border-l-2 border-solid' : 'border-l-2 border-dashed';

  return (
    <Section id="journey" labelledBy="journey-heading">
      <SectionHeading id="journey-heading" align="center" {...labels} />

      <div ref={listRef} className="relative mt-12 md:mt-16">
        <div aria-hidden="true" className={cn('absolute inset-y-0 left-4 border-border md:left-1/2', lineStyle)} />
        <motion.div
          aria-hidden="true"
          className={cn('absolute inset-y-0 left-4 origin-top border-primary md:left-1/2', lineStyle)}
          style={{ scaleY: reduced ? 1 : scrollYProgress }}
        />

        <ol className="relative space-y-10 md:space-y-12">
          {visible.map((item, i) => (
            <TimelineItem key={item.id} item={item} mode={mode} index={i} />
          ))}
        </ol>

        <AnimatePresence initial={false}>
          {expanded && hidden.length > 0 && (
            <motion.div
              id="journey-more"
              key="more"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduced ? DURATION.fast : DURATION.reveal, ease: EASE }}
              className="overflow-hidden"
            >
              <ol start={INITIAL_COUNT + 1} className="relative space-y-10 pt-10 md:space-y-12 md:pt-12">
                {hidden.map((item, i) => (
                  <TimelineItem key={item.id} item={item} mode={mode} index={INITIAL_COUNT + i} />
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hidden.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Button
            variant="secondary"
            aria-expanded={expanded}
            aria-controls="journey-more"
            onClick={() => setExpanded((v) => !v)}
            iconRight={
              <ChevronDown
                aria-hidden="true"
                className={cn('h-4 w-4 transition-transform duration-200', expanded && 'rotate-180')}
              />
            }
          >
            {expanded ? content.labels.showLess : content.labels.showMore}
          </Button>
        </div>
      )}
    </Section>
  );
}
