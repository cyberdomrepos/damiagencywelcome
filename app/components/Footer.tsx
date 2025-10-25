import Rule from "./Rule";
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-labelledby="site-footer" className="mt-20">
      <h2 id="site-footer" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-6">
        {/* top rule to visually anchor the footer */}
        <Rule className="mt-16 md:mt-24 max-w-5xl" widthClass="w-full" />

        {/* 3-column content */}
        <div className="grid gap-6 md:grid-cols-3 mt-8 text-sm">
          {/* Brand */}
          <div className="border border-white/10 bg-white/5 p-5 md:p-6">
            <p className="  text-white/90 font-semibold">DamiAgency</p>
            <p className="mt-1 text-white/70">
              Design, code, and sound—shipped fast with care.
            </p>
            <p className="mt-3">
              <a
                href="mailto:damiagencyadmin@damiagency.com"
                className="text-cyan-300 hover:underline"
              >
                damiagencyadmin@damiagency.com
              </a>
            </p>
          </div>

          {/* Site nav */}
          <nav
            aria-label="Footer"
            className="border border-white/10 bg-white/5 p-5 md:p-6"
          >
            <p className="text-white/90 font-semibold">Site</p>
            <ul className="mt-2 grid gap-1 text-white/75">
              <li>
                <a className="hover:underline" href="#quote">
                  Get a quote
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#portfolio">
                  Portfolio
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#about">
                  About
                </a>
              </li>
            </ul>
          </nav>

          {/* Info */}
          <div className="border border-white/10 bg-white/5 p-5 md:p-6">
            <p className="text-white/90 font-semibold">Info</p>
            <ul className="mt-2 grid gap-1 text-white/75">
              <li>
                <a
                  className="hover:underline"
                  href="/a/api/event"
                  rel="nofollow"
                >
                  Analytics (Plausible proxy)
                </a>
              </li>
              <li className="text-white/60">© {year} DamiAgency</li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
          <p>Built with Next.js + Tailwind • A11y/Best ≥95 target</p>
          <div className="flex items-center gap-4">
            <p>Hosted on Vercel • CSP hardened</p>
            <a
              href="#top"
              className="border border-white/15 bg-white/5 px-2.5 py-1 hover:bg-white/10"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
