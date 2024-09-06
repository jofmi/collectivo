<script setup lang="ts">
import Keycloak from "keycloak-js";

definePageMeta({
  layout: false,
});

const directus = useDirectus();
const config = useRuntimeConfig();

try {
  await directus.logout();
} catch (error) {
  console.error("Failed to log out from Directus:", error);
}

if (config.public.authService === "keycloak") {
  try {
    const keycloak = new Keycloak({
      url: config.public.keycloakUrl,
      realm: config.public.keycloakRealm,
      clientId: config.public.keycloakClient,
    });

    await keycloak.init({
      onLoad: "check-sso",
      redirectUri: config.public.collectivoUrl + "/logout",
    });

    await keycloak.logout({
      redirectUri: config.public.collectivoUrl,
    });
  } catch (error) {
    console.error("Failed to log out from Keycloak:", error);
  }
} else {
  reloadNuxtApp({ path: "/" });
}
</script>

<template>
  <div />
</template>
