"use client";

import React from "react";

export default function ServicesBig() {
  const cards = [
    {
      title: "Web & Product Development",
      desc: "Fast, accessible React + Next apps—scoped, tested, and production-ready.",
      href: "#contact",
      bg: "bg-zinc-50",
      text: "text-zinc-900",
      border: "border-zinc-200",
      bullets: [
        "Modern React + Next.js architectures with SSR/ISR and edge-first patterns.",
        "Type-safe contracts (TypeScript) and well-tested CI pipelines.",
        "Performance budgets, accessibility audits (WCAG), and observability.",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-14 h-14"
          aria-hidden
        >
          <rect
            x="6"
            y="10"
            width="52"
            height="34"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 46h40"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect
            x="18"
            y="18"
            width="12"
            height="10"
            rx="1"
            fill="currentColor"
            opacity="0.06"
          />
          <path d="M36 18h10v10H36z" fill="currentColor" opacity="0.06" />
          <path
            d="M20 30h8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Brand & Visual Design",
      desc: "Brand systems, UI, and merch that look premium and ship quickly.",
      href: "#portfolio",
      bg: "bg-linear-to-br from-rose-600/70 via-rose-500/60 to-rose-400/50",
      text: "text-white",
      border: "border-rose-500/40",
      bullets: [
        "End-to-end brand systems: logo, typography, color, and usage guidelines.",
        "High-fidelity UI kits, component libraries, and accessible patterns.",
        "Merch design and print-ready assets with production specs.",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-14 h-14"
          aria-hidden
        >
          <path
            d="M14 44l8 8 28-28-8-8L14 44z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M42 18l6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect
            x="8"
            y="48"
            width="48"
            height="6"
            rx="1"
            fill="currentColor"
            opacity="0.06"
          />
        </svg>
      ),
    },
    {
      title: "Sound & Media",
      desc: "Original soundtracks, podcasts, and media assets for creators and teams.",
      href: "#media",
      // vibrant orange background for Sound & Media
      bg: "bg-linear-to-br from-orange-500/95 via-orange-500/90 to-orange-400/90",
      // use dark text to match the white-box CTA text color; line (left border) should be black
      text: "text-zinc-900",
      border: "border-orange-700/30",
      bullets: [
        "Custom soundtracks and stems for branding and product experiences.",
        "Podcast production, editing, and distribution-ready masters.",
        "SFX libraries, voiceover direction, and soundtrack licensing guidance.",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-14 h-14"
          aria-hidden
        >
          <path
            d="M8 34v6a6 6 0 006 6h2v-18H14a6 6 0 00-6 6z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M56 34v6a6 6 0 01-6 6h-2v-18h2a6 6 0 016 6z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M20 36c2-6 4-6 6-2s4 6 6 0 4-8 6-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="mt-12 sm:mt-16 md:mt-24 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 items-start">
          <div className="md:col-span-7" />
          <div className="md:col-span-5 flex flex-col items-start md:items-end justify-start">
            <div className="text-left md:text-right md:pl-8 md:pt-4">
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-extrabold text-white leading-tight">
                <span className="block">What we do.</span>
                <span className="block text-teal-300 text-lg sm:text-xl md:text-2xl font-medium mt-2 sm:mt-3">
                  Three core areas that move products forward
                </span>
              </h2>

              <div className="mt-4 sm:mt-6 pl-3 sm:pl-4 md:pl-8 border-l border-white/10 max-w-xl">
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  We ship beautiful, usable products with high-performance code,
                  elevated brand systems, and original media that helps teams
                  stand out. Our work focuses on clarity, accessibility, and
                  scalable design so you can iterate confidently.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center gap-8 sm:gap-10 md:gap-12">
          {cards.map((card, i) => {
            const align =
              i === 0
                ? "self-center md:self-end"
                : i === 1
                ? "self-center"
                : "self-center md:self-start";

            const iconBg =
              i === 0
                ? "bg-zinc-100 text-zinc-900"
                : i === 1
                ? "bg-rose-500 text-white"
                : "bg-orange-600 text-white";

            return (
              <div
                key={card.title}
                className={`${align} w-full md:w-11/12 lg:w-9/12`}
              >
                <a
                  href={card.href}
                  className={`group block rounded-2xl sm:rounded-3xl ${card.bg} ${card.border} ${card.text} p-6 sm:p-10 md:p-16 lg:p-20 min-h-[300px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[520px] shadow-2xl transition-transform transform hover:-translate-y-4 hover:shadow-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/30`}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div
                      className={`flex-none rounded-lg ${iconBg} p-3 sm:p-4 shadow-inner`}
                    >
                      <span className="inline-block w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                        {card.icon}
                      </span>
                    </div>

                    <div
                      className={`pl-0 sm:pl-4 md:pl-6 lg:pl-8 border-l-0 sm:border-l ${
                        i === 0
                          ? "sm:border-zinc-200"
                          : i === 1
                          ? "sm:border-rose-500/40"
                          : "sm:border-black/20"
                      } ml-0`}
                    >
                      <h3
                        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold ${card.text}`}
                      >
                        {card.title}
                      </h3>

                      <p
                        className={`mt-3 sm:mt-4 text-sm md:text-base leading-relaxed max-w-lg bg-transparent ${
                          i === 0
                            ? "text-zinc-700"
                            : i === 1
                            ? "text-white/90"
                            : "text-zinc-900/85"
                        }`}
                      >
                        {card.desc}
                      </p>

                      <ul className="mt-3 sm:mt-4 ml-4 list-disc space-y-1.5 sm:space-y-2 text-sm md:text-base max-w-lg">
                        {card.bullets?.map((b, idx) => (
                          <li
                            key={idx}
                            className={`${
                              i === 1
                                ? "text-white/85"
                                : i === 0
                                ? "text-zinc-700"
                                : "text-zinc-900/85"
                            }`}
                          >
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 sm:mt-8">
                        <span
                          className={`inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-md transition-colors font-semibold ${
                            i === 0
                              ? "bg-zinc-900 text-white hover:bg-black/90"
                              : i === 1
                              ? "bg-white/6 text-white hover:bg-white/10"
                              : "bg-white text-zinc-900 hover:bg-zinc-100"
                          }`}
                        >
                          Learn more
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
