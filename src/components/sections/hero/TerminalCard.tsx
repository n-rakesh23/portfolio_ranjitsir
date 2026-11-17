import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import type { TerminalLine } from '../../../data/types';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const CHAR_MS = 30;
const OUTPUT_PAUSE_MS = 350;
const START_DELAY_MS = 600;

export function TerminalCard({ lines, title }: { lines: TerminalLine[]; title: string }) {
  const reduced = useReducedMotion();
  // One frame per typed character, plus one frame per command to reveal its output.
  const totalFrames = useMemo(() => lines.reduce((n, l) => n + l.command.length + 1, 0), [lines]);
  const [frame, setFrame] = useState(0);
  const current = reduced ? totalFrames : frame;
  const done = current >= totalFrames;

  useEffect(() => {
    if (reduced || frame >= totalFrames) return;
    let delay = frame === 0 ? START_DELAY_MS : CHAR_MS;
    let acc = 0;
    for (const l of lines) {
      if (frame === acc + l.command.length + 1) delay = OUTPUT_PAUSE_MS;
      acc += l.command.length + 1;
    }
    const t = window.setTimeout(() => setFrame((f) => f + 1), delay);
    return () => window.clearTimeout(t);
  }, [frame, reduced, totalFrames, lines]);

  let remaining = current;
  const rendered = lines.map((l) => {
    const typed = Math.max(0, Math.min(l.command.length, remaining));
    const showOutput = remaining > l.command.length;
    const started = remaining > 0;
    remaining -= l.command.length + 1;
    return { ...l, typed: l.command.slice(0, typed), showOutput, started };
  });
  const activeIdx = rendered.findIndex((l) => l.started && !l.showOutput);

  return (
    <div className="overflow-hidden rounded-theme border border-border bg-surface shadow-theme">
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
        <span aria-hidden className="h-3 w-3 rounded-full bg-error" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-caution" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-success" />
        <span className="ml-3 font-mono text-xs text-text-muted">{title}</span>
      </div>
      {/* Full transcript for screen readers; the animated version is hidden from them. */}
      <div className="sr-only">
        {lines.map((l) => `$ ${l.command}. ${l.output.join('. ')}`).join(' ')}
      </div>
      <div aria-hidden className="min-h-[15rem] space-y-3 p-5 font-mono text-sm leading-relaxed">
        {rendered.map((l, i) =>
          l.started ? (
            <div key={l.command}>
              <p>
                <span className="text-success">➜</span> <span className="text-primary">~</span>{' '}
                <span className="text-text">{l.typed}</span>
                {i === activeIdx && <Cursor reduced={reduced} />}
              </p>
              {l.showOutput &&
                l.output.map((o) => (
                  <motion.p
                    key={o}
                    className="pl-4 text-text-muted"
                    initial={{ opacity: reduced ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {o}
                  </motion.p>
                ))}
            </div>
          ) : null,
        )}
        {(done || current === 0) && (
          <p>
            <span className="text-success">➜</span> <span className="text-primary">~</span>{' '}
            <Cursor reduced={reduced} stopped={done} />
          </p>
        )}
      </div>
    </div>
  );
}

function Cursor({ reduced, stopped }: { reduced: boolean; stopped?: boolean }) {
  const still = reduced || stopped;
  return (
    <motion.span
      className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-primary"
      animate={still ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
      transition={still ? undefined : { duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
    />
  );
}
