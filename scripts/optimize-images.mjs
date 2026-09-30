#!/usr/bin/env node
/**
 * Build-time image prep. `output: 'export'` disables next/image's optimizing
 * server, so everything is optimized up front here instead.
 *
 * Two jobs:
 *   1. Responsive AVIF/WebP for the hero portrait (the source is ~4.8MB).
 *   2. Paint swatches cut from Logan's own artwork, used as bloom textures
 *      behind pipeline nodes — real paint rather than CSS gradients.
 *
 * Run: npm run images
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const SRC = "source-assets/loganbackgroundwpaint2.png";
const OUT_HERO = "public/assets/hero";
const OUT_PAINT = "public/assets/paint";
const OUT_BRUSH = "public/assets/brush";

// Regions of the 1920x2160 artwork that are pure paint (no portrait), picked
// so each swatch is dominated by one palette color.
const SWATCHES = [
  { name: "orange", left: 40, top: 20, width: 660, height: 420 },
  { name: "yellow", left: 0, top: 470, width: 430, height: 460 },
  { name: "blue", left: 430, top: 320, width: 230, height: 1180 },
  { name: "green", left: 0, top: 1150, width: 440, height: 380 },
  { name: "red", left: 1200, top: 40, width: 600, height: 1040 },
  { name: "ink", left: 860, top: 1300, width: 1000, height: 560 },
];

async function main() {
  await fs.mkdir(OUT_HERO, { recursive: true });
  await fs.mkdir(OUT_PAINT, { recursive: true });
  await fs.mkdir(OUT_BRUSH, { recursive: true });

  const meta = await sharp(SRC).metadata();
  console.log(`source ${SRC} — ${meta.width}x${meta.height}`);

  // 1. Hero portrait, responsive widths.
  for (const w of [640, 960, 1440]) {
    for (const fmt of ["avif", "webp"]) {
      const file = path.join(OUT_HERO, `portrait-${w}.${fmt}`);
      await sharp(SRC)
        .resize({ width: w })
        [fmt]({ quality: fmt === "avif" ? 55 : 78 })
        .toFile(file);
      const { size } = await fs.stat(file);
      console.log(`  hero ${fmt} ${w}w — ${(size / 1024).toFixed(0)}KB`);
    }
  }

  // 2. Paint swatches, small and soft-edged for use as bloom textures.
  for (const s of SWATCHES) {
    const file = path.join(OUT_PAINT, `${s.name}.webp`);
    await sharp(SRC)
      .extract({ left: s.left, top: s.top, width: s.width, height: s.height })
      .resize({ width: 420, height: 420, fit: "cover" })
      .webp({ quality: 72 })
      .toFile(file);
    const { size } = await fs.stat(file);
    console.log(`  paint ${s.name.padEnd(7)} — ${(size / 1024).toFixed(0)}KB`);
  }

  // 3. Brush stamps for the cursor trail.
  //
  //    The raw crops contain white paper and neighbouring colours, which
  //    turned the trail into a muddy rainbow where marks overlapped. Instead
  //    the crop is used only for its TEXTURE: per-pixel alpha is derived from
  //    how much ink is present (distance from white), and the RGB is replaced
  //    with a flat palette colour. Result: crisp single-colour brush marks
  //    that still carry the real grain of Logan's strokes.
  const R = 256;
  const PALETTE = {
    orange: [248, 67, 1],
    yellow: [239, 249, 3],
    blue: [24, 41, 159],
    green: [1, 174, 70],
    red: [233, 20, 22],
    ink: [19, 19, 19],
  };

  // Soft elliptical feather so marks have no hard edge.
  const feather = new Float32Array(R * R);
  for (let y = 0; y < R; y++) {
    for (let x = 0; x < R; x++) {
      const nx = (x - R / 2) / (R / 2);
      const ny = (y - R / 2) / (R / 2.5);
      const d = Math.hypot(nx, ny);
      // Solid through the body, falling away only near the rim, so the mark
      // keeps a brush edge instead of dissolving into a glow.
      feather[y * R + x] = d >= 1 ? 0 : Math.min(1, Math.pow(1 - d, 0.42) * 1.6);
    }
  }

  await posters();
  await ogBackdrop();

  for (const sw of SWATCHES) {
    const { data } = await sharp(SRC)
      .extract({ left: sw.left, top: sw.top, width: sw.width, height: sw.height })
      .resize({ width: R, height: R, fit: "cover" })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const [pr, pg, pb] = PALETTE[sw.name];
    const out = Buffer.alloc(R * R * 4);
    for (let i = 0, px = 0; px < R * R; px++, i += 3) {
      // "How much ink is here" — white paper reads as 0, saturated or dark
      // paint reads as 1.
      const ink = 1 - Math.min(data[i], data[i + 1], data[i + 2]) / 255;
      // No boost: keeping the raw range preserves the dry-brush streaks.
      // Gamma <1 lifts midtones so the grain stays legible when scaled down.
      const a = Math.pow(ink, 0.82) * feather[px];
      out[px * 4] = pr;
      out[px * 4 + 1] = pg;
      out[px * 4 + 2] = pb;
      out[px * 4 + 3] = Math.round(a * 255);
    }

    const file = path.join(OUT_BRUSH, `${sw.name}.webp`);
    await sharp(out, { raw: { width: R, height: R, channels: 4 } })
      .webp({ quality: 84, alphaQuality: 95 })
      .toFile(file);
    const { size } = await fs.stat(file);
    console.log(`  brush ${sw.name.padEnd(7)} — ${(size / 1024).toFixed(0)}KB`);
  }
}

// 4. Static posters for project thumbnails.
//    Several thumbnails are animated WebP demos over 1MB each. Chrome's
//    lazy-load threshold is generous enough that the whole grid downloaded on
//    load (~13MB). The grid now shows a lightweight still frame, and the
//    animation is fetched only when a card is hovered or focused.
async function posters() {
  const root = "public/assets/projectImages";
  const dirs = await fs.readdir(root, { withFileTypes: true });
  let saved = 0;
  let count = 0;

  for (const d of dirs) {
    if (!d.isDirectory()) continue;
    const dir = path.join(root, d.name);
    const files = await fs.readdir(dir);

    // Thumbnails are named either `thumb.webp` or `<n>.thumb.webp` depending on
    // whether the project has a gallery, so match both.
    for (const file of files.filter((f) => /thumb\.webp$/.test(f))) {
      const src = path.join(dir, file);
      const out = path.join(dir, file.replace(/thumb\.webp$/, "poster.webp"));
      // `animated` defaults to false, so this reads frame one only.
      await sharp(src)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 72 })
        .toFile(out);

      const before = (await fs.stat(src)).size;
      const after = (await fs.stat(out)).size;
      saved += Math.max(0, before - after);
      count++;
      if (before > 400_000) {
        console.log(
          `  poster ${d.name.padEnd(22)} ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024).toFixed(0)}KB`
        );
      }
    }
  }
  console.log(
    `  ${count} posters, ~${(saved / 1024 / 1024).toFixed(1)}MB saved on first paint`
  );
}

// 5. Backdrop for the link-preview card.
//    Satori (which renders the OG card) cannot decode WebP, so the paint is
//    composited into a single PNG here and the card just lays text over it.
async function ogBackdrop() {
  const W = 1200;
  const H = 630;
  const dir = "public/assets/og";
  await fs.mkdir(dir, { recursive: true });

  const wash = async (name, width, opacity) =>
    sharp(path.join(OUT_BRUSH, `${name}.webp`))
      .resize({ width, height: width, fit: "cover" })
      .ensureAlpha()
      .composite([
        {
          input: Buffer.from([255, 255, 255, Math.round(opacity * 255)]),
          raw: { width: 1, height: 1, channels: 4 },
          tile: true,
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer();

  // sharp requires composites to sit fully inside the canvas, so these are
  // sized and placed to land flush against the right edge rather than bleeding
  // past it.
  const [red, orange] = await Promise.all([
    wash("red", 600, 0.6),
    wash("orange", 380, 0.48),
  ]);

  const file = path.join(dir, "backdrop.png");
  await sharp({
    create: { width: W, height: H, channels: 4, background: "#0a0a0b" },
  })
    .composite([
      { input: red, left: W - 600, top: 0 },
      { input: orange, left: W - 380, top: H - 380 },
    ])
    .png({ quality: 90 })
    .toFile(file);

  const { size } = await fs.stat(file);
  console.log(`  og backdrop — ${(size / 1024).toFixed(0)}KB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
