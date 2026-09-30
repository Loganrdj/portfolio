import type { MetadataRoute } from "next";

// Required under `output: export` — without it Next treats this as a
// dynamic route handler and the static export fails.
export const dynamic = "force-static";
import { getAllPosts } from "@/lib/posts";

const SITE = "https://www.logan-m.com";

/** Emitted as a static sitemap.xml at build time by `output: export`. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/resume", "/blog"].map((path) => ({
    url: `${SITE}${path}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const posts = getAllPosts().map((p) => ({
    url: `${SITE}/blog/${p.slug}/`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...posts];
}
