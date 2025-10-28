"use client";

import { useEffect, useRef } from "react";

interface InteractiveBackgroundProps {
  prefersReducedMotion?: boolean;
}

/**
 * InteractiveBackground - Smooth aurora that responds to scroll.
 * Dark, elegant background that perfectly matches the website's vibe.
 */
export default function InteractiveBackground({
  prefersReducedMotion = false,
}: InteractiveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const container = containerRef.current;
      if (!container) return;

      // Smooth scroll-based transformations
      const scrollFactor = scrollY * 0.1;
      const rotationFactor = scrollY * 0.02;

      // Apply transforms to create scroll-responsive aurora
      container.style.transform = `translateY(${scrollFactor * 0.3}px) rotate(${
        rotationFactor * 0.1
      }deg)`;
      container.style.filter = `hue-rotate(${
        scrollFactor * 0.2
      }deg) brightness(${1 + scrollFactor * 0.0002})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        background: "transparent",
      }}
    />
  );
}
