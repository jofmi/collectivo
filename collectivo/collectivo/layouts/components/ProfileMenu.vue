<script setup lang="ts">
const { setLocale, t } = useI18n();
const user = useCollectivoUser();
const router = useRouter();
const menus = useCollectivoMenus();

const menuItems: any = ref([
  [],
  [
    // for languages items
  ],
]);

const menuItemsStore = user.value.isAuthenticated
  ? menus.value.profile
  : menus.value.profile_public;

for (const item of menuItemsStore) {
  menuItems.value[0].push({
    label: item.label,
    icon: item.icon,
    click:
      item.click ||
      (() => {
        router.push({ name: item.to });
      }),
  });
}

const locales = {
  de: "Deutsch",
  en: "English",
};

for (const [key, value] of Object.entries(locales)) {
  menuItems.value[1].push({
    label: value,
    click: () => {
      setLocale(key);
    },
  });
}
</script>

<template>
  <UDropdown :items="menuItems" :popper="{ placement: 'bottom-start' }">
    <UIcon class="icon" name="i-heroicons-user-circle" />

    <template #item="{ item }">
      <UIcon class="icon" :name="item.icon" />
      <span>{{ t(item.label) }}</span>
    </template>
  </UDropdown>
</template>

<style lang="scss" scoped>
.icon {
  @apply h-5 w-5;
}
</style>
