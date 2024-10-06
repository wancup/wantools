// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { COLOR_THEME_OPTION, STORAGE_KEY } from "./site";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <script
            // eslint-disable-next-line solid/no-innerhtml
            innerHTML={`
const storageKey = "color-theme";
const dark = "${COLOR_THEME_OPTION.dark}", light = "${COLOR_THEME_OPTION.light}";
let theme;

let storedTheme = typeof localStorage !== "undefined" && localStorage.getItem("${STORAGE_KEY.colorTheme}");
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

document.documentElement.classList.remove(light, dark)
document.documentElement.classList.add(theme)
            `}
          />
          {assets}
        </head>
        <body>
          <noscript class="noscript-alert">Please Enable JavaScript!</noscript>
          <div id="app">
            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
));
