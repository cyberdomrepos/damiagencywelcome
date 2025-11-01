"use client";

import { useEffect, useState } from "react";

interface Props {
  storageKey?: string;
}

export default function InProgressModal({
  storageKey = "inprogress:dismissed",
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(storageKey);
      if (!dismissed) {
        const t = setTimeout(() => setOpen(true), 600);
        return () => clearTimeout(t);
      }
    } catch {
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, [storageKey]);

  function close(persist = true) {
    if (persist) {
      try {
        localStorage.setItem(storageKey, "1");
      } catch {
        /* ignore */
      }
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inprogress-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => close(false)}
      />

      {/* Card */}
      <div className="relative w-[min(96%,780px)] mx-auto">
        <div
          className="rounded-sm p-8 md:p-12"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,8,11,0.96), rgba(10,12,16,0.9))",
            border: "1px solid rgba(34,211,238,0.12)",
            boxShadow:
              "0 20px 60px rgba(2,8,20,0.6), inset 0 1px 0 rgba(255,255,255,0.02)",
          }}
        >
          <div className="flex flex-col items-center text-center gap-6">
            <h1
              id="inprogress-title"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mx-auto"
              style={{
                textShadow: "0 0 24px rgba(34,211,238,0.12)",
                display: "inline-block",
                backgroundImage:
                  "linear-gradient(90deg, rgba(34,211,238,0.14), rgba(99,102,241,0.10))",
                backgroundSize: "40% 6px",
                backgroundPosition: "center 100%",
                backgroundRepeat: "no-repeat",
                paddingBottom: "6px",
                textAlign: "center",
                width: "auto",
              }}
            >
              Site in Progress!
            </h1>

            <p className="max-w-3xl text-lg text-gray-400">
              This preview is live but under active development. You can explore
              the current pages; some features may be incomplete or
              experimental.
            </p>

            <div className="flex gap-4 mt-2 justify-center">
              <button
                onClick={() => close(false)}
                className="px-6 py-3 rounded-md text-sm font-medium text-gray-300 bg-white/3 hover:bg-white/6 transition"
                aria-label="Close"
                style={{ border: "1px solid rgba(34,211,238,0.12)" }}
              >
                Close
              </button>

              <button
                onClick={() => close(true)}
                className="px-6 py-3 rounded-md text-sm font-semibold text-black transition"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(34,211,238,1), rgba(99,102,241,0.95))",
                  boxShadow: "0 10px 30px rgba(34,211,238,0.12)",
                }}
                aria-label="Explore anyway"
              >
                Explore anyway
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
