<script setup lang="ts"></script>

<template>
  <div class="breadcrumb">
    <span class="active">Activity</span> <span>/ Timesheet / Task</span>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  @apply text-sm font-semibold text-gray-500 tracking-[0.28px] leading-normal;
  .active {
    @apply text-primary;
  }
}
</style>
