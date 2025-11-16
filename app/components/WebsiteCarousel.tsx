"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface WebsiteCarouselProps {
  images: { src: string; alt?: string; isLongScreenshot?: boolean }[];
  autoplay?: boolean;
  interval?: number;
}

export default function WebsiteCarousel({
  images,
  autoplay = true,
  interval = 5000,
}: WebsiteCarouselProps) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const length = images.length;
  const currentImage = images[index];

  useEffect(() => {
    if (!autoplay || length <= 1) return;
    timerRef.current = window.setInterval(
      () => setIndex((i) => (i + 1) % length),
      interval
    );
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoplay, interval, length]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onEnter = () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    const onLeave = () => {
      if (!timerRef.current && autoplay && length > 1)
        timerRef.current = window.setInterval(
          () => setIndex((i) => (i + 1) % length),
          interval
        );
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [autoplay, interval, length]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="overflow-hidden rounded-xl bg-zinc-900/50 ring-1 ring-white/10">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="flex-shrink-0 w-full relative">
              {img.isLongScreenshot ? (
                // Scrollable container for long screenshots
                <div className="h-[600px] md:h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30">
                  <div className="relative w-full min-h-full">
                    <Image
                      src={img.src}
                      alt={img.alt ?? `Website screenshot ${i + 1}`}
                      width={1920}
                      height={4000}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 100vw, 1200px"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                    Scroll to explore ↓
                  </div>
                </div>
              ) : (
                // Regular fixed-height container
                <div className="h-[500px] md:h-[600px] relative">
                  <Image
                    src={img.src}
                    alt={img.alt ?? `Slide ${i + 1}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {length > 1 && (
        <>
          <button
            aria-label="Previous website"
            onClick={() => setIndex((i) => (i - 1 + length) % length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white w-10 h-10 rounded-full hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all"
          >
            <span className="text-xl">‹</span>
          </button>
          <button
            aria-label="Next website"
            onClick={() => setIndex((i) => (i + 1) % length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white w-10 h-10 rounded-full hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all"
          >
            <span className="text-xl">›</span>
          </button>
        </>
      )}

      {/* Indicator dots */}
      {length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to website ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === index
                  ? "w-8 h-2.5 bg-purple-400"
                  : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
