import {
  createItem,
  readItems,
  createUser,
  readUsers,
  deleteUser,
  deleteItem,
} from "@directus/sdk";
import KcAdminClient from "@keycloak/keycloak-admin-client";

// Register a new membership
// Receives input from /memberships/register
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    return await registerMembership(body);
  } catch (e: any) {
    // TODO: Use logger
    console.log(e);

    if (
      e &&
      "response" in e &&
      typeof e.response === "object" &&
      e.response.status
    ) {
      setResponseStatus(event, e.response.status);
    } else {
      setResponseStatus(event, 500);
    }

    return e;
  }
});

async function registerMembership(body: any) {
  logger.info("Received membership application: " + body);

  await refreshDirectus();
  const directus = await useDirectusAdmin();
  const config = useRuntimeConfig();

  const userData: any = {};
  const membershipData: any = {};

  for (const [key, value] of Object.entries(body)) {
    if (key.startsWith("directus_users__")) {
      userData[key.replace("directus_users__", "")] = value;
    } else if (key.startsWith("memberships__")) {
      membershipData[key.replace("memberships__", "")] = value;
    }
  }

  const user_password = userData.password;

  // Get membership type
  if (typeof membershipData.memberships_type === "string") {
    const types = await directus.request(
      readItems("memberships_types", {
        filter: { memberships_name: membershipData.memberships_type },
      }),
    );

    if (types.length === 0) {
      throw new Error(
        "Membership type not found: " + membershipData.memberships_type,
      );
    }

    membershipData.memberships_type = types[0].id;
  }

  // Connect to keycloak
  const keycloak = new KcAdminClient({
    baseUrl: config.public.keycloakUrl,
    realmName: config.public.keycloakRealm,
  });

  await keycloak.auth({
    grantType: "client_credentials",
    clientId: config.keycloakAdminClient,
    clientSecret: config.keycloakAdminSecret,
  });

  // Random call to test connection
  await keycloak.users.find({ first: 0, max: 1 });

  // Check if user exists
  if (!userData.email) {
    throw new Error("Email is required.");
  }

  const usersRes = await directus.request(
    readUsers({
      fields: ["id"],
      filter: {
        email: {
          _eq: userData.email,
        },
      },
    }),
  );

  if (usersRes.length > 0) {
    throw new Error("User already exists (Directus).");
  }

  // Check if keycloak user exists and extract password
  if (config.public.authService == "keycloak") {
    const kcUser = await keycloak.users.find({ email: userData.email });

    if (kcUser.length > 0) {
      throw new Error("User already exists (Keycloak).");
    }

    delete userData.password;
    userData.provider = "keycloak";
    userData.external_identifier = userData.email;
  }

  // All good from here - start registration

  // Create directus user
  const user = await directus.request(createUser(userData));

  // Create directus membership
  membershipData.memberships_user = user.id;
  membershipData.memberships_status = "applied";
  membershipData.memberships_date_applied = new Date().toISOString();

  let membership = undefined;

  try {
    membership = await directus.request(
      createItem("memberships", membershipData),
    );
  } catch (e) {
    await directus.request(deleteUser(user.id));
    throw e;
  }

  // Create keycloak user & set password
  if (config.public.authService == "keycloak") {
    let kcUser = undefined;

    try {
      kcUser = await keycloak.users.create({
        enabled: true,
        username: userData.email,
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        emailVerified: false,
      });
    } catch (e) {
      await directus.request(deleteItem("memberships", membership.id));
      await directus.request(deleteUser(user.id));
      throw e;
    }

    try {
      await keycloak.users.resetPassword({
        id: kcUser.id,
        credential: {
          temporary: false,
          type: "password",
          value: user_password,
        },
      });
    } catch (e) {
      await directus.request(deleteItem("memberships", membership.id));
      await directus.request(deleteUser(user.id));
      await keycloak.users.del({ id: kcUser.id });
      throw e;
    }
  }

  return {
    status: 201,
    body: {
      user: user.id,
      membership: membership.id,
    },
  };
}
