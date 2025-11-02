"use client";

import React from "react";
import SimpleQuoteForm from "./SimpleQuoteForm";

export default function QuoteSection() {
  return (
    <section id="quote" className="py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="bg-linear-to-br from-black/95 via-zinc-900 to-slate-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/30">
          <div className="px-8 sm:px-12 md:px-16 py-16">
            <div className="w-full">
              <div className="w-full text-left">
                {/* short horizontal hero line above heading */}
                <div className="flex items-center">
                  <span className="inline-block h-px w-16 bg-white/10 mr-4" />
                  <h2 className="text-5xl md:text-8xl lg:text-9xl font-extrabold text-white leading-tight">
                    <span className="block">Get a quote</span>
                  </h2>
                </div>

                <p className="mt-6 text-lg md:text-xl text-white/90 max-w-none">
                  Share a short summary of your project — what you want built,
                  the timeline you’re aiming for, and any constraints. Use the
                  form to give us the essentials and we’ll reply with a concise
                  scope and clear pricing.
                </p>

                <p className="mt-6 text-sm md:text-base text-white/60 max-w-none">
                  How to use this form: fill contact details, choose the primary
                  service, optionally add company and NDA, then provide a short
                  project description. Clicking &quot;Get a quote&quot; opens
                  your email client with the filled details.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-12 md:px-16 pb-16 pt-8">
            <SimpleQuoteForm fullWidth />
          </div>
        </div>
      </div>
    </section>
  );
}
