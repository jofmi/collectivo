<script setup lang="ts">
const toast = useToast();
const { t } = useI18n();
const debug = false;

const props = defineProps({
  form: {
    type: Object as PropType<CollectivoForm>,
    required: true,
  },
});

async function onSubmitNuxt(data: any) {
  if (!props.form.submitPath) {
    throw new Error("Invalid form configuration");
  }

  const res = await useFetch(props.form.submitPath, {
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
    if (props.form.submitMode === "postNuxt") {
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
</script>

<template>
  <CollectivoContainer v-if="form">
    <CollectivoFormBuilder
      v-if="!submitted"
      :fields="form.fields"
      :submit="onSubmit"
      :submit-label="form.submitLabel"
    />
    <template v-else>
      <slot name="success">
        <div class="flex flex-col items-center justify-center space-y-4">
          <UIcon
            name="i-system-uicons-check"
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
