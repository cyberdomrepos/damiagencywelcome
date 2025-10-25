"use client";

import Rule from "./Rule";
import { useMemo, useState } from "react";

type Service = "web" | "design" | "audio";

const SERVICES: { id: Service; label: string; blurb: string }[] = [
  {
    id: "web",
    label: "Web development",
    blurb:
      "Fast, accessible websites with clean UX and production-ready code. Next.js + TypeScript + Tailwind.",
  },
  {
    id: "design",
    label: "Graphic design (tees & merch)",
    blurb:
      "Print-ready artwork for T-shirts, hoodies, stickers, and posters. Source files on request.",
  },
  {
    id: "audio",
    label: "Music & game audio",
    blurb:
      "Original OSTs and sound design for indie games—clean loops, stingers, and mixes ready for engines.",
  },
];

const SCOPE: Record<Service, string[]> = {
  web: [
    "Landing page",
    "Multi-page site",
    "Blog/CMS",
    "E-commerce",
    "Analytics/SEO",
    "Light animations",
  ],
  design: [
    "T-shirt",
    "Hoodie",
    "Sticker pack",
    "Poster (A3)",
    "Social kit",
    "Print files (final)",
  ],
  audio: [
    "OST tracks",
    "SFX pack",
    "Loops / stingers",
    "Mixing & master",
    "FMOD/Wwise prep",
  ],
};

const BUDGETS = ["TBD / discussing", "$500–1k", "$1k–3k", "$3k–5k", "$5k+"];
const TIMELINES = [
  "Urgent (≤2 weeks)",
  "2–4 weeks",
  "This quarter",
  "Flexible",
];

export default function QuoteBuilder() {
  const [service, setService] = useState<Service>("web");
  const [selectedScope, setSelectedScope] = useState<string[]>([]);
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [timeline, setTimeline] = useState(TIMELINES[3]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const scopeForService = SCOPE[service];
  const toggleScope = (item: string) =>
    setSelectedScope((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );

  const subject = useMemo(
    () => `Quote request – ${SERVICES.find((s) => s.id === service)?.label}`,
    [service]
  );

  const body = useMemo(() => {
    const lines = [
      `Name: ${name || "(your name)"}`,
      `Email: ${email || "(your email)"}`,
      `Project type: ${SERVICES.find((s) => s.id === service)?.label}`,
      `Scope: ${
        selectedScope.length ? selectedScope.join(", ") : "(choose scope)"
      }`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
      "",
      "Brief / links:",
      notes || "(paste any links, must-haves, constraints, references)",
    ];
    return encodeURIComponent(lines.join("\n"));
  }, [name, email, service, selectedScope, budget, timeline, notes]);

  const mailto = `mailto:rhymedominic.costa@damiagency.com?subject=${encodeURIComponent(
    subject
  )}&body=${body}`;

  return (
    <div className="mx-auto max-w-6xl">
      {/* Centered intro (no extra divider; Section already renders <Rule/>) */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-base md:text-lg leading-relaxed text-white/85 mt-6">
          Tell us what you’re building and we’ll reply with a concise scope,
          timeline, and a clear price. Add links, must-haves, and
          deadlines—clarity in → clarity out.
        </p>
      </div>
        <Rule className="mt-6 md:mt-10 max-w-5xl" widthClass="w-full" />

      {/* Two-column layout */}
      <div className="mt-16 grid gap-8 md:gap-10 md:grid-cols-2 text-left">
        {/* LEFT: Project type + Scope */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-white/80">
              Project Type 
            </h3>
            <div className="mt-3 grid gap-4">
              {SERVICES.map((s) => (
                <label
                  key={s.id}
                  className={[
                    "tile cursor-pointer transform-gpu transition",
                    "p-6 md:p-7 hover:bg-white/10 hover:-translate-y-0.5",
                    service === s.id ? "ring-1 ring-cyan-400/50" : "",
                    "motion-reduce:transform-none motion-reduce:transition-none",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="service"
                    value={s.id}
                    checked={service === s.id}
                    onChange={() => {
                      setService(s.id);
                      setSelectedScope([]);
                    }}
                    className="sr-only"
                  />
                  <h4 className="tile-title text-md md:text-lg">{s.label}</h4>
                  <p className="tile-body text-sm md:text-base">{s.blurb}</p>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white/80">Scope</h3>
            <div className="-m-2 mt-3 flex flex-wrap">
              {scopeForService.map((item) => {
                const active = selectedScope.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleScope(item)}
                    aria-pressed={active}
                    className={[
                      "m-1 px-3 py-1.5 text-sm transition border",
                      active
                        ? "border-cyan-400/50 text-cyan-300"
                        : "border-white/15 text-white/80",
                      "hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
                    ].join(" ")}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <p className=" mt-5 text-xs text-white/60">
              Not sure? Pick anything—we’ll right-size scope in the proposal.
            </p>
          </section>
        </div>

        {/* RIGHT: Form + Summary */}
        <div className="border border-white/15 bg-white/5 p-5 md:p-6 shadow-sm">
          <h3 className="text-xl md:text-xl font-semibold text-white/90">
            Project brief
          </h3>

          <div className="mt-4 grid gap-3">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="grid gap-1">
                <span className="text-sm text-white/80">Your name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="h-10 w-full bg-transparent border border-white/15 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm text-white/80">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="h-10 w-full bg-transparent border border-white/15 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                />
              </label>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="grid gap-1">
                <span className="text-sm text-white/80">Budget (USD)</span>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="h-10 w-full bg-transparent border border-white/15 px-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                >
                  {BUDGETS.map((b) => (
                    <option key={b} value={b} className="bg-slate-900">
                      {b}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1">
                <span className="text-sm text-white/80">Timeline</span>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="h-10 w-full bg-transparent border border-white/15 px-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                >
                  {TIMELINES.map((t) => (
                    <option key={t} value={t} className="bg-slate-900">
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-1">
              <span className="text-sm text-white/80">Brief / links</span>
              <textarea
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Drop any links, must-haves, constraints, or references…"
                className="w-full bg-transparent border border-white/15 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
              />
            </label>

            <div className="border border-white/10 bg-white/5 p-3 text-sm text-white/80">
              <p className="font-semibold text-white/90">Your request</p>
              <p className="mt-1">
                <span className="text-white/70">Type:</span>{" "}
                {SERVICES.find((s) => s.id === service)?.label}
              </p>
              <p className="mt-1">
                <span className="text-white/70">Scope:</span>{" "}
                {selectedScope.length ? selectedScope.join(", ") : "—"}
              </p>
              <p className="mt-1">
                <span className="text-white/70">Budget:</span> {budget}
              </p>
              <p className="mt-1">
                <span className="text-white/70">Timeline:</span> {timeline}
              </p>
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href={mailto}
                className="px-4 py-2 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                Send request
              </a>
              <a
                href="mailto:rhymedominic.costa@damiagency.com"
                className="px-4 py-2 border border-white/15 text-white/90 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                Email instead
              </a>
            </div>

            <p className="mt-2 text-xs text-white/50">
              We use your info only to reply to this request. No mailing lists,
              no selling data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
