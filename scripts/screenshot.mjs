#!/usr/bin/env node
import { chromium } from "playwright";
import fs from "fs";

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();

    // Navigate to local dev server
    const url = process.env.SCREENSHOT_URL || "http://localhost:3000";
    console.log("Opening", url);
    await page.goto(url, { waitUntil: "networkidle" });

    // Wait a short moment for hero animations to settle
    try {
      await page.waitForSelector(
        ".hero-word, .marquee-blend, .marquee-article",
        { timeout: 4000 }
      );
    } catch {
      // ignore if selectors don't appear quickly
    }

    // Ensure output directory exists
    const outDir = "build";
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const outPath = `${outDir}/screenshot-home.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log("Saved screenshot to", outPath);

    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error("Screenshot failed:", err);
    process.exit(1);
  }
})();
