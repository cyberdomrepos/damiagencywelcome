interface GradientUnderlineProps {
  className?: string; // Additional classes for customization
  // Optional width class (Tailwind width, e.g. 'w-40') to keep component flexible
  widthClass?: string;
}

// Minimal, reusable underline: a thin gradient line with one subtle blurred glow layer
export default function GradientUnderline({
  className = "",
  widthClass = "w-36",
}: GradientUnderlineProps) {
  // Minimal, reusable underline: a thin gradient line with one subtle blurred glow layer.
  // Keeps markup small while providing an elegant effect.
  // The glow layer uses a blurred gradient with reduced opacity for subtlety.
  return (
    <div
      className={`relative flex justify-center items-center ${className}`} // Additional classes for customization
      aria-hidden={true}
    >
      {/* Main thin gradient line */}
      <div
        className={`h-0.5 ${widthClass} bg-linear-to-r from-transparent via-cyan-400 to-transparent`}
      />

      {/* Single subtle glow layer beneath the main line */}
      <div
        className={`absolute inset-0 flex justify-center pointer-events-none`}
      >
        <div
          className={`${widthClass} h-2 bg-linear-to-r from-transparent via-cyan-400/25 to-transparent blur-sm opacity-90`}
        />
      </div>
    </div>
  );
}
