import { createMutationObserver } from "@solid-primitives/mutation-observer";
import { type Accessor, createSignal, onMount } from "solid-js";
import { match } from "ts-pattern";
import { COLOR_THEME_OPTION, STORAGE_KEY } from "~/config";
import { type ColorTheme, type ColorThemeOption } from "../types/color-theme-type";

type ColorThemeSetter = (t: string) => ColorTheme;

const [_theme, _setTheme] = createSignal<ColorTheme>("dark");
const [_themeOption, _setThemeOption] = createSignal<ColorThemeOption>("system");

function parseThemeOption(theme: string | null): ColorThemeOption {
  return match(theme)
    .with(COLOR_THEME_OPTION.dark, () => (COLOR_THEME_OPTION.dark))
    .with(COLOR_THEME_OPTION.light, () => COLOR_THEME_OPTION.light)
    .otherwise(() => COLOR_THEME_OPTION.system);
}

function convertThemeColor(option: ColorThemeOption): ColorTheme {
  return match(option)
    .with("system", () => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return COLOR_THEME_OPTION.dark;
      } else {
        return COLOR_THEME_OPTION.light;
      }
    })
    .otherwise((t) => t);
}

export function useCurrentThemeColor(): {
  colorTheme: Accessor<ColorTheme>;
  colorThemeOption: Accessor<ColorThemeOption>;
  setColorThemeOption: ColorThemeSetter;
} {
  onMount(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY.colorTheme);
    const option = parseThemeOption(storedTheme);
    const theme = convertThemeColor(option);

    _setThemeOption(option);
    _setTheme(theme);
  });

  createMutationObserver(
    () => document.documentElement,
    { attributes: true, attributeFilter: ["class"] },
    () => {
      const isLight = document.documentElement.classList.contains(COLOR_THEME_OPTION.light);
      const theme = isLight ? COLOR_THEME_OPTION.light : COLOR_THEME_OPTION.dark;
      _setTheme(theme);
    },
  );

  const setThemeOption: ColorThemeSetter = (newVal) => {
    const option = parseThemeOption(newVal);
    const themeClass = convertThemeColor(option);
    document.documentElement.classList.remove(COLOR_THEME_OPTION.dark, COLOR_THEME_OPTION.light);
    document.documentElement.classList.add(themeClass);
    localStorage.setItem(STORAGE_KEY.colorTheme, option);
    _setThemeOption(option);

    return themeClass;
  };

  return {
    colorTheme: _theme,
    colorThemeOption: _themeOption,
    setColorThemeOption: setThemeOption,
  };
}
