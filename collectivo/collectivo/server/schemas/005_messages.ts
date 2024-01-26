const schema = initSchema("collectivo", "0.0.1");

export default schema;

schema.collections = [
  {
    collection: "messages",
    meta: {
      sort: 90,
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
      display_template: "{{messages_template.name}}",
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
    collection: "messages_records",
    schema: {
      name: "schema",
      comment: null,
    },
    meta: {
      sort: 90,
      icon: "inventory_2",
      group: "messages",
      translations: [
        {
          language: "en-US",
          translation: "Records",
          singular: "Record",
          plural: "Records",
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
      display_template: "{{name}}",
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
];

schema.fields = [
  ...directusSystemFields("messages_campaigns"),
  ...directusSystemFields("messages_records"),
  ...directusSystemFields("messages_templates"),
  directusNameField("messages_templates", { width: "half" }),
  {
    collection: "messages_templates",
    field: "messages_method",
    type: "string",
    schema: {},
    meta: {
      interface: "select-dropdown",
      options: { choices: [{ text: "Email", value: "email" }] },
      sort: 2,
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
];

schema.createO2MRelation(
  "messages_campaigns",
  "messages_templates",
  "messages_template",
);

schema.createO2MRelation(
  "messages_records",
  "messages_campaigns",
  "messages_campaign",
);

schema.createM2MRelation("messages_campaigns", "directus_users", {
  m2mFieldType2: "uuid",
  field2: true,
});

// @ts-ignore
const operation = {
  id: "???",
  flow: "???",
  name: "Send email",
  key: "send_email",
  type: "mail",
  options: {
    body: "{{ template.messages_content }}",
    subject: "{{ template.messages_subject }}",
    to: ["{{ recipient.email }}"],
  },
};

schema.flows = [
  {
    flow: {
      name: "messages_create_messages_from_campaign",
      icon: "conveyor_belt",
      description: "Creates the individual messages to execute a campaign",
      status: "active",
      trigger: "event",
      accountability: "all",
      options: {
        type: "action",
        scope: ["items.create"],
        collections: ["messages_campaigns"],
      },
    },
    // @ts-ignore
    first_operation: "messages_expaned_campaign_to_messages",
    operations: [
      {
        operation: {
          name: "messages_expaned_campaign_to_messages",
          key: "messages_expaned_campaign_to_messages",
          type: "exec",
          position_x: 19,
          position_y: 1,
          options: {
            code: 'module.exports = async function(data) {\n    campaign = data["$trigger"].payload;\n\trecordsToCreate = [];\n    for (i in data["$trigger"].payload.recipients.create) {\n        recipient = data["$trigger"].payload.recipients.create[i]\n        recordsToCreate.push({\n            "messages_campaign": data["$trigger"].key,\n            "recipient": recipient.directus_users_id.id\n        });\n    }\n\treturn {recordsToCreate};\n}',
          },
        },
        first: true,
        resolve: "messages_store_individual_messages_in_records",
      },
      {
        operation: {
          name: "messages_store_individual_messages_in_records",
          key: "messages_store_individual_messages_in_records",
          type: "item-create",
          position_x: 37,
          position_y: 1,
          options: {
            collection: "messages_records",
            emitEvents: true,
            payload: "{{$last.recordsToCreate}}",
          },
        },
      },
    ],
  },
];
