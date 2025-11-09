"use client";

import React, { useRef, useEffect, useState } from "react";

interface Review {
  name: string;
  quote?: string;
  rating?: number;
  role?: string;
}

interface TestimonialSlidersProps {
  items: Array<string | Review>;
  className?: string;
}

export default function TestimonialSliders({
  items,
  className = "",
}: TestimonialSlidersProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const reviews: Review[] = items.map((it) =>
    typeof it === "string" ? { name: it, rating: 5 } : it
  );

  const seedReviews: Review[] = [
    {
      name: "John Morrison",
      quote:
        "They helped launch our single and the audience reaction was immediate — more streams and press than we expected.",
      rating: 5,
      role: "Music",
    },
    {
      name: "Maya Loren",
      quote:
        "Brilliant creative direction for our album art and merch — thoughtful throughout.",
      rating: 5,
      role: "Music",
    },
    {
      name: "Ethan Shaw",
      quote:
        "Fast, reliable, and great at translating vague briefs into stand-out assets.",
      rating: 5,
      role: "Music",
    },
    {
      name: "Hannah Brooks",
      quote:
        "Rebuilt our storefront with clear performance wins and a clean CMS workflow.",
      rating: 5,
      role: "Web Development",
    },
    {
      name: "Derek Yuan",
      quote:
        "Solid engineering choices and thoughtful accessibility improvements — conversion improved notably.",
      rating: 5,
      role: "Web Development",
    },
    {
      name: "Priya Singh",
      quote:
        "Delivered features on time and helped mentor our in-house devs during the rollout.",
      rating: 5,
      role: "Web Development",
    },
    {
      name: "Kai Nakamura",
      quote:
        "Exceptional visual language and brand guidelines that scaled across platforms.",
      rating: 5,
      role: "Graphics Design",
    },
    {
      name: "Zara Bloom",
      quote:
        "Beautiful art direction and fast iterations — the launch assets were perfect.",
      rating: 5,
      role: "Graphics Design",
    },
    {
      name: "Sana Patel",
      quote:
        "Handled merchandising strategy and creative direction for our EP launch.",
      rating: 5,
      role: "Music",
    },
  ];

  const defaulted = reviews.length ? reviews : seedReviews;
  const duplicated = [...defaulted, ...defaulted];

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function computeCardFull(el: HTMLDivElement) {
    const gap = parseFloat(getComputedStyle(el).gap || "24") || 24;
    const firstWidth =
      (el.children[0] as HTMLElement | undefined)?.offsetWidth || 320;
    return { cardFull: firstWidth + gap };
  }

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const elNonNull = el as HTMLDivElement;

    let raf = 0;
    function onScroll() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const half = elNonNull.scrollWidth / 2 || 1;
        if (elNonNull.scrollLeft >= half) elNonNull.scrollLeft -= half;
      });
    }

    elNonNull.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      elNonNull.removeEventListener("scroll", onScroll as EventListener);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [defaulted.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || prefersReduced) return;
    const elNonNull = el as HTMLDivElement;
    const intervalMs = 4500;
    let id = 0 as number;

    function startAutoplay() {
      id = window.setInterval(() => {
        if (isPaused) return;
        const { cardFull } = computeCardFull(elNonNull);
        elNonNull.scrollBy({ left: cardFull, behavior: "smooth" });
      }, intervalMs);
    }

    startAutoplay();
    return () => {
      if (id) clearInterval(id);
    };
  }, [isPaused, prefersReduced, defaulted.length]);

  function onEnter() {
    setIsPaused(true);
  }
  function onLeave() {
    setIsPaused(false);
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">
              Client reviews
            </h2>
            <p className="mt-2 text-sm md:text-base text-white/60">
              Trusted by music, merchandise, and web teams — real feedback from
              recent projects and campaigns.
            </p>
            <div className="mt-4">
              <div className="w-20 h-px bg-white/8 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocusCapture={onEnter}
        onBlurCapture={onLeave}
        aria-hidden={false}
      >
        <button
          aria-label="Previous reviews"
          className="absolute left-6 top-1/2 z-30 -translate-y-1/2 bg-white/4 hover:bg-white/8 text-white rounded-full p-2.5 md:p-3 text-lg md:text-xl shadow-lg backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
          onClick={() => {
            const el = trackRef.current;
            if (!el) return;
            const first = el.children[0] as HTMLElement | undefined;
            const gap = parseFloat(getComputedStyle(el).gap || "24") || 24;
            const step = (first?.offsetWidth || 320) + gap;
            setIsPaused(true);
            el.scrollBy({ left: -step, behavior: "smooth" });
            setTimeout(() => setIsPaused(false), 1400);
          }}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            className="h-5 w-5 md:h-6 md:w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
          >
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>

        <button
          aria-label="Next reviews"
          className="absolute right-6 top-1/2 z-30 -translate-y-1/2 bg-white/4 hover:bg-white/8 text-white rounded-full p-2.5 md:p-3 text-lg md:text-xl shadow-lg backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
          onClick={() => {
            const el = trackRef.current;
            if (!el) return;
            const first = el.children[0] as HTMLElement | undefined;
            const gap = parseFloat(getComputedStyle(el).gap || "24") || 24;
            const step = (first?.offsetWidth || 320) + gap;
            setIsPaused(true);
            el.scrollBy({ left: step, behavior: "smooth" });
            setTimeout(() => setIsPaused(false), 1400);
          }}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            className="h-5 w-5 md:h-6 md:w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
          >
            <path d="M9 6L15 12L9 18" />
          </svg>
        </button>

        <div
          ref={trackRef}
          className="flex gap-6 items-stretch overflow-x-auto no-scrollbar px-4 md:px-6 py-4 md:py-6 snap-x snap-mandatory"
          style={{
            willChange: "scroll-left",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {duplicated.map((r, i) => {
            const initials = (r.name || "")
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("");
            return (
              <article
                key={`${r.name}-${i}`}
                aria-hidden={i >= defaulted.length}
                className={`marquee-article shrink-0 min-h-64 md:min-h-80 rounded-md p-6 md:p-8 scale-100 opacity-100 flex flex-col snap-center transition-shadow duration-300 ease-out will-change-transform bg-linear-to-b from-zinc-900/88 to-zinc-900/80 border border-white/10 ring-1 ring-black/10 backdrop-blur-sm shadow-lg hover:border-teal-400/30 hover:shadow-2xl focus:border-teal-400/30 outline-none overflow-hidden box-border`}
                role="article"
                aria-label={`Review by ${r.name}`}
                tabIndex={0}
                style={{
                  boxShadow: "0 18px 48px rgba(2,6,10,0.75)",
                  WebkitBoxShadow: "0 18px 48px rgba(2,6,10,0.75)",
                  boxSizing: "border-box",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-none w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-800/30 border border-white/10 ring-1 ring-black/10 flex items-center justify-center text-white/90 font-semibold text-lg md:text-xl">
                      {initials}
                    </div>
                    <div>
                      <div className="text-white font-extrabold text-lg md:text-2xl leading-tight tracking-tight">
                        {r.name}
                      </div>
                      {r.role && (
                        <div className="text-sm text-white/70 mt-1">
                          {r.role}
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="ml-4 text-teal-400 flex items-center gap-1"
                    aria-hidden
                  >
                    <div className="sr-only">
                      {r.rating ?? 5} out of 5 stars
                    </div>
                    {Array.from({ length: r.rating ?? 5 }).map((_, k) => (
                      <svg
                        key={k}
                        className="h-4 w-4 md:h-5 md:w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <blockquote className="mt-4 text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
                  {r.quote ??
                    "Excellent collaboration — highly recommended by our team."}
                </blockquote>

                <div className="mt-6 flex items-center gap-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/3 text-xs text-white/90">
                    Verified client
                  </span>
                  <span className="text-xs text-white/60">
                    — Trusted partner
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 md:w-36"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.92), rgba(0,0,0,0))",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 md:w-36"
          style={{
            background:
              "linear-gradient(270deg, rgba(0,0,0,0.92), rgba(0,0,0,0))",
          }}
        />

        <style>{`
          @keyframes marquee-loop { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee-duplicate[aria-hidden] { display: contents; }
          .marquee-article { flex: 0 0 100%; min-width: 100%; }
          @media (min-width: 640px) { .marquee-article { flex: 0 0 calc((100% - 24px) / 2); min-width: 360px; } }
          @media (min-width: 1024px) { .marquee-article { flex: 0 0 calc((100% - 48px) / 3); min-width: 340px; } }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .marquee-article:hover { box-shadow: 0 22px 56px rgba(2,6,10,0.75), 0 0 18px rgba(45,212,191,0.06); border-color: rgba(45,212,191,0.28) !important; }
          .marquee-article:focus { box-shadow: 0 18px 48px rgba(2,6,10,0.75), 0 0 12px rgba(45,212,191,0.04); border-color: rgba(45,212,191,0.24) !important; }
        `}</style>
      </div>
    </div>
  );
}
