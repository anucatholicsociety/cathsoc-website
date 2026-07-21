import type { Config } from "tailwindcss";

/**
 * DESIGN TOKENS - single source of truth for brand colour and type.
 *
 * The palette is sampled from the Society's existing branding (posters,
 * annual report, crest): a deep cassock navy, muted vestment gold and a
 * warm ivory ground. Change colours here and the whole site follows.
 *
 * Contrast rules (verified, do not regress):
 *  - body text is ink (#26242E) on ivory (#FAF7F0)            ~13.9:1  AA/AAA
 *  - light text on navy uses ivory (#FAF7F0) on #2E2D41       ~12.8:1  AA/AAA
 *  - gold is decorative or large/bold display only; small gold text uses
 *    gold-deep (#7E6320) on ivory (~5.4:1) or gold-bright (#D9B65C) on navy.
 */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: { DEFAULT: "#FAF7F0", soft: "#F3EEE2" },
        ink: { DEFAULT: "#26242E", soft: "#4B4956" },
        navy: { DEFAULT: "#2E2D41", deep: "#232234", night: "#1C1B29" },
        gold: {
          DEFAULT: "#A9852F",
          deep: "#7E6320",
          bright: "#D9B65C",
          pale: "#EFE4C8",
        },
        stone: { DEFAULT: "#E7E1D2", dark: "#3A3950" },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Source Sans 3"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
        caps: "0.12em",
      },
      borderRadius: {
        arch: "999px 999px 0 0", // the arched photo frame used across Society posters
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
export default config;
