import Link from "next/link";

type Props = { className?: string };

export default function BrandMark({ className = "" }: Props) {
  return (
    <Link
      href="/"
      aria-label="DamiAgency — Home"
      className={[
        // Premium brand design - minimal spacing
        "group inline-flex items-center",
        "py-2 px-1",
        // Enhanced text styling
        "font-bold tracking-tight text-xl",
        "text-white",
        "select-none",
        // Super smooth transitions
        "transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
        "relative",
        // accessibility
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
        className,
      ].join(" ")}
      style={{
        fontFamily:
          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
      }}
    >
      <span className="relative">
        <span className="text-cyan-400 font-extrabold glow-cyan">Dami</span>
        <span className="text-white font-normal ml-0.5">Agency</span>
      </span>
    </Link>
  );
}
