"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const MENU = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About Us" },
];

const linkBase =
  "px-3 py-2 rounded-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  // initialize from current scroll position to avoid calling setState
  // synchronously inside an effect (prevents cascading render warning)
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > 30 : false
  );
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstMenuRef = useRef<HTMLAnchorElement | null>(null);

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

  useEffect(() => {
    const prev = document.body.style.overflow || ""; // Store previous overflow
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); // Close on Escape key

    if (open) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      window.addEventListener("keydown", onKey); // Listen for Escape key
      // schedule focus on next paint instead of an arbitrary timeout.
      window.requestAnimationFrame(() => firstMenuRef.current?.focus()); // Focus first menu item
    } else {
      document.body.style.overflow = prev; // Restore previous overflow
      window.removeEventListener("keydown", onKey); // Clean up event listener
      // Return focus to toggle button when menu closes
      window.requestAnimationFrame(() => toggleRef.current?.focus()); // Focus toggle button
    }

    return () => {
      document.body.style.overflow = prev; //Restore previous overflow on cleanup
      window.removeEventListener("keydown", onKey); // Clean up event listener
    };
  }, [open]);

  return (
    <>
      {/* Fixed top header — uses scrolled to toggle transparent → solid bg, respects safe-area inset, and transitions colors smoothly. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 backdrop-blur-sm ${
          scrolled
            ? "bg-black/80"
            : "bg-linear-to-b from-black/60 to-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto max-w-screen-2xl  px-4 sm:px-6 md:px-12 h-16 sm:h-20 grid grid-cols-[auto_1fr_auto] items-center gap-4 text-white"
        >
          <div className="justify-self-start">
            <Logo />
          </div>

          {/* center column intentionally left blank on md+ to allow menu on the right */}
          <div className="justify-self-center" />

          <div className="justify-self-end flex items-center gap-3 sm:gap-4">
            {/* desktop menu moved to the right column */}
            <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-base md:text-lg font-medium tracking-wide">
              {MENU.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className={`${linkBase} ${
                      m.href === "#home"
                        ? "text-white underline decoration-white decoration-2 underline-offset-4 font-semibold"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="#quote"
              className="hidden md:inline-block rounded-md bg-white/95 text-black font-semibold text-base lg:text-xl shadow-sm cta-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              Get a quote
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
      </header>

      {/* Mobile menu: fixed below the header so header height never changes when opened */}
      <div
        id={menuId}
        className={`md:hidden ${
          open ? "block" : "hidden"
        } fixed inset-x-0 top-[calc(env(safe-area-inset-top)+4rem)] sm:top-[calc(env(safe-area-inset-top)+5rem)] z-40`}
        aria-hidden={!open}
      >
        <div className="bg-black/95 px-4 py-4 max-h-[60vh] sm:max-h-[50vh] overflow-y-auto">
          <ul className="flex flex-col">
            {MENU.map((m, i) => (
              <li
                key={m.href}
                className="border-b border-white/10 last:border-b-0"
              >
                <Link
                  href={m.href}
                  onClick={() => setOpen(false)}
                  ref={i === 0 ? firstMenuRef : undefined}
                  className={`block py-3 px-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white ${
                    m.href === "#home"
                      ? "text-white underline decoration-white decoration-2 underline-offset-4 font-semibold"
                      : "text-white/90"
                  }`}
                >
                  {m.label}
                </Link>
              </li>
            ))}

            <li className="pt-3">
              <Link
                href="#quote"
                onClick={() => setOpen(false)}
                className="block w-full text-center rounded-md bg-white text-black font-medium cta-lift"
              >
                Get a quote
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
