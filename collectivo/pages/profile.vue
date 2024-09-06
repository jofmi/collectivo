<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

setCollectivoTitle("Profile");
const toast = useToast();
const { t } = useI18n();
const user = useCollectivoUser();

// Sort profile.inputs by order
// profile.value.inputs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

// Submit form data
async function saveProfile(data: CollectivoUser) {
  try {
    await user.value.save(data);

    toast.add({
      title: t("Profile updated"),
      icon: "i-heroicons-check-circle",
      timeout: 10000,
    });
  } catch (e) {
    console.error(e);

    toast.add({
      title: t("There was an error"),
      icon: "i-heroicons-exclamation-triangle",
      color: "red",
      timeout: 0,
    });
  }
}
</script>

<template>
  <!-- <CollectivoMenuTabs :items="profileMenu" /> -->
  <CollectivoContainer>
    <CollectivoFormBuilder
      v-if="user.user"
      :data="user.user"
      :fields="user.fields"
      :submit="saveProfile"
      submit-label="Save"
    />
  </CollectivoContainer>
</template>
