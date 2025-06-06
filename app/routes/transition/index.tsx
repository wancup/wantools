import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { createFileRoute } from "@tanstack/solid-router";
import type { JSX } from "solid-js";
import { Container } from "~/components";
import { PAGES, SITE } from "~/config";
import { TransitionList } from "./-transition-list";

const CURRENT_PAGE = PAGES["transition"];

export const Route = createFileRoute("/transition/")({
  head: () => ({
    meta: [
      { title: SITE.toPageTitle(CURRENT_PAGE.name) },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent(): JSX.Element {
  return (
    <Container>
      <Heading as="h1" size="xl" class={css({ marginBottom: "1rem" })}>
        {CURRENT_PAGE.name}
      </Heading>
      <TransitionList />
    </Container>
  );
}
