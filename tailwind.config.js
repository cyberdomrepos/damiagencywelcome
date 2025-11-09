/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Use Poppins first, then fall back to system UI stack
        sans: [
          "Poppins",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        // keep a couple of larger display sizes handy for hero/branding
        "display-1": [
          "clamp(2.5rem, 6vw, 5rem)",
          { lineHeight: "1.02", fontWeight: "800" },
        ],
        "display-2": [
          "clamp(1.8rem, 4.5vw, 3.5rem)",
          { lineHeight: "1.04", fontWeight: "700" },
        ],
      },
    },
  },
  plugins: [],
};
