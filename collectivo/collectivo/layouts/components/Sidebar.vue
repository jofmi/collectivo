<script setup lang="ts">
import Logo from "./Logo.vue";
import MenuItem from "./MenuItem.vue";
import pkg from "../../package.json";

const menuItems = useSidebarMenu();
const sortedMenuItems = Object.values(menuItems.value).sort(
  (a, b) => (a.order ?? 100) - (b.order ?? 100)
);
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__inner">
      <div class="sidebar__inner__list">
        <div class="sidebar__inner__list__item">
          <div class="sidebar__inner__list__item__top">
            <Logo />
            <div v-for="(item, i) in sortedMenuItems" :key="i">
              <MenuItem :item="item" />
            </div>
            <!-- <MenuItem title="Dashboard" path="/">
              <template #icon>
                <Icon icon="system-uicons:grid" class="link-icon" />
              </template>
            </MenuItem>
            <MenuItem title="Projects" path="/projects">
              <template #icon>
                <Icon icon="system-uicons:folder-minus" class="link-icon" />
              </template>
            </MenuItem>
            <MenuItem title="Files" path="/files">
              <template #icon>
                <Icon icon="system-uicons:document-list" class="link-icon" />
              </template>
            </MenuItem>
            <MenuItem title="Calendar" path="/calendar">
              <template #icon>
                <Icon icon="system-uicons:calendar-month" class="link-icon" />
              </template>
            </MenuItem>
            <MenuItem title="Statistics" path="/statistics">
              <template #icon>
                <Icon icon="system-uicons:graph-box" class="link-icon" />
              </template>
            </MenuItem> -->
          </div>
          <div class="sidebar__inner__list__item__bottom">
            <div class="about">
              <span>Collectivo v{{ pkg.version }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  @apply flex items-center justify-center text-cv-primary text-xs;
  letter-spacing: 0.24px;
}
.sidebar {
  @apply hidden md:block md:w-[100px] lg:w-[124px] rounded-xl bg-white shadow-sidebar px-3 py-5 fixed h-[calc(100vh-60px)] ml-8 overflow-y-auto;

  &__inner {
    @apply h-full;
    &__list {
      @apply h-full;
      &__item {
        @apply flex flex-col h-full;
        .link-icon {
          @apply md:h-6 lg:h-[30px] md:w-6 lg:w-[30px] text-cv-primary;
        }

        &__top {
          @apply flex-1;
        }

        &__bottom {
          .avatar-image-wrapper {
            @apply md:h-10 md:w-10 lg:h-[54px] lg:w-[54px] rounded-full overflow-hidden ml-auto mr-auto mt-6;

            .avatar-image {
              @apply object-cover h-full w-full cursor-pointer;
            }
          }
        }
      }
    }
  }
}

.router-link-exact-active {
  @apply bg-[#ECF1FD] rounded-xl;
  .item__icon {
    .link-icon {
      @apply text-cv-active;
    }
  }
}
</style>
