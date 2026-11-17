import { Badge, Card, Icon, Reveal, Section, SectionHeading } from '../ui';
import { useMode } from '../../hooks/useMode';
import { shared } from '../../data/shared';
import type { AboutContent, Mode } from '../../data/types';

function AboutImage({ about, mode }: { about: AboutContent; mode: Mode }) {
  const { image } = about;
  return (
    <div className="relative mx-auto w-full max-w-sm md:max-w-none">
      {mode === 'engineer' ? (
        <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-theme border border-primary/60" />
      ) : (
        <div
          aria-hidden
          className="absolute -bottom-5 -left-5 h-3/4 w-3/4 rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-accent/25"
        />
      )}
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className="relative aspect-[4/5] w-full rounded-theme border border-border object-cover shadow-theme"
      />
    </div>
  );
}

function EngineerPoints({ about }: { about: AboutContent }) {
  return (
    <>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {about.points.map((p, i) => (
          <Reveal as="li" key={p.title} index={i + 2}>
            <Card interactive className="h-full p-5">
              <span className="font-mono text-sm text-primary">{p.label}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-text">{p.title}</h3>
              <p className="mt-1 text-sm text-text-muted">{p.description}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
      {about.roles.length > 0 && (
        <Reveal index={5} className="mt-6 flex flex-wrap gap-2">
          {about.roles.map((r) => (
            <Badge key={r} tone="primary">
              {r}
            </Badge>
          ))}
        </Reveal>
      )}
    </>
  );
}

function SocialPoints({ about }: { about: AboutContent }) {
  return (
    <>
      <ul className="mt-8 grid gap-5 sm:grid-cols-3">
        {about.points.map((p, i) => (
          <Reveal as="li" key={p.title} index={i + 2} className="flex gap-3 sm:flex-col">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Icon name={p.icon} size={22} />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-text">{p.title}</h3>
              <p className="mt-1 text-sm text-text-muted">{p.description}</p>
            </div>
          </Reveal>
        ))}
      </ul>
      {about.pullQuote && (
        <Reveal index={5}>
          <blockquote className="mt-8 border-l-4 border-warm pl-5 font-display text-xl italic leading-snug text-text md:text-2xl">
            {about.pullQuote}
          </blockquote>
        </Reveal>
      )}
    </>
  );
}

export default function About() {
  const { mode, content } = useMode();
  const { about } = content;
  const labels = content.sections.about;

  return (
    <Section id="about" labelledBy="about-heading">
      <div className="grid items-start gap-12 md:grid-cols-5 md:gap-16">
        <Reveal className="md:col-span-2">
          <AboutImage about={about} mode={mode} />
        </Reveal>
        <div className="md:col-span-3">
          <SectionHeading id="about-heading" {...labels} />
          <Reveal index={1} className="mt-6 max-w-prose space-y-4 text-text-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          {mode === 'engineer' ? <EngineerPoints about={about} /> : <SocialPoints about={about} />}
        </div>
      </div>
      <Reveal className="mt-16 border-t border-border pt-8 text-center">
        <p className={mode === 'engineer' ? 'font-mono text-sm text-text-muted' : 'font-display text-lg italic text-text'}>
          {shared.tagline}
        </p>
      </Reveal>
    </Section>
  );
}
