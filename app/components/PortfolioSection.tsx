"use client";

import Image from "next/image";

export default function PortfolioSection() {
  const items = [
    { id: 1, kind: "Web", title: "SaaS Dashboard", thumb: null },
    { id: 2, kind: "Merch", title: "Hoodie Graphic", thumb: null },
    { id: 3, kind: "OST", title: "Indie Game OST", thumb: null },
    { id: 4, kind: "Web", title: "Marketing Site", thumb: null },
    { id: 5, kind: "Merch", title: "T‑shirt Series", thumb: null },
    { id: 6, kind: "OST", title: "YouTube Theme", thumb: null },
  ];

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight">
            <span className="block">Portfolio.</span>
            <span className="block text-teal-300 text-base sm:text-xl font-medium mt-2">
              Web • Merch • Soundtracks
            </span>
          </h2>
          <a
            href="#quote"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-md bg-white text-black font-semibold text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            aria-label="Get a quote in 24 hours"
          >
            Get a quote in 24h
          </a>
        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {items.map((it) => (
            <a
              key={it.id}
              href="#quote"
              aria-label={`View ${it.kind} sample: ${it.title}`}
              className="group rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
            >
              <div className="aspect-[4/3] w-full bg-black/40 flex items-center justify-center">
                {it.thumb ? (
                  <Image
                    src={it.thumb}
                    alt={it.title}
                    width={720}
                    height={540}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-white/70 text-sm">{it.title}</div>
                )}
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="text-white font-medium">{it.title}</div>
                <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/80">
                  {it.kind}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

