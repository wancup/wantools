import { defineConfig } from "@tanstack/solid-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import { PAGES } from "./app/config";

const STATIC_PATHS = Object.values(PAGES).map((p) => p.path);

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths(),
    ],
  },
  server: {
    prerender: {
      routes: STATIC_PATHS,
    },
  },
});
