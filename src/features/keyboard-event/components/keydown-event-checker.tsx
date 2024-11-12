import { createSignal, type JSX, onCleanup, onMount } from "solid-js";
import { KeyboardEventIndicator } from "./keyboard-event-indicator";

export function KeydownEventChecker(): JSX.Element {
  const [event, setEvent] = createSignal<KeyboardEvent>();

  const handleKeyDown = (e: KeyboardEvent): void => {
    setEvent(e);
  };

  onMount(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeyDown);
    }
  });

  onCleanup(() => {
    if (typeof document !== "undefined") {
      document.removeEventListener("keydown", handleKeyDown);
    }
  });

  return <KeyboardEventIndicator event={event()} />;
}
