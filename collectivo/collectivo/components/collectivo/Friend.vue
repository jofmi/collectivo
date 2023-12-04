<script setup lang="ts">
import avatar from "@/assets/images/friend-avatar.png";
</script>

<template>
  <div class="friend">
    <div class="friend__image">
      <img :src="avatar" alt="" />
    </div>
    <div class="friend__title">
      <p>Jessica George</p>
      <span>Friend</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.friend {
  @apply flex gap-4 items-center;
  &__image {
    @apply w-12 h-12 rounded-full overflow-hidden;
    img {
      @apply w-full h-full object-cover;
    }
  }

  &__title {
    p {
      @apply text-cv-primary text-sm leading-4 font-semibold;
    }

    span {
      @apply text-cv-gray text-xs font-medium mt-1 leading-[14px];
    }
  }
}
</style>
