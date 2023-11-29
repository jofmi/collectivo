<script setup>
defineProps(["title", "value"]);
</script>

<template>
  <div class="stats-list">
    <div class="stats-list__main">
      <p class="stats-list__main__text">{{ title }}</p>
      <p class="stats-list__main__text">{{ value }}</p>
    </div>
    <CollectivoHorizontalLine color="green" />
  </div>
</template>

<style lang="scss" scoped>
.stats-list {
  @apply mt-4;
  &__main {
    @apply flex items-center justify-between mb-4;

    &__text {
      @apply text-[#8CA6A3] text-sm font-semibold leading-normal;
    }
  }
}
</style>
