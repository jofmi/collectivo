<script setup>
import { Icon } from '@iconify/vue'
</script>
<template>
    <UCard>
        <design-guide-section-title title="Button" />
        <div class="buttons">
            <div class="buttons__inner">
                <div class="buttons__inner__wrapper">
                    <UButton
                        class="btn"
                        variant="solid"
                        color="cyan"
                        size="base"
                    >
                        Download now
                    </UButton>
                    <UButton
                        class="btn"
                        variant="solid"
                        color="cyan"
                        size="base"
                    >
                        Download

                        <template #leading>
                            <Icon
                                icon="system-uicons:arrow-down-circle"
                                class="btn-icon"
                            />
                        </template>
                    </UButton>
                    <UButton
                        class="btn"
                        variant="solid"
                        color="cyan"
                        size="base"
                    >
                        Download

                        <template #trailing>
                            <Icon
                                icon="system-uicons:arrow-down-circle"
                                class="btn-icon"
                            />
                        </template>
                    </UButton>
                </div>
                <div class="buttons__inner__wrapper">
                    <UButton
                        class="btn"
                        variant="solid"
                        color="red"
                        size="base"
                    >
                        Download now
                    </UButton>
                    <UButton
                        class="btn"
                        variant="solid"
                        color="red"
                        size="base"
                    >
                        Download

                        <template #leading>
                            <Icon
                                icon="system-uicons:arrow-down-circle"
                                class="btn-icon"
                            />
                        </template>
                    </UButton>
                    <UButton
                        class="btn"
                        variant="solid"
                        color="red"
                        size="base"
                    >
                        Download

                        <template #trailing>
                            <Icon
                                icon="system-uicons:arrow-down-circle"
                                class="btn-icon"
                            />
                        </template>
                    </UButton>
                </div>
                <div class="buttons__inner__wrapper">
                    <UButton
                        class="btn"
                        variant="solid"
                        color="purple"
                        size="base"
                    >
                        Download now
                    </UButton>
                    <UButton
                        class="btn"
                        variant="solid"
                        color="purple"
                        size="base"
                    >
                        Download

                        <template #leading>
                            <Icon
                                icon="system-uicons:arrow-down-circle"
                                class="btn-icon"
                            />
                        </template>
                    </UButton>
                    <UButton
                        class="btn"
                        variant="solid"
                        color="purple"
                        size="base"
                    >
                        Download

                        <template #trailing>
                            <Icon
                                icon="system-uicons:arrow-down-circle"
                                class="btn-icon"
                            />
                        </template>
                    </UButton>
                </div>
                <div class="buttons__inner__wrapper">
                    <UButton class="btn" variant="solid" size="base" disabled>
                        Download now
                    </UButton>
                    <UButton class="btn" variant="solid" size="base" disabled>
                        Download

                        <template #leading>
                            <Icon
                                icon="system-uicons:arrow-down-circle"
                                class="btn-icon"
                            />
                        </template>
                    </UButton>
                    <UButton class="btn" variant="solid" size="base" disabled>
                        Download

                        <template #trailing>
                            <Icon
                                icon="system-uicons:arrow-down-circle"
                                class="btn-icon"
                            />
                        </template>
                    </UButton>
                </div>
            </div>
        </div>
    </UCard>
</template>

<style lang="scss" scoped>
.buttons {
    &__inner {
        &__wrapper {
            @apply flex items-center gap-2 lg:gap-5 mb-6 last:mb-0 flex-wrap;

            .btn {
                .btn-icon {
                    @apply w-[18px] h-[18px];
                }
            }
        }
    }
}
</style>
