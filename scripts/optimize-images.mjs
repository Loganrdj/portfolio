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

const SRC = "public/loganbackgroundwpaint2.png";
const OUT_HERO = "public/assets/hero";
const OUT_PAINT = "public/assets/paint";

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
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
