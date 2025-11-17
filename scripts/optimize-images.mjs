#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const root = path.resolve(process.cwd(), "public", "images");
const outRoot = path.resolve(root, "opt");
const sizes = [400, 800, 1200, 1600];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function isImage(file) {
  return /\.(jpe?g|png)$/i.test(file);
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function processFile(file) {
  if (!isImage(file)) return;
  const rel = path.relative(root, file);
  const parsed = path.parse(rel);
  const destDir = path.join(outRoot, parsed.dir);
  await ensureDir(destDir);

  const img = sharp(file);
  const metadata = await img.metadata();
  for (const w of sizes) {
    if (metadata.width && metadata.width < w) continue;
    const nameBase = `${parsed.name}-${w}`;
    const outAvif = path.join(destDir, `${nameBase}.avif`);
    const outWebp = path.join(destDir, `${nameBase}.webp`);
    await img.resize({ width: w }).avif({ quality: 60 }).toFile(outAvif);
    await img.resize({ width: w }).webp({ quality: 75 }).toFile(outWebp);
    console.log("Wrote", outAvif, outWebp);
  }
}

async function main() {
  try {
    await ensureDir(outRoot);
    const files = await walk(root);
    for (const f of files) {
      try {
        await processFile(f);
      } catch (err) {
        console.error("Error processing", f, err.message);
      }
    }
    console.log("Done. Optimized images are in", outRoot);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
