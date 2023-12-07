<script setup lang="ts">
import { triggerFlow } from "@directus/sdk";

const route = useRoute();
const { t } = useI18n();

// Form name is used to load form data
const formName = route.params.formName;
const directus = useDirectus();

interface Form {
  slug: string;
  title: string;
  description: string;
  inputs: FormInput[];
  submitMethod?: "triggerFlow"; // TODO: Add createItem updateItem APIpost APIput APIpatch
  submitID?: string;
  public?: boolean;
}

type FormInput =
  | (FormElement & FormElementLayout)
  | (FormElement & FormInputGeneric & FormInputSpecific);

interface FormInputChoice {
  key: string;
  value: string | number | boolean;
}

interface FormElement {
  width?: "full" | "half" | "third" | "quarter" | "fifth";
  conditions?: FormCondition[];
}

interface FormCondition {
  key: string;
  value: string | number | boolean;
  // TODO: Add operator?: "==" | "!=" | ">" | "<" | ">=" | "<=";
}

interface FormInputGeneric {
  label?: string;
  key?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
}

type FormInputSpecific =
  | {
      type: "select";
      value?: string;
      choices?: FormInputChoice[];
    }
  | {
      type: "text" | "number" | "email" | "password" | "textarea";
      value?: string | number;
      placeholder?: string;
    };

type FormElementLayout =
  | {
      type: "page" | "section" | "description";
      content: string;
    }
  | {
      type: "clear";
    };

// Mockup form data to be replaced later
const form: Ref<Form> = ref({
  slug: "test",
  title: "Test Form Title",
  description: "Test Form Description",
  public: true,
  inputs: [
    // {
    //   type: "sectionTitle",
    //   label: "This is a section",
    //   width: "full",
    // },
    {
      type: "text",
      label: "Text",
      key: "text",
    },
    // {
    //   type: "number",
    //   label: "Number",
    //   key: "text",
    // },
    {
      type: "select",
      label: "Select",
      key: "text",
      choices: [
        {
          key: "1",
          value: "1",
        },
        {
          key: "2",
          value: "2",
        },
        {
          key: "3",
          value: "3",
        },
      ],
    },
    // {
    //   type: "clear",
    // },
    {
      type: "text",
      label: "Text",
      key: "text",
    },
  ],
});

// for (const input of form.inputs) {
//   if (input.key) {
//     formData.value[input.key] = "";
//   }
// }

setPageTitle(form.value.title);

if (!form.value.public) {
  requireAuth();
}

function submitForm() {
  if (form.value.submitMethod == "triggerFlow" && form.value.submitID) {
    directus.request(triggerFlow("POST", form.value.submitID, {}));
  } else {
    throw new Error("Invalid form configuration");
  }
}
</script>

<template>
  <CollectivoContainer>
    <div class="flex flex-wrap w-full">
      <template v-for="input in form.inputs" :key="input.key">
        <div v-if="input.type === 'clear'" class="element-full"></div>
        <div
          v-else
          class="input"
          :class="input.width === 'full' ? 'element-full' : 'element-split'"
        >
          <div
            v-if="input.type === 'section'"
            class="text-cv-primary font-semibold text-2xl leading-7"
          >
            {{ input.content }}
          </div>
          <div
            v-else-if="
              input.type === 'text' ||
              input.type === 'number' ||
              input.type === 'password'
            "
          >
            <CollectivoFormsInput
              v-model="input.value"
              :type="input.type"
              :label="input.label"
              :disabled="input.disabled"
            />
          </div>
          <div v-else-if="input.type === 'select'">
            <CollectivoFormsSelect
              v-model="input.value"
              :label="input.label"
              :options="input.choices"
              :disabled="input.disabled"
            />
          </div>
          <div v-else>ERROR: Invalid form element.</div>
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
          @click="submitForm"
        >
          {{ t("Submit") }}
        </UButton>
      </div>
    </div>
  </CollectivoContainer>
</template>

<style lang="scss" scoped>
.input {
  @apply px-2 py-3 lg:p-4;
}
.element-full {
  @apply basis-full;
}

.element-half {
  @apply basis-full md:basis-1/2;
}

.element-third {
  @apply basis-full md:basis-1/2 lg:basis-1/3;
}
.element-quarter {
  @apply basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4;
}

.element-fifth {
  @apply basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/5;
}
</style>
