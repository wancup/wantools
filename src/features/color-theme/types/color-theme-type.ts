import { type COLOR_THEME_OPTION } from "~/config";

export type ColorThemeOption = typeof COLOR_THEME_OPTION[keyof typeof COLOR_THEME_OPTION];
export type ColorTheme = Exclude<ColorThemeOption, "system">;
