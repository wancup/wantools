import { css } from "$panda/css";
import { IconButton } from "$park/icon-button";
import { Menu } from "$park/menu";
import { MoonIcon, SunIcon } from "lucide-solid";
import { createSignal, type JSX, onMount } from "solid-js";
import { match } from "ts-pattern";
import { COLOR_THEME_OPTION, STORAGE_KEY } from "~/site";
import { type ColorTheme } from "../types/color-theme-type";

export function ColorThemeSwitcher(): JSX.Element {
  const [theme, setTheme] = createSignal<ColorTheme>(COLOR_THEME_OPTION.light);

  onMount(() => {
    const currentTheme = document.documentElement.classList.contains(COLOR_THEME_OPTION.dark)
      ? COLOR_THEME_OPTION.dark
      : COLOR_THEME_OPTION.light;
    setTheme(currentTheme);
  });

  const handleSelectTheme = (selectedTheme: string): void => {
    const newTheme = match(selectedTheme)
      .with(COLOR_THEME_OPTION.dark, () => (COLOR_THEME_OPTION.dark))
      .with(COLOR_THEME_OPTION.light, () => COLOR_THEME_OPTION.light)
      .otherwise(() => COLOR_THEME_OPTION.system);
    localStorage.setItem(STORAGE_KEY.colorTheme, newTheme);

    const themeClass = match(newTheme)
      .with("system", () => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return COLOR_THEME_OPTION.dark;
        } else {
          return COLOR_THEME_OPTION.light;
        }
      })
      .otherwise((t) => t);
    document.documentElement.classList.remove(COLOR_THEME_OPTION.dark, COLOR_THEME_OPTION.light);
    document.documentElement.classList.add(themeClass);
  };

  return (
    <Menu.Root
      positioning={{ placement: "bottom-end" }}
      onSelect={(item) => {
        handleSelectTheme(item.value);
      }}
    >
      <Menu.Trigger
        asChild={(triggerProps) => (
          <IconButton {...triggerProps()} variant="ghost" size="sm">
            {match(theme())
              .with("dark", () => <MoonIcon />)
              .with("light", () => <SunIcon />)
              .exhaustive()}
          </IconButton>
        )}
      />
      <Menu.Positioner class={css({ marginRight: "16px" })}>
        <Menu.Content>
          <Menu.ItemGroup>
            <Menu.Item value={COLOR_THEME_OPTION.dark}>
              Dark
            </Menu.Item>
            <Menu.Item value={COLOR_THEME_OPTION.light}>
              Light
            </Menu.Item>
            <Menu.Item value={COLOR_THEME_OPTION.system}>
              System
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
