"use client";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  focus: "design" | "audio" | "development";
}

const pricingTiers: PricingTier[] = [
  {
    name: "Design Focus",
    price: "$2,500",
    period: "project",
    description: "Complete brand identity & web design solution",
    focus: "design",
    features: [
      "Brand strategy & identity design",
      "Logo + brand guidelines",
      "UI/UX design (5-10 pages)",
      "Mobile-first responsive design",
      "Style guide & assets",
      "2 rounds of revisions",
      "48-hour delivery",
    ],
    cta: "Start Design Project",
  },
  {
    name: "Full Experience",
    price: "$4,500",
    period: "project",
    description: "Design + Audio + Development - Complete transformation",
    focus: "design",
    popular: true,
    features: [
      "Everything in Design Focus",
      "Custom audio branding package",
      "Website development & deployment",
      "Performance optimization",
      "SEO setup & analytics",
      "Content management system",
      "3 months support included",
    ],
    cta: "Transform My Business",
  },
  {
    name: "Audio Branding",
    price: "$1,200",
    period: "package",
    description: "Memorable sonic identity for your brand",
    focus: "audio",
    features: [
      "Brand audio consultation",
      "Custom audio logo/jingle",
      "Website background music",
      "Social media sound assets",
      "Notification sounds pack",
      "Audio brand guidelines",
      "Commercial usage rights",
    ],
    cta: "Create Audio Identity",
  },
];

export default function Pricing() {
  return (
    <section className="relative py-20 px-6 bg-black/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">
            Investment <span className="text-cyan-400 glow-cyan">Packages</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-mono">
            Transparent pricing for professional design-first solutions
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-700 group
                         hero-text ${
                           tier.popular
                             ? "bg-gradient-to-b from-cyan-500/10 to-black/40 border-cyan-500/50 scale-105"
                             : "bg-black/40 border-gray-700 hover:border-cyan-500/30 hover:bg-black/60"
                         }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-black 
                                 px-4 py-1 rounded-full text-sm font-bold font-mono"
                  >
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Focus Badge */}
              <div className="flex justify-between items-start mb-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold
                               ${
                                 tier.focus === "design"
                                   ? "bg-cyan-500/20 text-cyan-400"
                                   : tier.focus === "audio"
                                   ? "bg-purple-500/20 text-purple-400"
                                   : "bg-green-500/20 text-green-400"
                               }`}
                >
                  {tier.focus.toUpperCase()}
                </span>
              </div>

              {/* Tier Name */}
              <h3 className="text-2xl font-bold text-white mb-2 font-mono">
                {tier.name}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6 font-mono leading-relaxed">
                {tier.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white font-mono">
                    {tier.price}
                  </span>
                  <span className="text-gray-400 ml-2 font-mono">
                    /{tier.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm font-mono">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-lg font-bold transition-all duration-300 
                               transform hover:scale-105 font-mono text-sm
                               ${
                                 tier.popular
                                   ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-black hover:from-cyan-400 hover:to-cyan-500 shadow-lg shadow-cyan-500/25"
                                   : "bg-black/60 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10"
                               }`}
              >
                {tier.cta}
              </button>

              {/* Hover Glow Effect */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-700 
                             rounded-2xl pointer-events-none"
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-black/20 rounded-2xl border border-gray-800">
          <h3 className="text-2xl font-bold text-white mb-4 font-mono">
            Custom Enterprise Solutions
          </h3>
          <p className="text-gray-400 mb-6 font-mono">
            Need something specific? Let's discuss a custom package for your
            business goals.
          </p>
          <button
            className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-800 
                           text-white font-bold rounded-lg hover:from-gray-600 hover:to-gray-700 
                           transition-all duration-300 border border-gray-600 font-mono"
          >
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
