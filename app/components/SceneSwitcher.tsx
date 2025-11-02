"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// import client-only NeonElevatorScene dynamically to avoid SSR issues
const NeonElevatorScene = dynamic(() => import("./NeonElevatorScene"), {
  ssr: false,
});
const GridNeonFallback = dynamic(() => import("./GridNeonFallback"), {
  ssr: false,
});

export default function SceneSwitcher() {
  const [useGrid, setUseGrid] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mmReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const mmSmall = window.matchMedia?.("(max-width: 880px)");

    function decide() {
      const reduced = mmReduce ? mmReduce.matches : false;
      const small = mmSmall ? mmSmall.matches : window.innerWidth < 880;
      setUseGrid(reduced || small);
    }

    decide();

    mmReduce?.addEventListener?.("change", decide);
    mmSmall?.addEventListener?.("change", decide);
    window.addEventListener("resize", decide, { passive: true });

    return () => {
      mmReduce?.removeEventListener?.("change", decide);
      mmSmall?.removeEventListener?.("change", decide);
      window.removeEventListener("resize", decide);
    };
  }, []);

  // grid is lightweight CSS fallback; neon is the 3D scene
  return useGrid ? (
    <GridNeonFallback />
  ) : (
    <NeonElevatorScene intensity={0.14} count={14} speed={0.35} drift={0.03} />
  );
}
