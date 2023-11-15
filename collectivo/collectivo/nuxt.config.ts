// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from "./package.json";

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    collectivoVersion: pkg.version,
    apiToken: "",
    directusAdminEmail: "",
    directusAdminPassword: "",
    public: {
      collectivoUrl: "",
      keycloakUrl: "",
      keycloakRealm: "",
      keycloakClient: "",
      directusUrl: "",
    },
  },
  hooks: {},
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  // https://v8.i18n.nuxtjs.org/guide/layers
  i18n: {
    lazy: false, // TODO: Lazy loading does not work with current switch
    langDir: "./lang",
    locales: [
      { code: "en", file: "en.json" },
      { code: "de", file: "de.json" },
    ],
    strategy: "no_prefix",
    defaultLocale: process.env.COLLECTIVO_DEFAULT_LOCAL ?? "en",
    detectBrowserLanguage:
      process.env.COLLECTIVO_USE_BROWSER_LOCAL == "true" ?? false,
  },
});
