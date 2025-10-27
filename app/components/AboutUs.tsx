"use client";

import { useEffect, useState, useRef } from "react";
import GradientUnderline from "./GradientUnderline";

interface AboutUsProps {
  prefersReducedMotion?: boolean;
}

export default function AboutUs({
  prefersReducedMotion = false,
}: AboutUsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger content animation (instant if reduced motion)
          const delay = prefersReducedMotion ? 0 : 400;
          setTimeout(() => setAnimateContent(true), delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);
  return (
    <section ref={sectionRef} id="about" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section title outside the box */}
        <div
          className={`text-center mb-16 md:mb-20 ${
            prefersReducedMotion
              ? "opacity-100"
              : `transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`
          }`}
        >
          <h2
            id="about-title"
            className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-100 leading-tight text-balance drop-shadow-[0_12px_36px_rgba(0,0,0,0.55)]"
            style={{
              fontFamily:
                '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            }}
          >
            About Us
          </h2>
          <GradientUnderline className="mx-auto mt-8 md:mt-10" />
        </div>

        {/* Dark glassy container matching hero style */}
        <div
          className={`relative bg-black/30 backdrop-blur-md border border-white/10 rounded-lg p-8 md:p-12 hover:bg-black/40 hover:border-white/20 hover:shadow-2xl transition-all duration-700 ${
            prefersReducedMotion
              ? "opacity-100"
              : isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-95"
          }`}
          style={{
            backdropFilter: "blur(12px)",
            transitionDelay: prefersReducedMotion
              ? "0ms"
              : isVisible
              ? "200ms"
              : "0ms",
          }}
        >
          {/* Glass overlay effect */}
          <div className="absolute inset-0 rounded-lg bg-linear-to-br from-white/2 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Simplified CSS animations */}
          <style jsx>{`
            @keyframes aurora-float {
              0%,
              100% {
                transform: translateX(-50%) translateY(0px);
                opacity: 0.6;
              }
              50% {
                transform: translateX(-50%) translateY(-20px);
                opacity: 0.4;
              }
            }
          `}</style>

          <div className="relative z-10">
            {/* Content grid with left/right alignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
              {/* Who we are - Center on mobile, left on desktop */}
              <div
                className={`space-y-6 text-center md:text-left ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : `transition-all duration-800 ${
                        animateContent
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-8"
                      }`
                }`}
                style={{
                  transitionDelay: prefersReducedMotion
                    ? "0ms"
                    : animateContent
                    ? "0ms"
                    : "0ms",
                }}
              >
                <h3
                  className="text-xl underline decoration-cyan-400/30 font-light text-white tracking-wide"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  Who We Are
                </h3>
                <p
                  className="text-white/70 text-sm leading-relaxed font-light"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  We are a creative studio blending design, development and
                  sound into cohesive digital experiences. Our work focuses on
                  clarity, craftsmanship and purpose.
                </p>
                <p
                  className="text-white/60 text-sm leading-relaxed font-light"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  We approach each project with care: simple solutions, careful
                  engineering, and thoughtful visual language.
                </p>
              </div>

              {/* What we do - Center on mobile, right on desktop */}
              <div
                className={`space-y-6 text-center md:text-right ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : `transition-all duration-800 ${
                        animateContent
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-8"
                      }`
                }`}
                style={{
                  transitionDelay: prefersReducedMotion
                    ? "0ms"
                    : animateContent
                    ? "200ms"
                    : "0ms",
                }}
              >
                <h3
                  className="text-xl underline decoration-cyan-400/30 font-light text-white tracking-wide"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  What We Do
                </h3>
                <ul className="space-y-3">
                  {[
                    "Web Design & Development",
                    "Brand Identity & Visual Systems",
                    "Audio Design & Integration",
                    "Digital Strategy & Consulting",
                  ].map((item, index) => (
                    <li
                      key={item}
                      className={`text-white/70 text-sm font-light ${
                        prefersReducedMotion
                          ? "opacity-100"
                          : `transition-all duration-600 ${
                              animateContent
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                            }`
                      }`}
                      style={{
                        fontFamily:
                          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                        transitionDelay: prefersReducedMotion
                          ? "0ms"
                          : animateContent
                          ? `${400 + index * 100}ms`
                          : "0ms",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mission statement */}
            <div
              className={`mt-12 md:mt-16 pt-8 border-t border-white/5 text-center ${
                prefersReducedMotion
                  ? "opacity-100"
                  : `transition-all duration-1000 ${
                      animateContent
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`
              }`}
              style={{
                transitionDelay: prefersReducedMotion
                  ? "0ms"
                  : animateContent
                  ? "800ms"
                  : "0ms",
              }}
            >
              <p
                className="text-white/80 text-base leading-relaxed font-light max-w-2xl mx-auto"
                style={{
                  fontFamily:
                    '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                }}
              >
                Our mission is simple: create digital experiences that are
                beautiful, functional, and memorable. We believe in the power of
                thoughtful design and clean code to transform ideas into
                reality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
