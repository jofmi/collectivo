<script setup lang="ts">
setPageTitle("Profile");
const profile = useMembersMe();
getMembersMe();
</script>

<template>
  <div v-if="profile.error">
    {{ profile.error }}
  </div>
  <div
    v-for="(value, name, key) in profile.data"
    v-else-if="profile.data"
    :key="key"
  >
    {{ name }}: {{ value }}
  </div>
</template>
