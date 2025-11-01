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
            // Slightly reduce perceived weight and scale so the cyan half balances the white half
            fontWeight: 700,
            transform: "scale(0.985)",
            display: "inline-block",
            textShadow: "0 0 4px rgba(34,211,238,0.18)",
            filter: "drop-shadow(0 0 3px rgba(34, 211, 238, 0.1))",
          }}
        >
          Dami
        </span>
        <span
          className="text-white ml-0.5"
          style={{
            fontWeight: 400,
            // faint inner glow to increase perceived weight slightly
            textShadow:
              "0 0 1px rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.06)",
            display: "inline-block",
          }}
        >
          Agency
        </span>
      </span>
    </Link>
  );
}
