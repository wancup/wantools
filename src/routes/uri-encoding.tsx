import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { Input } from "$park/input";
import { Title } from "@solidjs/meta";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-solid";
import { createSignal, type JSX } from "solid-js";
import { makePageTitle, PAGES } from "~/site";
import { Container } from "~/ui";

const SAMPLE_URI = "https://example.com/?sakura=桜";

const PAGE_TITLE = makePageTitle(PAGES["uri-encoding"].name);

export default function UrlEncodingPage(): JSX.Element {
  return (
    <main>
      <Title>{PAGE_TITLE}</Title>
      <Container>
        <Heading as="h1" size="xl" class={css({ marginBottom: "1rem" })}>
          {PAGES["uri-encoding"].name}
        </Heading>
        <Heading as="h2" size="lg" class={css({ marginBottom: "1rem" })}>
          encodeURI()
        </Heading>
        <Converter defaultText={SAMPLE_URI} encode={encodeURI} decode={decodeURI} />
        <Heading as="h2" size="lg" class={css({ marginTop: "3rem", marginBottom: "1rem" })}>
          encodeURIComponent()
        </Heading>
        <Converter defaultText={SAMPLE_URI} encode={encodeURIComponent} decode={decodeURIComponent} />
      </Container>
    </main>
  );
}

function Converter(
  props: {
    defaultText: string;
    encode: (value: string) => string;
    decode: (value: string) => string;
  },
): JSX.Element {
  const [rawText, setRawText] = createSignal("");
  const [encodedText, setEncodedText] = createSignal("");

  return (
    <>
      <Input
        placeholder={props.defaultText}
        value={rawText()}
        onInput={(e) => {
          setRawText(e.currentTarget.value);
          try {
            const encoded = props.encode(e.currentTarget.value);
            setEncodedText(encoded);
          } catch {
            setEncodedText("");
          }
        }}
      />
      <div aria-hidden class={css({ margin: "0.5rem", display: "flex", columnGap: "1rem" })}>
        <ArrowDownIcon class={css({ marginLeft: "auto" })} />
        <ArrowUpIcon class={css({ marginRight: "auto" })} />
      </div>
      <Input
        placeholder={props.encode(props.defaultText)}
        value={encodedText()}
        onInput={(e) => {
          setEncodedText(e.currentTarget.value);
          try {
            const decoded = props.decode(e.currentTarget.value);
            setRawText(decoded);
          } catch {
            setRawText("");
          }
        }}
      />
    </>
  );
}
