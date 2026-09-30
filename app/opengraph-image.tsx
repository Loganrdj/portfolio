import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const alt =
  "Logan Moss — GTM Engineer, Content & Brand Strategist, Automation & Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Required under `output: export`, same as robots/sitemap — otherwise Next
// treats this as a dynamic route and the static export fails.
export const dynamic = "force-static";

/**
 * The link-preview card, generated at build time so it can never drift from
 * the site the way a hand-made screenshot does. Uses the same brand face and
 * the same paint cut from Logan's artwork as the page itself.
 */
export default async function Image() {
  const [playfair, backdrop] = await Promise.all([
    // A static instance of the same Playfair the site uses — Satori cannot
    // parse variable fonts, so scripts/make-static-font.mjs pins the weight.
    fs.readFile(
      path.join(process.cwd(), "public/assets/fonts/PlayfairDisplay-ExtraBold.ttf")
    ),
    fs.readFile(path.join(process.cwd(), "public/assets/og/backdrop.png")),
  ]);

  const backdropSrc = `data:image/png;base64,${backdrop.toString("base64")}`;

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
        {/* paint, pre-composited by scripts/optimize-images.mjs */}
        <img
          src={backdropSrc}
          width={1200}
          height={630}
          style={{ position: "absolute", left: 0, top: 0 }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Mono",
              fontSize: 21,
              letterSpacing: 3,
              color: "#9b9ba3",
            }}
          >
            GTM ENGINEER · CONTENT &amp; BRAND STRATEGIST · AUTOMATION ENGINEER
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 34,
              fontFamily: "Playfair",
              fontSize: 132,
              lineHeight: 0.88,
              color: "#faf9f6",
              letterSpacing: -4,
            }}
          >
            <div style={{ display: "flex" }}>LOGAN</div>
            <div style={{ display: "flex" }}>MOSS</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Mono",
            fontSize: 25,
            lineHeight: 1.45,
            color: "#c9c9d1",
            maxWidth: 720,
          }}
        >
          Marketing &amp; machine logic — automation, APIs, and a whole lot of
          Airtable tabs.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Playfair", data: playfair, style: "normal", weight: 800 },
        { name: "Mono", data: playfair, style: "normal", weight: 800 },
      ],
    }
  );
}
