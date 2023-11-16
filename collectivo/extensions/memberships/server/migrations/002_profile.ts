const extension = "memberships";
const schema = initSchema(extension);
const migration = createMigration(extension, "0.0.2", up, down);
export default migration;

async function up() {
  await schema.apply();
}

async function down() {
  await schema.rollBack();
}

schema.collections = [];

schema.fields = [
  // Groups
  {
    collection: "directus_users",
    field: "memberships_profile_group",
    type: "alias",
    meta: {
      order: 200,
      interface: "group-detail",
      special: ["alias", "no-data", "group"],
      options: { title: "$t:person", headerIcon: "account_circle" },
      translations: [
        { language: "de-DE", translation: "Profil" },
        { language: "en-US", translation: "Profile" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "memberships_organization_group",
    type: "alias",
    meta: {
      order: 300,
      interface: "group-detail",
      special: ["alias", "no-data", "group"],
      options: { title: "$t:organization", headerIcon: "store" },
      translations: [
        { language: "de-DE", translation: "Organisation" },
        { language: "en-US", translation: "Organization" },
      ],
      conditions: [
        // @ts-ignore
        {
          name: "Hide if not organization",
          rule: { _and: [{ memberships_is_organisation: { _eq: false } }] },
          hidden: true,
        },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "memberships_address_group",
    type: "alias",
    meta: {
      order: 400,
      interface: "group-detail",
      special: ["alias", "no-data", "group"],
      options: { title: "$t:address", headerIcon: "house" },
      translations: [
        { language: "de-DE", translation: "Adresse" },
        { language: "en-US", translation: "Address" },
      ],
    },
  },

  // Profile fields
  {
    collection: "directus_users",
    field: "memberships_phone",
    type: "string",
    meta: {
      group: "memberships_profile_group",
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
      group: "memberships_profile_group",
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
      group: "memberships_profile_group",
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
      group: "memberships_profile_group",
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
  {
    collection: "directus_users",
    field: "memberships_is_organisation",
    type: "boolean",
    schema: { default_value: false, is_nullable: false },
    meta: {
      group: "memberships_profile_group",
      interface: "boolean",
      special: ["cast-boolean"],
      required: true,
      translations: [
        { language: "de-DE", translation: "Ist Organisation" },
        { language: "en-US", translation: "Is organization" },
      ],
    },
  },

  // Profile fields
  {
    collection: "directus_users",
    field: "memberships_street",
    type: "string",
    meta: {
      group: "memberships_address_group",
      sort: 1,
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
      group: "memberships_address_group",
      sort: 2,
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
      group: "memberships_address_group",
      sort: 3,
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
      group: "memberships_address_group",
      sort: 4,
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
      group: "memberships_address_group",
      sort: 5,
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
      group: "memberships_address_group",
      sort: 6,
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Stadt" },
        { language: "en-US", translation: "City" },
      ],
      options: {
        iconRight: "location_city",
      },
    },
  },
  {
    collection: "directus_users",
    field: "memberships_country",
    type: "string",
    meta: {
      group: "memberships_address_group",
      sort: 7,
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Land" },
        { language: "en-US", translation: "Country" },
      ],
      options: {
        iconRight: "globe_asia",
      },
    },
  },

  // Organization fields
  {
    collection: "directus_users",
    field: "memberships_organization_name",
    type: "string",
    meta: {
      group: "memberships_organization_group",
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Organisation Name" },
        { language: "en-US", translation: "Organization Name" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "memberships_organization_id",
    type: "string",
    meta: {
      group: "memberships_organization_group",
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Organisation ID" },
        { language: "en-US", translation: "Organization ID" },
      ],
    },
  },
  {
    collection: "directus_users",
    field: "memberships_organization_type",
    type: "string",
    meta: {
      group: "memberships_organization_group",
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Organisation Typ" },
        { language: "en-US", translation: "Organization Type" },
      ],
    },
  },
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
