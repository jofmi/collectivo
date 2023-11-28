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
    var directus;
    console.log("Setting up directus browser client");
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

    // Try to refresh token or redirect to keycloak login page
    try {
      console.log("Trying to refresh existing token");
      await directus.refresh();
      console.log("Successfully refreshed token");
    } catch (e: any) {
      // If error is not related to authentication, redirect to login page
      console.log("Error while refreshing token", e);
      if ([400, 401, 403].includes(e.response?.status)) {
        console.log(
          "Redirecting to keycloak login page because status is ",
          e.response?.status
        );
        // directus.logout();
        // navigateTo(
        //   `${runtimeConfig.public.directusUrl}/auth/login/keycloak?redirect=${runtimeConfig.public.collectivoUrl}`,
        //   { external: true }
        // );
      } else {
        throw new Error("Cannot reach backend server (directus)");
      }
    }

    // Load data of current user to store
    getCurrentUser(directus);

    // Provide directus client to app
    return {
      provide: {
        directus: directus,
      },
    };
  },
});

// Load data of current user to store
async function getCurrentUser(directus: RestClient<CollectivoSchema>) {
  const user = useCurrentUser();
  // @ts-ignore
  user.value.data = await directus.request(
    readMe({
      fields: ["id", "first_name", "last_name", "email"],
    })
  );
}
