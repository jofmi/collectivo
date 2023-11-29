<script setup>
defineProps(["title", "description"]);
</script>

<template>
  <div class="dropdown-item">
    <p class="dropdown-item__title">{{ title }}</p>
    <p class="dropdown-item__description">{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-item {
  @apply text-left;
  &__title {
    @apply font-semibold text-sm text-cv-primary;
  }

  &__description {
    @apply font-semibold text-xs line-clamp-3 text-cv-primary/60;
  }
}
</style>
