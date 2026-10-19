import { css } from "$panda/css";
import { Menu } from "@hebium-ui/solid";
import { CheckIcon, MoonIcon, SunIcon, SunMoonIcon } from "lucide-solid";
import { For, type JSX, Show } from "solid-js";
import { match } from "ts-pattern";
import { COLOR_THEME_OPTION } from "~/config";
import { useCurrentThemeColor } from "../dom/use-current-color-theme";

export function ColorThemeSwitcher(): JSX.Element {
  const { colorThemeOption, setColorThemeOption } = useCurrentThemeColor();

  return (
    <Menu>
      <Menu.Trigger
        variant="ghost"
        color="neutral"
        shape="square"
        aria-label="Change theme color"
        class={css({
          "& svg": {
            width: "var(--root-header-icon-size)",
            height: "var(--root-header-icon-size)",
          },
        })}
      >
        {match(colorThemeOption())
          .with("dark", () => <MoonIcon aria-hidden="true" />)
          .with("light", () => <SunIcon aria-hidden="true" />)
          .with("system", () => <SunMoonIcon aria-hidden="true" />)
          .exhaustive()}
      </Menu.Trigger>
      <Menu.Content position="block-end-span-start">
        <For each={Object.values(COLOR_THEME_OPTION)}>
          {(theme) => (
            <Menu.Item
              role="menuitemradio"
              aria-checked={colorThemeOption() === theme}
              focusKey={theme[0]}
              onAction={() => setColorThemeOption(theme)}
              class={css({ display: "flex", alignItems: "center", gap: "0.5rem", textTransform: "capitalize" })}
            >
              <span class={css({ width: "1em", height: "1em" })} aria-hidden="true">
                <Show when={colorThemeOption() === theme}>
                  <CheckIcon size="1em" />
                </Show>
              </span>
              {theme}
            </Menu.Item>
          )}
        </For>
      </Menu.Content>
    </Menu>
  );
}
