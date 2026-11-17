import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react';
import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import type { GalleryImage, UiLabels } from '../../../data/types';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { DURATION, EASE } from '../../../lib/motion';

export interface LightboxProps {
  images: GalleryImage[];
  index: number;
  labels: Pick<UiLabels, 'close' | 'previous' | 'next'>;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 50;
const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Lightbox({ images, index, labels, onIndexChange, onClose }: LightboxProps) {
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStart = useRef<number | null>(null);
  const image = images[index];
  const count = images.length;

  const go = (delta: number) => onIndexChange((index + delta + count) % count);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'Tab' && dialogRef.current) {
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    pointerStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (pointerStart.current === null) return;
    const dx = e.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
  };

  if (!image) return null;

  const captionId = `lightbox-caption-${image.id}`;
  const controlClass =
    'inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={image.caption}
      aria-describedby={captionId}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? DURATION.fast : DURATION.card, ease: EASE }}
      onKeyDown={onKeyDown}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <p className="font-body text-sm tabular-nums" aria-live="polite">
          {index + 1} / {count}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={labels.close} className={controlClass}>
          <X aria-hidden="true" size={22} />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 touch-pan-y select-none items-center justify-center px-4 md:px-20"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pointerStart.current = null)}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={image.id}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            decoding="async"
            draggable={false}
            className="max-h-full max-w-full rounded-theme object-contain"
            initial={{ opacity: 0, scale: reduced ? 1 : 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? DURATION.fast : DURATION.card, ease: EASE }}
          />
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={labels.previous}
              className={`${controlClass} absolute left-2 top-1/2 -translate-y-1/2 md:left-6`}
            >
              <ChevronLeft aria-hidden="true" size={24} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={labels.next}
              className={`${controlClass} absolute right-2 top-1/2 -translate-y-1/2 md:right-6`}
            >
              <ChevronRight aria-hidden="true" size={24} />
            </button>
          </>
        )}
      </div>

      <div id={captionId} className="mx-auto w-full max-w-prose px-4 py-4 text-center md:py-6">
        <p className="font-display text-lg">{image.caption}</p>
        <p className="mt-1 inline-flex items-center gap-1.5 font-body text-sm text-white/75">
          <MapPin aria-hidden="true" size={14} />
          {image.location} · {image.date}
        </p>
      </div>
    </motion.div>,
    document.body,
  );
}
