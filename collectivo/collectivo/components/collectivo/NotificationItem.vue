<script setup>
defineProps(['title', 'description'])
</script>
<template>
    <div class="notification">
        <p class="notification__title">{{ title }}</p>
        <p class="notification__description">{{ description }}</p>
    </div>
</template>

<style lang="scss" scoped>
.notification {
    @apply text-left pb-2 border-b-[1px] border-cv-purple-light;
    &__title {
        @apply font-bold text-sm text-cv-primary;
    }

    &__description {
        @apply font-semibold text-xs line-clamp-3 text-cv-primary/60;
    }
}
</style>
