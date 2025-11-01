"use client";

import { useEffect, useState } from "react";
import GradientUnderline from "./GradientUnderline";
import Marquee3D from "./Marquee3D";
import BrandMark from "./BrandMark";

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

    return () => {
      clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 py-32 z-20">
      <div className="relative max-w-6xl w-full mx-auto text-center">
        <div
          className={`mx-auto w-full text-center ${
            prefersReducedMotion
              ? "opacity-100"
              : isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-6 scale-95"
          } transition-all duration-700 ease-out`}
        >
          <div className="mx-auto">
            <BrandMark className="mx-auto text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] leading-[0.9] tracking-tight" />
          </div>
        </div>
        <div className="mt-15">
          <GradientUnderline />
        </div>
        <h2
          className="mx-auto mt-16 hero-subtitle"
          style={{
            fontSize: "clamp(1.8rem, 4.5vw, 3.6rem)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            transform: "scaleX(0.99)",
          }}
        >
          Your Premium Next. step
        </h2>

        <p className="mt-8 mx-auto hero-oneliner text-base font-normal">
          High‑impact digital products and brand identities.
        </p>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
          <a
            href="#quote"
            className="inline-flex items-center justify-center px-8 py-4 rounded-sm text-white font-medium text-base w-full md:w-auto cta-primary"
            aria-label="Get a free quote"
          >
            GET A QUOTE
          </a>

          <a
            href="#portfolio"
            className="inline-flex items-center justify-center px-8 py-4 rounded-sm font-medium text-base w-full md:w-auto cta-ghost"
            aria-label="View portfolio"
          >
           VIEW PORTFOLIO
          </a>
        </div>

        <div className="mt-16">
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
          />
        </div>
      </div>
    </section>
  );
}
