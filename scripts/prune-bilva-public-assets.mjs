/**
 * Removes files under public/images/bilva that are not referenced in source.
 * Run from repo root: node scripts/prune-bilva-public-assets.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetDir = path.join(root, "public", "images", "bilva");

const KEEP = new Set([
  "artisan-legacy-master.webp",
  "assurance_icon_1_clean.png",
  "assurance_icon_2_clean.png",
  "assurance_icon_3_clean.png",
  "banner-exact-gemstones-2x.jpg",
  "banner-exact-gifting-2x.jpg",
  "banner-exact-gold-2x.jpg",
  "banner-exact-rudraksh-2x.jpg",
  "bestseller-clean-gold-coin.webp",
  "bestseller-gold-bar-master.webp",
  "bestseller-gold-bar.webp",
  "bestseller-gold-coin-clean.webp",
  "bestseller-gold-coin-master.webp",
  "bestseller-gold-denominations-master.webp",
  "bestseller-rudraksh-bracelet-master.webp",
  "bestseller-silver-coin-clean.webp",
  "bestseller-silver-coin-master.webp",
  "coins-small-denominations-master.png",
  "collection-corporate-gifting-raw.webp",
  "collection-gemstones-raw.webp",
  "collection-gold-coins-and-bars-raw.webp",
  "collection-premium-gifting-raw.webp",
  "collection-rudraksh-raw.webp",
  "collection-silver-coins-and-bars-raw.webp",
  "collection-silver-cta-photo.png",
  "confidence-details.png",
  "emblem.png",
  "gifting-hero-alt-1.png",
  "gifting-hero-alt-2.png",
  "gifting-hero-alt-3.png",
  "gifting-hero.png",
  "gold-coin-24k-master.png",
  "hero-slide-1-master-2x.webp",
  "how-it-works-coin.png",
  "legacy-story-workshop.png",
  "prefooter-lakshmi-ganesha-coins-raw.webp",
  "signature-celebration-gift-set-2x.webp",
  "signature-first-gold-coin-2x.webp",
  "signature-first-gold-coin.webp",
  "signature-heritage-gold-tree-2x.webp",
  "signature-silver-peacock-coin-2x.webp",
  "silver-coin-999-master.png",
  "small-denominations-backdrop-master.webp",
  "small-denominations-master.webp",
  "sri-bilva-emblem-master.jpg",
  "sri-bilva-emblem.png",
  "sri-bilva-master-logo-transparent.png",
]);

if (!fs.existsSync(assetDir)) {
  console.error("Missing", assetDir);
  process.exit(1);
}

let removed = 0;
let kept = 0;
for (const name of fs.readdirSync(assetDir)) {
  const full = path.join(assetDir, name);
  if (!fs.statSync(full).isFile()) continue;
  if (KEEP.has(name)) {
    kept++;
    continue;
  }
  fs.unlinkSync(full);
  removed++;
  console.log("removed", name);
}

console.log(`Done. Kept ${kept}, removed ${removed}.`);