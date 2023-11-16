const extension = "collectivo";
const schema = initSchema(extension);
const migration = createMigration("collectivo", "0.0.4", up, down);
export default migration;

async function up() {
  await schema.apply();
}

async function down() {
  await schema.rollBack();
}

const collection = "collectivo_tiles";

schema.collections = [
  {
    collection: collection,
    schema: directusCollectionSchema(),
    meta: {
      icon: "dashboard",
      sort: 520,
      archive_field: "status",
      archive_value: "archived",
      sort_field: "sort",
      unarchive_value: "published",
      translations: [
        {
          language: "en-US",
          translation: "Tiles",
          singular: "Tile",
          plural: "Tiles",
        },
        {
          language: "de-DE",
          translation: "Kacheln",
          singular: "Kachel",
          plural: "Kacheln",
        },
      ],
    },
  },
];

schema.fields = [
  directusNameField(collection),
  directusSortField(collection),
  directusStatusField(collection),
  ...directusSystemFields(collection),
  {
    collection: collection,
    field: "content",
    type: "text",
    schema: {},
    meta: {
      sort: 3,
      interface: "input-rich-text-md",
      options: {
        toolbar: [
          "heading",
          "bold",
          "italic",
          "strikethrough",
          "blockquote",
          "bullist",
          "numlist",
          "table",
          "code",
          "link",
          "empty",
        ],
        translations: [
          { language: "en-US", translation: "Content" },
          { language: "de-DE", translation: "Inhalt" },
        ],
      },
    },
  },
];

schema.permissions = [
  {
    roleName: "collectivo_user",
    collection: collection,
    action: "read",
    fields: "*",
    permissions: {},
    validation: {},
  },
];

for (const action of ["read", "update", "create", "delete"]) {
  schema.permissions.push({
    collection: collection,
    roleName: "collectivo_editor",
    action: action,
    fields: "*",
  });
}
