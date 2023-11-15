<template>
  <div class="gap-5 columns-2">
    <div
      v-for="tile in tiles.data"
      class="border-solid border-2 border-sky-500 p-4 mb-5 inline-block w-full break-words">
      <div v-html="parse(tile.content)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { parse } from "marked";
const tiles = useTiles();
getTiles();
</script>
