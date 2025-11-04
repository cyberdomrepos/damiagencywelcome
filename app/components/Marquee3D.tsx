"use client";

import React, { useEffect, useRef, useState } from "react";

interface Marquee3DProps {
  items: string[];
  className?: string;
  speed?: number; // pixels per second, default 50
}

// Professional marquee with accurate speed control and 3D effects
export default function Marquee3D({ items, className = "", speed = 50 }: Marquee3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(48);

  // Check for reduced motion preference
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

  // Calculate accurate animation duration based on content width and desired speed
  useEffect(() => {
    if (!trackRef.current) return;
    
    const calculateDuration = () => {
      const track = trackRef.current;
      if (!track) return;
      
      // Get the width of one set of items (1/3 of total since we triple the items)
      const singleSetWidth = track.scrollWidth / 3;
      
      // Calculate duration: distance / speed
      // Speed is in pixels per second, duration is in seconds
      const duration = singleSetWidth / speed;
      
      setAnimationDuration(duration);
    };
    
    // Calculate on mount and when window resizes
    calculateDuration();
    window.addEventListener('resize', calculateDuration);
    
    return () => window.removeEventListener('resize', calculateDuration);
  }, [items, speed]);

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
        {/* Enhanced professional background with gradient and glow */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-3 w-[86%] h-14 rounded-xl pointer-events-none marquee-bg"
          style={{
            background: "linear-gradient(135deg, rgba(34,211,238,0.04) 0%, rgba(168,85,247,0.04) 100%)",
            border: "1px solid rgba(34,211,238,0.08)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.3), 0 4px 12px rgba(34,211,238,0.08)",
          }}
        />

        {/* Animated glow effect */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-3 w-[86%] h-14 rounded-xl pointer-events-none marquee-glow"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.15), rgba(168,85,247,0.15), transparent)",
            backgroundSize: "200% 100%",
            animation: prefersReducedMotion ? "none" : "marquee-glow 4s ease-in-out infinite",
            filter: "blur(12px)",
            opacity: 0.5,
          }}
        />

        {/* Enhanced marquee track with professional styling */}
        <div
          ref={trackRef}
          className="flex marquee-moving relative z-10"
          style={{
            gap: "4rem",
            alignItems: "center",
            willChange: "transform",
            animation: prefersReducedMotion
              ? "none"
              : `marquee-loop ${animationDuration}s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            transform: "translateZ(0)", // Hardware acceleration
          }}
        >
          {chips.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className={`marquee-token`}
              role="listitem"
              aria-label={name}
              style={{
                transform: "translateZ(10px)", // Subtle 3D lift
              }}
            >
              <span className="marquee-dot" aria-hidden>
                ·
              </span>
              <span className="marquee-token__label">{name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Professional gradient fades on edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none marquee-fade marquee-fade--left z-20"
        aria-hidden
        style={{
          background: "linear-gradient(90deg, rgba(11,15,18,1) 0%, rgba(11,15,18,0.8) 30%, rgba(11,15,18,0) 100%)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none marquee-fade marquee-fade--right z-20"
        aria-hidden
        style={{
          background: "linear-gradient(270deg, rgba(11,15,18,1) 0%, rgba(11,15,18,0.8) 30%, rgba(11,15,18,0) 100%)",
        }}
      />

      <style>{`
        /* Professional marquee tokens with enhanced styling */
        .marquee-token { 
          display: inline-flex; 
          align-items: center; 
          gap: 0.6rem; 
          color: rgba(200,220,225,0.85); /* Brighter, more visible */
          font-variant: all-small-caps; 
          letter-spacing: 0.08em; 
          font-weight: 600; 
          padding: 6px 12px; 
          white-space: nowrap; 
          font-family: var(--font-iosevka);
          font-size: 0.875rem;
          opacity: 1;
          min-width: max-content;
          border-radius: 6px;
          background: linear-gradient(135deg, rgba(34,211,238,0.05), rgba(168,85,247,0.05));
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        
        .marquee-token:hover {
          color: rgba(220,240,245,1);
          background: linear-gradient(135deg, rgba(34,211,238,0.12), rgba(168,85,247,0.12));
          border-color: rgba(34,211,238,0.3);
          box-shadow: 0 4px 16px rgba(34,211,238,0.2);
          transform: translateY(-2px) translateZ(15px);
        }
        
        .marquee-dot { 
          color: rgba(34,211,238,0.7); 
          font-size: 0.8rem; 
          opacity: 0.8; 
          display: inline-block; 
          width: 0.8ch; 
          text-align: center;
        }
        
        .marquee-token__label { 
          display: inline-block;
        }

        .marquee-bg { 
          mix-blend-mode: normal; 
          opacity: 0.8;
          transition: opacity 0.5s ease;
        }
        
        .marquee-container:hover .marquee-bg {
          opacity: 1;
        }

        /* Enhanced 3D perspective */
        .marquee-container { 
          perspective: 1200px;
          perspective-origin: center center;
        }
        
        .marquee-moving { 
          transform-style: preserve-3d;
        }

        /* Smooth, accurate marquee animation */
        @keyframes marquee-loop {
          0% { 
            transform: translateX(0) translateZ(0); 
          }
          100% { 
            transform: translateX(-33.3333%) translateZ(0); 
          }
        }

        /* Animated glow effect */
        @keyframes marquee-glow {
          0%, 100% { 
            background-position: 0% 50%; 
            opacity: 0.3;
          }
          50% { 
            background-position: 100% 50%; 
            opacity: 0.6;
          }
        }

        /* Responsive font sizes with better scaling */
        @media (min-width: 480px) {
          .marquee-token { 
            font-size: 1rem;
            gap: 0.7rem;
            padding: 7px 13px;
          }
        }
        
        @media (min-width: 640px) {
          .marquee-token { 
            font-size: 1.125rem;
            gap: 0.8rem;
            padding: 8px 14px;
          }
        }
        
        @media (min-width: 1024px) {
          .marquee-token { 
            font-size: 1.25rem;
            padding: 9px 15px;
          }
        }
        
        @media (min-width: 1400px) {
          .marquee-token { 
            font-size: 1.5rem;
            padding: 10px 16px;
          }
        }
        
        /* Ensure smooth animation performance */
        @media (prefers-reduced-motion: reduce) {
          .marquee-token,
          .marquee-token:hover {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
