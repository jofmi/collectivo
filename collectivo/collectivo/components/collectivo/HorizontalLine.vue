<script setup>
defineProps(["color"]);
</script>

<template>
  <div :class="`line ${color ?? ''}`"></div>
</template>

<style lang="scss" scoped>
.line {
  @apply h-[0.5px] w-full bg-[#77B3AD]/20;

  &.green {
    @apply bg-[#77B3AD]/20;
  }

  &.pink {
    @apply bg-[#ECC9F1]/50;
  }

  &.brown {
    @apply bg-[#E2D0BB]/40;
  }
}
</style>
