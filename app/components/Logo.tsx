import Link from "next/link";

type Props = { className?: string };

export default function Logo({ className = "" }: Props) {
  // Compact logo intended for nav/header usage. Renamed from BrandMark.
  return (
    <Link
      href="/"
      aria-label="DAMI AGENCY — HOME"
      className={`inline-flex items-center py-1 px-1 ${className}`}
    >
      {/* visible logo text (compact by default) - match hero "premium" gradient exactly */}
      <span
        className="relative z-10 font-bold text-xl sm:text-2xl tracking-tight bg-clip-text text-transparent uppercase"
        style={{
          // Rose-red to royal purple gradient for brand accent
          backgroundImage:
            "linear-gradient(135deg, rgba(251,113,133,0.98) 0%, rgba(109,40,217,0.98) 100%)",
        }}
      >
        DAMI
      </span>
      <span className="relative z-10 font-bold text-xl sm:text-2xl tracking-tight text-zinc-900/90 dark:text-white/95 uppercase">
        AGENCY
      </span>
    </Link>
  );
}
