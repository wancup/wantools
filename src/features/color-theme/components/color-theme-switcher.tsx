import { css } from "$panda/css";
import { IconButton } from "$park/icon-button";
import { Menu } from "$park/menu";
import { CheckIcon, MoonIcon, SunIcon, SunMoonIcon } from "lucide-solid";
import { Index, type JSX } from "solid-js";
import { match } from "ts-pattern";
import { COLOR_THEME_OPTION } from "~/site";
import { useCurrentThemeColor } from "../dom/use-current-color-theme";

export function ColorThemeSwitcher(): JSX.Element {
  const { colorThemeOption, setColorThemeOption } = useCurrentThemeColor();

  return (
    <Menu.Root
      positioning={{ placement: "bottom-end" }}
    >
      <Menu.Trigger
        asChild={(triggerProps) => (
          <IconButton
            {...triggerProps()}
            variant="ghost"
            size="sm"
            aria-label="Change theme color"
            class={css({
              padding: 0,
              "& svg": {
                width: "var(--root-header-icon-size)",
                height: "var(--root-header-icon-size)",
              },
            })}
          >
            {match(colorThemeOption())
              .with("dark", () => <MoonIcon size={24} />)
              .with("light", () => <SunIcon size={24} />)
              .with("system", () => <SunMoonIcon size={24} />)
              .exhaustive()}
          </IconButton>
        )}
      />
      <Menu.Positioner class={css({ marginRight: "16px" })}>
        <Menu.Content>
          <Menu.RadioItemGroup
            value={colorThemeOption()}
            onValueChange={(theme) => {
              setColorThemeOption(theme.value);
            }}
          >
            <Index each={Object.values(COLOR_THEME_OPTION)}>
              {(theme) => (
                <Menu.RadioItem value={theme()}>
                  <Menu.ItemIndicator>
                    <CheckIcon />
                  </Menu.ItemIndicator>
                  <Menu.ItemText class={css({ textTransform: "capitalize" })}>
                    {theme()}
                  </Menu.ItemText>
                </Menu.RadioItem>
              )}
            </Index>
          </Menu.RadioItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
