import { css } from "$panda/css";
import { Anchor } from "@hebium-ui/solid";
import { Link } from "@tanstack/solid-router";
import { For, type JSX } from "solid-js";
import { PAGES } from "~/config";

const LINK_LIST = Object.values(PAGES).filter(p => !(Object.hasOwn(p, "hideOnSideBar")));

export function SidebarContent(): JSX.Element {
  return (
    <aside>
      <nav>
        <ul class={css({ listStyle: "none", paddingLeft: 0 })}>
          <For each={LINK_LIST}>
            {(page) => {
              return (
                <li>
                  <Anchor
                    as={Link}
                    to={page.path}
                    color="neutral"
                    decoration="none"
                    class={css({
                      display: "block",
                      padding: "8px 16px",
                      whiteSpace: "nowrap",
                      borderRadius: "calc(1em * var(--hui-radius-ratio-base))",
                      _hover: {
                        color: "var(--hui-color-accent)",
                        background: "var(--hui-color-bg-section)",
                      },
                      _currentPage: {
                        color: "var(--hui-color-accent)",
                      },
                    })}
                  >
                    {page.name}
                  </Anchor>
                </li>
              );
            }}
          </For>
        </ul>
      </nav>
    </aside>
  );
}
