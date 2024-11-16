import { css } from "$panda/css";
import { Heading } from "$park/heading";
import { Select } from "$park/select";
import { createListCollection } from "@ark-ui/solid";
import { allFakers, allLocales, fakerEN } from "@faker-js/faker";
import { Title } from "@solidjs/meta";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-solid";
import { createMemo, createSignal, For, type JSX } from "solid-js";
import { Container } from "~/components";
import { FakerPlayground } from "~/features/faker";
import { makePageTitle, PAGES } from "~/site";

const PAGE_TITLE = makePageTitle(PAGES["faker"].name);

const ALL_LOCALE_LIST = Object.keys(allLocales);

type FakerLocale = keyof typeof allLocales;
export default function FakerPage(): JSX.Element {
  const [selectedLocale, setSelectedLocale] = createSignal<FakerLocale>("en");
  const localeCollection = createListCollection({ items: ALL_LOCALE_LIST });

  const localeFaker = createMemo(() => allFakers[selectedLocale()]);

  const generateAddress = (): string => {
    let state: string | undefined;
    try {
      state = localeFaker().location.state();
    } catch {
      // Some locales does not have state
    }
    return [state, localeFaker().location.city(), localeFaker().location.streetAddress()].join(" ");
  };

  return (
    <main>
      <Title>{PAGE_TITLE}</Title>
      <Container>
        <Heading as="h1" size="xl" class={css({ marginBottom: "1rem" })}>
          {PAGES["faker"].name}
        </Heading>
        <div class={css({ display: "flex", flexDir: "column", rowGap: "1rem" })}>
          <Select.Root
            class={css({ width: "10rem" })}
            positioning={{ sameWidth: true }}
            collection={localeCollection}
            value={[selectedLocale()]}
            onValueChange={(v) => {
              const value = v.value[0];
              if (typeof value !== "undefined") {
                setSelectedLocale(value as FakerLocale);
              }
            }}
          >
            <Select.Label>Locale</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select a base locale" />
                <ChevronsUpDownIcon />
              </Select.Trigger>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                <Select.ItemGroup class={css({ maxHeight: "20rem", overflowY: "auto" })}>
                  <For each={localeCollection.items}>
                    {(item) => (
                      <Select.Item item={item}>
                        <Select.ItemText>{item}</Select.ItemText>
                        <Select.ItemIndicator>
                          <CheckIcon />
                        </Select.ItemIndicator>
                      </Select.Item>
                    )}
                  </For>
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Select.Root>

          <FakerPlayground
            name="URL:"
            generate={() => `https://example.com/${fakerEN.word.words().replaceAll(" ", "/")}`}
          />
          <FakerPlayground
            name="Nano ID:"
            generate={() => fakerEN.string.nanoid()}
          />
          <FakerPlayground
            name="UUID v4:"
            generate={() => fakerEN.string.uuid()}
          />
          <FakerPlayground
            name="Name:"
            generate={() => localeFaker().person.fullName()}
          />
          <FakerPlayground
            name="DisplayName:"
            generate={() => localeFaker().internet.displayName()}
          />
          <FakerPlayground
            name="Email:"
            generate={() => (fakerEN.internet.exampleEmail())}
          />
          <FakerPlayground
            name="Date:"
            generate={() => (localeFaker().date.anytime().toLocaleString(selectedLocale().replace("_", "-")))}
          />
          <FakerPlayground
            name="ZipCode:"
            generate={() => (localeFaker().location.zipCode())}
          />
          <FakerPlayground
            name="Address:"
            generate={generateAddress}
          />
          <FakerPlayground
            name="Paragraphs:"
            generate={() => (localeFaker().lorem.lines())}
          />
        </div>
      </Container>
    </main>
  );
}
