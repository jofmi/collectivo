import { createDirectus, authentication, rest } from "@directus/sdk";

// Set up directus client or redirect to keycloak if not authenticated
export default defineNuxtPlugin({
  name: "directus-client",
  enforce: "pre",
  async setup(nuxtApp) {
    // nuxtApp.hook("vue:error", (..._args) => {
    //   console.log("vue:error");
    //   // if (process.client) {
    //   //   console.log(..._args)
    //   // }
    // });

    // nuxtApp.hook("app:error", (..._args) => {
    //   console.log("app:error");
    //   // if (process.client) {
    //   //   console.log(..._args)
    //   // }
    // });

    // nuxtApp.vueApp.config.errorHandler = (..._args) => {
    //   console.log("global error handler");
    //   // if (process.client) {
    //   //   console.log(..._args)
    //   // }
    // };

    let directus;
    const runtimeConfig = useRuntimeConfig();
    const user = useCollectivoUser();

    // Create directus REST client or redirect to offline error page
    try {
      directus = createDirectus<CollectivoSchema>(
        runtimeConfig.public.directusUrl as string,
      )
        .with(authentication("cookie", { credentials: "include" }))
        .with(rest({ credentials: "include" }));
    } catch (e) {
      throw createError({
        statusMessage: "Environment variable NUXT_PUBLIC_DIRECTUS_URL invalid",
        statusCode: 500,
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
          statusMessage: "Cannot reach backend server (directus)",
          statusCode: 500,
          fatal: true,
        });
      } else {
        // If error is auth-related, redirect to keycloak
        console.error("Error in directus.client.ts", e);
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
