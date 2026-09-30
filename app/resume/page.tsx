import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { experiences, education, byRecency } from "@/data/experience";
import { buildTimeline } from "@/lib/timeline";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Logan Moss — marketing automation, full-stack engineering and brand strategy. Ten years of roles, shown on a proportional timeline.",
};

export default function ResumePage() {
  const timeline = buildTimeline(experiences);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="sec">
          <div className="sec-inner">
            <p className="sec-kicker">Resume</p>
            <h1 className="sec-title">
              Ten years,
              <br />
              two disciplines.
            </h1>
            <p className="resume-lede">
              Every role below is drawn to scale — bar length is time served, and
              overlapping bars are roles that genuinely ran at once.
            </p>
          </div>
        </section>

        {/* Proportional timeline: bars sit at their true dates, cards are
            nudged apart only enough to stay readable. */}
        <section className="sec" aria-label="Career timeline">
          <div className="sec-inner">
            <div
              className="tl"
              style={{ ["--tl-h" as string]: `${timeline.height}px` }}
            >
              <div className="tl-axis" aria-hidden="true">
                {timeline.ticks.map((t) => (
                  <div key={t.year} className="tl-tick" style={{ top: `${t.pct}%` }}>
                    <span>{t.year}</span>
                  </div>
                ))}
              </div>

              {timeline.items.map((it) => (
                <div key={`${it.exp.company}-${it.exp.title}`}>
                  {/* the honest bar */}
                  <div
                    className="tl-bar"
                    data-ongoing={it.ongoing || undefined}
                    style={{ top: `${it.barTop}px`, height: `${it.barHeight}px` }}
                    aria-hidden="true"
                  />
                  {/* connector from bar to card */}
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
                    <h2 className="tl-role">{it.exp.title}</h2>
                    <p className="tl-company">{it.exp.company}</p>
                    {it.exp.description && (
                      <p className="tl-desc">{it.exp.description}</p>
                    )}
                    {it.exp.list_skills.length > 0 && (
                      <ul className="tl-skills">
                        {it.exp.list_skills.slice(0, 6).map((s) => (
                          <li key={s} className="chip">
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec sec-alt">
          <div className="sec-inner">
            <p className="sec-kicker">Education</p>
            <h2 className="sec-title">Where it started.</h2>
            <ul className="edu-list">
              {byRecency(education).map((e) => (
                <li key={e.title} className="edu-item">
                  <Image src={e.logo} alt="" width={36} height={36} className="tl-logo" />
                  <div>
                    <h3 className="edu-title">{e.title}</h3>
                    <p className="edu-company">{e.company}</p>
                    <p className="tl-dates">{e.dateLabel}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec">
          <div className="sec-inner">
            <p className="sec-kicker">Stack</p>
            <h2 className="sec-title">What I build with.</h2>
            <dl className="stack-grid">
              {skillGroups.map((g) => (
                <div key={g.key}>
                  <dt className="stack-label">{g.label}</dt>
                  <dd className="stack-skills">
                    {g.skills.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
