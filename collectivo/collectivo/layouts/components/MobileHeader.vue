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
    <ProfileMenu />
  </div>
  <div class="h-16 w-full"></div>
</template>

<style lang="scss" scoped>
.mobile-page-title {
  @apply text-2xl font-bold;
}

.border-bottom {
  @apply border-b-[1px] border-gray-200;
}

.mobile-header {
  @apply h-[66px] px-[25px] bg-white pt-[19px] md:hidden flex items-start justify-between transition fixed top-0 w-full z-10;
}
</style>
