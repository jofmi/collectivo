<script setup lang="ts">
const toast = useToast();
const { t } = useI18n();
const debug = useRuntimeConfig().public.debug;
const submitted = ref(false);

const props = defineProps({
  form: {
    type: Object as PropType<CollectivoForm>,
    required: true,
  },
  data: {
    type: Object as PropType<Record<string, any>>,
    required: false,
  },
});

async function onSubmitNuxt(data: any) {
  if (!props.form.submitPath) {
    throw new Error("Invalid form configuration");
  }

  const directus = useDirectus();

  const headers: { [key: string]: string } = {
    Accept: "application/json",
  };

  try {
    // Add token to header if exists
    const token = await directus.refresh();
    headers["Authorization"] = `${token.access_token}`;
  } catch (err) {
    // do nothing
  }

  const res = await useFetch(props.form.submitPath, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  if (res.status.value === "error") {
    throw res.error.value;
  }
}

async function onSubmit(data: any) {
  try {
    const dataReady = props.form.beforeSubmit
      ? await props.form.beforeSubmit(data)
      : data;

    if (props.form.submitMode === "postNuxt") {
      await onSubmitNuxt(dataReady);
    } else {
      throw new Error("Invalid form configuration");
    }

    submitted.value = true;
  } catch (err) {
    toast.add({
      title: t("There was an error"),
      description: err instanceof Error ? err.message : undefined,
      icon: "i-heroicons-exclamation-triangle",
      color: "red",
      timeout: 0,
    });
  }
}
</script>

<template>
  <CollectivoContainer v-if="form">
    <CollectivoFormBuilder
      v-if="!submitted"
      :fields="form.fields"
      :submit="onSubmit"
      :submit-label="form.submitLabel"
      :data="data"
    />
    <template v-else>
      <slot name="success">
        <div class="flex flex-col items-center justify-center space-y-4">
          <UIcon
            name="i-heroicons-check-16-solid"
            class="w-[64px] h-[64px] text-primary"
          />
          <h1 class="text-2xl font-bold text-center">
            {{ t(form.successTitle ?? "Form submitted") }}
          </h1>
          <p class="text-center">
            {{ t(form.successText ?? "Thank you for your submission") }}
          </p>
        </div>
      </slot>
    </template>
    <div v-if="debug">
      <div class="">
        <UButton class="btn" @click="submitted = !submitted">
          {{ t("Toggle success page") }}
        </UButton>
      </div>
    </div>
  </CollectivoContainer>
</template>
