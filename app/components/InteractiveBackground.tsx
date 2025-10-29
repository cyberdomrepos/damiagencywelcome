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
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Optimized static gradient background */}
      <div 
        className="absolute inset-0" 
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            linear-gradient(180deg, rgb(0, 0, 0) 0%, rgb(15, 23, 42) 50%, rgb(0, 0, 0) 100%)
          `
        }}
      />
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply'
        }}
      />
    </div>
  );
}
