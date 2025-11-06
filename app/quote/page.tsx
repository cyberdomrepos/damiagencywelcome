"use client";

import dynamic from "next/dynamic";

const QuoteSection = dynamic(() => import("../components/QuoteSection"));

export default function QuotePage() {
  return (
    <div className="min-h-dvh pt-16 sm:pt-20 md:pt-28">
      <QuoteSection />
    </div>
  );
}

