
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FF6B35",
          foreground: "#FFFFFF",
          50: "#FFF4F2",
          100: "#FFE8E3",
          200: "#FFD6CC",
          300: "#FFB8A6",
          400: "#FF8E70",
          500: "#FF6B35",
          600: "#FF4A1A",
          700: "#E8390F",
          800: "#C02E0A",
          900: "#9F2A0D",
        },
        secondary: {
          DEFAULT: "#FFF4F2",
          foreground: "#FF6B35",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#FFF4F2",
          foreground: "#FF6B35",
        },
        accent: {
          DEFAULT: "#FFE8E3",
          foreground: "#FF6B35",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#FF6B35",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#FF6B35",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
