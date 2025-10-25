// import DeployInfo from "./DeployInfo";
import Section from "./components/Section";
import Link from "next/link";
import Rule from "./components/Rule";
import QuoteBuilder from "./components/QuoteBuilder";
import Footer from "./components/Footer";

export const metadata = {
  title: "DamiAgency - Welcome",
  description: "Minimal Welcome Page",
};

export default function Page() {
  return (
    <main className="relative min-h-dvh p-6 pt-[calc(var(--header-h)+100px)] pb-24 scroll-pt-16 md:scroll-pt-20">
      <div className="relative z-10 mx-auto max-w-7xl">
        <article className=" mx-auto text-center">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-neutral-100 leading-tight text-balance drop-shadow-[0_12px_36px_rgba(0,0,0,0.55)]">
            {" "}
            Welcome to <span className="text-cyan-500/90">Dami</span>Agency!
          </h1>

          <div
            className="mt-6 h-px w-40 md:w-56 mx-auto 
                bg-linear-to-r from-transparent via-cyan-300/30 to-transparent"
          />
          <p className="mt-8 text-base md:text-lg leading-relaxed text-neutral-300">
            We’re an independent studio crafting fast websites, striking
            visuals, and original music. This welcome page is the starting
            line—lightweight by design, focused on clarity and speed. Bring us
            the rough idea and we’ll shape it into something production-ready:
            scoped, designed, built, and delivered with care.
          </p>
          <div
            className="mt-6 h-px w-40 md:w-56 mx-auto 
                bg-linear-to-r from-transparent via-cyan-300/30 to-transparent"
          />
          <div className="mt-10 mx-auto max-w-5xl grid gap-4 md:gap-6 lg:grid-cols-3">
            {/* Web Dev */}
            <a
              href="#quote"
              className="tile group block transition-[transform,box-shadow,background-color] duration-200
               hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md
               focus-visible:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cyan-400/60
               motion-reduce:transition-none motion-reduce:transform-none"
              aria-label="Get a quote for web development"
            >
              <h3 className="tile-title">Web development</h3>
              <p className="tile-body">
                Fast, accessible sites with clean UX, solid SEO, and
                production-ready code. Next.js + TypeScript + Tailwind. Deployed
                to Vercel.
              </p>
              <span className="mt-3 inline-flex items-center text-cyan-300">
                Start a project
                <svg
                  className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1
                      motion-reduce:transform-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </a>

            {/* Graphic Design */}
            <a
              href="#quote"
              className="tile group block transition-[transform,box-shadow,background-color] duration-200
               hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md
               focus-visible:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cyan-400/60
               motion-reduce:transition-none motion-reduce:transform-none"
              aria-label="Get a quote for graphic design tees & merch"
            >
              <h3 className="tile-title">Graphic design (tees & merch)</h3>
              <p className="tile-body">
                Bold, print-ready artwork for T-shirts, hoodies, stickers, and
                posters. Source files provided on request.
              </p>
              <span className="mt-3 inline-flex items-center text-cyan-300">
                See options
                <svg
                  className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1
                      motion-reduce:transform-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </a>

            {/* Music / Audio */}
            <a
              href="#quote"
              className="tile group block transition-[transform,box-shadow,background-color] duration-200
               hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md
               focus-visible:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cyan-400/60
               motion-reduce:transition-none motion-reduce:transform-none"
              aria-label="Get a quote for music & game audio"
            >
              <h3 className="tile-title">Music & game audio</h3>
              <p className="tile-body">
                Original soundtracks and sound design for indie games—clean
                loops, stingers, and mixes ready for Unity/Unreal.
              </p>
              <span className="mt-3 inline-flex items-center text-cyan-300">
                Hear details
                <svg
                  className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1
                      motion-reduce:transform-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </a>
          </div>

          {/* CTA row — square corners, no frills */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#services"
              className="px-5 py-2.5 border border-cyan-400/50 text-cyan-300
               hover:bg-cyan-400/10 focus-visible:outline-none
               focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            >
              See services
            </a>
          </div>

          {/* <DeployInfo /> */}
        </article>
        <Rule className="mt-16 md:mt-24 max-w-5xl" widthClass="w-full" />

        {/** GET A QUOTE SECTION */}

        <Section id="quote" title="Get a quote">
          <QuoteBuilder />
        </Section>
        <Footer />
      </div>
    </main>
  );
}
