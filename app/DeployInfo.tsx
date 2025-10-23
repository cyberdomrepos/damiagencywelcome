"use client";

import { useEffect, useState } from "react";

export default function DeployInfo() {
  const [now, setNow] = useState("");
  const [https, setHttps] = useState(false);

  useEffect(() => {
    // Defer updates to the next frame to avoid "synchronous setState in effect" warning.
    const raf = requestAnimationFrame(() => {
      setNow(
        new Date().toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      if (typeof window !== "undefined") {
        setHttps(window.location.protocol === "https:");
      }
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="inline-flex w-fit items-center gap-3 rounded-
+                 border border-white/10 bg-white/5 px-3.5 py-1.5
+                 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
+                 mt-4 text-[13px] text-neutral-300"
    >
      <p>
        <span className="font-medium text-neutral-200">Time:</span> {now}
      </p>
      <p className={https ? "text-emerald-300" : "text-amber-300"}>
        {https
          ? "SSL: Active (HTTPS)."
          : "SSL: Inactive (HTTP). On Vercel, HTTPS is automatic."}
      </p>
    </div>
  );
}
