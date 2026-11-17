import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "oxc", "unicorn"],
  env: {
    builtin: true,
  },
  categories: {
    correctness: "error"
  }
})