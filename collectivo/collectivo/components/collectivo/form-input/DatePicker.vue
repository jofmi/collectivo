<script setup lang="ts">
import { Icon } from "@iconify/vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

defineProps(["level"]);
const date = ref(new Date());

const setDateHandler = (value) => {
  date.value = value;
};

const customPosition = () => ({ top: 55, left: 0 });
</script>

<template>
  <div>
    <p class="level-text">
      {{ level }}
    </p>
    <div id="date-picker" class="relative">
      <VueDatePicker
        v-model="date"
        placeholder="YYYY-MM-DD"
        text-input
        no-title
        hide-input-icon
        :enable-time-picker="false"
        :alt-position="customPosition"
        enter-submit
        :action-row="{
          showSelect: false,
          showCancel: false,
          showPreview: false,
        }"
        :format="'yyyy-MM-dd'"
        @date-update="setDateHandler"
      />
      <Icon
        icon="system-uicons:calendar-month"
        class="w-[18px] h-[18px] text-cv-primary/50 absolute top-1/2 -translate-y-1/2 right-[18px] z-50"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.level-text {
  @apply mb-2 leading-4 text-cv-primary font-semibold text-sm;
}
</style>
