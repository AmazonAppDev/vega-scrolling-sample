import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import reactCompiler from 'eslint-plugin-react-compiler'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["src/**/*.js"],
}, ...compat.extends("@react-native", "eslint:recommended"), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        'react-compiler': reactCompiler,
    },
    rules: {
        'react-compiler/react-compiler': 'error',
    },
    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        // JSX is a global namespace provided by the React/RN type definitions
        // (used in `: JSX.Element` return annotations). Declare it so the
        // no-undef rule does not flag it.
        globals: {
            JSX: "readonly",
        },

        parserOptions: {
            project: "./tsconfig.json",
        },
    },
}];