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
  include: ["./park-ui/**/*.{js,jsx,ts,tsx}", "./src/**/*.{ts,tsx}"],
  exclude: [],
  globalCss: {},
  globalVars: {
    "--root-layout-max-width": "100rem",
    "--root-header-icon-size": "1.5rem",
  },
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
