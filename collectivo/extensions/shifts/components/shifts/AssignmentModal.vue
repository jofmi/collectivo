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
    default: "regular",
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

user.value.load();

const reset = () => {
  isOpen.value = false;
};

interface SlotContainer {
  slot: ShiftsSlot;
  freeUntil: Date;
  id: number;
  occurences: Date[];
  possibleShiftTypes: { label: string; value: string }[];
}

const slots = ref<SlotContainer[]>([]);

const chosenSlot = ref<SlotContainer | null>(null);

onMounted(async () => {
  const openSlots = props.shiftOccurence.openSlots;

  if (openSlots === 0) {
    return;
  }

  const slotsRes = (await directus.request(
    readItems("shifts_slots", {
      filter: { id: { _in: openSlots } },
    }),
  )) as ShiftsSlot[];

  for (const slot of slotsRes) {
    const nearestFutureAssignment = (
      await directus.request(
        readItems("shifts_assignments", {
          filter: {
            shifts_user: user.value.data!.id,
            shifts_slot: { _eq: slot.id },
            shifts_from: { _gte: DateTime.now().toISO() },
          },
          sort: "-shifts_from",
          limit: 1,
        }),
      )
    )[0] as ShiftsAssignment;

    const freeUntil = nearestFutureAssignment
      ? DateTime.fromISO(
          nearestFutureAssignment.shifts_from + "T00:00:00.000Z",
        ).minus({
          days: 1,
        })
      : null;

    const occurences = props.shiftOccurence.shiftRule.between(
      start.startOf("day").toJSDate(),
      freeUntil ? freeUntil.toJSDate() : start.startOf("day").toJSDate(),
      true,
    );

    const regularShiftType = [];

    if (!freeUntil || occurences.length > 1) {
      regularShiftType.push({
        label: "Regular",
        value: "regular",
      });
    }

    slots.value.push({
      id: slot.id,
      slot,
      freeUntil: freeUntil,
      occurences: occurences,
    });
  }
});

async function postAssignment() {
  submitLoading.value = true;

  const payload = {
    shifts_user: user.value.data!.id,
    shifts_slot: chosenSlot.value!,
    shifts_from: start.toISO()!,
  };

  if (chosenSlot.value.freeUntil) {
    payload.shifts_to = chosenSlot.value.freeUntil.toISO()!;
  }

  const assignment = (await directus.request(
    createItem("shifts_assignments", payload),
  )) as ShiftsAssignment;

  emit("assignmentCreated", assignment);
  reset();
}
</script>

<template>
  <UModal v-model="isOpen">
    <div class="m-10">
      <h2>{{ shift.shifts_name }}</h2>

      <p v-if="shiftType" class="font-bold text-lg my-5 leading-7">
        <span v-if="shiftType === 'jumper'">
          {{ t("One-time shift") }}
          <br />
          {{ start.toLocaleString(DateTime.DATE_MED) }} {{ t("from") }}
          {{ start.toLocaleString(DateTime.TIME_24_SIMPLE) }} {{ t("to") }}
          {{ end.toLocaleString(DateTime.TIME_24_SIMPLE) }}
        </span>
        <span v-else>
          {{ t("Regular shift") }}
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
          <span v-if="chosenSlot && chosenSlot.freeUntil">
            {{ t("until") }}
            {{ chosenSlot.freeUntil.toLocaleString(DateTime.DATE_MED) }}
          </span>
        </span>
      </p>

      <!-- Shift infos -->
      <p
        v-if="shift.shifts_description"
        class="mb-5"
        v-html="parse(shift.shifts_description)"
      ></p>

      <UFormGroup label="Slot" class="my-5">
        <USelectMenu
          v-model="chosenSlot"
          :options="slots"
          option-value="id"
          label="Slot"
          placeholder="Choose slot"
        >
          <template #option="{ option }">
            {{ option.id }} - {{ option.slot.shifts_name }}
            <span v-if="shiftType == 'regular' && option.freeUntil">
              (free until
              {{ option.freeUntil.toLocaleString(DateTime.DATE_MED) }}
              )
            </span>
          </template>

          <template #label>
            <template v-if="chosenSlot">
              {{ chosenSlot.id }} - {{ chosenSlot.slot.shifts_name }}
              <span v-if="shiftType == 'regular' && chosenSlot.freeUntil">
                (free until
                {{ chosenSlot.freeUntil.toLocaleString(DateTime.DATE_MED) }}
                )
              </span>
            </template>
            <template v-else> Choose slot </template>
          </template>
        </USelectMenu>
      </UFormGroup>

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
  until: "bis"
  "Starting from": "Beginnend am"
  Regular shift: "Regelmäßige Schicht"
  One-time shift: "Einmalige Schicht"
</i18n>
