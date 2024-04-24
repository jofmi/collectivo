<script setup lang="ts">
import { DateTime } from "luxon";
import { readItems } from "@directus/sdk";
import showShiftToast from "~/composables/toast";
import { getAssigneeName, getNextOccurrences } from "~/composables/shifts";

const props = defineProps({
  shiftsSlot: { type: Object as PropType<ShiftsSlot>, required: true },
  userId: { type: String, required: true },
  from: { type: Object as PropType<DateTime>, required: false },
  to: { type: Object as PropType<DateTime>, required: false },
});

const directus = useDirectus();
const assignments = ref<ShiftsAssignment[]>([]);

loadAssignments();

function loadAssignments() {
  directus
    .request(
      readItems("shifts_assignments", {
        filter: {
          shifts_slot: { id: { _eq: props.shiftsSlot.id } },
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

const occurrences = getNextOccurrences(
  props.shiftsSlot.shifts_shift as ShiftsShift,
  10,
);

enum OccurrenceType {
  NOT_ASSIGNED,
  ASSIGNED_TO_CURRENT_USER_FROM_ALREADY_EXISTING_ASSIGNMENT,
  ASSIGNED_TO_CURRENT_USER_FROM_NEW_ASSIGNMENT,
  ASSIGNED_TO_ANOTHER_USER,
  ASSIGNED_TO_ANOTHER_USER_INSIDE_NEW_ASSIGNMENT,
}

function getOccurrenceType(occurrence: ShiftOccurrence) {
  const activeAssignment = getActiveAssignment(
    assignments.value,
    occurrence.start,
  );

  const occurrenceIsWithinNewAssignment =
    props.from && isFromToActive(props.from, props.to, occurrence.start);

  if (activeAssignment) {
    if (activeAssignment.shifts_user.id == props.userId) {
      return OccurrenceType.ASSIGNED_TO_CURRENT_USER_FROM_ALREADY_EXISTING_ASSIGNMENT;
    }

    if (occurrenceIsWithinNewAssignment) {
      return OccurrenceType.ASSIGNED_TO_ANOTHER_USER_INSIDE_NEW_ASSIGNMENT;
    }

    return OccurrenceType.ASSIGNED_TO_ANOTHER_USER;
  } else {
    if (occurrenceIsWithinNewAssignment) {
      return OccurrenceType.ASSIGNED_TO_CURRENT_USER_FROM_NEW_ASSIGNMENT;
    }

    return OccurrenceType.NOT_ASSIGNED;
  }
}

function getOccurrenceColor(occurrence: ShiftOccurrence) {
  switch (getOccurrenceType(occurrence)) {
    case OccurrenceType.NOT_ASSIGNED:
      return "gray";
    case OccurrenceType.ASSIGNED_TO_CURRENT_USER_FROM_ALREADY_EXISTING_ASSIGNMENT:
      return "blue";
    case OccurrenceType.ASSIGNED_TO_ANOTHER_USER:
      return "gray";
    case OccurrenceType.ASSIGNED_TO_CURRENT_USER_FROM_NEW_ASSIGNMENT:
      return "green";
    case OccurrenceType.ASSIGNED_TO_ANOTHER_USER_INSIDE_NEW_ASSIGNMENT:
      return "red";
  }
}

function getOccurrenceText(occurrence: ShiftOccurrence) {
  switch (getOccurrenceType(occurrence)) {
    case OccurrenceType.NOT_ASSIGNED:
      return "Not assigned";
    case OccurrenceType.ASSIGNED_TO_CURRENT_USER_FROM_ALREADY_EXISTING_ASSIGNMENT:
      return "Already assigned to you";
    case OccurrenceType.ASSIGNED_TO_ANOTHER_USER:
      return (
        "Assigned to " + getAssigneeName(assignments.value, occurrence.start)
      );
    case OccurrenceType.ASSIGNED_TO_CURRENT_USER_FROM_NEW_ASSIGNMENT:
      return "Would be assigned to you";
    case OccurrenceType.ASSIGNED_TO_ANOTHER_USER_INSIDE_NEW_ASSIGNMENT:
      return (
        "Assigned to " +
        getActiveAssignment(assignments.value, occurrence.start) +
        ". You can still create a new assignment at those dates, but it will not include this occurrence."
      );
  }
}
</script>

<template>
  <ul>
    <li v-for="occurrence in occurrences" :key="occurrence.start.toMillis()">
      <CollectivoCard
        :title="occurrence.start.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)"
        :color="getOccurrenceColor(occurrence)"
      >
        <template #content>
          {{ getOccurrenceText(occurrence) }}
        </template>
      </CollectivoCard>
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
