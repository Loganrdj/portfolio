"use client";

import { useRef } from "react";
import Link from "next/link";
import { PaintTrail } from "./PaintTrail";
import { useScrollVelocity } from "./useScrollVelocity";
import { AutomationRun, type AutomationRunHandle } from "./AutomationRun";

export function KineticHero() {
  const titleRef = useScrollVelocity<HTMLHeadingElement>();
  const runRef = useRef<AutomationRunHandle>(null);

  // First click runs the walkthrough, which ends by pointing at the nav's Work
  // link. Once it has run, the link behaves normally — so it never becomes a
  // dead end for anyone who just wants to get to the work.
  const onSeeWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const api = runRef.current;
    if (!api || api.hasRun()) return;
    e.preventDefault();
    api.run();
  };

  return (
    <section className="khero">
      <PaintTrail className="khero-canvas" />

      <div className="khero-inner">
        <p className="khero-kicker">
          <span>GTM Engineer</span>
          <span className="khero-slash">|</span>
          <span>Content &amp; Brand Strategist</span>
          <span className="khero-slash">|</span>
          <span>Automation &amp; Software Engineer</span>
        </p>

        <h1 className="khero-title" ref={titleRef}>
          <span className="khero-line">LOGAN</span>
          <span className="khero-line khero-line-alt">Moss</span>
        </h1>

        <p className="khero-lede">
          Marketing &amp; machine logic, powered by caffeine, automation, APIs,
          and a whole lot of Airtable tabs too.
          <span className="khero-lede-quip">Side quest enthusiast.</span>
        </p>

        <div className="khero-actions">
          <Link
            href="/projects/"
            className="kbtn kbtn-solid"
            data-run-trigger
            onClick={onSeeWork}
          >
            see the work
          </Link>
          <Link href="/resume/" className="kbtn kbtn-ghost">
            resume
          </Link>
        </div>
      </div>

      <AutomationRun ref={runRef} />
    </section>
  );
}
