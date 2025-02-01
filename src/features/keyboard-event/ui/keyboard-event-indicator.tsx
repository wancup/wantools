import { css } from "$panda/css";
import { type JSX } from "solid-js";

interface KeyboardEventIndicatorProps {
  event: KeyboardEvent | undefined;
}

export function KeyboardEventIndicator(props: KeyboardEventIndicatorProps): JSX.Element {
  return (
    <dl class={css({ display: "grid", gridTemplateColumns: "min-content auto", columnGap: "1rem" })}>
      <dt>key</dt>
      <dd>{props.event?.key}</dd>
      <dt>code</dt>
      <dd>{props.event?.code}</dd>
      <dt>altKey</dt>
      <dd>{props.event?.altKey.toString()}</dd>
      <dt>ctrlKey</dt>
      <dd>{props.event?.ctrlKey.toString()}</dd>
      <dt>metaKey</dt>
      <dd>{props.event?.metaKey.toString()}</dd>
      <dt>shiftKey</dt>
      <dd>{props.event?.shiftKey.toString()}</dd>
      <dt>isComposing</dt>
      <dd>{props.event?.isComposing.toString()}</dd>
      <dt>location</dt>
      <dd>{props.event?.location}</dd>
      <dt>repeat</dt>
      <dd>{props.event?.repeat.toString()}</dd>
    </dl>
  );
}
