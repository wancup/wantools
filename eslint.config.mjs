// @ts-check

import pluginJs from "@eslint/js";
import jsonlint from "@eslint/json";
import markdownlint from "@eslint/markdown";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import solid from "eslint-plugin-solid/configs/typescript";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "park-ui",
      "public",
      "styled-system",
      ".tanstack",
      ".nitro",
      "dist",
    ],
  },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      globals: globals.commonjs,
    },
  },
  {
    files: ["**/*.{js,cjs,mjs}"],
    ...pluginJs.configs.recommended,
  },
  tseslint.configs.strictTypeChecked.map((c) => ({ files: ["**/*.{js,cjs,mjs,ts,tsx}"], ...c })),
  {
    files: ["**/*.json"],
    language: "json/json",
    ...jsonlint.configs.recommended,
  },
  markdownlint.configs.recommended,
  {
    files: ["**/*.{cjs,mjs}"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ["**/*.{ts,tsx}"],
    ...solid,
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        { allowExpressions: true },
      ],
      "@typescript-eslint/consistent-type-definitions": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          fixStyle: "inline-type-imports",
        },
      ],
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...jsxA11yPlugin.flatConfigs.recommended,
    settings: {
      "jsx-a11y": {
        "polymorphicPropName": "as",
        "components": {
          "A": "a",
          "Link": "a",
          "Text": "p",
          "Heading": "h2",
          "Button": "button",
          "IconButton": "button",
          "Clipbard": "button",
          "Input": "input",
          "NumberInput": "input",
          "Textarea": "textarea",
          "Table.Root": "table",
          "Table.Caption": "caption",
          "Table.Head": "thead",
          "Table.Body": "tbody",
          "Table.Record": "tr",
          "Table.Header": "th",
          "Table.Cell": "td",
        },
      },
    },
    rules: {
      ...jsxA11yPlugin.flatConfigs.recommended.rules,
      "jsx-a11y/anchor-is-valid": ["error", {
        "aspects": ["invalidHref", "preferButton"], // The Link component of TanStack Router specifies the destination with 'to' prop, so the rule is disabled.
      }],
    },
  },
);
