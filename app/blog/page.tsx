import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Build notes on automation, multi-agent tooling and creative systems by Logan Moss.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="sec">
          <div className="sec-inner">
            <p className="sec-kicker">Build notes</p>
            <h1 className="sec-title">
              Working
              <br />
              in the open.
            </h1>
            <p className="resume-lede">
              What I&rsquo;m building, what broke, and what I&rsquo;d do
              differently. Mostly automation and the tooling around it.
            </p>

            {tags.length > 0 && (
              <ul className="blog-tags" aria-label="Topics covered">
                {tags.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {posts.length === 0 ? (
          <section className="sec">
            <div className="sec-inner">
              <p className="resume-lede">No posts yet.</p>
            </div>
          </section>
        ) : (
          <section className="sec" aria-label="Posts">
            <div className="sec-inner">
              {/* Lead module: the newest post gets the room. */}
              <Link href={`/blog/${lead.slug}/`} className="bmod bmod-lead">
                <p className="bmod-meta">
                  <span className="bmod-new">Latest</span>
                  <time dateTime={lead.date}>{lead.dateLabel}</time>
                  <span>{lead.readingTime}</span>
                </p>
                <h2 className="bmod-title bmod-title-lead">{lead.title}</h2>
                {lead.summary && <p className="bmod-summary">{lead.summary}</p>}
                <ul className="bmod-tags">
                  {lead.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="bmod-cta">Read &rarr;</span>
              </Link>

              {rest.length > 0 && (
                <ul className="bmod-grid">
                  {rest.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}/`} className="bmod">
                        <p className="bmod-meta">
                          <time dateTime={p.date}>{p.dateLabel}</time>
                          <span>{p.readingTime}</span>
                        </p>
                        <h2 className="bmod-title">{p.title}</h2>
                        {p.summary && (
                          <p className="bmod-summary">{p.summary}</p>
                        )}
                        <ul className="bmod-tags">
                          {p.tags.map((t) => (
                            <li key={t} className="chip">
                              {t}
                            </li>
                          ))}
                        </ul>
                        <span className="bmod-cta">Read &rarr;</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
