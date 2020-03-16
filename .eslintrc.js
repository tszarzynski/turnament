module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: false
    },
    tsconfigRootDir: __dirname,
    project: ["./packages/*/tsconfig.json"]
  },
  plugins: ["@typescript-eslint", "react"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended"
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off"
  },
  env: {
    es6: true,
    node: true
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  globals: {
    module: "readonly",
    global: "readonly"
  }
};
