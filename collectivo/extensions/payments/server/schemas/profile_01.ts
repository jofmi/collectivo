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
      options: { title: "$t:person", headerIcon: "credit_card" },
      translations: [
        { language: "de-DE", translation: "Zahlungsdaten" },
        { language: "en-US", translation: "Payment data" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "payments_type",
    type: "string",
    meta: {
      group: "payments_profile_group",
      interface: "select-dropdown",
      display: "labels",
      width: "half",
      options: {
        choices: [
          { text: "$t:sepa", value: "sepa" },
          { text: "$t:transfer", value: "transfer" },
        ],
      },
      translations: [
        { language: "de-DE", translation: "Zahlungsweise" },
        { language: "en-US", translation: "Payment type" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "payments_account_iban",
    type: "string",
    meta: {
      group: "payments_profile_group",
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Konto IBAN" },
        { language: "en-US", translation: "Account IBAN" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "payments_account_owner",
    type: "string",
    meta: {
      group: "payments_profile_group",
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Konto Inhaber*in" },
        { language: "en-US", translation: "Account Owner" },
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

schema.translations = [
  { language: "de-DE", key: "sepa", value: "SEPA Einzug" },
  { language: "de-DE", key: "transfer", value: "Überweisung" },
  { language: "en-US", key: "sepa", value: "SEPA Debit" },
  { language: "en-US", key: "transfer", value: "Transfer" },
];
