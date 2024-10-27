import { type SystemStyleObject } from "$panda/types";
import { type ComponentProps, type ValidComponent } from "solid-js";

export type StylableComponentProps<T extends ValidComponent> =
  & Omit<ComponentProps<T>, "class">
  & {
    css?: SystemStyleObject | undefined;
  };
