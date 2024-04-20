<script setup lang="ts">
import { ItemStatus } from "@collectivo/collectivo/server/utils/directusFields";
import { createItem } from "@directus/sdk";
import showShiftToast from "~/composables/toast";
import { DateTime } from "luxon";

const props = defineProps({
  shiftsSlot: {
    type: Object as PropType<ShiftsSlot>,
    required: false,
  },
});

const isOpen = defineModel("isOpen", { required: true, type: Boolean });

const emit = defineEmits<{
  assignmentCreated: [assignment: ShiftsAssignment];
}>();

const directus = useDirectus();
const user = useCollectivoUser();
user.value.load();
const formLoading = ref(false);

async function onSubmit(formData: Record<string, string>) {
  if (!user.value.data) {
    showShiftToast("User data not loaded", null, "error");
    return;
  }

  formLoading.value = true;

  formData.shifts_slot = props.shiftsSlot!.id;
  formData.shifts_user = user.value.data.id;

  directus
    .request(createItem("shifts_assignments", formData))
    .then((updatedAssignment) => {
      showShiftToast("Assignment created", "", "success");
      emit("assignmentCreated", updatedAssignment as ShiftsAssignment);
    })
    .catch((error) =>
      showShiftToast("Failed to create assignment", error, "error"),
    )
    .finally(() => {
      formLoading.value = false;
      isOpen.value = false;
    });
}

let title = "Create assignment";

if (props.shiftsSlot) {
  const shift = props.shiftsSlot.shifts_shift as ShiftsShift;
  const from = DateTime.fromISO(shift.shifts_from);
  title = `Create assignment for ${shift.shifts_name} : ${props.shiftsSlot.shifts_name}, ${from.weekdayLong}`;
}
</script>

<template>
  <UModal v-model="isOpen">
    <CollectivoCard :title="title">
      <template #content>
        <CollectivoFormBuilder
          :submit-label="formLoading ? 'Saving...' : 'Save'"
          :submit="onSubmit"
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
            {
              order: 100,
              type: 'select',
              key: 'shifts_status',
              label: 'Status',
              required: true,
              choices: Object.values(ItemStatus).map((status) => {
                return { label: status, value: status };
              }),
            },
          ]"
        />
      </template>
    </CollectivoCard>
  </UModal>
</template>
