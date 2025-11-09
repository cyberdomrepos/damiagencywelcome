"use client";

import { useEffect } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface FooterProps {
  prefersReducedMotion?: boolean;
}

export default function Footer({ prefersReducedMotion = false }: FooterProps) {
  const year = new Date().getFullYear();

  const { elementRef: footerRef, isVisible: footerVisible } =
    useScrollAnimation({
      delay: 100,
      threshold: 0.2,
    });

  // lightweight accessibility enhancement: respect reduced motion preference
  useEffect(() => {
    if (prefersReducedMotion) return;
    // placeholder for future subtle animations
  }, [prefersReducedMotion]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      aria-labelledby="site-footer"
      className="relative py-8 sm:py-10 bg-transparent"
      ref={footerRef as React.RefObject<HTMLElement>}
    >
      <h2 id="site-footer" className="sr-only">
        Footer
      </h2>

      {/* subtle divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="border-t border-white/6 mb-6" />
      </div>

      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-700 ${
          footerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Brand / blurb */}
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <svg
                aria-hidden
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" />
              </svg>

              <span className="text-white font-semibold text-sm sm:text-base">
                DamiAgency
              </span>
            </div>

            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Design, code and sound — concise scopes, fast turnaround, and
              attention to craft. We focus on projects where speed and clarity
              matter.
            </p>
          </div>

          {/* Quick links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-col md:items-center md:justify-center"
          >
            <h3 className="sr-only">Footer navigation</h3>
            <ul className="flex flex-col md:flex-row md:space-x-8 gap-2 text-sm">
              <li>
                <a href="#services" className="text-white/80 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-white/80 hover:text-white">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/80 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#quote"
                  className="text-white/80 hover:text-white md:whitespace-nowrap"
                >
                  Get a quote
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-white/60 hover:text-white/90"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact / legal */}
          <div className="flex flex-col items-start sm:items-end gap-2 text-sm">
            <a
              href="mailto:damiagencyadmin@damiagency.com"
              className="text-white/90 hover:text-white font-medium"
            >
              damiagencyadmin@damiagency.com
            </a>

            <div className="text-white/50 text-xs">
              © {year} DamiAgency — All rights reserved.
            </div>

            <div className="text-white/40 text-xs">Made with care.</div>
          </div>
        </div>
      </div>

      {/* Subtle fixed back-to-top button (small, low-contrast) */}
      <a
        href="#home"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-black/40 text-white/80 ring-1 ring-white/6 hover:bg-black/50 hover:text-white transition-colors duration-200 shadow-md"
        title="Back to top"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </a>
    </footer>
  );
}
