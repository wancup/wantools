import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { createFileRoute } from "@tanstack/solid-router";
import type { JSX } from "solid-js";
import { PAGES, SITE } from "~/config";
import { UriConverter } from "~/features/uri-encoding";

const CURRENT_PAGE = PAGES["uri-encoding"];
const SAMPLE_URI = "https://example.com/?sakura=桜";

export const Route = createFileRoute("/uri-encoding")({
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
      <Heading as="h2" size="lg" class={css({ marginBottom: "1rem" })}>
        encodeURI()
      </Heading>
      <UriConverter placeholder={SAMPLE_URI} type="uri" />
      <Heading
        as="h2"
        size="lg"
        class={css({ marginTop: "3rem", marginBottom: "1rem" })}
      >
        encodeURIComponent()
      </Heading>
      <UriConverter placeholder={SAMPLE_URI} type="uri-component" />
    </>
  );
}
