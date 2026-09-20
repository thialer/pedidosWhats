/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
        },
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        ink: {
          900: "#0b0f0c",
          800: "#1a1f1b",
          700: "#2a312c",
        },
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(0,0,0,0.08), 0 2px 6px -2px rgba(0,0,0,0.04)",
        card: "0 8px 30px -12px rgba(0,0,0,0.12)",
        float: "0 12px 40px -8px rgba(225,29,72,0.45)",
        sheet: "0 -8px 40px -4px rgba(0,0,0,0.18)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        "sheet-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pop: {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "60%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fly-to-cart": {
          "0%": { transform: "scale(1) translateY(0)", opacity: "1" },
          "100%": { transform: "scale(0.2) translateY(40vh)", opacity: "0" },
        },
        "badge-bounce": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
      },
      animation: {
        "sheet-up": "sheet-up 0.32s cubic-bezier(0.16,1,0.3,1)",
        "fade-in": "fade-in 0.25s ease-out",
        pop: "pop 0.3s cubic-bezier(0.16,1,0.3,1)",
        "fly-to-cart": "fly-to-cart 0.5s ease-in forwards",
        "badge-bounce": "badge-bounce 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
