import { css } from "$panda/css";
import { Button, Table, type TrProps } from "@hebium-ui/solid";
import { createSignal, type JSX } from "solid-js";

function toPointerTypeStr(e: MouseEvent | PointerEvent | undefined): string {
  if (typeof e === "undefined") return "";
  if ("pointerType" in e) {
    return e.pointerType;
  } else {
    return "";
  }
}

export function ClickEventChecker(): JSX.Element {
  const [pointerDownEvent, setPointerDownEvent] = createSignal<PointerEvent>();
  const [pointerUpEvent, setPointerUpEvent] = createSignal<PointerEvent>();
  const [clickEvent, setClickEvent] = createSignal<MouseEvent | PointerEvent>();
  const [dblClickEvent, setDblClickEvent] = createSignal<MouseEvent>();
  const [contextMenuEvent, setContextMenuEvent] = createSignal<MouseEvent>();

  return (
    <>
      <Button
        class={css({ width: "100%", marginBottom: "1rem" })}
        onPointerDown={(e) => {
          setPointerUpEvent(undefined);
          setClickEvent(undefined);
          setDblClickEvent(undefined);
          setContextMenuEvent(undefined);

          setPointerDownEvent(e);
        }}
        onPointerUp={(e) => {
          setPointerUpEvent(e);
        }}
        onClick={(e) => {
          setClickEvent(e);
        }}
        onDblClick={(e) => {
          setDblClickEvent(e);
        }}
        onContextMenu={(e) => {
          setContextMenuEvent(e);
        }}
      >
        Click Here
      </Button>
      <Table class={css({ width: "100%" })}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th scope="col">Event Name</Table.Th>
            <Table.Th scope="col">button</Table.Th>
            <Table.Th scope="col">pointerType</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <EventTableRow head="pointerdown" event={pointerDownEvent()} />
          <EventTableRow head="pointerup" event={pointerUpEvent()} />
          <EventTableRow head="click" event={clickEvent()} />
          <EventTableRow head="dblclick" event={dblClickEvent()} />
          <EventTableRow head="contextmenu" event={contextMenuEvent()} border="none" />
        </Table.Tbody>
      </Table>
    </>
  );
}

function EventTableRow(props: {
  head: string;
  event: MouseEvent | PointerEvent | undefined;
  border?: TrProps["border"] | undefined;
}): JSX.Element {
  return (
    <Table.Tr border={props.border}>
      <Table.Th scope="row">{props.head}</Table.Th>
      <Table.Td>{props.event?.button}</Table.Td>
      <Table.Td>{toPointerTypeStr(props.event)}</Table.Td>
    </Table.Tr>
  );
}
