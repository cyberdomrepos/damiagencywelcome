"use client"; // NavBar is a client component

import { useEffect, useId, useRef, useState } from "react"; // React hooks for state and effects
import BrandMark from "./BrandMark"; // Brand Logo Component

// NavBar component with smooth background transition, responsive menu, and accessibility features
export default function NavBar() {
  const [open, setOpen] = useState(false); // Mobile menu open state
  const [scrolled, setScrolled] = useState(false); // Scroll state for background transition
  const menuId = useId(); // Unique ID for menu
  const toggleRef = useRef<HTMLButtonElement | null>(null); // Ref for the menu toggle button

  // Scroll detection for smooth background transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30); // Consider scrolled if more than 30px down
    };
    window.addEventListener("scroll", handleScroll); // Attach scroll listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, []);

  // ESC closes menu & return focus, click outside closes menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    // Click outside to close menu
    const onClick = (e: MouseEvent) => {
      const nav = document.querySelector('nav[aria-label="Primary"]');
      if (open && nav && !nav.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    // Attach event listeners
    window.addEventListener("keydown", onKey);
    if (open) {
      window.addEventListener("click", onClick);
    }

    // Cleanup event listeners
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [open]);

  // Lock scroll when menu open
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (open) {
      root.classList.add("overflow-hidden");
      body.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    }
    return () => {
      root.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const FONT_FAMILY =
    '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace';

  // Transition classes
  const EASE = "ease-[cubic-bezier(0.25,0.46,0.45,0.94)]";
  const TRANS500 = `transition-all duration-500 ${EASE}`;
  const TRANS600 = `transition-all duration-600 ${EASE}`;
  const TRANS1000 = `transition-all duration-1000 ${EASE}`;

  //  Menu items configuration
  const MENU_ITEMS: { href: string; label: string; primary?: boolean }[] = [
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#about", label: "About Us" },
    { href: "#quote", label: "Get a Quote", primary: true },
  ];

  return (
    // Super smooth transparent navbar that becomes dark on scroll
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-18 ${TRANS1000} ${
        scrolled ? "border-b border-white/8" : "border-b border-transparent"
      }`}
      style={{
        background: scrolled ? "rgba(0, 0, 0, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      }}
    >
      <nav
        aria-label="Primary"
        className="
            mx-auto flex max-w-screen-2xl items-center justify-between
            h-full px-6 py-3 md:px-12 relative z-10 
            text-white"
      >
        <BrandMark className="text-[20px] md:text-[22px]" /> {/** Brand logo */}
        {/* Premium desktop navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              {item.primary ? (
                // Transparent, less-rounded CTA with an arrow
                <a
                  href={item.href}
                  className={`inline-flex items-center group transform ${TRANS500} motion-safe:group-hover:scale-105 px-4 py-2 rounded-sm bg-transparent border border-white/10 text-cyan-300 font-medium tracking-wider hover:border-cyan-300/40 hover:ring-1 hover:ring-cyan-300/30 hover:shadow-[0_6px_18px_rgba(6,182,212,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/20 active:scale-[0.98]`}
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  <span className="uppercase tracking-wider">{item.label}</span>
                  <svg
                    className="ml-2 w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : (
                <a
                  href={item.href}
                  className={`nav-link-premium relative ${TRANS500} font-normal px-2 py-2 tracking-wide text-white/75 hover:text-white`}
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        {/* Premium mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className={`md:hidden p-3 rounded-lg text-white/75 hover:text-white ${TRANS500} active:scale-95 hover:bg-white/3`}
          style={{ fontFamily: FONT_FAMILY }}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className={`${TRANS600} ${
              open ? "rotate-180 scale-90" : "rotate-0 scale-100"
            }`}
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
      </nav>

      {/* Premium mobile dropdown */}
      <div
        id={menuId}
        className={`md:hidden ${TRANS600} ${
          open
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className={`absolute left-0 right-0 top-full z-50
                     transform ${TRANS600} origin-top
                     ${open ? "scale-y-100" : "scale-y-95"}`}
          style={{
            background: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          <ul className="px-6 py-6 space-y-2">
            {MENU_ITEMS.map((item, index) => (
              <li
                key={item.href}
                className={`transform ${TRANS500} ${
                  open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
                style={{
                  transitionDelay: open ? `${(index + 1) * 120}ms` : "0ms",
                }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={
                    item.primary
                      ? `block w-full text-center transform py-3 px-4 rounded-sm font-medium text-base tracking-wide ${TRANS500} motion-safe:group-hover:scale-105 bg-transparent border border-white/10 text-cyan-400 hover:border-cyan-300/40 hover:ring-1 hover:ring-cyan-300/30 hover:shadow-[0_6px_18px_rgba(6,182,212,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/20 active:scale-[0.98]`
                      : `block py-3 px-4 rounded-lg font-medium text-base tracking-wide ${TRANS500} text-white/75 hover:text-white`
                  }
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
