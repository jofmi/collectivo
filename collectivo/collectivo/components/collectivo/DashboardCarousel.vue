<script setup lang="ts">
import { parse } from "marked";

const tiles = useTiles();
getTiles();

const carouselOptions = ref({
  itemsToShow: 1.25,
  loop: true,
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
      <Carousel snap-align="start" v-bind="carouselOptions">
        <slide v-for="(tile, i) in tiles.data" :key="i">
          <CollectivoCard :title="tile.name">
            <template #content>
              <div v-html="parse(tile.content)"></div>
            </template>
          </CollectivoCard>
        </slide>
      </Carousel>
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
