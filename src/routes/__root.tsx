import { Heading, HuiProvider } from "@hebium-ui/solid";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/solid-router";
import { type JSX, Suspense } from "solid-js";
import { HydrationScript } from "solid-js/web";
import { SITE, STORAGE_KEY } from "~/config";
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
(() => {
  try {
    const theme = localStorage.getItem(${JSON.stringify(STORAGE_KEY.colorTheme)});
    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.huiColorScheme = theme;
    } else {
      delete document.documentElement.dataset.huiColorScheme;
    }
  } catch {
    // Follow the system preference when storage is unavailable.
  }
})();
`,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => {
    return <Heading level={1}>404 Not Found!</Heading>;
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
        <Suspense>
          <HuiProvider
            defaultProps={{
              DrawerContent: { closedby: "any" },
            }}
          >
            {props.children}
          </HuiProvider>
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}
