# Frontend Linting & Formatting Guide

This document provides a **modular ESLint + Prettier + TailwindCSS setup** for all frontend projects. You can enable or disable parts depending on your framework: **React, Vue, Angular, Next.js, or vanilla JS/TS**.

---

## 1. Install Dependencies

### Base Dependencies (All Projects)

```bash
pnpm add -D eslint prettier prettier-plugin-tailwindcss eslint-plugin-tailwindcss
```

### TypeScript Projects

```bash
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### React / Next.js Projects

```bash
pnpm add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

### Vue Projects

```bash
pnpm add -D eslint-plugin-vue
```

### Angular / Vanilla JS/TS Projects

* No extra framework packages needed beyond **ESLint, Prettier, Tailwind, TypeScript (optional)**.

---

## 2. Package Scripts

Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "ts:check": "tsc --noEmit && echo 'TypeScript check passed'",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx,.vue",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx,.vue --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,vue,json,css,scss,md}\"",
    "check:all": "pnpm ts:check && pnpm lint",
    "fix:all": "pnpm lint:fix && pnpm format"
  }
}
```

> Adjust file extensions depending on your project framework.

---

## 3. ESLint Configuration (`eslint.config.js`)

```js
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Base rules for JavaScript/TypeScript
  ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),

  // React support
  // Enable only if using React/Next.js
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: require("eslint-plugin-react"),
      "react-hooks": require("eslint-plugin-react-hooks"),
      "jsx-a11y": require("eslint-plugin-jsx-a11y")
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react/prop-types": "off"
    },
    settings: { react: { version: "detect" } }
  },

  // Vue support
  // Enable only if using Vue
  {
    files: ["**/*.vue"],
    plugins: { vue: require("eslint-plugin-vue") },
    rules: {}
  },

  // TailwindCSS rules
  {
    files: ["**/*.{js,ts,jsx,tsx,vue}"],
    plugins: { tailwindcss: require("eslint-plugin-tailwindcss") },
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/enforces-shorthand": "warn",
      "tailwindcss/no-custom-classname": "off"
    },
    settings: { tailwindcss: { callees: ["classnames", "clsx", "ctl"] } }
  },

  // Ignore unnecessary files/folders
  {
    ignores: ["node_modules/**", "dist/**", "build/**"]
  }
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

---

## 6. Framework-Specific Reference Table

| Project Type         | Required Packages                                                                                                                                                                                                               | ESLint Plugins                                                | ESLint Rules / Sections                                                               | Notes                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------- |
| React / Next.js      | `eslint`, `prettier`, `prettier-plugin-tailwindcss`, `eslint-plugin-tailwindcss`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y` | react, react-hooks, jsx-a11y, tailwindcss, @typescript-eslint | Enable React rules section. Keep Tailwind and TS rules.                               | Remove Vue section.                      |
| Vue.js               | `eslint`, `prettier`, `prettier-plugin-tailwindcss`, `eslint-plugin-tailwindcss`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-plugin-vue`                                                          | vue, tailwindcss, @typescript-eslint                          | Enable Vue section. Keep Tailwind and TS rules. Disable React rules.                  | Remove React + React Hooks section.      |
| Angular / Vanilla TS | `eslint`, `prettier`, `prettier-plugin-tailwindcss`, `eslint-plugin-tailwindcss`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`                                                                               | tailwindcss, @typescript-eslint                               | Keep TypeScript rules section. Keep Tailwind if used. Disable React and Vue sections. | No React or Vue rules required.          |
| Vanilla JS (No TS)   | `eslint`, `prettier`, `prettier-plugin-tailwindcss`, `eslint-plugin-tailwindcss`                                                                                                                                                | tailwindcss                                                   | Keep base JS rules. Tailwind optional. Disable TS, React, Vue sections.               | TypeScript plugins not needed.           |
| Tailwind Usage       | `prettier-plugin-tailwindcss`, `eslint-plugin-tailwindcss`                                                                                                                                                                      | tailwindcss                                                   | Keep Tailwind section enabled.                                                        | Optional in projects not using Tailwind. |

