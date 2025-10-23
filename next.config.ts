// next.config.ts
import type { NextConfig } from "next";

/**
 * Single source of truth for env checks.
 * (Your error came from declaring this twice.)
 */
const IS_DEV = process.env.NODE_ENV !== "production";

/** Content Security Policy (prod-friendly) */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",

  // assets
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self' blob:",

  // styles: allow inline so GSAP/Framer can set style attributes
  "style-src 'self' 'unsafe-inline'",

  // scripts: self + inline bootstrap + blob: (workers/chunks)
  IS_DEV
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:"
    : "script-src 'self' 'unsafe-inline' blob:",
  IS_DEV
    ? "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' blob:"
    : "script-src-elem 'self' 'unsafe-inline' blob:",
  "script-src-attr 'none'",

  // XHR/fetch
  "connect-src 'self'", // Plausible is proxied under /a/..., so 'self' is enough

  // workers (Next/Three often use blob workers)
  "worker-src 'self' blob:",
].join("; ");

const securityHeaders: { key: string; value: string }[] = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async rewrites() {
    return [
      // Plausible proxy (replace pa-XXXXX if you use a custom domain snippet)
      { source: "/a/js/script.js", destination: "https://plausible.io/js/pa-XXXXX.js" },
      { source: "/a/api/event", destination: "https://plausible.io/api/event" },
    ];
  },
};

export default nextConfig;
