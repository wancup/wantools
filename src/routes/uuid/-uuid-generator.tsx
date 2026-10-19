import { css } from "$panda/css";
import { Button } from "@hebium-ui/solid";
import { createEffect, createMemo, createSignal, createUniqueId, type JSX } from "solid-js";
import { v4 as uuidv4, v7 as uuidV7 } from "uuid";
import { CopyButton } from "~/components";

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
    <div class={css({ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" })}>
      <span>
        {generator().label}:
      </span>
      <output for={buttonId}>{uuid()}</output>
      <CopyButton value={uuid()} aria-label={`Copy ${generator().label}`} />
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
