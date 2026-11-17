import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useState } from 'react';
import type { GalleryImage } from '../../data/types';
import { useMode } from '../../hooks/useMode';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { DURATION, EASE } from '../../lib/motion';
import { Reveal, Section, SectionHeading } from '../ui';

const Lightbox = lazy(() => import('./gallery/Lightbox'));

function GalleryTile({ image, onOpen }: { image: GalleryImage; onOpen: () => void }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-theme bg-surface-2 shadow-theme transition-shadow duration-200 hover:shadow-theme-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      style={{
        aspectRatio: `${image.width} / ${image.height}`,
        backgroundImage: image.placeholder ? `url("${image.placeholder}")` : undefined,
        backgroundSize: 'cover',
      }}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-500 ease-theme group-hover:scale-[1.03] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left font-body text-sm text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        {image.caption}
      </span>
    </button>
  );
}

export default function Gallery() {
  const { mode, content } = useMode();
  const reduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const images = content.gallery;
  const visible = mode === 'social' && images.length > 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="gallery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? DURATION.fast : DURATION.reveal, ease: EASE }}
        >
          <Section id="gallery" labelledBy="gallery-heading">
            <SectionHeading id="gallery-heading" {...content.sections.gallery} />
            <ul className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
              {images.map((image, i) => (
                <Reveal key={image.id} as="li" index={i % 3} className="mb-6 break-inside-avoid">
                  <GalleryTile image={image} onOpen={() => setOpenIndex(i)} />
                </Reveal>
              ))}
            </ul>
          </Section>

          <Suspense fallback={null}>
            <AnimatePresence>
              {openIndex !== null && (
                <Lightbox
                  key="lightbox"
                  images={images}
                  index={openIndex}
                  labels={content.labels}
                  onIndexChange={setOpenIndex}
                  onClose={() => setOpenIndex(null)}
                />
              )}
            </AnimatePresence>
          </Suspense>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
