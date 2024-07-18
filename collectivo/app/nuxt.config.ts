// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  extends: [
    "@collectivo/collectivo",
    "@collectivo/payments",
    "@collectivo/memberships",
  ],

  i18n: {
    lazy: true,
    langDir: "./lang",
    locales: [
      { code: "en", file: "en.json" },
      { code: "de", file: "de.json" },
    ],
  },

  compatibilityDate: "2024-07-18",
});