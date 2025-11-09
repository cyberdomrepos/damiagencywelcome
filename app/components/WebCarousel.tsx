"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface WebCarouselProps {
  images: { src: string; alt?: string }[];
  autoplay?: boolean;
  interval?: number;
}

export default function WebCarousel({
  images,
  autoplay = true,
  interval = 3500,
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

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full h-[420px] md:h-[520px] relative"
            >
              <Image
                src={img.src}
                alt={img.alt ?? `Slide ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          ))}
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
