import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { codingProjects, creativeProjects, type Project } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Software and automation systems alongside creative direction and campaign work by Logan Moss.",
};

function ProjectCard({ p, eager }: { p: Project; eager: boolean }) {
  return (
    <li className="pcard">
      <div className="pcard-thumb">
        <Image
          src={p.image}
          alt={p.alt}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          priority={eager}
          className="object-cover"
        />
      </div>
      <h3 className="pcard-title">{p.name}</h3>
      <p className="pcard-desc">{p.description}</p>
      <div className="pcard-links">
        {p.deployed_url && (
          <a href={p.deployed_url} target="_blank" rel="noopener noreferrer">
            {p.deployed_tag || "Site"} &rarr;
          </a>
        )}
        {p.github_url && (
          <a
            href={p.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="pcard-link-muted"
          >
            {p.github_tag || "Code"} &rarr;
          </a>
        )}
      </div>
    </li>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="sec">
          <div className="sec-inner">
            <p className="sec-kicker">Work</p>
            <h2 className="sec-title">
              Two disciplines,
              <br />
              kept separate on purpose.
            </h2>
            <p className="resume-lede">
              The engineering and the creative work are different kinds of
              evidence, so they are not blended into one grid. {codingProjects.length}{" "}
              software projects, {creativeProjects.length} creative ones.
            </p>
          </div>
        </section>

        {/* Software & automation */}
        <section className="sec" aria-labelledby="eng-heading">
          <div className="sec-inner">
            <div className="disc-head">
              <span className="disc-index">01</span>
              <div>
                <h2 id="eng-heading" className="disc-title">
                  Software &amp; Automation
                </h2>
                <p className="disc-blurb">
                  Full-stack applications, scoring engines and the pipelines
                  behind them.
                </p>
              </div>
              <span className="disc-count">{codingProjects.length}</span>
            </div>
            <ul className="pgrid">
              {codingProjects.map((p, i) => (
                <ProjectCard key={p.id} p={p} eager={i < 3} />
              ))}
            </ul>
          </div>
        </section>

        {/* Creative direction */}
        <section className="sec sec-alt" aria-labelledby="cre-heading">
          <div className="sec-inner">
            <div className="disc-head">
              <span className="disc-index disc-index-warm">02</span>
              <div>
                <h2 id="cre-heading" className="disc-title">
                  Creative Direction
                </h2>
                <p className="disc-blurb">
                  Campaigns, merch lines and shoots for brands with an audience
                  already watching.
                </p>
              </div>
              <span className="disc-count">{creativeProjects.length}</span>
            </div>
            <ul className="pgrid">
              {creativeProjects.map((p) => (
                <ProjectCard key={p.id} p={p} eager={false} />
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
