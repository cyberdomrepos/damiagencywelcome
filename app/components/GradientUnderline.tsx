interface GradientUnderlineProps {
  className?: string;
}

export default function GradientUnderline({
  className = "",
}: GradientUnderlineProps) {
  return (
    <div className={`relative flex justify-center ${className}`}>
      {/* Single clean gradient line */}
      <div className="h-0.5 w-32 bg-linear-to-r from-transparent via-cyan-400 to-transparent"></div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 flex justify-center">
        <div className="h-1 w-32 bg-linear-to-r from-transparent via-cyan-400/20 to-transparent blur-sm"></div>
      </div>
    </div>
  );
}
