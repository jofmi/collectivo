<template>
  <div class="cv-container">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.cv-container {
  @apply rounded-xl p-[25px] mb-5 bg-white;
  box-shadow: 0px 6px 48px 0px rgba(220, 226, 239, 0.5);
}
</style>
