<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps(["calendarRef"]);

const currentMonth = ref("");
const calendarApi = ref(null);

onMounted(async () => {
  const calendar = await props.calendarRef.value.getApi;
  calendarApi.value = calendar();
  currentMonth.value = calendarApi.value.view.title;
});

const prevHandler = () => {
  calendarApi.value.prev();
  currentMonth.value = calendarApi.value.view.title;
};

const nextHandler = () => {
  calendarApi.value.next();
  currentMonth.value = calendarApi.value.view.title;
};

const items = [
  [
    {
      title: "Week",
    },
    {
      title: "Day",
    },
  ],
];
</script>

<template>
  <div class="calendar-header">
    <div class="calendar-header__left">
      <h2 class="calendar-header__left__title">
        {{ currentMonth }}
      </h2>
      <div class="calendar-header__left__buttons">
        <UButton
          color="gray"
          variant="solid"
          :padded="false"
          @click="prevHandler"
        >
          <Icon
            icon="system-uicons:chevron-left"
            class="text-[22px] text-cv-primary"
          />
        </UButton>
        <UButton
          color="gray"
          variant="solid"
          :padded="false"
          @click="nextHandler"
        >
          <Icon
            icon="system-uicons:chevron-right"
            class="text-[22px] text-cv-primary"
          />
        </UButton>
      </div>
    </div>
    <div class="calendar-header__right">
      <UDropdown :items="items">
        <UButton
          label="Month"
          color="gray"
          class="calendar-header__right__btn"
          :padded="false"
        >
          <template #leading>
            <Icon
              icon="system-uicons:calendar"
              class="text-base text-cv-primary mr-2"
            />
          </template>
          <template #trailing>
            <Icon
              icon="system-uicons:chevron-down"
              class="text-2xl text-cv-primary ml-4"
            />
          </template>
        </UButton>

        <template #item="{ item }">
          <dropdown-item :title="item.title" />
        </template>
      </UDropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-header {
  @apply flex items-center justify-between mb-6;
  &__left {
    @apply flex items-center gap-5 justify-between lg:justify-start w-full;
    &__title {
      @apply font-semibold text-2xl text-cv-primary;
    }

    &__buttons {
      @apply flex items-center gap-2.5;
      button {
        @apply h-auto rounded-lg p-1;
      }
    }
  }

  &__right {
    @apply hidden lg:block;
    &__btn {
      @apply h-auto py-2 pl-4 pr-2.5 rounded-[10px] gap-0;
    }
  }
}
</style>
