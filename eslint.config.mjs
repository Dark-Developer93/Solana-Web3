import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base configurations
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier" // Add prettier to avoid conflicts
  ),

  // Import plugin configuration
  ...compat.plugins("import", "jsx-a11y"),

  // Additional rules for best practices
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Error prevention
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-duplicate-imports": "error",

      // React best practices
      "react/jsx-key": "error",
      "react/jsx-no-useless-fragment": "warn",
      "react/no-array-index-key": "warn",
      "react/self-closing-comp": "warn",

      // TypeScript best practices
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],

      // Import organization
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],

      // Accessibility
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
    },
  },
];

export default eslintConfig;
