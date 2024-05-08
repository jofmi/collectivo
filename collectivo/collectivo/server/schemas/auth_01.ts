const schema = initSchema("collectivo", "0.0.1");

export default schema;

schema.createNuxtHook(
  {
    name: "collectivo_user_create",
    icon: "bolt",
    color: null,
    description: null,
    status: "active",
    accountability: null,
    trigger: "event",
    options: {
      type: "action",
      scope: ["items.create"],
      collections: ["directus_users"],
    },
  },
  "api/collectivo/user",
);

schema.flows.push({
  flow: {
    name: "collectivo_auth_update",
    icon: "bolt",
    color: null,
    description: null,
    status: "active",
    accountability: null,
    trigger: "event",
    options: {
      type: "filter",
      scope: ["items.create", "items.update", "items.delete"],
      collections: ["directus_users"],
    },
  },
  firstOperation: "filter",
  operations: [
    {
      operation: {
        position_x: 19,
        position_y: 1,
        name: "Run Script",
        key: "filter",
        type: "exec",
        options: {
          code: 'module.exports = async function(data) {    \n    const attrs = ["email", "password", "first_name", "last_name"];\n    if (data["$trigger"]["event"]=="users.delete"){       \n        return {\n            "true": true \n        };\n    }\n    else if (!attrs.some(attr => attr in data["$trigger"].payload)){        \n        throw new Error("No important change");   \n    };\n    return {    \t\n        "true": true    \n    };\n}',
        },
      },
      reject: "continue",
      resolve: "postToNuxtAPI",
    },
    {
      operation: {
        position_x: 30,
        position_y: 1,
        name: "postToNuxtAPI",
        key: "postToNuxtAPI",
        type: "request",
        options: {
          method: "PATCH",
          url: "{{$env.COLLECTIVO_API_URL}}/" + "api/collectivo/auth",
          headers: [
            {
              header: "Authorization",
              value: "Bearer {{$env.COLLECTIVO_API_TOKEN}}",
            },
          ],
          body: "{{$trigger}}",
        },
      },
    },
    {
      operation: {
        name: "Run Script",
        key: "continue",
        position_x: 30,
        position_y: 19,
        type: "exec",
        options: {
          code: 'module.exports = async function(data) {\n\t// Do something...\n\treturn {\n    \t"true": true\n    };\n}',
        },
      },
    },
  ],
});
