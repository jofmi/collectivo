// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from "./package.json";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    collectivoVersion: pkg.version,
    apiToken: "badToken",
    directusAdminEmail: "api@example.com",
    directusAdminPassword: "d1r3ctu5",
    keycloakAdminClient: "admin-cli",
    keycloakAdminSecret: "**********",
    public: {
      collectivoUrl: "http://localhost:3000",
      authService: "keycloak",
      keycloakUrl: "http://keycloak:8080",
      keycloakRealm: "collectivo",
      directusUrl: "http://localhost:8055",
    },
  },
  colorMode: {
    preference: "light",
  },
  hooks: {},
  modules: ["@nuxt/ui", "@nuxtjs/i18n", "vue3-carousel-nuxt"],
  // https://v8.i18n.nuxtjs.org/guide/layers
  i18n: {
    lazy: false, // TODO: Lazy loading does not work with current switch
    strategy: "no_prefix",
    defaultLocale: "en",
    langDir: "./lang",
    locales: [
      { code: "en", file: "en.json" },
      { code: "de", file: "de.json" },
    ],
  },
  css: [
    join(currentDir, "./assets/css/main.css"),
    join(currentDir, "./assets/fonts/fonts.css"),
    join(currentDir, "./assets/css/calendar.scss"),
    join(currentDir, "./assets/css/group-radio.scss"),
    join(currentDir, "./assets/css/date-picker.scss"),
    join(currentDir, "./assets/css/global-input.scss"),
  ],
  ui: {
    global: true,
    icons: ["system-uicons", "mi"],
  },
});
