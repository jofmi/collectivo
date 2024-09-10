<script setup lang="ts">
defineProps({
  state: Object as PropType<Record<string, unknown>>,
  input: Object as PropType<Record<string, unknown>>,
});
</script>

<template>
  <div>
    {{ state }}
  </div>
</template>
