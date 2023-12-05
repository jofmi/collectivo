<script setup lang="ts">
const { t } = useI18n();

defineProps({
  modelValue: String,
  label: String,
  disabled: Boolean,
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
      :model-value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.label-text {
  @apply mb-2 leading-4 text-cv-primary font-semibold text-sm;
}
</style>
