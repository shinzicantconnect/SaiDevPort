import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Static palette */
        ink: "#000000",
        paper: "#FFFFFF",
        charcoal: "#0A0A0A",
        graphite: "#141414",
        mist: "#F5F5F5",
        /* CSS-variable aliases — these respond to .dark automatically */
        bg: "var(--bg)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        "fg-faint": "var(--fg-faint)",
        border: "var(--border)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        widest2: "0.35em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
