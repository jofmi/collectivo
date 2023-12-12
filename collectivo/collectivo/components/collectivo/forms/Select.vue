<script setup lang="ts">
const { t } = useI18n();

const props = defineProps({
  modelValue: String,
  label: String,
  disabled: Boolean,
  placeholder: String,
  options: Array as PropType<
    {
      key: string;
      value: string | number | boolean;
    }[]
  >,
});

const emit = defineEmits(["update:modelValue"]);

if (props.modelValue === undefined) {
  emit("update:modelValue", "");
}
</script>

<template>
  <div>
    <p class="label-text">
      {{ t(label!) }}
    </p>
    <URadioGroup
      :model-value="modelValue"
      :disabled="disabled"
      :options="options"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.label-text {
  @apply mb-2 leading-4 text-cv-primary font-semibold text-sm;
}
</style>
