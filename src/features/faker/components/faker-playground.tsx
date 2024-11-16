import { css } from "$panda/css";
import { Clipboard } from "$park/clipboard";
import { IconButton } from "$park/icon-button";
import { CheckIcon, ClipboardCopyIcon, RefreshCwIcon } from "lucide-solid";
import { createEffect, createSignal, type JSX } from "solid-js";

interface FakerPlaygroundProps {
  name: string;
  generate: () => string;
}

export function FakerPlayground(props: FakerPlaygroundProps): JSX.Element {
  const [value, setValue] = createSignal("");

  createEffect(() => {
    setValue(props.generate());
  });

  return (
    <div class={css({ display: "flex", columnGap: "1rem", alignItems: "center" })}>
      <span>{props.name}</span>
      <span class={css({ whiteSpace: "pre-wrap" })}>{value()}</span>

      <div class={css({ display: "flex", columnGap: "0.5rem" })}>
        <Clipboard.Root value={value()}>
          <Clipboard.Control>
            <Clipboard.Trigger
              asChild={(triggerProps) => (
                <IconButton variant="outline" size="sm" {...triggerProps()}>
                  <Clipboard.Indicator copied={<CheckIcon />}>
                    <ClipboardCopyIcon />
                  </Clipboard.Indicator>
                </IconButton>
              )}
            />
          </Clipboard.Control>
        </Clipboard.Root>
        <IconButton
          aria-label={`Reflesh ${props.name}`}
          size="sm"
          variant="outline"
          onClick={() => {
            const v = props.generate();
            setValue(v);
          }}
        >
          <RefreshCwIcon />
        </IconButton>
      </div>
    </div>
  );
}
