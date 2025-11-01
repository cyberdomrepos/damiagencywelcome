interface InteractiveBackgroundProps {
  prefersReducedMotion?: boolean;
}

/**
 * Optimized background - Static gradient, no JavaScript overhead
 */
export default function InteractiveBackground({
  prefersReducedMotion = false,
}: InteractiveBackgroundProps) {
  return (
    // place behind other background layers so grid can sit on top
    <div className="fixed inset-0 pointer-events-none z-[-20]">
      {/* Clean, high-quality gradient background (no inline noise SVG) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 18% 35%, rgba(6,182,212,0.06) 0%, transparent 35%),
            radial-gradient(ellipse 40% 60% at 82% 65%, rgba(34,211,238,0.03) 0%, transparent 40%),
            linear-gradient(180deg, rgba(6,11,15,1) 0%, rgba(6,9,12,1) 25%, rgba(8,10,14,1) 50%, rgba(0,0,0,1) 100%)
          `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      {/* Removed low-res noise overlay to keep the grid crisp and visible */}
    </div>
  );
}
