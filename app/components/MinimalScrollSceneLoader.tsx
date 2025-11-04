"use client";

import dynamic from "next/dynamic";

// Lazy-load the heavy Three.js component with SSR disabled
// This prevents server-side processing and reduces build time
const MinimalScrollScene = dynamic(() => import("./MinimalScrollScene"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  opacity?: number;
  gridSize?: number;
  lineColor?: string;
};

export default function MinimalScrollSceneLoader(props: Props) {
  return <MinimalScrollScene {...props} />;
}
