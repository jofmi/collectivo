<script setup>
defineProps(["variant", "title"]);
</script>

<template>
  <button :class="`button ${variant ?? ''}`">
    {{ title }}
  </button>
</template>

<style lang="scss" scoped>
.button {
  &:hover {
    @apply bg-cv-cyan/80;
  }
}
</style>
