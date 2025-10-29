/**
 * Optimized CSS Aurora - No JavaScript overhead
 * Replaces heavy Three.js with pure CSS animations
 */
export default function ThreeAurora() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 40% at 50% 60%, rgba(6, 182, 212, 0.1) 0%, transparent 70%),
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 70%, rgba(147, 51, 234, 0.06) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Animated aurora layers */}
      <div 
        className="absolute inset-0 animate-pulse"
        style={{
          background: `
            conic-gradient(from 180deg at 50% 50%, 
              transparent 0deg, 
              rgba(6, 182, 212, 0.05) 60deg, 
              transparent 120deg, 
              rgba(59, 130, 246, 0.04) 240deg, 
              transparent 300deg)
          `,
          animationDuration: '8s',
          animationTimingFunction: 'ease-in-out'
        }}
      />
      
      {/* Subtle movement overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(45deg, 
              transparent 30%, 
              rgba(6, 182, 212, 0.02) 50%, 
              transparent 70%)
          `,
          animation: 'float 12s ease-in-out infinite'
        }}
      />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-0.5deg); }
        }
      `}</style>
    </div>
  );
}
