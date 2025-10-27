"use client";

import { useEffect, useState, useRef } from "react";

interface FooterProps {
  prefersReducedMotion?: boolean;
}

export default function Footer({ prefersReducedMotion = false }: FooterProps) {
  const year = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [animateColumns, setAnimateColumns] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          const delay = prefersReducedMotion ? 0 : 300;
          setTimeout(() => setAnimateColumns(true), delay);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "50px",
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <footer
      ref={footerRef}
      aria-labelledby="site-footer"
      className="mt-32 md:mt-40"
    >
      <h2 id="site-footer" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-6">
        {/* Main footer content with hero-matching dark glassy container */}
        <div
          className={`relative bg-black/30 backdrop-blur-md border border-white/10 rounded-lg p-12 md:p-16 hover:bg-black/40 hover:border-white/20 hover:shadow-2xl transition-all duration-1000 ${
            prefersReducedMotion
              ? "opacity-100"
              : isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-95"
          }`}
          style={{
            backdropFilter: "blur(12px)",
            transitionDelay: isVisible ? "0ms" : "0ms",
          }}
        >
          {/* Glass overlay effect */}
          <div className="absolute inset-0 rounded-lg bg-linear-to-br from-white/2 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 grid gap-8 md:gap-12 md:grid-cols-3">
            {/* Brand Section */}
            <div
              className={`space-y-8 ${
                prefersReducedMotion
                  ? "opacity-100"
                  : `transition-all duration-800 ${
                      animateColumns
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                    }`
              }`}
              style={{
                transitionDelay: prefersReducedMotion
                  ? "0ms"
                  : animateColumns
                  ? "0ms"
                  : "0ms",
              }}
            >
              <div>
                <h3
                  className="text-lg font-light text-white tracking-wide mb-6"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  DamiAgency
                </h3>
                <p
                  className="text-white/70 text-sm leading-relaxed font-light"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  Design, code, and sound—shipped fast with care.
                </p>
              </div>

              <div>
                <p
                  className="text-white/50 text-xs font-light mb-2 uppercase tracking-wider"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  Get in touch
                </p>
                <a
                  href="mailto:damiagencyadmin@damiagency.com"
                  className="text-cyan-400/90 hover:text-cyan-300 text-sm font-light transition-colors duration-300 hover:underline underline-offset-4"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  damiagencyadmin@damiagency.com
                </a>
              </div>
            </div>

            {/* Navigation Section */}
            <nav
              aria-label="Footer navigation"
              className={`space-y-8 md:text-center md:px-8 ${
                prefersReducedMotion
                  ? "opacity-100"
                  : `transition-all duration-800 ${
                      animateColumns
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`
              }`}
              style={{
                transitionDelay: prefersReducedMotion
                  ? "0ms"
                  : animateColumns
                  ? "200ms"
                  : "0ms",
              }}
            >
              <h3
                className="text-lg font-light text-white tracking-wide mb-6"
                style={{
                  fontFamily:
                    '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                }}
              >
                Navigate
              </h3>

              <ul className="space-y-3">
                {[
                  { href: "#quote", text: "Get a quote" },
                  { href: "#services", text: "Services" },
                  { href: "#portfolio", text: "Portfolio" },
                  { href: "#about", text: "About" },
                ].map((link, index) => (
                  <li
                    key={link.href}
                    className={`${
                      prefersReducedMotion
                        ? "opacity-100"
                        : `transition-all duration-600 ${
                            animateColumns
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-4"
                          }`
                    }`}
                    style={{
                      transitionDelay: prefersReducedMotion
                        ? "0ms"
                        : animateColumns
                        ? `${500 + index * 100}ms`
                        : "0ms",
                    }}
                  >
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm font-light transition-colors duration-300 block"
                      style={{
                        fontFamily:
                          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                      }}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Studio Info */}
            <div
              className={`space-y-8 md:text-right ${
                prefersReducedMotion
                  ? "opacity-100"
                  : `transition-all duration-800 ${
                      animateColumns
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                    }`
              }`}
              style={{
                transitionDelay: prefersReducedMotion
                  ? "0ms"
                  : animateColumns
                  ? "200ms"
                  : "0ms",
              }}
            >
              <h3
                className="text-lg font-light text-white tracking-wide mb-6"
                style={{
                  fontFamily:
                    '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                }}
              >
                Studio
              </h3>

              <div className="space-y-6">
                <div>
                  <p
                    className="text-white/70 text-sm font-light"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                  >
                    © {year} DamiAgency
                  </p>
                </div>

                <div>
                  <p
                    className="text-white/50 text-xs font-light leading-relaxed"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                  >
                    Next.js + Tailwind CSS
                    <br />
                    Vercel • Security Hardened
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant bottom section */}
        <div
          className={`mt-12 pt-8 border-t border-white/5 text-center ${
            prefersReducedMotion
              ? "opacity-100"
              : `transition-all duration-1000 ${
                  animateColumns
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`
          }`}
          style={{
            transitionDelay: prefersReducedMotion
              ? "0ms"
              : animateColumns
              ? "900ms"
              : "0ms",
          }}
        >
          <a
            href="#top"
            className="group inline-flex items-center gap-3 text-white/30 hover:text-white/60 text-sm font-light transition-all duration-500 hover:-translate-y-0.5"
            style={{
              fontFamily:
                '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            }}
          >
            <span className="w-8 h-px bg-linear-to-r from-transparent to-white/20 group-hover:to-cyan-400/40 transition-colors duration-500" />
            Back to top
            <span className="text-xs group-hover:-translate-y-px transition-transform duration-300">
              ↑
            </span>
            <span className="w-8 h-px bg-linear-to-l from-transparent to-white/20 group-hover:to-cyan-400/40 transition-colors duration-500" />
          </a>
        </div>
      </div>
    </footer>
  );
}
