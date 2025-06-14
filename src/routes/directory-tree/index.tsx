import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { createFileRoute } from "@tanstack/solid-router";
import type { JSX } from "solid-js";
import { PAGES, SITE } from "~/config";
import { DirectoryTreeInput } from "~/features/directory-tree";

const CURRENT_PAGE = PAGES["directory-tree"];

export const Route = createFileRoute("/directory-tree/")({
  head: () => ({
    meta: [
      { title: SITE.toPageTitle(CURRENT_PAGE.name) },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent(): JSX.Element {
  return (
    <>
      <Heading as="h1" size="xl" class={css({ marginBottom: "0.5rem" })}>
        {CURRENT_PAGE.name}
      </Heading>
      <DirectoryTreeInput />
    </>
  );
}
