import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import NavBar from "./components/NavBar";
import GlobalAnimations from "./components/GlobalAnimations";

// Load only Poppins for the entire site. Other fonts (Inter/Sora/Montserrat)
// were removed to avoid multiple font preloads and mismatched preloads.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0f12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://damiagency.com"),
  title: {
    default: "damiagency — your premium next step",
    template: "%s · damiagency",
  },
  description:
    "Creative tech studio in Dhaka. Design, music, and modern web development—fast, minimal, and performant.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "https://damiagency.com/",
    title: "damiagency — your premium next step",
    description: "Creative tech studio…",
    siteName: "damiagency",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "damiagency — your premium next step",
    description: "Creative tech studio…",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon.svg",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable} data-scroll-behavior="smooth">
      <body className="text-white">
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400/50"
        >
          Skip to main content
        </a>
        <NavBar />
        <main
          id="main-content"
          className="pt-[calc(var(--header-h)+var(--safe-top))]"
        >
          {children}
        </main>
        {/* Global animations: onload and scroll reveal (client) */}
        <GlobalAnimations />

        {/* Sticky mobile CTA removed to avoid overlap with navigation on small screens */}
      </body>
    </html>
  );
}
