import { css, cva, type RecipeVariantProps } from "$panda/css";
import { type JSX, type ParentProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { type StylableComponentProps } from "~/types";

const containerRecipe = cva({
  base: {
    margin: "0 auto",
  },
  variants: {
    size: {
      xs: {
        maxWidth: "30rem",
      },
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
type ContainerProps<T extends Polymophic> = ParentProps<StylableComponentProps<T>> & ContainerVariants & {
  as?: T | undefined;
};

export function Container<T extends Polymophic = "div">(props: ContainerProps<T>): JSX.Element {
  const [local, restProps] = splitProps(props, ["as", "size", "css"]);
  const element = (): Polymophic => local.as ?? "div";

  return (
    <Dynamic
      component={element()}
      class={css(containerRecipe.raw({ size: local.size }), local.css)}
      {...(restProps as object)}
    />
  );
}
