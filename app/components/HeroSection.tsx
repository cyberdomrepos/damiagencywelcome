"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TestimonialSliders from "./TestimonialSliders";
import ServicesBig from "./ServicesBig";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface HeroSectionProps {
  prefersReducedMotion?: boolean;
}

export default function HeroSection({
  prefersReducedMotion = false,
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll animations for hero media
  const { elementRef: mediaRef, isVisible: mediaVisible } = useScrollAnimation({
    delay: 200,
    threshold: 0.2,
  });

  useEffect(() => {
    const delay = prefersReducedMotion ? 0 : 100;
    const timer = setTimeout(() => setIsVisible(true), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  const visibilityClass = prefersReducedMotion
    ? "opacity-100"
    : isVisible
    ? "opacity-100 translate-y-0 scale-100"
    : "opacity-0 -translate-y-6 scale-95";

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-20 z-20">
        <div className="relative max-w-full w-full mx-auto">
          <div
            className={`mx-auto w-full text-left md:text-left ${visibilityClass} transition-all duration-700 ease-out`}
          >
            {/* Hero section: marquee (top) + left content + right decorative media */}
            {/* Top marquee removed from inside hero to reduce visual clutter and preserve heading focus. Testimonials will render below the hero. */}
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-12">
                <div className="w-full">
                  <h1
                    className="text-white font-extrabold leading-tight tracking-tight text-left md:text-left w-full text-pretty relative z-20"
                    style={{ fontSize: "clamp(2.25rem, 6.8vw, 6.5rem)" }}
                  >
                    <span
                      className="hero-word block uppercase tracking-tight leading-none w-full"
                      data-text="DESIGN"
                    >
                      DESIGN
                    </span>

                    <span
                      className="hero-word block uppercase tracking-tight leading-none w-full"
                      data-text="MUSIC"
                    >
                      MUSIC
                    </span>

                    <span
                      className="hero-word block uppercase tracking-tight leading-none w-full"
                      data-text="CODE"
                    >
                      CODE
                    </span>
                    {/* subline placed below the big word with breathing space before CTAs */}
                    <span className="block text-lg md:text-2xl lg:text-3xl font-semibold tracking-wide mt-6 mb-8 text-gray-400 uppercase">
                      - Crafted together
                    </span>
                  </h1>
                  <style>{`
                    .hero-word {
                      position: relative;
                      display: block;
                      width: 100%;
                      will-change: opacity, transform;
                      opacity: 0;
                      transform: translateY(8px);
                      animation: hero-fade 700ms ease forwards;
                      -webkit-font-smoothing: antialiased;
                      /* allow words to size large but avoid hard clipping and overflow */
                      white-space: normal;
                      overflow: visible;
                      /* responsive large sizing: grows with viewport but caps to avoid extreme clipping */
                      font-size: clamp(4rem, 20vw, 14rem);
                      line-height: 0.86;
                      letter-spacing: -0.02em;
                      z-index: 30; /* keep main text above its reflection and marquee */
                      /* subtle fade on the trailing edge of very long words to blend with background */
                      -webkit-mask-image: linear-gradient(to right, black 0%, black 88%, transparent 100%);
                      mask-image: linear-gradient(to right, black 0%, black 88%, transparent 100%);
                    }
                    .hero-word:nth-of-type(1) { animation-delay: 0s; }
                    .hero-word:nth-of-type(2) { animation-delay: 0.08s; }
                    .hero-word:nth-of-type(3) { animation-delay: 0.16s; }
                      /* softer separation: subtle text shadow for depth */
                      .hero-word { text-shadow: 0 10px 30px rgba(0,0,0,0.6); }
                      /* marquee top fade - mask to blend marquee into hero smoothly */
                      .marquee-blend-wrapper { position: relative; width: 100%; margin: 0 auto; }
                      .marquee-blend {
                        -webkit-mask-image: linear-gradient(to top, transparent 0%, black 28%);
                        mask-image: linear-gradient(to top, transparent 0%, black 28%);
                        /* ensure mask doesn't clip scrolling performance */
                        -webkit-mask-repeat: no-repeat;
                        mask-repeat: no-repeat;
                      }
                      @media (min-width: 768px) {
                        .marquee-blend { -webkit-mask-image: linear-gradient(to top, transparent 0%, black 36%); mask-image: linear-gradient(to top, transparent 0%, black 36%); }
                      }
                      /* reflection removed - ::after pseudo-element intentionally deleted */
                    @keyframes hero-fade {
                      to { opacity: 1; transform: translateY(0); }
                    }
                    /* reflection removed */
                  `}</style>

                  <div className="mt-12 flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-start md:justify-start">
                    <a
                      href="#quote"
                      aria-label="Request a quote"
                      className="inline-flex items-center gap-4 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white text-black font-semibold text-base sm:text-lg shadow-sm cta-lift cta-bordered w-full sm:w-auto justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                    >
                      Request a quote
                    </a>

                    <a
                      href="#about"
                      className="inline-flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 rounded-lg bg-zinc-800 text-white font-semibold text-base sm:text-lg shadow-sm transition transform hover:-translate-y-1 hover:shadow-lg hover:bg-zinc-700 w-full sm:w-auto justify-center"
                      aria-label="Learn more about DamiAgency"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-9-3a1 1 0 112 0v1a1 1 0 11-2 0V7zm2 4a1 1 0 10-2 0v3a1 1 0 002 0v-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>About Us</span>
                    </a>
                  </div>

                  <div className="mt-8 sm:mt-10 flex items-stretch gap-3 sm:gap-4">
                    {/* subtle vertical divider on md+ */}
                    <span className="hidden md:block w-px rounded bg-white/12" />
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mx-0 md:mx-0">
                      DamiAgency designs and ships websites, merch, and original
                      soundtracks for indie artists and small teams. We deliver
                      scoped work quickly with clear, fixed-price estimates,
                      accessible UI, and production-ready assets (SVGs, layered
                      source files, and stems). Handoffs include documentation
                      so your team can continue building after launch.
                    </p>
                  </div>

                  {/* Trust strip */}
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start justify-start md:justify-start gap-3 text-xs sm:text-sm text-white/80">
                    <div className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-300/90" />
                      <span>Typical 7‑day turnaround for scoped projects</span>
                    </div>
                    <div className="hidden sm:block h-4 w-px bg-white/15" />
                    <div className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-300/90" />
                      <span>
                        Portfolio across Web • Merch • OST — samples on request
                      </span>
                    </div>
                    <div className="hidden sm:block h-4 w-px bg-white/15" />
                    <div className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-300/90" />
                      <span>
                        Clear scopes and a transparent revision policy
                      </span>
                    </div>
                    <div className="hidden sm:block h-4 w-px bg-white/15" />
                    <div className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-300/90" />
                      <span>Fast replies — typically within 24–48 hours</span>
                    </div>
                    <div className="hidden sm:block h-4 w-px bg-white/15" />
                    <div className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-300/90" />
                      <span>Free estimate and initial consultation</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 relative hidden md:block" />
            </div>
          </div>

          {/* Hero decorative media below the hero, aligned right on md+ screens */}
          <div
            ref={mediaRef as React.RefObject<HTMLDivElement>}
            className={`hidden md:flex md:mt-20 items-center justify-end transition-all duration-1000 ${
              mediaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="w-[360px] h-[220px] md:w-[560px] md:h-[350px] lg:w-[720px] lg:h-[450px] xl:w-[880px] xl:h-[550px]">
              <div className="relative group w-full h-full">
                {/* stronger static border */}
                <div className="absolute inset-0 rounded-lg border-2 border-white/20 pointer-events-none" />

                {/* stronger gradient glow that fades in on hover */}
                <div className="absolute -inset-3 rounded-lg bg-linear-to-r from-teal-400/20 to-indigo-400/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60 pointer-events-none" />

                {/* image with stronger hover transform + subtle ring */}
                <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl transition-all duration-500 group-hover:shadow-2xl">
                  <Image
                    src="/images/hero-media.jpeg"
                    alt="Showcase"
                    width={880}
                    height={550}
                    priority
                    unoptimized
                    onError={(e) => {
                      // eslint-disable-next-line no-console
                      console.warn("Hero image failed to load:", e);
                    }}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-4 group-hover:rotate-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials moved below the hero for clearer hierarchy */}
      <div className="w-full px-4 sm:px-6">
        <div className="mx-auto w-full max-w-[1200px] mb-8 sm:mb-10">
          <TestimonialSliders
            className="marquee-blend transform md:translate-y-1 lg:translate-y-2 relative z-10"
            items={[
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
                name: "Miles Carter",
                quote:
                  "They brought fresh ideas and clear rationale for every design decision.",
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
            ]}
          />
        </div>
      </div>

      <ServicesBig />
    </>
  );
}
