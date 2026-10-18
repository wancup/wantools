import { css } from "$panda/css";
import { Section, Table } from "@hebium-ui/solid";
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
      <Section
        bg="box"
        class={css({
          width: "clamp(160px, 60%, 320px)",
          aspectRatio: "2/1",
          margin: "0 auto 1rem",
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
        onMouseOver={(e) => {
          setMouseOverEvent(e);
        }}
        onPointerOut={(e) => {
          setPointerOutEvent(e);
        }}
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
      </Section>
      <Table class={css({ width: "100%" })}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th scope="col">Event Name</Table.Th>
            <Table.Th scope="col">Pointer</Table.Th>
            <Table.Th scope="col">Mouse</Table.Th>
            <Table.Th scope="col">Touch</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th scope="row">enter</Table.Th>
            <Table.Td>{toPositionStr(pointerEnterEvent())}</Table.Td>
            <Table.Td>{toPositionStr(mouseEnterEvent())}</Table.Td>
            <Table.Td>-</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th scope="row">leave</Table.Th>
            <Table.Td>{toPositionStr(pointerLeaveEvent())}</Table.Td>
            <Table.Td>{toPositionStr(mouseLeaveEvent())}</Table.Td>
            <Table.Td>-</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th scope="row">over</Table.Th>
            <Table.Td>{toPositionStr(pointerOverEvent())}</Table.Td>
            <Table.Td>{toPositionStr(mouseOverEvent())}</Table.Td>
            <Table.Td>-</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th scope="row">out</Table.Th>
            <Table.Td>{toPositionStr(pointerOutEvent())}</Table.Td>
            <Table.Td>{toPositionStr(mouseOutEvent())}</Table.Td>
            <Table.Td>-</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th scope="row">down / start</Table.Th>
            <Table.Td>{toPositionStr(pointerDownEvent())}</Table.Td>
            <Table.Td>{toPositionStr(mouseDownEvent())}</Table.Td>
            <Table.Td>{toPositionStr(touchStartEvent())}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th scope="row">up / end</Table.Th>
            <Table.Td>{toPositionStr(pointerUpEvent())}</Table.Td>
            <Table.Td>{toPositionStr(mouseUpEvent())}</Table.Td>
            <Table.Td>{toPositionStr(touchEndEvent())}</Table.Td>
          </Table.Tr>
          <Table.Tr border="none">
            <Table.Th scope="row">cancel</Table.Th>
            <Table.Td>{toPositionStr(pointerCancelEvent())}</Table.Td>
            <Table.Td>-</Table.Td>
            <Table.Td>{toPositionStr(touchCancelEvent())}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  );
}
