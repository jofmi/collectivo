// This function creates an empty schema for version 0.0.1 of the shifts extension
// A schema can be used to declaratively define the structure of the database
const schema = initSchema("shifts", "0.0.1");

export default schema;

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
  {
    collection: "slots",
    schema: {
      schema: "schema",
      name: "schema",
      comment: null,
    },
    meta: {},
  },
  {
    collection: "skills",
    schema: {
      schema: "schema",
      name: "schema",
      comment: null,
    },
    meta: {},
  },
  {
    collection: "assignments",
    schema: {
      schema: "schema",
      name: "schema",
      comment: null,
    },
    meta: {},
  },
];

schema.fields = [
  ...directusSystemFields("shifts"),
  {
    collection: "shifts",
    field: "name",
    type: "string",
    schema: {},
    meta: {},
  },
  {
    collection: "shifts",
    field: "start_datetime",
    type: "dateTime",
    schema: {"is_nullable": false,},
    meta: {},
  },
  {
    collection: "shifts",
    field: "end_datetime",
    type: "dateTime",
    schema: {"is_nullable": false,},
    meta: {},
  },
  ...directusSystemFields("slots"),
  {
    collection: "slots",
    field: "name",
    type: "string",
    schema: {},
    meta: {},
  },
  ...directusSystemFields("skills"),
  {
    collection: "skills",
    field: "name",
    type: "string",
    schema: {},
    meta: {},
  },
  ...directusSystemFields("assignments"),
  {
    collection: "assignments",
    field: "from",
    type: "date",
    schema: {},
    meta: {},
  },
  {
    collection: "assignments",
    field: "to",
    type: "date",
    schema: {},
    meta: {},
  },
];

schema.createO2MRelation("slots", "shifts", "shift")
schema.createM2MRelation("skills", "slots")
schema.createO2MRelation("assignments", "slots", "slot")
schema.createO2MRelation("assignments", "directus_users", "user")