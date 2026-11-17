import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ModeProvider } from './context/ModeContext';
import { useMode } from './hooks/useMode';
import { useReducedMotion } from './hooks/useReducedMotion';
import { DURATION, EASE } from './lib/motion';
import Seo from './components/seo/Seo';
import SkipLink from './components/layout/SkipLink';
import Navbar from './components/layout/Navbar';
import ScrollProgress from './components/layout/ScrollProgress';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Stats from './components/sections/Stats';
import Timeline from './components/sections/Timeline';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Intersection from './components/sections/Intersection';
import Testimonials from './components/sections/Testimonials';
import Insights from './components/sections/Insights';
import GetInvolved from './components/sections/GetInvolved';
const Gallery = lazy(() => import('./components/sections/Gallery'));
const loadContact = () => import('./components/sections/Contact');
const Contact = lazy(loadContact);

if (typeof window !== 'undefined') {
  const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
  idle(() => void loadContact());
}

function Site() {
  const { mode } = useMode();
  const reduced = useReducedMotion();

  return (
    <>
      <Seo mode={mode} />
      <SkipLink />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={mode}
          id="main"
          tabIndex={-1}
          className="outline-none"
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? DURATION.fast : 0.3, ease: EASE }}
        >
          <Hero />
          <About />
          <Stats />
          <Timeline />
          <Skills />
          <Projects />
          <Intersection />
          <Testimonials />
          <Insights />
          <Suspense fallback={null}>
            <Gallery />
          </Suspense>
          <GetInvolved />
          {/* Placeholder keeps #contact anchor targets valid while the chunk loads. */}
          <Suspense fallback={<section id="contact" className="min-h-screen" />}>
            <Contact />
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ModeProvider>
      <Site />
    </ModeProvider>
  );
}
