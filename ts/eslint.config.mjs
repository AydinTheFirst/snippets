import eslint from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    plugins: { perfectionist },
    files: ["src/**/*{.ts,.tsx}"],
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          internalPattern: ["^@/.+"],
        },
      ],
    },
  }
);
