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
      debug: false,
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
  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "vue3-carousel-nuxt",
  ],
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
    join(currentDir, "./assets/css/date-picker.scss"),
  ],
  ui: {
    global: true,
    icons: ["system-uicons", "mi"],
  },
  googleFonts: {
    download: true,
    families: {
      Urbanist: "100..900",
    },
  },
});
