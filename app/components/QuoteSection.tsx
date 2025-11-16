"use client";

import React from "react";
import SimpleQuoteForm from "./SimpleQuoteForm";
import { useCinematicScroll } from "../hooks/useScrollAnimation";

export default function QuoteSection() {
  const { elementRef: quoteRef, isVisible: quoteVisible } = useCinematicScroll({
    delay: 150,
    threshold: 0.15,
  });

  return (
    <section
      id="quote"
      className="mt-20 sm:mt-32 md:mt-40 lg:mt-56 py-12 sm:py-16 md:py-20 relative overflow-hidden"
      ref={quoteRef as React.RefObject<HTMLElement>}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>

      <div
        className={`max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 transition-all duration-1000 ${
          quoteVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16"
        }`}
      >
        <div className="bg-linear-to-br from-zinc-900/95 via-slate-800/90 to-zinc-900/95 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10 backdrop-blur-sm">
          <div className="px-6 sm:px-10 md:px-14 lg:px-16 py-10 sm:py-14 md:py-16">
            <div className="w-full">
              <div className="w-full text-left">
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight">
                  <span className="block">Get a quote.</span>
                </h2>

                <p className="mt-6 sm:mt-8 text-base sm:text-lg text-white/80 max-w-3xl leading-relaxed">
                  Share a short summary of your project — what you want built,
                  the timeline you&apos;re aiming for, and any constraints. Use
                  the form to give us the essentials and we&apos;ll reply with a
                  concise scope and clear pricing.
                </p>

                <p className="mt-4 text-sm text-white/60 max-w-3xl leading-relaxed">
                  How to use this form: fill contact details, choose the primary
                  service, optionally add company and NDA, then provide a short
                  project description. Clicking &quot;Get a quote&quot; opens
                  your email client with the filled details.
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-8 md:px-12 lg:px-16 pb-10 sm:pb-14 md:pb-16 pt-6 sm:pt-8">
            <SimpleQuoteForm fullWidth />
          </div>
        </div>
      </div>
    </section>
  );
}
