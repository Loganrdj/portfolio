"use client";

import Link from "next/link";
import { PaintTrail } from "./PaintTrail";
import { useScrollVelocity } from "./useScrollVelocity";
import { AutomationRun } from "./AutomationRun";

export function KineticHero() {
  const titleRef = useScrollVelocity<HTMLHeadingElement>();

  return (
    <section className="khero">
      <PaintTrail className="khero-canvas" />

      <div className="khero-inner">
        <p className="khero-kicker">
          <span>automation</span>
          <span className="khero-slash">/</span>
          <span>creative</span>
        </p>

        <h1 className="khero-title" ref={titleRef}>
          <span className="khero-line">LOGAN</span>
          <span className="khero-line khero-line-alt">MOSS</span>
        </h1>

        <p className="khero-lede">
          I build the pipelines behind the work — lead scoring, marketing
          systems and brand campaigns for partners including Taco&nbsp;Bell and
          AT&amp;T.
        </p>

        <div className="khero-actions">
          <Link href="/projects/" className="kbtn kbtn-solid">
            see the work
          </Link>
          <Link href="/resume/" className="kbtn kbtn-ghost">
            resume
          </Link>
        </div>

      </div>

      <AutomationRun />
    </section>
  );
}
