"use client";

import { useState, useRef, MouseEvent } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  isVisible: boolean;
  prefersReducedMotion: boolean;
}

export default function ServiceCard({
  service,
  index,
  isVisible,
  prefersReducedMotion,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / centerY;
    const rotateY = (centerX - x) / centerX;

    // More subtle 3D effect (reduced from 15 to 5 degrees max)
    setMousePosition({ x: rotateY * 5, y: rotateX * 5 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const cardStyle = prefersReducedMotion
    ? {}
    : {
        transform: `perspective(1000px) rotateX(${
          mousePosition.y
        }deg) rotateY(${mousePosition.x}deg) translateZ(${
          isHovered ? "8px" : "0px"
        })`,
        transformStyle: "preserve-3d" as const,
      };

  return (
    <div
      ref={cardRef}
      className={`group relative cursor-pointer select-none
                 ${
                   prefersReducedMotion
                     ? "opacity-100"
                     : isVisible
                     ? "opacity-100 translate-y-0"
                     : "opacity-0 translate-y-12"
                 }`}
      style={{
        transitionDelay: prefersReducedMotion ? "0ms" : `${index * 200}ms`,
        transition: prefersReducedMotion
          ? "none"
          : "opacity 0.7s, transform 0.7s",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Minimal Dark Tech Premium Card - Mobile Optimized */}
      <div
        className="relative overflow-hidden rounded-sm h-64 sm:h-72 w-full group cursor-pointer border border-gray-800/40 mx-auto"
        style={{
          ...cardStyle,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(12px)",
          transition: prefersReducedMotion
            ? "all 0.3s ease"
            : "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.1s ease-out",
        }}
      >
        {/* Subtle Premium Border Glow */}
        <div
          className="absolute inset-0 rounded-sm border border-cyan-400/0 group-hover:border-cyan-400/20 
                        transition-all duration-700 bg-linear-to-br from-cyan-400/0 to-cyan-400/0 
                        group-hover:from-cyan-400/5 group-hover:to-transparent"
        ></div>

        {/* Content Layout - Mobile Optimized */}
        <div
          className="relative h-full flex flex-col justify-between p-4 sm:p-6 text-left"
          style={{
            transform: prefersReducedMotion ? "none" : "translateZ(10px)",
          }}
        >
          {/* Top Section - Service Title - Mobile Optimized */}
          <div>
            <h3
              className="text-xl sm:text-2xl font-medium text-white mb-3 sm:mb-4 tracking-tight
                          group-hover:text-cyan-400 transition-colors duration-700"
              style={{
                fontFamily:
                  '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
              }}
            >
              {service.title}
            </h3>

            <p
              className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed font-light
                         group-hover:text-gray-200 transition-colors duration-700"
              style={{
                fontFamily:
                  '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
              }}
            >
              {service.description}
            </p>
          </div>

          {/* Bottom Section - Service Details & Button - Mobile Optimized */}
          <div>
            <p
              className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light mb-3 sm:mb-4
                         group-hover:text-gray-400 transition-all duration-700"
              style={{
                fontFamily:
                  '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
              }}
            >
              {service.details}
            </p>

            {/* Premium See More Button - Mobile Optimized */}
            <button
              className="transition-all duration-500 ease-out w-full sm:w-auto
                         text-xs text-gray-400 hover:text-cyan-400 font-medium
                         border border-gray-700/60 hover:border-cyan-400/40 rounded-sm
                         px-4 py-2.5 sm:py-2 bg-black/60 hover:bg-cyan-400/10
                         tracking-wide uppercase shadow-sm hover:shadow-cyan-400/20
                         text-center"
              style={{
                fontFamily:
                  '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
              }}
            >
              See More
              <span className="inline-block ml-2 transform hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Premium Hover Shadow */}
        <div
          className="absolute -inset-0.5 bg-linear-to-br from-cyan-400/0 to-cyan-400/0 
                        group-hover:from-cyan-400/10 group-hover:to-transparent rounded-sm -z-10
                        opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"
        ></div>
      </div>
    </div>
  );
}
