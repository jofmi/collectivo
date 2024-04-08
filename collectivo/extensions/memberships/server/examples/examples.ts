import { createItem, deleteItems, readUsers } from "@directus/sdk";

export default async function examples() {
  console.info("Creating example data for memberships");

  const directus = await useDirectusAdmin();

  // Clean up old data
  await directus.request(deleteItems("memberships", { limit: 1000 }));

  // Create some memberships
  console.info("Creating memberships");

  const users = [
    ["Alice", "applied"],
    ["Bob", "approved"],
    ["Charlie", "approved"],
    ["Dave", "in-cancellation"],
    ["User", "approved"],
  ];

  for (const user of users) {
    // Get user id
    const user_id = (
      await directus.request(readUsers({ filter: { first_name: user[0] } }))
    )[0];

    // Create membership

    await directus.request(
      createItem("memberships", {
        memberships_user: user_id,
        memberships_type: "normal",
        memberships_status: user[1],
      }),
    );
  }
}
