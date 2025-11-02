"use client";

import { useEffect, useId, useState } from "react";
import BrandMark from "./BrandMark";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const MENU: { href: string; label: string; primary?: boolean }[] = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#about", label: "About Us" },
    { href: "#quote", label: "Get a Quote", primary: true },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] ${
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

        {/* center */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block font-semibold text-base lg:text-xl">
          <ul className="flex items-center gap-4 lg:gap-6">
            {MENU.filter((m) => !m.primary).map((m) => {
              const extra =
                m.href === "#home" ? "border-b-2 border-white/90 pb-1" : "";
              // Remove hover/underline for Home by omitting `nav-link-underline` when href === "#home"
              const linkClasses = `px-3 py-2 ${
                m.href === "#home" ? extra : `nav-link-underline ${extra}`
              }`;
              return (
                <li key={m.href}>
                  <a href={m.href} className={linkClasses}>
                    {m.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* right */}
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <a
            href="#quote"
            className="hidden md:inline-block px-4 lg:px-5 py-2 lg:py-2.5 rounded-md bg-white/95 text-black font-semibold text-base lg:text-xl shadow-sm cta-lift"
          >
            Get a Quote
          </a>

          <button
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
                open ? "rotate-180" : ""
              } transition-transform duration-200`}
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
        className={`md:hidden overflow-hidden ${open ? "block" : "hidden"}`}
      >
        <div
          className={`transform origin-top transition-[transform,opacity] duration-300 ${
            open ? "scale-y-100 opacity-100" : "scale-y-95 opacity-0"
          }`}
          style={{ background: "rgba(0,0,0,0.9)" }}
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
                {/* For mobile, also omit nav-link-underline for Home */}
                <a
                  href={m.href}
                  onClick={() => setOpen(false)}
                  className={
                    m.primary
                      ? "block w-full text-center py-3 rounded-md bg-white text-black font-medium"
                      : m.href === "#home"
                      ? "block w-full py-3 px-3 rounded-md border border-white/6 text-white/80"
                      : "block w-full py-3 px-3 rounded-md border border-white/6 text-white/80 nav-link-underline"
                  }
                >
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
