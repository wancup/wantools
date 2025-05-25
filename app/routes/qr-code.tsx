import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { createFileRoute } from "@tanstack/solid-router";
import type { JSX } from "solid-js";
import { PAGES, SITE } from "~/config";
import { QrCodeGenerator } from "~/features/qr-code";

const CURRENT_PAGE = PAGES["qr-code"];

export const Route = createFileRoute("/qr-code")({
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
      <QrCodeGenerator />
    </>
  );
}
