const migration = createMigration("collectivo", "0.0.3", up, down);
export default migration;

async function up() {
  await applySchema(schema);
}

async function down() {
  // unapplySchema(schema);
}

const schema = initSchema();

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
    collection: "collectivo_settings_general",
    schema: {
      schema: "schema",
      name: "schema",
      comment: null,
    },
    meta: {
      icon: "settings",
      sort: 1,
      group: "collectivo_settings",
      singleton: true,
      translations: [
        {
          language: "en-US",
          translation: "Project settings",
          singular: "Project settings",
          plural: "Project settings",
        },
        {
          language: "de-DE",
          translation: "Projekteinstellungen",
          singular: "Projekteinstellungen",
          plural: "Projekteinstellungen",
        },
      ],
    },
  },
];

schema.fields = [
  {
    field: "collectivo_project_name",
    collection: "collectivo_settings",
    type: "string",
    meta: {
      sort: 2,
      hidden: false,
      translations: [
        { language: "en-US", translation: "Project name" },
        { language: "de-DE", translation: "Projektname" },
      ],
    },
    schema: {
      default_value: "Collectivo",
    },
  },
  {
    field: "collectivo_project_description",
    collection: "collectivo_settings",
    type: "string",
    meta: {
      sort: 3,
      hidden: false,
      translations: [
        { language: "en-US", translation: "Project description" },
        { language: "de-DE", translation: "Projektbeschreibung" },
      ],
    },
  },
];
