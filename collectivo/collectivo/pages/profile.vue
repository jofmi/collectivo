<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

setCollectivoTitle("Profile");
const toast = useToast();
const { t } = useI18n();
const profile = useUser();
const runtimeConfig = useRuntimeConfig();
const logoutPath = `${runtimeConfig.public.keycloakUrl}/realms/collectivo/protocol/openid-connect/logout`;
const state = ref<CollectivoUser | null>(null);

// Sort profile.inputs by order
profile.value.inputs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

// Get form data
async function getProfile() {
  await profile.value.load();
  state.value = { ...profile.value.data } as CollectivoUser;
}

getProfile();

// Submit form data
async function saveProfile() {
  try {
    await profile.value.save(state.value!);

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
    <h2 class="text-cv-primary font-semibold text-2xl leading-7 mb-6">
      {{ t("Personal data") }}
    </h2>
    <div v-if="profile.error">
      {{ profile.error }}
    </div>
    <div v-else-if="state">
      <div v-for="field in profile.inputs" :key="field.key" class="mb-6">
        <UFormGroup :label="field.label" :name="field.key">
          <UInput
            v-model="state[field.key]"
            :disabled="field.disabled ?? false"
        /></UFormGroup>
      </div>
      <UButton
        class="btn"
        variant="solid"
        color="cyan"
        size="md"
        icon="i-mi-circle-check"
        :loading="profile.saving"
        @click="saveProfile"
      >
        {{ t("Save") }}
      </UButton>
    </div>
    <div v-else>
      <USkeleton class="h-12 w-full" />
    </div>
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
