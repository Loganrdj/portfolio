import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Automation systems, web applications and brand campaigns by Logan Moss.",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1180px] px-5 py-16">
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight font-bold">
          Work
        </h1>
        <p className="mt-4 max-w-[52ch] text-lg text-grey-900">
          {projects.length} projects, newest first — automation platforms,
          full-stack applications and creative direction.
        </p>

        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.id} className="flex flex-col">
              <div className="bg-paper-dim relative aspect-square overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={i < 3}
                  className="object-cover"
                />
              </div>
              <h2 className="font-display mt-4 text-xl font-bold">{p.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-grey-900">
                {p.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                {p.deployed_url && (
                  <a
                    href={p.deployed_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs underline underline-offset-4"
                  >
                    {p.deployed_tag || "Site"} &rarr;
                  </a>
                )}
                {p.github_url && (
                  <a
                    href={p.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-grey-600 underline underline-offset-4"
                  >
                    {p.github_tag || "Code"} &rarr;
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
