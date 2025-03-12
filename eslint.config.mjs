import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react ";
import { version } from "react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect", //make sure the react plugin detetct and works with the version of react in our project
      },
    },
  },
  reactPlugin.configs.flat["jsx-runtime"],
  {
    files: ["**/*.js", "**/*.jsx"], //todo could add typescript when doing the ts path
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }, //adds browser and node globals e.g. document.
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    // order here is !important
    rules: {
      "react/no-unescaped-entities": "off", //turn off the rule that forces us o use &apos;
      "react/prop-types": "off", //turns off required prop types
    },
  },
  // prettier config always has to be last in eslint config array to prevent eslint picking up non-issues
  prettier,
];
