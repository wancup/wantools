import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import { defineConfig } from "vite";
import viteSolid from "vite-plugin-solid";

export default defineConfig({
  plugins: [
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
  resolve: {
    tsconfigPaths: true,
  },
});
