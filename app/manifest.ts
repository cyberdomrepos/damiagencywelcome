// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dami Agency",
    short_name: "damiagency",
    description: "Web development, graphic design, and game audio.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f12",
    theme_color: "#0b0f12",
    icons: [
      // Chrome/Android will happily use SVG and maskable
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
