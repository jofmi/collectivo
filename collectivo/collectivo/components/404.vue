<script setup lang="ts"></script>

<template>
  <div class="error__wrapper">
    <div class="error__inner">
      <svg
        width="120"
        height="120"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.0007 3.896C24.237 3.896 30.1048 9.76241 30.1048 17.0002C30.1048 24.2365 24.237 30.1043 17.0007 30.1043C9.7629 30.1043 3.89648 24.2365 3.89648 17.0002C3.89648 9.76241 9.7629 3.896 17.0007 3.896Z"
          stroke="#FF4C32"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.9935 11.6226V17.8828"
          stroke="#FF4C32"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.9942 22.3778H17.0084"
          stroke="#FF4C32"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h1>404 Not Found!</h1>
      <router-link to="/" class="font-semibold text-cv-active underline"
        >Back to Home</router-link
      >
    </div>
  </div>
  >
</template>

<style lang="scss" scoped>
.error__wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .error__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      font-weight: 700;
      font-size: 52px;
    }
  }
}
</style>
