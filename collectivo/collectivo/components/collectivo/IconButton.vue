<script setup>
defineProps(['variant'])
</script>
<template>
    <button :class="`button ${variant ?? ''}`">
        <slot name="content"></slot>
    </button>
</template>

<style lang="scss" scoped>
.button {
    @apply p-1 bg-cv-purple-light rounded-lg text-sm bg-cv-purple-light font-semibold tracking-[0.28px] transition-all;

    &:hover {
        @apply bg-cv-purple-light/80;
    }
}
</style>
