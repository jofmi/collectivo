<script setup>
import { Icon } from "@iconify/vue";

defineProps(["level", "placeholder"]);
const value = ref(0);

const increment = () => {
  value.value++;
};

const decrement = () => {
  if (value.value > 0) {
    value.value--;
  }
};
</script>

<template>
  <div>
    <p class="level-text">{{ level }}</p>
    <UInput
      v-model="value"
      type="number"
      :placeholder="placeholder"
      :ui="{
        strategy: 'override',
        icon: {
          trailing: {
            wrapper:
              'absolute end-0 inset-y-0 flex items-center z-10 pointer-events-auto',
          },
        },
      }"
      size="numberInput"
    >
      <template #trailing>
        <div class="icon-buttons">
          <button class="input-number-btn" @click="increment">
            <Icon
              icon="system-uicons:chevron-up"
              class="text-cv-primary/50 w-[18px] h-[18px]"
            />
          </button>
          <button class="input-number-btn" @click="decrement">
            <Icon
              icon="system-uicons:chevron-down"
              class="text-cv-primary/50 w-[18px] h-[18px]"
            />
          </button>
        </div>
      </template>
    </UInput>
  </div>
</template>

<style scoped lang="scss">
.level-text {
  @apply mb-2 leading-4 text-cv-primary font-semibold text-sm;
}
.icon-buttons {
  @apply flex flex-col h-full justify-between border-l-[1px] border-[#DDDEF3];

  .input-number-btn {
    @apply py-1 px-4 last:border-t-[1px] border-[#DDDEF3];
  }
}
</style>
