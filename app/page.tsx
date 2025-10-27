"use client";

// import DeployInfo from "./DeployInfo";
import { useEffect, useState } from "react";
import Section from "./components/Section";
import QuoteBuilder from "./components/QuoteBuilder";
import Footer from "./components/Footer";
import CreativeTrinity from "./components/CreativeTrinity";
import AboutUs from "./components/AboutUs";

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
    <main
      className={`relative min-h-dvh p-6 pt-32 md:pt-36 pb-24 scroll-pt-16 md:scroll-pt-20 transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      data-prefers-reduced-motion={prefersReducedMotion}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <CreativeTrinity
          isLoaded={isLoaded}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/** ABOUT US SECTION */}
        <AboutUs prefersReducedMotion={prefersReducedMotion} />

        {/** GET A QUOTE SECTION */}
        <Section id="quote" title="Get a quote" className="mt-24 md:mt-32">
          <QuoteBuilder prefersReducedMotion={prefersReducedMotion} />
        </Section>

        <div className="mt-24 md:mt-32">
          <Footer prefersReducedMotion={prefersReducedMotion} />
        </div>
      </div>
    </main>
  );
}
