import { css } from "$panda/css";
import { Progress } from "@hebium-ui/solid";
import { useRouterState } from "@tanstack/solid-router";
import { type JSX, Show } from "solid-js";

export function NavigationProgress(): JSX.Element {
  const isNavigating = useRouterState({
    select: state =>
      state.status === "pending"
      && state.resolvedLocation !== undefined
      && state.location.pathname !== state.resolvedLocation.pathname,
  });

  return (
    <Show when={isNavigating()}>
      <Progress
        aria-label="Loading page"
        radius="none"
        size="full"
        classes={{
          root: css({
            position: "fixed",
            top: 0,
            insetInline: 0,
            height: "2px",
            zIndex: 1000,
            pointerEvents: "none",
            opacity: 1,
            transitionProperty: "opacity",
            transitionDuration: "100ms",
            "@starting-style": { opacity: 0 },
          }),
          bar: css({
            backgroundColor: "transparent",
          }),
        }}
      />
    </Show>
  );
}
