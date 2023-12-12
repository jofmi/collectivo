<script setup>
const error = useError();
</script>

<template>
  <template v-if="error.statusCode === 404">
    <h1>404!</h1>
    <p>Sorry, that page doesn't exist.</p>
  </template>
  <template v-else>
    <div>
      <h1>An error occured.</h1>
      <p>
        <strong>{{ error.message }}</strong>
      </p>
    </div>
  </template>
</template>
