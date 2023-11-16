const extension = "collectivo";
const schema = initSchema(extension);
const migration = createMigration(extension, "0.0.1", up, down);
export default migration;

async function up() {
  await schema.apply();
}

async function down() {
  await schema.rollBack();
}

schema.roles = [
  {
    name: "collectivo_user",
    app_access: false,
    admin_access: false,
  },
  {
    name: "collectivo_editor",
    app_access: true,
    admin_access: false,
  },
  {
    name: "collectivo_admin",
    app_access: true,
    admin_access: true,
  },
];

schema.collections = [
  {
    collection: "collectivo_settings",
    meta: {
      icon: "settings",
      sort: 1000,
      singleton: true,
      translations: [
        {
          language: "en-US",
          translation: "Settings",
          singular: "Settings",
          plural: "Settings",
        },
        {
          language: "de-DE",
          translation: "Einstellungen",
          singular: "Einstellungen",
          plural: "Einstellungen",
        },
      ],
    },
  },
  {
    collection: "collectivo_extensions",
    schema: { name: "schema", comment: null },
    meta: {
      sort: 90,
      group: "collectivo_settings",
      icon: "extension",
      translations: [
        {
          language: "en-US",
          translation: "Extensions",
          singular: "Extension",
          plural: "Extensions",
        },
        {
          language: "de-DE",
          translation: "Erweiterungen",
          singular: "Erweiterung",
          plural: "Erweiterungen",
        },
      ],
    },
  },
];

schema.fields = [
  {
    collection: "collectivo_extensions",
    field: "name",
    type: "string",
    schema: { is_unique: true, is_nullable: false },
    meta: {
      required: true,
      readonly: true,
      width: "half",
      sort: 1,
      translations: [
        { language: "en-US", translation: "Name" },
        { language: "de-DE", translation: "Name" },
      ],
    },
  },
  {
    collection: "collectivo_extensions",
    field: "status",
    type: "string",
    meta: {
      width: "half",
      readonly: true, // Remove this once there is a way to deactivate exts
      sort: 2,
      options: {
        choices: [
          { text: "$t:active", value: "active" },
          { text: "$t:disabled", value: "disabled" },
        ],
      },
      interface: "select-dropdown",
      display: "labels",
      display_options: {
        choices: [
          {
            text: "$t:active",
            value: "active",
            foreground: "#FFFFFF",
            background: "#26A269",
          },
          {
            text: "$t:disabled",
            value: "disabled",
            foreground: "#18222F",
            background: "#D3DAE4",
          },
        ],
      },
      translations: [
        { language: "en-US", translation: "Status" },
        { language: "de-DE", translation: "Status" },
      ],
    },
    schema: { default_value: "active", is_nullable: false },
  },
  {
    collection: "collectivo_extensions",
    field: "version",
    type: "string",
    meta: {
      translations: [
        { language: "en-US", translation: "Version" },
        { language: "de-DE", translation: "Version" },
      ],
      required: true,
      readonly: true,
      sort: 4,
      note: "Semantic version of the extension (e.g. 1.0.0)",
    },
  },
  {
    collection: "collectivo_extensions",
    field: "migration",
    type: "string",
    meta: {
      translations: [
        { language: "en-US", translation: "Migration" },
        { language: "de-DE", translation: "Migration" },
      ],
      required: true,
      readonly: true,
      sort: 4,
      note: "Semantic version of the extensions latest migration (e.g. 1.0.0)",
    },
  },
];

schema.createM2ARelation(
  "items",
  "collectivo_extensions",
  [
    "directus_fields",
    "directus_collections",
    "directus_permissions",
    "directus_translations",
  ],
  {
    collection: "collectivo_extensions",
    field: "items",
    type: "alias",
    meta: {
      collection: "collectivo_extensions",
      field: "items",
      special: ["m2a"],
      interface: "list-m2a",
      options: { enableSelect: false, enableCreate: false },
      display: "related-values",
      display_options: {
        template: "{{collection}}",
      },
      readonly: true,
      hidden: false,
      translations: [
        { language: "en-US", translation: "Items" },
        { language: "de-DE", translation: "Einträge" },
      ],
    },
  }
);

for (const action of ["read"]) {
  for (const collection of [
    // "collectivo_settings",
    "collectivo_extensions",
    "collectivo_extensions_items",
    "directus_roles",
  ]) {
    schema.permissions.push({
      collection: collection,
      roleName: "collectivo_editor",
      action: action,
      fields: "*",
    });
  }
}

const editor_fields = [
  "first_name",
  "last_name",
  "email",
  "title",
  "description",

  "admin_divider",
  "role",
  "status",
  "id",
];

schema.permissions.push(
  {
    collection: "directus_users",
    roleName: "collectivo_editor",
    action: "read",
    // @ts-ignore
    fields: editor_fields,
    override: true,
  },
  {
    collection: "directus_users",
    roleName: "collectivo_editor",
    action: "update",
    // @ts-ignore
    fields: editor_fields,
    permissions: {},
    override: true,
  }
);
