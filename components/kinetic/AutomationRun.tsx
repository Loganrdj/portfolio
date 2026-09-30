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

const TRAVEL_MS = 820;
const PULSE_MS = 900;
const BOUNCE_MS = 1100;

/**
 * The metrics rail, revealed by an automation that runs across it.
 *
 * Triggered by the hero's "see the work" link: a dot leaves it, arcs over the
 * banner and stops at each data point in turn — ring pulse, figure resolves in
 * — then makes a final hop up to the nav's Work link and bounces it, pointing
 * at where to go next. The route it travelled stays drawn behind it.
 *
 * Progressive enhancement: the metrics render visible by default, so with no
 * JS (and for crawlers) the content is simply there. They are only hidden once
 * the component knows it can animate, and reduced-motion skips to the end.
 *
 * Coordinates are viewport-space against a fixed overlay so the run can reach
 * the sticky header. Each leg re-measures its target at the moment it starts,
 * so scrolling mid-run still lands on the right element.
 */
export const AutomationRun = forwardRef<AutomationRunHandle>(
  function AutomationRun(_props, ref) {
    const [revealed, setRevealed] = useState(-1);
    const [armed, setArmed] = useState(false);
    const runningRef = useRef(false);
    const doneRef = useRef(false);

    const wrapRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const dotRef = useRef<SVGCircleElement>(null);
    const routeRef = useRef<SVGPathElement>(null);
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
      const svg = svgRef.current;
      const dot = dotRef.current;
      const route = routeRef.current;
      if (!wrap || !svg || !dot || !route) return;
      if (runningRef.current || doneRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);

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

      const origin =
        centreOf(document.querySelector("[data-run-trigger]")) ?? {
          x: 0,
          y: vh / 2,
        };

      runningRef.current = true;
      setRevealed(-1);
      dot.setAttribute("cx", String(origin.x));
      dot.setAttribute("cy", String(origin.y));
      dot.setAttribute("opacity", "1");

      let d = `M ${origin.x} ${origin.y}`;
      route.setAttribute("d", d);
      let from = origin;

      const finish = () => {
        runningRef.current = false;
        doneRef.current = true;
        dot.setAttribute("opacity", "0");
      };

      // Legs 0..n-1 visit the metrics; the final leg hops to the nav.
      const legTo = (i: number) => {
        const isNavHop = i >= cells.length;
        const target = isNavHop
          ? centreOf(document.querySelector('[data-nav="work"]'))
          : centreOf(cells[i], 14);

        if (!target) {
          finish();
          return;
        }

        const cx = (from.x + target.x) / 2;
        const cy =
          Math.min(from.y, target.y) -
          Math.max(60, Math.abs(target.x - from.x) * 0.32);
        const t0 = performance.now();

        const step = (now: number) => {
          const raw = Math.min(1, (now - t0) / TRAVEL_MS);
          const t =
            raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
          const mt = 1 - t;
          const x = mt * mt * from.x + 2 * mt * t * cx + t * t * target.x;
          const y = mt * mt * from.y + 2 * mt * t * cy + t * t * target.y;
          dot.setAttribute("cx", String(x));
          dot.setAttribute("cy", String(y));
          route.setAttribute("d", `${d} Q ${cx} ${cy} ${x} ${y}`);

          if (raw < 1) {
            rafRef.current = requestAnimationFrame(step);
            return;
          }

          d = `${d} Q ${cx} ${cy} ${target.x} ${target.y}`;
          route.setAttribute("d", d);
          from = target;

          if (isNavHop) {
            // Final stop: bounce the nav link, then clear the dot.
            const nav = document.querySelector('[data-nav="work"]');
            nav?.classList.add("nav-bounce");
            const t1 = window.setTimeout(() => {
              nav?.classList.remove("nav-bounce");
              finish();
            }, BOUNCE_MS);
            timersRef.current.push(t1);
            return;
          }

          setRevealed(i);
          const t2 = window.setTimeout(() => legTo(i + 1), PULSE_MS);
          timersRef.current.push(t2);
        };

        rafRef.current = requestAnimationFrame(step);
      };

      legTo(0);
    }, []);

    useImperativeHandle(ref, () => ({ run, hasRun: () => doneRef.current }), [
      run,
    ]);

    return (
      <div className="arun" ref={wrapRef}>
        <svg className="arun-svg" ref={svgRef} aria-hidden="true">
          <defs>
            {/* Soft white trail — a blurred line rather than a hard pixel rule. */}
            <filter id="arun-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
          </defs>
          <path className="arun-route" ref={routeRef} d="" />
          <circle className="arun-dot" ref={dotRef} r="7" opacity="0" />
        </svg>

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
