<script setup>
defineProps(['variant', 'title'])
</script>
<template>
    <div :class="`card ${variant ?? ''}`">
        <div class="card-corner"></div>
        <p class="card__title">
            {{ title }}
        </p>
        <slot name="content"></slot>
    </div>
</template>

<style lang="scss" scoped>
.card {
    @apply h-fit w-full bg-cv-cyan-light rounded-[15px] relative overflow-hidden p-6;
    &__title {
        @apply mb-1 font-semibold text-lg text-cv-primary leading-[22px];
    }

    .card-corner {
        @apply h-[70px] w-[70px] bg-[#77B3AD]/30 absolute rounded-full right-0 top-0 transform translate-x-2/4 -translate-y-2/4 mt-2 mr-2;
    }

    &.purple {
        @apply bg-cv-violet-light;
        .card-corner {
            @apply bg-[#F4DBF8];
        }
    }

    &.orange {
        @apply bg-cv-orange-light;
        .card-corner {
            @apply bg-[#D36D29]/[15%];
        }
    }

    &.gray {
        @apply bg-cv-purple-light;
        .card-corner {
            @apply bg-[#4E3095]/10;
        }
    }
}
</style>
