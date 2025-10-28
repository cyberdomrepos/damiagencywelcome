interface GradientUnderlineProps {
  className?: string;
}

export default function GradientUnderline({
  className = "",
}: GradientUnderlineProps) {
  return (
    <div className={`relative flex justify-center ${className}`}>
      {/* Main gradient line with premium styling */}
      <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

      {/* Enhanced glow effect */}
      <div className="absolute inset-0 flex justify-center">
        <div className="h-1 w-40 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm"></div>
      </div>

      {/* Additional subtle glow layer */}
      <div className="absolute inset-0 flex justify-center">
        <div className="h-2 w-32 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent blur-md"></div>
      </div>

      {/* Premium accent dots */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-20">
        <div className="w-1 h-1 bg-cyan-400/40 rounded-full"></div>
        <div className="w-1 h-1 bg-cyan-400/40 rounded-full"></div>
      </div>
    </div>
  );
}
