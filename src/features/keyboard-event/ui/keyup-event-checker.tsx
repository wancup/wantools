import { createSignal, type JSX, onCleanup, onMount } from "solid-js";
import { KeyboardEventIndicator } from "./keyboard-event-indicator";

export function KeyupEventChecker(): JSX.Element {
  const [event, setEvent] = createSignal<KeyboardEvent>();

  const handleKeyUp = (e: KeyboardEvent): void => {
    setEvent(e);
  };

  onMount(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("keyup", handleKeyUp);
    }
  });

  onCleanup(() => {
    if (typeof document !== "undefined") {
      document.removeEventListener("keyup", handleKeyUp);
    }
  });

  return <KeyboardEventIndicator event={event()} />;
}
