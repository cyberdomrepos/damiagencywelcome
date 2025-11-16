"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  // Start as false on the server to avoid hydration mismatch, then
  // update on mount using requestAnimationFrame to pick up the
  // current scroll position without causing synchronous setState.
  const [scrolled, setScrolled] = useState(false);
  // useId may include characters (like colons) that are not ideal in
  // plain HTML id attributes. Create a safe id string for aria-controls.
  const _menuId = useId();
  const menuId = `nav-menu-${String(_menuId).replace(/[:]/g, "-")}`;
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstMenuRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;

    // Set initial scrolled state on mount without causing a sync setState
    if (
      typeof window !== "undefined" &&
      typeof window.requestAnimationFrame === "function"
    ) {
      rafId = window.requestAnimationFrame(() =>
        setScrolled(window.scrollY > 30)
      );
    } else if (typeof window !== "undefined") {
      // schedule to avoid synchronous setState in environments without RAF
      setTimeout(() => setScrolled(window.scrollY > 30), 0);
    }

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
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
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

  // Close mobile menu when the pathname changes (navigation occurred)
  useEffect(() => {
    // schedule closing on the next paint to avoid synchronous setState in effect
    if (
      typeof window !== "undefined" &&
      typeof window.requestAnimationFrame === "function"
    ) {
      window.requestAnimationFrame(() => setOpen(false));
    } else {
      // fallback
      setTimeout(() => setOpen(false), 0);
    }
  }, [pathname]);

  return (
    <>
      {/* Fixed top header — uses scrolled to toggle transparent → solid bg, respects safe-area inset, and transitions colors smoothly. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 backdrop-blur-sm site-nav-border ${
          scrolled
            ? "bg-black/80"
            : "bg-linear-to-b from-black/60 to-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="w-full px-4 sm:px-6 md:px-12 h-16 sm:h-20 grid grid-cols-[auto_1fr_auto] items-center gap-4 text-white"
        >
          <div className="justify-self-start">
            <Logo />
          </div>

          {/* center column intentionally left blank on md+ to allow menu on the right */}
          <div className="justify-self-center">
            <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-base md:text-lg font-medium tracking-wide">
              {MENU.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className={`${linkBase} nav-link-underline ${
                      m.href === "#home"
                        ? "text-white underline decoration-white decoration-2 underline-offset-4 font-semibold"
                        : "text-white/90 hover:text-white"
                    } ${m.href === "#about" ? "nav-about" : ""}`}
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="justify-self-end flex items-center gap-3 sm:gap-4">
            <Link
              href="#quote"
              className="hidden md:inline-flex items-center gap-2 px-4 py-3 rounded-md bg-white text-black font-semibold transition-transform duration-200 ease-[cubic-bezier(0.2,0.9,0.2,1)] transform-gpu hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
            >
              <span aria-hidden className="inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </span>
              <span>Get a quote</span>
            </Link>

            <button
              ref={toggleRef}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-md bg-white/5"
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
        } fixed inset-x-0 top-[calc(env(safe-area-inset-top)+4rem)] sm:top-[calc(env(safe-area-inset-top)+5rem)] z-40 shadow-2xl`}
        aria-hidden={!open}
      >
        <div className="bg-black/98 backdrop-blur-md border-b border-white/20 px-4 py-6 max-h-[70vh] overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {MENU.map((m, i) => (
              <li
                key={m.href}
                className="border-b border-white/5 last:border-b-0"
              >
                <Link
                  href={m.href}
                  onClick={() => setOpen(false)}
                  ref={i === 0 ? firstMenuRef : undefined}
                  className={`block py-4 px-4 rounded-md text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white hover:bg-white/5 transition-colors ${
                    m.href === "#home"
                      ? "text-white font-semibold bg-white/5"
                      : "text-white/90"
                  } ${m.href === "#about" ? "nav-about" : ""}`}
                >
                  {m.label}
                </Link>
              </li>
            ))}

            <li className="pt-4">
              <Link
                href="#quote"
                onClick={() => setOpen(false)}
                className="w-full flex text-center items-center justify-center gap-2 px-4 py-3 rounded-md bg-white text-black font-semibold transition-all duration-200 hover:bg-white/90 active:scale-95"
              >
                <span aria-hidden className="inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </span>
                <span>Get a quote</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
