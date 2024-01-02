<script setup lang="ts">
const pageTitle = useCollectivoTitle();
const { t } = useI18n();
</script>

<template>
  <div>
    <h1>
      {{ t(pageTitle) }}
    </h1>
  </div>
</template>
