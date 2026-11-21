import solid from "eslint-plugin-solid/configs/typescript";
import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "error",
    suspicious: "warn",
    perf: "warn",
  },
  options: {
    maxWarnings: 0,
  },
  plugins: [
    "eslint",
    "typescript",
    "unicorn",
    "oxc",
    "import",
    "jsdoc",
    "promise",
    "vitest",
    "jsx-a11y",
  ],
  jsPlugins: ["eslint-plugin-solid"],
  env: { browser: true },
  ignorePatterns: [
    ".nitro/**",
    ".tanstack/**",
    "dist/**",
    "public/**",
    "src/routeTree.gen.ts",
    "styled-system/**",
  ],
  rules: {
    "typescript/no-explicit-any": "error",
    "typescript/no-non-null-assertion": "error",
    "typescript/explicit-function-return-type": ["warn", { allowExpressions: true }],
    "typescript/consistent-type-definitions": "warn",
    "typescript/consistent-type-imports": ["warn", { fixStyle: "inline-type-imports" }],
    "import/no-unassigned-import": ["warn", { allow: ["**/*.css"] }],
    // TanStack Router uses `to` instead of `href`.
    "jsx-a11y/anchor-is-valid": ["error", { aspects: ["invalidHref", "preferButton"] }],
  },
  overrides: [
    {
      files: ["**/*.cjs"],
      env: { commonjs: true },
      rules: { "typescript/no-require-imports": "off" },
    },
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: { ...solid.rules },
    },
    {
      files: ["src/**/*.test.{js,jsx,ts,tsx}"],
      rules: {
        "vitest/no-commented-out-tests": "error",
        "vitest/no-disabled-tests": "warn",
        "vitest/no-identical-title": "error",
        "vitest/no-import-node-test": "error",
        "vitest/no-interpolation-in-snapshots": "error",
        "vitest/no-mocks-import": "error",
        "vitest/no-unneeded-async-expect-function": "error",
        "vitest/prefer-called-exactly-once-with": "error",
      },
    },
  ],
  settings: {
    "jsx-a11y": {
      "polymorphicPropName": "as",
      "attributes": {
        "for": ["htmlFor", "for"],
      },
      "components": {
        "Anchor": "a",
        "Link": "a",
        "Heading": "h2",
        "Button": "button",
        "CopyButton": "button",
        "Label": "label",
        "Input": "input",
        "Select": "select",
        "Textarea": "textarea",
        "Table": "table",
        "Table.Caption": "caption",
        "Table.Thead": "thead",
        "Table.Tbody": "tbody",
        "Table.Tfoot": "tfoot",
        "Table.Tr": "tr",
        "Table.Th": "th",
        "Table.Td": "td",
      },
    },
  },
});
