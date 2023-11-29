<script setup>
import MenuItem from "./MenuItem.vue";
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="mobile-menu">
    <div class="mobile-menu__inner">
      <menu-item title="Files" path="/files" class="mobile-menu-item">
        <template #icon>
          <Icon icon="system-uicons:document-list" class="link-icon" />
        </template>
      </menu-item>
      <menu-item title="Projects" path="/projects" class="mobile-menu-item">
        <template #icon>
          <Icon icon="system-uicons:folder-minus" class="link-icon" />
        </template>
      </menu-item>

      <menu-item title="Dashboard" path="/" class="mobile-menu-item">
        <template #icon>
          <Icon icon="system-uicons:grid" class="link-icon" />
        </template>
      </menu-item>

      <menu-item title="Calendar" path="/calendar" class="mobile-menu-item">
        <template #icon>
          <Icon icon="system-uicons:calendar-month" class="link-icon" />
        </template>
      </menu-item>
      <menu-item title="More" path="/more" class="mobile-menu-item">
        <template #icon>
          <Icon icon="system-uicons:circle-menu" class="link-icon" />
        </template>
      </menu-item>
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

.link-icon {
  @apply h-7 w-7 text-cv-primary;
}

.router-link-exact-active {
  @apply bg-none rounded-xl #{!important};
  &.mobile-menu-item {
    .item__icon {
      .link-icon {
        @apply text-cv-active z-10;
      }
    }
  }
}
</style>
