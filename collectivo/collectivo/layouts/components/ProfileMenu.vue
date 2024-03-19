<script setup lang="ts">
const { setLocale, t } = useI18n();
const user = useCollectivoUser();
const router = useRouter();

const topRightMenuNoAuthItems: any = ref([[]]);

const topRightMenuItems: any = ref([
  [
    {
      label: "Profile",
      click: () => {
        router.push({ name: "profile" });
      },
    },
    {
      label: "Logout",
      click: () => {
        user.value.logout();
      },
    },
  ],
  [
    // for languages items
  ],
]);

const locales = {
  de: "Deutsch",
  en: "English",
};

for (const [key, value] of Object.entries(locales)) {
  topRightMenuNoAuthItems.value[0].push({
    label: value,
    click: () => {
      setLocale(key);
    },
  });

  topRightMenuItems.value[1].push({
    label: value,
    click: () => {
      setLocale(key);
    },
  });
}
</script>

<template>
  <template v-if="!user.isAuthenticated">
    <UDropdown
      :items="topRightMenuNoAuthItems"
      :popper="{ placement: 'bottom-start' }"
    >
      <UIcon class="icon" name="i-system-uicons-translate"></UIcon>

      <template #item="{ item }">
        <span>{{ t(item.label) }}</span>
      </template>
    </UDropdown>
  </template>
  <template v-else>
    <UDropdown
      :items="topRightMenuItems"
      :popper="{ placement: 'bottom-start' }"
    >
      <UIcon class="icon" name="i-system-uicons-user-male-circle" />

      <template #item="{ item }">
        <span>{{ t(item.label) }}</span>
      </template>
    </UDropdown>
  </template>
</template>

<style lang="scss" scoped>
.icon {
  @apply w-7 h-7;
}
</style>
