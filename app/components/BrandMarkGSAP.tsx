// app/components/BrandMark.tsx
import Link from "next/link";

export default function BrandMark() {
  return (
    <Link
      href="/"
      aria-label="DamiAgency — Home"
      className="brandmark inline-block text-xl md:text-2xl font-semibold tracking-tight
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
    >
      <span className="text-cyan-400">Dami</span>
      <span className="text-white">Agency</span>
    </Link>
  );
}
