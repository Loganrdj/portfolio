import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { getAllPosts, getPost } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export const alt = "Build notes by Logan Moss";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

/**
 * Per-post link-preview card. Without this a shared post fell back to no image
 * at all, because defining openGraph in the page's generateMetadata drops the
 * root card. Showing the post title makes a shared link say what it is.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  const [playfair, backdrop] = await Promise.all([
    fs.readFile(
      path.join(process.cwd(), "public/assets/fonts/PlayfairDisplay-ExtraBold.ttf")
    ),
    fs.readFile(path.join(process.cwd(), "public/assets/og/backdrop.png")),
  ]);
  const backdropSrc = `data:image/png;base64,${backdrop.toString("base64")}`;

  const title = post?.title ?? "Build notes";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <img
          src={backdropSrc}
          width={1200}
          height={630}
          style={{ position: "absolute", left: 0, top: 0 }}
        />

        <div
          style={{
            display: "flex",
            fontFamily: "Playfair",
            fontSize: 21,
            letterSpacing: 4,
            color: "#9b9ba3",
          }}
        >
          BUILD NOTES · LOGAN MOSS
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Playfair",
            fontSize: title.length > 60 ? 62 : 76,
            lineHeight: 1.08,
            color: "#faf9f6",
            letterSpacing: -1.5,
            maxWidth: 880,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Playfair",
            fontSize: 23,
            color: "#c9c9d1",
          }}
        >
          {post?.dateLabel ?? ""}
          {post?.readingTime ? `  ·  ${post.readingTime}` : ""}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Playfair", data: playfair, style: "normal", weight: 800 }],
    }
  );
}
