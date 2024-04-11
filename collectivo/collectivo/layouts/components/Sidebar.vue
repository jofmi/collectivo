<script setup lang="ts">
import Logo from "./Logo.vue";
import MenuItem from "./MenuItem.vue";
import pkg from "../../package.json";

const menus = useCollectivoMenus();
const user = useCollectivoUser();
const sidebarWidth = "124" + "px";

const mainMenuItems = Object.values(menus.value.main).sort(
  (a, b) => (a.order ?? 100) - (b.order ?? 100),
);

const publicMenuItems = Object.values(menus.value.main_public).sort(
  (a, b) => (a.order ?? 100) - (b.order ?? 100),
);
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__above"></div>
    <div class="sidebar__main">
      <div class="sidebar__main__top">
        <Logo />
      </div>
      <div class="sidebar__main__middle">
        <div
          v-for="(item, i) in user.isAuthenticated
            ? mainMenuItems
            : publicMenuItems"
          :key="i"
        >
          <MenuItem
            v-if="user.isAuthenticated || !user.isAuthenticated"
            :item="item"
          />
        </div>
      </div>
      <div class="sidebar__main__bottom">
        <div class="about">
          <span>Collectivo v{{ pkg.version }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  @apply flex items-center justify-center text-xs;
  letter-spacing: 0.24px;
}
.sidebar {
  width: v-bind("sidebarWidth");
  @apply hidden md:flex flex-col fixed h-[calc(100vh-60px)] ml-8;

  &__main {
    @apply h-full flex flex-col bg-white shadow-sidebar overflow-y-auto px-3 py-4 rounded-xl;

    &__top {
      @apply flex justify-center items-center mb-4;
    }

    &__middle {
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
</style>
