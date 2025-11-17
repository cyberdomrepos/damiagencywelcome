"use client";

import React from "react";
import { useCinematicScroll } from "../hooks/useScrollAnimation";

export default function AboutUs() {
  const { elementRef: titleRef, isVisible: titleVisible } = useCinematicScroll({
    delay: 0,
  });
  const { elementRef: descRef, isVisible: descVisible } = useCinematicScroll({
    delay: 200,
  });
  const { elementRef: cardRef, isVisible: cardVisible } = useCinematicScroll({
    delay: 300,
  });
  const { elementRef: statsRef, isVisible: statsVisible } = useCinematicScroll({
    delay: 400,
  });
  const { elementRef: servicesRef, isVisible: servicesVisible } =
    useCinematicScroll({
      delay: 500,
    });
  const { elementRef: ctaRef, isVisible: ctaVisible } = useCinematicScroll({
    delay: 600,
  });

  return (
    <section
      id="about"
      className="mt-20 sm:mt-32 md:mt-40 lg:mt-56 py-12 sm:py-16 md:py-20 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-400/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <div className="text-left flex flex-col space-y-6 sm:space-y-8 pr-0 lg:pr-8 border-r-0 lg:border-r border-purple-500/20">
            <h2
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight ${
                titleVisible ? "reveal-cinematic" : "opacity-0"
              }`}
            >
              <span className="block">About us.</span>
            </h2>

            <span className="block text-purple-300 text-xl sm:text-2xl font-normal">
              Merch, music, and sound — crafted together
            </span>

            <div
              ref={descRef as React.RefObject<HTMLDivElement>}
              className={`max-w-xl space-y-5 ${
                descVisible ? "reveal-slide-left delay-200" : "opacity-0"
              }`}
            >
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                We are a multidisciplinary studio that blends product design,
                software engineering, and original audio to build timeless
                experiences for indie game developers. We partner closely with
                teams to establish reusable systems, reliable pipelines, and
                measurable performance budgets so your product can evolve
                confidently.
              </p>

              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                Whether you need a refreshed brand, an unforgettable soundtrack,
                or iconic merch, we bring a rich perspective to the projects we
                join and enjoy partnering with companies to turn ideas into
                polished products that feel as good as they function.
              </p>
            </div>
          </div>

          <div className="flex items-stretch justify-center lg:justify-end">
            <div
              ref={cardRef as React.RefObject<HTMLDivElement>}
              className={`w-full max-w-2xl bg-linear-to-br from-purple-900/95 via-fuchsia-800/90 to-purple-700/95 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl shadow-purple-900/50 ring-1 ring-purple-500/20 text-white flex flex-col justify-between relative overflow-hidden premium-card-hover ${
                cardVisible ? "reveal-scale-rotate delay-300" : "opacity-0"
              }`}
            >
              {/* Card decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-300/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="text-left relative z-10 space-y-6">
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                  Process & expertise
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                  We combine design systems, engineering, and crafted audio to
                  deliver polished products. We partner with teams to prototype
                  quickly, set measurable goals, and ship reliable experiences.
                </p>
              </div>

              <ul className="mt-10 sm:mt-12 space-y-6 relative z-10">
                <li className="flex items-start gap-4 group">
                  <span className="flex-none w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300 ring-1 ring-white/30">
                    {/* Design icon */}
                    <svg
                      width="16"
                      height="16"
                      className="sm:w-5 sm:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M12 2L2 7l10 5 10-5-10-5z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 17l10 5 10-5M2 12l10 5 10-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold text-base sm:text-lg text-white mb-1">
                      Design systems & brand
                    </div>
                    <div className="text-sm sm:text-base text-white/70">
                      Scalable visual languages and component libraries.
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <span className="flex-none w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300 ring-1 ring-white/30">
                    {/* Audio / sound */}
                    <svg
                      width="16"
                      height="16"
                      className="sm:w-5 sm:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M9 18V6l6-2v14l-6-2z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 5a4 4 0 0 1 0 14"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold text-base sm:text-lg text-white mb-1">
                      Original sound & media
                    </div>
                    <div className="text-sm sm:text-base text-white/70">
                      Bespoke soundtracks and sonic identity for your game.
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-10 flex flex-wrap gap-4 items-center relative z-10">
                <a
                  href="#quote"
                  aria-label="Get a quote and start a project with us"
                  className="px-6 py-3 rounded-lg bg-white text-purple-900 font-semibold text-base shadow-xl shadow-purple-900/30 text-center hover:bg-gray-50 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Start a project
                </a>
                <a
                  href="#portfolio"
                  aria-label="View our portfolio and past work"
                  className="px-6 py-3 rounded-lg border-2 border-white/40 backdrop-blur-sm text-white font-medium text-base text-center hover:bg-white/15 hover:border-white/60 transition-all duration-300"
                >
                  Our work
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className={`mt-16 sm:mt-20 md:mt-24 ${
            statsVisible ? "reveal-slide-left delay-100" : "opacity-0"
          }`}
        >
          <div className="text-center mb-12">
            <p className="text-base sm:text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
              Trusted by indie studios and growing teams worldwide. We deliver
              production-ready assets, from initial concept to final
              implementation, with a focus on performance, accessibility, and
              long-term maintainability.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                50+
              </div>
              <div className="text-sm sm:text-base text-purple-300">
                Shipped projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                98%
              </div>
              <div className="text-sm sm:text-base text-purple-300">
                Client retention
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                15+
              </div>
              <div className="text-sm sm:text-base text-purple-300">
                Countries served
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                5yr
              </div>
              <div className="text-sm sm:text-base text-purple-300">
                Industry experience
              </div>
            </div>
          </div>
        </div>

        {/* Industry Focus Section */}
        <div
          ref={servicesRef as React.RefObject<HTMLDivElement>}
          className={`mt-12 sm:mt-14 ${
            servicesVisible ? "reveal-cinematic delay-200" : "opacity-0"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-5 text-center">
              What we specialize in
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                <div className="text-purple-300 font-semibold mb-2 text-base">
                  Visual Identity
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li>• Logo & brand guidelines</li>
                  <li>• UI/UX design systems</li>
                  <li>• Icon libraries & assets</li>
                  <li>• Marketing materials</li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                <div className="text-purple-300 font-semibold mb-2 text-base">
                  Audio Production
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li>• Original soundtracks</li>
                  <li>• Sound effects & ambience</li>
                  <li>• Voice-over direction</li>
                  <li>• Audio middleware setup</li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                <div className="text-purple-300 font-semibold mb-2 text-base">
                  Physical Products
                </div>
                <ul className="space-y-1.5 text-xs text-white/70">
                  <li>• Apparel & merchandise</li>
                  <li>• Collector&apos;s editions</li>
                  <li>• Packaging design</li>
                  <li>• Print production</li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-white/10">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3">
                Professional workflow & support
              </h4>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs text-white/70">
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Milestone-based delivery
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Transparent pricing
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  NDAs & contracts
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Revision rounds included
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Source file delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Client Types & CTA Section */}
        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className={`mt-16 sm:mt-20 text-center ${
            ctaVisible ? "reveal-scale-rotate delay-300" : "opacity-0"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-4">
              Who we work with
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-linear-to-br from-purple-900/40 to-purple-800/20 rounded-xl p-3 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                <div className="w-10 h-10 mx-auto mb-2 text-purple-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-xs font-medium text-white">
                  Indie studios
                </div>
              </div>
              <div className="bg-linear-to-br from-purple-900/40 to-purple-800/20 rounded-xl p-3 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                <div className="w-10 h-10 mx-auto mb-2 text-purple-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17l10 5 10-5M2 12l10 5 10-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-xs font-medium text-white">Startups</div>
              </div>
              <div className="bg-linear-to-br from-purple-900/40 to-purple-800/20 rounded-xl p-3 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                <div className="w-10 h-10 mx-auto mb-2 text-purple-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-xs font-medium text-white">Publishers</div>
              </div>
              <div className="bg-linear-to-br from-purple-900/40 to-purple-800/20 rounded-xl p-3 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                <div className="w-10 h-10 mx-auto mb-2 text-purple-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="7"
                      r="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-xs font-medium text-white">Solo devs</div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-white/70 max-w-3xl mx-auto leading-relaxed">
              From pre-production concept art to launch-ready assets, we adapt
              to your workflow and timeline. Schedule a free consultation to
              discuss your project scope, budget, and delivery milestones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
