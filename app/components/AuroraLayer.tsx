"use client";

import dynamic from "next/dynamic";

const Aurora = dynamic(() => import("../ThreeAurora"), { ssr: false });

export default function AuroraLayer() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* give the child a sized box to fill */}
      <div className="relative h-full w-full">
        <Aurora />
      </div>
    </div>
  );
}
