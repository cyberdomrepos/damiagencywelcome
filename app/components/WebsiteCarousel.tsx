"use client";

import { useState } from "react";
import Image from "next/image";

interface WebImage {
  src: string;
  alt: string;
  isLongScreenshot?: boolean;
}

interface WebsiteCarouselProps {
  images: WebImage[];
}

export default function WebsiteCarousel({ images }: WebsiteCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="relative bg-linear-to-br from-purple-900/10 to-fuchsia-900/10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-white/10">
        {/* Image Container */}
        <div
          className={`relative w-full ${
            currentImage.isLongScreenshot
              ? "h-[600px] md:h-[700px] overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-white/10 hover:scrollbar-thumb-purple-500/70"
              : "h-[400px] md:h-[500px] overflow-hidden"
          } rounded-xl bg-black/50`}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={2560}
            height={currentImage.isLongScreenshot ? 6000 : 1440}
            className={`w-full ${
              currentImage.isLongScreenshot ? "h-auto" : "h-full object-contain"
            }`}
            quality={100}
            priority={currentIndex === 0}
            unoptimized={false}
          />
          {currentImage.isLongScreenshot && (
            <div className="sticky bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/70 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 pointer-events-none z-10 inline-block">
              ↓ Scroll to explore ↓
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Next image"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Indicators */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  idx === currentIndex
                    ? "bg-purple-500 w-6"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
