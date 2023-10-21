/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
  ],
  rules: {
    "tailwindcss/no-custom-classname": "off",
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          orderImportKind: "asc",
        },
        "newlines-between": "always",
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        distinctGroup: true,
      },
    ],
    "react/no-this-in-sfc": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
  },
};
