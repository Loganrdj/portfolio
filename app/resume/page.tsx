import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { experiences, education, byRecency } from "@/data/experience";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Logan Moss — marketing automation, full-stack engineering and brand strategy.",
};

function Entry({ e }: { e: (typeof experiences)[number] }) {
  return (
    <li className="border-hairline grid gap-4 border-t py-8 sm:grid-cols-[auto_1fr]">
      <Image
        src={e.logo}
        alt={`${e.company} logo`}
        width={44}
        height={44}
        className="h-11 w-11 object-contain"
      />
      <div>
        <h3 className="font-display text-xl font-bold">{e.title}</h3>
        <p className="mt-0.5 text-sm font-semibold">{e.company}</p>
        <p className="font-mono mt-1 text-xs text-grey-600">{e.dateLabel}</p>
        {e.description && (
          <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-grey-900">
            {e.description}
          </p>
        )}
        {e.list_skills.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {e.list_skills.map((s) => (
              <li
                key={s}
                className="border-hairline font-mono rounded-full border px-3 py-1 text-[0.7rem] text-grey-600"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1180px] px-5 py-16">
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight font-bold">
          Resume
        </h1>

        <h2 className="font-mono mt-12 text-[0.72rem] tracking-[0.2em] text-grey-600 uppercase">
          Experience
        </h2>
        <ul className="mt-2">
          {byRecency(experiences).map((e) => (
            <Entry key={`${e.company}-${e.title}`} e={e} />
          ))}
        </ul>

        <h2 className="font-mono mt-16 text-[0.72rem] tracking-[0.2em] text-grey-600 uppercase">
          Education
        </h2>
        <ul className="mt-2">
          {byRecency(education).map((e) => (
            <Entry key={`${e.company}-${e.title}`} e={e} />
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
