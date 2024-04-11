<script setup lang="ts">
const { setLocale, t } = useI18n();
const user = useCollectivoUser();
const router = useRouter();
const menus = useCollectivoMenus();
const config = useAppConfig();
const profileMenu: any = ref([[]]);
const languageMenu: any = ref([[]]);

const topRightMenus = ref([
  {
    label: "Language",
    icon: "i-heroicons-language",
    items: languageMenu,
  },
  {
    label: "Profile",
    icon: "i-heroicons-user-circle",
    items: profileMenu,
  },
]);

const menuItemsStore = Object.values(
  user.value.isAuthenticated ? menus.value.profile : menus.value.profile_public,
).sort((a, b) => (a.order ?? 100) - (b.order ?? 100));

for (const item of menuItemsStore) {
  profileMenu.value[0].push({
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

for (const i in config.collectivo.locales) {
  const key = config.collectivo.locales[i];

  languageMenu.value[0].push({
    label: locales[key],
    click: () => {
      setLocale(key);
    },
  });
}
</script>

<template>
  <div class="flex flex-row gap-2">
    <div v-for="menu in topRightMenus" :key="menu.label">
      <UDropdown :items="menu.items" :popper="{ placement: 'bottom-start' }">
        <UIcon class="h-7 w-7" :name="menu.icon" />

        <template #item="{ item }">
          <UIcon v-if="item.icon" class="h-5 w-5" :name="item.icon" />
          <span>{{ t(item.label) }}</span>
        </template>
      </UDropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
