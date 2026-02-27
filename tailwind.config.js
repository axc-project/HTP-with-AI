/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#071a2a", 900: "#0a2438", 800: "#0f2f48" },
        parchment: { 50: "#fbf7ef", 100: "#f6efe1", 200: "#efe3cb" },
        gold: { 400: "#d7b56d", 500: "#caa24f", 600: "#b48a2b" },
        ink: { 900: "#0b1320" },
      },
      fontFamily: {
        serif: ["'EB Garamond'", "ui-serif", "Georgia", "serif"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(7,26,42,0.12)",
        card: "0 12px 28px rgba(7,26,42,0.10)",
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};
