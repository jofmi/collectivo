import {
  createDirectus,
  authentication,
  rest,
  readMe,
  type RestClient,
} from "@directus/sdk";

// Set up directus client or redirect to keycloak if not authenticated
export default defineNuxtPlugin({
  name: "directus-client",
  enforce: "pre",
  async setup() {
    const runtimeConfig = useRuntimeConfig();
    let directus;

    // Create directus REST client or redirect to offline error page
    try {
      directus = createDirectus<CollectivoSchema>(
        runtimeConfig.public.directusUrl as string,
      )
        .with(authentication("cookie", { credentials: "include" }))
        .with(rest({ credentials: "include" }));
    } catch (e) {
      throw new Error("Environment variable NUXT_PUBLIC_DIRECTUS_URL invalid");
    }

    // Try to refresh token or redirect to keycloak login page
    try {
      await directus.refresh();
    } catch (e: any) {
      if ([400, 401, 403].includes(e.response?.status)) {
        directus.logout();

        navigateTo(
          `${runtimeConfig.public.directusUrl}/auth/login/keycloak?redirect=${runtimeConfig.public.collectivoUrl}`,
          { external: true },
        );
      } else {
        throw new Error("Cannot reach backend server (directus)");
      }
    }

    // Provide directus client to app
    return {
      provide: {
        directus: directus,
      },
    };
  },
});
