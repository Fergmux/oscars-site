module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  rules: {
    quotes: ["warn", "single"],
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
};
