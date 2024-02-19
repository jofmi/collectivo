<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },
  birthdate: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n();
const emit = defineEmits(["update:modelValue"]);

const date: Ref<Date | string | undefined> = ref();

const day = ref();
const month = ref();
const year = ref();

const days = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString().padStart(2, "0"),
);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from({ length: 150 }, (_, i) =>
  (new Date().getFullYear() - i).toString(),
);

if (props.modelValue) {
  date.value = new Date(props.modelValue);
  day.value = date.value.getUTCDate().toString().padStart(2, "0");
  month.value = months[date.value.getUTCMonth()];
  year.value = date.value.getUTCFullYear().toString();
}

watch(
  () => date.value,
  (value) => {
    emit("update:modelValue", value);
  },
);

watch([day, month, year], ([day, month, year]) => {
  if (day && month && year)
    date.value = new Date(`${year}-${month}-${day} UTC`);
});
</script>

<template>
  <div class="flex flex-row gap-2">
    <USelectMenu
      v-model="day"
      :options="days"
      class="w-1/3"
      :placeholder="t('Day')"
    />

    <USelectMenu
      v-model="month"
      :options="months"
      class="w-1/3"
      :placeholder="t('Month')"
    >
      <template #label>
        {{ t(month ?? "Month") }}
      </template>
      <template #option="{ option }">
        {{ t(option) }}
      </template>
    </USelectMenu>

    <USelectMenu
      v-model="year"
      :options="years"
      class="w-1/3"
      :placeholder="t('Year')"
    />
  </div>
</template>

<i18n lang="json">
{
  "de": {
    "Day": "Tag",
    "Month": "Monat",
    "Year": "Jahr",
    "January": "Jänner",
    "February": "Februar",
    "March": "März",
    "April": "April",
    "May": "Mai",
    "June": "Juni",
    "July": "Juli",
    "August": "August",
    "September": "September",
    "October": "Oktober",
    "November": "November",
    "December": "Dezember"
  }
}
</i18n>
