import { css } from "$panda/css";
import { Button, Drawer } from "@hebium-ui/solid";
import { Link } from "@tanstack/solid-router";
import { MenuIcon } from "lucide-solid";
import { type JSX } from "solid-js";
import logoUrl from "~/assets/images/wantools_logo.svg";
import { PAGES, SITE } from "~/config";
import { ColorThemeSwitcher } from "~/features/color-theme";
import { GitHubLink } from "./github-link";

export function GlobalHeader(): JSX.Element {
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
        <Drawer.Trigger
          aria-label="Open Navigation Menu"
          shape="square"
          variant="ghost"
          color="neutral"
        >
          <MenuIcon
            aria-hidden="true"
            class={css({ height: "var(--root-header-icon-size)", width: "var(--root-header-icon-size)" })}
          />
        </Drawer.Trigger>
      </div>
      <Button variant="ghost" color="neutral" as={Link} to={PAGES["/"].path}>
        <img alt={SITE.name} src={logoUrl} class={css({ width: "10rem" })} />
      </Button>
      <div class={css({ display: "flex", columnGap: "4px" })}>
        <ColorThemeSwitcher />
        <GitHubLink />
      </div>
    </header>
  );
}
