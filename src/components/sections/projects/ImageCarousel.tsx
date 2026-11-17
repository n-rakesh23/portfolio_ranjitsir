import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { ImageAsset } from '../../../data/types';
import { useMode } from '../../../hooks/useMode';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { cn } from '../../../lib/cn';
import { DURATION, EASE } from '../../../lib/motion';

interface ImageCarouselProps {
  images: ImageAsset[];
  previousLabel: string;
  nextLabel: string;
}

const SWIPE_THRESHOLD = 60;

export function ImageCarousel({ images, previousLabel, nextLabel }: ImageCarouselProps) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const reduced = useReducedMotion();
  const { content } = useMode();
  const count = images.length;

  if (count === 0) return null;

  const go = (step: number) => setState(([i]) => [(i + step + count) % count, step]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  };

  const image = images[index];
  const offset = reduced ? 0 : 40;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={content.labels.photos}
      className="relative overflow-hidden rounded-theme border border-border bg-surface-2"
    >
      <div className="relative aspect-[16/10] w-full">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={image.src + index}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing"
            initial={{ opacity: 0, x: direction * offset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * offset }}
            transition={{ duration: reduced ? DURATION.fast : 0.35, ease: EASE }}
            drag={count > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={onDragEnd}
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={previousLabel}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-surface p-2 text-text shadow-theme hover:text-primary"
          >
            <ChevronLeft aria-hidden size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={nextLabel}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-surface p-2 text-text shadow-theme hover:text-primary"
          >
            <ChevronRight aria-hidden size={18} />
          </button>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
            {images.map((img, i) => (
              <button
                key={img.src + i}
                type="button"
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={`${i + 1} of ${count}`}
                aria-current={i === index}
                className={cn(
                  'h-2 rounded-full transition-all duration-200',
                  i === index ? 'w-6 bg-primary' : 'w-2 bg-surface',
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
