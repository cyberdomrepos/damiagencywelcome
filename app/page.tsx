// app/page.tsx
export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">damiagency — domain live</h1>

      <p className="mt-4">
        If you can read this, DNS is resolved and the app is serving over{" "}
        <strong>{typeof window !== "undefined" ? location.protocol : "http(s)"} </strong>.
      </p>

      <section className="mt-6 space-y-3">
        <p>Deployment: online</p>
        <p>
          Server time:{" "}
          {new Date().toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>
          SSL:{" "}
          {typeof window !== "undefined" && location.protocol === "https:"
            ? "active"
            : "not active"}
        </p>
      </section>

      <section className="mt-8 space-y-2">
        <p>
          Email test:{" "}
          <a
            className="underline"
            href="mailto:hello@damiagency.com?subject=Domain%20test&body=This%20is%20a%20test%20from%20the%20welcome%20page."
          >
            hello@damiagency.com
          </a>
        </p>
        <p className="text-sm text-gray-500">
          Tip: if the page looks cached, hard-refresh or add <code>?v=timestamp</code> to the URL.
        </p>
      </section>

      <footer className="mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} damiagency
      </footer>
    </main>
  );
}
