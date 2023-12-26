<script setup lang="ts">
const route = useRoute();
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

// TODO: Do something with data
//   if (form.submitMethod == "triggerFlow" && form.submitID) {
//     directus.request(triggerFlow("POST", form.submitID, {}));
//   } else {
//     throw new Error("Invalid form configuration");
//   }

const form = forms.value[formName];

setCollectivoTitle(form.title);

if (!form.public) {
  requireAuth();
}
</script>

<template>
  <CollectivoContainer>
    <CollectivoForm v-if="form" :fields="form.fields" />
  </CollectivoContainer>
</template>
