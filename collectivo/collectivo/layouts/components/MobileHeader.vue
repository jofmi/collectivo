<script setup lang="ts">
import Logo from "./Logo.vue";
import PageTitle from "./PageTitle.vue";
</script>

<template>
  <div class="mobile-header">
    <PageTitle />
    <Logo hide-label />
  </div>
</template>

<style lang="scss" scoped>
.mobile-header {
  @apply px-[25px] py-5 md:hidden flex items-center justify-between;
}
</style>
