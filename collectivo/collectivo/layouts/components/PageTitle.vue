<script setup lang="ts">
const pageTitle = usePageTitle();
const { t } = useI18n();
</script>

<template>
  <div>
    <h1 class="text-cv-primary font-semibold text-3xl">
      {{ t(pageTitle) }}
    </h1>
  </div>
</template>
