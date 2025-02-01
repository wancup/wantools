import { css } from "$panda/css";
import { IconButton } from "$park/icon-button";
import { A } from "@solidjs/router";
import { MenuIcon } from "lucide-solid";
import { type JSX, type Setter } from "solid-js";
import darkLogo from "~/assets/images/wanTooLs_dark.svg";
import lightLogo from "~/assets/images/wanTooLs_light.svg";
import { ColorThemeSwitcher, useCurrentThemeColor } from "~/features/color-theme";
import { PAGES, SITE } from "~/site";
import { GitHubLink } from "./github-link";

interface GlobalHeaderProps {
  onClickMenuTrigger: Setter<boolean>;
}

export function GlobalHeader(props: GlobalHeaderProps): JSX.Element {
  const { colorTheme } = useCurrentThemeColor();

  const logoSrc = (): string => colorTheme() === "light" ? lightLogo : darkLogo;
  return (
    <header
      class={css({
        display: "flex",
        maxWidth: "var(--root-layout-max-width)",
        margin: "0 auto",
        padding: "16px",
        justifyContent: "space-between",
        alignItems: "center",
      })}
    >
      <div class={css({ md: { display: "none" } })}>
        <IconButton
          aria-label="Open Navigation Menu"
          size="sm"
          variant="ghost"
          onClick={() => props.onClickMenuTrigger(true)}
        >
          <MenuIcon class={css({ height: "var(--root-header-icon-size)", width: "var(--root-header-icon-size)" })} />
        </IconButton>
      </div>
      <IconButton
        variant="ghost"
        asChild={(props) => {
          return (
            <A {...props()} href={PAGES["/"].path}>
              <img alt={SITE.name} src={logoSrc()} class={css({ width: "10rem" })} />
            </A>
          );
        }}
      />
      <div class={css({ display: "flex", columnGap: "4px" })}>
        <ColorThemeSwitcher />
        <GitHubLink />
      </div>
    </header>
  );
}
