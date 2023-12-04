<script setup lang="ts">
const { t } = useI18n();
defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <p class="label-text">
      {{ t(label) }}
    </p>
    <UInput
      :modelValue="modelValue"
      v-on:update:modelValue="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped lang="scss">
.label-text {
  @apply mb-2 leading-4 text-cv-primary font-semibold text-sm;
}
</style>
