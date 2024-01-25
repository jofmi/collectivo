<script setup lang="ts">
const form = useMembershipsRegistrationForm();
const { t } = useI18n();
const user = useCollectivoUser();
setCollectivoTitle(form.value.title);
</script>

<template>
  <CollectivoContainer v-if="user.isAuthenticated">
    <div class="flex flex-col items-center justify-center space-y-4">
      <div>{{ t("t:memberships_form_logout") }}</div>
      <UButton icon="i-mi-log-out" @click="user.logout()">{{
        t("Logout")
      }}</UButton>
    </div>
  </CollectivoContainer>
  <CollectivoFormPage v-else :form="form">
    <template #success>
      <div class="flex flex-col items-center justify-center space-y-4">
        <UIcon
          name="i-system-uicons-check"
          class="w-[64px] h-[64px] text-primary" />
        <h1 class="text-2xl font-bold text-center">
          {{ t(form.successTitle ?? "Application submitted!") }}
        </h1>
        <p class="text-center">
          {{ t(form.successText ?? "t:memberships_form_success") }}
        </p>
        <UButton icon="i-mi-log-in" size="md" @click="user.login()">{{
          t("Login")
        }}</UButton>
      </div>
    </template>
  </CollectivoFormPage>
</template>
