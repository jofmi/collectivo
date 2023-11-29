<script setup>
import Logo from "./Logo.vue";
import MenuItem from "./MenuItem.vue";
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__inner">
      <div class="sidebar__inner__list">
        <div class="sidebar__inner__list__item">
          <div class="sidebar__inner__list__item__top">
            <Logo />
            <MenuItem title="Dashboard" path="/">
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
            </MenuItem>
          </div>
          <div class="sidebar__inner__list__item__bottom">
            <MenuItem title="Settings" path="/settings" class="!-mb-1">
              <template #icon>
                <Icon icon="system-uicons:settings" class="link-icon" />
              </template>
            </MenuItem>
            <div class="h-[1px] bg-[#ECF1FD] w-full max-w-[72px] m-auto"></div>
            <div class="avatar-image-wrapper">
              <img
                src="@/assets/images/avatar.png"
                alt=""
                class="avatar-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
