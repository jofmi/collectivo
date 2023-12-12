<script setup lang="ts">
const toast = useToast();
const route = useRoute();
const { t } = useI18n();

// Form name is used to load form data
const formName = route.params.formName;
const directus = useDirectus();

const forms = useForms();

if (typeof formName !== "string" || !forms.value[formName]) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const form = forms.value[formName];

setPageTitle("My form");
</script>

<template>
  <CollectivoContainer>
    <div v-if="form">
      <Vueform :schema="form.schema" :steps="form.steps" />
    </div>
    <div v-else>Could not find form</div>
  </CollectivoContainer>
</template>

<style lang="scss" scoped>
.input {
  @apply px-2 py-3 lg:p-4;
}
.element-full {
  @apply input basis-full;
}

.element-1\/2 {
  @apply input basis-full md:basis-1/2;
}

.element-1\/3 {
  @apply input basis-full md:basis-1/2 lg:basis-1/3;
}
.element-1\/4 {
  @apply input basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4;
}

.element-1\/5 {
  @apply input basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/5;
}

.element-1\/6 {
  @apply input basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6;
}
</style>
