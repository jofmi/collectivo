<script setup lang="ts">
import Logo from "./Logo.vue";
import ProfileMenu from "./ProfileMenu.vue";
import PageTitle from "./PageTitle.vue";

const pageTitle = useCollectivoTitle();
const { t } = useI18n();

const scrollY = ref(0);

const updateScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", updateScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScroll);
});

const headerClass = computed(() =>
  scrollY.value === 0 ? "mobile-header" : "mobile-header border-bottom",
);
</script>

<template>
  <div :class="headerClass">
    <div class="mobile-page-title">
      {{ t(pageTitle) }}
    </div>
    <div class="pt-[1px]"><ProfileMenu /></div>
  </div>
  <div class="h-header"></div>
</template>

<style lang="scss" scoped>
.mobile-page-title {
  @apply text-2xl font-bold;
}

.border-bottom {
  @apply border-b-[1px] bg-white border-gray-200;
}

.h-header {
  @apply h-[60px] md:hidden;
}

.mobile-header {
  @apply h-[68px] px-[25px]  pt-[20px] md:hidden flex items-start justify-between transition fixed top-0 w-full z-10;
}
</style>
