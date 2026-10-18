import { css } from "$panda/css";
import { Drawer } from "@hebium-ui/solid";
import { useLocation } from "@tanstack/solid-router";
import { createEffect, type JSX, type ParentProps } from "solid-js";
import { GlobalHeader } from "./global-header";
import { SidebarContent } from "./sidebar-content";

export function AppShell(props: ParentProps): JSX.Element {
  const location = useLocation();
  let drawer: HTMLDialogElement | undefined;

  createEffect((prevPath: string | undefined) => {
    const path = location().pathname;
    if (path !== prevPath) drawer?.close();
    return path;
  });

  return (
    <Drawer>
      <GlobalHeader />
      <div
        class={css({
          display: "flex",
          maxWidth: "var(--root-layout-max-width)",
          margin: "0 auto",
          md: { columnGap: "2rem" },
        })}
      >
        <div class={css({ display: { base: "none", md: "block" }, padding: "16px" })}>
          <SidebarContent />
        </div>
        <Drawer.Content
          ref={drawer}
          placement="inline-start"
          aria-label="Navigation menu"
          classes={{ root: css({ md: { display: "none" } }) }}
        >
          <SidebarContent />
        </Drawer.Content>
        <main class={css({ flexGrow: 1, minWidth: 0, padding: "16px" })}>
          {props.children}
        </main>
      </div>
    </Drawer>
  );
}
