import { css, cva, type RecipeVariantProps } from "$panda/css";
import { styled } from "$panda/jsx";
import { type JSX, type ParentProps } from "solid-js";

const markerRecipe = cva({
  base: {
    backgroundColor: "accent.8",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "2.5rem",
  },
  variants: {
    motion: {
      "slide": {
        transitionProperty: "transform",
      },
      "fade-in": {
        transitionProperty: "opacity",
      },
      "fade-out": {
        transitionProperty: "opacity",
      },
    },
  },
  defaultVariants: {
    motion: "slide",
  },
});

const Marker = styled("div", markerRecipe);

type MarkerVariant = NonNullable<RecipeVariantProps<typeof markerRecipe>>;
export type MotionVariant = NonNullable<MarkerVariant["motion"]>;
export interface TransitionSwatchProps extends Required<MarkerVariant> {
  timing: JSX.CSSProperties["transition-timing-function"];
  markerStyle: JSX.CSSProperties;
  name?: string | undefined;
}

export function TransitionSwatch(props: ParentProps<TransitionSwatchProps>): JSX.Element {
  return (
    <div class={css({ display: "flex", columnGap: "0.5rem", alignItems: "center" })}>
      <span>{props.name ?? props.timing}</span>
      <Marker
        motion={props.motion}
        style={{ "transition-timing-function": props.timing, ...props.markerStyle }}
      />
    </div>
  );
}
