import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState, type KeyboardEvent } from 'react';
import type { SkillGroup } from '../../../data/types';
import { useMode } from '../../../hooks/useMode';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { cn } from '../../../lib/cn';
import { DURATION, EASE, STAGGER } from '../../../lib/motion';
import { Icon } from '../../ui';

const MAX_YEARS = 20;

export function SkillTabs({ groups }: { groups: SkillGroup[] }) {
  const [activeId, setActiveId] = useState(groups[0]?.id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduced = useReducedMotion();
  const { content } = useMode();

  const activeIndex = Math.max(0, groups.findIndex((g) => g.id === activeId));
  const active = groups[activeIndex];
  if (!active) return null;

  const focusTab = (index: number) => {
    const next = (index + groups.length) % groups.length;
    setActiveId(groups[next].id);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: groups.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      focusTab(keys[e.key]);
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={content.labels.skillCategories}
        className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-2"
      >
        {groups.map((g, i) => {
          const selected = g.id === active.id;
          return (
            <button
              key={g.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`skills-tab-${g.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`skills-panel-${g.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(g.id)}
              onKeyDown={onKeyDown}
              className={cn(
                'relative shrink-0 whitespace-nowrap rounded-theme border px-4 py-2 font-mono text-sm transition-colors duration-200',
                selected
                  ? 'border-primary text-primary'
                  : 'border-border text-text-muted hover:bg-surface-2 hover:text-text',
              )}
            >
              {g.label}
              {selected && (
                <motion.span
                  layoutId="skills-tab-indicator"
                  className="absolute inset-x-3 -bottom-px h-0.5 bg-primary"
                  transition={{ duration: reduced ? 0 : DURATION.card, ease: EASE }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={active.id}
          id={`skills-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`skills-tab-${active.id}`}
          tabIndex={0}
          className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -8 }}
          transition={{ duration: reduced ? DURATION.fast : DURATION.card, ease: EASE }}
        >
          {active.skills.map((s, i) => {
            const pct = Math.min(100, (s.years / MAX_YEARS) * 100);
            return (
              <li
                key={s.name}
                className="flex items-center gap-3 rounded-theme border border-border bg-surface p-4 transition-[box-shadow,transform] duration-200 ease-theme hover:-translate-y-0.5 hover:shadow-theme-hover"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-theme border border-border bg-surface-2 text-primary">
                  <Icon name={s.icon} size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate font-medium text-text">{s.name}</span>
                    <span className="shrink-0 font-mono text-xs text-text-muted">
                      {s.years} {s.years === 1 ? 'yr' : 'yrs'}
                    </span>
                  </div>
                  <div
                    className="mt-2 h-1 overflow-hidden rounded-full bg-surface-2"
                    role="meter"
                    aria-label={`${s.name} years of use`}
                    aria-valuemin={0}
                    aria-valuemax={MAX_YEARS}
                    aria-valuenow={s.years}
                  >
                    <motion.div
                      className="h-full origin-left rounded-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${pct}%` }}
                      initial={{ scaleX: reduced ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reduced ? 0 : DURATION.reveal, ease: EASE, delay: reduced ? 0 : i * STAGGER }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
