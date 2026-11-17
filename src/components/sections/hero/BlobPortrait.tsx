import { motion } from 'framer-motion';
import { useId } from 'react';
import type { ImageAsset } from '../../../data/types';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const BLOB =
  'M318 52c45 34 72 96 68 158-4 63-38 125-92 168-54 42-128 64-190 40C42 394 0 324 4 252 8 180 46 106 104 62 162 18 273 18 318 52Z';

interface Props {
  image: ImageAsset;
  stat?: { value: string; label: string };
}

export function BlobPortrait({ image, stat }: Props) {
  const reduced = useReducedMotion();
  const clipId = useId();

  return (
    <div className="relative mx-auto w-full max-w-[26rem]">
      <svg aria-hidden viewBox="0 0 400 440" className="absolute inset-0 h-full w-full translate-x-4 translate-y-4 text-accent opacity-25">
        <path d={BLOB} fill="currentColor" />
      </svg>
      <svg role="img" aria-label={image.alt} viewBox="0 0 400 440" className="relative h-auto w-full">
        <defs>
          <clipPath id={clipId}>
            <path d={BLOB} />
          </clipPath>
        </defs>
        <image
          href={image.src}
          width="400"
          height="440"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />
      </svg>
      {stat && (
        <motion.div
          className="absolute -left-2 bottom-6 rounded-theme border border-border bg-surface px-5 py-3 shadow-theme sm:-left-8"
          animate={reduced ? undefined : { y: [0, -8, 0] }}
          transition={reduced ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className="font-display text-3xl font-semibold text-primary-strong">{stat.value}</p>
          <p className="text-sm text-text-muted">{stat.label}</p>
        </motion.div>
      )}
    </div>
  );
}
