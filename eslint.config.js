import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["coverage/", "playwright-report/", "test-results/", "node_modules/", ".stryker-tmp/", "reports/"] },
  js.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      eqeqeq: "error",
      "prefer-const": "error",
      "no-unused-vars": "error",
    },
  },
];