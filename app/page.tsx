export default function Home() {
  const now = new Date();

  return (
    <>
      {/* background */}
      <div className="bg-aurora" aria-hidden="true" />

      <main className="fade-in mx-auto max-w-2xl p-6 md:p-10">
        {/* headline */}
        <h1 className="headline text-2xl md:text-3xl font-semibold tracking-tight">
          <span className="underline-shimmer">Damiagency</span> — Domain is Live
        </h1>

        {/* copy */}
        <p className="mt-4 text-balance text-[15px] text-neutral-300/90">
          Your domain is serving correctly. This page is a minimal, text-forward
          checkpoint for <span className="font-medium">DNS</span>,
          <span className="font-medium"> SSL</span>, and basic client rendering.
        </p>

        {/* status */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="dotping" aria-hidden="true" />
            Deployment: <strong>online</strong>
          </span>
          <span className="opacity-60">•</span>
          <span className="opacity-80">
            Served at:{" "}
            {now.toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="opacity-60">•</span>
          <span className="opacity-80">
            SSL:{" "}
            {typeof window !== "undefined" && location.protocol === "https:"
              ? "active"
              : "not active"}
          </span>
        </div>

        {/* actions */}
        <div className="mt-8 space-y-2 text-sm">
          <p>
            Email test:{" "}
            <a
              className="underline decoration-[rgba(0,255,194,.7)] underline-offset-4 hover:opacity-90"
              href="mailto:hello@damiagency.com?subject=Domain%20test&body=This%20is%20a%20test%20from%20the%20welcome%20page."
            >
              damiagencyadmin@damiagency.com
            </a>
          </p>
          <p className="text-neutral-400">
            Cache bust tip: append <code>?v=timestamp</code> to the URL.
          </p>
        </div>

        {/* footer */}
        <footer className="mt-12 text-xs text-neutral-400">
          © {now.getFullYear()} damiagency
        </footer>
      </main>
    </>
  );
}
