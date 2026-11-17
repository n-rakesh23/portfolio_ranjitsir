import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useId, useRef } from 'react';
import type { Project, UiLabels } from '../../../data/types';
import { useMode } from '../../../hooks/useMode';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { DURATION, EASE } from '../../../lib/motion';
import { Badge, Button, Chip, Icon } from '../../ui';
import { ImageCarousel } from './ImageCarousel';

export interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { mode, content } = useMode();
  const labels: UiLabels = content.labels;
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null,
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const steps: Array<[string, string]> = [
    [labels.problem, project.problem],
    [labels.approach, project.approach],
    [labels.outcome, project.outcome],
  ];

  const isSocial = mode === 'social';
  const carouselImages = project.images && project.images.length > 0 ? project.images : [project.image];

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.card }}
    >
      <div
        className="absolute inset-0 bg-[color-mix(in_srgb,var(--bg)_75%,transparent)] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-theme border border-border bg-surface shadow-theme-hover sm:rounded-theme"
        initial={{ opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.98 }}
        transition={{ duration: reduced ? DURATION.fast : 0.3, ease: EASE }}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-surface px-6 py-5 sm:px-8">
          <div>
            {project.tags.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} tone="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <h2 id={titleId} className="text-2xl">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="shrink-0 rounded-theme border border-border p-2 text-text-muted hover:border-primary hover:text-text"
          >
            <X aria-hidden size={18} />
          </button>
        </div>

        <div className="space-y-8 px-6 py-6 sm:px-8 sm:py-8">
          {isSocial ? (
            <ImageCarousel images={carouselImages} previousLabel={labels.previous} nextLabel={labels.next} />
          ) : (
            <img
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              decoding="async"
              className="aspect-[16/10] w-full rounded-theme border border-border object-cover"
            />
          )}

          <p className="text-lg text-text-muted">{project.summary}</p>

          {isSocial && project.beneficiaries && (
            <div className="flex items-center gap-4 rounded-theme bg-[color-mix(in_srgb,var(--warm)_22%,transparent)] p-5">
              <span className="font-display text-4xl font-semibold text-text">{project.beneficiaries.value}</span>
              <span className="text-text">
                <span className="block text-sm text-text-muted">{labels.beneficiaries}</span>
                {project.beneficiaries.label}
              </span>
            </div>
          )}

          <ol className="space-y-6">
            {steps.map(([label, body], i) => (
              <li key={label} className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <p className="eyebrow">
                  {mode === 'engineer' ? `0${i + 1} · ` : ''}
                  {label}
                </p>
                <p>{body}</p>
              </li>
            ))}
          </ol>

          {!isSocial && project.techStack && project.techStack.length > 0 && (
            <div>
              <p className="eyebrow mb-3">{labels.techStack}</p>
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <li key={tech}>
                    <Chip className="font-mono">{tech}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!isSocial && project.diagram && (
            <figure>
              <img
                src={project.diagram.src}
                alt={project.diagram.alt}
                width={project.diagram.width}
                height={project.diagram.height}
                loading="lazy"
                decoding="async"
                className="w-full rounded-theme border border-border bg-surface-2"
              />
              <figcaption className="mt-2 text-sm text-text-muted">{project.diagram.alt}</figcaption>
            </figure>
          )}

          {project.link && (
            <Button
              href={project.link.href}
              external={project.link.external}
              variant="secondary"
              iconRight={project.link.external ? <Icon name="external-link" size={16} /> : undefined}
            >
              {project.link.label}
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
