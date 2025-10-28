"use client";

interface FloatingGeometryProps {
  prefersReducedMotion?: boolean;
}

export default function FloatingGeometry({
  prefersReducedMotion = false,
}: FloatingGeometryProps) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Enhanced dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/90 to-slate-900" />

      {/* Geometric pattern overlay with better contrast */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(6, 182, 212, 0.06) 25%, transparent 25%, transparent 75%, rgba(6, 182, 212, 0.06) 75%),
            linear-gradient(-45deg, rgba(14, 116, 144, 0.04) 25%, transparent 25%, transparent 75%, rgba(14, 116, 144, 0.04) 75%)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: "0 0, 40px 40px",
        }}
      />

      {/* Additional glass texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(34, 211, 238, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Floating elements - CSS only */}
      <div className="absolute inset-0">
        {!prefersReducedMotion && (
          <>
            {/* Large floating squares */}
            <div
              className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/10 rounded-sm animate-pulse"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            />
            <div
              className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300/15 rounded-full animate-pulse"
              style={{ animationDelay: "1s", animationDuration: "4s" }}
            />
            <div
              className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400/8 rounded-sm animate-pulse"
              style={{ animationDelay: "2s", animationDuration: "5s" }}
            />
            <div
              className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-cyan-500/12 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
            />
            <div
              className="absolute bottom-1/3 right-2/3 w-2.5 h-2.5 bg-white/5 rounded-sm animate-pulse"
              style={{ animationDelay: "1.5s", animationDuration: "4.5s" }}
            />
          </>
        )}
      </div>

      {/* Enhanced vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.1) 100%)
          `,
        }}
      />
    </div>
  );
}
