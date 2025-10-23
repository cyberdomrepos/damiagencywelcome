// app/headers.ts (or wherever you centralize headers)
export function headers() {
  const csp = [
    "default-src 'self'",
    // Keep scripts strict; Plausible is proxied so 'self' is enough
    "script-src 'self'",
    // IMPORTANT: allow inline styles so GSAP/Framer can animate
    "style-src 'self' 'unsafe-inline'",
    // Images, fonts, media as needed
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "media-src 'self' blob:",
    // XHR/fetch to your own origin (Plausible via /a/api/event)
    "connect-src 'self'",
    // Disallow framing by others (adjust if you intentionally embed)
    "frame-ancestors 'none'",
    // Optional: allow WebGL shaders/assets if you load any from same origin
    "worker-src 'self' blob:",
  ].join("; ");

  return [
    ["Content-Security-Policy", csp],
    ["Referrer-Policy", "strict-origin-when-cross-origin"],
    ["X-Content-Type-Options", "nosniff"],
    ["X-Frame-Options", "DENY"], // redundant to frame-ancestors but fine
    // Minimal Permissions-Policy
    ["Permissions-Policy", "camera=(), microphone=(), geolocation=()"],
  ];
}
