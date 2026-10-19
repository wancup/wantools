import { Button, type ButtonProps, VisuallyHidden } from "@hebium-ui/solid";
import { CheckIcon, ClipboardCopyIcon } from "lucide-solid";
import { createEffect, createSignal, type JSX, on, onCleanup, Show, splitProps } from "solid-js";

export interface CopyButtonProps extends Omit<ButtonProps, "as" | "children" | "onClick" | "value"> {
  value: string;
}

export function CopyButton(props: CopyButtonProps): JSX.Element {
  const [local, rest] = splitProps(props, ["value", "disabled", "aria-label"]);
  const [copied, setCopied] = createSignal(false);
  const [copying, setCopying] = createSignal(false);
  let resetTimeout: ReturnType<typeof setTimeout> | undefined;
  let disposed = false;

  createEffect(on(() => local.value, () => {
    clearTimeout(resetTimeout);
    setCopied(false);
  }));

  onCleanup(() => {
    disposed = true;
    clearTimeout(resetTimeout);
  });

  const copy = async (): Promise<void> => {
    const value = local.value;
    clearTimeout(resetTimeout);
    setCopied(false);
    setCopying(true);
    try {
      await navigator.clipboard.writeText(value);
      if (disposed || value !== local.value) return;
      clearTimeout(resetTimeout);
      setCopied(true);
      resetTimeout = setTimeout(() => setCopied(false), 3000);
    } catch {
      if (!disposed) window.alert("Failed to copy to clipboard.");
    } finally {
      if (!disposed) setCopying(false);
    }
  };

  return (
    <Button
      type="button"
      variant="subtle"
      shape="square"
      color="neutral"
      {...rest}
      disabled={local.disabled || copying()}
      aria-label={local["aria-label"] ?? "Copy to clipboard"}
      onClick={() => void copy()}
    >
      <Show when={copied()} fallback={<ClipboardCopyIcon aria-hidden="true" size="1em" />}>
        <CheckIcon aria-hidden="true" size="1em" />
      </Show>
      <VisuallyHidden aria-live="polite">{copied() ? "Copied" : ""}</VisuallyHidden>
    </Button>
  );
}
