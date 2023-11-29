<script setup>
import { Icon } from '@iconify/vue'

defineProps(['level', 'status'])
</script>

<template>
    <div>
        <p class="level-text">{{ level }}</p>
        <div
            :class="{
                'success-input': status === 'success',
                'error-input': status === 'error',
            }"
        >
            <UInput placeholder="Custom Sequence Schedule">
                <template #trailing>
                    <Icon
                        v-if="status === 'success'"
                        icon="system-uicons:check-circle"
                        class="w-[18px] h-[18px] text-cv-cyan"
                    />
                    <Icon
                        v-else
                        icon="system-uicons:warning-circle"
                        class="w-[18px] h-[18px] text-cv-red"
                    />
                </template>
            </UInput>
            <p>Helper Text</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.level-text {
    @apply mb-2 leading-4 text-cv-primary font-semibold text-sm;
}
</style>
