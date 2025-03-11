import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
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
  },
  // prettier config always has to be last in eslint config array to prevent eslint picking up non-issues
  prettier,
];
