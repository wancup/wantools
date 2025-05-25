import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { createFileRoute } from "@tanstack/solid-router";
import { type JSX } from "solid-js";
import { PAGES, SITE } from "~/config";
import { UuidGenerator } from "./-uuid-generator";

const CURRENT_PAGE = PAGES["uuid"];

export const Route = createFileRoute("/uuid/")({
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
      <Heading as="h1" size="xl" class={css({ marginBottom: "1rem" })}>
        {CURRENT_PAGE.name}
      </Heading>
      <div class={css({ display: "flex", flexDirection: "column", rowGap: "0.75rem" })}>
        <UuidGenerator uuidVersion="v4" />
        <UuidGenerator uuidVersion="v7" />
      </div>
    </>
  );
}
