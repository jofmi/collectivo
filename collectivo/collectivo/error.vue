<script setup lang="ts">
const error = useError();
</script>

<template>
  <div class="grid place-items-center h-screen">
    <div
      class="flex flex-row items-center gap-5 rounded-xl p-[25px] bg-white shadow-lg"
    >
      <UIcon
        name="i-heroicons-exclamation-triangle"
        class="text-6xl text-red-500"
      />
      <div v-if="!error">
        <h2>Unknown Error</h2>
        <p>Something went wrong.</p>
      </div>
      <div v-else-if="'statusCode' in error">
        <h2>Error {{ error.statusCode }}</h2>
        <p>{{ error.statusMessage }}</p>
      </div>
      <div v-else-if="'message' in error">
        <h2>Error</h2>
        <p>{{ error.message }}</p>
      </div>
      <div v-else-if="typeof error === 'string'">
        <h2>Error</h2>
        <p>{{ error }}</p>
      </div>
      <div v-else>
        <h2>Unknown Error</h2>
        <p>Something went wrong.</p>
      </div>
    </div>
  </div>
</template>
