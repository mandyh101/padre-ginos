import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  //this config keeps our tests we've created so far separated in a happy-dom environment
  {
    extends: "./vite.config.js",
    test: {
      include: ["**/*.node.test.{js,jsx}"],
      name: "happy-dom",
      environment: "happy-dom",
      coverage: {
        provider: "istanbul", // Use Istanbul for coverage
        reporter: ["text", "html"], // Specify desired reporters
        include: ["src/**/*.ts"], // Include files for coverage
        exclude: ["src/test/**"], // Exclude test files
      },
    },
  },
  //this config creates a playwright environment where we will write some new browser tests using PW
  {
    extends: "./vite.config.js",
    test: {
      setupFiles: ["vitest-browser-react"],
      include: ["**/*.browser.test.{js,jsx}"],
      name: "browser",
      browser: {
        provider: "playwright",
        enabled: true,
        name: "chromium",
      },
      coverage: {
        provider: "istanbul", // Use Istanbul for coverage
        reporter: ["text", "html"], // Specify desired reporters
        include: ["src/**/*.ts"], // Include files for coverage
        exclude: ["src/test/**"], // Exclude test files
      },
    },
  },
]);
