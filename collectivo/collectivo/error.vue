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
      <!-- HTTP ERROR -->
      <template v-if="error && 'statusCode' in error">
        <template v-if="error.statusCode === 404">
          <p>{{ t("This page doesn't exist.") }}</p>
        </template>
        <template v-else>
          <div>
            <p>{{ t("An error has occured.") }}</p>
          </div>
        </template>
      </template>
      <!-- OTHER KIND OF ERROR -->
      <template v-else-if="error != null && error != undefined">
        <div>
          <p>{{ t("An error has occured.") }}</p>
        </div>
      </template>
    </CollectivoContainer>
  </NuxtLayout>
</template>
