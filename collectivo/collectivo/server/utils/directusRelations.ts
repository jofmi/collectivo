import { DirectusField, NestedPartial } from "@directus/sdk";

export async function directusO2MRelation(
  schema: ExtensionSchema,
  CollectionOne: string,
  CollectionMany: string,
  ForeignKey: string
) {
  schema.fields.push({
    collection: CollectionOne,
    field: ForeignKey,
    type: "integer",
    schema: {},
    meta: { interface: "select-dropdown-m2o", special: ["m2o"] },
  });
  schema.relations.push({
    collection: CollectionOne,
    field: ForeignKey,
    related_collection: CollectionMany,
    meta: { sort_field: null },
    schema: { on_delete: "SET NULL" },
  });
}

// Settings to create M2M relations
// Field 2 is optional, but if it exists, it will be created in Collection 2
// M2M Field type is "integer" by default, but some collections are "uuid"
interface directusM2MSettings {
  field1?: NestedPartial<DirectusField<any>>;
  field2?: NestedPartial<DirectusField<any>> | boolean;
  m2mFieldType1?: string;
  m2mFieldType2?: string;
}

export async function directusM2MRelation(
  schema: ExtensionSchema,
  collection1: string,
  collection2: string,
  settings?: directusM2MSettings
) {
  // Prepare inputs
  const field1 = settings?.field1 || {};
  const field2 =
    settings?.field2 && typeof settings?.field2 !== "boolean"
      ? settings?.field2
      : {};
  const field1Name = settings?.field1?.field || collection2;
  const field2Name = field2 ? field2.field || collection1 : null;
  const m2mCollectionName = `${collection1}_${collection2}`;

  // Create alias field in Collection 1
  schema.fields.push({
    collection: collection1,
    field: field1Name,
    type: "alias",
    ...field1,
    meta: {
      interface: "list-m2m",
      special: ["m2m"],
      ...field1?.meta,
    },
  });

  // Optional: Create alias field in collection2
  if (field2Name) {
    schema.fields.push({
      collection: collection2,
      field: field2Name,
      type: "alias",
      ...field2,
      meta: {
        interface: "list-m2m",
        special: ["m2m"],
        ...field2.meta,
      },
    });
  }

  schema.collections.push({
    collection: m2mCollectionName,
    meta: { hidden: true, icon: "import_export" },
    schema: directusCollectionSchema(),
  });
  schema.fields.push({
    collection: m2mCollectionName,
    field: `${collection1}_id`,
    type: settings?.m2mFieldType1 ? settings?.m2mFieldType1 : "integer",
    meta: { hidden: true },
  });
  schema.fields.push({
    collection: m2mCollectionName,
    field: `${collection2}_id`,
    type: settings?.m2mFieldType2 ? settings?.m2mFieldType2 : "integer",
    schema: {},
    meta: { hidden: true },
  });

  schema.relations.push({
    collection: m2mCollectionName,
    field: `${collection1}_id`,
    related_collection: collection1,
    meta: {
      one_field: field1Name,
      sort_field: null,
      one_deselect_action: "nullify",
      junction_field: `${collection2}_id`,
    },
    schema: { on_delete: "SET NULL" },
  });
  schema.relations.push({
    collection: m2mCollectionName,
    field: `${collection2}_id`,
    related_collection: collection2,
    meta: {
      one_field: field2Name,
      sort_field: null,
      one_deselect_action: "nullify",
      junction_field: `${collection1}_id`,
    },
    schema: { on_delete: "SET NULL" },
  });
}

export async function directusM2ARelation(
  schema: ExtensionSchema,
  aliasFieldName: string,
  MCollection: string,
  ACollections: string[],
  aliasField?: NestedPartial<DirectusField<any>>
) {
  const m2aCollection = `${MCollection}_${aliasFieldName}`;
  const m2aCollectionIdFieldName = `${MCollection}_id`;
  const field = aliasField || {
    field: aliasFieldName,
    type: "alias",
    meta: { interface: "list-m2a", special: ["m2a"] },
    collection: MCollection,
  };
  schema.fields.push(field);
  schema.collections.push({
    collection: m2aCollection,
    meta: { hidden: true, icon: "import_export" },
    schema: { schema: m2aCollection, name: m2aCollection, comment: null },
  });
  schema.fields.push({
    collection: m2aCollection,
    field: m2aCollectionIdFieldName,
    type: "integer",
    meta: { hidden: true },
  });
  schema.fields.push({
    collection: m2aCollection,
    field: "item",
    type: "string",
    schema: {},
    meta: { hidden: true },
  });
  schema.fields.push({
    collection: m2aCollection,
    field: "collection",
    type: "string",
    schema: {},
    meta: { hidden: true },
  });
  schema.relations.push({
    collection: m2aCollection,
    field: "item",
    meta: {
      one_field: null,
      sort_field: null,
      one_deselect_action: "nullify",
      // @ts-ignore
      one_allowed_collections: ACollections,
      one_collection_field: "collection",
      junction_field: m2aCollectionIdFieldName,
    },
  });
  schema.relations.push({
    collection: m2aCollection,
    field: m2aCollectionIdFieldName,
    related_collection: MCollection,
    meta: {
      one_field: aliasFieldName,
      sort_field: null,
      one_deselect_action: "nullify",
      junction_field: "item",
    },
    schema: { on_delete: "SET NULL" },
  });
}
