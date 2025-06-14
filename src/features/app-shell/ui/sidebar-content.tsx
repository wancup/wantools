import { css } from "$panda/css";
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
                  <Link
                    to={page.path}
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
                  </Link>
                </li>
              );
            }}
          </For>
        </ul>
      </nav>
    </aside>
  );
}
