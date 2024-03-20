import {
  createDirectus,
  authentication,
  rest,
  refresh,
  withOptions,
} from "@directus/sdk";

// Set up directus client or redirect to keycloak if not authenticated
export default defineNuxtPlugin({
  name: "directus-client",
  enforce: "pre",
  async setup() {
    let directus;
    const runtimeConfig = useRuntimeConfig();
    const user = useCollectivoUser();

    // Create directus REST client or redirect to offline error page
    try {
      directus = createDirectus<CollectivoSchema>(
        runtimeConfig.public.directusUrl as string,
      )
        .with(authentication("session", { credentials: "include" }))
        .with(rest({ credentials: "include" }));
    } catch (e) {
      console.error("Possible invalid env var: NUXT_PUBLIC_DIRECTUS_URL");
      throw createError({
        statusMessage: "Server is unavailable",
        statusCode: 503,
        fatal: true,
      });
    }

    // Try to refresh token and set user to authenticated if successful
    try {
      await directus.refresh();

      user.value.isAuthenticated = true;
    } catch (e: any) {
      // If error is not auth-related, throw error
      if (![400, 401, 403].includes("response" in e && e.response.status)) {
        throw createError({
          statusMessage: "Server is unavailable",
          statusCode: 503,
          fatal: true,
        });
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
