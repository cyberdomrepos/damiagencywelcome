import "./globals.css";
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import NavBar from "./components/NavBar";
import AuroraLayer from "./components/AuroraLayer";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://damiagency.com"),
  title: { default: "damiagency — welcome", template: "%s · damiagency" },
  description:
    "Creative tech studio in Dhaka. Design, music, and modern web development—fast, minimal, and performant.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "https://damiagency.com/",
    title: "damiagency — welcome",
    description: "Creative tech studio…",
    siteName: "damiagency",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "damiagency — welcome",
    description: "Creative tech studio…",
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
      <body className="bg-black text-white">
        <AuroraLayer /> {/* fixed, behind, client-only */}
        <NavBar />
        <main className="relative z-10 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
