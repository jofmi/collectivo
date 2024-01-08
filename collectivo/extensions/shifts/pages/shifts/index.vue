<!-- This section will be available under /shifts -->

<script setup lang="ts">
import { readItems } from "@directus/sdk";

setCollectivoTitle("Shifts");
const directus = useDirectus();
const shifts = await directus.request(readItems("shifts_shifts"));
console.log(shifts);
</script>

<template>
  <CollectivoContainer>
    <h1>Shifts test</h1>
    <ul>
      <li v-for="shift in shifts" :key="shift.id">
        {{ shift.shifts_start_datetime }}
      </li>
    </ul>
  </CollectivoContainer>
</template>
