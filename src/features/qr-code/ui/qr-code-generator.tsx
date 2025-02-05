import { css } from "$panda/css";
import { Input } from "$park/input";
import { QrCode } from "$park/qr-code";
import { createSignal, type JSX, Show } from "solid-js";

export function QrCodeGenerator(): JSX.Element {
  const [text, setText] = createSignal("");

  return (
    <>
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
    </>
  );
}
