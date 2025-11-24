import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import pluginNext from "@next/eslint-plugin-next";

import { defineConfig, globalIgnores } from "eslint/config";

import { config as reactConfig } from "./react-internal.js";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nextJsConfig = defineConfig([
  ...tseslint.configs.recommended,
  ...reactConfig,
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,

      "@next/next/no-html-link-for-pages": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  eslintConfigPrettier,
]);
