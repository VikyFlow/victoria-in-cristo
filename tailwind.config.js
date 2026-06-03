/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#101827",
        deepblack: "#07090f",
        warm: "#f3ead8",
        gold: "#d9b56f",
        violetdeep: "#38235f",
        ink: "#161925"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Manrope", "Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        glow: "0 18px 70px rgba(217, 181, 111, 0.18)"
      }
    },
  },
  plugins: [],
};
