<script setup lang="ts">
import { DateTime } from "luxon";
import { parse } from "marked";
import { createItem, readItems } from "@directus/sdk";

const props = defineProps({
  shiftOccurence: {
    type: Object as PropType<ShiftOccurrence>,
    required: true,
  },
  shiftType: {
    type: String as PropType<"jumper" | "regular">,
    required: true,
  },
});

const isOpen = defineModel("isOpen", { required: true, type: Boolean });
const { t } = useI18n();

const emit = defineEmits<{
  assignmentCreated: [assignment: ShiftsAssignment];
}>();

const directus = useDirectus();
const user = useCollectivoUser();
const shift = props.shiftOccurence.shift;
const start = props.shiftOccurence.start;
const end = props.shiftOccurence.end;
const submitLoading = ref(false);
const repeats = shift.shifts_repeats_every ?? 0;
const isWeeks = repeats % 7 === 0;
const frequency = isWeeks ? repeats / 7 : repeats;
const chosenSlot = ref<ShiftsSlot | null>(null);
user.value.load();

const possibleShiftTypes = [
  {
    label: "Regularly",
    value: "regular",
  },
];

// Check if date is 4 weeks in the future or less
if (props.shiftOccurence.start.diffNow("weeks").weeks <= 4) {
  possibleShiftTypes.push({
    label: "One-time",
    value: "jumper",
  });
}

const chosenShiftType = ref(possibleShiftTypes[0]);

const reset = () => {
  isOpen.value = false;
};

const slots = ref<ShiftsSlot[]>([]);

onMounted(async () => {
  const openSlots = props.shiftOccurence.openSlots;

  if (openSlots === 0) {
    return;
  }

  slots.value = (await directus.request(
    readItems("shifts_slots", {
      filter: { id: { _in: openSlots } },
    }),
  )) as ShiftsSlot[];
});

async function postAssignment() {
  submitLoading.value = true;

  const assignment = (await directus.request(
    createItem("shifts_assignments", {
      shifts_user: user.value.data!.id,
      shifts_slot: chosenSlot.value!,
      shifts_from: start.toISO()!,
    }),
  )) as ShiftsAssignment;

  emit("assignmentCreated", assignment);
  reset();
}
</script>

<template>
  <UModal v-model="isOpen">
    <div class="m-10">
      <h2>{{ shift.shifts_name }}</h2>

      <p
        v-if="shift.shifts_description"
        v-html="parse(shift.shifts_description)"
      ></p>

      <UFormGroup label="Slot" class="mt-5">
        <USelectMenu
          v-model="chosenSlot"
          :options="slots"
          option-value="id"
          label="Slot"
          placeholder="Choose slot"
        >
          <template #option="{ option }">
            {{ option.id }} - {{ option.shifts_name }}
          </template>

          <template #label>
            <template v-if="chosenSlot">
              Slot: {{ chosenSlot.id }} - {{ chosenSlot.shifts_name }}
            </template>
            <template v-else> Choose slot </template>
          </template>
        </USelectMenu>
      </UFormGroup>

      <UFormGroup label="Assignment type" class="my-5">
        <USelectMenu
          v-model="chosenShiftType"
          :options="possibleShiftTypes"
          option-value="value"
          option-label="label"
          label="Slot"
          placeholder="Choose shift type"
          class=""
        >
          <template #label> {{ chosenShiftType.label }} </template>
        </USelectMenu>
      </UFormGroup>

      <p class="font-bold text-lg my-5 leading-7">
        <span v-if="chosenShiftType.value === 'jumper'">
          {{ t("Sign up only for this single occurence") }}
          <br />
          {{ start.toLocaleString(DateTime.DATE_MED) }} {{ t("from") }}
          {{ start.toLocaleString(DateTime.TIME_24_SIMPLE) }} {{ t("to") }}
          {{ end.toLocaleString(DateTime.TIME_24_SIMPLE) }}
        </span>
        <span v-else>
          {{ t("Sign up for this and future occurrences") }}
          <br />
          {{ start.weekdayLong }} {{ t("from") }}
          {{ start.toLocaleString(DateTime.TIME_24_SIMPLE) }} {{ t("to") }}
          {{ end.toLocaleString(DateTime.TIME_24_SIMPLE) }}
          <br />
          {{ t("Repeating every") }}
          {{ frequency }} {{ isWeeks ? t("weeks") : t("days") }}
          <br />
          {{ t("Starting from") }}
          {{ start.toLocaleString(DateTime.DATE_MED) }}
          <!-- TODO: What if end necessary? UNTIL XY.XY.YYYY -->
        </span>
      </p>

      <UButton
        class="w-full"
        size="lg"
        icon="i-heroicons-pencil-square"
        :loading="submitLoading"
        :disabled="!chosenSlot"
        @click="postAssignment()"
      >
        {{ t("Sign up") }}
      </UButton>
    </div>
  </UModal>
</template>

<i18n lang="yaml">
de:
  "Sign up": "Verbindlich anmelden"
  from: "von"
  to: "bis"
  Repeating every: "Wiederholt sich alle"
  days: "Tage"
  weeks: "Wochen"
  "Starting from": "Beginnend am"
</i18n>
