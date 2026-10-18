import { COLOR_THEME_OPTION } from "~/config";
import { type ColorTheme, type ColorThemeOption } from "../types/color-theme-type";

export function parseThemeOption(value: string | null): ColorThemeOption {
  return value === COLOR_THEME_OPTION.light || value === COLOR_THEME_OPTION.dark
    ? value
    : COLOR_THEME_OPTION.system;
}

export function resolveThemeColor(option: ColorThemeOption, prefersDark: boolean): ColorTheme {
  return option === COLOR_THEME_OPTION.system
    ? prefersDark ? COLOR_THEME_OPTION.dark : COLOR_THEME_OPTION.light
    : option;
}
