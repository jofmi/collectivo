<script setup lang="ts">
import { DateTime } from "luxon";
import { getStatusColor } from "~/composables/colors";
import { getNextAssignmentOccurence } from "~/composables/assignments";

const { t } = useI18n();

const props = defineProps({
  shiftAssignment: {
    type: Object as PropType<ShiftsAssignment>,
    required: true,
  },
});

// This is the next occurence of the assignment, not the shift itself!
const nextOccurrence = getNextAssignmentOccurence(props.shiftAssignment);

const { shiftAssignment } = toRefs(props);

const assignment = props.shiftAssignment as ShiftsAssignment;
const slot = props.shiftAssignment.shifts_slot as ShiftsSlot;
const shift = slot.shifts_shift as ShiftsShift;

const from = ref<DateTime>(DateTime.fromISO(shiftAssignment.value.shifts_from));
const to = ref<DateTime>();

updateDates();
watch(shiftAssignment, updateDates);

function updateDates() {
  from.value = DateTime.fromISO(shiftAssignment.value.shifts_from);

  to.value = shiftAssignment.value.shifts_to
    ? DateTime.fromISO(shiftAssignment.value.shifts_to)
    : undefined;
}

function getTimeString(occurence: Date) {
  const occ = DateTime.fromJSDate(occurence);

  const weekday = occ.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

  const startTime = occ.toLocaleString(DateTime.TIME_SIMPLE);

  const endTime = occ
    .plus({ minute: shift.shifts_duration })
    .toLocaleString(DateTime.TIME_SIMPLE);

  return `${weekday} from ${startTime} to ${endTime}`;
}

function getEndDate(endDate: string) {
  return DateTime.fromISO(endDate).toLocaleString(DateTime.DATE_MED);
}

const assignmentUrl = "/shifts/assignment/" + props.shiftAssignment.id;
</script>

<template>
  <CollectivoCard
    v-if="nextOccurrence"
    :title="getTimeString(nextOccurrence)"
    :color="getStatusColor(assignment.shifts_status)"
  >
    <template #content>
      <div>
        <!-- Shift name -->
        <p>
          {{ shift.shifts_name }}
          <span v-if="slot.shifts_name">- {{ slot.shifts_name }}</span>
        </p>

        <!-- Repetition info -->
        <p v-if="shift.shifts_repeats_every">
          Shift repeats every {{ shift.shifts_repeats_every }} days

          <span v-if="assignment.shifts_to">
            until {{ getEndDate(assignment.shifts_to) }}
          </span>
        </p>

        <div class="flex flex-wrap gap-3 pt-4">
          <a href="mailto:mitmachen@mila.wien">
            <UButton
              :label="t('Request change')"
              :icon="'i-heroicons-chat-bubble-oval-left-ellipsis'"
            />
          </a>
        </div>
      </div>
    </template>
  </CollectivoCard>
</template>
