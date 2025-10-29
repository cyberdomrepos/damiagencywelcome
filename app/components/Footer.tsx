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
      className="relative py-8 sm:py-12 md:py-16 lg:py-20"
    >
      <h2 id="site-footer" className="sr-only">
        Footer
      </h2>

      {/* Dark Tech Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Tech Particles - positioned away from content */}
        <div
          className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/20 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-32 right-20 w-1 h-1 bg-cyan-300/30 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-32 left-24 w-1.5 h-1.5 bg-cyan-500/15 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        ></div>
        <div
          className="absolute top-40 right-32 w-0.5 h-0.5 bg-cyan-400/25 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
        ></div>
        <div
          className="absolute bottom-40 left-32 w-1 h-1 bg-cyan-200/20 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "1.5s", animationDuration: "4.5s" }}
        ></div>

        {/* Tech Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.008]"
          style={{
            backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Premium Dark Tech Footer Container - Mobile Optimized */}
        <div
          className={`relative glass-card rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-12 lg:p-16 border border-cyan-400/10 overflow-hidden transition-all duration-1000 hover:border-cyan-400/20 hover:shadow-2xl hover:shadow-cyan-400/10 ${
            prefersReducedMotion
              ? "opacity-100"
              : isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-95"
          }`}
          style={{
            transitionDelay: isVisible ? "0ms" : "0ms",
          }}
        >
          {/* Premium Background Effects - positioned away from edges */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-16 right-16 w-32 h-32 bg-cyan-400/2 rounded-full blur-3xl"></div>
            <div className="absolute bottom-16 left-16 w-24 h-24 bg-cyan-300/1 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/0.5 rounded-full blur-3xl"></div>
          </div>

          {/* Subtle Corner Tech Accents - smaller and further from edges */}
          <div className="absolute top-6 left-6 w-6 h-6 border-l border-t border-cyan-400/10"></div>
          <div className="absolute top-6 right-6 w-6 h-6 border-r border-t border-cyan-400/10"></div>
          <div className="absolute bottom-6 left-6 w-6 h-6 border-l border-b border-cyan-400/10"></div>
          <div className="absolute bottom-6 right-6 w-6 h-6 border-r border-b border-cyan-400/10"></div>

          <div className="relative z-10 grid gap-6 sm:gap-8 md:gap-12 lg:gap-16 grid-cols-1 md:grid-cols-3">
            {/* Premium Tech Brand Section - Mobile Optimized */}
            <div
              className={`space-y-4 sm:space-y-6 text-center md:text-left ${
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
              <div className="relative">
                <div className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3">
                  {/* Premium Tech Logo Icon */}
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <h3
                    className="text-lg sm:text-xl font-light text-white tracking-wide"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                  >
                    <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                      Dami
                    </span>
                    <span className="text-white">Agency</span>
                  </h3>
                </div>
                <div className="mt-3 sm:mt-4 mx-auto md:mx-0 w-12 sm:w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.3)]"></div>

                <p
                  className="mt-4 sm:mt-6 text-white/70 text-xs sm:text-sm leading-relaxed font-light px-2 sm:px-0"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  Design, code, and sound—shipped fast with care. Premium
                  digital experiences crafted with cutting-edge technology.
                </p>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
                  <svg
                    className="w-3 h-3 text-cyan-400/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <p
                    className="text-white/50 text-xs font-light uppercase tracking-wider"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                  >
                    Contact
                  </p>
                </div>

                <div className="group relative flex justify-center md:justify-start">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <a
                    href="mailto:damiagencyadmin@damiagency.com"
                    className="relative flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 text-cyan-400/90 hover:text-cyan-300 text-xs sm:text-sm font-light transition-all duration-300 group max-w-full"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="bg-black/30 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg border border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-300 break-all text-center max-w-full overflow-hidden text-ellipsis">
                      damiagencyadmin@damiagency.com
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Premium Tech Navigation Section - Mobile Optimized */}
            <nav
              aria-label="Footer navigation"
              className={`space-y-4 sm:space-y-6 text-center ${
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
              <div className="relative">
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5 text-cyan-400/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <h3
                    className="text-base sm:text-lg font-light text-white tracking-wide"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                  >
                    Navigate
                  </h3>
                </div>
                <div className="mt-2 sm:mt-3 mx-auto w-10 sm:w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_4px_rgba(34,211,238,0.2)]"></div>
              </div>

              <ul className="space-y-2 sm:space-y-3">
                {[
                  {
                    href: "#quote",
                    text: "Get a quote",
                    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
                  },
                  {
                    href: "#services",
                    text: "Services",
                    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                  },
                  {
                    href: "#portfolio",
                    text: "Portfolio",
                    icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
                  },
                  {
                    href: "#about",
                    text: "About",
                    icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  },
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
                      className="group flex items-center justify-center space-x-2 sm:space-x-3 text-white/60 hover:text-cyan-300 text-xs sm:text-sm font-light transition-all duration-300 p-1.5 sm:p-2 rounded-md sm:rounded-lg hover:bg-cyan-400/5"
                      style={{
                        fontFamily:
                          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                      }}
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400/40 group-hover:text-cyan-400 transition-colors duration-300 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={link.icon}
                        />
                      </svg>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                        {link.text}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Premium Tech Studio Section - Mobile Optimized */}
            <div
              className={`space-y-4 sm:space-y-6 text-center md:text-right ${
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
              <div className="relative">
                <div className="flex items-center justify-center md:justify-end space-x-2">
                  <h3
                    className="text-base sm:text-lg font-light text-white tracking-wide"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                  >
                    Studio
                  </h3>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400/60 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div className="mt-2 sm:mt-3 mx-auto md:ml-auto md:mx-0 w-10 sm:w-12 h-0.5 bg-gradient-to-r md:bg-gradient-to-l from-transparent via-cyan-400/50 to-transparent shadow-[0_0_4px_rgba(34,211,238,0.2)]"></div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="relative">
                  <div className="flex items-center justify-center md:justify-end space-x-1.5 sm:space-x-2">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400/40 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                      />
                    </svg>
                    <p
                      className="text-white/70 text-xs sm:text-sm font-light bg-black/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-md border border-cyan-400/10"
                      style={{
                        fontFamily:
                          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                      }}
                    >
                      © {year} DamiAgency
                    </p>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-center md:justify-end space-x-1.5 sm:space-x-2">
                    <svg
                      className="w-3 h-3 text-cyan-400/40 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p
                      className="text-white/50 text-xs font-light leading-relaxed"
                      style={{
                        fontFamily:
                          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                      }}
                    >
                      Next.js + Tailwind CSS
                    </p>
                  </div>

                  <div className="flex items-center justify-center md:justify-end space-x-1.5 sm:space-x-2">
                    <svg
                      className="w-3 h-3 text-cyan-400/40 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <p
                      className="text-white/50 text-xs font-light leading-relaxed"
                      style={{
                        fontFamily:
                          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                      }}
                    >
                      Vercel • Security Hardened
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Tech Bottom Section - Mobile Optimized */}
        <div
          className={`relative mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-cyan-400/10 text-center overflow-hidden ${
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
          {/* Scan Line Effect */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse"></div>

          {/* Back to Top Button - Mobile Optimized */}
          <a
            href="#top"
            className="group relative inline-flex items-center gap-2 sm:gap-3 text-white/40 hover:text-cyan-300 text-sm font-light transition-all duration-700 hover:-translate-y-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-cyan-400/5 border border-transparent hover:border-cyan-400/20 backdrop-blur-sm mx-2 sm:mx-4"
            style={{
              fontFamily:
                '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            }}
          >
            {/* Left Tech Accent */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-cyan-400/20 rounded-full group-hover:bg-cyan-400/40 transition-colors duration-300"></div>
              <span className="w-4 sm:w-6 h-px bg-gradient-to-r from-transparent to-cyan-400/20 group-hover:to-cyan-400/40 transition-all duration-500" />
            </div>

            {/* Content */}
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400/40 group-hover:text-cyan-400 transition-all duration-300 group-hover:-translate-y-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
              <span className="group-hover:tracking-wide transition-all duration-300 text-xs sm:text-sm">
                Back to top
              </span>
            </div>

            {/* Right Tech Accent */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="w-4 sm:w-6 h-px bg-gradient-to-l from-transparent to-cyan-400/20 group-hover:to-cyan-400/40 transition-all duration-500" />
              <div className="w-1.5 h-1.5 bg-cyan-400/20 rounded-full group-hover:bg-cyan-400/40 transition-colors duration-300"></div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/0 via-cyan-400/3 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          </a>
        </div>
      </div>
    </footer>
  );
}
