import { createItem, createUser } from "@directus/sdk";

// Register a new membership
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    return await registerMembership(body);
  } catch (e) {
    logger.error(e);
    throw e;
  }
});

async function registerMembership(body: any) {
  logger.info("Received membership application: " + body.user_email);

  const userData: any = {};
  const membershipData: any = {};

  for (const [key, value] of Object.entries(body)) {
    if (key.startsWith("directus_users.")) {
      userData[key.replace("directus_users.", "")] = value;
    } else if (key.startsWith("memberships.")) {
      membershipData[key.replace("memberships.", "")] = value;
    }
  }

  await refreshDirectus();
  const directus = await useDirectusAdmin();

  // Create user
  const user_id = await directus.request(createUser(userData));

  // Prepare membership
  membershipData.user = user_id;
  membershipData.status = "applied";

  // Create membership
  await directus.request(createItem("memberships", membershipData));

  // Create keycloak user

  // Send verification email

  return {
    status: 200,
    body: {
      message: "Membership registered",
    },
  };
}
