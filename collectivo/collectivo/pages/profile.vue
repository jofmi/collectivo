<script setup lang="ts">
setPageTitle("Profile");
const { t } = useI18n();
const profile = useProfile(true);
const runtimeConfig = useRuntimeConfig();
const logoutPath = `${runtimeConfig.public.keycloakUrl}/realms/collectivo/protocol/openid-connect/logout`;

interface Field {
  label: string;
  key: keyof CollectivoProfile;
  placeholder?: string;
}
const fields: Field[] = [
  {
    label: "First Name",
    key: "first_name",
  },
  {
    label: "Last Name",
    key: "last_name",
  },
  {
    label: "Email",
    key: "email",
  },
];
// profile.data!.first_name
// const y = profile.value.data!.first_name;
</script>

<template>
  <div class="container">
    <h2 class="text-cv-primary font-semibold text-2xl leading-7 mb-6">
      {{ t("Personal data") }}
    </h2>
    <div v-if="profile.error">
      {{ profile.error }}
    </div>
    <div v-if="profile.loading">{{ t("Loading") }}...</div>
    <div v-else-if="profile.data">
      <div v-for="field in fields" :key="field.key" class="mb-6">
        <CollectivoInputDefault
          :label="field.label"
          v-model="profile.data![field.key]"
        />
      </div>
    </div>
    <UButton
      class="btn"
      variant="solid"
      color="cyan"
      size="md"
      icon="i-system-uicons-check"
    >
      Save
    </UButton>
  </div>
  <div class="container">
    <h2 class="text-cv-primary font-semibold text-2xl leading-7 mb-6">
      {{ t("Actions") }}
    </h2>
    <UButton
      class="btn"
      variant="solid"
      color="red"
      size="md"
      icon="i-system-uicons-exit-right"
      :to="logoutPath"
      target="_blank"
    >
      Logout
    </UButton>
  </div>
</template>

<style scoped lang="scss">
.container {
  @apply rounded-xl p-[25px] mb-5;
  box-shadow: 0px 6px 48px 0px rgba(220, 226, 239, 0.5);
}
</style>
