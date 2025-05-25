import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import mauve from "@park-ui/panda-preset/colors/mauve";
import plum from "@park-ui/panda-preset/colors/plum";

export default defineConfig({
  preflight: true,
  jsxFramework: "solid",
  outdir: "styled-system",
  presets: [
    createPreset({
      accentColor: plum,
      grayColor: mauve,
      radius: "sm",
    }),
  ],
  include: ["./park-ui/**/*.{js,jsx,ts,tsx}", "./app/**/*.{ts,tsx}"],
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
