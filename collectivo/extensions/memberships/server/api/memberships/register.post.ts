import {
  createItem,
  readItems,
  createUser,
  updateUser,
  readUsers,
  deleteUser,
  deleteItem,
 createDirectus, readMe, withToken, rest } from "@directus/sdk";
import KcAdminClient from "@keycloak/keycloak-admin-client";

async function getUserID(event: any) {
  const token = getHeader(event, "Cookie");
  const config = useRuntimeConfig();
  const directusUser = createDirectus(config.public.directusUrl).with(rest());

  if (token) {
    const tokenValue = token.split("directus_session_token=")[1].split(";")[0];

    try {
      const user = await directusUser.request(
        withToken(
          tokenValue,
          readMe({
            fields: ["id", "email"],
          }),
        ),
      );

      console.log("Existing user: " + user.email);
      return user.id;
    } catch (e) {
      console.log("Unauthenticated");
      return undefined;
    }
  }

  return undefined;
}

// Register a new membership
// Receives input from /memberships/register
export default defineEventHandler(async (event) => {
  try {
    const userID = await getUserID(event);
    const body = await readBody(event);
    return await registerMembership(body, userID);
  } catch (e: any) {
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

    if ("message" in e) {
      logger.error(e.message);
    } else if (
      "errors" in e &&
      Array.isArray(e.errors) &&
      e.errors.length > 0
    ) {
      for (const error of e.errors) {
        logger.error(error.message);
      }

      throw createError({
        statusCode: 400,
        statusMessage: e.errors[0].message,
      });
    } else {
      logger.error("Unknown error");
    }

    throw e;
  }
});

async function registerMembership(body: any, userID: string | undefined) {
  const isAuthenticated = userID !== undefined;

  logger.info("Received membership application");

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

  // Disable security fields
  delete userData.provider;
  delete userData.external_identifier;
  delete userData.id;
  delete userData.token;
  delete userData.status;
  delete userData.role;
  delete userData.auth_data;

  // Check if user exists
  if (isAuthenticated) {
    delete userData.password;
    delete userData.email;
  } else {
    console.log("New user: " + userData.email);

    if (!userData.email) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email is required.",
      });
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
      throw createError({
        statusCode: 400,
        statusMessage: "User already exists (Directus)",
      });
    }

    // Check if keycloak user exists and extract password
    if (config.public.authService == "keycloak") {
      const kcUser = await keycloak.users.find({ email: userData.email });

      if (kcUser.length > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: "User already exists (Keycloak)",
        });
      }
    }
  }

  // All good from here - start registration

  // Create directus user
  if (isAuthenticated) {
    console.log("Updating user: " + userID);
    await directus.request(updateUser(userID!, userData));
  } else {
    console.log("Creating user");
    const user = await directus.request(createUser(userData));
    userID = user.id;
    console.log("User created: " + userID);
  }

  // Create directus membership
  console.log("Creating membership");
  membershipData.memberships_user = userID;
  membershipData.memberships_status = "applied";
  membershipData.memberships_date_applied = new Date().toISOString();

  let membership = undefined;

  try {
    membership = await directus.request(
      createItem("memberships", membershipData),
    );
  } catch (e) {
    if (!isAuthenticated) {
      // If user was just created, delete again
      await directus.request(deleteUser(userID!));
    }

    throw e;
  }

  console.log("Membership created: " + membership.id);

  return {
    status: 201,
    body: {
      user: userID,
      membership: membership.id,
    },
  };
}
