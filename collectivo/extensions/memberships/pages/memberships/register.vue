<script setup lang="ts">
const form = useMembershipsRegistrationForm();
const { t } = useI18n();
const user = useCollectivoUser();
setCollectivoTitle(form.value.title);
</script>

<template>
  <CollectivoFormPage :form="form">
    <template #success>
      <div class="flex flex-col items-center justify-center space-y-4">
        <UIcon
          name="i-system-uicons-check"
          class="w-[64px] h-[64px] text-primary"
        />
        <h1 class="text-2xl font-bold text-center">
          {{ t(form.successTitle ?? "Application submitted!") }}
        </h1>
        <div
          v-if="user.isAuthenticated"
          class="flex flex-col items-center justify-center space-y-4"
        >
          <NuxtLink to="/">
            <UButton size="md">{{ t("Home") }}</UButton>
          </NuxtLink>
        </div>
        <div v-else class="flex flex-col items-center justify-center space-y-4">
          <p class="text-center">
            {{ t(form.successText ?? "t:memberships_form_success") }}
          </p>
          <UButton icon="i-mi-log-in" size="md" @click="user.login()">{{
            t("Login")
          }}</UButton>
        </div>
      </div>
    </template>
  </CollectivoFormPage>
</template>
