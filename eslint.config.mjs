import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Custom rules overrides
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/react-in-jsx-scope": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      // semi: ["error", "never"],
      "no-unexpected-multiline": "error",
      // "no-extra-semi": "error"
    },
  },
]);

export default eslintConfig;
