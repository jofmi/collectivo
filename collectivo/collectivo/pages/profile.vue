<script setup lang="ts">
setPageTitle("Profile");
const toast = useToast();
const { t } = useI18n();
const profile = useProfile();
const runtimeConfig = useRuntimeConfig();
const logoutPath = `${runtimeConfig.public.keycloakUrl}/realms/collectivo/protocol/openid-connect/logout`;
const temp_data = ref<CollectivoProfile | null>(null);

// Get form data
async function getProfile() {
  await profile.value.load();
  temp_data.value = { ...profile.value.data } as CollectivoProfile;
}
getProfile();

// Submit form data
async function saveProfile() {
  try {
    await profile.value.save(temp_data.value!);
    toast.add({
      title: t("Profile updated"),
      icon: "i-heroicons-check-circle",
      timeout: 10000,
    });
  } catch (e) {
    console.error(e);
    toast.add({
      title: t("There was an error"),
      icon: "i-heroicons-warning-circle",
      color: "red",
      timeout: 0,
    });
  }
}

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
</script>

<template>
  <div class="container">
    <h2 class="text-cv-primary font-semibold text-2xl leading-7 mb-6">
      {{ t("Personal data") }}
    </h2>
    <div v-if="profile.error">
      {{ profile.error }}
    </div>
    <div v-else-if="temp_data">
      <div v-for="field in fields" :key="field.key" class="mb-6">
        <CollectivoInputDefault
          :label="field.label"
          v-model="temp_data[field.key]"
        />
      </div>
      <UButton
        class="btn"
        variant="solid"
        color="cyan"
        size="md"
        icon="i-system-uicons-check"
        @click="saveProfile"
        :loading="profile.saving"
      >
        {{ t("Save") }}
      </UButton>
    </div>
    <div v-else>{{ t("Loading") }}...</div>
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
      {{ t("Logout") }}
    </UButton>
  </div>
</template>

<style scoped lang="scss">
.container {
  @apply rounded-xl p-[25px] mb-5 bg-white;
  box-shadow: 0px 6px 48px 0px rgba(220, 226, 239, 0.5);
}
</style>
