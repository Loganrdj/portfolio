import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getAllPosts, getPost } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.draft) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[760px] px-5 py-16">
        <Link
          href="/blog/"
          className="font-mono text-xs text-grey-600 underline underline-offset-4"
        >
          &larr; all posts
        </Link>

        <article className="mt-8">
          <header>
            <p className="font-mono text-xs text-grey-600">
              <time dateTime={post.date}>{post.dateLabel}</time>
              {" · "}
              {post.readingTime}
            </p>
            <h1 className="font-display mt-3 text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] font-bold">
              {post.title}
            </h1>
            {post.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <li
                    key={t}
                    className="border-hairline font-mono rounded-full border px-3 py-1 text-[0.7rem] text-grey-600"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div className="mt-10">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
