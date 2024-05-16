<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({
  layout: false,
});

const directus = useDirectus();
const runtimeConfig = useRuntimeConfig();
// If user is not authenticated, log out of directus and redirect to keycloak
directus.logout();

if (runtimeConfig.public.authService === "keycloak") {
  navigateTo(
    `${runtimeConfig.public.directusUrl}/auth/login/keycloak?redirect=${runtimeConfig.public.collectivoUrl}`,
    { external: true },
  );
}

const appConfig = useAppConfig();
const logoPath = appConfig.collectivo.logoPath;

const schema = object({
  email: string().email("Invalid email").required("Required"),
  password: string().required("Required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

const error = ref<string | null>(null);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data.email);

  try {
    await directus.login(event.data.email, event.data.password, {
      mode: "session",
    });

    reloadNuxtApp({ path: "/" });
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message;
    } else {
      error.value = "An error occurred";
    }
  }
}
</script>

<template>
  <div
    v-if="runtimeConfig.public.authService != 'keycloak'"
    class="w-64 mx-auto mt-32"
  >
    <img :src="logoPath" alt="" class="mb-10 mx-auto max-h-24" >
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit"> Submit </UButton>
    </UForm>
    <div v-if="error" class="text-red-500">{{ error }}</div>
  </div>
</template>
