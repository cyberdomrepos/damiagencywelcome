// next.config.ts
import type { NextConfig } from "next";

const IS_DEV = process.env.NODE_ENV !== "production";

const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",

  // assets
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self' blob:",

  // styles (safe for GSAP-style inline writes; fine even if you removed GSAP)
  "style-src 'self' 'unsafe-inline'",

  // *** Scripts ***
  // Next injects small inline bootstraps; also some code may use blob: URLs.
  IS_DEV
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:"
    : "script-src 'self' 'unsafe-inline' blob:",
  IS_DEV
    ? "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' blob:"
    : "script-src-elem 'self' 'unsafe-inline' blob:",
  "script-src-attr 'none'",

  // XHR/fetch (Plausible is proxied under /a/, so 'self' is enough)
  "connect-src 'self'",

  // workers (future-proof three/worker usage)
  "worker-src 'self' blob:",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async rewrites() {
    return [
      { source: "/a/js/script.js", destination: "https://plausible.io/js/script.js" },
      { source: "/a/api/event", destination: "https://plausible.io/api/event" },
    ];
  },
};

export default nextConfig;
