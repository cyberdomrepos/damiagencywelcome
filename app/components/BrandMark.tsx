import Link from "next/link";

type Props = { className?: string };

export default function BrandMark({ className = "" }: Props) {
  return (
    <Link
      href="/"
      aria-label="DamiAgency — Home"
      className={[
        // glassy pill
        "inline-flex items-center gap-2",
        "shadow-sm shadow-black/20",
        "px-3 py-2",
        // text
        "font-semibold tracking-tight",
        "text-white",
        "select-none",
        // accessibility
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
        className,
      ].join(" ")}
    >
      {/* tiny accent chip */}

      <span>
        <span className="text-cyan-300">Dami</span>
        <span className="text-white/95">Agency</span>
      </span>
    </Link>
  );
}
