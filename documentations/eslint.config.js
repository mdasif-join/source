import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat allows using old-style ESLint configs (like Next.js) with Flat Config
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Next.js recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // TailwindCSS plugin rules
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      tailwindcss: require("eslint-plugin-tailwindcss"),
    },
    rules: {
      "tailwindcss/classnames-order": "warn", // ensure classes are in Tailwind's recommended order
      "tailwindcss/enforces-shorthand": "warn", // enforce shorthand (e.g., `py-2 px-4` → `p-2 px-4`)
      "tailwindcss/no-custom-classname": "off", // allow custom class names
    },
    settings: {
      tailwindcss: {
        // recognize popular class merge utilities
        callees: ["classnames", "clsx", "ctl"],
      },
    },
  },

  // rools for React and TypeScript
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    rules: {
      "react-hooks/rules-of-hooks": "error", // enforce correct usage of React Hooks
      "react-hooks/exhaustive-deps": "warn", // warn if dependencies in useEffect/useCallback are incorrect
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" }, // ignore unused vars that start with "_"
      ],
    },
  },

  // ignore unnecessary files/folders
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
