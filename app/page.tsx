import Image from "next/image";
import Link from "next/link";
import { KineticHero } from "@/components/kinetic/KineticHero";
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
        <KineticHero />

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
