<script setup>
import { Icon } from '@iconify/vue'

useHead({
    title: 'Dashboard | Collectivo',
})

const items = [
    [
        {
            title: 'Week',
        },
        {
            title: 'Day',
        },
    ],
]

const yearItems = [
    [
        {
            title: 2022,
        },
        {
            title: 2023,
        },
    ],
]
</script>

<template>
    <div class="dashboard">
        <div class="dashboard__top">
            <div class="dashboard__top__left">
                <CollectivoPageTitle title="Dashboard" class="mb-1.5" />
                <CollectivoBreadcrumb />
            </div>

            <div class="dashboard__top__right">
                <CollectivoNotification />
            </div>
        </div>
        <div class="dashboard__carousel">
            <CollectivoDashboardCarousel />
        </div>
        <!-- <div class="dashboard__calendar">
            <dashboard-calendar />
        </div> -->
        <!-- <div class="dashboard__table">
            <div class="dashboard__table__top">
                <section-title title="Customer Details" />
                <div class="dashboard__table__top__buttons">
                    <UDropdown :items="items">
                        <UButton label="Month" color="gray" :padded="false">
                            <template #trailing>
                                <Icon
                                    icon="system-uicons:chevron-down"
                                    class="text-2xl text-cv-primary ml-3"
                                />
                            </template>
                        </UButton>

                        <template #item="{ item }">
                            <dropdown-item :title="item.title" />
                        </template>
                    </UDropdown>

                    <UDropdown :items="yearItems">
                        <UButton label="Year" color="gray" :padded="false">
                            <template #trailing>
                                <Icon
                                    icon="system-uicons:chevron-down"
                                    class="text-2xl text-cv-primary ml-2.5"
                                />
                            </template>
                        </UButton>

                        <template #item="{ item }">
                            <dropdown-item :title="item.title" />
                        </template>
                    </UDropdown>
                </div>
            </div>
            <dashboard-table />
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
.dashboard {
    @apply mt-3;

    &__top {
        @apply hidden md:flex justify-between items-center mb-11;
    }

    &__table {
        @apply mt-10 mb-28 md:mb-0;

        &__top {
            @apply flex items-center justify-between mb-5;
            &__buttons {
                @apply hidden md:flex items-center gap-2.5;

                button {
                    @apply pl-[14px] pr-2.5 py-2 h-10 rounded-[10px] gap-0;
                }
            }
        }
    }
}
</style>
