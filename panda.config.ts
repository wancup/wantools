import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: false,
  eject: true,
  jsxFramework: "solid",
  outdir: "styled-system",
  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],
  globalCss: {
    body: {
      fontFamily: "sans-serif",
    },
  },
  globalVars: {
    "--root-layout-max-width": "100rem",
    "--root-header-icon-size": "1.5rem",
  },
  theme: {
    extend: {
      breakpoints: {
        xs: "36em",
        sm: "48em",
        md: "62em",
        lg: "75em",
        xl: "88em",
      },
    },
  },
  conditions: {
    extend: {
      hover: "&:hover",
      currentPage: "&[aria-current=page]",
      motionReduce: "@media (prefers-reduced-motion: reduce)",
      motionSafe: "@media (prefers-reduced-motion: no-preference)",
    },
  },
});
