"use client";

import DesignCarousel from "./DesignCarousel";
import React, { useMemo } from "react";

function CategoryCarouselWrapper() {
  const designImages = useMemo(
    () => [
      {
        src: "/images/portfolio-design/2 ORIN MEDIA MOCKUP BLACK.jpg",
        alt: "Design 1",
      },
      {
        src: "/images/portfolio-design/26 crew MAN mockup white.jpg",
        alt: "Design 2",
      },
      { src: "/images/portfolio-design/3.jpg", alt: "Design 3" },
      { src: "/images/portfolio-design/aerial mockup 3.jpg", alt: "Design 4" },
    ],
    []
  );

  // Render only the large Design carousel for now
  return (
    <div className="flex flex-col items-center">
      {/* Premium box wrapper */}
      <div className="w-full">
        <div className="mx-auto max-w-[1400px] rounded-2xl bg-gradient-to-b from-black/60 to-black/30 border border-white/6 backdrop-blur-md p-6 shadow-2xl">
          <div className="text-center mb-6">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-teal-300 leading-tight">
              Graphics design
            </h3>
            <div className="mt-2">
              <span className="text-sm text-gray-400">
                Brand identities • Merch • Visual systems
              </span>
            </div>
          </div>

          <div className="w-full">
            <DesignCarousel images={designImages} variant="large" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  // Using Design carousel here; a fuller items grid may be added later.

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left column: heading + description (left-aligned, matches Services sizing) */}
          <div className="md:col-span-12 lg:col-span-5">
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-extrabold text-white leading-tight">
              <span className="block">Portfolio.</span>
              <span className="block text-teal-300 text-lg sm:text-xl md:text-2xl font-medium mt-2">
                Web • Merch • Soundtracks
              </span>
            </h2>

            <div className="mt-4 sm:mt-6 pl-0 border-l-0 max-w-xl">
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                We ship beautiful, usable products with high-performance code,
                elevated brand systems, and original media that helps teams
                stand out. Our work focuses on clarity, accessibility, and
                scalable design so you can iterate confidently.
              </p>
              {/* subtle horizontal rule handled by the badges container below (avoid duplicate lines) */}
            </div>

            <div className="mt-6">
              {/* Trustworthy portfolio badges and client strip with dividers */}
              <div className="py-4 border-t border-b border-white/6">
                <div className="flex flex-col gap-4">
                  {/* Metrics row: pill badges (no vertical dividers) */}
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white/6 rounded-md">
                      <div className="text-sm font-semibold text-white">
                        30+
                      </div>
                      <div className="text-xs text-gray-300">Projects</div>
                    </div>

                    <div className="px-4 py-2 bg-white/6 rounded-md">
                      <div className="text-sm font-semibold text-white">
                        4.9★
                      </div>
                      <div className="text-xs text-gray-300">Avg rating</div>
                    </div>

                    <div className="px-4 py-2 bg-white/6 rounded-md">
                      <div className="text-sm font-semibold text-white">12</div>
                      <div className="text-xs text-gray-300">Countries</div>
                    </div>
                  </div>

                  {/* Horizontal featured case study card */}
                  <div className="mt-2">
                    {/* Minimal inline credentials (no boxed card) */}
                    <div className="text-sm text-gray-300">
                      <span className="font-semibold text-white">
                        Professional services
                      </span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span>NDAs</span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span>Fixed-scope estimates</span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span>Dedicated PM</span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span>On-time delivery</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-400 max-w-xl">
                    <p>
                      Want to see how we solved challenges for teams like yours?
                      Browse our case studies or reach out and we’ll share
                      relevant work and timelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* (carousel moved below for full-width centered layout) */}
        </div>
        {/* Carousel: centered below the portfolio text */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-[1400px] px-4">
            <CategoryCarouselWrapper />
          </div>
        </div>
      </div>
    </section>
  );
}
