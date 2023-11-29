<script setup>
const { variant, title, color, classes } = defineProps([
  "variant",
  "title",
  "color",
  "classes",
]);

const textToTag = computed(() => {
  return `<${variant} class="${color ?? ""} ${
    classes ?? ""
  }">${title}</${variant}>`;
});
</script>

<template>
  <div v-html="textToTag"></div>
</template>

<style lang="scss">
h1,
h2,
h3,
h4,
h5,
p {
  @apply text-cv-primary font-medium;
}

h1 {
  @apply font-semibold text-4xl tracking-[0.6px];
}

h2 {
  @apply font-semibold text-3xl;
}

h3 {
  @apply font-semibold text-2xl;
}

h4 {
  @apply font-semibold text-xl;
}

h5 {
  @apply font-semibold text-lg;
}

p {
  @apply text-sm font-medium;
}
</style>
