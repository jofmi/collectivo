<script setup>
import { Icon } from "@iconify/vue";

const carouselOptions = ref({
  itemsToShow: 1.25,
  loop: true,
  snapAlign: "start",
  breakpoints: {
    // 700px and up
    700: {
      itemsToShow: 2,
    },
    // 1024 and up
    1024: {
      itemsToShow: 3,
    },
    1200: {
      itemsToShow: 4,
    },
  },
});
</script>

<template>
  <div class="dashboard-carousel">
    <ClientOnly>
      <carousel v-bind="carouselOptions">
        <slide key="1">
          <CollectivoCard title="Hello world!">
            <template #content>
              Hello Aaron!
              <UButton
                class="mt-6 w-full"
                variant="solid"
                color="cyan"
                size="base"
              >
                Hello again!
              </UButton>
            </template>
          </CollectivoCard>
        </slide>
      </carousel>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.carousel__slide {
  @apply px-2.5 first:pl-0 items-start text-left;
}

.dashboard-carousel {
  @apply -mr-[25px] md:mr-0;
}
</style>
