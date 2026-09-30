"use client";

import { useEffect, useRef } from "react";

/**
 * Publishes normalised scroll velocity (-1..1) as a CSS custom property on the
 * given element, so type can stretch and lean into the scroll.
 *
 * The value decays back to 0 when scrolling stops. The rAF loop runs only while
 * the value is non-zero and stops itself once it settles.
 */
export function useScrollVelocity<T extends HTMLElement>(varName = "--vel") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let vel = 0;
    let raf = 0;

    const tick = () => {
      vel *= 0.88; // decay
      if (Math.abs(vel) < 0.001) {
        vel = 0;
        el.style.setProperty(varName, "0");
        raf = 0;
        return;
      }
      el.style.setProperty(varName, vel.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      // ~60px of travel in a frame reads as "full tilt"
      vel = Math.max(-1, Math.min(1, delta / 60));
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [varName]);

  return ref;
}
