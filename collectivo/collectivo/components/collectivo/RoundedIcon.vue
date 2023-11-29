<script setup>
import { Icon } from '@iconify/vue'
</script>
<template>
    <div class="rounded-icon">
        <Icon icon="system-uicons:arrow-down" class="icon" />
    </div>
</template>

<style lang="scss" scoped>
.rounded-icon {
    @apply bg-white w-[38px] h-[38px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer;
    &:hover {
        @apply bg-white/50;
    }

    .icon {
        @apply text-cv-purple;
    }
}
</style>
