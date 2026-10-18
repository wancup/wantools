import { css } from "$panda/css";
import { Input } from "@hebium-ui/solid";
import { createMemo, createSignal, createUniqueId, type JSX, Show } from "solid-js";
import { generateQrCodeImage } from "~/features/qr-code/logic/qr-code";

export function QrCodeGenerator(): JSX.Element {
  const [text, setText] = createSignal("");
  const image = createMemo(() => generateQrCodeImage(text()));
  const qrcodeInputId = `qr-code-input-${createUniqueId()}`;

  return (
    <>
      <Input
        id={qrcodeInputId}
        label="Text to convert"
        error={image().error}
        classes={{ root: css({ width: "100%", marginBottom: "1rem" }) }}
        value={text()}
        onInput={(event) => setText(event.currentTarget.value)}
      />
      <Show when={image().src}>
        {(src) => (
          <output for={qrcodeInputId}>
            <img
              src={src()}
              alt={`QR code for "${text()}"`}
              class={css({ width: "16rem", maxWidth: "100%", height: "auto" })}
            />
          </output>
        )}
      </Show>
    </>
  );
}
