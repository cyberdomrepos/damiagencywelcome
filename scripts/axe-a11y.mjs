#!/usr/bin/env node
import { chromium } from "playwright";
import fs from "fs";

(async () => {
  const url =
    process.env.A11Y_URL ||
    process.env.SCREENSHOT_URL ||
    "http://localhost:3000";
  console.log("Running axe-core accessibility scan on", url);

  let browser = await chromium.launch({ headless: true });
  let context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  let page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle" });

    // Inject axe-core from CDN to avoid an extra dependency. Some dev servers
    // set a strict CSP which blocks remote script injection; if injection
    // fails, retry launching Chromium with disabled web security (local use only).
    const axeUrl =
      "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.4/axe.min.js";
    // Fetch axe-core source and inject it using Playwright's addInitScript which
    // executes the script in a privileged context before page scripts run. This
    // is effective even when the page applies a strict CSP, as init scripts are
    // injected by the automation runtime.
    const res = await fetch(axeUrl);
    if (!res.ok)
      throw new Error(`Failed to fetch axe-core from ${axeUrl}: ${res.status}`);
    const axeSource = await res.text();

    // Use addInitScript so axe is available as window.axe when the page loads.
    await page.addInitScript({ content: axeSource });

    // Now navigate (or re-navigate) to the page so the init script runs in page context
    await page.goto(url, { waitUntil: "networkidle" });

    // Run axe in the page context
    const results = await page.evaluate(async () => {
      // axe is injected into the page global by addInitScript
      return await window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "best-practice"],
        },
      });
    });

    const outDir = "build";
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const jsonPath = `${outDir}/axe-report.json`;
    fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2), "utf-8");
    console.log("Saved axe JSON report to", jsonPath);

    // Also generate a minimal HTML report
    const htmlPath = `${outDir}/axe-report.html`;
    const html = `<!doctype html><meta charset="utf-8"><title>Axe Report</title><style>body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;margin:24px;color:#111}h1{font-size:20px}pre{white-space:pre-wrap;background:#f6f8fa;padding:12px;border-radius:6px}</style><h1>Axe accessibility scan results</h1><p>URL: ${url}</p><pre>${JSON.stringify(
      results,
      null,
      2
    )}</pre>`;
    fs.writeFileSync(htmlPath, html, "utf-8");
    console.log("Saved axe HTML report to", htmlPath);

    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error("Axe run failed:", err);
    await browser.close();
    process.exit(1);
  }
})();
