// import DeployInfo from "./DeployInfo";
import Section from "./components/Section";
import Link from "next/link";
import Rule from "./components/Rule";

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
            className="mt-7 h-px w-40 md:w-56 mx-auto 
                bg-linear-to-r from-transparent via-cyan-300/30 to-transparent"
          />

          <section className="mt-8 text-left mx-auto max-w-2xl">
            <h2 className="text-md font-semibold text-center uppercase tracking-[0.18em] text-neutral-400">
              What we offer
            </h2>

            <ul className="mt-3 space-y-2">
              <li className="border border-white/12 bg-white/4 px-4 py-3">
                {" "}
                <p className="font-medium text-neutral-100">
                  Web development &amp; design
                </p>
                <p className="text-sm text-neutral-300">
                  Modern, accessible sites with clean UX, fast loads, and
                  maintainable code.
                </p>
              </li>
              <li className="border border-white/12 bg-white/4 px-4 py-3">
                {" "}
                <p className="font-medium text-neutral-100">Graphic design</p>
                <p className="text-sm text-neutral-300">
                  Brand marks, visual systems, and campaign assets that travel
                  well across screens.
                </p>
              </li>
              <li className="border border-white/12 bg-white/4 px-4 py-3">
                {" "}
                <p className="font-medium text-neutral-100">
                  Music &amp; sound
                </p>
                <p className="text-sm text-neutral-300">
                  Original cues, sound design, and mixes tailored for games,
                  film, and ads.
                </p>
              </li>
              <li className="border border-white/12 bg-white/4 px-4 py-3">
                {" "}
                <p className="font-medium text-neutral-100">
                  3D Modeling &amp; Animation
                </p>
                <p className="text-sm text-neutral-300">
                  Original 3D, Modeling, and mixes of Animation for games, film,
                  and ads.
                </p>
              </li>
              <li className="border border-white/12 bg-white/4 px-4 py-3">
                {" "}
                <p className="font-medium text-neutral-100">Ongoing support</p>
                <p className="text-sm text-neutral-300">
                  Iteration, performance tuning, and content updates as your
                  thing grows.
                </p>
              </li>
            </ul>
          </section>

          <p className="mt-6">
            <a
              href="mailto:damiagency2@gmail.com"
              aria-label="Contact DamiAgency via email"
              className="inline-block px-5 py-2.5
               border border-cyan-400/60 text-cyan-200
               bg-white/0
               hover:bg-cyan-400/15 hover:text-cyan-50
               focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
               transition-colors"
            >
              Contact us
            </a>
          </p>
          {/* <DeployInfo /> */}
        </article>
        <Rule className="mt-16 md:mt-24 max-w-5xl" widthClass="w-full" />
        <Section id="quote" title="Get a quote" className="text-center">
          <div className="mx-auto max-w-2xl">
            <p className="text-base md:text-lg leading-relaxed text-neutral-300">
              Tell us what you’re building and we’ll reply with a scope,
              timeline, and a clear price. Include links, deadlines, and any
              must-haves.
            </p>

            {/* remove the extra divider here — Section already adds one above */}
            {/* <Rule ... />  ← not needed */}
            <Rule className="mt-7" />

            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
              <Link
                href="mailto:rhymedominic.costa@damiagency.com?subject=Project%20quote%20request&body=Hi%20Dami%20Agency%2C%0A%0AProject%20name%3A%20%0AGoals%20%2B%20audience%3A%20%0AKey%20pages%2Ffeatures%3A%20%0ATimeline%3A%20%0ABudget%20range%3A%20%0ALinks%3A%20%0A%0AThanks!"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium
                   border border-cyan-400/50 bg-cyan-500/10 text-white
                   hover:bg-cyan-500/15 focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                Email us
              </Link>

              <Link
                href="#services"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium
                   border border-white/12 bg-white/4 text-white/90
                   hover:bg-white/10 focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                See services
              </Link>
            </div>
            <div className=" mt-6 text-xs ">
              <p className=" ">
                Typical turnaround: proposal in 24–48h after we receive your
                brief.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
