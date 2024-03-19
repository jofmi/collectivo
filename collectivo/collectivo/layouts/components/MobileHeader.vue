<script setup lang="ts">
import Logo from "./Logo.vue";
import ProfileMenu from "./ProfileMenu.vue";
import PageTitle from "./PageTitle.vue";
</script>

<template>
  <div class="mobile-header">
    <PageTitle />
    <ProfileMenu />
  </div>
</template>

<style lang="scss" scoped>
.mobile-header {
  @apply px-[25px] py-5 md:hidden flex items-center justify-between;
}
</style>
