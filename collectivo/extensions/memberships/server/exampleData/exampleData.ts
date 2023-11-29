import { createItem, deleteItems, readUsers } from "@directus/sdk";

export default async function createExampleData() {
  console.log("Creating example data for memberships");

  const directus = await useDirectus();

  // Clean up old data
  await directus.request(deleteItems("memberships", { limit: 1000 }));
  await directus.request(deleteItems("memberships_types", { limit: 1000 }));

  // Create some membership types
  console.log("Creating memberships");
  const types = [["Active"], ["Investing"]];
  const type_ids = [];

  for (const type of types) {
    const type_response = await directus.request(
      createItem("memberships_types", {
        name: type[0],
      }),
    );

    type_ids.push(type_response.id);
  }

  console.log("Created membership types", type_ids);

  // Create some memberships
  console.log("Creating memberships");

  const users = [
    ["Alice", [type_ids[0]], "applied"],
    ["Bob", [type_ids[1]], "approved"],
    ["Charlie", type_ids, "approved"],
    ["Dave", type_ids, "in-cancellation"],
  ];

  for (const user of users) {
    // Get user id
    const user_id = (
      await directus.request(readUsers({ filter: { first_name: user[0] } }))
    )[0];

    // Create membership
    for (const membership_type of user[1]) {
      await directus.request(
        createItem("memberships", {
          user: user_id,
          type: membership_type,
          status: user[2],
        }),
      );
    }
  }
}
