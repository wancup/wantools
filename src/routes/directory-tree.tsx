import { Title } from "@solidjs/meta";
import { createSignal, JSX } from "solid-js";
import { DirectoryTree } from "~/features/directory-tree";
import { makePageTitle, PAGES } from "~/site";

const PAGE_TITLE = makePageTitle(PAGES["directory-tree"].name);

export default function Home() {
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
      <h1>{PAGES["directory-tree"].name}</h1>
      <textarea value={rawText()} onInput={handleInputRawText} />
      <textarea value={styledText()} onInput={handleInputStyledText} />
    </main>
  );
}
