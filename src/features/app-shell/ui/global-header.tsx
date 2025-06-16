import { css } from "$panda/css";
import { IconButton } from "$park/icon-button";
import { Link } from "@tanstack/solid-router";
import { MenuIcon } from "lucide-solid";
import { type JSX, type Setter } from "solid-js";
import logoUrl from "~/assets/images/wantools_logo.svg";
import { PAGES, SITE } from "~/config";
import { ColorThemeSwitcher } from "~/features/color-theme";
import { GitHubLink } from "./github-link";

interface GlobalHeaderProps {
  onClickMenuTrigger: Setter<boolean>;
}

export function GlobalHeader(props: GlobalHeaderProps): JSX.Element {
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
            <Link {...props()} to={PAGES["/"].path}>
              <img alt={SITE.name} src={logoUrl} class={css({ width: "10rem" })} />
            </Link>
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
