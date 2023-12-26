<script setup lang="ts">
const error = useError();
const { t } = useI18n();
let title = "Error";

if (error.value && "statusCode" in error.value) {
  title = title + " " + error.value.statusCode.toString();
}

setCollectivoTitle(title);
</script>

<template>
  <NuxtLayout>
    <CollectivoContainer>
      <template v-if="error && 'statusCode' in error">
        <template v-if="error.statusCode === 404">
          <p>{{ t("This page doesn't exist.") }}</p>
        </template>
        <template v-else>
          <div>
            <p>{{ t("An error has occured.") }}</p>
            <p>
              <strong>{{ error.message }}</strong>
            </p>
          </div>
        </template></template
      >
    </CollectivoContainer>
  </NuxtLayout>
</template>
