import "./globals.css"; // <- do not forget this line

export const metadata = {
  title: "damiagency — welcome",
  description: "Minimal text-only domain test page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
