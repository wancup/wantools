import { Heading } from "$park/heading";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/solid-router";
import { type JSX, Suspense } from "solid-js";
import { HydrationScript } from "solid-js/web";
import { SITE } from "~/config";
import { AppShell } from "~/features/app-shell";

import appStyles from "~/styles/index.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE.name },
      { name: "description", content: SITE.description },
    ],
    links: [
      { rel: "stylesheet", href: appStyles },
      { rel: "apple-touch-icon", href: "/favicon-180x180.png", sizes: "180x180" },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192x192.png" },
    ],
    scripts: [
      {
        children: `
window.ThemeProvider = (() => {
  const dark = "dark", light = "light";

  let theme;
  let storedTheme = typeof localStorage !== "undefined"
    && localStorage.getItem("color-theme");
  if (storedTheme === dark || storedTheme === light) {
    theme = storedTheme;
  }

  if (typeof theme === "undefined") {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = dark;
    } else {
      theme = light;
    }
  }

  document.documentElement.classList.remove(light, dark);
  document.documentElement.classList.add(theme);
})();
`,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => {
    return <Heading as="h1">404 Not Found!</Heading>;
  },
});

function RootComponent(): JSX.Element {
  return (
    <RootDocument>
      <noscript class="noscript-alert">Please Enable JavaScript!</noscript>
      <AppShell>
        <Outlet />
      </AppShell>
    </RootDocument>
  );
}

function RootDocument(props: Readonly<{ children: JSX.Element }>): JSX.Element {
  return (
    <html lang="en">
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <Suspense>{props.children}</Suspense>
        <Scripts />
      </body>
    </html>
  );
}
