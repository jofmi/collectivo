<script setup lang="ts">
const props = defineProps({
  calendarRef: Object as PropType<{ getApi: Promise<() => FullCalendar> }>,
});

const model = defineModel();
const shiftTypes = model.value.allowedShiftTypes;
const displayedDate = ref();
const calendarApi = ref(null);

// Get shift type with value from props
const selectedShiftType = ref(
  shiftTypes.find((type) => type.value === model.value.selectedShiftType),
);

const prevHandler = () => {
  calendarApi.value.prev();
  displayedDate.value = calendarApi.value.view.title;
};

const nextHandler = () => {
  calendarApi.value.next();
  displayedDate.value = calendarApi.value.view.title;
};

const views = [
  {
    label: "Month",
    icon: "i-heroicons-calendar",
    view: "dayGridMonth",
  },
  {
    label: "Week",
    icon: "i-heroicons-view-columns",
    view: "timeGridWeek",
  },
  {
    label: "Day",
    icon: "i-heroicons-queue-list",
    view: "timeGridDay",
  },
];

const selectedView = ref(views[0]);

function setView(view: string) {
  calendarApi.value.changeView(view);
  displayedDate.value = calendarApi.value.view.title;
}

watch(selectedView, (value) => {
  setView(value.view);
});

watch(selectedShiftType, (value) => {
  model.value.selectedShiftType = value.value;
});

onMounted(async () => {
  const calendar = await props.calendarRef.value.getApi;
  calendarApi.value = calendar();
  setView("dayGridMonth");
});
</script>

<template>
  <div class="calendar-header">
    <div class="calendar-header__left">
      <h2 class="calendar-header__left__title">
        {{ displayedDate }}
      </h2>
      <div class="calendar-header__left__buttons">
        <UButton
          color="gray"
          variant="solid"
          :padded="false"
          @click="prevHandler"
        >
          <UIcon name="i-heroicons-chevron-left-16-solid" class="text-[22px]" />
        </UButton>
        <UButton
          color="gray"
          variant="solid"
          :padded="false"
          @click="nextHandler"
        >
          <UIcon
            name="i-heroicons-chevron-right-16-solid"
            class="text-[22px]"
          />
        </UButton>
      </div>
    </div>
    <div class="calendar-header__right">
      <USelectMenu
        v-model="selectedShiftType"
        :options="shiftTypes"
        class="w-48"
      >
        <template #label>Shift type: {{ selectedShiftType.label }}</template>
      </USelectMenu>
      <USelectMenu
        v-model="selectedView"
        :options="views"
        option-attribute="label"
      >
        <template #label>Display</template>
        <template #leading>
          <UIcon :name="selectedView.icon" />
        </template>
      </USelectMenu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-header {
  @apply flex items-center justify-between mb-6;
  &__left {
    @apply flex items-center gap-5 justify-between lg:justify-start w-full;
    &__title {
      @apply font-semibold text-2xl;
    }

    &__buttons {
      @apply flex items-center gap-2.5;
      button {
        @apply h-auto rounded-lg p-1;
      }
    }
  }

  &__right {
    @apply flex items-center gap-5;
    &__btn {
      @apply h-auto py-2 pl-4 pr-2.5 rounded-[10px] gap-0;
    }
  }
}
</style>
