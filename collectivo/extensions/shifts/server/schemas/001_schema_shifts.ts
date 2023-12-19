// This function creates an empty schema for version 0.0.1 of the shifts extension
// A schema can be used to declaratively define the structure of the database
const schema = initSchema("shifts", "0.0.1");

export default schema;

// Here you can define collections for your database
// See https://docs.directus.io/reference/system/collections.html
schema.collections = [
  {
    collection: "shifts",
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
  ...directusSystemFields("shifts"),
  {
    collection: "shifts",
    field: "example_field",
    type: "string",
    schema: {},
    meta: {},
  },
];

// Here you can define custom translations
// See https://docs.directus.io/reference/system/translations.html
schema.translations = [
  { language: "de-DE", key: "shifts", value: "Beispiel" },
];

// To create relations, you can use the following helper functions
// schema.createM2ORelation();
// schema.createM2MRelation();
// schema.createM2ARelation();
