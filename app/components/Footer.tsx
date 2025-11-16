"use client";

import { useEffect } from "react";
import { useCinematicScroll } from "../hooks/useScrollAnimation";

interface FooterProps {
  prefersReducedMotion?: boolean;
}

export default function Footer({ prefersReducedMotion = false }: FooterProps) {
  const year = new Date().getFullYear();

  const { elementRef: footerRef, isVisible: footerVisible } =
    useCinematicScroll({
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
      className="relative py-6 sm:py-8 bg-transparent border-t border-white/10"
      ref={footerRef as React.RefObject<HTMLElement>}
    >
      <h2 id="site-footer" className="sr-only">
        Footer
      </h2>

      <div
        className={`max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 transition-all duration-700 ${
          footerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
          {/* Brand / blurb */}
          <div className="flex flex-col items-start gap-4 max-w-md">
            <h3 className="text-white font-bold text-xl tracking-tight">
              DAMIAGENCY
            </h3>

            <p className="text-white/70 text-sm leading-relaxed">
              Design, code, and sound — concise scopes, fast turnaround and
              attention to craft.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation" className="flex flex-col">
            <h3 className="sr-only">Footer navigation</h3>
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <li>
                <a
                  href="#services"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#quote"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Get a quote
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10">
          <div className="text-white/50 text-sm text-center">
            © {year} DamiAgency — All rights reserved.
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
