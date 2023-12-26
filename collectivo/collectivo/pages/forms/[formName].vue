<script setup lang="ts">
import { triggerFlow } from "@directus/sdk";
import {
  object,
  string,
  number,
  boolean,
  type InferType,
  type Schema as YupSchema,
} from "yup";
import type { FormErrorEvent, FormSubmitEvent } from "#ui/types";

const toast = useToast();
const route = useRoute();
const forms = useCollectivoForms();
const { t } = useI18n();

// Form name is used to load form data
const formName = route.params.formName;
const directus = useDirectus();

// Do not allow unregistered forms
// TODO: Fatal not working, no forward to 404
if (typeof formName !== "string" || !forms.value[formName]) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    // fatal: true,
  });
}

const form = forms.value[formName];

setCollectivoPageTitle(form.title);

if (!form.public) {
  requireAuth();
}

function checkConditions(conditions: FormCondition[] | undefined) {
  if (!conditions) {
    return true;
  }

  for (const condition of conditions) {
    if (state[condition.key] !== condition.value) {
      return false;
    }
  }

  return true;
}

// Compute visibility of fields
for (const [_, field] of Object.entries(form.fields)) {
  if (field.conditions) {
    field.visible = computed(() => {
      return checkConditions(field.conditions);
    });
  }
}

const state: { [key: string]: any } = reactive({});
let schema = object();

function addInputToSchema(
  key: string,
  input: FormInput,
  schema_field: YupSchema,
) {
  if (input.required) {
    schema_field = schema_field.required("This field is required");
  }

  // Create a conditional schema field
  // If the condition is met, use the original schema field
  // If the condition is not met, use a hidden schema field
  if (input.conditions && input.conditions.length > 0) {
    const schema_field_with_conditions = object().when(
      input.conditions.map((c) => c.key),
      (_, schema_field_hidden) => {
        if (checkConditions(input.conditions)) {
          return schema_field;
        } else {
          return schema_field_hidden.strip();
        }
      },
    );

    schema = schema.shape({ [key]: schema_field_with_conditions });
  } else {
    schema = schema.shape({ [key]: schema_field });
  }

  state[key] = input.default ?? undefined;
}

function valString(validators: FormValidator[] | undefined) {
  let schema = string();

  for (const validator of validators ?? []) {
    if (validator.type === "min") {
      schema = schema.min(validator.value as number);
    } else if (validator.type === "max") {
      schema = schema.max(validator.value as number);
    } else if (validator.type === "email") {
      schema = schema.email();
    } else if (validator.type === "url") {
      schema = schema.url();
    } else if (validator.type === "regex") {
      schema = schema.matches(validator.value as RegExp);
    }
  }

  return schema;
}

function valNumber(validators: FormValidator[] | undefined) {
  let schema = number();

  for (const validator of validators ?? []) {
    if (validator.type === "min") {
      schema = schema.min(validator.value as number);
    } else if (validator.type === "max") {
      schema = schema.max(validator.value as number);
    }
  }

  return schema;
}

// Define state and schema from form object
for (const [key, input] of Object.entries(form.fields)) {
  if (input.type === "text" || input.type === "password") {
    addInputToSchema(key, input, valString(input.validators));
  } else if (input.type === "email") {
    input.validators = input.validators ?? [];
    input.validators.push({ type: "email" });
    addInputToSchema(key, input, valString(input.validators));
  } else if (input.type === "number") {
    addInputToSchema(key, input, valNumber(input.validators));
  } else if (input.type === "select") {
    addInputToSchema(key, input, valString(input.validators));
  } else if (input.type === "checkbox") {
    addInputToSchema(key, input, boolean());
  }
}

type Schema = InferType<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // TODO: Do something with data
  //   if (form.submitMethod == "triggerFlow" && form.submitID) {
  //     directus.request(triggerFlow("POST", form.submitID, {}));
  //   } else {
  //     throw new Error("Invalid form configuration");
  //   }
  console.error("Not implemented", event.data);
}

async function onError(event: FormErrorEvent) {
  toast.add({
    title: t("Some fields are not filled in correctly"),
    icon: "i-mi-warning",
    color: "red",
    timeout: 0,
  });

  const element = document.getElementById(event.errors[0].id);
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
}
</script>

<template>
  <CollectivoContainer>
    <UForm
      :schema="schema"
      :state="state"
      class="flex flex-wrap w-full"
      @submit="onSubmit"
      @error="onError"
    >
      <template v-for="(input, key) in form.fields" :key="key">
        <template v-if="typeof key === 'string' && (input.visible ?? true)">
          <div
            v-if="input.type === 'section'"
            class="text-cv-primary font-semibold text-2xl leading-7 element-full"
          >
            {{ input.content }}
          </div>
          <div v-else-if="input.type === 'description'" class="element-full">
            {{ input.content }}
          </div>
          <component
            :is="input.component"
            v-else-if="input.type === 'custom'"
            :class="input.width ? `element-${input.width}` : 'element-full'"
            :input="input"
            :state="state"
          >
          </component>
          <div v-else-if="input.type === 'clear'" class="basis-full"></div>
          <div
            v-else
            :class="input.width ? `element-${input.width}` : 'element-1/4'"
          >
            <UFormGroup
              v-if="input.type === 'text'"
              :label="input.label"
              :name="key"
            >
              <UInput v-model="state[key]" :placeholder="input.placeholder">
                <template v-if="input.icon" #trailing>
                  <UIcon :name="input.icon" />
                </template>
              </UInput>
            </UFormGroup>
            <UFormGroup
              v-else-if="input.type === 'email'"
              :label="input.label"
              :name="key"
            >
              <UInput v-model="state[key]" :placeholder="input.placeholder">
                <template v-if="input.icon" #trailing>
                  <UIcon :name="input.icon" />
                </template>
              </UInput>
            </UFormGroup>
            <UFormGroup
              v-else-if="input.type === 'password'"
              :label="input.label"
              :name="key"
            >
              <UInput
                v-model="state[key]"
                type="password"
                :placeholder="input.placeholder"
              >
                <template v-if="input.icon" #trailing>
                  <UIcon :name="input.icon" />
                </template>
              </UInput>
            </UFormGroup>
            <UFormGroup
              v-else-if="input.type === 'number'"
              :label="input.label"
              :name="key"
              :placeholder="input.placeholder"
            >
              <UInput v-model="state[key]" type="number" />
            </UFormGroup>
            <UFormGroup
              v-if="input.type === 'textarea'"
              :label="input.label"
              :name="key"
            >
              <UTextarea
                v-model="state[key]"
                resize
                :placeholder="input.placeholder"
              />
            </UFormGroup>
            <UFormGroup
              v-else-if="input.type === 'select-radio'"
              :label="input.label"
              :name="key"
            >
              <URadioGroup v-model="state[key]" :options="input.choices" />
            </UFormGroup>
            <UFormGroup
              v-else-if="input.type === 'multiselect-checkbox'"
              :label="input.label"
              :name="key"
            >
              <CollectivoFormsCheckboxGroup
                v-model="state[key]"
                :choices="input.choices"
              />
            </UFormGroup>
            <UFormGroup
              v-else-if="input.type === 'date'"
              :label="input.label"
              :name="key"
            >
              <CollectivoFormsDate v-model="state[key]"></CollectivoFormsDate>
            </UFormGroup>
            <UFormGroup
              v-else-if="input.type === 'toggle'"
              :label="input.label"
              :name="key"
            >
              <UToggle v-model="state[key]" />
            </UFormGroup>
            <UFormGroup
              v-else-if="input.type === 'custom-input'"
              :label="input.label"
              :name="key"
            >
              <component :is="input.component" v-model="state[key]" />
            </UFormGroup>
          </div>
        </template>
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
          type="submit"
        >
          {{ t("Submit") }}
        </UButton>
      </div>
    </UForm>
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
