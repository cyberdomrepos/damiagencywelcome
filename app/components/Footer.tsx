"use client";

import { useEffect } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface FooterProps {
  prefersReducedMotion?: boolean;
}

export default function Footer({ prefersReducedMotion = false }: FooterProps) {
  const year = new Date().getFullYear();
  
  const { elementRef: footerRef, isVisible: footerVisible } = useScrollAnimation({
    delay: 100,
    threshold: 0.2,
  });

  // lightweight accessibility enhancement: reduce motion respect
  useEffect(() => {
    if (prefersReducedMotion) return;
    // no animations needed for the minimal footer; placeholder if we add subtle effects later
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
      className="relative py-6 sm:py-8"
      ref={footerRef as React.RefObject<HTMLElement>}
    >
      <h2 id="site-footer" className="sr-only">
        Footer
      </h2>

      <div className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-700 ${
        footerVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex flex-col items-start gap-3 sm:gap-4 text-left">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <svg
              aria-hidden
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" />
            </svg>
            <p className="text-white font-semibold text-sm sm:text-base">
              DamiAgency
            </p>
          </div>

          <p className="text-white/60 text-xs sm:text-sm max-w-xl leading-relaxed">
            Design, code, and sound—crafted with attention and speed. Reach out
            for a concise scope and fast turnaround.
          </p>

          <div className="text-xs sm:text-sm text-white/50">
            © {year} DamiAgency — All rights reserved.
          </div>
        </div>
      </div>

      {/* Subtle fixed back-to-top button (small, low-contrast) */}
      <a
        href="#home"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-black/20 text-white/60 hover:bg-black/30 hover:text-white transition-colors duration-200"
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
