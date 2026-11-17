import { ArrowRight } from 'lucide-react';
import type { Project } from '../../../data/types';
import { useMode } from '../../../hooks/useMode';
import { Badge, Card } from '../../ui';

interface ProjectCardProps {
  project: Project;
  readMoreLabel: string;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

export function ProjectCard({ project, readMoreLabel, onOpen }: ProjectCardProps) {
  const { content } = useMode();
  return (
    <Card interactive className="group h-full overflow-hidden">
      <button
        type="button"
        onClick={(e) => onOpen(project, e.currentTarget)}
        aria-haspopup="dialog"
        className="flex h-full w-full flex-col text-left focus-visible:outline-none"
      >
        <div className="aspect-[16/10] w-full overflow-hidden border-b border-border bg-surface-2">
          <img
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-theme group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="text-xl">{project.title}</h3>
          <p className="text-text-muted">{project.summary}</p>
          {project.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label={content.labels.tags}>
              {project.tags.slice(0, 3).map((tag) => (
                <li key={tag}>
                  <Badge tone="accent">{tag}</Badge>
                </li>
              ))}
            </ul>
          )}
          <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary-strong group-focus-visible:underline">
            {readMoreLabel}
            <ArrowRight aria-hidden size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </button>
    </Card>
  );
}
