import { createRouter } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";

// oxlint-disable-next-line typescript/explicit-function-return-type -- Keep TanStack Router's inferred route types.
export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  });

  return router;
}
