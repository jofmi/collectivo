const schema = initSchema("payments", "0.0.1");

export default schema;

schema.collections = [
  {
    collection: "payments",
    meta: {
      sort: 100,
      icon: "payments",
    },
  },
  {
    collection: "payments_products",
    schema: {
      schema: "schema",
      name: "schema",
      comment: null,
    },
    meta: {
      group: "payments",
      sort: 100,
      icon: "receipt",
    },
  },
  {
    collection: "payments_invoice_items",
    schema: {
      schema: "schema",
      name: "schema",
      comment: null,
    },
    meta: {
      group: "payments",
      sort: 100,
      icon: "receipt",
    },
  },
  {
    collection: "payments_invoices_out",
    schema: {
      schema: "schema",
      name: "schema",
      comment: null,
    },
    meta: {
      group: "payments",
      sort: 100,
      icon: "payments",
      translations: [
        {
          language: "en-US",
          translation: "Invoices Out",
          singular: "Invoice Out",
          plural: "Invoices Out",
        },
        {
          language: "de-DE",
          translation: "Ausgangsrechnungen",
          singular: "Ausgangsrechnung",
          plural: "Ausgangsrechnungen",
        },
      ],
    },
  },
];

schema.fields = [];

schema.translations = [];

schema.relations = [];

schema.permissions = [];
