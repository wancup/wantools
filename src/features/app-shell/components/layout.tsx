import { css } from "$panda/css";
import { Drawer } from "$park/drawer";
import { IconButton } from "$park/icon-button";
import { XIcon } from "lucide-solid";
import { createSignal, type JSX, type ParentProps } from "solid-js";
import { GlobalHeader } from "./global-header";
import { SidebarContent } from "./sidebar-content";

export function Layout(props: ParentProps): JSX.Element {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <GlobalHeader onClickMenuTrigger={setIsOpen} />
      <div class={css({ display: "flex", maxWidth: "100rem", margin: "0 auto", md: { columnGap: "2rem" } })}>
        <div class={css({ display: { base: "none", md: "block" }, padding: "16px" })}>
          <SidebarContent />
        </div>
        <div class={css({ display: { md: "none" } })}>
          <Drawer.Root open={isOpen()} onOpenChange={(detail) => setIsOpen(detail.open)}>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header
                  class={css({ padding: "16px" })}
                >
                  <Drawer.CloseTrigger
                    asChild={(triggerProps) => (
                      <IconButton
                        {...triggerProps()}
                        size="sm"
                        variant="ghost"
                        class={css({ marginLeft: "auto" })}
                      >
                        <XIcon />
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
        <div class={css({ flexGrow: 1, padding: "16px" })}>
          {props.children}
        </div>
      </div>
    </>
  );
}
