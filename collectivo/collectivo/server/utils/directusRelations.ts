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

interface M2MSettings {
  Collection1IsUUID?: boolean;
  Collection2IsUUID?: boolean;
  createField2?: boolean; // default true
  field1?: NestedPartial<DirectusField<any>>;
  field2?: NestedPartial<DirectusField<any>>;
}

export async function directusM2MRelation(
  schema: ExtensionSchema,
  Collection1: string,
  Collection2: string,
  settings?: M2MSettings
) {
  const m2mCollection = `${Collection1}_${Collection2}`;

  const aliasFieldName1 = settings?.field1?.field || Collection2;
  const aliasFieldName2 =
    settings?.createField2 !== false
      ? settings?.field2?.field || Collection1
      : null;

  // Create alias field in Collection 1
  schema.fields.push({
    collection: Collection1,
    field: aliasFieldName1,
    type: "alias",
    ...settings?.field1,
    meta: {
      interface: "list-m2m",
      special: ["m2m"],
      ...settings?.field1?.meta,
    },
  });

  // Optional: Create alias field in Collection2
  if (aliasFieldName2) {
    schema.fields.push({
      collection: Collection2,
      field: aliasFieldName2,
      type: "alias",
      ...settings?.field2,
      meta: {
        interface: "list-m2m",
        special: ["m2m"],
        ...settings?.field2?.meta,
      },
    });
  }

  schema.collections.push({
    collection: m2mCollection,
    meta: { hidden: true, icon: "import_export" },
    schema: directusCollectionSchema(),
  });
  schema.fields.push({
    collection: m2mCollection,
    field: `${Collection1}_id`, // tags
    type: settings?.Collection1IsUUID === true ? "uuid" : "integer",
    meta: { hidden: true },
  });
  schema.fields.push({
    collection: m2mCollection,
    field: `${Collection2}_id`, // members
    type: settings?.Collection2IsUUID === true ? "uuid" : "integer",
    schema: {},
    meta: { hidden: true },
  });

  schema.relations.push({
    collection: m2mCollection,
    field: `${Collection1}_id`,
    related_collection: Collection1,
    meta: {
      one_field: aliasFieldName1,
      sort_field: null,
      one_deselect_action: "nullify",
      junction_field: `${Collection2}_id`,
    },
    schema: { on_delete: "SET NULL" },
  });
  schema.relations.push({
    collection: m2mCollection,
    field: `${Collection2}_id`,
    related_collection: Collection2,
    meta: {
      one_field: aliasFieldName2,
      sort_field: null,
      one_deselect_action: "nullify",
      junction_field: `${Collection1}_id`,
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
