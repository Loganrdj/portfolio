"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { metrics } from "@/data/telemetry";

type Phase = "idle" | "running" | "done";

const TRAVEL_MS = 820;
const PULSE_MS = 900;

/**
 * The metrics rail, revealed by a little automation that runs across it.
 *
 * Press the button and a dot leaves the trigger, arcs across the hero and
 * stops at each data point in turn. On arrival a ring pulses, the figure
 * resolves in, and the route it has travelled stays drawn behind it — so by
 * the end the page shows a completed pipeline rather than a static list.
 *
 * Progressive enhancement: the metrics render visible by default, so with no
 * JS (and for crawlers) the content is simply there. The component hides them
 * on mount only once it knows it can animate, and reduced-motion skips
 * straight to the finished state.
 */
export function AutomationRun() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [revealed, setRevealed] = useState<number>(-1); // index of last revealed
  const [armed, setArmed] = useState(false); // JS present & motion allowed

  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const rafRef = useRef(0);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(metrics.length - 1);
      setPhase("done");
      return;
    }
    setArmed(true);
    setRevealed(-1);
  }, []);

  // Stop everything on unmount.
  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      timersRef.current.forEach(clearTimeout);
    },
    []
  );

  const run = useCallback(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const dot = dotRef.current;
    const route = routeRef.current;
    if (!wrap || !svg || !dot || !route || phase === "running") return;

    const box = wrap.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);

    // Target the centre-top of each metric cell, in wrapper coordinates.
    const targets = Array.from(
      wrap.querySelectorAll<HTMLElement>("[data-metric]")
    ).map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left - box.left + r.width / 2, y: r.top - box.top + 14 };
    });
    if (targets.length === 0) return;

    const trigger = wrap.querySelector<HTMLElement>("[data-trigger]");
    const tr = trigger?.getBoundingClientRect();
    const start = tr
      ? { x: tr.left - box.left + tr.width / 2, y: tr.top - box.top + tr.height / 2 }
      : { x: 0, y: targets[0].y };

    setPhase("running");
    setRevealed(-1);
    route.setAttribute("d", `M ${start.x} ${start.y}`);
    dot.setAttribute("cx", String(start.x));
    dot.setAttribute("cy", String(start.y));
    dot.setAttribute("opacity", "1");

    let d = `M ${start.x} ${start.y}`;
    let from = start;

    const legTo = (i: number) => {
      const to = targets[i];
      // Arc upward between points so the run sweeps across the banner
      // instead of sliding along a flat line.
      const cx = (from.x + to.x) / 2;
      const cy = Math.min(from.y, to.y) - Math.max(60, Math.abs(to.x - from.x) * 0.32);
      const t0 = performance.now();

      const step = (now: number) => {
        const raw = Math.min(1, (now - t0) / TRAVEL_MS);
        // easeInOutCubic
        const t =
          raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
        const mt = 1 - t;
        const x = mt * mt * from.x + 2 * mt * t * cx + t * t * to.x;
        const y = mt * mt * from.y + 2 * mt * t * cy + t * t * to.y;
        dot.setAttribute("cx", String(x));
        dot.setAttribute("cy", String(y));
        route.setAttribute("d", `${d} Q ${cx} ${cy} ${x} ${y}`);

        if (raw < 1) {
          rafRef.current = requestAnimationFrame(step);
          return;
        }
        // Arrived: commit this leg to the persistent route and pulse.
        d = `${d} Q ${cx} ${cy} ${to.x} ${to.y}`;
        route.setAttribute("d", d);
        from = to;
        setRevealed(i);

        const timer = window.setTimeout(() => {
          if (i + 1 < targets.length) {
            legTo(i + 1);
          } else {
            dot.setAttribute("opacity", "0");
            setPhase("done");
          }
        }, PULSE_MS);
        timersRef.current.push(timer);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    legTo(0);
  }, [phase]);

  return (
    <div className="arun" ref={wrapRef}>
      <svg
        className="arun-svg"
        ref={svgRef}
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path className="arun-route" ref={routeRef} d="" />
        <circle className="arun-dot" ref={dotRef} r="7" opacity="0" />
      </svg>

      {armed && phase !== "done" && (
        <button
          type="button"
          className="arun-trigger"
          data-trigger
          onClick={run}
          disabled={phase === "running"}
        >
          <span className="arun-trigger-dot" />
          {phase === "running" ? "running…" : "run the automation"}
        </button>
      )}

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
