import { css } from "$panda/css";
import { Table } from "$park/table";
import { createSignal, type JSX } from "solid-js";

function toPositionStr(e: TouchEvent | MouseEvent | undefined): string {
  if (typeof e === "undefined") return "not yet";

  if ("touches" in e) {
    const touch = e.touches.item(0);
    if (touch === null) {
      return "no touch item";
    } else {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      return `${x.toString()}, ${y.toString()}`;
    }
  } else {
    return `${e.offsetX.toString()}, ${e.offsetY.toString()}`;
  }
}

export function DeviceDifferenceChart(): JSX.Element {
  const [pointerEnterEvent, setPointerEnterEvent] = createSignal<PointerEvent>();
  const [mouseEnterEvent, setMouseEnterEvent] = createSignal<MouseEvent>();

  const [pointerLeaveEvent, setPointerLeaveEvent] = createSignal<PointerEvent>();
  const [mouseLeaveEvent, setMouseLeaveEvent] = createSignal<MouseEvent>();

  const [pointerDownEvent, setPointerDownEvent] = createSignal<PointerEvent>();
  const [mouseDownEvent, setMouseDownEvent] = createSignal<MouseEvent>();
  const [touchStartEvent, setTouchStartEvent] = createSignal<TouchEvent>();

  const [pointerUpEvent, setPointerUpEvent] = createSignal<PointerEvent>();
  const [mouseUpEvent, setMouseUpEvent] = createSignal<MouseEvent>();
  const [touchEndEvent, setTouchEndEvent] = createSignal<TouchEvent>();

  const [pointerOverEvent, setPointerOverEvent] = createSignal<PointerEvent>();
  const [mouseOverEvent, setMouseOverEvent] = createSignal<MouseEvent>();

  const [pointerOutEvent, setPointerOutEvent] = createSignal<PointerEvent>();
  const [mouseOutEvent, setMouseOutEvent] = createSignal<MouseEvent>();

  const [pointerCancelEvent, setPointerCancelEvent] = createSignal<PointerEvent>();
  const [touchCancelEvent, setTouchCancelEvent] = createSignal<TouchEvent>();

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        class={css({
          width: "clamp(160px, 60%, 320px)",
          aspectRatio: "2/1",
          margin: "0 auto 1rem",
          background: "gray.10",
        })}
        onPointerEnter={(e) => {
          setPointerEnterEvent(e);
        }}
        onMouseEnter={(e) => {
          setMouseEnterEvent(e);
        }}
        onPointerLeave={(e) => {
          setPointerLeaveEvent(e);
        }}
        onMouseLeave={(e) => {
          setMouseLeaveEvent(e);
        }}
        onPointerDown={(e) => {
          setPointerDownEvent(e);
        }}
        onMouseDown={(e) => {
          setMouseDownEvent(e);
        }}
        onTouchStart={(e) => {
          setTouchStartEvent(e);
        }}
        onPointerUp={(e) => {
          setPointerUpEvent(e);
        }}
        onMouseUp={(e) => {
          setMouseUpEvent(e);
        }}
        onTouchEnd={(e) => {
          setTouchEndEvent(e);
        }}
        onPointerOver={(e) => {
          setPointerOverEvent(e);
        }}
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOver={(e) => {
          setMouseOverEvent(e);
        }}
        onPointerOut={(e) => {
          setPointerOutEvent(e);
        }}
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOut={(e) => {
          setMouseOutEvent(e);
        }}
        onPointerCancel={(e) => {
          setPointerCancelEvent(e);
        }}
        onTouchCancel={(e) => {
          setTouchCancelEvent(e);
        }}
      >
        <div
          class={css({
            display: "block",
            width: "40%",
            aspectRatio: "2/1",
            transform: "translate(75%, 75%)",
            backgroundImage: "repeating-linear-gradient(-45deg, rgba(1,1,1,0.3) 0 5%, rgba(1,1,1,0.8) 5% 10%)",
          })}
        />
      </div>
      <Table.Root size="sm">
        <Table.Head>
          <Table.Row>
            <Table.Header>
              Event Name
            </Table.Header>
            <Table.Header>
              Pointer
            </Table.Header>
            <Table.Header>
              Mouse
            </Table.Header>
            <Table.Header>
              Touch
            </Table.Header>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              enter
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(pointerEnterEvent())}
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(mouseEnterEvent())}
            </Table.Cell>
            <Table.Cell>
              -
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              leave
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(pointerLeaveEvent())}
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(mouseLeaveEvent())}
            </Table.Cell>
            <Table.Cell>
              -
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              over
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(pointerOverEvent())}
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(mouseOverEvent())}
            </Table.Cell>
            <Table.Cell>
              -
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              out
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(pointerOutEvent())}
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(mouseOutEvent())}
            </Table.Cell>
            <Table.Cell>
              -
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              down / start
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(pointerDownEvent())}
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(mouseDownEvent())}
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(touchStartEvent())}
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              up / end
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(pointerUpEvent())}
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(mouseUpEvent())}
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(touchEndEvent())}
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              cancel
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(pointerCancelEvent())}
            </Table.Cell>
            <Table.Cell>
              -
            </Table.Cell>
            <Table.Cell>
              {toPositionStr(touchCancelEvent())}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </>
  );
}
