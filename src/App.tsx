import { lazy, Suspense } from 'react';
import { ModeProvider } from './context/ModeContext';
import { ModeTransitionProvider } from './context/ModeTransitionProvider';
import { useMode } from './hooks/useMode';
import Seo from './components/seo/Seo';
import SkipLink from './components/layout/SkipLink';
import Navbar from './components/layout/Navbar';
import ScrollProgress from './components/layout/ScrollProgress';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import { BinaryMarquee } from './components/effects/BinaryMarquee';
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

  return (
    <>
      <Seo mode={mode} />
      <SkipLink />
      <ScrollProgress />
      <Navbar />
      {/* Mode swaps happen under the MorphOverlay (or instantly with reduced motion). */}
      <main key={mode} id="main" tabIndex={-1} className="outline-none">
        <Hero />
        {mode === 'engineer' && <BinaryMarquee />}
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
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ModeProvider>
      <ModeTransitionProvider>
        <Site />
      </ModeTransitionProvider>
    </ModeProvider>
  );
}
