import airbnb from 'eslint-config-airbnb';
import airbnbTypescript from 'eslint-config-airbnb-typescript';
import testingLibrary from 'eslint-plugin-testing-library';
import tsparser from '@typescript-eslint/parser';
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  {
    ignores: [
      "**/.*",
      "build",
      "coverage",
      "node_modules",
      "bootstrap-next-typescript"
    ]
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        tsconfigRootDir: ".",
        project: ["./tsconfig.json"],
        ecmaVersion: 2021,
      },
      globals: {
        ...airbnb.globals,
        document: "readonly",
        navigator: "readonly",
        window: "readonly"
      }
    },
    settings: {
      ...airbnb.settings,
      ...airbnbTypescript.settings,
      next: {
        rootDir: "."
      }
    },
    rules: {
      ...airbnb.rules,
      ...airbnbTypescript.rules,
      "quotes": ["error", "double"],
      "indent": ["error", 2, {
        "SwitchCase": 1
      }],
      "react/function-component-definition": [2, {
        "namedComponents": "arrow-function"
      }],
      "lines-around-directive": "off",
      "complexity": ["warn", 20],
      "max-len": ["warn", {
        "code": 120
      }],
      "import/no-extraneous-dependencies": ["error", {
        "devDependencies": true
      }],
      "import/newline-after-import": "off",
      "no-multiple-empty-lines": ["error", {
        "max": 0
      }],
      "@typescript-eslint/no-require-imports": "off",
      "react/prop-types": "off",
      "jest/valid-title": "off",
    }
  },
  {
    plugins: {
      "testing-library": testingLibrary,
    },
    files: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    rules: {
      ...testingLibrary.configs.react.rules
    }
  }
];

export default eslintConfig;
