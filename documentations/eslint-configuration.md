# Frontend Linting & Formatting Guide

## 1. Install Dependencies

### Base Dependencies

```bash
npm install -D eslint prettier prettier-plugin-tailwindcss eslint-plugin-tailwindcss
```

---

## 2. Package Scripts

Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "ts:check": "tsc --noEmit && echo 'TypeScript check passed'",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,vue,json,css,scss,md}\"",
    "check:all": "npm run ts:check && npm run lint",
    "fix:all": "npm run lint:fix && npm run format",
  }
}
```

> Adjust file extensions depending on your project framework.

---

## 3. ESLint Configuration (`eslint.config.js`)

```js
import { FlatCompat } from "@eslint/eslintrc";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: "eslint:recommended",
});

export default [
  ...compat.extends("plugin:@typescript-eslint/recommended"),

  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react/prop-types": "off",
    },
    settings: { react: { version: "detect" } },
  },

  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: { tailwindcss: tailwindcssPlugin },
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/enforces-shorthand": "warn",
      "tailwindcss/no-custom-classname": "off",
    },
    settings: { tailwindcss: { callees: ["classnames", "clsx", "ctl"] } },
  },

  { ignores: ["node_modules/**", ".next/**", "dist/**", "build/**"] },
];

```

> Comment or remove framework sections not used in your project.

---

## 4. Prettier Configuration (`.prettierrc.json`)

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "all",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## 5. Usage Commands

| Command          | Description                   |
| ---------------- | ----------------------------- |
| `pnpm ts:check`  | TypeScript type check         |
| `pnpm lint`      | Run ESLint checks             |
| `pnpm lint:fix`  | Auto-fix ESLint issues        |
| `pnpm format`    | Format code using Prettier    |
| `pnpm check:all` | Run TypeScript + ESLint check |
| `pnpm fix:all`   | ESLint fix + Prettier format  |
