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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 sm:py-24 md:py-32 lg:py-40 z-20">
      {/* Subtle Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Geometric Shapes */}
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/20 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300/30 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-cyan-500/15 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-cyan-400/25 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
        ></div>

        {/* Subtle Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Premium Corner Accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-cyan-400/10"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-cyan-400/10"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-cyan-400/10"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-cyan-400/10"></div>
      </div>

      {/* Hero Content */}
      <div className="text-center max-w-6xl mx-auto relative z-10">
        {/* Bold Eye-Catching Headline */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight text-white mb-8 text-center leading-tight
                     ${prefersReducedMotion ? "opacity-100" : "hero-text"}`}
          style={{
            fontFamily:
              '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            textShadow:
              "0 0 30px rgba(34, 211, 238, 0.5), 0 0 60px rgba(34, 211, 238, 0.2)",
          }}
        >
          Welcome to{" "}
          <span className="text-cyan-400 font-extrabold glow-cyan">Dami</span>
          <span className="text-white font-normal">Agency</span>
        </h1>

        {/* Gradient Underline */}
        <div
          className={`${
            prefersReducedMotion ? "opacity-100" : "hero-text hero-text-delay-1"
          }`}
        >
          <GradientUnderline className="mb-8" />
        </div>

        {/* Smaller Catchy Subheadline */}
        <h2
          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 mb-8 text-center leading-relaxed
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

        {/* Professional Description with Premium Styling */}
        <div className="relative mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <p
            className={`text-base sm:text-lg text-gray-400 font-light text-center max-w-2xl mx-auto leading-relaxed
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

          {/* Subtle accent lines */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"></div>
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"></div>
        </div>

        {/* Minimal Dark Tech Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto mb-16 sm:mb-20 md:mb-24 lg:mb-28 px-4"
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

        {/* Premium Dual CTA Strategy */}
        <div
          className={`${prefersReducedMotion ? "opacity-100" : "fade-in"} ${
            isVisible ? "visible" : ""
          } flex flex-col sm:flex-row gap-6 justify-center items-center mb-16`}
        >
          {/* Primary CTA */}
          <button
            className="group relative px-6 py-3 text-white font-medium text-base overflow-hidden 
                       transition-all duration-500 ease-out 
                       border border-cyan-400/40 hover:border-cyan-400/60 rounded-sm
                       bg-black/40 hover:bg-cyan-400/10 
                       backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-400/20"
            style={{
              fontFamily:
                '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            }}
          >
            <span className="relative z-10 tracking-wide">Get Free Quote</span>
          </button>

          {/* Secondary CTA */}
          <button
            className="group relative px-6 py-3 text-gray-400 hover:text-gray-200 font-light text-base 
                       transition-all duration-500 ease-out 
                       border border-gray-700/40 hover:border-gray-600/60 rounded-sm
                       bg-transparent hover:bg-gray-800/20 backdrop-blur-sm"
            style={{
              fontFamily:
                '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            }}
          >
            <span className="relative z-10 tracking-wide">View Portfolio</span>
          </button>
        </div>

        {/* Enhanced Premium Stats Bar */}
        <div
          className={`mt-20 pt-12 relative
                     ${
                       prefersReducedMotion
                         ? "opacity-100"
                         : "hero-text hero-text-delay-5"
                     }`}
        >
          {/* Premium border with gradient */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>

          <div
            className="flex flex-wrap justify-center gap-12 text-center"
            style={{
              fontFamily:
                '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            }}
          >
            <div className="flex flex-col relative group">
              <span className="text-2xl font-bold text-cyan-400 mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                1k+
              </span>
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                Designs Created
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-px bg-cyan-400/50 group-hover:w-full transition-all duration-500"></div>
            </div>
            <div className="flex flex-col relative group">
              <span className="text-2xl font-bold text-cyan-400 mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                500+
              </span>
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                Game Soundtracks
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-px bg-cyan-400/50 group-hover:w-full transition-all duration-500"></div>
            </div>
            <div className="flex flex-col relative group">
              <span className="text-2xl font-bold text-cyan-400 mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                15+
              </span>
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                Web Apps Built
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-px bg-cyan-400/50 group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>

          {/* Subtle accent dots */}
          <div className="absolute top-6 left-1/4 w-1 h-1 bg-cyan-400/20 rounded-full"></div>
          <div className="absolute top-6 right-1/4 w-1 h-1 bg-cyan-400/20 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
