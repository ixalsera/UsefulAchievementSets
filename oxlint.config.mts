import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "oxc", "unicorn", "react"],
  env: {
    builtin: true,
  },
  categories: {
    correctness: "error",
  },
});
