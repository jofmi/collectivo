<script setup lang="ts">
import { createItem } from "@directus/sdk";
import showShiftToast from "~/composables/toast";
import { DateTime } from "luxon";
import { ItemStatus } from "@collectivo/collectivo/server/utils/directusFields";
import OccurrencesPreview from "~/components/shifts/Assignment/OccurrencesPreview.vue";

const props = defineProps({
  shiftsSlot: {
    type: Object as PropType<ShiftsSlot>,
    required: true,
  },
});

const { shiftsSlot } = toRefs(props);

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
  formData.shifts_status = ItemStatus.PUBLISHED;

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
updateTitle();
watch(shiftsSlot, updateTitle);

function updateTitle() {
  if (!shiftsSlot.value) return;
  const shift = shiftsSlot.value.shifts_shift as ShiftsShift;
  const from = DateTime.fromISO(shift.shifts_from);
  title = `Create assignment for ${shift.shifts_name} : ${props.shiftsSlot.shifts_name}, ${from.weekdayLong}`;
}
</script>

<template>
  <UModal v-model="isOpen">
    <CollectivoCard :title="title">
      <template #content>
        <ShiftsAssignmentForm :loading="formLoading" :submit="onSubmit" />
        <UDivider label="Upcoming occurrences" />
        <OccurrencesPreview
          :user-id="user.data!.id"
          :shifts-slot="shiftsSlot"
        />
      </template>
    </CollectivoCard>
  </UModal>
</template>
