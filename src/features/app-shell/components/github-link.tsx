import { css } from "$panda/css";
import { IconButton } from "$park/icon-button";
import { type JSX } from "solid-js";
import { useCurrentThemeColor } from "~/features/color-theme";

export function GitHubLink(): JSX.Element {
  const { colorTheme } = useCurrentThemeColor();
  return (
    <IconButton
      variant="ghost"
      size="sm"
      asChild={(props) => {
        return (
          <a {...props} href="https://github.com/wancup/wanTooLs" target="_blank" rel="noreferrer">
            <img
              alt="GitHub Repositoty"
              src={`https://cdn.simpleicons.org/github`}
              class={colorTheme() === "light"
                ? css({ height: "var(--root-header-icon-size)", width: "var(--root-header-icon-size)" })
                : css({
                  height: "var(--root-header-icon-size)",
                  width: "var(--root-header-icon-size)",
                  filter: "invert(1)",
                })}
            />
          </a>
        );
      }}
    />
  );
}
