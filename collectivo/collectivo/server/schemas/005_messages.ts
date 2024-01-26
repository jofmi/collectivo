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

// @ts-ignore
const flowToExpandCampaignToIndividualMessages = {
  id: "067867f6-da20-49f9-a7a7-cd6bf1d6025f",
  name: "messages_create_messages_from_campaign",
  icon: "conveyor_belt",
  color: null,
  description: "Creates the individual messages to execute a campaign",
  status: "active",
  trigger: "event",
  accountability: "all",
  options: {
    type: "action",
    scope: ["items.create"],
    collections: ["messages_campaigns"],
  },
  operation: "56cc8889-4ae4-40c6-8417-b2b74c7bac49",
  date_created: "2024-01-07T11:26:02.827Z",
  user_created: "a0cf509f-8dd8-47a5-8bbe-d439e0cafc7b",
    {
      id: "56cc8889-4ae4-40c6-8417-b2b74c7bac49",
      name: "messages_expaned_campaign_to_messages",
      key: "messages_expaned_campaign_to_messages",
      type: "exec",
      position_x: 19,
      position_y: 1,
      options: {
        code: 'module.exports = async function(data) {\n    campaign = data["$trigger"].payload;\n\trecordsToCreate = [];\n    for (i in data["$trigger"].payload.recipients.create) {\n        recipient = data["$trigger"].payload.recipients.create[i]\n        recordsToCreate.push({\n            "messages_campaign": data["$trigger"].key,\n            "recipient": recipient.directus_users_id.id\n        });\n    }\n\treturn {recordsToCreate};\n}',
      },
      resolve: "d458a922-7f98-448d-b998-aeb29793770b",
      reject: null,
      flow: "067867f6-da20-49f9-a7a7-cd6bf1d6025f",
      date_created: "2024-01-07T11:28:28.142Z",
      user_created: "a0cf509f-8dd8-47a5-8bbe-d439e0cafc7b",
    },
    {
      id: "d458a922-7f98-448d-b998-aeb29793770b",
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
      resolve: null,
      reject: null,
      flow: "067867f6-da20-49f9-a7a7-cd6bf1d6025f",
      date_created: "2024-01-07T11:28:28.086Z",
      user_created: "a0cf509f-8dd8-47a5-8bbe-d439e0cafc7b",
    },
  ],
};

