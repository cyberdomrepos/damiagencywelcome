"use client";

import { useEffect, useState, useRef } from "react";
import GradientUnderline from "./GradientUnderline";

interface AboutUsProps {
  prefersReducedMotion?: boolean;
}

export default function AboutUs({
  prefersReducedMotion = false,
}: AboutUsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);
  const [activeTab, setActiveTab] = useState("story");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger content animation (instant if reduced motion)
          const delay = prefersReducedMotion ? 0 : 400;
          setTimeout(() => setAnimateContent(true), delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);
  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="py-8 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Premium Section Header */}
        <div
          className={`text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 ${
            prefersReducedMotion
              ? "opacity-100"
              : `transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`
          }`}
        >
          <div className="relative">
            <h2
              id="about-title"
              className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-4"
              style={{
                fontFamily:
                  '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                textShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
              }}
            >
              About <span className="text-cyan-400 glow-cyan">Dami</span>Agency
            </h2>
            <p
              className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
              style={{
                fontFamily:
                  '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
              }}
            >
              Where creativity meets technology in perfect harmony
            </p>
            <GradientUnderline className="mx-auto" />
          </div>
        </div>

        {/* Premium Interactive Tabs with Tech SVG Icons */}
        <div
          className={`mb-8 sm:mb-12 md:mb-16 lg:mb-20 ${
            prefersReducedMotion
              ? "opacity-100"
              : `transition-all duration-800 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`
          }`}
        >
          <div className="flex justify-center">
            <div className="glass-card rounded-full p-1 flex flex-wrap sm:flex-nowrap gap-1">
              {[
                {
                  id: "story",
                  label: "Our Story",
                  svg: (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                  ),
                },
                {
                  id: "expertise",
                  label: "Expertise",
                  svg: (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 3l3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z" />
                      <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
                    </svg>
                  ),
                },
                {
                  id: "approach",
                  label: "Approach",
                  svg: (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ),
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 relative overflow-hidden ${
                    activeTab === tab.id
                      ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 shadow-lg shadow-cyan-400/10"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent"></div>
                  )}
                  <div className="relative z-10 flex items-center space-x-2">
                    {tab.svg}
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Premium Content Container with Dark Tech Styling */}
        <div
          className={`relative glass-card glass-card-hover rounded-xl overflow-hidden border border-cyan-400/10 ${
            prefersReducedMotion
              ? "opacity-100"
              : isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-95"
          }`}
          style={{
            transitionDelay: prefersReducedMotion
              ? "0ms"
              : isVisible
              ? "200ms"
              : "0ms",
          }}
        >
          {/* Dark Tech Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Geometric Shapes - Hero Style */}
            <div
              className="absolute top-1/6 left-1/5 w-2 h-2 bg-cyan-400/20 rounded-full blur-sm animate-pulse"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            ></div>
            <div
              className="absolute top-1/4 right-1/4 w-1 h-1 bg-cyan-300/30 rounded-full blur-sm animate-pulse"
              style={{ animationDelay: "1s", animationDuration: "4s" }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/6 w-1.5 h-1.5 bg-cyan-500/15 rounded-full blur-sm animate-pulse"
              style={{ animationDelay: "2s", animationDuration: "5s" }}
            ></div>
            <div
              className="absolute top-3/4 right-1/5 w-0.5 h-0.5 bg-cyan-400/25 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
            ></div>
            <div
              className="absolute bottom-1/3 right-2/3 w-1 h-1 bg-cyan-200/20 rounded-full blur-sm animate-pulse"
              style={{ animationDelay: "1.5s", animationDuration: "4.5s" }}
            ></div>

            {/* Tech Grid Overlay */}
            <div
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `
                linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
              `,
                backgroundSize: "40px 40px",
              }}
            ></div>

            {/* Premium Corner Accents */}
            <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-cyan-400/15"></div>
            <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-cyan-400/15"></div>
            <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-cyan-400/15"></div>
            <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-cyan-400/15"></div>

            {/* Large Glow Orbs */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-cyan-300/3 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/2 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 p-8 md:p-12">
            {/* Dynamic Content Based on Active Tab */}
            {activeTab === "story" && (
              <div
                className={`transition-all duration-500 ${
                  animateContent ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 bg-cyan-400/10 rounded-lg border border-cyan-400/20">
                        <svg
                          className="w-6 h-6 text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                      <h3
                        className="text-2xl font-bold text-white"
                        style={{
                          fontFamily:
                            '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                        }}
                      >
                        Born from Passion
                      </h3>
                    </div>
                    <p
                      className="text-gray-300 leading-relaxed"
                      style={{
                        fontFamily:
                          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                      }}
                    >
                      DamiAgency emerged from a simple belief: the best digital
                      experiences happen when design, development, and sound
                      work in perfect harmony. We started as a small team of
                      creators who were frustrated with fragmented approaches to
                      digital projects.
                    </p>
                    <p
                      className="text-gray-400 leading-relaxed"
                      style={{
                        fontFamily:
                          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                      }}
                    >
                      Today, we're a creative powerhouse that bridges the gap
                      between imagination and reality, crafting experiences that
                      don't just look great—they feel great too.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="glass-card p-6 space-y-4 border border-cyan-400/10 relative overflow-hidden">
                      {/* Premium background effect */}
                      <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/3 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-cyan-300/2 rounded-full blur-xl"></div>
                      </div>

                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center space-x-3 group">
                          <div className="flex items-center justify-center w-8 h-8 bg-cyan-400/10 rounded-full border border-cyan-400/20 group-hover:bg-cyan-400/15 transition-colors duration-300">
                            <svg
                              className="w-4 h-4 text-cyan-400"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19V1h-2v1H7V1H5v1H3.5C2.67 2 2 2.67 2 3.5v15C2 19.33 2.67 20 3.5 20h17c.83 0 1.5-.67 1.5-1.5v-15C22 2.67 21.33 2 20.5 2z" />
                            </svg>
                          </div>
                          <span
                            className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
                            style={{ fontFamily: '"Iosevka Aile", monospace' }}
                          >
                            Founded in 2024
                          </span>
                        </div>

                        <div className="flex items-center space-x-3 group">
                          <div className="flex items-center justify-center w-8 h-8 bg-cyan-400/10 rounded-full border border-cyan-400/20 group-hover:bg-cyan-400/15 transition-colors duration-300">
                            <svg
                              className="w-4 h-4 text-cyan-400"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L11 13.5l-1.5-1.5L8 13.5 11 16.5l6.5-6.5L15.5 8z" />
                            </svg>
                          </div>
                          <span
                            className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
                            style={{ fontFamily: '"Iosevka Aile", monospace' }}
                          >
                            100+ Projects Delivered
                          </span>
                        </div>

                        <div className="flex items-center space-x-3 group">
                          <div className="flex items-center justify-center w-8 h-8 bg-cyan-400/10 rounded-full border border-cyan-400/20 group-hover:bg-cyan-400/15 transition-colors duration-300">
                            <svg
                              className="w-4 h-4 text-cyan-400"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </div>
                          <span
                            className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
                            style={{ fontFamily: '"Iosevka Aile", monospace' }}
                          >
                            3 Core Disciplines
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "expertise" && (
              <div
                className={`transition-all duration-500 ${
                  animateContent ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      svg: (
                        <svg
                          className="w-8 h-8 text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ),
                      title: "Design Excellence",
                      skills: [
                        "Brand Identity",
                        "UI/UX Design",
                        "Visual Systems",
                        "Motion Graphics",
                      ],
                      description:
                        "We craft visual experiences that captivate and convert",
                    },
                    {
                      svg: (
                        <svg
                          className="w-8 h-8 text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
                        </svg>
                      ),
                      title: "Development Mastery",
                      skills: [
                        "React/Next.js",
                        "TypeScript",
                        "WebGL/Three.js",
                        "Performance Optimization",
                      ],
                      description:
                        "Building fast, scalable, and maintainable applications",
                    },
                    {
                      svg: (
                        <svg
                          className="w-8 h-8 text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                      ),
                      title: "Audio Innovation",
                      skills: [
                        "Game Soundtracks",
                        "Audio Branding",
                        "Interactive Sound",
                        "Music Production",
                      ],
                      description:
                        "Creating immersive sonic experiences that enhance digital interactions",
                    },
                  ].map((expertise, index) => (
                    <div
                      key={expertise.title}
                      className="relative glass-card p-6 group hover:bg-cyan-400/5 transition-all duration-500 hover:border-cyan-400/20 border border-transparent overflow-hidden"
                    >
                      {/* Premium Background Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/5 rounded-full blur-xl"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-cyan-300/3 rounded-full blur-lg"></div>
                      </div>

                      <div className="relative z-10">
                        <div className="mb-6 p-3 bg-cyan-400/10 rounded-lg w-fit group-hover:bg-cyan-400/15 transition-colors duration-300">
                          {expertise.svg}
                        </div>
                        <h4
                          className="text-xl font-semibold text-white mb-3"
                          style={{
                            fontFamily: '"Iosevka Aile", monospace',
                          }}
                        >
                          {expertise.title}
                        </h4>
                        <p
                          className="text-gray-400 text-sm mb-4 leading-relaxed"
                          style={{
                            fontFamily: '"Iosevka Aile", monospace',
                          }}
                        >
                          {expertise.description}
                        </p>
                        <div className="space-y-2">
                          {expertise.skills.map((skill) => (
                            <div
                              key={skill}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                              <span
                                className="text-gray-300 text-sm"
                                style={{
                                  fontFamily: '"Iosevka Aile", monospace',
                                }}
                              >
                                {skill}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "approach" && (
              <div
                className={`transition-all duration-500 ${
                  animateContent ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-center mb-8">
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{
                      fontFamily: '"Iosevka Aile", monospace',
                    }}
                  >
                    Our Creative Process
                  </h3>
                  <p
                    className="text-gray-400 max-w-2xl mx-auto"
                    style={{
                      fontFamily: '"Iosevka Aile", monospace',
                    }}
                  >
                    Every great project starts with understanding. Here's how we
                    transform your vision into reality.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      step: "01",
                      title: "Discover",
                      description:
                        "Deep dive into your goals, audience, and vision",
                      svg: (
                        <svg
                          className="w-6 h-6 text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                      ),
                    },
                    {
                      step: "02",
                      title: "Design",
                      description:
                        "Craft beautiful, functional solutions that resonate",
                      svg: (
                        <svg
                          className="w-6 h-6 text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ),
                    },
                    {
                      step: "03",
                      title: "Develop",
                      description:
                        "Build with precision, performance, and scalability in mind",
                      svg: (
                        <svg
                          className="w-6 h-6 text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
                        </svg>
                      ),
                    },
                    {
                      step: "04",
                      title: "Deliver",
                      description: "Launch with confidence and ongoing support",
                      svg: (
                        <svg
                          className="w-6 h-6 text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                        </svg>
                      ),
                    },
                  ].map((phase, index) => (
                    <div key={phase.step} className="relative">
                      <div className="glass-card p-6 text-center group hover:bg-cyan-400/5 transition-all duration-500 h-full border border-cyan-400/10 hover:border-cyan-400/20 relative overflow-hidden">
                        {/* Premium background effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-400/5 rounded-full blur-xl"></div>
                        </div>

                        <div className="relative z-10">
                          {/* Tech Icon with Step Number */}
                          <div className="flex items-center justify-center mb-4">
                            <div className="relative">
                              <div className="flex items-center justify-center w-16 h-16 bg-cyan-400/10 rounded-full border border-cyan-400/20 group-hover:bg-cyan-400/15 transition-colors duration-300">
                                {phase.svg}
                              </div>
                              <div
                                className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-cyan-400 text-black text-xs font-bold rounded-full"
                                style={{
                                  fontFamily: '"Iosevka Aile", monospace',
                                }}
                              >
                                {phase.step.replace("0", "")}
                              </div>
                            </div>
                          </div>

                          <h4
                            className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-100 transition-colors duration-300"
                            style={{
                              fontFamily: '"Iosevka Aile", monospace',
                            }}
                          >
                            {phase.title}
                          </h4>
                          <p
                            className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
                            style={{
                              fontFamily: '"Iosevka Aile", monospace',
                            }}
                          >
                            {phase.description}
                          </p>
                        </div>
                      </div>
                      {index < 3 && (
                        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-cyan-400/30 to-transparent z-10">
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyan-400/40 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Premium CTA Section with Dark Tech Styling */}
            <div className="mt-16 pt-8 border-t border-cyan-400/20 text-center relative">
              {/* Tech accents on border */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400/40 rounded-full"></div>
              <div className="absolute top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-300/30 rounded-full"></div>
              <div className="absolute top-0 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-300/30 rounded-full"></div>

              <p
                className="text-gray-300 mb-8 text-lg"
                style={{
                  fontFamily: '"Iosevka Aile", monospace',
                }}
              >
                Ready to create something extraordinary together?
              </p>
              <button
                className="group relative px-6 py-3 text-white font-medium text-base overflow-hidden 
                           transition-all duration-500 ease-out 
                           border border-cyan-400/40 hover:border-cyan-400/60 rounded-sm
                           bg-black/40 hover:bg-cyan-400/10 
                           backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-400/20 
                           hover:scale-105 active:scale-95"
                style={{
                  fontFamily:
                    '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                }}
              >
                {/* Dark tech background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 opacity-80"></div>

                {/* Premium tech border accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-400/30"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-cyan-400/30"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-cyan-400/30"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyan-400/30"></div>

                {/* Subtle scan line effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent 
                              translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"
                ></div>

                <span className="relative z-10 tracking-wide">
                  Start Your Project
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
