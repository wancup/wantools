import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { Title } from "@solidjs/meta";
import { type JSX } from "solid-js";
import { KeydownEventChecker, KeyupEventChecker } from "~/features/keyboard-event";
import { makePageTitle, PAGES } from "~/site";

const PAGE_TITLE = makePageTitle(PAGES["keyboard-event"].name);

export default function KeyboardEventPage(): JSX.Element {
  return (
    <main>
      <Title>{PAGE_TITLE}</Title>
      <Heading as="h1" size="xl" class={css({ marginBottom: "1rem" })}>
        {PAGES["keyboard-event"].name}
      </Heading>
      <Heading as="h2" size="lg" class={css({ marginBottom: "1rem" })}>
        On "keydown"
      </Heading>
      <KeydownEventChecker />
      <Heading as="h2" size="lg" class={css({ marginTop: "3rem", marginBottom: "1rem" })}>
        On "keyup"
      </Heading>
      <KeyupEventChecker />
    </main>
  );
}
