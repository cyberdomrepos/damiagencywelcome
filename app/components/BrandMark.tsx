import Link from "next/link";

type Props = { className?: string };

export default function BrandMark({ className = "" }: Props) {
  return (
    <Link
      href="/"
      aria-label="DamiAgency — Home"
      className={[
        // Clean minimal design
        "inline-flex items-center",
        "py-2",
        // text
        "font-bold tracking-tight text-xl",
        "text-white",
        "select-none",
        "hover:opacity-80 transition-opacity duration-200",
        // accessibility
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
        className,
      ].join(" ")}
      style={{
        fontFamily:
          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
      }}
    >
      <span>
        <span className="text-white">Dami</span>
        <span className="text-cyan-300 font-normal">Agency</span>
      </span>
    </Link>
  );
}
