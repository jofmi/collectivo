export const useDirectus = () => {
  const { $directus } = useNuxtApp();
  return $directus;
};

export function requireAuth() {
  const directus = useDirectus();
  const user = useUser();
  const runtimeConfig = useRuntimeConfig();

  // If user is authenticated, do nothing
  if (user.value.isAuthenticated === true) return;

  // If user is not authenticated, log out of directus and redirect to keycloak
  directus.logout();

  if (runtimeConfig.public.authService === "keycloak") {
    return navigateTo(
      `${runtimeConfig.public.directusUrl}/auth/login/keycloak?redirect=${runtimeConfig.public.collectivoUrl}`,
      { external: true }
    );
  } else {
    throw new Error(
      "Unknown auth service in nuxt.config: " + runtimeConfig.public.authService
    );
  }
}
