// import DeployInfo from "./DeployInfo";
import ThreeAurora from "./ThreeAurora";

export const metadata = {
  title: "DamiAgency - Welcome",
  description: "Minimal Welcome Page",
};

export default function Page() {
  return (
    <main className="relative min-h-dvh flex items-center justify-center p-6">
      <ThreeAurora />
      <article className="relative z-10 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-neutral-100 leading-tight text-balance drop-shadow-[0_12px_36px_rgba(0,0,0,0.55)]">
          Welcome to DamiAgency!
        </h1>
        <div
          className="mt-4 h-px w-40 md:w-56 mx-auto 
                bg-linear-to-r from-cyan-400/60 via-cyan-300/30 to-transparent"
        />
        <p className="mt-5 text-base md:text-lg leading-relaxed text-neutral-300">
          We’re an independent studio crafting fast websites, striking visuals,
          and original music. This welcome page is the starting line—lightweight
          by design, focused on clarity and speed. Bring us the rough idea and
          we’ll shape it into something production-ready: scoped, designed,
          built, and delivered with care.
        </p>
        <div
          className="mt-4 h-px w-40 md:w-56 mx-auto 
                bg-linear-to-r from-cyan-400/60 via-cyan-300/30 to-transparent"
        />

        <section className="mt-8 text-left mx-auto max-w-2xl">
          <h2 className="text-md font-semibold text-center uppercase tracking-[0.18em] text-neutral-400">
            What we offer
          </h2>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2
             w-[60vw] max-w-3xl h-56 rounded-[999px]
             bg-[radial-gradient(closest-side,rgba(34,211,238,0.18),transparent_70%)]
             blur-3xl"
          ></div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2
             w-[60vw] max-w-3xl h-56 rounded-[999px]
             bg-[radial-gradient(closest-side,rgba(34,211,238,0.18),transparent_70%)]
             blur-3xl"
          ></div>
          <ul className="mt-3 space-y-2">
            <li className="rounded-sm border border-white/10 bg-white/5 px-4 py-3">
              <p className="font-medium text-neutral-100">
                Web development &amp; design
              </p>
              <p className="text-sm text-neutral-300">
                Modern, accessible sites with clean UX, fast loads, and
                maintainable code.
              </p>
            </li>
            <li className="rounded-sm border border-white/10 bg-white/5 px-4 py-3">
              <p className="font-medium text-neutral-100">Graphic design</p>
              <p className="text-sm text-neutral-300">
                Brand marks, visual systems, and campaign assets that travel
                well across screens.
              </p>
            </li>
            <li className="rounded-sm border border-white/10 bg-white/5 px-4 py-3">
              <p className="font-medium text-neutral-100">Music &amp; sound</p>
              <p className="text-sm text-neutral-300">
                Original cues, sound design, and mixes tailored for games, film,
                and ads.
              </p>
            </li>
            <li className="rounded-sm border border-white/10 bg-white/5 px-4 py-3">
              <p className="font-medium text-neutral-100">
                3D Modeling &amp; Animation
              </p>
              <p className="text-sm text-neutral-300">
                Original 3D, Modeling, and mixes of Animation for games, film,
                and ads.
              </p>
            </li>
            <li className="rounded-sm border border-white/10 bg-white/5 px-4 py-3">
              <p className="font-medium text-neutral-100">Ongoing support</p>
              <p className="text-sm text-neutral-300">
                Iteration, performance tuning, and content updates as your thing
                grows.
              </p>
            </li>
          </ul>
        </section>

        <p className="mt-6">
          <a
            href="mailto:rhymedominic.costa@damiagency.com"
            aria-label="Contact DamiAgency via email"
            className="inline-block rounded- px-5 py-2.5
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
    </main>
  );
}
