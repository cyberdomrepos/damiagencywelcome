// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import NavBar from "./components/NavBar";
import AuroraLayer from "./components/AuroraLayer"; // <-- client wrapper

// import Script from "next/script";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap", // recommended tradeoff for UX vs CLS
});

const headingFont = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://damiagency.com"),
  title: {
    default: "damiagency — welcome",
    template: "%s · damiagency",
  },
  description:
    "Creative tech studio in Dhaka. Design, music, and modern web development—fast, minimal, and performant.",
  keywords: [
    "damiagency",
    "web development",
    "design",
    "music",
    "Dhaka",
    "Next.js",
    "Tailwind",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://damiagency.com/",
    title: "damiagency — welcome",
    description:
      "Creative tech studio in Dhaka. Design, music, and modern web development—fast, minimal, and performant.",
    siteName: "damiagency",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "damiagency — welcome",
    description:
      "Creative tech studio in Dhaka. Design, music, and modern web development—fast, minimal, and performant.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      {/* <Script
        src="/a/js/script.js"
        strategy="afterInteractive"
        data-domain="damiagency.com"
        data-api="/a/api/event"
      /> */}

      <body className="relative">
        <div className="fixed inset-0">
          <AuroraLayer />{" "}
        </div>

        <NavBar />
        <main className="relative min-h-screen"> {children}</main>
      </body>
    </html>
  );
}
