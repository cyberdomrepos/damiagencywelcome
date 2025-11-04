"use client";

import React from "react";
import SimpleQuoteForm from "./SimpleQuoteForm";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function QuoteSection() {
  const { elementRef: quoteRef, isVisible: quoteVisible } = useScrollAnimation({
    delay: 150,
    threshold: 0.15,
  });

  return (
    <section 
      id="quote" 
      className="py-12 sm:py-16 md:py-20"
      ref={quoteRef as React.RefObject<HTMLElement>}
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 md:px-8 transition-all duration-1000 ${
        quoteVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}>
        <div className="bg-linear-to-br from-black/95 via-zinc-900 to-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/30">
          <div className="px-6 sm:px-10 md:px-14 lg:px-16 py-10 sm:py-14 md:py-16">
            <div className="w-full">
              <div className="w-full text-left">
                {/* short horizontal hero line above heading */}
                <div className="flex items-center">
                  <span className="inline-block h-px w-12 sm:w-16 bg-white/10 mr-3 sm:mr-4" />
                  <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-extrabold text-white leading-tight">
                    <span className="block">Get a quote</span>
                  </h2>
                </div>

                <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/90 max-w-none">
                  Share a short summary of your project — what you want built,
                  the timeline you&apos;re aiming for, and any constraints. Use the
                  form to give us the essentials and we&apos;ll reply with a concise
                  scope and clear pricing.
                </p>

                <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-white/60 max-w-none">
                  Fill in your contact details and project requirements. When you
                  submit the form, we&apos;ll receive your request directly and
                  respond promptly with a detailed quote and scope.
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
