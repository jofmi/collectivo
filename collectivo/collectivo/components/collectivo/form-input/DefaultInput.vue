<script setup>
defineProps(["level", "placeholder"]);
const value = ref("");
</script>

<template>
  <div>
    <p class="level-text">
      {{ level }}
    </p>
    <UInput v-model="value" :placeholder="placeholder" />
  </div>
</template>

<style scoped lang="scss">
.level-text {
  @apply mb-2 leading-4 text-cv-primary font-semibold text-sm;
}
</style>
