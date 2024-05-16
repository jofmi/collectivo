import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "vue/no-multiple-template-root": "warn",
  },
});
