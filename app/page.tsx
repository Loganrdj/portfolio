import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";

// Phase 1 substrate: real content, real routes, real HTML in the export.
// The pipeline spine, paint blooms and cold-start sequence land in Phase 2.
export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 pt-16 pb-20 md:grid-cols-[1.1fr_0.9fr] md:pt-24">
          <div>
            <p className="font-mono text-[0.72rem] tracking-[0.2em] text-grey-600 uppercase">
              Automation &times; Creative
            </p>
            <h1 className="font-display mt-5 text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] font-bold tracking-[-0.02em]">
              I build the
              <br />
              machine that
              <br />
              ships the work.
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-grey-900">
              Lead-scoring pipelines, marketing ops and brand campaigns — the
              engineering behind creative work that reached 10,000+ concurrent
              viewers and partners including Taco Bell and AT&amp;T.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/projects/"
                className="bg-ink text-paper font-mono text-sm px-6 py-3 transition-transform duration-200 hover:-translate-y-0.5"
              >
                see the work
              </Link>
              <Link
                href="/resume/"
                className="border-ink font-mono text-sm border px-6 py-3 transition-transform duration-200 hover:-translate-y-0.5"
              >
                resume
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/loganbackgroundwpaint2.png"
              alt="Logan Moss surrounded by bold paint strokes"
              width={960}
              height={1080}
              priority
              className="h-auto w-full"
            />
          </div>
        </section>

        <section className="border-t border-hairline">
          <div className="mx-auto max-w-[1180px] px-5 py-16">
            <h2 className="font-mono text-[0.72rem] tracking-[0.2em] text-grey-600 uppercase">
              Selected work
            </h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <li key={p.id}>
                  <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                  <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-grey-900">
                    {p.description}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/projects/"
              className="font-mono mt-10 inline-block text-sm underline underline-offset-4"
            >
              all projects &rarr;
            </Link>
          </div>
        </section>

        <section className="border-t border-hairline">
          <div className="mx-auto max-w-[1180px] px-5 py-16">
            <h2 className="font-mono text-[0.72rem] tracking-[0.2em] text-grey-600 uppercase">
              Stack
            </h2>
            <dl className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((g) => (
                <div key={g.key}>
                  <dt className="font-display text-xl font-bold">{g.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-grey-600">
                    {g.skills.join(" · ")}
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
