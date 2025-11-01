"use client";

import { useEffect, useState } from "react";
import GradientUnderline from "./GradientUnderline";
import ServiceCard from "./ServiceCard"; 
import { useStaggeredScrollAnimation } from "../hooks/useScrollAnimation";

interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
}

const services: Service[] = [
  {
    id: "design",
    title: "Design",
    description: "Visual identity and interface design",
    details:
      "Brand systems, digital interfaces, and visual communications that connect with your audience",
  },
  {
    id: "music",
    title: "Music",
    description: "Original compositions and sound design",
    details:
      "Custom soundtracks, audio branding, and sonic experiences tailored to your project",
  },
  {
    id: "code",
    title: "Code",
    description: "Web development and digital solutions",
    details:
      "Modern web applications, performance optimization, and scalable digital architecture",
  },
];

interface CreativeTrinityProps {
  prefersReducedMotion?: boolean;
}

export default function CreativeTrinity({
  prefersReducedMotion = false,
}: CreativeTrinityProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { elementRef: cardsRef, visibleItems: cardVisibility } =
    useStaggeredScrollAnimation(3, 200, 150);

  useEffect(() => {
    const delay = prefersReducedMotion ? 0 : 100;
    const timer = setTimeout(() => setIsVisible(true), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 z-20">
      {/* Subtle Premium Background Elements - Mobile Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Geometric Shapes - Responsive */}
        <div
          className="absolute top-1/4 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400/20 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-cyan-300/30 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-500/15 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-cyan-400/25 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
        ></div>

        {/* Subtle Grid Overlay - Responsive */}
        <div
          className="absolute inset-0 opacity-[0.015] sm:opacity-[0.02]"
          style={{
            backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Premium Corner Accents - Responsive */}
        <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-l border-t border-cyan-400/10"></div>
        <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-r border-t border-cyan-400/10"></div>
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-l border-b border-cyan-400/10"></div>
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-r border-b border-cyan-400/10"></div>
      </div>

      {/* Hero Content - Mobile Optimized */}
      <div className="text-center max-w-6xl mx-auto relative z-10">
        {/* Bold Eye-Catching Headline - Mobile Responsive */}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black tracking-tight text-white mb-6 sm:mb-8 text-center leading-tight
                     ${prefersReducedMotion ? "opacity-100" : "hero-text"}`}
          style={{
            fontFamily:
              '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            textShadow:
              "0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.2)",
          }}
        >
          <span className="block sm:inline">Welcome to </span>
          <span className="text-cyan-400 font-extrabold glow-cyan">Dami</span>
          <span className="text-white font-normal">Agency</span>
        </h1>

        {/* Gradient Underline - Mobile Responsive */}
        <div
          className={`${
            prefersReducedMotion ? "opacity-100" : "hero-text hero-text-delay-1"
          }`}
        >
          <GradientUnderline className="mb-6 sm:mb-8" />
        </div>

        {/* Smaller Catchy Subheadline - Mobile Responsive */}
        <h2
          className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-300 mb-6 sm:mb-8 text-center leading-relaxed px-4 sm:px-0
                     ${
                       prefersReducedMotion
                         ? "opacity-100"
                         : "hero-text hero-text-delay-2"
                     }`}
          style={{
            fontFamily:
              '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
          }}
        >
          We blend code, design & sound
        </h2>

        {/* Professional Description with Premium Styling - Mobile Optimized */}
        <div className="relative mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 px-4 sm:px-0">
          <p
            className={`text-sm sm:text-base md:text-lg text-gray-400 font-light text-center max-w-2xl mx-auto leading-relaxed
                       ${
                         prefersReducedMotion
                           ? "opacity-100"
                           : "hero-text hero-text-delay-3"
                       }`}
            style={{
              fontFamily:
                '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            }}
          >
            Fresh studio. Proven skills. Ready to make your vision reality.
          </p>

          {/* Subtle accent lines - Hidden on mobile */}
          <div className="hidden sm:block absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-6 sm:h-8 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"></div>
          <div className="hidden sm:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-1 h-6 sm:h-8 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"></div>
        </div>

        {/* Minimal Dark Tech Service Cards - Mobile Responsive */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28 px-2 sm:px-4"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`${
                prefersReducedMotion
                  ? "opacity-100"
                  : cardVisibility[index]
                  ? "scale-in visible animate-delay-1"
                  : "scale-in"
              }`}
            >
              <ServiceCard
                service={service}
                index={index}
                isVisible={cardVisibility[index] || prefersReducedMotion}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          ))}
        </div>

        {/* Premium Dual CTA Strategy - Mobile Optimized */}
        <div
          className={`${prefersReducedMotion ? "opacity-100" : "fade-in"} ${
            isVisible ? "visible" : ""
          } flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4`}
        >
          {/* Primary CTA - Mobile Responsive */}
          <button
            className="group relative px-6 sm:px-8 py-3 sm:py-4 text-white font-medium text-sm sm:text-base overflow-hidden 
                       transition-all duration-500 ease-out 
                       border border-cyan-400/40 hover:border-cyan-400/60 rounded-sm
                       bg-black/40 hover:bg-cyan-400/10 
                       backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-400/20 w-full sm:w-auto"
            style={{
              fontFamily:
                '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            }}
          >
            <span className="relative z-10 tracking-wide">Get Free Quote</span>
          </button>

          {/* Secondary CTA - Mobile Responsive */}
          <button
            className="group relative px-6 sm:px-8 py-3 sm:py-4 text-gray-400 hover:text-gray-200 font-light text-sm sm:text-base 
                       transition-all duration-500 ease-out 
                       border border-gray-700/40 hover:border-gray-600/60 rounded-sm
                       bg-transparent hover:bg-gray-800/20 backdrop-blur-sm w-full sm:w-auto"
            style={{
              fontFamily:
                '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            }}
          >
            <span className="relative z-10 tracking-wide">View Portfolio</span>
          </button>
        </div>

        {/* Enhanced Premium Stats Bar - Mobile Optimized */}
        <div
          className={`mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-12 relative px-4 sm:px-0
                     ${
                       prefersReducedMotion
                         ? "opacity-100"
                         : "hero-text hero-text-delay-5"
                     }`}
        >
          {/* Premium border with gradient - Responsive */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>

          <div
            className="flex flex-wrap justify-center gap-8 sm:gap-12 text-center"
            style={{
              fontFamily:
                '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            }}
          >
            <div className="flex flex-col relative group min-w-0 flex-shrink-0">
              <span className="text-xl sm:text-2xl font-bold text-cyan-400 mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                1k+
              </span>
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 whitespace-nowrap">
                Designs Created
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-px bg-cyan-400/50 group-hover:w-full transition-all duration-500"></div>
            </div>
            <div className="flex flex-col relative group min-w-0 flex-shrink-0">
              <span className="text-xl sm:text-2xl font-bold text-cyan-400 mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                500+
              </span>
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 whitespace-nowrap">
                Game Soundtracks
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-px bg-cyan-400/50 group-hover:w-full transition-all duration-500"></div>
            </div>
            <div className="flex flex-col relative group min-w-0 flex-shrink-0">
              <span className="text-xl sm:text-2xl font-bold text-cyan-400 mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                15+
              </span>
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 whitespace-nowrap">
                Web Apps Built
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-px bg-cyan-400/50 group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>

          {/* Subtle accent dots - Hidden on mobile */}
          <div className="hidden sm:block absolute top-6 left-1/4 w-1 h-1 bg-cyan-400/20 rounded-full"></div>
          <div className="hidden sm:block absolute top-6 right-1/4 w-1 h-1 bg-cyan-400/20 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
