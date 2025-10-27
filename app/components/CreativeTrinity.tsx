"use client";

import { useEffect, useState } from "react";
import GradientUnderline from "./GradientUnderline";

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

  useEffect(() => {
    const delay = prefersReducedMotion ? 0 : 100;
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* Hero Content */}
      <div
        className={`text-center max-w-6xl mx-auto ${
          prefersReducedMotion
            ? "opacity-100"
            : `transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`
        }`}
      >
        {/* Welcome Section */}
        <h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 text-center"
          style={{
            fontFamily:
              '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
          }}
        >
          Welcome to <span className="font-bold text-cyan-400">DamiAgency</span>
        </h1>

        <GradientUnderline className="mt-8 md:mt-10 mb-8" />

        {/* Punchline */}
        <p
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-6 font-light leading-relaxed text-center"
          style={{
            fontFamily:
              '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
          }}
        >
          We blend code, design & sound
        </p>

        {/* What we do */}
        <p
          className="text-sm sm:text-base md:text-lg text-gray-400 mb-20 font-light max-w-3xl mx-auto leading-relaxed text-center px-4"
          style={{
            fontFamily:
              '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
          }}
        >
          Fresh studio. Proven skills. Ready to make your vision reality.
        </p>

        {/* Service Cards - Dark Glassy Minimal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-16 px-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-black/30 backdrop-blur-md border border-white/10 rounded-lg p-6 sm:p-8 
                         transition-all duration-700 hover:bg-black/40 hover:border-white/20 hover:shadow-2xl text-center
                         ${
                           prefersReducedMotion
                             ? "opacity-100"
                             : isVisible
                             ? "opacity-100 translate-y-0"
                             : "opacity-0 translate-y-12"
                         }`}
              style={{
                transitionDelay: prefersReducedMotion
                  ? "0ms"
                  : `${index * 200}ms`,
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Glass overlay effect */}
              <div className="absolute inset-0 rounded-lg bg-linear-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Service Title */}
                <h3
                  className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-4 tracking-wide text-center"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  {service.title}
                </h3>

                {/* Service Description */}
                <p
                  className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 leading-relaxed font-light text-center"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  {service.description}
                </p>

                {/* Service Details */}
                <p
                  className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light text-center"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  {service.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div
          className={`${
            prefersReducedMotion
              ? "opacity-100"
              : `transition-all duration-1000 delay-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`
          }`}
        >
          <button
            className="group relative px-10 py-4 bg-black/40 backdrop-blur-md border border-cyan-400/30 rounded-lg text-white font-light text-lg overflow-hidden transition-all duration-500 hover:border-cyan-400/60 hover:bg-black/50 hover:shadow-xl"
            style={{
              fontFamily:
                '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            }}
          >
            <span className="relative z-10">Start Your Project</span>
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
