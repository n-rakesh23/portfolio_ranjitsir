import { shared } from '../../data/shared';

const toBytes = (text: string) =>
  Array.from(text.toUpperCase(), (ch) => ({ ch, bits: ch.charCodeAt(0).toString(2).padStart(8, '0') }));

function Row({ text, reverse }: { text: string; reverse?: boolean }) {
  const bytes = toBytes(text);
  // Content is duplicated so a -50% translate loops seamlessly.
  const track = [...bytes, ...bytes];
  return (
    <div className="flex overflow-hidden pt-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className={reverse ? 'marquee-track marquee-reverse' : 'marquee-track'}>
        {track.map((b, i) => (
          <span key={i} className="group relative inline-flex flex-col items-center px-2">
            <span className="transition-colors duration-200 group-hover:text-primary">{b.bits}</span>
            <span className="pointer-events-none absolute -top-5 font-display text-xs font-semibold text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {b.ch === ' ' ? '␠' : b.ch}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * A band of scrolling 8-bit ASCII. The top row spells the owner's name, the
 * bottom row a motto; hovering a byte shows the character it encodes.
 */
export function BinaryMarquee({ motto = 'BUILD · SCALE · LEAD · ' }: { motto?: string }) {
  const name = `${shared.name} · `;
  return (
    <div className="relative border-y border-border bg-surface py-4">
      <p className="sr-only">
        Binary encoding of “{shared.name}” and “{motto.replace(/ · $/, '')}”.
      </p>
      <div aria-hidden className="space-y-1 font-mono text-sm text-text-muted opacity-80 marquee-pause">
        <Row text={name} />
        <Row text={motto} reverse />
      </div>
    </div>
  );
}
