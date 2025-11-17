import sharp from "sharp";
import { statSync } from "fs";
import path from "path";

const src = path.resolve(process.cwd(), "public/images/hero-media.jpeg");
const outAvif = path.resolve(process.cwd(), "public/images/hero-media.avif");
const outWebp = path.resolve(process.cwd(), "public/images/hero-media.webp");

async function run() {
  console.log("Source:", src);
  try {
    const s = statSync(src);
    console.log("Source size:", s.size);
  } catch {
    console.error("Source image not found:", src);
    process.exit(1);
  }

  await sharp(src)
    .resize({ width: 1600 })
    .avif({ quality: 60 })
    .toFile(outAvif);
  console.log("Wrote", outAvif);

  await sharp(src)
    .resize({ width: 1600 })
    .webp({ quality: 75 })
    .toFile(outWebp);
  console.log("Wrote", outWebp);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
