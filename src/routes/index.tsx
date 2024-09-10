import { Title } from "@solidjs/meta";
import { type JSX } from "solid-js";
import { SITE } from "~/site";

export default function Home(): JSX.Element {
  return (
    <main>
      <Title>{SITE.name}</Title>
      <h1>Hello world!</h1>
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
