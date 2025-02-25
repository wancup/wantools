import { css } from "$panda/css";
import { FormLabel } from "$park/form-label";
import { Input } from "$park/input";
import { QrCode } from "$park/qr-code";
import { createSignal, createUniqueId, type JSX, Show } from "solid-js";

export function QrCodeGenerator(): JSX.Element {
  const [text, setText] = createSignal("");

  const id = createUniqueId();
  const qrcodeInputId = `qr-code-input-${id}`;

  return (
    <>
      <FormLabel for={qrcodeInputId}>Text to convert</FormLabel>
      <Input
        id={qrcodeInputId}
        class={css({ marginBottom: "1rem" })}
        value={text()}
        onInput={(e) => {
          setText(e.currentTarget.value);
        }}
      />
      <Show when={text()}>
        <QrCode.Root
          value={text()}
          asChild={(props) => (
            <output {...props()} for={qrcodeInputId}>
              <QrCode.Frame
                class={css({ background: "white" })}
                aria-label={`The QR code image of "${text()}"`}
              >
                <QrCode.Pattern />
              </QrCode.Frame>
            </output>
          )}
        />
      </Show>
    </>
  );
}
