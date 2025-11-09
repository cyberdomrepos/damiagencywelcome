"use client";

import { useEffect } from "react";

/**
 * GlobalAnimations
 * - Adds `is-loaded` to <html> on window load to allow CSS onload sequences
 * - Uses IntersectionObserver to add `visible` / `scroll-visible` classes to
 *   elements with common animation helper classes (.fade-in, .scale-in, .scroll-fade-in, etc.)
 * - Respects prefers-reduced-motion
 */
export default function GlobalAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

    // Add `is-loaded` once the page has fully loaded so CSS onload animations can run
    const onLoad = () => {
      try {
        document.documentElement.classList.add("is-loaded");
      } catch {
        /* noop */
      }
      // Also, for reduced-motion users, add visible immediately (no transitions)
      if (prefersReduced) {
        const all = document.querySelectorAll<HTMLElement>(
          ".fade-in, .fade-in-left, .fade-in-right, .scale-in, .scroll-fade-in"
        );
        all.forEach((el) => {
          if (el.classList.contains("scroll-fade-in")) {
            el.classList.add("scroll-visible");
          } else {
            el.classList.add("visible");
          }
        });
      }
    };

    if (document.readyState === "complete") {
      // If already loaded, invoke immediately
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { passive: true });
    }

    if (prefersReduced)
      return () => {
        window.removeEventListener("load", onLoad);
      };

    // IntersectionObserver for scroll-triggered reveals
    const selector =
      ".fade-in, .fade-in-left, .fade-in-right, .scale-in, .scroll-fade-in";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            // allow per-element delay via data-animate-delay (ms)
            const delayAttr =
              el.getAttribute("data-animate-delay") ||
              el.getAttribute("data-anim-delay");
            if (delayAttr) {
              const ms = parseInt(delayAttr, 10);
              if (!Number.isNaN(ms) && ms > 0) {
                el.style.transitionDelay = `${ms}ms`;
              }
            }

            if (el.classList.contains("scroll-fade-in")) {
              el.classList.add("scroll-visible");
            } else {
              el.classList.add("visible");
            }
            // unobserve to keep things simple (trigger once)
            observer.unobserve(el);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.08,
      }
    );

    // Helper: decide whether element already has an animation class
    const hasAnimationClass = (el: Element) => {
      return (
        el.classList.contains("fade-in") ||
        el.classList.contains("fade-in-left") ||
        el.classList.contains("fade-in-right") ||
        el.classList.contains("scale-in") ||
        el.classList.contains("scroll-fade-in")
      );
    };

    // Process an element: add default scroll-fade-in if it lacks animation classes and observe
    const processElement = (el: HTMLElement, delayMs?: number) => {
      if (!el || el.hasAttribute("data-anim-disabled")) return;
      if (!hasAnimationClass(el)) {
        // Use scroll-fade-in as the default so animations trigger when element scrolls into view
        el.classList.add("scroll-fade-in");
        if (typeof delayMs === "number") {
          el.setAttribute("data-animate-delay", String(delayMs));
        }
      }
      observer.observe(el);
    };

    // Initial pass: apply to top-level sections within #main-content to cover most components
    const main =
      document.getElementById("main-content") || document.querySelector("main");
    if (main) {
      const children = Array.from(
        main.querySelectorAll<HTMLElement>(":scope > *")
      );
      children.forEach((child, i) => {
        // stagger: 80ms per item (small, subtle)
        processElement(child, i * 80);
      });
    }

    // Also process direct body children to cover components rendered outside main
    const bodyChildren = Array.from(
      document.body ? Array.from(document.body.children) : ([] as Element[])
    );
    bodyChildren
      .filter((c) => {
        const t = (c as Element).tagName;
        // skip non-visual tags
        return !["SCRIPT", "STYLE", "LINK", "META"].includes(t);
      })
      .forEach((el, i) => {
        // small stagger for body-level blocks
        processElement(el as HTMLElement, i * 60);
      });

    // Also observe any existing elements that already have explicit animation classes
    const explicit = Array.from(
      document.querySelectorAll<HTMLElement>(selector)
    );
    explicit.forEach((el) => observer.observe(el));

    // MutationObserver: watch for new nodes and process them (covers lazy-loaded components)
    const mutationRoot = main || document.body;
    const mo = new MutationObserver((muts) => {
      muts.forEach((m) => {
        if (!m.addedNodes || m.addedNodes.length === 0) return;
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          // If node itself matches our selector, process it
          if (node.matches && node.matches(selector)) {
            processElement(node as HTMLElement);
          }
          // Also process direct children that are top-level content blocks
          const blocks = Array.from(
            node.querySelectorAll<HTMLElement>(":scope > *")
          );
          blocks.forEach((b) => processElement(b));
          // Finally, if the added node contains any elements with explicit animation classes, observe them
          const inner = Array.from(
            node.querySelectorAll<HTMLElement>(selector)
          );
          inner.forEach((e) => observer.observe(e));
        });
      });
    });

    mo.observe(mutationRoot, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("load", onLoad);
      observer.disconnect();
    };
  }, []);

  return null;
}
