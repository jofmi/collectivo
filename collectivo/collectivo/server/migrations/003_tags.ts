const migration = createMigration("collectivo", "0.0.2", up, down);
export default migration;

async function up() {
  await applySchema(schema);
}

async function down() {
  // unapplySchema(schema);
}

const schema = initSchema();
const collection = "collectivo_tags";

schema.collections = [
  {
    collection: collection,
    schema: directusCollectionSchema(),
    meta: {
      icon: "sell",
      sort: 510,
      archive_field: "status",
      archive_value: "archived",
      unarchive_value: "published",
      display_template: "{{name}}",
      translations: [
        {
          language: "en-US",
          translation: "Tags",
          singular: "Tag",
          plural: "Tags",
        },
        {
          language: "de-DE",
          translation: "Tags",
          singular: "Tag",
          plural: "Tags",
        },
      ],
    },
  },
];

schema.fields = [
  directusNameField(collection),
  directusStatusField(collection),
  ...directusSystemFields(collection),
  {
    collection: collection,
    field: "description",
    type: "text",
    schema: {},
    meta: { interface: "input-multiline", sort: 20 },
  },
];

directusM2MRelation(schema, "collectivo_tags", "directus_users", {
  Collection2IsUUID: true,
  field1: {
    field: "directus_users",
    type: "alias",
    meta: {
      special: ["m2m"],
      sort: 30,
      interface: "list-m2m",
      translations: [
        { language: "en-US", translation: "Users" },
        { language: "de-DE", translation: "Benutzer*innen" },
      ],
      display: "related-values",
      display_options: {
        template:
          "{{directus_users_id.first_name}} {{directus_users_id.last_name}}",
      },
    },
  },
});
