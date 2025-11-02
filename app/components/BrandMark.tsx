import Link from "next/link";

type Props = { className?: string };

export default function BrandMark({ className = "" }: Props) {
  // Compact logo intended for nav/header usage. Keep it small and crisp.
  return (
    <Link
      href="/"
      aria-label="DamiAgency — Home"
      className={`inline-flex items-center py-1 px-1 ${className}`}
    >
      {/* visible logo text (compact by default) - match hero "premium" gradient exactly */}
      <span
        className="relative z-10 font-bold text-2xl tracking-tight bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(139,92,246,0.98) 0%, rgba(236,72,153,0.98) 100%)",
        }}
      >
        Dami
      </span>
      <span className="relative z-10 font-bold text-2xl tracking-tight text-zinc-900/90 dark:text-white/95">
        Agency
      </span>
    </Link>
  );
}
