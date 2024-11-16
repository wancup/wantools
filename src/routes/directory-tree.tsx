import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { Textarea } from "$park/textarea";
import { Title } from "@solidjs/meta";
import { type TextareaProps } from "node_modules/@ark-ui/solid/dist/types/components/field/field";
import { createSignal, type JSX } from "solid-js";
import { DirectoryTree } from "~/features/directory-tree";
import { makePageTitle, PAGES } from "~/site";

const PAGE_TITLE = makePageTitle(PAGES["directory-tree"].name);
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

export default function DirectoryTreePage(): JSX.Element {
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
    <main>
      <Title>{PAGE_TITLE}</Title>
      <Heading as="h1" size="xl" class={css({ marginBottom: "1rem" })}>
        {PAGES["directory-tree"].name}
      </Heading>
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
    </main>
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
