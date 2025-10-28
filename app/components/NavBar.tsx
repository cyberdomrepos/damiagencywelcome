"use client";

import { useEffect, useId, useRef, useState } from "react";
import BrandMark from "./BrandMark";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // Scroll detection for smooth background transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC closes menu & return focus, click outside closes menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const onClick = (e: MouseEvent) => {
      const nav = document.querySelector('nav[aria-label="Primary"]');
      if (open && nav && !nav.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    if (open) {
      window.addEventListener("click", onClick);
    }

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

  return (
    // Super smooth transparent navbar that becomes dark on scroll
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-18 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
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
        <BrandMark className="text-[20px] md:text-[22px]" />

        {/* Premium desktop navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          <li>
            <a
              href="#quote"
              className="nav-link-premium nav-link-primary relative text-cyan-400 hover:text-cyan-300 
                         transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] font-medium px-4 py-2 tracking-wide"
              style={{
                fontFamily:
                  '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
              }}
            >
              Get a Quote
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="nav-link-premium relative text-white/75 hover:text-white 
                         transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] font-medium px-4 py-2 tracking-wide"
              style={{
                fontFamily:
                  '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
              }}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              className="nav-link-premium relative text-white/75 hover:text-white 
                         transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] font-medium px-4 py-2 tracking-wide"
              style={{
                fontFamily:
                  '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
              }}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="nav-link-premium relative text-white/75 hover:text-white 
                         transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] font-medium px-4 py-2 tracking-wide"
              style={{
                fontFamily:
                  '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
              }}
            >
              About Us
            </a>
          </li>
        </ul>

        {/* Premium mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="md:hidden p-3 rounded-lg text-white/75 hover:text-white
                     transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] active:scale-95
                     hover:bg-white/3"
          style={{
            fontFamily:
              '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
          }}
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
            className={`transition-all duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
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
        className={`md:hidden transition-all duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          open
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className={`absolute left-0 right-0 top-full z-50
                     transform transition-all duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] origin-top
                     ${open ? "scale-y-100" : "scale-y-95"}`}
          style={{
            background: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          <ul className="px-6 py-6 space-y-2">
            {[
              { href: "#quote", label: "Get a Quote", primary: true },
              { href: "#services", label: "Services" },
              { href: "#portfolio", label: "Portfolio" },
              { href: "#about", label: "About Us" },
            ].map((item, index) => (
              <li
                key={item.href}
                className={`transform transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                  open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
                style={{
                  transitionDelay: open ? `${(index + 1) * 120}ms` : "0ms",
                }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    block py-3 px-4 rounded-lg font-medium text-base tracking-wide
                    transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                    ${
                      item.primary
                        ? "text-cyan-400 hover:text-cyan-300"
                        : "text-white/75 hover:text-white"
                    }
                  `}
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
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
