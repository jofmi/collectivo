const migration = createMigration("memberships", "0.0.1", up, down);
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
    collection: "memberships",
    schema: {
      schema: "schema",
      name: "schema",
      comment: null,
    },
    meta: {
      sort: 100,
      icon: "switch_account",
      archive_field: "status",
      archive_value: "ended",
      unarchive_value: "draft",
      display_template: "{{user}} - {{type}}",
      translations: [
        {
          language: "en-US",
          translation: "Memberships",
          singular: "Membership",
          plural: "Memberships",
        },
        {
          language: "de-DE",
          translation: "Mitgliedschaften",
          singular: "Mitgliedschaft",
          plural: "Mitgliedschaften",
        },
      ],
    },
  },
  {
    collection: "memberships_types",
    schema: {
      schema: "schema",
      name: "schema",
      comment: null,
    },
    meta: {
      sort: 10,
      group: "collectivo_settings",
      icon: "switch_account",
      display_template: "{{name}}",
      translations: [
        {
          language: "en-US",
          translation: "Member types",
          singular: "Member type",
          plural: "Member types",
        },
        {
          language: "de-DE",
          translation: "Mitgliedsarten",
          singular: "Mitgliedsart",
          plural: "Mitgliedsarten",
        },
      ],
    },
  },
];

schema.fields = [
  {
    collection: "memberships",
    field: "user",
    type: "uuid",
    schema: {},
    meta: {
      interface: "select-dropdown-m2o",
      special: ["m2o"],
      width: "half",
      display: "related-values",
      display_options: {
        template: "{{first_name}} {{last_name}}",
      },
      translations: [
        { language: "de-DE", translation: "Person" },
        { language: "en-US", translation: "Person" },
      ],
    },
  },
  {
    collection: "memberships",
    field: "type",
    type: "integer",
    schema: {},
    meta: {
      interface: "select-dropdown-m2o",
      special: ["m2o"],
      width: "half",
      display: "related-values",
      display_options: {
        template: "{{name}}",
      },
      translations: [
        { language: "de-DE", translation: "Typ" },
        { language: "en-US", translation: "Type" },
      ],
    },
  },
  {
    collection: "memberships",
    field: "status",
    type: "string",
    meta: {
      sort: 10,
      interface: "select-dropdown",
      display: "labels",
      display_options: {
        choices: [
          {
            text: "$t:approved",
            value: "approved",
            foreground: "#FFFFFF",
            background: "#2CB3A5",
          },
          {
            text: "$t:applied",
            value: "applied",
            foreground: "#FFFFFF",
            background: "#aa4abc",
          },
          {
            text: "$t:cancellation-applied",
            value: "cancellation-applied",
            foreground: "#FFFFFF",
            background: "#d94c4c",
          },
          {
            text: "$t:exclusion-applied",
            value: "exclusion-applied",
            foreground: "#FFFFFF",
            background: "#d94c4c",
          },
          {
            text: "$t:ended",
            value: "ended",
            foreground: "#FFFFFF",
            background: "#d94c4c",
          },
        ],
      },
      width: "half",
      note: "$t:memberships-status-note",
      options: {
        choices: [
          { text: "$t:draft", value: "draft" },
          { text: "$t:applied", value: "applied" },
          { text: "$t:approved", value: "approved" },
          { text: "$t:cancellation-applied", value: "cancellation-applied" },
          { text: "$t:exclusion-applied", value: "exclusion-applied" },
          { text: "$t:ended", value: "ended" },
        ],
      },
    },
    schema: { is_nullable: false, default_value: "draft" },
  },
  {
    collection: "memberships",
    field: "memberships_date_applied",
    type: "date",
    meta: {
      interface: "datetime",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Datum Beworben" },
        { language: "en-US", translation: "Date Applied" },
      ],
    },
  },
  {
    collection: "memberships",
    field: "memberships_date_approved",
    type: "date",
    meta: {
      interface: "datetime",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Datum Angenommen" },
        { language: "en-US", translation: "Date Approved" },
      ],
    },
  },
  {
    collection: "memberships",
    field: "memberships_date_cancelled",
    type: "date",
    schema: {},
    meta: {
      interface: "datetime",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Datum Austieg beantragt" },
        { language: "en-US", translation: "Date cancellation applied" },
      ],
    },
  },
  {
    collection: "memberships",
    field: "memberships_date_excluded",
    type: "date",
    schema: {},
    meta: {
      interface: "datetime",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Datum Ausschluss beantragt" },
        { language: "en-US", translation: "Date exclusion applied" },
      ],
    },
  },
  {
    collection: "memberships",
    field: "memberships_date_ended",
    type: "date",
    schema: {},
    meta: {
      interface: "datetime",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Datum Beendet" },
        { language: "en-US", translation: "Date ended" },
      ],
    },
  },

  // Membership Types
  directusNameField("memberships_types"),
  directusDescriptionField("memberships_types"),

  // System fields for both collections
  ...directusSystemFields("memberships"),
  ...directusSystemFields("memberships_types"),
];

schema.translations = [
  { language: "de-DE", key: "applied", value: "Beworben" },
  { language: "de-DE", key: "approved", value: "Aufgenommen" },
  {
    language: "de-DE",
    key: "cancellation-applied",
    value: "Ausstieg beaantragt",
  },
  {
    language: "de-DE",
    key: "exclusion-applied",
    value: "Ausschluss beantragt",
  },
  { language: "de-DE", key: "ended", value: "Beendet" },

  { language: "en-US", key: "applied", value: "Applied" },
  { language: "en-US", key: "approved", value: "Approved" },
  {
    language: "en-US",
    key: "cancellation-applied",
    value: "Cancellation applied",
  },
  {
    language: "en-US",
    key: "exclusion-applied",
    value: "Exclusion applied",
  },
  { language: "en-US", key: "ended", value: "Ended" },

  {
    language: "de-DE",
    key: "memberships-status-note",
    value:
      "Bezeichnet den Lebenszyklus einer Mitgliedschaft von der Bewerbung bis zum Ende. Der Ausstieg erfolgt durch das Mitglied, der Ausschluss durch die Organisation. Während des Ausstiegs- oder Ausschlussverfahrens sind die Mitgliedschaften weiterhin aktiv. Wenn dieser Vorgang abgeschlossen ist, sollte der Status auf 'Beendet' gesetzt werden.",
  },
  {
    language: "en-US",
    key: "memberships-status-note",
    value:
      "Signifies the lifecycle of a membership from applied to ended. Cancellation is initiated by the member, exclusion is initiated by the organisation. During the process of cancellation or exclusion, memberships are still active. When this process is finished, the status should be set to 'Ended'.",
  },
];

schema.relations = [
  {
    collection: "memberships",
    field: "user",
    related_collection: "directus_users",
    meta: { sort_field: null },
    schema: { on_delete: "SET NULL" },
  },
  {
    collection: "memberships",
    field: "type",
    related_collection: "memberships_types",
    meta: { sort_field: null },
    schema: { on_delete: "NO ACTION" },
  },
];
