<script setup>
import { Icon } from "@iconify/vue";

const items = [
  [
    {
      title: "New Notification",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum debitis laborum nesciunt nulla omnis quae quisquam quod rem similique veritatis.",
    },
    {
      title: "New Notification",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum debitis laborum nesciunt nulla omnis quae quisquam quod rem similique veritatis.",
    },
    {
      title: "New Notification",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum debitis laborum nesciunt nulla omnis quae quisquam quod rem similique veritatis.",
    },
  ],
];
</script>

<template>
  <UDropdown :items="items" :popper="{ arrow: true }">
    <div class="notification-icon">
      <span class="red-dot"></span>
      <Icon icon="system-uicons:bell" class="notifications-icon" />
    </div>

    <template #item="{ item }">
      <CollectivoNotificationItem
        :title="item.title"
        :description="item.description"
      />
    </template>
  </UDropdown>
</template>

<style lang="scss" scoped>
.notification-icon {
  @apply relative cursor-pointer;

  .notifications-icon {
    @apply w-7 h-7 text-cv-primary;
  }

  .red-dot {
    @apply block h-[9px] w-[9px] bg-[#F00] rounded-full absolute right-1 top-0;
  }
}
</style>
