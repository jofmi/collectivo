<script setup lang="ts">
import { updateItem } from "@directus/sdk";
import showShiftToast from "~/composables/toast";

const props = defineProps({
  assignment: {
    type: Object as PropType<ShiftsAssignment>,
    required: true,
  },
});

const isOpen = defineModel("isOpen", { required: true, type: Boolean });

const emit = defineEmits<{
  assignmentUpdated: [assignment: ShiftsAssignment];
}>();

const directus = useDirectus();
const formLoading = ref(false);

async function onSubmit(formData: Record<string, never>) {
  formLoading.value = true;

  directus
    .request(updateItem("shifts_assignments", props.assignment.id, formData))
    .then((updatedAssignment) => {
      showShiftToast("Assignment updated", "", "success");
      emit("assignmentUpdated", updatedAssignment as ShiftsAssignment);
    })
    .catch((error) =>
      showShiftToast("Failed to update assignment", error, "error"),
    )
    .finally(() => {
      formLoading.value = false;
      isOpen.value = false;
    });
}
</script>

<template>
  <UModal v-model="isOpen">
    <CollectivoCard title="Update assignment">
      <template #content>
        <ShiftsAssignmentForm
          :loading="formLoading"
          :submit="onSubmit"
          :data="assignment"
        />
      </template>
    </CollectivoCard>
  </UModal>
</template>
