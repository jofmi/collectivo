<script setup lang="ts">
const { t } = useI18n();

interface Choice {
  label: string;
  value: string;
}

const props = defineProps({
  modelValue: Array as PropType<string[]>,
  choices: Array as PropType<Choice[]>,
});

const emit = defineEmits(["update:modelValue"]);

const choice_values: Ref<{ [key: string]: boolean | undefined }> = ref({});

for (const choice of props.choices ?? []) {
  choice_values.value[choice.value] = false;
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
  { deep: true }
);
</script>

<template>
  <div class="bg-blue-50 shadow-sm rounded-lg px-4 py-3 flex flex-col gap-1">
    <UCheckbox
      v-for="choice in choices"
      :key="choice.value"
      v-model="choice_values[choice.value]"
      :label="choice.label"
    />
  </div>
</template>

<style scoped lang="scss"></style>
