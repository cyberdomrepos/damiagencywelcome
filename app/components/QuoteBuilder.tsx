"use client";

import { useState, useEffect, useRef } from "react";

interface QuoteBuilderProps {
  prefersReducedMotion?: boolean;
}

export default function QuoteBuilder({
  prefersReducedMotion = false,
}: QuoteBuilderProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = "Quote Request";
    const body = `Name: ${name}\nEmail: ${email}\nService Type: ${serviceType}\nBudget Range: ${budget}\nTimeline: ${timeline}\nProject Details: ${notes}`;
    const mailto = `mailto:rhymedominic.costa@damiagency.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20">
      {/* Dark Tech Background Elements - Mobile Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Tech Particles - Responsive */}
        <div
          className="absolute top-1/4 left-1/5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400/20 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-cyan-300/30 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/6 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-500/15 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/5 w-0.5 h-0.5 bg-cyan-400/25 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
        ></div>

        {/* Tech Grid Overlay - Responsive */}
        <div
          className="absolute inset-0 opacity-[0.01] sm:opacity-[0.015]"
          style={{
            backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "30px 30px",
          }}
        ></div>

        {/* Corner Tech Accents - Responsive */}
        <div className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-l border-t border-cyan-400/10"></div>
        <div className="absolute top-4 sm:top-6 md:top-10 right-4 sm:right-6 md:right-10 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-r border-t border-cyan-400/10"></div>
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-l border-b border-cyan-400/10"></div>
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 right-4 sm:right-6 md:right-10 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-r border-b border-cyan-400/10"></div>
      </div>

      <div
        ref={sectionRef}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6"
      >
        {/* Optional description text - Mobile Optimized */}
        <div
          className={`text-center mb-8 sm:mb-12 md:mb-16 px-2 sm:px-0 ${
            prefersReducedMotion
              ? "opacity-100"
              : `transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`
          }`}
        >
          <p
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto"
            style={{
              fontFamily:
                '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
            }}
          >
            Tell us what you're building and we'll reply with a concise scope,
            timeline, and clear price
          </p>
        </div>

        {/* Premium Dark Tech Form Container - Mobile Optimized */}
        <div
          className={`relative glass-card rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 border border-cyan-400/10 overflow-hidden transition-all duration-1000 hover:border-cyan-400/20 hover:shadow-2xl hover:shadow-cyan-400/10 mx-2 sm:mx-0 ${
            prefersReducedMotion
              ? "opacity-100"
              : isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-95"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Premium Background Effects - Mobile Responsive */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-6 sm:top-10 right-6 sm:right-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-cyan-400/3 rounded-full blur-3xl"></div>
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-cyan-300/2 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-cyan-500/1 rounded-full blur-3xl"></div>
          </div>

          {/* Corner Tech Accents - Mobile Responsive */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-l border-t border-cyan-400/20"></div>
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-r border-t border-cyan-400/20"></div>
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-l border-b border-cyan-400/20"></div>
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-r border-b border-cyan-400/20"></div>

          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Personal Information - Mobile Optimized */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    className="block text-white/90 text-xs sm:text-sm font-light mb-2 sm:mb-3 tracking-wide"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                  >
                    Name *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-sm text-white px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-cyan-400/50 focus:bg-black/60 transition-all duration-300 font-light hover:border-gray-600/60 text-sm sm:text-base"
                      style={{
                        fontFamily:
                          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                      }}
                      placeholder="Your name"
                    />
                    {/* Tech corner accents */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-l border-t border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-r border-t border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-white/90 text-xs sm:text-sm font-light mb-2 sm:mb-3 tracking-wide"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                  >
                    Email *
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-sm text-white px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-cyan-400/50 focus:bg-black/60 transition-all duration-300 font-light hover:border-gray-600/60 text-sm sm:text-base"
                      style={{
                        fontFamily:
                          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                      }}
                      placeholder="your@email.com"
                    />
                    {/* Tech corner accents */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-l border-t border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-r border-t border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                  </div>
                </div>
              </div>

              {/* Project Information - Mobile Optimized */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label
                    className="block text-white/90 text-sm font-light mb-3 tracking-wide"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                  >
                    Service Type
                  </label>
                  <div className="relative group">
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-sm text-white px-4 py-3 focus:outline-none focus:border-cyan-400/50 focus:bg-black/60 transition-all duration-300 font-light hover:border-gray-600/60 cursor-pointer"
                      style={{
                        fontFamily:
                          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                      }}
                    >
                      <option value="" className="bg-gray-900">
                        Select service...
                      </option>
                      <option value="web-development" className="bg-gray-900">
                        Web Development
                      </option>
                      <option value="design" className="bg-gray-900">
                        Visual Design
                      </option>
                      <option value="music" className="bg-gray-900">
                        Music & Audio
                      </option>
                      <option value="full-project" className="bg-gray-900">
                        Complete Project
                      </option>
                      <option value="consultation" className="bg-gray-900">
                        Consultation
                      </option>
                    </select>
                    {/* Tech corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-white/90 text-sm font-light mb-3 tracking-wide"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                  >
                    Budget Range
                  </label>
                  <div className="relative group">
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-sm text-white px-4 py-3 focus:outline-none focus:border-cyan-400/50 focus:bg-black/60 transition-all duration-300 font-light hover:border-gray-600/60 cursor-pointer"
                      style={{
                        fontFamily:
                          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                      }}
                    >
                      <option value="" className="bg-gray-900">
                        Select budget...
                      </option>
                      <option value="under-5k" className="bg-gray-900">
                        Custom
                      </option>
                      <option value="under-5k" className="bg-gray-900">
                        Under $500
                      </option>
                      <option value="under-5k" className="bg-gray-900">
                        $5000 - $5,000
                      </option>
                      <option value="5k-15k" className="bg-gray-900">
                        $5,000 - $15,000
                      </option>
                      <option value="15k-30k" className="bg-gray-900">
                        $15,000 - $30,000
                      </option>
                      <option value="30k-50k" className="bg-gray-900">
                        $30,000 - $50,000
                      </option>
                      <option value="50k-plus" className="bg-gray-900">
                        $50,000+
                      </option>
                    </select>
                    {/* Tech corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-white/90 text-sm font-light mb-3 tracking-wide"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                  >
                    Timeline
                  </label>
                  <div className="relative group">
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-sm text-white px-4 py-3 focus:outline-none focus:border-cyan-400/50 focus:bg-black/60 transition-all duration-300 font-light hover:border-gray-600/60 cursor-pointer"
                      style={{
                        fontFamily:
                          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                      }}
                    >
                      <option value="" className="bg-gray-900">
                        Select timeline...
                      </option>
                      <option value="asap" className="bg-gray-900">
                        ASAP (Rush job)
                      </option>
                      <option value="1-month" className="bg-gray-900">
                        1-2 months
                      </option>
                      <option value="3-months" className="bg-gray-900">
                        2-4 months
                      </option>
                      <option value="6-months" className="bg-gray-900">
                        4-6 months
                      </option>
                      <option value="flexible" className="bg-gray-900">
                        Flexible timeline
                      </option>
                    </select>
                    {/* Tech corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label
                  className="block text-white/90 text-xs sm:text-sm font-light mb-2 sm:mb-3 tracking-wide"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  Project Details
                </label>
                <div className="relative group">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={5}
                    className="w-full bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-sm text-white px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-cyan-400/50 focus:bg-black/60 transition-all duration-300 resize-none font-light hover:border-gray-600/60 text-sm sm:text-base"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                    placeholder="Tell us about your project vision, goals, target audience, technical requirements, design preferences, and any specific features you need."
                  />
                  {/* Tech corner accents - Mobile Responsive */}
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-l border-t border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-r border-t border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-l border-b border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-r border-b border-cyan-400/0 group-focus-within:border-cyan-400/40 transition-colors duration-300"></div>
                </div>
              </div>

              <div className="text-center pt-6 sm:pt-8">
                <button
                  type="submit"
                  className="group relative px-8 sm:px-10 py-3 sm:py-4 text-white font-medium text-sm sm:text-base overflow-hidden 
                           transition-all duration-500 ease-out w-full sm:w-auto
                           border border-cyan-400/40 hover:border-cyan-400/60 rounded-sm
                           bg-black/60 hover:bg-cyan-400/10 
                           backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-400/20 
                           hover:scale-105 active:scale-95"
                >
                  {/* Dark tech background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 opacity-80"></div>

                  {/* Premium tech border accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-cyan-400/30"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-cyan-400/30"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-cyan-400/30"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-cyan-400/30"></div>

                  {/* Subtle scan line effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent 
                              translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"
                  ></div>

                  <span
                    className="relative z-10 tracking-wide flex items-center justify-center space-x-2"
                    style={{
                      fontFamily:
                        '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                    }}
                  >
                    <span>Send Quote Request</span>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </svg>
                  </span>
                </button>
                <p
                  className="text-white/50 text-xs sm:text-sm mt-4 sm:mt-6 font-light max-w-md mx-auto leading-relaxed px-4 sm:px-0"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  This will open your email client with all the details
                  formatted and ready to send. We typically respond within 24
                  hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
