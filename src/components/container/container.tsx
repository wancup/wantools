import { css, cva } from "$panda/css";
import { type RecipeVariantProps } from "$panda/types";
import { type JSX, type ParentProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { type StylableComponentProps } from "~/types";

const containerRecipe = cva({
  base: {
    margin: "0 auto",
  },
  variants: {
    size: {
      sm: {
        maxWidth: "42rem",
      },
      md: {
        maxWidth: "60rem",
      },
      lg: {
        maxWidth: "78rem",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type Polymophic = "div" | "section" | "article";
type ContainerVariants = NonNullable<RecipeVariantProps<typeof containerRecipe>>;
interface ContainerProps extends ParentProps<StylableComponentProps<Polymophic>>, ContainerVariants {
  as?: Polymophic | undefined;
}

export function Container(props: ContainerProps): JSX.Element {
  const [local, restProps] = splitProps(props, ["as", "size", "css"]);
  const element = (): ContainerProps["as"] => local.as ?? "div";

  return (
    <Dynamic
      component={element()}
      class={css(containerRecipe.raw({ size: local.size }), local.css)}
      {...(restProps as object)}
    />
  );
}
