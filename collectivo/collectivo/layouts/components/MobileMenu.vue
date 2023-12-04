<script setup lang="ts">
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
.mobile-menu-item {
  @apply w-20;
}
.mobile-menu {
  @apply bg-white px-3 pt-2 pb-1 fixed bottom-0 w-full z-10 md:hidden border-t-2 border-cv-gray;
  box-shadow: 4px 0px 48px 0px rgba(220, 226, 239, 0.5);

  &__inner {
    @apply flex items-center justify-center;
  }
}
</style>
