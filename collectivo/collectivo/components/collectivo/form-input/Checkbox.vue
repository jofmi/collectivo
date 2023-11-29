<script setup lang="ts">
defineProps(['level', 'disabled'])
</script>

<template>
    <div class="flex gap-[10px] items-center">
        <UCheckbox label="" :value="false" :disabled="disabled" />
        <p
            :class="{
                'text-cv-gray': disabled === true,
                'text-cv-primary': disabled === false,
            }"
            class="text-sm leading-4 font-medium tracking-[2%]"
        >
            {{ level }}
        </p>
    </div>
</template>

<style scoped lang="scss"></style>
