"use client";

import dynamic from "next/dynamic";

// Client-only import of the WebGL component
const Aurora = dynamic(() => import("../ThreeAurora"), { ssr: false });

export default function AuroraLayer() {
  return (
    <div className="fixed inset-0">
      <Aurora />
    </div>
  );
}
