import { css } from "$panda/css";
import { Button } from "@hebium-ui/solid";
import { type JSX } from "solid-js";
import { useCurrentThemeColor } from "~/features/color-theme";

export function GitHubLink(): JSX.Element {
  const { colorTheme } = useCurrentThemeColor();
  return (
    <Button
      as="a"
      href="https://github.com/wancup/wanTooLs"
      target="_blank"
      rel="noreferrer"
      variant="ghost"
      color="neutral"
      shape="square"
    >
      <img
        alt="GitHub Repository"
        src="https://cdn.simpleicons.org/github"
        class={css({ height: "var(--root-header-icon-size)", width: "var(--root-header-icon-size)" })}
        style={{ filter: colorTheme() === "dark" ? "invert(1)" : "none" }}
      />
    </Button>
  );
}
