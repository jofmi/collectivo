<script setup></script>
<template>
    <div class="breadcrumb">
        <span class="active">Activity</span> <span>/ Timesheet / Task</span>
    </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
    @apply text-sm font-semibold text-cv-gray tracking-[0.28px] leading-normal;
    .active {
        @apply text-cv-active;
    }
}
</style>
