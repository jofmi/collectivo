<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();

// Form name is used to load form data
const formName = route.params.formName;

interface Form {
  slug: string;
  title: string;
  description: string;
  inputs: FormInput[];
}

const inputTypes = [
  // Layout types
  "pageTitle",
  "sectionTitle",
  "description",
  "clear",

  // Input types
  "text",
  "number",
  "email",
  "password",
  "textarea",
  "select",
] as const;

interface FormInput {
  type: (typeof inputTypes)[number];
  label?: string;
  key?: string;
  placeholder?: string | number | boolean;
  value?: string | number | boolean;
  required?: boolean;
  disabled?: boolean;
  width?: string;
  description?: string;
}

// Mockup form data to be replaced later
const form: Form = {
  slug: "test",
  title: "Test Form Title",
  description: "Test Form Description",
  inputs: [
    {
      type: "sectionTitle",
      label: "This is a section",
      key: "section_title_1",
      width: "full",
    },
    {
      type: "text",
      label: "Text",
      key: "text",
    },
    {
      type: "text",
      label: "Text",
      key: "text",
    },
    {
      type: "clear",
    },
    {
      type: "text",
      label: "Text",
      key: "text",
    },
    {
      type: "text",
      label: "Text",
      key: "text",
    },
  ],
};

setPageTitle(form.title);

function getInputClasses(input: FormInput) {
  let classes = "pr-5 ";

  if (
    input.width == "full" ||
    ["pageTitle", "sectionTitle", "clear"].includes(input.type)
  ) {
    classes += "basis-full";
  } else {
    classes += "basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4";
  }

  return classes;
}
</script>

<template>
  <CollectivoContainer>
    <div class="flex flex-wrap w-full">
      <template v-for="input in form.inputs" :key="input.key">
        <div :class="getInputClasses(input)">
          <div v-if="input.type === 'clear'"></div>
          <div v-else class="px-2 py-3 lg:p-4">
            <div
              v-if="input.type === 'sectionTitle'"
              class="text-cv-primary font-semibold text-2xl leading-7"
            >
              {{ input.label }}
            </div>
            <div v-else-if="input.type === 'text'">
              <CollectivoFormsInput
                :label="input.label"
                :disabled="input.disabled"
              />
            </div>
            <div v-else>
              {{ input.label }}
            </div>
          </div>
        </div>
      </template>
      <div class="basis-full"></div>
      <div class="px-2 py-3 lg:p-4">
        <UButton
          class="btn"
          variant="solid"
          color="cyan"
          size="md"
          icon="i-mi-circle-check"
          :loading="false"
        >
          {{ t("Submit") }}
        </UButton>
      </div>
    </div>
  </CollectivoContainer>
</template>

<style lang="scss" scoped></style>
