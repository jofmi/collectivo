<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps(["level"]);

const options = [
  "Pacific Time (US & Canada)",
  "Atlantic Standard Time (AST)",
  "Eastern Standard Time (EST)",
  "Central Standard Time (CST)",
  "Mountain Standard Time (MST)",
];

const selected = ref(options[0]);
</script>

<template>
  <div>
    <p class="level-text">
      {{ level }}
    </p>
    <USelectMenu v-slot="{ open }" v-model="selected" :options="options">
      <UButton
        class="dropdown-button"
        :class="{ 'dropdown-button-active': open }"
      >
        {{ selected }}

        <Icon icon="system-uicons:chevron-open" class="w-7 h-7 text-cv-gray" />
      </UButton>
    </USelectMenu>
  </div>
</template>

<style scoped lang="scss">
.level-text {
  @apply mb-2 leading-4 text-cv-primary font-semibold text-sm;
}
.dropdown-button {
  @apply flex-1 outline-none justify-between bg-[#F4F7FE] py-[11px] pl-[18px] pr-[15px] rounded-lg text-sm text-cv-gray font-medium;
}
.dropdown-button-active {
  @apply bg-white text-cv-primary ring-1 ring-cv-purple;
}
</style>
