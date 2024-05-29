<script setup lang="ts">
import { DateTime } from "luxon";
import { parse } from "marked";

const { t } = useI18n();

const props = defineProps({
  shiftAssignment: {
    type: Object as PropType<ShiftsAssignmentRRule>,
    required: true,
  },
});

// This is the next occurence of the assignment, not the shift itself!
const nextOccurrence = props.shiftAssignment.nextOccurrence;
const assignment = props.shiftAssignment.assignment as ShiftsAssignment;
const absences = props.shiftAssignment.absences as ShiftsAbsence[];
const slot = assignment.shifts_slot as ShiftsSlot;
const shift = slot.shifts_shift as ShiftsShift;

function getTimeString(occurence: Date) {
  const occ = DateTime.fromJSDate(occurence);

  const weekday = occ.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

  const startTime = occ.toLocaleString(DateTime.TIME_SIMPLE);

  const endTime = occ
    .plus({ minute: shift.shifts_duration })
    .toLocaleString(DateTime.TIME_SIMPLE);

  return `${weekday} ${t("from")} ${startTime} ${t("to")} ${endTime}`;
}

function getEndDate(endDate: string) {
  return DateTime.fromISO(endDate).toLocaleString(DateTime.DATE_MED);
}
</script>

<template>
  <CollectivoCard v-if="nextOccurrence" :title="getTimeString(nextOccurrence)">
    <template #content>
      <div>
        <!-- Repetition info -->
        <p v-if="shift.shifts_repeats_every">
          {{ t("Shift repeats every") }} {{ shift.shifts_repeats_every }}
          {{ t("days") }}

          <span v-if="assignment.shifts_to">
            {{ t("until") }} {{ getEndDate(assignment.shifts_to) }}
          </span>
        </p>

        <!-- Absences -->
        <p v-if="absences.length > 0" class="mt-2">
          {{ t("Absences") }}:

          <span v-for="absence in absences" :key="absence.id" class="block">
            {{ absence.shifts_from }} - {{ absence.shifts_to }}
          </span>
        </p>

        <!-- Shift name -->
        <p class="mt-2">
          <span v-if="slot.shifts_name">{{ shift.shifts_name }}</span>
          <span v-if="slot.shifts_name && slot.shifts_name"> - </span>
          <span v-if="slot.shifts_name">{{ slot.shifts_name }}</span>
        </p>

        <!-- Shift infos -->
        <p
          v-if="shift.shifts_description"
          v-html="parse(shift.shifts_description)"
        ></p>

        {{ shiftAssignment.rrule.all() }}
        <!-- Space for buttons
        <div class="flex flex-wrap gap-3 pt-4">
        </div> -->
      </div>
    </template>
  </CollectivoCard>
</template>

<i18n lang="yaml">
de:
  "until": "bis"
  "Shift repeats every": "Schicht wiederholt sich alle"
  "days": "Tage"
  "from": "von"
  "to": "bis"
  "Absences": "Abwesenheiten"
</i18n>
