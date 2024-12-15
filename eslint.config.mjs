// @ts-check

import pluginJs from "@eslint/js";
import panda from "@pandacss/eslint-plugin";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import solid from "eslint-plugin-solid/configs/typescript";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["park-ui", "public", "styled-system", "dist", ".vinxi"] },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    files: ["eslint.config.mjs", "postcss.config.mjs"],
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
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@pandacss": panda,
    },
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      ...panda.configs.recommended.rules,
    },
  },
);
