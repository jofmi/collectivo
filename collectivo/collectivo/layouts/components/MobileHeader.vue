<script setup>
import Logo from "./Logo.vue";
</script>

<template>
  <div class="mobile-header">
    <Logo />
    <CollectivoPageTitle title="Dashboard" />
    <CollectivoNotification />
  </div>
</template>

<style lang="scss" scoped>
.mobile-header {
  @apply px-[25px] py-5 md:hidden flex items-center justify-between border-b-[1px] border-cv-purple-light mb-[25px];
}
</style>
