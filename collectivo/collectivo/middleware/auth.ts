// Middleware to protect routes from unauthenticated users
export default defineNuxtRouteMiddleware(() => {
  const directus = useDirectus();
  const user = useUser();
  const runtimeConfig = useRuntimeConfig();

  // If user is authenticated, do nothing
  if (user.value.isAuthenticated === true) return;

  // If user is not authenticated, log out of directus and redirect to keycloak
  directus.logout();

  return navigateTo(
    `${runtimeConfig.public.directusUrl}/auth/login/keycloak?redirect=${runtimeConfig.public.collectivoUrl}`,
    { external: true }
  );
});
