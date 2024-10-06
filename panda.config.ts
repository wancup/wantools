import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";

export default defineConfig({
  preflight: true,
  jsxFramework: "solid",
  outdir: "styled-system",
  presets: [
    createPreset({
      accentColor: "plum",
      grayColor: "mauve",
    }),
  ],
  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],
  conditions: {
    light: "[data-theme=light] &",
    dark: "[data-theme=dark] &",
  },
  globalCss: {},
  theme: {
    extend: {
      recipes: {
        link: {
          base: {
            textDecoration: "underline",
          },
        },
      },
    },
  },
});
