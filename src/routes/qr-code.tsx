import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { Input } from "$park/input";
import { QrCode } from "$park/qr-code";
import { Title } from "@solidjs/meta";
import { createSignal, type JSX, Show } from "solid-js";
import { makePageTitle, PAGES } from "~/site";
import { Container } from "~/ui";

const PAGE_TITLE = makePageTitle(PAGES["qr-code"].name);

export default function QrCodePage(): JSX.Element {
  const [text, setText] = createSignal("");

  return (
    <main>
      <Title>{PAGE_TITLE}</Title>
      <Container size="sm">
        <Heading as="h1" size="xl" class={css({ marginBottom: "1rem" })}>
          {PAGES["qr-code"].name}
        </Heading>
        <Input
          class={css({ marginBottom: "1rem" })}
          value={text()}
          onInput={(e) => {
            setText(e.currentTarget.value);
          }}
        />
        <Show when={text()}>
          <QrCode.Root value={text()}>
            <QrCode.Frame class={css({ background: "white" })}>
              <QrCode.Pattern />
            </QrCode.Frame>
          </QrCode.Root>
        </Show>
      </Container>
    </main>
  );
}
