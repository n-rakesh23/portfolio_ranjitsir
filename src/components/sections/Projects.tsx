import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { lazy, Suspense, useCallback, useMemo, useRef, useState } from 'react';
import type { Project } from '../../data/types';
import { useMode } from '../../hooks/useMode';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { DURATION, EASE } from '../../lib/motion';
import { Reveal, Section, SectionHeading, ToggleChip } from '../ui';
import { ProjectCard } from './projects/ProjectCard';

const ProjectModal = lazy(() => import('./projects/ProjectModal'));

const ALL = '__all__';

export default function Projects() {
  const { mode, content } = useMode();
  const labels = content.sections['work'];
  const reduced = useReducedMotion();
  const projects = content.projects;

  const [filterState, setFilterState] = useState<{ mode: string; tag: string }>({ mode, tag: ALL });
  const [openState, setOpenState] = useState<{ mode: string; id: string } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Reset filter / close modal when the mode changes (derived, no effect needed).
  const activeTag = filterState.mode === mode ? filterState.tag : ALL;
  const openProject = openState?.mode === mode ? projects.find((p) => p.id === openState.id) : undefined;

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [projects]);

  const visible = activeTag === ALL ? projects : projects.filter((p) => p.tags.includes(activeTag));

  const handleOpen = useCallback(
    (project: Project, trigger: HTMLElement) => {
      triggerRef.current = trigger;
      setOpenState({ mode, id: project.id });
    },
    [mode],
  );

  const handleClose = useCallback(() => {
    setOpenState(null);
    const trigger = triggerRef.current;
    requestAnimationFrame(() => trigger?.focus());
  }, []);

  return (
    <Section id="work" labelledBy="work-heading">
      <Reveal>
        <SectionHeading id="work-heading" {...labels} />
      </Reveal>

      {tags.length > 1 && (
        <Reveal index={1}>
          <div role="group" aria-label={content.labels.filterByTag} className="mb-10 flex flex-wrap gap-2">
            {[ALL, ...tags].map((tag) => (
              <ToggleChip key={tag} active={activeTag === tag} onClick={() => setFilterState({ mode, tag })}>
                {tag === ALL ? content.labels.filterAll : tag}
              </ToggleChip>
            ))}
          </div>
        </Reveal>
      )}

      <LayoutGroup>
        <motion.ul layout={!reduced} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.li
                key={project.id}
                layout={!reduced}
                initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
                transition={{ duration: reduced ? DURATION.fast : 0.3, ease: EASE }}
              >
                <ProjectCard project={project} readMoreLabel={content.labels.readMore} onOpen={handleOpen} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      <Suspense fallback={null}>
        <AnimatePresence>
          {openProject && <ProjectModal key={openProject.id} project={openProject} onClose={handleClose} />}
        </AnimatePresence>
      </Suspense>
    </Section>
  );
}
