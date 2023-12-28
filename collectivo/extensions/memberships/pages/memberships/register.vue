<script setup lang="ts">
const form = useMembershipsRegistrationForm();
const { t } = useI18n();
setCollectivoTitle(form.value.title);
</script>

<template>
  <CollectivoFormPage :form="form">
    <template #success>
      <div class="flex flex-col items-center justify-center space-y-4">
        <UIcon
          name="i-system-uicons-check"
          class="w-[64px] h-[64px] text-cv-primary"
        />
        <h1 class="text-2xl font-bold text-center">
          {{ t(form.successTitle ?? "Application submitted!") }}
        </h1>
        <p class="text-center">
          {{ t(form.successText ?? "t:memberships_form_success") }}
        </p>
        <UButton icon="i-mi-log-in" @click="requireAuth(true)">{{
          t("Login")
        }}</UButton>
      </div>
    </template>
  </CollectivoFormPage>
</template>
