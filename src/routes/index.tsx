import { css } from "$panda/css";
import { Heading } from "@hebium-ui/solid";
import { createFileRoute } from "@tanstack/solid-router";
import type { JSX } from "solid-js";
import { SITE } from "~/config";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home(): JSX.Element {
  return (
    <>
      <Heading level={1} class={css({ marginBottom: "0.5rem" })}>
        {SITE.name}
      </Heading>
      <p>
        {SITE.description}
      </p>
    </>
  );
}
