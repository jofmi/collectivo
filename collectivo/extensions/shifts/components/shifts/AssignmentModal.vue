<script setup lang="ts">
const props = defineProps({
  shiftOccurence: {
    type: Object as PropType<ShiftOccurrence>,
    required: true,
  },
});

const isOpen = defineModel("isOpen", { required: true, type: Boolean });

const emit = defineEmits<{
  assignmentCreated: [assignment: ShiftsAssignment];
}>();

const directus = useDirectus();
const user = useCollectivoUser();
user.value.load();

const reset = () => {
  isOpen.value = false;
};
</script>

<template>
  <UModal v-model="isOpen" @close="reset">
    <div class="m-10">
      <h2>Sign up for a shift</h2>
      <p>{{ shiftOccurence }}</p>
    </div>
  </UModal>
</template>
