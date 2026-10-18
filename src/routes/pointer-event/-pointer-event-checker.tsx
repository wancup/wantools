import { css } from "$panda/css";
import { Dl, Section } from "@hebium-ui/solid";
import { createSignal, type JSX } from "solid-js";

function toPositionStr(e: PointerEvent | undefined, key: "page" | "client" | "offset" | "screen"): string {
  if (typeof e === "undefined") {
    return "";
  } else {
    return e[`${key}X`].toString() + ", " + e[`${key}Y`].toString();
  }
}

export function PointerEventChecker(): JSX.Element {
  const [mousePointerEvent, setPointerMoveEvent] = createSignal<PointerEvent>();

  return (
    <>
      <Section
        bg="box"
        class={css({
          width: "clamp(5rem, 20%, 10rem)",
          aspectRatio: "1/1",
          margin: "0 auto 0.5rem",
        })}
        onPointerMove={(e) => {
          setPointerMoveEvent(e);
        }}
      />
      <Dl>
        <Dl.Dt>pageXY</Dl.Dt>
        <Dl.Dd>{toPositionStr(mousePointerEvent(), "page")}</Dl.Dd>
        <Dl.Dt>clientXY</Dl.Dt>
        <Dl.Dd>{toPositionStr(mousePointerEvent(), "client")}</Dl.Dd>
        <Dl.Dt>offsetXY</Dl.Dt>
        <Dl.Dd>{toPositionStr(mousePointerEvent(), "offset")}</Dl.Dd>
        <Dl.Dt>screenXY</Dl.Dt>
        <Dl.Dd>{toPositionStr(mousePointerEvent(), "screen")}</Dl.Dd>
      </Dl>
    </>
  );
}
