import Link from "next/link"; // Next.js Link component for client-side navigation

type Props = { className?: string }; // Props type for optional className

export default function BrandMark({ className = "" }: Props) {
  // Brandmark component with original cyan glow dark-tech styling
  return (
    // Premium brand logo with cyan glow and dark tech aesthetic
    <Link
      href="/"
      aria-label="DamiAgency — Home"
      className={`group inline-flex items-center py-2 px-1 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${className}`}
    >
      <span className="relative text-inherit">
        {/* Brandmark text with original cyan glow effect */}
        <span
          className="text-cyan-400"
          style={{
            // Minimal two-color brandmark: primary + white, intentionally very clean
            fontWeight: 700,
            transform: "scale(0.985)",
            display: "inline-block",
            color: "var(--primary)",
            textShadow: "none",
          }}
        >
          Dami
        </span>
        <span
          className="text-white ml-0.5"
          style={{
            fontWeight: 400,
            display: "inline-block",
            textShadow: "none",
          }}
        >
          Agency
        </span>
      </span>
    </Link>
  );
}
