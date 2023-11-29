<script setup>
import logo from '@/assets/images/logo.svg'
</script>

<template>
    <div class="logo">
        <router-link to="/" class="logo__image">
            <img :src="logo" alt="" class="object-cover" />
        </router-link>
        <div class="logo__label">
            COLLECTIVO
        </div>
    </div>
</template>

<style lang="scss" scoped>



.logo {
    @apply lg:w-full flex flex-col justify-center items-center md:mb-10 lg:mb-[52px];
    &__image {
        @apply w-10 h-10;
    }
    &__label {
    @apply md:text-xs lg:text-sm text-cv-primary font-semibold justify-center mt-2;
    letter-spacing: 0.28px;
}
}
</style>


