import { css } from "$panda/css";
import { Button, Input, Select } from "@hebium-ui/solid";
import { createEffect, createMemo, createSignal, For, type JSX, onCleanup } from "solid-js";
import { TransitionSwatch, type TransitionSwatchProps } from "./-transition-swatch";

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
        <Select
          label="Motion"
          classes={{ root: css({ width: "10rem" }) }}
          value={selectedMotion()}
          onChange={(event) => {
            const motion = TRANSITION_LIST.find((item) => item.value === event.currentTarget.value);
            if (motion) setSelectedMotion(motion.value);
          }}
        >
          <For each={TRANSITION_LIST}>
            {(item) => <option value={item.value}>{item.label}</option>}
          </For>
        </Select>
        <Input
          type="number"
          label="Duration"
          min={0}
          classes={{ root: css({ width: "10rem" }) }}
          value={duration()}
          onInput={(event) => setDuration(event.currentTarget.value)}
        />
        <Input
          label="Custom Timing Function"
          classes={{ root: css({ width: "100%", sm: { width: "auto", flexGrow: 1 } }) }}
          value={customTiming()}
          onInput={(event) => setCustomTiming(event.currentTarget.value)}
        />
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
        <div class={css({ flexGrow: 1 })} />
      </div>
    </>
  );
}
