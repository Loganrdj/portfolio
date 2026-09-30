"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { metrics } from "@/data/telemetry";

export type AutomationRunHandle = {
  run: () => void;
  hasRun: () => boolean;
};

const TRAVEL_MS = 900;
const PULSE_MS = 900;
const BOUNCE_MS = 1100;
/** How long a point stays in the tail before it has fully faded. */
const TAIL_MS = 780;

type Pt = { x: number; y: number; t: number };

/**
 * The metrics rail, revealed by an automation that runs across it.
 *
 * Triggered by the hero's "see the work" link: a dot leaves it, arcs over the
 * banner and stops at each data point in turn — ring pulse, figure resolves in
 * — then hops up to the nav's Work link and bounces it.
 *
 * The trail is a comet tail, not a route: points age out after TAIL_MS, and the
 * line tapers in both width and alpha toward the back, so nothing is left
 * painted on the screen once the run finishes. Canvas rather than SVG because a
 * single SVG stroke cannot vary width or opacity along its length.
 *
 * Progressive enhancement: metrics render visible by default, so with no JS
 * (and for crawlers) the content is simply there. Reduced motion skips to the
 * finished state and never animates.
 */
export const AutomationRun = forwardRef<AutomationRunHandle>(
  function AutomationRun(_props, ref) {
    const [revealed, setRevealed] = useState(-1);
    const [armed, setArmed] = useState(false);
    const runningRef = useRef(false);
    const doneRef = useRef(false);

    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef(0);
    const timersRef = useRef<number[]>([]);

    useEffect(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setRevealed(metrics.length - 1);
        doneRef.current = true;
        return;
      }
      setArmed(true);
      setRevealed(-1);
    }, []);

    useEffect(
      () => () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        timersRef.current.forEach(clearTimeout);
      },
      []
    );

    const run = useCallback(() => {
      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas) return;
      if (runningRef.current || doneRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let dpr = 1;
      let vw = 0;
      let vh = 0;
      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        vw = window.innerWidth;
        vh = window.innerHeight;
        canvas.width = Math.round(vw * dpr);
        canvas.height = Math.round(vh * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      window.addEventListener("resize", resize);

      const centreOf = (el: Element | null, topBias = 0) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2,
          y: topBias ? r.top + topBias : r.top + r.height / 2,
        };
      };

      const cells = Array.from(
        wrap.querySelectorAll<HTMLElement>("[data-metric]")
      );
      if (cells.length === 0) return;

      runningRef.current = true;
      setRevealed(-1);

      const tail: Pt[] = [];
      let from = centreOf(document.querySelector("[data-run-trigger]")) ?? {
        x: 0,
        y: vh / 2,
      };
      let leg = 0;
      let legStart = performance.now();
      let ctrl = { x: from.x, y: from.y };
      let target = from;
      let phase: "travel" | "pulse" | "done" = "travel";
      let pulseUntil = 0;

      /** Measure the next stop as the leg begins, so mid-run scroll still lands. */
      const beginLeg = (i: number, now: number) => {
        const isNavHop = i >= cells.length;
        const t = isNavHop
          ? centreOf(document.querySelector('[data-nav="work"]'))
          : centreOf(cells[i], 14);
        if (!t) {
          phase = "done";
          return;
        }
        target = t;
        ctrl = {
          x: (from.x + t.x) / 2,
          y:
            Math.min(from.y, t.y) -
            Math.max(60, Math.abs(t.x - from.x) * 0.32),
        };
        legStart = now;
        phase = "travel";
      };

      beginLeg(0, performance.now());

      const finish = () => {
        runningRef.current = false;
        doneRef.current = true;
        window.removeEventListener("resize", resize);
      };

      const drawTail = (now: number) => {
        ctx.clearRect(0, 0, vw, vh);

        // Age points out; once empty the trail has left no residue behind.
        while (tail.length && now - tail[0].t > TAIL_MS) tail.shift();
        if (tail.length < 2) return;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#ffffff";
        ctx.shadowColor = "rgba(255,255,255,0.85)";

        // Segments are drawn midpoint-to-midpoint, curving through each sample
        // point, which is what makes the line read as one continuous stroke
        // rather than a chain of hops. Width and alpha taper toward the back —
        // the thing a single SVG stroke cannot do.
        const mid = (a: Pt, b: Pt) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

        for (let i = 1; i < tail.length - 1; i++) {
          const prev = tail[i - 1];
          const cur = tail[i];
          const next = tail[i + 1];
          const age = (now - cur.t) / TAIL_MS; // 0 = head, 1 = gone
          const life = Math.max(0, 1 - age);
          // Ease the falloff so the tail thins away instead of stepping out.
          const fade = life * life * (3 - 2 * life);

          ctx.globalAlpha = fade * 0.92;
          ctx.lineWidth = 0.5 + fade * 3.6;
          ctx.shadowBlur = 7 * fade;

          const a = mid(prev, cur);
          const b = mid(cur, next);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(cur.x, cur.y, b.x, b.y);
          ctx.stroke();
        }

        // The head itself.
        const head = tail[tail.length - 1];
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 14;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(head.x, head.y, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      };

      const frame = (now: number) => {
        if (phase === "travel") {
          const raw = Math.min(1, (now - legStart) / TRAVEL_MS);
          const t =
            raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
          const mt = 1 - t;
          const x = mt * mt * from.x + 2 * mt * t * ctrl.x + t * t * target.x;
          const y = mt * mt * from.y + 2 * mt * t * ctrl.y + t * t * target.y;
          tail.push({ x, y, t: now });

          if (raw >= 1) {
            from = target;
            const isNavHop = leg >= cells.length;
            if (isNavHop) {
              const nav = document.querySelector('[data-nav="work"]');
              nav?.classList.add("nav-bounce");
              const t1 = window.setTimeout(() => {
                nav?.classList.remove("nav-bounce");
              }, BOUNCE_MS);
              timersRef.current.push(t1);
              phase = "done";
            } else {
              setRevealed(leg);
              phase = "pulse";
              pulseUntil = now + PULSE_MS;
            }
          }
        } else if (phase === "pulse") {
          // Hold position while the ring fires; the tail keeps decaying.
          tail.push({ x: target.x, y: target.y, t: now });
          if (now >= pulseUntil) {
            leg += 1;
            beginLeg(leg, now);
          }
        }

        drawTail(now);

        const tailAlive = tail.length > 0;
        if (phase !== "done" || tailAlive) {
          rafRef.current = requestAnimationFrame(frame);
        } else {
          ctx.clearRect(0, 0, vw, vh);
          rafRef.current = 0;
          finish();
        }
      };

      rafRef.current = requestAnimationFrame(frame);
    }, []);

    useImperativeHandle(ref, () => ({ run, hasRun: () => doneRef.current }), [
      run,
    ]);

    return (
      <div className="arun" ref={wrapRef}>
        <canvas className="arun-canvas" ref={canvasRef} aria-hidden="true" />

        <dl className="arun-metrics" data-armed={armed || undefined}>
          {metrics.map((m, i) => (
            <div key={m.label} data-metric data-revealed={i <= revealed || undefined}>
              <span className="arun-ring" aria-hidden="true" />
              <dt>{m.value}</dt>
              <dd>
                {m.label}
                <span className="arun-source">{m.source}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }
);
