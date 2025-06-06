import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { createFileRoute } from "@tanstack/solid-router";
import type { JSX } from "solid-js";
import { Container } from "~/components";
import { PAGES, SITE } from "~/config";
import { KeydownEventChecker } from "./-keydown-event-checker";
import { KeyupEventChecker } from "./-keyup-event-checker";

const CURRENT_PAGE = PAGES["keyboard-event"];

export const Route = createFileRoute("/keyboard-event/")({
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
      <Heading as="h2" size="lg" class={css({ marginBottom: "1rem" })}>
        On "keydown"
      </Heading>
      <KeydownEventChecker />
      <Heading
        as="h2"
        size="lg"
        class={css({ marginTop: "3rem", marginBottom: "1rem" })}
      >
        On "keyup"
      </Heading>
      <KeyupEventChecker />
    </Container>
  );
}
