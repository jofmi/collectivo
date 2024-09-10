const schema = initSchema("collectivo", "0.0.1");

export default schema;

schema.collections = [
  {
    collection: "messages",
    meta: {
      sort: 500,
      icon: "mail",
      translations: [
        {
          language: "en-US",
          translation: "Messages",
          singular: "Message",
          plural: "Messages",
        },
        {
          language: "de-DE",
          translation: "Nachrichten",
          singular: "Nachricht",
          plural: "Nachrichten",
        },
      ],
    },
  },
  {
    collection: "messages_campaigns",
    schema: {
      name: "schema",
      comment: null,
    },
    meta: {
      sort: 90,
      group: "messages",
      icon: "campaign",
      display_template:
        "{{messages_template.messages_name}} ({{messages_template.messages_method}})",
      translations: [
        {
          language: "en-US",
          translation: "Campaigns",
          singular: "Campaign",
          plural: "Campaigns",
        },
        {
          language: "de-DE",
          translation: "Kampagnen",
          singular: "Kampagne",
          plural: "Kampagnen",
        },
      ],
    },
  },
  {
    collection: "messages_messages",
    schema: {
      name: "schema",
      comment: null,
    },
    meta: {
      sort: 90,
      icon: "conveyor_belt",
      group: "messages",
      translations: [
        {
          language: "en-US",
          translation: "Messages",
          singular: "Message",
          plural: "Messages",
        },
        {
          language: "de-DE",
          translation: "Aufzeichnungen",
          singular: "Aufzeichnung",
          plural: "Aufzeichnungen",
        },
      ],
    },
  },
  {
    collection: "messages_templates",
    schema: {
      name: "schema",
      comment: null,
    },
    meta: {
      sort: 90,
      icon: "sticky_note_2",
      group: "messages",
      display_template: "{{messages_name}} ({{messages_method}})",
      translations: [
        {
          language: "en-US",
          translation: "Templates",
          singular: "Template",
          plural: "Templates",
        },
        {
          language: "de-DE",
          translation: "Vorlagen",
          singular: "Vorlage",
          plural: "Vorlagen",
        },
      ],
    },
  },
  {
    collection: "messages_designs",
    schema: {
      name: "schema",
      comment: null,
    },
    meta: {
      sort: 90,
      icon: "design_services",
      group: "messages",
      display_template: "{{messages_design_name}}",
      translations: [
        {
          language: "en-US",
          translation: "Designs",
          singular: "Design",
          plural: "Designs",
        },
        {
          language: "de-DE",
          translation: "Designs",
          singular: "Design",
          plural: "Designs",
        },
      ],
    },
  },
];

schema.fields = [
  ...directusSystemFields("messages_campaigns"),
  ...directusSystemFields("messages_messages"),
  ...directusSystemFields("messages_templates"),
  ...directusSystemFields("messages_designs"),
  {
    collection: "messages_campaigns",
    field: "messages_campaign_status",
    type: "string",
    meta: {
      sort: 10,
      required: true,
      readonly: true,
      interface: "select-dropdown",
      display: "labels",
      display_options: {
        choices: [
          {
            text: "$t:draft",
            value: "draft",
            foreground: "#FFFFFF",
            background: "#666666",
          },
          {
            text: "$t:pending",
            value: "pending",
            foreground: "#FFFFFF",
            background: "#CC6600",
          },
          {
            text: "$t:partially_failed",
            value: "partially failed",
            foreground: "#FFFFFF",
            background: "#800000",
          },
          {
            text: "$t:completely_failed",
            value: "completely failed",
            foreground: "#FFFFFF",
            background: "#800000",
          },
          {
            text: "$t:sent",
            value: "sent",
            foreground: "#FFFFFF",
            background: "#008000",
          },
        ],
      },
      width: "half",
      options: {
        choices: [
          { text: "$t:draft", value: "draft" },
          { text: "$t:pending", value: "pending" },
          { text: "$t:partially_failed", value: "partially failed" },
          { text: "$t:completely_failed", value: "completely failed" },
          { text: "$t:sent", value: "sent" },
        ],
      },
      translations: [
        { language: "de-DE", translation: "Status" },
        { language: "en-US", translation: "Status" },
      ],
    },
    schema: { is_nullable: false, default_value: "draft" },
  },
  {
    collection: "messages_messages",
    field: "messages_message_status",
    type: "string",
    meta: {
      sort: 10,
      required: true,
      interface: "select-dropdown",
      display: "labels",
      display_options: {
        choices: [
          {
            text: "$t:pending",
            value: "pending",
            foreground: "#FFFFFF",
            background: "#CC6600",
          },
          {
            text: "$t:failed",
            value: "failed",
            foreground: "#FFFFFF",
            background: "#800000",
          },
          {
            text: "$t:sent",
            value: "sent",
            foreground: "#FFFFFF",
            background: "#008000",
          },
        ],
      },
      width: "half",
      options: {
        choices: [
          { text: "$t:pending", value: "pending" },
          { text: "$t:failed", value: "failed" },
          { text: "$t:sent", value: "sent" },
        ],
      },
      translations: [
        { language: "de-DE", translation: "Status" },
        { language: "en-US", translation: "Status" },
      ],
    },
    schema: { is_nullable: false, default_value: "pending" },
  },
  {
    collection: "messages_messages",
    field: "messages_error_message",
    type: "string",
    schema: {
      is_nullable: true,
    },
    meta: {
      sort: 1,
      required: true,
      translations: [
        { language: "en-US", translation: "Error message" },
        { language: "de-DE", translation: "Fehlermeldung" },
      ],
    },
  },
  {
    collection: "messages_templates",
    field: "messages_name",
    type: "string",
    schema: {
      is_nullable: false,
      is_unique: true,
    },
    meta: {
      sort: 1,
      required: true,
      translations: [
        { language: "en-US", translation: "Name" },
        { language: "de-DE", translation: "Name" },
      ],
    },
  },
  {
    collection: "messages_templates",
    field: "messages_method",
    type: "string",
    schema: {
      default_value: "email",
    },
    meta: {
      interface: "select-dropdown",
      options: { choices: [{ text: "Email", value: "email" }] },
      sort: 7,
      width: "half",
      translations: [
        { language: "en-US", translation: "Method" },
        { language: "de-DE", translation: "Methode" },
      ],
      note: "The method that should be used to deliver the message.",
      required: true,
      default: "email",
    },
  },
  {
    collection: "messages_templates",
    field: "messages_subject",
    type: "string",
    meta: {
      sort: 10,
      required: true,
      translations: [
        { language: "en-US", translation: "Subject" },
        { language: "de-DE", translation: "Betreff" },
      ],
    },
  },
  {
    collection: "messages_templates",
    field: "messages_content",
    type: "text",
    schema: {},
    meta: {
      interface: "input-multiline",
      sort: 11,
      translations: [
        { language: "en-US", translation: "Content" },
        { language: "de-DE", translation: "Inhalt" },
      ],
    },
  },
  {
    collection: "messages_designs",
    field: "messages_design_name",
    type: "string",
    schema: {
      is_nullable: false,
      is_unique: true,
    },
    meta: {
      sort: 1,
      required: true,
      translations: [
        { language: "en-US", translation: "Name" },
        { language: "de-DE", translation: "Name" },
      ],
    },
  },
  {
    collection: "messages_designs",
    field: "messages_design_html",
    type: "text",
    schema: {},
    meta: {
      interface: "input-code",
      options: {
        language: "htmlmixed",
      },
      sort: 7,
      translations: [
        { language: "en-US", translation: "HTML" },
        { language: "de-DE", translation: "HTML" },
      ],
    },
  },
];

schema.createForeignKey("messages_messages", "messages_campaigns", {
  fieldKey: {
    field: "messages_campaign",
    meta: {
      display: "raw",
      width: "half",
    },
  },
});

for (const coll of ["messages_campaigns", "messages_messages"]) {
  schema.createForeignKey(coll, "messages_templates", {
    fieldKey: {
      field: "messages_template",
      meta: {
        required: true,
        display: "related-values",
        display_options: {
          template: "{{messages_name}} ({{messages_method}})",
        },
      },
    },
  });
}

schema.createForeignKey("messages_messages", "directus_users", {
  m2oFieldType: "uuid",
  fieldKey: {
    field: "messages_recipient",
    meta: {
      required: true,
      options: {
        enableCreate: false,
        template: "{{first_name}} {{last_name}} ({{email}})))",
      },
      display: "related-values",
      display_options: { template: "{{first_name}} {{last_name}} ({{email}})" },
    },
  },
});

schema.createM2MRelation("messages_campaigns", "directus_users", {
  m2mFieldType2: "uuid",
  field1: {
    field: "messages_recipients",
    meta: {
      options: {
        enableCreate: false,
        fields: [
          "directus_users_id.first_name",
          "directus_users_id.last_name",
          "directus_users_id.email",
        ],
        layout: "table",
      },
      translations: [
        { language: "en-US", translation: "Recipients" },
        { language: "de-DE", translation: "Empfänger*innen" },
      ],
      display: "related-values",
      display_options: {
        template:
          "{{directus_users_id.first_name}} {{directus_users_id.last_name}} ({{directus_users_id.email}})",
      },
    },
  },
  field2: {
    field: "messages_campaigns",
    meta: {
      translations: [
        { language: "en-US", translation: "Campaigns" },
        { language: "de-DE", translation: "Kampagnen" },
      ],
    },
  },
});

schema.createForeignKey("messages_templates", "messages_designs", {
  fieldKey: {
    field: "messages_design",
    meta: {
      display: "raw",
      width: "half",
      sort: 8,
    },
  },
});

schema.flows = [
  {
    flow: {
      name: "messages_launch_campaign",
      icon: "play_arrow",
      description:
        "Flow implementing a button to manually start the execution of campaigns in draft mode. Ignores any campaigns with another status.",
      status: "active",
      trigger: "manual",
      accountability: "all",
      options: {
        collections: ["messages_campaigns"],
      },
    },
    firstOperation: "set_status_to_pending",
    operations: [
      {
        operation: {
          name: "set_status_to_pending",
          key: "set_status_to_pending",
          type: "item-update",
          position_x: 19,
          position_y: 1,
          options: {
            collection: "messages_campaigns",
            key: null,
            payload: {
              messages_campaign_status: "pending",
            },
            query: {
              filter: {
                _and: [
                  {
                    messages_campaign_status: {
                      _eq: "draft",
                    },
                  },
                  {
                    id: {
                      _in: "{{$trigger.body.keys}}",
                    },
                  },
                ],
              },
            },
            emitEvents: true,
            permissions: "$full",
          },
        },
      },
    ],
  },
];

schema.createNuxtHook(
  {
    name: "messages_handle_campaign_change",
    status: "active",
    accountability: "all",
    trigger: "event",
    options: {
      type: "action",
      scope: ["items.create", "items.update"],
      collections: ["messages_campaigns"],
    },
  },
  "api/messages/handle_campaign_change",
);

for (const action of ["read", "delete"]) {
  schema.permissions.push({
    collection: "messages_messages",
    roleName: "collectivo_editor",
    action: action,
    fields: ["*"],
  });
}

for (const action of ["read", "delete"]) {
  schema.permissions.push({
    collection: "messages_campaigns",
    roleName: "collectivo_editor",
    action: action,
    fields: ["*"],
  });
}

schema.permissions.push({
  collection: "messages_campaigns",
  roleName: "collectivo_editor",
  action: "update",
  permissions: { _and: [{ messages_campaign_status: { _eq: "draft" } }] },
  validation: {
    _and: [
      {
        _or: [
          { messages_campaign_status: { _eq: "draft" } },
          { messages_campaign_status: { _eq: "pending" } },
        ],
      },
    ],
  },
  fields: ["*"],
});

schema.permissions.push({
  collection: "messages_campaigns",
  roleName: "collectivo_editor",
  action: "create",
  validation: {
    _and: [
      {
        _or: [
          { messages_campaign_status: { _eq: "draft" } },
          { messages_campaign_status: { _eq: "pending" } },
        ],
      },
    ],
  },
  fields: ["*"],
});

for (const action of ["read", "update", "create", "delete"]) {
  for (const collection of [
    "messages",
    "messages_templates",
    "messages_campaigns_directus_users",
  ]) {
    schema.permissions.push({
      collection: collection,
      roleName: "collectivo_editor",
      action: action,
      fields: ["*"],
    });
  }
}

for (const action of ["read", "update", "create"]) {
  schema.permissions.push({
    collection: "directus_users",
    roleName: "collectivo_editor",
    action: action,
    fields: ["messages_campaigns"],
  });
}
