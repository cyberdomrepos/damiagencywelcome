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
    <div ref={sectionRef} className="max-w-4xl mx-auto px-4 sm:px-6">
      <div
        className={`text-center mb-12 sm:mb-16 ${
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
          className="text-white/80 text-base sm:text-lg font-light leading-relaxed max-w-3xl mx-auto px-4 text-center"
          style={{
            fontFamily:
              '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
          }}
        >
          Tell us what you&apos;re building and we&apos;ll reply with a concise
          scope, timeline, and a clear price. Share your vision and we&apos;ll
          make it reality.
        </p>
      </div>

      <div
        className={`relative bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-10 md:p-12 transition-all duration-1000 hover:bg-black/40 hover:border-white/20 hover:shadow-2xl hover:shadow-cyan-400/5 ${
          prefersReducedMotion
            ? "opacity-100"
            : isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <div className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-white/90 text-sm font-light mb-3 tracking-wide"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded text-white px-4 py-3 focus:outline-none focus:border-cyan-400/30 focus:bg-black/30 transition-all duration-300 font-light"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  className="block text-white/90 text-sm font-light mb-3 tracking-wide"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded text-white px-4 py-3 focus:outline-none focus:border-cyan-400/30 focus:bg-black/30 transition-all duration-300 font-light"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Project Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded text-white px-4 py-3 focus:outline-none focus:border-cyan-400/30 focus:bg-black/30 transition-all duration-300 font-light"
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
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded text-white px-4 py-3 focus:outline-none focus:border-cyan-400/30 focus:bg-black/30 transition-all duration-300 font-light"
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
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded text-white px-4 py-3 focus:outline-none focus:border-cyan-400/30 focus:bg-black/30 transition-all duration-300 font-light"
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
              </div>
            </div>

            {/* Project Details */}
            <div>
              <label
                className="block text-white/90 text-sm font-light mb-3 tracking-wide"
                style={{
                  fontFamily:
                    '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                }}
              >
                Project Details
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded text-white px-4 py-3 focus:outline-none focus:border-cyan-400/30 focus:bg-black/30 transition-all duration-300 resize-none font-light"
                style={{
                  fontFamily:
                    '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                }}
                placeholder="Tell us about your project vision, goals, target audience, technical requirements, design preferences, and any specific features you need. The more details you share, the better we can tailor our proposal."
              />
            </div>

            <div className="text-center pt-8">
              <button
                type="submit"
                className="group relative px-12 py-4 bg-black/40 backdrop-blur-md border border-cyan-400/30 rounded-lg text-white font-light text-lg overflow-hidden transition-all duration-500 hover:border-cyan-400/60 hover:bg-black/50 hover:shadow-2xl hover:shadow-cyan-400/10"
              >
                <span
                  className="relative z-10 font-light"
                  style={{
                    fontFamily:
                      '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                  }}
                >
                  Send Quote Request →
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              </button>
              <p
                className="text-white/50 text-sm mt-6 font-light max-w-md mx-auto leading-relaxed"
                style={{
                  fontFamily:
                    '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
                }}
              >
                This will open your email client with all the details formatted
                and ready to send. We typically respond within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
