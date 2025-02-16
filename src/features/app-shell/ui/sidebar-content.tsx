import { css } from "$panda/css";
import { For, type JSX } from "solid-js";
import { PAGES } from "~/config";

const LINK_LIST = Object.values(PAGES).filter(p => !(Object.hasOwn(p, "hideOnSideBar")));

function trimTailingSlash(path: string): string {
  return path.replace(/\/$/, "");
}

interface SidebarContentProps {
  currentPathname: string;
}

export function SidebarContent(props: SidebarContentProps): JSX.Element {
  return (
    <aside>
      <nav>
        <ul class={css({ listStyle: "none", paddingLeft: 0 })}>
          <For each={LINK_LIST}>
            {(page) => {
              return (
                <li>
                  <a
                    aria-current={trimTailingSlash(props.currentPathname) === trimTailingSlash(page.path)
                      ? "page"
                      : undefined}
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
                  </a>
                </li>
              );
            }}
          </For>
        </ul>
      </nav>
    </aside>
  );
}
