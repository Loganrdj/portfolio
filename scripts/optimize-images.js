#!/usr/bin/env node
/**
 * One-time/local asset prep: generates web-sized derivatives of the full-res
 * source photos under public/assets/projectImages, plus a base64 blur-placeholder
 * manifest consumed by LazyThumb. Requires `cwebp` (Homebrew: `brew install webp`).
 *
 * Run with: node scripts/optimize-images.js
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "public", "assets", "projectImages");
const MANIFEST_PATH = path.join(
  ROOT,
  "src",
  "components",
  "Projects",
  "placeholders.json"
);

function findSourceJpegs(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...findSourceJpegs(full));
    } else if (/\.jpe?g$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function toPublicPath(absPath) {
  return "/" + path.relative(path.join(ROOT, "public"), absPath).split(path.sep).join("/");
}

function cwebp(args) {
  execFileSync("cwebp", args, { stdio: ["ignore", "ignore", "inherit"] });
}

function main() {
  const sources = findSourceJpegs(IMAGES_DIR);
  console.log(`Found ${sources.length} source JPEGs.`);

  const placeholders = {};

  for (const src of sources) {
    const base = src.replace(/\.jpe?g$/i, "");
    const thumbPath = `${base}.thumb.webp`;
    const fullPath = `${base}.full.webp`;
    const tinyPath = `${base}.tiny.webp`;

    console.log(`Processing ${path.relative(ROOT, src)}`);

    // Grid thumbnail
    cwebp(["-quiet", "-q", "75", "-resize", "480", "0", src, "-o", thumbPath]);
    // Lightbox / modal gallery
    cwebp(["-quiet", "-q", "82", "-resize", "1600", "0", src, "-o", fullPath]);
    // Tiny blur-up placeholder
    cwebp(["-quiet", "-q", "40", "-resize", "24", "0", src, "-o", tinyPath]);

    const dataUri = `data:image/webp;base64,${fs.readFileSync(tinyPath).toString("base64")}`;
    placeholders[toPublicPath(thumbPath)] = dataUri;
    placeholders[toPublicPath(fullPath)] = dataUri;

    fs.unlinkSync(tinyPath);
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(placeholders, null, 2));
  console.log(`Wrote ${Object.keys(placeholders).length} placeholder entries to ${path.relative(ROOT, MANIFEST_PATH)}`);
}

main();
