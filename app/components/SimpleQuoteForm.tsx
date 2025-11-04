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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          serviceType,
          phone,
          website,
          preferredContact,
          budget,
          timeline,
          engagementType,
          features,
          platforms,
          notes,
          nda,
          timezone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your quote request has been sent successfully. We'll get back to you soon.",
        });
        // Reset form after successful submission
        setName("");
        setEmail("");
        setCompany("");
        setServiceType("");
        setPhone("");
        setWebsite("");
        setPreferredContact("email");
        setBudget("");
        setTimeline("");
        setEngagementType("");
        setFeatures([]);
        setPlatforms([]);
        setNotes("");
        setNda(false);
        setTimezone("");
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send quote request. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full ${fullWidth ? "" : "max-w-3xl mx-auto"} py-12 px-8`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="sq-name"
            className="block text-white text-sm font-medium mb-2"
          >
            Name *
          </label>
          <input
            id="sq-name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="sq-email"
            className="block text-white text-sm font-medium mb-2"
          >
            Email *
          </label>
          <input
            id="sq-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor="sq-company"
            className="block text-white text-sm font-medium mb-2"
          >
            Company
          </label>
          <input
            id="sq-company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
            placeholder="Company (optional)"
          />
        </div>

        <div>
          <label
            htmlFor="sq-service"
            className="block text-white text-sm font-medium mb-2"
          >
            Service
          </label>
          <select
            id="sq-service"
            name="service"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
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
          <label
            htmlFor="sq-phone"
            className="block text-white text-sm font-medium mb-2"
          >
            Phone
          </label>
          <input
            id="sq-phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
            placeholder="Phone (optional)"
          />
        </div>

        <div>
          <label
            htmlFor="sq-website"
            className="block text-white text-sm font-medium mb-2"
          >
            Website
          </label>
          <input
            id="sq-website"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
            placeholder="https://your-site.com"
          />
        </div>

        <div>
          <label
            htmlFor="sq-preferred"
            className="block text-white text-sm font-medium mb-2"
          >
            Preferred contact
          </label>
          <select
            id="sq-preferred"
            name="preferredContact"
            value={preferredContact}
            onChange={(e) => setPreferredContact(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="video">Video call</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div>
          <label
            htmlFor="sq-budget"
            className="block text-white text-sm font-medium mb-2"
          >
            Budget
          </label>
          <select
            id="sq-budget"
            name="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
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
          <label
            htmlFor="sq-timeline"
            className="block text-white text-sm font-medium mb-2"
          >
            Timeline
          </label>
          <select
            id="sq-timeline"
            name="timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
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
          <label
            htmlFor="sq-engagement"
            className="block text-white text-sm font-medium mb-2"
          >
            Engagement
          </label>
          <select
            id="sq-engagement"
            name="engagementType"
            value={engagementType}
            onChange={(e) => setEngagementType(e.target.value)}
            className="w-full rounded-md px-4 py-3 text-black bg-white shadow-sm border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
          >
            <option value="project">Project</option>
            <option value="retainer">Retainer</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="sq-notes"
          className="block text-white text-sm font-medium mb-2"
        >
          Project details
        </label>
        <textarea
          id="sq-notes"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          className="w-full rounded-md px-4 py-4 text-black bg-white shadow-sm border border-transparent min-h-[140px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
          placeholder="Briefly describe the project, goals, and any constraints"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <fieldset className="mb-2">
            <legend className="text-white text-sm font-medium mb-2">
              Key features
            </legend>
            <div className="grid grid-cols-2 gap-2 text-sm text-white">
              {[
                "Authentication",
                "Payments",
                "CMS",
                "Multi-language",
                "Analytics",
                "Integrations",
              ].map((f) => (
                <div key={f} className="inline-flex items-center gap-2">
                  <input
                    id={`feature-${f}`}
                    name={`feature-${f}`}
                    type="checkbox"
                    checked={features.includes(f)}
                    onChange={() =>
                      setFeatures((prev) =>
                        prev.includes(f)
                          ? prev.filter((x) => x !== f)
                          : [...prev, f]
                      )
                    }
                    className="h-4 w-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
                    aria-checked={features.includes(f)}
                  />
                  <label htmlFor={`feature-${f}`}>{f}</label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        <div>
          <fieldset>
            <legend className="text-white text-sm font-medium mb-2">
              Platforms
            </legend>
            <div className="grid grid-cols-2 gap-2 text-sm text-white">
              {["Web", "Mobile", "Desktop", "Embedded", "API", "CMS"].map(
                (p) => (
                  <div key={p} className="inline-flex items-center gap-2">
                    <input
                      id={`platform-${p}`}
                      name={`platform-${p}`}
                      type="checkbox"
                      checked={platforms.includes(p)}
                      onChange={() =>
                        setPlatforms((prev) =>
                          prev.includes(p)
                            ? prev.filter((x) => x !== p)
                            : [...prev, p]
                        )
                      }
                      className="h-4 w-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
                      aria-checked={platforms.includes(p)}
                    />
                    <label htmlFor={`platform-${p}`}>{p}</label>
                  </div>
                )
              )}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
        <label className="inline-flex items-center gap-2 text-white text-sm">
          <input
            id="sq-nda"
            name="nda"
            type="checkbox"
            checked={nda}
            onChange={(e) => setNda(e.target.checked)}
            className="h-4 w-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
            aria-checked={nda}
          />
          <span>NDA required</span>
        </label>

        <input
          id="sq-timezone"
          name="timezone"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          placeholder="Timezone (e.g. GMT+1)"
          className="w-full sm:w-44 sm:ml-auto rounded-md px-3 py-2 text-sm text-black bg-white shadow-sm border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
        />
      </div>

      {/* Status Message */}
      {submitStatus.type && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            submitStatus.type === "success"
              ? "bg-green-600/20 text-green-100 border border-green-500/30"
              : "bg-red-600/20 text-red-100 border border-red-500/30"
          }`}
          role="alert"
          aria-live="polite"
        >
          <p className="text-sm sm:text-base">{submitStatus.message}</p>
        </div>
      )}

      <div className="mt-6 sm:mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label={isSubmitting ? "Sending quote request..." : "Send quote request"}
          className="w-full rounded-lg sm:rounded-xl px-5 sm:px-6 py-4 sm:py-5 bg-white text-black font-semibold text-base sm:text-lg shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Get a quote"}
        </button>
      </div>
    </form>
  );
}
