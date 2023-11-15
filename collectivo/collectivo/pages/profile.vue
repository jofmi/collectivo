<template>
  <div v-if="profile.error">
    {{ profile.error }}
  </div>
  <div v-else-if="profile.data" v-for="(value, name, key) in profile.data">
    {{ name }}: {{ value }}
  </div>
</template>

<script setup>
setPageTitle("Profile");
const profile = useMembersMe();
getMembersMe();
</script>
