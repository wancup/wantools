import { css } from "$panda/css";
import { Drawer } from "$park/drawer";
import { IconButton } from "$park/icon-button";
import { useLocation } from "@tanstack/solid-router";
import { XIcon } from "lucide-solid";
import { createEffect, createSignal, type JSX, type ParentProps } from "solid-js";
import { GlobalHeader } from "./global-header";
import { SidebarContent } from "./sidebar-content";

export function AppShell(props: ParentProps): JSX.Element {
  const [isOpen, setIsOpen] = createSignal(false);
  const location = useLocation();

  createEffect((prevPath) => {
    const path = location().pathname;
    if (path !== prevPath) {
      setIsOpen(false);
    }
    return path;
  });

  return (
    <>
      <GlobalHeader onClickMenuTrigger={setIsOpen} />
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
        <div class={css({ display: { md: "none" } })}>
          <Drawer.Root variant="left" open={isOpen()} onOpenChange={(detail) => setIsOpen(detail.open)}>
            <Drawer.Backdrop />
            <Drawer.Positioner class={css({ left: 0 })}>
              <Drawer.Content
                class={css({
                  _open: {
                    animation: "drawer-in-left",
                  },
                  _closed: {
                    animation: "drawer-out-left",
                  },
                })}
              >
                <Drawer.Header
                  class={css({ padding: "16px" })}
                >
                  <Drawer.CloseTrigger
                    asChild={(triggerProps) => (
                      <IconButton
                        {...triggerProps()}
                        size="sm"
                        variant="ghost"
                        class={css({ marginRight: "auto" })}
                      >
                        <XIcon
                          class={css({
                            height: "var(--root-header-icon-size)",
                            width: "var(--root-header-icon-size)",
                          })}
                        />
                      </IconButton>
                    )}
                  />
                </Drawer.Header>
                <Drawer.Body>
                  <SidebarContent />
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Drawer.Root>
        </div>
        <main class={css({ flexGrow: 1, padding: "16px" })}>
          {props.children}
        </main>
      </div>
    </>
  );
}
