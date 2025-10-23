"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

type Props = {
  children: React.ReactNode;   // your styled heading content
  delay?: number;              // seconds
};

export default function TypeMaskGSAP({ children, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduce) {
      el.style.setProperty("--reveal", "100%");
      return;
    }

    // Count visible characters from textContent so steps feel crisp
    const chars = (el.textContent ?? "").length || 24;

    const tween = gsap.fromTo(
      el,
      { "--reveal": "0%" } as gsap.TweenVars,
      {
        "--reveal": "100%",
        duration: 1.8,
        ease: `steps(${chars})`,
        delay,
      } as gsap.TweenVars
    );

    return () => { tween.kill(); };
  }, [delay, reduce]);

  return (
    <span ref={ref} className="type-reveal">
      {children}
    </span>
  );
}
