"use client";

import { useState } from "react";

interface SimpleQuoteFormProps {
  fullWidth?: boolean;
}

export default function SimpleQuoteForm({
  fullWidth = false,
}: SimpleQuoteFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [preferredContact, setPreferredContact] = useState("email");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [engagementType, setEngagementType] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [nda, setNda] = useState(false);
  const [timezone, setTimezone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = "Quote Request";
    const body = `Name: ${name}\nCompany: ${company}\nPhone: ${phone}\nEmail: ${email}\nWebsite: ${website}\nPreferred contact: ${preferredContact}\nEngagement: ${engagementType}\nService: ${serviceType}\nBudget: ${budget}\nTimeline: ${timeline}\nPlatforms: ${platforms.join(
      ", "
    )}\nFeatures: ${features.join(", ")}\nTimezone: ${timezone}\nNDA: ${
      nda ? "Yes" : "No"
    }\n\nProject details:\n${notes}`;
    const mailto = `mailto:rhymedominic.costa@damiagency.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full ${fullWidth ? "" : "max-w-3xl mx-auto"} py-12 px-8`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Name *
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Company
          </label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent"
            placeholder="Company (optional)"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Service
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent"
          >
            <option value="">Select service...</option>
            <option value="web-development">Web Development</option>
            <option value="design">Visual Design</option>
            <option value="music">Music & Audio</option>
            <option value="full-project">Complete Project</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Phone
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent"
            placeholder="Phone (optional)"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Website
          </label>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent"
            placeholder="https://your-site.com"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Preferred contact
          </label>
          <select
            value={preferredContact}
            onChange={(e) => setPreferredContact(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="video">Video call</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Budget
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent"
          >
            <option value="">Select budget...</option>
            <option value="under-5k">Under $5,000</option>
            <option value="5k-15k">$5,000 - $15,000</option>
            <option value="15k-30k">$15,000 - $30,000</option>
            <option value="30k-50k">$30,000 - $50,000</option>
            <option value="50k+">$50,000+</option>
          </select>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Timeline
          </label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent"
          >
            <option value="">Select timeline...</option>
            <option value="asap">ASAP</option>
            <option value="1-2m">1-2 months</option>
            <option value="3-4m">2-4 months</option>
            <option value="4-6m">4-6 months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Engagement
          </label>
          <select
            value={engagementType}
            onChange={(e) => setEngagementType(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent"
          >
            <option value="project">Project</option>
            <option value="retainer">Retainer</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-white text-sm font-medium mb-2">
          Project details
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          className="w-full rounded-md px-4 py-4 text-black bg-white shadow-sm border border-transparent min-h-[140px]"
          placeholder="Briefly describe the project, goals, and any constraints"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-white text-sm font-medium mb-2">Key features</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-white">
            {[
              "Authentication",
              "Payments",
              "CMS",
              "Multi-language",
              "Analytics",
              "Integrations",
            ].map((f) => (
              <label key={f} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={features.includes(f)}
                  onChange={() =>
                    setFeatures((prev) =>
                      prev.includes(f)
                        ? prev.filter((x) => x !== f)
                        : [...prev, f]
                    )
                  }
                  className="h-4 w-4"
                />
                <span>{f}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-white text-sm font-medium mb-2">Platforms</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-white">
            {["Web", "Mobile", "Desktop", "Embedded", "API", "CMS"].map((p) => (
              <label key={p} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={platforms.includes(p)}
                  onChange={() =>
                    setPlatforms((prev) =>
                      prev.includes(p)
                        ? prev.filter((x) => x !== p)
                        : [...prev, p]
                    )
                  }
                  className="h-4 w-4"
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
        <label className="inline-flex items-center gap-2 text-white text-sm">
          <input
            type="checkbox"
            checked={nda}
            onChange={(e) => setNda(e.target.checked)}
            className="h-4 w-4"
          />
          <span>NDA required</span>
        </label>

        <input
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          placeholder="Timezone (e.g. GMT+1)"
          className="w-full sm:w-44 sm:ml-auto rounded-md px-3 py-2 text-sm text-black bg-white shadow-sm border border-transparent"
        />
      </div>

      <div className="mt-6 sm:mt-8">
        <button
          type="submit"
          className="w-full rounded-lg sm:rounded-xl px-5 sm:px-6 py-4 sm:py-5 bg-white text-black font-semibold text-base sm:text-lg shadow-lg hover:bg-gray-100 transition-colors"
        >
          Get a quote
        </button>
      </div>
    </form>
  );
}
