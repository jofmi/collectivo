const schema = initSchema("payments", "0.0.1");

export default schema;

schema.collections = [];

schema.fields = [
  {
    collection: "directus_users",
    field: "payments_profile_group",
    type: "alias",
    meta: {
      order: 200,
      interface: "group-detail",
      special: ["alias", "no-data", "group"],
      options: { title: "$t:person", headerIcon: "account_circle" },
      translations: [
        { language: "de-DE", translation: "Zahlungsdaten" },
        { language: "en-US", translation: "Payment data" },
      ],
    },
  },
];

schema.relations = [];

const editor_fields: string[] = [];

const user_fields: string[] = [];

schema.permissions = [
  {
    collection: "directus_users",
    roleName: "collectivo_editor",
    action: "read",
    fields: user_fields,
  },
  {
    collection: "directus_users",
    roleName: "collectivo_editor",
    action: "update",

    fields: editor_fields,
  },
];
