// Create a migration for version 0.0.1 of the example extension
const migration = createMigration("example", "0.0.1", up, down);
export default migration;

// This function will be called when the migration is applied
async function up() {
  // This function applies a schema to the database
  await applySchema(schema);

  // Alternatively, you can also use the directus client directly
  // const directus = await useDirectus()
  // await directus.request(createCollection(...))
}

// This function will be called when the migration is rolled back
// Note: The function unapplySchema is still in development
async function down() {
  // unapplySchema(schema);
}

// This function creates an empty schema
// A schema can be used to declaratively define the structure of the database
const schema = initSchema();

// Here you can define collections for your database
// See https://docs.directus.io/reference/system/collections.html
schema.collections = [
  {
    collection: "examples",
    schema: {
      schema: "schema",
      name: "schema",
      comment: null,
    },
    meta: {},
  },
];

// Here you can define fields for your collections
// See https://docs.directus.io/reference/system/fields.html
schema.fields = [
  ...directusSystemFields("example"),
  {
    collection: "example",
    field: "example_field",
    type: "string",
    schema: {},
    meta: {},
  },
];

// Here you can define custom translations
// See https://docs.directus.io/reference/system/translations.html
schema.translations = [
  { language: "de-DE", key: "example", value: "Beispiel" },
];
