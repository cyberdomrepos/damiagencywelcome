"use client";

import React, { useEffect, useRef, useState } from "react";

interface Marquee3DProps {
  items: string[];
  className?: string;
}

// Clean small-card marquee (compact chips, accessible, reduced-motion aware)
export default function Marquee3D({ items, className = "" }: Marquee3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (e: MediaQueryListEvent | MediaQueryList) =>
      setPrefersReducedMotion(!!e.matches);
    update(mq);
    // add listener in a compatible way
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update as EventListener);
      return () => mq.removeEventListener("change", update as EventListener);
    }
    // fallback for older browsers using addListener/removeListener
    const legacy = mq as unknown as {
      addListener?: (
        cb: (e: MediaQueryListEvent | MediaQueryList) => void
      ) => void;
      removeListener?: (
        cb: (e: MediaQueryListEvent | MediaQueryList) => void
      ) => void;
    };
    if (typeof legacy.addListener === "function") {
      legacy.addListener(update);
    }
    return () => {
      if (typeof legacy.removeListener === "function") {
        legacy.removeListener(update);
      }
    };
  }, []);

  // No tilt: keep the marquee simple and muted for clarity.

  // keyboard accessibility: pause on focus within
  function handleFocusIn() {
    setIsPaused(true);
  }
  function handleFocusOut() {
    if (!prefersReducedMotion) setIsPaused(false);
  }

  // duplicate items to make a smooth continuous loop (3x helps fill wide viewports)
  const chips = [...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full marquee-container ${className}`}
      aria-label="Technologies carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => !prefersReducedMotion && setIsPaused(false)}
      onFocusCapture={handleFocusIn}
      onBlurCapture={handleFocusOut}
    >
      <div className="relative">
        {/* subtle translucent background strip behind tokens */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-3 w-[86%] h-14 rounded-md pointer-events-none marquee-bg"
          style={{
            background: "rgba(34,211,238,0.02)",
            border: "1px solid rgba(34,211,238,0.04)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.25)",
          }}
        />

        {/* single clean marquee track */}
        <div
          ref={trackRef}
          className="flex marquee-moving relative z-10"
          style={{
            gap: "4rem",
            alignItems: "center",
            willChange: "transform",
            animation: prefersReducedMotion
              ? "none"
              : "marquee-loop 48s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          {chips.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className={`marquee-token`}
              role="listitem"
              aria-label={name}
            >
              <span className="marquee-dot" aria-hidden>
                ·
              </span>
              <span className="marquee-token__label">{name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* top and bottom fading borders to frame the tokens (subtler) */}
      <div
        className="absolute left-0 right-0 top-0 h-6 pointer-events-none marquee-fade marquee-fade--top"
        aria-hidden
        style={{ opacity: 0.1 }}
      />
      <div
        className="absolute left-0 right-0 bottom-0 h-6 pointer-events-none marquee-fade marquee-fade--bottom"
        aria-hidden
        style={{ opacity: 0.1 }}
      />

      <style>{`
        .marquee-token { 
          display:inline-flex; 
          align-items:center; 
          gap:0.6rem; 
          color: rgba(170,210,210,0.6); /* muted */
          font-variant:all-small-caps; 
          letter-spacing:0.08em; 
          font-weight:600; 
          padding: 4px 8px; 
          white-space:nowrap; 
          font-family: var(--font-iosevka);
          font-size: 0.875rem; /* mobile base size */
          opacity: 0.95;
          min-width: max-content;
        }
        .marquee-dot { color: rgba(170,255,240,0.45); font-size:0.7rem; opacity:0.55; display:inline-block; width:0.8ch; text-align:center }
        .marquee-token__label { display:inline-block }

  .marquee-bg { mix-blend-mode: normal; opacity:0.02 }

        .marquee-fade { background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0)); }
        .marquee-fade--bottom { background: linear-gradient(0deg, rgba(0,0,0,0.35), rgba(0,0,0,0)); }

        .marquee-token__label { display:inline-block }

        /* gentle tilt removed for a neat, muted look */
        .marquee-container { perspective: 900px; }
        .marquee-moving { transform: none }

        @keyframes marquee-loop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Responsive font sizes */
        @media (min-width: 480px) {
          .marquee-token { 
            font-size: 1rem;
            gap: 0.7rem;
            padding: 5px 9px;
          }
        }
        @media (min-width: 640px) {
          .marquee-token { 
            font-size: 1.125rem;
            gap: 0.8rem;
            padding: 6px 10px;
          }
        }
        @media (min-width: 1400px) {
          .marquee-token { font-size:1.6rem }
        }
      `}</style>
    </div>
  );
}
