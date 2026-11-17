import { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';

const CELL = 18; // px between columns / rows
const FRAME_MS = 50; // ~20 fps keeps the "digital" cadence and saves battery
const CURSOR_RADIUS = 140;

interface Drop {
  y: number; // row index of the head
  speed: number; // rows per frame
  len: number; // trail length in rows
}

const bit = () => (Math.random() < 0.5 ? '0' : '1');

function readVar(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/**
 * Falling columns of 0s and 1s drawn on a canvas. Characters near the pointer
 * light up in the accent colour. Pauses when off-screen or the tab is hidden;
 * renders a single static frame when the user prefers reduced motion.
 */
export function BinaryRain({ reduced, className }: { reduced: boolean; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const primary = readVar('--primary', '#00ff41');
    const accent = readVar('--accent', '#9dffb5');
    const font = `500 13px ${readVar('--font-mono', 'monospace')}`;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let drops: Drop[] = [];
    let grid: string[][] = [];
    const pointer = { x: -9999, y: -9999 };

    const newDrop = (startAbove = true): Drop => ({
      y: startAbove ? -Math.random() * rows : Math.random() * rows,
      speed: 0.25 + Math.random() * 0.55,
      len: 6 + Math.floor(Math.random() * 18),
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      drops = Array.from({ length: cols }, () => newDrop(false));
      grid = Array.from({ length: cols }, () => Array.from({ length: rows + 1 }, bit));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let c = 0; c < cols; c++) {
        const d = drops[c];
        const head = Math.floor(d.y);
        const x = c * CELL + CELL / 2;

        for (let i = 0; i < d.len; i++) {
          const r = head - i;
          if (r < 0 || r > rows) continue;
          const y = r * CELL + CELL / 2;
          const fade = 1 - i / d.len;

          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / CURSOR_RADIUS);

          // Occasionally flip a bit in the trail so the stream feels alive.
          if (Math.random() < 0.02) grid[c][r] = bit();

          if (i === 0) {
            ctx.fillStyle = '#eaffee';
            ctx.globalAlpha = 0.9;
            ctx.shadowColor = primary;
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = near > 0.15 ? accent : primary;
            ctx.globalAlpha = Math.min(1, fade * 0.55 + near * 0.8);
            ctx.shadowBlur = near > 0.3 ? 10 * near : 0;
            ctx.shadowColor = accent;
          }
          ctx.fillText(grid[c][r], x, y);
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const step = () => {
      for (let c = 0; c < cols; c++) {
        const d = drops[c];
        d.y += d.speed;
        if (d.y - d.len > rows) drops[c] = newDrop();
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = primary;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r <= rows; r++) {
          if (Math.random() > 0.35) continue;
          ctx.globalAlpha = 0.08 + Math.random() * 0.25;
          ctx.fillText(grid[c][r], c * CELL + CELL / 2, r * CELL + CELL / 2);
        }
      }
      ctx.globalAlpha = 1;
    };

    resize();

    if (reduced) {
      drawStatic();
      const ro = new ResizeObserver(() => {
        resize();
        drawStatic();
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = 0;
    let visible = true;

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < FRAME_MS) return;
      last = t;
      step();
      draw();
    };
    const start = () => {
      if (!raf && visible && document.visibilityState === 'visible') raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.visibilityState === 'visible' ? start() : stop());
    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden className={cn('pointer-events-none h-full w-full', className)} />;
}
