import type { ImageAsset } from './types';

type Tone = 'engineer' | 'social';

const palettes: Record<Tone, { bg: string; fg: string; accent: string }> = {
  engineer: { bg: '#06120A', fg: '#74A882', accent: '#00FF41' },
  social: { bg: '#F3ECE0', fg: '#6E625A', accent: '#C2553A' },
};

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Offline SVG placeholder as a data URI. TODO: replace with real client images. */
export function placeholderSrc(label: string, width: number, height: number, tone: Tone): string {
  const p = palettes[tone];
  const fontSize = Math.max(14, Math.round(Math.min(width, height) / 12));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="${p.bg}"/><path d="M0 ${height} L${width * 0.35} ${height * 0.55} L${width * 0.55} ${height * 0.75} L${width * 0.8} ${height * 0.45} L${width} ${height * 0.7} L${width} ${height} Z" fill="${p.accent}" opacity="0.18"/><circle cx="${width * 0.78}" cy="${height * 0.25}" r="${Math.min(width, height) * 0.08}" fill="${p.accent}" opacity="0.35"/><text x="50%" y="50%" fill="${p.fg}" font-family="sans-serif" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle">${escape(label)}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function placeholder(
  label: string,
  alt: string,
  width: number,
  height: number,
  tone: Tone,
): ImageAsset {
  return { src: placeholderSrc(label, width, height, tone), alt, width, height };
}

/** Tiny blurred stand-in for progressive loading. */
export function blurSrc(tone: Tone): string {
  const p = palettes[tone];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="${p.bg}"/><circle cx="6" cy="2" r="2" fill="${p.accent}" opacity="0.3"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
