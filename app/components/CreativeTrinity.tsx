"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Marquee3D from "./Marquee3D";
import ServicesBig from "./ServicesBig";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface CreativeTrinityProps {
  prefersReducedMotion?: boolean;
}

export default function CreativeTrinity({
  prefersReducedMotion = false,
}: CreativeTrinityProps) {
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
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-20 sm:py-32 z-20">
        <div className="relative max-w-6xl w-full mx-auto">
          <div
            className={`mx-auto w-full text-center md:text-left ${visibilityClass} transition-all duration-700 ease-out`}
          >
            {/* Hero section: marquee (top) + left content + right decorative media */}
            <div className="mb-8 sm:mb-12 flex justify-center">
              <Marquee3D
                items={[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "Python",
                  "PostgreSQL",
                  "AWS",
                  "Docker",
                  "Kubernetes",
                  "GraphQL",
                  "REST APIs",
                  "MongoDB",
                  "Redis",
                  "Tailwind CSS",
                  "Three.js",
                  "Framer Motion",
                  "Figma",
                  "Adobe Creative Suite",
                  "Blender",
                  "Logic Pro",
                  "Pro Tools",
                ]}
                speed={60}
                className="w-full max-w-full"
              />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-12">
                <div className="w-full">
                  <h1
                    className="text-white font-extrabold leading-tight tracking-tight text-center md:text-left w-full"
                    style={{ fontSize: "clamp(2.5rem, 8.5vw, 9rem)" }}
                  >
                    <span className="block">Build fast.</span>
                    <span className="block">
                      Look{" "}
                      <span
                        className="bg-clip-text text-transparent"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, rgba(139,92,246,0.98) 0%, rgba(236,72,153,0.98) 100%)",
                        }}
                      >
                        premium
                      </span>
                      .
                    </span>
                  </h1>

                  <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-center md:justify-start">
                    <a
                      href="#quote"
                      className="inline-flex items-center gap-4 px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-white text-black font-semibold text-lg sm:text-2xl shadow-sm cta-lift w-full sm:w-auto justify-center"
                    >
                      Contact Us
                    </a>

                    <a
                      href="#about"
                      className="inline-flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 rounded-lg bg-zinc-800 text-white font-semibold text-base sm:text-lg shadow-sm transition transform hover:-translate-y-1 hover:shadow-lg hover:bg-zinc-700 w-full sm:w-auto justify-center"
                      aria-label="About us"
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

                  <div className="mt-6 sm:mt-8 flex items-stretch gap-3 sm:gap-4">
                    {/* subtle vertical divider on md+ */}
                    <span className="hidden md:block w-px rounded bg-white/12" />
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
                      DamiAgency builds clean websites, sharp merch graphics,
                      and original soundtracks for indie teams and creators. We
                      work fast with clear scopes, accessible UI, and
                      print-ready assets. Everything ships tidy—components,
                      vectors, stems—so you can keep building without us.
                    </p>
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
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
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
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-4 group-hover:rotate-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ServicesBig />
    </>
  );
}
