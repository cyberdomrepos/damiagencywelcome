"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface WebCarouselProps {
  images: { src: string; alt?: string; isLongScreenshot?: boolean }[];
  autoplay?: boolean;
  interval?: number;
  variant?: "large" | "default";
}

export default function WebCarousel({
  images,
  autoplay = true,
  interval = 3500,
  variant = "large",
}: WebCarouselProps) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const length = images.length;

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

  // Match sizing with design/music carousels
  const mobileAspect = "aspect-[16/9]";
  const heightMdClasses =
    variant === "large"
      ? "md:h-[760px] lg:h-[820px]"
      : "md:h-[760px] lg:h-[820px]";
  const wrapperWidth =
    variant === "large"
      ? "w-full max-w-[640px] sm:max-w-[840px] md:max-w-none mx-auto"
      : "w-full max-w-[640px] sm:max-w-[840px] md:max-w-none mx-auto";

  return (
    <div ref={containerRef} className="relative w-full">
      <div className={wrapperWidth}>
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => {
              const isLongScreenshot = img.isLongScreenshot ?? false;
              return (
                <div
                  key={i}
                  className={`shrink-0 w-full ${heightMdClasses} relative`}
                >
                  <div
                    className={`relative w-full h-full rounded-lg ${mobileAspect} md:aspect-auto bg-black ${
                      isLongScreenshot
                        ? "overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-white/10 hover:scrollbar-thumb-purple-500/70"
                        : "overflow-hidden"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt ?? `Slide ${i + 1}`}
                      width={2560}
                      height={isLongScreenshot ? 6000 : 1440}
                      className={`w-full ${
                        isLongScreenshot ? "h-auto" : "h-full object-cover"
                      }`}
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 1200px"
                      priority={i === 0}
                    />
                    {isLongScreenshot && (
                      <div className="sticky bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/70 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 pointer-events-none z-10 inline-block">
                        ↓ Scroll to explore ↓
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button
        aria-label="Previous"
        onClick={() => setIndex((i) => (i - 1 + length) % length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-md hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        ‹
      </button>
      <button
        aria-label="Next"
        onClick={() => setIndex((i) => (i + 1) % length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-md hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        ›
      </button>

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
