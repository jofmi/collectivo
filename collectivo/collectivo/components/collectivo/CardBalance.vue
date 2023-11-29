<script setup>
defineProps(["value", "color"]);
</script>

<template>
  <h3 :class="`balance ${color ?? ''}`">{{ value }}</h3>
</template>

<style lang="scss" scoped>
.balance {
  @apply text-2xl font-semibold tracking-[0.6px] text-cv-purple;

  &.brown {
    @apply text-cv-orange;
  }

  &.purple {
    @apply text-cv-purple;
  }
}
</style>
