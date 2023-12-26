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
// TODO: Do something with data
//   if (form.submitMethod == "triggerFlow" && form.submitID) {
//     directus.request(triggerFlow("POST", form.submitID, {}));
//   } else {
//     throw new Error("Invalid form configuration");
//   }

async function onSubmit(data: any) {
  if (form.submitMode === "postNuxt") {
    const res = await useFetch(form.submitPath, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status.value === "error") {
      console.log(res.error.value);

      toast.add({
        title: t("There was an error"),
        icon: "i-mi-warning",
        color: "red",
        timeout: 0,
      });
    } else {
      toast.add({
        title: t("Success"),
        icon: "i-mi-check",
        color: "green",
        timeout: 0,
      });
    }
  } else {
    throw new Error("Invalid form configuration");
  }
}

if (!form.public) {
  requireAuth();
}
</script>

<template>
  <CollectivoContainer>
    <CollectivoForm v-if="form" :fields="form.fields" :submit="onSubmit" />
  </CollectivoContainer>
</template>
