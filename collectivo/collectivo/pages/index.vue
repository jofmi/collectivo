<script setup lang="ts">
setPageTitle("Dashboard");
import { parse } from "marked";

const tiles = useTiles();
getTiles();

const items = [
  [
    {
      title: "Week",
    },
    {
      title: "Day",
    },
  ],
];

const yearItems = [
  [
    {
      title: 2022,
    },
    {
      title: 2023,
    },
  ],
];
</script>

<template>
  <div class="gap-5 columns-2">
    <CollectivoCard
      v-for="tile in tiles.data"
      :key="tile.id"
      class="mb-5"
      :title="tile.name"
    >
      <template #content>
        <div v-html="parse(tile.content)"></div>
      </template>
    </CollectivoCard>
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
