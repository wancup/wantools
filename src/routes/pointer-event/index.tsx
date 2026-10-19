import { css } from "$panda/css";
import { Heading } from "@hebium-ui/solid";
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
      <Heading level={1} class={css({ marginBottom: "1rem" })}>
        {CURRENT_PAGE.name}
      </Heading>

      <Heading level={2} class={css({ marginBottom: "1rem" })}>
        On "click"
      </Heading>
      <ClickEventChecker />

      <Heading level={2} class={css({ margin: "3rem 0 1rem" })}>
        On "pointermove"
      </Heading>
      <PointerEventChecker />

      <Heading level={2} class={css({ margin: "3rem 0 1rem" })}>
        Pointer / Mouse / Touch Event
      </Heading>
      <DeviceDifferenceChart />
    </Container>
  );
}
