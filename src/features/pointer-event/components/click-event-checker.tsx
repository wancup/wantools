import { css } from "$panda/css";
import { Button } from "$park/button";
import { Table } from "$park/table";
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
      <Table.Root size="sm">
        <Table.Head>
          <Table.Row>
            <Table.Header>
              Event Name
            </Table.Header>
            <Table.Header>
              button
            </Table.Header>
            <Table.Header>
              pointerType
            </Table.Header>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          <EventTableRow head="ponterdown" event={pointerDownEvent()} />
          <EventTableRow head="pointerup" event={pointerUpEvent()} />
          <EventTableRow head="click" event={clickEvent()} />
          <EventTableRow head="dblclick" event={dblClickEvent()} />
          <EventTableRow head="contextmenu" event={contextMenuEvent()} />
        </Table.Body>
      </Table.Root>
    </>
  );
}

function EventTableRow(props: { head: string; event: MouseEvent | PointerEvent | undefined }): JSX.Element {
  return (
    <Table.Row>
      <Table.Cell>
        {props.head}
      </Table.Cell>
      <Table.Cell>
        {props.event?.button}
      </Table.Cell>
      <Table.Cell>
        {toPointerTypeStr(props.event)}
      </Table.Cell>
    </Table.Row>
  );
}
