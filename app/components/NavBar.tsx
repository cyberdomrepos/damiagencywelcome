"use client";

import { useEffect, useId, useRef, useState } from "react";
import BrandMark from "./BrandMark";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    // Fixed navbar - transparent initially, solid when scrolled
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="
            mx-auto flex max-w-screen-2xl items-center justify-between
            h-full px-4 py-4 md:px-10 relative z-10 
            text-white"
      >
        <BrandMark className="text-[20px]" />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 text-base">
          <li>
            <a
              href="#quote"
              className="px-4 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 font-medium"
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
              className="px-4 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 font-medium"
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
              className="px-4 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 font-medium"
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
              className="px-4 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 font-medium"
              style={{
                fontFamily:
                  '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
              }}
            >
              About Us
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="md:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
          style={{
            fontFamily:
              '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
          }}
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

      {/* Mobile dropdown */}
      <div
        id={menuId}
        className={`md:hidden transition-all duration-300 ease-in-out ${
          open
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className="
            absolute left-0 right-0 top-full z-50
            bg-black/95 backdrop-blur-md
            border-b border-white/20 shadow-2xl
            min-h-[200px]
          "
        >
          <ul className="px-6 py-8 space-y-3">
            <li>
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="block px-6 py-4 rounded-lg text-white hover:text-cyan-300 hover:bg-white/10 transition-all duration-200 font-medium text-lg"
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
                onClick={() => setOpen(false)}
                className="block px-6 py-4 rounded-lg text-white hover:text-cyan-300 hover:bg-white/10 transition-all duration-200 font-medium text-lg"
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
                onClick={() => setOpen(false)}
                className="block px-6 py-4 rounded-lg text-white hover:text-cyan-300 hover:bg-white/10 transition-all duration-200 font-medium text-lg"
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
                onClick={() => setOpen(false)}
                className="block px-6 py-4 rounded-lg text-white hover:text-cyan-300 hover:bg-white/10 transition-all duration-200 font-medium text-lg"
                style={{
                  fontFamily:
                    '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                }}
              >
                About Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
