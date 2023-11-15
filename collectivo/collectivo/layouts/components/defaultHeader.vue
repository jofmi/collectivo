<template>
  <div class="flex items-center h-full font-bold px-4">
    {{ t(pageTitle) }}
  </div>
</template>

<script setup>
const pageTitle = usePageTitle();
const { t } = useI18n();
</script>
