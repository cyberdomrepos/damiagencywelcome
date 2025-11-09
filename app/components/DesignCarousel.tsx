"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface DesignCarouselProps {
  images: { src: string; alt?: string }[];
  autoplay?: boolean;
  interval?: number;
  variant?: "default" | "large";
}

export default function DesignCarousel({
  images,
  autoplay = true,
  interval = 3500,
  variant = "default",
}: DesignCarouselProps) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const length = images.length;

  useEffect(() => {
    if (!autoplay || length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoplay, interval, length]);

  useEffect(() => {
    // pause autoplay on pointer enter
    const el = containerRef.current;
    if (!el) return;
    const onEnter = () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    const onLeave = () => {
      if (autoplay && length > 1 && !timerRef.current) {
        timerRef.current = window.setInterval(() => {
          setIndex((i) => (i + 1) % length);
        }, interval);
      }
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [autoplay, interval, length]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const go = (n: number) =>
    setIndex((i) => {
      const next = (i + n + length) % length;
      return next;
    });

  // Use an aspect-ratio on mobile so slides scale proportionally (wider & lower height)
  // On md+ we fall back to fixed heights for better desktop composition.
  const mobileAspect = "aspect-[16/9]"; // landscape 16:9 for wider, lower mobile card
  const heightMdClasses =
    variant === "large"
      ? "md:h-[760px] lg:h-[820px]"
      : "md:h-[480px] lg:h-[520px]";

  // Centered max-width wrapper for mobile so the carousel becomes a compact rectangle on phones
  const wrapperWidth =
    variant === "large"
      ? "w-full max-w-[640px] sm:max-w-[840px] md:max-w-none mx-auto"
      : "w-full max-w-[560px] sm:max-w-[760px] md:max-w-none mx-auto";

  return (
    <div ref={containerRef} className="relative w-full">
      <div className={wrapperWidth}>
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className={`shrink-0 w-full ${heightMdClasses} relative`}
              >
                <div
                  className={`relative w-full h-full overflow-hidden rounded-lg ${mobileAspect} md:aspect-auto bg-black`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt ?? `Design ${i + 1}`}
                    fill
                    className="object-contain md:object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* controls */}
      <button
        aria-label="Previous"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-md hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        ‹
      </button>
      <button
        aria-label="Next"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-md hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        ›
      </button>

      {/* dots */}
      <div className="mt-3 flex justify-center gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full ${
              i === index ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
