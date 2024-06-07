<script setup lang="ts">
import { parse } from "marked";

definePageMeta({
  middleware: ["auth"],
});

setCollectivoTitle("Dashboard");

const tiles = useCollectivoTiles();
const user = useCollectivoUser();

user.value.load();
tiles.value.load();

function getFilteredTiles(tiles: CollectivoTile[]) {
  return tiles.filter((tile) => {
    let display = true;
    let display2 = true;

    if (tile.tiles_tag_required) {
      display = user.value.tags.includes(tile.tiles_tag_required);
    }

    if (tile.tiles_tag_blocked) {
      display2 = !user.value.tags.includes(tile.tiles_tag_blocked);
    }

    return display && display2;
  });
}
</script>

<template>
  <div
    v-if="user.data && tiles.data"
    class="gap-5 columns-1 md:columns-2 xl:columns-3 2xl:columns-4"
  >
    <CollectivoCard
      v-for="tile in getFilteredTiles(tiles.data)"
      :key="tile.id"
      class="mb-5"
      :title="tile.tiles_name"
      :color="tile.tiles_color"
    >
      <template #content>
        <div v-if="tile.tiles_content" v-html="parse(tile.tiles_content)" />
        <div v-if="tile.tiles_buttons" class="flex flex-wrap gap-2 pt-3">
          <template v-for="button in tile.tiles_buttons" :key="button.id">
            <a
              v-if="button.tiles_is_external"
              :href="button.tiles_path"
              target="_blank"
            >
              <UButton
                :label="button.tiles_label"
                :color="tile.tiles_color"
                size="md"
                icon="i-heroicons-arrow-top-right-on-square-16-solid"
                trailing
              />
            </a>
            <NuxtLink v-else :to="button.tiles_path">
              <UButton
                :label="button.tiles_label"
                :color="tile.tiles_color"
                size="md"
              />
            </NuxtLink>
          </template>
        </div>
        <div v-if="tile.tiles_component">
          <component :is="tile.tiles_component" />
        </div>
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
