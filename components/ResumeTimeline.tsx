"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Experience } from "@/data/experience";
import type { Timeline } from "@/lib/timeline";

/**
 * The proportional career timeline, with the detail modal restored.
 *
 * Card descriptions are clamped so the timeline stays scannable, which meant
 * the tail of each one was simply lost. Selecting a role now opens the full
 * text and the complete skill list.
 *
 * The old page also magnified cards as they passed the viewport centre, driven
 * by a requestAnimationFrame loop that ran for the life of the page. The same
 * effect is now a scroll-driven CSS animation — no JS, nothing running when
 * the page is idle — and browsers without support simply get static cards.
 */
export function ResumeTimeline({ timeline }: { timeline: Timeline }) {
  const [selected, setSelected] = useState<Experience | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = (exp: Experience, el: HTMLElement) => {
    lastFocused.current = el;
    setSelected(exp);
  };

  const close = useCallback(() => {
    setSelected(null);
    lastFocused.current?.focus();
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    // Move focus into the dialog so keyboard and screen-reader users land there.
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected, close]);

  return (
    <>
      <div className="tl" style={{ ["--tl-h" as string]: `${timeline.height}px` }}>
        <div className="tl-axis" aria-hidden="true">
          {timeline.ticks.map((t) => (
            <div key={t.year} className="tl-tick" style={{ top: `${t.pct}%` }}>
              <span>{t.year}</span>
            </div>
          ))}
        </div>

        {timeline.items.map((it) => (
          <div key={`${it.exp.company}-${it.exp.title}`}>
            <div
              className="tl-bar"
              data-ongoing={it.ongoing || undefined}
              style={{ top: `${it.barTop}px`, height: `${it.barHeight}px` }}
              aria-hidden="true"
            />
            <div
              className="tl-connector"
              data-side={it.side}
              style={{ top: `${it.cardTop + 26}px` }}
              aria-hidden="true"
            />
            <article
              className="tl-card"
              data-side={it.side}
              style={{ top: `${it.cardTop}px` }}
            >
              <div className="tl-card-head">
                <Image
                  src={it.exp.logo}
                  alt=""
                  width={32}
                  height={32}
                  className="tl-logo"
                />
                <p className="tl-dates">
                  {it.exp.dateLabel}
                  {it.ongoing && <span className="tl-live">live</span>}
                </p>
              </div>

              <h2 className="tl-role">
                {/* The whole card is the target, but the accessible control is
                    this button, so the role name is the link text. */}
                <button
                  type="button"
                  className="tl-open"
                  onClick={(e) => open(it.exp, e.currentTarget)}
                >
                  {it.exp.title}
                  <span className="sr-only"> — open full details</span>
                </button>
              </h2>

              <p className="tl-company">{it.exp.company}</p>
              {it.exp.description && <p className="tl-desc">{it.exp.description}</p>}

              {it.exp.list_skills.length > 0 && (
                <ul className="tl-skills">
                  {it.exp.list_skills.slice(0, 6).map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                  {it.exp.list_skills.length > 6 && (
                    <li className="chip chip-more">
                      +{it.exp.list_skills.length - 6}
                    </li>
                  )}
                </ul>
              )}
            </article>
          </div>
        ))}
      </div>

      {selected && (
        <div
          className="xmodal-overlay"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="xmodal-title"
        >
          <div className="xmodal" onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeRef}
              type="button"
              className="xmodal-close"
              onClick={close}
              aria-label="Close details"
            >
              &times;
            </button>

            <div className="xmodal-head">
              <Image
                src={selected.logo}
                alt=""
                width={44}
                height={44}
                className="tl-logo"
              />
              <p className="tl-dates">{selected.dateLabel}</p>
            </div>

            <h2 id="xmodal-title" className="xmodal-title">
              {selected.title}
            </h2>
            <p className="xmodal-company">{selected.company}</p>

            {selected.description && (
              <p className="xmodal-desc">{selected.description}</p>
            )}

            {selected.list_skills.length > 0 && (
              <>
                <p className="xmodal-label">Skills utilised</p>
                <ul className="xmodal-skills">
                  {selected.list_skills.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
