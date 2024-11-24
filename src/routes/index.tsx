import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { Title } from "@solidjs/meta";
import { type JSX } from "solid-js";
import { SITE } from "~/site";

export default function Home(): JSX.Element {
  return (
    <main>
      <Title>{SITE.name}</Title>
      <Heading as="h1" size="3xl" class={css({ marginBottom: "0.5rem" })}>{SITE.name}</Heading>
      <p>
        {SITE.description}
      </p>
    </main>
  );
}
