<script setup lang="ts">
definePageMeta({
  layout: false,
});

const directus = useDirectus();
const runtimeConfig = useRuntimeConfig();
// If user is not authenticated, log out of directus and redirect to keycloak
directus.logout();

if (runtimeConfig.public.authService === "keycloak") {
  navigateTo(
    `${runtimeConfig.public.directusUrl}/auth/login/keycloak?redirect=${runtimeConfig.public.collectivoUrl}`,
    { external: true },
  );
} else {
  throw new Error(
    "Unknown auth service in nuxt.config: " + runtimeConfig.public.authService,
  );
}
</script>
