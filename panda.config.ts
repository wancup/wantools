import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: false,
  outdir: "styled-system",
  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],
  conditions: {
    light: "[data-theme=light] &",
    dark: "[data-theme=dark] &",
  },
  globalCss: {
    body: {
      bg: "stone.100",
      color: "stone.800",
      _dark: {
        bg: "stone.800",
        color: "stone.100",
      },
    },
  },
  theme: {
    extend: {},
  },
});
