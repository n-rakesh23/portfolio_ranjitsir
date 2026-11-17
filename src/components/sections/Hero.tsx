import { motion, type Variants } from 'framer-motion';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { Button, Container } from '../ui';
import { useMode } from '../../hooks/useMode';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { DURATION, EASE, STAGGER } from '../../lib/motion';
import { cn } from '../../lib/cn';
import { BlobPortrait } from './hero/BlobPortrait';
import { HeroTitle } from './hero/HeroTitle';
import { TerminalCard } from './hero/TerminalCard';
import { BinaryRain } from '../effects/BinaryRain';
import { DecodeText } from '../effects/DecodeText';

export default function Hero() {
  const { mode, content } = useMode();
  const { hero } = content;
  const reduced = useReducedMotion();
  const isEngineer = mode === 'engineer';

  const item: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: reduced ? DURATION.fast : DURATION.reveal, ease: EASE } },
  };
  const group: Variants = { hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : STAGGER } } };

  const scrollToAbout = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-[calc(var(--nav-height)+3rem)]"
    >
      <HeroBackground engineer={isEngineer} reduced={reduced} />

      <Container className="relative">
        <motion.div
          className="grid items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-16"
          variants={group}
          initial="hidden"
          animate="show"
        >
          <div className={cn(!isEngineer && 'order-2 md:order-1')}>
            <motion.p variants={item} className="eyebrow mb-5">
              {isEngineer ? <DecodeText text={hero.eyebrow} delay={250} /> : hero.eyebrow}
            </motion.p>
            <motion.div variants={item} id="hero-title">
              <HeroTitle title={hero.title} highlight={hero.highlightWord} mode={mode} />
            </motion.div>
            <motion.p variants={item} className="mt-6 max-w-prose text-lg text-text-muted">
              {hero.subtitle}
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                href={hero.primaryCta.href}
                external={hero.primaryCta.external}
                iconRight={<ArrowRight aria-hidden className="h-4 w-4" />}
              >
                {hero.primaryCta.label}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                href={hero.secondaryCta.href}
                external={hero.secondaryCta.external}
                download={hero.secondaryCta.download || undefined}
                iconLeft={hero.secondaryCta.download ? <Download aria-hidden className="h-4 w-4" /> : undefined}
              >
                {hero.secondaryCta.label}
              </Button>
            </motion.div>
          </div>

          <motion.div variants={item} className={cn(!isEngineer && 'order-1 md:order-2')}>
            {isEngineer ? (
              <TerminalCard lines={hero.terminal} title={hero.terminalTitle ?? ''} />
            ) : (
              hero.image && <BlobPortrait image={hero.image} stat={hero.floatingStat} />
            )}
          </motion.div>
        </motion.div>
      </Container>

      <button
        type="button"
        onClick={scrollToAbout}
        aria-label={hero.scrollCueLabel}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full p-2 text-text-muted transition-colors hover:text-primary"
      >
        <motion.span
          className="block"
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown aria-hidden className="h-6 w-6" />
        </motion.span>
      </button>
    </section>
  );
}

function HeroBackground({ engineer, reduced }: { engineer: boolean; reduced: boolean }) {
  if (engineer) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        <BinaryRain
          reduced={reduced}
          className="absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_70%_50%,black_20%,transparent_75%)]"
        />
        <div className="scanlines absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
        <motion.div
          className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--primary), var(--accent) 50%, transparent 70%)' }}
          animate={reduced ? undefined : { x: ['-10%', '15%', '-10%'], y: ['-5%', '10%', '-5%'] }}
          transition={reduced ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="paper-texture absolute inset-0" />
      <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-warm opacity-20 blur-3xl" />
      <div className="absolute -right-16 bottom-10 h-96 w-96 rounded-full bg-accent opacity-20 blur-3xl" />
    </div>
  );
}
