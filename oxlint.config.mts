import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "oxc", "unicorn", "react", "react-perf"],
  env: {
    builtin: true,
  },
  categories: {
    correctness: "error",
  },
});
