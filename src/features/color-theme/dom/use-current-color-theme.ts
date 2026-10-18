import { type Accessor, createSignal, onCleanup, onMount } from "solid-js";
import { STORAGE_KEY } from "~/config";
import { parseThemeOption, resolveThemeColor } from "../logic/color-theme";
import { type ColorTheme, type ColorThemeOption } from "../types/color-theme-type";

const [themeOption, setThemeOption] = createSignal<ColorThemeOption>("system");
const [prefersDark, setPrefersDark] = createSignal(false);

function applyThemeOption(option: ColorThemeOption): void {
  if (option === "system") {
    delete document.documentElement.dataset.huiColorScheme;
  } else {
    document.documentElement.dataset.huiColorScheme = option;
  }
}

export function useCurrentThemeColor(): {
  colorTheme: Accessor<ColorTheme>;
  colorThemeOption: Accessor<ColorThemeOption>;
  setColorThemeOption: (value: string) => ColorTheme;
} {
  onMount(() => {
    let storedTheme: string | null = null;
    try {
      storedTheme = localStorage.getItem(STORAGE_KEY.colorTheme);
    } catch {
      // Follow the system preference when storage is unavailable.
    }

    const option = parseThemeOption(storedTheme);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setPrefersDark(media.matches);
    setThemeOption(option);
    applyThemeOption(option);

    const handleChange = (event: MediaQueryListEvent): void => {
      setPrefersDark(event.matches);
    };
    media.addEventListener("change", handleChange);
    onCleanup(() => {
      media.removeEventListener("change", handleChange);
    });
  });

  const setColorThemeOption = (value: string): ColorTheme => {
    const option = parseThemeOption(value);
    setThemeOption(option);
    applyThemeOption(option);
    try {
      localStorage.setItem(STORAGE_KEY.colorTheme, option);
    } catch {
      // Apply the preference even when it cannot be persisted.
    }
    return resolveThemeColor(option, prefersDark());
  };

  return {
    colorTheme: () => resolveThemeColor(themeOption(), prefersDark()),
    colorThemeOption: themeOption,
    setColorThemeOption,
  };
}
