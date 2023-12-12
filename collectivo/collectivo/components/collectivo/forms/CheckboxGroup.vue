<script setup lang="ts">
const { t } = useI18n();

interface Choice {
  key: string;
  value: string;
}

const props = defineProps({
  modelValue: Array as PropType<string[]>,
  choices: Array as PropType<Choice[]>,
});

const emit = defineEmits(["update:modelValue"]);

const choice_values: Ref<{ [key: string]: boolean | undefined }> = ref({});

for (const choice of props.choices ?? []) {
  choice_values.value[choice.key] = false;
}

// Emit if any choice_values changes
watch(
  choice_values,
  () => {
    const values: string[] = [];

    for (const [key, value] of Object.entries(choice_values.value)) {
      if (value) {
        values.push(key);
      }
    }

    emit("update:modelValue", values);
  },
  { deep: true },
);
</script>

<template>
  <div>
    <UCheckbox
      v-for="choice in choices"
      :key="choice.key"
      v-model="choice_values[choice.key]"
      :label="choice.value"
    />
  </div>
</template>

<style scoped lang="scss"></style>
