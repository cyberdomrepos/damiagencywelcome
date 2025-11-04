import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import NavBar from "./components/NavBar";
import MinimalScrollSceneLoader from "./components/MinimalScrollSceneLoader";
import InProgressModal from "./components/InProgressModal";

// Iosevka Aile is loaded via CSS import in globals.css
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const headingFont = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
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
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <head>
        {/* Preload local Iosevka fonts when present to reduce FOUT */}
        {/* Fallback preloads for TTC files placed in /public/fonts for local testing */}
      </head>
      <body className="text-white">
        <MinimalScrollSceneLoader opacity={0.12} />
        <NavBar />
        <InProgressModal />
        {/* Ensure page content is pushed below the fixed header and accounts for safe-area inset */}
        <main className="pt-[calc(var(--header-h)+var(--safe-top))]">
          {children}
        </main>
      </body>
    </html>
  );
}
