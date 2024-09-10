import { DirectoryTree } from "./directory-tree";

describe("Directory Tree", () => {
  [
    {
      name: "single root",
      raw: `\
./
- src/
-- features/
-- routes/
- test/
-- hello.test.ts`,
      styled: `\
./
├─ src/
│  ├─ features/
│  └─ routes/
└─ test/
   └─ hello.test.ts`,
    },
    {
      name: "multiple root",
      raw: `\
app/
- package.json

cli/
- Cargo.toml`,
      styled: `\
app/
└─ package.json

cli/
└─ Cargo.toml`,
    },
  ].forEach((params) => {
    it(`Convert text (${params.name})`, () => {
      const treeFromRaw = DirectoryTree.fromRawText(params.raw);
      const styledTextFromRaw = treeFromRaw.toStyledText();
      const rawTextFromRaw = treeFromRaw.toRawText();

      expect(styledTextFromRaw).toBe(params.styled);
      expect(rawTextFromRaw).toBe(params.raw);

      const treeFromStyled = DirectoryTree.fromStyledText(params.styled);
      const styledTextFromStyled = treeFromStyled.toStyledText();
      const rawTextFromStyled = treeFromStyled.toRawText();

      expect(styledTextFromStyled).toBe(params.styled);
      expect(rawTextFromStyled).toBe(params.raw);
    });
  });
});
