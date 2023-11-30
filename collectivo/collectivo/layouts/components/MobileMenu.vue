<script setup>
import MenuItem from "./MenuItem.vue";

const menuItems = useSidebarMenu();
const sortedMenuItems = Object.values(menuItems.value).sort(
  (a, b) => (a.order ?? 100) - (b.order ?? 100)
);
</script>

<template>
  <div class="mobile-menu">
    <div class="mobile-menu__inner">
      <div v-for="(item, i) in sortedMenuItems" :key="i">
        <MenuItem
          v-if="item.mobile == undefined || item.mobile == true"
          :item="item"
          class="mobile-menu-item"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mobile-menu {
  @apply bg-white px-5 pt-4 pb-[14px] fixed bottom-0 w-full z-10 md:hidden;
  box-shadow: 4px 0px 48px 0px rgba(220, 226, 239, 0.5);

  &__inner {
    @apply flex items-center justify-between;
  }
}
</style>
