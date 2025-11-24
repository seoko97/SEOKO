import globals from "globals";
import { config as baseConfig } from "./base.js";
import { defineConfig } from "eslint/config";

/**
 * ESLint configuration for Nest.js
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nestJsConfig = defineConfig([
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
        ...globals.es2024,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["sibling", "parent"], "index"],
          "newlines-between": "always",
          pathGroups: [
            { pattern: "@nestjs/**", group: "internal", position: "before" },
            { pattern: "@/**", group: "internal", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
]);
