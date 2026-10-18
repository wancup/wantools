import { Dl } from "@hebium-ui/solid";
import { type JSX } from "solid-js";

interface KeyboardEventIndicatorProps {
  event: KeyboardEvent | undefined;
}

export function KeyboardEventIndicator(props: KeyboardEventIndicatorProps): JSX.Element {
  return (
    <Dl>
      <Dl.Dt>key</Dl.Dt>
      <Dl.Dd>{props.event?.key}</Dl.Dd>
      <Dl.Dt>code</Dl.Dt>
      <Dl.Dd>{props.event?.code}</Dl.Dd>
      <Dl.Dt>altKey</Dl.Dt>
      <Dl.Dd>{props.event?.altKey.toString()}</Dl.Dd>
      <Dl.Dt>ctrlKey</Dl.Dt>
      <Dl.Dd>{props.event?.ctrlKey.toString()}</Dl.Dd>
      <Dl.Dt>metaKey</Dl.Dt>
      <Dl.Dd>{props.event?.metaKey.toString()}</Dl.Dd>
      <Dl.Dt>shiftKey</Dl.Dt>
      <Dl.Dd>{props.event?.shiftKey.toString()}</Dl.Dd>
      <Dl.Dt>isComposing</Dl.Dt>
      <Dl.Dd>{props.event?.isComposing.toString()}</Dl.Dd>
      <Dl.Dt>location</Dl.Dt>
      <Dl.Dd>{props.event?.location}</Dl.Dd>
      <Dl.Dt>repeat</Dl.Dt>
      <Dl.Dd>{props.event?.repeat.toString()}</Dl.Dd>
    </Dl>
  );
}
