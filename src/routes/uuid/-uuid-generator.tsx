import { css } from "$panda/css";
import { Button } from "$park/button";
import { Clipboard } from "$park/clipboard";
import { IconButton } from "$park/icon-button";
import { CheckIcon, ClipboardCopyIcon } from "lucide-solid";
import { createEffect, createMemo, createSignal, createUniqueId, type JSX } from "solid-js";
import { v4 as uuidv4, v7 as uuidV7 } from "uuid";

const UUID_GENERATOR_MAP = {
  v4: {
    label: "UUID v4",
    generate: () => uuidv4(),
  },
  v7: {
    label: "UUID v7",
    generate: () => uuidV7(),
  },
} as const;

interface UuidGeneratorProps {
  uuidVersion: "v4" | "v7";
}

export function UuidGenerator(props: UuidGeneratorProps): JSX.Element {
  const generator = createMemo(() => UUID_GENERATOR_MAP[props.uuidVersion]);
  const [uuid, setUuid] = createSignal("");
  const buttonId = createUniqueId();

  createEffect(() => {
    setUuid(generator().generate());
  });

  return (
    <div class={css({ display: "flex", columnGap: "1rem", alignItems: "center" })}>
      <span>
        {generator().label}:
      </span>
      <output for={buttonId}>{uuid()}</output>
      <Clipboard.Root value={uuid()}>
        <Clipboard.Control>
          <Clipboard.Trigger
            asChild={(triggerProps) => (
              <IconButton variant="outline" {...triggerProps()}>
                <Clipboard.Indicator copied={<CheckIcon />}>
                  <ClipboardCopyIcon />
                </Clipboard.Indicator>
              </IconButton>
            )}
          />
        </Clipboard.Control>
      </Clipboard.Root>
      <Button
        id={buttonId}
        onClick={() => {
          const newUuid = generator().generate();
          setUuid(newUuid);
        }}
        aria-label={`Regenerate ${generator().label}`}
      >
        Regenerate
      </Button>
    </div>
  );
}
