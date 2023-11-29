<script setup>
defineProps(["level", "placeholder", "resize"]);
const value = ref("");
</script>

<template>
  <div>
    <p class="level-text">
      {{ level }}
    </p>
    <UTextarea :resize="resize" variant="outline" :placeholder="placeholder" />
  </div>
</template>

<style scoped lang="scss">
.level-text {
  @apply mb-2 leading-4 text-cv-primary font-semibold text-sm;
}
</style>
