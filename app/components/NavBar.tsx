"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import BrandMark from "./BrandMark";
export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#home");
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstMenuRef = useRef<HTMLAnchorElement | null>(null);

  // rAF-throttled scroll handler
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Manage body scroll lock, Escape key and focus move when mobile menu opens
  useEffect(() => {
    const prevOverflow = document.body.style.overflow || "";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
      // move focus into menu
      setTimeout(() => firstMenuRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
      // return focus to toggle
      setTimeout(() => toggleRef.current?.focus(), 50);
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  // Simple active link update on click / hash change
  useEffect(() => {
    const onHash = () => setActive(window.location.hash || "#home");
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const MENU: {
    href: string;
    label: string;
    primary?: boolean;
    ariaLabel?: string;
  }[] = [
    { href: "#home", label: "Home", ariaLabel: "Navigate to home section" },
    {
      href: "#services",
      label: "Services",
      ariaLabel: "Navigate to services section",
    },
    {
      href: "#portfolio",
      label: "Portfolio",
      ariaLabel: "Navigate to portfolio section",
    },
    {
      href: "#about",
      label: "About Us",
      ariaLabel: "Navigate to about us section",
    },
    {
      href: "#quote",
      label: "Get a Quote",
      primary: true,
      ariaLabel: "Navigate to quote form",
    },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 backdrop-blur-sm ${
        scrolled ? "bg-black/80" : "bg-linear-to-b from-black/60 to-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-12 h-16 sm:h-20 flex items-center text-white"
      >
        {/* left */}
        <div className="flex items-center">
          <BrandMark />
        </div>

        {/* center (flex-based so it's naturally responsive & centered) */}
        <div className="hidden md:flex flex-1 justify-center font-semibold text-base lg:text-xl">
          <ul className="flex items-center gap-4 lg:gap-6">
            {MENU.filter((m) => !m.primary).map((m) => {
              const isActive = active === m.href;
              const extra = isActive ? "border-b-2 border-white/90 pb-1" : "";
              const linkClasses = `px-3 py-2 nav-link-underline ${extra} transition-colors duration-150`;
              return (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    aria-label={m.ariaLabel}
                    aria-current={isActive ? "page" : undefined}
                    className={linkClasses}
                  >
                    {m.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* right */}
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <Link
            href="#quote"
            aria-label="Get a quote in 24 hours"
            className="hidden md:inline-block px-4 lg:px-5 py-2 lg:py-2.5 rounded-md bg-white/95 text-black font-semibold text-base lg:text-xl shadow-sm cta-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            Get a quote in 24h
          </Link>

          <button
            ref={toggleRef}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label="Toggle menu"
            className="md:hidden p-2"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className={`${
                open ? "rotate-90" : ""
              } transition-transform duration-200`}
              aria-hidden
            >
              {open ? (
                <path
                  d="M6 6l12 12M18 6l-12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* mobile dropdown */}
      <div
        id={menuId}
        className={`md:hidden ${open ? "block" : "hidden"}`}
        aria-hidden={!open}
      >
        <div
          className={`transform origin-top transition-[transform,opacity] duration-300 ${
            open ? "scale-y-100 opacity-100" : "scale-y-95 opacity-0"
          }`}
          style={{ background: "rgba(0,0,0,0.95)" }}
        >
          <ul className="px-4 sm:px-6 py-4 space-y-2">
            {MENU.map((m, i) => (
              <li
                key={m.href}
                style={{ transitionDelay: `${open ? i * 80 : 0}ms` }}
                className={`transform transition duration-300 ${
                  open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
              >
                <Link
                  href={m.href}
                  onClick={() => setOpen(false)}
                  aria-label={m.ariaLabel}
                  aria-current={active === m.href ? "page" : undefined}
                  className={
                    m.primary
                      ? "block w-full text-center py-3 rounded-md bg-white text-black font-medium"
                      : m.href === "#home"
                      ? "block w-full py-3 px-3 rounded-md border border-white/6 text-white/80"
                      : "block w-full py-3 px-3 rounded-md border border-white/6 text-white/80 nav-link-underline"
                  }
                  ref={i === 0 ? firstMenuRef : undefined}
                >
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
