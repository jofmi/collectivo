<script setup lang="ts">
setCollectivoTitle("Sign up for a shift", { backLink: "profile" });
</script>

<template>
  <CollectivoContainer>
    <ShiftsCalendar shift-type="regular" />
  </CollectivoContainer>
</template>
