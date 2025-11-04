"use client";

import React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Portfolio() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ 
    delay: 100,
    threshold: 0.2,
  });

  return (
    <section
      id="portfolio"
      className="py-12 sm:py-16 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight">
            <span className="block">Portfolio</span>
            <span className="block text-teal-300 text-lg sm:text-xl md:text-2xl font-medium mt-2 sm:mt-3">
              Our work speaks for itself
            </span>
          </h2>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            We&apos;re currently curating our portfolio showcase. Check back soon to see our latest
            projects in web development, design systems, and original media production.
          </p>

          <div className="mt-8 sm:mt-10">
            <a
              href="#quote"
              aria-label="Get in touch to discuss your project"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-white text-black font-semibold text-base sm:text-lg shadow-sm cta-lift"
            >
              Start a Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
