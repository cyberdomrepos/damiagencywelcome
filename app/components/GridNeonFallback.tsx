"use client";

import { useEffect, useRef } from "react";

type Props = {
  cell?: number;
  majorEvery?: number;
  intensity?: number;
  drift?: number;
};

export default function GridNeonFallback({
  cell = 44,
  majorEvery = 6,
  intensity = 0.9,
  drift = 0.02,
}: Props) {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--grid-cell", String(cell));
    root.style.setProperty("--grid-major", String(cell * majorEvery));
    root.style.setProperty(
      "--grid-dpr",
      String(Math.max(1, Math.min(2, window.devicePixelRatio || 1)))
    );
    root.style.setProperty(
      "--grid-primary",
      getComputedStyle(root).getPropertyValue("--primary") || "#0fb5c3"
    );
    root.style.setProperty(
      "--grid-accent",
      getComputedStyle(root).getPropertyValue("--accent") || "#9fb3c8"
    );
    root.style.setProperty("--grid-intensity", String(intensity));
    root.style.setProperty("--grid-grain", "0.02");

    const start = performance.now();

    function loop(now: number) {
      const t = (now - start) * 0.001;
      const dx = Math.sin(t * 0.12) * (drift * 40);
      const dy = Math.cos(t * 0.07) * (drift * 30);
      root.style.setProperty("--grid-drift-x", `${dx}px`);
      root.style.setProperty("--grid-drift-y", `${dy}px`);
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cell, majorEvery, intensity, drift]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 neon-scene">
      <div className="gridneon-stars" aria-hidden="true" />
      <div className="gridneon-grid" aria-hidden="true" />
      <div className="gridneon-horizon" aria-hidden="true" />
      <div className="gridneon-overlay" aria-hidden="true" />
    </div>
  );
}
