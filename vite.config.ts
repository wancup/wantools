import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      target: "cloudflare-pages-static",
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
  ],
});
