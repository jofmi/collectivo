// Middleware to protect routes from unauthenticated users
export default defineNuxtRouteMiddleware(() => {
  return useCollectivoUser().value.login();
});
