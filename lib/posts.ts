import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  /** ISO date from frontmatter. */
  date: string;
  dateLabel: string;
  summary?: string;
  tags: string[];
  readingTime: string;
  draft: boolean;
};

export type Post = PostMeta & { content: string };

function readingTimeOf(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function parse(file: string): Post {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  if (!data.title) throw new Error(`${file}: frontmatter is missing "title"`);
  if (!data.date) throw new Error(`${file}: frontmatter is missing "date"`);

  const date = new Date(data.date).toISOString();

  return {
    slug,
    title: String(data.title),
    date,
    dateLabel: new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }),
    summary: data.summary ? String(data.summary) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: readingTimeOf(content),
    draft: Boolean(data.draft),
    content,
  };
}

/** Published posts, newest first. Drafts are excluded from the build. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parse)
    .filter((p) => !p.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .map(({ content: _content, ...meta }) => meta);
}

export function getPost(slug: string): Post | undefined {
  for (const ext of [".mdx", ".md"]) {
    const file = `${slug}${ext}`;
    if (fs.existsSync(path.join(POSTS_DIR, file))) return parse(file);
  }
  return undefined;
}
