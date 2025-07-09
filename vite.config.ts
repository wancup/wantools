import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      pages: [
        {
          path: "/",
          prerender: {
            enabled: true,
            crawlLinks: true,
          },
        },
      ],
      target: "cloudflare-pages-static",
    }),
  ],
});
