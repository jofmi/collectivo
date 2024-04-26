<script setup lang="ts">
import { createItem, readItems } from "@directus/sdk";
import showShiftToast from "~/composables/toast";
import { DateTime } from "luxon";
import { ItemStatus } from "@collectivo/collectivo/server/utils/directusFields";
import OccurrencesPreview from "~/components/shifts/Assignment/OccurrencesPreview.vue";
import { getNextOccurrences } from "~/composables/shifts";
import { getOccurrenceType, OccurrenceType } from "~/composables/occurrences";

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
const loading = ref(false);
const from = ref<DateTime>();
const to = ref<DateTime>();
const showForm = ref(true);
const assignments = ref<ShiftsAssignment[]>([]);

loadAssignments();
watch(shiftsSlot, loadAssignments);

function loadAssignments() {
  directus
    .request(
      readItems("shifts_assignments", {
        filter: {
          shifts_slot: { id: { _eq: shiftsSlot.value.id } },
        },
        fields: [
          "*",
          { shifts_slot: ["*", { shifts_shift: ["*"] }] },
          { shifts_user: ["*"] },
        ],
      }),
    )
    .then((items) => {
      assignments.value = items as ShiftsAssignment[];
    })
    .catch((error) =>
      showShiftToast("Failed to load assignments", error, "error"),
    );
}

async function onCheck(formData: Record<string, unknown>) {
  from.value = DateTime.fromJSDate(<Date>formData.from);

  to.value = formData.to ? DateTime.fromJSDate(<Date>formData.to) : undefined;

  showForm.value = false;
}

async function onCreate() {
  if (!user.value.data) {
    showShiftToast("User data not loaded", null, "error");
    return;
  }

  loading.value = true;

  const assignment: ShiftsAssignment = {
    shifts_slot: shiftsSlot.value.id,
    shifts_user: user.value.data.id,
    shifts_status: ItemStatus.PUBLISHED,
    shifts_from: from.value!.toISODate()!,
    shifts_to: to.value?.toISODate() ?? undefined,
  };

  directus
    .request(createItem("shifts_assignments", assignment))
    .then((updatedAssignment) => {
      showShiftToast("Assignment created", "", "success");
      emit("assignmentCreated", updatedAssignment as ShiftsAssignment);
    })
    .catch((error) =>
      showShiftToast("Failed to create assignment", error, "error"),
    )
    .finally(() => {
      loading.value = false;
      isOpen.value = false;
      reset();
    });
}

let title = "Create assignment";
updateTitle();
watch(shiftsSlot, updateTitle);

function updateTitle() {
  if (!shiftsSlot.value) return;
  const shift = shiftsSlot.value.shifts_shift as ShiftsShift;
  const from = DateTime.fromISO(shift.shifts_from);
  title = `Create assignment for ${shift.shifts_name} : ${shiftsSlot.value.shifts_name}, ${from.weekdayLong}`;
}

function reset() {
  from.value = undefined;
  to.value = undefined;
  showForm.value = true;
}

function confirmButtonEnabled() {
  if (!user.value.data) return false;

  const occurrences = getNextOccurrences(
    props.shiftsSlot.shifts_shift as ShiftsShift,
    10,
  );

  for (const occurrence of occurrences) {
    if (
      getOccurrenceType(
        occurrence,
        assignments.value,
        user.value.data.id,
        from.value,
        to.value,
      ) == OccurrenceType.ASSIGNED_TO_CURRENT_USER_FROM_NEW_ASSIGNMENT
    )
      return true;
  }

  return false;
}
</script>

<template>
  <UModal v-model="isOpen" @close="reset">
    <CollectivoCard :title="title">
      <template #content>
        <ShiftsAssignmentForm
          v-if="showForm"
          :loading="loading"
          :submit="onCheck"
          :from="from"
          :to="to"
        />
        <div v-if="!showForm">
          <UDivider label="Confirm" />
          <p>From: {{ from ? formatDate(from) : "" }}</p>
          <p>To : {{ to ? formatDate(to) : "permanent" }}</p>
          <UTooltip :prevent="confirmButtonEnabled()">
            <template #text>
              The date interval you specified does not include any new shift
              occurrence.
            </template>
            <UButton
              label="Confirm"
              icon="i-heroicons-check"
              :loading="loading"
              :disabled="!confirmButtonEnabled()"
              @click="onCreate"
            />
          </UTooltip>
          <UButton
            label="Change"
            icon="i-heroicons-pencil"
            :loading="loading"
            @click="
              () => {
                showForm = true;
              }
            "
          />
        </div>
        <UDivider label="Upcoming occurrences" />
        <OccurrencesPreview
          :user-id="user.data!.id"
          :shifts-slot="shiftsSlot"
          :assignments="assignments"
          :from="from"
          :to="to"
        />
      </template>
    </CollectivoCard>
  </UModal>
</template>
