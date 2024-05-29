<script setup lang="ts">
import { DateTime } from "luxon";
import { parse } from "marked";
import { createItem } from "@directus/sdk";

const props = defineProps({
  shiftOccurence: {
    type: Object as PropType<ShiftOccurrence>,
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

const reset = () => {
  isOpen.value = false;
};

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

      <p class="font-bold text-lg my-5 leading-7">
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
      </p>

      <p
        v-if="shift.shifts_description"
        v-html="parse(shift.shifts_description)"
      ></p>

      <USelect
        v-model="chosenSlot"
        :options="shift.shifts_slots"
        option-value="id"
        option-label="shifts_name"
        label="Slot"
        placeholder="Choose slot"
        class="mt-5"
      >
      </USelect>

      <UButton
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
