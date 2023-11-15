const migration = createMigration("collectivo", "0.0.1", up, down);
export default migration;

async function up() {
  await applySchema(schema);
}

async function down() {
  // unapplySchema(schema);
}

const schema = initSchema();

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

directusM2ARelation(
  schema,
  "items",
  "collectivo_extensions",
  ["directus_fields", "directus_collections"],
  {
    collection: "collectivo_extensions",
    field: "items",
    type: "alias",
    meta: {
      id: 13,
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
    "collectivo_project_settings",
    "collectivo_extensions",
  ]) {
    schema.permissions.push({
      collection: collection,
      roleName: "collectivo_editor",
      action: action,
      fields: "*",
    });
  }
}
