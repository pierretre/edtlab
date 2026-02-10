import js from "@eslint/js";
import astro from "eslint-plugin-astro";

export default [
    {
        ignores: [
            "dist/**",
            "node_modules/**",
            "coverage/**",
            "playwright-report/**",
            "test-results/**"
        ]
    },
    js.configs.recommended,
    ...astro.configs.recommended,
    {
        files: ["public/**/decap-customizations.js"],
        languageOptions: {
            globals: {
                CMS: "readonly",
                createClass: "readonly",
                h: "readonly",
                window: "readonly",
                document: "readonly",
                fetch: "readonly"
            }
        },
        rules: {
            "no-console": "off"
        }
    }
];
