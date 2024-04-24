<script setup lang="ts">
defineProps({
  loading: { type: Boolean, required: true },
  submit: {
    type: Function as PropType<(data: any) => Promise<void>>,
    required: true,
  },
  data: { type: Object as PropType<ShiftsAssignment>, required: false },
});
</script>

<template>
  <CollectivoFormBuilder
    :submit-label="loading ? 'Saving...' : 'Save'"
    :submit="submit"
    :data="data"
    :fields="[
      {
        order: 110,
        type: 'date',
        key: 'shifts_from',
        label: 'From',
        required: true,
        useDatePicker: true,
      },
      {
        order: 120,
        type: 'date',
        key: 'shifts_to',
        label: 'To',
        required: false,
        useDatePicker: true,
      },
    ]"
  />
</template>

<style scoped lang="scss"></style>
