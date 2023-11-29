<script setup>
defineProps(["title", "color"]);
</script>

<template>
  <span :class="`badge ${color ?? ''}`">
    {{ title }}
  </span>
</template>

<style lang="scss" scoped>
.badge {
  @apply px-3 py-2 bg-white rounded-2xl text-cv-gray font-medium text-xs leading-[14px];
}
</style>
