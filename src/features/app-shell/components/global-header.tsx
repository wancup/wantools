import { css } from "$panda/css";
import { IconButton } from "$park/icon-button";
import { MenuIcon } from "lucide-solid";
import { type JSX, type Setter } from "solid-js";
import { ColorThemeSwitcher } from "~/features/color-theme";
import { SITE } from "~/site";

interface GlobalHeaderProps {
  onClickMenuTrigger: Setter<boolean>;
}

export function GlobalHeader(props: GlobalHeaderProps): JSX.Element {
  return (
    <header class={css({ display: "flex", padding: "16px", justifyContent: "space-between" })}>
      <span>{SITE.name}</span>
      <div class={css({ display: "flex", columnGap: "4px" })}>
        <ColorThemeSwitcher />
        <div class={css({ md: { display: "none" } })}>
          <IconButton
            aria-label="Open Navigation Menu"
            size="sm"
            variant="ghost"
            onClick={() => props.onClickMenuTrigger(true)}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
