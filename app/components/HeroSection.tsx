"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TestimonialSliders from "./TestimonialSliders";
import ServicesBig from "./ServicesBig";
import {
  useScrollAnimation,
  useCinematicScroll,
  useMagneticHover,
} from "../hooks/useScrollAnimation";

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
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 z-20">
        <div className="relative max-w-screen-2xl w-full mx-auto">
          <div
            className={`mx-auto w-full text-center ${visibilityClass} transition-all duration-700 ease-out`}
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-12">
                <div className="w-full">
                  <h1
                    className="text-white font-extrabold leading-tight tracking-tight w-full text-pretty relative z-20"
                    style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}
                  >
                    <span
                      className="hero-main hero-gradient block mb-3 uppercase hero-word-1"
                      aria-hidden
                    >
                      PREMIUM
                    </span>

                    <span
                      className="hero-main block uppercase tracking-tight leading-none w-full hero-word-2"
                      data-text="EXPERIENCES"
                    >
                      EXPERIENCES
                    </span>

                    <span
                      className="hero-main block uppercase tracking-tight leading-none w-full hero-word-3"
                      data-text="REDEFINED"
                    >
                      REDEFINED
                    </span>
                  </h1>
                  <style>{`

                    /* Main stacked words with enhanced animation */
                    .hero-main {
                      position: relative;
                      display: block;
                      width: 100%;
                      will-change: opacity, transform, filter;
                      opacity: 0;
                      transform: translateY(40px) scale(0.95);
                      filter: blur(8px);
                      animation: hero-cinematic-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                      -webkit-font-smoothing: antialiased;
                      font-size: clamp(3rem, 14vw, 10rem);
                      line-height: 0.9;
                      letter-spacing: -0.02em;
                      z-index: 30;
                      color: #fff;
                      text-shadow: 0 8px 20px rgba(0,0,0,0.44);
                    }
                    
                    /* Staggered delays for each word */
                    .hero-word-1 { animation-delay: 0.1s; }
                    .hero-word-2 { animation-delay: 0.35s; }
                    .hero-word-3 { animation-delay: 0.6s; }

                    /* Gradient applied only to PREMIUM */
                    .hero-gradient {
                      /* Logo-inspired variant tuned to favor royal purple tones:
                         soft gold anchor -> vivid purple mid -> deep royal purple end
                         This keeps warmth at the left but yields a stronger purple finish.
                      */
                      background: linear-gradient(90deg, #ffd27a 0%, #b76cff 50%, #4c1d95 100%);
                      -webkit-background-clip: text;
                      background-clip: text;
                      color: transparent;
                      -webkit-text-fill-color: transparent;
                      z-index: 40;
                      /* remove glow/border for a clean gradient */
                      text-shadow: none;
                    }

                    /* Cinematic reveal animation with blur and scale */
                    @keyframes hero-cinematic-reveal {
                      0% {
                        opacity: 0;
                        transform: translateY(40px) scale(0.95);
                        filter: blur(8px);
                      }
                      60% {
                        opacity: 0.8;
                        transform: translateY(5px) scale(0.99);
                        filter: blur(2px);
                      }
                      100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                        filter: blur(0);
                      }
                    }

                    /* Subtle hero media frame shadow (kept from earlier change) */
                    .hero-media-frame {
                      box-shadow: 0 18px 50px rgba(2,6,23,0.32), 0 6px 20px rgba(2,6,23,0.08);
                      transition: box-shadow 450ms cubic-bezier(.2,.9,.3,1), transform 450ms ease;
                    }
                    .group:hover .hero-media-frame,
                    .group:focus-within .hero-media-frame {
                      box-shadow: 0 28px 80px rgba(2,6,23,0.34), 0 8px 30px rgba(2,6,23,0.10);
                    }

                    /* marquee top fade - mask to blend marquee into hero smoothly */
                    .marquee-blend-wrapper { position: relative; width: 100%; margin: 0 auto; }
                    .marquee-blend {
                      -webkit-mask-image: linear-gradient(to top, transparent 0%, black 28%);
                      mask-image: linear-gradient(to top, transparent 0%, black 28%);
                      -webkit-mask-repeat: no-repeat;
                      mask-repeat: no-repeat;
                    }
                    @media (min-width: 768px) {
                      .marquee-blend { -webkit-mask-image: linear-gradient(to top, transparent 0%, black 36%); mask-image: linear-gradient(to top, transparent 0%, black 36%); }
                    }

                    @keyframes hero-fade {
                      to { opacity: 1; transform: translateY(0); }
                    }
                  `}</style>

                  <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
                    <a
                      href="#quote"
                      aria-label="Request a quote"
                      className="inline-flex items-center gap-2 rounded-md text-black font-semibold text-base sm:text-lg shadow-sm w-full sm:w-auto justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-black cta-hero"
                    >
                      Request a quote
                    </a>

                    <a
                      href="#about"
                      className="cta-about inline-flex items-center gap-3 rounded-md text-white font-semibold text-base sm:text-lg w-full sm:w-auto justify-center"
                      aria-label="Learn more about DamiAgency"
                    >
                      <span className="about-hero-icon" aria-hidden>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.6}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4 text-white"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      </span>
                      <span>About Us</span>
                    </a>
                  </div>

                  <div className="mt-8 sm:mt-10">
                    <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-5xl mx-auto">
                      DamiAgency designs and ships websites, merch, and original
                      soundtracks for indie artists and small teams. We deliver
                      scoped work quickly with clear, fixed-price estimates,
                      accessible UI, and production-ready assets. Handoffs
                      include documentation so your team can continue building.
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-6 max-w-4xl mx-auto text-white/90 text-sm sm:text-base">
                      <div className="flex items-center gap-3">
                        <span
                          className="h-5 w-5 flex items-center justify-center"
                          aria-hidden
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            aria-hidden
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="rgba(255,255,255,0.12)"
                              strokeWidth="1.6"
                              fill="none"
                            />
                            <path
                              d="M8.5 12.5l2 2 5-5"
                              stroke="#c084fc"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        </span>
                        <span className="font-medium text-base sm:text-lg">
                          Fast turnaround
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className="h-5 w-5 flex items-center justify-center"
                          aria-hidden
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            aria-hidden
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="rgba(255,255,255,0.12)"
                              strokeWidth="1.6"
                              fill="none"
                            />
                            <path
                              d="M8.5 12.5l2 2 5-5"
                              stroke="#c084fc"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        </span>
                        <span className="font-medium text-base sm:text-lg">
                          Professional quality
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className="h-5 w-5 flex items-center justify-center"
                          aria-hidden
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            aria-hidden
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="rgba(255,255,255,0.12)"
                              strokeWidth="1.6"
                              fill="none"
                            />
                            <path
                              d="M8.5 12.5l2 2 5-5"
                              stroke="#c084fc"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        </span>
                        <span className="font-medium text-base sm:text-lg">
                          Portfolio samples
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className="h-5 w-5 flex items-center justify-center"
                          aria-hidden
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            aria-hidden
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="rgba(255,255,255,0.12)"
                              strokeWidth="1.6"
                              fill="none"
                            />
                            <path
                              d="M8.5 12.5l2 2 5-5"
                              stroke="#c084fc"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        </span>
                        <span className="font-medium text-base sm:text-lg">
                          Clear estimates
                        </span>
                      </div>
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
            className={`hidden md:flex md:mt-12 items-center justify-center transition-all duration-1000 ${
              mediaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="w-[360px] h-[220px] md:w-[560px] md:h-[350px] lg:w-[720px] lg:h-[450px] xl:w-[880px] xl:h-[550px]">
              <div className="relative group w-full h-full">
                {/* stronger static border */}
                <div className="absolute inset-0 rounded-lg border-2 border-white/20 pointer-events-none" />

                {/* soft gradient glow behind the image (visible by default, intensifies on hover) */}
                <div className="absolute -inset-6 rounded-lg bg-linear-to-r from-purple-700/20 via-pink-500/18 to-indigo-500/18 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-90 mix-blend-screen pointer-events-none" />

                {/* image with stronger hover transform + subtle ring */}
                <div className="relative w-full h-full overflow-hidden rounded-lg hero-media-frame">
                  <Image
                    src="/images/hero-media.jpeg"
                    alt="Showcase"
                    width={880}
                    height={550}
                    priority
                    unoptimized
                    onError={(e) => {
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
        <div className="w-full mx-auto mb-8 sm:mb-10">
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
