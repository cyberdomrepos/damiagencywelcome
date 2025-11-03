"use client";

import React from "react";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="mt-20 sm:mt-32 md:mt-40 lg:mt-56 py-12 sm:py-16 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 items-stretch">
          <div className="md:col-span-5 text-left flex flex-col">
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-extrabold text-white leading-tight">
              <span className="block">About us.</span>
              <span className="block text-teal-300 text-lg sm:text-xl md:text-2xl font-medium mt-2 sm:mt-3">
                Design, code, and sound — crafted together
              </span>
            </h2>

            <div className="mt-4 sm:mt-6 pr-3 sm:pr-4 md:pr-8 border-r border-white/10 max-w-xl mr-auto h-full flex flex-col">
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                We are a multidisciplinary studio that blends product design,
                software engineering, and original audio to build cohesive
                digital experiences. From brand systems and UI to performant
                React + Next apps and bespoke soundtracks — we design with
                accessibility, performance, and clarity in mind.
              </p>

              <p className="mt-3 sm:mt-4 text-sm md:text-base text-gray-300 leading-relaxed">
                Our process is pragmatic and collaborative: we prototype fast,
                validate with users, and ship iteratively. We partner closely
                with teams to establish reusable systems, reliable pipelines,
                and measurable performance budgets so your product can evolve
                confidently.
              </p>

              <p className="mt-3 sm:mt-4 text-sm md:text-base text-gray-300 leading-relaxed">
                Whether you need a refreshed brand, an accessible web
                experience, or an original soundtrack, we bring a compact team
                of designers, engineers, and composers to turn ideas into
                polished products that feel as good as they function.
              </p>
            </div>
          </div>

          <div className="md:col-span-7 flex items-stretch justify-start md:justify-end">
            <div className="w-full md:w-[720px] bg-linear-to-br from-orange-500/95 via-rose-600/90 to-fuchsia-600/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 lg:p-20 shadow-lg ring-1 ring-black/20 text-white h-full flex flex-col justify-between">
              <div className="max-w-176 text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight">
                  Process & expertise
                </h3>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/90">
                  We combine design systems, engineering, and crafted audio to
                  deliver polished products. We partner with teams to prototype
                  quickly, set measurable goals, and ship reliable experiences.
                </p>
              </div>
              <ul className="mt-8 sm:mt-10 md:mt-12 space-y-6 sm:space-y-8">
                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="flex-none w-8 h-8 sm:w-10 sm:h-10 bg-white/6 rounded-lg flex items-center justify-center">
                    {/* Gear / process */}
                    <svg
                      width="16"
                      height="16"
                      className="sm:w-5 sm:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09c.7 0 1.3-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82L4.3 3.7A2 2 0 0 1 7.13.87l.06.06c.5.5 1.2.6 1.82.33.6-.26 1.3-.26 1.82 0 .5.26.9.66 1.16 1.16.26.52.26 1.22 0 1.82-.27.62-.17 1.32.33 1.82l.06.06A2 2 0 0 1 20 7.13l-.06.06c-.5.5-.6 1.2-.33 1.82.26.6.66 1 1.16 1.16.52.26 1.22.26 1.82 0z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">
                      Design systems & brand
                    </div>
                    <div className="text-xs sm:text-sm text-white/85 mt-1">
                      Scalable visual languages, tokens, component libraries,
                      and accessible UI patterns — delivered as Figma libraries
                      and Storybook for repeatable, production-ready components.
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="flex-none w-8 h-8 sm:w-10 sm:h-10 bg-white/6 rounded-lg flex items-center justify-center">
                    {/* Code / engineering */}
                    <svg
                      width="16"
                      height="16"
                      className="sm:w-5 sm:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M16 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 6L2 12l6 6"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">
                      Engineering & performance
                    </div>
                    <div className="text-xs sm:text-sm text-white/85 mt-1">
                      Next.js apps, measurable performance budgets, and reliable
                      CI/CD pipelines.
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3 sm:gap-4">
                  <span className="flex-none w-8 h-8 sm:w-10 sm:h-10 bg-white/6 rounded-lg flex items-center justify-center">
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
                  <div>
                    <div className="font-semibold text-sm sm:text-base">
                      Original sound & media
                    </div>
                    <div className="text-xs sm:text-sm text-white/85 mt-1">
                      Bespoke soundtracks and sonic identity tuned for products
                      and marketing.
                    </div>
                  </div>
                </li>
              </ul>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <a
                  href="#quote"
                  className="inline-block px-5 py-2.5 rounded-md bg-white text-black font-semibold text-sm sm:text-base shadow-sm text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-500"
                  aria-label="Start a new project with us"
                >
                  Start a project
                </a>
                <a
                  href="#portfolio"
                  className="inline-block px-4 py-2 rounded-md border border-white/20 text-white/85 text-sm sm:text-base text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-500"
                  aria-label="View our portfolio of work"
                >
                  Our work
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
