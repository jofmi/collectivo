const schema = initSchema("memberships", "0.0.1");

export default schema;

schema.dependencies = [
  { extension: "collectivo", version: "0.0.1" },
  { extension: "payments", version: "0.0.1" },
];

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
      archive_field: "memberships_status",
      archive_value: "ended",
      unarchive_value: "draft",
      display_template: "{{memberships_user}} - {{memberships_type}}",
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
    field: "memberships_status",
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
            text: "$t:in-cancellation",
            value: "in-cancellation",
            foreground: "#FFFFFF",
            background: "#d94c4c",
          },
          {
            text: "$t:in-exclusion",
            value: "in-exclusion",
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
          { text: "$t:in-cancellation", value: "in-cancellation" },
          { text: "$t:in-exclusion", value: "in-exclusion" },
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
        { language: "de-DE", translation: "Datum Ausgestiegen" },
        { language: "en-US", translation: "Date Cancelled" },
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
        { language: "de-DE", translation: "Datum Ausgeschlossen" },
        { language: "en-US", translation: "Date Excluded" },
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
        { language: "en-US", translation: "Date Ended" },
      ],
    },
  },
  {
    collection: "memberships",
    field: "memberships_shares",
    type: "integer",
    meta: {
      interface: "input",
      width: "half",
      translations: [
        { language: "de-DE", translation: "Anteile" },
        { language: "en-US", translation: "Shares" },
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

schema.createForeignKey("memberships", "directus_users", {
  fieldKey: {
    collection: "memberships",
    field: "memberships_user",
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
});

schema.createForeignKey("memberships", "memberships_types", {
  fieldKey: {
    collection: "memberships",
    field: "memberships_type",
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
});

schema.createForeignKey("memberships_types", "payments_items", {
  fieldKey: {
    field: "memberships_shares_item",
    meta: {
      translations: [
        { language: "de-DE", translation: "Anteile Item" },
        { language: "en-US", translation: "Shares Item" },
      ],
    },
  },
});

// schema.relations = [
//   {
//     collection: "memberships",
//     field: "memberships_user",
//     related_collection: "directus_users",
//     meta: { sort_field: null },
//     schema: { on_delete: "SET NULL" },
//   },
//   {
//     collection: "memberships",
//     field: "memberships_type",
//     related_collection: "memberships_types",
//     meta: { sort_field: null },
//     schema: { on_delete: "NO ACTION" },
//   },
// ];

schema.translations = [
  { language: "de-DE", key: "applied", value: "Beworben" },
  { language: "de-DE", key: "approved", value: "Aufgenommen" },
  {
    language: "de-DE",
    key: "in-cancellation",
    value: "Im Ausstieg",
  },
  {
    language: "de-DE",
    key: "in-exclusion",
    value: "Im Ausschluss",
  },
  { language: "de-DE", key: "ended", value: "Beendet" },

  { language: "en-US", key: "applied", value: "Applied" },
  { language: "en-US", key: "approved", value: "Approved" },
  {
    language: "en-US",
    key: "in-cancellation",
    value: "In cancellation",
  },
  {
    language: "en-US",
    key: "in-exclusion",
    value: "In exclusion",
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

// schema.flows = [
//   {
//     name: "memberships_shares_invoices",
//     icon: "receipt",
//     color: null,
//     description: null,
//     status: "active",
//     accountability: "all",
//     trigger: "event",
//     options: {
//       type: "filter",
//       scope: ["items.update", "items.create"],
//       collections: ["memberships"],
//     },
//   },
// ];

schema.permissions = [
  {
    collection: "memberships",
    roleName: "collectivo_editor",
    action: "read",
    fields: ["*"],
  },
  {
    collection: "memberships",
    roleName: "collectivo_editor",
    action: "update",
    fields: ["*"],
  },
  {
    collection: "memberships_types",
    roleName: "collectivo_editor",
    action: "read",
    fields: ["*"],
  },
];

// TODO: Make optional
// Add a relation to the payments extension
schema.fields.push(
  ...[
    {
      collection: "memberships",
      field: "memberships_invoices",
      type: "alias",
      meta: {
        interface: "list-o2m",
        special: ["o2m"],
        width: "half",
        translations: [
          { language: "de-DE", translation: "Rechnungen" },
          { language: "en-US", translation: "Invoices" },
        ],
      },
    },
    {
      collection: "payments_invoices_out",
      field: "memberships_membership",
      type: "integer",
      meta: {
        hidden: true,
      },
    },
  ],
);

schema.relations.push(
  ...[
    {
      collection: "payments_invoices_out",
      field: "memberships_membership",
      related_collection: "memberships",
      meta: {
        one_field: "memberships_invoices",
        sort_field: null,
        one_deselect_action: "nullify",
      },
      schema: { on_delete: "SET NULL" },
    },
  ],
);

schema.flows.push(
  ...[
    {
      flow: {
        name: "memberships_create_invoices",
        icon: "receipt",
        description: "Creates invoices for membership shares",
        status: "active",
        trigger: "event",
        accountability: "all",
        options: {
          type: "action",
          scope: ["items.create", "items.update"],
          collections: ["messages_campaigns"],
        },
      },
      firstOperation: "check_if_new_invoice_needed",
      operations: [
        {
          operation: {
            name: "check_if_new_invoice_needed",
            key: "check_if_new_invoice_needed",
            type: "exec",
            position_x: 19,
            position_y: 1,
            options: {
              code: "",
            },
          },
          resolve: "create_invoice",
        },
        {
          operation: {
            name: "create_invoice",
            key: "create_invoice",
            type: "item-create",
            position_x: 37,
            position_y: 1,
            options: {
              collection: "payments_invoices_out",
              emitEvents: true,
              payload: "{{$last.invoicesToCreate}}",
            },
          },
        },
      ],
    },
  ],
);

// {
//   "id": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//   "name": "memberships_create_invoice_for_shares",
//   "icon": "bolt",
//   "color": null,
//   "description": null,
//   "status": "active",
//   "trigger": "event",
//   "accountability": "all",
//   "options": {
//     "type": "filter",
//     "scope": [
//       "items.create",
//       "items.update"
//     ],
//     "collections": [
//       "memberships"
//     ]
//   },
//   "date_created": "2024-01-29T10:50:08.063Z",
//   "operation": {
//     "id": "b1eab537-a150-45d9-a88c-7d148007cfd0",
//     "name": "checkHasShares",
//     "key": "checkHasShares",
//     "type": "exec",
//     "position_x": 19,
//     "position_y": 1,
//     "options": {
//       "code": "module.exports = async function(data) {\n\tconsole.log(\"prepareInvoice\")\n\tconsole.log(data[\"$trigger\"])\n\tif (!(\"memberships_shares\" in data[\"$trigger\"].payload)) {\n\t\tthrow new Error(\"No shares in payload\")\n    }\n\treturn {}\n}"
//     },
//     "date_created": "2024-01-29T10:57:14.585Z",
//     "resolve": {
//       "id": "3010d0b9-bf99-4d0e-887f-d065be01a2b2",
//       "name": "checkIsBulk",
//       "key": "checkIsBulk",
//       "type": "exec",
//       "position_x": 37,
//       "position_y": 1,
//       "options": {
//         "code": "module.exports = async function(data) {\n\tif (data[\"$trigger\"].keys.length != 1) {\n\t\tconsole.log(\"multiple keys in payload\")\n    \tthrow new Error(\"Memberships invoice flow: Cannot bulk edit shares\")\n\t}\n\treturn {}\n}"
//       },
//       "resolve": "5c7c6f60-0d5e-4dee-8b2f-108e00ca9eab",
//       "reject": null,
//       "flow": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//       "date_created": "2024-01-30T11:20:57.362Z",
//       "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6"
//     },
//     "reject": {
//       "id": "cf48e535-4dca-4d91-9096-4d24df330a84",
//       "name": "endFlowWithoutBlocking",
//       "key": "endFlowWithoutBlocking",
//       "type": "exec",
//       "position_x": 3,
//       "position_y": 20,
//       "options": {
//         "code": "module.exports = async function(data) {\n\t// Do nothing, just to let the reject path pass without blocking\n    console.log(\"has no shares\")\n\treturn {};\n}"
//       },
//       "resolve": null,
//       "reject": null,
//       "flow": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//       "date_created": "2024-01-30T11:20:57.368Z",
//       "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6"
//     },
//     "flow": {
//       "id": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//       "name": "memberships_create_invoice_for_shares",
//       "icon": "bolt",
//       "color": null,
//       "description": null,
//       "status": "active",
//       "trigger": "event",
//       "accountability": "all",
//       "options": {
//         "type": "filter",
//         "scope": [
//           "items.create",
//           "items.update"
//         ],
//         "collections": [
//           "memberships"
//         ]
//       },
//       "operation": "b1eab537-a150-45d9-a88c-7d148007cfd0",
//       "date_created": "2024-01-29T10:50:08.063Z",
//       "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6",
//       "operations": [
//         "3010d0b9-bf99-4d0e-887f-d065be01a2b2",
//         "40c5ee74-90d8-4ed5-881a-1c94be16e192",
//         "5c7c6f60-0d5e-4dee-8b2f-108e00ca9eab",
//         "8f699acb-6530-4177-9219-a833afa04f20",
//         "90fa15a3-d6f7-4161-ae75-af8a81d1bfcb",
//         "b1eab537-a150-45d9-a88c-7d148007cfd0",
//         "c6064a15-3bb4-4338-a16f-89e1c53c9eb4",
//         "cf48e535-4dca-4d91-9096-4d24df330a84"
//       ]
//     },
//     "user_created": {
//       "id": "87226828-be9d-431c-bedf-ae895d17d9f6",
//       "first_name": "Admin",
//       "last_name": "Example",
//       "email": "admin@example.com",
//       "password": null,
//       "location": null,
//       "title": null,
//       "description": null,
//       "tags": null,
//       "avatar": null,
//       "language": null,
//       "tfa_secret": null,
//       "status": "active",
//       "role": "c283e848-f13f-491f-803a-bc3083cc84ba",
//       "token": null,
//       "last_access": "2024-01-30T13:16:06.655Z",
//       "last_page": "/settings/flows/d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//       "provider": "keycloak",
//       "external_identifier": "admin@example.com",
//       "auth_data": {
//         "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzZDhlMDU4MC05ZGE1LTRjNDItOGFjNy0zNmViYzgwYTVmYTcifQ.eyJleHAiOjE3MDY2MjIzNjYsImlhdCI6MTcwNjYyMDU2NiwianRpIjoiMWFiMDFiNTctYmIwYS00ZTM2LWI1YjgtNTNlOGYxMjU3ZWMxIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL2NvbGxlY3Rpdm8iLCJhdWQiOiJodHRwOi8va2V5Y2xvYWs6ODA4MC9yZWFsbXMvY29sbGVjdGl2byIsInN1YiI6IjQ5YmZhNjc5LTQzOTMtNGY1MS1iMzcyLWMxMmNjNDBlZDA4NSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJkaXJlY3R1cyIsIm5vbmNlIjoiRVBkWEhxVlFzWnljdXc5WW1wR290WTdObVZ3OGRyelFWSjdQUGd3OE1OVSIsInNlc3Npb25fc3RhdGUiOiJkNzk2ODcyNy0wODA3LTQ0ZGQtYjY1Ni0zYTBiOGQ2OTRlM2UiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZDc5Njg3MjctMDgwNy00NGRkLWI2NTYtM2EwYjhkNjk0ZTNlIn0.KOWeSD6hj7tQ1ntx13wPTfW-l-8FYgOIGRBpEg6L28Q"
//       },
//       "email_notifications": true,
//       "appearance": null,
//       "theme_dark": null,
//       "theme_light": null,
//       "theme_light_overrides": null,
//       "theme_dark_overrides": null,
//       "payments_type": "sepa",
//       "payments_account_iban": "AT95 3412 9000 08934523",
//       "payments_account_owner": "s",
//       "memberships_phone": null,
//       "memberships_birthday": "2008-01-09",
//       "memberships_occupation": "d",
//       "memberships_gender": "diverse",
//       "memberships_person_type": "natural",
//       "memberships_street": "d",
//       "memberships_streetnumber": "d",
//       "memberships_stair": null,
//       "memberships_door": null,
//       "memberships_postcode": "d",
//       "memberships_city": "d",
//       "memberships_country": "d",
//       "memberships_organization_name": null,
//       "memberships_organization_id": null,
//       "memberships_organization_type": null,
//       "collectivo_tags": [],
//       "messages_campaigns": []
//     }
//   },
//   "user_created": {
//     "id": "87226828-be9d-431c-bedf-ae895d17d9f6",
//     "first_name": "Admin",
//     "last_name": "Example",
//     "email": "admin@example.com",
//     "password": null,
//     "location": null,
//     "title": null,
//     "description": null,
//     "tags": null,
//     "language": null,
//     "tfa_secret": null,
//     "status": "active",
//     "token": null,
//     "last_access": "2024-01-30T13:16:06.655Z",
//     "last_page": "/settings/flows/d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//     "provider": "keycloak",
//     "external_identifier": "admin@example.com",
//     "auth_data": {
//       "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzZDhlMDU4MC05ZGE1LTRjNDItOGFjNy0zNmViYzgwYTVmYTcifQ.eyJleHAiOjE3MDY2MjIzNjYsImlhdCI6MTcwNjYyMDU2NiwianRpIjoiMWFiMDFiNTctYmIwYS00ZTM2LWI1YjgtNTNlOGYxMjU3ZWMxIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL2NvbGxlY3Rpdm8iLCJhdWQiOiJodHRwOi8va2V5Y2xvYWs6ODA4MC9yZWFsbXMvY29sbGVjdGl2byIsInN1YiI6IjQ5YmZhNjc5LTQzOTMtNGY1MS1iMzcyLWMxMmNjNDBlZDA4NSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJkaXJlY3R1cyIsIm5vbmNlIjoiRVBkWEhxVlFzWnljdXc5WW1wR290WTdObVZ3OGRyelFWSjdQUGd3OE1OVSIsInNlc3Npb25fc3RhdGUiOiJkNzk2ODcyNy0wODA3LTQ0ZGQtYjY1Ni0zYTBiOGQ2OTRlM2UiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZDc5Njg3MjctMDgwNy00NGRkLWI2NTYtM2EwYjhkNjk0ZTNlIn0.KOWeSD6hj7tQ1ntx13wPTfW-l-8FYgOIGRBpEg6L28Q"
//     },
//     "email_notifications": true,
//     "appearance": null,
//     "theme_dark": null,
//     "theme_light": null,
//     "theme_light_overrides": null,
//     "theme_dark_overrides": null,
//     "payments_type": "sepa",
//     "payments_account_iban": "AT95 3412 9000 08934523",
//     "payments_account_owner": "s",
//     "memberships_phone": null,
//     "memberships_birthday": "2008-01-09",
//     "memberships_occupation": "d",
//     "memberships_gender": "diverse",
//     "memberships_person_type": "natural",
//     "memberships_street": "d",
//     "memberships_streetnumber": "d",
//     "memberships_stair": null,
//     "memberships_door": null,
//     "memberships_postcode": "d",
//     "memberships_city": "d",
//     "memberships_country": "d",
//     "memberships_organization_name": null,
//     "memberships_organization_id": null,
//     "memberships_organization_type": null,
//     "avatar": null,
//     "role": {
//       "id": "c283e848-f13f-491f-803a-bc3083cc84ba",
//       "name": "collectivo_admin",
//       "icon": "supervised_user_circle",
//       "description": null,
//       "ip_access": null,
//       "enforce_tfa": false,
//       "admin_access": true,
//       "app_access": true,
//       "users": [
//         "87226828-be9d-431c-bedf-ae895d17d9f6"
//       ]
//     },
//     "collectivo_tags": [],
//     "messages_campaigns": []
//   },
//   "operations": [
//     {
//       "id": "3010d0b9-bf99-4d0e-887f-d065be01a2b2",
//       "name": "checkIsBulk",
//       "key": "checkIsBulk",
//       "type": "exec",
//       "position_x": 37,
//       "position_y": 1,
//       "options": {
//         "code": "module.exports = async function(data) {\n\tif (data[\"$trigger\"].keys.length != 1) {\n\t\tconsole.log(\"multiple keys in payload\")\n    \tthrow new Error(\"Memberships invoice flow: Cannot bulk edit shares\")\n\t}\n\treturn {}\n}"
//       },
//       "date_created": "2024-01-30T11:20:57.362Z",
//       "resolve": {
//         "id": "5c7c6f60-0d5e-4dee-8b2f-108e00ca9eab",
//         "name": "readMembership",
//         "key": "readMembership",
//         "type": "item-read",
//         "position_x": 20,
//         "position_y": 20,
//         "options": {
//           "collection": "memberships",
//           "key": [
//             "{{$trigger.keys[0]}}"
//           ],
//           "permissions": "$full",
//           "query": {
//             "fields": [
//               "memberships_user",
//               "memberships_type.memberships_shares_item.*"
//             ]
//           }
//         },
//         "resolve": "8f699acb-6530-4177-9219-a833afa04f20",
//         "reject": null,
//         "flow": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "date_created": "2024-01-30T11:01:50.308Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6"
//       },
//       "reject": null,
//       "flow": {
//         "id": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "name": "memberships_create_invoice_for_shares",
//         "icon": "bolt",
//         "color": null,
//         "description": null,
//         "status": "active",
//         "trigger": "event",
//         "accountability": "all",
//         "options": {
//           "type": "filter",
//           "scope": [
//             "items.create",
//             "items.update"
//           ],
//           "collections": [
//             "memberships"
//           ]
//         },
//         "operation": "b1eab537-a150-45d9-a88c-7d148007cfd0",
//         "date_created": "2024-01-29T10:50:08.063Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "operations": [
//           "3010d0b9-bf99-4d0e-887f-d065be01a2b2",
//           "40c5ee74-90d8-4ed5-881a-1c94be16e192",
//           "5c7c6f60-0d5e-4dee-8b2f-108e00ca9eab",
//           "8f699acb-6530-4177-9219-a833afa04f20",
//           "90fa15a3-d6f7-4161-ae75-af8a81d1bfcb",
//           "b1eab537-a150-45d9-a88c-7d148007cfd0",
//           "c6064a15-3bb4-4338-a16f-89e1c53c9eb4",
//           "cf48e535-4dca-4d91-9096-4d24df330a84"
//         ]
//       },
//       "user_created": {
//         "id": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "first_name": "Admin",
//         "last_name": "Example",
//         "email": "admin@example.com",
//         "password": null,
//         "location": null,
//         "title": null,
//         "description": null,
//         "tags": null,
//         "avatar": null,
//         "language": null,
//         "tfa_secret": null,
//         "status": "active",
//         "role": "c283e848-f13f-491f-803a-bc3083cc84ba",
//         "token": null,
//         "last_access": "2024-01-30T13:16:06.655Z",
//         "last_page": "/settings/flows/d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "provider": "keycloak",
//         "external_identifier": "admin@example.com",
//         "auth_data": {
//           "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzZDhlMDU4MC05ZGE1LTRjNDItOGFjNy0zNmViYzgwYTVmYTcifQ.eyJleHAiOjE3MDY2MjIzNjYsImlhdCI6MTcwNjYyMDU2NiwianRpIjoiMWFiMDFiNTctYmIwYS00ZTM2LWI1YjgtNTNlOGYxMjU3ZWMxIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL2NvbGxlY3Rpdm8iLCJhdWQiOiJodHRwOi8va2V5Y2xvYWs6ODA4MC9yZWFsbXMvY29sbGVjdGl2byIsInN1YiI6IjQ5YmZhNjc5LTQzOTMtNGY1MS1iMzcyLWMxMmNjNDBlZDA4NSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJkaXJlY3R1cyIsIm5vbmNlIjoiRVBkWEhxVlFzWnljdXc5WW1wR290WTdObVZ3OGRyelFWSjdQUGd3OE1OVSIsInNlc3Npb25fc3RhdGUiOiJkNzk2ODcyNy0wODA3LTQ0ZGQtYjY1Ni0zYTBiOGQ2OTRlM2UiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZDc5Njg3MjctMDgwNy00NGRkLWI2NTYtM2EwYjhkNjk0ZTNlIn0.KOWeSD6hj7tQ1ntx13wPTfW-l-8FYgOIGRBpEg6L28Q"
//         },
//         "email_notifications": true,
//         "appearance": null,
//         "theme_dark": null,
//         "theme_light": null,
//         "theme_light_overrides": null,
//         "theme_dark_overrides": null,
//         "payments_type": "sepa",
//         "payments_account_iban": "AT95 3412 9000 08934523",
//         "payments_account_owner": "s",
//         "memberships_phone": null,
//         "memberships_birthday": "2008-01-09",
//         "memberships_occupation": "d",
//         "memberships_gender": "diverse",
//         "memberships_person_type": "natural",
//         "memberships_street": "d",
//         "memberships_streetnumber": "d",
//         "memberships_stair": null,
//         "memberships_door": null,
//         "memberships_postcode": "d",
//         "memberships_city": "d",
//         "memberships_country": "d",
//         "memberships_organization_name": null,
//         "memberships_organization_id": null,
//         "memberships_organization_type": null,
//         "collectivo_tags": [],
//         "messages_campaigns": []
//       }
//     },
//     {
//       "id": "40c5ee74-90d8-4ed5-881a-1c94be16e192",
//       "name": "Create Data",
//       "key": "item_create_rsk4o",
//       "type": "item-create",
//       "position_x": 39,
//       "position_y": 38,
//       "options": {
//         "collection": "payments_invoices_entries",
//         "permissions": "$full",
//         "payload": {
//           "payments_invoice": "{{createInvoice[0]}}",
//           "payments_item": "{{readMembership.memberships_type.memberships_shares_item.id}}",
//           "payments_quantity": "{{calcShares.sharesToBeInvoiced}}",
//           "payments_price": "{{readMembership.memberships_type.memberships_shares_item.payments_price}}"
//         }
//       },
//       "date_created": "2024-01-30T12:51:57.366Z",
//       "resolve": null,
//       "reject": null,
//       "flow": {
//         "id": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "name": "memberships_create_invoice_for_shares",
//         "icon": "bolt",
//         "color": null,
//         "description": null,
//         "status": "active",
//         "trigger": "event",
//         "accountability": "all",
//         "options": {
//           "type": "filter",
//           "scope": [
//             "items.create",
//             "items.update"
//           ],
//           "collections": [
//             "memberships"
//           ]
//         },
//         "operation": "b1eab537-a150-45d9-a88c-7d148007cfd0",
//         "date_created": "2024-01-29T10:50:08.063Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "operations": [
//           "3010d0b9-bf99-4d0e-887f-d065be01a2b2",
//           "40c5ee74-90d8-4ed5-881a-1c94be16e192",
//           "5c7c6f60-0d5e-4dee-8b2f-108e00ca9eab",
//           "8f699acb-6530-4177-9219-a833afa04f20",
//           "90fa15a3-d6f7-4161-ae75-af8a81d1bfcb",
//           "b1eab537-a150-45d9-a88c-7d148007cfd0",
//           "c6064a15-3bb4-4338-a16f-89e1c53c9eb4",
//           "cf48e535-4dca-4d91-9096-4d24df330a84"
//         ]
//       },
//       "user_created": {
//         "id": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "first_name": "Admin",
//         "last_name": "Example",
//         "email": "admin@example.com",
//         "password": null,
//         "location": null,
//         "title": null,
//         "description": null,
//         "tags": null,
//         "avatar": null,
//         "language": null,
//         "tfa_secret": null,
//         "status": "active",
//         "role": "c283e848-f13f-491f-803a-bc3083cc84ba",
//         "token": null,
//         "last_access": "2024-01-30T13:16:06.655Z",
//         "last_page": "/settings/flows/d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "provider": "keycloak",
//         "external_identifier": "admin@example.com",
//         "auth_data": {
//           "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzZDhlMDU4MC05ZGE1LTRjNDItOGFjNy0zNmViYzgwYTVmYTcifQ.eyJleHAiOjE3MDY2MjIzNjYsImlhdCI6MTcwNjYyMDU2NiwianRpIjoiMWFiMDFiNTctYmIwYS00ZTM2LWI1YjgtNTNlOGYxMjU3ZWMxIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL2NvbGxlY3Rpdm8iLCJhdWQiOiJodHRwOi8va2V5Y2xvYWs6ODA4MC9yZWFsbXMvY29sbGVjdGl2byIsInN1YiI6IjQ5YmZhNjc5LTQzOTMtNGY1MS1iMzcyLWMxMmNjNDBlZDA4NSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJkaXJlY3R1cyIsIm5vbmNlIjoiRVBkWEhxVlFzWnljdXc5WW1wR290WTdObVZ3OGRyelFWSjdQUGd3OE1OVSIsInNlc3Npb25fc3RhdGUiOiJkNzk2ODcyNy0wODA3LTQ0ZGQtYjY1Ni0zYTBiOGQ2OTRlM2UiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZDc5Njg3MjctMDgwNy00NGRkLWI2NTYtM2EwYjhkNjk0ZTNlIn0.KOWeSD6hj7tQ1ntx13wPTfW-l-8FYgOIGRBpEg6L28Q"
//         },
//         "email_notifications": true,
//         "appearance": null,
//         "theme_dark": null,
//         "theme_light": null,
//         "theme_light_overrides": null,
//         "theme_dark_overrides": null,
//         "payments_type": "sepa",
//         "payments_account_iban": "AT95 3412 9000 08934523",
//         "payments_account_owner": "s",
//         "memberships_phone": null,
//         "memberships_birthday": "2008-01-09",
//         "memberships_occupation": "d",
//         "memberships_gender": "diverse",
//         "memberships_person_type": "natural",
//         "memberships_street": "d",
//         "memberships_streetnumber": "d",
//         "memberships_stair": null,
//         "memberships_door": null,
//         "memberships_postcode": "d",
//         "memberships_city": "d",
//         "memberships_country": "d",
//         "memberships_organization_name": null,
//         "memberships_organization_id": null,
//         "memberships_organization_type": null,
//         "collectivo_tags": [],
//         "messages_campaigns": []
//       }
//     },
//     {
//       "id": "5c7c6f60-0d5e-4dee-8b2f-108e00ca9eab",
//       "name": "readMembership",
//       "key": "readMembership",
//       "type": "item-read",
//       "position_x": 20,
//       "position_y": 20,
//       "options": {
//         "collection": "memberships",
//         "key": [
//           "{{$trigger.keys[0]}}"
//         ],
//         "permissions": "$full",
//         "query": {
//           "fields": [
//             "memberships_user",
//             "memberships_type.memberships_shares_item.*"
//           ]
//         }
//       },
//       "date_created": "2024-01-30T11:01:50.308Z",
//       "resolve": {
//         "id": "8f699acb-6530-4177-9219-a833afa04f20",
//         "name": "readSharesEntries",
//         "key": "readSharesEntries",
//         "type": "item-read",
//         "position_x": 37,
//         "position_y": 20,
//         "options": {
//           "collection": "payments_invoices_entries",
//           "query": {
//             "filter": {
//               "payments_invoice": {
//                 "memberships_membership": "{{$trigger.keys[0]}}"
//               },
//               "payments_item": "{{readMembership.memberships_type.memberships_shares_item.id}}"
//             }
//           }
//         },
//         "resolve": "90fa15a3-d6f7-4161-ae75-af8a81d1bfcb",
//         "reject": null,
//         "flow": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "date_created": "2024-01-30T11:26:13.588Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6"
//       },
//       "reject": null,
//       "flow": {
//         "id": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "name": "memberships_create_invoice_for_shares",
//         "icon": "bolt",
//         "color": null,
//         "description": null,
//         "status": "active",
//         "trigger": "event",
//         "accountability": "all",
//         "options": {
//           "type": "filter",
//           "scope": [
//             "items.create",
//             "items.update"
//           ],
//           "collections": [
//             "memberships"
//           ]
//         },
//         "operation": "b1eab537-a150-45d9-a88c-7d148007cfd0",
//         "date_created": "2024-01-29T10:50:08.063Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "operations": [
//           "3010d0b9-bf99-4d0e-887f-d065be01a2b2",
//           "40c5ee74-90d8-4ed5-881a-1c94be16e192",
//           "5c7c6f60-0d5e-4dee-8b2f-108e00ca9eab",
//           "8f699acb-6530-4177-9219-a833afa04f20",
//           "90fa15a3-d6f7-4161-ae75-af8a81d1bfcb",
//           "b1eab537-a150-45d9-a88c-7d148007cfd0",
//           "c6064a15-3bb4-4338-a16f-89e1c53c9eb4",
//           "cf48e535-4dca-4d91-9096-4d24df330a84"
//         ]
//       },
//       "user_created": {
//         "id": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "first_name": "Admin",
//         "last_name": "Example",
//         "email": "admin@example.com",
//         "password": null,
//         "location": null,
//         "title": null,
//         "description": null,
//         "tags": null,
//         "avatar": null,
//         "language": null,
//         "tfa_secret": null,
//         "status": "active",
//         "role": "c283e848-f13f-491f-803a-bc3083cc84ba",
//         "token": null,
//         "last_access": "2024-01-30T13:16:06.655Z",
//         "last_page": "/settings/flows/d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "provider": "keycloak",
//         "external_identifier": "admin@example.com",
//         "auth_data": {
//           "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzZDhlMDU4MC05ZGE1LTRjNDItOGFjNy0zNmViYzgwYTVmYTcifQ.eyJleHAiOjE3MDY2MjIzNjYsImlhdCI6MTcwNjYyMDU2NiwianRpIjoiMWFiMDFiNTctYmIwYS00ZTM2LWI1YjgtNTNlOGYxMjU3ZWMxIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL2NvbGxlY3Rpdm8iLCJhdWQiOiJodHRwOi8va2V5Y2xvYWs6ODA4MC9yZWFsbXMvY29sbGVjdGl2byIsInN1YiI6IjQ5YmZhNjc5LTQzOTMtNGY1MS1iMzcyLWMxMmNjNDBlZDA4NSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJkaXJlY3R1cyIsIm5vbmNlIjoiRVBkWEhxVlFzWnljdXc5WW1wR290WTdObVZ3OGRyelFWSjdQUGd3OE1OVSIsInNlc3Npb25fc3RhdGUiOiJkNzk2ODcyNy0wODA3LTQ0ZGQtYjY1Ni0zYTBiOGQ2OTRlM2UiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZDc5Njg3MjctMDgwNy00NGRkLWI2NTYtM2EwYjhkNjk0ZTNlIn0.KOWeSD6hj7tQ1ntx13wPTfW-l-8FYgOIGRBpEg6L28Q"
//         },
//         "email_notifications": true,
//         "appearance": null,
//         "theme_dark": null,
//         "theme_light": null,
//         "theme_light_overrides": null,
//         "theme_dark_overrides": null,
//         "payments_type": "sepa",
//         "payments_account_iban": "AT95 3412 9000 08934523",
//         "payments_account_owner": "s",
//         "memberships_phone": null,
//         "memberships_birthday": "2008-01-09",
//         "memberships_occupation": "d",
//         "memberships_gender": "diverse",
//         "memberships_person_type": "natural",
//         "memberships_street": "d",
//         "memberships_streetnumber": "d",
//         "memberships_stair": null,
//         "memberships_door": null,
//         "memberships_postcode": "d",
//         "memberships_city": "d",
//         "memberships_country": "d",
//         "memberships_organization_name": null,
//         "memberships_organization_id": null,
//         "memberships_organization_type": null,
//         "collectivo_tags": [],
//         "messages_campaigns": []
//       }
//     },
//     {
//       "id": "8f699acb-6530-4177-9219-a833afa04f20",
//       "name": "readSharesEntries",
//       "key": "readSharesEntries",
//       "type": "item-read",
//       "position_x": 37,
//       "position_y": 20,
//       "options": {
//         "collection": "payments_invoices_entries",
//         "query": {
//           "filter": {
//             "payments_invoice": {
//               "memberships_membership": "{{$trigger.keys[0]}}"
//             },
//             "payments_item": "{{readMembership.memberships_type.memberships_shares_item.id}}"
//           }
//         }
//       },
//       "date_created": "2024-01-30T11:26:13.588Z",
//       "resolve": {
//         "id": "90fa15a3-d6f7-4161-ae75-af8a81d1bfcb",
//         "name": "calcShares",
//         "key": "calcShares",
//         "type": "exec",
//         "position_x": 3,
//         "position_y": 38,
//         "options": {
//           "code": "module.exports = async function(data) {\n\t// Do something...\n\tconsole.log(\"calcShares\")\n    let sharesInvoiced = 0\n    console.log(data[\"readSharesEntries\"])\n    for (i in data[\"readSharesEntries\"]) {\n        entry = data[\"readSharesEntries\"][i]\n        console.log(\"entry\", entry)\n    \tsharesInvoiced = sharesInvoiced + entry.payments_quantity\n\t}\n\tsharesTotal = data[\"$trigger\"].payload.memberships_shares\n\tsharesToBeInvoiced = sharesTotal - sharesInvoiced\n\tconsole.log(\"sharesToBeInvoiced\", sharesToBeInvoiced)\n\treturn {sharesToBeInvoiced};\n}"
//         },
//         "resolve": "c6064a15-3bb4-4338-a16f-89e1c53c9eb4",
//         "reject": null,
//         "flow": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "date_created": "2024-01-30T11:01:50.303Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6"
//       },
//       "reject": null,
//       "flow": {
//         "id": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "name": "memberships_create_invoice_for_shares",
//         "icon": "bolt",
//         "color": null,
//         "description": null,
//         "status": "active",
//         "trigger": "event",
//         "accountability": "all",
//         "options": {
//           "type": "filter",
//           "scope": [
//             "items.create",
//             "items.update"
//           ],
//           "collections": [
//             "memberships"
//           ]
//         },
//         "operation": "b1eab537-a150-45d9-a88c-7d148007cfd0",
//         "date_created": "2024-01-29T10:50:08.063Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "operations": [
//           "3010d0b9-bf99-4d0e-887f-d065be01a2b2",
//           "40c5ee74-90d8-4ed5-881a-1c94be16e192",
//           "5c7c6f60-0d5e-4dee-8b2f-108e00ca9eab",
//           "8f699acb-6530-4177-9219-a833afa04f20",
//           "90fa15a3-d6f7-4161-ae75-af8a81d1bfcb",
//           "b1eab537-a150-45d9-a88c-7d148007cfd0",
//           "c6064a15-3bb4-4338-a16f-89e1c53c9eb4",
//           "cf48e535-4dca-4d91-9096-4d24df330a84"
//         ]
//       },
//       "user_created": {
//         "id": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "first_name": "Admin",
//         "last_name": "Example",
//         "email": "admin@example.com",
//         "password": null,
//         "location": null,
//         "title": null,
//         "description": null,
//         "tags": null,
//         "avatar": null,
//         "language": null,
//         "tfa_secret": null,
//         "status": "active",
//         "role": "c283e848-f13f-491f-803a-bc3083cc84ba",
//         "token": null,
//         "last_access": "2024-01-30T13:16:06.655Z",
//         "last_page": "/settings/flows/d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "provider": "keycloak",
//         "external_identifier": "admin@example.com",
//         "auth_data": {
//           "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzZDhlMDU4MC05ZGE1LTRjNDItOGFjNy0zNmViYzgwYTVmYTcifQ.eyJleHAiOjE3MDY2MjIzNjYsImlhdCI6MTcwNjYyMDU2NiwianRpIjoiMWFiMDFiNTctYmIwYS00ZTM2LWI1YjgtNTNlOGYxMjU3ZWMxIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL2NvbGxlY3Rpdm8iLCJhdWQiOiJodHRwOi8va2V5Y2xvYWs6ODA4MC9yZWFsbXMvY29sbGVjdGl2byIsInN1YiI6IjQ5YmZhNjc5LTQzOTMtNGY1MS1iMzcyLWMxMmNjNDBlZDA4NSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJkaXJlY3R1cyIsIm5vbmNlIjoiRVBkWEhxVlFzWnljdXc5WW1wR290WTdObVZ3OGRyelFWSjdQUGd3OE1OVSIsInNlc3Npb25fc3RhdGUiOiJkNzk2ODcyNy0wODA3LTQ0ZGQtYjY1Ni0zYTBiOGQ2OTRlM2UiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZDc5Njg3MjctMDgwNy00NGRkLWI2NTYtM2EwYjhkNjk0ZTNlIn0.KOWeSD6hj7tQ1ntx13wPTfW-l-8FYgOIGRBpEg6L28Q"
//         },
//         "email_notifications": true,
//         "appearance": null,
//         "theme_dark": null,
//         "theme_light": null,
//         "theme_light_overrides": null,
//         "theme_dark_overrides": null,
//         "payments_type": "sepa",
//         "payments_account_iban": "AT95 3412 9000 08934523",
//         "payments_account_owner": "s",
//         "memberships_phone": null,
//         "memberships_birthday": "2008-01-09",
//         "memberships_occupation": "d",
//         "memberships_gender": "diverse",
//         "memberships_person_type": "natural",
//         "memberships_street": "d",
//         "memberships_streetnumber": "d",
//         "memberships_stair": null,
//         "memberships_door": null,
//         "memberships_postcode": "d",
//         "memberships_city": "d",
//         "memberships_country": "d",
//         "memberships_organization_name": null,
//         "memberships_organization_id": null,
//         "memberships_organization_type": null,
//         "collectivo_tags": [],
//         "messages_campaigns": []
//       }
//     },
//     {
//       "id": "90fa15a3-d6f7-4161-ae75-af8a81d1bfcb",
//       "name": "calcShares",
//       "key": "calcShares",
//       "type": "exec",
//       "position_x": 3,
//       "position_y": 38,
//       "options": {
//         "code": "module.exports = async function(data) {\n\t// Do something...\n\tconsole.log(\"calcShares\")\n    let sharesInvoiced = 0\n    console.log(data[\"readSharesEntries\"])\n    for (i in data[\"readSharesEntries\"]) {\n        entry = data[\"readSharesEntries\"][i]\n        console.log(\"entry\", entry)\n    \tsharesInvoiced = sharesInvoiced + entry.payments_quantity\n\t}\n\tsharesTotal = data[\"$trigger\"].payload.memberships_shares\n\tsharesToBeInvoiced = sharesTotal - sharesInvoiced\n\tconsole.log(\"sharesToBeInvoiced\", sharesToBeInvoiced)\n\treturn {sharesToBeInvoiced};\n}"
//       },
//       "date_created": "2024-01-30T11:01:50.303Z",
//       "resolve": {
//         "id": "c6064a15-3bb4-4338-a16f-89e1c53c9eb4",
//         "name": "createInvoice",
//         "key": "createInvoice",
//         "type": "item-create",
//         "position_x": 21,
//         "position_y": 38,
//         "options": {
//           "collection": "payments_invoices_out",
//           "permissions": "$full",
//           "payload": {
//             "payments_recipient_user": "{{membership.memberships_user}}"
//           }
//         },
//         "resolve": "40c5ee74-90d8-4ed5-881a-1c94be16e192",
//         "reject": null,
//         "flow": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "date_created": "2024-01-30T12:48:51.150Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6"
//       },
//       "reject": null,
//       "flow": {
//         "id": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "name": "memberships_create_invoice_for_shares",
//         "icon": "bolt",
//         "color": null,
//         "description": null,
//         "status": "active",
//         "trigger": "event",
//         "accountability": "all",
//         "options": {
//           "type": "filter",
//           "scope": [
//             "items.create",
//             "items.update"
//           ],
//           "collections": [
//             "memberships"
//           ]
//         },
//         "operation": "b1eab537-a150-45d9-a88c-7d148007cfd0",
//         "date_created": "2024-01-29T10:50:08.063Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "operations": [
//           "3010d0b9-bf99-4d0e-887f-d065be01a2b2",
//           "40c5ee74-90d8-4ed5-881a-1c94be16e192",
//           "5c7c6f60-0d5e-4dee-8b2f-108e00ca9eab",
//           "8f699acb-6530-4177-9219-a833afa04f20",
//           "90fa15a3-d6f7-4161-ae75-af8a81d1bfcb",
//           "b1eab537-a150-45d9-a88c-7d148007cfd0",
//           "c6064a15-3bb4-4338-a16f-89e1c53c9eb4",
//           "cf48e535-4dca-4d91-9096-4d24df330a84"
//         ]
//       },
//       "user_created": {
//         "id": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "first_name": "Admin",
//         "last_name": "Example",
//         "email": "admin@example.com",
//         "password": null,
//         "location": null,
//         "title": null,
//         "description": null,
//         "tags": null,
//         "avatar": null,
//         "language": null,
//         "tfa_secret": null,
//         "status": "active",
//         "role": "c283e848-f13f-491f-803a-bc3083cc84ba",
//         "token": null,
//         "last_access": "2024-01-30T13:16:06.655Z",
//         "last_page": "/settings/flows/d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "provider": "keycloak",
//         "external_identifier": "admin@example.com",
//         "auth_data": {
//           "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzZDhlMDU4MC05ZGE1LTRjNDItOGFjNy0zNmViYzgwYTVmYTcifQ.eyJleHAiOjE3MDY2MjIzNjYsImlhdCI6MTcwNjYyMDU2NiwianRpIjoiMWFiMDFiNTctYmIwYS00ZTM2LWI1YjgtNTNlOGYxMjU3ZWMxIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL2NvbGxlY3Rpdm8iLCJhdWQiOiJodHRwOi8va2V5Y2xvYWs6ODA4MC9yZWFsbXMvY29sbGVjdGl2byIsInN1YiI6IjQ5YmZhNjc5LTQzOTMtNGY1MS1iMzcyLWMxMmNjNDBlZDA4NSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJkaXJlY3R1cyIsIm5vbmNlIjoiRVBkWEhxVlFzWnljdXc5WW1wR290WTdObVZ3OGRyelFWSjdQUGd3OE1OVSIsInNlc3Npb25fc3RhdGUiOiJkNzk2ODcyNy0wODA3LTQ0ZGQtYjY1Ni0zYTBiOGQ2OTRlM2UiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZDc5Njg3MjctMDgwNy00NGRkLWI2NTYtM2EwYjhkNjk0ZTNlIn0.KOWeSD6hj7tQ1ntx13wPTfW-l-8FYgOIGRBpEg6L28Q"
//         },
//         "email_notifications": true,
//         "appearance": null,
//         "theme_dark": null,
//         "theme_light": null,
//         "theme_light_overrides": null,
//         "theme_dark_overrides": null,
//         "payments_type": "sepa",
//         "payments_account_iban": "AT95 3412 9000 08934523",
//         "payments_account_owner": "s",
//         "memberships_phone": null,
//         "memberships_birthday": "2008-01-09",
//         "memberships_occupation": "d",
//         "memberships_gender": "diverse",
//         "memberships_person_type": "natural",
//         "memberships_street": "d",
//         "memberships_streetnumber": "d",
//         "memberships_stair": null,
//         "memberships_door": null,
//         "memberships_postcode": "d",
//         "memberships_city": "d",
//         "memberships_country": "d",
//         "memberships_organization_name": null,
//         "memberships_organization_id": null,
//         "memberships_organization_type": null,
//         "collectivo_tags": [],
//         "messages_campaigns": []
//       }
//     },
//     {
//       "id": "b1eab537-a150-45d9-a88c-7d148007cfd0",
//       "name": "checkHasShares",
//       "key": "checkHasShares",
//       "type": "exec",
//       "position_x": 19,
//       "position_y": 1,
//       "options": {
//         "code": "module.exports = async function(data) {\n\tconsole.log(\"prepareInvoice\")\n\tconsole.log(data[\"$trigger\"])\n\tif (!(\"memberships_shares\" in data[\"$trigger\"].payload)) {\n\t\tthrow new Error(\"No shares in payload\")\n    }\n\treturn {}\n}"
//       },
//       "date_created": "2024-01-29T10:57:14.585Z",
//       "resolve": {
//         "id": "3010d0b9-bf99-4d0e-887f-d065be01a2b2",
//         "name": "checkIsBulk",
//         "key": "checkIsBulk",
//         "type": "exec",
//         "position_x": 37,
//         "position_y": 1,
//         "options": {
//           "code": "module.exports = async function(data) {\n\tif (data[\"$trigger\"].keys.length != 1) {\n\t\tconsole.log(\"multiple keys in payload\")\n    \tthrow new Error(\"Memberships invoice flow: Cannot bulk edit shares\")\n\t}\n\treturn {}\n}"
//         },
//         "resolve": "5c7c6f60-0d5e-4dee-8b2f-108e00ca9eab",
//         "reject": null,
//         "flow": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "date_created": "2024-01-30T11:20:57.362Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6"
//       },
//       "reject": {
//         "id": "cf48e535-4dca-4d91-9096-4d24df330a84",
//         "name": "endFlowWithoutBlocking",
//         "key": "endFlowWithoutBlocking",
//         "type": "exec",
//         "position_x": 3,
//         "position_y": 20,
//         "options": {
//           "code": "module.exports = async function(data) {\n\t// Do nothing, just to let the reject path pass without blocking\n    console.log(\"has no shares\")\n\treturn {};\n}"
//         },
//         "resolve": null,
//         "reject": null,
//         "flow": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "date_created": "2024-01-30T11:20:57.368Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6"
//       },
//       "flow": {
//         "id": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "name": "memberships_create_invoice_for_shares",
//         "icon": "bolt",
//         "color": null,
//         "description": null,
//         "status": "active",
//         "trigger": "event",
//         "accountability": "all",
//         "options": {
//           "type": "filter",
//           "scope": [
//             "items.create",
//             "items.update"
//           ],
//           "collections": [
//             "memberships"
//           ]
//         },
//         "operation": "b1eab537-a150-45d9-a88c-7d148007cfd0",
//         "date_created": "2024-01-29T10:50:08.063Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "operations": [
//           "3010d0b9-bf99-4d0e-887f-d065be01a2b2",
//           "40c5ee74-90d8-4ed5-881a-1c94be16e192",
//           "5c7c6f60-0d5e-4dee-8b2f-108e00ca9eab",
//           "8f699acb-6530-4177-9219-a833afa04f20",
//           "90fa15a3-d6f7-4161-ae75-af8a81d1bfcb",
//           "b1eab537-a150-45d9-a88c-7d148007cfd0",
//           "c6064a15-3bb4-4338-a16f-89e1c53c9eb4",
//           "cf48e535-4dca-4d91-9096-4d24df330a84"
//         ]
//       },
//       "user_created": {
//         "id": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "first_name": "Admin",
//         "last_name": "Example",
//         "email": "admin@example.com",
//         "password": null,
//         "location": null,
//         "title": null,
//         "description": null,
//         "tags": null,
//         "avatar": null,
//         "language": null,
//         "tfa_secret": null,
//         "status": "active",
//         "role": "c283e848-f13f-491f-803a-bc3083cc84ba",
//         "token": null,
//         "last_access": "2024-01-30T13:16:06.655Z",
//         "last_page": "/settings/flows/d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "provider": "keycloak",
//         "external_identifier": "admin@example.com",
//         "auth_data": {
//           "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzZDhlMDU4MC05ZGE1LTRjNDItOGFjNy0zNmViYzgwYTVmYTcifQ.eyJleHAiOjE3MDY2MjIzNjYsImlhdCI6MTcwNjYyMDU2NiwianRpIjoiMWFiMDFiNTctYmIwYS00ZTM2LWI1YjgtNTNlOGYxMjU3ZWMxIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL2NvbGxlY3Rpdm8iLCJhdWQiOiJodHRwOi8va2V5Y2xvYWs6ODA4MC9yZWFsbXMvY29sbGVjdGl2byIsInN1YiI6IjQ5YmZhNjc5LTQzOTMtNGY1MS1iMzcyLWMxMmNjNDBlZDA4NSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJkaXJlY3R1cyIsIm5vbmNlIjoiRVBkWEhxVlFzWnljdXc5WW1wR290WTdObVZ3OGRyelFWSjdQUGd3OE1OVSIsInNlc3Npb25fc3RhdGUiOiJkNzk2ODcyNy0wODA3LTQ0ZGQtYjY1Ni0zYTBiOGQ2OTRlM2UiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZDc5Njg3MjctMDgwNy00NGRkLWI2NTYtM2EwYjhkNjk0ZTNlIn0.KOWeSD6hj7tQ1ntx13wPTfW-l-8FYgOIGRBpEg6L28Q"
//         },
//         "email_notifications": true,
//         "appearance": null,
//         "theme_dark": null,
//         "theme_light": null,
//         "theme_light_overrides": null,
//         "theme_dark_overrides": null,
//         "payments_type": "sepa",
//         "payments_account_iban": "AT95 3412 9000 08934523",
//         "payments_account_owner": "s",
//         "memberships_phone": null,
//         "memberships_birthday": "2008-01-09",
//         "memberships_occupation": "d",
//         "memberships_gender": "diverse",
//         "memberships_person_type": "natural",
//         "memberships_street": "d",
//         "memberships_streetnumber": "d",
//         "memberships_stair": null,
//         "memberships_door": null,
//         "memberships_postcode": "d",
//         "memberships_city": "d",
//         "memberships_country": "d",
//         "memberships_organization_name": null,
//         "memberships_organization_id": null,
//         "memberships_organization_type": null,
//         "collectivo_tags": [],
//         "messages_campaigns": []
//       }
//     },
//     {
//       "id": "c6064a15-3bb4-4338-a16f-89e1c53c9eb4",
//       "name": "createInvoice",
//       "key": "createInvoice",
//       "type": "item-create",
//       "position_x": 21,
//       "position_y": 38,
//       "options": {
//         "collection": "payments_invoices_out",
//         "permissions": "$full",
//         "payload": {
//           "payments_recipient_user": "{{membership.memberships_user}}"
//         }
//       },
//       "date_created": "2024-01-30T12:48:51.150Z",
//       "resolve": {
//         "id": "40c5ee74-90d8-4ed5-881a-1c94be16e192",
//         "name": "Create Data",
//         "key": "item_create_rsk4o",
//         "type": "item-create",
//         "position_x": 39,
//         "position_y": 38,
//         "options": {
//           "collection": "payments_invoices_entries",
//           "permissions": "$full",
//           "payload": {
//             "payments_invoice": "{{createInvoice[0]}}",
//             "payments_item": "{{readMembership.memberships_type.memberships_shares_item.id}}",
//             "payments_quantity": "{{calcShares.sharesToBeInvoiced}}",
//             "payments_price": "{{readMembership.memberships_type.memberships_shares_item.payments_price}}"
//           }
//         },
//         "resolve": null,
//         "reject": null,
//         "flow": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "date_created": "2024-01-30T12:51:57.366Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6"
//       },
//       "reject": null,
//       "flow": {
//         "id": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "name": "memberships_create_invoice_for_shares",
//         "icon": "bolt",
//         "color": null,
//         "description": null,
//         "status": "active",
//         "trigger": "event",
//         "accountability": "all",
//         "options": {
//           "type": "filter",
//           "scope": [
//             "items.create",
//             "items.update"
//           ],
//           "collections": [
//             "memberships"
//           ]
//         },
//         "operation": "b1eab537-a150-45d9-a88c-7d148007cfd0",
//         "date_created": "2024-01-29T10:50:08.063Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "operations": [
//           "3010d0b9-bf99-4d0e-887f-d065be01a2b2",
//           "40c5ee74-90d8-4ed5-881a-1c94be16e192",
//           "5c7c6f60-0d5e-4dee-8b2f-108e00ca9eab",
//           "8f699acb-6530-4177-9219-a833afa04f20",
//           "90fa15a3-d6f7-4161-ae75-af8a81d1bfcb",
//           "b1eab537-a150-45d9-a88c-7d148007cfd0",
//           "c6064a15-3bb4-4338-a16f-89e1c53c9eb4",
//           "cf48e535-4dca-4d91-9096-4d24df330a84"
//         ]
//       },
//       "user_created": {
//         "id": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "first_name": "Admin",
//         "last_name": "Example",
//         "email": "admin@example.com",
//         "password": null,
//         "location": null,
//         "title": null,
//         "description": null,
//         "tags": null,
//         "avatar": null,
//         "language": null,
//         "tfa_secret": null,
//         "status": "active",
//         "role": "c283e848-f13f-491f-803a-bc3083cc84ba",
//         "token": null,
//         "last_access": "2024-01-30T13:16:06.655Z",
//         "last_page": "/settings/flows/d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "provider": "keycloak",
//         "external_identifier": "admin@example.com",
//         "auth_data": {
//           "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzZDhlMDU4MC05ZGE1LTRjNDItOGFjNy0zNmViYzgwYTVmYTcifQ.eyJleHAiOjE3MDY2MjIzNjYsImlhdCI6MTcwNjYyMDU2NiwianRpIjoiMWFiMDFiNTctYmIwYS00ZTM2LWI1YjgtNTNlOGYxMjU3ZWMxIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL2NvbGxlY3Rpdm8iLCJhdWQiOiJodHRwOi8va2V5Y2xvYWs6ODA4MC9yZWFsbXMvY29sbGVjdGl2byIsInN1YiI6IjQ5YmZhNjc5LTQzOTMtNGY1MS1iMzcyLWMxMmNjNDBlZDA4NSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJkaXJlY3R1cyIsIm5vbmNlIjoiRVBkWEhxVlFzWnljdXc5WW1wR290WTdObVZ3OGRyelFWSjdQUGd3OE1OVSIsInNlc3Npb25fc3RhdGUiOiJkNzk2ODcyNy0wODA3LTQ0ZGQtYjY1Ni0zYTBiOGQ2OTRlM2UiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZDc5Njg3MjctMDgwNy00NGRkLWI2NTYtM2EwYjhkNjk0ZTNlIn0.KOWeSD6hj7tQ1ntx13wPTfW-l-8FYgOIGRBpEg6L28Q"
//         },
//         "email_notifications": true,
//         "appearance": null,
//         "theme_dark": null,
//         "theme_light": null,
//         "theme_light_overrides": null,
//         "theme_dark_overrides": null,
//         "payments_type": "sepa",
//         "payments_account_iban": "AT95 3412 9000 08934523",
//         "payments_account_owner": "s",
//         "memberships_phone": null,
//         "memberships_birthday": "2008-01-09",
//         "memberships_occupation": "d",
//         "memberships_gender": "diverse",
//         "memberships_person_type": "natural",
//         "memberships_street": "d",
//         "memberships_streetnumber": "d",
//         "memberships_stair": null,
//         "memberships_door": null,
//         "memberships_postcode": "d",
//         "memberships_city": "d",
//         "memberships_country": "d",
//         "memberships_organization_name": null,
//         "memberships_organization_id": null,
//         "memberships_organization_type": null,
//         "collectivo_tags": [],
//         "messages_campaigns": []
//       }
//     },
//     {
//       "id": "cf48e535-4dca-4d91-9096-4d24df330a84",
//       "name": "endFlowWithoutBlocking",
//       "key": "endFlowWithoutBlocking",
//       "type": "exec",
//       "position_x": 3,
//       "position_y": 20,
//       "options": {
//         "code": "module.exports = async function(data) {\n\t// Do nothing, just to let the reject path pass without blocking\n    console.log(\"has no shares\")\n\treturn {};\n}"
//       },
//       "date_created": "2024-01-30T11:20:57.368Z",
//       "resolve": null,
//       "reject": null,
//       "flow": {
//         "id": "d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "name": "memberships_create_invoice_for_shares",
//         "icon": "bolt",
//         "color": null,
//         "description": null,
//         "status": "active",
//         "trigger": "event",
//         "accountability": "all",
//         "options": {
//           "type": "filter",
//           "scope": [
//             "items.create",
//             "items.update"
//           ],
//           "collections": [
//             "memberships"
//           ]
//         },
//         "operation": "b1eab537-a150-45d9-a88c-7d148007cfd0",
//         "date_created": "2024-01-29T10:50:08.063Z",
//         "user_created": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "operations": [
//           "3010d0b9-bf99-4d0e-887f-d065be01a2b2",
//           "40c5ee74-90d8-4ed5-881a-1c94be16e192",
//           "5c7c6f60-0d5e-4dee-8b2f-108e00ca9eab",
//           "8f699acb-6530-4177-9219-a833afa04f20",
//           "90fa15a3-d6f7-4161-ae75-af8a81d1bfcb",
//           "b1eab537-a150-45d9-a88c-7d148007cfd0",
//           "c6064a15-3bb4-4338-a16f-89e1c53c9eb4",
//           "cf48e535-4dca-4d91-9096-4d24df330a84"
//         ]
//       },
//       "user_created": {
//         "id": "87226828-be9d-431c-bedf-ae895d17d9f6",
//         "first_name": "Admin",
//         "last_name": "Example",
//         "email": "admin@example.com",
//         "password": null,
//         "location": null,
//         "title": null,
//         "description": null,
//         "tags": null,
//         "avatar": null,
//         "language": null,
//         "tfa_secret": null,
//         "status": "active",
//         "role": "c283e848-f13f-491f-803a-bc3083cc84ba",
//         "token": null,
//         "last_access": "2024-01-30T13:16:06.655Z",
//         "last_page": "/settings/flows/d8e772c3-03fe-4ac3-a294-e082bdc7c5d7",
//         "provider": "keycloak",
//         "external_identifier": "admin@example.com",
//         "auth_data": {
//           "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzZDhlMDU4MC05ZGE1LTRjNDItOGFjNy0zNmViYzgwYTVmYTcifQ.eyJleHAiOjE3MDY2MjIzNjYsImlhdCI6MTcwNjYyMDU2NiwianRpIjoiMWFiMDFiNTctYmIwYS00ZTM2LWI1YjgtNTNlOGYxMjU3ZWMxIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL2NvbGxlY3Rpdm8iLCJhdWQiOiJodHRwOi8va2V5Y2xvYWs6ODA4MC9yZWFsbXMvY29sbGVjdGl2byIsInN1YiI6IjQ5YmZhNjc5LTQzOTMtNGY1MS1iMzcyLWMxMmNjNDBlZDA4NSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJkaXJlY3R1cyIsIm5vbmNlIjoiRVBkWEhxVlFzWnljdXc5WW1wR290WTdObVZ3OGRyelFWSjdQUGd3OE1OVSIsInNlc3Npb25fc3RhdGUiOiJkNzk2ODcyNy0wODA3LTQ0ZGQtYjY1Ni0zYTBiOGQ2OTRlM2UiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZDc5Njg3MjctMDgwNy00NGRkLWI2NTYtM2EwYjhkNjk0ZTNlIn0.KOWeSD6hj7tQ1ntx13wPTfW-l-8FYgOIGRBpEg6L28Q"
//         },
//         "email_notifications": true,
//         "appearance": null,
//         "theme_dark": null,
//         "theme_light": null,
//         "theme_light_overrides": null,
//         "theme_dark_overrides": null,
//         "payments_type": "sepa",
//         "payments_account_iban": "AT95 3412 9000 08934523",
//         "payments_account_owner": "s",
//         "memberships_phone": null,
//         "memberships_birthday": "2008-01-09",
//         "memberships_occupation": "d",
//         "memberships_gender": "diverse",
//         "memberships_person_type": "natural",
//         "memberships_street": "d",
//         "memberships_streetnumber": "d",
//         "memberships_stair": null,
//         "memberships_door": null,
//         "memberships_postcode": "d",
//         "memberships_city": "d",
//         "memberships_country": "d",
//         "memberships_organization_name": null,
//         "memberships_organization_id": null,
//         "memberships_organization_type": null,
//         "collectivo_tags": [],
//         "messages_campaigns": []
//       }
//     }
//   ]
// }
