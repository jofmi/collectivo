<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

setCollectivoTitle("Profile");
const toast = useToast();
const { t } = useI18n();
const user = useCollectivoUser();
const runtimeConfig = useRuntimeConfig();
const logoutPath = `${runtimeConfig.public.keycloakUrl}/realms/collectivo/protocol/openid-connect/logout`;

// Sort profile.inputs by order
// profile.value.inputs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

// Get form data
async function getProfile() {
  await user.value.load();
}

getProfile();

// Submit form data
async function saveProfile(data: any) {
  try {
    await user.value.save(data);

    toast.add({
      title: t("Profile updated"),
      icon: "i-mi-circle-check",
      timeout: 10000,
    });
  } catch (e) {
    console.error(e);

    toast.add({
      title: t("There was an error"),
      icon: "i-mi-warning",
      color: "red",
      timeout: 0,
    });
  }
}
</script>

<template>
  <CollectivoContainer>
    <CollectivoForm
      v-if="user.data"
      :data="user.data"
      :fields="user.fields"
      :submit="saveProfile"
    />
  </CollectivoContainer>
  <CollectivoContainer>
    <h2 class="text-cv-primary font-semibold text-2xl leading-7 mb-6">
      {{ t("Actions") }}
    </h2>
    <UButton
      class="btn"
      variant="solid"
      color="red"
      size="md"
      icon="i-mi-log-out"
      :to="logoutPath"
      target="_blank"
    >
      {{ t("Logout") }}
    </UButton>
  </CollectivoContainer>
</template>

<style scoped lang="scss"></style>
