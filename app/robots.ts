import type { MetadataRoute } from "next";

// Required under `output: export` — without it Next treats this as a
// dynamic route handler and the static export fails.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.logan-m.com/sitemap.xml",
  };
}
