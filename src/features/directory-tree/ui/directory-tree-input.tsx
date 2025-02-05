import { css } from "$panda/css";
import { Textarea, type TextareaProps } from "$park/textarea";
import { createSignal, type JSX } from "solid-js";
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
    <div
      class={css({
        width: "100%",
        display: "flex",
        overflow: "scroll",
        resize: "vertical",
        flexDirection: "column",
        rowGap: "0.5rem",
        md: { flexDirection: "row", justifyContent: "space-between", columnGap: "1rem" },
      })}
    >
      <StyledTextarea
        value={rawText()}
        onInput={handleInputRawText}
        placeholder={SAMPLE_RAW_TEXT}
      />
      <StyledTextarea
        value={styledText()}
        onInput={handleInputStyledText}
        placeholder={SAMPLE_STYLED_TEXT}
      />
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
