import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import NavBar from "./components/NavBar";
import MinimalScrollScene from "./components/MinimalScrollScene";
import "./styles/theme.css";
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
        <link
          rel="preload"
          href="/fonts/IosevkaAile-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/IosevkaAile-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/IosevkaAile-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Fallback preloads for TTC files placed in /public/fonts for local testing */}
        <link
          rel="preload"
          href="/fonts/SGr-Iosevka-SemiBold.ttc"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/SGr-Iosevka-Medium.ttc"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/SGr-Iosevka-Regular.ttc"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="text-white">
        <MinimalScrollScene opacity={0.08} />
        <NavBar />
        <InProgressModal />
        {children}
      </body>
    </html>
  );
}
