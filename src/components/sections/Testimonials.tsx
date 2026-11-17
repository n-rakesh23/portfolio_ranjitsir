import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useMode } from '../../hooks/useMode';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';
import { DURATION, EASE } from '../../lib/motion';
import { Reveal, Section, SectionHeading } from '../ui';
import { TestimonialCard } from './testimonials/TestimonialCard';

const AUTO_MS = 6000;
const SWIPE_PX = 60;

function usePerView() {
  const query = '(min-width: 768px)';
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setWide(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return wide ? 2 : 1;
}

export default function Testimonials() {
  const { content, mode } = useMode();
  const labels = content.sections.testimonials;
  const items = content.testimonials;
  const reduced = useReducedMotion();
  const perView = usePerView();
  const pageCount = Math.max(1, Math.ceil(items.length / perView));

  const [page, setPage] = useState(0);
  const [pageMode, setPageMode] = useState(mode);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [announce, setAnnounce] = useState('');

  if (pageMode !== mode) {
    setPageMode(mode);
    setPage(0);
  }

  const current = Math.min(page, pageCount - 1);
  const visible = items.slice(current * perView, current * perView + perView);

  const go = useCallback(
    (next: number, manual: boolean) => {
      const target = (next + pageCount) % pageCount;
      setDirection(next > current ? 1 : -1);
      setPage(target);
      if (manual) setAnnounce(`${target + 1} ${content.labels.of} ${pageCount}`);
    },
    [current, pageCount, content.labels.of],
  );

  useEffect(() => {
    if (paused || reduced || pageCount < 2) return;
    const id = window.setTimeout(() => go(current + 1, false), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [paused, reduced, pageCount, current, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_PX) go(current + 1, true);
    else if (info.offset.x > SWIPE_PX) go(current - 1, true);
  };

  if (items.length === 0) return null;

  const offset = reduced ? 0 : 40;
  const slideLabel = (n: number) => `${n} ${content.labels.of} ${pageCount}`;

  return (
    <Section id="testimonials" labelledBy="testimonials-heading">
      <SectionHeading id="testimonials-heading" {...labels} />
      <Reveal className="mt-12">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={content.labels.testimonialsCarousel}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
          }}
        >
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={`${mode}-${perView}-${current}`}
                role="group"
                aria-roledescription="slide"
                aria-label={slideLabel(current + 1)}
                className="grid touch-pan-y gap-6 md:grid-cols-2"
                custom={direction}
                initial={{ opacity: 0, x: direction * offset }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * offset }}
                transition={{ duration: reduced ? DURATION.fast : 0.4, ease: EASE }}
                drag={pageCount > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={onDragEnd}
              >
                {visible.map((t) => (
                  <TestimonialCard key={t.id} t={t} mode={mode} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {pageCount > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => go(current - 1, true)}
                aria-label={content.labels.previous}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:bg-surface-2"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: pageCount }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i, true)}
                    aria-label={slideLabel(i + 1)}
                    aria-current={i === current ? 'true' : undefined}
                    className="flex h-11 w-6 items-center justify-center"
                  >
                    <span
                      className={cn(
                        'block h-2 rounded-full transition-all duration-200',
                        i === current ? 'w-6 bg-primary' : 'w-2 bg-border',
                      )}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(current + 1, true)}
                aria-label={content.labels.next}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:bg-surface-2"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          )}

          <p aria-live="polite" aria-atomic="true" className="sr-only">
            {announce}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
