import { css } from "$panda/css";
import { FormLabel } from "$park/form-label";
import { Textarea, type TextareaProps } from "$park/textarea";
import { createSignal, createUniqueId, type JSX } from "solid-js";
import { DirectoryTree } from "../logic/directory-tree";

const SAMPLE_RAW_TEXT = `\
./
- src/
-- features/
-- routes/
- test/
-- hello.test.ts`;
const SAMPLE_STYLED_TEXT = `\
./
├─ src/
│  ├─ features/
│  └─ routes/
└─ test/
   └─ hello.test.ts`;

export function DirectoryTreeInput(): JSX.Element {
  const [rawText, setRawText] = createSignal("");
  const [styledText, setStyledText] = createSignal("");
  const id = createUniqueId();

  const rawTextInputId = `raw-text-input-${id}`;
  const styledTextInputId = `styled-text-input-${id}`;

  const handleInputRawText: JSX.EventHandler<HTMLTextAreaElement, InputEvent> = (e) => {
    setRawText(e.currentTarget.value);

    const tree = DirectoryTree.fromRawText(e.currentTarget.value);
    setStyledText(tree.toStyledText());
  };

  const handleInputStyledText: JSX.EventHandler<HTMLTextAreaElement, InputEvent> = (e) => {
    setStyledText(e.currentTarget.value);

    const tree = DirectoryTree.fromStyledText(e.currentTarget.value);
    setRawText(tree.toRawText());
  };

  return (
    <div>
      <div
        class={css({
          width: "100%",
          md: { display: "none" },
        })}
      >
        <div class={css({ marginBottom: "0.5rem" })}>
          <FormLabel for={rawTextInputId}>Directory Tree With Hyphen</FormLabel>
          <StyledTextarea
            id={rawTextInputId}
            value={rawText()}
            onInput={handleInputRawText}
            placeholder={SAMPLE_RAW_TEXT}
          />
        </div>
        <div>
          <FormLabel for={styledTextInputId}>Styled Directory Tree</FormLabel>
          <StyledTextarea
            id={styledTextInputId}
            value={styledText()}
            onInput={handleInputStyledText}
            placeholder={SAMPLE_STYLED_TEXT}
          />
        </div>
      </div>
      <div
        class={css({
          display: "none",
          md: { display: "grid", width: "100%", gridTemplateColumns: "1fr 1fr", columnGap: "1rem" },
        })}
      >
        <FormLabel for={rawTextInputId}>Directory Tree With Hyphen</FormLabel>
        <FormLabel for={styledTextInputId}>Styled Directory Tree</FormLabel>
        <div
          class={css({
            gridColumn: "1 / 3",
            overflow: "scroll",
            display: "flex",
            justifyContent: "space-between",
            columnGap: "1rem",
            resize: "vertical",
          })}
        >
          <StyledTextarea
            id={rawTextInputId}
            value={rawText()}
            onInput={handleInputRawText}
            placeholder={SAMPLE_RAW_TEXT}
          />
          <StyledTextarea
            id={styledTextInputId}
            value={styledText()}
            onInput={handleInputStyledText}
            placeholder={SAMPLE_STYLED_TEXT}
          />
        </div>
      </div>
    </div>
  );
}

function StyledTextarea(props: Omit<TextareaProps, "rows" | "class">): JSX.Element {
  return (
    <Textarea
      rows={20}
      class={css({ resize: "none", fontFamily: "monospace, sans-serif, system-ui" })}
      {...props}
    />
  );
}
