"use client";

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "tech-startup",
    client: "TechFlow Solutions",
    industry: "B2B SaaS",
    challenge: "Needed complete brand identity and high-converting website",
    solution: "Design-first approach with premium UI/UX and audio branding",
    results: [
      "300% increase in qualified leads",
      "45% higher conversion rates",
      "Brand recognition up 250%",
    ],
  },
  {
    id: "ecommerce",
    client: "Luxe Retail Co.",
    industry: "E-commerce",
    challenge: "Poor user experience causing cart abandonment",
    solution: "Complete UX redesign with performance optimization",
    results: [
      "60% reduction in cart abandonment",
      "85% faster page load times",
      "40% increase in average order value",
    ],
  },
  {
    id: "agency",
    client: "Creative Studio X",
    industry: "Design Agency",
    challenge: "Outdated portfolio site not showcasing their work effectively",
    solution: "Interactive portfolio with custom audio branding",
    results: [
      "150% more client inquiries",
      "Premium pricing accepted 90% more",
      "Award-winning design recognition",
    ],
  },
];

export default function CaseStudies() {
  return (
    <section className="relative py-20 px-6 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">
            Success <span className="text-cyan-400 glow-cyan">Stories</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-mono">
            Real results from our design-first approach to digital
            transformation
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="group relative p-6 bg-black/40 border border-gray-800 rounded-xl backdrop-blur-sm 
                         hover:bg-black/60 hover:border-cyan-500/30 transition-all duration-700
                         hero-text"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Client & Industry */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1 font-mono">
                  {study.client}
                </h3>
                <p className="text-cyan-400 text-sm font-mono">
                  {study.industry}
                </p>
              </div>

              {/* Challenge */}
              <div className="mb-4">
                <h4 className="text-gray-300 font-semibold text-sm mb-2 font-mono">
                  Challenge:
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed font-mono">
                  {study.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-4">
                <h4 className="text-gray-300 font-semibold text-sm mb-2 font-mono">
                  Solution:
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed font-mono">
                  {study.solution}
                </p>
              </div>

              {/* Results */}
              <div>
                <h4 className="text-gray-300 font-semibold text-sm mb-3 font-mono">
                  Results:
                </h4>
                <div className="space-y-2">
                  {study.results.map((result, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300 font-mono">{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-700 
                             rounded-xl pointer-events-none"
              ></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg mb-6 font-mono">
            Ready to join our success stories?
          </p>
          <button
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 
                           text-black font-bold rounded-lg hover:from-cyan-400 hover:to-cyan-500 
                           transition-all duration-300 transform hover:scale-105
                           shadow-lg shadow-cyan-500/25 font-mono"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
