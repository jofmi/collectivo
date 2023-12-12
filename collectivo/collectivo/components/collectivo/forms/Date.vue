<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

defineProps({
  modelValue: [String],
  type: String,
  label: String,
  disabled: Boolean,
  placeholder: String,
});

defineEmits(["update:modelValue"]);

const customPosition = () => ({ top: 55, left: 0 });
</script>

<template>
  <div>
    <div id="date-picker" class="relative">
      <VueDatePicker
        :model-value="modelValue"
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
        @date-update="
          (value: string) => {
            $emit('update:modelValue', value);
          }
        "
      />
      <UIcon
        name="i-system-uicons-calendar-month"
        class="w-[18px] h-[18px] text-cv-primary/50 absolute top-1/2 -translate-y-1/2 right-[18px] z-50"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
#date-picker {
  .dp__input {
    @apply bg-cv-gray-light border-0 outline outline-1 outline-transparent focus:outline-cv-active px-[18px] py-4 rounded-lg text-sm text-cv-primary/50 font-medium font-urbanist tracking-[0.28px] leading-[18px] placeholder:text-sm;
  }

  .dp__instance_calendar {
    @apply rounded-lg border border-[#edf0f7] bg-white;
    box-shadow: 0 12px 24px 0 rgba(220, 226, 239, 0.5);

    .dp__menu_inner {
      @apply p-[14px];
    }

    .dp__calendar_header_separator {
      @apply hidden;
    }

    .dp__calendar_header_item {
      @apply text-xs font-semibold tracking-[0.28px] text-cv-gray h-auto leading-4;
    }

    .dp__calendar_item {
      @apply text-sm font-semibold font-urbanist;
      .dp__today {
        @apply rounded-[50%] bg-cv-gray/40 border-0;
      }
      .dp__active_date {
        @apply rounded-[50%] bg-cv-active;
      }

      .dp__date_hover:hover {
        @apply rounded-[50%];
      }
    }

    .dp__month_year_row {
      @apply mx-[6px] mb-[15px] justify-end gap-[10px];
      .dp__month_year_wrap {
        @apply w-full justify-start gap-[6px] flex-1;
        .dp__month_year_select {
          @apply font-urbanist justify-start text-xl text-cv-primary font-semibold w-fit hover:bg-transparent;
        }

        .dp__overlay {
          .dp__overlay_cell_pad {
            @apply font-urbanist;
          }
        }
      }

      .dp__btn.dp--arrow-btn-nav {
        @apply bg-cv-purple-light w-[30px] h-[30px] rounded-lg order-1 flex items-center justify-center;
        .dp__inner_nav {
          svg {
            path {
              @apply fill-black;
            }
          }
        }
      }
    }
  }

  .dp__arrow_top {
    @apply hidden;
  }

  .dp__menu {
    @apply border-0;
  }
  .dp__clear_icon {
    @apply hidden;
  }

  .dp__action_row {
    @apply hidden;
  }

  .dp__overlay_cell_active {
    @apply bg-cv-active;
  }
}
</style>
