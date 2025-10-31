import Link from "next/link"; // Next.js Link component for client-side navigation

type Props = { className?: string }; // Props type for optional className

export default function BrandMark({ className = "" }: Props) {
  // Brandmark component
  return ( // Premium brand logo with refined text styling and smooth transitions
    <Link
      href="/"
      aria-label="DamiAgency — Home"
      className={`group inline-flex items-center py-2 px-1 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${className}`} // Premium brand design - minimal spacing and focus styles 
    >
      <span className="relative text-lg"> {/* Brandmark text */}
        <span className="text-cyan-400 font-normal glow-cyan">Dami</span>
        <span className="text-white font-normal ml-0.5">Agency</span>
      </span>
    </Link>
  );
}
