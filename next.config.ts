// next.config.ts
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",

  // assets
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self' blob:",

  // styles (needed for GSAP/Framer inline style writes)
  "style-src 'self' 'unsafe-inline'",

  // --- scripts ---
  // Allow self-hosted scripts + inline bootstrap + blob: (for workers/chunks).
  // Keep eval only in dev for HMR.
  isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:"
    : "script-src 'self' 'unsafe-inline' blob:",

  // Silence “script-src-elem not explicitly set” and match the same policy.
  isDev
    ? "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' blob:"
    : "script-src-elem 'self' 'unsafe-inline' blob:",

  // You can forbid setting inline script attributes if you like:
  "script-src-attr 'none'",

  // fetch/XHR
  "connect-src 'self'",  // Plausible is proxied, so 'self' is enough

  // workers (Next/Three sometimes use blob workers)
  "worker-src 'self' blob:",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/a/js/script.js", destination: "https://plausible.io/js/pa-XXXXX.js" },
      { source: "/a/api/event", destination: "https://plausible.io/api/event" },
    ];
  },
};

export default nextConfig;
