<script setup lang="ts">
import { readItem, readItems } from "@directus/sdk";
import { DateTime } from "luxon";
import { getNextOccurrences } from "~/composables/shifts";
import showShiftToast from "~/composables/toast";

const route = useRoute();
const directus = useDirectus();
const user = useCollectivoUser();
user.value.load();
const shift = ref<ShiftsShift>();
const nextOccurrences: Ref<ShiftOccurrence[]> = ref([]);
const shift_start = ref<DateTime>();
const shift_end = ref<DateTime>();
const skillNames = ref<Map<string, string>>();

loadShift();

function loadShift() {
  directus
    .request(
      readItem("shifts_shifts", route.params.id as string, {
        fields: [
          "*",
          {
            shifts_slots: ["*", { shifts_skills: ["*"] }],
          },
        ],
      }),
    )
    .then((item) => {
      shift.value = item as ShiftsShift;
      getSlotSkillNames(shift.value.shifts_slots);
    })
    .catch((error) => showShiftToast("Shift data could not be loaded", error));
}

function getSlotSkillNames(slots: ShiftsSlot[]) {
  const skillIds = [];

  for (const slot of slots) {
    for (const link of slot.shifts_skills) {
      skillIds.push(link.shifts_skills_id);
    }
  }

  directus
    .request(
      readItems("shifts_skills", {
        filter: {
          id: {
            _in: skillIds,
          },
        },
        fields: ["id", "shifts_name"],
      }),
    )
    .then((skills) => {
      skillNames.value = new Map<string, string>();

      for (const skill of skills) {
        skillNames.value.set(skill.id, skill.shifts_name);
      }
    })
    .catch((error) => {
      showShiftToast("Failed to load skill names", error);
    });
}

watch(shift, () => {
  if (!shift.value) return;
  setDetails(shift.value);
});

function setDetails(shift: ShiftsShift) {
  shift_start.value = DateTime.fromISO(shift.shifts_from);

  shift_end.value = shift_start.value.plus({
    minutes: shift.shifts_duration,
  });

  setCollectivoTitle(
    shift.shifts_name +
      ", " +
      shift_start.value.toLocaleString({ weekday: "long" }) +
      " from " +
      shift_start.value.toLocaleString(DateTime.TIME_SIMPLE) +
      " to " +
      shift_end.value.toLocaleString(DateTime.TIME_SIMPLE),
  );

  nextOccurrences.value = getNextOccurrences(shift, 5);
}
</script>

<template>
  <CollectivoContainer>
    <h1>Details</h1>
    <ul v-if="shift">
      <li>Is currently active : {{ isShiftDurationModelActive(shift) }}</li>
      <li v-if="shift_start">
        Started on: {{ shift_start.toLocaleString(DateTime.DATE_SHORT) }}
      </li>
      <li>
        Ends on :
        <span v-if="shift.shifts_to">{{
          DateTime.fromISO(shift.shifts_to)
        }}</span>
        <span v-else>never</span>
      </li>
    </ul>
  </CollectivoContainer>

  <CollectivoContainer>
    <h1>Slots</h1>
    <ul v-if="shift">
      <li v-for="(slot, index) in shift.shifts_slots" :key="slot.id">
        {{ slot.shifts_name }}
        <span v-if="skillNames && slot.shifts_skills.length > 0">
          (required skills:
          <span v-for="link in slot.shifts_skills" :key="link.id"
            ><span v-if="index > 0">, </span>
            {{ skillNames.get(link.shifts_skills_id!) }} </span
          >)
        </span>
      </li>
    </ul>
    <span v-else>Loading...</span>
  </CollectivoContainer>

  <ShiftsAssignmentList
    v-if="shift && user.data"
    :shift="shift"
    :user="user.data"
  />

  <CollectivoContainer>
    <h1>Future occurrences</h1>
    <p v-if="nextOccurrences.length == 0">
      There are no occurrences of this shift in the future.
    </p>
    <ShiftsOccurrenceCard
      v-for="(occurrence, i) in nextOccurrences"
      :key="i"
      :shift-occurrence="occurrence"
    >
    </ShiftsOccurrenceCard>
  </CollectivoContainer>
</template>
