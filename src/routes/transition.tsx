import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { Title } from "@solidjs/meta";
import { type JSX } from "solid-js";
import { Container } from "~/components";
import { TransitionList } from "~/features/transition";
import { makePageTitle, PAGES } from "~/site";

const PAGE_TITLE = makePageTitle(PAGES["transition"].name);

export default function TransitionPage(): JSX.Element {
  return (
    <main>
      <Title>{PAGE_TITLE}</Title>
      <Container>
        <Heading as="h1" size="xl" class={css({ marginBottom: "1rem" })}>
          {PAGES["transition"].name}
        </Heading>
        <TransitionList />
      </Container>
    </main>
  );
}
