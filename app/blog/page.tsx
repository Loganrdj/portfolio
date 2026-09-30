import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on automation, engineering and creative work in progress.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[760px] px-5 py-16">
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight font-bold">
          Blog
        </h1>
        <p className="mt-4 text-lg text-grey-900">
          Build notes from whatever I&rsquo;m shipping.
        </p>

        {posts.length === 0 ? (
          <p className="font-mono mt-12 text-sm text-grey-600">
            No posts yet.
          </p>
        ) : (
          <ul className="mt-12">
            {posts.map((p) => (
              <li key={p.slug} className="border-hairline border-t py-8">
                <p className="font-mono text-xs text-grey-600">
                  <time dateTime={p.date}>{p.dateLabel}</time>
                  {p.readingTime ? ` · ${p.readingTime}` : ""}
                </p>
                <h2 className="font-display mt-2 text-2xl font-bold">
                  <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
                </h2>
                {p.summary && (
                  <p className="mt-2 text-sm leading-relaxed text-grey-900">
                    {p.summary}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
