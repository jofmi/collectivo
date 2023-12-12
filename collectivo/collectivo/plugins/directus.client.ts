import { createDirectus, authentication, rest } from "@directus/sdk";

// Set up directus client or redirect to keycloak if not authenticated
export default defineNuxtPlugin({
  name: "directus-client",
  enforce: "pre",
  async setup() {
    let directus;
    const runtimeConfig = useRuntimeConfig();
    const user = useUser();

    // Create directus REST client or redirect to offline error page
    try {
      directus = createDirectus<CollectivoSchema>(
        runtimeConfig.public.directusUrl as string
      )
        .with(authentication("cookie", { credentials: "include" }))
        .with(rest({ credentials: "include" }));
    } catch (e) {
      throw new Error("Environment variable NUXT_PUBLIC_DIRECTUS_URL invalid");
    }

    // Try to refresh token and set user to authenticated if successful
    try {
      await directus.refresh();
      user.value.isAuthenticated = true;
    } catch (e: any) {
      // If error is not auth-related, throw error
      if (!("response" in e) || ![400, 401, 403].includes(e.response.status)) {
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
