import { css } from "$panda/css";
import { FormLabel } from "$park/form-label";
import { Input } from "$park/input";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-solid";
import { createMemo, createSignal, createUniqueId, type JSX } from "solid-js";

const URI_ENCODER = {
  encode: encodeURI,
  decode: decodeURI,
};
const URI_COMPONENT_ENCODER = {
  encode: encodeURIComponent,
  decode: decodeURIComponent,
};

interface UriConverterProps {
  placeholder: string;
  type: "uri" | "uri-component";
}

export function UriConverter(
  props: UriConverterProps,
): JSX.Element {
  const [rawText, setRawText] = createSignal("");
  const [encodedText, setEncodedText] = createSignal("");
  const id = createUniqueId();

  const encoder = createMemo(() => props.type === "uri" ? URI_ENCODER : URI_COMPONENT_ENCODER);
  const originalId = `original-input-${id}`;
  const encodedId = `encoded-input-${id}`;

  return (
    <>
      <FormLabel for={originalId}>Original Text</FormLabel>
      <Input
        id={originalId}
        placeholder={props.placeholder}
        value={rawText()}
        onInput={(e) => {
          setRawText(e.currentTarget.value);
          try {
            const encoded = encoder().encode(e.currentTarget.value);
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
      <FormLabel for={encodedId}>Encoded Text</FormLabel>
      <Input
        id={encodedId}
        placeholder={encoder().encode(props.placeholder)}
        value={encodedText()}
        onInput={(e) => {
          setEncodedText(e.currentTarget.value);
          try {
            const decoded = encoder().decode(e.currentTarget.value);
            setRawText(decoded);
          } catch {
            setRawText("");
          }
        }}
      />
    </>
  );
}
