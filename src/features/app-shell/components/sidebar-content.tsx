import { css } from "$panda/css";
import { A } from "@solidjs/router";
import { For, type JSX } from "solid-js";
import { PAGES } from "~/site";

export function SidebarContent(): JSX.Element {
  return (
    <aside>
      <nav>
        <ul class={css({ listStyle: "none", paddingLeft: 0 })}>
          <For each={Object.values(PAGES)}>
            {(page) => {
              return (
                <li>
                  <A
                    href={page.path}
                    class={css({
                      display: "block",
                      padding: "8px 16px",
                      borderRadius: "l2",
                      _hover: {
                        color: "accent.text",
                        background: "bg.emphasized",
                      },
                      _currentPage: {
                        color: "accent.text",
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
