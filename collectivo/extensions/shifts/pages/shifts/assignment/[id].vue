<script setup lang="ts">
import { readItem, updateItem } from "@directus/sdk";
import { DateTime } from "luxon";
import showShiftToast from "~/composables/toast";
import { ItemStatus } from "@collectivo/collectivo/server/utils/directusFields";

const route = useRoute();
const directus = useDirectus();
const assignment = ref<ShiftsAssignment>();
const occurrencesWithinAssignment = ref<ShiftOccurrence[]>([]);
const formOpen = ref(false);
const formLoading = ref(false);

loadAssignment();

function loadAssignment() {
  directus
    .request(
      readItem("shifts_assignments", route.params.id as string, {
        fields: [
          "*",
          { shifts_user: ["first_name", "last_name"] },
          {
            shifts_slot: [
              "*",
              {
                shifts_shift: [
                  "*",
                  {
                    shifts_slots: [
                      "*",
                      {
                        shifts_assignments: [
                          "*",
                          { shifts_user: ["first_name", "last_name"] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    )
    .then((item) => {
      assignment.value = item as ShiftsAssignment;
      setOccurrences();
      setTitle();
    })
    .catch((error) =>
      showShiftToast("Assignment data could not be loaded", error, "error"),
    );
}

function setOccurrences() {
  if (!assignment.value) return;

  occurrencesWithinAssignment.value = getNextOccurrences(
    (assignment.value.shifts_slot as ShiftsSlot).shifts_shift as ShiftsShift,
    5,
    DateTime.max(
      DateTime.now(),
      DateTime.fromISO(assignment.value.shifts_from),
    ),
    assignment.value.shifts_to
      ? DateTime.fromISO(assignment.value.shifts_to)
      : undefined,
  );
}

function setTitle() {
  if (!assignment.value) return;

  setCollectivoTitle(
    assignment.value.shifts_user.first_name +
      " " +
      assignment.value.shifts_user.last_name +
      " on " +
      ((assignment.value.shifts_slot as ShiftsSlot).shifts_shift as ShiftsShift)
        .shifts_name,
  );
}

async function onSubmit(formData: Record<string, never>) {
  formLoading.value = true;

  directus
    .request(
      updateItem("shifts_assignments", route.params.id as string, formData),
    )
    .then(() => {
      loadAssignment();
      showShiftToast("Assignment updated", "", "success");
    })
    .catch((error) =>
      showShiftToast("Failed to update assignment", error, "error"),
    )
    .finally(() => {
      formLoading.value = false;
    });
}
</script>

<template>
  <CollectivoContainer>
    <h1>Assignment</h1>
    <span v-if="!assignment">Loading...</span>
    <ShiftsAssignmentCard v-if="assignment" :shift-assignment="assignment" />
    <UButton
      :label="formOpen ? 'Cancel edit' : 'Edit'"
      :icon="formOpen ? 'i-heroicons-x-mark' : 'i-heroicons-pencil'"
      @click="formOpen = !formOpen"
    />
  </CollectivoContainer>
  <CollectivoContainer v-if="formOpen && assignment">
    <h1>Edit assignment</h1>
    <CollectivoFormBuilder
      :submit-label="formLoading ? 'Saving...' : 'Save'"
      :submit="onSubmit"
      :data="assignment"
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
  </CollectivoContainer>
  <CollectivoContainer>
    <h1>Upcoming occurrences within this assignment</h1>
    <ShiftsOccurrenceCard
      v-for="occurrence of occurrencesWithinAssignment"
      :key="occurrence.start.toMillis()"
      :shift-occurrence="occurrence"
    />
  </CollectivoContainer>
</template>
