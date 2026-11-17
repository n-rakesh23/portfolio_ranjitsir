import { shared } from '../../data';
import { useMode } from '../../hooks/useMode';
import { Container, Reveal, Section } from '../ui';
import { ConnectorLine } from './intersection/ConnectorLine';

// Fixed colours (not mode tokens): this band deliberately blends both palettes in either mode.
const BAND_GRADIENT = 'linear-gradient(135deg, #0B1020 0%, #1A2440 38%, #E6DCCB 72%, #FBF7F0 100%)';

export default function Intersection() {
  const { content } = useMode();
  const intro = content.intersectionIntro;

  return (
    <Section id="intersection" labelledBy="intersection-heading" bleed className="isolate overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: BAND_GRADIENT }} aria-hidden="true" />
      <Container>
        <Reveal>
          <header className="mx-auto mb-10 max-w-2xl rounded-theme border border-[#24304F] bg-[#0B1020]/90 px-6 py-8 text-center backdrop-blur-sm md:px-10">
            <p className="mb-3 font-mono text-sm tracking-wide text-[#38BDF8]">{intro.eyebrow}</p>
            <h2 id="intersection-heading" className="text-[#E6EAF2]">
              {intro.title}
            </h2>
            {intro.subtitle && <p className="mt-4 text-lg text-[#B4BED3]">{intro.subtitle}</p>}
          </header>
        </Reveal>

        <Reveal index={1}>
          <ConnectorLine />
        </Reveal>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shared.intersection.map((project, i) => (
            <Reveal as="li" key={project.id} index={i + 2} className="flex">
              <article className="flex w-full flex-col rounded-theme border border-[#E6DCCB] bg-white p-6 text-[#2B2420] shadow-[0_10px_30px_rgba(11,16,32,0.18)] transition-transform duration-200 ease-theme hover:-translate-y-1">
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-theme bg-[#0B1020] px-2.5 py-1 font-mono text-xs font-medium text-[#38BDF8]">
                    {project.techBadge}
                  </span>
                  <span className="inline-flex items-center rounded-theme bg-[#F3ECE0] px-2.5 py-1 font-mono text-xs font-medium text-[#A3452D]">
                    {project.impactBadge}
                  </span>
                </div>
                <h3 className="mb-4 text-xl text-[#0B1020]">{project.title}</h3>
                <dl className="space-y-3 text-[0.95rem] leading-relaxed">
                  <div>
                    <dt className="sr-only">{content.labels.problem}</dt>
                    <dd className="text-[#6E625A]">{project.problem}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">{content.labels.approach}</dt>
                    <dd>{project.built}</dd>
                  </div>
                  <div className="border-t border-[#E6DCCB] pt-3">
                    <dt className="sr-only">{content.labels.outcome}</dt>
                    <dd className="font-medium text-[#3F6B4C]">{project.helped}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
