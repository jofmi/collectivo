import {
  DirectusFlow,
  DirectusOperation,
  DirectusPermission,
  createItem,
  readItems,
  updateItem,
} from "@directus/sdk";
import { compareVersions } from "compare-versions";
import {
  DirectusCollection,
  DirectusField,
  DirectusRelation,
  DirectusRole,
  NestedPartial,
} from "@directus/sdk";
import { createOrUpdateDirectusRole } from "./directusQueries";
import { ExtensionConfig } from "./extensions";

export interface ExtensionSchema {
  collections: NestedPartial<DirectusCollection<any>>[];
  fields: NestedPartial<DirectusField<any>>[];
  relations: NestedPartial<DirectusRelation<any>>[];
  roles: NestedPartial<DirectusRole<any>>[];
  permissions: NestedPartial<DirectusPermission<any>>[];
  flows: NestedPartial<DirectusFlow<any>>[];
  operations: NestedPartial<DirectusOperation<any>>[];
  translations: any[];
  custom: (() => Promise<void>)[];
}

export function initSchema(): ExtensionSchema {
  return {
    collections: [],
    fields: [],
    relations: [],
    roles: [],
    permissions: [],
    flows: [],
    operations: [],
    translations: [],
    custom: [],
  } as ExtensionSchema;
}

export function combineSchemas(...schemas: ExtensionSchema[]) {
  const combinedSchema = initSchema();
  for (const schema of schemas) {
    combinedSchema.collections.push(...schema.collections);
    combinedSchema.fields.push(...schema.fields);
    combinedSchema.roles.push(...schema.roles);
    combinedSchema.relations.push(...schema.relations);
    combinedSchema.permissions.push(...schema.permissions);
    combinedSchema.flows.push(...schema.flows);
    combinedSchema.operations.push(...schema.operations);
    combinedSchema.translations.push(...schema.translations);
    combinedSchema.custom.push(...schema.custom);
  }
  return combinedSchema;
}

// Run the actual schema migration
export async function applySchema(schema: ExtensionSchema, extension?: string) {
  for (const collection of schema.collections) {
    await createOrUpdateDirectusCollection(collection, [], [], extension);
  }
  for (const field of schema.fields) {
    if (!field.collection) {
      throw new Error("Field collection is required");
    }
    await createOrUpdateDirectusField(field, extension);
  }
  for (const relation of schema.relations) {
    await createOrUpdateDirectusRelation(relation, extension);
  }
  for (const role of schema.roles) {
    await createOrUpdateDirectusRole(role, extension);
  }
  for (const permission of schema.permissions) {
    await createOrUpdateDirectusPermission(permission, extension);
  }
  for (const translation of schema.translations) {
    await createOrUpdateDirectusTranslation(translation);
  }
}
