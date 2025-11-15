import { createRouter } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  });

  return router;
}
