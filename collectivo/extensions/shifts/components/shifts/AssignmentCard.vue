<script setup lang="ts">
import { DateTime } from "luxon";
import {
  getAssigneeName,
  getNextOccurrence,
  isNextOccurrenceWithinAssignment,
  isShiftDurationModelActive,
} from "~/composables/shifts";
import { ItemStatus } from "@collectivo/collectivo/server/utils/directusFields";
import { getStatusColor } from "~/composables/colors";

const props = defineProps({
  shiftAssignment: {
    type: Object as PropType<ShiftsAssignment>,
    required: true,
  },
});

const from: DateTime = DateTime.fromISO(props.shiftAssignment.shifts_from);

const to = props.shiftAssignment.shifts_to
  ? DateTime.fromISO(props.shiftAssignment.shifts_to)
  : null;

const nextOccurrence = getNextOccurrence(
  props.shiftAssignment.shifts_slot.shifts_shift,
);

const shiftName = props.shiftAssignment.shifts_slot.shifts_shift.shifts_name;

let title = `${shiftName}, no coming occurrence`;

if (nextOccurrence) {
  const weekday = nextOccurrence.start.toLocaleString(
    DateTime.DATE_MED_WITH_WEEKDAY,
  );

  const fromString = nextOccurrence.start.toLocaleString(DateTime.TIME_SIMPLE);

  const toString = nextOccurrence.end.toLocaleString(DateTime.TIME_SIMPLE);

  title = `${shiftName}, ${weekday} from ${fromString} to ${toString}`;
}
</script>

<template>
  <CollectivoCard
    :title="`${title}`"
    :color="getStatusColor(shiftAssignment.shifts_status)"
  >
    <template #content>
      <p>Assignee : {{ getAssigneeName([shiftAssignment]) }}</p>
      <p>
        <span
          >Assignment currently active :
          {{ isShiftDurationModelActive(shiftAssignment) }}</span
        >
        (<span v-if="from <= DateTime.now() && !to">permanent assignment</span>
        <span v-if="from > DateTime.now() && !to"
          >permanent assignment starting from
          {{ from.toLocaleString(DateTime.DATE_SHORT) }}</span
        >
        <span v-if="from <= DateTime.now() && to"
          >assigned until {{ to.toLocaleString(DateTime.DATE_SHORT) }}</span
        >
        <span v-if="from > DateTime.now() && to"
          >assigned from {{ from.toLocaleString(DateTime.DATE_SHORT) }} to
          {{ to.toLocaleString(DateTime.DATE_SHORT) }} </span
        >)
      </p>
      <p v-if="shiftAssignment.shifts_status != ItemStatus.PUBLISHED">
        Assignment status: {{ shiftAssignment.shifts_status }}
      </p>
      <p>
        Assigned to slot : {{ props.shiftAssignment.shifts_slot.shifts_name }}
      </p>
      <UAlert
        v-if="
          isShiftDurationModelActive(shiftAssignment) &&
          !isNextOccurrenceWithinAssignment(shiftAssignment)
        "
        title="Warning"
        description="This assignment is still shown because it is still active, but the next
        occurrence of that shift is not within the assignment. You are not
        expected to work the next shift occurrence."
        icon="i-system-uicons-warning-triangle"
      />
    </template>
  </CollectivoCard>
</template>
