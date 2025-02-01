import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { Title } from "@solidjs/meta";
import { type JSX } from "solid-js";
import { ClickEventChecker, DeviceDifferenceChart, PointerEventChecker } from "~/features/pointer-event";
import { makePageTitle, PAGES } from "~/site";
import { Container } from "~/ui";

const PAGE_TITLE = makePageTitle(PAGES["pointer-event"].name);

export default function PointerEventPage(): JSX.Element {
  return (
    <main>
      <Title>{PAGE_TITLE}</Title>
      <Container>
        <Heading as="h1" size="xl" class={css({ marginBottom: "1rem" })}>
          {PAGES["pointer-event"].name}
        </Heading>

        <Heading as="h2" size="lg" class={css({ marginBottom: "1rem" })}>
          On "click"
        </Heading>
        <ClickEventChecker />

        <Heading as="h2" size="lg" class={css({ margin: "3rem 0 1rem" })}>
          On "pointermove"
        </Heading>
        <PointerEventChecker />

        <Heading as="h2" size="lg" class={css({ margin: "3rem 0 1rem" })}>
          Pointer / Mouse / Touch Event
        </Heading>
        <DeviceDifferenceChart />
      </Container>
    </main>
  );
}
