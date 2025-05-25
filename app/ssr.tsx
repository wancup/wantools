import { getRouterManifest } from "@tanstack/solid-start/router-manifest";
import { createStartHandler, defaultStreamHandler } from "@tanstack/solid-start/server";

import { createRouter } from "./router";

export default createStartHandler({
  createRouter,
  getRouterManifest,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
})(defaultStreamHandler);
