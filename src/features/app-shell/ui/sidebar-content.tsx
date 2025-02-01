import { css } from "$panda/css";
import { A } from "@solidjs/router";
import { For, type JSX } from "solid-js";
import { PAGES } from "~/site";

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
                  <A
                    href={page.path}
                    class={css({
                      display: "block",
                      padding: "8px 16px",
                      whiteSpace: "nowrap",
                      borderRadius: "l2",
                      _hover: {
                        color: "colorPalette.text",
                        background: "bg.emphasized",
                      },
                      _currentPage: {
                        color: "colorPalette.text",
                      },
                    })}
                  >
                    {page.name}
                  </A>
                </li>
              );
            }}
          </For>
        </ul>
      </nav>
    </aside>
  );
}
