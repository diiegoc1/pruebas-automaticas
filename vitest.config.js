import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.js"],
    coverage: {
      include: ["src/**/*.js"],
      exclude: ["src/**/*.test.js"],
      thresholds: { lines: 90, branches: 90 },
    },
  },
});