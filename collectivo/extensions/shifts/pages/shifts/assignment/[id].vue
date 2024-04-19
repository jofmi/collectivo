<script setup lang="ts">
import { readItem } from "@directus/sdk";
import { DateTime } from "luxon";
import showShiftToast from "~/composables/toast";

const route = useRoute();
const directus = useDirectus();
const assignment = ref<ShiftsAssignment>();
const occurrencesWithinAssignment = ref<ShiftOccurrence[]>([]);

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

      occurrencesWithinAssignment.value = getNextOccurrences(
        (assignment.value.shifts_slot as ShiftsSlot)
          .shifts_shift as ShiftsShift,
        5,
        DateTime.max(
          DateTime.now(),
          DateTime.fromISO(assignment.value.shifts_from),
        ),
        assignment.value.shifts_to
          ? DateTime.fromISO(assignment.value.shifts_to)
          : undefined,
      );

      setCollectivoTitle(
        assignment.value.shifts_user.first_name +
          " " +
          assignment.value.shifts_user.last_name +
          " on " +
          (
            (assignment.value.shifts_slot as ShiftsSlot)
              .shifts_shift as ShiftsShift
          ).shifts_name,
      );
    })
    .catch((error) =>
      showShiftToast("Assignment data could not be loaded", error),
    );
}
</script>

<template>
  <CollectivoContainer>
    <h1>Assignment</h1>
    <span v-if="!assignment">Loading...</span>
    <ShiftsAssignmentCard v-if="assignment" :shift-assignment="assignment" />
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
