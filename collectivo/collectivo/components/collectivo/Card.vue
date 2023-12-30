<script setup lang="ts">
defineProps(["variant", "title"]);
</script>

<template>
  <div :class="`card ${variant ?? ''}`">
    <div class="card-corner"></div>
    <p class="card__title">
      {{ title }}
    </p>
    <slot name="content"></slot>
  </div>

  <!-- TODO: Button logic -->
  <!-- <UButton
        class="mt-6 w-full"
        variant="solid"
        color="cyan"
        size="base"
      >
        Hello again!
      </UButton> -->
</template>

<style lang="scss" scoped>
.card {
  @apply h-fit w-full bg-cyan-500 rounded-[15px] relative overflow-hidden p-6;
  &__title {
    @apply mb-1 font-semibold text-lg text-primary leading-[22px];
  }

  .card-corner {
    @apply h-[70px] w-[70px] bg-[#77B3AD]/30 absolute rounded-full right-0 top-0 transform translate-x-2/4 -translate-y-2/4 mt-2 mr-2;
  }

  &.purple {
    @apply bg-purple-500;
    .card-corner {
      @apply bg-[#F4DBF8];
    }
  }

  &.orange {
    @apply bg-orange-500;
    .card-corner {
      @apply bg-[#D36D29]/[15%];
    }
  }

  &.gray {
    @apply bg-purple-500;
    .card-corner {
      @apply bg-[#4E3095]/10;
    }
  }
}
</style>
