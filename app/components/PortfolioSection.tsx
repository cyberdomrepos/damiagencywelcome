import DesignCarousel from "./DesignCarousel";
import MusicCarousel from "./MusicCarousel";
import WebsiteCarousel from "./WebsiteCarousel";
import { useCinematicScroll } from "../hooks/useScrollAnimation";
import React from "react";

function CategoryCarouselWrapper() {
  const { elementRef: headerRef, isVisible: headerVisible } =
    useCinematicScroll({ delay: 0 });
  const { elementRef: statsRef, isVisible: statsVisible } = useCinematicScroll({
    delay: 200,
  });
  const { elementRef: graphicsRef, isVisible: graphicsVisible } =
    useCinematicScroll({ delay: 0 });
  const { elementRef: musicRef, isVisible: musicVisible } = useCinematicScroll({
    delay: 0,
  });
  const { elementRef: webRef, isVisible: webVisible } = useCinematicScroll({
    delay: 0,
  });

  const graphicsImages = [
    {
      src: "/images/portfolio-design/2 ORIN MEDIA MOCKUP BLACK.jpg",
      alt: "Design 1",
    },
    {
      src: "/images/portfolio-design/26 crew MAN mockup white.jpg",
      alt: "Design 2",
    },
    { src: "/images/portfolio-design/3.jpg", alt: "Design 3" },
  ];

  const musicTracks = [
    {
      src: "/audio/downtown-loop.mp3",
      title: "Downtown Loop",
      cover: "/images/media/downtown-loop.jpeg",
    },
    {
      src: "/audio/neon-nights.mp3",
      title: "Neon Nights",
      cover: "/images/media/neon-nights.png",
    },
    {
      src: "/audio/ambient-drift.mp3",
      title: "Ambient Drift",
      cover: "/images/media/ambient-drift-.png",
    },
  ];

  const webImages = [
    {
      src: "/images/portfolio-web/site1-full.png",
      alt: "Portfolio Website 1",
      isLongScreenshot: true,
    },
    {
      src: "/images/portfolio-web/site2-full.png",
      alt: "Portfolio Website 2",
      isLongScreenshot: true,
    },
  ];

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-20">
      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="w-full">
          <div
            ref={headerRef as React.RefObject<HTMLDivElement>}
            className={`max-w-4xl mx-auto text-center ${
              headerVisible ? "reveal-cinematic" : "opacity-0"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              <span className="block">Portfolio.</span>
              <span className="block text-purple-300 text-lg sm:text-xl md:text-2xl font-medium mt-2">
                Web • Merch • Soundtracks
              </span>
            </h2>

            <div className="mt-4 sm:mt-6">
              <div className="mx-auto w-72 border-t border-white/6 mb-4" />
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                We ship beautiful, usable products with high-performance code,
                elevated brand systems, and original media that helps teams
                stand out. Our work focuses on clarity, accessibility, and
                scalable design so you can iterate confidently.
              </p>
            </div>

            <div
              ref={statsRef as React.RefObject<HTMLDivElement>}
              className={`mt-6 ${
                statsVisible ? "reveal-slide-left delay-200" : "opacity-0"
              }`}
            >
              <div className="py-4">
                <div className="flex flex-col gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white/6 rounded-md">
                      <div className="text-sm font-semibold text-white">
                        30+
                      </div>
                      <div className="text-xs text-gray-300">Projects</div>
                    </div>

                    <div className="px-4 py-2 bg-white/6 rounded-md">
                      <div className="text-sm font-semibold text-white">
                        4.9★
                      </div>
                      <div className="text-xs text-gray-300">Avg rating</div>
                    </div>

                    <div className="px-4 py-2 bg-white/6 rounded-md">
                      <div className="text-sm font-semibold text-white">12</div>
                      <div className="text-xs text-gray-300">Countries</div>
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-300">
                    <span className="font-semibold text-white">
                      Professional services
                    </span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span>NDAs</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span>Fixed-scope estimates</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span>Dedicated PM</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span>On-time delivery</span>
                  </div>

                  <div className="text-sm text-gray-400 max-w-xl mt-3">
                    <p>
                      Want to see how we solved challenges for teams like yours?
                      Reach out and we’ll share relevant work and timelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Graphics design carousel */}
        <div
          ref={graphicsRef as React.RefObject<HTMLDivElement>}
          className={`mt-16 sm:mt-20 ${
            graphicsVisible ? "reveal-stagger delay-100" : "opacity-0"
          }`}
        >
          <div className="mb-8 border-t border-white/10 pt-12"></div>
          <h3 className="text-3xl font-extrabold text-white text-center mb-3">
            Graphics design
          </h3>
          <p className="text-sm md:text-base text-white/70 text-center max-w-2xl mx-auto mb-6 leading-relaxed">
            We craft bold visual identities, merch designs, and brand systems
            that help indie game studios stand out. From t-shirts to posters,
            each design is tailored to capture your game&apos;s unique
            aesthetic.
          </p>
          <DesignCarousel
            images={graphicsImages}
            variant="default"
            autoplay
            interval={3000}
          />
        </div>

        {/* Music audio carousel */}
        <div
          ref={musicRef as React.RefObject<HTMLDivElement>}
          className={`mt-16 sm:mt-20 ${
            musicVisible ? "reveal-stagger delay-200" : "opacity-0"
          }`}
        >
          <div className="mb-8 border-t border-white/10 pt-12"></div>
          <h3 className="text-3xl font-extrabold text-white text-center mb-3">
            Music & Audio
          </h3>
          <p className="text-sm md:text-base text-white/70 text-center max-w-2xl mx-auto mb-6 leading-relaxed">
            Original soundtracks and sonic identities designed for games. We
            compose immersive music across genres—RPG, 8-bit, cyberpunk,
            orchestral, and horror—bringing your world to life through sound.
          </p>
          <MusicCarousel
            tracks={musicTracks}
            variant="default"
            interval={6000}
          />
        </div>

        {/* Web design carousel */}
        <div
          ref={webRef as React.RefObject<HTMLDivElement>}
          className={`mt-16 sm:mt-20 ${
            webVisible ? "reveal-stagger delay-300" : "opacity-0"
          }`}
        >
          <div className="mb-8 border-t border-white/10 pt-12"></div>
          <h3 className="text-3xl font-extrabold text-white text-center mb-3">
            Web design
          </h3>
          <p className="text-sm md:text-base text-white/70 text-center max-w-2xl mx-auto mb-6 leading-relaxed">
            High-performance websites built with Next.js and React. We deliver
            fast, accessible, and beautiful web experiences with clean code,
            responsive design, and attention to performance budgets.
          </p>
          <WebsiteCarousel images={webImages} autoplay interval={5000} />
        </div>
      </div>
    </section>
  );
}

export default CategoryCarouselWrapper;
