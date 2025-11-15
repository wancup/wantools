import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import { defineConfig } from "vite";
import viteSolid from "vite-plugin-solid";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      sitemap: {
        host: "https://tools.wancup.dev/",
      },
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: false,
        autoStaticPathsDiscovery: true,
        failOnError: true,
      },
    }),
    viteSolid({ ssr: true }),
  ],
});
