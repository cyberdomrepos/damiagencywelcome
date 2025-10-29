"use client";

// import DeployInfo from "./DeployInfo";
import { useEffect, useState } from "react";
import Section from "./components/Section";
import QuoteBuilder from "./components/QuoteBuilder";
import Footer from "./components/Footer";
import CreativeTrinity from "./components/CreativeTrinity";
import AboutUs from "./components/AboutUs";
import InteractiveBackground from "./components/InteractiveBackground";

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial state based on media query
    const updateMotionPreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();

    // Listen for changes to motion preference
    mediaQuery.addEventListener("change", updateMotionPreference);

    // Set loaded state after a brief delay
    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      {/* Interactive Code & Audio Background */}
      <InteractiveBackground prefersReducedMotion={prefersReducedMotion} />

      <main
        className={`relative min-h-dvh px-2 sm:px-4 md:px-6 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-24 scroll-pt-16 md:scroll-pt-20 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        data-prefers-reduced-motion={prefersReducedMotion}
      >
        <div className="relative z-10 mx-auto max-w-7xl">
          {/* HERO SECTION */}
          <CreativeTrinity prefersReducedMotion={prefersReducedMotion} />

          {/* 
            CONSISTENT SPACING SYSTEM:
            - Section gaps: mt-32 sm:mt-40 md:mt-48 lg:mt-56
            - Internal padding: py-8 sm:py-12 md:py-16 lg:py-20
            - Internal spacing: mb-12 sm:mb-16 md:mb-20 lg:mb-24
            - Micro spacing: gap-6 sm:gap-8 md:gap-10 lg:gap-12
          */}

          {/** ABOUT US SECTION */}
          <div className="mt-32 sm:mt-40 md:mt-48 lg:mt-56">
            <AboutUs prefersReducedMotion={prefersReducedMotion} />
          </div>

          {/** GET A QUOTE SECTION */}
          <Section
            id="quote"
            title="Get a quote"
            className="mt-32 sm:mt-40 md:mt-48 lg:mt-56"
          >
            <QuoteBuilder prefersReducedMotion={prefersReducedMotion} />
          </Section>

          {/** FOOTER SECTION */}
          <div className="mt-32 sm:mt-40 md:mt-48 lg:mt-56">
            <Footer prefersReducedMotion={prefersReducedMotion} />
          </div>
        </div>
      </main>
    </>
  );
}
