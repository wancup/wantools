import { css } from "$panda/css";
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
      <div
        class={css({
          width: "clamp(5rem, 20%, 10rem)",
          aspectRatio: "1/1",
          background: "gray.10",
          margin: "0 auto 0.5rem",
        })}
        onPointerMove={(e) => {
          setPointerMoveEvent(e);
        }}
      />
      <dl class={css({ display: "grid", gridTemplateColumns: "min-content auto", columnGap: "1rem" })}>
        <dt>pageXY</dt>
        <dd>{toPositionStr(mousePointerEvent(), "page")}</dd>
        <dt>clientXY</dt>
        <dd>{toPositionStr(mousePointerEvent(), "client")}</dd>
        <dt>offsetXY</dt>
        <dd>{toPositionStr(mousePointerEvent(), "offset")}</dd>
        <dt>screenXY</dt>
        <dd>{toPositionStr(mousePointerEvent(), "screen")}</dd>
      </dl>
    </>
  );
}
