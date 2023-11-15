const migration = createMigration("memberships", "0.0.2", up, down);
export default migration;

async function up() {
  await applySchema(schema);
}

async function down() {
  // unapplySchema(schema);
}

const schema = initSchema();

schema.collections = [];

schema.fields = [
  {
    collection: "directus_users",
    field: "memberships_address_divider",
    type: "alias",
    meta: {
      interface: "presentation-divider",
      special: ["alias", "no-data"],
      options: { title: "Address", icon: "house" },
    },
  },
  {
    collection: "directus_users",
    field: "memberships_street",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Straße" },
        { language: "en-US", translation: "Street" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "memberships_number",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Nummer" },
        { language: "en-US", translation: "Number" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "memberships_stair",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Stiege" },
        { language: "en-US", translation: "Stair" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "memberships_door",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Tür" },
        { language: "en-US", translation: "Door" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "memberships_postcode",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Postleitzahl" },
        { language: "en-US", translation: "Postcode" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "memberships_city",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Stadt" },
        { language: "en-US", translation: "City" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "memberships_country",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Land" },
        { language: "en-US", translation: "Country" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "memberships_phone",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Telefon" },
        { language: "en-US", translation: "Phone" },
      ],
    },
  },
  {
    field: "memberships_birthday",
    type: "date",
    meta: {
      interface: "datetime",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Geburtstag" },
        { language: "en-US", translation: "Birthday" },
      ],
    },
    collection: "directus_users",
  },
  {
    collection: "directus_users",
    field: "memberships_occupation",
    type: "string",
    meta: {
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Beruf" },
        { language: "en-US", translation: "Occupation" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "memberships_gender",
    type: "string",
    meta: {
      interface: "select-dropdown",
      display: "labels",
      width: "half",
      options: {
        choices: [
          { text: "$t:diverse", value: "diverse" },
          { text: "$t:female", value: "female" },
          { text: "$t:male", value: "male" },
        ],
      },
      translations: [
        { language: "de-DE", translation: "Geschlecht" },
        { language: "en-US", translation: "Gender" },
      ],
    },
  },
  // {
  //   collection: "directus_users",
  //   field: "memberships_is_organisation",
  //   type: "string",
  //   meta: {
  //     interface: "select-dropdown",
  //     display: "labels",
  //     width: "half",
  //     options: {
  //       choices: [
  //         { text: "$t:natural", value: "natural" },
  //         { text: "$t:legal", value: "legal" },
  //       ],
  //     },
  //   },
  // },
];

schema.relations = [];

const editor_fields = [
  "memberships_birthday",
  "memberships_number",
  "memberships_address_divider",
  "memberships_stair",
  "memberships_door",
  "memberships_postcode",
  "memberships_city",
  "preferences_divider",
  "language",
  "memberships_country",
  "description",
  "first_name",
  "collectivo_tags",
  "last_name",
  "memberships_street",
  "divider-p49cum",
  "email",
  "memberships_occupation",
  "memberships_gender",
  "role",
  "admin_divider",
  "id",
];

schema.permissions = [
  {
    collection: "directus_users",
    roleName: "collectivo_editor",
    action: "read",
    // @ts-ignore
    fields: editor_fields,
  },
  {
    collection: "directus_users",
    roleName: "collectivo_editor",
    action: "update",
    // @ts-ignore
    fields: editor_fields,
  },
];
