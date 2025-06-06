import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { createFileRoute } from "@tanstack/solid-router";
import type { JSX } from "solid-js";
import { Container } from "~/components";
import { PAGES, SITE } from "~/config";
import { ClickEventChecker } from "./-click-event-checker";
import { DeviceDifferenceChart } from "./-device-difference-chart";
import { PointerEventChecker } from "./-pointer-event-checker";

const CURRENT_PAGE = PAGES["pointer-event"];

export const Route = createFileRoute("/pointer-event/")({
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
  );
}
