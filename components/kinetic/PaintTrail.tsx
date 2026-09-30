"use client";

import { useEffect, useRef } from "react";

const COLORS = ["orange", "yellow", "blue", "green", "red", "ink"] as const;

/** One stamped mark of paint. */
type Stamp = {
  x: number;
  y: number;
  size: number;
  angle: number;
  born: number;
  life: number;
  img: HTMLImageElement;
};

const MAX_STAMPS = 90;
const STAMP_SPACING = 40; // px of pointer travel between stamps

/**
 * Logan's actual paint, smeared across the canvas by the pointer.
 *
 * Each mark is a real brush stamp cut from his artwork (scripts/optimize-images.mjs),
 * rotated along the direction of travel and scaled by pointer velocity, so fast
 * movement throws long thin marks and slow movement leaves fat ones.
 *
 * When nobody is moving — and on touch devices, where there is no hover — an
 * ambient drift keeps painting on its own, so the page is never dead on arrival.
 *
 * The rAF loop runs only while there is something to draw and stops itself when
 * the canvas is empty and idle; it is never a permanent loop.
 */
export function PaintTrail({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const images = COLORS.map((c) => {
      const img = new Image();
      img.src = `/assets/brush/${c}.webp`;
      return img;
    });

    let dpr = 1;
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2); // cap for fill-rate
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const stamps: Stamp[] = [];
    // A gesture keeps one colour for a run of marks, so a swipe reads as a
    // single stroke rather than a different hue every stamp.
    let colorIdx = (Math.random() * images.length) | 0;
    let sinceSwitch = 0;
    let last: { x: number; y: number } | null = null;
    let carry = 0;
    let raf = 0;
    let lastPointerAt = 0;
    let onScreen = true;
    let tabVisible = !document.hidden;
    /** Ambient drift should run whenever it would actually be seen. */
    const ambientWanted = () => onScreen && tabVisible;

    // Ambient path, used when the pointer is idle.
    let t = Math.random() * 1000;
    const ambient = () => {
      t += 0.012;
      return {
        x: w * (0.5 + 0.34 * Math.sin(t * 0.9) * Math.cos(t * 0.37)),
        y: h * (0.5 + 0.3 * Math.sin(t * 0.63 + 1.1)),
      };
    };

    const emit = (x: number, y: number, vx: number, vy: number) => {
      const speed = Math.hypot(vx, vy);
      if (++sinceSwitch > 5 + Math.random() * 7) {
        sinceSwitch = 0;
        colorIdx = (colorIdx + 1 + ((Math.random() * (images.length - 1)) | 0)) % images.length;
      }
      const img = images[colorIdx];
      if (!img.complete || img.naturalWidth === 0) return;
      stamps.push({
        x,
        y,
        // faster travel -> bigger, more energetic marks
        size: 96 + Math.min(speed * 1.8, 170) + Math.random() * 52,
        angle: Math.atan2(vy, vx) + (Math.random() - 0.5) * 0.7,
        born: performance.now(),
        life: 1100 + Math.random() * 1400,
        img,
      });
      if (stamps.length > MAX_STAMPS) stamps.splice(0, stamps.length - MAX_STAMPS);
    };

    /** Walks the segment since the last point, stamping at a fixed spacing. */
    const track = (x: number, y: number) => {
      if (!last) {
        last = { x, y };
        return;
      }
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 0.5) return;
      const ux = dx / dist;
      const uy = dy / dist;
      let travelled = -carry;
      while (travelled + STAMP_SPACING <= dist) {
        travelled += STAMP_SPACING;
        emit(last.x + ux * travelled, last.y + uy * travelled, dx, dy);
      }
      carry = dist - travelled;
      last = { x, y };
    };

    const frame = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, w, h);

      for (let i = stamps.length - 1; i >= 0; i--) {
        const s = stamps[i];
        const age = (now - s.born) / s.life;
        if (age >= 1) {
          stamps.splice(i, 1);
          continue;
        }
        // quick bloom in, slow fade out
        const alpha = age < 0.12 ? age / 0.12 : 1 - (age - 0.12) / 0.88;
        const grow = 1 + age * 0.22;
        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha) * 0.78;
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        const d = s.size * grow;
        ctx.drawImage(s.img, (-d * 1.55) / 2, (-d * 0.62) / 2, d * 1.55, d * 0.62);
        ctx.restore();
      }

      // Nobody has moved recently: keep painting on a drifting path.
      if (now - lastPointerAt > 1400) {
        const p = ambient();
        track(p.x, p.y);
      }

      if (stamps.length > 0 || ambientWanted()) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
      }
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    // Only animate what is on screen.
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen) kick();
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      tabVisible = !document.hidden;
      if (tabVisible) kick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      lastPointerAt = performance.now();
      track(e.clientX - rect.left, e.clientY - rect.top);
      kick();
    };

    const onResize = () => {
      resize();
      last = null;
      kick();
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);
    kick();

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
