import { css } from "$panda/css";
import { Button } from "$park/button";
import { FormLabel } from "$park/form-label";
import { Input } from "$park/input";
import { NumberInput } from "$park/number-input";
import { Select } from "$park/select";
import { createListCollection } from "@ark-ui/solid";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-solid";
import { createEffect, createMemo, createSignal, createUniqueId, For, type JSX, onCleanup } from "solid-js";
import { TransitionSwatch, type TransitionSwatchProps } from "./transition-swatch";

type MotionVariant = TransitionSwatchProps["motion"];

const TRANSITION_LIST = [
  { label: "Slide", value: "slide" },
  { label: "Fade In", value: "fade-in" },
  { label: "Fade Out", value: "fade-out" },
] as const satisfies { label: string; value: MotionVariant }[];

const TRANSITION_STYLE = {
  slide: { from: { transform: "translateX(0)" }, to: { transform: "translateX(10rem)" } },
  "fade-in": { from: { opacity: "0" }, to: { opacity: "100" } },
  "fade-out": { from: { opacity: "100" }, to: { opacity: "0" } },
} as const;

export function TransitionList(): JSX.Element {
  const [isStarted, setIsStarted] = createSignal(false);
  const [duration, setDuration] = createSignal("1000");
  const [customTiming, setCustomTiming] = createSignal("cubic-bezier(0.1, 0.7, 1, 0.1)");
  const [selectedMotion, setSelectedMotion] = createSignal<MotionVariant>(TRANSITION_LIST[0].value);

  const id = createUniqueId();
  const customTimingFunctionId = `custom-timing-function-${id}`;

  const motionCollection = createListCollection({
    items: TRANSITION_LIST,
  });

  createEffect(() => {
    let resetTimeoutId: number;
    if (isStarted()) {
      const timeout = Number(duration()) + 500;
      resetTimeoutId = window.setTimeout(() => {
        setIsStarted(false);
      }, timeout);
    }
    onCleanup(() => {
      window.clearTimeout(resetTimeoutId);
    });
  });

  const transitionStyle = createMemo(() => {
    return TRANSITION_STYLE[selectedMotion()];
  });

  const markerStyle = (): JSX.CSSProperties =>
    isStarted()
      ? { ...transitionStyle().to, "transition-duration": `${duration()}ms` }
      : transitionStyle().from;

  return (
    <>
      <div
        class={css({
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          sm: {
            flexDirection: "row",
          },
        })}
      >
        <Select.Root
          class={css({ width: "10rem" })}
          positioning={{ sameWidth: true }}
          collection={motionCollection}
          value={[selectedMotion()]}
          onValueChange={(v) => {
            const value = v.value[0];
            if (typeof value !== "undefined") {
              setSelectedMotion(value as MotionVariant);
            }
          }}
        >
          <Select.Label>Motion</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select a Transition Motion" />
              <ChevronsUpDownIcon />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              <Select.ItemGroup>
                <For each={motionCollection.items}>
                  {(item) => (
                    <Select.Item item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator>
                        <CheckIcon />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )}
                </For>
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
        <NumberInput
          class={css({ width: "10rem" })}
          value={duration()}
          onValueChange={(v) => setDuration(v.value)}
        >
          Duration
        </NumberInput>
        <div>
          <FormLabel for={customTimingFunctionId}>Custom Timing Function</FormLabel>
          <Input
            id={customTimingFunctionId}
            value={customTiming()}
            onInput={(e) => setCustomTiming(e.currentTarget.value)}
          />
        </div>
      </div>
      <Button class={css({ width: "100%", marginTop: "0.5rem" })} onClick={() => setIsStarted(true)}>Start</Button>

      <div class={css({ display: "flex", marginTop: "1rem" })}>
        <div
          class={css({
            display: "flex",
            flexDirection: "column",
            rowGap: "0.5rem",
            alignItems: "flex-end",
            marginRight: "auto",
          })}
        >
          <TransitionSwatch
            name="Custom"
            timing={customTiming()}
            motion={selectedMotion()}
            markerStyle={markerStyle()}
          />
          <TransitionSwatch
            timing="linear"
            motion={selectedMotion()}
            markerStyle={markerStyle()}
          />
          <TransitionSwatch
            timing="ease"
            motion={selectedMotion()}
            markerStyle={markerStyle()}
          />
          <TransitionSwatch
            timing="ease-in"
            motion={selectedMotion()}
            markerStyle={markerStyle()}
          />
          <TransitionSwatch
            timing="ease-out"
            motion={selectedMotion()}
            markerStyle={markerStyle()}
          />
          <TransitionSwatch
            timing="ease-in-out"
            motion={selectedMotion()}
            markerStyle={markerStyle()}
          />
          <TransitionSwatch
            timing="step-start"
            motion={selectedMotion()}
            markerStyle={markerStyle()}
          />
          <TransitionSwatch
            timing="step-end"
            motion={selectedMotion()}
            markerStyle={markerStyle()}
          />
          <TransitionSwatch
            timing="steps(3)"
            motion={selectedMotion()}
            markerStyle={markerStyle()}
          />
        </div>
        <div class={css({ flexGrow: "1fr" })} />
      </div>
    </>
  );
}
