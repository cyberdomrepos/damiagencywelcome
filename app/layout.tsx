// app/layout.tsx
export const metadata = {
  title: "damiagency — welcome",
  description: "Minimal text-only domain test page.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
