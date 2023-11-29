<script setup>
import { Icon } from '@iconify/vue'

defineProps(['image', 'title', 'subtitle'])
</script>
<template>
    <div class="platform">
        <div class="platform__left">
            <div class="platform__left__image">
                <img :src="image" alt="" />
            </div>
            <div class="platform__left__content">
                <p class="platform__left__content__title">{{ title }}</p>
                <p class="platform__left__content__subtitle">{{ subtitle }}</p>
            </div>
        </div>
        <div class="platform__icon">
            <Icon
                icon="system-uicons:chevron-right"
                class="h-[26px] w-[26px]"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.platform {
    @apply flex justify-between items-center;
    &__left {
        @apply flex items-center gap-4;

        &__image {
            @apply w-11 h-11 rounded-full bg-white flex items-center justify-center overflow-hidden;
            img {
                @apply w-5 h-5 object-cover;
            }
        }

        &__content {
            &__title {
                @apply text-cv-primary font-semibold text-sm;
            }

            &__subtitle {
                @apply text-cv-gray text-xs font-medium;
            }
        }
    }

    &__icon {
    }
}
</style>
