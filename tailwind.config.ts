import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pure black background
        background: "#000000",
        foreground: "#ffffff",

        card: {
          DEFAULT: "#0a0a0a",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#0a0a0a",
          foreground: "#ffffff",
        },

        // Primary accent - subtle white/gray
        primary: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },

        // Secondary - very dark, almost black
        secondary: {
          DEFAULT: "#0a0a0a",
          foreground: "#a1a1a1",
        },

        // Muted - dark with subtle contrast
        muted: {
          DEFAULT: "#0f0f0f",
          foreground: "#717171",
        },

        // Accent - subtle dark highlight
        accent: {
          DEFAULT: "#1a1a1a",
          foreground: "#ffffff",
        },

        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },

        // Borders - very subtle, almost invisible
        border: "#1a1a1a",
        input: "#1a1a1a",
        ring: "#ffffff",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
