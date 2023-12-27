<script setup lang="ts">
const route = useRoute();
const toast = useToast();
const { t } = useI18n();
const forms = useCollectivoForms();

// Form name is used to load form data
const formName = route.params.formName;

// Do not allow unregistered forms
if (typeof formName !== "string" || !forms.value[formName]) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const form = forms.value[formName];
setCollectivoTitle(form.title);

async function onSubmitNuxt(data: any) {
  const res = await useFetch(form.submitPath, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status.value === "error") {
    throw res.error.value;
  }
}

const submitted = ref(false);

async function onSubmit(data: any) {
  try {
    if (form.submitMode === "postNuxt") {
      await onSubmitNuxt(data);
    } else {
      throw new Error("Invalid form configuration");
    }

    submitted.value = true;
  } catch (err) {
    console.error(err);

    toast.add({
      title: t("There was an error"),
      icon: "i-mi-warning",
      color: "red",
      timeout: 0,
    });
  }
}

if (!form.public) {
  requireAuth();
}
</script>

<template>
  <CollectivoContainer>
    <CollectivoForm
      v-if="form && !submitted"
      :fields="form.fields"
      :submit="onSubmit"
    />
    <template v-else>
      <div class="flex flex-col items-center justify-center space-y-4">
        <UIcon
          name="i-system-uicons-check"
          class="w-[64px] h-[64px] text-cv-primary"
        />
        <h1 class="text-2xl font-bold text-center">
          {{ t(form.successTitle ?? "Form submitted") }}
        </h1>
        <p class="text-center">
          {{ t(form.successText ?? "Thank you for your submission") }}
        </p>
      </div>
    </template>
  </CollectivoContainer>
</template>
