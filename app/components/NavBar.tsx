"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "./BrandMark";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const linkClass = (active: boolean) =>
    [
      "block px-2 py-2 text-md text-white/90 hover:text-white border-1 border-white/20 bg-black/10",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
      "text-center",
      active
        ? "underline decoration-white-400 underline-offset-4"
        : "hover:underline decoration-white/40 underline-offset-4",
    ].join(" ");

  // ESC closes menu & return focus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll when menu open
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.classList.add("overflow-hidden");
    else root.classList.remove("overflow-hidden");
    return () => root.classList.remove("overflow-hidden");
  }, [open]);

  return (
    // Mobile: static header (in-flow). Desktop: sticky, top-0.
    <header className="relative z-50 h-14 md:h-16">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-screen-2xl items-center justify-between
                   h-full px-4 py-4 md:px-10 relative z-50 md:h-20 backdrop-blur-sm backdrop-saturate-150 supports-backdrop-filter:bg-transparent"
      >
        <BrandMark className="text-[20px]" />

        {/* Desktop links */}
        <ul className="text-md hidden gap-8 md:flex">
          <li>
            <a href="#services" className="text-white/80 hover:text-white">
              Services
            </a>
          </li>
          <li>
            <a href="#work" className="text-white/80 hover:text-white">
              Work
            </a>
          </li>
          <li>
            <a
              href="mailto:rhymedominic.costa@damiagency.com"
              className="text-white/80 hover:text-white"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="md:hidden inline-flex items-center justify-center border border-white/20 bg-black/10 px-3 py-2 text-white/90 transition-colors"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span>Menu</span>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className={open ? "hidden" : "block"}
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className={open ? "block" : "hidden"}
          >
            <path
              d="M6 6l12 12M18 6l-12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown (in-flow, pushes content; minimal + centered) */}
      <div id={menuId} hidden={!open} className="md:hidden pointer-events-auto">
        <div
          className="absolute left-0 right-0 top-full z-50
+                   backdrop-blur-sm backdrop-brightness-75
+                   bg-black/60 border-b border-white/10 shadow-lg"
        >
          <ul className="px-6 py-4 text-center space-y-1">
            <li>
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={linkClass(pathname === "/")}
              >
                Home
              </Link>
            </li>
            <li>
              <a
                onClick={() => setOpen(false)}
                href="#services"
                className={linkClass(false)}
              >
                Services
              </a>
            </li>
            <li>
              <a
                onClick={() => setOpen(false)}
                href="#work"
                className={linkClass(false)}
              >
                Work
              </a>
            </li>
            <li>
              <a
                onClick={() => setOpen(false)}
                href="mailto:rhymedominic.costa@damiagency.com"
                className={linkClass(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
