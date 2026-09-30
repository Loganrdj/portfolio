import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { KineticHero } from "@/components/kinetic/KineticHero";
import { Proof } from "@/components/Proof";
import { skillGroups } from "@/data/skills";
import { codingProjects, creativeProjects, toSlug } from "@/data/projects";
import { getAllPosts } from "@/lib/posts";

function WorkRail({
  title,
  blurb,
  items,
}: {
  title: string;
  blurb: string;
  items: ReturnType<typeof codingProjects.slice>;
}) {
  return (
    <div className="rail">
      <div className="rail-head">
        <h3 className="rail-title">{title}</h3>
        <p className="rail-blurb">{blurb}</p>
      </div>
      <ul className="rail-items">
        {items.map((p) => (
          <li key={p.id} className="rail-card">
            <div className="rail-thumb">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(max-width: 700px) 92vw, 30vw"
                className="object-cover"
              />
            </div>
            <h4 className="rail-card-title">{p.name}</h4>
            <p className="rail-card-desc">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomePage() {
  const posts = getAllPosts().slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <KineticHero />

        {/* Two disciplines, kept visibly separate rather than blended into
            one grid — the engineering and the creative work are different
            kinds of evidence. */}
        <section className="sec" aria-labelledby="work-heading">
          <div className="sec-inner">
            <p className="sec-kicker">Selected work</p>
            <h2 id="work-heading" className="sec-title">
              Two disciplines,
              <br />
              one operator.
            </h2>

            <WorkRail
              title="Software &amp; Automation"
              blurb="Systems that keep running when nobody is watching them."
              items={codingProjects.slice(0, 3)}
            />
            <WorkRail
              title="Creative Direction"
              blurb="Campaigns and shoots for brands people already know."
              items={creativeProjects.slice(0, 3)}
            />

            <Link href="/projects/" className="sec-link">
              all {codingProjects.length + creativeProjects.length} projects &rarr;
            </Link>
          </div>
        </section>

        <section className="sec sec-alt" aria-labelledby="stack-heading">
          <div className="sec-inner">
            <p className="sec-kicker">Stack</p>
            <h2 id="stack-heading" className="sec-title">
              What I build with.
            </h2>
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

        <Proof />

        {posts.length > 0 && (
          <section className="sec" aria-labelledby="notes-heading">
            <div className="sec-inner">
              <p className="sec-kicker">Build notes</p>
              <h2 id="notes-heading" className="sec-title">
                Working in the open.
              </h2>
              <ul className="notes-list">
                {posts.map((p) => (
                  <li key={p.slug} className="note-item">
                    <p className="note-meta">
                      <time dateTime={p.date}>{p.dateLabel}</time> · {p.readingTime}
                    </p>
                    <h3 className="note-title">
                      <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
                    </h3>
                    {p.summary && <p className="note-summary">{p.summary}</p>}
                  </li>
                ))}
              </ul>
              <Link href="/blog/" className="sec-link">
                all posts &rarr;
              </Link>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
